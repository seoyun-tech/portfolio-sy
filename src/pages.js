const IMG = 'https://themes.pixelwars.org/unrovr/demo-01/wp-content/uploads/sites/13';
const IMG_2017 = `${IMG}/2017/11`;

const CLIENT_LOGOS = [
  'client-01-300x71.png',
  'client-02-300x86.png',
  'client-02-300x86.png',
  'client-03-300x67.png',
  'client-03-300x67.png',
  'client-01-300x71.png',
  'client-01-300x71.png',
  'client-02-300x86.png',
];

function clientLogo(file) {
  return `<div class="col col-client"><div class="client"><img src="${IMG_2017}/${file}" alt="" loading="lazy"/></div></div>`;
}

function service(iconClass, title, text) {
  return `<div class="col-half"><div class="service"><i class="${iconClass}" aria-hidden="true"></i><h4>${title}</h4><p>${text}</p></div></div>`;
}

function funFact(imgFile, label) {
  return `<div class="col"><div class="fun-fact"><img src="${IMG_2017}/${imgFile}" alt="${label}" loading="lazy"/><h4>${label}</h4></div></div>`;
}

function sectionTitle(text, opts = {}) {
  const cls = ['section-title', opts.withIcon && 'with-icon'].filter(Boolean).join(' ');
  const label = opts.withIcon ? text : `<i>${text}</i>`;
  return `<div class="${cls}"><h2>${label}</h2></div>`;
}

const TIMELINE_TAIL = ' But i love what i do.';

function skillBar(label, value) {
  return `<div class="skill-unit">
    <h4>${label}</h4>
    <div class="bar" data-percent="${value}">
      <div class="progress"></div>
    </div>
  </div>`;
}

function timelineTitle(title, iconClass) {
  return `<div class="event event-title">
    <h2>${title}</h2>
    <p><i class="${iconClass}" aria-hidden="true"></i></p>
  </div>`;
}

function timelineItem({ period, title, subtitle, body }) {
  return `<div class="event">
    <h3>${period}</h3>
    <h4>${title}</h4>
    <h5>${subtitle}</h5>
    <p>${body}${TIMELINE_TAIL}</p>
  </div>`;
}

function testimonial(name, role, quote, avatar) {
  return `<blockquote class="testo">
    <img src="${avatar}" alt="${name}" width="80" height="80" loading="lazy"/>
    <h4>${name}</h4>
    <h5>${role}</h5>
    <p>${quote}</p>
  </blockquote>`;
}

function portfolioItem({ title, meta, image, category, format, links = [] }) {
  const linksHtml = links
    .map((l) => {
      if (l.external) {
        return `<a target="_blank" rel="noopener noreferrer" href="${l.external}"></a>`;
      }
      if (l.ajax) {
        return `<a class="ajax" href="${l.ajax}"></a>`;
      }
      if (l.iframe) {
        return `<a class="lightbox mfp-iframe" data-title="${l.title || title}" href="${l.iframe}"></a>`;
      }
      if (l.lightbox) {
        return `<a class="lightbox" data-title="${l.title || title}" href="${l.lightbox}"></a>`;
      }
      return '';
    })
    .join('');

  return `<div class="media-cell hentry ${category} format-${format}">
    <div class="media-box">
      <img src="${image}" alt="${title}" loading="eager" decoding="async" width="550" height="413"/>
      <div class="mask"></div>
      ${linksHtml}
    </div>
    <div class="media-cell-desc">
      <h3>${title}</h3>
      <p class="category">${meta}</p>
    </div>
  </div>`;
}

function blogPost(tag, title) {
  return `<article class="blog-item">
    <a href="#"><span class="blog-tag">${tag}</span><h3>${title}</h3></a>
  </article>`;
}

export const pages = {
  'about-me': `
    <header class="entry-header"><h1 class="entry-title">about me</h1></header>
    <div class="entry-content">
      ${sectionTitle('Services')}
      <div class="row services">
        ${service('fa-solid fa-pen-nib', 'COPYWRITER', 'I design super cool websites. It is a long established fact that a reader will be distracted by the readable content.')}
        ${service('fa-solid fa-gamepad', 'GAME DEV', 'I can design beautiful type faces for both digital and print media. It is a long established fact that a reader will be distracted.')}
        ${service('fa-solid fa-chart-line', 'MANAGEMENT', 'I write about web design. It is a long established fact that a reader will be distracted by the readable content.')}
        ${service('fa-solid fa-lightbulb', 'PROBLEM SOLVER', 'I have strong project management skills. It is a long established fact that a reader will be distracted by the readable content.')}
      </div>
      ${sectionTitle('WORK PROCESS')}
      <div class="row process-row">
        ${[
          ['fa-solid fa-comments', 'Discuss'],
          ['fa-solid fa-lightbulb', 'Idea'],
          ['fa-solid fa-pen-ruler', 'Design'],
          ['fa-solid fa-code', 'Develop'],
          ['fa-solid fa-circle-check', 'Test'],
          ['fa-solid fa-rocket', 'Launch'],
        ]
          .map(
            ([icon, label]) =>
              `<div class="col"><div class="process"><i class="${icon}" aria-hidden="true"></i><h4>${label}</h4></div></div>`
          )
          .join('')}
      </div>
      ${sectionTitle('Proud to work with')}
      <div class="row clients">
        ${CLIENT_LOGOS.map(clientLogo).join('')}
      </div>
      ${sectionTitle('Fun Fact')}
      <div class="row fun-facts">
        ${funFact('fun-01.svg', '24 COUNTRIES VISITED')}
        ${funFact('fun-02.svg', '72 Articles Published')}
        ${funFact('fun-03.svg', '174 COFFEE SHOPS VISITED')}
        ${funFact('fun-04.svg', '12 AWARDS WON')}
      </div>
    </div>`,

  resume: `
    <header class="entry-header"><h1 class="entry-title">resume</h1></header>
    <div class="entry-content">
      <div class="row resume-layout">
        <div class="col-main">
          ${timelineTitle('Work History', 'fa-solid fa-briefcase')}
          ${timelineItem({ period: 'Dec 2013 - Current', title: 'Front End Developer', subtitle: 'Pixelwars Inc.', body: 'I currently work for Pixelwars creative studio. I create usable web interfaces, front end coding stuff and almost anything.' })}
          ${timelineItem({ period: 'JUN 2012 - DEC 2013', title: 'Web Developer', subtitle: 'Google Inc.', body: 'I worked as a Web Developer at Google for 3 years. I create usable web interfaces, front end coding stuff and almost anything.' })}
          ${timelineItem({ period: '2006', title: 'Web Developer', subtitle: 'Envato Inc.', body: 'I am an Elite Author at Envato. I create usable web interfaces, front end coding stuff and almost anything.' })}
          ${timelineTitle('Education', 'fa-solid fa-graduation-cap')}
          ${timelineItem({ period: '2002', title: 'Atom Science', subtitle: 'Stanford University', body: 'I studied atomic stuff at Stanford University. I create usable web interfaces, front end coding stuff and almost anything.' })}
          ${timelineItem({ period: '1998', title: 'SOFTWARE ENGINEERING', subtitle: 'HARVARD UNIVERSITY', body: 'I got my Master Degree at Harvard University. I create usable web interfaces, front end coding stuff and almost anything.' })}
          ${timelineItem({ period: '1994', title: 'COMPUTER SCIENCE', subtitle: 'MIT', body: 'I studied Computer Science at MIT. I create usable web interfaces, front end coding stuff and almost anything.' })}
          <p class="resume-download"><a class="button" href="#"><i class="fa-solid fa-newspaper" aria-hidden="true"></i> Download CV</a></p>
        </div>
        <aside class="col-side">
          ${sectionTitle('Design Skills')}
          ${skillBar('Photoshop', 80)}${skillBar('InDesign', 100)}${skillBar('Illustrator', 50)}
          ${sectionTitle('Coding Skills')}
          ${skillBar('Ionic', 90)}${skillBar('Angular', 70)}${skillBar('Php & MySql', 80)}${skillBar('WordPress', 90)}
          ${sectionTitle('Testimonials')}
          ${testimonial('CHRIS JONES', 'CEO / DREAM INC.', 'He is a great and hardworking guy. I am so proud of i have him as my asistant. He helped me so much. Also i am so proud of i have him as my asistant. He helped me so much.', `${IMG_2017}/testo-04.jpg`)}
          ${testimonial('MELODY COEN', 'CHEMIST / FREELANCER', "He was a great co-worker and a friend. I would't be where i am without his support.", `${IMG_2017}/testo-02.jpg`)}
          ${testimonial('JASON WILSON', 'LAB GEEK / HOUSTON TOWER', "He is ok. I don't really know him. He looks nice.", `${IMG_2017}/testo-03.jpg`)}
        </aside>
      </div>
    </div>`,

  portfolio: `
    <header class="entry-header"><h1 class="entry-title">portfolio</h1></header>
    <div class="entry-content">
      <ul id="filters" class="filters">
        <li class="current"><a href="#" data-filter="*">all</a></li>
        <li><a data-filter=".design" href="#">Design</a></li>
        <li><a data-filter=".media" href="#">Media</a></li>
        <li><a data-filter=".print" href="#">Print</a></li>
      </ul>
      <div class="portfolio-items media-grid masonry" data-layout="masonry" data-item-width="340">
        ${portfolioItem({
          title: 'TheBlogger',
          meta: 'blog theme',
          image: `${IMG}/2017/11/p02-550x413.jpg`,
          category: 'design',
          format: 'standard',
          links: [{ ajax: 'portfolio/theblogger/' }],
        })}
        ${portfolioItem({
          title: 'Portraits',
          meta: 'lightbox gallery',
          image: `${IMG}/2016/06/01-4-550x550.jpg`,
          category: 'print',
          format: 'gallery',
          links: [
            { lightbox: `${IMG}/2016/06/01-4.jpg`, title: 'By Yuschav Arly' },
            { lightbox: `${IMG}/2016/06/f1e1b457704083.59e042cea56db.jpg`, title: 'By Yuschav Arly' },
            { lightbox: `${IMG}/2016/06/970aeb57704083.59dffd237f286.jpg`, title: 'By Yuschav Arly' },
            { lightbox: `${IMG}/2016/06/c7031257704083.59dffd23808d3.jpg`, title: 'By Yuschav Arly' },
            { lightbox: `${IMG}/2016/06/25891b57704083.59dffd2380fb6.jpg`, title: 'By Yuschav Arly' },
            { lightbox: `${IMG}/2016/06/ceb88c57704083.59e01c1299bbb.jpg`, title: 'By Yuschav Arly' },
            { lightbox: `${IMG}/2016/06/95e3ee57704083.59dff4fcd1193.jpg`, title: 'By Yuschav Arly' },
          ],
        })}
        ${portfolioItem({
          title: 'Sophomore',
          meta: 'Brittle',
          image: `${IMG}/2016/06/sophomore.jpg`,
          category: 'media',
          format: 'video',
          links: [{ iframe: 'https://vimeo.com/77702429', title: 'Sophomore' }],
        })}
        ${portfolioItem({
          title: 'Changes',
          meta: 'lightbox audio',
          image: `${IMG}/2016/06/05-3.jpg`,
          category: 'media',
          format: 'audio',
          links: [{
            iframe:
              'https://w.soundcloud.com/player/?visual=true&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F221650664&show_artwork=true',
            title: 'Skizzy Mars',
          }],
        })}
        ${portfolioItem({
          title: 'MacOs 2020',
          meta: 'by Aurélien SALOMON',
          image: `${IMG}/2017/11/p11-550x413.jpg`,
          category: 'design',
          format: 'standard',
          links: [{ ajax: 'portfolio/macos-2020/' }],
        })}
        ${portfolioItem({
          title: 'Adam Johnson',
          meta: 'portrait shot',
          image: `${IMG}/2017/11/z1-550x413.jpg`,
          category: 'print',
          format: 'image',
          links: [{ lightbox: `${IMG}/2017/11/z1.jpg`, title: 'just a portrait shoot' }],
        })}
        ${portfolioItem({
          title: 'The Pioneers of the Universe Short Film',
          meta: 'by ArtFx School',
          image: `${IMG}/2017/11/cgi2-550x369.jpg`,
          category: 'media',
          format: 'video',
          links: [{ iframe: 'https://www.youtube.com/embed/dInyvduuy7c', title: 'Short Animated Film' }],
        })}
        ${portfolioItem({
          title: 'Talk Is Cheap',
          meta: 'Flume',
          image: `${IMG}/2017/11/artworks-000070558334-gdrz51-t500x500.jpg`,
          category: 'media',
          format: 'audio',
          links: [{
            iframe:
              'https://w.soundcloud.com/player/?visual=true&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F221650664&show_artwork=true',
            title: 'Talk Is Cheap',
          }],
        })}
        ${portfolioItem({
          title: 'unRovr',
          meta: 'vCard theme',
          image: `${IMG}/2016/06/p07-550x509.jpg`,
          category: 'design',
          format: 'standard',
          links: [{ ajax: 'portfolio/unrovr/' }],
        })}
        ${portfolioItem({
          title: 'Oliver',
          meta: 'external link',
          image: `${IMG}/2016/06/p08-550x413.jpg`,
          category: 'print',
          format: 'link',
          links: [{ external: 'https://themeforest.net/item/oliver-classic-minimal-portfolio-wordpress-theme/19950494' }],
        })}
      </div>
    </div>`,

  articles: `
    <header class="entry-header"><h1 class="entry-title">from the blog</h1></header>
    <div class="entry-content">
      <div class="blog-grid">
        ${blogPost('Life', '20 Best Practices For Designing Better UIs')}
        ${blogPost('Think', '40 Inspirational Magazine Designs That You Should See')}
        ${blogPost('Music', 'Creating a New Typeface For Your Next Project')}
        ${blogPost('Street', 'Sketching a Monster Made by Stone From Scratch')}
        ${blogPost('Sport', 'Designing a Physics Based')}
        ${blogPost('Adventure', 'Coolest Typo Gift')}
        ${blogPost('Street', 'Should Read Before Go Out')}
        ${blogPost('Travel', 'Get Ready And Pack Your Bag For A Real Trip')}
        ${blogPost('Travel', 'Runaway A Road Adventure')}
      </div>
      <p class="see-all"><a href="#">See All Posts</a></p>
    </div>`,

  contact: `
    <header class="entry-header"><h1 class="entry-title">contact</h1></header>
    <div class="entry-content">
      <div class="row contact-layout">
        <div class="col-half">
          ${sectionTitle("Let's Socialize")}
          <div class="social-links">
            <a class="social-link facebook" href="#" aria-label="Facebook"></a>
            <a class="social-link twitter" href="#" aria-label="Twitter"></a>
            <a class="social-link gplus" href="#" aria-label="Google+"></a>
            <a class="social-link dribbble" href="#" aria-label="Dribbble"></a>
            <a class="social-link behance" href="#" aria-label="Behance"></a>
          </div>
          <div class="reach-me">
            ${sectionTitle('Reach Me', { underline: true })}
            <h4>BASED IN HOUSTON, USA</h4>
            <h4>TEL: +123 456 78900</h4>
            <h4>JOHNDOE [AT] GMAIL.COM</h4>
            <h4>FREELANCE AVAILABLE</h4>
          </div>
        </div>
        <div class="col-half">
          <form class="contact-form" action="#" method="post" novalidate>
            <p><input type="text"  name="user_name"  placeholder="Name"    required/></p>
            <p><input type="email" name="user_email" placeholder="Email"   required/></p>
            <p><textarea           name="message"    placeholder="Message" rows="6" required></textarea></p>
            <p><button type="submit" class="button">Send</button></p>
            <p class="form-feedback" aria-live="polite"></p>
          </form>
        </div>
      </div>
    </div>`,
};
