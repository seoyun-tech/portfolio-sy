import { playSound } from './audio.js';
import { runProgress } from './card3d.js';
import imagesLoaded from 'imagesloaded';
import { portfolioDetails } from './portfolio-details.js';

const REMOTE_BASE = 'https://themes.pixelwars.org/unrovr/demo-01';
const FETCH_PREFIX = import.meta.env.DEV ? '/unrovr-proxy' : REMOTE_BASE;

let portfolioSingleActive = false;
let portfolioSingleJustClosed = false;
let loadToken = 0;

function onAnimEnd($el, cb, ms = 550) {
  let called = false;
  const done = () => {
    if (called) return;
    called = true;
    cb();
  };
  $el.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', done);
  window.setTimeout(done, ms);
}

$(document).on('keydown.portfolioDetail', (e) => {
  if (e.key === 'Escape' && portfolioSingleActive) closePortfolioDetail(true);
});

export function parseHash() {
  const raw = window.location.hash.replace(/^#\/?/, '');
  if (!raw || raw === '/') return { route: '', detail: '' };
  const parts = raw.split('/').filter(Boolean);
  const route = parts[0] || '';
  let detail = '';
  if (route === 'portfolio' && parts.length > 1) {
    detail = parts.slice(1).join('/').replace(/\/$/, '');
  }
  return { route, detail };
}

export function isPortfolioDetailOpen() {
  return portfolioSingleActive;
}

export function consumePortfolioJustClosed() {
  if (!portfolioSingleJustClosed) return false;
  portfolioSingleJustClosed = false;
  return true;
}

export function portfolioPathFromHref(href) {
  if (!href) return '';

  let path = href.trim();
  if (path.startsWith('#')) {
    path = path.replace(/^#\/?/, '');
  }

  const base = REMOTE_BASE.replace(/\/$/, '');
  if (path.startsWith('http')) {
    if (path.startsWith(base)) {
      return path.slice(base.length).replace(/^\//, '').replace(/\/$/, '');
    }
    return path;
  }

  return path.replace(/^\//, '').replace(/\/$/, '');
}

export function portfolioSlugFromHref(href) {
  const path = portfolioPathFromHref(href);
  return path.replace(/^portfolio\/?/, '').replace(/\/$/, '');
}

export function bindPortfolioAjax($root) {
  $root.find('.media-box .ajax').off('click.portfolioAjax').on('click.portfolioAjax', function (e) {
    e.preventDefault();
    const slug = portfolioSlugFromHref($(this).attr('href'));
    if (!slug) return;
    window.location.hash = `#/portfolio/${slug}`;
  });
}

export function bindPortfolioOverlayNav($overlay = $('.p-overlay.active')) {
  $overlay.off('click.portfolioNav').on('click.portfolioNav', '.portfolio-nav a', function (e) {
    const $a = $(this);
    if ($a.attr('target') === '_blank') return;

    e.preventDefault();

    if ($a.closest('.back').length || $a.attr('href') === '#/portfolio') {
      closePortfolioDetail(true);
      return;
    }

    if ($a.closest('.ajax').length || $a.hasClass('ajax')) {
      const slug = portfolioSlugFromHref($a.attr('href'));
      if (!slug) return;
      if (window.location.hash !== `#/portfolio/${slug}`) {
        window.location.hash = `#/portfolio/${slug}`;
      } else {
        showProjectDetails(slug);
      }
    }
  });
}

function patchPortfolioSingleHtml(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const single = doc.body.firstElementChild;
  if (!single) return html;

  single.querySelectorAll('.portfolio-nav a[href]').forEach((a) => {
    if (a.closest('.back')) {
      a.setAttribute('href', '#/portfolio');
      return;
    }
    const href = a.getAttribute('href') || '';
    if (href.includes('/portfolio/') || href.startsWith('#/portfolio/')) {
      const slug = portfolioSlugFromHref(href);
      if (slug) a.setAttribute('href', `#/portfolio/${slug}`);
    }
  });

  return single.outerHTML;
}

async function loadPortfolioSingleHtml(detailSlug) {
  const embedded = portfolioDetails[detailSlug];
  if (embedded) return patchPortfolioSingleHtml(embedded);

  const path = `portfolio/${detailSlug}/`;
  try {
    const res = await fetch(`${FETCH_PREFIX}/${path.replace(/^\//, '')}`);
    if (!res.ok) throw new Error(res.statusText);
    const doc = new DOMParser().parseFromString(await res.text(), 'text/html');
    const single = doc.querySelector('.portfolio-single');
    if (!single) throw new Error('missing .portfolio-single');
    return patchPortfolioSingleHtml(single.outerHTML);
  } catch {
    return `<div class="portfolio-single page-layout">
      <article class="hentry">
        <header class="entry-header"><h1 class="entry-title">${detailSlug}</h1></header>
        <div class="entry-content"><p>Could not load project details.</p></div>
      </article>
    </div>`;
  }
}

export async function showProjectDetails(detailSlug) {
  if (!detailSlug) return;

  const token = ++loadToken;
  const $html = $('html');
  const $next = $('.p-overlay:not(.active)').first();
  const $active = $('.p-overlay.active');

  portfolioSingleActive = true;
  runProgress();
  playSound('tick');

  const singleHtml = await loadPortfolioSingleHtml(detailSlug);
  if (token !== loadToken) return;

  $next.empty().html(singleHtml);

  imagesLoaded($next[0], () => {
    if (token !== loadToken) return;

    if ($active.length) {
      $active.removeClass('active animate-in').addClass('animate-out');
      window.setTimeout(() => {
        $active.removeClass('animate-out').empty().hide();
      }, 300);
    }

    $html.addClass('p-overlay-on p-animating');
    $next.removeClass('animate-out').addClass('animate-in active').css('display', 'block');
    $next[0].scrollTop = 0;
    window.scrollTo(0, 0);

    bindPortfolioOverlayNav($next);

    onAnimEnd($next, () => $html.removeClass('p-animating'));
  });
}

export function closePortfolioDetail(updateHash = true, safeClose = false) {
  const $active = $('.p-overlay.active');
  if (!$active.length && !portfolioSingleActive) return;

  const token = ++loadToken;
  const $html = $('html');

  portfolioSingleActive = false;
  playSound('tick');
  $html.removeClass('p-overlay-on').addClass('p-animating');

  $active.removeClass('active animate-in').addClass('animate-out').css('display', 'block');

  const finish = () => {
    if (token !== loadToken) return;
    $active.removeClass('animate-out active animate-in').empty().hide();
    $html.removeClass('p-animating');
  };

  onAnimEnd($active, finish);

  if (updateHash && !safeClose) {
    const { route } = parseHash();
    if (route === 'portfolio' && window.location.hash !== '#/portfolio') {
      portfolioSingleJustClosed = true;
      window.location.hash = '#/portfolio';
    }
  }
}

