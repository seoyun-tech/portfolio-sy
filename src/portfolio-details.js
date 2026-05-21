import { METRICS, STORY } from './site-config.js';

/** Portfolio list order — keep in sync with PORTFOLIO_PROJECTS in pages.js */
export const FASHION_SLUGS = ['import-brand-buying', 'vivien-online-channel', 'poroe-brand-launch'];
export const DIGITAL_SLUGS = ['rookiz', 'spotify-redesign', 'musinsa-redesign'];
export const ALL_PORTFOLIO_SLUGS = [...FASHION_SLUGS, ...DIGITAL_SLUGS];

function navLink(className, label, slug) {
  if (!slug) return '';
  return `<span class="${className}"><a class="ajax" href="#/portfolio/${slug}">${label}</a></span>`;
}

/** Tab filter: * (ALL), .fashion-project, .digital-project */
export function getNavSlugsForFilter(filter = '*') {
  if (filter === '.fashion-project') return FASHION_SLUGS;
  if (filter === '.digital-project') return DIGITAL_SLUGS;
  return ALL_PORTFOLIO_SLUGS;
}

export function buildPortfolioNav(slug, filter = '*') {
  const slugs = getNavSlugsForFilter(filter);
  const index = slugs.indexOf(slug);
  if (index < 0) {
    return `<nav class="portfolio-nav">
    <span class="back"><a href="#/portfolio">Back</a></span>
  </nav>`;
  }

  const prev = index > 0 ? slugs[index - 1] : '';
  const next = index < slugs.length - 1 ? slugs[index + 1] : '';
  return `<nav class="portfolio-nav">
    ${navLink('prev', 'Previous', prev)}
    <span class="back"><a href="#/portfolio">Back</a></span>
    ${navLink('next', 'Next', next)}
  </nav>`;
}

function nav(slug) {
  const filter = FASHION_SLUGS.includes(slug)
    ? '.fashion-project'
    : DIGITAL_SLUGS.includes(slug)
      ? '.digital-project'
      : '*';
  return buildPortfolioNav(slug, filter);
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

function heroMockup({ slug, title, image, prototype, contentHero = false }) {
  if (!prototype) {
    const heroClass = contentHero ? 'portfolio-hero-card portfolio-hero-card--content' : 'portfolio-hero-card';
    return `<div class="${heroClass}">
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

function portfolioMeta({ role, period, scope, focus, compact = false }) {
  const rows = compact
    ? [
        { label: '역할', value: role },
        { label: '핵심 성과', value: focus },
        { label: '기간', value: period },
      ]
    : [
        { label: '역할', value: role },
        { label: '기간', value: period },
        ...(scope ? [{ label: '범위', value: scope }] : []),
        { label: '핵심 성과', value: focus },
      ];
  const metaClass = compact ? 'portfolio-meta portfolio-meta--compact' : 'portfolio-meta';
  return `<dl class="${metaClass}">
    ${rows
      .map(
        ({ label, value }) => `<div class="portfolio-meta-row">
      <dt>${label}</dt>
      <dd>${value}</dd>
    </div>`
      )
      .join('')}
  </dl>`;
}

function detail(slug, { title, meta, summary, role, period, focus, scope, image, prototype, sections, images, links, supplementary = false }) {
  return `<div class="portfolio-single page-layout">
    <article class="hentry format-standard">
      ${nav(slug)}
      <header class="entry-header"><h1 class="entry-title">${title}</h1></header>
      <div class="entry-content">
        <div class="portfolio-desc">
          <p class="portfolio-kicker">${meta}</p>
          <p>${summary}</p>
          ${portfolioMeta({ role, period, scope, focus, compact: supplementary })}
          ${linkList(links)}
        </div>
        ${heroMockup({ slug, title, image, prototype, contentHero: !supplementary && !prototype })}
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
    supplementary: true,
    title: 'Rookiz',
    meta: 'AI 키즈 OTT 서비스',
    summary: '키즈 OTT — 연령·관심사 기반 AI 추천을 기획하고 풀스택으로 구현.',
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
        body: '연령·관심사 기반 키즈 전용 자동 큐레이션 흐름을 end-to-end로 구현하고, Render에 배포해 URL로 시연 가능한 MVP를 완성했습니다.',
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
    supplementary: true,
    title: '스포티파이 앱 리디자인',
    meta: 'UX/UI 기획 / 모바일 앱',
    summary: 'TPO 기반 큐레이션으로 상황에 맞는 음악 탐색 흐름 설계.',
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
        body: 'TPO 기반 큐레이션과 AI 추천을 하나의 탐색 흐름으로 통합했습니다. 능동적 탐색 없이도 음악을 만날 수 있는 개인화 UX를 10화면 Figma 프로토타입으로 구현했습니다.',
      },
    ],
    links: [
      { label: 'Deck', href: 'https://www.figma.com/deck/MpwEOgJp09w2yDCL1vJaRO' },
      { label: 'Prototype', href: 'https://www.figma.com/proto/POw2eRJp17TJFqJAngqN9U/%ED%94%84%EB%A1%9C%ED%86%A0%ED%83%80%EC%9E%85?page-id=0%3A1&node-id=229-2016&viewport=-9%2C247%2C0.25&t=qOFoPeUqZAqpYigk-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=229%3A2016&show-proto-sidebar=1' },
    ],
  }),

  'musinsa-redesign': detail('musinsa-redesign', {
    supplementary: true,
    title: '무신사 웹 리디자인',
    meta: '반응형 웹 리디자인',
    summary: '커머스·콘텐츠 동선 분리, 3페이지 반응형 웹 구현.',
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
        body: '복잡한 탐색 구조를 단순화하고 사용자 목적에 맞는 동선을 구현했습니다. 반응형 레이아웃으로 디바이스 대응까지 완성했습니다.',
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
    meta: STORY.labels.onlineChannel,
    summary: `바바라 온라인 타겟·촬영·SNS 재정비, ${METRICS.barbara.short}.`,
    role: `${STORY.vivienRole}, ${STORY.labels.onlineChannel} 담당`,
    period: STORY.vivienPeriod,
    scope: '바바라 자사몰, 촬영/SNS, 온라인 전용 SKU',
    focus: METRICS.barbara.short,
    image: '/assets/projects/vivien-online-2.png',
    sections: [
      {
        title: '상황',
        body: '온라인 채널에서 브랜드 컨셉과 촬영 이미지가 어긋나 정체성 전달이 약했고, 경쟁 대비 자사몰, 디지털 활용도가 낮은 상태였습니다.',
      },
      {
        title: '과제',
        body: '2030 타겟에 맞게 온라인 브랜드 경험을 재정의하고, 촬영, SNS, 상품 기획을 한 흐름으로 묶어 자사몰 매출과 운영 효율을 개선하는 것이 목표였습니다.',
      },
      {
        title: '실행',
        body: '① 타겟·컨셉 재정립 후 모델·촬영 전면 교체<br>② 네트워크 협업으로 촬영 시간 2배 확보, 비용 절감<br>③ SNS·인플루언서·온라인 전용 상품 기획으로 자사몰 차별화<br>④ 생산·마케팅·디자인과 크로스 협업',
      },
      {
        title: '성과',
        body: `<strong>${METRICS.barbara.detail}</strong>를 달성했습니다. 촬영 리소스를 2배 확보하고 비용을 절감했으며, 2030 신규 타겟을 겨냥한 디지털 전환을 완료했습니다. <em>※ 자사몰 기준. 본인 담당: ${STORY.labels.onlineChannel}, 실행.</em>`,
      },
    ],
    images: [{ src: '/assets/projects/vivien-online-1.png', alt: '바바라 온라인 시즌 운영 프로세스' }],
  }),

  'import-brand-buying': detail('import-brand-buying', {
    title: '해외 수입 브랜드 바잉 기획 및 운영',
    meta: STORY.labels.importBuying,
    summary: `${METRICS.import.season} ${METRICS.import.scope} 재편·3개국 신규 바잉, 목표 ${METRICS.import.target}.`,
    role: `${STORY.vivienRole}, 수입 바잉 담당`,
    period: STORY.vivienPeriod,
    scope: `${METRICS.import.season}, ${METRICS.import.scope}, 3개국 신규 바잉`,
    focus: `목표 ${METRICS.import.target}, ${METRICS.import.yoyBaseline} ${METRICS.import.yoy}`,
    image: '/assets/projects/vivien-buying-1.png',
    sections: [
      {
        title: '상황',
        body: '기존 수입 브랜드 포트폴리오의 매출 효율이 브랜드별로 불균형했고, 스타일, 가격대 다양화를 위해 구성 재편이 필요했습니다.',
      },
      {
        title: '과제',
        body: '2021 F/W 시즌, 수입 카테고리 전체 매출 목표를 달성하고 전년(2020 F/W) 대비 성장을 내는 것이 과제였습니다.',
      },
      {
        title: '실행',
        body: '① 매출 데이터 분석 기반 기존 브랜드 포트폴리오 재편<br>② 프랑스(샹텔), 미국(에버제이), 벨기에(플루토) 3개국 신규 브랜드 바잉 기획<br>③ 브랜드별 가격 전략 차등 운영 및 편집샵형 멀티 브랜드 구성',
      },
      {
        title: '성과',
        body: `<strong>${METRICS.import.season} ${METRICS.import.scope}, 목표 ${METRICS.import.target}, ${METRICS.import.yoyBaseline} ${METRICS.import.yoy}</strong>를 달성했습니다. 신규 3브랜드 첫 시즌 입고 대비 판매율은 ${METRICS.import.sellThrough}입니다. <em>※ ${METRICS.import.season}, ${METRICS.import.scope} 기준.</em>`,
      },
    ],
    images: [{ src: '/assets/projects/vivien-buying-scene.png', alt: '수입 브랜드 포트폴리오' }],
  }),

  'poroe-brand-launch': detail('poroe-brand-launch', {
    title: '포레 D2C · 리브랜딩',
    meta: `${STORY.labels.d2c}, 시즌 기획`,
    summary: `리브랜딩·D2C 운영, ${METRICS.poroe.short}.`,
    role: '대표, 상품, 브랜드, D2C 총괄',
    period: STORY.poroePeriod,
    scope: '시즌 32 SKU, 생산, 재고, D2C(자사몰, SNS)',
    focus: METRICS.poroe.short,
    image: '/assets/projects/poroe-3.png',
    sections: [
      {
        title: '상황',
        body: '니트 중심 구조에서 긴 리드타임, 높은 MOQ로 재고 부담이 커졌고, 신생 브랜드로서 손익, 현금흐름 관리가 어려운 상태였습니다.',
      },
      {
        title: '과제',
        body: '생산 단위, SKU 구조를 조정해 재고 리스크를 낮추고, 명확한 니치 포지션과 D2C 채널로 매출을 회복, 안정화하는 것이 목표였습니다.',
      },
      {
        title: '실행',
        body: '① 공원더파크에서 포레로 리브랜딩, 우븐·사틴 중심 여성복으로 전환<br>② 키 큰 여성을 위한 코펜하겐 감성으로 니치 포지셔닝<br>③ 인스타그램·인플루언서 중심 D2C 채널 전략 구축',
      },
      {
        title: '성과',
        body: `<strong>${METRICS.poroe.detail}</strong>를 달성했습니다. 24 F/W까지는 공원더파크, 25 S/S부터 포레로 운영했습니다. 재고·MOQ 부담을 완화하고 D2C 운영을 안정화했습니다. <em>※ 자사몰, 동시즌(S/S) 비교.</em>`,
      },
    ],
    images: [
      { src: '/assets/projects/poroe-1.png', alt: '포레 시즌 판매 리뷰' },
      { src: '/assets/projects/poroe-2.png', alt: '포레 오더·입고 현황' },
    ],
  }),
};
