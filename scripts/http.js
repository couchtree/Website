class Http {

    constructor() {
        this.xhr = new XMLHttpRequest()
        this.setup()
    }

    setup() {
        this.xhr.withCredentials = true
    }

    get(path) {
        this.xhr.open('GET', path, false)
        this.xhr.send()

        if (this.xhr.readyState == 4 && this.xhr.status == 200) {
            return this.xhr.responseText
        }

        return ""
    }

}