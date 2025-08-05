/* Body and Toggle */
var body = document.querySelector("body");
const espanolToggle = document.getElementById("espanol-mode-toggle");

// var body = document.querySelector("body");
// const espanolToggle = document.querySelector("#espanol-mode-toggle");

// Get Status of Language
let espanol = localStorage.getItem("espanol");

// Enable Language Mode
const enableEspanol = () => {
  body.classList.add("espanol-mode");
  localStorage.setItem("espanol", "enabled")
}

// Disable Language
const disableEspanol = () => {
  body.classList.remove("espanol-mode");
  localStorage.setItem("espanol", null)
}

// Check the state of language mode in local storage
if (espanol == "enabled") {
  enableEspanol();
}

// add event listener to the language mode button toggle
espanolToggle.addEventListener('click', () => {
  // on click, check localstorage for the language mode value
  espanol = localStorage.getItem("espanol");
  if (espanol !== "enabled") {
    // if lanuage mode is not enabled, run this function to set it to enabled
    enableEspanol();
  } else {
    // if language mode is enabled, run this function to set it to disabled
    disableEspanol();
  }
})
