import { renderCvDocument } from './cv-document.js';

const root = document.getElementById('cv-root');
if (root) root.innerHTML = renderCvDocument();

document.getElementById('cv-print-btn')?.addEventListener('click', () => window.print());
