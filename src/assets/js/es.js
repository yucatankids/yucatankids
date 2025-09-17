
//
//    The Language Toggle System
//

/* Body and Toggle */
var body = document.querySelector("body");
const languageToggle = document.querySelector("#language-toggle");

// Get language status
let language = localStorage.getItem("language");


// If no language is set, set it to English by default
if (!language) {
localStorage.setItem("language", "en");
}

// Enable Spanish
const setLangToSpanish = () => {
  body.classList.add("es-mode");
  localStorage.setItem("language", "es")
}

// Disable Spanish
const setLangToEnglish = () => {
  body.classList.remove("es-mode");
  localStorage.setItem("language", 'en')
}

// Check the state of language in local storage
if (language == "es") {
  setLangToSpanish();
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