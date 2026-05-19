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

const PROTOTYPE_HERO_CLASS = {
  'spotify-redesign': 'portfolio-hero-card--spotify-proto',
  rookiz: 'portfolio-hero-card--rookiz-proto',
};

function heroMockup({ slug, title, image, prototype }) {
  if (!prototype) {
    return `<div class="portfolio-hero-card">
      <img src="${image}" alt="${title}" loading="lazy"/>
    </div>`;
  }

  const protoModifier = PROTOTYPE_HERO_CLASS[slug] ? ` ${PROTOTYPE_HERO_CLASS[slug]}` : '';

  return `<div class="portfolio-hero-card portfolio-hero-card--prototype${protoModifier}">
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
            <strong>역할</strong> ${role}
            <strong>기간</strong> ${period}
            <strong>핵심</strong> ${focus}
          </p>
          ${linkList(links)}
        </div>
        ${heroMockup({ slug, title, image, prototype })}
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
    meta: 'AI 키즈 OTT 서비스',
    summary: '어린이가 안전하게 탐색할 수 있도록 AI 추천 흐름과 키즈 OTT 화면 구조를 기획·구현한 풀스택 프로젝트입니다.',
    role: '기획 / 디자인 / 개발',
    period: '1주',
    focus: 'AI 추천',
    image: '/assets/projects/rookiz-scene.jpg',
    prototype: {
      url: 'https://www.figma.com/proto/uiEEZajUsTu8qwpV3h2jVV/ROOKIZ-%EB%94%94%EC%9E%90%EC%9D%B8?node-id=4230-7512&p=f&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=4230%3A7512&page-id=0%3A1&hide-ui=1',
      mask: { top: '17.3%', left: '12.1%', width: '75.6%', height: '53.35%', radius: '4% / 5.85%' },
    },
    sections: [
      {
        title: '목표',
        body: '성인 중심 OTT 구조에서 벗어나 연령과 관심사에 맞는 콘텐츠를 자동 추천하는 키즈 전용 경험을 설계했습니다.',
      },
      {
        title: '기술 스택',
        body: 'React, FastAPI, Tailwind 기반으로 API 데이터 가공부터 추천 로직 화면화까지 직접 구현했습니다.',
      },
      {
        title: '결과',
        body: '연령·관심사 기반 키즈 전용 자동 큐레이션 환경을 완성하고 실서비스로 배포. 서비스 로직과 사용자 경험을 동시에 설계했습니다.',
      },
    ],
    links: [
      { label: 'Site', href: 'https://rookiz-front.onrender.com/' },
      { label: 'GitHub', href: 'https://github.com/seoyun-tech/Rookiz' },
      { label: 'Deck', href: 'https://www.figma.com/deck/H3UyjjzSW8Ue5igGsHtDhC' },
      { label: 'Prototype', href: 'https://www.figma.com/proto/uiEEZajUsTu8qwpV3h2jVV/%E2%9D%A4ROOKIZ-%EB%94%94%EC%9E%90%EC%9D%B8?page-id=0%3A1&node-id=12-1473&p=f&viewport=174%2C621%2C0.05&t=zE9ezWslnC7PYs5k-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=15%3A249&show-proto-sidebar=1' },
    ],
  }),

  'spotify-redesign': detail('spotify-redesign', {
    title: '스포티파이 앱 리디자인',
    meta: 'UX/UI 기획 / 모바일 앱',
    summary: '방대한 음악 데이터 안에서 상황에 맞는 곡을 더 쉽게 만날 수 있도록 TPO 기반 큐레이션 흐름을 설계했습니다.',
    role: 'UX/UI 기획',
    period: '2주',
    focus: '모바일 프로토타입',
    image: '/assets/projects/spotify-scene.jpg',
    prototype: {
      url: 'https://www.figma.com/proto/tATtPvK1Ez7Jh9rJTsWAks/SPOTIFY-%EB%94%94%EC%9E%90%EC%9D%B8?node-id=2188-3467&p=f&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=2188%3A3467&page-id=2188%3A1329&hide-ui=1',
      mask: { top: '12.38%', left: '31.88%', width: '36.22%', height: '77.92%', radius: '14% / 4.9%' },
    },
    sections: [
      {
        title: '문제',
        body: '탐색할 음악은 많지만 개인의 상황과 취향을 빠르게 반영하는 진입 흐름이 부족하다고 정의했습니다.',
      },
      {
        title: '해결',
        body: 'AI 추천, 상황 기반 큐레이션, AI DJ 기능을 하나의 모바일 경험으로 연결했습니다.',
      },
      {
        title: '결과',
        body: 'TPO 기반 큐레이션과 AI 추천을 하나의 탐색 흐름으로 통합. 능동적 탐색 없이도 최적의 음악을 만나는 개인화 UX를 10화면 Figma 프로토타입으로 구현했습니다.',
      },
    ],
    links: [
      { label: 'Deck', href: 'https://www.figma.com/deck/MpwEOgJp09w2yDCL1vJaRO' },
      { label: 'Prototype', href: 'https://www.figma.com/proto/POw2eRJp17TJFqJAngqN9U/%ED%94%84%EB%A1%9C%ED%86%A0%ED%83%80%EC%9E%85?page-id=0%3A1&node-id=229-2016&viewport=-9%2C247%2C0.25&t=qOFoPeUqZAqpYigk-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=229%3A2016&show-proto-sidebar=1' },
    ],
  }),

  'musinsa-redesign': detail('musinsa-redesign', {
    title: '무신사 웹 리디자인',
    meta: '반응형 웹 리디자인',
    summary: '커머스와 콘텐츠가 섞여 복잡해진 탐색 흐름을 분리하고, 메인/상세/콘텐츠 페이지를 반응형 웹으로 재구성했습니다.',
    role: 'UX/UI 기획 / 프론트엔드',
    period: '2주',
    focus: '반응형 웹',
    image: '/assets/projects/musinsa-scene.png',
    sections: [
      {
        title: '구조',
        body: '백화점 동선에서 영감을 얻어 [진입→욕구→구매→탐색] 흐름으로 커머스와 콘텐츠 탐색을 분리했습니다.',
      },
      {
        title: '실행',
        body: 'HTML, CSS, JavaScript로 3개 핵심 페이지와 모달 구조를 직접 구현했습니다.',
      },
      {
        title: '결과',
        body: '복잡한 탐색 구조를 단순화하고 사용자 목적에 맞는 동선을 구현. 반응형 레이아웃으로 디바이스 대응까지 완성했습니다.',
      },
    ],
    links: [
      { label: 'Site', href: 'https://seoyun-tech.github.io/projectA/' },
      { label: 'GitHub', href: 'https://github.com/seoyun-tech/projectA' },
      { label: 'Deck', href: 'https://www.figma.com/deck/6Q8nPmaCiP7fqgZbKrHWZF' },
    ],
  }),

  'vivien-online-channel': detail('vivien-online-channel', {
    title: '바바라 온라인 채널 리뉴얼',
    meta: '온라인 MD / 마케팅',
    summary: '바바라 온라인 채널의 타겟, 촬영, SNS 운영 흐름을 재정비해 자사몰과 디지털 접점을 강화한 MD 프로젝트입니다.',
    role: '온라인 MD',
    period: '2020 - 2022',
    focus: '+10% 온라인 매출 성장',
    image: '/assets/projects/vivien-online-scene.png',
    sections: [
      {
        title: '문제',
        body: '기존 온라인 채널은 브랜드 이미지와 20-30대 타겟의 기대가 맞지 않아 전환에 한계가 있었습니다.',
      },
      {
        title: '실행',
        body: '촬영 프로세스와 SNS 콘텐츠 흐름을 정리하고, 온라인 전용 상품 기획으로 디지털 전환을 보완했습니다.',
      },
      {
        title: '결과',
        body: '온라인 매출 10% 성장, 타겟 확장, 운영 비용 최적화를 달성했습니다.',
      },
    ],
    images: [
      { src: '/assets/projects/vivien-online-1.png', alt: 'Vivien online channel work 1' },
      { src: '/assets/projects/vivien-online-2.png', alt: 'Vivien online channel work 2' },
    ],
  }),

  'import-brand-buying': detail('import-brand-buying', {
    title: '수입 브랜드 바잉 운영',
    meta: '바잉 MD / 글로벌 소싱',
    summary: '수입 라인업 공백을 해결하기 위해 대체 브랜드를 선별하고 발주, 재고 관리까지 바잉 프로세스를 구축했습니다.',
    role: '바잉 MD',
    period: '2020 - 2022',
    focus: '+20% 카테고리 매출 성장',
    image: '/assets/projects/vivien-buying-scene.png',
    sections: [
      {
        title: '선정',
        body: '국내 채널에 맞는 해외 브랜드의 가격대, 스타일, 공급 안정성을 비교해 후보를 좁혔습니다.',
      },
      {
        title: '운영',
        body: '선정 이후 발주, 상품 정보, 입고 일정, 재고 흐름까지 운영에 필요한 프로세스를 관리했습니다.',
      },
      {
        title: '성과',
        body: '수입 라인업 전면 개편으로 브랜드 스타일을 다각화하고 카테고리 매출 전년 대비 20% 성장에 기여했습니다.',
      },
    ],
    images: [
      { src: '/assets/projects/vivien-buying-1.png', alt: 'Import brand buying work' },
    ],
  }),

  'poroe-brand-launch': detail('poroe-brand-launch', {
    title: '포레 브랜드 피벗',
    meta: '브랜드 피벗 / D2C 운영',
    summary: 'MOQ와 재고 부담을 해소하기 위해 생산 구조와 포지셔닝을 전면 재정의한 D2C 브랜드 피벗 프로젝트입니다.',
    role: '대표',
    period: '2022 - 2025',
    focus: '+30% 매출 성장',
    image: '/assets/projects/poroe-scene.png',
    sections: [
      {
        title: '피벗',
        body: '니트웨어 중심 구조의 MOQ와 재고 부담을 해결하기 위해 카테고리 믹스와 타겟을 조정했습니다.',
      },
      {
        title: '브랜딩',
        body: '키 큰 여성을 위한 코펜하겐 스타일이라는 니치 포지션으로 브랜드 메시지를 재정리했습니다.',
      },
      {
        title: '결과',
        body: '브랜드 피벗 이후 전년 대비 매출 30% 성장. 니치 포지셔닝과 D2C 전환으로 브랜드 지속 가능성을 입증했습니다.',
      },
    ],
    images: [
      { src: '/assets/projects/poroe-1.png', alt: 'POROE work 1' },
      { src: '/assets/projects/poroe-2.png', alt: 'POROE work 2' },
      { src: '/assets/projects/poroe-3.png', alt: 'POROE work 3' },
    ],
  }),
};
