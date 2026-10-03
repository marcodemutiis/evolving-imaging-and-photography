/* Fullscreen image viewer for lesson pages.
   Click any image in the lesson content -> fullscreen.
   Left/Right arrows (or swipe, or on-screen buttons) -> previous/next image in page order.
   Esc, click on the background, or the close button -> back to the page. */
(function () {
  'use strict';

  function injectStyles() {
    if (document.getElementById('lb-styles')) return;
    var s = document.createElement('style');
    s.id = 'lb-styles';
    s.textContent = '/* ============================================\n   FULLSCREEN IMAGE VIEWER (lessons)\n   ============================================ */\n.page-content img { cursor: zoom-in; }\n\nhtml.lb-lock { overflow: hidden; }\n\n.lb-overlay {\n  position: fixed;\n  inset: 0;\n  z-index: 1000;\n  display: none;\n  align-items: center;\n  justify-content: center;\n  background: rgba(0, 0, 0, 0.96);\n}\n.lb-overlay.lb-open { display: flex; }\n\n.lb-figure {\n  margin: 0;\n  max-width: 100vw;\n  max-height: 100vh;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 3.5rem 5rem 1rem;\n  box-sizing: border-box;\n}\n.lb-img {\n  max-width: 100%;\n  max-height: calc(100vh - 9rem);\n  width: auto;\n  height: auto;\n  object-fit: contain;\n  border-radius: 0;\n  margin: 0;\n  cursor: default;\n}\n.lb-caption {\n  margin: 0.9rem 0 0;\n  max-width: 60rem;\n  color: rgba(255, 255, 255, 0.75);\n  font-size: 0.9rem;\n  line-height: 1.5;\n  text-align: center;\n}\n.lb-caption em { font-style: italic; }\n\n.lb-count {\n  position: absolute;\n  top: 1rem;\n  left: 1.25rem;\n  color: rgba(255, 255, 255, 0.5);\n  font-family: var(--font-mono, monospace);\n  font-size: 0.8rem;\n}\n\n.lb-btn {\n  position: absolute;\n  background: none;\n  border: 0;\n  color: rgba(255, 255, 255, 0.7);\n  cursor: pointer;\n  font-size: 1.2rem;\n  line-height: 1;\n  padding: 0.5rem 1rem;\n}\n.lb-btn:hover:not(:disabled) { color: #fff; }\n.lb-btn:disabled { opacity: 0.2; cursor: default; }\n.lb-close { top: 0.25rem; right: 0.5rem; font-size: 1rem; }\n.lb-prev { left: 0.25rem; top: 50%; transform: translateY(-50%); }\n.lb-next { right: 0.25rem; top: 50%; transform: translateY(-50%); }\n\n@media (max-width: 600px) {\n  .lb-figure { padding: 3.5rem 0.5rem 1rem; }\n  .lb-btn.lb-prev, .lb-btn.lb-next { display: none; } /* swipe on touch screens */\n}\n';
    document.head.appendChild(s);
  }

  injectStyles();

  var overlay, imgEl, capEl, countEl, prevBtn, nextBtn, closeBtn;
  var images = [];
  var index = 0;
  var lastFocus = null;
  var touchX = null;

  // Only images that are currently visible (respects the EN/DE language toggle),
  // in the order they appear on the page.
  function collectImages() {
    var all = document.querySelectorAll('.page-content img');
    return Array.prototype.filter.call(all, function (im) {
      return im.offsetParent !== null && im.offsetWidth > 0;
    });
  }

  function captionFor(im) {
    // Kramdown usually closes the <p> before <figcaption>, so the caption is
    // a sibling of the image's paragraph rather than of the image itself.
    function isCap(el) { return el && el.tagName === 'FIGCAPTION'; }
    var n = im.nextElementSibling;
    while (n && n.tagName === 'BR') n = n.nextElementSibling;
    if (isCap(n)) return n.innerHTML;                      // inside the same <p>
    var p = im.parentElement;
    if (p && !isCap(p) && isCap(p.nextElementSibling)) {   // right after the <p>
      return p.nextElementSibling.innerHTML;
    }
    var fig = im.closest('figure');                        // real <figure> markup
    var fc = fig && fig.querySelector('figcaption');
    return fc ? fc.innerHTML : '';
  }

  function build() {
    overlay = document.createElement('div');
    overlay.className = 'lb-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Image viewer');
    overlay.innerHTML =
      '<button class="lb-btn lb-close" aria-label="Close">&times;</button>' +
      '<button class="lb-btn lb-prev" aria-label="Previous image">&#8249;</button>' +
      '<button class="lb-btn lb-next" aria-label="Next image">&#8250;</button>' +
      '<figure class="lb-figure"><img class="lb-img" alt="">' +
      '<figcaption class="lb-caption"></figcaption></figure>' +
      '<div class="lb-count"></div>';
    document.body.appendChild(overlay);

    imgEl = overlay.querySelector('.lb-img');
    capEl = overlay.querySelector('.lb-caption');
    countEl = overlay.querySelector('.lb-count');
    prevBtn = overlay.querySelector('.lb-prev');
    nextBtn = overlay.querySelector('.lb-next');
    closeBtn = overlay.querySelector('.lb-close');

    prevBtn.addEventListener('click', function (e) { e.stopPropagation(); step(-1); });
    nextBtn.addEventListener('click', function (e) { e.stopPropagation(); step(1); });
    closeBtn.addEventListener('click', function (e) { e.stopPropagation(); close(); });
    // click on the dark background (not on the image/caption/buttons) closes
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay || e.target.classList.contains('lb-figure')) close();
    });

    overlay.addEventListener('touchstart', function (e) {
      touchX = e.changedTouches[0].clientX;
    }, { passive: true });
    overlay.addEventListener('touchend', function (e) {
      if (touchX === null) return;
      var dx = e.changedTouches[0].clientX - touchX;
      touchX = null;
      if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
    }, { passive: true });
  }

  function show(i) {
    index = Math.max(0, Math.min(images.length - 1, i));
    var src = images[index];
    imgEl.src = src.currentSrc || src.src;
    imgEl.alt = src.alt || '';
    var cap = captionFor(src);
    capEl.innerHTML = cap;
    capEl.style.display = cap ? '' : 'none';
    countEl.textContent = (index + 1) + ' / ' + images.length;
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === images.length - 1;

    // preload neighbours so arrow navigation feels instant
    [index - 1, index + 1].forEach(function (j) {
      if (images[j]) { var pre = new Image(); pre.src = images[j].currentSrc || images[j].src; }
    });
  }

  function step(d) {
    var next = index + d;
    if (next < 0 || next >= images.length) return;
    show(next);
  }

  function open(clicked) {
    if (!overlay) build();
    images = collectImages();
    var i = images.indexOf(clicked);
    if (i === -1) return;
    lastFocus = document.activeElement;
    show(i);
    overlay.classList.add('lb-open');
    document.documentElement.classList.add('lb-lock');
    closeBtn.focus();
  }

  function close() {
    if (!overlay || !overlay.classList.contains('lb-open')) return;
    var current = images[index];
    overlay.classList.remove('lb-open');
    document.documentElement.classList.remove('lb-lock');
    imgEl.removeAttribute('src');
    // bring the page to the image you ended on
    if (current && current.scrollIntoView) current.scrollIntoView({ block: 'center' });
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  document.addEventListener('click', function (e) {
    var t = e.target;
    if (t.tagName !== 'IMG' || !t.closest('.page-content')) return;
    // don't hijack images that are links
    if (t.closest('a')) return;
    open(t);
  });

  document.addEventListener('keydown', function (e) {
    if (!overlay || !overlay.classList.contains('lb-open')) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
    else if (e.key === 'Escape') { e.preventDefault(); close(); }
    else if (e.key === 'Home') { e.preventDefault(); show(0); }
    else if (e.key === 'End') { e.preventDefault(); show(images.length - 1); }
  });
})();
