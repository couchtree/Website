class PicAnimation {

    constructor(animationname) {
        this.animationname = animationname
    }

    bind(id) {
        this.id = id
    }

    load() {
        let http = new Http()
        //this.settings = http.get(location.href + '/assets/pictures/' + this.animationname)
        this.settings = {
            "fps": 30,
            "filename": "baumanimation_000",
            "type": "png",
            "amountOfPictures": 69,
            "repeat": true
        }
    }

    play() {
        let element = document.getElementById(this.id)
        let settings = this.settings
        let path = location.href.replace('index.html', '') + '/assets/pictures/' + this.animationname + '/'
        let index = 0
        let intervalid = setInterval(() => {
            let prefix = settings.filename
            let beforeIndex = '0'
            let filename = prefix + (index < 10 ? beforeIndex : '') + index + '.' + settings.type
            element.src = path + filename

            if(index == settings.amountOfPictures) {
                if(!settings.repeat) clearInterval(intervalid)
                else index = 0
            } else {
                index++
            } 
        }, 1000 / this.settings.fps);
        this.intervalid = intervalid
    }

    stop() {
        clearInterval(this.intervalid)
    }

}