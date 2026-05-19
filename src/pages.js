function service(iconClass, title, text) {
  return `<div class="service"><i class="${iconClass}" aria-hidden="true"></i><h4>${title}</h4><p>${text}</p></div>`;
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
    title: 'Vivien Online Channel',
    meta: 'Online MD / Marketing',
    image: '/assets/works/vivien-main.png',
    category: 'fashion-project',
    format: 'standard',
    itemClass: 'logo-card',
    tags: ['+10% Sales', 'SNS', 'Influencer'],
    links: [{ ajax: 'portfolio/vivien-online-channel/' }],
  },
  {
    title: 'Import Brand Buying',
    meta: 'Buying MD / Sourcing',
    image: '/assets/works/vivien-buying-main.png',
    category: 'fashion-project',
    format: 'standard',
    itemClass: 'logo-card',
    tags: ['4 Brands', 'Buying MD', 'Global Sourcing'],
    links: [{ ajax: 'portfolio/import-brand-buying/' }],
  },
  {
    title: 'POROE Brand Launch',
    meta: 'Brand Pivot / Planning',
    image: '/assets/works/poroe-main.png',
    category: 'fashion-project',
    format: 'standard',
    itemClass: 'logo-card',
    tags: ['+30% Sales', 'D2C', 'Brand Pivot'],
    links: [{ ajax: 'portfolio/poroe-brand-launch/' }],
  },
  {
    title: 'Musinsa Web Redesign',
    meta: 'UX/UI Planning / Dev',
    image: '/assets/project-musinsa-scene.png',
    category: 'digital-project',
    format: 'standard',
    itemClass: 'mockup-card',
    tags: ['HTML/CSS', 'JavaScript', '3 Pages'],
    links: [{ ajax: 'portfolio/musinsa-redesign/' }],
  },
  {
    title: 'Spotify App Redesign',
    meta: 'UX/UI Planning',
    image: '/assets/project-spotify-scene.jpg',
    previewImage: '/assets/project-spotify.png',
    category: 'digital-project',
    format: 'standard',
    itemClass: 'prototype-card',
    tags: ['Figma', 'Prototype', 'Mobile UX'],
    links: [{ ajax: 'portfolio/spotify-redesign/' }],
    prototype: {
      url: 'https://www.figma.com/proto/tATtPvK1Ez7Jh9rJTsWAks/SPOTIFY-%EB%94%94%EC%9E%90%EC%9D%B8?node-id=2188-3467&p=f&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=2188%3A3467&page-id=2188%3A1329&hide-ui=1',
      mask: { top: '12.38%', left: '31.88%', width: '36.22%', height: '77.92%', radius: '14% / 4.9%' },
    },
  },
  {
    title: 'Rookiz',
    meta: 'Full-Stack Planning / Dev',
    image: '/assets/project-rookiz-scene.jpg',
    previewImage: '/assets/project-rookiz.png',
    category: 'digital-project',
    format: 'standard',
    itemClass: 'prototype-card',
    tags: ['React', 'FastAPI', 'AI Curation'],
    links: [{ ajax: 'portfolio/rookiz/' }],
    prototype: {
      url: 'https://www.figma.com/proto/uiEEZajUsTu8qwpV3h2jVV/ROOKIZ-%EB%94%94%EC%9E%90%EC%9D%B8?node-id=4230-7512&p=f&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=4230%3A7512&page-id=0%3A1&hide-ui=1',
      mask: { top: '17.3%', left: '12.1%', width: '75.6%', height: '53.35%', radius: '4% / 5.85%' },
    },
  },
];

export const pages = {
  'about-me': `
    <header class="entry-header"><h1 class="entry-title">about me</h1></header>
    <div class="entry-content about-me-content">
      <p class="about-intro">브랜드 이미지를 재설계해 온라인 매출 10%를 끌어올렸고, 그 경험을 바탕으로 직접 D2C 브랜드를 론칭했습니다. 상품기획부터 촬영 기획, 디지털 전략까지 전 과정을 실행하는 MD입니다.</p>
      ${sectionTitle('WHAT I DO')}
      <div class="row services what-i-do">
        ${service('fa-solid fa-tags', 'PRODUCT MD', '시즌 상품 라인업 기획부터 생산 관리, 수입 브랜드 바잉까지 상품 전 생애주기를 담당합니다.')}
        ${service('fa-solid fa-bullseye', 'BRAND STRATEGY', '브랜드 타겟 재정의, 리포지셔닝, 아이덴티티 기획을 통해 브랜드가 나아갈 방향을 설계합니다.')}
        ${service('fa-solid fa-chart-line', 'DIGITAL EXECUTION', '자사몰 컨셉 기획부터 SNS 채널 전략, 인플루언서 마케팅까지 직접 실행합니다.')}
      </div>
      ${sectionTitle('BY THE NUMBERS')}
      <div class="row numbers-row">
        <div class="col col-number"><div class="number-stat"><span class="number-value">5</span><span class="number-label">YEARS FASHION CAREER</span></div></div>
        <div class="col col-number"><div class="number-stat"><span class="number-value">10%</span><span class="number-label">ONLINE SALES GROWTH</span></div></div>
        <div class="col col-number"><div class="number-stat"><span class="number-value">30%</span><span class="number-label">BRAND REVENUE GROWTH</span></div></div>
        <div class="col col-number"><div class="number-stat"><span class="number-value">4</span><span class="number-label">IMPORT BRANDS MANAGED</span></div></div>
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
          ${timelineItem({ period: 'May 2022 - Oct 2025', title: 'Founder & Creative Director', subtitle: '포레', body: '니치 패션 브랜드를 기획·런칭하여 전년 대비 매출 30% 성장. 브랜드 기획, 생산, 마케팅, 자사몰 운영까지 1인 전담. 패션코드 2023 F/W 참가(한국콘텐츠진흥원 주관).' })}
          ${timelineItem({ period: 'Mar 2020 - May 2022', title: '상품기획 MD', subtitle: '남영비비안', body: '바바라 브랜드 리포지셔닝 및 온라인 채널 재설계로 온라인 매출 10% 성장. 수입 브랜드 4개 바잉·운영, 생산 관리 전담.' })}
          ${timelineTitle('Education', 'fa-solid fa-graduation-cap')}
          ${timelineItem({ period: 'Sep 2016 - Jun 2019', title: 'Fashion Design', subtitle: 'Nottingham Trent University (UK)', body: 'River Island 2019 Menswear Collection Concept Competition 전체 우승.' })}
          ${timelineItem({ period: 'Mar 2015 - Mar 2016', title: 'Art & Design', subtitle: 'NTU International College (UK)', body: '' })}
          <p class="resume-download"><a class="button" href="#"><i class="fa-solid fa-newspaper" aria-hidden="true"></i> Download CV</a></p>
        </div>
        <aside class="col-side">
          ${sectionTitle('SKILLS')}
          ${skillBar('상품기획', 85)}
          ${skillBar('브랜드 전략', 90)}
          ${skillBar('바잉·소싱', 85)}
          ${skillBar('생산관리', 90)}
          ${skillBar('디지털 마케팅', 85)}
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
        </aside>
      </div>
    </div>`,

  portfolio: `
    <header class="entry-header"><h1 class="entry-title">portfolio</h1></header>
    <div class="entry-content">
      <ul id="filters" class="filters">
        <li class="current"><a href="#" data-filter="*">all</a></li>
        <li><a data-filter=".fashion-project" href="#">FASHION</a></li>
        <li><a data-filter=".digital-project" href="#">DIGITAL</a></li>
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
