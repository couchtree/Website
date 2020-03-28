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
  for (let elem in texts) {
    let list = document.getElementsByClassName(elem)
    for (let i = 0; i < list.length; i++) {
      list[i].innerText = texts[elem]
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
  return location.protocol + "//" + location.host + "/Website"
}

window.onload = () => {
  document.getElementById("totop").addEventListener("click", () => {
    scrollTo(document.querySelector(".wrapper"), 0, 800)
  })
  document.querySelector("#nav-toggle").addEventListener("click", toggleMenu)
}

function scrollTo(elem, to, dur) {
  console.log(elem.scrollTop)
  let start = elem.scrollTop
  let change = to - start
  let currentTime = 0
  let increment = 20

  let animateScroll = () => {
    currentTime += increment
    let val = Math.easeInOutQuad(currentTime, start, change, dur)
    elem.scrollTop = val
    if (currentTime < dur) {
      setTimeout(animateScroll, increment)
    }
  }

  animateScroll()
}

Math.easeInOutQuad = function (t, b, c, d) {
  t /= d / 2
  if (t < 1) return (c / 2) * t * t + b
  t--
  return (-c / 2) * (t * (t - 2) - 1) + b
}

const wrapper = document.querySelector(".wrapper")

wrapper.addEventListener("scroll", () => {
  let button = document.getElementById("totop")
  if (wrapper.scrollTop >= 100) {
    button.classList.remove("is-hidden")
    button.classList.remove("fadeOut")
    button.classList.add("fadeIn")
  } else {
    button.classList.remove("fadeIn")
    button.classList.add("fadeOut")
  }
})
