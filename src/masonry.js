import Isotope from 'isotope-layout';
import imagesLoaded from 'imagesloaded';
import { playSound } from './audio.js';

const ITEM_WIDTH = 340;

export function initPortfolioMasonry(root) {
  const showcase = root.querySelector('.portfolio-showcase[data-layout="showcase"]');
  if (showcase) return initPortfolioShowcase(root, showcase);

  const grid = root.querySelector('.media-grid.masonry');
  if (!grid) return () => {};

  let iso = null;
  let resizeTimer;

  function refreshMasonry() {
    if (!iso) return;
    const containerW = grid.offsetWidth;
    if (!containerW) return;

    const items = grid.querySelectorAll('.media-cell');
    const columns = Math.max(1, Math.round(containerW / ITEM_WIDTH));

    items.forEach((item) => {
      const multiplier = item.classList.contains('x2') && columns > 1 ? 2 : 1;
      const itemRealWidth = (Math.floor(containerW / columns) * 100) / containerW * multiplier;
      item.style.width = `${itemRealWidth}%`;
    });

    iso.option({ masonry: { columnWidth: Math.floor(containerW / columns) } });
    iso.layout();
  }

  function startIso() {
    iso = new Isotope(grid, {
      itemSelector: '.media-cell',
      layoutMode: 'masonry',
      percentPosition: true,
      masonry: { columnWidth: ITEM_WIDTH },
    });
    refreshMasonry();
  }

  let booted = false;
  const boot = () => {
    if (booted) return;
    booted = true;
    startIso();
    refreshMasonry();
  };

  imagesLoaded(grid, boot);
  window.setTimeout(boot, 400);

  const onResize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(refreshMasonry, 100);
  };
  window.addEventListener('resize', onResize);

  const filters = root.querySelector('.filters');
  if (filters) {
    filters.querySelectorAll('a').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        playSound('tick');
        const selector = anchor.getAttribute('data-filter') || '*';
        if (iso) iso.arrange({ filter: selector });
        filters.querySelectorAll('li').forEach((li) => li.classList.remove('current'));
        anchor.parentElement?.classList.add('current');
      });
    });
  }

  return () => {
    window.removeEventListener('resize', onResize);
    clearTimeout(resizeTimer);
    iso?.destroy();
    iso = null;
  };
}

function initPortfolioShowcase(root, grid) {
  const filters = root.querySelector('.filters');
  const items = [...grid.querySelectorAll('.portfolio-project-block')];
  const handlers = [];

  function applyFilter(selector) {
    items.forEach((item) => {
      item.hidden = selector !== '*' && !item.matches(selector);
    });
  }

  if (filters) {
    filters.querySelectorAll('a').forEach((anchor) => {
      const handler = (e) => {
        e.preventDefault();
        playSound('tick');
        const selector = anchor.getAttribute('data-filter') || '*';
        applyFilter(selector);
        filters.querySelectorAll('li').forEach((li) => li.classList.remove('current'));
        anchor.parentElement?.classList.add('current');
      };
      anchor.addEventListener('click', handler);
      handlers.push([anchor, handler]);
    });

    const current = filters.querySelector('li.current a') || filters.querySelector('a');
    applyFilter(current?.getAttribute('data-filter') || '*');
  }

  return () => {
    handlers.forEach(([anchor, handler]) => anchor.removeEventListener('click', handler));
  };
}
