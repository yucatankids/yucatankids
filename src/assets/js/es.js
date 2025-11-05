
//
//    The Language Toggle System
//

/* Body and Toggle */
var body = document.querySelector("body");
const languageToggle = document.querySelector("#language-toggle");

// Get language status
let language = navigator.language || navigator.userLanguage;

// Enable Spanish
const setLangToSpanish = () => {
  body.classList.add("es-mode");
  localStorage.setItem("language", "es");
  document.documentElement.lang = "es";
}

// Disable Spanish
const setLangToEnglish = () => {
  body.classList.remove("es-mode");
  localStorage.setItem("language", 'en');
  document.documentElement.lang = "en";
}

// If no language is set, set it to English by default
if (!language) {
  setLangToEnglish();
} else {
  // Check the state of user browser language settings
  if (language.includes("es")) {
    setLangToSpanish();
  } else if (language.includes("en")) {
    setLangToEnglish();
  }
}

// add event listener to the language button toggle
languageToggle.addEventListener('click', () => {
  // on click, check localstorage for the language value
  language = localStorage.getItem("language");
  if (language !== "es") {
    // if language is not set to Spanish, run this function to set it
    setLangToSpanish();
  } else {
    // if language is set to Spanish, run this function to set it to English
    setLangToEnglish();
  }
})