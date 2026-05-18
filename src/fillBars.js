/** unRovr main.js fillBars — animate skill bars when page is loaded */
export function resetSkillBars(container) {
  if (!container) return;
  container.querySelectorAll('.bar[data-percent] .progress').forEach((progress) => {
    progress.style.width = '0';
    progress.innerHTML = '';
  });
}

export function fillSkillBars(container) {
  if (!container) return;
  container.querySelectorAll('.bar[data-percent]').forEach((bar) => {
    const percent = bar.getAttribute('data-percent');
    const progress = bar.querySelector('.progress');
    if (!percent || !progress) return;

    progress.style.width = '0';
    progress.innerHTML = '';

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        progress.style.width = `${percent}%`;
        progress.innerHTML = `<span>${percent}</span>`;
      });
    });
  });
}
