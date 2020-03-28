import Http from "./http"

window.addEventListener("load", () => {
  setTimeout(() => {
    main()
  }, 20)
})

var texts = {}
var system = {}
var settings = {
  language: "de",
}

function main() {
  system = analyseSystem()
  loadLanguage()
  configureLanguageButtons()
}

function loadTexts() {
  let filename = settings.language + "_index.json"
  let path = getRootLocation() + "/assets/texts/" + filename
  texts = JSON.parse(fetchText(path))
  updateTexts()
}

function updateTexts() {
  for (let obj in texts.texts) {
    let object = texts.texts[obj]
    if (object.id != null) {
      let element = document.getElementById(object.id)
      let text = ""
      for (let line in object.lines) {
        text += object.lines[line] + "\n"
      }
      element.innerText = text
    } else if (object.class != null) {
      let elements = document.getElementsByClassName(object.class)
      let text = ""
      for (let line in object.lines) {
        text += object.lines[line] + "\n"
      }
      for (let i = 0; i < elements.length; i++) {
        elements[i].innerText = text
      }
    }
  }
}

function loadLanguage() {
  let language = "de"
  if (!localStorage.getItem("lang")) {
    language = system.lang
  } else {
    language = localStorage.getItem("lang")
  }
  setLanguage(language)
}

function setLanguage(language) {
  localStorage.setItem("lang", language)
  settings.language = language
  loadTexts()
}

function analyseSystem() {
  let language = navigator.language

  switch (language) {
    case "de-DE":
      language = "de"
      break
    case "en-US":
      language = "en"
      break
    default:
      language = "en"
  }

  let cookiesEnabled = navigator.cookieEnabled
  let os = navigator.platform

  return { lang: language, cookEn: cookiesEnabled, uOS: os }
}

function fetchText(path) {
  let http = new Http()
  return http.get(path)
}

function toggleMenu(e) {
  let target = "#" + this.dataset.target
  console.log(target)
  if (this.classList.contains("is-active")) {
    this.classList.remove("is-active")
    document.querySelector(target).classList.remove("is-active")
  } else {
    this.classList.add("is-active")
    document.querySelector(target).classList.add("is-active")
  }
}

function configureLanguageButtons() {
  let elements = document.getElementsByClassName("lang-button")
  for (let i = 0; i < elements.length; i++) {
    let elem = elements[i]
    elem.addEventListener("click", () => {
      setLanguage(elem.id)
      let dropdown = document.getElementById("langdropdown")
      if (dropdown.classList.contains("is-active")) {
        dropdown.classList.remove("is-active")
      } else {
        dropdown.classList.add("is-active")
      }
    })
  }
  document.getElementById("lang_button").addEventListener("click", (a) => {
    let dropdown = document.getElementById("langdropdown")
    if (dropdown.classList.contains("is-active")) {
      dropdown.classList.remove("is-active")
    } else {
      dropdown.classList.add("is-active")
    }
  })
}

function getRootLocation() {
  return location.protocol + "//" + location.host
}

window.onload = () => {
  document.querySelector("#nav-toggle").addEventListener("click", toggleMenu)
}
