// Version 1.7.1 3d-force-graph-ar - https://github.com/vasturiano/3d-force-graph-ar
!(function (t, e) {
    "object" == typeof exports && "undefined" != typeof module
        ? (module.exports = e(require("three")))
        : "function" == typeof define && define.amd
        ? define(["three"], e)
        : ((t = "undefined" != typeof globalThis ? globalThis : t || self).ForceGraphAR = e(t.THREE));
})(this, function (t) {
    "use strict";
    function e(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(t);
            e &&
                (r = r.filter(function (e) {
                    return Object.getOwnPropertyDescriptor(t, e).enumerable;
                })),
                n.push.apply(n, r);
        }
        return n;
    }
    function n(t) {
        for (var n = 1; n < arguments.length; n++) {
            var i = null != arguments[n] ? arguments[n] : {};
            n % 2
                ? e(Object(i), !0).forEach(function (e) {
                      r(t, e, i[e]);
                  })
                : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(i))
                : e(Object(i)).forEach(function (e) {
                      Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(i, e));
                  });
        }
        return t;
    }
    function r(t, e, n) {
        return e in t ? Object.defineProperty(t, e, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (t[e] = n), t;
    }
    function i(t, e) {
        return (
            (function (t) {
                if (Array.isArray(t)) return t;
            })(t) ||
            (function (t, e) {
                var n = null == t ? null : ("undefined" != typeof Symbol && t[Symbol.iterator]) || t["@@iterator"];
                if (null == n) return;
                var r,
                    i,
                    o = [],
                    a = !0,
                    u = !1;
                try {
                    for (n = n.call(t); !(a = (r = n.next()).done) && (o.push(r.value), !e || o.length !== e); a = !0);
                } catch (t) {
                    (u = !0), (i = t);
                } finally {
                    try {
                        a || null == n.return || n.return();
                    } finally {
                        if (u) throw i;
                    }
                }
                return o;
            })(t, e) ||
            a(t, e) ||
            (function () {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
            })()
        );
    }
    function o(t) {
        return (
            (function (t) {
                if (Array.isArray(t)) return u(t);
            })(t) ||
            (function (t) {
                if (("undefined" != typeof Symbol && null != t[Symbol.iterator]) || null != t["@@iterator"]) return Array.from(t);
            })(t) ||
            a(t) ||
            (function () {
                throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
            })()
        );
    }
    function a(t, e) {
        if (t) {
            if ("string" == typeof t) return u(t, e);
            var n = Object.prototype.toString.call(t).slice(8, -1);
            return "Object" === n && t.constructor && (n = t.constructor.name), "Map" === n || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? u(t, e) : void 0;
        }
    }
    function u(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
        return r;
    }
    function s(t) {
        if (t.__esModule) return t;
        var e = Object.defineProperty({}, "__esModule", { value: !0 });
        return (
            Object.keys(t).forEach(function (n) {
                var r = Object.getOwnPropertyDescriptor(t, n);
                Object.defineProperty(
                    e,
                    n,
                    r.get
                        ? r
                        : {
                              enumerable: !0,
                              get: function () {
                                  return t[n];
                              },
                          }
                );
            }),
            e
        );
    }
    var l = function (t) {
        return t instanceof Function
            ? t
            : "string" == typeof t
            ? function (e) {
                  return e[t];
              }
            : function (e) {
                  return t;
              };
    };
    function c(t, e, n) {
        var r,
            i = 1;
        function o() {
            var o,
                a,
                u = r.length,
                s = 0,
                l = 0,
                c = 0;
            for (o = 0; o < u; ++o) (s += (a = r[o]).x || 0), (l += a.y || 0), (c += a.z || 0);
            for (s = (s / u - t) * i, l = (l / u - e) * i, c = (c / u - n) * i, o = 0; o < u; ++o) (a = r[o]), s && (a.x -= s), l && (a.y -= l), c && (a.z -= c);
        }
        return (
            null == t && (t = 0),
            null == e && (e = 0),
            null == n && (n = 0),
            (o.initialize = function (t) {
                r = t;
            }),
            (o.x = function (e) {
                return arguments.length ? ((t = +e), o) : t;
            }),
            (o.y = function (t) {
                return arguments.length ? ((e = +t), o) : e;
            }),
            (o.z = function (t) {
                return arguments.length ? ((n = +t), o) : n;
            }),
            (o.strength = function (t) {
                return arguments.length ? ((i = +t), o) : i;
            }),
            o
        );
    }
    function f(t, e, n) {
        if (isNaN(e)) return t;
        var r,
            i,
            o,
            a,
            u,
            s,
            l = t._root,
            c = { data: n },
            f = t._x0,
            d = t._x1;
        if (!l) return (t._root = c), t;
        for (; l.length; ) if (((a = e >= (i = (f + d) / 2)) ? (f = i) : (d = i), (r = l), !(l = l[(u = +a)]))) return (r[u] = c), t;
        if (e === (o = +t._x.call(null, l.data))) return (c.next = l), r ? (r[u] = c) : (t._root = c), t;
        do {
            (r = r ? (r[u] = new Array(2)) : (t._root = new Array(2))), (a = e >= (i = (f + d) / 2)) ? (f = i) : (d = i);
        } while ((u = +a) == (s = +(o >= i)));
        return (r[s] = l), (r[u] = c), t;
    }
    function d(t, e, n) {
        (this.node = t), (this.x0 = e), (this.x1 = n);
    }
    function h(t) {
        return t[0];
    }
    function p(t, e) {
        var n = new g(null == e ? h : e, NaN, NaN);
        return null == t ? n : n.addAll(t);
    }
    function g(t, e, n) {
        (this._x = t), (this._x0 = e), (this._x1 = n), (this._root = void 0);
    }
    function v(t) {
        for (var e = { data: t.data }, n = e; (t = t.next); ) n = n.next = { data: t.data };
        return e;
    }
    var y = (p.prototype = g.prototype);
    function b(t, e, n, r) {
        if (isNaN(e) || isNaN(n)) return t;
        var i,
            o,
            a,
            u,
            s,
            l,
            c,
            f,
            d,
            h = t._root,
            p = { data: r },
            g = t._x0,
            v = t._y0,
            y = t._x1,
            b = t._y1;
        if (!h) return (t._root = p), t;
        for (; h.length; ) if (((l = e >= (o = (g + y) / 2)) ? (g = o) : (y = o), (c = n >= (a = (v + b) / 2)) ? (v = a) : (b = a), (i = h), !(h = h[(f = (c << 1) | l)]))) return (i[f] = p), t;
        if (((u = +t._x.call(null, h.data)), (s = +t._y.call(null, h.data)), e === u && n === s)) return (p.next = h), i ? (i[f] = p) : (t._root = p), t;
        do {
            (i = i ? (i[f] = new Array(4)) : (t._root = new Array(4))), (l = e >= (o = (g + y) / 2)) ? (g = o) : (y = o), (c = n >= (a = (v + b) / 2)) ? (v = a) : (b = a);
        } while ((f = (c << 1) | l) == (d = ((s >= a) << 1) | (u >= o)));
        return (i[d] = h), (i[f] = p), t;
    }
    function m(t, e, n, r, i) {
        (this.node = t), (this.x0 = e), (this.y0 = n), (this.x1 = r), (this.y1 = i);
    }
    function w(t) {
        return t[0];
    }
    function _(t) {
        return t[1];
    }
    function x(t, e, n) {
        var r = new k(null == e ? w : e, null == n ? _ : n, NaN, NaN, NaN, NaN);
        return null == t ? r : r.addAll(t);
    }
    function k(t, e, n, r, i, o) {
        (this._x = t), (this._y = e), (this._x0 = n), (this._y0 = r), (this._x1 = i), (this._y1 = o), (this._root = void 0);
    }
    function O(t) {
        for (var e = { data: t.data }, n = e; (t = t.next); ) n = n.next = { data: t.data };
        return e;
    }
    (y.copy = function () {
        var t,
            e,
            n = new g(this._x, this._x0, this._x1),
            r = this._root;
        if (!r) return n;
        if (!r.length) return (n._root = v(r)), n;
        for (t = [{ source: r, target: (n._root = new Array(2)) }]; (r = t.pop()); ) for (var i = 0; i < 2; ++i) (e = r.source[i]) && (e.length ? t.push({ source: e, target: (r.target[i] = new Array(2)) }) : (r.target[i] = v(e)));
        return n;
    }),
        (y.add = function (t) {
            var e = +this._x.call(null, t);
            return f(this.cover(e), e, t);
        }),
        (y.addAll = function (t) {
            var e,
                n,
                r = t.length,
                i = new Array(r),
                o = 1 / 0,
                a = -1 / 0;
            for (e = 0; e < r; ++e) isNaN((n = +this._x.call(null, t[e]))) || ((i[e] = n), n < o && (o = n), n > a && (a = n));
            if (o > a) return this;
            for (this.cover(o).cover(a), e = 0; e < r; ++e) f(this, i[e], t[e]);
            return this;
        }),
        (y.cover = function (t) {
            if (isNaN((t = +t))) return this;
            var e = this._x0,
                n = this._x1;
            if (isNaN(e)) n = (e = Math.floor(t)) + 1;
            else {
                for (var r, i, o = n - e || 1, a = this._root; e > t || t >= n; )
                    switch (((i = +(t < e)), ((r = new Array(2))[i] = a), (a = r), (o *= 2), i)) {
                        case 0:
                            n = e + o;
                            break;
                        case 1:
                            e = n - o;
                    }
                this._root && this._root.length && (this._root = a);
            }
            return (this._x0 = e), (this._x1 = n), this;
        }),
        (y.data = function () {
            var t = [];
            return (
                this.visit(function (e) {
                    if (!e.length)
                        do {
                            t.push(e.data);
                        } while ((e = e.next));
                }),
                t
            );
        }),
        (y.extent = function (t) {
            return arguments.length ? this.cover(+t[0][0]).cover(+t[1][0]) : isNaN(this._x0) ? void 0 : [[this._x0], [this._x1]];
        }),
        (y.find = function (t, e) {
            var n,
                r,
                i,
                o,
                a,
                u = this._x0,
                s = this._x1,
                l = [],
                c = this._root;
            for (c && l.push(new d(c, u, s)), null == e ? (e = 1 / 0) : ((u = t - e), (s = t + e)); (o = l.pop()); )
                if (!(!(c = o.node) || (r = o.x0) > s || (i = o.x1) < u))
                    if (c.length) {
                        var f = (r + i) / 2;
                        l.push(new d(c[1], f, i), new d(c[0], r, f)), (a = +(t >= f)) && ((o = l[l.length - 1]), (l[l.length - 1] = l[l.length - 1 - a]), (l[l.length - 1 - a] = o));
                    } else {
                        var h = Math.abs(t - +this._x.call(null, c.data));
                        h < e && ((e = h), (u = t - h), (s = t + h), (n = c.data));
                    }
            return n;
        }),
        (y.remove = function (t) {
            if (isNaN((o = +this._x.call(null, t)))) return this;
            var e,
                n,
                r,
                i,
                o,
                a,
                u,
                s,
                l,
                c = this._root,
                f = this._x0,
                d = this._x1;
            if (!c) return this;
            if (c.length)
                for (;;) {
                    if (((u = o >= (a = (f + d) / 2)) ? (f = a) : (d = a), (e = c), !(c = c[(s = +u)]))) return this;
                    if (!c.length) break;
                    e[(s + 1) & 1] && ((n = e), (l = s));
                }
            for (; c.data !== t; ) if (((r = c), !(c = c.next))) return this;
            return (
                (i = c.next) && delete c.next,
                r ? (i ? (r.next = i) : delete r.next, this) : e ? (i ? (e[s] = i) : delete e[s], (c = e[0] || e[1]) && c === (e[1] || e[0]) && !c.length && (n ? (n[l] = c) : (this._root = c)), this) : ((this._root = i), this)
            );
        }),
        (y.removeAll = function (t) {
            for (var e = 0, n = t.length; e < n; ++e) this.remove(t[e]);
            return this;
        }),
        (y.root = function () {
            return this._root;
        }),
        (y.size = function () {
            var t = 0;
            return (
                this.visit(function (e) {
                    if (!e.length)
                        do {
                            ++t;
                        } while ((e = e.next));
                }),
                t
            );
        }),
        (y.visit = function (t) {
            var e,
                n,
                r,
                i,
                o = [],
                a = this._root;
            for (a && o.push(new d(a, this._x0, this._x1)); (e = o.pop()); )
                if (!t((a = e.node), (r = e.x0), (i = e.x1)) && a.length) {
                    var u = (r + i) / 2;
                    (n = a[1]) && o.push(new d(n, u, i)), (n = a[0]) && o.push(new d(n, r, u));
                }
            return this;
        }),
        (y.visitAfter = function (t) {
            var e,
                n = [],
                r = [];
            for (this._root && n.push(new d(this._root, this._x0, this._x1)); (e = n.pop()); ) {
                var i = e.node;
                if (i.length) {
                    var o,
                        a = e.x0,
                        u = e.x1,
                        s = (a + u) / 2;
                    (o = i[0]) && n.push(new d(o, a, s)), (o = i[1]) && n.push(new d(o, s, u));
                }
                r.push(e);
            }
            for (; (e = r.pop()); ) t(e.node, e.x0, e.x1);
            return this;
        }),
        (y.x = function (t) {
            return arguments.length ? ((this._x = t), this) : this._x;
        });
    var A = (x.prototype = k.prototype);
    function j(t, e, n, r, i) {
        if (isNaN(e) || isNaN(n) || isNaN(r)) return t;
        var o,
            a,
            u,
            s,
            l,
            c,
            f,
            d,
            h,
            p,
            g,
            v,
            y = t._root,
            b = { data: i },
            m = t._x0,
            w = t._y0,
            _ = t._z0,
            x = t._x1,
            k = t._y1,
            O = t._z1;
        if (!y) return (t._root = b), t;
        for (; y.length; )
            if (((d = e >= (a = (m + x) / 2)) ? (m = a) : (x = a), (h = n >= (u = (w + k) / 2)) ? (w = u) : (k = u), (p = r >= (s = (_ + O) / 2)) ? (_ = s) : (O = s), (o = y), !(y = y[(g = (p << 2) | (h << 1) | d)]))) return (o[g] = b), t;
        if (((l = +t._x.call(null, y.data)), (c = +t._y.call(null, y.data)), (f = +t._z.call(null, y.data)), e === l && n === c && r === f)) return (b.next = y), o ? (o[g] = b) : (t._root = b), t;
        do {
            (o = o ? (o[g] = new Array(8)) : (t._root = new Array(8))), (d = e >= (a = (m + x) / 2)) ? (m = a) : (x = a), (h = n >= (u = (w + k) / 2)) ? (w = u) : (k = u), (p = r >= (s = (_ + O) / 2)) ? (_ = s) : (O = s);
        } while ((g = (p << 2) | (h << 1) | d) == (v = ((f >= s) << 2) | ((c >= u) << 1) | (l >= a)));
        return (o[v] = y), (o[g] = b), t;
    }
    function P(t, e, n, r, i, o, a) {
        (this.node = t), (this.x0 = e), (this.y0 = n), (this.z0 = r), (this.x1 = i), (this.y1 = o), (this.z1 = a);
    }
    function M(t) {
        return t[0];
    }
    function S(t) {
        return t[1];
    }
    function E(t) {
        return t[2];
    }
    function C(t, e, n, r) {
        var i = new D(null == e ? M : e, null == n ? S : n, null == r ? E : r, NaN, NaN, NaN, NaN, NaN, NaN);
        return null == t ? i : i.addAll(t);
    }
    function D(t, e, n, r, i, o, a, u, s) {
        (this._x = t), (this._y = e), (this._z = n), (this._x0 = r), (this._y0 = i), (this._z0 = o), (this._x1 = a), (this._y1 = u), (this._z1 = s), (this._root = void 0);
    }
    function N(t) {
        for (var e = { data: t.data }, n = e; (t = t.next); ) n = n.next = { data: t.data };
        return e;
    }
    (A.copy = function () {
        var t,
            e,
            n = new k(this._x, this._y, this._x0, this._y0, this._x1, this._y1),
            r = this._root;
        if (!r) return n;
        if (!r.length) return (n._root = O(r)), n;
        for (t = [{ source: r, target: (n._root = new Array(4)) }]; (r = t.pop()); ) for (var i = 0; i < 4; ++i) (e = r.source[i]) && (e.length ? t.push({ source: e, target: (r.target[i] = new Array(4)) }) : (r.target[i] = O(e)));
        return n;
    }),
        (A.add = function (t) {
            const e = +this._x.call(null, t),
                n = +this._y.call(null, t);
            return b(this.cover(e, n), e, n, t);
        }),
        (A.addAll = function (t) {
            var e,
                n,
                r,
                i,
                o = t.length,
                a = new Array(o),
                u = new Array(o),
                s = 1 / 0,
                l = 1 / 0,
                c = -1 / 0,
                f = -1 / 0;
            for (n = 0; n < o; ++n) isNaN((r = +this._x.call(null, (e = t[n])))) || isNaN((i = +this._y.call(null, e))) || ((a[n] = r), (u[n] = i), r < s && (s = r), r > c && (c = r), i < l && (l = i), i > f && (f = i));
            if (s > c || l > f) return this;
            for (this.cover(s, l).cover(c, f), n = 0; n < o; ++n) b(this, a[n], u[n], t[n]);
            return this;
        }),
        (A.cover = function (t, e) {
            if (isNaN((t = +t)) || isNaN((e = +e))) return this;
            var n = this._x0,
                r = this._y0,
                i = this._x1,
                o = this._y1;
            if (isNaN(n)) (i = (n = Math.floor(t)) + 1), (o = (r = Math.floor(e)) + 1);
            else {
                for (var a, u, s = i - n || 1, l = this._root; n > t || t >= i || r > e || e >= o; )
                    switch (((u = ((e < r) << 1) | (t < n)), ((a = new Array(4))[u] = l), (l = a), (s *= 2), u)) {
                        case 0:
                            (i = n + s), (o = r + s);
                            break;
                        case 1:
                            (n = i - s), (o = r + s);
                            break;
                        case 2:
                            (i = n + s), (r = o - s);
                            break;
                        case 3:
                            (n = i - s), (r = o - s);
                    }
                this._root && this._root.length && (this._root = l);
            }
            return (this._x0 = n), (this._y0 = r), (this._x1 = i), (this._y1 = o), this;
        }),
        (A.data = function () {
            var t = [];
            return (
                this.visit(function (e) {
                    if (!e.length)
                        do {
                            t.push(e.data);
                        } while ((e = e.next));
                }),
                t
            );
        }),
        (A.extent = function (t) {
            return arguments.length
                ? this.cover(+t[0][0], +t[0][1]).cover(+t[1][0], +t[1][1])
                : isNaN(this._x0)
                ? void 0
                : [
                      [this._x0, this._y0],
                      [this._x1, this._y1],
                  ];
        }),
        (A.find = function (t, e, n) {
            var r,
                i,
                o,
                a,
                u,
                s,
                l,
                c = this._x0,
                f = this._y0,
                d = this._x1,
                h = this._y1,
                p = [],
                g = this._root;
            for (g && p.push(new m(g, c, f, d, h)), null == n ? (n = 1 / 0) : ((c = t - n), (f = e - n), (d = t + n), (h = e + n), (n *= n)); (s = p.pop()); )
                if (!(!(g = s.node) || (i = s.x0) > d || (o = s.y0) > h || (a = s.x1) < c || (u = s.y1) < f))
                    if (g.length) {
                        var v = (i + a) / 2,
                            y = (o + u) / 2;
                        p.push(new m(g[3], v, y, a, u), new m(g[2], i, y, v, u), new m(g[1], v, o, a, y), new m(g[0], i, o, v, y)),
                            (l = ((e >= y) << 1) | (t >= v)) && ((s = p[p.length - 1]), (p[p.length - 1] = p[p.length - 1 - l]), (p[p.length - 1 - l] = s));
                    } else {
                        var b = t - +this._x.call(null, g.data),
                            w = e - +this._y.call(null, g.data),
                            _ = b * b + w * w;
                        if (_ < n) {
                            var x = Math.sqrt((n = _));
                            (c = t - x), (f = e - x), (d = t + x), (h = e + x), (r = g.data);
                        }
                    }
            return r;
        }),
        (A.remove = function (t) {
            if (isNaN((o = +this._x.call(null, t))) || isNaN((a = +this._y.call(null, t)))) return this;
            var e,
                n,
                r,
                i,
                o,
                a,
                u,
                s,
                l,
                c,
                f,
                d,
                h = this._root,
                p = this._x0,
                g = this._y0,
                v = this._x1,
                y = this._y1;
            if (!h) return this;
            if (h.length)
                for (;;) {
                    if (((l = o >= (u = (p + v) / 2)) ? (p = u) : (v = u), (c = a >= (s = (g + y) / 2)) ? (g = s) : (y = s), (e = h), !(h = h[(f = (c << 1) | l)]))) return this;
                    if (!h.length) break;
                    (e[(f + 1) & 3] || e[(f + 2) & 3] || e[(f + 3) & 3]) && ((n = e), (d = f));
                }
            for (; h.data !== t; ) if (((r = h), !(h = h.next))) return this;
            return (
                (i = h.next) && delete h.next,
                r
                    ? (i ? (r.next = i) : delete r.next, this)
                    : e
                    ? (i ? (e[f] = i) : delete e[f], (h = e[0] || e[1] || e[2] || e[3]) && h === (e[3] || e[2] || e[1] || e[0]) && !h.length && (n ? (n[d] = h) : (this._root = h)), this)
                    : ((this._root = i), this)
            );
        }),
        (A.removeAll = function (t) {
            for (var e = 0, n = t.length; e < n; ++e) this.remove(t[e]);
            return this;
        }),
        (A.root = function () {
            return this._root;
        }),
        (A.size = function () {
            var t = 0;
            return (
                this.visit(function (e) {
                    if (!e.length)
                        do {
                            ++t;
                        } while ((e = e.next));
                }),
                t
            );
        }),
        (A.visit = function (t) {
            var e,
                n,
                r,
                i,
                o,
                a,
                u = [],
                s = this._root;
            for (s && u.push(new m(s, this._x0, this._y0, this._x1, this._y1)); (e = u.pop()); )
                if (!t((s = e.node), (r = e.x0), (i = e.y0), (o = e.x1), (a = e.y1)) && s.length) {
                    var l = (r + o) / 2,
                        c = (i + a) / 2;
                    (n = s[3]) && u.push(new m(n, l, c, o, a)), (n = s[2]) && u.push(new m(n, r, c, l, a)), (n = s[1]) && u.push(new m(n, l, i, o, c)), (n = s[0]) && u.push(new m(n, r, i, l, c));
                }
            return this;
        }),
        (A.visitAfter = function (t) {
            var e,
                n = [],
                r = [];
            for (this._root && n.push(new m(this._root, this._x0, this._y0, this._x1, this._y1)); (e = n.pop()); ) {
                var i = e.node;
                if (i.length) {
                    var o,
                        a = e.x0,
                        u = e.y0,
                        s = e.x1,
                        l = e.y1,
                        c = (a + s) / 2,
                        f = (u + l) / 2;
                    (o = i[0]) && n.push(new m(o, a, u, c, f)), (o = i[1]) && n.push(new m(o, c, u, s, f)), (o = i[2]) && n.push(new m(o, a, f, c, l)), (o = i[3]) && n.push(new m(o, c, f, s, l));
                }
                r.push(e);
            }
            for (; (e = r.pop()); ) t(e.node, e.x0, e.y0, e.x1, e.y1);
            return this;
        }),
        (A.x = function (t) {
            return arguments.length ? ((this._x = t), this) : this._x;
        }),
        (A.y = function (t) {
            return arguments.length ? ((this._y = t), this) : this._y;
        });
    var B = (C.prototype = D.prototype);
    function T(t) {
        return function () {
            return t;
        };
    }
    function z(t) {
        return 1e-6 * (t() - 0.5);
    }
    function I(t) {
        return t.index;
    }
    function L(t, e) {
        var n = t.get(e);
        if (!n) throw new Error("node not found: " + e);
        return n;
    }
    function R(t) {
        var e,
            n,
            r,
            i,
            o,
            a,
            u,
            s = I,
            l = function (t) {
                return 1 / Math.min(o[t.source.index], o[t.target.index]);
            },
            c = T(30),
            f = 1;
        function d(r) {
            for (var o = 0, s = t.length; o < f; ++o)
                for (var l, c, d, h, p, g = 0, v = 0, y = 0, b = 0; g < s; ++g)
                    (c = (l = t[g]).source),
                        (v = (d = l.target).x + d.vx - c.x - c.vx || z(u)),
                        i > 1 && (y = d.y + d.vy - c.y - c.vy || z(u)),
                        i > 2 && (b = d.z + d.vz - c.z - c.vz || z(u)),
                        (v *= h = (((h = Math.sqrt(v * v + y * y + b * b)) - n[g]) / h) * r * e[g]),
                        (y *= h),
                        (b *= h),
                        (d.vx -= v * (p = a[g])),
                        i > 1 && (d.vy -= y * p),
                        i > 2 && (d.vz -= b * p),
                        (c.vx += v * (p = 1 - p)),
                        i > 1 && (c.vy += y * p),
                        i > 2 && (c.vz += b * p);
        }
        function h() {
            if (r) {
                var i,
                    u,
                    l = r.length,
                    c = t.length,
                    f = new Map(r.map((t, e) => [s(t, e, r), t]));
                for (i = 0, o = new Array(l); i < c; ++i)
                    ((u = t[i]).index = i),
                        "object" != typeof u.source && (u.source = L(f, u.source)),
                        "object" != typeof u.target && (u.target = L(f, u.target)),
                        (o[u.source.index] = (o[u.source.index] || 0) + 1),
                        (o[u.target.index] = (o[u.target.index] || 0) + 1);
                for (i = 0, a = new Array(c); i < c; ++i) (u = t[i]), (a[i] = o[u.source.index] / (o[u.source.index] + o[u.target.index]));
                (e = new Array(c)), p(), (n = new Array(c)), g();
            }
        }
        function p() {
            if (r) for (var n = 0, i = t.length; n < i; ++n) e[n] = +l(t[n], n, t);
        }
        function g() {
            if (r) for (var e = 0, i = t.length; e < i; ++e) n[e] = +c(t[e], e, t);
        }
        return (
            null == t && (t = []),
            (d.initialize = function (t, ...e) {
                (r = t), (u = e.find((t) => "function" == typeof t) || Math.random), (i = e.find((t) => [1, 2, 3].includes(t)) || 2), h();
            }),
            (d.links = function (e) {
                return arguments.length ? ((t = e), h(), d) : t;
            }),
            (d.id = function (t) {
                return arguments.length ? ((s = t), d) : s;
            }),
            (d.iterations = function (t) {
                return arguments.length ? ((f = +t), d) : f;
            }),
            (d.strength = function (t) {
                return arguments.length ? ((l = "function" == typeof t ? t : T(+t)), p(), d) : l;
            }),
            (d.distance = function (t) {
                return arguments.length ? ((c = "function" == typeof t ? t : T(+t)), g(), d) : c;
            }),
            d
        );
    }
    (B.copy = function () {
        var t,
            e,
            n = new D(this._x, this._y, this._z, this._x0, this._y0, this._z0, this._x1, this._y1, this._z1),
            r = this._root;
        if (!r) return n;
        if (!r.length) return (n._root = N(r)), n;
        for (t = [{ source: r, target: (n._root = new Array(8)) }]; (r = t.pop()); ) for (var i = 0; i < 8; ++i) (e = r.source[i]) && (e.length ? t.push({ source: e, target: (r.target[i] = new Array(8)) }) : (r.target[i] = N(e)));
        return n;
    }),
        (B.add = function (t) {
            var e = +this._x.call(null, t),
                n = +this._y.call(null, t),
                r = +this._z.call(null, t);
            return j(this.cover(e, n, r), e, n, r, t);
        }),
        (B.addAll = function (t) {
            var e,
                n,
                r,
                i,
                o,
                a = t.length,
                u = new Array(a),
                s = new Array(a),
                l = new Array(a),
                c = 1 / 0,
                f = 1 / 0,
                d = 1 / 0,
                h = -1 / 0,
                p = -1 / 0,
                g = -1 / 0;
            for (n = 0; n < a; ++n)
                isNaN((r = +this._x.call(null, (e = t[n])))) ||
                    isNaN((i = +this._y.call(null, e))) ||
                    isNaN((o = +this._z.call(null, e))) ||
                    ((u[n] = r), (s[n] = i), (l[n] = o), r < c && (c = r), r > h && (h = r), i < f && (f = i), i > p && (p = i), o < d && (d = o), o > g && (g = o));
            if (c > h || f > p || d > g) return this;
            for (this.cover(c, f, d).cover(h, p, g), n = 0; n < a; ++n) j(this, u[n], s[n], l[n], t[n]);
            return this;
        }),
        (B.cover = function (t, e, n) {
            if (isNaN((t = +t)) || isNaN((e = +e)) || isNaN((n = +n))) return this;
            var r = this._x0,
                i = this._y0,
                o = this._z0,
                a = this._x1,
                u = this._y1,
                s = this._z1;
            if (isNaN(r)) (a = (r = Math.floor(t)) + 1), (u = (i = Math.floor(e)) + 1), (s = (o = Math.floor(n)) + 1);
            else {
                for (var l, c, f = a - r || 1, d = this._root; r > t || t >= a || i > e || e >= u || o > n || n >= s; )
                    switch (((c = ((n < o) << 2) | ((e < i) << 1) | (t < r)), ((l = new Array(8))[c] = d), (d = l), (f *= 2), c)) {
                        case 0:
                            (a = r + f), (u = i + f), (s = o + f);
                            break;
                        case 1:
                            (r = a - f), (u = i + f), (s = o + f);
                            break;
                        case 2:
                            (a = r + f), (i = u - f), (s = o + f);
                            break;
                        case 3:
                            (r = a - f), (i = u - f), (s = o + f);
                            break;
                        case 4:
                            (a = r + f), (u = i + f), (o = s - f);
                            break;
                        case 5:
                            (r = a - f), (u = i + f), (o = s - f);
                            break;
                        case 6:
                            (a = r + f), (i = u - f), (o = s - f);
                            break;
                        case 7:
                            (r = a - f), (i = u - f), (o = s - f);
                    }
                this._root && this._root.length && (this._root = d);
            }
            return (this._x0 = r), (this._y0 = i), (this._z0 = o), (this._x1 = a), (this._y1 = u), (this._z1 = s), this;
        }),
        (B.data = function () {
            var t = [];
            return (
                this.visit(function (e) {
                    if (!e.length)
                        do {
                            t.push(e.data);
                        } while ((e = e.next));
                }),
                t
            );
        }),
        (B.extent = function (t) {
            return arguments.length
                ? this.cover(+t[0][0], +t[0][1], +t[0][2]).cover(+t[1][0], +t[1][1], +t[1][2])
                : isNaN(this._x0)
                ? void 0
                : [
                      [this._x0, this._y0, this._z0],
                      [this._x1, this._y1, this._z1],
                  ];
        }),
        (B.find = function (t, e, n, r) {
            var i,
                o,
                a,
                u,
                s,
                l,
                c,
                f,
                d,
                h = this._x0,
                p = this._y0,
                g = this._z0,
                v = this._x1,
                y = this._y1,
                b = this._z1,
                m = [],
                w = this._root;
            for (w && m.push(new P(w, h, p, g, v, y, b)), null == r ? (r = 1 / 0) : ((h = t - r), (p = e - r), (g = n - r), (v = t + r), (y = e + r), (b = n + r), (r *= r)); (f = m.pop()); )
                if (!(!(w = f.node) || (o = f.x0) > v || (a = f.y0) > y || (u = f.z0) > b || (s = f.x1) < h || (l = f.y1) < p || (c = f.z1) < g))
                    if (w.length) {
                        var _ = (o + s) / 2,
                            x = (a + l) / 2,
                            k = (u + c) / 2;
                        m.push(
                            new P(w[7], _, x, k, s, l, c),
                            new P(w[6], o, x, k, _, l, c),
                            new P(w[5], _, a, k, s, x, c),
                            new P(w[4], o, a, k, _, x, c),
                            new P(w[3], _, x, u, s, l, k),
                            new P(w[2], o, x, u, _, l, k),
                            new P(w[1], _, a, u, s, x, k),
                            new P(w[0], o, a, u, _, x, k)
                        ),
                            (d = ((n >= k) << 2) | ((e >= x) << 1) | (t >= _)) && ((f = m[m.length - 1]), (m[m.length - 1] = m[m.length - 1 - d]), (m[m.length - 1 - d] = f));
                    } else {
                        var O = t - +this._x.call(null, w.data),
                            A = e - +this._y.call(null, w.data),
                            j = n - +this._z.call(null, w.data),
                            M = O * O + A * A + j * j;
                        if (M < r) {
                            var S = Math.sqrt((r = M));
                            (h = t - S), (p = e - S), (g = n - S), (v = t + S), (y = e + S), (b = n + S), (i = w.data);
                        }
                    }
            return i;
        }),
        (B.remove = function (t) {
            if (isNaN((o = +this._x.call(null, t))) || isNaN((a = +this._y.call(null, t))) || isNaN((u = +this._z.call(null, t)))) return this;
            var e,
                n,
                r,
                i,
                o,
                a,
                u,
                s,
                l,
                c,
                f,
                d,
                h,
                p,
                g,
                v = this._root,
                y = this._x0,
                b = this._y0,
                m = this._z0,
                w = this._x1,
                _ = this._y1,
                x = this._z1;
            if (!v) return this;
            if (v.length)
                for (;;) {
                    if (((f = o >= (s = (y + w) / 2)) ? (y = s) : (w = s), (d = a >= (l = (b + _) / 2)) ? (b = l) : (_ = l), (h = u >= (c = (m + x) / 2)) ? (m = c) : (x = c), (e = v), !(v = v[(p = (h << 2) | (d << 1) | f)]))) return this;
                    if (!v.length) break;
                    (e[(p + 1) & 7] || e[(p + 2) & 7] || e[(p + 3) & 7] || e[(p + 4) & 7] || e[(p + 5) & 7] || e[(p + 6) & 7] || e[(p + 7) & 7]) && ((n = e), (g = p));
                }
            for (; v.data !== t; ) if (((r = v), !(v = v.next))) return this;
            return (
                (i = v.next) && delete v.next,
                r
                    ? (i ? (r.next = i) : delete r.next, this)
                    : e
                    ? (i ? (e[p] = i) : delete e[p],
                      (v = e[0] || e[1] || e[2] || e[3] || e[4] || e[5] || e[6] || e[7]) && v === (e[7] || e[6] || e[5] || e[4] || e[3] || e[2] || e[1] || e[0]) && !v.length && (n ? (n[g] = v) : (this._root = v)),
                      this)
                    : ((this._root = i), this)
            );
        }),
        (B.removeAll = function (t) {
            for (var e = 0, n = t.length; e < n; ++e) this.remove(t[e]);
            return this;
        }),
        (B.root = function () {
            return this._root;
        }),
        (B.size = function () {
            var t = 0;
            return (
                this.visit(function (e) {
                    if (!e.length)
                        do {
                            ++t;
                        } while ((e = e.next));
                }),
                t
            );
        }),
        (B.visit = function (t) {
            var e,
                n,
                r,
                i,
                o,
                a,
                u,
                s,
                l = [],
                c = this._root;
            for (c && l.push(new P(c, this._x0, this._y0, this._z0, this._x1, this._y1, this._z1)); (e = l.pop()); )
                if (!t((c = e.node), (r = e.x0), (i = e.y0), (o = e.z0), (a = e.x1), (u = e.y1), (s = e.z1)) && c.length) {
                    var f = (r + a) / 2,
                        d = (i + u) / 2,
                        h = (o + s) / 2;
                    (n = c[7]) && l.push(new P(n, f, d, h, a, u, s)),
                        (n = c[6]) && l.push(new P(n, r, d, h, f, u, s)),
                        (n = c[5]) && l.push(new P(n, f, i, h, a, d, s)),
                        (n = c[4]) && l.push(new P(n, r, i, h, f, d, s)),
                        (n = c[3]) && l.push(new P(n, f, d, o, a, u, h)),
                        (n = c[2]) && l.push(new P(n, r, d, o, f, u, h)),
                        (n = c[1]) && l.push(new P(n, f, i, o, a, d, h)),
                        (n = c[0]) && l.push(new P(n, r, i, o, f, d, h));
                }
            return this;
        }),
        (B.visitAfter = function (t) {
            var e,
                n = [],
                r = [];
            for (this._root && n.push(new P(this._root, this._x0, this._y0, this._z0, this._x1, this._y1, this._z1)); (e = n.pop()); ) {
                var i = e.node;
                if (i.length) {
                    var o,
                        a = e.x0,
                        u = e.y0,
                        s = e.z0,
                        l = e.x1,
                        c = e.y1,
                        f = e.z1,
                        d = (a + l) / 2,
                        h = (u + c) / 2,
                        p = (s + f) / 2;
                    (o = i[0]) && n.push(new P(o, a, u, s, d, h, p)),
                        (o = i[1]) && n.push(new P(o, d, u, s, l, h, p)),
                        (o = i[2]) && n.push(new P(o, a, h, s, d, c, p)),
                        (o = i[3]) && n.push(new P(o, d, h, s, l, c, p)),
                        (o = i[4]) && n.push(new P(o, a, u, p, d, h, f)),
                        (o = i[5]) && n.push(new P(o, d, u, p, l, h, f)),
                        (o = i[6]) && n.push(new P(o, a, h, p, d, c, f)),
                        (o = i[7]) && n.push(new P(o, d, h, p, l, c, f));
                }
                r.push(e);
            }
            for (; (e = r.pop()); ) t(e.node, e.x0, e.y0, e.z0, e.x1, e.y1, e.z1);
            return this;
        }),
        (B.x = function (t) {
            return arguments.length ? ((this._x = t), this) : this._x;
        }),
        (B.y = function (t) {
            return arguments.length ? ((this._y = t), this) : this._y;
        }),
        (B.z = function (t) {
            return arguments.length ? ((this._z = t), this) : this._z;
        });
    var $ = { value: () => {} };
    function F() {
        for (var t, e = 0, n = arguments.length, r = {}; e < n; ++e) {
            if (!(t = arguments[e] + "") || t in r || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
            r[t] = [];
        }
        return new q(r);
    }
    function q(t) {
        this._ = t;
    }
    function G(t, e) {
        return t
            .trim()
            .split(/^|\s+/)
            .map(function (t) {
                var n = "",
                    r = t.indexOf(".");
                if ((r >= 0 && ((n = t.slice(r + 1)), (t = t.slice(0, r))), t && !e.hasOwnProperty(t))) throw new Error("unknown type: " + t);
                return { type: t, name: n };
            });
    }
    function U(t, e) {
        for (var n, r = 0, i = t.length; r < i; ++r) if ((n = t[r]).name === e) return n.value;
    }
    function V(t, e, n) {
        for (var r = 0, i = t.length; r < i; ++r)
            if (t[r].name === e) {
                (t[r] = $), (t = t.slice(0, r).concat(t.slice(r + 1)));
                break;
            }
        return null != n && t.push({ name: e, value: n }), t;
    }
    q.prototype = F.prototype = {
        constructor: q,
        on: function (t, e) {
            var n,
                r = this._,
                i = G(t + "", r),
                o = -1,
                a = i.length;
            if (!(arguments.length < 2)) {
                if (null != e && "function" != typeof e) throw new Error("invalid callback: " + e);
                for (; ++o < a; )
                    if ((n = (t = i[o]).type)) r[n] = V(r[n], t.name, e);
                    else if (null == e) for (n in r) r[n] = V(r[n], t.name, null);
                return this;
            }
            for (; ++o < a; ) if ((n = (t = i[o]).type) && (n = U(r[n], t.name))) return n;
        },
        copy: function () {
            var t = {},
                e = this._;
            for (var n in e) t[n] = e[n].slice();
            return new q(t);
        },
        call: function (t, e) {
            if ((n = arguments.length - 2) > 0) for (var n, r, i = new Array(n), o = 0; o < n; ++o) i[o] = arguments[o + 2];
            if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
            for (o = 0, n = (r = this._[t]).length; o < n; ++o) r[o].value.apply(e, i);
        },
        apply: function (t, e, n) {
            if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
            for (var r = this._[t], i = 0, o = r.length; i < o; ++i) r[i].value.apply(e, n);
        },
    };
    var H,
        W,
        Q = 0,
        J = 0,
        X = 0,
        Y = 0,
        K = 0,
        Z = 0,
        tt = "object" == typeof performance && performance.now ? performance : Date,
        et =
            "object" == typeof window && window.requestAnimationFrame
                ? window.requestAnimationFrame.bind(window)
                : function (t) {
                      setTimeout(t, 17);
                  };
    function nt() {
        return K || (et(rt), (K = tt.now() + Z));
    }
    function rt() {
        K = 0;
    }
    function it() {
        this._call = this._time = this._next = null;
    }
    function ot(t, e, n) {
        var r = new it();
        return r.restart(t, e, n), r;
    }
    function at() {
        (K = (Y = tt.now()) + Z), (Q = J = 0);
        try {
            !(function () {
                nt(), ++Q;
                for (var t, e = H; e; ) (t = K - e._time) >= 0 && e._call.call(void 0, t), (e = e._next);
                --Q;
            })();
        } finally {
            (Q = 0),
                (function () {
                    var t,
                        e,
                        n = H,
                        r = 1 / 0;
                    for (; n; ) n._call ? (r > n._time && (r = n._time), (t = n), (n = n._next)) : ((e = n._next), (n._next = null), (n = t ? (t._next = e) : (H = e)));
                    (W = t), st(r);
                })(),
                (K = 0);
        }
    }
    function ut() {
        var t = tt.now(),
            e = t - Y;
        e > 1e3 && ((Z -= e), (Y = t));
    }
    function st(t) {
        Q || (J && (J = clearTimeout(J)), t - K > 24 ? (t < 1 / 0 && (J = setTimeout(at, t - tt.now() - Z)), X && (X = clearInterval(X))) : (X || ((Y = tt.now()), (X = setInterval(ut, 1e3))), (Q = 1), et(at)));
    }
    it.prototype = ot.prototype = {
        constructor: it,
        restart: function (t, e, n) {
            if ("function" != typeof t) throw new TypeError("callback is not a function");
            (n = (null == n ? nt() : +n) + (null == e ? 0 : +e)), this._next || W === this || (W ? (W._next = this) : (H = this), (W = this)), (this._call = t), (this._time = n), st();
        },
        stop: function () {
            this._call && ((this._call = null), (this._time = 1 / 0), st());
        },
    };
    const lt = 4294967296;
    function ct(t) {
        return t.x;
    }
    function ft(t) {
        return t.y;
    }
    function dt(t) {
        return t.z;
    }
    var ht = Math.PI * (3 - Math.sqrt(5)),
        pt = (20 * Math.PI) / (9 + Math.sqrt(221));
    function gt(t, e) {
        e = e || 2;
        var n,
            r = Math.min(3, Math.max(1, Math.round(e))),
            i = 1,
            o = 0.001,
            a = 1 - Math.pow(o, 1 / 300),
            u = 0,
            s = 0.6,
            l = new Map(),
            c = ot(h),
            f = F("tick", "end"),
            d = (function () {
                let t = 1;
                return () => (t = (1664525 * t + 1013904223) % lt) / lt;
            })();
        function h() {
            p(), f.call("tick", n), i < o && (c.stop(), f.call("end", n));
        }
        function p(e) {
            var o,
                c,
                f = t.length;
            void 0 === e && (e = 1);
            for (var d = 0; d < e; ++d)
                for (
                    i += (u - i) * a,
                        l.forEach(function (t) {
                            t(i);
                        }),
                        o = 0;
                    o < f;
                    ++o
                )
                    null == (c = t[o]).fx ? (c.x += c.vx *= s) : ((c.x = c.fx), (c.vx = 0)),
                        r > 1 && (null == c.fy ? (c.y += c.vy *= s) : ((c.y = c.fy), (c.vy = 0))),
                        r > 2 && (null == c.fz ? (c.z += c.vz *= s) : ((c.z = c.fz), (c.vz = 0)));
            return n;
        }
        function g() {
            for (var e, n = 0, i = t.length; n < i; ++n) {
                if ((((e = t[n]).index = n), null != e.fx && (e.x = e.fx), null != e.fy && (e.y = e.fy), null != e.fz && (e.z = e.fz), isNaN(e.x) || (r > 1 && isNaN(e.y)) || (r > 2 && isNaN(e.z)))) {
                    var o = 10 * (r > 2 ? Math.cbrt(0.5 + n) : r > 1 ? Math.sqrt(0.5 + n) : n),
                        a = n * ht,
                        u = n * pt;
                    1 === r ? (e.x = o) : 2 === r ? ((e.x = o * Math.cos(a)), (e.y = o * Math.sin(a))) : ((e.x = o * Math.sin(a) * Math.cos(u)), (e.y = o * Math.cos(a)), (e.z = o * Math.sin(a) * Math.sin(u)));
                }
                (isNaN(e.vx) || (r > 1 && isNaN(e.vy)) || (r > 2 && isNaN(e.vz))) && ((e.vx = 0), r > 1 && (e.vy = 0), r > 2 && (e.vz = 0));
            }
        }
        function v(e) {
            return e.initialize && e.initialize(t, d, r), e;
        }
        return (
            null == t && (t = []),
            g(),
            (n = {
                tick: p,
                restart: function () {
                    return c.restart(h), n;
                },
                stop: function () {
                    return c.stop(), n;
                },
                numDimensions: function (t) {
                    return arguments.length ? ((r = Math.min(3, Math.max(1, Math.round(t)))), l.forEach(v), n) : r;
                },
                nodes: function (e) {
                    return arguments.length ? ((t = e), g(), l.forEach(v), n) : t;
                },
                alpha: function (t) {
                    return arguments.length ? ((i = +t), n) : i;
                },
                alphaMin: function (t) {
                    return arguments.length ? ((o = +t), n) : o;
                },
                alphaDecay: function (t) {
                    return arguments.length ? ((a = +t), n) : +a;
                },
                alphaTarget: function (t) {
                    return arguments.length ? ((u = +t), n) : u;
                },
                velocityDecay: function (t) {
                    return arguments.length ? ((s = 1 - t), n) : 1 - s;
                },
                randomSource: function (t) {
                    return arguments.length ? ((d = t), l.forEach(v), n) : d;
                },
                force: function (t, e) {
                    return arguments.length > 1 ? (null == e ? l.delete(t) : l.set(t, v(e)), n) : l.get(t);
                },
                find: function () {
                    var e,
                        n,
                        i,
                        o,
                        a,
                        u,
                        s = Array.prototype.slice.call(arguments),
                        l = s.shift() || 0,
                        c = (r > 1 ? s.shift() : null) || 0,
                        f = (r > 2 ? s.shift() : null) || 0,
                        d = s.shift() || 1 / 0,
                        h = 0,
                        p = t.length;
                    for (d *= d, h = 0; h < p; ++h) (o = (e = l - (a = t[h]).x) * e + (n = c - (a.y || 0)) * n + (i = f - (a.z || 0)) * i) < d && ((u = a), (d = o));
                    return u;
                },
                on: function (t, e) {
                    return arguments.length > 1 ? (f.on(t, e), n) : f.on(t);
                },
            })
        );
    }
    function vt() {
        var t,
            e,
            n,
            r,
            i,
            o,
            a = T(-30),
            u = 1,
            s = 1 / 0,
            l = 0.81;
        function c(r) {
            var o,
                a = t.length,
                u = (1 === e ? p(t, ct) : 2 === e ? x(t, ct, ft) : 3 === e ? C(t, ct, ft, dt) : null).visitAfter(d);
            for (i = r, o = 0; o < a; ++o) (n = t[o]), u.visit(h);
        }
        function f() {
            if (t) {
                var e,
                    n,
                    r = t.length;
                for (o = new Array(r), e = 0; e < r; ++e) (n = t[e]), (o[n.index] = +a(n, e, t));
            }
        }
        function d(t) {
            var n,
                r,
                i,
                a,
                u,
                s,
                l = 0,
                c = 0,
                f = t.length;
            if (f) {
                for (i = a = u = s = 0; s < f; ++s) (n = t[s]) && (r = Math.abs(n.value)) && ((l += n.value), (c += r), (i += r * (n.x || 0)), (a += r * (n.y || 0)), (u += r * (n.z || 0)));
                (l *= Math.sqrt(4 / f)), (t.x = i / c), e > 1 && (t.y = a / c), e > 2 && (t.z = u / c);
            } else {
                ((n = t).x = n.data.x), e > 1 && (n.y = n.data.y), e > 2 && (n.z = n.data.z);
                do {
                    l += o[n.data.index];
                } while ((n = n.next));
            }
            t.value = l;
        }
        function h(t, a, c, f, d) {
            if (!t.value) return !0;
            var h = [c, f, d][e - 1],
                p = t.x - n.x,
                g = e > 1 ? t.y - n.y : 0,
                v = e > 2 ? t.z - n.z : 0,
                y = h - a,
                b = p * p + g * g + v * v;
            if ((y * y) / l < b)
                return (
                    b < s &&
                        (0 === p && (b += (p = z(r)) * p),
                        e > 1 && 0 === g && (b += (g = z(r)) * g),
                        e > 2 && 0 === v && (b += (v = z(r)) * v),
                        b < u && (b = Math.sqrt(u * b)),
                        (n.vx += (p * t.value * i) / b),
                        e > 1 && (n.vy += (g * t.value * i) / b),
                        e > 2 && (n.vz += (v * t.value * i) / b)),
                    !0
                );
            if (!(t.length || b >= s)) {
                (t.data !== n || t.next) && (0 === p && (b += (p = z(r)) * p), e > 1 && 0 === g && (b += (g = z(r)) * g), e > 2 && 0 === v && (b += (v = z(r)) * v), b < u && (b = Math.sqrt(u * b)));
                do {
                    t.data !== n && ((y = (o[t.data.index] * i) / b), (n.vx += p * y), e > 1 && (n.vy += g * y), e > 2 && (n.vz += v * y));
                } while ((t = t.next));
            }
        }
        return (
            (c.initialize = function (n, ...i) {
                (t = n), (r = i.find((t) => "function" == typeof t) || Math.random), (e = i.find((t) => [1, 2, 3].includes(t)) || 2), f();
            }),
            (c.strength = function (t) {
                return arguments.length ? ((a = "function" == typeof t ? t : T(+t)), f(), c) : a;
            }),
            (c.distanceMin = function (t) {
                return arguments.length ? ((u = t * t), c) : Math.sqrt(u);
            }),
            (c.distanceMax = function (t) {
                return arguments.length ? ((s = t * t), c) : Math.sqrt(s);
            }),
            (c.theta = function (t) {
                return arguments.length ? ((l = t * t), c) : Math.sqrt(l);
            }),
            c
        );
    }
    var yt = function (t) {
        !(function (t) {
            if (!t) throw new Error("Eventify cannot use falsy object as events subject");
            for (var e = ["on", "fire", "off"], n = 0; n < e.length; ++n) if (t.hasOwnProperty(e[n])) throw new Error("Subject cannot be eventified, since it already has property '" + e[n] + "'");
        })(t);
        var e = (function (t) {
            var e = Object.create(null);
            return {
                on: function (n, r, i) {
                    if ("function" != typeof r) throw new Error("callback is expected to be a function");
                    var o = e[n];
                    return o || (o = e[n] = []), o.push({ callback: r, ctx: i }), t;
                },
                off: function (n, r) {
                    if (void 0 === n) return (e = Object.create(null)), t;
                    if (e[n])
                        if ("function" != typeof r) delete e[n];
                        else for (var i = e[n], o = 0; o < i.length; ++o) i[o].callback === r && i.splice(o, 1);
                    return t;
                },
                fire: function (n) {
                    var r,
                        i = e[n];
                    if (!i) return t;
                    arguments.length > 1 && (r = Array.prototype.splice.call(arguments, 1));
                    for (var o = 0; o < i.length; ++o) {
                        var a = i[o];
                        a.callback.apply(a.ctx, r);
                    }
                    return t;
                },
            };
        })(t);
        return (t.on = e.on), (t.off = e.off), (t.fire = e.fire), t;
    };
    var bt = function (t) {
            "uniqueLinkId" in (t = t || {}) &&
                (console.warn(
                    "ngraph.graph: Starting from version 0.14 `uniqueLinkId` is deprecated.\nUse `multigraph` option instead\n",
                    "\n",
                    "Note: there is also change in default behavior: From now on each graph\nis considered to be not a multigraph by default (each edge is unique)."
                ),
                (t.multigraph = t.uniqueLinkId));
            void 0 === t.multigraph && (t.multigraph = !1);
            if ("function" != typeof Map) throw new Error("ngraph.graph requires `Map` to be defined. Please polyfill it before using ngraph");
            var e = new Map(),
                n = [],
                r = {},
                i = 0,
                o = t.multigraph
                    ? function (t, e, n) {
                          var i = Ot(t, e),
                              o = r.hasOwnProperty(i);
                          if (o || w(t, e)) {
                              o || (r[i] = 0);
                              var a = "@" + ++r[i];
                              i = Ot(t + a, e + a);
                          }
                          return new kt(t, e, n, i);
                      }
                    : function (t, e, n) {
                          var r = Ot(t, e);
                          return new kt(t, e, n, r);
                      },
                a = [],
                u = _,
                s = _,
                l = _,
                c = _,
                f = {
                    addNode: p,
                    addLink: function (t, e, r) {
                        l();
                        var i = g(t) || p(t),
                            a = g(e) || p(e),
                            s = o(t, e, r);
                        n.push(s), xt(i, s), t !== e && xt(a, s);
                        return u(s, "add"), c(), s;
                    },
                    removeLink: m,
                    removeNode: v,
                    getNode: g,
                    getNodeCount: y,
                    getLinkCount: b,
                    getLinksCount: b,
                    getNodesCount: y,
                    getLinks: function (t) {
                        var e = g(t);
                        return e ? e.links : null;
                    },
                    forEachNode: O,
                    forEachLinkedNode: function (t, n, r) {
                        var i = g(t);
                        if (i && i.links && "function" == typeof n)
                            return r
                                ? (function (t, n, r) {
                                      for (var i = 0; i < t.length; ++i) {
                                          var o = t[i];
                                          if (o.fromId === n && r(e.get(o.toId), o)) return !0;
                                      }
                                  })(i.links, t, n)
                                : (function (t, n, r) {
                                      for (var i = 0; i < t.length; ++i) {
                                          var o = t[i],
                                              a = o.fromId === n ? o.toId : o.fromId;
                                          if (r(e.get(a), o)) return !0;
                                      }
                                  })(i.links, t, n);
                    },
                    forEachLink: function (t) {
                        var e, r;
                        if ("function" == typeof t) for (e = 0, r = n.length; e < r; ++e) t(n[e]);
                    },
                    beginUpdate: l,
                    endUpdate: c,
                    clear: function () {
                        l(),
                            O(function (t) {
                                v(t.id);
                            }),
                            c();
                    },
                    hasLink: w,
                    hasNode: g,
                    getLink: w,
                };
            return (
                mt(f),
                (function () {
                    var t = f.on;
                    function e() {
                        return (f.beginUpdate = l = x), (f.endUpdate = c = k), (u = d), (s = h), (f.on = t), t.apply(f, arguments);
                    }
                    f.on = e;
                })(),
                f
            );
            function d(t, e) {
                a.push({ link: t, changeType: e });
            }
            function h(t, e) {
                a.push({ node: t, changeType: e });
            }
            function p(t, n) {
                if (void 0 === t) throw new Error("Invalid node identifier");
                l();
                var r = g(t);
                return r ? ((r.data = n), s(r, "update")) : ((r = new _t(t, n)), s(r, "add")), e.set(t, r), c(), r;
            }
            function g(t) {
                return e.get(t);
            }
            function v(t) {
                var n = g(t);
                if (!n) return !1;
                l();
                var r = n.links;
                if (r) {
                    n.links = null;
                    for (var i = 0; i < r.length; ++i) m(r[i]);
                }
                return e.delete(t), s(n, "remove"), c(), !0;
            }
            function y() {
                return e.size;
            }
            function b() {
                return n.length;
            }
            function m(t) {
                if (!t) return !1;
                var e = wt(t, n);
                if (e < 0) return !1;
                l(), n.splice(e, 1);
                var r = g(t.fromId),
                    i = g(t.toId);
                return r && (e = wt(t, r.links)) >= 0 && r.links.splice(e, 1), i && (e = wt(t, i.links)) >= 0 && i.links.splice(e, 1), u(t, "remove"), c(), !0;
            }
            function w(t, e) {
                var n,
                    r = g(t);
                if (!r || !r.links) return null;
                for (n = 0; n < r.links.length; ++n) {
                    var i = r.links[n];
                    if (i.fromId === t && i.toId === e) return i;
                }
                return null;
            }
            function _() {}
            function x() {
                i += 1;
            }
            function k() {
                0 === (i -= 1) && a.length > 0 && (f.fire("changed", a), (a.length = 0));
            }
            function O(t) {
                if ("function" != typeof t) throw new Error("Function is expected to iterate over graph nodes. You passed " + t);
                for (var n = e.values(), r = n.next(); !r.done; ) {
                    if (t(r.value)) return !0;
                    r = n.next();
                }
            }
        },
        mt = yt;
    function wt(t, e) {
        if (!e) return -1;
        if (e.indexOf) return e.indexOf(t);
        var n,
            r = e.length;
        for (n = 0; n < r; n += 1) if (e[n] === t) return n;
        return -1;
    }
    function _t(t, e) {
        (this.id = t), (this.links = null), (this.data = e);
    }
    function xt(t, e) {
        t.links ? t.links.push(e) : (t.links = [e]);
    }
    function kt(t, e, n, r) {
        (this.fromId = t), (this.toId = e), (this.data = n), (this.id = r);
    }
    function Ot(t, e) {
        return t.toString() + "👉 " + e.toString();
    }
    var At = { exports: {} },
        jt = { exports: {} },
        Pt = function (t) {
            return 0 === t ? "x" : 1 === t ? "y" : 2 === t ? "z" : "c" + (t + 1);
        };
    const Mt = Pt;
    var St = function (t) {
        return function (e, n) {
            let r = (n && n.indent) || 0,
                i = n && void 0 !== n.join ? n.join : "\n",
                o = Array(r + 1).join(" "),
                a = [];
            for (let n = 0; n < t; ++n) {
                let t = Mt(n),
                    r = 0 === n ? "" : o;
                a.push(r + e.replace(/{var}/g, t));
            }
            return a.join(i);
        };
    };
    const Et = St;
    function Ct(t, e) {
        return `\n${Nt(t, e)}\n${Dt(t)}\nreturn {Body: Body, Vector: Vector};\n`;
    }
    function Dt(t) {
        let e = Et(t),
            n = e("{var}", { join: ", " });
        return `\nfunction Body(${n}) {\n  this.isPinned = false;\n  this.pos = new Vector(${n});\n  this.force = new Vector();\n  this.velocity = new Vector();\n  this.mass = 1;\n\n  this.springCount = 0;\n  this.springLength = 0;\n}\n\nBody.prototype.reset = function() {\n  this.force.reset();\n  this.springCount = 0;\n  this.springLength = 0;\n}\n\nBody.prototype.setPosition = function (${n}) {\n  ${e("this.pos.{var} = {var} || 0;", { indent: 2 })}\n};`;
    }
    function Nt(t, e) {
        let n = Et(t),
            r = "";
        return (
            e &&
                (r = `${n(
                    "\n   var v{var};\nObject.defineProperty(this, '{var}', {\n  set: function(v) { \n    if (!Number.isFinite(v)) throw new Error('Cannot set non-numbers to {var}');\n    v{var} = v; \n  },\n  get: function() { return v{var}; }\n});"
                )}`),
            `function Vector(${n("{var}", {
                join: ", ",
            })}) {\n  ${r}\n    if (typeof arguments[0] === 'object') {\n      // could be another vector\n      let v = arguments[0];\n      ${n(
                'if (!Number.isFinite(v.{var})) throw new Error("Expected value is not a finite number at Vector constructor ({var})");',
                { indent: 4 }
            )}\n      ${n("this.{var} = v.{var};", { indent: 4 })}\n    } else {\n      ${n('this.{var} = typeof {var} === "number" ? {var} : 0;', {
                indent: 4,
            })}\n    }\n  }\n  \n  Vector.prototype.reset = function () {\n    ${n("this.{var} = ", { join: "" })}0;\n  };`
        );
    }
    (jt.exports = function (t, e) {
        let n = Ct(t, e),
            { Body: r } = new Function(n)();
        return r;
    }),
        (jt.exports.generateCreateBodyFunctionBody = Ct),
        (jt.exports.getVectorCode = Nt),
        (jt.exports.getBodyCode = Dt);
    var Bt = { exports: {} };
    const Tt = St,
        zt = Pt;
    function It(t) {
        let e = Tt(t),
            n = Math.pow(2, t);
        return `\n${qt()}\n${Ft(t)}\n${Lt(t)}\n${$t(t)}\n${Rt(t)}\n\nfunction createQuadTree(options, random) {\n  options = options || {};\n  options.gravity = typeof options.gravity === 'number' ? options.gravity : -1;\n  options.theta = typeof options.theta === 'number' ? options.theta : 0.8;\n\n  var gravity = options.gravity;\n  var updateQueue = [];\n  var insertStack = new InsertStack();\n  var theta = options.theta;\n\n  var nodesCache = [];\n  var currentInCache = 0;\n  var root = newNode();\n\n  return {\n    insertBodies: insertBodies,\n\n    /**\n     * Gets root node if it is present\n     */\n    getRoot: function() {\n      return root;\n    },\n\n    updateBodyForce: update,\n\n    options: function(newOptions) {\n      if (newOptions) {\n        if (typeof newOptions.gravity === 'number') {\n          gravity = newOptions.gravity;\n        }\n        if (typeof newOptions.theta === 'number') {\n          theta = newOptions.theta;\n        }\n\n        return this;\n      }\n\n      return {\n        gravity: gravity,\n        theta: theta\n      };\n    }\n  };\n\n  function newNode() {\n    // To avoid pressure on GC we reuse nodes.\n    var node = nodesCache[currentInCache];\n    if (node) {\n${(function (
            t
        ) {
            let e = [];
            for (let r = 0; r < n; ++r) e.push(`${t}quad${r} = null;`);
            return e.join("\n");
        })(
            "      node."
        )}\n      node.body = null;\n      node.mass = ${e("node.mass_{var} = ", { join: "" })}0;\n      ${e("node.min_{var} = node.max_{var} = ", { join: "" })}0;\n    } else {\n      node = new QuadNode();\n      nodesCache[currentInCache] = node;\n    }\n\n    ++currentInCache;\n    return node;\n  }\n\n  function update(sourceBody) {\n    var queue = updateQueue;\n    var v;\n    ${e("var d{var};", { indent: 4 })}\n    var r; \n    ${e("var f{var} = 0;", { indent: 4 })}\n    var queueLength = 1;\n    var shiftIdx = 0;\n    var pushIdx = 1;\n\n    queue[0] = root;\n\n    while (queueLength) {\n      var node = queue[shiftIdx];\n      var body = node.body;\n\n      queueLength -= 1;\n      shiftIdx += 1;\n      var differentBody = (body !== sourceBody);\n      if (body && differentBody) {\n        // If the current node is a leaf node (and it is not source body),\n        // calculate the force exerted by the current node on body, and add this\n        // amount to body's net force.\n        ${e("d{var} = body.pos.{var} - sourceBody.pos.{var};", { indent: 8 })}\n        r = Math.sqrt(${e("d{var} * d{var}", { join: " + " })});\n\n        if (r === 0) {\n          // Poor man's protection against zero distance.\n          ${e("d{var} = (random.nextDouble() - 0.5) / 50;", { indent: 10 })}\n          r = Math.sqrt(${e("d{var} * d{var}", { join: " + " })});\n        }\n\n        // This is standard gravitation force calculation but we divide\n        // by r^3 to save two operations when normalizing force vector.\n        v = gravity * body.mass * sourceBody.mass / (r * r * r);\n        ${e("f{var} += v * d{var};", { indent: 8 })}\n      } else if (differentBody) {\n        // Otherwise, calculate the ratio s / r,  where s is the width of the region\n        // represented by the internal node, and r is the distance between the body\n        // and the node's center-of-mass\n        ${e("d{var} = node.mass_{var} / node.mass - sourceBody.pos.{var};", { indent: 8 })}\n        r = Math.sqrt(${e("d{var} * d{var}", { join: " + " })});\n\n        if (r === 0) {\n          // Sorry about code duplication. I don't want to create many functions\n          // right away. Just want to see performance first.\n          ${e("d{var} = (random.nextDouble() - 0.5) / 50;", { indent: 10 })}\n          r = Math.sqrt(${e("d{var} * d{var}", { join: " + " })});\n        }\n        // If s / r < θ, treat this internal node as a single body, and calculate the\n        // force it exerts on sourceBody, and add this amount to sourceBody's net force.\n        if ((node.max_${zt(0)} - node.min_${zt(0)}) / r < theta) {\n          // in the if statement above we consider node's width only\n          // because the region was made into square during tree creation.\n          // Thus there is no difference between using width or height.\n          v = gravity * node.mass * sourceBody.mass / (r * r * r);\n          ${e("f{var} += v * d{var};", { indent: 10 })}\n        } else {\n          // Otherwise, run the procedure recursively on each of the current node's children.\n\n          // I intentionally unfolded this loop, to save several CPU cycles.\n${(function () {
            let t = Array(11).join(" "),
                e = [];
            for (let r = 0; r < n; ++r) e.push(t + `if (node.quad${r}) {`), e.push(t + `  queue[pushIdx] = node.quad${r};`), e.push(t + "  queueLength += 1;"), e.push(t + "  pushIdx += 1;"), e.push(t + "}");
            return e.join("\n");
        })()}\n        }\n      }\n    }\n\n    ${e("sourceBody.force.{var} += f{var};", { indent: 4 })}\n  }\n\n  function insertBodies(bodies) {\n    ${e("var {var}min = Number.MAX_VALUE;", { indent: 4 })}\n    ${e("var {var}max = Number.MIN_VALUE;", { indent: 4 })}\n    var i = bodies.length;\n\n    // To reduce quad tree depth we are looking for exact bounding box of all particles.\n    while (i--) {\n      var pos = bodies[i].pos;\n      ${e("if (pos.{var} < {var}min) {var}min = pos.{var};", { indent: 6 })}\n      ${e("if (pos.{var} > {var}max) {var}max = pos.{var};", { indent: 6 })}\n    }\n\n    // Makes the bounds square.\n    var maxSideLength = -Infinity;\n    ${e("if ({var}max - {var}min > maxSideLength) maxSideLength = {var}max - {var}min ;", { indent: 4 })}\n\n    currentInCache = 0;\n    root = newNode();\n    ${e("root.min_{var} = {var}min;", { indent: 4 })}\n    ${e("root.max_{var} = {var}min + maxSideLength;", { indent: 4 })}\n\n    i = bodies.length - 1;\n    if (i >= 0) {\n      root.body = bodies[i];\n    }\n    while (i--) {\n      insert(bodies[i], root);\n    }\n  }\n\n  function insert(newBody) {\n    insertStack.reset();\n    insertStack.push(root, newBody);\n\n    while (!insertStack.isEmpty()) {\n      var stackItem = insertStack.pop();\n      var node = stackItem.node;\n      var body = stackItem.body;\n\n      if (!node.body) {\n        // This is internal node. Update the total mass of the node and center-of-mass.\n        ${e("var {var} = body.pos.{var};", { indent: 8 })}\n        node.mass += body.mass;\n        ${e("node.mass_{var} += body.mass * {var};", { indent: 8 })}\n\n        // Recursively insert the body in the appropriate quadrant.\n        // But first find the appropriate quadrant.\n        var quadIdx = 0; // Assume we are in the 0's quad.\n        ${e("var min_{var} = node.min_{var};", { indent: 8 })}\n        ${e("var max_{var} = (min_{var} + node.max_{var}) / 2;", { indent: 8 })}\n\n${(function (
            e
        ) {
            let n = [],
                r = Array(e + 1).join(" ");
            for (let e = 0; e < t; ++e)
                n.push(r + `if (${zt(e)} > max_${zt(e)}) {`), n.push(r + `  quadIdx = quadIdx + ${Math.pow(2, e)};`), n.push(r + `  min_${zt(e)} = max_${zt(e)};`), n.push(r + `  max_${zt(e)} = node.max_${zt(e)};`), n.push(r + "}");
            return n.join("\n");
        })(
            8
        )}\n\n        var child = getChild(node, quadIdx);\n\n        if (!child) {\n          // The node is internal but this quadrant is not taken. Add\n          // subnode to it.\n          child = newNode();\n          ${e("child.min_{var} = min_{var};", { indent: 10 })}\n          ${e("child.max_{var} = max_{var};", { indent: 10 })}\n          child.body = body;\n\n          setChild(node, quadIdx, child);\n        } else {\n          // continue searching in this quadrant.\n          insertStack.push(child, body);\n        }\n      } else {\n        // We are trying to add to the leaf node.\n        // We have to convert current leaf into internal node\n        // and continue adding two nodes.\n        var oldBody = node.body;\n        node.body = null; // internal nodes do not cary bodies\n\n        if (isSamePosition(oldBody.pos, body.pos)) {\n          // Prevent infinite subdivision by bumping one node\n          // anywhere in this quadrant\n          var retriesCount = 3;\n          do {\n            var offset = random.nextDouble();\n            ${e("var d{var} = (node.max_{var} - node.min_{var}) * offset;", { indent: 12 })}\n\n            ${e("oldBody.pos.{var} = node.min_{var} + d{var};", { indent: 12 })}\n            retriesCount -= 1;\n            // Make sure we don't bump it out of the box. If we do, next iteration should fix it\n          } while (retriesCount > 0 && isSamePosition(oldBody.pos, body.pos));\n\n          if (retriesCount === 0 && isSamePosition(oldBody.pos, body.pos)) {\n            // This is very bad, we ran out of precision.\n            // if we do not return from the method we'll get into\n            // infinite loop here. So we sacrifice correctness of layout, and keep the app running\n            // Next layout iteration should get larger bounding box in the first step and fix this\n            return;\n          }\n        }\n        // Next iteration should subdivide node further.\n        insertStack.push(node, oldBody);\n        insertStack.push(node, body);\n      }\n    }\n  }\n}\nreturn createQuadTree;\n\n`;
    }
    function Lt(t) {
        let e = Tt(t);
        return `\n  function isSamePosition(point1, point2) {\n    ${e("var d{var} = Math.abs(point1.{var} - point2.{var});", { indent: 2 })}\n  \n    return ${e("d{var} < 1e-8", { join: " && " })};\n  }  \n`;
    }
    function Rt(t) {
        var e = Math.pow(2, t);
        return `\nfunction setChild(node, idx, child) {\n  ${(function () {
            let t = [];
            for (let n = 0; n < e; ++n) {
                let e = 0 === n ? "  " : "  else ";
                t.push(`${e}if (idx === ${n}) node.quad${n} = child;`);
            }
            return t.join("\n");
        })()}\n}`;
    }
    function $t(t) {
        return `function getChild(node, idx) {\n${(function () {
            let e = [],
                n = Math.pow(2, t);
            for (let t = 0; t < n; ++t) e.push(`  if (idx === ${t}) return node.quad${t};`);
            return e.join("\n");
        })()}\n  return null;\n}`;
    }
    function Ft(t) {
        let e = Tt(t),
            n = Math.pow(2, t);
        return `\nfunction QuadNode() {\n  // body stored inside this node. In quad tree only leaf nodes (by construction)\n  // contain bodies:\n  this.body = null;\n\n  // Child nodes are stored in quads. Each quad is presented by number:\n  // 0 | 1\n  // -----\n  // 2 | 3\n${(function (
            t
        ) {
            let e = [];
            for (let r = 0; r < n; ++r) e.push(`${t}quad${r} = null;`);
            return e.join("\n");
        })(
            "  this."
        )}\n\n  // Total mass of current node\n  this.mass = 0;\n\n  // Center of mass coordinates\n  ${e("this.mass_{var} = 0;", { indent: 2 })}\n\n  // bounding box coordinates\n  ${e("this.min_{var} = 0;", { indent: 2 })}\n  ${e("this.max_{var} = 0;", { indent: 2 })}\n}\n`;
    }
    function qt() {
        return "\n/**\n * Our implementation of QuadTree is non-recursive to avoid GC hit\n * This data structure represent stack of elements\n * which we are trying to insert into quad tree.\n */\nfunction InsertStack () {\n    this.stack = [];\n    this.popIdx = 0;\n}\n\nInsertStack.prototype = {\n    isEmpty: function() {\n        return this.popIdx === 0;\n    },\n    push: function (node, body) {\n        var item = this.stack[this.popIdx];\n        if (!item) {\n            // we are trying to avoid memory pressure: create new element\n            // only when absolutely necessary\n            this.stack[this.popIdx] = new InsertStackElement(node, body);\n        } else {\n            item.node = node;\n            item.body = body;\n        }\n        ++this.popIdx;\n    },\n    pop: function () {\n        if (this.popIdx > 0) {\n            return this.stack[--this.popIdx];\n        }\n    },\n    reset: function () {\n        this.popIdx = 0;\n    }\n};\n\nfunction InsertStackElement(node, body) {\n    this.node = node; // QuadTree node\n    this.body = body; // physical body which needs to be inserted to node\n}\n";
    }
    (Bt.exports = function (t) {
        let e = It(t);
        return new Function(e)();
    }),
        (Bt.exports.generateQuadTreeFunctionBody = It),
        (Bt.exports.getInsertStackCode = qt),
        (Bt.exports.getQuadNodeCode = Ft),
        (Bt.exports.isSamePosition = Lt),
        (Bt.exports.getChildBodyCode = $t),
        (Bt.exports.setChildBodyCode = Rt);
    var Gt = { exports: {} };
    (Gt.exports = function (t) {
        let e = Vt(t);
        return new Function("bodies", "settings", "random", e);
    }),
        (Gt.exports.generateFunctionBody = Vt);
    const Ut = St;
    function Vt(t) {
        let e = Ut(t);
        return `\n  var boundingBox = {\n    ${e("min_{var}: 0, max_{var}: 0,", {
            indent: 4,
        })}\n  };\n\n  return {\n    box: boundingBox,\n\n    update: updateBoundingBox,\n\n    reset: resetBoundingBox,\n\n    getBestNewPosition: function (neighbors) {\n      var ${e("base_{var} = 0", { join: ", " })};\n\n      if (neighbors.length) {\n        for (var i = 0; i < neighbors.length; ++i) {\n          let neighborPos = neighbors[i].pos;\n          ${e("base_{var} += neighborPos.{var};", { indent: 10 })}\n        }\n\n        ${e("base_{var} /= neighbors.length;", { indent: 8 })}\n      } else {\n        ${e("base_{var} = (boundingBox.min_{var} + boundingBox.max_{var}) / 2;", { indent: 8 })}\n      }\n\n      var springLength = settings.springLength;\n      return {\n        ${e("{var}: base_{var} + (random.nextDouble() - 0.5) * springLength,", { indent: 8 })}\n      };\n    }\n  };\n\n  function updateBoundingBox() {\n    var i = bodies.length;\n    if (i === 0) return; // No bodies - no borders.\n\n    ${e("var max_{var} = -Infinity;", { indent: 4 })}\n    ${e("var min_{var} = Infinity;", { indent: 4 })}\n\n    while(i--) {\n      // this is O(n), it could be done faster with quadtree, if we check the root node bounds\n      var bodyPos = bodies[i].pos;\n      ${e("if (bodyPos.{var} < min_{var}) min_{var} = bodyPos.{var};", { indent: 6 })}\n      ${e("if (bodyPos.{var} > max_{var}) max_{var} = bodyPos.{var};", { indent: 6 })}\n    }\n\n    ${e("boundingBox.min_{var} = min_{var};", { indent: 4 })}\n    ${e("boundingBox.max_{var} = max_{var};", { indent: 4 })}\n  }\n\n  function resetBoundingBox() {\n    ${e("boundingBox.min_{var} = boundingBox.max_{var} = 0;", { indent: 4 })}\n  }\n`;
    }
    var Ht = { exports: {} };
    const Wt = St;
    function Qt(t) {
        return `\n  if (!Number.isFinite(options.dragCoefficient)) throw new Error('dragCoefficient is not a finite number');\n\n  return {\n    update: function(body) {\n      ${Wt(
            t
        )("body.force.{var} -= options.dragCoefficient * body.velocity.{var};", { indent: 6 })}\n    }\n  };\n`;
    }
    (Ht.exports = function (t) {
        let e = Qt(t);
        return new Function("options", e);
    }),
        (Ht.exports.generateCreateDragForceFunctionBody = Qt);
    var Jt = { exports: {} };
    const Xt = St;
    function Yt(t) {
        let e = Xt(t);
        return `\n  if (!Number.isFinite(options.springCoefficient)) throw new Error('Spring coefficient is not a number');\n  if (!Number.isFinite(options.springLength)) throw new Error('Spring length is not a number');\n\n  return {\n    /**\n     * Updates forces acting on a spring\n     */\n    update: function (spring) {\n      var body1 = spring.from;\n      var body2 = spring.to;\n      var length = spring.length < 0 ? options.springLength : spring.length;\n      ${e(
            "var d{var} = body2.pos.{var} - body1.pos.{var};",
            { indent: 6 }
        )}\n      var r = Math.sqrt(${e("d{var} * d{var}", { join: " + " })});\n\n      if (r === 0) {\n        ${e("d{var} = (random.nextDouble() - 0.5) / 50;", { indent: 8 })}\n        r = Math.sqrt(${e("d{var} * d{var}", { join: " + " })});\n      }\n\n      var d = r - length;\n      var coefficient = ((spring.coefficient > 0) ? spring.coefficient : options.springCoefficient) * d / r;\n\n      ${e("body1.force.{var} += coefficient * d{var}", { indent: 6 })};\n      body1.springCount += 1;\n      body1.springLength += r;\n\n      ${e("body2.force.{var} -= coefficient * d{var}", { indent: 6 })};\n      body2.springCount += 1;\n      body2.springLength += r;\n    }\n  };\n`;
    }
    (Jt.exports = function (t) {
        let e = Yt(t);
        return new Function("options", "random", e);
    }),
        (Jt.exports.generateCreateSpringForceFunctionBody = Yt);
    var Kt = { exports: {} };
    const Zt = St;
    function te(t) {
        let e = Zt(t);
        return `\n  var length = bodies.length;\n  if (length === 0) return 0;\n\n  ${e("var d{var} = 0, t{var} = 0;", {
            indent: 2,
        })}\n\n  for (var i = 0; i < length; ++i) {\n    var body = bodies[i];\n    if (body.isPinned) continue;\n\n    if (adaptiveTimeStepWeight && body.springCount) {\n      timeStep = (adaptiveTimeStepWeight * body.springLength/body.springCount);\n    }\n\n    var coeff = timeStep / body.mass;\n\n    ${e("body.velocity.{var} += coeff * body.force.{var};", { indent: 4 })}\n    ${e("var v{var} = body.velocity.{var};", { indent: 4 })}\n    var v = Math.sqrt(${e("v{var} * v{var}", { join: " + " })});\n\n    if (v > 1) {\n      // We normalize it so that we move within timeStep range. \n      // for the case when v <= 1 - we let velocity to fade out.\n      ${e("body.velocity.{var} = v{var} / v;", { indent: 6 })}\n    }\n\n    ${e("d{var} = timeStep * body.velocity.{var};", { indent: 4 })}\n\n    ${e("body.pos.{var} += d{var};", { indent: 4 })}\n\n    ${e("t{var} += Math.abs(d{var});", { indent: 4 })}\n  }\n\n  return (${e("t{var} * t{var}", { join: " + " })})/length;\n`;
    }
    (Kt.exports = function (t) {
        let e = te(t);
        return new Function("bodies", "timeStep", "adaptiveTimeStepWeight", e);
    }),
        (Kt.exports.generateIntegratorFunctionBody = te);
    var ee = function (t, e, n, r) {
        (this.from = t), (this.to = e), (this.length = n), (this.coefficient = r);
    };
    var ne = function t(e, n) {
        var r;
        e || (e = {});
        if (n)
            for (r in n)
                if (n.hasOwnProperty(r)) {
                    var i = e.hasOwnProperty(r),
                        o = typeof n[r];
                    !i || typeof e[r] !== o ? (e[r] = n[r]) : "object" === o && (e[r] = t(e[r], n[r]));
                }
        return e;
    };
    var re = { exports: {} };
    function ie(t) {
        return new oe("number" == typeof t ? t : +new Date());
    }
    function oe(t) {
        this.seed = t;
    }
    function ae(t) {
        return Math.sqrt((2 * Math.PI) / t) * Math.pow((1 / Math.E) * (t + 1 / (12 * t - 1 / (10 * t))), t);
    }
    function ue() {
        var t = this.seed;
        return (
            (t =
                4294967295 &
                (3042594569 ^
                    (t =
                        ((t = 4294967295 & (((t = ((t = 4294967295 & (3345072700 ^ (t = (t + 2127912214 + (t << 12)) & 4294967295) ^ (t >>> 19))) + 374761393 + (t << 5)) & 4294967295) + 3550635116) ^ (t << 9))) + 4251993797 + (t << 3)) &
                        4294967295) ^
                    (t >>> 16))),
            (this.seed = t),
            (268435455 & t) / 268435456
        );
    }
    (re.exports = ie),
        (re.exports.random = ie),
        (re.exports.randomIterator = function (t, e) {
            var n = e || ie();
            if ("function" != typeof n.next) throw new Error("customRandom does not match expected API: next() function is missing");
            return {
                forEach: function (e) {
                    var r, i, o;
                    for (r = t.length - 1; r > 0; --r) (i = n.next(r + 1)), (o = t[i]), (t[i] = t[r]), (t[r] = o), e(o);
                    t.length && e(t[0]);
                },
                shuffle: function () {
                    var e, r, i;
                    for (e = t.length - 1; e > 0; --e) (r = n.next(e + 1)), (i = t[r]), (t[r] = t[e]), (t[e] = i);
                    return t;
                },
            };
        }),
        (oe.prototype.next = function (t) {
            return Math.floor(this.nextDouble() * t);
        }),
        (oe.prototype.nextDouble = ue),
        (oe.prototype.uniform = ue),
        (oe.prototype.gaussian = function () {
            var t, e, n;
            do {
                (e = 2 * this.nextDouble() - 1), (n = 2 * this.nextDouble() - 1), (t = e * e + n * n);
            } while (t >= 1 || 0 === t);
            return e * Math.sqrt((-2 * Math.log(t)) / t);
        }),
        (oe.prototype.levy = function () {
            var t = 1.5,
                e = Math.pow((ae(2.5) * Math.sin((Math.PI * t) / 2)) / (ae(1.25) * t * Math.pow(2, 0.25)), 1 / t);
            return (this.gaussian() * e) / Math.pow(Math.abs(this.gaussian()), 1 / t);
        });
    var se = function (t) {
            var e = ee,
                n = ne,
                r = yt;
            if (t) {
                if (void 0 !== t.springCoeff) throw new Error("springCoeff was renamed to springCoefficient");
                if (void 0 !== t.dragCoeff) throw new Error("dragCoeff was renamed to dragCoefficient");
            }
            t = n(t, { springLength: 10, springCoefficient: 0.8, gravity: -12, theta: 0.8, dragCoefficient: 0.9, timeStep: 0.5, adaptiveTimeStepWeight: 0, dimensions: 2, debug: !1 });
            var i = ge[t.dimensions];
            if (!i) {
                var o = t.dimensions;
                (i = { Body: le(o, t.debug), createQuadTree: ce(o), createBounds: fe(o), createDragForce: de(o), createSpringForce: he(o), integrate: pe(o) }), (ge[o] = i);
            }
            var a = i.Body,
                u = i.createQuadTree,
                s = i.createBounds,
                l = i.createDragForce,
                c = i.createSpringForce,
                f = i.integrate,
                d = re.exports.random(42),
                h = [],
                p = [],
                g = u(t, d),
                v = s(h, t, d),
                y = c(t, d),
                b = l(t),
                m = [],
                w = new Map(),
                _ = 0;
            O("nbody", function () {
                if (0 === h.length) return;
                g.insertBodies(h);
                var t = h.length;
                for (; t--; ) {
                    var e = h[t];
                    e.isPinned || (e.reset(), g.updateBodyForce(e), b.update(e));
                }
            }),
                O("spring", function () {
                    var t = p.length;
                    for (; t--; ) y.update(p[t]);
                });
            var x = {
                bodies: h,
                quadTree: g,
                springs: p,
                settings: t,
                addForce: O,
                removeForce: function (t) {
                    var e = m.indexOf(w.get(t));
                    if (e < 0) return;
                    m.splice(e, 1), w.delete(t);
                },
                getForces: function () {
                    return w;
                },
                step: function () {
                    for (var e = 0; e < m.length; ++e) m[e](_);
                    var n = f(h, t.timeStep, t.adaptiveTimeStepWeight);
                    return (_ += 1), n;
                },
                addBody: function (t) {
                    if (!t) throw new Error("Body is required");
                    return h.push(t), t;
                },
                addBodyAt: function (t) {
                    if (!t) throw new Error("Body position is required");
                    var e = ((t) => new a(t))(t);
                    return h.push(e), e;
                },
                removeBody: function (t) {
                    if (t) {
                        var e = h.indexOf(t);
                        if (!(e < 0)) return h.splice(e, 1), 0 === h.length && v.reset(), !0;
                    }
                },
                addSpring: function (t, n, r, i) {
                    if (!t || !n) throw new Error("Cannot add null spring to force simulator");
                    "number" != typeof r && (r = -1);
                    var o = new e(t, n, r, i >= 0 ? i : -1);
                    return p.push(o), o;
                },
                getTotalMovement: function () {
                    return 0;
                },
                removeSpring: function (t) {
                    if (t) {
                        var e = p.indexOf(t);
                        return e > -1 ? (p.splice(e, 1), !0) : void 0;
                    }
                },
                getBestNewBodyPosition: function (t) {
                    return v.getBestNewPosition(t);
                },
                getBBox: k,
                getBoundingBox: k,
                invalidateBBox: function () {
                    console.warn("invalidateBBox() is deprecated, bounds always recomputed on `getBBox()` call");
                },
                gravity: function (e) {
                    return void 0 !== e ? ((t.gravity = e), g.options({ gravity: e }), this) : t.gravity;
                },
                theta: function (e) {
                    return void 0 !== e ? ((t.theta = e), g.options({ theta: e }), this) : t.theta;
                },
                random: d,
            };
            return (
                (function (t, e) {
                    for (var n in t) ve(t, e, n);
                })(t, x),
                r(x),
                x
            );
            function k() {
                return v.update(), v.box;
            }
            function O(t, e) {
                if (w.has(t)) throw new Error("Force " + t + " is already added");
                w.set(t, e), m.push(e);
            }
        },
        le = jt.exports,
        ce = Bt.exports,
        fe = Gt.exports,
        de = Ht.exports,
        he = Jt.exports,
        pe = Kt.exports,
        ge = {};
    function ve(t, e, n) {
        if (t.hasOwnProperty(n) && "function" != typeof e[n]) {
            var r = Number.isFinite(t[n]);
            e[n] = r
                ? function (r) {
                      if (void 0 !== r) {
                          if (!Number.isFinite(r)) throw new Error("Value of " + n + " should be a valid number.");
                          return (t[n] = r), e;
                      }
                      return t[n];
                  }
                : function (r) {
                      return void 0 !== r ? ((t[n] = r), e) : t[n];
                  };
        }
    }
    (At.exports = function (t, e) {
        if (!t) throw new Error("Graph structure cannot be undefined");
        var n = ((e && e.createSimulator) || se)(e);
        if (Array.isArray(e)) throw new Error("Physics settings is expected to be an object");
        var r = function (e) {
            var n = t.getLinks(e);
            return n ? 1 + n.length / 3 : 1;
        };
        e && "function" == typeof e.nodeMass && (r = e.nodeMass);
        var i = new Map(),
            o = {},
            a = 0,
            u = n.settings.springTransform || be;
        (a = 0),
            t.forEachNode(function (t) {
                h(t.id), (a += 1);
            }),
            t.forEachLink(g),
            t.on("changed", d);
        var s = !1,
            l = {
                step: function () {
                    if (0 === a) return c(!0), !0;
                    var t = n.step();
                    (l.lastMove = t), l.fire("step");
                    var e = t / a <= 0.01;
                    return c(e), e;
                },
                getNodePosition: function (t) {
                    return b(t).pos;
                },
                setNodePosition: function (t) {
                    var e = b(t);
                    e.setPosition.apply(e, Array.prototype.slice.call(arguments, 1));
                },
                getLinkPosition: function (t) {
                    var e = o[t];
                    if (e) return { from: e.from.pos, to: e.to.pos };
                },
                getGraphRect: function () {
                    return n.getBBox();
                },
                forEachBody: f,
                pinNode: function (t, e) {
                    b(t.id).isPinned = !!e;
                },
                isNodePinned: function (t) {
                    return b(t.id).isPinned;
                },
                dispose: function () {
                    t.off("changed", d), l.fire("disposed");
                },
                getBody: function (t) {
                    return i.get(t);
                },
                getSpring: function (e, n) {
                    var r;
                    if (void 0 === n) r = "object" != typeof e ? e : e.id;
                    else {
                        var i = t.hasLink(e, n);
                        if (!i) return;
                        r = i.id;
                    }
                    return o[r];
                },
                getForceVectorLength: function () {
                    var t = 0,
                        e = 0;
                    return (
                        f(function (n) {
                            (t += Math.abs(n.force.x)), (e += Math.abs(n.force.y));
                        }),
                        Math.sqrt(t * t + e * e)
                    );
                },
                simulator: n,
                graph: t,
                lastMove: 0,
            };
        return ye(l), l;
        function c(t) {
            var e;
            s !== t && ((s = t), (e = t), l.fire("stable", e));
        }
        function f(t) {
            i.forEach(t);
        }
        function d(e) {
            for (var n = 0; n < e.length; ++n) {
                var r = e[n];
                "add" === r.changeType ? (r.node && h(r.node.id), r.link && g(r.link)) : "remove" === r.changeType && (r.node && p(r.node), r.link && v(r.link));
            }
            a = t.getNodesCount();
        }
        function h(e) {
            var r = i.get(e);
            if (!r) {
                var o = t.getNode(e);
                if (!o) throw new Error("initBody() was called with unknown node id");
                var a = o.position;
                if (!a) {
                    var u = (function (t) {
                        var e = [];
                        if (!t.links) return e;
                        for (var n = Math.min(t.links.length, 2), r = 0; r < n; ++r) {
                            var o = t.links[r],
                                a = o.fromId !== t.id ? i.get(o.fromId) : i.get(o.toId);
                            a && a.pos && e.push(a);
                        }
                        return e;
                    })(o);
                    a = n.getBestNewBodyPosition(u);
                }
                ((r = n.addBodyAt(a)).id = e),
                    i.set(e, r),
                    y(e),
                    (function (t) {
                        return t && (t.isPinned || (t.data && t.data.isPinned));
                    })(o) && (r.isPinned = !0);
            }
        }
        function p(t) {
            var e = t.id,
                r = i.get(e);
            r && (i.delete(e), n.removeBody(r));
        }
        function g(t) {
            y(t.fromId), y(t.toId);
            var e = i.get(t.fromId),
                r = i.get(t.toId),
                a = n.addSpring(e, r, t.length);
            u(t, a), (o[t.id] = a);
        }
        function v(e) {
            var r = o[e.id];
            if (r) {
                var i = t.getNode(e.fromId),
                    a = t.getNode(e.toId);
                i && y(i.id), a && y(a.id), delete o[e.id], n.removeSpring(r);
            }
        }
        function y(t) {
            var e = i.get(t);
            if (((e.mass = r(t)), Number.isNaN(e.mass))) throw new Error("Node mass should be a number");
        }
        function b(t) {
            var e = i.get(t);
            return e || (h(t), (e = i.get(t))), e;
        }
    }),
        (At.exports.simulator = se);
    var ye = yt;
    function be() {}
    var me = At.exports;
    function we(t, e, n) {
        var r, i, o, a, u;
        function s() {
            var l = Date.now() - a;
            l < e && l >= 0 ? (r = setTimeout(s, e - l)) : ((r = null), n || ((u = t.apply(o, i)), (o = i = null)));
        }
        null == e && (e = 100);
        var l = function () {
            (o = this), (i = arguments), (a = Date.now());
            var l = n && !r;
            return r || (r = setTimeout(s, e)), l && ((u = t.apply(o, i)), (o = i = null)), u;
        };
        return (
            (l.clear = function () {
                r && (clearTimeout(r), (r = null));
            }),
            (l.flush = function () {
                r && ((u = t.apply(o, i)), (o = i = null), clearTimeout(r), (r = null));
            }),
            l
        );
    }
    we.debounce = we;
    var _e = we;
    function xe(t, e) {
        return (
            (function (t) {
                if (Array.isArray(t)) return t;
            })(t) ||
            (function (t, e) {
                var n = t && (("undefined" != typeof Symbol && t[Symbol.iterator]) || t["@@iterator"]);
                if (null == n) return;
                var r,
                    i,
                    o = [],
                    a = !0,
                    u = !1;
                try {
                    for (n = n.call(t); !(a = (r = n.next()).done) && (o.push(r.value), !e || o.length !== e); a = !0);
                } catch (t) {
                    (u = !0), (i = t);
                } finally {
                    try {
                        a || null == n.return || n.return();
                    } finally {
                        if (u) throw i;
                    }
                }
                return o;
            })(t, e) ||
            (function (t, e) {
                if (!t) return;
                if ("string" == typeof t) return ke(t, e);
                var n = Object.prototype.toString.call(t).slice(8, -1);
                "Object" === n && t.constructor && (n = t.constructor.name);
                if ("Map" === n || "Set" === n) return Array.from(t);
                if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return ke(t, e);
            })(t, e) ||
            (function () {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
            })()
        );
    }
    function ke(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
        return r;
    }
    var Oe = function t(e, n) {
        var r = n.default,
            i = void 0 === r ? null : r,
            o = n.triggerUpdate,
            a = void 0 === o || o,
            u = n.onChange,
            s = void 0 === u ? function (t, e) {} : u;
        !(function (t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        })(this, t),
            (this.name = e),
            (this.defaultVal = i),
            (this.triggerUpdate = a),
            (this.onChange = s);
    };
    function Ae(t) {
        var e = t.stateInit,
            n =
                void 0 === e
                    ? function () {
                          return {};
                      }
                    : e,
            r = t.props,
            i = void 0 === r ? {} : r,
            o = t.methods,
            a = void 0 === o ? {} : o,
            u = t.aliases,
            s = void 0 === u ? {} : u,
            l = t.init,
            c = void 0 === l ? function () {} : l,
            f = t.update,
            d = void 0 === f ? function () {} : f,
            h = Object.keys(i).map(function (t) {
                return new Oe(t, i[t]);
            });
        return function () {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                e = Object.assign({}, n instanceof Function ? n(t) : n, { initialised: !1 }),
                r = {};
            function i(e) {
                return o(e, t), u(), i;
            }
            var o = function (t, n) {
                    c.call(i, t, e, n), (e.initialised = !0);
                },
                u = _e(function () {
                    e.initialised && (d.call(i, e, r), (r = {}));
                }, 1);
            return (
                h.forEach(function (t) {
                    i[t.name] = (function (t) {
                        var n = t.name,
                            o = t.triggerUpdate,
                            a = void 0 !== o && o,
                            s = t.onChange,
                            l = void 0 === s ? function (t, e) {} : s,
                            c = t.defaultVal,
                            f = void 0 === c ? null : c;
                        return function (t) {
                            var o = e[n];
                            if (!arguments.length) return o;
                            var s = void 0 === t ? f : t;
                            return (e[n] = s), l.call(i, s, e, o), !r.hasOwnProperty(n) && (r[n] = o), a && u(), i;
                        };
                    })(t);
                }),
                Object.keys(a).forEach(function (t) {
                    i[t] = function () {
                        for (var n, r = arguments.length, o = new Array(r), u = 0; u < r; u++) o[u] = arguments[u];
                        return (n = a[t]).call.apply(n, [i, e].concat(o));
                    };
                }),
                Object.entries(s).forEach(function (t) {
                    var e = xe(t, 2),
                        n = e[0],
                        r = e[1];
                    return (i[n] = i[r]);
                }),
                (i.resetProps = function () {
                    return (
                        h.forEach(function (t) {
                            i[t.name](t.defaultVal);
                        }),
                        i
                    );
                }),
                i.resetProps(),
                (e._rerender = u),
                i
            );
        };
    }
    class je extends Map {
        constructor(t, e = Me) {
            if ((super(), Object.defineProperties(this, { _intern: { value: new Map() }, _key: { value: e } }), null != t)) for (const [e, n] of t) this.set(e, n);
        }
        get(t) {
            return super.get(Pe(this, t));
        }
        has(t) {
            return super.has(Pe(this, t));
        }
        set(t, e) {
            return super.set(
                (function ({ _intern: t, _key: e }, n) {
                    const r = e(n);
                    return t.has(r) ? t.get(r) : (t.set(r, n), n);
                })(this, t),
                e
            );
        }
        delete(t) {
            return super.delete(
                (function ({ _intern: t, _key: e }, n) {
                    const r = e(n);
                    t.has(r) && ((n = t.get(n)), t.delete(r));
                    return n;
                })(this, t)
            );
        }
    }
    function Pe({ _intern: t, _key: e }, n) {
        const r = e(n);
        return t.has(r) ? t.get(r) : n;
    }
    function Me(t) {
        return null !== t && "object" == typeof t ? t.valueOf() : t;
    }
    function Se(t, e) {
        let n;
        if (void 0 === e) for (const e of t) null != e && (n < e || (void 0 === n && e >= e)) && (n = e);
        else {
            let r = -1;
            for (let i of t) null != (i = e(i, ++r, t)) && (n < i || (void 0 === n && i >= i)) && (n = i);
        }
        return n;
    }
    function Ee(t, e) {
        let n;
        if (void 0 === e) for (const e of t) null != e && (n > e || (void 0 === n && e >= e)) && (n = e);
        else {
            let r = -1;
            for (let i of t) null != (i = e(i, ++r, t)) && (n > i || (void 0 === n && i >= i)) && (n = i);
        }
        return n;
    }
    function Ce(t, e) {
        if (null == t) return {};
        var n,
            r,
            i = (function (t, e) {
                if (null == t) return {};
                var n,
                    r,
                    i = {},
                    o = Object.keys(t);
                for (r = 0; r < o.length; r++) (n = o[r]), e.indexOf(n) >= 0 || (i[n] = t[n]);
                return i;
            })(t, e);
        if (Object.getOwnPropertySymbols) {
            var o = Object.getOwnPropertySymbols(t);
            for (r = 0; r < o.length; r++) (n = o[r]), e.indexOf(n) >= 0 || (Object.prototype.propertyIsEnumerable.call(t, n) && (i[n] = t[n]));
        }
        return i;
    }
    function De(t, e) {
        return (
            (function (t) {
                if (Array.isArray(t)) return t;
            })(t) ||
            (function (t, e) {
                var n = t && (("undefined" != typeof Symbol && t[Symbol.iterator]) || t["@@iterator"]);
                if (null == n) return;
                var r,
                    i,
                    o = [],
                    a = !0,
                    u = !1;
                try {
                    for (n = n.call(t); !(a = (r = n.next()).done) && (o.push(r.value), !e || o.length !== e); a = !0);
                } catch (t) {
                    (u = !0), (i = t);
                } finally {
                    try {
                        a || null == n.return || n.return();
                    } finally {
                        if (u) throw i;
                    }
                }
                return o;
            })(t, e) ||
            Be(t, e) ||
            (function () {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
            })()
        );
    }
    function Ne(t) {
        return (
            (function (t) {
                if (Array.isArray(t)) return Te(t);
            })(t) ||
            (function (t) {
                if (("undefined" != typeof Symbol && null != t[Symbol.iterator]) || null != t["@@iterator"]) return Array.from(t);
            })(t) ||
            Be(t) ||
            (function () {
                throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
            })()
        );
    }
    function Be(t, e) {
        if (t) {
            if ("string" == typeof t) return Te(t, e);
            var n = Object.prototype.toString.call(t).slice(8, -1);
            return "Object" === n && t.constructor && (n = t.constructor.name), "Map" === n || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Te(t, e) : void 0;
        }
    }
    function Te(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
        return r;
    }
    function ze(t) {
        var e = (function (t, e) {
            if ("object" != typeof t || null === t) return t;
            var n = t[Symbol.toPrimitive];
            if (void 0 !== n) {
                var r = n.call(t, e || "default");
                if ("object" != typeof r) return r;
                throw new TypeError("@@toPrimitive must return a primitive value.");
            }
            return ("string" === e ? String : Number)(t);
        })(t, "string");
        return "symbol" == typeof e ? e : String(e);
    }
    var Ie = function () {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
            e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
            n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2],
            r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
            i = (e instanceof Array ? (e.length ? e : [void 0]) : [e]).map(function (t) {
                return { keyAccessor: t, isProp: !(t instanceof Function) };
            }),
            o = t.reduce(function (t, e) {
                var r = t,
                    o = e;
                return (
                    i.forEach(function (t, e) {
                        var a,
                            u = t.keyAccessor;
                        if (t.isProp) {
                            var s = o,
                                l = s[u],
                                c = Ce(s, [u].map(ze));
                            (a = l), (o = c);
                        } else a = u(o, e);
                        e + 1 < i.length ? (r.hasOwnProperty(a) || (r[a] = {}), (r = r[a])) : n ? (r.hasOwnProperty(a) || (r[a] = []), r[a].push(o)) : (r[a] = o);
                    }),
                    t
                );
            }, {});
        n instanceof Function &&
            (function t(e) {
                var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
                r === i.length
                    ? Object.keys(e).forEach(function (t) {
                          return (e[t] = n(e[t]));
                      })
                    : Object.values(e).forEach(function (e) {
                          return t(e, r + 1);
                      });
            })(o);
        var a = o;
        return (
            r &&
                ((a = []),
                (function t(e) {
                    var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
                    n.length === i.length
                        ? a.push({ keys: n, vals: e })
                        : Object.entries(e).forEach(function (e) {
                              var r = De(e, 2),
                                  i = r[0],
                                  o = r[1];
                              return t(o, [].concat(Ne(n), [i]));
                          });
                })(o),
                e instanceof Array && 0 === e.length && 1 === a.length && (a[0].keys = [])),
            a
        );
    };
    function Le(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(t);
            e &&
                (r = r.filter(function (e) {
                    return Object.getOwnPropertyDescriptor(t, e).enumerable;
                })),
                n.push.apply(n, r);
        }
        return n;
    }
    function Re(t, e, n) {
        return e in t ? Object.defineProperty(t, e, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (t[e] = n), t;
    }
    function $e(t, e) {
        if (null == t) return {};
        var n,
            r,
            i = (function (t, e) {
                if (null == t) return {};
                var n,
                    r,
                    i = {},
                    o = Object.keys(t);
                for (r = 0; r < o.length; r++) (n = o[r]), e.indexOf(n) >= 0 || (i[n] = t[n]);
                return i;
            })(t, e);
        if (Object.getOwnPropertySymbols) {
            var o = Object.getOwnPropertySymbols(t);
            for (r = 0; r < o.length; r++) (n = o[r]), e.indexOf(n) >= 0 || (Object.prototype.propertyIsEnumerable.call(t, n) && (i[n] = t[n]));
        }
        return i;
    }
    function Fe(t, e) {
        return (
            (function (t) {
                if (Array.isArray(t)) return t;
            })(t) ||
            (function (t, e) {
                var n = t && (("undefined" != typeof Symbol && t[Symbol.iterator]) || t["@@iterator"]);
                if (null == n) return;
                var r,
                    i,
                    o = [],
                    a = !0,
                    u = !1;
                try {
                    for (n = n.call(t); !(a = (r = n.next()).done) && (o.push(r.value), !e || o.length !== e); a = !0);
                } catch (t) {
                    (u = !0), (i = t);
                } finally {
                    try {
                        a || null == n.return || n.return();
                    } finally {
                        if (u) throw i;
                    }
                }
                return o;
            })(t, e) ||
            Ge(t, e) ||
            (function () {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
            })()
        );
    }
    function qe(t) {
        return (
            (function (t) {
                if (Array.isArray(t)) return Ue(t);
            })(t) ||
            (function (t) {
                if (("undefined" != typeof Symbol && null != t[Symbol.iterator]) || null != t["@@iterator"]) return Array.from(t);
            })(t) ||
            Ge(t) ||
            (function () {
                throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
            })()
        );
    }
    function Ge(t, e) {
        if (t) {
            if ("string" == typeof t) return Ue(t, e);
            var n = Object.prototype.toString.call(t).slice(8, -1);
            return "Object" === n && t.constructor && (n = t.constructor.name), "Map" === n || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Ue(t, e) : void 0;
        }
    }
    function Ue(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
        return r;
    }
    function Ve(t, e, n) {
        var r = n.objBindAttr,
            i = void 0 === r ? "__obj" : r,
            o = n.dataBindAttr,
            a = void 0 === o ? "__data" : o,
            u = n.idAccessor,
            s = n.purge,
            l = void 0 !== s && s,
            c = function (t) {
                return t.hasOwnProperty(a);
            },
            f = e.filter(function (t) {
                return !c(t);
            }),
            d = e.filter(c).map(function (t) {
                return t[a];
            }),
            h = l
                ? { enter: t, exit: d, update: [] }
                : (function (t, e, n) {
                      var r = { enter: [], update: [], exit: [] };
                      if (n) {
                          var i = Ie(t, n, !1),
                              o = Ie(e, n, !1),
                              a = Object.assign({}, i, o);
                          Object.entries(a).forEach(function (t) {
                              var e = Fe(t, 2),
                                  n = e[0],
                                  a = e[1],
                                  u = i.hasOwnProperty(n) ? (o.hasOwnProperty(n) ? "update" : "exit") : "enter";
                              r[u].push("update" === u ? [i[n], o[n]] : a);
                          });
                      } else {
                          var u = new Set(t),
                              s = new Set(e);
                          new Set([].concat(qe(u), qe(s))).forEach(function (t) {
                              var e = u.has(t) ? (s.has(t) ? "update" : "exit") : "enter";
                              r[e].push("update" === e ? [t, t] : t);
                          });
                      }
                      return r;
                  })(d, t, u);
        return (
            (h.update = h.update.map(function (t) {
                var e = Fe(t, 2),
                    n = e[0],
                    r = e[1];
                return n !== r && ((r[i] = n[i]), (r[i][a] = r)), r;
            })),
            (h.exit = h.exit.concat(
                f.map(function (t) {
                    return Re({}, i, t);
                })
            )),
            h
        );
    }
    function He(t, e, n, r, i) {
        var o = i.createObj,
            a =
                void 0 === o
                    ? function (t) {
                          return {};
                      }
                    : o,
            u = i.updateObj,
            s = void 0 === u ? function (t, e) {} : u,
            l = i.exitObj,
            c = void 0 === l ? function (t) {} : l,
            f = i.objBindAttr,
            d = void 0 === f ? "__obj" : f,
            h = i.dataBindAttr,
            p = void 0 === h ? "__data" : h,
            g = $e(i, ["createObj", "updateObj", "exitObj", "objBindAttr", "dataBindAttr"]),
            v = Ve(
                t,
                e,
                (function (t) {
                    for (var e = 1; e < arguments.length; e++) {
                        var n = null != arguments[e] ? arguments[e] : {};
                        e % 2
                            ? Le(Object(n), !0).forEach(function (e) {
                                  Re(t, e, n[e]);
                              })
                            : Object.getOwnPropertyDescriptors
                            ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
                            : Le(Object(n)).forEach(function (e) {
                                  Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
                              });
                    }
                    return t;
                })({ objBindAttr: d, dataBindAttr: p }, g)
            ),
            y = v.enter,
            b = v.update;
        v.exit.forEach(function (t) {
            var e = t[d];
            delete t[d], c(e), r(e);
        });
        var m = (function (t) {
            var e = [];
            return (
                t.forEach(function (t) {
                    var n = a(t);
                    n && ((n[p] = t), (t[d] = n), e.push(n));
                }),
                e
            );
        })(y);
        !(function (t) {
            t.forEach(function (t) {
                var e = t[d];
                e && ((e[p] = t), s(e, t));
            });
        })([].concat(qe(y), qe(b))),
            m.forEach(n);
    }
    function We(t, e) {
        switch (arguments.length) {
            case 0:
                break;
            case 1:
                this.range(t);
                break;
            default:
                this.range(e).domain(t);
        }
        return this;
    }
    const Qe = Symbol("implicit");
    var Je = (function (t) {
            for (var e = (t.length / 6) | 0, n = new Array(e), r = 0; r < e; ) n[r] = "#" + t.slice(6 * r, 6 * ++r);
            return n;
        })("a6cee31f78b4b2df8a33a02cfb9a99e31a1cfdbf6fff7f00cab2d66a3d9affff99b15928"),
        Xe = { exports: {} };
    !(function (t) {
        !(function (e) {
            var n = /^\s+/,
                r = /\s+$/,
                i = 0,
                o = e.round,
                a = e.min,
                u = e.max,
                s = e.random;
            function l(t, s) {
                if (((s = s || {}), (t = t || "") instanceof l)) return t;
                if (!(this instanceof l)) return new l(t, s);
                var c = (function (t) {
                    var i = { r: 0, g: 0, b: 0 },
                        o = 1,
                        s = null,
                        l = null,
                        c = null,
                        f = !1,
                        d = !1;
                    "string" == typeof t &&
                        (t = (function (t) {
                            t = t.replace(n, "").replace(r, "").toLowerCase();
                            var e,
                                i = !1;
                            if (P[t]) (t = P[t]), (i = !0);
                            else if ("transparent" == t) return { r: 0, g: 0, b: 0, a: 0, format: "name" };
                            if ((e = $.rgb.exec(t))) return { r: e[1], g: e[2], b: e[3] };
                            if ((e = $.rgba.exec(t))) return { r: e[1], g: e[2], b: e[3], a: e[4] };
                            if ((e = $.hsl.exec(t))) return { h: e[1], s: e[2], l: e[3] };
                            if ((e = $.hsla.exec(t))) return { h: e[1], s: e[2], l: e[3], a: e[4] };
                            if ((e = $.hsv.exec(t))) return { h: e[1], s: e[2], v: e[3] };
                            if ((e = $.hsva.exec(t))) return { h: e[1], s: e[2], v: e[3], a: e[4] };
                            if ((e = $.hex8.exec(t))) return { r: D(e[1]), g: D(e[2]), b: D(e[3]), a: z(e[4]), format: i ? "name" : "hex8" };
                            if ((e = $.hex6.exec(t))) return { r: D(e[1]), g: D(e[2]), b: D(e[3]), format: i ? "name" : "hex" };
                            if ((e = $.hex4.exec(t))) return { r: D(e[1] + "" + e[1]), g: D(e[2] + "" + e[2]), b: D(e[3] + "" + e[3]), a: z(e[4] + "" + e[4]), format: i ? "name" : "hex8" };
                            if ((e = $.hex3.exec(t))) return { r: D(e[1] + "" + e[1]), g: D(e[2] + "" + e[2]), b: D(e[3] + "" + e[3]), format: i ? "name" : "hex" };
                            return !1;
                        })(t));
                    "object" == typeof t &&
                        (F(t.r) && F(t.g) && F(t.b)
                            ? ((h = t.r), (p = t.g), (g = t.b), (i = { r: 255 * E(h, 255), g: 255 * E(p, 255), b: 255 * E(g, 255) }), (f = !0), (d = "%" === String(t.r).substr(-1) ? "prgb" : "rgb"))
                            : F(t.h) && F(t.s) && F(t.v)
                            ? ((s = B(t.s)),
                              (l = B(t.v)),
                              (i = (function (t, n, r) {
                                  (t = 6 * E(t, 360)), (n = E(n, 100)), (r = E(r, 100));
                                  var i = e.floor(t),
                                      o = t - i,
                                      a = r * (1 - n),
                                      u = r * (1 - o * n),
                                      s = r * (1 - (1 - o) * n),
                                      l = i % 6;
                                  return { r: 255 * [r, u, a, a, s, r][l], g: 255 * [s, r, r, u, a, a][l], b: 255 * [a, a, s, r, r, u][l] };
                              })(t.h, s, l)),
                              (f = !0),
                              (d = "hsv"))
                            : F(t.h) &&
                              F(t.s) &&
                              F(t.l) &&
                              ((s = B(t.s)),
                              (c = B(t.l)),
                              (i = (function (t, e, n) {
                                  var r, i, o;
                                  function a(t, e, n) {
                                      return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? t + 6 * (e - t) * n : n < 0.5 ? e : n < 2 / 3 ? t + (e - t) * (2 / 3 - n) * 6 : t;
                                  }
                                  if (((t = E(t, 360)), (e = E(e, 100)), (n = E(n, 100)), 0 === e)) r = i = o = n;
                                  else {
                                      var u = n < 0.5 ? n * (1 + e) : n + e - n * e,
                                          s = 2 * n - u;
                                      (r = a(s, u, t + 1 / 3)), (i = a(s, u, t)), (o = a(s, u, t - 1 / 3));
                                  }
                                  return { r: 255 * r, g: 255 * i, b: 255 * o };
                              })(t.h, s, c)),
                              (f = !0),
                              (d = "hsl")),
                        t.hasOwnProperty("a") && (o = t.a));
                    var h, p, g;
                    return (o = S(o)), { ok: f, format: t.format || d, r: a(255, u(i.r, 0)), g: a(255, u(i.g, 0)), b: a(255, u(i.b, 0)), a: o };
                })(t);
                (this._originalInput = t),
                    (this._r = c.r),
                    (this._g = c.g),
                    (this._b = c.b),
                    (this._a = c.a),
                    (this._roundA = o(100 * this._a) / 100),
                    (this._format = s.format || c.format),
                    (this._gradientType = s.gradientType),
                    this._r < 1 && (this._r = o(this._r)),
                    this._g < 1 && (this._g = o(this._g)),
                    this._b < 1 && (this._b = o(this._b)),
                    (this._ok = c.ok),
                    (this._tc_id = i++);
            }
            function c(t, e, n) {
                (t = E(t, 255)), (e = E(e, 255)), (n = E(n, 255));
                var r,
                    i,
                    o = u(t, e, n),
                    s = a(t, e, n),
                    l = (o + s) / 2;
                if (o == s) r = i = 0;
                else {
                    var c = o - s;
                    switch (((i = l > 0.5 ? c / (2 - o - s) : c / (o + s)), o)) {
                        case t:
                            r = (e - n) / c + (e < n ? 6 : 0);
                            break;
                        case e:
                            r = (n - t) / c + 2;
                            break;
                        case n:
                            r = (t - e) / c + 4;
                    }
                    r /= 6;
                }
                return { h: r, s: i, l: l };
            }
            function f(t, e, n) {
                (t = E(t, 255)), (e = E(e, 255)), (n = E(n, 255));
                var r,
                    i,
                    o = u(t, e, n),
                    s = a(t, e, n),
                    l = o,
                    c = o - s;
                if (((i = 0 === o ? 0 : c / o), o == s)) r = 0;
                else {
                    switch (o) {
                        case t:
                            r = (e - n) / c + (e < n ? 6 : 0);
                            break;
                        case e:
                            r = (n - t) / c + 2;
                            break;
                        case n:
                            r = (t - e) / c + 4;
                    }
                    r /= 6;
                }
                return { h: r, s: i, v: l };
            }
            function d(t, e, n, r) {
                var i = [N(o(t).toString(16)), N(o(e).toString(16)), N(o(n).toString(16))];
                return r && i[0].charAt(0) == i[0].charAt(1) && i[1].charAt(0) == i[1].charAt(1) && i[2].charAt(0) == i[2].charAt(1) ? i[0].charAt(0) + i[1].charAt(0) + i[2].charAt(0) : i.join("");
            }
            function h(t, e, n, r) {
                return [N(T(r)), N(o(t).toString(16)), N(o(e).toString(16)), N(o(n).toString(16))].join("");
            }
            function p(t, e) {
                e = 0 === e ? 0 : e || 10;
                var n = l(t).toHsl();
                return (n.s -= e / 100), (n.s = C(n.s)), l(n);
            }
            function g(t, e) {
                e = 0 === e ? 0 : e || 10;
                var n = l(t).toHsl();
                return (n.s += e / 100), (n.s = C(n.s)), l(n);
            }
            function v(t) {
                return l(t).desaturate(100);
            }
            function y(t, e) {
                e = 0 === e ? 0 : e || 10;
                var n = l(t).toHsl();
                return (n.l += e / 100), (n.l = C(n.l)), l(n);
            }
            function b(t, e) {
                e = 0 === e ? 0 : e || 10;
                var n = l(t).toRgb();
                return (n.r = u(0, a(255, n.r - o((-e / 100) * 255)))), (n.g = u(0, a(255, n.g - o((-e / 100) * 255)))), (n.b = u(0, a(255, n.b - o((-e / 100) * 255)))), l(n);
            }
            function m(t, e) {
                e = 0 === e ? 0 : e || 10;
                var n = l(t).toHsl();
                return (n.l -= e / 100), (n.l = C(n.l)), l(n);
            }
            function w(t, e) {
                var n = l(t).toHsl(),
                    r = (n.h + e) % 360;
                return (n.h = r < 0 ? 360 + r : r), l(n);
            }
            function _(t) {
                var e = l(t).toHsl();
                return (e.h = (e.h + 180) % 360), l(e);
            }
            function x(t) {
                var e = l(t).toHsl(),
                    n = e.h;
                return [l(t), l({ h: (n + 120) % 360, s: e.s, l: e.l }), l({ h: (n + 240) % 360, s: e.s, l: e.l })];
            }
            function k(t) {
                var e = l(t).toHsl(),
                    n = e.h;
                return [l(t), l({ h: (n + 90) % 360, s: e.s, l: e.l }), l({ h: (n + 180) % 360, s: e.s, l: e.l }), l({ h: (n + 270) % 360, s: e.s, l: e.l })];
            }
            function O(t) {
                var e = l(t).toHsl(),
                    n = e.h;
                return [l(t), l({ h: (n + 72) % 360, s: e.s, l: e.l }), l({ h: (n + 216) % 360, s: e.s, l: e.l })];
            }
            function A(t, e, n) {
                (e = e || 6), (n = n || 30);
                var r = l(t).toHsl(),
                    i = 360 / n,
                    o = [l(t)];
                for (r.h = (r.h - ((i * e) >> 1) + 720) % 360; --e; ) (r.h = (r.h + i) % 360), o.push(l(r));
                return o;
            }
            function j(t, e) {
                e = e || 6;
                for (var n = l(t).toHsv(), r = n.h, i = n.s, o = n.v, a = [], u = 1 / e; e--; ) a.push(l({ h: r, s: i, v: o })), (o = (o + u) % 1);
                return a;
            }
            (l.prototype = {
                isDark: function () {
                    return this.getBrightness() < 128;
                },
                isLight: function () {
                    return !this.isDark();
                },
                isValid: function () {
                    return this._ok;
                },
                getOriginalInput: function () {
                    return this._originalInput;
                },
                getFormat: function () {
                    return this._format;
                },
                getAlpha: function () {
                    return this._a;
                },
                getBrightness: function () {
                    var t = this.toRgb();
                    return (299 * t.r + 587 * t.g + 114 * t.b) / 1e3;
                },
                getLuminance: function () {
                    var t,
                        n,
                        r,
                        i = this.toRgb();
                    return (
                        (t = i.r / 255),
                        (n = i.g / 255),
                        (r = i.b / 255),
                        0.2126 * (t <= 0.03928 ? t / 12.92 : e.pow((t + 0.055) / 1.055, 2.4)) + 0.7152 * (n <= 0.03928 ? n / 12.92 : e.pow((n + 0.055) / 1.055, 2.4)) + 0.0722 * (r <= 0.03928 ? r / 12.92 : e.pow((r + 0.055) / 1.055, 2.4))
                    );
                },
                setAlpha: function (t) {
                    return (this._a = S(t)), (this._roundA = o(100 * this._a) / 100), this;
                },
                toHsv: function () {
                    var t = f(this._r, this._g, this._b);
                    return { h: 360 * t.h, s: t.s, v: t.v, a: this._a };
                },
                toHsvString: function () {
                    var t = f(this._r, this._g, this._b),
                        e = o(360 * t.h),
                        n = o(100 * t.s),
                        r = o(100 * t.v);
                    return 1 == this._a ? "hsv(" + e + ", " + n + "%, " + r + "%)" : "hsva(" + e + ", " + n + "%, " + r + "%, " + this._roundA + ")";
                },
                toHsl: function () {
                    var t = c(this._r, this._g, this._b);
                    return { h: 360 * t.h, s: t.s, l: t.l, a: this._a };
                },
                toHslString: function () {
                    var t = c(this._r, this._g, this._b),
                        e = o(360 * t.h),
                        n = o(100 * t.s),
                        r = o(100 * t.l);
                    return 1 == this._a ? "hsl(" + e + ", " + n + "%, " + r + "%)" : "hsla(" + e + ", " + n + "%, " + r + "%, " + this._roundA + ")";
                },
                toHex: function (t) {
                    return d(this._r, this._g, this._b, t);
                },
                toHexString: function (t) {
                    return "#" + this.toHex(t);
                },
                toHex8: function (t) {
                    return (function (t, e, n, r, i) {
                        var a = [N(o(t).toString(16)), N(o(e).toString(16)), N(o(n).toString(16)), N(T(r))];
                        if (i && a[0].charAt(0) == a[0].charAt(1) && a[1].charAt(0) == a[1].charAt(1) && a[2].charAt(0) == a[2].charAt(1) && a[3].charAt(0) == a[3].charAt(1))
                            return a[0].charAt(0) + a[1].charAt(0) + a[2].charAt(0) + a[3].charAt(0);
                        return a.join("");
                    })(this._r, this._g, this._b, this._a, t);
                },
                toHex8String: function (t) {
                    return "#" + this.toHex8(t);
                },
                toRgb: function () {
                    return { r: o(this._r), g: o(this._g), b: o(this._b), a: this._a };
                },
                toRgbString: function () {
                    return 1 == this._a ? "rgb(" + o(this._r) + ", " + o(this._g) + ", " + o(this._b) + ")" : "rgba(" + o(this._r) + ", " + o(this._g) + ", " + o(this._b) + ", " + this._roundA + ")";
                },
                toPercentageRgb: function () {
                    return { r: o(100 * E(this._r, 255)) + "%", g: o(100 * E(this._g, 255)) + "%", b: o(100 * E(this._b, 255)) + "%", a: this._a };
                },
                toPercentageRgbString: function () {
                    return 1 == this._a
                        ? "rgb(" + o(100 * E(this._r, 255)) + "%, " + o(100 * E(this._g, 255)) + "%, " + o(100 * E(this._b, 255)) + "%)"
                        : "rgba(" + o(100 * E(this._r, 255)) + "%, " + o(100 * E(this._g, 255)) + "%, " + o(100 * E(this._b, 255)) + "%, " + this._roundA + ")";
                },
                toName: function () {
                    return 0 === this._a ? "transparent" : !(this._a < 1) && (M[d(this._r, this._g, this._b, !0)] || !1);
                },
                toFilter: function (t) {
                    var e = "#" + h(this._r, this._g, this._b, this._a),
                        n = e,
                        r = this._gradientType ? "GradientType = 1, " : "";
                    if (t) {
                        var i = l(t);
                        n = "#" + h(i._r, i._g, i._b, i._a);
                    }
                    return "progid:DXImageTransform.Microsoft.gradient(" + r + "startColorstr=" + e + ",endColorstr=" + n + ")";
                },
                toString: function (t) {
                    var e = !!t;
                    t = t || this._format;
                    var n = !1,
                        r = this._a < 1 && this._a >= 0;
                    return e || !r || ("hex" !== t && "hex6" !== t && "hex3" !== t && "hex4" !== t && "hex8" !== t && "name" !== t)
                        ? ("rgb" === t && (n = this.toRgbString()),
                          "prgb" === t && (n = this.toPercentageRgbString()),
                          ("hex" !== t && "hex6" !== t) || (n = this.toHexString()),
                          "hex3" === t && (n = this.toHexString(!0)),
                          "hex4" === t && (n = this.toHex8String(!0)),
                          "hex8" === t && (n = this.toHex8String()),
                          "name" === t && (n = this.toName()),
                          "hsl" === t && (n = this.toHslString()),
                          "hsv" === t && (n = this.toHsvString()),
                          n || this.toHexString())
                        : "name" === t && 0 === this._a
                        ? this.toName()
                        : this.toRgbString();
                },
                clone: function () {
                    return l(this.toString());
                },
                _applyModification: function (t, e) {
                    var n = t.apply(null, [this].concat([].slice.call(e)));
                    return (this._r = n._r), (this._g = n._g), (this._b = n._b), this.setAlpha(n._a), this;
                },
                lighten: function () {
                    return this._applyModification(y, arguments);
                },
                brighten: function () {
                    return this._applyModification(b, arguments);
                },
                darken: function () {
                    return this._applyModification(m, arguments);
                },
                desaturate: function () {
                    return this._applyModification(p, arguments);
                },
                saturate: function () {
                    return this._applyModification(g, arguments);
                },
                greyscale: function () {
                    return this._applyModification(v, arguments);
                },
                spin: function () {
                    return this._applyModification(w, arguments);
                },
                _applyCombination: function (t, e) {
                    return t.apply(null, [this].concat([].slice.call(e)));
                },
                analogous: function () {
                    return this._applyCombination(A, arguments);
                },
                complement: function () {
                    return this._applyCombination(_, arguments);
                },
                monochromatic: function () {
                    return this._applyCombination(j, arguments);
                },
                splitcomplement: function () {
                    return this._applyCombination(O, arguments);
                },
                triad: function () {
                    return this._applyCombination(x, arguments);
                },
                tetrad: function () {
                    return this._applyCombination(k, arguments);
                },
            }),
                (l.fromRatio = function (t, e) {
                    if ("object" == typeof t) {
                        var n = {};
                        for (var r in t) t.hasOwnProperty(r) && (n[r] = "a" === r ? t[r] : B(t[r]));
                        t = n;
                    }
                    return l(t, e);
                }),
                (l.equals = function (t, e) {
                    return !(!t || !e) && l(t).toRgbString() == l(e).toRgbString();
                }),
                (l.random = function () {
                    return l.fromRatio({ r: s(), g: s(), b: s() });
                }),
                (l.mix = function (t, e, n) {
                    n = 0 === n ? 0 : n || 50;
                    var r = l(t).toRgb(),
                        i = l(e).toRgb(),
                        o = n / 100;
                    return l({ r: (i.r - r.r) * o + r.r, g: (i.g - r.g) * o + r.g, b: (i.b - r.b) * o + r.b, a: (i.a - r.a) * o + r.a });
                }),
                // <http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef (WCAG Version 2)
                // Analyze the 2 colors and returns the color contrast defined by (WCAG Version 2)
                (l.readability = function (t, n) {
                    var r = l(t),
                        i = l(n);
                    return (e.max(r.getLuminance(), i.getLuminance()) + 0.05) / (e.min(r.getLuminance(), i.getLuminance()) + 0.05);
                }),
                (l.isReadable = function (t, e, n) {
                    var r,
                        i,
                        o = l.readability(t, e);
                    switch (
                        ((i = !1),
                        (r = (function (t) {
                            var e, n;
                            (e = ((t = t || { level: "AA", size: "small" }).level || "AA").toUpperCase()), (n = (t.size || "small").toLowerCase()), "AA" !== e && "AAA" !== e && (e = "AA");
                            "small" !== n && "large" !== n && (n = "small");
                            return { level: e, size: n };
                        })(n)).level + r.size)
                    ) {
                        case "AAsmall":
                        case "AAAlarge":
                            i = o >= 4.5;
                            break;
                        case "AAlarge":
                            i = o >= 3;
                            break;
                        case "AAAsmall":
                            i = o >= 7;
                    }
                    return i;
                }),
                (l.mostReadable = function (t, e, n) {
                    var r,
                        i,
                        o,
                        a,
                        u = null,
                        s = 0;
                    (i = (n = n || {}).includeFallbackColors), (o = n.level), (a = n.size);
                    for (var c = 0; c < e.length; c++) (r = l.readability(t, e[c])) > s && ((s = r), (u = l(e[c])));
                    return l.isReadable(t, u, { level: o, size: a }) || !i ? u : ((n.includeFallbackColors = !1), l.mostReadable(t, ["#fff", "#000"], n));
                });
            var P = (l.names = {
                    aliceblue: "f0f8ff",
                    antiquewhite: "faebd7",
                    aqua: "0ff",
                    aquamarine: "7fffd4",
                    azure: "f0ffff",
                    beige: "f5f5dc",
                    bisque: "ffe4c4",
                    black: "000",
                    blanchedalmond: "ffebcd",
                    blue: "00f",
                    blueviolet: "8a2be2",
                    brown: "a52a2a",
                    burlywood: "deb887",
                    burntsienna: "ea7e5d",
                    cadetblue: "5f9ea0",
                    chartreuse: "7fff00",
                    chocolate: "d2691e",
                    coral: "ff7f50",
                    cornflowerblue: "6495ed",
                    cornsilk: "fff8dc",
                    crimson: "dc143c",
                    cyan: "0ff",
                    darkblue: "00008b",
                    darkcyan: "008b8b",
                    darkgoldenrod: "b8860b",
                    darkgray: "a9a9a9",
                    darkgreen: "006400",
                    darkgrey: "a9a9a9",
                    darkkhaki: "bdb76b",
                    darkmagenta: "8b008b",
                    darkolivegreen: "556b2f",
                    darkorange: "ff8c00",
                    darkorchid: "9932cc",
                    darkred: "8b0000",
                    darksalmon: "e9967a",
                    darkseagreen: "8fbc8f",
                    darkslateblue: "483d8b",
                    darkslategray: "2f4f4f",
                    darkslategrey: "2f4f4f",
                    darkturquoise: "00ced1",
                    darkviolet: "9400d3",
                    deeppink: "ff1493",
                    deepskyblue: "00bfff",
                    dimgray: "696969",
                    dimgrey: "696969",
                    dodgerblue: "1e90ff",
                    firebrick: "b22222",
                    floralwhite: "fffaf0",
                    forestgreen: "228b22",
                    fuchsia: "f0f",
                    gainsboro: "dcdcdc",
                    ghostwhite: "f8f8ff",
                    gold: "ffd700",
                    goldenrod: "daa520",
                    gray: "808080",
                    green: "008000",
                    greenyellow: "adff2f",
                    grey: "808080",
                    honeydew: "f0fff0",
                    hotpink: "ff69b4",
                    indianred: "cd5c5c",
                    indigo: "4b0082",
                    ivory: "fffff0",
                    khaki: "f0e68c",
                    lavender: "e6e6fa",
                    lavenderblush: "fff0f5",
                    lawngreen: "7cfc00",
                    lemonchiffon: "fffacd",
                    lightblue: "add8e6",
                    lightcoral: "f08080",
                    lightcyan: "e0ffff",
                    lightgoldenrodyellow: "fafad2",
                    lightgray: "d3d3d3",
                    lightgreen: "90ee90",
                    lightgrey: "d3d3d3",
                    lightpink: "ffb6c1",
                    lightsalmon: "ffa07a",
                    lightseagreen: "20b2aa",
                    lightskyblue: "87cefa",
                    lightslategray: "789",
                    lightslategrey: "789",
                    lightsteelblue: "b0c4de",
                    lightyellow: "ffffe0",
                    lime: "0f0",
                    limegreen: "32cd32",
                    linen: "faf0e6",
                    magenta: "f0f",
                    maroon: "800000",
                    mediumaquamarine: "66cdaa",
                    mediumblue: "0000cd",
                    mediumorchid: "ba55d3",
                    mediumpurple: "9370db",
                    mediumseagreen: "3cb371",
                    mediumslateblue: "7b68ee",
                    mediumspringgreen: "00fa9a",
                    mediumturquoise: "48d1cc",
                    mediumvioletred: "c71585",
                    midnightblue: "191970",
                    mintcream: "f5fffa",
                    mistyrose: "ffe4e1",
                    moccasin: "ffe4b5",
                    navajowhite: "ffdead",
                    navy: "000080",
                    oldlace: "fdf5e6",
                    olive: "808000",
                    olivedrab: "6b8e23",
                    orange: "ffa500",
                    orangered: "ff4500",
                    orchid: "da70d6",
                    palegoldenrod: "eee8aa",
                    palegreen: "98fb98",
                    paleturquoise: "afeeee",
                    palevioletred: "db7093",
                    papayawhip: "ffefd5",
                    peachpuff: "ffdab9",
                    peru: "cd853f",
                    pink: "ffc0cb",
                    plum: "dda0dd",
                    powderblue: "b0e0e6",
                    purple: "800080",
                    rebeccapurple: "663399",
                    red: "f00",
                    rosybrown: "bc8f8f",
                    royalblue: "4169e1",
                    saddlebrown: "8b4513",
                    salmon: "fa8072",
                    sandybrown: "f4a460",
                    seagreen: "2e8b57",
                    seashell: "fff5ee",
                    sienna: "a0522d",
                    silver: "c0c0c0",
                    skyblue: "87ceeb",
                    slateblue: "6a5acd",
                    slategray: "708090",
                    slategrey: "708090",
                    snow: "fffafa",
                    springgreen: "00ff7f",
                    steelblue: "4682b4",
                    tan: "d2b48c",
                    teal: "008080",
                    thistle: "d8bfd8",
                    tomato: "ff6347",
                    turquoise: "40e0d0",
                    violet: "ee82ee",
                    wheat: "f5deb3",
                    white: "fff",
                    whitesmoke: "f5f5f5",
                    yellow: "ff0",
                    yellowgreen: "9acd32",
                }),
                M = (l.hexNames = (function (t) {
                    var e = {};
                    for (var n in t) t.hasOwnProperty(n) && (e[t[n]] = n);
                    return e;
                })(P));
            function S(t) {
                return (t = parseFloat(t)), (isNaN(t) || t < 0 || t > 1) && (t = 1), t;
            }
            function E(t, n) {
                (function (t) {
                    return "string" == typeof t && -1 != t.indexOf(".") && 1 === parseFloat(t);
                })(t) && (t = "100%");
                var r = (function (t) {
                    return "string" == typeof t && -1 != t.indexOf("%");
                })(t);
                return (t = a(n, u(0, parseFloat(t)))), r && (t = parseInt(t * n, 10) / 100), e.abs(t - n) < 1e-6 ? 1 : (t % n) / parseFloat(n);
            }
            function C(t) {
                return a(1, u(0, t));
            }
            function D(t) {
                return parseInt(t, 16);
            }
            function N(t) {
                return 1 == t.length ? "0" + t : "" + t;
            }
            function B(t) {
                return t <= 1 && (t = 100 * t + "%"), t;
            }
            function T(t) {
                return e.round(255 * parseFloat(t)).toString(16);
            }
            function z(t) {
                return D(t) / 255;
            }
            var I,
                L,
                R,
                $ =
                    ((L = "[\\s|\\(]+(" + (I = "(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)") + ")[,|\\s]+(" + I + ")[,|\\s]+(" + I + ")\\s*\\)?"),
                    (R = "[\\s|\\(]+(" + I + ")[,|\\s]+(" + I + ")[,|\\s]+(" + I + ")[,|\\s]+(" + I + ")\\s*\\)?"),
                    {
                        CSS_UNIT: new RegExp(I),
                        rgb: new RegExp("rgb" + L),
                        rgba: new RegExp("rgba" + R),
                        hsl: new RegExp("hsl" + L),
                        hsla: new RegExp("hsla" + R),
                        hsv: new RegExp("hsv" + L),
                        hsva: new RegExp("hsva" + R),
                        hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
                        hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
                        hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
                        hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
                    });
            function F(t) {
                return !!$.CSS_UNIT.exec(t);
            }
            t.exports ? (t.exports = l) : (window.tinycolor = l);
        })(Math);
    })(Xe);
    var Ye = Xe.exports;
    function Ke(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(t);
            e &&
                (r = r.filter(function (e) {
                    return Object.getOwnPropertyDescriptor(t, e).enumerable;
                })),
                n.push.apply(n, r);
        }
        return n;
    }
    function Ze(t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = null != arguments[e] ? arguments[e] : {};
            e % 2
                ? Ke(Object(n), !0).forEach(function (e) {
                      nn(t, e, n[e]);
                  })
                : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
                : Ke(Object(n)).forEach(function (e) {
                      Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
                  });
        }
        return t;
    }
    function tn(t) {
        return (tn =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (t) {
                      return typeof t;
                  }
                : function (t) {
                      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
                  })(t);
    }
    function en(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
    }
    function nn(t, e, n) {
        return e in t ? Object.defineProperty(t, e, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (t[e] = n), t;
    }
    function rn(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
        (t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } })), e && an(t, e);
    }
    function on(t) {
        return (on = Object.setPrototypeOf
            ? Object.getPrototypeOf
            : function (t) {
                  return t.__proto__ || Object.getPrototypeOf(t);
              })(t);
    }
    function an(t, e) {
        return (an =
            Object.setPrototypeOf ||
            function (t, e) {
                return (t.__proto__ = e), t;
            })(t, e);
    }
    function un() {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
            return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
        } catch (t) {
            return !1;
        }
    }
    function sn(t, e, n) {
        return (sn = un()
            ? Reflect.construct
            : function (t, e, n) {
                  var r = [null];
                  r.push.apply(r, e);
                  var i = new (Function.bind.apply(t, r))();
                  return n && an(i, n.prototype), i;
              }).apply(null, arguments);
    }
    function ln(t, e) {
        if (null == t) return {};
        var n,
            r,
            i = (function (t, e) {
                if (null == t) return {};
                var n,
                    r,
                    i = {},
                    o = Object.keys(t);
                for (r = 0; r < o.length; r++) (n = o[r]), e.indexOf(n) >= 0 || (i[n] = t[n]);
                return i;
            })(t, e);
        if (Object.getOwnPropertySymbols) {
            var o = Object.getOwnPropertySymbols(t);
            for (r = 0; r < o.length; r++) (n = o[r]), e.indexOf(n) >= 0 || (Object.prototype.propertyIsEnumerable.call(t, n) && (i[n] = t[n]));
        }
        return i;
    }
    function cn(t) {
        if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t;
    }
    function fn(t, e) {
        return !e || ("object" != typeof e && "function" != typeof e) ? cn(t) : e;
    }
    function dn(t) {
        var e = un();
        return function () {
            var n,
                r = on(t);
            if (e) {
                var i = on(this).constructor;
                n = Reflect.construct(r, arguments, i);
            } else n = r.apply(this, arguments);
            return fn(this, n);
        };
    }
    function hn(t, e) {
        return (
            (function (t) {
                if (Array.isArray(t)) return t;
            })(t) ||
            (function (t, e) {
                var n = null == t ? null : ("undefined" != typeof Symbol && t[Symbol.iterator]) || t["@@iterator"];
                if (null == n) return;
                var r,
                    i,
                    o = [],
                    a = !0,
                    u = !1;
                try {
                    for (n = n.call(t); !(a = (r = n.next()).done) && (o.push(r.value), !e || o.length !== e); a = !0);
                } catch (t) {
                    (u = !0), (i = t);
                } finally {
                    try {
                        a || null == n.return || n.return();
                    } finally {
                        if (u) throw i;
                    }
                }
                return o;
            })(t, e) ||
            gn(t, e) ||
            (function () {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
            })()
        );
    }
    function pn(t) {
        return (
            (function (t) {
                if (Array.isArray(t)) return vn(t);
            })(t) ||
            (function (t) {
                if (("undefined" != typeof Symbol && null != t[Symbol.iterator]) || null != t["@@iterator"]) return Array.from(t);
            })(t) ||
            gn(t) ||
            (function () {
                throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
            })()
        );
    }
    function gn(t, e) {
        if (t) {
            if ("string" == typeof t) return vn(t, e);
            var n = Object.prototype.toString.call(t).slice(8, -1);
            return "Object" === n && t.constructor && (n = t.constructor.name), "Map" === n || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? vn(t, e) : void 0;
        }
    }
    function vn(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
        return r;
    }
    var yn = function t(e) {
            e instanceof Array ? e.forEach(t) : (e.map && e.map.dispose(), e.dispose());
        },
        bn = function t(e) {
            e.geometry && e.geometry.dispose(), e.material && yn(e.material), e.texture && e.texture.dispose(), e.children && e.children.forEach(t);
        },
        mn = function (t) {
            for (; t.children.length; ) {
                var e = t.children[0];
                t.remove(e), bn(e);
            }
        },
        wn = ["objFilter"];
    function _n(t, e) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
            r = n.objFilter,
            i =
                void 0 === r
                    ? function () {
                          return !0;
                      }
                    : r,
            o = ln(n, wn);
        return He(
            t,
            e.children.filter(i),
            function (t) {
                return e.add(t);
            },
            function (t) {
                e.remove(t), mn(t);
            },
            Ze({ objBindAttr: "__threeObj" }, o)
        );
    }
    var xn = function (t) {
            return isNaN(t) ? parseInt(Ye(t).toHex(), 16) : t;
        },
        kn = function (t) {
            return isNaN(t) ? Ye(t).getAlpha() : 1;
        },
        On = (function t() {
            var e = new je(),
                n = [],
                r = [],
                i = Qe;
            function o(t) {
                let o = e.get(t);
                if (void 0 === o) {
                    if (i !== Qe) return i;
                    e.set(t, (o = n.push(t) - 1));
                }
                return r[o % r.length];
            }
            return (
                (o.domain = function (t) {
                    if (!arguments.length) return n.slice();
                    (n = []), (e = new je());
                    for (const r of t) e.has(r) || e.set(r, n.push(r) - 1);
                    return o;
                }),
                (o.range = function (t) {
                    return arguments.length ? ((r = Array.from(t)), o) : r.slice();
                }),
                (o.unknown = function (t) {
                    return arguments.length ? ((i = t), o) : i;
                }),
                (o.copy = function () {
                    return t(n, r).unknown(i);
                }),
                We.apply(o, arguments),
                o
            );
        })(Je);
    function An(t, e, n) {
        e &&
            "string" == typeof n &&
            t
                .filter(function (t) {
                    return !t[n];
                })
                .forEach(function (t) {
                    t[n] = On(e(t));
                });
    }
    var jn = window.THREE
            ? window.THREE
            : {
                  Group: t.Group,
                  Mesh: t.Mesh,
                  MeshLambertMaterial: t.MeshLambertMaterial,
                  Color: t.Color,
                  BufferGeometry: t.BufferGeometry,
                  BufferAttribute: t.BufferAttribute,
                  Matrix4: t.Matrix4,
                  Vector3: t.Vector3,
                  SphereBufferGeometry: t.SphereBufferGeometry,
                  CylinderBufferGeometry: t.CylinderBufferGeometry,
                  TubeBufferGeometry: t.TubeBufferGeometry,
                  ConeBufferGeometry: t.ConeBufferGeometry,
                  Line: t.Line,
                  LineBasicMaterial: t.LineBasicMaterial,
                  QuadraticBezierCurve3: t.QuadraticBezierCurve3,
                  CubicBezierCurve3: t.CubicBezierCurve3,
                  Box3: t.Box3,
              },
        Pn = { graph: bt, forcelayout: me },
        Mn = new jn.BufferGeometry().setAttribute ? "setAttribute" : "addAttribute",
        Sn = new jn.BufferGeometry().applyMatrix4 ? "applyMatrix4" : "applyMatrix";
    var En = (function (t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : Object,
                n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                r = (function (e) {
                    rn(i, e);
                    var r = dn(i);
                    function i() {
                        var e;
                        en(this, i);
                        for (var o = arguments.length, a = new Array(o), u = 0; u < o; u++) a[u] = arguments[u];
                        return ((e = r.call.apply(r, [this].concat(a))).__kapsuleInstance = t().apply(void 0, [].concat(pn(n ? [cn(e)] : []), a))), e;
                    }
                    return i;
                })(e);
            return (
                Object.keys(t()).forEach(function (t) {
                    return (r.prototype[t] = function () {
                        var e,
                            n = (e = this.__kapsuleInstance)[t].apply(e, arguments);
                        return n === this.__kapsuleInstance ? this : n;
                    });
                }),
                r
            );
        })(
            Ae({
                props: {
                    jsonUrl: {
                        onChange: function (t, e) {
                            var n = this;
                            t &&
                                !e.fetchingJson &&
                                ((e.fetchingJson = !0),
                                e.onLoading(),
                                fetch(t)
                                    .then(function (t) {
                                        return t.json();
                                    })
                                    .then(function (t) {
                                        (e.fetchingJson = !1), e.onFinishLoading(t), n.graphData(t);
                                    }));
                        },
                        triggerUpdate: !1,
                    },
                    graphData: {
                        default: { nodes: [], links: [] },
                        onChange: function (t, e) {
                            e.engineRunning = !1;
                        },
                    },
                    numDimensions: {
                        default: 3,
                        onChange: function (t, e) {
                            var n = e.d3ForceLayout.force("charge");
                            function r(t, e) {
                                t.forEach(function (t) {
                                    delete t[e], delete t["v".concat(e)];
                                });
                            }
                            n && n.strength(t > 2 ? -60 : -30), t < 3 && r(e.graphData.nodes, "z"), t < 2 && r(e.graphData.nodes, "y");
                        },
                    },
                    dagMode: {
                        onChange: function (t, e) {
                            !t &&
                                "d3" === e.forceEngine &&
                                (e.graphData.nodes || []).forEach(function (t) {
                                    return (t.fx = t.fy = t.fz = void 0);
                                });
                        },
                    },
                    dagLevelDistance: {},
                    dagNodeFilter: {
                        default: function (t) {
                            return !0;
                        },
                    },
                    onDagError: { triggerUpdate: !1 },
                    nodeRelSize: { default: 4 },
                    nodeId: { default: "id" },
                    nodeVal: { default: "val" },
                    nodeResolution: { default: 8 },
                    nodeColor: { default: "color" },
                    nodeAutoColorBy: {},
                    nodeOpacity: { default: 0.75 },
                    nodeVisibility: { default: !0 },
                    nodeThreeObject: {},
                    nodeThreeObjectExtend: { default: !1 },
                    linkSource: { default: "source" },
                    linkTarget: { default: "target" },
                    linkVisibility: { default: !0 },
                    linkColor: { default: "color" },
                    linkAutoColorBy: {},
                    linkOpacity: { default: 0.2 },
                    linkWidth: {},
                    linkResolution: { default: 6 },
                    linkCurvature: { default: 0, triggerUpdate: !1 },
                    linkCurveRotation: { default: 0, triggerUpdate: !1 },
                    linkMaterial: {},
                    linkThreeObject: {},
                    linkThreeObjectExtend: { default: !1 },
                    linkPositionUpdate: { triggerUpdate: !1 },
                    linkDirectionalArrowLength: { default: 0 },
                    linkDirectionalArrowColor: {},
                    linkDirectionalArrowRelPos: { default: 0.5, triggerUpdate: !1 },
                    linkDirectionalArrowResolution: { default: 8 },
                    linkDirectionalParticles: { default: 0 },
                    linkDirectionalParticleSpeed: { default: 0.01, triggerUpdate: !1 },
                    linkDirectionalParticleWidth: { default: 0.5 },
                    linkDirectionalParticleColor: {},
                    linkDirectionalParticleResolution: { default: 4 },
                    forceEngine: { default: "d3" },
                    d3AlphaMin: { default: 0 },
                    d3AlphaDecay: {
                        default: 0.0228,
                        triggerUpdate: !1,
                        onChange: function (t, e) {
                            e.d3ForceLayout.alphaDecay(t);
                        },
                    },
                    d3AlphaTarget: {
                        default: 0,
                        triggerUpdate: !1,
                        onChange: function (t, e) {
                            e.d3ForceLayout.alphaTarget(t);
                        },
                    },
                    d3VelocityDecay: {
                        default: 0.4,
                        triggerUpdate: !1,
                        onChange: function (t, e) {
                            e.d3ForceLayout.velocityDecay(t);
                        },
                    },
                    ngraphPhysics: { default: { timeStep: 20, gravity: -1.2, theta: 0.8, springLength: 30, springCoefficient: 8e-4, dragCoefficient: 0.02 } },
                    warmupTicks: { default: 0, triggerUpdate: !1 },
                    cooldownTicks: { default: 1 / 0, triggerUpdate: !1 },
                    cooldownTime: { default: 15e3, triggerUpdate: !1 },
                    onLoading: { default: function () {}, triggerUpdate: !1 },
                    onFinishLoading: { default: function () {}, triggerUpdate: !1 },
                    onUpdate: { default: function () {}, triggerUpdate: !1 },
                    onFinishUpdate: { default: function () {}, triggerUpdate: !1 },
                    onEngineTick: { default: function () {}, triggerUpdate: !1 },
                    onEngineStop: { default: function () {}, triggerUpdate: !1 },
                },
                methods: {
                    refresh: function (t) {
                        return (t._flushObjects = !0), t._rerender(), this;
                    },
                    d3Force: function (t, e, n) {
                        return void 0 === n ? t.d3ForceLayout.force(e) : (t.d3ForceLayout.force(e, n), this);
                    },
                    d3ReheatSimulation: function (t) {
                        return t.d3ForceLayout.alpha(1), this.resetCountdown(), this;
                    },
                    resetCountdown: function (t) {
                        return (t.cntTicks = 0), (t.startTickTime = new Date()), (t.engineRunning = !0), this;
                    },
                    tickFrame: function (t) {
                        var e,
                            n,
                            r,
                            i,
                            o = "ngraph" !== t.forceEngine;
                        return (
                            t.engineRunning &&
                                (function () {
                                    ++t.cntTicks > t.cooldownTicks || new Date() - t.startTickTime > t.cooldownTime || (o && t.d3AlphaMin > 0 && t.d3ForceLayout.alpha() < t.d3AlphaMin)
                                        ? ((t.engineRunning = !1), t.onEngineStop())
                                        : (t.layout[o ? "tick" : "step"](), t.onEngineTick());
                                    t.graphData.nodes.forEach(function (e) {
                                        var n = e.__threeObj;
                                        if (n) {
                                            var r = o ? e : t.layout.getNodePosition(e[t.nodeId]);
                                            (n.position.x = r.x), (n.position.y = r.y || 0), (n.position.z = r.z || 0);
                                        }
                                    });
                                    var e = l(t.linkWidth),
                                        n = l(t.linkCurvature),
                                        r = l(t.linkCurveRotation),
                                        i = l(t.linkThreeObjectExtend);
                                    function a(e) {
                                        var i = o ? e : t.layout.getLinkPosition(t.layout.graph.getLink(e.source, e.target).id),
                                            a = i[o ? "source" : "from"],
                                            u = i[o ? "target" : "to"];
                                        if (a && u && a.hasOwnProperty("x") && u.hasOwnProperty("x")) {
                                            var s = n(e);
                                            if (s) {
                                                var l,
                                                    c = new jn.Vector3(a.x, a.y || 0, a.z || 0),
                                                    f = new jn.Vector3(u.x, u.y || 0, u.z || 0),
                                                    d = c.distanceTo(f),
                                                    h = r(e);
                                                if (d > 0) {
                                                    var p = u.x - a.x,
                                                        g = u.y - a.y || 0,
                                                        v = new jn.Vector3().subVectors(f, c),
                                                        y = v
                                                            .clone()
                                                            .multiplyScalar(s)
                                                            .cross(0 !== p || 0 !== g ? new jn.Vector3(0, 0, 1) : new jn.Vector3(0, 1, 0))
                                                            .applyAxisAngle(v.normalize(), h)
                                                            .add(new jn.Vector3().addVectors(c, f).divideScalar(2));
                                                    l = new jn.QuadraticBezierCurve3(c, y, f);
                                                } else {
                                                    var b = 70 * s,
                                                        m = -h,
                                                        w = m + Math.PI / 2;
                                                    l = new jn.CubicBezierCurve3(c, new jn.Vector3(b * Math.cos(w), b * Math.sin(w), 0).add(c), new jn.Vector3(b * Math.cos(m), b * Math.sin(m), 0).add(c), f);
                                                }
                                                e.__curve = l;
                                            } else e.__curve = null;
                                        }
                                    }
                                    t.graphData.links.forEach(function (n) {
                                        var r = n.__lineObj;
                                        if (r) {
                                            var u = o ? n : t.layout.getLinkPosition(t.layout.graph.getLink(n.source, n.target).id),
                                                s = u[o ? "source" : "from"],
                                                l = u[o ? "target" : "to"];
                                            if (s && l && s.hasOwnProperty("x") && l.hasOwnProperty("x")) {
                                                a(n);
                                                var c = i(n);
                                                if (!t.linkPositionUpdate || !t.linkPositionUpdate(c ? r.children[1] : r, { start: { x: s.x, y: s.y, z: s.z }, end: { x: l.x, y: l.y, z: l.z } }, n) || c) {
                                                    var f = 30,
                                                        d = n.__curve,
                                                        h = r.children.length ? r.children[0] : r;
                                                    if ("Line" === h.type) {
                                                        if (d) h.geometry.setFromPoints(d.getPoints(f));
                                                        else {
                                                            var p = h.geometry.getAttribute("position");
                                                            (p && p.array && 6 === p.array.length) || h.geometry[Mn]("position", (p = new jn.BufferAttribute(new Float32Array(6), 3))),
                                                                (p.array[0] = s.x),
                                                                (p.array[1] = s.y || 0),
                                                                (p.array[2] = s.z || 0),
                                                                (p.array[3] = l.x),
                                                                (p.array[4] = l.y || 0),
                                                                (p.array[5] = l.z || 0),
                                                                (p.needsUpdate = !0);
                                                        }
                                                        h.geometry.computeBoundingSphere();
                                                    } else if ("Mesh" === h.type)
                                                        if (d) {
                                                            h.geometry.type.match(/^Tube(Buffer)?Geometry$/) || (h.position.set(0, 0, 0), h.rotation.set(0, 0, 0), h.scale.set(1, 1, 1));
                                                            var g = Math.ceil(10 * e(n)) / 10 / 2,
                                                                v = new jn.TubeBufferGeometry(d, f, g, t.linkResolution, !1);
                                                            h.geometry.dispose(), (h.geometry = v);
                                                        } else {
                                                            if (!h.geometry.type.match(/^Cylinder(Buffer)?Geometry$/)) {
                                                                var y = Math.ceil(10 * e(n)) / 10 / 2,
                                                                    b = new jn.CylinderBufferGeometry(y, y, 1, t.linkResolution, 1, !1);
                                                                b[Sn](new jn.Matrix4().makeTranslation(0, 0.5, 0)), b[Sn](new jn.Matrix4().makeRotationX(Math.PI / 2)), h.geometry.dispose(), (h.geometry = b);
                                                            }
                                                            var m = new jn.Vector3(s.x, s.y || 0, s.z || 0),
                                                                w = new jn.Vector3(l.x, l.y || 0, l.z || 0),
                                                                _ = m.distanceTo(w);
                                                            (h.position.x = m.x), (h.position.y = m.y), (h.position.z = m.z), (h.scale.z = _), h.parent.localToWorld(w), h.lookAt(w);
                                                        }
                                                }
                                            }
                                        }
                                    });
                                })(),
                            (e = l(t.linkDirectionalArrowRelPos)),
                            (n = l(t.linkDirectionalArrowLength)),
                            (r = l(t.nodeVal)),
                            t.graphData.links.forEach(function (i) {
                                var a = i.__arrowObj;
                                if (a) {
                                    var u = o ? i : t.layout.getLinkPosition(t.layout.graph.getLink(i.source, i.target).id),
                                        s = u[o ? "source" : "from"],
                                        l = u[o ? "target" : "to"];
                                    if (s && l && s.hasOwnProperty("x") && l.hasOwnProperty("x")) {
                                        var c = Math.sqrt(Math.max(0, r(s) || 1)) * t.nodeRelSize,
                                            f = Math.sqrt(Math.max(0, r(l) || 1)) * t.nodeRelSize,
                                            d = n(i),
                                            h = e(i),
                                            p = i.__curve
                                                ? function (t) {
                                                      return i.__curve.getPoint(t);
                                                  }
                                                : function (t) {
                                                      var e = function (t, e, n, r) {
                                                          return e[t] + (n[t] - e[t]) * r || 0;
                                                      };
                                                      return { x: e("x", s, l, t), y: e("y", s, l, t), z: e("z", s, l, t) };
                                                  },
                                            g = i.__curve
                                                ? i.__curve.getLength()
                                                : Math.sqrt(
                                                      ["x", "y", "z"]
                                                          .map(function (t) {
                                                              return Math.pow((l[t] || 0) - (s[t] || 0), 2);
                                                          })
                                                          .reduce(function (t, e) {
                                                              return t + e;
                                                          }, 0)
                                                  ),
                                            v = c + d + (g - c - f - d) * h,
                                            y = p(v / g),
                                            b = p((v - d) / g);
                                        ["x", "y", "z"].forEach(function (t) {
                                            return (a.position[t] = b[t]);
                                        });
                                        var m = sn(
                                            jn.Vector3,
                                            pn(
                                                ["x", "y", "z"].map(function (t) {
                                                    return y[t];
                                                })
                                            )
                                        );
                                        a.parent.localToWorld(m), a.lookAt(m);
                                    }
                                }
                            }),
                            (i = l(t.linkDirectionalParticleSpeed)),
                            t.graphData.links.forEach(function (e) {
                                var n = e.__photonsObj && e.__photonsObj.children,
                                    r = e.__singleHopPhotonsObj && e.__singleHopPhotonsObj.children;
                                if ((r && r.length) || (n && n.length)) {
                                    var a = o ? e : t.layout.getLinkPosition(t.layout.graph.getLink(e.source, e.target).id),
                                        u = a[o ? "source" : "from"],
                                        s = a[o ? "target" : "to"];
                                    if (u && s && u.hasOwnProperty("x") && s.hasOwnProperty("x")) {
                                        var l = i(e),
                                            c = e.__curve
                                                ? function (t) {
                                                      return e.__curve.getPoint(t);
                                                  }
                                                : function (t) {
                                                      var e = function (t, e, n, r) {
                                                          return e[t] + (n[t] - e[t]) * r || 0;
                                                      };
                                                      return { x: e("x", u, s, t), y: e("y", u, s, t), z: e("z", u, s, t) };
                                                  };
                                        [].concat(pn(n || []), pn(r || [])).forEach(function (t, e) {
                                            var r = "singleHopPhotons" === t.parent.__linkThreeObjType;
                                            if ((t.hasOwnProperty("__progressRatio") || (t.__progressRatio = r ? 0 : e / n.length), (t.__progressRatio += l), t.__progressRatio >= 1)) {
                                                if (r) return t.parent.remove(t), void mn(t);
                                                t.__progressRatio = t.__progressRatio % 1;
                                            }
                                            var i = t.__progressRatio,
                                                o = c(i);
                                            ["x", "y", "z"].forEach(function (e) {
                                                return (t.position[e] = o[e]);
                                            });
                                        });
                                    }
                                }
                            }),
                            this
                        );
                    },
                    emitParticle: function (t, e) {
                        if (e) {
                            if (!e.__singleHopPhotonsObj) {
                                var n = new jn.Group();
                                (n.__linkThreeObjType = "singleHopPhotons"), (e.__singleHopPhotonsObj = n), t.graphScene.add(n);
                            }
                            var r = l(t.linkDirectionalParticleWidth),
                                i = Math.ceil(10 * r(e)) / 10 / 2,
                                o = t.linkDirectionalParticleResolution,
                                a = new jn.SphereBufferGeometry(i, o, o),
                                u = l(t.linkColor),
                                s = l(t.linkDirectionalParticleColor)(e) || u(e) || "#f0f0f0",
                                c = new jn.Color(xn(s)),
                                f = 3 * t.linkOpacity,
                                d = new jn.MeshLambertMaterial({ color: c, transparent: !0, opacity: f });
                            e.__singleHopPhotonsObj.add(new jn.Mesh(a, d));
                        }
                        return this;
                    },
                    getGraphBbox: function (t) {
                        var e =
                            arguments.length > 1 && void 0 !== arguments[1]
                                ? arguments[1]
                                : function () {
                                      return !0;
                                  };
                        if (!t.initialised) return null;
                        var n = (function t(n) {
                            var r = [];
                            if (n.geometry) {
                                n.geometry.computeBoundingBox();
                                var i = new jn.Box3();
                                i.copy(n.geometry.boundingBox).applyMatrix4(n.matrixWorld), r.push(i);
                            }
                            return r.concat.apply(
                                r,
                                pn(
                                    (n.children || [])
                                        .filter(function (t) {
                                            return !t.hasOwnProperty("__graphObjType") || ("node" === t.__graphObjType && e(t.__data));
                                        })
                                        .map(t)
                                )
                            );
                        })(t.graphScene);
                        return n.length
                            ? Object.assign.apply(
                                  Object,
                                  pn(
                                      ["x", "y", "z"].map(function (t) {
                                          return nn({}, t, [
                                              Ee(n, function (e) {
                                                  return e.min[t];
                                              }),
                                              Se(n, function (e) {
                                                  return e.max[t];
                                              }),
                                          ]);
                                      })
                                  )
                              )
                            : null;
                    },
                },
                stateInit: function () {
                    return { d3ForceLayout: gt().force("link", R()).force("charge", vt()).force("center", c()).force("dagRadial", null).stop(), engineRunning: !1 };
                },
                init: function (t, e) {
                    e.graphScene = t;
                },
                update: function (t, e) {
                    var n = function (t) {
                        return t.some(function (t) {
                            return e.hasOwnProperty(t);
                        });
                    };
                    if (
                        ((t.engineRunning = !1),
                        t.onUpdate(),
                        null !== t.nodeAutoColorBy && n(["nodeAutoColorBy", "graphData", "nodeColor"]) && An(t.graphData.nodes, l(t.nodeAutoColorBy), t.nodeColor),
                        null !== t.linkAutoColorBy && n(["linkAutoColorBy", "graphData", "linkColor"]) && An(t.graphData.links, l(t.linkAutoColorBy), t.linkColor),
                        t._flushObjects || n(["graphData", "nodeThreeObject", "nodeThreeObjectExtend", "nodeVal", "nodeColor", "nodeVisibility", "nodeRelSize", "nodeResolution", "nodeOpacity"]))
                    ) {
                        var r = l(t.nodeThreeObject),
                            i = l(t.nodeThreeObjectExtend),
                            o = l(t.nodeVal),
                            a = l(t.nodeColor),
                            u = l(t.nodeVisibility),
                            s = {},
                            c = {};
                        _n(t.graphData.nodes.filter(u), t.graphScene, {
                            purge: t._flushObjects || n(["nodeThreeObject", "nodeThreeObjectExtend"]),
                            objFilter: function (t) {
                                return "node" === t.__graphObjType;
                            },
                            createObj: function (e) {
                                var n,
                                    o = r(e),
                                    a = i(e);
                                return o && t.nodeThreeObject === o && (o = o.clone()), o && !a ? (n = o) : (((n = new jn.Mesh()).__graphDefaultObj = !0), o && a && n.add(o)), (n.__graphObjType = "node"), n;
                            },
                            updateObj: function (e, n) {
                                if (e.__graphDefaultObj) {
                                    var r = o(n) || 1,
                                        i = Math.cbrt(r) * t.nodeRelSize,
                                        u = t.nodeResolution;
                                    (e.geometry.type.match(/^Sphere(Buffer)?Geometry$/) && e.geometry.parameters.radius === i && e.geometry.parameters.widthSegments === u) ||
                                        (s.hasOwnProperty(r) || (s[r] = new jn.SphereBufferGeometry(i, u, u)), e.geometry.dispose(), (e.geometry = s[r]));
                                    var l = a(n),
                                        f = new jn.Color(xn(l || "#ffffaa")),
                                        d = t.nodeOpacity * kn(l);
                                    ("MeshLambertMaterial" === e.material.type && e.material.color.equals(f) && e.material.opacity === d) ||
                                        (c.hasOwnProperty(l) || (c[l] = new jn.MeshLambertMaterial({ color: f, transparent: !0, opacity: d })), e.material.dispose(), (e.material = c[l]));
                                }
                            },
                        });
                    }
                    if (
                        t._flushObjects ||
                        n([
                            "graphData",
                            "linkThreeObject",
                            "linkThreeObjectExtend",
                            "linkMaterial",
                            "linkColor",
                            "linkWidth",
                            "linkVisibility",
                            "linkResolution",
                            "linkOpacity",
                            "linkDirectionalArrowLength",
                            "linkDirectionalArrowColor",
                            "linkDirectionalArrowResolution",
                            "linkDirectionalParticles",
                            "linkDirectionalParticleWidth",
                            "linkDirectionalParticleColor",
                            "linkDirectionalParticleResolution",
                        ])
                    ) {
                        var f = l(t.linkThreeObject),
                            d = l(t.linkThreeObjectExtend),
                            h = l(t.linkMaterial),
                            p = l(t.linkVisibility),
                            g = l(t.linkColor),
                            v = l(t.linkWidth),
                            y = {},
                            b = {},
                            m = {},
                            w = t.graphData.links.filter(p);
                        if (
                            (_n(w, t.graphScene, {
                                objBindAttr: "__lineObj",
                                purge: t._flushObjects || n(["linkThreeObject", "linkThreeObjectExtend", "linkWidth"]),
                                objFilter: function (t) {
                                    return "link" === t.__graphObjType;
                                },
                                createObj: function (e) {
                                    var n,
                                        r,
                                        i = f(e),
                                        o = d(e);
                                    if ((i && t.linkThreeObject === i && (i = i.clone()), !i || o))
                                        if (!!v(e)) n = new jn.Mesh();
                                        else {
                                            var a = new jn.BufferGeometry();
                                            a[Mn]("position", new jn.BufferAttribute(new Float32Array(6), 3)), (n = new jn.Line(a));
                                        }
                                    return i ? (o ? (((r = new jn.Group()).__graphDefaultObj = !0), r.add(n), r.add(i)) : (r = i)) : ((r = n).__graphDefaultObj = !0), (r.renderOrder = 10), (r.__graphObjType = "link"), r;
                                },
                                updateObj: function (e, n) {
                                    if (e.__graphDefaultObj) {
                                        var r = e.children.length ? e.children[0] : e,
                                            i = Math.ceil(10 * v(n)) / 10,
                                            o = !!i;
                                        if (o) {
                                            var a = i / 2,
                                                u = t.linkResolution;
                                            if (!r.geometry.type.match(/^Cylinder(Buffer)?Geometry$/) || r.geometry.parameters.radiusTop !== a || r.geometry.parameters.radialSegments !== u) {
                                                if (!y.hasOwnProperty(i)) {
                                                    var s = new jn.CylinderBufferGeometry(a, a, 1, u, 1, !1);
                                                    s[Sn](new jn.Matrix4().makeTranslation(0, 0.5, 0)), s[Sn](new jn.Matrix4().makeRotationX(Math.PI / 2)), (y[i] = s);
                                                }
                                                r.geometry.dispose(), (r.geometry = y[i]);
                                            }
                                        }
                                        var l = h(n);
                                        if (l) r.material = l;
                                        else {
                                            var c = g(n),
                                                f = new jn.Color(xn(c || "#f0f0f0")),
                                                d = t.linkOpacity * kn(c),
                                                p = o ? "MeshLambertMaterial" : "LineBasicMaterial";
                                            if (r.material.type !== p || !r.material.color.equals(f) || r.material.opacity !== d) {
                                                var w = o ? b : m;
                                                w.hasOwnProperty(c) || (w[c] = new jn[p]({ color: f, transparent: d < 1, opacity: d, depthWrite: d >= 1 })), r.material.dispose(), (r.material = w[c]);
                                            }
                                        }
                                    }
                                },
                            }),
                            t.linkDirectionalArrowLength || e.hasOwnProperty("linkDirectionalArrowLength"))
                        ) {
                            var _ = l(t.linkDirectionalArrowLength),
                                x = l(t.linkDirectionalArrowColor);
                            _n(w.filter(_), t.graphScene, {
                                objBindAttr: "__arrowObj",
                                objFilter: function (t) {
                                    return "arrow" === t.__linkThreeObjType;
                                },
                                createObj: function () {
                                    var t = new jn.Mesh(void 0, new jn.MeshLambertMaterial({ transparent: !0 }));
                                    return (t.__linkThreeObjType = "arrow"), t;
                                },
                                updateObj: function (e, n) {
                                    var r = _(n),
                                        i = t.linkDirectionalArrowResolution;
                                    if (!e.geometry.type.match(/^Cone(Buffer)?Geometry$/) || e.geometry.parameters.height !== r || e.geometry.parameters.radialSegments !== i) {
                                        var o = new jn.ConeBufferGeometry(0.25 * r, r, i);
                                        o.translate(0, r / 2, 0), o.rotateX(Math.PI / 2), e.geometry.dispose(), (e.geometry = o);
                                    }
                                    (e.material.color = new jn.Color(x(n) || g(n) || "#f0f0f0")), (e.material.opacity = 3 * t.linkOpacity);
                                },
                            });
                        }
                        if (t.linkDirectionalParticles || e.hasOwnProperty("linkDirectionalParticles")) {
                            var k = l(t.linkDirectionalParticles),
                                O = l(t.linkDirectionalParticleWidth),
                                A = l(t.linkDirectionalParticleColor),
                                j = {},
                                P = {};
                            _n(w.filter(k), t.graphScene, {
                                objBindAttr: "__photonsObj",
                                objFilter: function (t) {
                                    return "photons" === t.__linkThreeObjType;
                                },
                                createObj: function () {
                                    var t = new jn.Group();
                                    return (t.__linkThreeObjType = "photons"), t;
                                },
                                updateObj: function (e, n) {
                                    var r,
                                        i = Math.round(Math.abs(k(n))),
                                        o = !!e.children.length && e.children[0],
                                        a = Math.ceil(10 * O(n)) / 10 / 2,
                                        u = t.linkDirectionalParticleResolution;
                                    o && o.geometry.parameters.radius === a && o.geometry.parameters.widthSegments === u
                                        ? (r = o.geometry)
                                        : (P.hasOwnProperty(a) || (P[a] = new jn.SphereBufferGeometry(a, u, u)), (r = P[a]), o && o.geometry.dispose());
                                    var s,
                                        l = A(n) || g(n) || "#f0f0f0",
                                        c = new jn.Color(xn(l)),
                                        f = 3 * t.linkOpacity;
                                    o && o.material.color.equals(c) && o.material.opacity === f
                                        ? (s = o.material)
                                        : (j.hasOwnProperty(l) || (j[l] = new jn.MeshLambertMaterial({ color: c, transparent: !0, opacity: f })), (s = j[l]), o && o.material.dispose()),
                                        _n(
                                            pn(new Array(i)).map(function (t, e) {
                                                return { idx: e };
                                            }),
                                            e,
                                            {
                                                idAccessor: function (t) {
                                                    return t.idx;
                                                },
                                                createObj: function () {
                                                    return new jn.Mesh(r, s);
                                                },
                                                updateObj: function (t) {
                                                    (t.geometry = r), (t.material = s);
                                                },
                                            }
                                        );
                                },
                            });
                        }
                    }
                    if (((t._flushObjects = !1), n(["graphData", "nodeId", "linkSource", "linkTarget", "numDimensions", "forceEngine", "dagMode", "dagNodeFilter", "dagLevelDistance"]))) {
                        (t.engineRunning = !1),
                            t.graphData.links.forEach(function (e) {
                                (e.source = e[t.linkSource]), (e.target = e[t.linkTarget]);
                            });
                        var M,
                            S = "ngraph" !== t.forceEngine;
                        if (S) {
                            (M = t.d3ForceLayout).stop().alpha(1).numDimensions(t.numDimensions).nodes(t.graphData.nodes);
                            var E = t.d3ForceLayout.force("link");
                            E &&
                                E.id(function (e) {
                                    return e[t.nodeId];
                                }).links(t.graphData.links);
                            var C =
                                    t.dagMode &&
                                    (function (t, e) {
                                        var n = t.nodes,
                                            r = t.links,
                                            i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                                            o = i.nodeFilter,
                                            a =
                                                void 0 === o
                                                    ? function () {
                                                          return !0;
                                                      }
                                                    : o,
                                            u = i.onLoopError,
                                            s =
                                                void 0 === u
                                                    ? function (t) {
                                                          throw "Invalid DAG structure! Found cycle in node path: ".concat(t.join(" -> "), ".");
                                                      }
                                                    : u,
                                            l = {};
                                        n.forEach(function (t) {
                                            return (l[e(t)] = { data: t, out: [], depth: -1, skip: !a(t) });
                                        }),
                                            r.forEach(function (t) {
                                                var n = t.source,
                                                    r = t.target,
                                                    i = s(n),
                                                    o = s(r);
                                                if (!l.hasOwnProperty(i)) throw "Missing source node with id: ".concat(i);
                                                if (!l.hasOwnProperty(o)) throw "Missing target node with id: ".concat(o);
                                                var a = l[i],
                                                    u = l[o];
                                                function s(t) {
                                                    return "object" === tn(t) ? e(t) : t;
                                                }
                                                a.out.push(u);
                                            });
                                        var c = [];
                                        return (
                                            f(Object.values(l)),
                                            Object.assign.apply(
                                                Object,
                                                [{}].concat(
                                                    pn(
                                                        Object.entries(l)
                                                            .filter(function (t) {
                                                                return !hn(t, 2)[1].skip;
                                                            })
                                                            .map(function (t) {
                                                                var e = hn(t, 2);
                                                                return nn({}, e[0], e[1].depth);
                                                            })
                                                    )
                                                )
                                            )
                                        );
                                        function f(t) {
                                            for (var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [], r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0, i = 0, o = t.length; i < o; i++) {
                                                var a = t[i];
                                                if (-1 !== n.indexOf(a))
                                                    if (
                                                        "continue" ===
                                                        (function () {
                                                            var t = [].concat(pn(n.slice(n.indexOf(a))), [a]).map(function (t) {
                                                                return e(t.data);
                                                            });
                                                            return (
                                                                c.some(function (e) {
                                                                    return (
                                                                        e.length === t.length &&
                                                                        e.every(function (e, n) {
                                                                            return e === t[n];
                                                                        })
                                                                    );
                                                                }) || (c.push(t), s(t)),
                                                                "continue"
                                                            );
                                                        })()
                                                    )
                                                        continue;
                                                r > a.depth && ((a.depth = r), f(a.out, [].concat(pn(n), [a]), r + (a.skip ? 0 : 1)));
                                            }
                                        }
                                    })(
                                        t.graphData,
                                        function (e) {
                                            return e[t.nodeId];
                                        },
                                        { nodeFilter: t.dagNodeFilter, onLoopError: t.onDagError || void 0 }
                                    ),
                                D = Math.max.apply(Math, pn(Object.values(C || []))),
                                N = t.dagLevelDistance || (t.graphData.nodes.length / (D || 1)) * 2 * (-1 !== ["radialin", "radialout"].indexOf(t.dagMode) ? 0.7 : 1);
                            if (t.dagMode) {
                                var B = function (e, n) {
                                        return function (r) {
                                            return e ? (C[r[t.nodeId]] - D / 2) * N * (n ? -1 : 1) : void 0;
                                        };
                                    },
                                    z = B(-1 !== ["lr", "rl"].indexOf(t.dagMode), "rl" === t.dagMode),
                                    I = B(-1 !== ["td", "bu"].indexOf(t.dagMode), "td" === t.dagMode),
                                    L = B(-1 !== ["zin", "zout"].indexOf(t.dagMode), "zout" === t.dagMode);
                                t.graphData.nodes.filter(t.dagNodeFilter).forEach(function (t) {
                                    (t.fx = z(t)), (t.fy = I(t)), (t.fz = L(t));
                                });
                            }
                            t.d3ForceLayout.force(
                                "dagRadial",
                                -1 !== ["radialin", "radialout"].indexOf(t.dagMode)
                                    ? (function (t, e, n, r) {
                                          var i,
                                              o,
                                              a,
                                              u,
                                              s = T(0.1);
                                          function l(t) {
                                              for (var s = 0, l = i.length; s < l; ++s) {
                                                  var c = i[s],
                                                      f = c.x - e || 1e-6,
                                                      d = (c.y || 0) - n || 1e-6,
                                                      h = (c.z || 0) - r || 1e-6,
                                                      p = Math.sqrt(f * f + d * d + h * h),
                                                      g = ((u[s] - p) * a[s] * t) / p;
                                                  (c.vx += f * g), o > 1 && (c.vy += d * g), o > 2 && (c.vz += h * g);
                                              }
                                          }
                                          function c() {
                                              if (i) {
                                                  var e,
                                                      n = i.length;
                                                  for (a = new Array(n), u = new Array(n), e = 0; e < n; ++e) (u[e] = +t(i[e], e, i)), (a[e] = isNaN(u[e]) ? 0 : +s(i[e], e, i));
                                              }
                                          }
                                          return (
                                              "function" != typeof t && (t = T(+t)),
                                              null == e && (e = 0),
                                              null == n && (n = 0),
                                              null == r && (r = 0),
                                              (l.initialize = function (t, ...e) {
                                                  (i = t), (o = e.find((t) => [1, 2, 3].includes(t)) || 2), c();
                                              }),
                                              (l.strength = function (t) {
                                                  return arguments.length ? ((s = "function" == typeof t ? t : T(+t)), c(), l) : s;
                                              }),
                                              (l.radius = function (e) {
                                                  return arguments.length ? ((t = "function" == typeof e ? e : T(+e)), c(), l) : t;
                                              }),
                                              (l.x = function (t) {
                                                  return arguments.length ? ((e = +t), l) : e;
                                              }),
                                              (l.y = function (t) {
                                                  return arguments.length ? ((n = +t), l) : n;
                                              }),
                                              (l.z = function (t) {
                                                  return arguments.length ? ((r = +t), l) : r;
                                              }),
                                              l
                                          );
                                      })(function (e) {
                                          var n = C[e[t.nodeId]] || -1;
                                          return ("radialin" === t.dagMode ? D - n : n) * N;
                                      }).strength(function (e) {
                                          return t.dagNodeFilter(e) ? 1 : 0;
                                      })
                                    : null
                            );
                        } else {
                            var R = Pn.graph();
                            t.graphData.nodes.forEach(function (e) {
                                R.addNode(e[t.nodeId]);
                            }),
                                t.graphData.links.forEach(function (t) {
                                    R.addLink(t.source, t.target);
                                }),
                                ((M = Pn.forcelayout(R, Ze({ dimensions: t.numDimensions }, t.ngraphPhysics))).graph = R);
                        }
                        for (var $ = 0; $ < t.warmupTicks && !(S && t.d3AlphaMin > 0 && t.d3ForceLayout.alpha() < t.d3AlphaMin); $++) M[S ? "tick" : "step"]();
                        (t.layout = M), this.resetCountdown();
                    }
                    (t.engineRunning = !0), t.onFinishUpdate();
                },
            }),
            (window.THREE ? window.THREE : { Group: t.Group }).Group,
            !0
        ),
        Cn = s(Object.freeze({ __proto__: null, default: En }));
    if ("undefined" == typeof AFRAME) throw new Error("Component attempted to register before AFRAME was available.");
    let Dn = Cn;
    "default" in Dn && (Dn = Dn.default);
    const Nn = function (t) {
            return "string" == typeof t ? JSON.parse(t) : t;
        },
        Bn = function (t) {
            if ("function" == typeof t) return t;
            const e = eval;
            try {
                return e("(" + t + ")");
            } catch (t) {}
            return null;
        },
        Tn = function (t) {
            return isNaN(parseFloat(t)) ? (Bn(t) ? Bn(t) : t) : parseFloat(t);
        };
    return (
        AFRAME.registerComponent("forcegraph", {
            schema: {
                jsonUrl: { type: "string", default: "" },
                nodes: { parse: Nn, default: [] },
                links: { parse: Nn, default: [] },
                numDimensions: { type: "number", default: 3 },
                dagMode: { type: "string", default: "" },
                dagLevelDistance: { type: "number", default: 0 },
                dagNodeFilter: { parse: Bn, function: () => !0 },
                onDagError: { parse: Bn, default: void 0 },
                nodeRelSize: { type: "number", default: 4 },
                nodeId: { type: "string", default: "id" },
                nodeVal: { parse: Tn, default: "val" },
                nodeResolution: { type: "number", default: 8 },
                nodeVisibility: { parse: Tn, default: !0 },
                nodeColor: { parse: Tn, default: "color" },
                nodeAutoColorBy: { parse: Tn, default: "" },
                nodeOpacity: { type: "number", default: 0.75 },
                nodeThreeObject: { parse: Tn, default: null },
                nodeThreeObjectExtend: { parse: Tn, default: !1 },
                linkSource: { type: "string", default: "source" },
                linkTarget: { type: "string", default: "target" },
                linkVisibility: { parse: Tn, default: !0 },
                linkColor: { parse: Tn, default: "color" },
                linkAutoColorBy: { parse: Tn, default: "" },
                linkOpacity: { type: "number", default: 0.2 },
                linkWidth: { parse: Tn, default: 0 },
                linkResolution: { type: "number", default: 6 },
                linkCurvature: { parse: Tn, default: 0 },
                linkCurveRotation: { parse: Tn, default: 0 },
                linkMaterial: { parse: Tn, default: null },
                linkThreeObject: { parse: Tn, default: null },
                linkThreeObjectExtend: { parse: Tn, default: !1 },
                linkPositionUpdate: { parse: Bn, default: null },
                linkDirectionalArrowLength: { parse: Tn, default: 0 },
                linkDirectionalArrowColor: { parse: Tn, default: null },
                linkDirectionalArrowRelPos: { parse: Tn, default: 0.5 },
                linkDirectionalArrowResolution: { type: "number", default: 8 },
                linkDirectionalParticles: { parse: Tn, default: 0 },
                linkDirectionalParticleSpeed: { parse: Tn, default: 0.01 },
                linkDirectionalParticleWidth: { parse: Tn, default: 0.5 },
                linkDirectionalParticleColor: { parse: Tn, default: null },
                linkDirectionalParticleResolution: { type: "number", default: 4 },
                onNodeHover: { parse: Bn, default: () => {} },
                onLinkHover: { parse: Bn, default: () => {} },
                onNodeClick: { parse: Bn, default: () => {} },
                onLinkClick: { parse: Bn, default: () => {} },
                forceEngine: { type: "string", default: "d3" },
                d3AlphaMin: { type: "number", default: 0 },
                d3AlphaDecay: { type: "number", default: 0.0228 },
                d3VelocityDecay: { type: "number", default: 0.4 },
                ngraphPhysics: { parse: Nn, default: null },
                warmupTicks: { type: "int", default: 0 },
                cooldownTicks: { type: "int", default: 1e18 },
                cooldownTime: { type: "int", default: 15e3 },
                onEngineTick: { parse: Bn, default: function () {} },
                onEngineStop: { parse: Bn, default: function () {} },
            },
            getGraphBbox: function () {
                return this.forceGraph || (this.forceGraph = new Dn()), this.forceGraph.getGraphBbox();
            },
            emitParticle: function () {
                this.forceGraph || (this.forceGraph = new Dn());
                const t = this.forceGraph,
                    e = t.emitParticle.apply(t, arguments);
                return e === t ? this : e;
            },
            d3Force: function () {
                this.forceGraph || (this.forceGraph = new Dn());
                const t = this.forceGraph,
                    e = t.d3Force.apply(t, arguments);
                return e === t ? this : e;
            },
            d3ReheatSimulation: function () {
                return this.forceGraph && this.forceGraph.d3ReheatSimulation(), this;
            },
            refresh: function () {
                return this.forceGraph && this.forceGraph.refresh(), this;
            },
            init: function () {
                const t = (this.state = {});
                (t.infoEl = document.createElement("a-text")), t.infoEl.setAttribute("position", "0 -0.1 -1"), t.infoEl.setAttribute("width", 1), t.infoEl.setAttribute("align", "center"), t.infoEl.setAttribute("color", "lavender");
                const e = document.querySelector("a-entity[camera], a-camera");
                e.appendChild(t.infoEl),
                    (t.cameraObj = e.object3D.children.filter(function (t) {
                        return "PerspectiveCamera" === t.type;
                    })[0]),
                    this.el.sceneEl.addEventListener("camera-set-active", function (e) {
                        t.cameraObj = e.detail.cameraEl.components.camera.camera;
                    }),
                    this.forceGraph || (this.forceGraph = new Dn()),
                    this.forceGraph
                        .onFinishUpdate(() => this.el.setObject3D("forcegraphGroup", this.forceGraph))
                        .onLoading(() => t.infoEl.setAttribute("value", "Loading..."))
                        .onFinishLoading(() => t.infoEl.setAttribute("value", "")),
                    this.el.addEventListener("raycaster-intersected", (e) => (t.hoverDetail = e.detail)),
                    this.el.addEventListener("raycaster-intersected-cleared", (e) => (t.hoverDetail = e.detail)),
                    this.el.addEventListener("click", () => t.hoverObj && this.data["on" + ("node" === t.hoverObj.__graphObjType ? "Node" : "Link") + "Click"](t.hoverObj.__data));
            },
            remove: function () {
                this.state.infoEl.remove(), this.el.removeObject3D("forcegraphGroup");
            },
            update: function (t) {
                const e = this,
                    n = this.data,
                    r = AFRAME.utils.diff(n, t);
                [
                    "jsonUrl",
                    "numDimensions",
                    "dagMode",
                    "dagLevelDistance",
                    "dagNodeFilter",
                    "onDagError",
                    "nodeRelSize",
                    "nodeId",
                    "nodeVal",
                    "nodeResolution",
                    "nodeVisibility",
                    "nodeColor",
                    "nodeAutoColorBy",
                    "nodeOpacity",
                    "nodeThreeObject",
                    "nodeThreeObjectExtend",
                    "linkSource",
                    "linkTarget",
                    "linkVisibility",
                    "linkColor",
                    "linkAutoColorBy",
                    "linkOpacity",
                    "linkWidth",
                    "linkResolution",
                    "linkCurvature",
                    "linkCurveRotation",
                    "linkMaterial",
                    "linkThreeObject",
                    "linkThreeObjectExtend",
                    "linkPositionUpdate",
                    "linkDirectionalArrowLength",
                    "linkDirectionalArrowColor",
                    "linkDirectionalArrowRelPos",
                    "linkDirectionalArrowResolution",
                    "linkDirectionalParticles",
                    "linkDirectionalParticleSpeed",
                    "linkDirectionalParticleWidth",
                    "linkDirectionalParticleColor",
                    "linkDirectionalParticleResolution",
                    "forceEngine",
                    "d3AlphaMin",
                    "d3AphaDecay",
                    "d3VelocityDecay",
                    "ngraphPhysics",
                    "warmupTicks",
                    "cooldownTicks",
                    "cooldownTime",
                    "onEngineTick",
                    "onEngineStop",
                ]
                    .filter(function (t) {
                        return t in r;
                    })
                    .forEach(function (t) {
                        e.forceGraph[t]("" !== n[t] ? n[t] : null);
                    }),
                    ("nodes" in r || "links" in r) && e.forceGraph.graphData({ nodes: n.nodes, links: n.links });
            },
            tick: function (t, e) {
                const n = this.state,
                    r = this.data,
                    i = n.hoverDetail ? (n.hoverDetail.getIntersection ? n.hoverDetail.getIntersection(this.el) : n.hoverDetail.intersection || void 0) : void 0;
                let o = i ? i.object : void 0;
                for (; o && !o.hasOwnProperty("__graphObjType"); ) o = o.parent;
                if (o !== n.hoverObj) {
                    const t = n.hoverObj ? n.hoverObj.__graphObjType : null,
                        e = n.hoverObj ? n.hoverObj.__data : null,
                        i = o ? o.__graphObjType : null,
                        a = o ? o.__data : null;
                    t && t !== i && r["on" + ("node" === t ? "Node" : "Link") + "Hover"](null, e), i && r["on" + ("node" === i ? "Node" : "Link") + "Hover"](a, t === i ? e : null), (n.hoverObj = o);
                }
                this.forceGraph.tickFrame();
            },
        }),
        Ae({
            props: {
                width: {},
                height: {},
                yOffset: { default: 1.5 },
                glScale: { default: 200 },
                jsonUrl: {},
                graphData: { default: { nodes: [], links: [] } },
                numDimensions: { default: 3 },
                dagMode: {},
                dagLevelDistance: {},
                dagNodeFilter: {
                    default: function () {
                        return !0;
                    },
                },
                onDagError: { default: void 0 },
                nodeRelSize: { default: 4 },
                nodeId: { default: "id" },
                nodeVal: { default: "val" },
                nodeResolution: { default: 8 },
                nodeVisibility: { default: !0 },
                nodeColor: { default: "color" },
                nodeAutoColorBy: {},
                nodeOpacity: { default: 0.75 },
                nodeThreeObject: {},
                nodeThreeObjectExtend: { default: !1 },
                linkSource: { default: "source" },
                linkTarget: { default: "target" },
                linkVisibility: { default: !0 },
                linkColor: { default: "color" },
                linkAutoColorBy: {},
                linkOpacity: { default: 0.2 },
                linkWidth: { default: 0 },
                linkResolution: { default: 6 },
                linkCurvature: { default: 0 },
                linkCurveRotation: { default: 0 },
                linkMaterial: {},
                linkThreeObject: {},
                linkThreeObjectExtend: { default: !1 },
                linkPositionUpdate: {},
                linkDirectionalArrowLength: { default: 0 },
                linkDirectionalArrowColor: {},
                linkDirectionalArrowRelPos: { default: 0.5 },
                linkDirectionalArrowResolution: { default: 8 },
                linkDirectionalParticles: { default: 0 },
                linkDirectionalParticleSpeed: { default: 0.01 },
                linkDirectionalParticleWidth: { default: 0.5 },
                linkDirectionalParticleColor: {},
                linkDirectionalParticleResolution: { default: 4 },
                onNodeHover: {},
                onNodeClick: {},
                onLinkHover: {},
                onLinkClick: {},
                forceEngine: { default: "d3" },
                d3AlphaMin: { default: 0 },
                d3AlphaDecay: { default: 0.0228 },
                d3VelocityDecay: { default: 0.4 },
                ngraphPhysics: {},
                warmupTicks: { default: 0 },
                cooldownTicks: {},
                cooldownTime: { default: 15e3 },
                onEngineTick: {},
                onEngineStop: {},
            },
            methods: n(
                n(
                    {},
                    Object.assign.apply(
                        Object,
                        [{}].concat(
                            o(
                                ["getGraphBbox", "emitParticle", "d3Force", "d3ReheatSimulation", "refresh"].map(function (t) {
                                    return r({}, t, function (e) {
                                        for (var n = e.forcegraph.components.forcegraph, r = arguments.length, i = new Array(r > 1 ? r - 1 : 0), o = 1; o < r; o++) i[o - 1] = arguments[o];
                                        var a = n[t].apply(n, i);
                                        return a === n ? this : a;
                                    });
                                })
                            )
                        )
                    )
                ),
                {},
                {
                    _destructor: function () {
                        this.graphData({ nodes: [], links: [] });
                    },
                }
            ),
            init: function (t, e) {
                var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                    r = n.markerAttrs,
                    o = void 0 === r ? { type: "pattern", url: "/ar/bwtweet.patt" } : r;
                (t.innerHTML = ""), (e.container = document.createElement("div")), t.appendChild(e.container);
                var a = document.createElement("a-scene");
                a.setAttribute("embedded", ""), a.setAttribute("arjs", "debugUIEnabled: false;");
                var u,
                    s = document.createElement("a-marker");
                Object.entries(o).forEach(function (t) {
                    var e = i(t, 2),
                        n = e[0],
                        r = e[1];
                    return s.setAttribute(n, r);
                }),
                    a.appendChild(s),
                    a.appendChild((u = document.createElement("a-entity"))),
                    u.setAttribute("cursor"),
                    u.setAttribute("raycaster", "objects: [forcegraph]"),
                    (e.forcegraph = document.createElement("a-entity")),
                    e.forcegraph.setAttribute("forcegraph", null),
                    s.appendChild(e.forcegraph);
                var l = document.createElement("a-entity");
                l.setAttribute("camera", ""), a.appendChild(l), e.container.appendChild(a);
            },
            update: function (t, e) {
                e.hasOwnProperty("width") && t.width && (t.container.style.width = t.width),
                    e.hasOwnProperty("height") && t.height && (t.container.style.height = t.height),
                    e.hasOwnProperty("glScale") &&
                        t.forcegraph.setAttribute(
                            "scale",
                            o(new Array(3))
                                .map(function () {
                                    return 1 / t.glScale;
                                })
                                .join(" ")
                        ),
                    e.hasOwnProperty("yOffset") && t.forcegraph.setAttribute("position", "0 ".concat(t.yOffset, " 0"));
                var n = [
                        "jsonUrl",
                        "numDimensions",
                        "dagMode",
                        "dagLevelDistance",
                        "dagNodeFilter",
                        "onDagError",
                        "nodeRelSize",
                        "nodeId",
                        "nodeVal",
                        "nodeResolution",
                        "nodeVisibility",
                        "nodeColor",
                        "nodeAutoColorBy",
                        "nodeOpacity",
                        "nodeThreeObject",
                        "nodeThreeObjectExtend",
                        "linkSource",
                        "linkTarget",
                        "linkVisibility",
                        "linkColor",
                        "linkAutoColorBy",
                        "linkOpacity",
                        "linkWidth",
                        "linkResolution",
                        "linkCurvature",
                        "linkCurveRotation",
                        "linkMaterial",
                        "linkThreeObject",
                        "linkThreeObjectExtend",
                        "linkPositionUpdate",
                        "linkDirectionalArrowLength",
                        "linkDirectionalArrowColor",
                        "linkDirectionalArrowRelPos",
                        "linkDirectionalArrowResolution",
                        "linkDirectionalParticles",
                        "linkDirectionalParticleSpeed",
                        "linkDirectionalParticleWidth",
                        "linkDirectionalParticleColor",
                        "linkDirectionalParticleResolution",
                        "onNodeHover",
                        "onNodeClick",
                        "onLinkHover",
                        "onLinkClick",
                        "forceEngine",
                        "d3AlphaMin",
                        "d3AlphaDecay",
                        "d3VelocityDecay",
                        "ngraphPhysics",
                        "warmupTicks",
                        "cooldownTicks",
                        "cooldownTime",
                        "onEngineTick",
                        "onEngineStop",
                    ],
                    a = Object.assign.apply(
                        Object,
                        [{}].concat(
                            o(
                                Object.entries(t)
                                    .filter(function (t) {
                                        var r = i(t, 2),
                                            o = r[0],
                                            a = r[1];
                                        return e.hasOwnProperty(o) && -1 !== n.indexOf(o) && null != a;
                                    })
                                    .map(function (t) {
                                        var e = i(t, 2);
                                        return r({}, e[0], e[1]);
                                    })
                            ),
                            o(
                                Object.entries(t.graphData).map(function (t) {
                                    var e = i(t, 2);
                                    return r({}, e[0], e[1]);
                                })
                            )
                        )
                    );
                t.forcegraph.setAttribute("forcegraph", a);
            },
        })
    );
});
