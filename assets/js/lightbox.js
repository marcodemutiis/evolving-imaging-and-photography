/* Fullscreen image viewer for lesson pages.
   Click any image in the lesson content -> fullscreen.
   Left/Right arrows (or swipe, or on-screen buttons) -> previous/next image in page order.
   Esc, click on the background, or the close button -> back to the page. */
(function () {
  'use strict';

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
    // figcaption follows the image (sits outside the <img> tag)
    var n = im.nextElementSibling;
    while (n && n.tagName === 'BR') n = n.nextElementSibling;
    if (n && n.tagName === 'FIGCAPTION') return n.innerHTML;
    var p = im.parentElement;
    var fc = p && p.querySelector('figcaption');
    return fc ? fc.innerHTML : (im.getAttribute('alt') || '');
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
