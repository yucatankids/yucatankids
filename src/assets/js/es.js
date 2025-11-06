
//
//    The Language Toggle System
//

/* Body and Toggle */
var body = document.querySelector("body");
const languageToggle = document.querySelector("#language-toggle");

// Get language status
let browserLanguage = navigator.language || navigator.userLanguage;
let storedLanguage = localStorage.getItem("language");
let language = storedLanguage || browserLanguage || 'en';

// Apply DOM attributes and storage without redirect
const applyLangAttributes = (lang) => {
  if (lang === 'es') {
    body.classList.add('es-mode');
    document.documentElement.lang = 'es';
    localStorage.setItem('language', 'es');
  } else {
    body.classList.remove('es-mode');
    document.documentElement.lang = 'en';
    localStorage.setItem('language', 'en');
  }
};

// Only change the URL when the path actually needs switching to avoid reload loops/flashing
const ensurePathForLang = (lang) => {
  try {
    const href = location.href;
    if (lang === 'es' && href.includes('/en/')) {
      const newURL = '/es/';
      location.replace(newURL);
    } else if (lang === 'en' && href.includes('/es/')) {
      const newURL = '/en/';
      location.replace(newURL);
    }
  } catch (e) {
    // ignore errors changing location
  }
};

// Enable Spanish
const setLangToSpanish = () => {
  applyLangAttributes('es');
  ensurePathForLang('es');
}

// Disable Spanish / set English
const setLangToEnglish = () => {
  applyLangAttributes('en');
  ensurePathForLang('en');
}

// Initial setup: apply attributes immediately and only redirect if needed
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
  languageToggle.addEventListener('click', () => {
    // on click, check localstorage for the language value
    language = localStorage.getItem("language") || language;
    if (language !== "es") {
      // if language is not set to Spanish, run this function to set it
      setLangToSpanish();
    } else {
      // if language is set to Spanish, run this function to set it to English
      setLangToEnglish();
    }
  });
}