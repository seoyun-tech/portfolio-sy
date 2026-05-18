import { pages } from './pages.js';
import { playSound } from './audio.js';
import { initCard3D, openCard, runProgress } from './card3d.js';
import { initPortfolioMasonry } from './masonry.js';
import { initPortfolioMagnific } from './portfolio-magnific.js';
import {
  parseHash,
  bindPortfolioAjax,
  showProjectDetails,
  closePortfolioDetail,
  consumePortfolioJustClosed,
  isPortfolioDetailOpen,
} from './portfolio-detail.js';
import { fillSkillBars, resetSkillBars } from './fillBars.js';
import { initContactForm } from './contact.js';

const $html = $('html');
const $cardContent = $('#card-content');
const $pageRoot = $cardContent;
const $navLinks = $('.card-nav a[data-route]');
let prevRoute = '';
let destroyPortfolio = null;
let pendingPortfolioDetail = '';
const AJAX_OUT_MS = 400;

function parseRoute() {
  return parseHash().route;
}

function setActiveNav(route) {
  $navLinks.each(function() {
    $(this).closest('li').toggleClass('current_page_item', $(this).data('route') === route);
  });
}

function whenImagesReady(el, cb, maxWaitMs = 2500) {
  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    cb();
  };

  const imgs = [...el.querySelectorAll('img')];
  if (!imgs.length) {
    finish();
    return;
  }

  let pending = imgs.length;
  const tick = () => {
    if (--pending <= 0) finish();
  };

  imgs.forEach((img) => {
    if (img.complete) tick();
    else {
      img.addEventListener('load', tick, { once: true });
      img.addEventListener('error', tick, { once: true });
    }
  });

  window.setTimeout(finish, maxWaitMs);
}

function teardownPortfolio() {
  destroyPortfolio?.();
  destroyPortfolio = null;
}

function showAjaxPage(route) {
  const { detail } = parseHash();
  if (prevRoute === route && $html.hasClass('is-ajax-page-active') && !(route === 'portfolio' && detail)) {
    return;
  }

  const wasAjax = $html.hasClass('is-ajax-page-active') && prevRoute;
  if (prevRoute === 'portfolio') {
    if (route !== 'portfolio') closePortfolioDetail(false);
    teardownPortfolio();
  }

  playSound('tick');
  if (wasAjax) runProgress();

  const loadPage = () => {
    resetSkillBars($cardContent[0]);
    $cardContent.removeAttr('hidden').addClass('is-changing');
    if (!$html.hasClass('is-ajax-page-active')) {
      $html.addClass('is-ajax-page-active');
    }
    $html.addClass('is-ajax-page-loaded');

    $pageRoot.html(`<article class="hentry">${pages[route]}</article>`);
    setActiveNav(route);
    document.title = `${route.replace('-', ' ')} – Park Seo‑yun`;

    whenImagesReady($cardContent[0], () => {
      if (!$html.hasClass('is-ajax-page-active')) return;
      requestAnimationFrame(() => {
        $cardContent.removeClass('is-changing').addClass('is-loaded');
        fillSkillBars($cardContent[0]);
        initPageWidgets(route);
        window.setTimeout(() => initPageWidgets(route), 400);
        const { detail } = parseHash();
        if (route === 'portfolio' && detail) {
          showProjectDetails(detail);
        } else if (route === 'portfolio' && pendingPortfolioDetail) {
          showProjectDetails(pendingPortfolioDetail);
          pendingPortfolioDetail = '';
        }
      });
    });
  };

  if (wasAjax) {
    resetSkillBars($cardContent[0]);
    $cardContent.removeClass('is-loaded');
    void $cardContent[0].offsetHeight;
    window.setTimeout(loadPage, AJAX_OUT_MS);
  } else {
    $cardContent.removeClass('is-loaded').addClass('is-changing');
    loadPage();
  }

  prevRoute = route;
}

function closeAjaxPage() {
  closePortfolioDetail(false);
  teardownPortfolio();
  resetSkillBars($cardContent[0]);
  $pageRoot.empty();
  $cardContent.removeClass('is-loaded is-changing').attr('hidden', '');
  $html.removeClass('is-ajax-page-loaded is-ajax-page-active');
  setActiveNav('');
  document.title = 'Park Seo‑yun – UI / UX Designer';
  prevRoute = '';
  window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
}

function render(route) {
  if (!$html.hasClass('is-card-open')) return;

  if (!route || !pages[route]) {
    if ($html.hasClass('is-ajax-page-active')) closeAjaxPage();
    return;
  }

  showAjaxPage(route);
}

function initPageWidgets(route) {
  if (route === 'portfolio') {
    destroyPortfolio = initPortfolioMasonry($cardContent[0]);
    const $hentry = $pageRoot.find('.hentry');
    bindPortfolioAjax($hentry);
    const destroyMagnific = initPortfolioMagnific($cardContent[0]);
    const prevDestroy = destroyPortfolio;
    destroyPortfolio = () => {
      prevDestroy?.();
      destroyMagnific();
    };
  }

  initContactForm($pageRoot.find('.contact-form')[0]);
}

async function navigateTo(route) {
  if (!$html.hasClass('is-card-open')) await openCard();
  window.location.hash = route ? `#/${route}` : '#/';
}

$navLinks.on('click', function(e) {
  e.preventDefault();
  navigateTo($(this).data('route'));
});

function scrollToCardTop(e) {
  e.preventDefault();
  const el = document.getElementById('card');
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

$(document).on('click', '#card-go-top, .card-footer .go-top', scrollToCardTop);

$(window).on('hashchange', async () => {
  const { route, detail } = parseHash();

  if (detail && route === 'portfolio') {
    if (!$html.hasClass('is-card-opened')) await openCard();
    if (!$html.hasClass('is-ajax-page-active') || prevRoute !== 'portfolio') {
      pendingPortfolioDetail = detail;
      render('portfolio');
      return;
    }
    showProjectDetails(detail);
    return;
  }

  if (consumePortfolioJustClosed()) return;

  if (isPortfolioDetailOpen()) closePortfolioDetail(false);

  if (route && !$html.hasClass('is-card-opened')) await openCard();
  render(route);
});

$(document).on('portfolio:ajax-reset', () => {
  closePortfolioDetail(false);
  teardownPortfolio();
  prevRoute = '';
});

$(document).ready(async () => {
  initCard3D();

  const { route, detail } = parseHash();
  if (route) {
    await openCard();
    if (detail && route === 'portfolio') pendingPortfolioDetail = detail;
    render(route);
  }
});
