/* app.js: the page. Reads the metadata of every image, asks core.js to rank them, draws the grid. */
(function () {
  'use strict';

  // The in-page file editor is switched off: students are meant to change metadata with ExifTool.
  // To bring it back, add <script>window.IMAGE_INDEX_EDIT = true;</script> before app.js in index.html.
  const ENABLE_FILE_EDIT = window.IMAGE_INDEX_EDIT === true;
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
      eAI: 'Declared as AI (DigitalSourceType)',
      eLikes: 'Likes',
      eComments: 'Comments',
      eKeywords: 'Keywords, separated by commas',
      badgeAI: 'AI',
      badgeCam: 'cam',
      badgeGps: 'GPS',
      badgeYours: 'yours',
      editHeading: 'Edit this file',
      editNote: 'Apply writes these values into the JPEG itself, and the index then reads the file again. Download it to check the result with ExifTool. Title, description and keywords are stored as XMP, which replaces the XMP and IPTC blocks that were there. Camera, author and copyright accept plain ASCII only.',
      copyNote: 'This image cannot be changed in place, so Apply makes an edited copy that stays in your browser.',
      eFilename: 'Filename',
      eMake: 'Camera make',
      eModel: 'Camera model',
      eLat: 'Latitude',
      eLon: 'Longitude',
      aiNote: 'A tool named in Software (Midjourney, DALL-E ...) also counts as declared.',
      likesNote: 'Likes and comments are not part of an image file. They are kept next to it.',
      likeBtn: '+1 like',
      liked: 'liked',
      commentBtn: '+1 comment',
      commented: 'commented',
      engageNote: 'One like and one comment per image. They are not stored in the file and are reset when you reload the page.',
      apply: 'Apply to file',
      download: 'Download file',
      restore: 'Restore original',
      working: 'Writing the file ...',
      editFail: 'The file could not be changed.',
      needCode: 'Enter the class code to see and add shared images.',
      needHandle: 'Enter a name or nickname first.',
      sharedCount: 'Class index: {n}',
      sharedError: 'The class index could not be reached.',
      uploading: 'Uploading {name} ...',
      uploaded: 'Shared. It now appears in the index.',
      gpsFail: 'Could not remove the location from {name}, so it was not uploaded.',
      badgeTrue: 'actually AI',
      badgeSlipped: 'AI, not declared',
      copied: 'Copied',
      inspector: 'Inspector',
      inspectorEmpty: 'Click on an image to display file and metadata information.',
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

  async function addFile(f, extra) {
    extra = extra || {};
    let raw = null;
    try { raw = await exifr.parse(f, OPTS); } catch (err) { console.warn(tr('unreadable'), f.name, err); }
    const url = URL.createObjectURL(f);
    let img = null;
    let avg = [128, 128, 128];
    try { img = await loadImg(url); avg = averageColor(img); } catch (err) { /* e.g. HEIC in Chrome: keep the metadata, no preview */ }
    const id = 'upload:' + f.name;
    const old = items.findIndex((i) => i.id === id);
    const item = {
      id, source: 'upload', name: f.name, blob: f, orig: extra.orig || null, thumbUrl: img ? url : '', fullUrl: img ? url : '',
      raw, avgColor: avg, ov: {},
      base: Core.derive(raw, { filename: f.name, width: img ? img.naturalWidth : 0, height: img ? img.naturalHeight : 0, likes: extra.likes || 0, comments: extra.comments || 0 })
    };
    if (old >= 0) items[old] = item; else items.push(item);
    return id;
  }

  async function addFiles(fileList) {
    const files = Array.from(fileList).filter((f) => /\.jpe?g$/i.test(f.name));
    if (share.available && $('shareOn').checked) {
      let last = null;
      for (const f of files) {
        try {
          shareSay(tr('uploading', { name: f.name }), false);
          const r = await uploadShared(f);
          last = 'shared:' + r.handle + '/' + r.file;
        } catch (err) { shareSay(err.message, true); await refreshShared(); return; }
      }
      await refreshShared();
      if (last && items.some((i) => i.id === last)) { shareSay(tr('uploaded'), false); if (files.length === 1) openInspector(last); }
      return;
    }
    let last = null;
    for (const f of files) last = await addFile(f);
    render();
    if (files.length === 1 && last) openInspector(last);
  }

  // ---- shared class index (optional: needs the PHP files in api/) ----
  const share = { available: false, loaded: false };
  const store = {
    get(k) { try { return sessionStorage.getItem(k) || ''; } catch (e) { return ''; } },
    set(k, v) { try { sessionStorage.setItem(k, v); } catch (e) { /* ignore */ } }
  };
  function shareSay(msg, isError) {
    const n = $('shareStatus');
    n.textContent = msg || '';
    n.classList.toggle('error', !!isError);
  }
  async function api(path, opts) {
    const o = Object.assign({ cache: 'no-store', headers: {} }, opts);
    o.headers = Object.assign({ 'X-Class-Code': $('code').value }, o.headers);
    const res = await fetch(path, o);
    if (!(res.headers.get('content-type') || '').includes('json')) throw new Error('no api');
    return { status: res.status, body: await res.json() };
  }
  async function loadShared(m) {
    let raw = null;
    try { raw = await exifr.parse(m.url, OPTS); } catch (err) { console.warn(tr('unreadable'), m.file, err); }
    let avg = [128, 128, 128];
    try { avg = averageColor(await loadImg(m.thumb)); } catch (err) { /* keep grey */ }
    return {
      id: 'shared:' + m.handle + '/' + m.file, source: 'shared', owner: m.handle, name: m.file, thumbUrl: m.thumb, fullUrl: m.url,
      raw, avgColor: avg, ov: {},
      base: Core.derive(raw, { filename: m.file, width: m.width, height: m.height, likes: m.likes || 0, comments: m.comments || 0 })
    };
  }
  async function refreshShared() {
    if (!share.available) return;
    try {
      const { status, body } = await api('api/list.php');
      if (status === 401) { shareSay(tr('needCode'), false); items = items.filter((i) => i.source !== 'shared'); render(); return; }
      if (!body.ok) throw new Error(body.error);
      const old = new Map(items.filter((i) => i.source === 'shared').map((i) => [i.id, i]));
      const fresh = await Promise.all(body.images.map(async (m) => {
        const id = 'shared:' + m.handle + '/' + m.file;
        const prev = old.get(id);
        const item = await loadShared(m);
        if (prev) item.ov = prev.ov;                       // keep simulated edits across refreshes
        return item;
      }));
      items = items.filter((i) => i.source !== 'shared').concat(fresh);
      shareSay(tr('sharedCount', { n: fresh.length }), false);
      render();
    } catch (err) {
      console.warn('shared list', err);
      shareSay(tr('sharedError'), true);
    }
  }
  // Remove GPS from the EXIF block only. Everything else (camera, date, IPTC, XMP) stays as it is.
  function readBinary(file) {
    return new Promise((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(r.result);
      r.onerror = reject;
      r.readAsBinaryString(file);
    });
  }
  async function withoutGps(file) {
    const bin = await readBinary(file);
    const exif = piexif.load(bin);
    if (!exif.GPS || !Object.keys(exif.GPS).length) return file;
    exif.GPS = {};
    const out = piexif.insert(piexif.dump(exif), bin);
    const bytes = new Uint8Array(out.length);
    for (let i = 0; i < out.length; i++) bytes[i] = out.charCodeAt(i);
    return new Blob([bytes], { type: 'image/jpeg' });
  }
  async function uploadShared(file) {
    const handle = $('handle').value.trim();
    if (!handle) throw new Error(tr('needHandle'));
    let body = file;
    if ($('stripGps').checked) {
      try { body = await withoutGps(file); }
      catch (err) { throw new Error(tr('gpsFail', { name: file.name })); }   // never upload a file whose GPS we could not remove
    }
    const fd = new FormData();
    fd.append('file', body, file.name);
    fd.append('handle', handle);
    const { body: res } = await api('api/upload.php', { method: 'POST', body: fd });
    if (!res.ok) throw new Error(res.error || tr('sharedError'));
    return res;
  }
  async function probeShared() {
    try {
      const { status } = await api('api/list.php');
      share.available = status === 200 || status === 401;
    } catch (err) { share.available = false; }
    if (!share.available) return;
    $('share').hidden = false;
    $('handle').value = store.get('handle');
    $('code').value = store.get('code');
    $('shareOn').checked = store.get('shareOn') === '1';
    const syncShare = () => { $('shareFields').hidden = !$('shareOn').checked; $('privacy').hidden = $('shareOn').checked; };
    syncShare();
    $('shareOn').addEventListener('change', () => { syncShare(); store.set('shareOn', $('shareOn').checked ? '1' : '0'); });
    $('handle').addEventListener('change', () => store.set('handle', $('handle').value));
    $('code').addEventListener('change', () => { store.set('code', $('code').value); refreshShared(); });
    await refreshShared();
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

    const file = $('file');
    file.addEventListener('change', () => { addFiles(file.files); file.value = ''; });
    const drop = $('drop');
    ['dragenter', 'dragover'].forEach((ev) => document.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.add('over'); }));
    ['dragleave', 'drop'].forEach((ev) => document.addEventListener(ev, (e) => { e.preventDefault(); if (ev === 'drop' || e.target === document.documentElement) drop.classList.remove('over'); }));
    document.addEventListener('drop', (e) => { if (e.dataTransfer && e.dataTransfer.files.length) addFiles(e.dataTransfer.files); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && openId) closeInspector(); });
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
    const b = el('button', { type: 'button', class: 'tile' + (hasQuery && !r.queryMatch ? ' nomatch' : '') + (slipped ? ' slipped' : '') + (it.id === openId ? ' selected' : ''), title: it.name });
    b.append(it.thumbUrl ? el('img', { src: it.thumbUrl, alt, loading: 'lazy' }) : el('div', { class: 'noimg', text: it.name }));
    b.append(el('span', { class: 'rank', text: '#' + (idx + 1) }));
    b.append(el('span', { class: 'score', text: r.score.toFixed(2) }));
    const badges = el('div', { class: 'badges' });
    if (it.source === 'upload') badges.append(badge(tr('badgeYours'), 'yours'));
    if (it.source === 'shared') badges.append(badge(it.owner, 'yours'));
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
  function closeInspector() {
    openId = null;
    inspectorBody.replaceChildren();
    $('inspectorEmpty').hidden = false;
    render();
  }

  // EXIF dates carry no time zone; exifr gives local-time Dates, so format with local getters
  function pad(n) { return String(n).padStart(2, '0'); }
  function fmtDate(d, sep) {
    return d ? d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + (sep || ' ') + pad(d.getHours()) + ':' + pad(d.getMinutes()) : '';
  }

  function openInspector(id) {
    openId = id;
    $('inspectorEmpty').hidden = true;
    buildInspector();
    showMenu('menu-inspector');
    render();
  }

  function field(label, input, inline) {
    const l = typeof label === 'string' ? el('label', { text: label }) : label;
    return el('div', { class: 'field' + (inline ? ' inline' : '') }, inline ? [input, l] : [l, input]);
  }

  // ---- editing the file itself ----
  const origCache = new Map(); // shared images: the file as it was before the first edit (this session only)
  const cleanHandle = (v) => String(v || '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 24);
  const canEditInPlace = (it) => it.source === 'upload' || (it.source === 'shared' && share.available && it.owner === cleanHandle($('handle').value));
  async function bytesOf(it) {
    if (it.blob) return new Uint8Array(await it.blob.arrayBuffer());
    const res = await fetch(it.fullUrl, { cache: 'no-store' });
    if (!res.ok) throw new Error(tr('editFail'));
    return new Uint8Array(await res.arrayBuffer());
  }
  function jpgName(n) {
    n = String(n || '').replace(/[\\/]+/g, '-').trim() || 'image';
    return /\.jpe?g$/i.test(n) ? n : n + '.jpg';
  }
  async function putShared(it, blob, likes, comments) {
    const fd = new FormData();
    fd.append('file', blob, it.name);
    fd.append('handle', $('handle').value.trim());
    const { body: res } = await api('api/upload.php', { method: 'POST', body: fd });
    if (!res.ok) throw new Error(res.error || tr('sharedError'));
    const md = new FormData();
    md.append('handle', res.handle); md.append('file', res.file); md.append('likes', likes); md.append('comments', comments);
    await api('api/meta.php', { method: 'POST', body: md });
    await refreshShared();
    return 'shared:' + res.handle + '/' + res.file;
  }
  // Write the form values into the JPEG, then read the new file again.
  async function applyEdit(it, v) {
    const bytes = await bytesOf(it);
    const out = JpegEdit.edit(bytes, v.fields);
    if (it.source === 'shared' && canEditInPlace(it)) {
      if (!origCache.has(it.id)) origCache.set(it.id, new Blob([bytes], { type: 'image/jpeg' }));
      return putShared(it, new Blob([out], { type: 'image/jpeg' }), v.likes, v.comments);
    }
    const inPlace = it.source === 'upload';
    const name = jpgName(v.filename || it.name);
    const file = new File([out], name, { type: 'image/jpeg' });
    const id = await addFile(file, { likes: v.likes, comments: v.comments, orig: inPlace ? it.orig || it.blob : new Blob([bytes], { type: 'image/jpeg' }) });
    if (inPlace && name !== it.name) items = items.filter((i) => i !== it);
    return id;
  }
  async function restoreOriginal(it) {
    if (it.source === 'shared') return putShared(it, origCache.get(it.id), it.base.likes, it.base.comments);
    return addFile(new File([it.orig], it.name, { type: 'image/jpeg' }), { likes: it.base.likes, comments: it.base.comments, orig: it.orig });
  }
  function download(it) {
    const href = it.blob ? URL.createObjectURL(it.blob) : it.fullUrl;
    const a = el('a', { href, download: it.name });
    document.body.append(a); a.click(); a.remove();
  }

  function buildInspector() {
    const it = items.find((i) => i.id === openId);
    if (!it) return closeInspector();
    const b = el('div');
    b.append(it.fullUrl ? el('img', { class: 'big', src: it.fullUrl, alt: it.name }) : el('div', { class: 'tile noimg', text: tr('noPreview') }));
    b.append(el('h3', { text: it.name }));
    b.append(el('p', { class: 'rankline', id: 'insp-rank' }));
    b.append(el('table', { class: 'meta', id: 'insp-table' }));
    b.append(el('div', { id: 'insp-breakdown', class: 'breakdown' }));

    if (ENABLE_FILE_EDIT) {
      const base = it.base;
      const inPlace = canEditInPlace(it);
      const aiSet = /algorithmicMedia/i.test(String((it.raw && it.raw.DigitalSourceType) || ''));
      const inputs = {};
      const add = (form, key, label, node, inline) => { inputs[key] = node; form.append(field(label, node, inline)); return node; };
      const text = (val) => el('input', { type: 'text', value: val || '' });
      const form = el('div', { class: 'editform' });
      b.append(el('h4', { text: tr('editHeading') }));
      b.append(el('p', { class: 'small', text: tr('editNote') }));
      if (!inPlace) b.append(el('p', { class: 'small', text: tr('copyNote') }));

      if (it.source === 'upload' || !inPlace) add(form, 'filename', tr('eFilename'), text(inPlace ? it.name : it.name.replace(/(\.jpe?g)?$/i, '-edit.jpg')));
      add(form, 'title', tr('fTitle'), text(base.title));
      add(form, 'description', tr('fDescription'), el('textarea', { text: base.description }));
      add(form, 'keywords', tr('eKeywords'), text(base.keywords.join(', ')));
      form.append(el('div', { class: 'two' }, field(tr('eMake'), inputs.make = text(base.make)), field(tr('eModel'), inputs.model = text(base.model))));
      add(form, 'software', tr('fSoftware'), text(base.software));
      form.append(el('div', { class: 'two' }, field(tr('fAuthor'), inputs.artist = text(base.artist)), field(tr('fCopyright'), inputs.copyright = text(base.copyright))));
      add(form, 'date', tr('eDate'), el('input', { type: 'datetime-local', value: fmtDate(base.date, 'T') }));
      form.append(el('div', { class: 'two' },
        field(tr('eLat'), inputs.lat = el('input', { type: 'number', step: 'any', min: -90, max: 90, value: base.lat != null ? base.lat : '' })),
        field(tr('eLon'), inputs.lon = el('input', { type: 'number', step: 'any', min: -180, max: 180, value: base.lon != null ? base.lon : '' }))));
      const ai = el('input', { type: 'checkbox' });
      ai.checked = aiSet;
      add(form, 'ai', tr('eAI'), ai, true);
      form.append(el('p', { class: 'small', text: tr('aiNote') }));
      form.append(el('p', { class: 'small', text: tr('likesNote') }));
      form.append(el('div', { class: 'two' },
        field(tr('eLikes'), inputs.likes = el('input', { type: 'number', min: 0, value: base.likes })),
        field(tr('eComments'), inputs.comments = el('input', { type: 'number', min: 0, value: base.comments }))));

      const msg = el('p', { class: 'small', role: 'status', id: 'editStatus' });
      const run = (fn) => async () => {
        msg.classList.remove('error'); msg.textContent = tr('working');
        try { const id = await fn(); render(); openInspector(id); }
        catch (err) { msg.classList.add('error'); msg.textContent = err.message || tr('editFail'); }
      };
      const num = (n) => (n.value === '' ? null : Number(n.value));
      const apply = el('button', { type: 'button', text: tr('apply') });
      apply.addEventListener('click', run(() => applyEdit(it, {
        filename: inputs.filename ? inputs.filename.value : it.name,
        likes: Math.max(0, parseInt(inputs.likes.value, 10) || 0), comments: Math.max(0, parseInt(inputs.comments.value, 10) || 0),
        fields: {
          title: inputs.title.value, description: inputs.description.value,
          keywords: inputs.keywords.value.split(/[,;]/).map((k) => k.trim()).filter(Boolean),
          make: inputs.make.value, model: inputs.model.value, software: inputs.software.value,
          artist: inputs.artist.value, copyright: inputs.copyright.value,
          date: inputs.date.value, lat: num(inputs.lat), lon: num(inputs.lon), ai: inputs.ai.checked
        }
      })));
      const dl = el('button', { type: 'button', text: tr('download') });
      dl.addEventListener('click', () => download(it));
      const row = el('div', { class: 'buttons' }, apply, dl);
      if (it.orig || (it.source === 'shared' && origCache.has(it.id))) {
        const rs = el('button', { type: 'button', text: tr('restore') });
        rs.addEventListener('click', run(() => restoreOriginal(it)));
        row.append(rs);
      }
      form.append(row, msg);
      b.append(form);
    } else {
      // likes and comments: one click each per image, until the page is reloaded
      const engage = (key, label, done) => {
        const btn = el('button', { type: 'button', text: it.ov[key] != null ? done : label });
        btn.disabled = it.ov[key] != null;
        btn.addEventListener('click', () => {
          it.ov[key] = it.base[key] + 1;
          btn.disabled = true;
          btn.textContent = done;
          render();
        });
        return btn;
      };
      const dl = el('button', { type: 'button', text: tr('download') });
      dl.addEventListener('click', () => download(it));
      b.append(el('div', { class: 'buttons engage' }, engage('likes', tr('likeBtn'), tr('liked')), engage('comments', tr('commentBtn'), tr('commented')), dl));
      b.append(el('p', { class: 'small', text: tr('engageNote') }));
    }
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

  // ---- collapsible menus (one open at a time) ----
  function showMenu(id) {
    document.querySelectorAll('.menu').forEach((m) => {
      const on = m.id === id;
      m.classList.toggle('open', on);
      m.querySelector('.menu-head button').setAttribute('aria-expanded', String(on));
    });
  }
  function initMenus() {
    document.querySelectorAll('.menu').forEach((m) => {
      m.querySelector('.menu-head button').addEventListener('click', () => {
        if (m.classList.contains('open')) { m.classList.remove('open'); m.querySelector('.menu-head button').setAttribute('aria-expanded', 'false'); }
        else showMenu(m.id);
      });
    });
  }

  // ---- start ----
  async function init() {
    if (typeof exifr === 'undefined') {
      status.textContent = 'The metadata reader (vendor/exifr.full.umd.js) did not load. Check that the vendor folder is on the server, with that exact file name.';
      console.error('exifr is not defined: vendor/exifr.full.umd.js was not loaded (404?)');
    }
    initMenus();
    buildControls();
    render();
    try {
      const manifest = await (await fetch('manifest.json', { cache: 'no-store' })).json();
      const loaded = await Promise.all(manifest.images.map(loadBundled));
      items = loaded.concat(items);
    } catch (err) {
      console.error('Could not load manifest.json. Open the page through a web server, not as a file.', err);
      status.textContent = 'Could not load manifest.json. Open this page through a web server (see README).';
      return;
    }
    render();
    probeShared();
  }
  init();
})();
