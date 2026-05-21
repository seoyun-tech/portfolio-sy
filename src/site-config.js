/** Site-wide copy & assets — print cv.html → Save as PDF → /public/cv.pdf for download link */
export const CV_URL = '/cv.html';
export const CV_DOWNLOAD_NAME = 'Park_Seoyun_CV.pdf';

export const SEO = {
  siteName: 'Park Seo‑yun',
  title: '박서윤 – 상품기획 MD 포트폴리오',
  description:
    '패션 상품기획 MD. 바바라 온라인 자사몰 +31%, 2021 F/W 수입 카테고리 108%. 온라인, 수입 바잉, D2C 실무.',
  locale: 'ko_KR',
};

/** Verified metrics (discussion 2026) — edit here to keep site in sync */
export const METRICS = {
  barbara: {
    short: '바바라 자사몰, 전년 하반기 대비 +31%',
    detail: '바바라 온라인 자사몰 매출, 당해 하반기 vs 전년 하반기 +31%',
  },
  import: {
    season: '2021 F/W',
    scope: '수입 카테고리 전체',
    target: '108%',
    yoy: '+8.2%',
    yoyBaseline: '2020 F/W 대비',
    sellThrough: '샹텔 52%, 에버제이 39%, 플루토 64%',
  },
  poroe: {
    short: '25 S/S 자사몰, 24 S/S 대비 +37%',
    detail: '2025 S/S(포레) vs 2024 S/S(공원더파크) 자사몰 매출 +37%',
  },
};

/** Shared narrative — keep Intro / About / Resume / Portfolio aligned */
export const STORY = {
  vivienRole: '상품기획 MD',
  vivienPeriod: '2020.03 - 2022.05 (남영비비안)',
  poroePeriod: '2022.05 - 2025.10 (포레)',
  labels: {
    productPlanning: '상품기획',
    importBuying: '수입 바잉',
    onlineChannel: '온라인 기획',
    production: '생산관리',
    d2c: 'D2C',
    brandPivot: '브랜드 피벗',
    supplementary: '보조',
  },
  portfolioIntro:
    '패션 상품기획 MD 실무가 핵심입니다. 수입 바잉, 온라인 채널, D2C·리브랜딩 프로젝트로 검증했습니다. 디지털 항목은 커머스·UX 보조 역량입니다.',
};

export const HERO = {
  role: '상품기획 MD',
  roleFocus: '온라인 / 수입 바잉',
  tagline: '검증된 매출 지표',
  metricsLines: [
    '바바라 자사몰 전년 하반기 +31%',
    `${METRICS.import.season} 수입 카테고리 ${METRICS.import.target}`,
  ],
};

export const ABOUT = {
  sectionKeyRoles: 'KEY ROLES',
  lead: [
    '남영비비안 상품기획 MD로 시즌 라인업, 생산, 원가, 납기를 담당했습니다.',
    '바바라 온라인, 수입 바잉을 포함해 기획과 실행을 연결하고 매출 지표로 검증했습니다.',
  ],
  numbers: [
    { value: '108%', label: '2021 F/W 수입 카테고리' },
    { value: '31%', label: '바바라 자사몰' },
    { value: '2년', label: '상품기획 MD' },
  ],
  highlights: [
    {
      icon: 'fa-solid fa-tags',
      title: '남영비비안',
      text: `시즌 라인업 · 생산 · 온라인 · ${STORY.labels.importBuying}`,
    },
    {
      icon: 'fa-solid fa-bullseye',
      title: '포레',
      text: `시즌 기획 · 생산 · ${STORY.labels.d2c} 자사몰`,
    },
  ],
  whyNow: [
    'D2C를 직접 운영하며 기획, 실행, 매출을 한 흐름으로 다져 왔습니다.',
    '이제 조직에서 시즌 상품 기획과 온라인, 바잉 협업을 이어가고 싶습니다.',
  ],
};

export const RESUME = {
  work: {
    poroe: {
      period: '2022.05 - 2025.10',
      title: '대표',
      subtitle: '포레',
      bullets: [
        '시즌별 32 SKU 기획, 생산, D2C 자사몰 운영',
        '공원더파크에서 포레로 리브랜딩, D2C 채널 운영',
        '패션코드 2023 F/W 참가',
      ],
    },
    vivien: {
      period: '2020.03 - 2022.05',
      title: '상품기획 MD',
      subtitle: '남영비비안',
      bullets: [
        '시즌 라인업 기획, 샘플 검수, 납기·원가 협상 등 생산 전 과정',
        `${METRICS.import.season} 수입 카테고리 ${METRICS.import.target} (${METRICS.import.yoyBaseline} ${METRICS.import.yoy})`,
        '바바라 자사몰 전년 하반기 +31%',
        'ERP 전표 입력, 매출 데이터 분석',
      ],
    },
  },
};
