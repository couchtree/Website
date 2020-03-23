window.addEventListener('load', () => {
    setTimeout(() => {
        main()
    }, 20)
})

var texts = {}
var system = {}
var settings = {
    'language': 'de'
}

function main() {
    system = analyseSystem()
    loadLanguage()
}

function loadTexts() {
    let filename = settings.language + '_index.json'
    let path = location.href + 'assets/texts/' + filename 
    texts = JSON.parse(fetchText(path))
    updateTexts()
}

function updateTexts() {
    for(let obj in texts.texts) {
        let object = texts.texts[obj]
        let element = document.getElementById(object.id)
        let text = ''
        for(let line in object.lines) {
            text += object.lines[line] + '\n'
        }
        element.innerText = text
    }
}

function loadLanguage() {
    let language = 'de'
    if(!localStorage.getItem('lang')) {
        language = system.lang
    } else {
        language = localStorage.getItem('lang')
    }
    setLanguage(language)
}

function setLanguage(language) {
    localStorage.setItem('lang', language)
    settings.language = language
    loadTexts()
}

function analyseSystem() {
    let language = navigator.language

    switch(language) {
        case 'de-DE':
            language = 'de'
            break
        case 'en-US':
            language = 'en'
            break
        default:
            language = 'en'
    }

    let cookiesEnabled = navigator.cookieEnabled
    let os = navigator.platform

    return {lang: language, cookEn: cookiesEnabled, uOS: os}
}

function fetchText(path) {
    let http = new Http()
    return http.get(path)
}
