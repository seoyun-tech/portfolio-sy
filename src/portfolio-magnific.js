import 'magnific-popup/dist/magnific-popup.css';
import { playSound } from './audio.js';

export function initPortfolioMagnific(root) {
  if (!$.fn.magnificPopup) return () => {};

  const $root = $(root);
  const $boxes = $root.find('.media-box, .gallery');

  $boxes.each(function () {
    const $media_box = $(this);
    if ($media_box.data('magnificPopup')) return;

    $media_box.magnificPopup({
      delegate:
        '.lightbox, .gallery-item a[href$=".jpg"], .gallery-item a[href$=".jpeg"], .gallery-item a[href$=".png"], .gallery-item a[href$=".gif"]',
      type: 'image',
      image: {
        verticalFit: true,
        tError: '<a href="%url%">The image</a> could not be loaded.',
      },
      gallery: {
        enabled: true,
        tCounter: '<span class="mfp-counter">%curr% / %total%</span>',
      },
      iframe: {
        markup:
          '<div class="mfp-iframe-scaler">' +
          '<div class="mfp-close"></div>' +
          '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
          '<div class="mfp-title"></div>' +
          '</div>',
      },
      mainClass: 'mfp-zoom-in',
      tLoading: '',
      removalDelay: 300,
      closeBtnInside: false,
      closeOnContentClick: true,
      midClick: true,
      callbacks: {
        elementParse(item) {
          if (item.el.hasClass('mfp-iframe')) item.type = 'iframe';
        },
        markupParse(_template, values, item) {
          values.title = item.el.data('title') == null ? '' : item.el.data('title');
        },
        imageLoadComplete() {
          const self = this;
          window.setTimeout(() => self.wrap.addClass('mfp-image-loaded'), 16);
        },
        beforeAppend() {
          const self = this;
          if (this.content.find('iframe[src*="soundcloud.com"]').length) {
            self.wrap.addClass('is-soundcloud');
          } else {
            self.wrap.removeClass('is-soundcloud');
          }
          this.content.find('iframe').on('load', function () {
            window.setTimeout(() => self.wrap.addClass('mfp-image-loaded'), 16);
          });
        },
        open() {
          playSound('tick');
        },
        close() {
          this.wrap.removeClass('mfp-image-loaded');
          playSound('tick');
        },
      },
    });
  });

  return () => {
    $boxes.each(function () {
      const $el = $(this);
      if ($el.data('magnificPopup')) $el.magnificPopup('destroy');
    });
  };
}
