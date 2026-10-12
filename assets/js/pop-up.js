/*
  PETIFY photo pop-up  (self-contained: this one file adds its own styles)

  Click a pet photo (profile photo or gallery photo) to enlarge it.
  Works with local images and online links (https://...).
  Close with the big red X, a click on the dark backdrop, or the Esc key.
  Site logos and icons are not affected.
*/
(function () {
  'use strict';

  var PHOTO_SELECTOR = 'img[data-popup], .pet-identity__photo img, .profile-gallery__item img';

  // ---------- Styles (injected, so no CSS file needs to be updated) ----------
  var css = '' +
    '.pet-identity__photo img,.profile-gallery__item,.profile-gallery__item img,img[data-popup]{cursor:zoom-in}' +
    '.pet-identity__photo img:focus-visible,.profile-gallery__item img:focus-visible,img[data-popup]:focus-visible{outline:3px solid #0747b8;outline-offset:3px}' +
    'body.photo-popup-open{overflow:hidden}' +
    '.photo-popup{position:fixed;top:0;right:0;bottom:0;left:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;box-sizing:border-box;padding:clamp(1rem,4vw,3rem);background:rgba(10,18,40,.9);opacity:0;visibility:hidden;transition:opacity .2s ease,visibility 0s linear .2s}' +
    '.photo-popup.is-open{opacity:1;visibility:visible;transition:opacity .2s ease}' +
    '.photo-popup__img{display:block;max-width:min(100%,56rem);max-height:100%;width:auto;height:auto;object-fit:contain;border:4px solid #fff;border-radius:10px;background:#fff;box-shadow:0 24px 60px -12px rgba(0,0,0,.6);transform:scale(.92);transition:transform .22s ease}' +
    '.photo-popup.is-open .photo-popup__img{transform:scale(1)}' +
    '.photo-popup__img[hidden],.photo-popup__error[hidden]{display:none}' +
    '.photo-popup__close{position:absolute;top:max(.9rem,env(safe-area-inset-top));right:max(.9rem,env(safe-area-inset-right));z-index:2;display:flex;align-items:center;justify-content:center;box-sizing:border-box;width:3.25rem;height:3.25rem;padding:0;border:3px solid #fff;border-radius:50%;color:#fff;background:#e5232b;box-shadow:0 6px 18px rgba(0,0,0,.5);cursor:pointer;transition:transform .15s ease,filter .15s ease}' +
    '.photo-popup__close svg{width:1.5rem;height:1.5rem;display:block}' +
    '.photo-popup__close:hover{transform:scale(1.08);filter:brightness(.92)}' +
    '.photo-popup__close:focus-visible{outline:3px solid #ffc516;outline-offset:3px}' +
    '.photo-popup__error{max-width:28rem;margin:0;padding:1rem 1.25rem;border-radius:10px;color:#13213f;background:#fff;font:600 1rem/1.4 system-ui,sans-serif;text-align:center}' +
    '@media (max-width:440px){.photo-popup__close{width:3rem;height:3rem}.photo-popup__img{border-width:3px}}' +
    '@media (prefers-reduced-motion:reduce){.photo-popup,.photo-popup__img,.photo-popup__close{transition:none}}';

  function init() {
    var style = document.createElement('style');
    style.id = 'photo-popup-styles';
    style.textContent = css;
    document.head.appendChild(style);

    // ---------- Build the pop-up once ----------
    var popup = document.createElement('div');
    popup.className = 'photo-popup';
    popup.setAttribute('role', 'dialog');
    popup.setAttribute('aria-modal', 'true');
    popup.setAttribute('aria-label', 'Enlarged photo');
    popup.setAttribute('aria-hidden', 'true');
    popup.innerHTML =
      '<button type="button" class="photo-popup__close" aria-label="Close photo">' +
        '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
          '<path d="M5 5l14 14M19 5L5 19" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/>' +
        '</svg>' +
      '</button>' +
      '<img class="photo-popup__img" alt="" hidden>' +
      '<p class="photo-popup__error" role="alert" hidden>Sorry, this photo couldn\u2019t be loaded.</p>';
    document.body.appendChild(popup);

    var closeBtn = popup.querySelector('.photo-popup__close');
    var bigImg = popup.querySelector('.photo-popup__img');
    var errorMsg = popup.querySelector('.photo-popup__error');
    var lastTrigger = null;
    var retried = false;

    bigImg.addEventListener('load', function () {
      bigImg.hidden = false;
      errorMsg.hidden = true;
    });

    // Some hosts reject requests that carry a referrer: retry once without it.
    bigImg.addEventListener('error', function () {
      var src = bigImg.getAttribute('src');
      if (!retried && src) {
        retried = true;
        bigImg.referrerPolicy = 'no-referrer';
        bigImg.src = src;
        return;
      }
      bigImg.hidden = true;
      errorMsg.hidden = false;
    });

    // ---------- Open / close ----------
    function open(img) {
      var src = img.currentSrc || img.src;
      if (!src) return;
      lastTrigger = img;
      retried = false;
      errorMsg.hidden = true;
      bigImg.hidden = false;
      bigImg.referrerPolicy = img.referrerPolicy || '';
      bigImg.alt = img.alt || '';
      bigImg.src = src;

      popup.setAttribute('aria-label', img.alt || 'Enlarged photo');
      popup.setAttribute('aria-hidden', 'false');
      popup.classList.add('is-open');
      document.body.classList.add('photo-popup-open');
      closeBtn.focus();
    }

    function close() {
      if (!popup.classList.contains('is-open')) return;
      popup.classList.remove('is-open');
      popup.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('photo-popup-open');
      if (lastTrigger && lastTrigger.focus) lastTrigger.focus({ preventScroll: true });
    }

    // ---------- Which photo was clicked? ----------
    // Delegated (capture phase), so it keeps working if an <img> is swapped
    // or added later, and other scripts cannot swallow the click.
    function photoFrom(target) {
      if (!target || !target.closest || popup.contains(target)) return null;
      var direct = target.closest(PHOTO_SELECTOR);
      if (direct) return direct;
      var tile = target.closest('.profile-gallery__item');
      return tile ? tile.querySelector('img') : null;
    }

    document.addEventListener('click', function (e) {
      var img = photoFrom(e.target);
      if (img) {
        e.preventDefault();
        open(img);
      }
    }, true);

    document.addEventListener('keydown', function (e) {
      if (popup.classList.contains('is-open')) {
        if (e.key === 'Escape') close();
        if (e.key === 'Tab') { e.preventDefault(); closeBtn.focus(); }
        return;
      }
      if ((e.key === 'Enter' || e.key === ' ') && e.target.matches && e.target.matches(PHOTO_SELECTOR)) {
        e.preventDefault();
        open(e.target);
      }
    }, true);

    closeBtn.addEventListener('click', close);
    popup.addEventListener('click', function (e) {
      if (e.target === popup) close();
    });

    // ---------- Keyboard / screen-reader support ----------
    function enhance() {
      document.querySelectorAll(PHOTO_SELECTOR).forEach(function (img) {
        if (img.hasAttribute('data-popup-ready')) return;
        img.setAttribute('data-popup-ready', '');
        img.setAttribute('tabindex', '0');
        img.setAttribute('role', 'button');
        img.setAttribute('aria-haspopup', 'dialog');
      });
    }
    enhance();
    new MutationObserver(enhance).observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
