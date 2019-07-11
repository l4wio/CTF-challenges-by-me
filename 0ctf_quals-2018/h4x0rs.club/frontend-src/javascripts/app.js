! function(e) {
    function t(r) {
        if (n[r]) return n[r].exports;
        var i = n[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(i.exports, i, i.exports, t), i.l = !0, i.exports
    }
    var n = {};
    t.m = e, t.c = n, t.d = function(e, n, r) {
        t.o(e, n) || Object.defineProperty(e, n, {
            configurable: !1,
            enumerable: !0,
            get: r
        })
    }, t.n = function(e) {
        var n = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return t.d(n, "a", n), n
    }, t.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, t.p = "javascripts/", t(t.s = 3)
}([function(e, t, n) {
    for (var r = document.querySelectorAll("[data-module]"), i = 0; i < r.length; i++) {
        var o = r[i],
            s = o.getAttribute("data-module");
        new(0, n(10)("./" + s).default)(o)
    }
}, function(e, t) {
    e.exports = function(e) {
        return e.webpackPolyfill || (e.deprecate = function() {}, e.paths = [], e.children || (e.children = []), Object.defineProperty(e, "loaded", {
            enumerable: !0,
            get: function() {
                return e.l
            }
        }), Object.defineProperty(e, "id", {
            enumerable: !0,
            get: function() {
                return e.i
            }
        }), e.webpackPolyfill = 1), e
    }
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = function e(t) {
        r(this, e), this.el = t
    };
    t.default = i
}, function(e, t, n) {
    e.exports = n(4)
}, function(e, t, n) {
    "use strict";

    function r() {
        O.forEach(function(e) {
            window.clearInterval(e)
        }), O = []
    }

    function i() {
        $("#timer .minutes").text("00"), $("#timer .seconds").text("05")
    }

    function o() {
        q === P.PAUSED ? T() : l(function() {
            T()
        }), h(), p()
    }

    function s(e, t) {
        var n = N.a[e][t || "easy"];
        return n[Math.floor(Math.random() * n.length)]
    }

    function a(e, t, n) {
        var r = "#" + t + ".output__text",
            i = 300 * e;
        if ($(r).text(""), null !== r) {
            new D.a(r, {
                strings: [n],
                typeSpeed: 40,
                startDelay: i,
                showCursor: !1,
                onComplete: function(e, t) {
                    $(".drillinstructor--still").show(), $(".drillinstructor--animated").hide()
                }
            })
        }
    }

    function u(e) {
        $(".drillinstructor--animated").show(),
        $(".drillinstructor--still").hide();

        for (var t = 0; t < A.length; t++) a(t, A[t], s(A[t], e));
    }

    function l(e) {
        v();
        var t = 2,
            n = window.setInterval(function() {
                $(".challenge-countdown h1").text(t--), 0 === t && $(".challenge-countdown h1").text("fun!"), -1 === t && (window.clearInterval(n), e && "function" == typeof e && ($(".challenge-countdown h1").text(3), e()))
            }, 1e3)
    }

    function c() {
        r(), m(), d(), $(".workoutman--animated").hide(), $(".workoutman--still").show()
    }

    function f() {
        r(), i(), d(), $(".workoutman--animated").hide(), $(".workoutman--still").show()
    }

    function p() {
        $(".js-start-button, .timer__button").attr("disable", !0).addClass("button--disabled")
    }

    function d() {
        $(".js-start-button, .timer__button").attr("disable", !1).removeClass("button--disabled")
    }

    function h() {
        $(".js-pause-button").attr("disable", !1).removeClass("button--disabled")
    }

    function m() {
        $(".js-pause-button").attr("disable", !0).addClass("button--disabled")
    }

    function g() {
        $(".timer-controls__panel .button").removeClass("selected")
    }

    function v() {
        x(), $(".challenge-countdown").show()
    }

    function y() {
        x(), $(".challenge-running").show()
    }

    function b() {

        x(), $(".js-user").append($("#audiences").html()), $(".challenge-out-of-time").show()


        CLIENT_GAME.answer( function (correct) {
            console.log("answer",correct);
            correct ?
            ($(".out-of-time-response").hide(), $("#response-happy").show(), $.get('/game/login.php?action=upgrade&level='+(LEVEL+1)) , setTimeout(()=>{alert('Congratz!');location.reload()},2000))
            : ($(".out-of-time-response").hide(), $("#response-sad").show(), setTimeout(()=>{alert('Sad :(');location.reload()},2000));

            
        }, $('#answer').val().trim().replace(/\b\w/g, l => l.toUpperCase()) );

    }

    function w() {
        x(), $(".challenge-info").show()
    }

    function x() {
        $(".screen__scene").hide()
    }

    function T() {
        function e(e) {
            var t = Date.parse(e) - Date.parse(new Date),
                n = Math.floor(t / 1e3 % 60);
            return {
                total: t,
                minutes: Math.floor(t / 1e3 / 60 % 60),
                seconds: n
            }
        }
        y(), q === P.PAUSED && p(), q = P.ACTIVE, g();
        var t = $("#timer .minutes").text(),
            n = $("#timer .seconds").text(),
            i = new Date(Date.parse(new Date) + 1 * t * 60 * 1e3 + 1 * n * 1e3);
        t >= 60 && i.setSeconds(i.getSeconds() - 1),
            function(t, n) {
                function i() {
                    var t = e(n);

                    s.innerHTML = ("0" + t.minutes).slice(-2), a.innerHTML = ("0" + t.seconds).slice(-2), t.total <= 0 && (window.clearInterval(u), b())
                }
                r(), $(".workoutman--animated").show(), $(".workoutman--still").hide();
                var o = document.getElementById(t),
                    s = o.querySelector(".minutes"),
                    a = o.querySelector(".seconds");
                i();
                var u = setInterval(i, 1e3);

                O.push(u)
            }("timer", i)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var C = n(5),
        k = n.n(C),
        E = n(7),
        S = (n.n(E), n(9)),
        D = n.n(S),
        j = n(0),
        N = (n.n(j), n(11));
    window.$ = window.jQuery = k.a;
    var A = ["features", "useCases"],
        O = [],
        L = "easy",
        P = {
            ACTIVE: "ACTIVE",
            PAUSED: "PAUSED",
            STOPPED: "STOPPED",
            DEFAULT: "DEFAULT"
        },
        q = P.DEFAULT;
    $(document).ready(function() {
        $("#easy").addClass("selected"), $('a[href="#"]').click(function(e) {
            e.preventDefault()
        }), $(".js-difficulty").click(function() {
            $(".js-difficulty").removeClass("selected"), $(this).addClass("selected"), L = $(this).data("difficulty"), u(L)
        }), $(".js-pause-button").click(function() {
            c(), q === P.PAUSED ? o() : (q = P.PAUSED, c())
        }), $(".js-stop-button").click(function() {
            f(), q = P.STOPPED
        }), $(".js-info-button").click(function() {
            w(), $(".js-info-button").hasClass("selected") && y()
        }), $(".selectable").click(function() {
            $(this).toggleClass("selected")
        }), $(".timer__button").click(function() {
            var e = void 0;
            e = "decrease" == $(this).data("stepper-direction") ? -5 : 5;
            var t = $(".timer .minutes"),
                n = parseInt(t.text(), 10),
                r = n + e;
            r <= 5 || r >= 60 ? $(this).attr("disabled", !0).addClass("button--disabled") : $(".timer__button").attr("disabled", !1).removeClass("button--disabled");
            var i = void 0;
            i = r >= 5 && r <= 60 ? r.toString() : n.toString(), i < 10 && (i = "0" + i), t.text(i)
        }), $(".js-start-button").click(function() {
            o()
        }), $("#reload-button").click(function() {
            u(localStorage.getItem("difficulty"))
        })
    })
}, function(e, t, n) {
    (function(e) {
        var r, i, o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };

        /*! jQuery v3.2.1 | (c) JS Foundation and other contributors | jquery.org/license */
        ! function(t, n) {
            "use strict";
            "object" == o(e) && "object" == o(e.exports) ? e.exports = t.document ? n(t, !0) : function(e) {
                if (!e.document) throw new Error("jQuery requires a window with a document");
                return n(e)
            } : n(t)
        }("undefined" != typeof window ? window : this, function(s, a) {
            "use strict";

            function u(e, t) {
                t = t || ue;
                var n = t.createElement("script");
                n.text = e, t.head.appendChild(n).parentNode.removeChild(n)
            }

            function l(e) {
                var t = !!e && "length" in e && e.length,
                    n = xe.type(e);
                return "function" !== n && !xe.isWindow(e) && ("array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e)
            }

            function c(e, t) {
                return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
            }

            function f(e, t, n) {
                return xe.isFunction(t) ? xe.grep(e, function(e, r) {
                    return !!t.call(e, r, e) !== n
                }) : t.nodeType ? xe.grep(e, function(e) {
                    return e === t !== n
                }) : "string" != typeof t ? xe.grep(e, function(e) {
                    return de.call(t, e) > -1 !== n
                }) : Oe.test(t) ? xe.filter(t, e, n) : (t = xe.filter(t, e), xe.grep(e, function(e) {
                    return de.call(t, e) > -1 !== n && 1 === e.nodeType
                }))
            }

            function p(e, t) {
                for (;
                    (e = e[t]) && 1 !== e.nodeType;);
                return e
            }

            function d(e) {
                var t = {};
                return xe.each(e.match(Me) || [], function(e, n) {
                    t[n] = !0
                }), t
            }

            function h(e) {
                return e
            }

            function m(e) {
                throw e
            }

            function g(e, t, n, r) {
                var i;
                try {
                    e && xe.isFunction(i = e.promise) ? i.call(e).done(t).fail(n) : e && xe.isFunction(i = e.then) ? i.call(e, t, n) : t.apply(void 0, [e].slice(r))
                } catch (e) {
                    n.apply(void 0, [e])
                }
            }

            function v() {
                ue.removeEventListener("DOMContentLoaded", v), s.removeEventListener("load", v), xe.ready()
            }

            function y() {
                this.expando = xe.expando + y.uid++
            }

            function b(e) {
                return "true" === e || "false" !== e && ("null" === e ? null : e === +e + "" ? +e : _e.test(e) ? JSON.parse(e) : e)
            }

            function w(e, t, n) {
                var r;
                if (void 0 === n && 1 === e.nodeType)
                    if (r = "data-" + t.replace(Ue, "-$&").toLowerCase(), "string" == typeof(n = e.getAttribute(r))) {
                        try {
                            n = b(n)
                        } catch (e) {}
                        We.set(e, t, n)
                    } else n = void 0;
                return n
            }

            function x(e, t, n, r) {
                var i, o = 1,
                    s = 20,
                    a = r ? function() {
                        return r.cur()
                    } : function() {
                        return xe.css(e, t, "")
                    },
                    u = a(),
                    l = n && n[3] || (xe.cssNumber[t] ? "" : "px"),
                    c = (xe.cssNumber[t] || "px" !== l && +u) && Xe.exec(xe.css(e, t));
                if (c && c[3] !== l) {
                    l = l || c[3], n = n || [], c = +u || 1;
                    do {
                        o = o || ".5", c /= o, xe.style(e, t, c + l)
                    } while (o !== (o = a() / u) && 1 !== o && --s)
                }
                return n && (c = +c || +u || 0, i = n[1] ? c + (n[1] + 1) * n[2] : +n[2], r && (r.unit = l, r.start = c, r.end = i)), i
            }

            function T(e) {
                var t, n = e.ownerDocument,
                    r = e.nodeName,
                    i = Qe[r];
                return i || (t = n.body.appendChild(n.createElement(r)), i = xe.css(t, "display"), t.parentNode.removeChild(t), "none" === i && (i = "block"), Qe[r] = i, i)
            }

            function C(e, t) {
                for (var n, r, i = [], o = 0, s = e.length; o < s; o++) r = e[o], r.style && (n = r.style.display, t ? ("none" === n && (i[o] = Re.get(r, "display") || null, i[o] || (r.style.display = "")), "" === r.style.display && Ve(r) && (i[o] = T(r))) : "none" !== n && (i[o] = "none", Re.set(r, "display", n)));
                for (o = 0; o < s; o++) null != i[o] && (e[o].style.display = i[o]);
                return e
            }

            function k(e, t) {
                var n;
                return n = void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t || "*") : void 0 !== e.querySelectorAll ? e.querySelectorAll(t || "*") : [], void 0 === t || t && c(e, t) ? xe.merge([e], n) : n
            }

            function E(e, t) {
                for (var n = 0, r = e.length; n < r; n++) Re.set(e[n], "globalEval", !t || Re.get(t[n], "globalEval"))
            }

            function S(e, t, n, r, i) {
                for (var o, s, a, u, l, c, f = t.createDocumentFragment(), p = [], d = 0, h = e.length; d < h; d++)
                    if ((o = e[d]) || 0 === o)
                        if ("object" === xe.type(o)) xe.merge(p, o.nodeType ? [o] : o);
                        else if (tt.test(o)) {
                    for (s = s || f.appendChild(t.createElement("div")), a = (Je.exec(o) || ["", ""])[1].toLowerCase(), u = et[a] || et._default, s.innerHTML = u[1] + xe.htmlPrefilter(o) + u[2], c = u[0]; c--;) s = s.lastChild;
                    xe.merge(p, s.childNodes), s = f.firstChild, s.textContent = ""
                } else p.push(t.createTextNode(o));
                for (f.textContent = "", d = 0; o = p[d++];)
                    if (r && xe.inArray(o, r) > -1) i && i.push(o);
                    else if (l = xe.contains(o.ownerDocument, o), s = k(f.appendChild(o), "script"), l && E(s), n)
                    for (c = 0; o = s[c++];) Ze.test(o.type || "") && n.push(o);
                return f
            }

            function D() {
                return !0
            }

            function j() {
                return !1
            }

            function N() {
                try {
                    return ue.activeElement
                } catch (e) {}
            }

            function A(e, t, n, r, i, s) {
                var a, u;
                if ("object" == (void 0 === t ? "undefined" : o(t))) {
                    "string" != typeof n && (r = r || n, n = void 0);
                    for (u in t) A(e, u, n, r, t[u], s);
                    return e
                }
                if (null == r && null == i ? (i = n, r = n = void 0) : null == i && ("string" == typeof n ? (i = r, r = void 0) : (i = r, r = n, n = void 0)), !1 === i) i = j;
                else if (!i) return e;
                return 1 === s && (a = i, i = function(e) {
                    return xe().off(e), a.apply(this, arguments)
                }, i.guid = a.guid || (a.guid = xe.guid++)), e.each(function() {
                    xe.event.add(this, t, i, r, n)
                })
            }

            function O(e, t) {
                return c(e, "table") && c(11 !== t.nodeType ? t : t.firstChild, "tr") ? xe(">tbody", e)[0] || e : e
            }

            function L(e) {
                return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
            }

            function P(e) {
                var t = lt.exec(e.type);
                return t ? e.type = t[1] : e.removeAttribute("type"), e
            }

            function q(e, t) {
                var n, r, i, o, s, a, u, l;
                if (1 === t.nodeType) {
                    if (Re.hasData(e) && (o = Re.access(e), s = Re.set(t, o), l = o.events)) {
                        delete s.handle, s.events = {};
                        for (i in l)
                            for (n = 0, r = l[i].length; n < r; n++) xe.event.add(t, i, l[i][n])
                    }
                    We.hasData(e) && (a = We.access(e), u = xe.extend({}, a), We.set(t, u))
                }
            }

            function H(e, t) {
                var n = t.nodeName.toLowerCase();
                "input" === n && Ke.test(e.type) ? t.checked = e.checked : "input" !== n && "textarea" !== n || (t.defaultValue = e.defaultValue)
            }

            function M(e, t, n, r) {
                t = fe.apply([], t);
                var i, o, s, a, l, c, f = 0,
                    p = e.length,
                    d = p - 1,
                    h = t[0],
                    m = xe.isFunction(h);
                if (m || p > 1 && "string" == typeof h && !be.checkClone && ut.test(h)) return e.each(function(i) {
                    var o = e.eq(i);
                    m && (t[0] = h.call(this, i, o.html())), M(o, t, n, r)
                });
                if (p && (i = S(t, e[0].ownerDocument, !1, e, r), o = i.firstChild, 1 === i.childNodes.length && (i = o), o || r)) {
                    for (s = xe.map(k(i, "script"), L), a = s.length; f < p; f++) l = i, f !== d && (l = xe.clone(l, !0, !0), a && xe.merge(s, k(l, "script"))), n.call(e[f], l, f);
                    if (a)
                        for (c = s[s.length - 1].ownerDocument, xe.map(s, P), f = 0; f < a; f++) l = s[f], Ze.test(l.type || "") && !Re.access(l, "globalEval") && xe.contains(c, l) && (l.src ? xe._evalUrl && xe._evalUrl(l.src) : u(l.textContent.replace(ct, ""), c))
                }
                return e
            }

            function F(e, t, n) {
                for (var r, i = t ? xe.filter(t, e) : e, o = 0; null != (r = i[o]); o++) n || 1 !== r.nodeType || xe.cleanData(k(r)), r.parentNode && (n && xe.contains(r.ownerDocument, r) && E(k(r, "script")), r.parentNode.removeChild(r));
                return e
            }

            function I(e, t, n) {
                var r, i, o, s, a = e.style;
                return n = n || dt(e), n && (s = n.getPropertyValue(t) || n[t], "" !== s || xe.contains(e.ownerDocument, e) || (s = xe.style(e, t)), !be.pixelMarginRight() && pt.test(s) && ft.test(t) && (r = a.width, i = a.minWidth, o = a.maxWidth, a.minWidth = a.maxWidth = a.width = s, s = n.width, a.width = r, a.minWidth = i, a.maxWidth = o)), void 0 !== s ? s + "" : s
            }

            function $(e, t) {
                return {
                    get: function() {
                        return e() ? void delete this.get : (this.get = t).apply(this, arguments)
                    }
                }
            }

            function B(e) {
                if (e in bt) return e;
                for (var t = e[0].toUpperCase() + e.slice(1), n = yt.length; n--;)
                    if ((e = yt[n] + t) in bt) return e
            }

            function R(e) {
                var t = xe.cssProps[e];
                return t || (t = xe.cssProps[e] = B(e) || e), t
            }

            function W(e, t, n) {
                var r = Xe.exec(t);
                return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t
            }

            function _(e, t, n, r, i) {
                var o, s = 0;
                for (o = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0; o < 4; o += 2) "margin" === n && (s += xe.css(e, n + Ye[o], !0, i)), r ? ("content" === n && (s -= xe.css(e, "padding" + Ye[o], !0, i)), "margin" !== n && (s -= xe.css(e, "border" + Ye[o] + "Width", !0, i))) : (s += xe.css(e, "padding" + Ye[o], !0, i), "padding" !== n && (s += xe.css(e, "border" + Ye[o] + "Width", !0, i)));
                return s
            }

            function U(e, t, n) {
                var r, i = dt(e),
                    o = I(e, t, i),
                    s = "border-box" === xe.css(e, "boxSizing", !1, i);
                return pt.test(o) ? o : (r = s && (be.boxSizingReliable() || o === e.style[t]), "auto" === o && (o = e["offset" + t[0].toUpperCase() + t.slice(1)]), (o = parseFloat(o) || 0) + _(e, t, n || (s ? "border" : "content"), r, i) + "px")
            }

            function z(e, t, n, r, i) {
                return new z.prototype.init(e, t, n, r, i)
            }

            function X() {
                xt && (!1 === ue.hidden && s.requestAnimationFrame ? s.requestAnimationFrame(X) : s.setTimeout(X, xe.fx.interval), xe.fx.tick())
            }

            function Y() {
                return s.setTimeout(function() {
                    wt = void 0
                }), wt = xe.now()
            }

            function V(e, t) {
                var n, r = 0,
                    i = {
                        height: e
                    };
                for (t = t ? 1 : 0; r < 4; r += 2 - t) n = Ye[r], i["margin" + n] = i["padding" + n] = e;
                return t && (i.opacity = i.width = e), i
            }

            function G(e, t, n) {
                for (var r, i = (J.tweeners[t] || []).concat(J.tweeners["*"]), o = 0, s = i.length; o < s; o++)
                    if (r = i[o].call(n, t, e)) return r
            }

            function Q(e, t, n) {
                var r, i, o, s, a, u, l, c, f = "width" in t || "height" in t,
                    p = this,
                    d = {},
                    h = e.style,
                    m = e.nodeType && Ve(e),
                    g = Re.get(e, "fxshow");
                n.queue || (s = xe._queueHooks(e, "fx"), null == s.unqueued && (s.unqueued = 0, a = s.empty.fire, s.empty.fire = function() {
                    s.unqueued || a()
                }), s.unqueued++, p.always(function() {
                    p.always(function() {
                        s.unqueued--, xe.queue(e, "fx").length || s.empty.fire()
                    })
                }));
                for (r in t)
                    if (i = t[r], Tt.test(i)) {
                        if (delete t[r], o = o || "toggle" === i, i === (m ? "hide" : "show")) {
                            if ("show" !== i || !g || void 0 === g[r]) continue;
                            m = !0
                        }
                        d[r] = g && g[r] || xe.style(e, r)
                    }
                if ((u = !xe.isEmptyObject(t)) || !xe.isEmptyObject(d)) {
                    f && 1 === e.nodeType && (n.overflow = [h.overflow, h.overflowX, h.overflowY], l = g && g.display, null == l && (l = Re.get(e, "display")), c = xe.css(e, "display"), "none" === c && (l ? c = l : (C([e], !0), l = e.style.display || l, c = xe.css(e, "display"), C([e]))), ("inline" === c || "inline-block" === c && null != l) && "none" === xe.css(e, "float") && (u || (p.done(function() {
                        h.display = l
                    }), null == l && (c = h.display, l = "none" === c ? "" : c)), h.display = "inline-block")), n.overflow && (h.overflow = "hidden", p.always(function() {
                        h.overflow = n.overflow[0], h.overflowX = n.overflow[1], h.overflowY = n.overflow[2]
                    })), u = !1;
                    for (r in d) u || (g ? "hidden" in g && (m = g.hidden) : g = Re.access(e, "fxshow", {
                        display: l
                    }), o && (g.hidden = !m), m && C([e], !0), p.done(function() {
                        m || C([e]), Re.remove(e, "fxshow");
                        for (r in d) xe.style(e, r, d[r])
                    })), u = G(m ? g[r] : 0, r, p), r in g || (g[r] = u.start, m && (u.end = u.start, u.start = 0))
                }
            }

            function K(e, t) {
                var n, r, i, o, s;
                for (n in e)
                    if (r = xe.camelCase(n), i = t[r], o = e[n], Array.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), (s = xe.cssHooks[r]) && "expand" in s) {
                        o = s.expand(o), delete e[r];
                        for (n in o) n in e || (e[n] = o[n], t[n] = i)
                    } else t[r] = i
            }

            function J(e, t, n) {
                var r, i, o = 0,
                    s = J.prefilters.length,
                    a = xe.Deferred().always(function() {
                        delete u.elem
                    }),
                    u = function() {
                        if (i) return !1;
                        for (var t = wt || Y(), n = Math.max(0, l.startTime + l.duration - t), r = n / l.duration || 0, o = 1 - r, s = 0, u = l.tweens.length; s < u; s++) l.tweens[s].run(o);
                        return a.notifyWith(e, [l, o, n]), o < 1 && u ? n : (u || a.notifyWith(e, [l, 1, 0]), a.resolveWith(e, [l]), !1)
                    },
                    l = a.promise({
                        elem: e,
                        props: xe.extend({}, t),
                        opts: xe.extend(!0, {
                            specialEasing: {},
                            easing: xe.easing._default
                        }, n),
                        originalProperties: t,
                        originalOptions: n,
                        startTime: wt || Y(),
                        duration: n.duration,
                        tweens: [],
                        createTween: function(t, n) {
                            var r = xe.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);
                            return l.tweens.push(r), r
                        },
                        stop: function(t) {
                            var n = 0,
                                r = t ? l.tweens.length : 0;
                            if (i) return this;
                            for (i = !0; n < r; n++) l.tweens[n].run(1);
                            return t ? (a.notifyWith(e, [l, 1, 0]), a.resolveWith(e, [l, t])) : a.rejectWith(e, [l, t]), this
                        }
                    }),
                    c = l.props;
                for (K(c, l.opts.specialEasing); o < s; o++)
                    if (r = J.prefilters[o].call(l, e, c, l.opts)) return xe.isFunction(r.stop) && (xe._queueHooks(l.elem, l.opts.queue).stop = xe.proxy(r.stop, r)), r;
                return xe.map(c, G, l), xe.isFunction(l.opts.start) && l.opts.start.call(e, l), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always), xe.fx.timer(xe.extend(u, {
                    elem: e,
                    anim: l,
                    queue: l.opts.queue
                })), l
            }

            function Z(e) {
                return (e.match(Me) || []).join(" ")
            }

            function ee(e) {
                return e.getAttribute && e.getAttribute("class") || ""
            }

            function te(e, t, n, r) {
                var i;
                if (Array.isArray(t)) xe.each(t, function(t, i) {
                    n || Pt.test(e) ? r(e, i) : te(e + "[" + ("object" == (void 0 === i ? "undefined" : o(i)) && null != i ? t : "") + "]", i, n, r)
                });
                else if (n || "object" !== xe.type(t)) r(e, t);
                else
                    for (i in t) te(e + "[" + i + "]", t[i], n, r)
            }

            function ne(e) {
                return function(t, n) {
                    "string" != typeof t && (n = t, t = "*");
                    var r, i = 0,
                        o = t.toLowerCase().match(Me) || [];
                    if (xe.isFunction(n))
                        for (; r = o[i++];) "+" === r[0] ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
                }
            }

            function re(e, t, n, r) {
                function i(a) {
                    var u;
                    return o[a] = !0, xe.each(e[a] || [], function(e, a) {
                        var l = a(t, n, r);
                        return "string" != typeof l || s || o[l] ? s ? !(u = l) : void 0 : (t.dataTypes.unshift(l), i(l), !1)
                    }), u
                }
                var o = {},
                    s = e === zt;
                return i(t.dataTypes[0]) || !o["*"] && i("*")
            }

            function ie(e, t) {
                var n, r, i = xe.ajaxSettings.flatOptions || {};
                for (n in t) void 0 !== t[n] && ((i[n] ? e : r || (r = {}))[n] = t[n]);
                return r && xe.extend(!0, e, r), e
            }

            function oe(e, t, n) {
                for (var r, i, o, s, a = e.contents, u = e.dataTypes;
                    "*" === u[0];) u.shift(), void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
                if (r)
                    for (i in a)
                        if (a[i] && a[i].test(r)) {
                            u.unshift(i);
                            break
                        }
                if (u[0] in n) o = u[0];
                else {
                    for (i in n) {
                        if (!u[0] || e.converters[i + " " + u[0]]) {
                            o = i;
                            break
                        }
                        s || (s = i)
                    }
                    o = o || s
                }
                if (o) return o !== u[0] && u.unshift(o), n[o]
            }

            function se(e, t, n, r) {
                var i, o, s, a, u, l = {},
                    c = e.dataTypes.slice();
                if (c[1])
                    for (s in e.converters) l[s.toLowerCase()] = e.converters[s];
                for (o = c.shift(); o;)
                    if (e.responseFields[o] && (n[e.responseFields[o]] = t), !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), u = o, o = c.shift())
                        if ("*" === o) o = u;
                        else if ("*" !== u && u !== o) {
                    if (!(s = l[u + " " + o] || l["* " + o]))
                        for (i in l)
                            if (a = i.split(" "), a[1] === o && (s = l[u + " " + a[0]] || l["* " + a[0]])) {
                                !0 === s ? s = l[i] : !0 !== l[i] && (o = a[0], c.unshift(a[1]));
                                break
                            }
                    if (!0 !== s)
                        if (s && e.throws) t = s(t);
                        else try {
                            t = s(t)
                        } catch (e) {
                            return {
                                state: "parsererror",
                                error: s ? e : "No conversion from " + u + " to " + o
                            }
                        }
                }
                return {
                    state: "success",
                    data: t
                }
            }
            var ae = [],
                ue = s.document,
                le = Object.getPrototypeOf,
                ce = ae.slice,
                fe = ae.concat,
                pe = ae.push,
                de = ae.indexOf,
                he = {},
                me = he.toString,
                ge = he.hasOwnProperty,
                ve = ge.toString,
                ye = ve.call(Object),
                be = {},
                we = "3.2.1",
                xe = function e(t, n) {
                    return new e.fn.init(t, n)
                },
                Te = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
                Ce = /^-ms-/,
                ke = /-([a-z])/g,
                Ee = function(e, t) {
                    return t.toUpperCase()
                };
            xe.fn = xe.prototype = {
                jquery: we,
                constructor: xe,
                length: 0,
                toArray: function() {
                    return ce.call(this)
                },
                get: function(e) {
                    return null == e ? ce.call(this) : e < 0 ? this[e + this.length] : this[e]
                },
                pushStack: function(e) {
                    var t = xe.merge(this.constructor(), e);
                    return t.prevObject = this, t
                },
                each: function(e) {
                    return xe.each(this, e)
                },
                map: function(e) {
                    return this.pushStack(xe.map(this, function(t, n) {
                        return e.call(t, n, t)
                    }))
                },
                slice: function() {
                    return this.pushStack(ce.apply(this, arguments))
                },
                first: function() {
                    return this.eq(0)
                },
                last: function() {
                    return this.eq(-1)
                },
                eq: function(e) {
                    var t = this.length,
                        n = +e + (e < 0 ? t : 0);
                    return this.pushStack(n >= 0 && n < t ? [this[n]] : [])
                },
                end: function() {
                    return this.prevObject || this.constructor()
                },
                push: pe,
                sort: ae.sort,
                splice: ae.splice
            }, xe.extend = xe.fn.extend = function() {
                var e, t, n, r, i, s, a = arguments[0] || {},
                    u = 1,
                    l = arguments.length,
                    c = !1;
                for ("boolean" == typeof a && (c = a, a = arguments[u] || {}, u++), "object" == (void 0 === a ? "undefined" : o(a)) || xe.isFunction(a) || (a = {}), u === l && (a = this, u--); u < l; u++)
                    if (null != (e = arguments[u]))
                        for (t in e) n = a[t], r = e[t], a !== r && (c && r && (xe.isPlainObject(r) || (i = Array.isArray(r))) ? (i ? (i = !1, s = n && Array.isArray(n) ? n : []) : s = n && xe.isPlainObject(n) ? n : {}, a[t] = xe.extend(c, s, r)) : void 0 !== r && (a[t] = r));
                return a
            }, xe.extend({
                expando: "jQuery" + (we + Math.random()).replace(/\D/g, ""),
                isReady: !0,
                error: function(e) {
                    throw new Error(e)
                },
                noop: function() {},
                isFunction: function(e) {
                    return "function" === xe.type(e)
                },
                isWindow: function(e) {
                    return null != e && e === e.window
                },
                isNumeric: function(e) {
                    var t = xe.type(e);
                    return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e))
                },
                isPlainObject: function(e) {
                    var t, n;
                    return !(!e || "[object Object]" !== me.call(e) || (t = le(e)) && ("function" != typeof(n = ge.call(t, "constructor") && t.constructor) || ve.call(n) !== ye))
                },
                isEmptyObject: function(e) {
                    var t;
                    for (t in e) return !1;
                    return !0
                },
                type: function(e) {
                    return null == e ? e + "" : "object" == (void 0 === e ? "undefined" : o(e)) || "function" == typeof e ? he[me.call(e)] || "object" : void 0 === e ? "undefined" : o(e)
                },
                globalEval: function(e) {
                    u(e)
                },
                camelCase: function(e) {
                    return e.replace(Ce, "ms-").replace(ke, Ee)
                },
                each: function(e, t) {
                    var n, r = 0;
                    if (l(e))
                        for (n = e.length; r < n && !1 !== t.call(e[r], r, e[r]); r++);
                    else
                        for (r in e)
                            if (!1 === t.call(e[r], r, e[r])) break;
                    return e
                },
                trim: function(e) {
                    return null == e ? "" : (e + "").replace(Te, "")
                },
                makeArray: function(e, t) {
                    var n = t || [];
                    return null != e && (l(Object(e)) ? xe.merge(n, "string" == typeof e ? [e] : e) : pe.call(n, e)), n
                },
                inArray: function(e, t, n) {
                    return null == t ? -1 : de.call(t, e, n)
                },
                merge: function(e, t) {
                    for (var n = +t.length, r = 0, i = e.length; r < n; r++) e[i++] = t[r];
                    return e.length = i, e
                },
                grep: function(e, t, n) {
                    for (var r = [], i = 0, o = e.length, s = !n; i < o; i++) !t(e[i], i) !== s && r.push(e[i]);
                    return r
                },
                map: function(e, t, n) {
                    var r, i, o = 0,
                        s = [];
                    if (l(e))
                        for (r = e.length; o < r; o++) null != (i = t(e[o], o, n)) && s.push(i);
                    else
                        for (o in e) null != (i = t(e[o], o, n)) && s.push(i);
                    return fe.apply([], s)
                },
                guid: 1,
                proxy: function(e, t) {
                    var n, r, i;
                    if ("string" == typeof t && (n = e[t], t = e, e = n), xe.isFunction(e)) return r = ce.call(arguments, 2), i = function() {
                        return e.apply(t || this, r.concat(ce.call(arguments)))
                    }, i.guid = e.guid = e.guid || xe.guid++, i
                },
                now: Date.now,
                support: be
            }), "function" == typeof Symbol && (xe.fn[Symbol.iterator] = ae[Symbol.iterator]), xe.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e, t) {
                he["[object " + t + "]"] = t.toLowerCase()
            });
            var Se = function(e) {
                function t(e, t, n, r) {
                    var i, o, s, a, u, c, p, d = t && t.ownerDocument,
                        h = t ? t.nodeType : 9;
                    if (n = n || [], "string" != typeof e || !e || 1 !== h && 9 !== h && 11 !== h) return n;
                    if (!r && ((t ? t.ownerDocument || t : $) !== O && A(t), t = t || O, P)) {
                        if (11 !== h && (u = me.exec(e)))
                            if (i = u[1]) {
                                if (9 === h) {
                                    if (!(s = t.getElementById(i))) return n;
                                    if (s.id === i) return n.push(s), n
                                } else if (d && (s = d.getElementById(i)) && F(t, s) && s.id === i) return n.push(s), n
                            } else {
                                if (u[2]) return Q.apply(n, t.getElementsByTagName(e)), n;
                                if ((i = u[3]) && w.getElementsByClassName && t.getElementsByClassName) return Q.apply(n, t.getElementsByClassName(i)), n
                            }
                        if (w.qsa && !U[e + " "] && (!q || !q.test(e))) {
                            if (1 !== h) d = t, p = e;
                            else if ("object" !== t.nodeName.toLowerCase()) {
                                for ((a = t.getAttribute("id")) ? a = a.replace(be, we) : t.setAttribute("id", a = I), c = k(e), o = c.length; o--;) c[o] = "#" + a + " " + f(c[o]);
                                p = c.join(","), d = ge.test(e) && l(t.parentNode) || t
                            }
                            if (p) try {
                                return Q.apply(n, d.querySelectorAll(p)), n
                            } catch (e) {} finally {
                                a === I && t.removeAttribute("id")
                            }
                        }
                    }
                    return S(e.replace(oe, "$1"), t, n, r)
                }

                function n() {
                    function e(n, r) {
                        return t.push(n + " ") > x.cacheLength && delete e[t.shift()], e[n + " "] = r
                    }
                    var t = [];
                    return e
                }

                function r(e) {
                    return e[I] = !0, e
                }

                function i(e) {
                    var t = O.createElement("fieldset");
                    try {
                        return !!e(t)
                    } catch (e) {
                        return !1
                    } finally {
                        t.parentNode && t.parentNode.removeChild(t), t = null
                    }
                }

                function o(e, t) {
                    for (var n = e.split("|"), r = n.length; r--;) x.attrHandle[n[r]] = t
                }

                function s(e, t) {
                    var n = t && e,
                        r = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
                    if (r) return r;
                    if (n)
                        for (; n = n.nextSibling;)
                            if (n === t) return -1;
                    return e ? 1 : -1
                }

                function a(e) {
                    return function(t) {
                        return "form" in t ? t.parentNode && !1 === t.disabled ? "label" in t ? "label" in t.parentNode ? t.parentNode.disabled === e : t.disabled === e : t.isDisabled === e || t.isDisabled !== !e && Te(t) === e : t.disabled === e : "label" in t && t.disabled === e
                    }
                }

                function u(e) {
                    return r(function(t) {
                        return t = +t, r(function(n, r) {
                            for (var i, o = e([], n.length, t), s = o.length; s--;) n[i = o[s]] && (n[i] = !(r[i] = n[i]))
                        })
                    })
                }

                function l(e) {
                    return e && void 0 !== e.getElementsByTagName && e
                }

                function c() {}

                function f(e) {
                    for (var t = 0, n = e.length, r = ""; t < n; t++) r += e[t].value;
                    return r
                }

                function p(e, t, n) {
                    var r = t.dir,
                        i = t.next,
                        o = i || r,
                        s = n && "parentNode" === o,
                        a = R++;
                    return t.first ? function(t, n, i) {
                        for (; t = t[r];)
                            if (1 === t.nodeType || s) return e(t, n, i);
                        return !1
                    } : function(t, n, u) {
                        var l, c, f, p = [B, a];
                        if (u) {
                            for (; t = t[r];)
                                if ((1 === t.nodeType || s) && e(t, n, u)) return !0
                        } else
                            for (; t = t[r];)
                                if (1 === t.nodeType || s)
                                    if (f = t[I] || (t[I] = {}), c = f[t.uniqueID] || (f[t.uniqueID] = {}), i && i === t.nodeName.toLowerCase()) t = t[r] || t;
                                    else {
                                        if ((l = c[o]) && l[0] === B && l[1] === a) return p[2] = l[2];
                                        if (c[o] = p, p[2] = e(t, n, u)) return !0
                                    } return !1
                    }
                }

                function d(e) {
                    return e.length > 1 ? function(t, n, r) {
                        for (var i = e.length; i--;)
                            if (!e[i](t, n, r)) return !1;
                        return !0
                    } : e[0]
                }

                function h(e, n, r) {
                    for (var i = 0, o = n.length; i < o; i++) t(e, n[i], r);
                    return r
                }

                function m(e, t, n, r, i) {
                    for (var o, s = [], a = 0, u = e.length, l = null != t; a < u; a++)(o = e[a]) && (n && !n(o, r, i) || (s.push(o), l && t.push(a)));
                    return s
                }

                function g(e, t, n, i, o, s) {
                    return i && !i[I] && (i = g(i)), o && !o[I] && (o = g(o, s)), r(function(r, s, a, u) {
                        var l, c, f, p = [],
                            d = [],
                            g = s.length,
                            v = r || h(t || "*", a.nodeType ? [a] : a, []),
                            y = !e || !r && t ? v : m(v, p, e, a, u),
                            b = n ? o || (r ? e : g || i) ? [] : s : y;
                        if (n && n(y, b, a, u), i)
                            for (l = m(b, d), i(l, [], a, u), c = l.length; c--;)(f = l[c]) && (b[d[c]] = !(y[d[c]] = f));
                        if (r) {
                            if (o || e) {
                                if (o) {
                                    for (l = [], c = b.length; c--;)(f = b[c]) && l.push(y[c] = f);
                                    o(null, b = [], l, u)
                                }
                                for (c = b.length; c--;)(f = b[c]) && (l = o ? J(r, f) : p[c]) > -1 && (r[l] = !(s[l] = f))
                            }
                        } else b = m(b === s ? b.splice(g, b.length) : b), o ? o(null, s, b, u) : Q.apply(s, b)
                    })
                }

                function v(e) {
                    for (var t, n, r, i = e.length, o = x.relative[e[0].type], s = o || x.relative[" "], a = o ? 1 : 0, u = p(function(e) {
                            return e === t
                        }, s, !0), l = p(function(e) {
                            return J(t, e) > -1
                        }, s, !0), c = [function(e, n, r) {
                            var i = !o && (r || n !== D) || ((t = n).nodeType ? u(e, n, r) : l(e, n, r));
                            return t = null, i
                        }]; a < i; a++)
                        if (n = x.relative[e[a].type]) c = [p(d(c), n)];
                        else {
                            if (n = x.filter[e[a].type].apply(null, e[a].matches), n[I]) {
                                for (r = ++a; r < i && !x.relative[e[r].type]; r++);
                                return g(a > 1 && d(c), a > 1 && f(e.slice(0, a - 1).concat({
                                    value: " " === e[a - 2].type ? "*" : ""
                                })).replace(oe, "$1"), n, a < r && v(e.slice(a, r)), r < i && v(e = e.slice(r)), r < i && f(e))
                            }
                            c.push(n)
                        }
                    return d(c)
                }

                function y(e, n) {
                    var i = n.length > 0,
                        o = e.length > 0,
                        s = function(r, s, a, u, l) {
                            var c, f, p, d = 0,
                                h = "0",
                                g = r && [],
                                v = [],
                                y = D,
                                b = r || o && x.find.TAG("*", l),
                                w = B += null == y ? 1 : Math.random() || .1,
                                T = b.length;
                            for (l && (D = s === O || s || l); h !== T && null != (c = b[h]); h++) {
                                if (o && c) {
                                    for (f = 0, s || c.ownerDocument === O || (A(c), a = !P); p = e[f++];)
                                        if (p(c, s || O, a)) {
                                            u.push(c);
                                            break
                                        }
                                    l && (B = w)
                                }
                                i && ((c = !p && c) && d--, r && g.push(c))
                            }
                            if (d += h, i && h !== d) {
                                for (f = 0; p = n[f++];) p(g, v, s, a);
                                if (r) {
                                    if (d > 0)
                                        for (; h--;) g[h] || v[h] || (v[h] = V.call(u));
                                    v = m(v)
                                }
                                Q.apply(u, v), l && !r && v.length > 0 && d + n.length > 1 && t.uniqueSort(u)
                            }
                            return l && (B = w, D = y), g
                        };
                    return i ? r(s) : s
                }
                var b, w, x, T, C, k, E, S, D, j, N, A, O, L, P, q, H, M, F, I = "sizzle" + 1 * new Date,
                    $ = e.document,
                    B = 0,
                    R = 0,
                    W = n(),
                    _ = n(),
                    U = n(),
                    z = function(e, t) {
                        return e === t && (N = !0), 0
                    },
                    X = {}.hasOwnProperty,
                    Y = [],
                    V = Y.pop,
                    G = Y.push,
                    Q = Y.push,
                    K = Y.slice,
                    J = function(e, t) {
                        for (var n = 0, r = e.length; n < r; n++)
                            if (e[n] === t) return n;
                        return -1
                    },
                    Z = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                    ee = "[\\x20\\t\\r\\n\\f]",
                    te = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
                    ne = "\\[" + ee + "*(" + te + ")(?:" + ee + "*([*^$|!~]?=)" + ee + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + te + "))|)" + ee + "*\\]",
                    re = ":(" + te + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + ne + ")*)|.*)\\)|)",
                    ie = new RegExp(ee + "+", "g"),
                    oe = new RegExp("^" + ee + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ee + "+$", "g"),
                    se = new RegExp("^" + ee + "*," + ee + "*"),
                    ae = new RegExp("^" + ee + "*([>+~]|" + ee + ")" + ee + "*"),
                    ue = new RegExp("=" + ee + "*([^\\]'\"]*?)" + ee + "*\\]", "g"),
                    le = new RegExp(re),
                    ce = new RegExp("^" + te + "$"),
                    fe = {
                        ID: new RegExp("^#(" + te + ")"),
                        CLASS: new RegExp("^\\.(" + te + ")"),
                        TAG: new RegExp("^(" + te + "|[*])"),
                        ATTR: new RegExp("^" + ne),
                        PSEUDO: new RegExp("^" + re),
                        CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ee + "*(even|odd|(([+-]|)(\\d*)n|)" + ee + "*(?:([+-]|)" + ee + "*(\\d+)|))" + ee + "*\\)|)", "i"),
                        bool: new RegExp("^(?:" + Z + ")$", "i"),
                        needsContext: new RegExp("^" + ee + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ee + "*((?:-\\d)?\\d*)" + ee + "*\\)|)(?=[^-]|$)", "i")
                    },
                    pe = /^(?:input|select|textarea|button)$/i,
                    de = /^h\d$/i,
                    he = /^[^{]+\{\s*\[native \w/,
                    me = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                    ge = /[+~]/,
                    ve = new RegExp("\\\\([\\da-f]{1,6}" + ee + "?|(" + ee + ")|.)", "ig"),
                    ye = function(e, t, n) {
                        var r = "0x" + t - 65536;
                        return r !== r || n ? t : r < 0 ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
                    },
                    be = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
                    we = function(e, t) {
                        return t ? "\0" === e ? "�" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e
                    },
                    xe = function() {
                        A()
                    },
                    Te = p(function(e) {
                        return !0 === e.disabled && ("form" in e || "label" in e)
                    }, {
                        dir: "parentNode",
                        next: "legend"
                    });
                try {
                    Q.apply(Y = K.call($.childNodes), $.childNodes), Y[$.childNodes.length].nodeType
                } catch (e) {
                    Q = {
                        apply: Y.length ? function(e, t) {
                            G.apply(e, K.call(t))
                        } : function(e, t) {
                            for (var n = e.length, r = 0; e[n++] = t[r++];);
                            e.length = n - 1
                        }
                    }
                }
                w = t.support = {}, C = t.isXML = function(e) {
                    var t = e && (e.ownerDocument || e).documentElement;
                    return !!t && "HTML" !== t.nodeName
                }, A = t.setDocument = function(e) {
                    var t, n, r = e ? e.ownerDocument || e : $;
                    return r !== O && 9 === r.nodeType && r.documentElement ? (O = r, L = O.documentElement, P = !C(O), $ !== O && (n = O.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", xe, !1) : n.attachEvent && n.attachEvent("onunload", xe)), w.attributes = i(function(e) {
                        return e.className = "i", !e.getAttribute("className")
                    }), w.getElementsByTagName = i(function(e) {
                        return e.appendChild(O.createComment("")), !e.getElementsByTagName("*").length
                    }), w.getElementsByClassName = he.test(O.getElementsByClassName), w.getById = i(function(e) {
                        return L.appendChild(e).id = I, !O.getElementsByName || !O.getElementsByName(I).length
                    }), w.getById ? (x.filter.ID = function(e) {
                        var t = e.replace(ve, ye);
                        return function(e) {
                            return e.getAttribute("id") === t
                        }
                    }, x.find.ID = function(e, t) {
                        if (void 0 !== t.getElementById && P) {
                            var n = t.getElementById(e);
                            return n ? [n] : []
                        }
                    }) : (x.filter.ID = function(e) {
                        var t = e.replace(ve, ye);
                        return function(e) {
                            var n = void 0 !== e.getAttributeNode && e.getAttributeNode("id");
                            return n && n.value === t
                        }
                    }, x.find.ID = function(e, t) {
                        if (void 0 !== t.getElementById && P) {
                            var n, r, i, o = t.getElementById(e);
                            if (o) {
                                if ((n = o.getAttributeNode("id")) && n.value === e) return [o];
                                for (i = t.getElementsByName(e), r = 0; o = i[r++];)
                                    if ((n = o.getAttributeNode("id")) && n.value === e) return [o]
                            }
                            return []
                        }
                    }), x.find.TAG = w.getElementsByTagName ? function(e, t) {
                        return void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e) : w.qsa ? t.querySelectorAll(e) : void 0
                    } : function(e, t) {
                        var n, r = [],
                            i = 0,
                            o = t.getElementsByTagName(e);
                        if ("*" === e) {
                            for (; n = o[i++];) 1 === n.nodeType && r.push(n);
                            return r
                        }
                        return o
                    }, x.find.CLASS = w.getElementsByClassName && function(e, t) {
                        if (void 0 !== t.getElementsByClassName && P) return t.getElementsByClassName(e)
                    }, H = [], q = [], (w.qsa = he.test(O.querySelectorAll)) && (i(function(e) {
                        L.appendChild(e).innerHTML = "<a id='" + I + "'></a><select id='" + I + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && q.push("[*^$]=" + ee + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || q.push("\\[" + ee + "*(?:value|" + Z + ")"), e.querySelectorAll("[id~=" + I + "-]").length || q.push("~="), e.querySelectorAll(":checked").length || q.push(":checked"), e.querySelectorAll("a#" + I + "+*").length || q.push(".#.+[+~]")
                    }), i(function(e) {
                        e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                        var t = O.createElement("input");
                        t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && q.push("name" + ee + "*[*^$|!~]?="), 2 !== e.querySelectorAll(":enabled").length && q.push(":enabled", ":disabled"), L.appendChild(e).disabled = !0, 2 !== e.querySelectorAll(":disabled").length && q.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), q.push(",.*:")
                    })), (w.matchesSelector = he.test(M = L.matches || L.webkitMatchesSelector || L.mozMatchesSelector || L.oMatchesSelector || L.msMatchesSelector)) && i(function(e) {
                        w.disconnectedMatch = M.call(e, "*"), M.call(e, "[s!='']:x"), H.push("!=", re)
                    }), q = q.length && new RegExp(q.join("|")), H = H.length && new RegExp(H.join("|")), t = he.test(L.compareDocumentPosition), F = t || he.test(L.contains) ? function(e, t) {
                        var n = 9 === e.nodeType ? e.documentElement : e,
                            r = t && t.parentNode;
                        return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
                    } : function(e, t) {
                        if (t)
                            for (; t = t.parentNode;)
                                if (t === e) return !0;
                        return !1
                    }, z = t ? function(e, t) {
                        if (e === t) return N = !0, 0;
                        var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                        return n || (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & n || !w.sortDetached && t.compareDocumentPosition(e) === n ? e === O || e.ownerDocument === $ && F($, e) ? -1 : t === O || t.ownerDocument === $ && F($, t) ? 1 : j ? J(j, e) - J(j, t) : 0 : 4 & n ? -1 : 1)
                    } : function(e, t) {
                        if (e === t) return N = !0, 0;
                        var n, r = 0,
                            i = e.parentNode,
                            o = t.parentNode,
                            a = [e],
                            u = [t];
                        if (!i || !o) return e === O ? -1 : t === O ? 1 : i ? -1 : o ? 1 : j ? J(j, e) - J(j, t) : 0;
                        if (i === o) return s(e, t);
                        for (n = e; n = n.parentNode;) a.unshift(n);
                        for (n = t; n = n.parentNode;) u.unshift(n);
                        for (; a[r] === u[r];) r++;
                        return r ? s(a[r], u[r]) : a[r] === $ ? -1 : u[r] === $ ? 1 : 0
                    }, O) : O
                }, t.matches = function(e, n) {
                    return t(e, null, null, n)
                }, t.matchesSelector = function(e, n) {
                    if ((e.ownerDocument || e) !== O && A(e), n = n.replace(ue, "='$1']"), w.matchesSelector && P && !U[n + " "] && (!H || !H.test(n)) && (!q || !q.test(n))) try {
                        var r = M.call(e, n);
                        if (r || w.disconnectedMatch || e.document && 11 !== e.document.nodeType) return r
                    } catch (e) {}
                    return t(n, O, null, [e]).length > 0
                }, t.contains = function(e, t) {
                    return (e.ownerDocument || e) !== O && A(e), F(e, t)
                }, t.attr = function(e, t) {
                    (e.ownerDocument || e) !== O && A(e);
                    var n = x.attrHandle[t.toLowerCase()],
                        r = n && X.call(x.attrHandle, t.toLowerCase()) ? n(e, t, !P) : void 0;
                    return void 0 !== r ? r : w.attributes || !P ? e.getAttribute(t) : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
                }, t.escape = function(e) {
                    return (e + "").replace(be, we)
                }, t.error = function(e) {
                    throw new Error("Syntax error, unrecognized expression: " + e)
                }, t.uniqueSort = function(e) {
                    var t, n = [],
                        r = 0,
                        i = 0;
                    if (N = !w.detectDuplicates, j = !w.sortStable && e.slice(0), e.sort(z), N) {
                        for (; t = e[i++];) t === e[i] && (r = n.push(i));
                        for (; r--;) e.splice(n[r], 1)
                    }
                    return j = null, e
                }, T = t.getText = function(e) {
                    var t, n = "",
                        r = 0,
                        i = e.nodeType;
                    if (i) {
                        if (1 === i || 9 === i || 11 === i) {
                            if ("string" == typeof e.textContent) return e.textContent;
                            for (e = e.firstChild; e; e = e.nextSibling) n += T(e)
                        } else if (3 === i || 4 === i) return e.nodeValue
                    } else
                        for (; t = e[r++];) n += T(t);
                    return n
                }, x = t.selectors = {
                    cacheLength: 50,
                    createPseudo: r,
                    match: fe,
                    attrHandle: {},
                    find: {},
                    relative: {
                        ">": {
                            dir: "parentNode",
                            first: !0
                        },
                        " ": {
                            dir: "parentNode"
                        },
                        "+": {
                            dir: "previousSibling",
                            first: !0
                        },
                        "~": {
                            dir: "previousSibling"
                        }
                    },
                    preFilter: {
                        ATTR: function(e) {
                            return e[1] = e[1].replace(ve, ye), e[3] = (e[3] || e[4] || e[5] || "").replace(ve, ye), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                        },
                        CHILD: function(e) {
                            return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]), e
                        },
                        PSEUDO: function(e) {
                            var t, n = !e[6] && e[2];
                            return fe.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && le.test(n) && (t = k(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                        }
                    },
                    filter: {
                        TAG: function(e) {
                            var t = e.replace(ve, ye).toLowerCase();
                            return "*" === e ? function() {
                                return !0
                            } : function(e) {
                                return e.nodeName && e.nodeName.toLowerCase() === t
                            }
                        },
                        CLASS: function(e) {
                            var t = W[e + " "];
                            return t || (t = new RegExp("(^|" + ee + ")" + e + "(" + ee + "|$)")) && W(e, function(e) {
                                return t.test("string" == typeof e.className && e.className || void 0 !== e.getAttribute && e.getAttribute("class") || "")
                            })
                        },
                        ATTR: function(e, n, r) {
                            return function(i) {
                                var o = t.attr(i, e);
                                return null == o ? "!=" === n : !n || (o += "", "=" === n ? o === r : "!=" === n ? o !== r : "^=" === n ? r && 0 === o.indexOf(r) : "*=" === n ? r && o.indexOf(r) > -1 : "$=" === n ? r && o.slice(-r.length) === r : "~=" === n ? (" " + o.replace(ie, " ") + " ").indexOf(r) > -1 : "|=" === n && (o === r || o.slice(0, r.length + 1) === r + "-"))
                            }
                        },
                        CHILD: function(e, t, n, r, i) {
                            var o = "nth" !== e.slice(0, 3),
                                s = "last" !== e.slice(-4),
                                a = "of-type" === t;
                            return 1 === r && 0 === i ? function(e) {
                                return !!e.parentNode
                            } : function(t, n, u) {
                                var l, c, f, p, d, h, m = o !== s ? "nextSibling" : "previousSibling",
                                    g = t.parentNode,
                                    v = a && t.nodeName.toLowerCase(),
                                    y = !u && !a,
                                    b = !1;
                                if (g) {
                                    if (o) {
                                        for (; m;) {
                                            for (p = t; p = p[m];)
                                                if (a ? p.nodeName.toLowerCase() === v : 1 === p.nodeType) return !1;
                                            h = m = "only" === e && !h && "nextSibling"
                                        }
                                        return !0
                                    }
                                    if (h = [s ? g.firstChild : g.lastChild], s && y) {
                                        for (p = g, f = p[I] || (p[I] = {}), c = f[p.uniqueID] || (f[p.uniqueID] = {}), l = c[e] || [], d = l[0] === B && l[1], b = d && l[2], p = d && g.childNodes[d]; p = ++d && p && p[m] || (b = d = 0) || h.pop();)
                                            if (1 === p.nodeType && ++b && p === t) {
                                                c[e] = [B, d, b];
                                                break
                                            }
                                    } else if (y && (p = t, f = p[I] || (p[I] = {}), c = f[p.uniqueID] || (f[p.uniqueID] = {}), l = c[e] || [], d = l[0] === B && l[1], b = d), !1 === b)
                                        for (;
                                            (p = ++d && p && p[m] || (b = d = 0) || h.pop()) && ((a ? p.nodeName.toLowerCase() !== v : 1 !== p.nodeType) || !++b || (y && (f = p[I] || (p[I] = {}), c = f[p.uniqueID] || (f[p.uniqueID] = {}), c[e] = [B, b]), p !== t)););
                                    return (b -= i) === r || b % r == 0 && b / r >= 0
                                }
                            }
                        },
                        PSEUDO: function(e, n) {
                            var i, o = x.pseudos[e] || x.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                            return o[I] ? o(n) : o.length > 1 ? (i = [e, e, "", n], x.setFilters.hasOwnProperty(e.toLowerCase()) ? r(function(e, t) {
                                for (var r, i = o(e, n), s = i.length; s--;) r = J(e, i[s]), e[r] = !(t[r] = i[s])
                            }) : function(e) {
                                return o(e, 0, i)
                            }) : o
                        }
                    },
                    pseudos: {
                        not: r(function(e) {
                            var t = [],
                                n = [],
                                i = E(e.replace(oe, "$1"));
                            return i[I] ? r(function(e, t, n, r) {
                                for (var o, s = i(e, null, r, []), a = e.length; a--;)(o = s[a]) && (e[a] = !(t[a] = o))
                            }) : function(e, r, o) {
                                return t[0] = e, i(t, null, o, n), t[0] = null, !n.pop()
                            }
                        }),
                        has: r(function(e) {
                            return function(n) {
                                return t(e, n).length > 0
                            }
                        }),
                        contains: r(function(e) {
                            return e = e.replace(ve, ye),
                                function(t) {
                                    return (t.textContent || t.innerText || T(t)).indexOf(e) > -1
                                }
                        }),
                        lang: r(function(e) {
                            return ce.test(e || "") || t.error("unsupported lang: " + e), e = e.replace(ve, ye).toLowerCase(),
                                function(t) {
                                    var n;
                                    do {
                                        if (n = P ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return (n = n.toLowerCase()) === e || 0 === n.indexOf(e + "-")
                                    } while ((t = t.parentNode) && 1 === t.nodeType);
                                    return !1
                                }
                        }),
                        target: function(t) {
                            var n = e.location && e.location.hash;
                            return n && n.slice(1) === t.id
                        },
                        root: function(e) {
                            return e === L
                        },
                        focus: function(e) {
                            return e === O.activeElement && (!O.hasFocus || O.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                        },
                        enabled: a(!1),
                        disabled: a(!0),
                        checked: function(e) {
                            var t = e.nodeName.toLowerCase();
                            return "input" === t && !!e.checked || "option" === t && !!e.selected
                        },
                        selected: function(e) {
                            return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
                        },
                        empty: function(e) {
                            for (e = e.firstChild; e; e = e.nextSibling)
                                if (e.nodeType < 6) return !1;
                            return !0
                        },
                        parent: function(e) {
                            return !x.pseudos.empty(e)
                        },
                        header: function(e) {
                            return de.test(e.nodeName)
                        },
                        input: function(e) {
                            return pe.test(e.nodeName)
                        },
                        button: function(e) {
                            var t = e.nodeName.toLowerCase();
                            return "input" === t && "button" === e.type || "button" === t
                        },
                        text: function(e) {
                            var t;
                            return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                        },
                        first: u(function() {
                            return [0]
                        }),
                        last: u(function(e, t) {
                            return [t - 1]
                        }),
                        eq: u(function(e, t, n) {
                            return [n < 0 ? n + t : n]
                        }),
                        even: u(function(e, t) {
                            for (var n = 0; n < t; n += 2) e.push(n);
                            return e
                        }),
                        odd: u(function(e, t) {
                            for (var n = 1; n < t; n += 2) e.push(n);
                            return e
                        }),
                        lt: u(function(e, t, n) {
                            for (var r = n < 0 ? n + t : n; --r >= 0;) e.push(r);
                            return e
                        }),
                        gt: u(function(e, t, n) {
                            for (var r = n < 0 ? n + t : n; ++r < t;) e.push(r);
                            return e
                        })
                    }
                }, x.pseudos.nth = x.pseudos.eq;
                for (b in {
                        radio: !0,
                        checkbox: !0,
                        file: !0,
                        password: !0,
                        image: !0
                    }) x.pseudos[b] = function(e) {
                    return function(t) {
                        return "input" === t.nodeName.toLowerCase() && t.type === e
                    }
                }(b);
                for (b in {
                        submit: !0,
                        reset: !0
                    }) x.pseudos[b] = function(e) {
                    return function(t) {
                        var n = t.nodeName.toLowerCase();
                        return ("input" === n || "button" === n) && t.type === e
                    }
                }(b);
                return c.prototype = x.filters = x.pseudos, x.setFilters = new c, k = t.tokenize = function(e, n) {
                    var r, i, o, s, a, u, l, c = _[e + " "];
                    if (c) return n ? 0 : c.slice(0);
                    for (a = e, u = [], l = x.preFilter; a;) {
                        r && !(i = se.exec(a)) || (i && (a = a.slice(i[0].length) || a), u.push(o = [])), r = !1, (i = ae.exec(a)) && (r = i.shift(), o.push({
                            value: r,
                            type: i[0].replace(oe, " ")
                        }), a = a.slice(r.length));
                        for (s in x.filter) !(i = fe[s].exec(a)) || l[s] && !(i = l[s](i)) || (r = i.shift(), o.push({
                            value: r,
                            type: s,
                            matches: i
                        }), a = a.slice(r.length));
                        if (!r) break
                    }
                    return n ? a.length : a ? t.error(e) : _(e, u).slice(0)
                }, E = t.compile = function(e, t) {
                    var n, r = [],
                        i = [],
                        o = U[e + " "];
                    if (!o) {
                        for (t || (t = k(e)), n = t.length; n--;) o = v(t[n]), o[I] ? r.push(o) : i.push(o);
                        o = U(e, y(i, r)), o.selector = e
                    }
                    return o
                }, S = t.select = function(e, t, n, r) {
                    var i, o, s, a, u, c = "function" == typeof e && e,
                        p = !r && k(e = c.selector || e);
                    if (n = n || [], 1 === p.length) {
                        if (o = p[0] = p[0].slice(0), o.length > 2 && "ID" === (s = o[0]).type && 9 === t.nodeType && P && x.relative[o[1].type]) {
                            if (!(t = (x.find.ID(s.matches[0].replace(ve, ye), t) || [])[0])) return n;
                            c && (t = t.parentNode), e = e.slice(o.shift().value.length)
                        }
                        for (i = fe.needsContext.test(e) ? 0 : o.length; i-- && (s = o[i], !x.relative[a = s.type]);)
                            if ((u = x.find[a]) && (r = u(s.matches[0].replace(ve, ye), ge.test(o[0].type) && l(t.parentNode) || t))) {
                                if (o.splice(i, 1), !(e = r.length && f(o))) return Q.apply(n, r), n;
                                break
                            }
                    }
                    return (c || E(e, p))(r, t, !P, n, !t || ge.test(e) && l(t.parentNode) || t), n
                }, w.sortStable = I.split("").sort(z).join("") === I, w.detectDuplicates = !!N, A(), w.sortDetached = i(function(e) {
                    return 1 & e.compareDocumentPosition(O.createElement("fieldset"))
                }), i(function(e) {
                    return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
                }) || o("type|href|height|width", function(e, t, n) {
                    if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
                }), w.attributes && i(function(e) {
                    return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
                }) || o("value", function(e, t, n) {
                    if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue
                }), i(function(e) {
                    return null == e.getAttribute("disabled")
                }) || o(Z, function(e, t, n) {
                    var r;
                    if (!n) return !0 === e[t] ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
                }), t
            }(s);
            xe.find = Se, xe.expr = Se.selectors, xe.expr[":"] = xe.expr.pseudos, xe.uniqueSort = xe.unique = Se.uniqueSort, xe.text = Se.getText, xe.isXMLDoc = Se.isXML, xe.contains = Se.contains, xe.escapeSelector = Se.escape;
            var De = function(e, t, n) {
                    for (var r = [], i = void 0 !== n;
                        (e = e[t]) && 9 !== e.nodeType;)
                        if (1 === e.nodeType) {
                            if (i && xe(e).is(n)) break;
                            r.push(e)
                        }
                    return r
                },
                je = function(e, t) {
                    for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
                    return n
                },
                Ne = xe.expr.match.needsContext,
                Ae = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i,
                Oe = /^.[^:#\[\.,]*$/;
            xe.filter = function(e, t, n) {
                var r = t[0];
                return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? xe.find.matchesSelector(r, e) ? [r] : [] : xe.find.matches(e, xe.grep(t, function(e) {
                    return 1 === e.nodeType
                }))
            }, xe.fn.extend({
                find: function(e) {
                    var t, n, r = this.length,
                        i = this;
                    if ("string" != typeof e) return this.pushStack(xe(e).filter(function() {
                        for (t = 0; t < r; t++)
                            if (xe.contains(i[t], this)) return !0
                    }));
                    for (n = this.pushStack([]), t = 0; t < r; t++) xe.find(e, i[t], n);
                    return r > 1 ? xe.uniqueSort(n) : n
                },
                filter: function(e) {
                    return this.pushStack(f(this, e || [], !1))
                },
                not: function(e) {
                    return this.pushStack(f(this, e || [], !0))
                },
                is: function(e) {
                    return !!f(this, "string" == typeof e && Ne.test(e) ? xe(e) : e || [], !1).length
                }
            });
            var Le, Pe = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
            (xe.fn.init = function(e, t, n) {
                var r, i;
                if (!e) return this;
                if (n = n || Le, "string" == typeof e) {
                    if (!(r = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : Pe.exec(e)) || !r[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
                    if (r[1]) {
                        if (t = t instanceof xe ? t[0] : t, xe.merge(this, xe.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : ue, !0)), Ae.test(r[1]) && xe.isPlainObject(t))
                            for (r in t) xe.isFunction(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
                        return this
                    }
                    return i = ue.getElementById(r[2]), i && (this[0] = i, this.length = 1), this
                }
                return e.nodeType ? (this[0] = e, this.length = 1, this) : xe.isFunction(e) ? void 0 !== n.ready ? n.ready(e) : e(xe) : xe.makeArray(e, this)
            }).prototype = xe.fn, Le = xe(ue);
            var qe = /^(?:parents|prev(?:Until|All))/,
                He = {
                    children: !0,
                    contents: !0,
                    next: !0,
                    prev: !0
                };
            xe.fn.extend({
                has: function(e) {
                    var t = xe(e, this),
                        n = t.length;
                    return this.filter(function() {
                        for (var e = 0; e < n; e++)
                            if (xe.contains(this, t[e])) return !0
                    })
                },
                closest: function(e, t) {
                    var n, r = 0,
                        i = this.length,
                        o = [],
                        s = "string" != typeof e && xe(e);
                    if (!Ne.test(e))
                        for (; r < i; r++)
                            for (n = this[r]; n && n !== t; n = n.parentNode)
                                if (n.nodeType < 11 && (s ? s.index(n) > -1 : 1 === n.nodeType && xe.find.matchesSelector(n, e))) {
                                    o.push(n);
                                    break
                                }
                    return this.pushStack(o.length > 1 ? xe.uniqueSort(o) : o)
                },
                index: function(e) {
                    return e ? "string" == typeof e ? de.call(xe(e), this[0]) : de.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
                },
                add: function(e, t) {
                    return this.pushStack(xe.uniqueSort(xe.merge(this.get(), xe(e, t))))
                },
                addBack: function(e) {
                    return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
                }
            }), xe.each({
                parent: function(e) {
                    var t = e.parentNode;
                    return t && 11 !== t.nodeType ? t : null
                },
                parents: function(e) {
                    return De(e, "parentNode")
                },
                parentsUntil: function(e, t, n) {
                    return De(e, "parentNode", n)
                },
                next: function(e) {
                    return p(e, "nextSibling")
                },
                prev: function(e) {
                    return p(e, "previousSibling")
                },
                nextAll: function(e) {
                    return De(e, "nextSibling")
                },
                prevAll: function(e) {
                    return De(e, "previousSibling")
                },
                nextUntil: function(e, t, n) {
                    return De(e, "nextSibling", n)
                },
                prevUntil: function(e, t, n) {
                    return De(e, "previousSibling", n)
                },
                siblings: function(e) {
                    return je((e.parentNode || {}).firstChild, e)
                },
                children: function(e) {
                    return je(e.firstChild)
                },
                contents: function(e) {
                    return c(e, "iframe") ? e.contentDocument : (c(e, "template") && (e = e.content || e), xe.merge([], e.childNodes))
                }
            }, function(e, t) {
                xe.fn[e] = function(n, r) {
                    var i = xe.map(this, t, n);
                    return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (i = xe.filter(r, i)), this.length > 1 && (He[e] || xe.uniqueSort(i), qe.test(e) && i.reverse()), this.pushStack(i)
                }
            });
            var Me = /[^\x20\t\r\n\f]+/g;
            xe.Callbacks = function(e) {
                e = "string" == typeof e ? d(e) : xe.extend({}, e);
                var t, n, r, i, o = [],
                    s = [],
                    a = -1,
                    u = function() {
                        for (i = i || e.once, r = t = !0; s.length; a = -1)
                            for (n = s.shift(); ++a < o.length;) !1 === o[a].apply(n[0], n[1]) && e.stopOnFalse && (a = o.length, n = !1);
                        e.memory || (n = !1), t = !1, i && (o = n ? [] : "")
                    },
                    l = {
                        add: function() {
                            return o && (n && !t && (a = o.length - 1, s.push(n)), function t(n) {
                                xe.each(n, function(n, r) {
                                    xe.isFunction(r) ? e.unique && l.has(r) || o.push(r) : r && r.length && "string" !== xe.type(r) && t(r)
                                })
                            }(arguments), n && !t && u()), this
                        },
                        remove: function() {
                            return xe.each(arguments, function(e, t) {
                                for (var n;
                                    (n = xe.inArray(t, o, n)) > -1;) o.splice(n, 1), n <= a && a--
                            }), this
                        },
                        has: function(e) {
                            return e ? xe.inArray(e, o) > -1 : o.length > 0
                        },
                        empty: function() {
                            return o && (o = []), this
                        },
                        disable: function() {
                            return i = s = [], o = n = "", this
                        },
                        disabled: function() {
                            return !o
                        },
                        lock: function() {
                            return i = s = [], n || t || (o = n = ""), this
                        },
                        locked: function() {
                            return !!i
                        },
                        fireWith: function(e, n) {
                            return i || (n = n || [], n = [e, n.slice ? n.slice() : n], s.push(n), t || u()), this
                        },
                        fire: function() {
                            return l.fireWith(this, arguments), this
                        },
                        fired: function() {
                            return !!r
                        }
                    };
                return l
            }, xe.extend({
                Deferred: function(e) {
                    var t = [
                            ["notify", "progress", xe.Callbacks("memory"), xe.Callbacks("memory"), 2],
                            ["resolve", "done", xe.Callbacks("once memory"), xe.Callbacks("once memory"), 0, "resolved"],
                            ["reject", "fail", xe.Callbacks("once memory"), xe.Callbacks("once memory"), 1, "rejected"]
                        ],
                        n = "pending",
                        r = {
                            state: function() {
                                return n
                            },
                            always: function() {
                                return i.done(arguments).fail(arguments), this
                            },
                            catch: function(e) {
                                return r.then(null, e)
                            },
                            pipe: function() {
                                var e = arguments;
                                return xe.Deferred(function(n) {
                                    xe.each(t, function(t, r) {
                                        var o = xe.isFunction(e[r[4]]) && e[r[4]];
                                        i[r[1]](function() {
                                            var e = o && o.apply(this, arguments);
                                            e && xe.isFunction(e.promise) ? e.promise().progress(n.notify).done(n.resolve).fail(n.reject) : n[r[0] + "With"](this, o ? [e] : arguments)
                                        })
                                    }), e = null
                                }).promise()
                            },
                            then: function(e, n, r) {
                                function i(e, t, n, r) {
                                    return function() {
                                        var u = this,
                                            l = arguments,
                                            c = function() {
                                                var s, c;
                                                if (!(e < a)) {
                                                    if ((s = n.apply(u, l)) === t.promise()) throw new TypeError("Thenable self-resolution");
                                                    c = s && ("object" == (void 0 === s ? "undefined" : o(s)) || "function" == typeof s) && s.then, xe.isFunction(c) ? r ? c.call(s, i(a, t, h, r), i(a, t, m, r)) : (a++, c.call(s, i(a, t, h, r), i(a, t, m, r), i(a, t, h, t.notifyWith))) : (n !== h && (u = void 0, l = [s]), (r || t.resolveWith)(u, l))
                                                }
                                            },
                                            f = r ? c : function() {
                                                try {
                                                    c()
                                                } catch (r) {
                                                    xe.Deferred.exceptionHook && xe.Deferred.exceptionHook(r, f.stackTrace), e + 1 >= a && (n !== m && (u = void 0, l = [r]), t.rejectWith(u, l))
                                                }
                                            };
                                        e ? f() : (xe.Deferred.getStackHook && (f.stackTrace = xe.Deferred.getStackHook()), s.setTimeout(f))
                                    }
                                }
                                var a = 0;
                                return xe.Deferred(function(o) {
                                    t[0][3].add(i(0, o, xe.isFunction(r) ? r : h, o.notifyWith)), t[1][3].add(i(0, o, xe.isFunction(e) ? e : h)), t[2][3].add(i(0, o, xe.isFunction(n) ? n : m))
                                }).promise()
                            },
                            promise: function(e) {
                                return null != e ? xe.extend(e, r) : r
                            }
                        },
                        i = {};
                    return xe.each(t, function(e, o) {
                        var s = o[2],
                            a = o[5];
                        r[o[1]] = s.add, a && s.add(function() {
                            n = a
                        }, t[3 - e][2].disable, t[0][2].lock), s.add(o[3].fire), i[o[0]] = function() {
                            return i[o[0] + "With"](this === i ? void 0 : this, arguments), this
                        }, i[o[0] + "With"] = s.fireWith
                    }), r.promise(i), e && e.call(i, i), i
                },
                when: function(e) {
                    var t = arguments.length,
                        n = t,
                        r = Array(n),
                        i = ce.call(arguments),
                        o = xe.Deferred(),
                        s = function(e) {
                            return function(n) {
                                r[e] = this, i[e] = arguments.length > 1 ? ce.call(arguments) : n, --t || o.resolveWith(r, i)
                            }
                        };
                    if (t <= 1 && (g(e, o.done(s(n)).resolve, o.reject, !t), "pending" === o.state() || xe.isFunction(i[n] && i[n].then))) return o.then();
                    for (; n--;) g(i[n], s(n), o.reject);
                    return o.promise()
                }
            });
            var Fe = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
            xe.Deferred.exceptionHook = function(e, t) {
                s.console && s.console.warn && e && Fe.test(e.name) && s.console.warn("jQuery.Deferred exception: " + e.message, e.stack, t)
            }, xe.readyException = function(e) {
                s.setTimeout(function() {
                    throw e
                })
            };
            var Ie = xe.Deferred();
            xe.fn.ready = function(e) {
                return Ie.then(e).catch(function(e) {
                    xe.readyException(e)
                }), this
            }, xe.extend({
                isReady: !1,
                readyWait: 1,
                ready: function(e) {
                    (!0 === e ? --xe.readyWait : xe.isReady) || (xe.isReady = !0, !0 !== e && --xe.readyWait > 0 || Ie.resolveWith(ue, [xe]))
                }
            }), xe.ready.then = Ie.then, "complete" === ue.readyState || "loading" !== ue.readyState && !ue.documentElement.doScroll ? s.setTimeout(xe.ready) : (ue.addEventListener("DOMContentLoaded", v), s.addEventListener("load", v));
            var $e = function e(t, n, r, i, o, s, a) {
                    var u = 0,
                        l = t.length,
                        c = null == r;
                    if ("object" === xe.type(r)) {
                        o = !0;
                        for (u in r) e(t, n, u, r[u], !0, s, a)
                    } else if (void 0 !== i && (o = !0, xe.isFunction(i) || (a = !0), c && (a ? (n.call(t, i), n = null) : (c = n, n = function(e, t, n) {
                            return c.call(xe(e), n)
                        })), n))
                        for (; u < l; u++) n(t[u], r, a ? i : i.call(t[u], u, n(t[u], r)));
                    return o ? t : c ? n.call(t) : l ? n(t[0], r) : s
                },
                Be = function(e) {
                    return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
                };
            y.uid = 1, y.prototype = {
                cache: function(e) {
                    var t = e[this.expando];
                    return t || (t = {}, Be(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                        value: t,
                        configurable: !0
                    }))), t
                },
                set: function(e, t, n) {
                    var r, i = this.cache(e);
                    if ("string" == typeof t) i[xe.camelCase(t)] = n;
                    else
                        for (r in t) i[xe.camelCase(r)] = t[r];
                    return i
                },
                get: function(e, t) {
                    return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][xe.camelCase(t)]
                },
                access: function(e, t, n) {
                    return void 0 === t || t && "string" == typeof t && void 0 === n ? this.get(e, t) : (this.set(e, t, n), void 0 !== n ? n : t)
                },
                remove: function(e, t) {
                    var n, r = e[this.expando];
                    if (void 0 !== r) {
                        if (void 0 !== t) {
                            Array.isArray(t) ? t = t.map(xe.camelCase) : (t = xe.camelCase(t), t = t in r ? [t] : t.match(Me) || []), n = t.length;
                            for (; n--;) delete r[t[n]]
                        }(void 0 === t || xe.isEmptyObject(r)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
                    }
                },
                hasData: function(e) {
                    var t = e[this.expando];
                    return void 0 !== t && !xe.isEmptyObject(t)
                }
            };
            var Re = new y,
                We = new y,
                _e = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
                Ue = /[A-Z]/g;
            xe.extend({
                hasData: function(e) {
                    return We.hasData(e) || Re.hasData(e)
                },
                data: function(e, t, n) {
                    return We.access(e, t, n)
                },
                removeData: function(e, t) {
                    We.remove(e, t)
                },
                _data: function(e, t, n) {
                    return Re.access(e, t, n)
                },
                _removeData: function(e, t) {
                    Re.remove(e, t)
                }
            }), xe.fn.extend({
                data: function(e, t) {
                    var n, r, i, s = this[0],
                        a = s && s.attributes;
                    if (void 0 === e) {
                        if (this.length && (i = We.get(s), 1 === s.nodeType && !Re.get(s, "hasDataAttrs"))) {
                            for (n = a.length; n--;) a[n] && (r = a[n].name, 0 === r.indexOf("data-") && (r = xe.camelCase(r.slice(5)), w(s, r, i[r])));
                            Re.set(s, "hasDataAttrs", !0)
                        }
                        return i
                    }
                    return "object" == (void 0 === e ? "undefined" : o(e)) ? this.each(function() {
                        We.set(this, e)
                    }) : $e(this, function(t) {
                        var n;
                        if (s && void 0 === t) {
                            if (void 0 !== (n = We.get(s, e))) return n;
                            if (void 0 !== (n = w(s, e))) return n
                        } else this.each(function() {
                            We.set(this, e, t)
                        })
                    }, null, t, arguments.length > 1, null, !0)
                },
                removeData: function(e) {
                    return this.each(function() {
                        We.remove(this, e)
                    })
                }
            }), xe.extend({
                queue: function(e, t, n) {
                    var r;
                    if (e) return t = (t || "fx") + "queue", r = Re.get(e, t), n && (!r || Array.isArray(n) ? r = Re.access(e, t, xe.makeArray(n)) : r.push(n)), r || []
                },
                dequeue: function(e, t) {
                    t = t || "fx";
                    var n = xe.queue(e, t),
                        r = n.length,
                        i = n.shift(),
                        o = xe._queueHooks(e, t),
                        s = function() {
                            xe.dequeue(e, t)
                        };
                    "inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, s, o)), !r && o && o.empty.fire()
                },
                _queueHooks: function(e, t) {
                    var n = t + "queueHooks";
                    return Re.get(e, n) || Re.access(e, n, {
                        empty: xe.Callbacks("once memory").add(function() {
                            Re.remove(e, [t + "queue", n])
                        })
                    })
                }
            }), xe.fn.extend({
                queue: function(e, t) {
                    var n = 2;
                    return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? xe.queue(this[0], e) : void 0 === t ? this : this.each(function() {
                        var n = xe.queue(this, e, t);
                        xe._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && xe.dequeue(this, e)
                    })
                },
                dequeue: function(e) {
                    return this.each(function() {
                        xe.dequeue(this, e)
                    })
                },
                clearQueue: function(e) {
                    return this.queue(e || "fx", [])
                },
                promise: function(e, t) {
                    var n, r = 1,
                        i = xe.Deferred(),
                        o = this,
                        s = this.length,
                        a = function() {
                            --r || i.resolveWith(o, [o])
                        };
                    for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; s--;)(n = Re.get(o[s], e + "queueHooks")) && n.empty && (r++, n.empty.add(a));
                    return a(), i.promise(t)
                }
            });
            var ze = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
                Xe = new RegExp("^(?:([+-])=|)(" + ze + ")([a-z%]*)$", "i"),
                Ye = ["Top", "Right", "Bottom", "Left"],
                Ve = function(e, t) {
                    return e = t || e, "none" === e.style.display || "" === e.style.display && xe.contains(e.ownerDocument, e) && "none" === xe.css(e, "display")
                },
                Ge = function(e, t, n, r) {
                    var i, o, s = {};
                    for (o in t) s[o] = e.style[o], e.style[o] = t[o];
                    i = n.apply(e, r || []);
                    for (o in t) e.style[o] = s[o];
                    return i
                },
                Qe = {};
            xe.fn.extend({
                show: function() {
                    return C(this, !0)
                },
                hide: function() {
                    return C(this)
                },
                toggle: function(e) {
                    return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                        Ve(this) ? xe(this).show() : xe(this).hide()
                    })
                }
            });
            var Ke = /^(?:checkbox|radio)$/i,
                Je = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i,
                Ze = /^$|\/(?:java|ecma)script/i,
                et = {
                    option: [1, "<select multiple='multiple'>", "</select>"],
                    thead: [1, "<table>", "</table>"],
                    col: [2, "<table><colgroup>", "</colgroup></table>"],
                    tr: [2, "<table><tbody>", "</tbody></table>"],
                    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                    _default: [0, "", ""]
                };
            et.optgroup = et.option, et.tbody = et.tfoot = et.colgroup = et.caption = et.thead, et.th = et.td;
            var tt = /<|&#?\w+;/;
            ! function() {
                var e = ue.createDocumentFragment(),
                    t = e.appendChild(ue.createElement("div")),
                    n = ue.createElement("input");
                n.setAttribute("type", "radio"), n.setAttribute("checked", "checked"), n.setAttribute("name", "t"), t.appendChild(n), be.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, t.innerHTML = "<textarea>x</textarea>", be.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue
            }();
            var nt = ue.documentElement,
                rt = /^key/,
                it = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
                ot = /^([^.]*)(?:\.(.+)|)/;
            xe.event = {
                global: {},
                add: function(e, t, n, r, i) {
                    var o, s, a, u, l, c, f, p, d, h, m, g = Re.get(e);
                    if (g)
                        for (n.handler && (o = n, n = o.handler, i = o.selector), i && xe.find.matchesSelector(nt, i), n.guid || (n.guid = xe.guid++), (u = g.events) || (u = g.events = {}), (s = g.handle) || (s = g.handle = function(t) {
                                return void 0 !== xe && xe.event.triggered !== t.type ? xe.event.dispatch.apply(e, arguments) : void 0
                            }), t = (t || "").match(Me) || [""], l = t.length; l--;) a = ot.exec(t[l]) || [], d = m = a[1], h = (a[2] || "").split(".").sort(), d && (f = xe.event.special[d] || {}, d = (i ? f.delegateType : f.bindType) || d, f = xe.event.special[d] || {}, c = xe.extend({
                            type: d,
                            origType: m,
                            data: r,
                            handler: n,
                            guid: n.guid,
                            selector: i,
                            needsContext: i && xe.expr.match.needsContext.test(i),
                            namespace: h.join(".")
                        }, o), (p = u[d]) || (p = u[d] = [], p.delegateCount = 0, f.setup && !1 !== f.setup.call(e, r, h, s) || e.addEventListener && e.addEventListener(d, s)), f.add && (f.add.call(e, c), c.handler.guid || (c.handler.guid = n.guid)), i ? p.splice(p.delegateCount++, 0, c) : p.push(c), xe.event.global[d] = !0)
                },
                remove: function(e, t, n, r, i) {
                    var o, s, a, u, l, c, f, p, d, h, m, g = Re.hasData(e) && Re.get(e);
                    if (g && (u = g.events)) {
                        for (t = (t || "").match(Me) || [""], l = t.length; l--;)
                            if (a = ot.exec(t[l]) || [], d = m = a[1], h = (a[2] || "").split(".").sort(), d) {
                                for (f = xe.event.special[d] || {}, d = (r ? f.delegateType : f.bindType) || d, p = u[d] || [], a = a[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), s = o = p.length; o--;) c = p[o], !i && m !== c.origType || n && n.guid !== c.guid || a && !a.test(c.namespace) || r && r !== c.selector && ("**" !== r || !c.selector) || (p.splice(o, 1), c.selector && p.delegateCount--, f.remove && f.remove.call(e, c));
                                s && !p.length && (f.teardown && !1 !== f.teardown.call(e, h, g.handle) || xe.removeEvent(e, d, g.handle), delete u[d])
                            } else
                                for (d in u) xe.event.remove(e, d + t[l], n, r, !0);
                        xe.isEmptyObject(u) && Re.remove(e, "handle events")
                    }
                },
                dispatch: function(e) {
                    var t, n, r, i, o, s, a = xe.event.fix(e),
                        u = new Array(arguments.length),
                        l = (Re.get(this, "events") || {})[a.type] || [],
                        c = xe.event.special[a.type] || {};
                    for (u[0] = a, t = 1; t < arguments.length; t++) u[t] = arguments[t];
                    if (a.delegateTarget = this, !c.preDispatch || !1 !== c.preDispatch.call(this, a)) {
                        for (s = xe.event.handlers.call(this, a, l), t = 0;
                            (i = s[t++]) && !a.isPropagationStopped();)
                            for (a.currentTarget = i.elem, n = 0;
                                (o = i.handlers[n++]) && !a.isImmediatePropagationStopped();) a.rnamespace && !a.rnamespace.test(o.namespace) || (a.handleObj = o, a.data = o.data, void 0 !== (r = ((xe.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, u)) && !1 === (a.result = r) && (a.preventDefault(), a.stopPropagation()));
                        return c.postDispatch && c.postDispatch.call(this, a), a.result
                    }
                },
                handlers: function(e, t) {
                    var n, r, i, o, s, a = [],
                        u = t.delegateCount,
                        l = e.target;
                    if (u && l.nodeType && !("click" === e.type && e.button >= 1))
                        for (; l !== this; l = l.parentNode || this)
                            if (1 === l.nodeType && ("click" !== e.type || !0 !== l.disabled)) {
                                for (o = [], s = {}, n = 0; n < u; n++) r = t[n], i = r.selector + " ", void 0 === s[i] && (s[i] = r.needsContext ? xe(i, this).index(l) > -1 : xe.find(i, this, null, [l]).length), s[i] && o.push(r);
                                o.length && a.push({
                                    elem: l,
                                    handlers: o
                                })
                            }
                    return l = this, u < t.length && a.push({
                        elem: l,
                        handlers: t.slice(u)
                    }), a
                },
                addProp: function(e, t) {
                    Object.defineProperty(xe.Event.prototype, e, {
                        enumerable: !0,
                        configurable: !0,
                        get: xe.isFunction(t) ? function() {
                            if (this.originalEvent) return t(this.originalEvent)
                        } : function() {
                            if (this.originalEvent) return this.originalEvent[e]
                        },
                        set: function(t) {
                            Object.defineProperty(this, e, {
                                enumerable: !0,
                                configurable: !0,
                                writable: !0,
                                value: t
                            })
                        }
                    })
                },
                fix: function(e) {
                    return e[xe.expando] ? e : new xe.Event(e)
                },
                special: {
                    load: {
                        noBubble: !0
                    },
                    focus: {
                        trigger: function() {
                            if (this !== N() && this.focus) return this.focus(), !1
                        },
                        delegateType: "focusin"
                    },
                    blur: {
                        trigger: function() {
                            if (this === N() && this.blur) return this.blur(), !1
                        },
                        delegateType: "focusout"
                    },
                    click: {
                        trigger: function() {
                            if ("checkbox" === this.type && this.click && c(this, "input")) return this.click(), !1
                        },
                        _default: function(e) {
                            return c(e.target, "a")
                        }
                    },
                    beforeunload: {
                        postDispatch: function(e) {
                            void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                        }
                    }
                }
            }, xe.removeEvent = function(e, t, n) {
                e.removeEventListener && e.removeEventListener(t, n)
            }, xe.Event = function(e, t) {
                return this instanceof xe.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? D : j, this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target, this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e, t && xe.extend(this, t), this.timeStamp = e && e.timeStamp || xe.now(), void(this[xe.expando] = !0)) : new xe.Event(e, t)
            }, xe.Event.prototype = {
                constructor: xe.Event,
                isDefaultPrevented: j,
                isPropagationStopped: j,
                isImmediatePropagationStopped: j,
                isSimulated: !1,
                preventDefault: function() {
                    var e = this.originalEvent;
                    this.isDefaultPrevented = D, e && !this.isSimulated && e.preventDefault()
                },
                stopPropagation: function() {
                    var e = this.originalEvent;
                    this.isPropagationStopped = D, e && !this.isSimulated && e.stopPropagation()
                },
                stopImmediatePropagation: function() {
                    var e = this.originalEvent;
                    this.isImmediatePropagationStopped = D, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation()
                }
            }, xe.each({
                altKey: !0,
                bubbles: !0,
                cancelable: !0,
                changedTouches: !0,
                ctrlKey: !0,
                detail: !0,
                eventPhase: !0,
                metaKey: !0,
                pageX: !0,
                pageY: !0,
                shiftKey: !0,
                view: !0,
                char: !0,
                charCode: !0,
                key: !0,
                keyCode: !0,
                button: !0,
                buttons: !0,
                clientX: !0,
                clientY: !0,
                offsetX: !0,
                offsetY: !0,
                pointerId: !0,
                pointerType: !0,
                screenX: !0,
                screenY: !0,
                targetTouches: !0,
                toElement: !0,
                touches: !0,
                which: function(e) {
                    var t = e.button;
                    return null == e.which && rt.test(e.type) ? null != e.charCode ? e.charCode : e.keyCode : !e.which && void 0 !== t && it.test(e.type) ? 1 & t ? 1 : 2 & t ? 3 : 4 & t ? 2 : 0 : e.which
                }
            }, xe.event.addProp), xe.each({
                mouseenter: "mouseover",
                mouseleave: "mouseout",
                pointerenter: "pointerover",
                pointerleave: "pointerout"
            }, function(e, t) {
                xe.event.special[e] = {
                    delegateType: t,
                    bindType: t,
                    handle: function(e) {
                        var n, r = this,
                            i = e.relatedTarget,
                            o = e.handleObj;
                        return i && (i === r || xe.contains(r, i)) || (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n
                    }
                }
            }), xe.fn.extend({
                on: function(e, t, n, r) {
                    return A(this, e, t, n, r)
                },
                one: function(e, t, n, r) {
                    return A(this, e, t, n, r, 1)
                },
                off: function(e, t, n) {
                    var r, i;
                    if (e && e.preventDefault && e.handleObj) return r = e.handleObj, xe(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
                    if ("object" == (void 0 === e ? "undefined" : o(e))) {
                        for (i in e) this.off(i, t, e[i]);
                        return this
                    }
                    return !1 !== t && "function" != typeof t || (n = t, t = void 0), !1 === n && (n = j), this.each(function() {
                        xe.event.remove(this, e, n, t)
                    })
                }
            });
            var st = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
                at = /<script|<style|<link/i,
                ut = /checked\s*(?:[^=]|=\s*.checked.)/i,
                lt = /^true\/(.*)/,
                ct = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
            xe.extend({
                htmlPrefilter: function(e) {
                    return e.replace(st, "<$1></$2>")
                },
                clone: function(e, t, n) {
                    var r, i, o, s, a = e.cloneNode(!0),
                        u = xe.contains(e.ownerDocument, e);
                    if (!(be.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || xe.isXMLDoc(e)))
                        for (s = k(a), o = k(e), r = 0, i = o.length; r < i; r++) H(o[r], s[r]);
                    if (t)
                        if (n)
                            for (o = o || k(e), s = s || k(a), r = 0, i = o.length; r < i; r++) q(o[r], s[r]);
                        else q(e, a);
                    return s = k(a, "script"), s.length > 0 && E(s, !u && k(e, "script")), a
                },
                cleanData: function(e) {
                    for (var t, n, r, i = xe.event.special, o = 0; void 0 !== (n = e[o]); o++)
                        if (Be(n)) {
                            if (t = n[Re.expando]) {
                                if (t.events)
                                    for (r in t.events) i[r] ? xe.event.remove(n, r) : xe.removeEvent(n, r, t.handle);
                                n[Re.expando] = void 0
                            }
                            n[We.expando] && (n[We.expando] = void 0)
                        }
                }
            }), xe.fn.extend({
                detach: function(e) {
                    return F(this, e, !0)
                },
                remove: function(e) {
                    return F(this, e)
                },
                text: function(e) {
                    return $e(this, function(e) {
                        return void 0 === e ? xe.text(this) : this.empty().each(function() {
                            1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
                        })
                    }, null, e, arguments.length)
                },
                append: function() {
                    return M(this, arguments, function(e) {
                        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                            O(this, e).appendChild(e)
                        }
                    })
                },
                prepend: function() {
                    return M(this, arguments, function(e) {
                        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                            var t = O(this, e);
                            t.insertBefore(e, t.firstChild)
                        }
                    })
                },
                before: function() {
                    return M(this, arguments, function(e) {
                        this.parentNode && this.parentNode.insertBefore(e, this)
                    })
                },
                after: function() {
                    return M(this, arguments, function(e) {
                        this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
                    })
                },
                empty: function() {
                    for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (xe.cleanData(k(e, !1)), e.textContent = "");
                    return this
                },
                clone: function(e, t) {
                    return e = null != e && e, t = null == t ? e : t, this.map(function() {
                        return xe.clone(this, e, t)
                    })
                },
                html: function(e) {
                    return $e(this, function(e) {
                        var t = this[0] || {},
                            n = 0,
                            r = this.length;
                        if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                        if ("string" == typeof e && !at.test(e) && !et[(Je.exec(e) || ["", ""])[1].toLowerCase()]) {
                            e = xe.htmlPrefilter(e);
                            try {
                                for (; n < r; n++) t = this[n] || {}, 1 === t.nodeType && (xe.cleanData(k(t, !1)), t.innerHTML = e);
                                t = 0
                            } catch (e) {}
                        }
                        t && this.empty().append(e)
                    }, null, e, arguments.length)
                },
                replaceWith: function() {
                    var e = [];
                    return M(this, arguments, function(t) {
                        var n = this.parentNode;
                        xe.inArray(this, e) < 0 && (xe.cleanData(k(this)), n && n.replaceChild(t, this))
                    }, e)
                }
            }), xe.each({
                appendTo: "append",
                prependTo: "prepend",
                insertBefore: "before",
                insertAfter: "after",
                replaceAll: "replaceWith"
            }, function(e, t) {
                xe.fn[e] = function(e) {
                    for (var n, r = [], i = xe(e), o = i.length - 1, s = 0; s <= o; s++) n = s === o ? this : this.clone(!0), xe(i[s])[t](n), pe.apply(r, n.get());
                    return this.pushStack(r)
                }
            });
            var ft = /^margin/,
                pt = new RegExp("^(" + ze + ")(?!px)[a-z%]+$", "i"),
                dt = function(e) {
                    var t = e.ownerDocument.defaultView;
                    return t && t.opener || (t = s), t.getComputedStyle(e)
                };
            ! function() {
                function e() {
                    if (a) {
                        a.style.cssText = "box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", a.innerHTML = "", nt.appendChild(o);
                        var e = s.getComputedStyle(a);
                        t = "1%" !== e.top, i = "2px" === e.marginLeft, n = "4px" === e.width, a.style.marginRight = "50%", r = "4px" === e.marginRight, nt.removeChild(o), a = null
                    }
                }
                var t, n, r, i, o = ue.createElement("div"),
                    a = ue.createElement("div");
                a.style && (a.style.backgroundClip = "content-box", a.cloneNode(!0).style.backgroundClip = "", be.clearCloneStyle = "content-box" === a.style.backgroundClip, o.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", o.appendChild(a), xe.extend(be, {
                    pixelPosition: function() {
                        return e(), t
                    },
                    boxSizingReliable: function() {
                        return e(), n
                    },
                    pixelMarginRight: function() {
                        return e(), r
                    },
                    reliableMarginLeft: function() {
                        return e(), i
                    }
                }))
            }();
            var ht = /^(none|table(?!-c[ea]).+)/,
                mt = /^--/,
                gt = {
                    position: "absolute",
                    visibility: "hidden",
                    display: "block"
                },
                vt = {
                    letterSpacing: "0",
                    fontWeight: "400"
                },
                yt = ["Webkit", "Moz", "ms"],
                bt = ue.createElement("div").style;
            xe.extend({
                cssHooks: {
                    opacity: {
                        get: function(e, t) {
                            if (t) {
                                var n = I(e, "opacity");
                                return "" === n ? "1" : n
                            }
                        }
                    }
                },
                cssNumber: {
                    animationIterationCount: !0,
                    columnCount: !0,
                    fillOpacity: !0,
                    flexGrow: !0,
                    flexShrink: !0,
                    fontWeight: !0,
                    lineHeight: !0,
                    opacity: !0,
                    order: !0,
                    orphans: !0,
                    widows: !0,
                    zIndex: !0,
                    zoom: !0
                },
                cssProps: {
                    float: "cssFloat"
                },
                style: function(e, t, n, r) {
                    if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                        var i, s, a, u = xe.camelCase(t),
                            l = mt.test(t),
                            c = e.style;
                        return l || (t = R(u)), a = xe.cssHooks[t] || xe.cssHooks[u], void 0 === n ? a && "get" in a && void 0 !== (i = a.get(e, !1, r)) ? i : c[t] : (s = void 0 === n ? "undefined" : o(n), "string" === s && (i = Xe.exec(n)) && i[1] && (n = x(e, t, i), s = "number"), void(null != n && n === n && ("number" === s && (n += i && i[3] || (xe.cssNumber[u] ? "" : "px")), be.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (c[t] = "inherit"), a && "set" in a && void 0 === (n = a.set(e, n, r)) || (l ? c.setProperty(t, n) : c[t] = n))))
                    }
                },
                css: function(e, t, n, r) {
                    var i, o, s, a = xe.camelCase(t);
                    return mt.test(t) || (t = R(a)), s = xe.cssHooks[t] || xe.cssHooks[a], s && "get" in s && (i = s.get(e, !0, n)), void 0 === i && (i = I(e, t, r)), "normal" === i && t in vt && (i = vt[t]), "" === n || n ? (o = parseFloat(i), !0 === n || isFinite(o) ? o || 0 : i) : i
                }
            }), xe.each(["height", "width"], function(e, t) {
                xe.cssHooks[t] = {
                    get: function(e, n, r) {
                        if (n) return !ht.test(xe.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? U(e, t, r) : Ge(e, gt, function() {
                            return U(e, t, r)
                        })
                    },
                    set: function(e, n, r) {
                        var i, o = r && dt(e),
                            s = r && _(e, t, r, "border-box" === xe.css(e, "boxSizing", !1, o), o);
                        return s && (i = Xe.exec(n)) && "px" !== (i[3] || "px") && (e.style[t] = n, n = xe.css(e, t)), W(e, n, s)
                    }
                }
            }), xe.cssHooks.marginLeft = $(be.reliableMarginLeft, function(e, t) {
                if (t) return (parseFloat(I(e, "marginLeft")) || e.getBoundingClientRect().left - Ge(e, {
                    marginLeft: 0
                }, function() {
                    return e.getBoundingClientRect().left
                })) + "px"
            }), xe.each({
                margin: "",
                padding: "",
                border: "Width"
            }, function(e, t) {
                xe.cssHooks[e + t] = {
                    expand: function(n) {
                        for (var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [n]; r < 4; r++) i[e + Ye[r] + t] = o[r] || o[r - 2] || o[0];
                        return i
                    }
                }, ft.test(e) || (xe.cssHooks[e + t].set = W)
            }), xe.fn.extend({
                css: function(e, t) {
                    return $e(this, function(e, t, n) {
                        var r, i, o = {},
                            s = 0;
                        if (Array.isArray(t)) {
                            for (r = dt(e), i = t.length; s < i; s++) o[t[s]] = xe.css(e, t[s], !1, r);
                            return o
                        }
                        return void 0 !== n ? xe.style(e, t, n) : xe.css(e, t)
                    }, e, t, arguments.length > 1)
                }
            }), xe.Tween = z, z.prototype = {
                constructor: z,
                init: function(e, t, n, r, i, o) {
                    this.elem = e, this.prop = n, this.easing = i || xe.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (xe.cssNumber[n] ? "" : "px")
                },
                cur: function() {
                    var e = z.propHooks[this.prop];
                    return e && e.get ? e.get(this) : z.propHooks._default.get(this)
                },
                run: function(e) {
                    var t, n = z.propHooks[this.prop];
                    return this.options.duration ? this.pos = t = xe.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : z.propHooks._default.set(this), this
                }
            }, z.prototype.init.prototype = z.prototype, z.propHooks = {
                _default: {
                    get: function(e) {
                        var t;
                        return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = xe.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0)
                    },
                    set: function(e) {
                        xe.fx.step[e.prop] ? xe.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[xe.cssProps[e.prop]] && !xe.cssHooks[e.prop] ? e.elem[e.prop] = e.now : xe.style(e.elem, e.prop, e.now + e.unit)
                    }
                }
            }, z.propHooks.scrollTop = z.propHooks.scrollLeft = {
                set: function(e) {
                    e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
                }
            }, xe.easing = {
                linear: function(e) {
                    return e
                },
                swing: function(e) {
                    return .5 - Math.cos(e * Math.PI) / 2
                },
                _default: "swing"
            }, xe.fx = z.prototype.init, xe.fx.step = {};
            var wt, xt, Tt = /^(?:toggle|show|hide)$/,
                Ct = /queueHooks$/;
            xe.Animation = xe.extend(J, {
                    tweeners: {
                        "*": [function(e, t) {
                            var n = this.createTween(e, t);
                            return x(n.elem, e, Xe.exec(t), n), n
                        }]
                    },
                    tweener: function(e, t) {
                        xe.isFunction(e) ? (t = e, e = ["*"]) : e = e.match(Me);
                        for (var n, r = 0, i = e.length; r < i; r++) n = e[r], J.tweeners[n] = J.tweeners[n] || [], J.tweeners[n].unshift(t)
                    },
                    prefilters: [Q],
                    prefilter: function(e, t) {
                        t ? J.prefilters.unshift(e) : J.prefilters.push(e)
                    }
                }), xe.speed = function(e, t, n) {
                    var r = e && "object" == (void 0 === e ? "undefined" : o(e)) ? xe.extend({}, e) : {
                        complete: n || !n && t || xe.isFunction(e) && e,
                        duration: e,
                        easing: n && t || t && !xe.isFunction(t) && t
                    };
                    return xe.fx.off ? r.duration = 0 : "number" != typeof r.duration && (r.duration in xe.fx.speeds ? r.duration = xe.fx.speeds[r.duration] : r.duration = xe.fx.speeds._default), null != r.queue && !0 !== r.queue || (r.queue = "fx"), r.old = r.complete, r.complete = function() {
                        xe.isFunction(r.old) && r.old.call(this), r.queue && xe.dequeue(this, r.queue)
                    }, r
                }, xe.fn.extend({
                    fadeTo: function(e, t, n, r) {
                        return this.filter(Ve).css("opacity", 0).show().end().animate({
                            opacity: t
                        }, e, n, r)
                    },
                    animate: function(e, t, n, r) {
                        var i = xe.isEmptyObject(e),
                            o = xe.speed(t, n, r),
                            s = function() {
                                var t = J(this, xe.extend({}, e), o);
                                (i || Re.get(this, "finish")) && t.stop(!0)
                            };
                        return s.finish = s, i || !1 === o.queue ? this.each(s) : this.queue(o.queue, s)
                    },
                    stop: function(e, t, n) {
                        var r = function(e) {
                            var t = e.stop;
                            delete e.stop, t(n)
                        };
                        return "string" != typeof e && (n = t, t = e, e = void 0), t && !1 !== e && this.queue(e || "fx", []), this.each(function() {
                            var t = !0,
                                i = null != e && e + "queueHooks",
                                o = xe.timers,
                                s = Re.get(this);
                            if (i) s[i] && s[i].stop && r(s[i]);
                            else
                                for (i in s) s[i] && s[i].stop && Ct.test(i) && r(s[i]);
                            for (i = o.length; i--;) o[i].elem !== this || null != e && o[i].queue !== e || (o[i].anim.stop(n), t = !1, o.splice(i, 1));
                            !t && n || xe.dequeue(this, e)
                        })
                    },
                    finish: function(e) {
                        return !1 !== e && (e = e || "fx"), this.each(function() {
                            var t, n = Re.get(this),
                                r = n[e + "queue"],
                                i = n[e + "queueHooks"],
                                o = xe.timers,
                                s = r ? r.length : 0;
                            for (n.finish = !0, xe.queue(this, e, []), i && i.stop && i.stop.call(this, !0), t = o.length; t--;) o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
                            for (t = 0; t < s; t++) r[t] && r[t].finish && r[t].finish.call(this);
                            delete n.finish
                        })
                    }
                }), xe.each(["toggle", "show", "hide"], function(e, t) {
                    var n = xe.fn[t];
                    xe.fn[t] = function(e, r, i) {
                        return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(V(t, !0), e, r, i)
                    }
                }), xe.each({
                    slideDown: V("show"),
                    slideUp: V("hide"),
                    slideToggle: V("toggle"),
                    fadeIn: {
                        opacity: "show"
                    },
                    fadeOut: {
                        opacity: "hide"
                    },
                    fadeToggle: {
                        opacity: "toggle"
                    }
                }, function(e, t) {
                    xe.fn[e] = function(e, n, r) {
                        return this.animate(t, e, n, r)
                    }
                }), xe.timers = [], xe.fx.tick = function() {
                    var e, t = 0,
                        n = xe.timers;
                    for (wt = xe.now(); t < n.length; t++)(e = n[t])() || n[t] !== e || n.splice(t--, 1);
                    n.length || xe.fx.stop(), wt = void 0
                }, xe.fx.timer = function(e) {
                    xe.timers.push(e), xe.fx.start()
                }, xe.fx.interval = 13, xe.fx.start = function() {
                    xt || (xt = !0, X())
                }, xe.fx.stop = function() {
                    xt = null
                }, xe.fx.speeds = {
                    slow: 600,
                    fast: 200,
                    _default: 400
                }, xe.fn.delay = function(e, t) {
                    return e = xe.fx ? xe.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function(t, n) {
                        var r = s.setTimeout(t, e);
                        n.stop = function() {
                            s.clearTimeout(r)
                        }
                    })
                },
                function() {
                    var e = ue.createElement("input"),
                        t = ue.createElement("select"),
                        n = t.appendChild(ue.createElement("option"));
                    e.type = "checkbox", be.checkOn = "" !== e.value, be.optSelected = n.selected, e = ue.createElement("input"), e.value = "t", e.type = "radio", be.radioValue = "t" === e.value
                }();
            var kt, Et = xe.expr.attrHandle;
            xe.fn.extend({
                attr: function(e, t) {
                    return $e(this, xe.attr, e, t, arguments.length > 1)
                },
                removeAttr: function(e) {
                    return this.each(function() {
                        xe.removeAttr(this, e)
                    })
                }
            }), xe.extend({
                attr: function(e, t, n) {
                    var r, i, o = e.nodeType;
                    if (3 !== o && 8 !== o && 2 !== o) return void 0 === e.getAttribute ? xe.prop(e, t, n) : (1 === o && xe.isXMLDoc(e) || (i = xe.attrHooks[t.toLowerCase()] || (xe.expr.match.bool.test(t) ? kt : void 0)), void 0 !== n ? null === n ? void xe.removeAttr(e, t) : i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : (e.setAttribute(t, n + ""), n) : i && "get" in i && null !== (r = i.get(e, t)) ? r : (r = xe.find.attr(e, t), null == r ? void 0 : r))
                },
                attrHooks: {
                    type: {
                        set: function(e, t) {
                            if (!be.radioValue && "radio" === t && c(e, "input")) {
                                var n = e.value;
                                return e.setAttribute("type", t), n && (e.value = n), t
                            }
                        }
                    }
                },
                removeAttr: function(e, t) {
                    var n, r = 0,
                        i = t && t.match(Me);
                    if (i && 1 === e.nodeType)
                        for (; n = i[r++];) e.removeAttribute(n)
                }
            }), kt = {
                set: function(e, t, n) {
                    return !1 === t ? xe.removeAttr(e, n) : e.setAttribute(n, n), n
                }
            }, xe.each(xe.expr.match.bool.source.match(/\w+/g), function(e, t) {
                var n = Et[t] || xe.find.attr;
                Et[t] = function(e, t, r) {
                    var i, o, s = t.toLowerCase();
                    return r || (o = Et[s], Et[s] = i, i = null != n(e, t, r) ? s : null, Et[s] = o), i
                }
            });
            var St = /^(?:input|select|textarea|button)$/i,
                Dt = /^(?:a|area)$/i;
            xe.fn.extend({
                prop: function(e, t) {
                    return $e(this, xe.prop, e, t, arguments.length > 1)
                },
                removeProp: function(e) {
                    return this.each(function() {
                        delete this[xe.propFix[e] || e]
                    })
                }
            }), xe.extend({
                prop: function(e, t, n) {
                    var r, i, o = e.nodeType;
                    if (3 !== o && 8 !== o && 2 !== o) return 1 === o && xe.isXMLDoc(e) || (t = xe.propFix[t] || t, i = xe.propHooks[t]), void 0 !== n ? i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t]
                },
                propHooks: {
                    tabIndex: {
                        get: function(e) {
                            var t = xe.find.attr(e, "tabindex");
                            return t ? parseInt(t, 10) : St.test(e.nodeName) || Dt.test(e.nodeName) && e.href ? 0 : -1
                        }
                    }
                },
                propFix: {
                    for: "htmlFor",
                    class: "className"
                }
            }), be.optSelected || (xe.propHooks.selected = {
                get: function(e) {
                    var t = e.parentNode;
                    return t && t.parentNode && t.parentNode.selectedIndex, null
                },
                set: function(e) {
                    var t = e.parentNode;
                    t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex)
                }
            }), xe.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
                xe.propFix[this.toLowerCase()] = this
            }), xe.fn.extend({
                addClass: function(e) {
                    var t, n, r, i, o, s, a, u = 0;
                    if (xe.isFunction(e)) return this.each(function(t) {
                        xe(this).addClass(e.call(this, t, ee(this)))
                    });
                    if ("string" == typeof e && e)
                        for (t = e.match(Me) || []; n = this[u++];)
                            if (i = ee(n), r = 1 === n.nodeType && " " + Z(i) + " ") {
                                for (s = 0; o = t[s++];) r.indexOf(" " + o + " ") < 0 && (r += o + " ");
                                a = Z(r), i !== a && n.setAttribute("class", a)
                            }
                    return this
                },
                removeClass: function(e) {
                    var t, n, r, i, o, s, a, u = 0;
                    if (xe.isFunction(e)) return this.each(function(t) {
                        xe(this).removeClass(e.call(this, t, ee(this)))
                    });
                    if (!arguments.length) return this.attr("class", "");
                    if ("string" == typeof e && e)
                        for (t = e.match(Me) || []; n = this[u++];)
                            if (i = ee(n), r = 1 === n.nodeType && " " + Z(i) + " ") {
                                for (s = 0; o = t[s++];)
                                    for (; r.indexOf(" " + o + " ") > -1;) r = r.replace(" " + o + " ", " ");
                                a = Z(r), i !== a && n.setAttribute("class", a)
                            }
                    return this
                },
                toggleClass: function(e, t) {
                    var n = void 0 === e ? "undefined" : o(e);
                    return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : xe.isFunction(e) ? this.each(function(n) {
                        xe(this).toggleClass(e.call(this, n, ee(this), t), t)
                    }) : this.each(function() {
                        var t, r, i, o;
                        if ("string" === n)
                            for (r = 0, i = xe(this), o = e.match(Me) || []; t = o[r++];) i.hasClass(t) ? i.removeClass(t) : i.addClass(t);
                        else void 0 !== e && "boolean" !== n || (t = ee(this), t && Re.set(this, "__className__", t), this.setAttribute && this.setAttribute("class", t || !1 === e ? "" : Re.get(this, "__className__") || ""))
                    })
                },
                hasClass: function(e) {
                    var t, n, r = 0;
                    for (t = " " + e + " "; n = this[r++];)
                        if (1 === n.nodeType && (" " + Z(ee(n)) + " ").indexOf(t) > -1) return !0;
                    return !1
                }
            });
            var jt = /\r/g;
            xe.fn.extend({
                val: function(e) {
                    var t, n, r, i = this[0];
                    return arguments.length ? (r = xe.isFunction(e), this.each(function(n) {
                        var i;
                        1 === this.nodeType && (i = r ? e.call(this, n, xe(this).val()) : e, null == i ? i = "" : "number" == typeof i ? i += "" : Array.isArray(i) && (i = xe.map(i, function(e) {
                            return null == e ? "" : e + ""
                        })), (t = xe.valHooks[this.type] || xe.valHooks[this.nodeName.toLowerCase()]) && "set" in t && void 0 !== t.set(this, i, "value") || (this.value = i))
                    })) : i ? (t = xe.valHooks[i.type] || xe.valHooks[i.nodeName.toLowerCase()], t && "get" in t && void 0 !== (n = t.get(i, "value")) ? n : (n = i.value, "string" == typeof n ? n.replace(jt, "") : null == n ? "" : n)) : void 0
                }
            }), xe.extend({
                valHooks: {
                    option: {
                        get: function(e) {
                            var t = xe.find.attr(e, "value");
                            return null != t ? t : Z(xe.text(e))
                        }
                    },
                    select: {
                        get: function(e) {
                            var t, n, r, i = e.options,
                                o = e.selectedIndex,
                                s = "select-one" === e.type,
                                a = s ? null : [],
                                u = s ? o + 1 : i.length;
                            for (r = o < 0 ? u : s ? o : 0; r < u; r++)
                                if (n = i[r], (n.selected || r === o) && !n.disabled && (!n.parentNode.disabled || !c(n.parentNode, "optgroup"))) {
                                    if (t = xe(n).val(), s) return t;
                                    a.push(t)
                                }
                            return a
                        },
                        set: function(e, t) {
                            for (var n, r, i = e.options, o = xe.makeArray(t), s = i.length; s--;) r = i[s], (r.selected = xe.inArray(xe.valHooks.option.get(r), o) > -1) && (n = !0);
                            return n || (e.selectedIndex = -1), o
                        }
                    }
                }
            }), xe.each(["radio", "checkbox"], function() {
                xe.valHooks[this] = {
                    set: function(e, t) {
                        if (Array.isArray(t)) return e.checked = xe.inArray(xe(e).val(), t) > -1
                    }
                }, be.checkOn || (xe.valHooks[this].get = function(e) {
                    return null === e.getAttribute("value") ? "on" : e.value
                })
            });
            var Nt = /^(?:focusinfocus|focusoutblur)$/;
            xe.extend(xe.event, {
                trigger: function(e, t, n, r) {
                    var i, a, u, l, c, f, p, d = [n || ue],
                        h = ge.call(e, "type") ? e.type : e,
                        m = ge.call(e, "namespace") ? e.namespace.split(".") : [];
                    if (a = u = n = n || ue, 3 !== n.nodeType && 8 !== n.nodeType && !Nt.test(h + xe.event.triggered) && (h.indexOf(".") > -1 && (m = h.split("."), h = m.shift(), m.sort()), c = h.indexOf(":") < 0 && "on" + h, e = e[xe.expando] ? e : new xe.Event(h, "object" == (void 0 === e ? "undefined" : o(e)) && e), e.isTrigger = r ? 2 : 3, e.namespace = m.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + m.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = n), t = null == t ? [e] : xe.makeArray(t, [e]), p = xe.event.special[h] || {}, r || !p.trigger || !1 !== p.trigger.apply(n, t))) {
                        if (!r && !p.noBubble && !xe.isWindow(n)) {
                            for (l = p.delegateType || h, Nt.test(l + h) || (a = a.parentNode); a; a = a.parentNode) d.push(a), u = a;
                            u === (n.ownerDocument || ue) && d.push(u.defaultView || u.parentWindow || s)
                        }
                        for (i = 0;
                            (a = d[i++]) && !e.isPropagationStopped();) e.type = i > 1 ? l : p.bindType || h, f = (Re.get(a, "events") || {})[e.type] && Re.get(a, "handle"), f && f.apply(a, t), (f = c && a[c]) && f.apply && Be(a) && (e.result = f.apply(a, t), !1 === e.result && e.preventDefault());
                        return e.type = h, r || e.isDefaultPrevented() || p._default && !1 !== p._default.apply(d.pop(), t) || !Be(n) || c && xe.isFunction(n[h]) && !xe.isWindow(n) && (u = n[c], u && (n[c] = null), xe.event.triggered = h, n[h](), xe.event.triggered = void 0, u && (n[c] = u)), e.result
                    }
                },
                simulate: function(e, t, n) {
                    var r = xe.extend(new xe.Event, n, {
                        type: e,
                        isSimulated: !0
                    });
                    xe.event.trigger(r, null, t)
                }
            }), xe.fn.extend({
                trigger: function(e, t) {
                    return this.each(function() {
                        xe.event.trigger(e, t, this)
                    })
                },
                triggerHandler: function(e, t) {
                    var n = this[0];
                    if (n) return xe.event.trigger(e, t, n, !0)
                }
            }), xe.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(e, t) {
                xe.fn[t] = function(e, n) {
                    return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
                }
            }), xe.fn.extend({
                hover: function(e, t) {
                    return this.mouseenter(e).mouseleave(t || e)
                }
            }), be.focusin = "onfocusin" in s, be.focusin || xe.each({
                focus: "focusin",
                blur: "focusout"
            }, function(e, t) {
                var n = function(e) {
                    xe.event.simulate(t, e.target, xe.event.fix(e))
                };
                xe.event.special[t] = {
                    setup: function() {
                        var r = this.ownerDocument || this,
                            i = Re.access(r, t);
                        i || r.addEventListener(e, n, !0), Re.access(r, t, (i || 0) + 1)
                    },
                    teardown: function() {
                        var r = this.ownerDocument || this,
                            i = Re.access(r, t) - 1;
                        i ? Re.access(r, t, i) : (r.removeEventListener(e, n, !0), Re.remove(r, t))
                    }
                }
            });
            var At = s.location,
                Ot = xe.now(),
                Lt = /\?/;
            xe.parseXML = function(e) {
                var t;
                if (!e || "string" != typeof e) return null;
                try {
                    t = (new s.DOMParser).parseFromString(e, "text/xml")
                } catch (e) {
                    t = void 0
                }
                return t && !t.getElementsByTagName("parsererror").length || xe.error("Invalid XML: " + e), t
            };
            var Pt = /\[\]$/,
                qt = /\r?\n/g,
                Ht = /^(?:submit|button|image|reset|file)$/i,
                Mt = /^(?:input|select|textarea|keygen)/i;
            xe.param = function(e, t) {
                var n, r = [],
                    i = function(e, t) {
                        var n = xe.isFunction(t) ? t() : t;
                        r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n)
                    };
                if (Array.isArray(e) || e.jquery && !xe.isPlainObject(e)) xe.each(e, function() {
                    i(this.name, this.value)
                });
                else
                    for (n in e) te(n, e[n], t, i);
                return r.join("&")
            }, xe.fn.extend({
                serialize: function() {
                    return xe.param(this.serializeArray())
                },
                serializeArray: function() {
                    return this.map(function() {
                        var e = xe.prop(this, "elements");
                        return e ? xe.makeArray(e) : this
                    }).filter(function() {
                        var e = this.type;
                        return this.name && !xe(this).is(":disabled") && Mt.test(this.nodeName) && !Ht.test(e) && (this.checked || !Ke.test(e))
                    }).map(function(e, t) {
                        var n = xe(this).val();
                        return null == n ? null : Array.isArray(n) ? xe.map(n, function(e) {
                            return {
                                name: t.name,
                                value: e.replace(qt, "\r\n")
                            }
                        }) : {
                            name: t.name,
                            value: n.replace(qt, "\r\n")
                        }
                    }).get()
                }
            });
            var Ft = /%20/g,
                It = /#.*$/,
                $t = /([?&])_=[^&]*/,
                Bt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
                Rt = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
                Wt = /^(?:GET|HEAD)$/,
                _t = /^\/\//,
                Ut = {},
                zt = {},
                Xt = "*/".concat("*"),
                Yt = ue.createElement("a");
            Yt.href = At.href, xe.extend({
                active: 0,
                lastModified: {},
                etag: {},
                ajaxSettings: {
                    url: At.href,
                    type: "GET",
                    isLocal: Rt.test(At.protocol),
                    global: !0,
                    processData: !0,
                    async: !0,
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    accepts: {
                        "*": Xt,
                        text: "text/plain",
                        html: "text/html",
                        xml: "application/xml, text/xml",
                        json: "application/json, text/javascript"
                    },
                    contents: {
                        xml: /\bxml\b/,
                        html: /\bhtml/,
                        json: /\bjson\b/
                    },
                    responseFields: {
                        xml: "responseXML",
                        text: "responseText",
                        json: "responseJSON"
                    },
                    converters: {
                        "* text": String,
                        "text html": !0,
                        "text json": JSON.parse,
                        "text xml": xe.parseXML
                    },
                    flatOptions: {
                        url: !0,
                        context: !0
                    }
                },
                ajaxSetup: function(e, t) {
                    return t ? ie(ie(e, xe.ajaxSettings), t) : ie(xe.ajaxSettings, e)
                },
                ajaxPrefilter: ne(Ut),
                ajaxTransport: ne(zt),
                ajax: function(e, t) {
                    function n(e, t, n, o) {
                        var u, c, d, h, x, T = t;
                        f || (f = !0, l && s.clearTimeout(l), r = void 0, a = o || "", k.readyState = e > 0 ? 4 : 0, u = e >= 200 && e < 300 || 304 === e, n && (h = oe(m, k, n)), h = se(m, h, k, u), u ? (m.ifModified && (x = k.getResponseHeader("Last-Modified"), x && (xe.lastModified[i] = x), (x = k.getResponseHeader("etag")) && (xe.etag[i] = x)), 204 === e || "HEAD" === m.type ? T = "nocontent" : 304 === e ? T = "notmodified" : (T = h.state, c = h.data, d = h.error, u = !d)) : (d = T, !e && T || (T = "error", e < 0 && (e = 0))), k.status = e, k.statusText = (t || T) + "", u ? y.resolveWith(g, [c, T, k]) : y.rejectWith(g, [k, T, d]), k.statusCode(w), w = void 0, p && v.trigger(u ? "ajaxSuccess" : "ajaxError", [k, m, u ? c : d]), b.fireWith(g, [k, T]), p && (v.trigger("ajaxComplete", [k, m]), --xe.active || xe.event.trigger("ajaxStop")))
                    }
                    "object" == (void 0 === e ? "undefined" : o(e)) && (t = e, e = void 0), t = t || {};
                    var r, i, a, u, l, c, f, p, d, h, m = xe.ajaxSetup({}, t),
                        g = m.context || m,
                        v = m.context && (g.nodeType || g.jquery) ? xe(g) : xe.event,
                        y = xe.Deferred(),
                        b = xe.Callbacks("once memory"),
                        w = m.statusCode || {},
                        x = {},
                        T = {},
                        C = "canceled",
                        k = {
                            readyState: 0,
                            getResponseHeader: function(e) {
                                var t;
                                if (f) {
                                    if (!u)
                                        for (u = {}; t = Bt.exec(a);) u[t[1].toLowerCase()] = t[2];
                                    t = u[e.toLowerCase()]
                                }
                                return null == t ? null : t
                            },
                            getAllResponseHeaders: function() {
                                return f ? a : null
                            },
                            setRequestHeader: function(e, t) {
                                return null == f && (e = T[e.toLowerCase()] = T[e.toLowerCase()] || e, x[e] = t), this
                            },
                            overrideMimeType: function(e) {
                                return null == f && (m.mimeType = e), this
                            },
                            statusCode: function(e) {
                                var t;
                                if (e)
                                    if (f) k.always(e[k.status]);
                                    else
                                        for (t in e) w[t] = [w[t], e[t]];
                                return this
                            },
                            abort: function(e) {
                                var t = e || C;
                                return r && r.abort(t), n(0, t), this
                            }
                        };
                    if (y.promise(k), m.url = ((e || m.url || At.href) + "").replace(_t, At.protocol + "//"), m.type = t.method || t.type || m.method || m.type, m.dataTypes = (m.dataType || "*").toLowerCase().match(Me) || [""], null == m.crossDomain) {
                        c = ue.createElement("a");
                        try {
                            c.href = m.url, c.href = c.href, m.crossDomain = Yt.protocol + "//" + Yt.host != c.protocol + "//" + c.host
                        } catch (e) {
                            m.crossDomain = !0
                        }
                    }
                    if (m.data && m.processData && "string" != typeof m.data && (m.data = xe.param(m.data, m.traditional)), re(Ut, m, t, k), f) return k;
                    p = xe.event && m.global, p && 0 == xe.active++ && xe.event.trigger("ajaxStart"), m.type = m.type.toUpperCase(), m.hasContent = !Wt.test(m.type), i = m.url.replace(It, ""), m.hasContent ? m.data && m.processData && 0 === (m.contentType || "").indexOf("application/x-www-form-urlencoded") && (m.data = m.data.replace(Ft, "+")) : (h = m.url.slice(i.length), m.data && (i += (Lt.test(i) ? "&" : "?") + m.data, delete m.data), !1 === m.cache && (i = i.replace($t, "$1"), h = (Lt.test(i) ? "&" : "?") + "_=" + Ot++ + h), m.url = i + h), m.ifModified && (xe.lastModified[i] && k.setRequestHeader("If-Modified-Since", xe.lastModified[i]), xe.etag[i] && k.setRequestHeader("If-None-Match", xe.etag[i])), (m.data && m.hasContent && !1 !== m.contentType || t.contentType) && k.setRequestHeader("Content-Type", m.contentType), k.setRequestHeader("Accept", m.dataTypes[0] && m.accepts[m.dataTypes[0]] ? m.accepts[m.dataTypes[0]] + ("*" !== m.dataTypes[0] ? ", " + Xt + "; q=0.01" : "") : m.accepts["*"]);
                    for (d in m.headers) k.setRequestHeader(d, m.headers[d]);
                    if (m.beforeSend && (!1 === m.beforeSend.call(g, k, m) || f)) return k.abort();
                    if (C = "abort", b.add(m.complete), k.done(m.success), k.fail(m.error), r = re(zt, m, t, k)) {
                        if (k.readyState = 1, p && v.trigger("ajaxSend", [k, m]), f) return k;
                        m.async && m.timeout > 0 && (l = s.setTimeout(function() {
                            k.abort("timeout")
                        }, m.timeout));
                        try {
                            f = !1, r.send(x, n)
                        } catch (e) {
                            if (f) throw e;
                            n(-1, e)
                        }
                    } else n(-1, "No Transport");
                    return k
                },
                getJSON: function(e, t, n) {
                    return xe.get(e, t, n, "json")
                },
                getScript: function(e, t) {
                    return xe.get(e, void 0, t, "script")
                }
            }), xe.each(["get", "post"], function(e, t) {
                xe[t] = function(e, n, r, i) {
                    return xe.isFunction(n) && (i = i || r, r = n, n = void 0), xe.ajax(xe.extend({
                        url: e,
                        type: t,
                        dataType: i,
                        data: n,
                        success: r
                    }, xe.isPlainObject(e) && e))
                }
            }), xe._evalUrl = function(e) {
                return xe.ajax({
                    url: e,
                    type: "GET",
                    dataType: "script",
                    cache: !0,
                    async: !1,
                    global: !1,
                    throws: !0
                })
            }, xe.fn.extend({
                wrapAll: function(e) {
                    var t;
                    return this[0] && (xe.isFunction(e) && (e = e.call(this[0])), t = xe(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                        for (var e = this; e.firstElementChild;) e = e.firstElementChild;
                        return e
                    }).append(this)), this
                },
                wrapInner: function(e) {
                    return xe.isFunction(e) ? this.each(function(t) {
                        xe(this).wrapInner(e.call(this, t))
                    }) : this.each(function() {
                        var t = xe(this),
                            n = t.contents();
                        n.length ? n.wrapAll(e) : t.append(e)
                    })
                },
                wrap: function(e) {
                    var t = xe.isFunction(e);
                    return this.each(function(n) {
                        xe(this).wrapAll(t ? e.call(this, n) : e)
                    })
                },
                unwrap: function(e) {
                    return this.parent(e).not("body").each(function() {
                        xe(this).replaceWith(this.childNodes)
                    }), this
                }
            }), xe.expr.pseudos.hidden = function(e) {
                return !xe.expr.pseudos.visible(e)
            }, xe.expr.pseudos.visible = function(e) {
                return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
            }, xe.ajaxSettings.xhr = function() {
                try {
                    return new s.XMLHttpRequest
                } catch (e) {}
            };
            var Vt = {
                    0: 200,
                    1223: 204
                },
                Gt = xe.ajaxSettings.xhr();
            be.cors = !!Gt && "withCredentials" in Gt, be.ajax = Gt = !!Gt, xe.ajaxTransport(function(e) {
                var t, n;
                if (be.cors || Gt && !e.crossDomain) return {
                    send: function(r, i) {
                        var o, a = e.xhr();
                        if (a.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)
                            for (o in e.xhrFields) a[o] = e.xhrFields[o];
                        e.mimeType && a.overrideMimeType && a.overrideMimeType(e.mimeType), e.crossDomain || r["X-Requested-With"] || (r["X-Requested-With"] = "XMLHttpRequest");
                        for (o in r) a.setRequestHeader(o, r[o]);
                        t = function(e) {
                            return function() {
                                t && (t = n = a.onload = a.onerror = a.onabort = a.onreadystatechange = null, "abort" === e ? a.abort() : "error" === e ? "number" != typeof a.status ? i(0, "error") : i(a.status, a.statusText) : i(Vt[a.status] || a.status, a.statusText, "text" !== (a.responseType || "text") || "string" != typeof a.responseText ? {
                                    binary: a.response
                                } : {
                                    text: a.responseText
                                }, a.getAllResponseHeaders()))
                            }
                        }, a.onload = t(), n = a.onerror = t("error"), void 0 !== a.onabort ? a.onabort = n : a.onreadystatechange = function() {
                            4 === a.readyState && s.setTimeout(function() {
                                t && n()
                            })
                        }, t = t("abort");
                        try {
                            a.send(e.hasContent && e.data || null)
                        } catch (e) {
                            if (t) throw e
                        }
                    },
                    abort: function() {
                        t && t()
                    }
                }
            }), xe.ajaxPrefilter(function(e) {
                e.crossDomain && (e.contents.script = !1)
            }), xe.ajaxSetup({
                accepts: {
                    script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
                },
                contents: {
                    script: /\b(?:java|ecma)script\b/
                },
                converters: {
                    "text script": function(e) {
                        return xe.globalEval(e), e
                    }
                }
            }), xe.ajaxPrefilter("script", function(e) {
                void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET")
            }), xe.ajaxTransport("script", function(e) {
                if (e.crossDomain) {
                    var t, n;
                    return {
                        send: function(r, i) {
                            t = xe("<script>").prop({
                                charset: e.scriptCharset,
                                src: e.url
                            }).on("load error", n = function(e) {
                                t.remove(), n = null, e && i("error" === e.type ? 404 : 200, e.type)
                            }), ue.head.appendChild(t[0])
                        },
                        abort: function() {
                            n && n()
                        }
                    }
                }
            });
            var Qt = [],
                Kt = /(=)\?(?=&|$)|\?\?/;
            xe.ajaxSetup({
                jsonp: "callback",
                jsonpCallback: function() {
                    var e = Qt.pop() || xe.expando + "_" + Ot++;
                    return this[e] = !0, e
                }
            }), xe.ajaxPrefilter("json jsonp", function(e, t, n) {
                var r, i, o, a = !1 !== e.jsonp && (Kt.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && Kt.test(e.data) && "data");
                if (a || "jsonp" === e.dataTypes[0]) return r = e.jsonpCallback = xe.isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, a ? e[a] = e[a].replace(Kt, "$1" + r) : !1 !== e.jsonp && (e.url += (Lt.test(e.url) ? "&" : "?") + e.jsonp + "=" + r), e.converters["script json"] = function() {
                    return o || xe.error(r + " was not called"), o[0]
                }, e.dataTypes[0] = "json", i = s[r], s[r] = function() {
                    o = arguments
                }, n.always(function() {
                    void 0 === i ? xe(s).removeProp(r) : s[r] = i, e[r] && (e.jsonpCallback = t.jsonpCallback, Qt.push(r)), o && xe.isFunction(i) && i(o[0]), o = i = void 0
                }), "script"
            }), be.createHTMLDocument = function() {
                var e = ue.implementation.createHTMLDocument("").body;
                return e.innerHTML = "<form></form><form></form>", 2 === e.childNodes.length
            }(), xe.parseHTML = function(e, t, n) {
                if ("string" != typeof e) return [];
                "boolean" == typeof t && (n = t, t = !1);
                var r, i, o;
                return t || (be.createHTMLDocument ? (t = ue.implementation.createHTMLDocument(""), r = t.createElement("base"), r.href = ue.location.href, t.head.appendChild(r)) : t = ue), i = Ae.exec(e), o = !n && [], i ? [t.createElement(i[1])] : (i = S([e], t, o), o && o.length && xe(o).remove(), xe.merge([], i.childNodes))
            }, xe.fn.load = function(e, t, n) {
                var r, i, s, a = this,
                    u = e.indexOf(" ");
                return u > -1 && (r = Z(e.slice(u)), e = e.slice(0, u)), xe.isFunction(t) ? (n = t, t = void 0) : t && "object" == (void 0 === t ? "undefined" : o(t)) && (i = "POST"), a.length > 0 && xe.ajax({
                    url: e,
                    type: i || "GET",
                    dataType: "html",
                    data: t
                }).done(function(e) {
                    s = arguments, a.html(r ? xe("<div>").append(xe.parseHTML(e)).find(r) : e)
                }).always(n && function(e, t) {
                    a.each(function() {
                        n.apply(this, s || [e.responseText, t, e])
                    })
                }), this
            }, xe.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
                xe.fn[t] = function(e) {
                    return this.on(t, e)
                }
            }), xe.expr.pseudos.animated = function(e) {
                return xe.grep(xe.timers, function(t) {
                    return e === t.elem
                }).length
            }, xe.offset = {
                setOffset: function(e, t, n) {
                    var r, i, o, s, a, u, l, c = xe.css(e, "position"),
                        f = xe(e),
                        p = {};
                    "static" === c && (e.style.position = "relative"), a = f.offset(), o = xe.css(e, "top"), u = xe.css(e, "left"), l = ("absolute" === c || "fixed" === c) && (o + u).indexOf("auto") > -1, l ? (r = f.position(), s = r.top, i = r.left) : (s = parseFloat(o) || 0, i = parseFloat(u) || 0), xe.isFunction(t) && (t = t.call(e, n, xe.extend({}, a))), null != t.top && (p.top = t.top - a.top + s), null != t.left && (p.left = t.left - a.left + i), "using" in t ? t.using.call(e, p) : f.css(p)
                }
            }, xe.fn.extend({
                offset: function(e) {
                    if (arguments.length) return void 0 === e ? this : this.each(function(t) {
                        xe.offset.setOffset(this, e, t)
                    });
                    var t, n, r, i, o = this[0];
                    return o ? o.getClientRects().length ? (r = o.getBoundingClientRect(), t = o.ownerDocument, n = t.documentElement, i = t.defaultView, {
                        top: r.top + i.pageYOffset - n.clientTop,
                        left: r.left + i.pageXOffset - n.clientLeft
                    }) : {
                        top: 0,
                        left: 0
                    } : void 0
                },
                position: function() {
                    if (this[0]) {
                        var e, t, n = this[0],
                            r = {
                                top: 0,
                                left: 0
                            };
                        return "fixed" === xe.css(n, "position") ? t = n.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), c(e[0], "html") || (r = e.offset()), r = {
                            top: r.top + xe.css(e[0], "borderTopWidth", !0),
                            left: r.left + xe.css(e[0], "borderLeftWidth", !0)
                        }), {
                            top: t.top - r.top - xe.css(n, "marginTop", !0),
                            left: t.left - r.left - xe.css(n, "marginLeft", !0)
                        }
                    }
                },
                offsetParent: function() {
                    return this.map(function() {
                        for (var e = this.offsetParent; e && "static" === xe.css(e, "position");) e = e.offsetParent;
                        return e || nt
                    })
                }
            }), xe.each({
                scrollLeft: "pageXOffset",
                scrollTop: "pageYOffset"
            }, function(e, t) {
                var n = "pageYOffset" === t;
                xe.fn[e] = function(r) {
                    return $e(this, function(e, r, i) {
                        var o;
                        return xe.isWindow(e) ? o = e : 9 === e.nodeType && (o = e.defaultView), void 0 === i ? o ? o[t] : e[r] : void(o ? o.scrollTo(n ? o.pageXOffset : i, n ? i : o.pageYOffset) : e[r] = i)
                    }, e, r, arguments.length)
                }
            }), xe.each(["top", "left"], function(e, t) {
                xe.cssHooks[t] = $(be.pixelPosition, function(e, n) {
                    if (n) return n = I(e, t), pt.test(n) ? xe(e).position()[t] + "px" : n
                })
            }), xe.each({
                Height: "height",
                Width: "width"
            }, function(e, t) {
                xe.each({
                    padding: "inner" + e,
                    content: t,
                    "": "outer" + e
                }, function(n, r) {
                    xe.fn[r] = function(i, o) {
                        var s = arguments.length && (n || "boolean" != typeof i),
                            a = n || (!0 === i || !0 === o ? "margin" : "border");
                        return $e(this, function(t, n, i) {
                            var o;
                            return xe.isWindow(t) ? 0 === r.indexOf("outer") ? t["inner" + e] : t.document.documentElement["client" + e] : 9 === t.nodeType ? (o = t.documentElement, Math.max(t.body["scroll" + e], o["scroll" + e], t.body["offset" + e], o["offset" + e], o["client" + e])) : void 0 === i ? xe.css(t, n, a) : xe.style(t, n, i, a)
                        }, t, s ? i : void 0, s)
                    }
                })
            }), xe.fn.extend({
                bind: function(e, t, n) {
                    return this.on(e, null, t, n)
                },
                unbind: function(e, t) {
                    return this.off(e, null, t)
                },
                delegate: function(e, t, n, r) {
                    return this.on(t, e, n, r)
                },
                undelegate: function(e, t, n) {
                    return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
                }
            }), xe.holdReady = function(e) {
                e ? xe.readyWait++ : xe.ready(!0)
            }, xe.isArray = Array.isArray, xe.parseJSON = JSON.parse, xe.nodeName = c, n(6) && (r = [], void 0 !== (i = function() {
                return xe
            }.apply(t, r)) && (e.exports = i));
            var Jt = s.jQuery,
                Zt = s.$;
            return xe.noConflict = function(e) {
                return s.$ === xe && (s.$ = Zt), e && s.jQuery === xe && (s.jQuery = Jt), xe
            }, a || (s.jQuery = s.$ = xe), xe
        })
    }).call(t, n(1)(e))
}, function(e, t) {
    (function(t) {
        e.exports = t
    }).call(t, {})
}, function(e, t, n) {
    (function(r) {
        var i, o, s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };
        /**!
         * @fileOverview Kickass library to create and place poppers near their reference elements.
         * @version 1.12.5
         * @license
         * Copyright (c) 2016 Federico Zivolo and contributors
         *
         * Permission is hereby granted, free of charge, to any person obtaining a copy
         * of this software and associated documentation files (the "Software"), to deal
         * in the Software without restriction, including without limitation the rights
         * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
         * copies of the Software, and to permit persons to whom the Software is
         * furnished to do so, subject to the following conditions:
         *
         * The above copyright notice and this permission notice shall be included in all
         * copies or substantial portions of the Software.
         *
         * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
         * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
         * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
         * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
         * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
         * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
         * SOFTWARE.
         */
        ! function(r, a) {
            "object" === s(t) && void 0 !== e ? e.exports = a() : (i = a, void 0 !== (o = "function" == typeof i ? i.call(t, n, t, e) : i) && (e.exports = o))
        }(0, function() {
            "use strict";

            function e(e) {
                var t = !1,
                    n = 0,
                    r = document.createElement("span");
                return new MutationObserver(function() {
                        e(), t = !1
                    }).observe(r, {
                        attributes: !0
                    }),
                    function() {
                        t || (t = !0, r.setAttribute("x-index", n), n += 1)
                    }
            }

            function t(e) {
                var t = !1;
                return function() {
                    t || (t = !0, setTimeout(function() {
                        t = !1, e()
                    }, ue))
                }
            }

            function n(e) {
                var t = {};
                return e && "[object Function]" === t.toString.call(e)
            }

            function i(e, t) {
                if (1 !== e.nodeType) return [];
                var n = window.getComputedStyle(e, null);
                return t ? n[t] : n
            }

            function o(e) {
                return "HTML" === e.nodeName ? e : e.parentNode || e.host
            }

            function s(e) {
                if (!e || -1 !== ["HTML", "BODY", "#document"].indexOf(e.nodeName)) return window.document.body;
                var t = i(e),
                    n = t.overflow,
                    r = t.overflowX;
                return /(auto|scroll)/.test(n + t.overflowY + r) ? e : s(o(e))
            }

            function a(e) {
                var t = e && e.offsetParent,
                    n = t && t.nodeName;
                return n && "BODY" !== n && "HTML" !== n ? -1 !== ["TD", "TABLE"].indexOf(t.nodeName) && "static" === i(t, "position") ? a(t) : t : window.document.documentElement
            }

            function u(e) {
                var t = e.nodeName;
                return "BODY" !== t && ("HTML" === t || a(e.firstElementChild) === e)
            }

            function l(e) {
                return null !== e.parentNode ? l(e.parentNode) : e
            }

            function c(e, t) {
                if (!(e && e.nodeType && t && t.nodeType)) return window.document.documentElement;
                var n = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING,
                    r = n ? e : t,
                    i = n ? t : e,
                    o = document.createRange();
                o.setStart(r, 0), o.setEnd(i, 0);
                var s = o.commonAncestorContainer;
                if (e !== s && t !== s || r.contains(i)) return u(s) ? s : a(s);
                var f = l(e);
                return f.host ? c(f.host, t) : c(e, l(t).host)
            }

            function f(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "top",
                    n = "top" === t ? "scrollTop" : "scrollLeft",
                    r = e.nodeName;
                if ("BODY" === r || "HTML" === r) {
                    var i = window.document.documentElement;
                    return (window.document.scrollingElement || i)[n]
                }
                return e[n]
            }

            function p(e, t) {
                var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                    r = f(t, "top"),
                    i = f(t, "left"),
                    o = n ? -1 : 1;
                return e.top += r * o, e.bottom += r * o, e.left += i * o, e.right += i * o, e
            }

            function d(e, t) {
                var n = "x" === t ? "Left" : "Top",
                    r = "Left" === n ? "Right" : "Bottom";
                return +e["border" + n + "Width"].split("px")[0] + +e["border" + r + "Width"].split("px")[0]
            }

            function h(e, t, n, r) {
                return Math.max(t["offset" + e], t["scroll" + e], n["client" + e], n["offset" + e], n["scroll" + e], de() ? n["offset" + e] + r["margin" + ("Height" === e ? "Top" : "Left")] + r["margin" + ("Height" === e ? "Bottom" : "Right")] : 0)
            }

            function m() {
                var e = window.document.body,
                    t = window.document.documentElement,
                    n = de() && window.getComputedStyle(t);
                return {
                    height: h("Height", e, t, n),
                    width: h("Width", e, t, n)
                }
            }

            function g(e) {
                return ve({}, e, {
                    right: e.left + e.width,
                    bottom: e.top + e.height
                })
            }

            function v(e) {
                var t = {};
                if (de()) try {
                    t = e.getBoundingClientRect();
                    var n = f(e, "top"),
                        r = f(e, "left");
                    t.top += n, t.left += r, t.bottom += n, t.right += r
                } catch (e) {} else t = e.getBoundingClientRect();
                var o = {
                        left: t.left,
                        top: t.top,
                        width: t.right - t.left,
                        height: t.bottom - t.top
                    },
                    s = "HTML" === e.nodeName ? m() : {},
                    a = s.width || e.clientWidth || o.right - o.left,
                    u = s.height || e.clientHeight || o.bottom - o.top,
                    l = e.offsetWidth - a,
                    c = e.offsetHeight - u;
                if (l || c) {
                    var p = i(e);
                    l -= d(p, "x"), c -= d(p, "y"), o.width -= l, o.height -= c
                }
                return g(o)
            }

            function y(e, t) {
                var n = de(),
                    r = "HTML" === t.nodeName,
                    o = v(e),
                    a = v(t),
                    u = s(e),
                    l = i(t),
                    c = +l.borderTopWidth.split("px")[0],
                    f = +l.borderLeftWidth.split("px")[0],
                    d = g({
                        top: o.top - a.top - c,
                        left: o.left - a.left - f,
                        width: o.width,
                        height: o.height
                    });
                if (d.marginTop = 0, d.marginLeft = 0, !n && r) {
                    var h = +l.marginTop.split("px")[0],
                        m = +l.marginLeft.split("px")[0];
                    d.top -= c - h, d.bottom -= c - h, d.left -= f - m, d.right -= f - m, d.marginTop = h, d.marginLeft = m
                }
                return (n ? t.contains(u) : t === u && "BODY" !== u.nodeName) && (d = p(d, t)), d
            }

            function b(e) {
                var t = window.document.documentElement,
                    n = y(e, t),
                    r = Math.max(t.clientWidth, window.innerWidth || 0),
                    i = Math.max(t.clientHeight, window.innerHeight || 0),
                    o = f(t),
                    s = f(t, "left");
                return g({
                    top: o - n.top + n.marginTop,
                    left: s - n.left + n.marginLeft,
                    width: r,
                    height: i
                })
            }

            function w(e) {
                var t = e.nodeName;
                return "BODY" !== t && "HTML" !== t && ("fixed" === i(e, "position") || w(o(e)))
            }

            function x(e, t, n, r) {
                var i = {
                        top: 0,
                        left: 0
                    },
                    a = c(e, t);
                if ("viewport" === r) i = b(a);
                else {
                    var u = void 0;
                    "scrollParent" === r ? (u = s(o(e)), "BODY" === u.nodeName && (u = window.document.documentElement)) : u = "window" === r ? window.document.documentElement : r;
                    var l = y(u, a);
                    if ("HTML" !== u.nodeName || w(a)) i = l;
                    else {
                        var f = m(),
                            p = f.height,
                            d = f.width;
                        i.top += l.top - l.marginTop, i.bottom = p + l.top, i.left += l.left - l.marginLeft, i.right = d + l.left
                    }
                }
                return i.left += n, i.top += n, i.right -= n, i.bottom -= n, i
            }

            function T(e) {
                return e.width * e.height
            }

            function C(e, t, n, r, i) {
                var o = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0;
                if (-1 === e.indexOf("auto")) return e;
                var s = x(n, r, o, i),
                    a = {
                        top: {
                            width: s.width,
                            height: t.top - s.top
                        },
                        right: {
                            width: s.right - t.right,
                            height: s.height
                        },
                        bottom: {
                            width: s.width,
                            height: s.bottom - t.bottom
                        },
                        left: {
                            width: t.left - s.left,
                            height: s.height
                        }
                    },
                    u = Object.keys(a).map(function(e) {
                        return ve({
                            key: e
                        }, a[e], {
                            area: T(a[e])
                        })
                    }).sort(function(e, t) {
                        return t.area - e.area
                    }),
                    l = u.filter(function(e) {
                        var t = e.width,
                            r = e.height;
                        return t >= n.clientWidth && r >= n.clientHeight
                    }),
                    c = l.length > 0 ? l[0].key : u[0].key,
                    f = e.split("-")[1];
                return c + (f ? "-" + f : "")
            }

            function k(e, t, n) {
                return y(n, c(t, n))
            }

            function E(e) {
                var t = window.getComputedStyle(e),
                    n = parseFloat(t.marginTop) + parseFloat(t.marginBottom),
                    r = parseFloat(t.marginLeft) + parseFloat(t.marginRight);
                return {
                    width: e.offsetWidth + r,
                    height: e.offsetHeight + n
                }
            }

            function S(e) {
                var t = {
                    left: "right",
                    right: "left",
                    bottom: "top",
                    top: "bottom"
                };
                return e.replace(/left|right|bottom|top/g, function(e) {
                    return t[e]
                })
            }

            function D(e, t, n) {
                n = n.split("-")[0];
                var r = E(e),
                    i = {
                        width: r.width,
                        height: r.height
                    },
                    o = -1 !== ["right", "left"].indexOf(n),
                    s = o ? "top" : "left",
                    a = o ? "left" : "top",
                    u = o ? "height" : "width",
                    l = o ? "width" : "height";
                return i[s] = t[s] + t[u] / 2 - r[u] / 2, i[a] = n === a ? t[a] - r[l] : t[S(a)], i
            }

            function j(e, t) {
                return Array.prototype.find ? e.find(t) : e.filter(t)[0]
            }

            function N(e, t, n) {
                if (Array.prototype.findIndex) return e.findIndex(function(e) {
                    return e[t] === n
                });
                var r = j(e, function(e) {
                    return e[t] === n
                });
                return e.indexOf(r)
            }

            function A(e, t, r) {
                return (void 0 === r ? e : e.slice(0, N(e, "name", r))).forEach(function(e) {
                    e.function && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
                    var r = e.function || e.fn;
                    e.enabled && n(r) && (t.offsets.popper = g(t.offsets.popper), t.offsets.reference = g(t.offsets.reference), t = r(t, e))
                }), t
            }

            function O() {
                if (!this.state.isDestroyed) {
                    var e = {
                        instance: this,
                        styles: {},
                        arrowStyles: {},
                        attributes: {},
                        flipped: !1,
                        offsets: {}
                    };
                    e.offsets.reference = k(this.state, this.popper, this.reference), e.placement = C(this.options.placement, e.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), e.originalPlacement = e.placement, e.offsets.popper = D(this.popper, e.offsets.reference, e.placement), e.offsets.popper.position = "absolute", e = A(this.modifiers, e), this.state.isCreated ? this.options.onUpdate(e) : (this.state.isCreated = !0, this.options.onCreate(e))
                }
            }

            function L(e, t) {
                return e.some(function(e) {
                    var n = e.name;
                    return e.enabled && n === t
                })
            }

            function P(e) {
                for (var t = [!1, "ms", "Webkit", "Moz", "O"], n = e.charAt(0).toUpperCase() + e.slice(1), r = 0; r < t.length - 1; r++) {
                    var i = t[r],
                        o = i ? "" + i + n : e;
                    if (void 0 !== window.document.body.style[o]) return o
                }
                return null
            }

            function q() {
                return this.state.isDestroyed = !0, L(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"), this.popper.style.left = "", this.popper.style.position = "", this.popper.style.top = "", this.popper.style[P("transform")] = ""), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this
            }

            function H(e, t, n, r) {
                var i = "BODY" === e.nodeName,
                    o = i ? window : e;
                o.addEventListener(t, n, {
                    passive: !0
                }), i || H(s(o.parentNode), t, n, r), r.push(o)
            }

            function M(e, t, n, r) {
                n.updateBound = r, window.addEventListener("resize", n.updateBound, {
                    passive: !0
                });
                var i = s(e);
                return H(i, "scroll", n.updateBound, n.scrollParents), n.scrollElement = i, n.eventsEnabled = !0, n
            }

            function F() {
                this.state.eventsEnabled || (this.state = M(this.reference, this.options, this.state, this.scheduleUpdate))
            }

            function I(e, t) {
                return window.removeEventListener("resize", t.updateBound), t.scrollParents.forEach(function(e) {
                    e.removeEventListener("scroll", t.updateBound)
                }), t.updateBound = null, t.scrollParents = [], t.scrollElement = null, t.eventsEnabled = !1, t
            }

            function $() {
                this.state.eventsEnabled && (window.cancelAnimationFrame(this.scheduleUpdate), this.state = I(this.reference, this.state))
            }

            function B(e) {
                return "" !== e && !isNaN(parseFloat(e)) && isFinite(e)
            }

            function R(e, t) {
                Object.keys(t).forEach(function(n) {
                    var r = ""; - 1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(n) && B(t[n]) && (r = "px"), e.style[n] = t[n] + r
                })
            }

            function W(e, t) {
                Object.keys(t).forEach(function(n) {
                    !1 !== t[n] ? e.setAttribute(n, t[n]) : e.removeAttribute(n)
                })
            }

            function _(e) {
                return R(e.instance.popper, e.styles), W(e.instance.popper, e.attributes), e.arrowElement && Object.keys(e.arrowStyles).length && R(e.arrowElement, e.arrowStyles), e
            }

            function U(e, t, n, r, i) {
                var o = k(i, t, e),
                    s = C(n.placement, o, t, e, n.modifiers.flip.boundariesElement, n.modifiers.flip.padding);
                return t.setAttribute("x-placement", s), R(t, {
                    position: "absolute"
                }), n
            }

            function z(e, t) {
                var n = t.x,
                    r = t.y,
                    i = e.offsets.popper,
                    o = j(e.instance.modifiers, function(e) {
                        return "applyStyle" === e.name
                    }).gpuAcceleration;
                void 0 !== o && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");
                var s = void 0 !== o ? o : t.gpuAcceleration,
                    u = a(e.instance.popper),
                    l = v(u),
                    c = {
                        position: i.position
                    },
                    f = {
                        left: Math.floor(i.left),
                        top: Math.floor(i.top),
                        bottom: Math.floor(i.bottom),
                        right: Math.floor(i.right)
                    },
                    p = "bottom" === n ? "top" : "bottom",
                    d = "right" === r ? "left" : "right",
                    h = P("transform"),
                    m = void 0,
                    g = void 0;
                if (g = "bottom" === p ? -l.height + f.bottom : f.top, m = "right" === d ? -l.width + f.right : f.left, s && h) c[h] = "translate3d(" + m + "px, " + g + "px, 0)", c[p] = 0, c[d] = 0, c.willChange = "transform";
                else {
                    var y = "bottom" === p ? -1 : 1,
                        b = "right" === d ? -1 : 1;
                    c[p] = g * y, c[d] = m * b, c.willChange = p + ", " + d
                }
                var w = {
                    "x-placement": e.placement
                };
                return e.attributes = ve({}, w, e.attributes), e.styles = ve({}, c, e.styles), e.arrowStyles = ve({}, e.offsets.arrow, e.arrowStyles), e
            }

            function X(e, t, n) {
                var r = j(e, function(e) {
                        return e.name === t
                    }),
                    i = !!r && e.some(function(e) {
                        return e.name === n && e.enabled && e.order < r.order
                    });
                if (!i) {
                    var o = "`" + t + "`",
                        s = "`" + n + "`";
                    console.warn(s + " modifier is required by " + o + " modifier in order to work, be sure to include it before " + o + "!")
                }
                return i
            }

            function Y(e, t) {
                if (!X(e.instance.modifiers, "arrow", "keepTogether")) return e;
                var n = t.element;
                if ("string" == typeof n) {
                    if (!(n = e.instance.popper.querySelector(n))) return e
                } else if (!e.instance.popper.contains(n)) return console.warn("WARNING: `arrow.element` must be child of its popper element!"), e;
                var r = e.placement.split("-")[0],
                    o = e.offsets,
                    s = o.popper,
                    a = o.reference,
                    u = -1 !== ["left", "right"].indexOf(r),
                    l = u ? "height" : "width",
                    c = u ? "Top" : "Left",
                    f = c.toLowerCase(),
                    p = u ? "left" : "top",
                    d = u ? "bottom" : "right",
                    h = E(n)[l];
                a[d] - h < s[f] && (e.offsets.popper[f] -= s[f] - (a[d] - h)), a[f] + h > s[d] && (e.offsets.popper[f] += a[f] + h - s[d]);
                var m = a[f] + a[l] / 2 - h / 2,
                    v = i(e.instance.popper, "margin" + c).replace("px", ""),
                    y = m - g(e.offsets.popper)[f] - v;
                return y = Math.max(Math.min(s[l] - h, y), 0), e.arrowElement = n, e.offsets.arrow = {}, e.offsets.arrow[f] = Math.round(y), e.offsets.arrow[p] = "", e
            }

            function V(e) {
                return "end" === e ? "start" : "start" === e ? "end" : e
            }

            function G(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                    n = be.indexOf(e),
                    r = be.slice(n + 1).concat(be.slice(0, n));
                return t ? r.reverse() : r
            }

            function Q(e, t) {
                if (L(e.instance.modifiers, "inner")) return e;
                if (e.flipped && e.placement === e.originalPlacement) return e;
                var n = x(e.instance.popper, e.instance.reference, t.padding, t.boundariesElement),
                    r = e.placement.split("-")[0],
                    i = S(r),
                    o = e.placement.split("-")[1] || "",
                    s = [];
                switch (t.behavior) {
                    case we.FLIP:
                        s = [r, i];
                        break;
                    case we.CLOCKWISE:
                        s = G(r);
                        break;
                    case we.COUNTERCLOCKWISE:
                        s = G(r, !0);
                        break;
                    default:
                        s = t.behavior
                }
                return s.forEach(function(a, u) {
                    if (r !== a || s.length === u + 1) return e;
                    r = e.placement.split("-")[0], i = S(r);
                    var l = e.offsets.popper,
                        c = e.offsets.reference,
                        f = Math.floor,
                        p = "left" === r && f(l.right) > f(c.left) || "right" === r && f(l.left) < f(c.right) || "top" === r && f(l.bottom) > f(c.top) || "bottom" === r && f(l.top) < f(c.bottom),
                        d = f(l.left) < f(n.left),
                        h = f(l.right) > f(n.right),
                        m = f(l.top) < f(n.top),
                        g = f(l.bottom) > f(n.bottom),
                        v = "left" === r && d || "right" === r && h || "top" === r && m || "bottom" === r && g,
                        y = -1 !== ["top", "bottom"].indexOf(r),
                        b = !!t.flipVariations && (y && "start" === o && d || y && "end" === o && h || !y && "start" === o && m || !y && "end" === o && g);
                    (p || v || b) && (e.flipped = !0, (p || v) && (r = s[u + 1]), b && (o = V(o)), e.placement = r + (o ? "-" + o : ""), e.offsets.popper = ve({}, e.offsets.popper, D(e.instance.popper, e.offsets.reference, e.placement)), e = A(e.instance.modifiers, e, "flip"))
                }), e
            }

            function K(e) {
                var t = e.offsets,
                    n = t.popper,
                    r = t.reference,
                    i = e.placement.split("-")[0],
                    o = Math.floor,
                    s = -1 !== ["top", "bottom"].indexOf(i),
                    a = s ? "right" : "bottom",
                    u = s ? "left" : "top",
                    l = s ? "width" : "height";
                return n[a] < o(r[u]) && (e.offsets.popper[u] = o(r[u]) - n[l]), n[u] > o(r[a]) && (e.offsets.popper[u] = o(r[a])), e
            }

            function J(e, t, n, r) {
                var i = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
                    o = +i[1],
                    s = i[2];
                if (!o) return e;
                if (0 === s.indexOf("%")) {
                    var a = void 0;
                    switch (s) {
                        case "%p":
                            a = n;
                            break;
                        case "%":
                        case "%r":
                        default:
                            a = r
                    }
                    return g(a)[t] / 100 * o
                }
                if ("vh" === s || "vw" === s) {
                    return ("vh" === s ? Math.max(document.documentElement.clientHeight, window.innerHeight || 0) : Math.max(document.documentElement.clientWidth, window.innerWidth || 0)) / 100 * o
                }
                return o
            }

            function Z(e, t, n, r) {
                var i = [0, 0],
                    o = -1 !== ["right", "left"].indexOf(r),
                    s = e.split(/(\+|\-)/).map(function(e) {
                        return e.trim()
                    }),
                    a = s.indexOf(j(s, function(e) {
                        return -1 !== e.search(/,|\s/)
                    }));
                s[a] && -1 === s[a].indexOf(",") && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
                var u = /\s*,\s*|\s+/,
                    l = -1 !== a ? [s.slice(0, a).concat([s[a].split(u)[0]]), [s[a].split(u)[1]].concat(s.slice(a + 1))] : [s];
                return l = l.map(function(e, r) {
                    var i = (1 === r ? !o : o) ? "height" : "width",
                        s = !1;
                    return e.reduce(function(e, t) {
                        return "" === e[e.length - 1] && -1 !== ["+", "-"].indexOf(t) ? (e[e.length - 1] = t, s = !0, e) : s ? (e[e.length - 1] += t, s = !1, e) : e.concat(t)
                    }, []).map(function(e) {
                        return J(e, i, t, n)
                    })
                }), l.forEach(function(e, t) {
                    e.forEach(function(n, r) {
                        B(n) && (i[t] += n * ("-" === e[r - 1] ? -1 : 1))
                    })
                }), i
            }

            function ee(e, t) {
                var n = t.offset,
                    r = e.placement,
                    i = e.offsets,
                    o = i.popper,
                    s = i.reference,
                    a = r.split("-")[0],
                    u = void 0;
                return u = B(+n) ? [+n, 0] : Z(n, o, s, a), "left" === a ? (o.top += u[0], o.left -= u[1]) : "right" === a ? (o.top += u[0], o.left += u[1]) : "top" === a ? (o.left += u[0], o.top -= u[1]) : "bottom" === a && (o.left += u[0], o.top += u[1]), e.popper = o, e
            }

            function te(e, t) {
                var n = t.boundariesElement || a(e.instance.popper);
                e.instance.reference === n && (n = a(n));
                var r = x(e.instance.popper, e.instance.reference, t.padding, n);
                t.boundaries = r;
                var i = t.priority,
                    o = e.offsets.popper,
                    s = {
                        primary: function(e) {
                            var n = o[e];
                            return o[e] < r[e] && !t.escapeWithReference && (n = Math.max(o[e], r[e])), ge({}, e, n)
                        },
                        secondary: function(e) {
                            var n = "right" === e ? "left" : "top",
                                i = o[n];
                            return o[e] > r[e] && !t.escapeWithReference && (i = Math.min(o[n], r[e] - ("right" === e ? o.width : o.height))), ge({}, n, i)
                        }
                    };
                return i.forEach(function(e) {
                    var t = -1 !== ["left", "top"].indexOf(e) ? "primary" : "secondary";
                    o = ve({}, o, s[t](e))
                }), e.offsets.popper = o, e
            }

            function ne(e) {
                var t = e.placement,
                    n = t.split("-")[0],
                    r = t.split("-")[1];
                if (r) {
                    var i = e.offsets,
                        o = i.reference,
                        s = i.popper,
                        a = -1 !== ["bottom", "top"].indexOf(n),
                        u = a ? "left" : "top",
                        l = a ? "width" : "height",
                        c = {
                            start: ge({}, u, o[u]),
                            end: ge({}, u, o[u] + o[l] - s[l])
                        };
                    e.offsets.popper = ve({}, s, c[r])
                }
                return e
            }

            function re(e) {
                if (!X(e.instance.modifiers, "hide", "preventOverflow")) return e;
                var t = e.offsets.reference,
                    n = j(e.instance.modifiers, function(e) {
                        return "preventOverflow" === e.name
                    }).boundaries;
                if (t.bottom < n.top || t.left > n.right || t.top > n.bottom || t.right < n.left) {
                    if (!0 === e.hide) return e;
                    e.hide = !0, e.attributes["x-out-of-boundaries"] = ""
                } else {
                    if (!1 === e.hide) return e;
                    e.hide = !1, e.attributes["x-out-of-boundaries"] = !1
                }
                return e
            }

            function ie(e) {
                var t = e.placement,
                    n = t.split("-")[0],
                    r = e.offsets,
                    i = r.popper,
                    o = r.reference,
                    s = -1 !== ["left", "right"].indexOf(n),
                    a = -1 === ["top", "left"].indexOf(n);
                return i[s ? "left" : "top"] = o[n] - (a ? i[s ? "width" : "height"] : 0), e.placement = S(t), e.offsets.popper = g(i), e
            }
            for (var oe = ["native code", "[object MutationObserverConstructor]"], se = "undefined" != typeof window, ae = ["Edge", "Trident", "Firefox"], ue = 0, le = 0; le < ae.length; le += 1)
                if (se && navigator.userAgent.indexOf(ae[le]) >= 0) {
                    ue = 1;
                    break
                }
            var ce = se && function(e) {
                    return oe.some(function(t) {
                        return (e || "").toString().indexOf(t) > -1
                    })
                }(window.MutationObserver),
                fe = ce ? e : t,
                pe = void 0,
                de = function() {
                    return void 0 === pe && (pe = -1 !== navigator.appVersion.indexOf("MSIE 10")), pe
                },
                he = function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                },
                me = function() {
                    function e(e, t) {
                        for (var n = 0; n < t.length; n++) {
                            var r = t[n];
                            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                        }
                    }
                    return function(t, n, r) {
                        return n && e(t.prototype, n), r && e(t, r), t
                    }
                }(),
                ge = function(e, t, n) {
                    return t in e ? Object.defineProperty(e, t, {
                        value: n,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : e[t] = n, e
                },
                ve = Object.assign || function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var n = arguments[t];
                        for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                    }
                    return e
                },
                ye = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"],
                be = ye.slice(3),
                we = {
                    FLIP: "flip",
                    CLOCKWISE: "clockwise",
                    COUNTERCLOCKWISE: "counterclockwise"
                },
                xe = {
                    shift: {
                        order: 100,
                        enabled: !0,
                        fn: ne
                    },
                    offset: {
                        order: 200,
                        enabled: !0,
                        fn: ee,
                        offset: 0
                    },
                    preventOverflow: {
                        order: 300,
                        enabled: !0,
                        fn: te,
                        priority: ["left", "right", "top", "bottom"],
                        padding: 5,
                        boundariesElement: "scrollParent"
                    },
                    keepTogether: {
                        order: 400,
                        enabled: !0,
                        fn: K
                    },
                    arrow: {
                        order: 500,
                        enabled: !0,
                        fn: Y,
                        element: "[x-arrow]"
                    },
                    flip: {
                        order: 600,
                        enabled: !0,
                        fn: Q,
                        behavior: "flip",
                        padding: 5,
                        boundariesElement: "viewport"
                    },
                    inner: {
                        order: 700,
                        enabled: !1,
                        fn: ie
                    },
                    hide: {
                        order: 800,
                        enabled: !0,
                        fn: re
                    },
                    computeStyle: {
                        order: 850,
                        enabled: !0,
                        fn: z,
                        gpuAcceleration: !0,
                        x: "bottom",
                        y: "right"
                    },
                    applyStyle: {
                        order: 900,
                        enabled: !0,
                        fn: _,
                        onLoad: U,
                        gpuAcceleration: void 0
                    }
                },
                Te = {
                    placement: "bottom",
                    eventsEnabled: !0,
                    removeOnDestroy: !1,
                    onCreate: function() {},
                    onUpdate: function() {},
                    modifiers: xe
                },
                Ce = function() {
                    function e(t, r) {
                        var i = this,
                            o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                        he(this, e), this.scheduleUpdate = function() {
                            return requestAnimationFrame(i.update)
                        }, this.update = fe(this.update.bind(this)), this.options = ve({}, e.Defaults, o), this.state = {
                            isDestroyed: !1,
                            isCreated: !1,
                            scrollParents: []
                        }, this.reference = t.jquery ? t[0] : t, this.popper = r.jquery ? r[0] : r, this.options.modifiers = {}, Object.keys(ve({}, e.Defaults.modifiers, o.modifiers)).forEach(function(t) {
                            i.options.modifiers[t] = ve({}, e.Defaults.modifiers[t] || {}, o.modifiers ? o.modifiers[t] : {})
                        }), this.modifiers = Object.keys(this.options.modifiers).map(function(e) {
                            return ve({
                                name: e
                            }, i.options.modifiers[e])
                        }).sort(function(e, t) {
                            return e.order - t.order
                        }), this.modifiers.forEach(function(e) {
                            e.enabled && n(e.onLoad) && e.onLoad(i.reference, i.popper, i.options, e, i.state)
                        }), this.update();
                        var s = this.options.eventsEnabled;
                        s && this.enableEventListeners(), this.state.eventsEnabled = s
                    }
                    return me(e, [{
                        key: "update",
                        value: function() {
                            return O.call(this)
                        }
                    }, {
                        key: "destroy",
                        value: function() {
                            return q.call(this)
                        }
                    }, {
                        key: "enableEventListeners",
                        value: function() {
                            return F.call(this)
                        }
                    }, {
                        key: "disableEventListeners",
                        value: function() {
                            return $.call(this)
                        }
                    }]), e
                }();
            return Ce.Utils = ("undefined" != typeof window ? window : r).PopperUtils, Ce.placements = ye, Ce.Defaults = Te, Ce
        })
    }).call(t, n(8))
}, function(e, t) {
    var n;
    n = function() {
        return this
    }();
    try {
        n = n || Function("return this")() || (0, eval)("this")
    } catch (e) {
        "object" == typeof window && (n = window)
    }
    e.exports = n
}, function(e, t, n) {
    (function(e) {
        var n, r, i, o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };
        /*!
         *
         *   typed.js - A JavaScript Typing Animation Library
         *   Author: Matt Boldt <me@mattboldt.com>
         *   Version: v2.0.6
         *   Url: https://github.com/mattboldt/typed.js
         *   License(s): MIT
         *
         */
        ! function(s, a) {
            "object" === o(t) && "object" === o(e) ? e.exports = a() : (r = [], n = a, void 0 !== (i = "function" == typeof n ? n.apply(t, r) : n) && (e.exports = i))
        }(0, function() {
            return function(e) {
                function t(r) {
                    if (n[r]) return n[r].exports;
                    var i = n[r] = {
                        exports: {},
                        id: r,
                        loaded: !1
                    };
                    return e[r].call(i.exports, i, i.exports, t), i.loaded = !0, i.exports
                }
                var n = {};
                return t.m = e, t.c = n, t.p = "", t(0)
            }([function(e, t, n) {
                "use strict";

                function r(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var i = function() {
                        function e(e, t) {
                            for (var n = 0; n < t.length; n++) {
                                var r = t[n];
                                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                            }
                        }
                        return function(t, n, r) {
                            return n && e(t.prototype, n), r && e(t, r), t
                        }
                    }(),
                    o = n(1),
                    s = n(3),
                    a = function() {
                        function e(t, n) {
                            r(this, e), o.initializer.load(this, n, t), this.begin()
                        }
                        return i(e, [{
                            key: "toggle",
                            value: function() {
                                this.pause.status ? this.start() : this.stop()
                            }
                        }, {
                            key: "stop",
                            value: function() {
                                this.typingComplete || this.pause.status || (this.toggleBlinking(!0), this.pause.status = !0, this.options.onStop(this.arrayPos, this))
                            }
                        }, {
                            key: "start",
                            value: function() {
                                this.typingComplete || this.pause.status && (this.pause.status = !1, this.pause.typewrite ? this.typewrite(this.pause.curString, this.pause.curStrPos) : this.backspace(this.pause.curString, this.pause.curStrPos), this.options.onStart(this.arrayPos, this))
                            }
                        }, {
                            key: "destroy",
                            value: function() {
                                this.reset(!1), this.options.onDestroy(this)
                            }
                        }, {
                            key: "reset",
                            value: function() {
                                var e = arguments.length <= 0 || void 0 === arguments[0] || arguments[0];
                                clearInterval(this.timeout), this.replaceText(""), this.cursor && this.cursor.parentNode && (this.cursor.parentNode.removeChild(this.cursor), this.cursor = null), this.strPos = 0, this.arrayPos = 0, this.curLoop = 0, e && (this.insertCursor(), this.options.onReset(this), this.begin())
                            }
                        }, {
                            key: "begin",
                            value: function() {
                                var e = this;
                                this.typingComplete = !1, this.shuffleStringsIfNeeded(this), this.insertCursor(), this.bindInputFocusEvents && this.bindFocusEvents(), this.timeout = setTimeout(function() {
                                    e.currentElContent && 0 !== e.currentElContent.length ? e.backspace(e.currentElContent, e.currentElContent.length) : e.typewrite(e.strings[e.sequence[e.arrayPos]], e.strPos)
                                }, this.startDelay)
                            }
                        }, {
                            key: "typewrite",
                            value: function(e, t) {
                                var n = this;
                                this.fadeOut && this.el.classList.contains(this.fadeOutClass) && (this.el.classList.remove(this.fadeOutClass), this.cursor && this.cursor.classList.remove(this.fadeOutClass));
                                var r = this.humanizer(this.typeSpeed),
                                    i = 1;
                                if (!0 === this.pause.status) return void this.setPauseStatus(e, t, !0);
                                this.timeout = setTimeout(function() {
                                    t = s.htmlParser.typeHtmlChars(e, t, n);
                                    var r = 0,
                                        o = e.substr(t);
                                    if ("^" === o.charAt(0) && /^\^\d+/.test(o)) {
                                        var a = 1;
                                        o = /\d+/.exec(o)[0], a += o.length, r = parseInt(o), n.temporaryPause = !0, n.options.onTypingPaused(n.arrayPos, n), e = e.substring(0, t) + e.substring(t + a), n.toggleBlinking(!0)
                                    }
                                    if ("`" === o.charAt(0)) {
                                        for (;
                                            "`" !== e.substr(t + i).charAt(0) && (i++, !(t + i > e.length)););
                                        var u = e.substring(0, t),
                                            l = e.substring(u.length + 1, t + i),
                                            c = e.substring(t + i + 1);
                                        e = u + l + c, i--
                                    }
                                    n.timeout = setTimeout(function() {
                                        n.toggleBlinking(!1), t === e.length ? n.doneTyping(e, t) : n.keepTyping(e, t, i), n.temporaryPause && (n.temporaryPause = !1, n.options.onTypingResumed(n.arrayPos, n))
                                    }, r)
                                }, r)
                            }
                        }, {
                            key: "keepTyping",
                            value: function(e, t, n) {
                                0 === t && (this.toggleBlinking(!1), this.options.preStringTyped(this.arrayPos, this)), t += n;
                                var r = e.substr(0, t);
                                this.replaceText(r), this.typewrite(e, t)
                            }
                        }, {
                            key: "doneTyping",
                            value: function(e, t) {
                                var n = this;
                                this.options.onStringTyped(this.arrayPos, this), this.toggleBlinking(!0), this.arrayPos === this.strings.length - 1 && (this.complete(), !1 === this.loop || this.curLoop === this.loopCount) || (this.timeout = setTimeout(function() {
                                    n.backspace(e, t)
                                }, this.backDelay))
                            }
                        }, {
                            key: "backspace",
                            value: function(e, t) {
                                var n = this;
                                if (!0 === this.pause.status) return void this.setPauseStatus(e, t, !0);
                                if (this.fadeOut) return this.initFadeOut();
                                this.toggleBlinking(!1);
                                var r = this.humanizer(this.backSpeed);
                                this.timeout = setTimeout(function() {
                                    t = s.htmlParser.backSpaceHtmlChars(e, t, n);
                                    var r = e.substr(0, t);
                                    if (n.replaceText(r), n.smartBackspace) {
                                        var i = n.strings[n.arrayPos + 1];
                                        i && r === i.substr(0, t) ? n.stopNum = t : n.stopNum = 0
                                    }
                                    t > n.stopNum ? (t--, n.backspace(e, t)) : t <= n.stopNum && (n.arrayPos++, n.arrayPos === n.strings.length ? (n.arrayPos = 0, n.options.onLastStringBackspaced(), n.shuffleStringsIfNeeded(), n.begin()) : n.typewrite(n.strings[n.sequence[n.arrayPos]], t))
                                }, r)
                            }
                        }, {
                            key: "complete",
                            value: function() {
                                this.options.onComplete(this), this.loop ? this.curLoop++ : this.typingComplete = !0
                            }
                        }, {
                            key: "setPauseStatus",
                            value: function(e, t, n) {
                                this.pause.typewrite = n, this.pause.curString = e, this.pause.curStrPos = t
                            }
                        }, {
                            key: "toggleBlinking",
                            value: function(e) {
                                if (this.cursor && !this.pause.status && this.cursorBlinking !== e) {
                                    this.cursorBlinking = e;
                                    var t = e ? "infinite" : 0;
                                    this.cursor.style.animationIterationCount = t
                                }
                            }
                        }, {
                            key: "humanizer",
                            value: function(e) {
                                return Math.round(Math.random() * e / 2) + e
                            }
                        }, {
                            key: "shuffleStringsIfNeeded",
                            value: function() {
                                this.shuffle && (this.sequence = this.sequence.sort(function() {
                                    return Math.random() - .5
                                }))
                            }
                        }, {
                            key: "initFadeOut",
                            value: function() {
                                var e = this;
                                return this.el.className += " " + this.fadeOutClass, this.cursor && (this.cursor.className += " " + this.fadeOutClass), setTimeout(function() {
                                    e.arrayPos++, e.replaceText(""), e.strings.length > e.arrayPos ? e.typewrite(e.strings[e.sequence[e.arrayPos]], 0) : (e.typewrite(e.strings[0], 0), e.arrayPos = 0)
                                }, this.fadeOutDelay)
                            }
                        }, {
                            key: "replaceText",
                            value: function(e) {
                                this.attr ? this.el.setAttribute(this.attr, e) : this.isInput ? this.el.value = e : "html" === this.contentType ? this.el.innerHTML = e : this.el.textContent = e
                            }
                        }, {
                            key: "bindFocusEvents",
                            value: function() {
                                var e = this;
                                this.isInput && (this.el.addEventListener("focus", function(t) {
                                    e.stop()
                                }), this.el.addEventListener("blur", function(t) {
                                    e.el.value && 0 !== e.el.value.length || e.start()
                                }))
                            }
                        }, {
                            key: "insertCursor",
                            value: function() {
                                this.showCursor && (this.cursor || (this.cursor = document.createElement("span"), this.cursor.className = "typed-cursor", this.cursor.innerHTML = this.cursorChar, this.el.parentNode && this.el.parentNode.insertBefore(this.cursor, this.el.nextSibling)))
                            }
                        }]), e
                    }();
                t.default = a, e.exports = t.default
            }, function(e, t, n) {
                "use strict";

                function r(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var i = Object.assign || function(e) {
                        for (var t = 1; t < arguments.length; t++) {
                            var n = arguments[t];
                            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                        }
                        return e
                    },
                    o = function() {
                        function e(e, t) {
                            for (var n = 0; n < t.length; n++) {
                                var r = t[n];
                                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                            }
                        }
                        return function(t, n, r) {
                            return n && e(t.prototype, n), r && e(t, r), t
                        }
                    }(),
                    s = n(2),
                    a = function(e) {
                        return e && e.__esModule ? e : {
                            default: e
                        }
                    }(s),
                    u = function() {
                        function e() {
                            r(this, e)
                        }
                        return o(e, [{
                            key: "load",
                            value: function(e, t, n) {
                                if (e.el = "string" == typeof n ? document.querySelector(n) : n, e.options = i({}, a.default, t), e.isInput = "input" === e.el.tagName.toLowerCase(), e.attr = e.options.attr, e.bindInputFocusEvents = e.options.bindInputFocusEvents, e.showCursor = !e.isInput && e.options.showCursor, e.cursorChar = e.options.cursorChar, e.cursorBlinking = !0, e.elContent = e.attr ? e.el.getAttribute(e.attr) : e.el.textContent, e.contentType = e.options.contentType, e.typeSpeed = e.options.typeSpeed, e.startDelay = e.options.startDelay, e.backSpeed = e.options.backSpeed, e.smartBackspace = e.options.smartBackspace, e.backDelay = e.options.backDelay, e.fadeOut = e.options.fadeOut, e.fadeOutClass = e.options.fadeOutClass, e.fadeOutDelay = e.options.fadeOutDelay, e.isPaused = !1, e.strings = e.options.strings.map(function(e) {
                                        return e.trim()
                                    }), "string" == typeof e.options.stringsElement ? e.stringsElement = document.querySelector(e.options.stringsElement) : e.stringsElement = e.options.stringsElement, e.stringsElement) {
                                    e.strings = [], e.stringsElement.style.display = "none";
                                    var r = Array.prototype.slice.apply(e.stringsElement.children),
                                        o = r.length;
                                    if (o)
                                        for (var s = 0; s < o; s += 1) {
                                            var u = r[s];
                                            e.strings.push(u.innerHTML.trim())
                                        }
                                }
                                e.strPos = 0, e.arrayPos = 0, e.stopNum = 0, e.loop = e.options.loop, e.loopCount = e.options.loopCount, e.curLoop = 0, e.shuffle = e.options.shuffle, e.sequence = [], e.pause = {
                                    status: !1,
                                    typewrite: !0,
                                    curString: "",
                                    curStrPos: 0
                                }, e.typingComplete = !1;
                                for (var s in e.strings) e.sequence[s] = s;
                                e.currentElContent = this.getCurrentElContent(e), e.autoInsertCss = e.options.autoInsertCss, this.appendAnimationCss(e)
                            }
                        }, {
                            key: "getCurrentElContent",
                            value: function(e) {
                                return e.attr ? e.el.getAttribute(e.attr) : e.isInput ? e.el.value : "html" === e.contentType ? e.el.innerHTML : e.el.textContent
                            }
                        }, {
                            key: "appendAnimationCss",
                            value: function(e) {
                                if (e.autoInsertCss && e.showCursor && e.fadeOut) {
                                    var t = document.createElement("style");
                                    t.type = "text/css";
                                    var n = "";
                                    e.showCursor && (n += "\n        .typed-cursor{\n          opacity: 1;\n          animation: typedjsBlink 0.7s infinite;\n          -webkit-animation: typedjsBlink 0.7s infinite;\n                  animation: typedjsBlink 0.7s infinite;\n        }\n        @keyframes typedjsBlink{\n          50% { opacity: 0.0; }\n        }\n        @-webkit-keyframes typedjsBlink{\n          0% { opacity: 1; }\n          50% { opacity: 0.0; }\n          100% { opacity: 1; }\n        }\n      "), e.fadeOut && (n += "\n        .typed-fade-out{\n          opacity: 0;\n          transition: opacity .25s;\n          -webkit-animation: 0;\n                  animation: 0;\n        }\n      "), 0 !== t.length && (t.innerHTML = n, document.head.appendChild(t))
                                }
                            }
                        }]), e
                    }();
                t.default = u;
                var l = new u;
                t.initializer = l
            }, function(e, t) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var n = {
                    strings: ["These are the default values...", "You know what you should do?", "Use your own!", "Have a great day!"],
                    stringsElement: null,
                    typeSpeed: 0,
                    startDelay: 0,
                    backSpeed: 0,
                    smartBackspace: !0,
                    shuffle: !1,
                    backDelay: 700,
                    fadeOut: !1,
                    fadeOutClass: "typed-fade-out",
                    fadeOutDelay: 500,
                    loop: !1,
                    loopCount: 1 / 0,
                    showCursor: !0,
                    cursorChar: "|",
                    autoInsertCss: !0,
                    attr: null,
                    bindInputFocusEvents: !1,
                    contentType: "html",
                    onComplete: function(e) {},
                    preStringTyped: function(e, t) {},
                    onStringTyped: function(e, t) {},
                    onLastStringBackspaced: function(e) {},
                    onTypingPaused: function(e, t) {},
                    onTypingResumed: function(e, t) {},
                    onReset: function(e) {},
                    onStop: function(e, t) {},
                    onStart: function(e, t) {},
                    onDestroy: function(e) {}
                };
                t.default = n, e.exports = t.default
            }, function(e, t) {
                "use strict";

                function n(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var r = function() {
                        function e(e, t) {
                            for (var n = 0; n < t.length; n++) {
                                var r = t[n];
                                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                            }
                        }
                        return function(t, n, r) {
                            return n && e(t.prototype, n), r && e(t, r), t
                        }
                    }(),
                    i = function() {
                        function e() {
                            n(this, e)
                        }
                        return r(e, [{
                            key: "typeHtmlChars",
                            value: function(e, t, n) {
                                if ("html" !== n.contentType) return t;
                                var r = e.substr(t).charAt(0);
                                if ("<" === r || "&" === r) {
                                    var i = "";
                                    for (i = "<" === r ? ">" : ";"; e.substr(t + 1).charAt(0) !== i && !(++t + 1 > e.length););
                                    t++
                                }
                                return t
                            }
                        }, {
                            key: "backSpaceHtmlChars",
                            value: function(e, t, n) {
                                if ("html" !== n.contentType) return t;
                                var r = e.substr(t).charAt(0);
                                if (">" === r || ";" === r) {
                                    var i = "";
                                    for (i = ">" === r ? "<" : "&"; e.substr(t - 1).charAt(0) !== i && !(--t < 0););
                                    t--
                                }
                                return t
                            }
                        }]), e
                    }();
                t.default = i;
                var o = new i;
                t.htmlParser = o
            }])
        })
    }).call(t, n(1)(e))
}, function(e, t, n) {
    function r(e) {
        return n(i(e))
    }

    function i(e) {
        var t = o[e];
        if (!(t + 1)) throw new Error("Cannot find module '" + e + "'.");
        return t
    }
    var o = {
        "./": 0,
        "./example": 2,
        "./example.js": 2,
        "./index": 0,
        "./index.js": 0
    };
    r.keys = function() {
        return Object.keys(o)
    }, r.resolve = i, e.exports = r, r.id = 10
}, function(e, t, n) {
    "use strict";
    n.d(t, "a", function() {
        return r
    });
    var r = {
        inspiration: [""],
        features: {
            easy: ["You have to guess name (multiple choices) of the pokemon."],
            medium: ["You have to guess name (multiple choices) of the pokemon. By half of a picture."],
            hard: ["You have to type precisely name of pokemon."]
        },
        useCases: {
            easy: ["NEWBIE"],
            medium: ["ROOKIE"],
            hard: ["GOSU"]
        },
        audiences: {
            easy: ["NEWBIE"],
            medium: ["professionals at work",],
            hard: ["astronauts on the ISS"]
        },
        devices: {
            easy: ["desktops"],
            medium: ["the latest iPhones"],
            hard: ["smart watches"]
        },
        needs: {
            easy: ["to save time"],
            medium: ["to be more green"],
            hard: ["to appear busy at work while actually checking facebook",]
        }
    }
}]);



$( "#play-btn" ).click(function() {
    CLIENT_GAME.question();
});

function load_clientjs(){
    var s = document.createElement('script');
    document.body.appendChild(s);
    s.defer = true;
    s.src = '/game/javascripts/client.js';
}