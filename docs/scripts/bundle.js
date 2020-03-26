!(function (e) {
  var t = {}
  function n(r) {
    if (t[r]) return t[r].exports
    var a = (t[r] = { i: r, l: !1, exports: {} })
    return e[r].call(a.exports, a, a.exports, n), (a.l = !0), a.exports
  }
  ;(n.m = e),
    (n.c = t),
    (n.d = function (e, t, r) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r })
    }),
    (n.r = function (e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 })
    }),
    (n.t = function (e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e
      if (4 & t && "object" == typeof e && e && e.__esModule) return e
      var r = Object.create(null)
      if (
        (n.r(r),
        Object.defineProperty(r, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var a in e)
          n.d(
            r,
            a,
            function (t) {
              return e[t]
            }.bind(null, a)
          )
      return r
    }),
    (n.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default
            }
          : function () {
              return e
            }
      return n.d(t, "a", t), t
    }),
    (n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t)
    }),
    (n.p = ""),
    n((n.s = 0))
})([
  function (e, t, n) {
    n(1), n(2)
  },
  function (e, t, n) {},
  function (e, t, n) {
    "use strict"
    function r(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n]
        ;(r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(e, r.key, r)
      }
    }
    n.r(t)
    var a = (function () {
      function e() {
        !(function (e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function")
        })(this, e),
          (this.xhr = new XMLHttpRequest()),
          this.setup()
      }
      var t, n, a
      return (
        (t = e),
        (n = [
          {
            key: "setup",
            value: function () {
              this.xhr.withCredentials = !0
            },
          },
          {
            key: "get",
            value: function (e) {
              return (
                this.xhr.open("GET", e, !1),
                this.xhr.send(),
                4 == this.xhr.readyState && 200 == this.xhr.status
                  ? this.xhr.responseText
                  : ""
              )
            },
          },
        ]) && r(t.prototype, n),
        a && r(t, a),
        e
      )
    })()
    window.addEventListener("load", function () {
      setTimeout(function () {
        var e, t, n
        ;(i = (function () {
          var e = navigator.language
          switch (e) {
            case "de-DE":
              e = "de"
              break
            case "en-US":
              e = "en"
              break
            default:
              e = "en"
          }
          var t = navigator.cookieEnabled,
            n = navigator.platform
          return { lang: e, cookEn: t, uOS: n }
        })()),
          (e = localStorage.getItem("lang")
            ? localStorage.getItem("lang")
            : i.lang),
          localStorage.setItem("lang", e),
          (u.language = e),
          (t = u.language + "_index.json"),
          (n = location.href + "assets/texts/" + t),
          (o = JSON.parse(
            (function (e) {
              return new a().get(e)
            })(n)
          )),
          (function () {
            for (var e in o.texts) {
              var t = o.texts[e],
                n = document.getElementById(t.id),
                r = ""
              for (var a in t.lines) r += t.lines[a] + "\n"
              n.innerText = r
            }
          })()
      }, 20)
    })
    var o = {},
      i = {},
      u = { language: "de" }
    function s(e) {
      var t = "#" + this.dataset.target
      console.log(t),
        this.classList.contains("is-active")
          ? (this.classList.remove("is-active"),
            document.querySelector(t).classList.remove("is-active"))
          : (this.classList.add("is-active"),
            document.querySelector(t).classList.add("is-active"))
    }
    window.onload = function () {
      document.querySelector("#nav-toggle").addEventListener("click", s)
    }
  },
])
