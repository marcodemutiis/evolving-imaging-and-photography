/* jpegedit.js: write metadata into a JPEG, the way a metadata editor does.
 *
 * EXIF fields (camera, date, GPS, software, author, copyright) are rewritten with piexifjs.
 * Title, description, keywords and the "AI-generated" flag go into an XMP block (UTF-8).
 * The old XMP block and the old IPTC block are removed, so that the file does not say two different things.
 * The image data itself is not touched.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory(require('./vendor/piexif.js'));
  else root.JpegEdit = factory(root.piexif);
})(typeof self !== 'undefined' ? self : this, function (piexif) {
  const AI_URL = 'http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia';
  const XMP_ID = 'http://ns.adobe.com/xap/1.0/\0';
  const XMP_EXT_ID = 'http://ns.adobe.com/xmp/extension/\0';
  const PS_ID = 'Photoshop 3.0\0';

  function toBin(bytes) {
    let s = '';
    for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
    return s;
  }
  function toBytes(bin) {
    const b = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) b[i] = bin.charCodeAt(i);
    return b;
  }
  // EXIF text fields are plain ASCII
  const ascii = (s) => String(s == null ? '' : s).normalize('NFKD').replace(/[^\x20-\x7e]/g, '').trim();
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const has = (b, off, str) => { for (let i = 0; i < str.length; i++) if (b[off + i] !== str.charCodeAt(i)) return false; return true; };

  function xmpPacket(f) {
    const title = (f.title || '').trim();
    const desc = (f.description || '').trim();
    const kws = (f.keywords || []).map((k) => String(k).trim()).filter(Boolean);
    if (!title && !desc && !kws.length && !f.ai) return '';
    let x = '<?xpacket begin="﻿" id="W5M0MpCehiHzreSzNTczkc9d"?>\n<x:xmpmeta xmlns:x="adobe:ns:meta/"><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">' +
      '<rdf:Description rdf:about="" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:Iptc4xmpExt="http://iptc.org/std/Iptc4xmpExt/2008-02-29/">';
    if (title) x += '<dc:title><rdf:Alt><rdf:li xml:lang="x-default">' + esc(title) + '</rdf:li></rdf:Alt></dc:title>';
    if (desc) x += '<dc:description><rdf:Alt><rdf:li xml:lang="x-default">' + esc(desc) + '</rdf:li></rdf:Alt></dc:description>';
    if (kws.length) x += '<dc:subject><rdf:Bag>' + kws.map((k) => '<rdf:li>' + esc(k) + '</rdf:li>').join('') + '</rdf:Bag></dc:subject>';
    if (f.ai) x += '<Iptc4xmpExt:DigitalSourceType>' + AI_URL + '</Iptc4xmpExt:DigitalSourceType>';
    x += '</rdf:Description></rdf:RDF></x:xmpmeta>\n<?xpacket end="w"?>';
    return x;
  }

  function segmentsOf(b) {
    const segs = [];
    let i = 2;
    while (i + 3 < b.length && b[i] === 0xff) {
      const m = b[i + 1];
      if (m === 0xda || m === 0xd9) break;
      if (m === 0xff) { i++; continue; }
      const len = (b[i + 2] << 8) | b[i + 3];
      segs.push({ m, start: i, end: i + 2 + len });
      i += 2 + len;
    }
    return { segs, scanStart: i };
  }

  /* bytes: Uint8Array of a JPEG. f: { make, model, software, artist, copyright, description, title, keywords[],
     date ('YYYY-MM-DDTHH:MM' or ''), lat, lon (numbers or null), ai (bool) }. Returns a new Uint8Array. */
  function edit(bytes, f) {
    if (!(bytes[0] === 0xff && bytes[1] === 0xd8)) throw new Error('not a JPEG');
    const bin = toBin(bytes);
    let exif;
    try { exif = piexif.load(bin); } catch (e) { exif = { '0th': {}, Exif: {}, GPS: {}, '1st': {}, thumbnail: null }; }
    exif['0th'] = exif['0th'] || {}; exif.Exif = exif.Exif || {}; exif.GPS = {};

    const set = (ifd, tag, val) => { if (val) ifd[tag] = val; else delete ifd[tag]; };
    set(exif['0th'], piexif.ImageIFD.Make, ascii(f.make));
    set(exif['0th'], piexif.ImageIFD.Model, ascii(f.model));
    set(exif['0th'], piexif.ImageIFD.Software, ascii(f.software));
    set(exif['0th'], piexif.ImageIFD.Artist, ascii(f.artist));
    set(exif['0th'], piexif.ImageIFD.Copyright, ascii(f.copyright));
    set(exif['0th'], piexif.ImageIFD.ImageDescription, ascii(f.description)); // plain-ASCII copy; the full text is in XMP
    const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(f.date || '');
    set(exif.Exif, piexif.ExifIFD.DateTimeOriginal, m ? m[1] + ':' + m[2] + ':' + m[3] + ' ' + m[4] + ':' + m[5] + ':00' : '');
    if (typeof f.lat === 'number' && typeof f.lon === 'number' && isFinite(f.lat) && isFinite(f.lon) && Math.abs(f.lat) <= 90 && Math.abs(f.lon) <= 180) {
      exif.GPS[piexif.GPSIFD.GPSVersionID] = [2, 0, 0, 0];
      exif.GPS[piexif.GPSIFD.GPSLatitudeRef] = f.lat < 0 ? 'S' : 'N';
      exif.GPS[piexif.GPSIFD.GPSLatitude] = piexif.GPSHelper.degToDmsRational(Math.abs(f.lat));
      exif.GPS[piexif.GPSIFD.GPSLongitudeRef] = f.lon < 0 ? 'W' : 'E';
      exif.GPS[piexif.GPSIFD.GPSLongitude] = piexif.GPSHelper.degToDmsRational(Math.abs(f.lon));
    }
    const withExif = toBytes(piexif.insert(piexif.dump(exif), bin));

    // second pass: drop the old XMP and IPTC blocks, add the new XMP block after the EXIF block
    const { segs, scanStart } = segmentsOf(withExif);
    const xmp = xmpPacket(f);
    let xmpSeg = null;
    if (xmp) {
      const body = new TextEncoder().encode(xmp);
      const len = XMP_ID.length + body.length + 2;
      if (len > 0xffff) throw new Error('The metadata is too long for one XMP block. Shorten the description or the keywords.');
      xmpSeg = new Uint8Array(2 + len);
      xmpSeg[0] = 0xff; xmpSeg[1] = 0xe1; xmpSeg[2] = len >> 8; xmpSeg[3] = len & 0xff;
      for (let i = 0; i < XMP_ID.length; i++) xmpSeg[4 + i] = XMP_ID.charCodeAt(i);
      xmpSeg.set(body, 4 + XMP_ID.length);
    }
    const parts = [withExif.subarray(0, 2)];
    let placed = !xmpSeg;
    for (const s of segs) {
      const isXmp = s.m === 0xe1 && (has(withExif, s.start + 4, XMP_ID) || has(withExif, s.start + 4, XMP_EXT_ID));
      const isIptc = s.m === 0xed && has(withExif, s.start + 4, PS_ID);
      if (isXmp || isIptc) continue;
      parts.push(withExif.subarray(s.start, s.end));
      if (!placed && s.m === 0xe1 && has(withExif, s.start + 4, 'Exif\0\0')) { parts.push(xmpSeg); placed = true; }
    }
    if (!placed) parts.splice(1, 0, xmpSeg);
    parts.push(withExif.subarray(scanStart));
    const total = parts.reduce((n, p) => n + p.length, 0);
    const out = new Uint8Array(total);
    let o = 0;
    for (const p of parts) { out.set(p, o); o += p.length; }
    return out;
  }

  return { edit, AI_URL };
});
