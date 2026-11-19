/* core.js: the ranking engine of the image index.
 * Pure functions, no DOM, so it can be tested in Node and read by students.
 *
 * An image is turned into a few "signals" between 0 and 1 (how recent, how popular,
 * how well it matches the query, ...). A ranking is a weighted sum of those signals.
 * Weights go from -100 (bury) to +100 (boost). That is all a ranking is.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.Core = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  const SIGNALS = [
    { key: 'recency', label: 'Recent', hint: 'Capture date from the file (DateTimeOriginal). No date, no points.' },
    { key: 'popularity', label: 'Popular', hint: 'Likes and comments. These are invented for the sample images; they do not live in the file.' },
    { key: 'keyword', label: 'Matches the query', hint: 'Words of the query found in filename, title, description and keywords.' },
    { key: 'colour', label: 'Close to the colour', hint: 'How near the average colour of the image is to the colour you pick.' },
    { key: 'camera', label: 'Has camera data', hint: 'The file names a camera make or model.' },
    { key: 'ai', label: 'Declared as AI', hint: 'The file says it is AI-generated (IPTC DigitalSourceType) or names an AI tool as software.' },
    { key: 'gps', label: 'Has a location', hint: 'The file contains GPS coordinates.' },
    { key: 'resolution', label: 'High resolution', hint: 'Megapixels.' },
    { key: 'completeness', label: 'Well documented', hint: 'How many metadata fields are filled in (camera, date, place, software, title, description, keywords, author, copyright).' },
    { key: 'noise', label: 'Random', hint: 'A fixed random number per image. Use Shuffle to change it.' }
  ];

  const PRESETS = [
    { id: 'feed', name: 'Feed', text: 'Fresh and popular first.', weights: { recency: 70, popularity: 60 } },
    { id: 'seo', name: 'Search engine', text: 'Keywords and complete metadata win.', weights: { keyword: 100, completeness: 40, popularity: 10 } },
    { id: 'provenance', name: 'Provenance', text: 'Camera photos up, declared AI down.', weights: { camera: 70, ai: -100, gps: 20, completeness: 30 } },
    { id: 'obscure', name: 'Obscure first', text: 'The least popular images on top.', weights: { popularity: -100 } },
    { id: 'colour', name: 'Colour field', text: 'Closest to the picked colour first.', weights: { colour: 100 }, color: '#2f5fd0' },
    { id: 'clear', name: 'Clear', text: 'Every slider at zero. Move one to see a single signal at work.', weights: {} },
  ];

  const AI_SOURCE_RE = /algorithmicMedia/i; // IPTC DigitalSourceType: trainedAlgorithmicMedia, compositeWithTrainedAlgorithmicMedia
  const AI_SOFTWARE_RE = /midjourney|dall[-\s·]?e|firefly|stable diffusion|imagen|gemini|flux|ideogram|leonardo/i;

  function text(v) {
    if (v == null) return '';
    if (Array.isArray(v)) return v.map(text).filter(Boolean).join(', ');
    if (typeof v === 'object') return text(v.value != null ? v.value : '');
    return String(v);
  }

  // exifr hands back XMP text as it is stored, with XML escapes (&amp; &lt; ...). Turn them back into characters.
  const unxml = (t) => String(t).replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, '&');

  function keywordList(v) {
    if (v == null) return [];
    if (Array.isArray(v)) return v.map(text).filter(Boolean);
    return text(v).split(/[,;]/).map((s) => s.trim()).filter(Boolean);
  }

  // Turn whatever exifr returned (can be undefined for stripped files) into one flat record.
  function derive(raw, info) {
    raw = raw || {};
    info = info || {};
    const make = text(raw.Make).trim();
    const model = text(raw.Model).trim();
    const software = text(raw.Software).trim();
    const title = unxml(text(raw.title)) || text(raw.ObjectName);
    const description = unxml(text(raw.description)) || text(raw.Caption) || text(raw.ImageDescription);
    const xmpKeywords = keywordList(raw.subject).map(unxml);
    const keywords = xmpKeywords.length ? xmpKeywords : keywordList(raw.Keywords); // XMP wins over IPTC, as in most editors
    const uniqueKeywords = Array.from(new Set(keywords));
    const date = raw.DateTimeOriginal instanceof Date && !isNaN(raw.DateTimeOriginal) ? raw.DateTimeOriginal : null;
    const hasGPS = typeof raw.latitude === 'number' && typeof raw.longitude === 'number';
    const sourceType = text(raw.DigitalSourceType);
    const aiReason = AI_SOURCE_RE.test(sourceType)
      ? 'DigitalSourceType says algorithmic media'
      : AI_SOFTWARE_RE.test(software)
      ? 'Software names an AI tool'
      : '';
    return {
      filename: info.filename || '',
      width: info.width || 0,
      height: info.height || 0,
      make, model, software,
      camera: [make, model].filter(Boolean).join(' '),
      artist: text(raw.Artist),
      copyright: text(raw.Copyright),
      title, description,
      keywords: uniqueKeywords,
      date,
      lat: hasGPS ? raw.latitude : null,
      lon: hasGPS ? raw.longitude : null,
      hasGPS,
      hasCamera: !!(make || model),
      aiDeclared: !!aiReason,
      aiReason,
      likes: info.likes || 0,
      comments: info.comments || 0
    };
  }

  // Apply "simulated edits": what the index believes, without touching the file.
  function effective(rec, ov) {
    if (!ov) return rec;
    const e = Object.assign({}, rec);
    if ('title' in ov) e.title = ov.title;
    if ('description' in ov) e.description = ov.description;
    if ('keywords' in ov) e.keywords = keywordList(ov.keywords);
    if ('camera' in ov) { e.camera = ov.camera.trim(); e.hasCamera = !!e.camera; }
    if ('date' in ov) { const d = ov.date ? new Date(ov.date) : null; e.date = d && !isNaN(d) ? d : null; }
    if ('gps' in ov) { e.hasGPS = !!ov.gps; }
    if ('ai' in ov) { e.aiDeclared = !!ov.ai; e.aiReason = ov.ai ? 'edited by you' : ''; }
    if ('likes' in ov) e.likes = Number(ov.likes) || 0;
    if ('comments' in ov) e.comments = Number(ov.comments) || 0;
    return e;
  }

  function fieldsPresent(e) {
    return [e.camera, e.date, e.hasGPS, e.software, e.title, e.description, e.keywords && e.keywords.length, e.artist, e.copyright]
      .filter(Boolean).length;
  }

  function countOf(haystack, word) {
    return word ? haystack.toLowerCase().split(word).length - 1 : 0;
  }
  // repeating a word helps up to three times; more than five is punished as stuffing
  function fieldScore(haystack, word) {
    const c = countOf(haystack, word);
    if (c > 5) return { score: 0, spam: true };
    return { score: Math.min(c, 3), spam: false };
  }
  function queryWords(q) {
    return (q || '').toLowerCase().split(/\s+/).filter(Boolean);
  }
  const FIELD_WEIGHTS = [['filename', 3], ['title', 2], ['description', 2], ['keywords', 1.5]];
  function keywordRaw(e, q) {
    const words = queryWords(q);
    let raw = 0;
    let spam = false;
    for (const w of words) {
      for (const [field, weight] of FIELD_WEIGHTS) {
        const hay = field === 'keywords' ? e.keywords.join(' ') : e[field] || '';
        const r = fieldScore(hay, w);
        raw += weight * r.score;
        if (r.spam) spam = true;
      }
    }
    return { raw: spam ? 0 : raw, spam };
  }

  function hash01(str, seed) {
    let h = 2166136261 ^ seed;
    for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
    h ^= h >>> 13; h = Math.imul(h, 0x5bd1e995); h ^= h >>> 15;
    return (h >>> 0) / 4294967295;
  }

  function minmax(values) {
    const v = values.filter((x) => x != null && isFinite(x));
    return v.length ? [Math.min(...v), Math.max(...v)] : [0, 0];
  }
  function norm(x, lo, hi) {
    return hi > lo ? (x - lo) / (hi - lo) : 1;
  }

  function hexToRgb(hex) {
    const m = /^#?([0-9a-f]{6})$/i.exec(hex || '');
    if (!m) return [128, 128, 128];
    const n = parseInt(m[1], 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }

  // items: [{ id, rec (effective record), avgColor:[r,g,b] }]
  function computeSignals(items, state) {
    const dates = minmax(items.map((i) => (i.rec.date ? i.rec.date.getTime() : null)));
    const pops = items.map((i) => Math.log1p(i.rec.likes + 3 * i.rec.comments));
    const popMax = Math.max(1e-9, ...pops);
    const target = hexToRgb(state.color);
    const dist = items.map((i) => {
      const c = i.avgColor || [128, 128, 128];
      return Math.hypot(c[0] - target[0], c[1] - target[1], c[2] - target[2]);
    });
    const [dLo, dHi] = minmax(dist);
    const mp = items.map((i) => (i.rec.width * i.rec.height) / 1e6);
    const [mLo, mHi] = minmax(mp);
    const kw = items.map((i) => keywordRaw(i.rec, state.query));
    const kwMax = Math.max(1e-9, ...kw.map((k) => k.raw));

    return items.map((it, idx) => {
      const e = it.rec;
      const signals = {
        recency: e.date ? norm(e.date.getTime(), dates[0], dates[1]) : 0,
        popularity: pops[idx] / popMax,
        keyword: kw[idx].raw / kwMax,
        colour: 1 - norm(dist[idx], dLo, dHi),
        camera: e.hasCamera ? 1 : 0,
        ai: e.aiDeclared ? 1 : 0,
        gps: e.hasGPS ? 1 : 0,
        resolution: norm(mp[idx], mLo, mHi),
        completeness: Math.min(1, fieldsPresent(e) / 9),
        noise: hash01(it.id, state.seed || 0)
      };
      return { id: it.id, signals, queryMatch: kw[idx].raw > 0, spam: kw[idx].spam };
    });
  }

  function rank(items, state) {
    const sig = computeSignals(items, state);
    const rows = items.map((it, i) => {
      const s = sig[i];
      const contributions = SIGNALS.map((d) => {
        const w = (state.weights[d.key] || 0) / 100;
        return { key: d.key, signal: s.signals[d.key], weight: state.weights[d.key] || 0, value: w * s.signals[d.key] };
      });
      const score = contributions.reduce((a, c) => a + c.value, 0);
      return { item: it, score, contributions, queryMatch: s.queryMatch, spam: s.spam };
    });
    const q = queryWords(state.query).length > 0;
    const shown = rows.filter((r) => !(q && state.onlyMatches && !r.queryMatch));
    shown.sort((a, b) => b.score - a.score || (a.item.id < b.item.id ? -1 : 1));
    return shown;
  }

  function defaultState() {
    return { weights: Object.assign({}, PRESETS[0].weights), query: '', onlyMatches: true, color: '#2f5fd0', seed: 1 };
  }

  function encodeState(state) {
    const json = JSON.stringify({ w: state.weights, q: state.query, o: state.onlyMatches ? 1 : 0, c: state.color, s: state.seed });
    const b64 = typeof btoa === 'function' ? btoa(unescape(encodeURIComponent(json))) : Buffer.from(json, 'utf8').toString('base64');
    return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  function decodeState(str) {
    try {
      const b64 = str.replace(/-/g, '+').replace(/_/g, '/');
      const json = typeof atob === 'function' ? decodeURIComponent(escape(atob(b64))) : Buffer.from(b64, 'base64').toString('utf8');
      const o = JSON.parse(json);
      const s = defaultState();
      if (o.w && typeof o.w === 'object') s.weights = {};
      for (const d of SIGNALS) if (o.w && typeof o.w[d.key] === 'number') s.weights[d.key] = Math.max(-100, Math.min(100, o.w[d.key]));
      if (typeof o.q === 'string') s.query = o.q;
      if (o.o != null) s.onlyMatches = !!o.o;
      if (typeof o.c === 'string') s.color = o.c;
      if (typeof o.s === 'number') s.seed = o.s;
      return s;
    } catch (err) {
      return null;
    }
  }

  return { SIGNALS, PRESETS, derive, effective, keywordRaw, computeSignals, rank, defaultState, encodeState, decodeState, hexToRgb };
});
