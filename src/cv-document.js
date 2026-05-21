import { METRICS, RESUME, STORY } from './site-config.js';

/** One-page CV HTML — sync with site-config (print → Save as PDF → public/cv.pdf) */
export function renderCvDocument() {
  const v = RESUME.work.vivien;
  const p = RESUME.work.poroe;

  return `<article class="cv-doc">
  <header class="cv-head">
    <h1>박서윤</h1>
    <p class="cv-role">${STORY.vivienRole}</p>
    <p class="cv-focus">온라인 · 수입 바잉</p>
    <p class="cv-proof">${METRICS.barbara.short} · ${METRICS.import.season} ${METRICS.import.scope} 목표 ${METRICS.import.target}</p>
  </header>

  <section class="cv-section">
    <h2>경력</h2>
    <div class="cv-job">
      <div class="cv-job-meta">
        <strong>${v.subtitle}</strong>
        <span>${v.period}</span>
      </div>
      <p class="cv-job-title">${v.title}</p>
      <ul>${v.bullets.map((b) => `<li>${b}</li>`).join('')}</ul>
    </div>
    <div class="cv-job">
      <div class="cv-job-meta">
        <strong>${p.subtitle}</strong>
        <span>${p.period}</span>
      </div>
      <p class="cv-job-title">${p.title}</p>
      <ul>${p.bullets.map((b) => `<li>${b}</li>`).join('')}</ul>
    </div>
  </section>

  <section class="cv-section cv-section--cols">
    <div>
      <h2>핵심 역량</h2>
      <ul class="cv-tags">
        <li>${STORY.labels.productPlanning}</li>
        <li>${STORY.labels.importBuying}</li>
        <li>${STORY.labels.onlineChannel}</li>
        <li>${STORY.labels.production}</li>
      </ul>
    </div>
    <div>
      <h2>도구</h2>
      <ul class="cv-tags">
        <li>ERP</li>
        <li>MS Office</li>
        <li>Notion</li>
        <li>Figma</li>
      </ul>
    </div>
    <div>
      <h2>언어</h2>
      <ul class="cv-tags">
        <li>한국어 (Native)</li>
        <li>영어 (Business)</li>
      </ul>
    </div>
  </section>

  <section class="cv-section">
    <h2>학력 · 기타</h2>
    <p><strong>Nottingham Trent University (UK)</strong> Fashion Design · 2016.09 – 2019.06<br>
    River Island 2019 Menswear Collection Concept Competition 전체 우승</p>
    <p class="cv-muted">MBC 아카데미 웹 개발 과정 (2025.10 – 2026.04) — 커머스·기획서 시각화 보조</p>
  </section>

  <footer class="cv-foot">
    <p>용산구, 서울 · +82 10 7408 7823 · cielle.sora@gmail.com</p>
    <p class="cv-muted">포트폴리오 상세: 패션 MD 프로젝트 3건 (수입 바잉, 바바라 온라인, 포레 D2C)</p>
  </footer>
</article>`;
}
