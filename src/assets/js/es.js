
//
//    The Language Toggle System
//

/* Body and Toggle */
// Safe helpers for localStorage (some browsers block access in privacy mode)
const safeGetItem = (key) => {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    return null;
  }
};
const safeSetItem = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    // ignore
  }
};

const languageToggleSelector = "#language-toggle";

// Get language status
let browserLanguage = (navigator && (navigator.language || navigator.userLanguage)) || '';
let storedLanguage = safeGetItem("language");
let language = storedLanguage || browserLanguage || 'en';

const initLanguageToggle = () => {
  const body = document.querySelector("body");
  const languageToggle = document.querySelector(languageToggleSelector);
  // set the dropdown button value based on the current language
  languageToggle.value = language.includes("es") ? "es" : "en";

  // Apply DOM attributes and storage 
  const applyLangAttributes = (lang) => {
    if (!body) return;
    if (lang === 'es') {
      body.classList.add('es-mode');
      body.classList.remove('en-mode');
      document.documentElement.lang = 'es';
      safeSetItem('language', 'es');
    } else {
      body.classList.add('en-mode');
      body.classList.remove('es-mode');
      document.documentElement.lang = 'en';
      safeSetItem('language', 'en');
    }
  };

  // Only change the URL when the path actually needs switching to avoid reload loops/flashing
    const ensurePathForLang = (lang) => {
      try {
        // Use sessionStorage as a short-lived guard so redirects happen only once per session
        let alreadyRedirected = null;
        try {
          alreadyRedirected = sessionStorage.getItem('languageRedirectedTo');
        } catch (e) {
          // sessionStorage may be unavailable in some privacy modes — ignore
        }

        const pathname = location.pathname || '/';

        if (lang === 'es') {
          // If already on an /es/ path or we've already redirected to 'es' this session, do nothing
          if (pathname.startsWith('/es/') || alreadyRedirected === 'es') return;
          try { sessionStorage.setItem('languageRedirectedTo', 'es'); } catch (e) {}
          window.location.replace('/es/');
        } else if (lang === 'en') {
          // If not on an /es/ path or we've already redirected to 'en' this session, do nothing
          if (!pathname.startsWith('/es/') || alreadyRedirected === 'en') return;
          try { sessionStorage.setItem('languageRedirectedTo', 'en'); } catch (e) {}
          window.location.replace('/');
        }
      } catch (e) {
        // ignore errors changing location or accessing storage
      }
    };

  // Enable Spanish
  const setLangToSpanish = () => {
    applyLangAttributes('es');
    ensurePathForLang('es');
  };

  // Disable Spanish / set English
  const setLangToEnglish = () => {
    applyLangAttributes('en');
    ensurePathForLang('en');
  };

  // Apply attributes immediately and only redirect if needed
  if (!language) {
    setLangToEnglish();
  } else {
    // Check the state of user browser language settings
    if (language.includes("es")) {
      setLangToSpanish();
    } else {
      setLangToEnglish();
    }
  }

  // add event listener to the language button toggle if it exists
  if (languageToggle) {
    languageToggle.addEventListener('change', (event) => {
      // get the selected language from the toggle
      selectedLang = event.target.value;
      // if the selected language is ES and the current lang is not ES, 
      // set it to Spanish
      if (selectedLang === "es" && language !== "es") {
        setLangToSpanish();
      } else if (selectedLang === "en" && language === "es") {
        // else if the selected language is EN and the current lang is ES,
        // set it to English
        setLangToEnglish();
      }
    });
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLanguageToggle);
} else {
  initLanguageToggle();
}