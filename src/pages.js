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
  return `<div class="service"><i class="${iconClass}" aria-hidden="true"></i><h4>${title}</h4><p>${text}</p></div>`;
}

function funFact(imgFile, label) {
  return `<div class="col"><div class="fun-fact"><img src="${IMG_2017}/${imgFile}" alt="${label}" loading="lazy"/><h4>${label}</h4></div></div>`;
}

function sectionTitle(text, opts = {}) {
  const cls = ['section-title', opts.withIcon && 'with-icon'].filter(Boolean).join(' ');
  const label = opts.withIcon ? text : `<i>${text}</i>`;
  return `<div class="${cls}"><h2>${label}</h2></div>`;
}

const TIMELINE_TAIL = '';

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

function sideItem({ period, title, subtitle, body }) {
  return `<div class="side-item">
    <h4>${title}</h4>
    <h5>${subtitle}</h5>
    <p class="side-item-meta">${period}${body ? ' · ' + body : ''}</p>
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
    <div class="entry-content about-me-content">
      <p class="about-intro">패션 MD로 브랜드를 키웠고, 직접 브랜드를 만들었습니다.<br>지금은 데이터와 디지털 감각을 더해 더 넓은 문제를 풀고 싶습니다.</p>
      ${sectionTitle('WHAT I DO')}
      <div class="row services what-i-do">
        ${service('fa-solid fa-bullseye', 'BRAND PLANNING', '브랜드 타겟과 포지셔닝을 재정의하고 온라인 채널 전략까지 직접 실행합니다.')}
        ${service('fa-solid fa-tags', 'PRODUCT MD', '시즌 상품 기획, 생산 관리,<br>수입 브랜드 운영까지 MD 업무 전반을 수행합니다.')}
        ${service('fa-solid fa-chart-line', 'DIGITAL STRATEGY', '자사몰 컨셉 기획, SNS 전략,<br>인플루언서 마케팅을 기획하고 실행합니다.')}
      </div>
      ${sectionTitle('BY THE NUMBERS')}
      <div class="row numbers-row">
        <div class="col col-number"><div class="number-stat"><span class="number-value">5</span><span class="number-label">YEARS IN UK</span></div></div>
        <div class="col col-number"><div class="number-stat"><span class="number-value">2.5</span><span class="number-label">YEARS MD EXPERIENCE</span></div></div>
        <div class="col col-number"><div class="number-stat"><span class="number-value">10%</span><span class="number-label">ONLINE SALES GROWTH</span></div></div>
        <div class="col col-number"><div class="number-stat"><span class="number-value">1</span><span class="number-label">BRAND LAUNCHED</span></div></div>
      </div>
      ${sectionTitle('EXPERIENCE WITH')}
      <div class="row brand-logos">
        <div class="col col-brand"><img src="/barbara.png" alt="Barbara" loading="lazy"/></div>
        <div class="col col-brand"><img src="/vivien.png" alt="남영비비안" loading="lazy"/></div>
        <div class="col col-brand"><img src="/mey.png" alt="mey" loading="lazy"/></div>
        <div class="col col-brand"><img src="/chantelle.png" alt="Chantelle" loading="lazy"/></div>
        <div class="col col-brand"><img src="/eberjey.png" alt="Eberjey" loading="lazy"/></div>
        <div class="col col-brand"><img src="/pluto.png" alt="Pluto" loading="lazy"/></div>
      </div>
    </div>`,

  resume: `
    <header class="entry-header"><h1 class="entry-title">resume</h1></header>
    <div class="entry-content">
      <div class="row resume-layout">
        <div class="col-main">
          ${timelineTitle('Work History', 'fa-solid fa-briefcase')}
          ${timelineItem({ period: 'May 2022 - Oct 2025', title: 'Founder & Creative Director', subtitle: '포레', body: '브랜드 아이덴티티 수립부터 생산, 유통, 마케팅, 고객 관리까지 1인 사업의 전 영역을 직접 운영했습니다. 시장의 반응을 빠르게 읽고 의사결정하는 감각을 키웠습니다.' })}
          ${timelineItem({ period: 'Mar 2020 - May 2022', title: '상품기획 MD', subtitle: '남영비비안', body: '국내 대표 이너웨어 브랜드에서 시즌 상품 라인업 기획부터 소싱, 판매 데이터 분석까지 상품의 전 생애주기를 담당했습니다. 트렌드 리딩과 수치 기반 의사 결정이 공존하는 업무 방식을 체득했습니다.' })}
          ${timelineTitle('Education', 'fa-solid fa-graduation-cap')}
          ${timelineItem({ period: 'Sep 2016 - Jun 2019', title: 'Fashion Design', subtitle: 'Nottingham Trent University (UK)', body: '' })}
          ${timelineItem({ period: 'Mar 2015 - Mar 2016', title: 'Art & Design', subtitle: 'NTU International College (UK)', body: '' })}
          <p class="resume-download"><a class="button" href="#"><i class="fa-solid fa-newspaper" aria-hidden="true"></i> Download CV</a></p>
        </div>
        <aside class="col-side">
          ${sectionTitle('MD SKILLS')}
          ${skillBar('상품기획', 90)}
          ${skillBar('브랜드 기획', 95)}
          ${skillBar('생산관리', 95)}
          ${skillBar('트렌드 분석', 90)}
          ${skillBar('수입브랜드 운영', 85)}
          ${sectionTitle('LANGUAGES')}
          ${skillBar('한국어', 100)}
          ${skillBar('영어', 90)}
          ${sectionTitle('TOOLS & TECH')}
          <div class="resume-tools">
            <span class="exp-badge">ERP</span>
            <span class="exp-badge">MS Office</span>
            <span class="exp-badge">Notion</span>
            <span class="exp-badge">Figma</span>
            <span class="exp-badge">HTML/CSS</span>
            <span class="exp-badge">JavaScript</span>
            <span class="exp-badge">React</span>
            <span class="exp-badge">Git</span>
          </div>
          ${sectionTitle('AWARDS')}
          ${sideItem({ period: 'May 2018', title: '2019 MENSWEAR COLLECTION CONCEPT COMPETITION', subtitle: 'RIVER ISLAND 공모전', body: '전체 우승' })}
          ${sectionTitle('ACTIVITIES')}
          ${sideItem({ period: 'Mar 2023', title: '패션코드 2023 F/W', subtitle: '한국콘텐츠진흥원(KOCCA) 주관', body: '참가' })}
        </aside>
      </div>
    </div>`,

  portfolio: `
    <header class="entry-header"><h1 class="entry-title">portfolio</h1></header>
    <div class="entry-content">
      <ul id="filters" class="filters">
        <li class="current"><a href="#" data-filter="*">all</a></li>
        <li><a data-filter=".md-brand" href="#">MD&amp;BRAND</a></li>
        <li><a data-filter=".digital" href="#">DIGITAL</a></li>
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
      <div class="contact-single">
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
          <h4>BASED IN YONGSAN-GU, SEOUL</h4>
          <h4>TEL: +82 10 7408 7823</h4>
          <h4>CIELLE.SORA [AT] GMAIL.COM</h4>
        </div>
        <div class="send-message-section">
        ${sectionTitle('Send a Message')}
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
