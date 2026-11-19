/* app.js: the page. Reads the metadata of every image, asks core.js to rank them, draws the grid. */
(function () {
  'use strict';

  const OPTS = { tiff: true, ifd0: true, exif: true, gps: true, xmp: true, iptc: true, mergeOutput: true };

  // ---- strings. English is the default; add German under T.de (missing keys fall back to English). ----
  const T = {
    en: {
      loading: 'Reading the metadata from the files …',
      statusAll: '{n} of {total} images',
      statusQuery: '{n} of {total} images match “{q}”',
      empty: 'Nothing matches. Nobody has written about this yet: a data void. Add an image that does.',
      rankOf: 'Rank {r} of {n}, score {s}',
      filteredOut: 'Not shown: it does not match the query.',
      read: 'What the index read from this file',
      why: 'Why it ranks here',
      simulate: 'Simulate an edit',
      simulateNote: 'This changes only what the index believes. The file stays as it is. To change the file itself, edit it with a metadata tool and drop it here again.',
      resetEdits: 'Undo my edits',
      raw: 'Raw tags as read from the file',
      none: '(none)',
      yes: 'yes',
      no: 'no',
      fFilename: 'Filename',
      fSize: 'Size',
      fCamera: 'Camera',
      fDate: 'Date taken',
      fLocation: 'Location',
      fSoftware: 'Software',
      fTitle: 'Title',
      fDescription: 'Description',
      fKeywords: 'Keywords',
      fAuthor: 'Author',
      fCopyright: 'Copyright',
      fAI: 'Declared as AI',
      fColour: 'Average colour',
      fPopularity: 'Popularity',
      popNote: '{likes} likes, {comments} comments (not stored in the file)',
      eCamera: 'Camera (make and model)',
      eDate: 'Date taken',
      eGps: 'Has a location',
      eAI: 'Declared as AI',
      eLikes: 'Likes',
      eComments: 'Comments',
      eKeywords: 'Keywords, separated by commas',
      badgeAI: 'AI',
      badgeCam: 'cam',
      badgeGps: 'GPS',
      badgeYours: 'yours',
      badgeTrue: 'actually AI',
      badgeSlipped: 'AI, not declared',
      copied: 'Copied',
      noPreview: 'No preview in this browser',
      unreadable: 'Could not read metadata from this file.'
    },
    de: {}
  };
  const lang = (new URLSearchParams(location.search).get('lang') || document.documentElement.lang || 'en').slice(0, 2);
  function tr(key, vars) {
    let s = (T[lang] && T[lang][key]) || T.en[key] || key;
    for (const k in vars || {}) s = s.split('{' + k + '}').join(vars[k]);
    return s;
  }
  function sigText(kind, d) {
    return (T[lang] && T[lang][kind + '.' + d.key]) || (kind === 'label' ? d.label : d.hint);
  }
  if (lang !== 'en' && T[lang]) {
    document.querySelectorAll('[data-i18n]').forEach((n) => { if (T[lang][n.dataset.i18n]) n.textContent = T[lang][n.dataset.i18n]; });
    document.querySelectorAll('[data-i18n-placeholder]').forEach((n) => { if (T[lang][n.dataset.i18nPlaceholder]) n.placeholder = T[lang][n.dataset.i18nPlaceholder]; });
  }

  // ---- state ----
  let state = Core.defaultState();
  const fromHash = location.hash.length > 1 ? Core.decodeState(location.hash.slice(1)) : null;
  if (fromHash) state = fromHash;
  let items = []; // every image: bundled or uploaded
  let lastRows = [];
  let openId = null;

  const $ = (id) => document.getElementById(id);
  const grid = $('grid');
  const status = $('status');
  const inspector = $('inspector');
  const inspectorBody = $('inspectorBody');

  function el(tag, props, ...kids) {
    const n = document.createElement(tag);
    for (const k in props || {}) {
      if (k === 'text') n.textContent = props[k];
      else if (k === 'class') n.className = props[k];
      else n.setAttribute(k, props[k]);
    }
    kids.flat().forEach((c) => c != null && n.append(c));
    return n;
  }

  // ---- loading images ----
  function loadImg(url) {
    return new Promise((resolve, reject) => {
      const i = new Image();
      i.onload = () => resolve(i);
      i.onerror = reject;
      i.src = url;
    });
  }
  function averageColor(img) {
    const c = document.createElement('canvas');
    c.width = c.height = 16;
    const x = c.getContext('2d', { willReadFrequently: true });
    x.drawImage(img, 0, 0, 16, 16);
    const d = x.getImageData(0, 0, 16, 16).data;
    let r = 0, g = 0, b = 0, n = 0;
    for (let i = 0; i < d.length; i += 4) { r += d[i]; g += d[i + 1]; b += d[i + 2]; n++; }
    return [r / n, g / n, b / n];
  }

  async function loadBundled(m) {
    let raw = null;
    try { raw = await exifr.parse('images/' + m.file, OPTS); } catch (err) { console.warn(tr('unreadable'), m.file, err); }
    let avg = [128, 128, 128];
    try { avg = averageColor(await loadImg(m.thumb)); } catch (err) { /* keep grey */ }
    return {
      id: m.file, source: 'bundled', name: m.file, thumbUrl: m.thumb, fullUrl: 'images/' + m.file,
      raw, avgColor: avg, actuallyAI: m.actuallyAI, ov: {},
      base: Core.derive(raw, { filename: m.file, width: m.width, height: m.height, likes: m.likes, comments: m.comments })
    };
  }

  async function addFile(f) {
    let raw = null;
    try { raw = await exifr.parse(f, OPTS); } catch (err) { console.warn(tr('unreadable'), f.name, err); }
    const url = URL.createObjectURL(f);
    let img = null;
    let avg = [128, 128, 128];
    try { img = await loadImg(url); avg = averageColor(img); } catch (err) { /* e.g. HEIC in Chrome: keep the metadata, no preview */ }
    const id = 'upload:' + f.name;
    const old = items.findIndex((i) => i.id === id);
    const item = {
      id, source: 'upload', name: f.name, thumbUrl: img ? url : '', fullUrl: img ? url : '',
      raw, avgColor: avg, ov: {},
      base: Core.derive(raw, { filename: f.name, width: img ? img.naturalWidth : 0, height: img ? img.naturalHeight : 0, likes: 0, comments: 0 })
    };
    if (old >= 0) items[old] = item; else items.push(item);
    return id;
  }

  async function addFiles(fileList) {
    const files = Array.from(fileList).filter((f) => /\.jpe?g$/i.test(f.name));
    let last = null;
    for (const f of files) last = await addFile(f);
    render();
    if (files.length === 1 && last) openInspector(last);
  }

  // ---- controls ----
  const sliderEls = {};
  function buildControls() {
    const box = $('sliders');
    Core.SIGNALS.forEach((d) => {
      const input = el('input', { type: 'range', min: -100, max: 100, step: 5, id: 'w-' + d.key });
      const val = el('span', { class: 'val' });
      const label = el('label', { for: 'w-' + d.key, title: sigText('hint', d), text: sigText('label', d) });
      const row = el('div', { class: 'slider' }, label, val, input);
      if (d.key === 'colour') {
        const pick = el('input', { type: 'color', id: 'colour-pick', 'aria-label': 'colour' });
        pick.addEventListener('input', () => { state.color = pick.value; render(); });
        row.append(el('div', { class: 'extra' }, pick));
        sliderEls.colorInput = pick;
      }
      if (d.key === 'noise') {
        const shuffle = el('button', { type: 'button', text: 'Shuffle' });
        shuffle.addEventListener('click', () => { state.seed = Math.floor(Math.random() * 1e6); render(); });
        row.append(el('div', { class: 'extra' }, shuffle));
      }
      input.addEventListener('input', () => { state.weights[d.key] = Number(input.value); render(); });
      box.append(row);
      sliderEls[d.key] = { input, val };
    });

    const presets = $('presets');
    Core.PRESETS.forEach((p) => {
      const b = el('button', { type: 'button', 'data-preset': p.id, text: p.name, title: p.text });
      b.addEventListener('click', () => {
        state.weights = Object.assign({}, p.weights);
        if (p.color) state.color = p.color;
        $('presetText').textContent = p.text;
        render();
      });
      presets.append(b);
    });

    $('query').addEventListener('input', (e) => { state.query = e.target.value; render(); });
    $('only').addEventListener('change', (e) => { state.onlyMatches = e.target.checked; render(); });
    $('reveal').addEventListener('change', render);
    $('reset').addEventListener('click', () => {
      state = Core.defaultState();
      $('presetText').textContent = '';
      render();
    });
    $('copy').addEventListener('click', () => {
      const b = $('copy');
      const old = b.textContent;
      const done = () => { b.textContent = tr('copied'); setTimeout(() => { b.textContent = old; }, 1200); };
      if (navigator.clipboard) navigator.clipboard.writeText(location.href).then(done, () => window.prompt('Link', location.href));
      else window.prompt('Link', location.href);
    });
    $('export').addEventListener('click', exportSettings);

    const file = $('file');
    file.addEventListener('change', () => { addFiles(file.files); file.value = ''; });
    const drop = $('drop');
    ['dragenter', 'dragover'].forEach((ev) => document.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.add('over'); }));
    ['dragleave', 'drop'].forEach((ev) => document.addEventListener(ev, (e) => { e.preventDefault(); if (ev === 'drop' || e.target === document.documentElement) drop.classList.remove('over'); }));
    document.addEventListener('drop', (e) => { if (e.dataTransfer && e.dataTransfer.files.length) addFiles(e.dataTransfer.files); });
    $('closeInspector').addEventListener('click', closeInspector);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeInspector(); });
  }

  function syncControls() {
    Core.SIGNALS.forEach((d) => {
      const v = state.weights[d.key] || 0;
      sliderEls[d.key].input.value = v;
      sliderEls[d.key].val.textContent = (v > 0 ? '+' : '') + v;
    });
    if (sliderEls.colorInput) sliderEls.colorInput.value = state.color;
    if (document.activeElement !== $('query')) $('query').value = state.query;
    $('only').checked = state.onlyMatches;
    const cur = JSON.stringify(nonZero(state.weights));
    document.querySelectorAll('[data-preset]').forEach((b) => {
      const p = Core.PRESETS.find((x) => x.id === b.dataset.preset);
      b.setAttribute('aria-pressed', String(JSON.stringify(nonZero(p.weights)) === cur));
    });
  }
  function nonZero(w) {
    const o = {};
    Object.keys(w).sort().forEach((k) => { if (w[k]) o[k] = w[k]; });
    return o;
  }

  function exportSettings() {
    const data = {
      settings: { weights: nonZero(state.weights), query: state.query, onlyMatchesQuery: state.onlyMatches, colour: state.color, shuffleSeed: state.seed },
      topTen: lastRows.slice(0, 10).map((r) => r.item.ref.name),
      link: location.href
    };
    const a = el('a', { href: URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })), download: 'image-index-settings.json' });
    document.body.append(a);
    a.click();
    a.remove();
  }

  // ---- ranking and drawing ----
  function currentList() {
    return items.map((i) => ({ id: i.id, rec: Core.effective(i.base, i.ov), avgColor: i.avgColor, ref: i }));
  }

  function badge(text, cls) { return el('span', { class: 'badge' + (cls ? ' ' + cls : ''), text }); }

  function tile(r, idx) {
    const it = r.item.ref;
    const e = r.item.rec;
    const reveal = $('reveal').checked;
    const slipped = reveal && it.actuallyAI === true && !e.aiDeclared;
    const alt = e.description || e.title || it.name;
    const q = Core.keywordRaw(e, state.query);
    const hasQuery = state.query.trim() !== '';
    const b = el('button', { type: 'button', class: 'tile' + (hasQuery && !r.queryMatch ? ' nomatch' : '') + (slipped ? ' slipped' : ''), title: it.name });
    b.append(it.thumbUrl ? el('img', { src: it.thumbUrl, alt, loading: 'lazy' }) : el('div', { class: 'noimg', text: it.name }));
    b.append(el('span', { class: 'rank', text: '#' + (idx + 1) }));
    b.append(el('span', { class: 'score', text: r.score.toFixed(2) }));
    const badges = el('div', { class: 'badges' });
    if (it.source === 'upload') badges.append(badge(tr('badgeYours'), 'yours'));
    if (e.aiDeclared) badges.append(badge(tr('badgeAI')));
    if (e.hasCamera) badges.append(badge(tr('badgeCam')));
    if (e.hasGPS) badges.append(badge(tr('badgeGps')));
    if (slipped) badges.append(badge(tr('badgeSlipped'), 'slipped'));
    else if (reveal && it.actuallyAI === true) badges.append(badge(tr('badgeTrue'), 'truth'));
    if (q.spam) badges.append(badge('stuffing', 'truth'));
    b.append(badges);
    b.addEventListener('click', () => openInspector(it.id));
    return b;
  }

  function render() {
    syncControls();
    const rows = Core.rank(currentList(), state);
    lastRows = rows;
    grid.replaceChildren(...rows.map(tile));
    const hasQuery = state.query.trim() !== '';
    if (!items.length) status.textContent = tr('loading');
    else if (rows.length === 0) status.textContent = tr('empty');
    else if (hasQuery && state.onlyMatches) status.textContent = tr('statusQuery', { n: rows.length, total: items.length, q: state.query.trim() });
    else status.textContent = tr('statusAll', { n: rows.length, total: items.length });
    try { history.replaceState(null, '', '#' + Core.encodeState(state)); } catch (err) { /* file:// or sandbox */ }
    if (openId) refreshInspector();
  }

  // ---- inspector ----
  function closeInspector() { openId = null; inspector.hidden = true; }

  // EXIF dates carry no time zone; exifr gives local-time Dates, so format with local getters
  function pad(n) { return String(n).padStart(2, '0'); }
  function fmtDate(d, sep) {
    return d ? d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + (sep || ' ') + pad(d.getHours()) + ':' + pad(d.getMinutes()) : '';
  }

  function openInspector(id) {
    openId = id;
    inspector.hidden = false;
    buildInspector();
    refreshInspector();
  }

  function field(label, input, inline) {
    return el('div', { class: 'field' + (inline ? ' inline' : '') }, inline ? [input, label] : [label, input]);
  }

  function buildInspector() {
    const it = items.find((i) => i.id === openId);
    if (!it) return closeInspector();
    const b = el('div');
    b.append(it.fullUrl ? el('img', { class: 'big', src: it.fullUrl, alt: it.name }) : el('div', { class: 'tile noimg', text: tr('noPreview') }));
    b.append(el('h3', { text: it.name }));
    b.append(el('p', { class: 'rankline', id: 'insp-rank' }));
    b.append(el('h4', { text: tr('read') }), el('table', { class: 'meta', id: 'insp-table' }));
    b.append(el('h4', { text: tr('why') }), el('div', { id: 'insp-breakdown' }));
    b.append(el('h4', { text: tr('simulate') }), el('p', { class: 'small', text: tr('simulateNote') }));

    const base = it.base;
    const bind = (key, node, read) => {
      node.addEventListener('input', () => { it.ov[key] = read(node); render(); });
      return node;
    };
    const form = el('div');
    form.append(field(tr('fTitle'), bind('title', el('input', { type: 'text', value: base.title }), (n) => n.value)));
    form.append(field(tr('fDescription'), bind('description', el('textarea', { text: base.description }), (n) => n.value)));
    form.append(field(tr('eKeywords'), bind('keywords', el('input', { type: 'text', value: base.keywords.join(', ') }), (n) => n.value)));
    form.append(field(tr('eCamera'), bind('camera', el('input', { type: 'text', value: base.camera }), (n) => n.value)));
    form.append(field(tr('eDate'), bind('date', el('input', { type: 'datetime-local', value: fmtDate(base.date, 'T') }), (n) => n.value)));
    const gps = el('input', { type: 'checkbox' });
    gps.checked = base.hasGPS;
    form.append(field(tr('eGps'), bind('gps', gps, (n) => n.checked), true));
    const ai = el('input', { type: 'checkbox' });
    ai.checked = base.aiDeclared;
    form.append(field(tr('eAI'), bind('ai', ai, (n) => n.checked), true));
    form.append(el('div', { class: 'two' },
      field(tr('eLikes'), bind('likes', el('input', { type: 'number', min: 0, value: base.likes }), (n) => n.value)),
      field(tr('eComments'), bind('comments', el('input', { type: 'number', min: 0, value: base.comments }), (n) => n.value))));
    const reset = el('button', { type: 'button', text: tr('resetEdits') });
    reset.addEventListener('click', () => { it.ov = {}; buildInspector(); render(); });
    form.append(reset);
    b.append(form);

    const raw = el('details', { class: 'raw' }, el('summary', { text: tr('raw') }),
      el('pre', { text: it.raw ? JSON.stringify(it.raw, (k, v) => (v instanceof Date ? v.toISOString() : v), 1) : tr('none') }));
    b.append(raw);
    inspectorBody.replaceChildren(b);
  }

  function refreshInspector() {
    const it = items.find((i) => i.id === openId);
    if (!it || !$('insp-table')) return;
    const list = currentList();
    const e = Core.effective(it.base, it.ov);
    const all = Core.rank(list, Object.assign({}, state, { onlyMatches: false }));
    const row = all.find((r) => r.item.id === openId);
    const shownIdx = lastRows.findIndex((r) => r.item.id === openId);
    $('insp-rank').textContent = shownIdx >= 0 ? tr('rankOf', { r: shownIdx + 1, n: lastRows.length, s: row.score.toFixed(2) }) : tr('filteredOut');

    const rows = [
      [tr('fFilename'), it.name],
      [tr('fSize'), e.width ? e.width + ' × ' + e.height : ''],
      [tr('fCamera'), e.camera],
      [tr('fDate'), fmtDate(e.date)],
      [tr('fLocation'), e.hasGPS ? (e.lat != null && e.lon != null ? e.lat.toFixed(3) + ', ' + e.lon.toFixed(3) : tr('yes')) : ''],
      [tr('fSoftware'), e.software],
      [tr('fTitle'), e.title],
      [tr('fDescription'), e.description],
      [tr('fKeywords'), e.keywords.join(', ')],
      [tr('fAuthor'), e.artist],
      [tr('fCopyright'), e.copyright],
      [tr('fAI'), e.aiDeclared ? tr('yes') + (e.aiReason ? ': ' + e.aiReason : '') : tr('no')],
      [tr('fPopularity'), tr('popNote', { likes: e.likes, comments: e.comments })]
    ];
    const table = $('insp-table');
    table.replaceChildren(...rows.map(([k, v]) => el('tr', {}, el('th', { text: k }), el('td', v ? { text: v } : { class: 'missing', text: tr('none') }))));
    const sw = el('span', { class: 'swatch' });
    sw.style.background = 'rgb(' + it.avgColor.map(Math.round).join(',') + ')';
    table.append(el('tr', {}, el('th', { text: tr('fColour') }), el('td', {}, sw, 'rgb(' + it.avgColor.map(Math.round).join(', ') + ')')));

    const br = $('insp-breakdown');
    br.replaceChildren(...row.contributions.filter((c) => c.weight !== 0).map((c) => {
      const d = Core.SIGNALS.find((x) => x.key === c.key);
      const fill = el('div', { class: 'fill' + (c.value < 0 ? ' neg' : '') });
      const half = Math.abs(c.value) * 50;
      fill.style.left = c.value >= 0 ? '50%' : 50 - half + '%';
      fill.style.width = half + '%';
      return el('div', { class: 'bar', title: sigText('hint', d) },
        el('span', { text: sigText('label', d) }),
        el('div', { class: 'track' }, fill),
        el('span', { class: 'num', text: (c.value >= 0 ? '+' : '') + c.value.toFixed(2) }));
    }));
    if (!br.children.length) br.append(el('p', { class: 'small', text: '—' }));
  }

  // ---- start ----
  async function init() {
    buildControls();
    render();
    try {
      const manifest = await (await fetch('manifest.json')).json();
      const loaded = await Promise.all(manifest.images.map(loadBundled));
      items = loaded.concat(items);
    } catch (err) {
      console.error('Could not load manifest.json. Open the page through a web server, not as a file.', err);
      status.textContent = 'Could not load manifest.json. Open this page through a web server (see README).';
      return;
    }
    render();
  }
  init();
})();