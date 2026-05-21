import { playSound } from './audio.js';

const $html = $('html');
let isOpening = false;
const OPEN_MS = 650;

function isDesktop() {
  return window.matchMedia('(min-width: 992px)').matches;
}

export function runProgress() {
  const $bar = $('#nprogress-bar');
  $bar.css('width', '0%');
  requestAnimationFrame(() => {
    $bar.css('width', '70%');
    setTimeout(() => {
      $bar.css('width', '100%');
      setTimeout(() => $bar.css('width', '0%'), 280);
    }, 380);
  });
}

function clearCardInline($card) {
  const el = $card[0];
  if (!el) return;
  ['transition', 'transform', 'transform-style', 'backface-visibility', '-webkit-backface-visibility'].forEach(
    (prop) => el.style.removeProperty(prop)
  );
}

/** WebKit: keep face visible after open without killing the CSS transform transition */
function ensureCardFaceVisible($card) {
  const el = $card[0];
  if (!el) return;
  el.style.setProperty('backface-visibility', 'visible', 'important');
  el.style.setProperty('-webkit-backface-visibility', 'visible', 'important');
}

function finishOpen(resolve) {
  $html.addClass('is-card-opened');
  $('#cover-close').addClass('is-visible');
  $('#nprogress-spinner').attr('aria-hidden', 'true');
  isOpening = false;
  resolve();
}

export function openCard() {
  if ($html.hasClass('is-card-open') || isOpening) return Promise.resolve();

  if (!isDesktop()) {
    $html.addClass('is-card-open is-card-opened');
    $('#cover-close').addClass('is-visible');
    return Promise.resolve();
  }

  isOpening = true;
  playSound('wind');
  $('#nprogress-spinner').attr('aria-hidden', 'false');
  runProgress();

  const $card = $('#card');
  clearCardInline($card);

  return new Promise((resolve) => {
    let done = false;
    const complete = () => {
      if (done) return;
      done = true;
      $card.off('transitionend', onTransitionEnd);
      ensureCardFaceVisible($card);
      finishOpen(resolve);
    };

    const onTransitionEnd = (e) => {
      if (e.target !== $card[0]) return;
      if (e.propertyName !== 'transform' && e.propertyName !== '-webkit-transform') return;
      complete();
    };

    $card.on('transitionend', onTransitionEnd);
    // Same #card: layout.css 3D → flat (0.6s) — do not flatten in JS before transition
    $html.addClass('is-card-open');

    setTimeout(complete, OPEN_MS + 80);
  });
}

function clearRouteHash() {
  if (window.location.hash && window.location.hash !== '#/') {
    history.replaceState(null, '', location.pathname + location.search);
  }
}

export function closeCard() {
  if (!$html.hasClass('is-card-open')) return;
  playSound('windReverse');

  $(document).trigger('card:reset-intro');
  $('#cover-close').removeClass('is-visible');
  $html.removeClass('is-card-opened is-ajax-page-active is-ajax-page-loaded');
  clearRouteHash();

  const $card = $('#card');
  clearCardInline($card);
  // Restore intro 3D pose via CSS (unrovr-layout .card rules)
  $html.removeClass('is-card-open');
}

function preloadCover() {
  const url = $('.cover-media').data('image-url') || '/cover.jpg';
  const img = new Image();
  const done = () => {
    $('#nprogress-spinner').attr('aria-hidden', 'true');
  };
  img.onload = () => {
    $html.addClass('is-card-loaded');
    $('.cover-media')
      .addClass('is-image-loaded')
      .css('background-image', `url(${url})`);
    $('.card-3d-right-side, .card-3d-bottom-side').css('background-image', `url(${url})`);
    if (!isDesktop() && !$html.hasClass('is-ajax-page-active')) {
      $('.cover-media').height($(window).height());
    }
    done();
  };
  img.onerror = () => {
    $html.addClass('is-card-loaded');
    done();
  };
  img.src = url;
}

export function initCard3D() {
  preloadCover();

  $(window).on('resize', () => {
    if (isDesktop()) {
      $('.cover-media').css('height', '');
    } else if ($html.hasClass('is-card-loaded') && !$html.hasClass('is-ajax-page-active')) {
      $('.cover-media').height($(window).height());
    }
  });

  async function openIntroCard(e) {
    e.preventDefault();
    $(document).trigger('card:reset-intro');
    clearRouteHash();
    await openCard();
  }

  $('#discover-btn, #cover-link').on('click', openIntroCard);

  $('#card').on('click', (e) => {
    if ($html.hasClass('is-card-open')) return;
    if ($(e.target).closest('.card-nav a, .card-info a').length) return;
    openIntroCard(e);
  });

  $('#cover-close').on('click', (e) => {
    e.preventDefault();
    closeCard();
  });
}
