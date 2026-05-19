const order = [
  'vivien-online-channel',
  'import-brand-buying',
  'poroe-brand-launch',
  'musinsa-redesign',
  'spotify-redesign',
  'rookiz',
];

function nav(slug) {
  const index = order.indexOf(slug);
  const prev = order[(index - 1 + order.length) % order.length];
  const next = order[(index + 1) % order.length];

  return `<nav class="portfolio-nav">
    <span class="prev"><a class="ajax" href="portfolio/${prev}/">Previous</a></span>
    <span class="back"><a href="#/portfolio">Back</a></span>
    <span class="next"><a class="ajax" href="portfolio/${next}/">Next</a></span>
  </nav>`;
}

function linkList(links = []) {
  if (!links.length) return '';

  return `<div class="portfolio-link-list">
    ${links
      .map((link) => `<a href="${link.href}" target="_blank" rel="noopener noreferrer">${link.label}</a>`)
      .join('')}
  </div>`;
}

function gallery(images = []) {
  if (!images.length) return '';

  return `<div class="portfolio-gallery">
    ${images.map((image) => `<img src="${image.src}" alt="${image.alt}" loading="lazy"/>`).join('')}
  </div>`;
}

function toFigmaEmbed(url) {
  return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url)}`;
}

function embedMaskStyle(mask) {
  if (!mask) return '';
  return [
    `--embed-top: ${mask.top}`,
    `--embed-left: ${mask.left}`,
    `--embed-width: ${mask.width}`,
    `--embed-height: ${mask.height}`,
    `--embed-radius: ${mask.radius}`,
  ].join('; ');
}

function heroMockup({ title, image, prototype }) {
  if (!prototype) {
    return `<div class="portfolio-hero-card">
      <img src="${image}" alt="${title}" loading="lazy"/>
    </div>`;
  }

  return `<div class="portfolio-hero-card portfolio-hero-card--prototype">
    <span class="prototype-badge">FIGMA PROTOTYPE</span>
    <img class="prototype-mockup-bg" src="${image}" alt="${title} mockup" loading="lazy"/>
    <div class="prototype-mockup-mask" style="${embedMaskStyle(prototype.mask)}">
      <iframe
        src="${toFigmaEmbed(prototype.url)}"
        class="prototype-mockup-frame"
        title="${title} Figma prototype"
        allow="fullscreen; clipboard-write"
        loading="eager">
      </iframe>
    </div>
  </div>`;
}

function detail(slug, { title, meta, summary, role, period, focus, image, prototype, sections, images, links }) {
  return `<div class="portfolio-single page-layout">
    <article class="hentry format-standard">
      ${nav(slug)}
      <header class="entry-header"><h1 class="entry-title">${title}</h1></header>
      <div class="entry-content">
        <div class="portfolio-desc">
          <p class="portfolio-kicker">${meta}</p>
          <p>${summary}</p>
          <p class="portfolio-meta">
            <strong>ROLE</strong> ${role}
            <strong>PERIOD</strong> ${period}
            <strong>FOCUS</strong> ${focus}
          </p>
          ${linkList(links)}
        </div>
        ${heroMockup({ title, image, prototype })}
        <div class="project-detail-grid">
          ${sections
            .map((section) => `<section class="project-detail-card">
              <h2>${section.title}</h2>
              <p>${section.body}</p>
            </section>`)
            .join('')}
        </div>
        ${gallery(images)}
      </div>
    </article>
  </div>`;
}

export const portfolioDetails = {
  rookiz: detail('rookiz', {
    title: 'Rookiz',
    meta: 'AI Kids OTT Service',
    summary: '어린이가 안전하게 콘텐츠를 탐색할 수 있도록 AI 추천 흐름과 키즈 OTT 화면 구조를 기획하고 구현한 풀스택 프로젝트입니다.',
    role: 'Planning / Design / Development',
    period: '1 Week',
    focus: 'AI Recommendation',
    image: '/assets/project-rookiz-scene.jpg',
    prototype: {
      url: 'https://www.figma.com/proto/uiEEZajUsTu8qwpV3h2jVV/ROOKIZ-%EB%94%94%EC%9E%90%EC%9D%B8?node-id=4230-7512&p=f&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=4230%3A7512&page-id=0%3A1&hide-ui=1',
      mask: { top: '17.3%', left: '12.1%', width: '75.6%', height: '53.3%', radius: '10px' },
    },
    sections: [
      {
        title: 'Goal',
        body: '성인 중심 OTT 구조에서 벗어나 연령과 관심사에 맞는 콘텐츠를 자동 추천하는 키즈 전용 경험을 설계했습니다.',
      },
      {
        title: 'Mockup',
        body: '노트북 목업 안에 Figma 프로토타입을 직접 삽입해 정적인 이미지가 아니라 실제 화면 흐름을 확인할 수 있게 했습니다.',
      },
      {
        title: 'Stack',
        body: 'React, FastAPI, Tailwind 기반으로 API 데이터 가공부터 추천 로직 화면화까지 직접 구현했습니다.',
      },
    ],
    images: [
      { src: '/assets/project-rookiz-modal.png', alt: 'Rookiz detail mockup' },
      { src: '/assets/project-rookiz.png', alt: 'Rookiz mobile mockup' },
    ],
    links: [
      { label: 'Site', href: 'https://rookiz-front.onrender.com/' },
      { label: 'GitHub', href: 'https://github.com/seoyun-tech/Rookiz' },
      { label: 'Deck', href: 'https://www.figma.com/deck/H3UyjjzSW8Ue5igGsHtDhC' },
      { label: 'Prototype', href: 'https://www.figma.com/proto/uiEEZajUsTu8qwpV3h2jVV/%E2%9D%A4ROOKIZ-%EB%94%94%EC%9E%90%EC%9D%B8?page-id=0%3A1&node-id=12-1473&p=f&viewport=174%2C621%2C0.05&t=zE9ezWslnC7PYs5k-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=15%3A249&show-proto-sidebar=1' },
    ],
  }),

  'spotify-redesign': detail('spotify-redesign', {
    title: 'Spotify App Redesign',
    meta: 'UX/UI Planning / Mobile App',
    summary: '방대한 음악 데이터 안에서 사용자가 상황에 맞는 곡을 더 쉽게 만날 수 있도록 TPO 기반 큐레이션 흐름을 설계했습니다.',
    role: 'UX/UI PLANNING',
    period: '2 Weeks',
    focus: 'Mobile Prototype',
    image: '/assets/project-spotify-scene.jpg',
    prototype: {
      url: 'https://www.figma.com/proto/tATtPvK1Ez7Jh9rJTsWAks/SPOTIFY-%EB%94%94%EC%9E%90%EC%9D%B8?node-id=2188-3467&p=f&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=2188%3A3467&page-id=2188%3A1329&hide-ui=1',
      mask: { top: '12.45%', left: '31.9%', width: '36.2%', height: '77.2%', radius: '21px' },
    },
    sections: [
      {
        title: 'Problem',
        body: '탐색할 음악은 많지만 개인의 상황과 취향을 빠르게 반영하는 진입 흐름이 부족하다고 정의했습니다.',
      },
      {
        title: 'Solution',
        body: 'AI 추천, 상황 기반 큐레이션, AI DJ 기능을 하나의 모바일 경험으로 연결했습니다.',
      },
      {
        title: 'Visual',
        body: '모바일 기기 목업 안에 Figma 프로토타입을 직접 삽입해 앱 리디자인의 인터랙션 흐름까지 보이도록 구성했습니다.',
      },
    ],
    images: [
      { src: '/assets/project-spotify-modal.png', alt: 'Spotify detail mockup' },
      { src: '/assets/project-spotify.png', alt: 'Spotify mobile mockup' },
    ],
    links: [
      { label: 'Deck', href: 'https://www.figma.com/deck/MpwEOgJp09w2yDCL1vJaRO' },
      { label: 'Prototype', href: 'https://www.figma.com/proto/POw2eRJp17TJFqJAngqN9U/%ED%94%84%EB%A1%9C%ED%86%A0%ED%83%80%EC%9E%85?page-id=0%3A1&node-id=229-2016&viewport=-9%2C247%2C0.25&t=qOFoPeUqZAqpYigk-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=229%3A2016&show-proto-sidebar=1' },
    ],
  }),

  'musinsa-redesign': detail('musinsa-redesign', {
    title: 'Musinsa Web Redesign',
    meta: 'Responsive Web Redesign',
    summary: '커머스와 콘텐츠가 섞여 복잡해진 탐색 흐름을 분리하고, 메인/상세/콘텐츠 페이지를 반응형 웹으로 재구성했습니다.',
    role: 'UX/UI Planning / Frontend',
    period: '2 Weeks',
    focus: 'Responsive Web',
    image: '/assets/project-musinsa-scene.png',
    sections: [
      {
        title: 'Structure',
        body: '쇼핑 목적과 콘텐츠 탐색 목적을 분리해 사용자가 원하는 정보로 빠르게 이동하도록 설계했습니다.',
      },
      {
        title: 'Execution',
        body: 'HTML, CSS, JavaScript로 3개 핵심 페이지와 모달 구조를 직접 구현했습니다.',
      },
      {
        title: 'Mockup',
        body: '대형 모니터 목업을 사용해 웹 리디자인의 화면 밀도와 반응형 구조를 한눈에 보여줍니다.',
      },
    ],
    images: [
      { src: '/assets/project-musinsa-modal.png', alt: 'Musinsa detail mockup' },
      { src: '/assets/project-musinsa.png', alt: 'Musinsa responsive mockup' },
    ],
    links: [
      { label: 'Site', href: 'https://seoyun-tech.github.io/projectA/' },
      { label: 'GitHub', href: 'https://github.com/seoyun-tech/projectA' },
      { label: 'Deck', href: 'https://www.figma.com/deck/6Q8nPmaCiP7fqgZbKrHWZF' },
    ],
  }),

  'vivien-online-channel': detail('vivien-online-channel', {
    title: 'Vivien Online Channel',
    meta: 'Online MD / Marketing',
    summary: '바바라 온라인 채널의 타겟, 촬영, SNS 운영 흐름을 재정비해 자사몰과 디지털 접점을 강화한 MD 프로젝트입니다.',
    role: 'Online MD',
    period: '2020 - 2022',
    focus: '+20% Online Sales',
    image: '/assets/works/vivien-main.png',
    sections: [
      {
        title: 'Issue',
        body: '기존 온라인 채널은 브랜드 이미지와 20-30대 타겟의 기대가 맞지 않아 전환에 한계가 있었습니다.',
      },
      {
        title: 'Action',
        body: '촬영 프로세스와 SNS 콘텐츠 흐름을 정리하고, 온라인 전용 상품 기획으로 디지털 전환을 보완했습니다.',
      },
      {
        title: 'Result',
        body: '온라인 매출 상승, 타겟 확장, 운영 비용 최적화라는 성과를 만든 프로젝트입니다.',
      },
    ],
    images: [
      { src: '/assets/works/vivien-online-1.png', alt: 'Vivien online channel work 1' },
      { src: '/assets/works/vivien-online-2.png', alt: 'Vivien online channel work 2' },
    ],
  }),

  'import-brand-buying': detail('import-brand-buying', {
    title: 'Import Brand Buying',
    meta: 'Buying MD / Global Sourcing',
    summary: '수입 라인업 공백을 해결하기 위해 대체 브랜드를 선별하고 발주, 재고 관리까지 바잉 프로세스를 구축했습니다.',
    role: 'Buying MD',
    period: '2020 - 2022',
    focus: '4 Import Brands',
    image: '/assets/works/vivien-buying-main.png',
    sections: [
      {
        title: 'Selection',
        body: '국내 채널에 맞는 해외 브랜드의 가격대, 스타일, 공급 안정성을 비교해 후보를 좁혔습니다.',
      },
      {
        title: 'Operation',
        body: '선정 이후 발주, 상품 정보, 입고 일정, 재고 흐름까지 운영에 필요한 프로세스를 관리했습니다.',
      },
      {
        title: 'Impact',
        body: '수입 카테고리 운영 정상화와 스타일 다양화로 브랜드 경쟁력을 보완했습니다.',
      },
    ],
    images: [
      { src: '/assets/works/vivien-buying-1.png', alt: 'Import brand buying work' },
    ],
  }),

  'poroe-brand-launch': detail('poroe-brand-launch', {
    title: 'POROE Brand Launch',
    meta: 'Brand Pivot / D2C Operation',
    summary: '생산 구조와 타겟을 재정의하며 브랜드 포지셔닝, 상품 구성, 콘텐츠 운영까지 직접 진행한 브랜드 런칭 프로젝트입니다.',
    role: 'Founder',
    period: '2022 - 2025',
    focus: '+30% Sales',
    image: '/assets/works/poroe-main.png',
    sections: [
      {
        title: 'Pivot',
        body: '니트웨어 중심 구조의 MOQ와 재고 부담을 해결하기 위해 카테고리 믹스와 타겟을 조정했습니다.',
      },
      {
        title: 'Branding',
        body: '키 큰 여성을 위한 코펜하겐 스타일이라는 니치 포지션으로 브랜드 메시지를 재정리했습니다.',
      },
      {
        title: 'Operation',
        body: '상품 기획, 생산, 촬영, 자사몰, SNS, 고객 응대까지 운영 전반을 직접 실행했습니다.',
      },
    ],
    images: [
      { src: '/assets/works/poroe-1.png', alt: 'POROE work 1' },
      { src: '/assets/works/poroe-2.png', alt: 'POROE work 2' },
      { src: '/assets/works/poroe-3.png', alt: 'POROE work 3' },
    ],
  }),
};
