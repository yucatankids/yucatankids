
//
//    The Language Toggle System
//

const languageToggleSelector = "#language-toggle";

const initLanguageToggle = () => {
  const languageToggle = document.querySelector(languageToggleSelector);
  if (!languageToggle) return;

  // Set the select value to match the current page's language (set at build time on <html lang="...">)
  const currentLang = document.documentElement.lang || 'en';
  languageToggle.value = currentLang.startsWith('es') ? 'es' : 'en';

  languageToggle.addEventListener('change', (event) => {
    const selectedLang = event.target.value;
    // URLs for each locale are baked in as data attributes at build time via locale_url filter
    const url = selectedLang === 'es'
      ? languageToggle.dataset.urlEs
      : languageToggle.dataset.urlEn;
    if (url) {
      window.location.assign(url);
    }
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLanguageToggle);
} else {
  initLanguageToggle();
}
