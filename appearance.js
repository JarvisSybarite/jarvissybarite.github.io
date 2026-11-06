(() => {
  const key = 'jarvis-portfolio-theme';
  const root = document.documentElement;
  const system = matchMedia('(prefers-color-scheme: dark)');
  let preference = 'auto';
  try {
    const saved = localStorage.getItem(key);
    if (['auto', 'light', 'dark'].includes(saved)) preference = saved;
  } catch {}
  const render = () => {
    root.dataset.theme = preference === 'auto' ? (system.matches ? 'dark' : 'light') : preference;
  };
  render();
  system.addEventListener('change', render);
  document.addEventListener('DOMContentLoaded', () => {
    const picker = document.querySelector('#site-theme');
    if (!picker) return;
    picker.value = preference;
    picker.addEventListener('change', () => {
      preference = picker.value;
      try { localStorage.setItem(key, preference); } catch {}
      render();
    });
  });
  window.addEventListener('storage', event => {
    if (event.key !== key) return;
    preference = ['light', 'dark'].includes(event.newValue) ? event.newValue : 'auto';
    const picker = document.querySelector('#site-theme');
    if (picker) picker.value = preference;
    render();
  });
})();
