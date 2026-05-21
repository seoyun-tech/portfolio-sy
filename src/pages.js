import { CV_URL, HERO, ABOUT, METRICS, RESUME, STORY } from './site-config.js';

/** Resume CTA — same label/style as intro CV button */
function resumeCvButton() {
  return `<div class="card-triggers resume-cta">
    <a href="${CV_URL}" class="button button--primary" target="_blank" rel="noopener noreferrer">이력서 · PDF 저장</a>
  </div>`;
}

function service(iconClass, title, text) {
  return `<div class="service"><i class="${iconClass}" aria-hidden="true"></i><h4>${title}</h4><p>${text}</p></div>`;
}

function aboutHighlights() {
  return `<div class="row services about-highlights">
    ${ABOUT.highlights.map(({ icon, title, text }) => service(icon, title, text)).join('')}
  </div>`;
}

function aboutProse(lines, className) {
  const parts = Array.isArray(lines) ? lines : [lines];
  return `<div class="${className}"><p class="about-prose">${parts.map((line) => `<span class="about-line">${line}</span>`).join('')}</p></div>`;
}

function aboutLead() {
  return aboutProse(ABOUT.lead, 'about-lead-group');
}

function aboutWhyNow() {
  return aboutProse(ABOUT.whyNow, 'about-why-group');
}

function aboutNumbers() {
  return `<div class="row numbers-row numbers-row--three">
    ${ABOUT.numbers
      .map(
        ({ value, label }) =>
          `<div class="col col-number"><div class="number-stat"><span class="number-value">${value}</span><span class="number-label">${label}</span></div></div>`,
      )
      .join('')}
  </div>`;
}

function sectionTitle(text, opts = {}) {
  const cls = ['section-title', opts.underline && 'underline'].filter(Boolean).join(' ');
  return `<div class="${cls}"><h2><i>${text}</i></h2></div>`;
}

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
    <p>${body}</p>
  </div>`;
}

function timelineItemBullets({ period, title, subtitle, bullets }) {
  return `<div class="event">
    <h3>${period}</h3>
    <h4>${title}</h4>
    <h5>${subtitle}</h5>
    <ul class="resume-bullets">
      ${bullets.map((item) => `<li>${item}</li>`).join('')}
    </ul>
  </div>`;
}

function sideItem({ period, title, subtitle, body }) {
  return `<div class="side-item">
    <h4>${title}</h4>
    <h5>${subtitle}</h5>
    <p class="side-item-meta">${period}${body ? ' · ' + body : ''}</p>
  </div>`;
}

function prototypeMockup({ image, previewImage, title, prototype }) {
  if (!prototype) return `<img src="${image}" alt="${title}" loading="eager" decoding="async" width="550" height="413"/>`;

  return `<div class="prototype-mockup">
    <span class="prototype-badge">FIGMA PROTOTYPE</span>
    <img class="prototype-mockup-bg" src="${previewImage || image}" alt="${title} mockup preview" loading="eager" decoding="async" width="550" height="413"/>
  </div>`;
}

function portfolioItem({ title, meta, image, previewImage, category, format, links = [], tags = [], featured = false, itemClass = '', prototype }) {
  const linksHtml = links
    .map((l) => l.ajax ? `<a class="ajax" aria-label="Open ${title}" href="${l.ajax}"></a>` : '')
    .join('');

  const tagsHtml = tags.length
    ? `<div class="project-tags">${tags.map((tag) => `<span>${tag}</span>`).join('')}</div>`
    : '';

  return `<div class="media-cell hentry ${category} format-${format} ${featured ? 'x2' : ''} ${itemClass}">
    <div class="media-box">
      ${prototypeMockup({ image, previewImage, title, prototype })}
      <div class="mask"></div>
      ${linksHtml}
    </div>
    <div class="media-cell-desc">
      <h3>${title}</h3>
      <p class="category">${meta}</p>
      ${tagsHtml}
    </div>
  </div>`;
}

const PORTFOLIO_PROJECTS = [
  {
    title: '해외 수입 브랜드 바잉 기획 및 운영',
    meta: STORY.labels.importBuying,
    image: '/assets/projects/vivien-buying-1.png',
    category: 'fashion-project',
    format: 'standard',
    featured: true,
    itemClass: 'thumb-card',
    tags: [METRICS.import.season, `목표 ${METRICS.import.target}`, STORY.labels.importBuying],
    links: [{ ajax: 'portfolio/import-brand-buying/' }],
  },
  {
    title: '바바라 온라인 채널 리뉴얼',
    meta: STORY.labels.onlineChannel,
    image: '/assets/projects/vivien-online-2.png',
    category: 'fashion-project',
    format: 'standard',
    itemClass: 'thumb-card',
    tags: ['자사몰 +31%', 'SNS', STORY.labels.onlineChannel],
    links: [{ ajax: 'portfolio/vivien-online-channel/' }],
  },
  {
    title: '포레 D2C · 리브랜딩',
    meta: `${STORY.labels.d2c}, 시즌 기획`,
    image: '/assets/projects/poroe-3.png',
    category: 'fashion-project',
    format: 'standard',
    itemClass: 'thumb-card',
    tags: ['자사몰 +37%', STORY.labels.d2c, '시즌 기획'],
    links: [{ ajax: 'portfolio/poroe-brand-launch/' }],
  },
  {
    title: 'Rookiz',
    meta: `${STORY.labels.supplementary}, 풀스택 기획`,
    image: '/assets/projects/rookiz-scene.jpg',
    previewImage: '/assets/projects/rookiz-thumb.png',
    category: 'digital-project',
    format: 'standard',
    itemClass: 'prototype-card',
    tags: ['React', 'FastAPI', 'AI 큐레이션'],
    links: [{ ajax: 'portfolio/rookiz/' }],
    prototype: {
      url: 'https://www.figma.com/proto/uiEEZajUsTu8qwpV3h2jVV/ROOKIZ-%EB%94%94%EC%9E%90%EC%9D%B8?node-id=4230-7512&p=f&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=4230%3A7512&page-id=0%3A1&hide-ui=1',
      mask: { top: '17.3%', left: '12.1%', width: '75.6%', height: '53.35%', radius: '4% / 5.85%' },
    },
  },
  {
    title: '스포티파이 앱 리디자인',
    meta: `${STORY.labels.supplementary}, UX/UI 기획`,
    image: '/assets/projects/spotify-scene.jpg',
    previewImage: '/assets/projects/spotify-thumb.png',
    category: 'digital-project',
    format: 'standard',
    itemClass: 'prototype-card',
    tags: ['Figma', '프로토타입', '모바일 UX'],
    links: [{ ajax: 'portfolio/spotify-redesign/' }],
    prototype: {
      url: 'https://www.figma.com/proto/tATtPvK1Ez7Jh9rJTsWAks/SPOTIFY-%EB%94%94%EC%9E%90%EC%9D%B8?node-id=2188-3467&p=f&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=2188%3A3467&page-id=2188%3A1329&hide-ui=1',
      mask: { top: '12.38%', left: '31.88%', width: '36.22%', height: '77.92%', radius: '14% / 4.9%' },
    },
  },
  {
    title: '무신사 웹 리디자인',
    meta: `${STORY.labels.supplementary}, UX/UI, 커머스`,
    image: '/assets/projects/musinsa-scene.png',
    category: 'digital-project',
    format: 'standard',
    itemClass: 'mockup-card',
    tags: ['HTML/CSS', 'JavaScript', '3 페이지'],
    links: [{ ajax: 'portfolio/musinsa-redesign/' }],
  },
];

export const pages = {
  'about-me': `
    <header class="entry-header"><h1 class="entry-title">about me</h1></header>
    <div class="entry-content about-me-content">
      ${aboutLead()}
      ${sectionTitle('BY THE NUMBERS')}
      ${aboutNumbers()}
      ${sectionTitle(ABOUT.sectionKeyRoles)}
      ${aboutHighlights()}
      ${sectionTitle('WHY NOW')}
      ${aboutWhyNow()}
      ${sectionTitle('EXPERIENCE WITH')}
      <div class="row brand-logos">
        <div class="col col-brand"><img src="/brands/barbara.png" alt="Barbara" loading="lazy"/></div>
        <div class="col col-brand"><img src="/brands/vivien.png" alt="남영비비안" loading="lazy"/></div>
        <div class="col col-brand"><img src="/brands/mey.png" alt="mey" loading="lazy"/></div>
        <div class="col col-brand"><img src="/brands/chantelle.png" alt="Chantelle" loading="lazy"/></div>
        <div class="col col-brand"><img src="/brands/eberjey.png" alt="Eberjey" loading="lazy"/></div>
        <div class="col col-brand"><img src="/brands/pluto.png" alt="Pluto" loading="lazy"/></div>
      </div>
    </div>`,

  resume: `
    <header class="entry-header"><h1 class="entry-title">resume</h1></header>
    <div class="entry-content">
      <div class="row resume-layout">
        <div class="col-main">
          ${timelineTitle('Work History', 'fa-solid fa-briefcase')}
          ${timelineItemBullets(RESUME.work.vivien)}
          ${timelineItemBullets(RESUME.work.poroe)}
          ${timelineTitle('Education', 'fa-solid fa-graduation-cap')}
          ${timelineItem({ period: '2016.09 - 2019.06', title: 'Fashion Design', subtitle: 'Nottingham Trent University (UK)', body: 'River Island 2019 Menswear Collection Concept Competition 전체 우승.' })}
          ${timelineTitle('Additional', 'fa-solid fa-book')}
          ${timelineItem({ period: '2025.10 - 2026.04', title: '웹 개발 과정 수료', subtitle: 'MBC 아카데미 (종로)', body: 'HTML/CSS, JavaScript, React, 커머스 및 기획서 시각화 보조 역량.' })}
        </div>
        <aside class="col-side">
          ${sectionTitle('SKILLS')}
          <div class="resume-tools">
            <span class="exp-badge">${STORY.labels.productPlanning}</span>
            <span class="exp-badge">${STORY.labels.importBuying}</span>
            <span class="exp-badge">${STORY.labels.onlineChannel}</span>
            <span class="exp-badge">${STORY.labels.production}</span>
          </div>
          ${sectionTitle('LANGUAGES')}
          <div class="resume-tools">
            <span class="exp-badge">한국어 (Native)</span>
            <span class="exp-badge">영어 (Business)</span>
          </div>
          ${sectionTitle('TOOLS')}
          <div class="resume-tools">
            <span class="exp-badge">ERP</span>
            <span class="exp-badge">MS Office</span>
            <span class="exp-badge">Notion</span>
            <span class="exp-badge">Figma</span>
          </div>
          ${sectionTitle('DIGITAL (보조)')}
          <div class="resume-tools resume-tools--muted">
            <span class="exp-badge">HTML/CSS</span>
            <span class="exp-badge">JavaScript</span>
            <span class="exp-badge">React</span>
            <span class="exp-badge">Git</span>
          </div>
        </aside>
      </div>
      ${resumeCvButton()}
    </div>`,

  portfolio: `
    <header class="entry-header"><h1 class="entry-title">portfolio</h1></header>
    <div class="entry-content">
      <p class="portfolio-intro">${STORY.portfolioIntro}</p>
      <ul id="filters" class="filters">
        <li class="current"><a href="#" data-filter=".fashion-project">FASHION MD</a></li>
        <li><a href="#" data-filter=".digital-project">DIGITAL (보조)</a></li>
        <li><a href="#" data-filter="*">ALL</a></li>
      </ul>
      <div class="portfolio-items media-grid masonry" data-layout="masonry" data-item-width="340">
        ${PORTFOLIO_PROJECTS.map(portfolioItem).join('')}
      </div>
    </div>`,

  contact: `
    <header class="entry-header"><h1 class="entry-title">contact</h1></header>
    <div class="entry-content">
      <div class="contact-single">
        ${sectionTitle('CONNECT')}
        <div class="social-links">
          <a class="social-link" href="https://github.com/seoyun-tech" aria-label="GitHub" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github"></i></a>
          <a class="social-link" href="https://www.linkedin.com/in/seoyoon-park/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-linkedin"></i></a>
        </div>
        <div class="reach-me">
          ${sectionTitle('Reach Me')}
          <h4>BASED IN YONGSAN-GU, SEOUL</h4>
          <h4>TEL: +82 10 7408 7823</h4>
          <h4><a href="mailto:cielle.sora@gmail.com">cielle.sora@gmail.com</a></h4>
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
