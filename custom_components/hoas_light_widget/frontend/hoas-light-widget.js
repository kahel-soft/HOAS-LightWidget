/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const cr = globalThis, _a = cr.ShadowRoot && (cr.ShadyCSS === void 0 || cr.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, va = Symbol(), el = /* @__PURE__ */ new WeakMap();
let Nc = class {
  constructor(t, e, n) {
    if (this._$cssResult$ = !0, n !== va) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (_a && t === void 0) {
      const n = e !== void 0 && e.length === 1;
      n && (t = el.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && el.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Ih = (i) => new Nc(typeof i == "string" ? i : i + "", void 0, va), Oc = (i, ...t) => {
  const e = i.length === 1 ? i[0] : t.reduce((n, s, r) => n + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + i[r + 1], i[0]);
  return new Nc(e, i, va);
}, Uh = (i, t) => {
  if (_a) i.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const n = document.createElement("style"), s = cr.litNonce;
    s !== void 0 && n.setAttribute("nonce", s), n.textContent = e.cssText, i.appendChild(n);
  }
}, nl = _a ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const n of t.cssRules) e += n.cssText;
  return Ih(e);
})(i) : i;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Nh, defineProperty: Oh, getOwnPropertyDescriptor: Fh, getOwnPropertyNames: kh, getOwnPropertySymbols: Bh, getPrototypeOf: zh } = Object, In = globalThis, il = In.trustedTypes, Hh = il ? il.emptyScript : "", Nr = In.reactiveElementPolyfillSupport, us = (i, t) => i, vr = { toAttribute(i, t) {
  switch (t) {
    case Boolean:
      i = i ? Hh : null;
      break;
    case Object:
    case Array:
      i = i == null ? i : JSON.stringify(i);
  }
  return i;
}, fromAttribute(i, t) {
  let e = i;
  switch (t) {
    case Boolean:
      e = i !== null;
      break;
    case Number:
      e = i === null ? null : Number(i);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(i);
      } catch {
        e = null;
      }
  }
  return e;
} }, xa = (i, t) => !Nh(i, t), sl = { attribute: !0, type: String, converter: vr, reflect: !1, useDefault: !1, hasChanged: xa };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), In.litPropertyMetadata ?? (In.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let Ri = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = sl) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const n = Symbol(), s = this.getPropertyDescriptor(t, n, e);
      s !== void 0 && Oh(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, n) {
    const { get: s, set: r } = Fh(this.prototype, t) ?? { get() {
      return this[e];
    }, set(a) {
      this[e] = a;
    } };
    return { get: s, set(a) {
      const o = s == null ? void 0 : s.call(this);
      r == null || r.call(this, a), this.requestUpdate(t, o, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? sl;
  }
  static _$Ei() {
    if (this.hasOwnProperty(us("elementProperties"))) return;
    const t = zh(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(us("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(us("properties"))) {
      const e = this.properties, n = [...kh(e), ...Bh(e)];
      for (const s of n) this.createProperty(s, e[s]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [n, s] of e) this.elementProperties.set(n, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, n] of this.elementProperties) {
      const s = this._$Eu(e, n);
      s !== void 0 && this._$Eh.set(s, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const n = new Set(t.flat(1 / 0).reverse());
      for (const s of n) e.unshift(nl(s));
    } else t !== void 0 && e.push(nl(t));
    return e;
  }
  static _$Eu(t, e) {
    const n = e.attribute;
    return n === !1 ? void 0 : typeof n == "string" ? n : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((e = t.hostConnected) == null || e.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$EO) == null || e.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const n of e.keys()) this.hasOwnProperty(n) && (t.set(n, this[n]), delete this[n]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Uh(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var n;
      return (n = e.hostConnected) == null ? void 0 : n.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var n;
      return (n = e.hostDisconnected) == null ? void 0 : n.call(e);
    });
  }
  attributeChangedCallback(t, e, n) {
    this._$AK(t, n);
  }
  _$ET(t, e) {
    var r;
    const n = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, n);
    if (s !== void 0 && n.reflect === !0) {
      const a = (((r = n.converter) == null ? void 0 : r.toAttribute) !== void 0 ? n.converter : vr).toAttribute(e, n.type);
      this._$Em = t, a == null ? this.removeAttribute(s) : this.setAttribute(s, a), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var r, a;
    const n = this.constructor, s = n._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const o = n.getPropertyOptions(s), l = typeof o.converter == "function" ? { fromAttribute: o.converter } : ((r = o.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? o.converter : vr;
      this._$Em = s;
      const c = l.fromAttribute(e, o.type);
      this[s] = c ?? ((a = this._$Ej) == null ? void 0 : a.get(s)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, e, n, s = !1, r) {
    var a;
    if (t !== void 0) {
      const o = this.constructor;
      if (s === !1 && (r = this[t]), n ?? (n = o.getPropertyOptions(t)), !((n.hasChanged ?? xa)(r, e) || n.useDefault && n.reflect && r === ((a = this._$Ej) == null ? void 0 : a.get(t)) && !this.hasAttribute(o._$Eu(t, n)))) return;
      this.C(t, e, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: n, reflect: s, wrapped: r }, a) {
    n && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, a ?? e ?? this[t]), r !== !0 || a !== void 0) || (this._$AL.has(t) || (this.hasUpdated || n || (e = void 0), this._$AL.set(t, e)), s === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var n;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [r, a] of this._$Ep) this[r] = a;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [r, a] of s) {
        const { wrapped: o } = a, l = this[r];
        o !== !0 || this._$AL.has(r) || l === void 0 || this.C(r, void 0, a, l);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (n = this._$EO) == null || n.forEach((s) => {
        var r;
        return (r = s.hostUpdate) == null ? void 0 : r.call(s);
      }), this.update(e)) : this._$EM();
    } catch (s) {
      throw t = !1, this._$EM(), s;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((n) => {
      var s;
      return (s = n.hostUpdated) == null ? void 0 : s.call(n);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((e) => this._$ET(e, this[e]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
Ri.elementStyles = [], Ri.shadowRootOptions = { mode: "open" }, Ri[us("elementProperties")] = /* @__PURE__ */ new Map(), Ri[us("finalized")] = /* @__PURE__ */ new Map(), Nr == null || Nr({ ReactiveElement: Ri }), (In.reactiveElementVersions ?? (In.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ds = globalThis, rl = (i) => i, xr = ds.trustedTypes, ol = xr ? xr.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, Fc = "$lit$", Pn = `lit$${Math.random().toFixed(9).slice(2)}$`, kc = "?" + Pn, Vh = `<${kc}>`, ri = document, vs = () => ri.createComment(""), xs = (i) => i === null || typeof i != "object" && typeof i != "function", ya = Array.isArray, Gh = (i) => ya(i) || typeof (i == null ? void 0 : i[Symbol.iterator]) == "function", Or = `[ 	
\f\r]`, ts = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, al = /-->/g, ll = />/g, Hn = RegExp(`>|${Or}(?:([^\\s"'>=/]+)(${Or}*=${Or}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), cl = /'/g, hl = /"/g, Bc = /^(?:script|style|textarea|title)$/i, zc = (i) => (t, ...e) => ({ _$litType$: i, strings: t, values: e }), St = zc(1), $t = zc(2), zi = Symbol.for("lit-noChange"), Lt = Symbol.for("lit-nothing"), ul = /* @__PURE__ */ new WeakMap(), Qn = ri.createTreeWalker(ri, 129);
function Hc(i, t) {
  if (!ya(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ol !== void 0 ? ol.createHTML(t) : t;
}
const $h = (i, t) => {
  const e = i.length - 1, n = [];
  let s, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = ts;
  for (let o = 0; o < e; o++) {
    const l = i[o];
    let c, h, u = -1, d = 0;
    for (; d < l.length && (a.lastIndex = d, h = a.exec(l), h !== null); ) d = a.lastIndex, a === ts ? h[1] === "!--" ? a = al : h[1] !== void 0 ? a = ll : h[2] !== void 0 ? (Bc.test(h[2]) && (s = RegExp("</" + h[2], "g")), a = Hn) : h[3] !== void 0 && (a = Hn) : a === Hn ? h[0] === ">" ? (a = s ?? ts, u = -1) : h[1] === void 0 ? u = -2 : (u = a.lastIndex - h[2].length, c = h[1], a = h[3] === void 0 ? Hn : h[3] === '"' ? hl : cl) : a === hl || a === cl ? a = Hn : a === al || a === ll ? a = ts : (a = Hn, s = void 0);
    const p = a === Hn && i[o + 1].startsWith("/>") ? " " : "";
    r += a === ts ? l + Vh : u >= 0 ? (n.push(c), l.slice(0, u) + Fc + l.slice(u) + Pn + p) : l + Pn + (u === -2 ? o : p);
  }
  return [Hc(i, r + (i[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class ys {
  constructor({ strings: t, _$litType$: e }, n) {
    let s;
    this.parts = [];
    let r = 0, a = 0;
    const o = t.length - 1, l = this.parts, [c, h] = $h(t, e);
    if (this.el = ys.createElement(c, n), Qn.currentNode = this.el.content, e === 2 || e === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (s = Qn.nextNode()) !== null && l.length < o; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const u of s.getAttributeNames()) if (u.endsWith(Fc)) {
          const d = h[a++], p = s.getAttribute(u).split(Pn), g = /([.?@])?(.*)/.exec(d);
          l.push({ type: 1, index: r, name: g[2], strings: p, ctor: g[1] === "." ? Xh : g[1] === "?" ? Yh : g[1] === "@" ? qh : Tr }), s.removeAttribute(u);
        } else u.startsWith(Pn) && (l.push({ type: 6, index: r }), s.removeAttribute(u));
        if (Bc.test(s.tagName)) {
          const u = s.textContent.split(Pn), d = u.length - 1;
          if (d > 0) {
            s.textContent = xr ? xr.emptyScript : "";
            for (let p = 0; p < d; p++) s.append(u[p], vs()), Qn.nextNode(), l.push({ type: 2, index: ++r });
            s.append(u[d], vs());
          }
        }
      } else if (s.nodeType === 8) if (s.data === kc) l.push({ type: 2, index: r });
      else {
        let u = -1;
        for (; (u = s.data.indexOf(Pn, u + 1)) !== -1; ) l.push({ type: 7, index: r }), u += Pn.length - 1;
      }
      r++;
    }
  }
  static createElement(t, e) {
    const n = ri.createElement("template");
    return n.innerHTML = t, n;
  }
}
function Hi(i, t, e = i, n) {
  var a, o;
  if (t === zi) return t;
  let s = n !== void 0 ? (a = e._$Co) == null ? void 0 : a[n] : e._$Cl;
  const r = xs(t) ? void 0 : t._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== r && ((o = s == null ? void 0 : s._$AO) == null || o.call(s, !1), r === void 0 ? s = void 0 : (s = new r(i), s._$AT(i, e, n)), n !== void 0 ? (e._$Co ?? (e._$Co = []))[n] = s : e._$Cl = s), s !== void 0 && (t = Hi(i, s._$AS(i, t.values), s, n)), t;
}
class Wh {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: n } = this._$AD, s = ((t == null ? void 0 : t.creationScope) ?? ri).importNode(e, !0);
    Qn.currentNode = s;
    let r = Qn.nextNode(), a = 0, o = 0, l = n[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let c;
        l.type === 2 ? c = new Rs(r, r.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(r, l.name, l.strings, this, t) : l.type === 6 && (c = new jh(r, this, t)), this._$AV.push(c), l = n[++o];
      }
      a !== (l == null ? void 0 : l.index) && (r = Qn.nextNode(), a++);
    }
    return Qn.currentNode = ri, s;
  }
  p(t) {
    let e = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, e), e += n.strings.length - 2) : n._$AI(t[e])), e++;
  }
}
class Rs {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, n, s) {
    this.type = 2, this._$AH = Lt, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = n, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = Hi(this, t, e), xs(t) ? t === Lt || t == null || t === "" ? (this._$AH !== Lt && this._$AR(), this._$AH = Lt) : t !== this._$AH && t !== zi && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Gh(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== Lt && xs(this._$AH) ? this._$AA.nextSibling.data = t : this.T(ri.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var r;
    const { values: e, _$litType$: n } = t, s = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = ys.createElement(Hc(n.h, n.h[0]), this.options)), n);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === s) this._$AH.p(e);
    else {
      const a = new Wh(s, this), o = a.u(this.options);
      a.p(e), this.T(o), this._$AH = a;
    }
  }
  _$AC(t) {
    let e = ul.get(t.strings);
    return e === void 0 && ul.set(t.strings, e = new ys(t)), e;
  }
  k(t) {
    ya(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let n, s = 0;
    for (const r of t) s === e.length ? e.push(n = new Rs(this.O(vs()), this.O(vs()), this, this.options)) : n = e[s], n._$AI(r), s++;
    s < e.length && (this._$AR(n && n._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var n;
    for ((n = this._$AP) == null ? void 0 : n.call(this, !1, !0, e); t !== this._$AB; ) {
      const s = rl(t).nextSibling;
      rl(t).remove(), t = s;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class Tr {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, n, s, r) {
    this.type = 1, this._$AH = Lt, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = r, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = Lt;
  }
  _$AI(t, e = this, n, s) {
    const r = this.strings;
    let a = !1;
    if (r === void 0) t = Hi(this, t, e, 0), a = !xs(t) || t !== this._$AH && t !== zi, a && (this._$AH = t);
    else {
      const o = t;
      let l, c;
      for (t = r[0], l = 0; l < r.length - 1; l++) c = Hi(this, o[n + l], e, l), c === zi && (c = this._$AH[l]), a || (a = !xs(c) || c !== this._$AH[l]), c === Lt ? t = Lt : t !== Lt && (t += (c ?? "") + r[l + 1]), this._$AH[l] = c;
    }
    a && !s && this.j(t);
  }
  j(t) {
    t === Lt ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Xh extends Tr {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === Lt ? void 0 : t;
  }
}
class Yh extends Tr {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== Lt);
  }
}
class qh extends Tr {
  constructor(t, e, n, s, r) {
    super(t, e, n, s, r), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = Hi(this, t, e, 0) ?? Lt) === zi) return;
    const n = this._$AH, s = t === Lt && n !== Lt || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, r = t !== Lt && (n === Lt || s);
    s && this.element.removeEventListener(this.name, this, n), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class jh {
  constructor(t, e, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    Hi(this, t);
  }
}
const Fr = ds.litHtmlPolyfillSupport;
Fr == null || Fr(ys, Rs), (ds.litHtmlVersions ?? (ds.litHtmlVersions = [])).push("3.3.3");
const Zh = (i, t, e) => {
  const n = (e == null ? void 0 : e.renderBefore) ?? t;
  let s = n._$litPart$;
  if (s === void 0) {
    const r = (e == null ? void 0 : e.renderBefore) ?? null;
    n._$litPart$ = s = new Rs(t.insertBefore(vs(), r), r, void 0, e ?? {});
  }
  return s._$AI(i), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ni = globalThis;
class ii extends Ri {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e;
    const t = super.createRenderRoot();
    return (e = this.renderOptions).renderBefore ?? (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Zh(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return zi;
  }
}
var Uc;
ii._$litElement$ = !0, ii.finalized = !0, (Uc = ni.litElementHydrateSupport) == null || Uc.call(ni, { LitElement: ii });
const kr = ni.litElementPolyfillSupport;
kr == null || kr({ LitElement: ii });
(ni.litElementVersions ?? (ni.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ma = (i) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(i, t);
  }) : customElements.define(i, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Kh = { attribute: !0, type: String, converter: vr, reflect: !1, hasChanged: xa }, Jh = (i = Kh, t, e) => {
  const { kind: n, metadata: s } = e;
  let r = globalThis.litPropertyMetadata.get(s);
  if (r === void 0 && globalThis.litPropertyMetadata.set(s, r = /* @__PURE__ */ new Map()), n === "setter" && ((i = Object.create(i)).wrapped = !0), r.set(e.name, i), n === "accessor") {
    const { name: a } = e;
    return { set(o) {
      const l = t.get.call(this);
      t.set.call(this, o), this.requestUpdate(a, l, i, !0, o);
    }, init(o) {
      return o !== void 0 && this.C(a, void 0, i, o), o;
    } };
  }
  if (n === "setter") {
    const { name: a } = e;
    return function(o) {
      const l = this[a];
      t.call(this, o), this.requestUpdate(a, l, i, !0, o);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function ui(i) {
  return (t, e) => typeof e == "object" ? Jh(i, t, e) : ((n, s, r) => {
    const a = s.hasOwnProperty(r);
    return s.constructor.createProperty(r, n), a ? Object.getOwnPropertyDescriptor(s, r) : void 0;
  })(i, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function le(i) {
  return ui({ ...i, state: !0, attribute: !1 });
}
const Qh = 2.5, tu = [
  { x: 0, y: 0 },
  { x: 5, y: 0 },
  { x: 5, y: 4.5 },
  { x: 0, y: 4.5 }
];
function eu(i) {
  return !Array.isArray(i) || i.length < 3 ? !1 : i.every(
    (t) => typeof t == "object" && t !== null && typeof t.x == "number" && Number.isFinite(t.x) && typeof t.y == "number" && Number.isFinite(t.y)
  );
}
function Ms(i) {
  if (i.length === 0)
    return { minX: 0, maxX: 5, minY: 0, maxY: 4.5, width: 5, depth: 4.5 };
  let t = 1 / 0, e = -1 / 0, n = 1 / 0, s = -1 / 0;
  for (const r of i)
    r.x < t && (t = r.x), r.x > e && (e = r.x), r.y < n && (n = r.y), r.y > s && (s = r.y);
  return {
    minX: t,
    maxX: e,
    minY: n,
    maxY: s,
    width: Math.max(0.5, e - t),
    depth: Math.max(0.5, s - n)
  };
}
function nu(i, t) {
  const e = eu(i.floor_polygon) ? i.floor_polygon.map((r) => ({ x: r.x, y: r.y })) : tu.map((r) => ({ ...r })), n = Ms(e), s = n.minX + n.width / 2;
  return {
    id: i.id && i.id.trim().length > 0 ? i.id.trim() : `room_${t + 1}`,
    name: i.name && i.name.trim().length > 0 ? i.name.trim() : `Raum ${t + 1}`,
    area_id: i.area_id,
    height_m: typeof i.height_m == "number" && i.height_m > 0.5 ? i.height_m : Qh,
    floor_polygon: e,
    inner_walls: Array.isArray(i.inner_walls) ? i.inner_walls : [],
    wall_features: Array.isArray(i.wall_features) ? i.wall_features : [],
    theme: i.theme,
    camera_pov: i.camera_pov ?? {
      position: [s, n.maxY - 0.8, 1.25],
      target: [s, n.minY + 0.4, 1]
    },
    furniture: Array.isArray(i.furniture) ? i.furniture : [],
    lights: Array.isArray(i.lights) ? i.lights.filter((r) => !!(r != null && r.entity_id && (r != null && r.geometry))) : []
  };
}
function bs(i) {
  var e;
  if (!i || typeof i != "object")
    throw new Error("Ungültige Karten-Konfiguration für hoas-light-widget.");
  const t = Array.isArray(i.rooms) ? i.rooms.map((n, s) => nu(n, s)) : [];
  return {
    type: i.type ?? "custom:hoas-light-widget",
    title: i.title,
    default_room_id: i.default_room_id ?? ((e = t[0]) == null ? void 0 : e.id),
    favorites: Array.isArray(i.favorites) ? i.favorites : [],
    recent_colors: Array.isArray(i.recent_colors) ? i.recent_colors : [],
    calibrations: i.calibrations ?? {},
    rooms: t
  };
}
function dl(i, t) {
  if (i.rooms.length !== 0) {
    if (t) {
      const e = i.rooms.find((n) => n.id === t);
      if (e) return e;
    }
    if (i.default_room_id) {
      const e = i.rooms.find((n) => n.id === i.default_room_id);
      if (e) return e;
    }
    return i.rooms[0];
  }
}
function fs() {
  return {
    type: "custom:hoas-light-widget",
    title: "Licht-Studio",
    default_room_id: "wohnzimmer",
    rooms: [
      {
        id: "wohnzimmer",
        name: "Wohnzimmer",
        area_id: "wohnzimmer",
        height_m: 2.5,
        floor_polygon: [
          { x: 0, y: 0 },
          { x: 5, y: 0 },
          { x: 5, y: 4.5 },
          { x: 0, y: 4.5 }
        ],
        camera_pov: {
          position: [2.5, 3.6, 1.2],
          target: [2.5, 0.3, 1]
        },
        furniture: [
          {
            id: "tv",
            kind: "tv",
            label: "TV / Leinwand",
            position: [2.5, 0.15, 1.1],
            size: [1.8, 0.1, 1]
          },
          {
            id: "couch",
            kind: "couch",
            label: "Couch",
            position: [2.5, 3.65, 0.45],
            size: [2.4, 0.95, 0.85]
          }
        ],
        lights: []
      }
    ]
  };
}
function _e(i, t, e) {
  return Math.min(e, Math.max(t, i));
}
function ls({ r: i, g: t, b: e }) {
  const n = (s) => _e(Math.round(s), 0, 255).toString(16).padStart(2, "0");
  return `#${n(i)}${n(t)}${n(e)}`;
}
function iu(i) {
  const t = i.trim().replace(/^#/, "");
  if (t.length === 3) {
    const e = Number.parseInt(t[0] + t[0], 16), n = Number.parseInt(t[1] + t[1], 16), s = Number.parseInt(t[2] + t[2], 16);
    if (!Number.isNaN(e) && !Number.isNaN(n) && !Number.isNaN(s))
      return { r: e, g: n, b: s };
  }
  if (t.length === 6) {
    const e = Number.parseInt(t.slice(0, 2), 16), n = Number.parseInt(t.slice(2, 4), 16), s = Number.parseInt(t.slice(4, 6), 16);
    if (!Number.isNaN(e) && !Number.isNaN(n) && !Number.isNaN(s))
      return { r: e, g: n, b: s };
  }
  return { r: 255, g: 226, b: 176 };
}
function yr({ r: i, g: t, b: e }) {
  const n = _e(i, 0, 255) / 255, s = _e(t, 0, 255) / 255, r = _e(e, 0, 255) / 255, a = Math.max(n, s, r), o = Math.min(n, s, r), l = a - o;
  let c = 0;
  l > 1e-4 && (a === n ? c = 60 * ((s - r) / l % 6) : a === s ? c = 60 * ((r - n) / l + 2) : c = 60 * ((n - s) / l + 4)), c < 0 && (c += 360);
  const h = a === 0 ? 0 : l / a * 100;
  return [Math.round(c * 10) / 10, Math.round(h * 10) / 10];
}
function fl({ r: i, g: t, b: e }) {
  const n = (u) => {
    const d = _e(u, 0, 255) / 255;
    return d > 0.04045 ? Math.pow((d + 0.055) / 1.055, 2.4) : d / 12.92;
  }, s = n(i), r = n(t), a = n(e), o = s * 0.664511 + r * 0.154324 + a * 0.162028, l = s * 0.283881 + r * 0.668433 + a * 0.047685, c = s * 88e-6 + r * 0.07231 + a * 0.986039, h = o + l + c;
  return h <= 1e-5 ? [0.3127, 0.329] : [
    Math.round(o / h * 1e4) / 1e4,
    Math.round(l / h * 1e4) / 1e4
  ];
}
function su(i) {
  const t = Ss(i);
  return yr(t);
}
function Li({ r: i, g: t, b: e }, n = 1) {
  const s = _e(Math.round(i), 0, 255), r = _e(Math.round(t), 0, 255), a = _e(Math.round(e), 0, 255);
  return n >= 1 ? `rgb(${s}, ${r}, ${a})` : `rgba(${s}, ${r}, ${a}, ${_e(n, 0, 1).toFixed(3)})`;
}
function ba(i, t) {
  const e = (i % 360 + 360) % 360, s = _e(t, 0, 100) / 100, r = s * (1 - Math.abs(e / 60 % 2 - 1)), a = 1 - s;
  let o = 0, l = 0, c = 0;
  return e < 60 ? [o, l, c] = [s, r, 0] : e < 120 ? [o, l, c] = [r, s, 0] : e < 180 ? [o, l, c] = [0, s, r] : e < 240 ? [o, l, c] = [0, r, s] : e < 300 ? [o, l, c] = [r, 0, s] : [o, l, c] = [s, 0, r], {
    r: Math.round((o + a) * 255),
    g: Math.round((l + a) * 255),
    b: Math.round((c + a) * 255)
  };
}
function ru(i, t) {
  if (t <= 1e-4)
    return { r: 255, g: 255, b: 255 };
  const e = 1 - i - t, n = 1, s = n / t * i, r = n / t * e;
  let a = s * 1.656492 - n * 0.354851 - r * 0.255038, o = -s * 0.707196 + n * 1.655397 + r * 0.036152, l = s * 0.051713 - n * 0.121364 + r * 1.01153;
  a = Math.max(0, a), o = Math.max(0, o), l = Math.max(0, l);
  const c = Math.max(a, o, l, 1);
  a /= c, o /= c, l /= c;
  const h = (u) => u <= 31308e-7 ? 12.92 * u : 1.055 * Math.pow(u, 1 / 2.4) - 0.055;
  return {
    r: Math.round(_e(h(a), 0, 1) * 255),
    g: Math.round(_e(h(o), 0, 1) * 255),
    b: Math.round(_e(h(l), 0, 1) * 255)
  };
}
function Ss(i) {
  const t = _e(i, 1500, 1e4) / 100;
  let e, n, s;
  return t <= 66 ? (e = 255, n = 99.4708025861 * Math.log(t) - 161.1195681661, s = t <= 19 ? 0 : 138.5177312231 * Math.log(t - 10) - 305.0447927307) : (e = 329.698727446 * Math.pow(t - 60, -0.1332047592), n = 288.1221695283 * Math.pow(t - 60, -0.0755148492), s = 255), {
    r: Math.round(_e(e, 0, 255)),
    g: Math.round(_e(n, 0, 255)),
    b: Math.round(_e(s, 0, 255))
  };
}
const es = { r: 82, g: 82, b: 91 }, ou = { r: 255, g: 226, b: 176 };
function au(i, t, e) {
  if (e && e.rgb) {
    const o = e.isOn ?? !0, l = _e(e.brightness01 ?? 1, 0.05, 1);
    return {
      entityId: i.entity_id,
      isOn: o,
      brightness01: l,
      rgb: e.rgb,
      cssColor: Li(o ? e.rgb : es),
      hexColor: ls(o ? e.rgb : es)
    };
  }
  if (!t || t.state !== "on")
    return {
      entityId: i.entity_id,
      isOn: !1,
      brightness01: 0,
      rgb: es,
      cssColor: Li(es),
      hexColor: ls(es)
    };
  const n = t.attributes ?? {}, s = typeof n.brightness == "number" ? n.brightness : 255, r = _e(s / 255, 0.08, 1);
  let a = ou;
  return Array.isArray(n.rgb_color) && n.rgb_color.length === 3 ? a = {
    r: _e(n.rgb_color[0], 0, 255),
    g: _e(n.rgb_color[1], 0, 255),
    b: _e(n.rgb_color[2], 0, 255)
  } : Array.isArray(n.hs_color) && n.hs_color.length === 2 ? a = ba(n.hs_color[0], n.hs_color[1]) : Array.isArray(n.xy_color) && n.xy_color.length === 2 ? a = ru(n.xy_color[0], n.xy_color[1]) : typeof n.color_temp_kelvin == "number" && (a = Ss(n.color_temp_kelvin)), {
    entityId: i.entity_id,
    isOn: !0,
    brightness01: r,
    rgb: a,
    cssColor: Li(a),
    hexColor: ls(a)
  };
}
function Vn(i, t) {
  return {
    id: `white_${i}`,
    label: t,
    kind: "white",
    kelvin: i,
    hex: ls(Ss(i))
  };
}
const Sa = [
  Vn(2e3, "2000K Kerze"),
  Vn(2200, "2200K Glut"),
  Vn(2700, "2700K Warm"),
  Vn(3e3, "3000K Wohn"),
  Vn(4e3, "4000K Neutral"),
  Vn(5500, "5500K Tag"),
  Vn(6500, "6500K Kalt")
], si = [
  // Amber / Gold
  { id: "amber_soft", label: "Sanft-Amber", kind: "color", hex: "#ffd9a0" },
  { id: "amber_mid", label: "Honig-Gold", kind: "color", hex: "#ffb347" },
  { id: "amber_vivid", label: "Bernstein", kind: "color", hex: "#ff8811" },
  { id: "amber_deep", label: "Glut-Orange", kind: "color", hex: "#e65100" },
  // Koralle / Rot
  { id: "red_soft", label: "Lachston", kind: "color", hex: "#ffadad" },
  { id: "red_coral", label: "Koralle", kind: "color", hex: "#ff6b6b" },
  { id: "red_vivid", label: "Kaminrot", kind: "color", hex: "#ef233c" },
  { id: "red_deep", label: "Rubin", kind: "color", hex: "#b5172c" },
  // Rose / Magenta
  { id: "pink_soft", label: "Rosé", kind: "color", hex: "#ffc6e5" },
  { id: "pink_mid", label: "Flamingo", kind: "color", hex: "#ff70a6" },
  { id: "pink_vivid", label: "Magenta", kind: "color", hex: "#e6198e" },
  { id: "pink_deep", label: "Beere", kind: "color", hex: "#9d174d" },
  // Violett / Lavendel
  { id: "violet_soft", label: "Lavendel", kind: "color", hex: "#d8b4fe" },
  { id: "violet_mid", label: "Amethyst", kind: "color", hex: "#a855f7" },
  { id: "violet_vivid", label: "Violett", kind: "color", hex: "#7c3aed" },
  { id: "violet_deep", label: "Ultraviolett", kind: "color", hex: "#4c1d95" },
  // Blau / Eisblau
  { id: "blue_soft", label: "Eisblau", kind: "color", hex: "#bae6fd" },
  { id: "blue_sky", label: "Himmelblau", kind: "color", hex: "#38bdf8" },
  { id: "blue_vivid", label: "Kobalt", kind: "color", hex: "#2563eb" },
  { id: "blue_deep", label: "Tiefblau", kind: "color", hex: "#1d35a7" },
  // Cyan / Türkis
  { id: "cyan_soft", label: "Aquamarin", kind: "color", hex: "#a5f3fc" },
  { id: "cyan_mid", label: "Türkis", kind: "color", hex: "#22d3ee" },
  { id: "cyan_vivid", label: "Lagune", kind: "color", hex: "#06b6d4" },
  { id: "cyan_deep", label: "Petrol", kind: "color", hex: "#0e7490" },
  // Mint / Grün
  { id: "green_soft", label: "Mint", kind: "color", hex: "#bbf7d0" },
  { id: "green_mid", label: "Limette", kind: "color", hex: "#4ade80" },
  { id: "green_vivid", label: "Smaragd", kind: "color", hex: "#10b981" },
  { id: "green_deep", label: "Waldgrün", kind: "color", hex: "#15803d" }
], pl = [
  Sa[2],
  // 2700K Warm
  si[1],
  // Honig-Gold
  si[13],
  // Amethyst
  si[17]
  // Himmelblau
];
function lu(i, t, e = 8) {
  const n = i.filter((s) => s.id !== t.id);
  return [t, ...n].slice(0, e);
}
function cu(i, t) {
  return i.some((n) => n.id === t.id) ? i.filter((n) => n.id !== t.id) : [t, ...i].slice(0, 12);
}
function hr(i, t, e) {
  return Math.min(e, Math.max(t, i));
}
function ur(i, t) {
  const e = (t == null ? void 0 : t.hue_offset_deg) ?? 0, n = (t == null ? void 0 : t.saturation_scale) ?? 1, s = ((i[0] + e) % 360 + 360) % 360, r = hr(i[1] * n, 0, 100);
  return [Math.round(s * 10) / 10, Math.round(r * 10) / 10];
}
function hu(i, t) {
  if (!t || !t.hue_offset_deg && t.saturation_scale === void 0)
    return i;
  const e = ur(yr(i), t);
  return ba(e[0], e[1]);
}
function Br(i, t, e, n) {
  const s = (t == null ? void 0 : t.attributes.friendly_name) ?? i;
  if (e.action === "off")
    return {
      entityId: i,
      friendlyName: s,
      status: "applied",
      scenePayload: { state: "off" },
      previewBrightness01: 0,
      isOn: !1
    };
  const r = (t == null ? void 0 : t.attributes.supported_color_modes) ?? [], a = e.brightnessPct ?? 80, o = (n == null ? void 0 : n.brightness_scale) ?? 1, l = hr(
    Math.round(a / 100 * 255 * o),
    1,
    255
  ), c = hr(l / 255, 0.05, 1), h = r.includes("color_temp"), u = r.includes("hs"), d = r.includes("xy"), p = r.includes("rgb") || r.includes("rgbw") || r.includes("rgbww"), g = r.includes("white"), _ = u || d || p, f = r.length > 0 && !_ && !h;
  if (!e.color)
    return r.includes("onoff") && r.length === 1 ? {
      entityId: i,
      friendlyName: s,
      status: "applied",
      scenePayload: { state: "on" },
      previewBrightness01: 1,
      isOn: !0
    } : {
      entityId: i,
      friendlyName: s,
      status: "applied",
      scenePayload: { state: "on", brightness: l },
      previewBrightness01: c,
      isOn: !0
    };
  if (e.color.kind === "color") {
    if (f)
      return {
        entityId: i,
        friendlyName: s,
        status: "skipped_no_color",
        reason: "Unterstützt keine Farben",
        previewBrightness01: 0,
        isOn: !1
      };
    const x = iu(e.color.hex), v = hu(x, n);
    if (u) {
      const w = ur(yr(x), n);
      return {
        entityId: i,
        friendlyName: s,
        status: "applied",
        scenePayload: { state: "on", brightness: l, hs_color: w },
        previewRgb: v,
        previewBrightness01: c,
        isOn: !0
      };
    }
    return d ? {
      entityId: i,
      friendlyName: s,
      status: "applied",
      scenePayload: {
        state: "on",
        brightness: l,
        xy_color: fl(v)
      },
      previewRgb: v,
      previewBrightness01: c,
      isOn: !0
    } : {
      entityId: i,
      friendlyName: s,
      status: "applied",
      scenePayload: {
        state: "on",
        brightness: l,
        rgb_color: [v.r, v.g, v.b]
      },
      previewRgb: v,
      previewBrightness01: c,
      isOn: !0
    };
  }
  const m = e.color.kelvin ?? 2700, b = Ss(m);
  if (h) {
    const x = (t == null ? void 0 : t.attributes.min_color_temp_kelvin) ?? 2e3, v = (t == null ? void 0 : t.attributes.max_color_temp_kelvin) ?? 6535, w = Math.round(hr(m, x, v));
    return {
      entityId: i,
      friendlyName: s,
      status: "applied",
      scenePayload: {
        state: "on",
        brightness: l,
        color_temp_kelvin: w
      },
      previewRgb: Ss(w),
      previewBrightness01: c,
      isOn: !0
    };
  }
  if (u) {
    if (m < 3800 || !g) {
      const v = (n == null ? void 0 : n.warm_white_hue_deg) !== void 0 && (n == null ? void 0 : n.warm_white_saturation_pct) !== void 0 ? [n.warm_white_hue_deg, n.warm_white_saturation_pct] : su(m), w = ur(v, n);
      return {
        entityId: i,
        friendlyName: s,
        status: "applied",
        scenePayload: {
          state: "on",
          brightness: l,
          hs_color: w
        },
        previewRgb: ba(w[0], w[1]),
        previewBrightness01: c,
        isOn: !0
      };
    }
    const x = ur(yr(b), n);
    return {
      entityId: i,
      friendlyName: s,
      status: "applied",
      preferNativeWhiteLive: g,
      scenePayload: {
        state: "on",
        brightness: l,
        hs_color: x
      },
      previewRgb: b,
      previewBrightness01: c,
      isOn: !0
    };
  }
  return d ? {
    entityId: i,
    friendlyName: s,
    status: "applied",
    scenePayload: {
      state: "on",
      brightness: l,
      xy_color: fl(b)
    },
    previewRgb: b,
    previewBrightness01: c,
    isOn: !0
  } : p ? {
    entityId: i,
    friendlyName: s,
    status: "applied",
    scenePayload: {
      state: "on",
      brightness: l,
      rgb_color: [b.r, b.g, b.b]
    },
    previewRgb: b,
    previewBrightness01: c,
    isOn: !0
  } : r.includes("onoff") && r.length === 1 ? {
    entityId: i,
    friendlyName: s,
    status: "applied",
    scenePayload: { state: "on" },
    previewRgb: b,
    previewBrightness01: 1,
    isOn: !0
  } : {
    entityId: i,
    friendlyName: s,
    status: "applied",
    scenePayload: { state: "on", brightness: l },
    previewRgb: b,
    previewBrightness01: c,
    isOn: !0
  };
}
function ml(i) {
  return i.toLowerCase().replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss").replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || `hoas_scene_${Date.now()}`;
}
async function gl(i, t, e = 0.6) {
  const n = [], s = {}, r = [];
  for (const o of t) {
    if (o.status === "skipped_no_color") {
      n.push({
        entityId: o.entityId,
        friendlyName: o.friendlyName,
        reason: o.reason ?? "Nicht unterstützt"
      });
      continue;
    }
    o.scenePayload && (o.preferNativeWhiteLive && o.scenePayload.brightness !== void 0 ? r.push({
      entityId: o.entityId,
      brightness: o.scenePayload.brightness
    }) : o.scenePayload.state === "off" ? s[o.entityId] = "off" : s[o.entityId] = o.scenePayload);
  }
  const a = [];
  Object.keys(s).length > 0 && a.push(
    i.callService("scene", "apply", {
      entities: s,
      transition: e
    })
  );
  for (const o of r)
    a.push(
      i.callService(
        "light",
        "turn_on",
        { white: o.brightness, transition: e },
        { entity_id: o.entityId }
      )
    );
  return await Promise.all(a), {
    appliedCount: Object.keys(s).length + r.length,
    skipped: n
  };
}
async function uu(i, t, e) {
  const n = t.lights.map((s) => s.entity_id);
  n.length !== 0 && await i.callService("scene", "create", {
    scene_id: e,
    snapshot_entities: n
  });
}
async function du(i, t, e = 0.6) {
  await i.callService(
    "scene",
    "turn_on",
    { transition: e },
    { entity_id: `scene.${t}` }
  );
}
function fu(i, t, e, n) {
  const s = {};
  for (const r of i.lights) {
    const a = e.get(r.entity_id);
    if (a) {
      s[r.entity_id] = a.state === "off" ? "off" : a;
      continue;
    }
    const o = n.get(r.entity_id), l = t == null ? void 0 : t.states[r.entity_id];
    if (!(o ? o.isOn : (l == null ? void 0 : l.state) === "on")) {
      s[r.entity_id] = "off";
      continue;
    }
    const h = (l == null ? void 0 : l.attributes) ?? {}, d = {
      state: "on",
      brightness: typeof h.brightness == "number" ? h.brightness : Math.max(1, Math.round(((o == null ? void 0 : o.brightness01) ?? 1) * 255))
    }, p = h.supported_color_modes ?? [];
    h.color_mode === "color_temp" && typeof h.color_temp_kelvin == "number" ? d.color_temp_kelvin = h.color_temp_kelvin : Array.isArray(h.hs_color) && p.includes("hs") ? d.hs_color = h.hs_color : Array.isArray(h.xy_color) && p.includes("xy") ? d.xy_color = h.xy_color : Array.isArray(h.rgb_color) && p.includes("rgb") ? d.rgb_color = h.rgb_color : typeof h.color_temp_kelvin == "number" && (d.color_temp_kelvin = h.color_temp_kelvin), s[r.entity_id] = d;
  }
  return s;
}
async function pu(i, t) {
  if (!i.callApi)
    throw new Error(
      "Home Assistant Scene-Config-API (hass.callApi) ist in dieser Umgebung nicht verfügbar."
    );
  await i.callApi("POST", `config/scene/config/${t.sceneId}`, {
    id: t.sceneId,
    name: t.name,
    icon: t.icon,
    entities: t.entities
  }), await i.callService("scene", "reload");
}
function qt(i, t = 0.25) {
  const e = 1 / t;
  return Math.round(i * e) / e;
}
function Ea(i, t) {
  const e = Math.max(1, qt(i, 0.25)), n = Math.max(1, qt(t, 0.25));
  return [
    { x: 0, y: 0 },
    { x: e, y: 0 },
    { x: e, y: n },
    { x: 0, y: n }
  ];
}
function mu(i, t, e, n) {
  const s = Math.max(2, qt(i, 0.25)), r = Math.max(2, qt(t, 0.25)), a = Math.min(s - 0.75, Math.max(0.5, qt(e, 0.25))), o = Math.min(r - 0.75, Math.max(0.5, qt(n, 0.25)));
  return [
    { x: 0, y: 0 },
    { x: s, y: 0 },
    { x: s, y: r - o },
    { x: s - a, y: r - o },
    { x: s - a, y: r },
    { x: 0, y: r }
  ];
}
function gu(i, t, e, n, s = 0) {
  const r = Math.max(1.5, qt(i, 0.25)), a = Math.max(1.5, qt(t, 0.25)), o = Math.max(1.5, qt(e, 0.25)), l = Math.max(1.5, qt(n, 0.25)), c = qt(Math.max(0, s), 0.25);
  if (c === 0 && a === l)
    return Ea(r + o, a);
  const h = [
    { x: 0, y: 0 },
    { x: r, y: 0 }
  ];
  c > 0 ? h.push({ x: r, y: c }, { x: r + o, y: c }) : h.push({ x: r + o, y: 0 });
  const u = c + l;
  return h.push({ x: r + o, y: u }), u !== a && h.push({ x: r, y: u }, { x: r, y: a }), h.push({ x: 0, y: a }), h;
}
function _u(i, t, e = 0.25) {
  const n = qt(Math.max(0, t.x), e), s = qt(Math.max(0, t.y), e);
  if (!i)
    return { x: n, y: s };
  const r = Math.abs(n - i.x), a = Math.abs(s - i.y);
  return r >= a ? { x: n, y: i.y } : { x: i.x, y: s };
}
function vu(i, t) {
  return i.length <= 3 ? i : i.filter((e, n) => n !== t);
}
function xu(i) {
  const [t, e] = i.size;
  if (i.kind === "couch_l") {
    const n = Math.min(t * 0.65, Math.max(0.65, i.wing_width_m ?? 0.95)), s = Math.max(0.6, i.wing_depth_m ?? 1.15), r = i.l_side === "right" ? t / 2 - n : -t / 2;
    return [
      { x: -t / 2, y: -e / 2, width: t, height: e },
      { x: r, y: -e / 2 - s, width: n, height: s }
    ];
  }
  if (i.kind === "couch_u") {
    const n = Math.min(t * 0.4, Math.max(0.6, i.wing_width_m ?? 0.9)), s = Math.max(0.6, i.wing_depth_m ?? 1.15);
    return [
      { x: -t / 2, y: -e / 2, width: t, height: e },
      { x: -t / 2, y: -e / 2 - s, width: n, height: s },
      { x: t / 2 - n, y: -e / 2 - s, width: n, height: s }
    ];
  }
  return [{ x: -t / 2, y: -e / 2, width: t, height: e }];
}
/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
const wa = "170", Oi = { ROTATE: 0, DOLLY: 1, PAN: 2 }, Di = { ROTATE: 0, PAN: 1, DOLLY_PAN: 2, DOLLY_ROTATE: 3 }, yu = 0, _l = 1, Mu = 2, Vc = 1, bu = 2, mn = 3, Fn = 0, Ne = 1, $e = 2, Un = 0, Fi = 1, Eo = 2, vl = 3, xl = 4, Su = 5, Zn = 100, Eu = 101, wu = 102, Tu = 103, Au = 104, Cu = 200, Ru = 201, Pu = 202, Lu = 203, wo = 204, To = 205, Du = 206, Iu = 207, Uu = 208, Nu = 209, Ou = 210, Fu = 211, ku = 212, Bu = 213, zu = 214, Ao = 0, Co = 1, Ro = 2, Vi = 3, Po = 4, Lo = 5, Do = 6, Io = 7, Gc = 0, Hu = 1, Vu = 2, Nn = 0, Gu = 1, $u = 2, Wu = 3, Xu = 4, Yu = 5, qu = 6, ju = 7, $c = 300, Gi = 301, $i = 302, Uo = 303, No = 304, Ar = 306, Oo = 1e3, ti = 1001, Fo = 1002, Je = 1003, Zu = 1004, Os = 1005, sn = 1006, zr = 1007, ei = 1008, yn = 1009, Wc = 1010, Xc = 1011, Es = 1012, Ta = 1013, oi = 1014, gn = 1015, Ps = 1016, Aa = 1017, Ca = 1018, Wi = 1020, Yc = 35902, qc = 1021, jc = 1022, Ke = 1023, Zc = 1024, Kc = 1025, ki = 1026, Xi = 1027, Jc = 1028, Ra = 1029, Qc = 1030, Pa = 1031, La = 1033, dr = 33776, fr = 33777, pr = 33778, mr = 33779, ko = 35840, Bo = 35841, zo = 35842, Ho = 35843, Vo = 36196, Go = 37492, $o = 37496, Wo = 37808, Xo = 37809, Yo = 37810, qo = 37811, jo = 37812, Zo = 37813, Ko = 37814, Jo = 37815, Qo = 37816, ta = 37817, ea = 37818, na = 37819, ia = 37820, sa = 37821, gr = 36492, ra = 36494, oa = 36495, th = 36283, aa = 36284, la = 36285, ca = 36286, Ku = 3200, Ju = 3201, eh = 0, Qu = 1, Ln = "", Ge = "srgb", qi = "srgb-linear", Cr = "linear", se = "srgb", mi = 7680, yl = 519, td = 512, ed = 513, nd = 514, nh = 515, id = 516, sd = 517, rd = 518, od = 519, Ml = 35044, bl = "300 es", _n = 2e3, Mr = 2001;
class di {
  addEventListener(t, e) {
    this._listeners === void 0 && (this._listeners = {});
    const n = this._listeners;
    n[t] === void 0 && (n[t] = []), n[t].indexOf(e) === -1 && n[t].push(e);
  }
  hasEventListener(t, e) {
    if (this._listeners === void 0) return !1;
    const n = this._listeners;
    return n[t] !== void 0 && n[t].indexOf(e) !== -1;
  }
  removeEventListener(t, e) {
    if (this._listeners === void 0) return;
    const s = this._listeners[t];
    if (s !== void 0) {
      const r = s.indexOf(e);
      r !== -1 && s.splice(r, 1);
    }
  }
  dispatchEvent(t) {
    if (this._listeners === void 0) return;
    const n = this._listeners[t.type];
    if (n !== void 0) {
      t.target = this;
      const s = n.slice(0);
      for (let r = 0, a = s.length; r < a; r++)
        s[r].call(this, t);
      t.target = null;
    }
  }
}
const Te = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"];
let Sl = 1234567;
const ps = Math.PI / 180, ws = 180 / Math.PI;
function fi() {
  const i = Math.random() * 4294967295 | 0, t = Math.random() * 4294967295 | 0, e = Math.random() * 4294967295 | 0, n = Math.random() * 4294967295 | 0;
  return (Te[i & 255] + Te[i >> 8 & 255] + Te[i >> 16 & 255] + Te[i >> 24 & 255] + "-" + Te[t & 255] + Te[t >> 8 & 255] + "-" + Te[t >> 16 & 15 | 64] + Te[t >> 24 & 255] + "-" + Te[e & 63 | 128] + Te[e >> 8 & 255] + "-" + Te[e >> 16 & 255] + Te[e >> 24 & 255] + Te[n & 255] + Te[n >> 8 & 255] + Te[n >> 16 & 255] + Te[n >> 24 & 255]).toLowerCase();
}
function Se(i, t, e) {
  return Math.max(t, Math.min(e, i));
}
function Da(i, t) {
  return (i % t + t) % t;
}
function ad(i, t, e, n, s) {
  return n + (i - t) * (s - n) / (e - t);
}
function ld(i, t, e) {
  return i !== t ? (e - i) / (t - i) : 0;
}
function ms(i, t, e) {
  return (1 - e) * i + e * t;
}
function cd(i, t, e, n) {
  return ms(i, t, 1 - Math.exp(-e * n));
}
function hd(i, t = 1) {
  return t - Math.abs(Da(i, t * 2) - t);
}
function ud(i, t, e) {
  return i <= t ? 0 : i >= e ? 1 : (i = (i - t) / (e - t), i * i * (3 - 2 * i));
}
function dd(i, t, e) {
  return i <= t ? 0 : i >= e ? 1 : (i = (i - t) / (e - t), i * i * i * (i * (i * 6 - 15) + 10));
}
function fd(i, t) {
  return i + Math.floor(Math.random() * (t - i + 1));
}
function pd(i, t) {
  return i + Math.random() * (t - i);
}
function md(i) {
  return i * (0.5 - Math.random());
}
function gd(i) {
  i !== void 0 && (Sl = i);
  let t = Sl += 1831565813;
  return t = Math.imul(t ^ t >>> 15, t | 1), t ^= t + Math.imul(t ^ t >>> 7, t | 61), ((t ^ t >>> 14) >>> 0) / 4294967296;
}
function _d(i) {
  return i * ps;
}
function vd(i) {
  return i * ws;
}
function xd(i) {
  return (i & i - 1) === 0 && i !== 0;
}
function yd(i) {
  return Math.pow(2, Math.ceil(Math.log(i) / Math.LN2));
}
function Md(i) {
  return Math.pow(2, Math.floor(Math.log(i) / Math.LN2));
}
function bd(i, t, e, n, s) {
  const r = Math.cos, a = Math.sin, o = r(e / 2), l = a(e / 2), c = r((t + n) / 2), h = a((t + n) / 2), u = r((t - n) / 2), d = a((t - n) / 2), p = r((n - t) / 2), g = a((n - t) / 2);
  switch (s) {
    case "XYX":
      i.set(o * h, l * u, l * d, o * c);
      break;
    case "YZY":
      i.set(l * d, o * h, l * u, o * c);
      break;
    case "ZXZ":
      i.set(l * u, l * d, o * h, o * c);
      break;
    case "XZX":
      i.set(o * h, l * g, l * p, o * c);
      break;
    case "YXY":
      i.set(l * p, o * h, l * g, o * c);
      break;
    case "ZYZ":
      i.set(l * g, l * p, o * h, o * c);
      break;
    default:
      console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: " + s);
  }
}
function Pi(i, t) {
  switch (t.constructor) {
    case Float32Array:
      return i;
    case Uint32Array:
      return i / 4294967295;
    case Uint16Array:
      return i / 65535;
    case Uint8Array:
      return i / 255;
    case Int32Array:
      return Math.max(i / 2147483647, -1);
    case Int16Array:
      return Math.max(i / 32767, -1);
    case Int8Array:
      return Math.max(i / 127, -1);
    default:
      throw new Error("Invalid component type.");
  }
}
function Re(i, t) {
  switch (t.constructor) {
    case Float32Array:
      return i;
    case Uint32Array:
      return Math.round(i * 4294967295);
    case Uint16Array:
      return Math.round(i * 65535);
    case Uint8Array:
      return Math.round(i * 255);
    case Int32Array:
      return Math.round(i * 2147483647);
    case Int16Array:
      return Math.round(i * 32767);
    case Int8Array:
      return Math.round(i * 127);
    default:
      throw new Error("Invalid component type.");
  }
}
const Ia = {
  DEG2RAD: ps,
  RAD2DEG: ws,
  generateUUID: fi,
  clamp: Se,
  euclideanModulo: Da,
  mapLinear: ad,
  inverseLerp: ld,
  lerp: ms,
  damp: cd,
  pingpong: hd,
  smoothstep: ud,
  smootherstep: dd,
  randInt: fd,
  randFloat: pd,
  randFloatSpread: md,
  seededRandom: gd,
  degToRad: _d,
  radToDeg: vd,
  isPowerOfTwo: xd,
  ceilPowerOfTwo: yd,
  floorPowerOfTwo: Md,
  setQuaternionFromProperEuler: bd,
  normalize: Re,
  denormalize: Pi
};
class et {
  constructor(t = 0, e = 0) {
    et.prototype.isVector2 = !0, this.x = t, this.y = e;
  }
  get width() {
    return this.x;
  }
  set width(t) {
    this.x = t;
  }
  get height() {
    return this.y;
  }
  set height(t) {
    this.y = t;
  }
  set(t, e) {
    return this.x = t, this.y = e, this;
  }
  setScalar(t) {
    return this.x = t, this.y = t, this;
  }
  setX(t) {
    return this.x = t, this;
  }
  setY(t) {
    return this.y = t, this;
  }
  setComponent(t, e) {
    switch (t) {
      case 0:
        this.x = e;
        break;
      case 1:
        this.y = e;
        break;
      default:
        throw new Error("index is out of range: " + t);
    }
    return this;
  }
  getComponent(t) {
    switch (t) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      default:
        throw new Error("index is out of range: " + t);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y);
  }
  copy(t) {
    return this.x = t.x, this.y = t.y, this;
  }
  add(t) {
    return this.x += t.x, this.y += t.y, this;
  }
  addScalar(t) {
    return this.x += t, this.y += t, this;
  }
  addVectors(t, e) {
    return this.x = t.x + e.x, this.y = t.y + e.y, this;
  }
  addScaledVector(t, e) {
    return this.x += t.x * e, this.y += t.y * e, this;
  }
  sub(t) {
    return this.x -= t.x, this.y -= t.y, this;
  }
  subScalar(t) {
    return this.x -= t, this.y -= t, this;
  }
  subVectors(t, e) {
    return this.x = t.x - e.x, this.y = t.y - e.y, this;
  }
  multiply(t) {
    return this.x *= t.x, this.y *= t.y, this;
  }
  multiplyScalar(t) {
    return this.x *= t, this.y *= t, this;
  }
  divide(t) {
    return this.x /= t.x, this.y /= t.y, this;
  }
  divideScalar(t) {
    return this.multiplyScalar(1 / t);
  }
  applyMatrix3(t) {
    const e = this.x, n = this.y, s = t.elements;
    return this.x = s[0] * e + s[3] * n + s[6], this.y = s[1] * e + s[4] * n + s[7], this;
  }
  min(t) {
    return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this;
  }
  max(t) {
    return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this;
  }
  clamp(t, e) {
    return this.x = Math.max(t.x, Math.min(e.x, this.x)), this.y = Math.max(t.y, Math.min(e.y, this.y)), this;
  }
  clampScalar(t, e) {
    return this.x = Math.max(t, Math.min(e, this.x)), this.y = Math.max(t, Math.min(e, this.y)), this;
  }
  clampLength(t, e) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Math.max(t, Math.min(e, n)));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this;
  }
  dot(t) {
    return this.x * t.x + this.y * t.y;
  }
  cross(t) {
    return this.x * t.y - this.y * t.x;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  angle() {
    return Math.atan2(-this.y, -this.x) + Math.PI;
  }
  angleTo(t) {
    const e = Math.sqrt(this.lengthSq() * t.lengthSq());
    if (e === 0) return Math.PI / 2;
    const n = this.dot(t) / e;
    return Math.acos(Se(n, -1, 1));
  }
  distanceTo(t) {
    return Math.sqrt(this.distanceToSquared(t));
  }
  distanceToSquared(t) {
    const e = this.x - t.x, n = this.y - t.y;
    return e * e + n * n;
  }
  manhattanDistanceTo(t) {
    return Math.abs(this.x - t.x) + Math.abs(this.y - t.y);
  }
  setLength(t) {
    return this.normalize().multiplyScalar(t);
  }
  lerp(t, e) {
    return this.x += (t.x - this.x) * e, this.y += (t.y - this.y) * e, this;
  }
  lerpVectors(t, e, n) {
    return this.x = t.x + (e.x - t.x) * n, this.y = t.y + (e.y - t.y) * n, this;
  }
  equals(t) {
    return t.x === this.x && t.y === this.y;
  }
  fromArray(t, e = 0) {
    return this.x = t[e], this.y = t[e + 1], this;
  }
  toArray(t = [], e = 0) {
    return t[e] = this.x, t[e + 1] = this.y, t;
  }
  fromBufferAttribute(t, e) {
    return this.x = t.getX(e), this.y = t.getY(e), this;
  }
  rotateAround(t, e) {
    const n = Math.cos(e), s = Math.sin(e), r = this.x - t.x, a = this.y - t.y;
    return this.x = r * n - a * s + t.x, this.y = r * s + a * n + t.y, this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y;
  }
}
class Ht {
  constructor(t, e, n, s, r, a, o, l, c) {
    Ht.prototype.isMatrix3 = !0, this.elements = [
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ], t !== void 0 && this.set(t, e, n, s, r, a, o, l, c);
  }
  set(t, e, n, s, r, a, o, l, c) {
    const h = this.elements;
    return h[0] = t, h[1] = s, h[2] = o, h[3] = e, h[4] = r, h[5] = l, h[6] = n, h[7] = a, h[8] = c, this;
  }
  identity() {
    return this.set(
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ), this;
  }
  copy(t) {
    const e = this.elements, n = t.elements;
    return e[0] = n[0], e[1] = n[1], e[2] = n[2], e[3] = n[3], e[4] = n[4], e[5] = n[5], e[6] = n[6], e[7] = n[7], e[8] = n[8], this;
  }
  extractBasis(t, e, n) {
    return t.setFromMatrix3Column(this, 0), e.setFromMatrix3Column(this, 1), n.setFromMatrix3Column(this, 2), this;
  }
  setFromMatrix4(t) {
    const e = t.elements;
    return this.set(
      e[0],
      e[4],
      e[8],
      e[1],
      e[5],
      e[9],
      e[2],
      e[6],
      e[10]
    ), this;
  }
  multiply(t) {
    return this.multiplyMatrices(this, t);
  }
  premultiply(t) {
    return this.multiplyMatrices(t, this);
  }
  multiplyMatrices(t, e) {
    const n = t.elements, s = e.elements, r = this.elements, a = n[0], o = n[3], l = n[6], c = n[1], h = n[4], u = n[7], d = n[2], p = n[5], g = n[8], _ = s[0], f = s[3], m = s[6], b = s[1], x = s[4], v = s[7], w = s[2], A = s[5], C = s[8];
    return r[0] = a * _ + o * b + l * w, r[3] = a * f + o * x + l * A, r[6] = a * m + o * v + l * C, r[1] = c * _ + h * b + u * w, r[4] = c * f + h * x + u * A, r[7] = c * m + h * v + u * C, r[2] = d * _ + p * b + g * w, r[5] = d * f + p * x + g * A, r[8] = d * m + p * v + g * C, this;
  }
  multiplyScalar(t) {
    const e = this.elements;
    return e[0] *= t, e[3] *= t, e[6] *= t, e[1] *= t, e[4] *= t, e[7] *= t, e[2] *= t, e[5] *= t, e[8] *= t, this;
  }
  determinant() {
    const t = this.elements, e = t[0], n = t[1], s = t[2], r = t[3], a = t[4], o = t[5], l = t[6], c = t[7], h = t[8];
    return e * a * h - e * o * c - n * r * h + n * o * l + s * r * c - s * a * l;
  }
  invert() {
    const t = this.elements, e = t[0], n = t[1], s = t[2], r = t[3], a = t[4], o = t[5], l = t[6], c = t[7], h = t[8], u = h * a - o * c, d = o * l - h * r, p = c * r - a * l, g = e * u + n * d + s * p;
    if (g === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
    const _ = 1 / g;
    return t[0] = u * _, t[1] = (s * c - h * n) * _, t[2] = (o * n - s * a) * _, t[3] = d * _, t[4] = (h * e - s * l) * _, t[5] = (s * r - o * e) * _, t[6] = p * _, t[7] = (n * l - c * e) * _, t[8] = (a * e - n * r) * _, this;
  }
  transpose() {
    let t;
    const e = this.elements;
    return t = e[1], e[1] = e[3], e[3] = t, t = e[2], e[2] = e[6], e[6] = t, t = e[5], e[5] = e[7], e[7] = t, this;
  }
  getNormalMatrix(t) {
    return this.setFromMatrix4(t).invert().transpose();
  }
  transposeIntoArray(t) {
    const e = this.elements;
    return t[0] = e[0], t[1] = e[3], t[2] = e[6], t[3] = e[1], t[4] = e[4], t[5] = e[7], t[6] = e[2], t[7] = e[5], t[8] = e[8], this;
  }
  setUvTransform(t, e, n, s, r, a, o) {
    const l = Math.cos(r), c = Math.sin(r);
    return this.set(
      n * l,
      n * c,
      -n * (l * a + c * o) + a + t,
      -s * c,
      s * l,
      -s * (-c * a + l * o) + o + e,
      0,
      0,
      1
    ), this;
  }
  //
  scale(t, e) {
    return this.premultiply(Hr.makeScale(t, e)), this;
  }
  rotate(t) {
    return this.premultiply(Hr.makeRotation(-t)), this;
  }
  translate(t, e) {
    return this.premultiply(Hr.makeTranslation(t, e)), this;
  }
  // for 2D Transforms
  makeTranslation(t, e) {
    return t.isVector2 ? this.set(
      1,
      0,
      t.x,
      0,
      1,
      t.y,
      0,
      0,
      1
    ) : this.set(
      1,
      0,
      t,
      0,
      1,
      e,
      0,
      0,
      1
    ), this;
  }
  makeRotation(t) {
    const e = Math.cos(t), n = Math.sin(t);
    return this.set(
      e,
      -n,
      0,
      n,
      e,
      0,
      0,
      0,
      1
    ), this;
  }
  makeScale(t, e) {
    return this.set(
      t,
      0,
      0,
      0,
      e,
      0,
      0,
      0,
      1
    ), this;
  }
  //
  equals(t) {
    const e = this.elements, n = t.elements;
    for (let s = 0; s < 9; s++)
      if (e[s] !== n[s]) return !1;
    return !0;
  }
  fromArray(t, e = 0) {
    for (let n = 0; n < 9; n++)
      this.elements[n] = t[n + e];
    return this;
  }
  toArray(t = [], e = 0) {
    const n = this.elements;
    return t[e] = n[0], t[e + 1] = n[1], t[e + 2] = n[2], t[e + 3] = n[3], t[e + 4] = n[4], t[e + 5] = n[5], t[e + 6] = n[6], t[e + 7] = n[7], t[e + 8] = n[8], t;
  }
  clone() {
    return new this.constructor().fromArray(this.elements);
  }
}
const Hr = /* @__PURE__ */ new Ht();
function ih(i) {
  for (let t = i.length - 1; t >= 0; --t)
    if (i[t] >= 65535) return !0;
  return !1;
}
function br(i) {
  return document.createElementNS("http://www.w3.org/1999/xhtml", i);
}
function Sd() {
  const i = br("canvas");
  return i.style.display = "block", i;
}
const El = {};
function cs(i) {
  i in El || (El[i] = !0, console.warn(i));
}
function Ed(i, t, e) {
  return new Promise(function(n, s) {
    function r() {
      switch (i.clientWaitSync(t, i.SYNC_FLUSH_COMMANDS_BIT, 0)) {
        case i.WAIT_FAILED:
          s();
          break;
        case i.TIMEOUT_EXPIRED:
          setTimeout(r, e);
          break;
        default:
          n();
      }
    }
    setTimeout(r, e);
  });
}
function wd(i) {
  const t = i.elements;
  t[2] = 0.5 * t[2] + 0.5 * t[3], t[6] = 0.5 * t[6] + 0.5 * t[7], t[10] = 0.5 * t[10] + 0.5 * t[11], t[14] = 0.5 * t[14] + 0.5 * t[15];
}
function Td(i) {
  const t = i.elements;
  t[11] === -1 ? (t[10] = -t[10] - 1, t[14] = -t[14]) : (t[10] = -t[10], t[14] = -t[14] + 1);
}
const Kt = {
  enabled: !0,
  workingColorSpace: qi,
  /**
   * Implementations of supported color spaces.
   *
   * Required:
   *	- primaries: chromaticity coordinates [ rx ry gx gy bx by ]
   *	- whitePoint: reference white [ x y ]
   *	- transfer: transfer function (pre-defined)
   *	- toXYZ: Matrix3 RGB to XYZ transform
   *	- fromXYZ: Matrix3 XYZ to RGB transform
   *	- luminanceCoefficients: RGB luminance coefficients
   *
   * Optional:
   *  - outputColorSpaceConfig: { drawingBufferColorSpace: ColorSpace }
   *  - workingColorSpaceConfig: { unpackColorSpace: ColorSpace }
   *
   * Reference:
   * - https://www.russellcottrell.com/photo/matrixCalculator.htm
   */
  spaces: {},
  convert: function(i, t, e) {
    return this.enabled === !1 || t === e || !t || !e || (this.spaces[t].transfer === se && (i.r = xn(i.r), i.g = xn(i.g), i.b = xn(i.b)), this.spaces[t].primaries !== this.spaces[e].primaries && (i.applyMatrix3(this.spaces[t].toXYZ), i.applyMatrix3(this.spaces[e].fromXYZ)), this.spaces[e].transfer === se && (i.r = Bi(i.r), i.g = Bi(i.g), i.b = Bi(i.b))), i;
  },
  fromWorkingColorSpace: function(i, t) {
    return this.convert(i, this.workingColorSpace, t);
  },
  toWorkingColorSpace: function(i, t) {
    return this.convert(i, t, this.workingColorSpace);
  },
  getPrimaries: function(i) {
    return this.spaces[i].primaries;
  },
  getTransfer: function(i) {
    return i === Ln ? Cr : this.spaces[i].transfer;
  },
  getLuminanceCoefficients: function(i, t = this.workingColorSpace) {
    return i.fromArray(this.spaces[t].luminanceCoefficients);
  },
  define: function(i) {
    Object.assign(this.spaces, i);
  },
  // Internal APIs
  _getMatrix: function(i, t, e) {
    return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ);
  },
  _getDrawingBufferColorSpace: function(i) {
    return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace;
  },
  _getUnpackColorSpace: function(i = this.workingColorSpace) {
    return this.spaces[i].workingColorSpaceConfig.unpackColorSpace;
  }
};
function xn(i) {
  return i < 0.04045 ? i * 0.0773993808 : Math.pow(i * 0.9478672986 + 0.0521327014, 2.4);
}
function Bi(i) {
  return i < 31308e-7 ? i * 12.92 : 1.055 * Math.pow(i, 0.41666) - 0.055;
}
const wl = [0.64, 0.33, 0.3, 0.6, 0.15, 0.06], Tl = [0.2126, 0.7152, 0.0722], Al = [0.3127, 0.329], Cl = /* @__PURE__ */ new Ht().set(
  0.4123908,
  0.3575843,
  0.1804808,
  0.212639,
  0.7151687,
  0.0721923,
  0.0193308,
  0.1191948,
  0.9505322
), Rl = /* @__PURE__ */ new Ht().set(
  3.2409699,
  -1.5373832,
  -0.4986108,
  -0.9692436,
  1.8759675,
  0.0415551,
  0.0556301,
  -0.203977,
  1.0569715
);
Kt.define({
  [qi]: {
    primaries: wl,
    whitePoint: Al,
    transfer: Cr,
    toXYZ: Cl,
    fromXYZ: Rl,
    luminanceCoefficients: Tl,
    workingColorSpaceConfig: { unpackColorSpace: Ge },
    outputColorSpaceConfig: { drawingBufferColorSpace: Ge }
  },
  [Ge]: {
    primaries: wl,
    whitePoint: Al,
    transfer: se,
    toXYZ: Cl,
    fromXYZ: Rl,
    luminanceCoefficients: Tl,
    outputColorSpaceConfig: { drawingBufferColorSpace: Ge }
  }
});
let gi;
class Ad {
  static getDataURL(t) {
    if (/^data:/i.test(t.src) || typeof HTMLCanvasElement > "u")
      return t.src;
    let e;
    if (t instanceof HTMLCanvasElement)
      e = t;
    else {
      gi === void 0 && (gi = br("canvas")), gi.width = t.width, gi.height = t.height;
      const n = gi.getContext("2d");
      t instanceof ImageData ? n.putImageData(t, 0, 0) : n.drawImage(t, 0, 0, t.width, t.height), e = gi;
    }
    return e.width > 2048 || e.height > 2048 ? (console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons", t), e.toDataURL("image/jpeg", 0.6)) : e.toDataURL("image/png");
  }
  static sRGBToLinear(t) {
    if (typeof HTMLImageElement < "u" && t instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && t instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && t instanceof ImageBitmap) {
      const e = br("canvas");
      e.width = t.width, e.height = t.height;
      const n = e.getContext("2d");
      n.drawImage(t, 0, 0, t.width, t.height);
      const s = n.getImageData(0, 0, t.width, t.height), r = s.data;
      for (let a = 0; a < r.length; a++)
        r[a] = xn(r[a] / 255) * 255;
      return n.putImageData(s, 0, 0), e;
    } else if (t.data) {
      const e = t.data.slice(0);
      for (let n = 0; n < e.length; n++)
        e instanceof Uint8Array || e instanceof Uint8ClampedArray ? e[n] = Math.floor(xn(e[n] / 255) * 255) : e[n] = xn(e[n]);
      return {
        data: e,
        width: t.width,
        height: t.height
      };
    } else
      return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), t;
  }
}
let Cd = 0;
class sh {
  constructor(t = null) {
    this.isSource = !0, Object.defineProperty(this, "id", { value: Cd++ }), this.uuid = fi(), this.data = t, this.dataReady = !0, this.version = 0;
  }
  set needsUpdate(t) {
    t === !0 && this.version++;
  }
  toJSON(t) {
    const e = t === void 0 || typeof t == "string";
    if (!e && t.images[this.uuid] !== void 0)
      return t.images[this.uuid];
    const n = {
      uuid: this.uuid,
      url: ""
    }, s = this.data;
    if (s !== null) {
      let r;
      if (Array.isArray(s)) {
        r = [];
        for (let a = 0, o = s.length; a < o; a++)
          s[a].isDataTexture ? r.push(Vr(s[a].image)) : r.push(Vr(s[a]));
      } else
        r = Vr(s);
      n.url = r;
    }
    return e || (t.images[this.uuid] = n), n;
  }
}
function Vr(i) {
  return typeof HTMLImageElement < "u" && i instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && i instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && i instanceof ImageBitmap ? Ad.getDataURL(i) : i.data ? {
    data: Array.from(i.data),
    width: i.width,
    height: i.height,
    type: i.data.constructor.name
  } : (console.warn("THREE.Texture: Unable to serialize Texture."), {});
}
let Rd = 0;
class Oe extends di {
  constructor(t = Oe.DEFAULT_IMAGE, e = Oe.DEFAULT_MAPPING, n = ti, s = ti, r = sn, a = ei, o = Ke, l = yn, c = Oe.DEFAULT_ANISOTROPY, h = Ln) {
    super(), this.isTexture = !0, Object.defineProperty(this, "id", { value: Rd++ }), this.uuid = fi(), this.name = "", this.source = new sh(t), this.mipmaps = [], this.mapping = e, this.channel = 0, this.wrapS = n, this.wrapT = s, this.magFilter = r, this.minFilter = a, this.anisotropy = c, this.format = o, this.internalFormat = null, this.type = l, this.offset = new et(0, 0), this.repeat = new et(1, 1), this.center = new et(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new Ht(), this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.colorSpace = h, this.userData = {}, this.version = 0, this.onUpdate = null, this.isRenderTargetTexture = !1, this.pmremVersion = 0;
  }
  get image() {
    return this.source.data;
  }
  set image(t = null) {
    this.source.data = t;
  }
  updateMatrix() {
    this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    return this.name = t.name, this.source = t.source, this.mipmaps = t.mipmaps.slice(0), this.mapping = t.mapping, this.channel = t.channel, this.wrapS = t.wrapS, this.wrapT = t.wrapT, this.magFilter = t.magFilter, this.minFilter = t.minFilter, this.anisotropy = t.anisotropy, this.format = t.format, this.internalFormat = t.internalFormat, this.type = t.type, this.offset.copy(t.offset), this.repeat.copy(t.repeat), this.center.copy(t.center), this.rotation = t.rotation, this.matrixAutoUpdate = t.matrixAutoUpdate, this.matrix.copy(t.matrix), this.generateMipmaps = t.generateMipmaps, this.premultiplyAlpha = t.premultiplyAlpha, this.flipY = t.flipY, this.unpackAlignment = t.unpackAlignment, this.colorSpace = t.colorSpace, this.userData = JSON.parse(JSON.stringify(t.userData)), this.needsUpdate = !0, this;
  }
  toJSON(t) {
    const e = t === void 0 || typeof t == "string";
    if (!e && t.textures[this.uuid] !== void 0)
      return t.textures[this.uuid];
    const n = {
      metadata: {
        version: 4.6,
        type: "Texture",
        generator: "Texture.toJSON"
      },
      uuid: this.uuid,
      name: this.name,
      image: this.source.toJSON(t).uuid,
      mapping: this.mapping,
      channel: this.channel,
      repeat: [this.repeat.x, this.repeat.y],
      offset: [this.offset.x, this.offset.y],
      center: [this.center.x, this.center.y],
      rotation: this.rotation,
      wrap: [this.wrapS, this.wrapT],
      format: this.format,
      internalFormat: this.internalFormat,
      type: this.type,
      colorSpace: this.colorSpace,
      minFilter: this.minFilter,
      magFilter: this.magFilter,
      anisotropy: this.anisotropy,
      flipY: this.flipY,
      generateMipmaps: this.generateMipmaps,
      premultiplyAlpha: this.premultiplyAlpha,
      unpackAlignment: this.unpackAlignment
    };
    return Object.keys(this.userData).length > 0 && (n.userData = this.userData), e || (t.textures[this.uuid] = n), n;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  transformUv(t) {
    if (this.mapping !== $c) return t;
    if (t.applyMatrix3(this.matrix), t.x < 0 || t.x > 1)
      switch (this.wrapS) {
        case Oo:
          t.x = t.x - Math.floor(t.x);
          break;
        case ti:
          t.x = t.x < 0 ? 0 : 1;
          break;
        case Fo:
          Math.abs(Math.floor(t.x) % 2) === 1 ? t.x = Math.ceil(t.x) - t.x : t.x = t.x - Math.floor(t.x);
          break;
      }
    if (t.y < 0 || t.y > 1)
      switch (this.wrapT) {
        case Oo:
          t.y = t.y - Math.floor(t.y);
          break;
        case ti:
          t.y = t.y < 0 ? 0 : 1;
          break;
        case Fo:
          Math.abs(Math.floor(t.y) % 2) === 1 ? t.y = Math.ceil(t.y) - t.y : t.y = t.y - Math.floor(t.y);
          break;
      }
    return this.flipY && (t.y = 1 - t.y), t;
  }
  set needsUpdate(t) {
    t === !0 && (this.version++, this.source.needsUpdate = !0);
  }
  set needsPMREMUpdate(t) {
    t === !0 && this.pmremVersion++;
  }
}
Oe.DEFAULT_IMAGE = null;
Oe.DEFAULT_MAPPING = $c;
Oe.DEFAULT_ANISOTROPY = 1;
class oe {
  constructor(t = 0, e = 0, n = 0, s = 1) {
    oe.prototype.isVector4 = !0, this.x = t, this.y = e, this.z = n, this.w = s;
  }
  get width() {
    return this.z;
  }
  set width(t) {
    this.z = t;
  }
  get height() {
    return this.w;
  }
  set height(t) {
    this.w = t;
  }
  set(t, e, n, s) {
    return this.x = t, this.y = e, this.z = n, this.w = s, this;
  }
  setScalar(t) {
    return this.x = t, this.y = t, this.z = t, this.w = t, this;
  }
  setX(t) {
    return this.x = t, this;
  }
  setY(t) {
    return this.y = t, this;
  }
  setZ(t) {
    return this.z = t, this;
  }
  setW(t) {
    return this.w = t, this;
  }
  setComponent(t, e) {
    switch (t) {
      case 0:
        this.x = e;
        break;
      case 1:
        this.y = e;
        break;
      case 2:
        this.z = e;
        break;
      case 3:
        this.w = e;
        break;
      default:
        throw new Error("index is out of range: " + t);
    }
    return this;
  }
  getComponent(t) {
    switch (t) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      case 3:
        return this.w;
      default:
        throw new Error("index is out of range: " + t);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z, this.w);
  }
  copy(t) {
    return this.x = t.x, this.y = t.y, this.z = t.z, this.w = t.w !== void 0 ? t.w : 1, this;
  }
  add(t) {
    return this.x += t.x, this.y += t.y, this.z += t.z, this.w += t.w, this;
  }
  addScalar(t) {
    return this.x += t, this.y += t, this.z += t, this.w += t, this;
  }
  addVectors(t, e) {
    return this.x = t.x + e.x, this.y = t.y + e.y, this.z = t.z + e.z, this.w = t.w + e.w, this;
  }
  addScaledVector(t, e) {
    return this.x += t.x * e, this.y += t.y * e, this.z += t.z * e, this.w += t.w * e, this;
  }
  sub(t) {
    return this.x -= t.x, this.y -= t.y, this.z -= t.z, this.w -= t.w, this;
  }
  subScalar(t) {
    return this.x -= t, this.y -= t, this.z -= t, this.w -= t, this;
  }
  subVectors(t, e) {
    return this.x = t.x - e.x, this.y = t.y - e.y, this.z = t.z - e.z, this.w = t.w - e.w, this;
  }
  multiply(t) {
    return this.x *= t.x, this.y *= t.y, this.z *= t.z, this.w *= t.w, this;
  }
  multiplyScalar(t) {
    return this.x *= t, this.y *= t, this.z *= t, this.w *= t, this;
  }
  applyMatrix4(t) {
    const e = this.x, n = this.y, s = this.z, r = this.w, a = t.elements;
    return this.x = a[0] * e + a[4] * n + a[8] * s + a[12] * r, this.y = a[1] * e + a[5] * n + a[9] * s + a[13] * r, this.z = a[2] * e + a[6] * n + a[10] * s + a[14] * r, this.w = a[3] * e + a[7] * n + a[11] * s + a[15] * r, this;
  }
  divide(t) {
    return this.x /= t.x, this.y /= t.y, this.z /= t.z, this.w /= t.w, this;
  }
  divideScalar(t) {
    return this.multiplyScalar(1 / t);
  }
  setAxisAngleFromQuaternion(t) {
    this.w = 2 * Math.acos(t.w);
    const e = Math.sqrt(1 - t.w * t.w);
    return e < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = t.x / e, this.y = t.y / e, this.z = t.z / e), this;
  }
  setAxisAngleFromRotationMatrix(t) {
    let e, n, s, r;
    const l = t.elements, c = l[0], h = l[4], u = l[8], d = l[1], p = l[5], g = l[9], _ = l[2], f = l[6], m = l[10];
    if (Math.abs(h - d) < 0.01 && Math.abs(u - _) < 0.01 && Math.abs(g - f) < 0.01) {
      if (Math.abs(h + d) < 0.1 && Math.abs(u + _) < 0.1 && Math.abs(g + f) < 0.1 && Math.abs(c + p + m - 3) < 0.1)
        return this.set(1, 0, 0, 0), this;
      e = Math.PI;
      const x = (c + 1) / 2, v = (p + 1) / 2, w = (m + 1) / 2, A = (h + d) / 4, C = (u + _) / 4, D = (g + f) / 4;
      return x > v && x > w ? x < 0.01 ? (n = 0, s = 0.707106781, r = 0.707106781) : (n = Math.sqrt(x), s = A / n, r = C / n) : v > w ? v < 0.01 ? (n = 0.707106781, s = 0, r = 0.707106781) : (s = Math.sqrt(v), n = A / s, r = D / s) : w < 0.01 ? (n = 0.707106781, s = 0.707106781, r = 0) : (r = Math.sqrt(w), n = C / r, s = D / r), this.set(n, s, r, e), this;
    }
    let b = Math.sqrt((f - g) * (f - g) + (u - _) * (u - _) + (d - h) * (d - h));
    return Math.abs(b) < 1e-3 && (b = 1), this.x = (f - g) / b, this.y = (u - _) / b, this.z = (d - h) / b, this.w = Math.acos((c + p + m - 1) / 2), this;
  }
  setFromMatrixPosition(t) {
    const e = t.elements;
    return this.x = e[12], this.y = e[13], this.z = e[14], this.w = e[15], this;
  }
  min(t) {
    return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this.z = Math.min(this.z, t.z), this.w = Math.min(this.w, t.w), this;
  }
  max(t) {
    return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this.z = Math.max(this.z, t.z), this.w = Math.max(this.w, t.w), this;
  }
  clamp(t, e) {
    return this.x = Math.max(t.x, Math.min(e.x, this.x)), this.y = Math.max(t.y, Math.min(e.y, this.y)), this.z = Math.max(t.z, Math.min(e.z, this.z)), this.w = Math.max(t.w, Math.min(e.w, this.w)), this;
  }
  clampScalar(t, e) {
    return this.x = Math.max(t, Math.min(e, this.x)), this.y = Math.max(t, Math.min(e, this.y)), this.z = Math.max(t, Math.min(e, this.z)), this.w = Math.max(t, Math.min(e, this.w)), this;
  }
  clampLength(t, e) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Math.max(t, Math.min(e, n)));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this.w = Math.trunc(this.w), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this;
  }
  dot(t) {
    return this.x * t.x + this.y * t.y + this.z * t.z + this.w * t.w;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(t) {
    return this.normalize().multiplyScalar(t);
  }
  lerp(t, e) {
    return this.x += (t.x - this.x) * e, this.y += (t.y - this.y) * e, this.z += (t.z - this.z) * e, this.w += (t.w - this.w) * e, this;
  }
  lerpVectors(t, e, n) {
    return this.x = t.x + (e.x - t.x) * n, this.y = t.y + (e.y - t.y) * n, this.z = t.z + (e.z - t.z) * n, this.w = t.w + (e.w - t.w) * n, this;
  }
  equals(t) {
    return t.x === this.x && t.y === this.y && t.z === this.z && t.w === this.w;
  }
  fromArray(t, e = 0) {
    return this.x = t[e], this.y = t[e + 1], this.z = t[e + 2], this.w = t[e + 3], this;
  }
  toArray(t = [], e = 0) {
    return t[e] = this.x, t[e + 1] = this.y, t[e + 2] = this.z, t[e + 3] = this.w, t;
  }
  fromBufferAttribute(t, e) {
    return this.x = t.getX(e), this.y = t.getY(e), this.z = t.getZ(e), this.w = t.getW(e), this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this.w = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z, yield this.w;
  }
}
class Pd extends di {
  constructor(t = 1, e = 1, n = {}) {
    super(), this.isRenderTarget = !0, this.width = t, this.height = e, this.depth = 1, this.scissor = new oe(0, 0, t, e), this.scissorTest = !1, this.viewport = new oe(0, 0, t, e);
    const s = { width: t, height: e, depth: 1 };
    n = Object.assign({
      generateMipmaps: !1,
      internalFormat: null,
      minFilter: sn,
      depthBuffer: !0,
      stencilBuffer: !1,
      resolveDepthBuffer: !0,
      resolveStencilBuffer: !0,
      depthTexture: null,
      samples: 0,
      count: 1
    }, n);
    const r = new Oe(s, n.mapping, n.wrapS, n.wrapT, n.magFilter, n.minFilter, n.format, n.type, n.anisotropy, n.colorSpace);
    r.flipY = !1, r.generateMipmaps = n.generateMipmaps, r.internalFormat = n.internalFormat, this.textures = [];
    const a = n.count;
    for (let o = 0; o < a; o++)
      this.textures[o] = r.clone(), this.textures[o].isRenderTargetTexture = !0;
    this.depthBuffer = n.depthBuffer, this.stencilBuffer = n.stencilBuffer, this.resolveDepthBuffer = n.resolveDepthBuffer, this.resolveStencilBuffer = n.resolveStencilBuffer, this.depthTexture = n.depthTexture, this.samples = n.samples;
  }
  get texture() {
    return this.textures[0];
  }
  set texture(t) {
    this.textures[0] = t;
  }
  setSize(t, e, n = 1) {
    if (this.width !== t || this.height !== e || this.depth !== n) {
      this.width = t, this.height = e, this.depth = n;
      for (let s = 0, r = this.textures.length; s < r; s++)
        this.textures[s].image.width = t, this.textures[s].image.height = e, this.textures[s].image.depth = n;
      this.dispose();
    }
    this.viewport.set(0, 0, t, e), this.scissor.set(0, 0, t, e);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    this.width = t.width, this.height = t.height, this.depth = t.depth, this.scissor.copy(t.scissor), this.scissorTest = t.scissorTest, this.viewport.copy(t.viewport), this.textures.length = 0;
    for (let n = 0, s = t.textures.length; n < s; n++)
      this.textures[n] = t.textures[n].clone(), this.textures[n].isRenderTargetTexture = !0;
    const e = Object.assign({}, t.texture.image);
    return this.texture.source = new sh(e), this.depthBuffer = t.depthBuffer, this.stencilBuffer = t.stencilBuffer, this.resolveDepthBuffer = t.resolveDepthBuffer, this.resolveStencilBuffer = t.resolveStencilBuffer, t.depthTexture !== null && (this.depthTexture = t.depthTexture.clone()), this.samples = t.samples, this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
class ai extends Pd {
  constructor(t = 1, e = 1, n = {}) {
    super(t, e, n), this.isWebGLRenderTarget = !0;
  }
}
class rh extends Oe {
  constructor(t = null, e = 1, n = 1, s = 1) {
    super(null), this.isDataArrayTexture = !0, this.image = { data: t, width: e, height: n, depth: s }, this.magFilter = Je, this.minFilter = Je, this.wrapR = ti, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1, this.layerUpdates = /* @__PURE__ */ new Set();
  }
  addLayerUpdate(t) {
    this.layerUpdates.add(t);
  }
  clearLayerUpdates() {
    this.layerUpdates.clear();
  }
}
class Ld extends Oe {
  constructor(t = null, e = 1, n = 1, s = 1) {
    super(null), this.isData3DTexture = !0, this.image = { data: t, width: e, height: n, depth: s }, this.magFilter = Je, this.minFilter = Je, this.wrapR = ti, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}
class li {
  constructor(t = 0, e = 0, n = 0, s = 1) {
    this.isQuaternion = !0, this._x = t, this._y = e, this._z = n, this._w = s;
  }
  static slerpFlat(t, e, n, s, r, a, o) {
    let l = n[s + 0], c = n[s + 1], h = n[s + 2], u = n[s + 3];
    const d = r[a + 0], p = r[a + 1], g = r[a + 2], _ = r[a + 3];
    if (o === 0) {
      t[e + 0] = l, t[e + 1] = c, t[e + 2] = h, t[e + 3] = u;
      return;
    }
    if (o === 1) {
      t[e + 0] = d, t[e + 1] = p, t[e + 2] = g, t[e + 3] = _;
      return;
    }
    if (u !== _ || l !== d || c !== p || h !== g) {
      let f = 1 - o;
      const m = l * d + c * p + h * g + u * _, b = m >= 0 ? 1 : -1, x = 1 - m * m;
      if (x > Number.EPSILON) {
        const w = Math.sqrt(x), A = Math.atan2(w, m * b);
        f = Math.sin(f * A) / w, o = Math.sin(o * A) / w;
      }
      const v = o * b;
      if (l = l * f + d * v, c = c * f + p * v, h = h * f + g * v, u = u * f + _ * v, f === 1 - o) {
        const w = 1 / Math.sqrt(l * l + c * c + h * h + u * u);
        l *= w, c *= w, h *= w, u *= w;
      }
    }
    t[e] = l, t[e + 1] = c, t[e + 2] = h, t[e + 3] = u;
  }
  static multiplyQuaternionsFlat(t, e, n, s, r, a) {
    const o = n[s], l = n[s + 1], c = n[s + 2], h = n[s + 3], u = r[a], d = r[a + 1], p = r[a + 2], g = r[a + 3];
    return t[e] = o * g + h * u + l * p - c * d, t[e + 1] = l * g + h * d + c * u - o * p, t[e + 2] = c * g + h * p + o * d - l * u, t[e + 3] = h * g - o * u - l * d - c * p, t;
  }
  get x() {
    return this._x;
  }
  set x(t) {
    this._x = t, this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(t) {
    this._y = t, this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(t) {
    this._z = t, this._onChangeCallback();
  }
  get w() {
    return this._w;
  }
  set w(t) {
    this._w = t, this._onChangeCallback();
  }
  set(t, e, n, s) {
    return this._x = t, this._y = e, this._z = n, this._w = s, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._w);
  }
  copy(t) {
    return this._x = t.x, this._y = t.y, this._z = t.z, this._w = t.w, this._onChangeCallback(), this;
  }
  setFromEuler(t, e = !0) {
    const n = t._x, s = t._y, r = t._z, a = t._order, o = Math.cos, l = Math.sin, c = o(n / 2), h = o(s / 2), u = o(r / 2), d = l(n / 2), p = l(s / 2), g = l(r / 2);
    switch (a) {
      case "XYZ":
        this._x = d * h * u + c * p * g, this._y = c * p * u - d * h * g, this._z = c * h * g + d * p * u, this._w = c * h * u - d * p * g;
        break;
      case "YXZ":
        this._x = d * h * u + c * p * g, this._y = c * p * u - d * h * g, this._z = c * h * g - d * p * u, this._w = c * h * u + d * p * g;
        break;
      case "ZXY":
        this._x = d * h * u - c * p * g, this._y = c * p * u + d * h * g, this._z = c * h * g + d * p * u, this._w = c * h * u - d * p * g;
        break;
      case "ZYX":
        this._x = d * h * u - c * p * g, this._y = c * p * u + d * h * g, this._z = c * h * g - d * p * u, this._w = c * h * u + d * p * g;
        break;
      case "YZX":
        this._x = d * h * u + c * p * g, this._y = c * p * u + d * h * g, this._z = c * h * g - d * p * u, this._w = c * h * u - d * p * g;
        break;
      case "XZY":
        this._x = d * h * u - c * p * g, this._y = c * p * u - d * h * g, this._z = c * h * g + d * p * u, this._w = c * h * u + d * p * g;
        break;
      default:
        console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: " + a);
    }
    return e === !0 && this._onChangeCallback(), this;
  }
  setFromAxisAngle(t, e) {
    const n = e / 2, s = Math.sin(n);
    return this._x = t.x * s, this._y = t.y * s, this._z = t.z * s, this._w = Math.cos(n), this._onChangeCallback(), this;
  }
  setFromRotationMatrix(t) {
    const e = t.elements, n = e[0], s = e[4], r = e[8], a = e[1], o = e[5], l = e[9], c = e[2], h = e[6], u = e[10], d = n + o + u;
    if (d > 0) {
      const p = 0.5 / Math.sqrt(d + 1);
      this._w = 0.25 / p, this._x = (h - l) * p, this._y = (r - c) * p, this._z = (a - s) * p;
    } else if (n > o && n > u) {
      const p = 2 * Math.sqrt(1 + n - o - u);
      this._w = (h - l) / p, this._x = 0.25 * p, this._y = (s + a) / p, this._z = (r + c) / p;
    } else if (o > u) {
      const p = 2 * Math.sqrt(1 + o - n - u);
      this._w = (r - c) / p, this._x = (s + a) / p, this._y = 0.25 * p, this._z = (l + h) / p;
    } else {
      const p = 2 * Math.sqrt(1 + u - n - o);
      this._w = (a - s) / p, this._x = (r + c) / p, this._y = (l + h) / p, this._z = 0.25 * p;
    }
    return this._onChangeCallback(), this;
  }
  setFromUnitVectors(t, e) {
    let n = t.dot(e) + 1;
    return n < Number.EPSILON ? (n = 0, Math.abs(t.x) > Math.abs(t.z) ? (this._x = -t.y, this._y = t.x, this._z = 0, this._w = n) : (this._x = 0, this._y = -t.z, this._z = t.y, this._w = n)) : (this._x = t.y * e.z - t.z * e.y, this._y = t.z * e.x - t.x * e.z, this._z = t.x * e.y - t.y * e.x, this._w = n), this.normalize();
  }
  angleTo(t) {
    return 2 * Math.acos(Math.abs(Se(this.dot(t), -1, 1)));
  }
  rotateTowards(t, e) {
    const n = this.angleTo(t);
    if (n === 0) return this;
    const s = Math.min(1, e / n);
    return this.slerp(t, s), this;
  }
  identity() {
    return this.set(0, 0, 0, 1);
  }
  invert() {
    return this.conjugate();
  }
  conjugate() {
    return this._x *= -1, this._y *= -1, this._z *= -1, this._onChangeCallback(), this;
  }
  dot(t) {
    return this._x * t._x + this._y * t._y + this._z * t._z + this._w * t._w;
  }
  lengthSq() {
    return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
  }
  length() {
    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
  }
  normalize() {
    let t = this.length();
    return t === 0 ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (t = 1 / t, this._x = this._x * t, this._y = this._y * t, this._z = this._z * t, this._w = this._w * t), this._onChangeCallback(), this;
  }
  multiply(t) {
    return this.multiplyQuaternions(this, t);
  }
  premultiply(t) {
    return this.multiplyQuaternions(t, this);
  }
  multiplyQuaternions(t, e) {
    const n = t._x, s = t._y, r = t._z, a = t._w, o = e._x, l = e._y, c = e._z, h = e._w;
    return this._x = n * h + a * o + s * c - r * l, this._y = s * h + a * l + r * o - n * c, this._z = r * h + a * c + n * l - s * o, this._w = a * h - n * o - s * l - r * c, this._onChangeCallback(), this;
  }
  slerp(t, e) {
    if (e === 0) return this;
    if (e === 1) return this.copy(t);
    const n = this._x, s = this._y, r = this._z, a = this._w;
    let o = a * t._w + n * t._x + s * t._y + r * t._z;
    if (o < 0 ? (this._w = -t._w, this._x = -t._x, this._y = -t._y, this._z = -t._z, o = -o) : this.copy(t), o >= 1)
      return this._w = a, this._x = n, this._y = s, this._z = r, this;
    const l = 1 - o * o;
    if (l <= Number.EPSILON) {
      const p = 1 - e;
      return this._w = p * a + e * this._w, this._x = p * n + e * this._x, this._y = p * s + e * this._y, this._z = p * r + e * this._z, this.normalize(), this;
    }
    const c = Math.sqrt(l), h = Math.atan2(c, o), u = Math.sin((1 - e) * h) / c, d = Math.sin(e * h) / c;
    return this._w = a * u + this._w * d, this._x = n * u + this._x * d, this._y = s * u + this._y * d, this._z = r * u + this._z * d, this._onChangeCallback(), this;
  }
  slerpQuaternions(t, e, n) {
    return this.copy(t).slerp(e, n);
  }
  random() {
    const t = 2 * Math.PI * Math.random(), e = 2 * Math.PI * Math.random(), n = Math.random(), s = Math.sqrt(1 - n), r = Math.sqrt(n);
    return this.set(
      s * Math.sin(t),
      s * Math.cos(t),
      r * Math.sin(e),
      r * Math.cos(e)
    );
  }
  equals(t) {
    return t._x === this._x && t._y === this._y && t._z === this._z && t._w === this._w;
  }
  fromArray(t, e = 0) {
    return this._x = t[e], this._y = t[e + 1], this._z = t[e + 2], this._w = t[e + 3], this._onChangeCallback(), this;
  }
  toArray(t = [], e = 0) {
    return t[e] = this._x, t[e + 1] = this._y, t[e + 2] = this._z, t[e + 3] = this._w, t;
  }
  fromBufferAttribute(t, e) {
    return this._x = t.getX(e), this._y = t.getY(e), this._z = t.getZ(e), this._w = t.getW(e), this._onChangeCallback(), this;
  }
  toJSON() {
    return this.toArray();
  }
  _onChange(t) {
    return this._onChangeCallback = t, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._w;
  }
}
class L {
  constructor(t = 0, e = 0, n = 0) {
    L.prototype.isVector3 = !0, this.x = t, this.y = e, this.z = n;
  }
  set(t, e, n) {
    return n === void 0 && (n = this.z), this.x = t, this.y = e, this.z = n, this;
  }
  setScalar(t) {
    return this.x = t, this.y = t, this.z = t, this;
  }
  setX(t) {
    return this.x = t, this;
  }
  setY(t) {
    return this.y = t, this;
  }
  setZ(t) {
    return this.z = t, this;
  }
  setComponent(t, e) {
    switch (t) {
      case 0:
        this.x = e;
        break;
      case 1:
        this.y = e;
        break;
      case 2:
        this.z = e;
        break;
      default:
        throw new Error("index is out of range: " + t);
    }
    return this;
  }
  getComponent(t) {
    switch (t) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      default:
        throw new Error("index is out of range: " + t);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z);
  }
  copy(t) {
    return this.x = t.x, this.y = t.y, this.z = t.z, this;
  }
  add(t) {
    return this.x += t.x, this.y += t.y, this.z += t.z, this;
  }
  addScalar(t) {
    return this.x += t, this.y += t, this.z += t, this;
  }
  addVectors(t, e) {
    return this.x = t.x + e.x, this.y = t.y + e.y, this.z = t.z + e.z, this;
  }
  addScaledVector(t, e) {
    return this.x += t.x * e, this.y += t.y * e, this.z += t.z * e, this;
  }
  sub(t) {
    return this.x -= t.x, this.y -= t.y, this.z -= t.z, this;
  }
  subScalar(t) {
    return this.x -= t, this.y -= t, this.z -= t, this;
  }
  subVectors(t, e) {
    return this.x = t.x - e.x, this.y = t.y - e.y, this.z = t.z - e.z, this;
  }
  multiply(t) {
    return this.x *= t.x, this.y *= t.y, this.z *= t.z, this;
  }
  multiplyScalar(t) {
    return this.x *= t, this.y *= t, this.z *= t, this;
  }
  multiplyVectors(t, e) {
    return this.x = t.x * e.x, this.y = t.y * e.y, this.z = t.z * e.z, this;
  }
  applyEuler(t) {
    return this.applyQuaternion(Pl.setFromEuler(t));
  }
  applyAxisAngle(t, e) {
    return this.applyQuaternion(Pl.setFromAxisAngle(t, e));
  }
  applyMatrix3(t) {
    const e = this.x, n = this.y, s = this.z, r = t.elements;
    return this.x = r[0] * e + r[3] * n + r[6] * s, this.y = r[1] * e + r[4] * n + r[7] * s, this.z = r[2] * e + r[5] * n + r[8] * s, this;
  }
  applyNormalMatrix(t) {
    return this.applyMatrix3(t).normalize();
  }
  applyMatrix4(t) {
    const e = this.x, n = this.y, s = this.z, r = t.elements, a = 1 / (r[3] * e + r[7] * n + r[11] * s + r[15]);
    return this.x = (r[0] * e + r[4] * n + r[8] * s + r[12]) * a, this.y = (r[1] * e + r[5] * n + r[9] * s + r[13]) * a, this.z = (r[2] * e + r[6] * n + r[10] * s + r[14]) * a, this;
  }
  applyQuaternion(t) {
    const e = this.x, n = this.y, s = this.z, r = t.x, a = t.y, o = t.z, l = t.w, c = 2 * (a * s - o * n), h = 2 * (o * e - r * s), u = 2 * (r * n - a * e);
    return this.x = e + l * c + a * u - o * h, this.y = n + l * h + o * c - r * u, this.z = s + l * u + r * h - a * c, this;
  }
  project(t) {
    return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix);
  }
  unproject(t) {
    return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld);
  }
  transformDirection(t) {
    const e = this.x, n = this.y, s = this.z, r = t.elements;
    return this.x = r[0] * e + r[4] * n + r[8] * s, this.y = r[1] * e + r[5] * n + r[9] * s, this.z = r[2] * e + r[6] * n + r[10] * s, this.normalize();
  }
  divide(t) {
    return this.x /= t.x, this.y /= t.y, this.z /= t.z, this;
  }
  divideScalar(t) {
    return this.multiplyScalar(1 / t);
  }
  min(t) {
    return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this.z = Math.min(this.z, t.z), this;
  }
  max(t) {
    return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this.z = Math.max(this.z, t.z), this;
  }
  clamp(t, e) {
    return this.x = Math.max(t.x, Math.min(e.x, this.x)), this.y = Math.max(t.y, Math.min(e.y, this.y)), this.z = Math.max(t.z, Math.min(e.z, this.z)), this;
  }
  clampScalar(t, e) {
    return this.x = Math.max(t, Math.min(e, this.x)), this.y = Math.max(t, Math.min(e, this.y)), this.z = Math.max(t, Math.min(e, this.z)), this;
  }
  clampLength(t, e) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Math.max(t, Math.min(e, n)));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this;
  }
  dot(t) {
    return this.x * t.x + this.y * t.y + this.z * t.z;
  }
  // TODO lengthSquared?
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(t) {
    return this.normalize().multiplyScalar(t);
  }
  lerp(t, e) {
    return this.x += (t.x - this.x) * e, this.y += (t.y - this.y) * e, this.z += (t.z - this.z) * e, this;
  }
  lerpVectors(t, e, n) {
    return this.x = t.x + (e.x - t.x) * n, this.y = t.y + (e.y - t.y) * n, this.z = t.z + (e.z - t.z) * n, this;
  }
  cross(t) {
    return this.crossVectors(this, t);
  }
  crossVectors(t, e) {
    const n = t.x, s = t.y, r = t.z, a = e.x, o = e.y, l = e.z;
    return this.x = s * l - r * o, this.y = r * a - n * l, this.z = n * o - s * a, this;
  }
  projectOnVector(t) {
    const e = t.lengthSq();
    if (e === 0) return this.set(0, 0, 0);
    const n = t.dot(this) / e;
    return this.copy(t).multiplyScalar(n);
  }
  projectOnPlane(t) {
    return Gr.copy(this).projectOnVector(t), this.sub(Gr);
  }
  reflect(t) {
    return this.sub(Gr.copy(t).multiplyScalar(2 * this.dot(t)));
  }
  angleTo(t) {
    const e = Math.sqrt(this.lengthSq() * t.lengthSq());
    if (e === 0) return Math.PI / 2;
    const n = this.dot(t) / e;
    return Math.acos(Se(n, -1, 1));
  }
  distanceTo(t) {
    return Math.sqrt(this.distanceToSquared(t));
  }
  distanceToSquared(t) {
    const e = this.x - t.x, n = this.y - t.y, s = this.z - t.z;
    return e * e + n * n + s * s;
  }
  manhattanDistanceTo(t) {
    return Math.abs(this.x - t.x) + Math.abs(this.y - t.y) + Math.abs(this.z - t.z);
  }
  setFromSpherical(t) {
    return this.setFromSphericalCoords(t.radius, t.phi, t.theta);
  }
  setFromSphericalCoords(t, e, n) {
    const s = Math.sin(e) * t;
    return this.x = s * Math.sin(n), this.y = Math.cos(e) * t, this.z = s * Math.cos(n), this;
  }
  setFromCylindrical(t) {
    return this.setFromCylindricalCoords(t.radius, t.theta, t.y);
  }
  setFromCylindricalCoords(t, e, n) {
    return this.x = t * Math.sin(e), this.y = n, this.z = t * Math.cos(e), this;
  }
  setFromMatrixPosition(t) {
    const e = t.elements;
    return this.x = e[12], this.y = e[13], this.z = e[14], this;
  }
  setFromMatrixScale(t) {
    const e = this.setFromMatrixColumn(t, 0).length(), n = this.setFromMatrixColumn(t, 1).length(), s = this.setFromMatrixColumn(t, 2).length();
    return this.x = e, this.y = n, this.z = s, this;
  }
  setFromMatrixColumn(t, e) {
    return this.fromArray(t.elements, e * 4);
  }
  setFromMatrix3Column(t, e) {
    return this.fromArray(t.elements, e * 3);
  }
  setFromEuler(t) {
    return this.x = t._x, this.y = t._y, this.z = t._z, this;
  }
  setFromColor(t) {
    return this.x = t.r, this.y = t.g, this.z = t.b, this;
  }
  equals(t) {
    return t.x === this.x && t.y === this.y && t.z === this.z;
  }
  fromArray(t, e = 0) {
    return this.x = t[e], this.y = t[e + 1], this.z = t[e + 2], this;
  }
  toArray(t = [], e = 0) {
    return t[e] = this.x, t[e + 1] = this.y, t[e + 2] = this.z, t;
  }
  fromBufferAttribute(t, e) {
    return this.x = t.getX(e), this.y = t.getY(e), this.z = t.getZ(e), this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this;
  }
  randomDirection() {
    const t = Math.random() * Math.PI * 2, e = Math.random() * 2 - 1, n = Math.sqrt(1 - e * e);
    return this.x = n * Math.cos(t), this.y = e, this.z = n * Math.sin(t), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z;
  }
}
const Gr = /* @__PURE__ */ new L(), Pl = /* @__PURE__ */ new li();
class Ls {
  constructor(t = new L(1 / 0, 1 / 0, 1 / 0), e = new L(-1 / 0, -1 / 0, -1 / 0)) {
    this.isBox3 = !0, this.min = t, this.max = e;
  }
  set(t, e) {
    return this.min.copy(t), this.max.copy(e), this;
  }
  setFromArray(t) {
    this.makeEmpty();
    for (let e = 0, n = t.length; e < n; e += 3)
      this.expandByPoint(Ye.fromArray(t, e));
    return this;
  }
  setFromBufferAttribute(t) {
    this.makeEmpty();
    for (let e = 0, n = t.count; e < n; e++)
      this.expandByPoint(Ye.fromBufferAttribute(t, e));
    return this;
  }
  setFromPoints(t) {
    this.makeEmpty();
    for (let e = 0, n = t.length; e < n; e++)
      this.expandByPoint(t[e]);
    return this;
  }
  setFromCenterAndSize(t, e) {
    const n = Ye.copy(e).multiplyScalar(0.5);
    return this.min.copy(t).sub(n), this.max.copy(t).add(n), this;
  }
  setFromObject(t, e = !1) {
    return this.makeEmpty(), this.expandByObject(t, e);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    return this.min.copy(t.min), this.max.copy(t.max), this;
  }
  makeEmpty() {
    return this.min.x = this.min.y = this.min.z = 1 / 0, this.max.x = this.max.y = this.max.z = -1 / 0, this;
  }
  isEmpty() {
    return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
  }
  getCenter(t) {
    return this.isEmpty() ? t.set(0, 0, 0) : t.addVectors(this.min, this.max).multiplyScalar(0.5);
  }
  getSize(t) {
    return this.isEmpty() ? t.set(0, 0, 0) : t.subVectors(this.max, this.min);
  }
  expandByPoint(t) {
    return this.min.min(t), this.max.max(t), this;
  }
  expandByVector(t) {
    return this.min.sub(t), this.max.add(t), this;
  }
  expandByScalar(t) {
    return this.min.addScalar(-t), this.max.addScalar(t), this;
  }
  expandByObject(t, e = !1) {
    t.updateWorldMatrix(!1, !1);
    const n = t.geometry;
    if (n !== void 0) {
      const r = n.getAttribute("position");
      if (e === !0 && r !== void 0 && t.isInstancedMesh !== !0)
        for (let a = 0, o = r.count; a < o; a++)
          t.isMesh === !0 ? t.getVertexPosition(a, Ye) : Ye.fromBufferAttribute(r, a), Ye.applyMatrix4(t.matrixWorld), this.expandByPoint(Ye);
      else
        t.boundingBox !== void 0 ? (t.boundingBox === null && t.computeBoundingBox(), Fs.copy(t.boundingBox)) : (n.boundingBox === null && n.computeBoundingBox(), Fs.copy(n.boundingBox)), Fs.applyMatrix4(t.matrixWorld), this.union(Fs);
    }
    const s = t.children;
    for (let r = 0, a = s.length; r < a; r++)
      this.expandByObject(s[r], e);
    return this;
  }
  containsPoint(t) {
    return t.x >= this.min.x && t.x <= this.max.x && t.y >= this.min.y && t.y <= this.max.y && t.z >= this.min.z && t.z <= this.max.z;
  }
  containsBox(t) {
    return this.min.x <= t.min.x && t.max.x <= this.max.x && this.min.y <= t.min.y && t.max.y <= this.max.y && this.min.z <= t.min.z && t.max.z <= this.max.z;
  }
  getParameter(t, e) {
    return e.set(
      (t.x - this.min.x) / (this.max.x - this.min.x),
      (t.y - this.min.y) / (this.max.y - this.min.y),
      (t.z - this.min.z) / (this.max.z - this.min.z)
    );
  }
  intersectsBox(t) {
    return t.max.x >= this.min.x && t.min.x <= this.max.x && t.max.y >= this.min.y && t.min.y <= this.max.y && t.max.z >= this.min.z && t.min.z <= this.max.z;
  }
  intersectsSphere(t) {
    return this.clampPoint(t.center, Ye), Ye.distanceToSquared(t.center) <= t.radius * t.radius;
  }
  intersectsPlane(t) {
    let e, n;
    return t.normal.x > 0 ? (e = t.normal.x * this.min.x, n = t.normal.x * this.max.x) : (e = t.normal.x * this.max.x, n = t.normal.x * this.min.x), t.normal.y > 0 ? (e += t.normal.y * this.min.y, n += t.normal.y * this.max.y) : (e += t.normal.y * this.max.y, n += t.normal.y * this.min.y), t.normal.z > 0 ? (e += t.normal.z * this.min.z, n += t.normal.z * this.max.z) : (e += t.normal.z * this.max.z, n += t.normal.z * this.min.z), e <= -t.constant && n >= -t.constant;
  }
  intersectsTriangle(t) {
    if (this.isEmpty())
      return !1;
    this.getCenter(ns), ks.subVectors(this.max, ns), _i.subVectors(t.a, ns), vi.subVectors(t.b, ns), xi.subVectors(t.c, ns), Sn.subVectors(vi, _i), En.subVectors(xi, vi), Gn.subVectors(_i, xi);
    let e = [
      0,
      -Sn.z,
      Sn.y,
      0,
      -En.z,
      En.y,
      0,
      -Gn.z,
      Gn.y,
      Sn.z,
      0,
      -Sn.x,
      En.z,
      0,
      -En.x,
      Gn.z,
      0,
      -Gn.x,
      -Sn.y,
      Sn.x,
      0,
      -En.y,
      En.x,
      0,
      -Gn.y,
      Gn.x,
      0
    ];
    return !$r(e, _i, vi, xi, ks) || (e = [1, 0, 0, 0, 1, 0, 0, 0, 1], !$r(e, _i, vi, xi, ks)) ? !1 : (Bs.crossVectors(Sn, En), e = [Bs.x, Bs.y, Bs.z], $r(e, _i, vi, xi, ks));
  }
  clampPoint(t, e) {
    return e.copy(t).clamp(this.min, this.max);
  }
  distanceToPoint(t) {
    return this.clampPoint(t, Ye).distanceTo(t);
  }
  getBoundingSphere(t) {
    return this.isEmpty() ? t.makeEmpty() : (this.getCenter(t.center), t.radius = this.getSize(Ye).length() * 0.5), t;
  }
  intersect(t) {
    return this.min.max(t.min), this.max.min(t.max), this.isEmpty() && this.makeEmpty(), this;
  }
  union(t) {
    return this.min.min(t.min), this.max.max(t.max), this;
  }
  applyMatrix4(t) {
    return this.isEmpty() ? this : (hn[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(t), hn[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(t), hn[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(t), hn[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(t), hn[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(t), hn[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(t), hn[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(t), hn[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(t), this.setFromPoints(hn), this);
  }
  translate(t) {
    return this.min.add(t), this.max.add(t), this;
  }
  equals(t) {
    return t.min.equals(this.min) && t.max.equals(this.max);
  }
}
const hn = [
  /* @__PURE__ */ new L(),
  /* @__PURE__ */ new L(),
  /* @__PURE__ */ new L(),
  /* @__PURE__ */ new L(),
  /* @__PURE__ */ new L(),
  /* @__PURE__ */ new L(),
  /* @__PURE__ */ new L(),
  /* @__PURE__ */ new L()
], Ye = /* @__PURE__ */ new L(), Fs = /* @__PURE__ */ new Ls(), _i = /* @__PURE__ */ new L(), vi = /* @__PURE__ */ new L(), xi = /* @__PURE__ */ new L(), Sn = /* @__PURE__ */ new L(), En = /* @__PURE__ */ new L(), Gn = /* @__PURE__ */ new L(), ns = /* @__PURE__ */ new L(), ks = /* @__PURE__ */ new L(), Bs = /* @__PURE__ */ new L(), $n = /* @__PURE__ */ new L();
function $r(i, t, e, n, s) {
  for (let r = 0, a = i.length - 3; r <= a; r += 3) {
    $n.fromArray(i, r);
    const o = s.x * Math.abs($n.x) + s.y * Math.abs($n.y) + s.z * Math.abs($n.z), l = t.dot($n), c = e.dot($n), h = n.dot($n);
    if (Math.max(-Math.max(l, c, h), Math.min(l, c, h)) > o)
      return !1;
  }
  return !0;
}
const Dd = /* @__PURE__ */ new Ls(), is = /* @__PURE__ */ new L(), Wr = /* @__PURE__ */ new L();
class Rr {
  constructor(t = new L(), e = -1) {
    this.isSphere = !0, this.center = t, this.radius = e;
  }
  set(t, e) {
    return this.center.copy(t), this.radius = e, this;
  }
  setFromPoints(t, e) {
    const n = this.center;
    e !== void 0 ? n.copy(e) : Dd.setFromPoints(t).getCenter(n);
    let s = 0;
    for (let r = 0, a = t.length; r < a; r++)
      s = Math.max(s, n.distanceToSquared(t[r]));
    return this.radius = Math.sqrt(s), this;
  }
  copy(t) {
    return this.center.copy(t.center), this.radius = t.radius, this;
  }
  isEmpty() {
    return this.radius < 0;
  }
  makeEmpty() {
    return this.center.set(0, 0, 0), this.radius = -1, this;
  }
  containsPoint(t) {
    return t.distanceToSquared(this.center) <= this.radius * this.radius;
  }
  distanceToPoint(t) {
    return t.distanceTo(this.center) - this.radius;
  }
  intersectsSphere(t) {
    const e = this.radius + t.radius;
    return t.center.distanceToSquared(this.center) <= e * e;
  }
  intersectsBox(t) {
    return t.intersectsSphere(this);
  }
  intersectsPlane(t) {
    return Math.abs(t.distanceToPoint(this.center)) <= this.radius;
  }
  clampPoint(t, e) {
    const n = this.center.distanceToSquared(t);
    return e.copy(t), n > this.radius * this.radius && (e.sub(this.center).normalize(), e.multiplyScalar(this.radius).add(this.center)), e;
  }
  getBoundingBox(t) {
    return this.isEmpty() ? (t.makeEmpty(), t) : (t.set(this.center, this.center), t.expandByScalar(this.radius), t);
  }
  applyMatrix4(t) {
    return this.center.applyMatrix4(t), this.radius = this.radius * t.getMaxScaleOnAxis(), this;
  }
  translate(t) {
    return this.center.add(t), this;
  }
  expandByPoint(t) {
    if (this.isEmpty())
      return this.center.copy(t), this.radius = 0, this;
    is.subVectors(t, this.center);
    const e = is.lengthSq();
    if (e > this.radius * this.radius) {
      const n = Math.sqrt(e), s = (n - this.radius) * 0.5;
      this.center.addScaledVector(is, s / n), this.radius += s;
    }
    return this;
  }
  union(t) {
    return t.isEmpty() ? this : this.isEmpty() ? (this.copy(t), this) : (this.center.equals(t.center) === !0 ? this.radius = Math.max(this.radius, t.radius) : (Wr.subVectors(t.center, this.center).setLength(t.radius), this.expandByPoint(is.copy(t.center).add(Wr)), this.expandByPoint(is.copy(t.center).sub(Wr))), this);
  }
  equals(t) {
    return t.center.equals(this.center) && t.radius === this.radius;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const un = /* @__PURE__ */ new L(), Xr = /* @__PURE__ */ new L(), zs = /* @__PURE__ */ new L(), wn = /* @__PURE__ */ new L(), Yr = /* @__PURE__ */ new L(), Hs = /* @__PURE__ */ new L(), qr = /* @__PURE__ */ new L();
class Pr {
  constructor(t = new L(), e = new L(0, 0, -1)) {
    this.origin = t, this.direction = e;
  }
  set(t, e) {
    return this.origin.copy(t), this.direction.copy(e), this;
  }
  copy(t) {
    return this.origin.copy(t.origin), this.direction.copy(t.direction), this;
  }
  at(t, e) {
    return e.copy(this.origin).addScaledVector(this.direction, t);
  }
  lookAt(t) {
    return this.direction.copy(t).sub(this.origin).normalize(), this;
  }
  recast(t) {
    return this.origin.copy(this.at(t, un)), this;
  }
  closestPointToPoint(t, e) {
    e.subVectors(t, this.origin);
    const n = e.dot(this.direction);
    return n < 0 ? e.copy(this.origin) : e.copy(this.origin).addScaledVector(this.direction, n);
  }
  distanceToPoint(t) {
    return Math.sqrt(this.distanceSqToPoint(t));
  }
  distanceSqToPoint(t) {
    const e = un.subVectors(t, this.origin).dot(this.direction);
    return e < 0 ? this.origin.distanceToSquared(t) : (un.copy(this.origin).addScaledVector(this.direction, e), un.distanceToSquared(t));
  }
  distanceSqToSegment(t, e, n, s) {
    Xr.copy(t).add(e).multiplyScalar(0.5), zs.copy(e).sub(t).normalize(), wn.copy(this.origin).sub(Xr);
    const r = t.distanceTo(e) * 0.5, a = -this.direction.dot(zs), o = wn.dot(this.direction), l = -wn.dot(zs), c = wn.lengthSq(), h = Math.abs(1 - a * a);
    let u, d, p, g;
    if (h > 0)
      if (u = a * l - o, d = a * o - l, g = r * h, u >= 0)
        if (d >= -g)
          if (d <= g) {
            const _ = 1 / h;
            u *= _, d *= _, p = u * (u + a * d + 2 * o) + d * (a * u + d + 2 * l) + c;
          } else
            d = r, u = Math.max(0, -(a * d + o)), p = -u * u + d * (d + 2 * l) + c;
        else
          d = -r, u = Math.max(0, -(a * d + o)), p = -u * u + d * (d + 2 * l) + c;
      else
        d <= -g ? (u = Math.max(0, -(-a * r + o)), d = u > 0 ? -r : Math.min(Math.max(-r, -l), r), p = -u * u + d * (d + 2 * l) + c) : d <= g ? (u = 0, d = Math.min(Math.max(-r, -l), r), p = d * (d + 2 * l) + c) : (u = Math.max(0, -(a * r + o)), d = u > 0 ? r : Math.min(Math.max(-r, -l), r), p = -u * u + d * (d + 2 * l) + c);
    else
      d = a > 0 ? -r : r, u = Math.max(0, -(a * d + o)), p = -u * u + d * (d + 2 * l) + c;
    return n && n.copy(this.origin).addScaledVector(this.direction, u), s && s.copy(Xr).addScaledVector(zs, d), p;
  }
  intersectSphere(t, e) {
    un.subVectors(t.center, this.origin);
    const n = un.dot(this.direction), s = un.dot(un) - n * n, r = t.radius * t.radius;
    if (s > r) return null;
    const a = Math.sqrt(r - s), o = n - a, l = n + a;
    return l < 0 ? null : o < 0 ? this.at(l, e) : this.at(o, e);
  }
  intersectsSphere(t) {
    return this.distanceSqToPoint(t.center) <= t.radius * t.radius;
  }
  distanceToPlane(t) {
    const e = t.normal.dot(this.direction);
    if (e === 0)
      return t.distanceToPoint(this.origin) === 0 ? 0 : null;
    const n = -(this.origin.dot(t.normal) + t.constant) / e;
    return n >= 0 ? n : null;
  }
  intersectPlane(t, e) {
    const n = this.distanceToPlane(t);
    return n === null ? null : this.at(n, e);
  }
  intersectsPlane(t) {
    const e = t.distanceToPoint(this.origin);
    return e === 0 || t.normal.dot(this.direction) * e < 0;
  }
  intersectBox(t, e) {
    let n, s, r, a, o, l;
    const c = 1 / this.direction.x, h = 1 / this.direction.y, u = 1 / this.direction.z, d = this.origin;
    return c >= 0 ? (n = (t.min.x - d.x) * c, s = (t.max.x - d.x) * c) : (n = (t.max.x - d.x) * c, s = (t.min.x - d.x) * c), h >= 0 ? (r = (t.min.y - d.y) * h, a = (t.max.y - d.y) * h) : (r = (t.max.y - d.y) * h, a = (t.min.y - d.y) * h), n > a || r > s || ((r > n || isNaN(n)) && (n = r), (a < s || isNaN(s)) && (s = a), u >= 0 ? (o = (t.min.z - d.z) * u, l = (t.max.z - d.z) * u) : (o = (t.max.z - d.z) * u, l = (t.min.z - d.z) * u), n > l || o > s) || ((o > n || n !== n) && (n = o), (l < s || s !== s) && (s = l), s < 0) ? null : this.at(n >= 0 ? n : s, e);
  }
  intersectsBox(t) {
    return this.intersectBox(t, un) !== null;
  }
  intersectTriangle(t, e, n, s, r) {
    Yr.subVectors(e, t), Hs.subVectors(n, t), qr.crossVectors(Yr, Hs);
    let a = this.direction.dot(qr), o;
    if (a > 0) {
      if (s) return null;
      o = 1;
    } else if (a < 0)
      o = -1, a = -a;
    else
      return null;
    wn.subVectors(this.origin, t);
    const l = o * this.direction.dot(Hs.crossVectors(wn, Hs));
    if (l < 0)
      return null;
    const c = o * this.direction.dot(Yr.cross(wn));
    if (c < 0 || l + c > a)
      return null;
    const h = -o * wn.dot(qr);
    return h < 0 ? null : this.at(h / a, r);
  }
  applyMatrix4(t) {
    return this.origin.applyMatrix4(t), this.direction.transformDirection(t), this;
  }
  equals(t) {
    return t.origin.equals(this.origin) && t.direction.equals(this.direction);
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
class ue {
  constructor(t, e, n, s, r, a, o, l, c, h, u, d, p, g, _, f) {
    ue.prototype.isMatrix4 = !0, this.elements = [
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ], t !== void 0 && this.set(t, e, n, s, r, a, o, l, c, h, u, d, p, g, _, f);
  }
  set(t, e, n, s, r, a, o, l, c, h, u, d, p, g, _, f) {
    const m = this.elements;
    return m[0] = t, m[4] = e, m[8] = n, m[12] = s, m[1] = r, m[5] = a, m[9] = o, m[13] = l, m[2] = c, m[6] = h, m[10] = u, m[14] = d, m[3] = p, m[7] = g, m[11] = _, m[15] = f, this;
  }
  identity() {
    return this.set(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  clone() {
    return new ue().fromArray(this.elements);
  }
  copy(t) {
    const e = this.elements, n = t.elements;
    return e[0] = n[0], e[1] = n[1], e[2] = n[2], e[3] = n[3], e[4] = n[4], e[5] = n[5], e[6] = n[6], e[7] = n[7], e[8] = n[8], e[9] = n[9], e[10] = n[10], e[11] = n[11], e[12] = n[12], e[13] = n[13], e[14] = n[14], e[15] = n[15], this;
  }
  copyPosition(t) {
    const e = this.elements, n = t.elements;
    return e[12] = n[12], e[13] = n[13], e[14] = n[14], this;
  }
  setFromMatrix3(t) {
    const e = t.elements;
    return this.set(
      e[0],
      e[3],
      e[6],
      0,
      e[1],
      e[4],
      e[7],
      0,
      e[2],
      e[5],
      e[8],
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  extractBasis(t, e, n) {
    return t.setFromMatrixColumn(this, 0), e.setFromMatrixColumn(this, 1), n.setFromMatrixColumn(this, 2), this;
  }
  makeBasis(t, e, n) {
    return this.set(
      t.x,
      e.x,
      n.x,
      0,
      t.y,
      e.y,
      n.y,
      0,
      t.z,
      e.z,
      n.z,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  extractRotation(t) {
    const e = this.elements, n = t.elements, s = 1 / yi.setFromMatrixColumn(t, 0).length(), r = 1 / yi.setFromMatrixColumn(t, 1).length(), a = 1 / yi.setFromMatrixColumn(t, 2).length();
    return e[0] = n[0] * s, e[1] = n[1] * s, e[2] = n[2] * s, e[3] = 0, e[4] = n[4] * r, e[5] = n[5] * r, e[6] = n[6] * r, e[7] = 0, e[8] = n[8] * a, e[9] = n[9] * a, e[10] = n[10] * a, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, this;
  }
  makeRotationFromEuler(t) {
    const e = this.elements, n = t.x, s = t.y, r = t.z, a = Math.cos(n), o = Math.sin(n), l = Math.cos(s), c = Math.sin(s), h = Math.cos(r), u = Math.sin(r);
    if (t.order === "XYZ") {
      const d = a * h, p = a * u, g = o * h, _ = o * u;
      e[0] = l * h, e[4] = -l * u, e[8] = c, e[1] = p + g * c, e[5] = d - _ * c, e[9] = -o * l, e[2] = _ - d * c, e[6] = g + p * c, e[10] = a * l;
    } else if (t.order === "YXZ") {
      const d = l * h, p = l * u, g = c * h, _ = c * u;
      e[0] = d + _ * o, e[4] = g * o - p, e[8] = a * c, e[1] = a * u, e[5] = a * h, e[9] = -o, e[2] = p * o - g, e[6] = _ + d * o, e[10] = a * l;
    } else if (t.order === "ZXY") {
      const d = l * h, p = l * u, g = c * h, _ = c * u;
      e[0] = d - _ * o, e[4] = -a * u, e[8] = g + p * o, e[1] = p + g * o, e[5] = a * h, e[9] = _ - d * o, e[2] = -a * c, e[6] = o, e[10] = a * l;
    } else if (t.order === "ZYX") {
      const d = a * h, p = a * u, g = o * h, _ = o * u;
      e[0] = l * h, e[4] = g * c - p, e[8] = d * c + _, e[1] = l * u, e[5] = _ * c + d, e[9] = p * c - g, e[2] = -c, e[6] = o * l, e[10] = a * l;
    } else if (t.order === "YZX") {
      const d = a * l, p = a * c, g = o * l, _ = o * c;
      e[0] = l * h, e[4] = _ - d * u, e[8] = g * u + p, e[1] = u, e[5] = a * h, e[9] = -o * h, e[2] = -c * h, e[6] = p * u + g, e[10] = d - _ * u;
    } else if (t.order === "XZY") {
      const d = a * l, p = a * c, g = o * l, _ = o * c;
      e[0] = l * h, e[4] = -u, e[8] = c * h, e[1] = d * u + _, e[5] = a * h, e[9] = p * u - g, e[2] = g * u - p, e[6] = o * h, e[10] = _ * u + d;
    }
    return e[3] = 0, e[7] = 0, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, this;
  }
  makeRotationFromQuaternion(t) {
    return this.compose(Id, t, Ud);
  }
  lookAt(t, e, n) {
    const s = this.elements;
    return ke.subVectors(t, e), ke.lengthSq() === 0 && (ke.z = 1), ke.normalize(), Tn.crossVectors(n, ke), Tn.lengthSq() === 0 && (Math.abs(n.z) === 1 ? ke.x += 1e-4 : ke.z += 1e-4, ke.normalize(), Tn.crossVectors(n, ke)), Tn.normalize(), Vs.crossVectors(ke, Tn), s[0] = Tn.x, s[4] = Vs.x, s[8] = ke.x, s[1] = Tn.y, s[5] = Vs.y, s[9] = ke.y, s[2] = Tn.z, s[6] = Vs.z, s[10] = ke.z, this;
  }
  multiply(t) {
    return this.multiplyMatrices(this, t);
  }
  premultiply(t) {
    return this.multiplyMatrices(t, this);
  }
  multiplyMatrices(t, e) {
    const n = t.elements, s = e.elements, r = this.elements, a = n[0], o = n[4], l = n[8], c = n[12], h = n[1], u = n[5], d = n[9], p = n[13], g = n[2], _ = n[6], f = n[10], m = n[14], b = n[3], x = n[7], v = n[11], w = n[15], A = s[0], C = s[4], D = s[8], S = s[12], M = s[1], P = s[5], z = s[9], O = s[13], F = s[2], W = s[6], H = s[10], J = s[14], k = s[3], tt = s[7], nt = s[11], ht = s[15];
    return r[0] = a * A + o * M + l * F + c * k, r[4] = a * C + o * P + l * W + c * tt, r[8] = a * D + o * z + l * H + c * nt, r[12] = a * S + o * O + l * J + c * ht, r[1] = h * A + u * M + d * F + p * k, r[5] = h * C + u * P + d * W + p * tt, r[9] = h * D + u * z + d * H + p * nt, r[13] = h * S + u * O + d * J + p * ht, r[2] = g * A + _ * M + f * F + m * k, r[6] = g * C + _ * P + f * W + m * tt, r[10] = g * D + _ * z + f * H + m * nt, r[14] = g * S + _ * O + f * J + m * ht, r[3] = b * A + x * M + v * F + w * k, r[7] = b * C + x * P + v * W + w * tt, r[11] = b * D + x * z + v * H + w * nt, r[15] = b * S + x * O + v * J + w * ht, this;
  }
  multiplyScalar(t) {
    const e = this.elements;
    return e[0] *= t, e[4] *= t, e[8] *= t, e[12] *= t, e[1] *= t, e[5] *= t, e[9] *= t, e[13] *= t, e[2] *= t, e[6] *= t, e[10] *= t, e[14] *= t, e[3] *= t, e[7] *= t, e[11] *= t, e[15] *= t, this;
  }
  determinant() {
    const t = this.elements, e = t[0], n = t[4], s = t[8], r = t[12], a = t[1], o = t[5], l = t[9], c = t[13], h = t[2], u = t[6], d = t[10], p = t[14], g = t[3], _ = t[7], f = t[11], m = t[15];
    return g * (+r * l * u - s * c * u - r * o * d + n * c * d + s * o * p - n * l * p) + _ * (+e * l * p - e * c * d + r * a * d - s * a * p + s * c * h - r * l * h) + f * (+e * c * u - e * o * p - r * a * u + n * a * p + r * o * h - n * c * h) + m * (-s * o * h - e * l * u + e * o * d + s * a * u - n * a * d + n * l * h);
  }
  transpose() {
    const t = this.elements;
    let e;
    return e = t[1], t[1] = t[4], t[4] = e, e = t[2], t[2] = t[8], t[8] = e, e = t[6], t[6] = t[9], t[9] = e, e = t[3], t[3] = t[12], t[12] = e, e = t[7], t[7] = t[13], t[13] = e, e = t[11], t[11] = t[14], t[14] = e, this;
  }
  setPosition(t, e, n) {
    const s = this.elements;
    return t.isVector3 ? (s[12] = t.x, s[13] = t.y, s[14] = t.z) : (s[12] = t, s[13] = e, s[14] = n), this;
  }
  invert() {
    const t = this.elements, e = t[0], n = t[1], s = t[2], r = t[3], a = t[4], o = t[5], l = t[6], c = t[7], h = t[8], u = t[9], d = t[10], p = t[11], g = t[12], _ = t[13], f = t[14], m = t[15], b = u * f * c - _ * d * c + _ * l * p - o * f * p - u * l * m + o * d * m, x = g * d * c - h * f * c - g * l * p + a * f * p + h * l * m - a * d * m, v = h * _ * c - g * u * c + g * o * p - a * _ * p - h * o * m + a * u * m, w = g * u * l - h * _ * l - g * o * d + a * _ * d + h * o * f - a * u * f, A = e * b + n * x + s * v + r * w;
    if (A === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const C = 1 / A;
    return t[0] = b * C, t[1] = (_ * d * r - u * f * r - _ * s * p + n * f * p + u * s * m - n * d * m) * C, t[2] = (o * f * r - _ * l * r + _ * s * c - n * f * c - o * s * m + n * l * m) * C, t[3] = (u * l * r - o * d * r - u * s * c + n * d * c + o * s * p - n * l * p) * C, t[4] = x * C, t[5] = (h * f * r - g * d * r + g * s * p - e * f * p - h * s * m + e * d * m) * C, t[6] = (g * l * r - a * f * r - g * s * c + e * f * c + a * s * m - e * l * m) * C, t[7] = (a * d * r - h * l * r + h * s * c - e * d * c - a * s * p + e * l * p) * C, t[8] = v * C, t[9] = (g * u * r - h * _ * r - g * n * p + e * _ * p + h * n * m - e * u * m) * C, t[10] = (a * _ * r - g * o * r + g * n * c - e * _ * c - a * n * m + e * o * m) * C, t[11] = (h * o * r - a * u * r - h * n * c + e * u * c + a * n * p - e * o * p) * C, t[12] = w * C, t[13] = (h * _ * s - g * u * s + g * n * d - e * _ * d - h * n * f + e * u * f) * C, t[14] = (g * o * s - a * _ * s - g * n * l + e * _ * l + a * n * f - e * o * f) * C, t[15] = (a * u * s - h * o * s + h * n * l - e * u * l - a * n * d + e * o * d) * C, this;
  }
  scale(t) {
    const e = this.elements, n = t.x, s = t.y, r = t.z;
    return e[0] *= n, e[4] *= s, e[8] *= r, e[1] *= n, e[5] *= s, e[9] *= r, e[2] *= n, e[6] *= s, e[10] *= r, e[3] *= n, e[7] *= s, e[11] *= r, this;
  }
  getMaxScaleOnAxis() {
    const t = this.elements, e = t[0] * t[0] + t[1] * t[1] + t[2] * t[2], n = t[4] * t[4] + t[5] * t[5] + t[6] * t[6], s = t[8] * t[8] + t[9] * t[9] + t[10] * t[10];
    return Math.sqrt(Math.max(e, n, s));
  }
  makeTranslation(t, e, n) {
    return t.isVector3 ? this.set(
      1,
      0,
      0,
      t.x,
      0,
      1,
      0,
      t.y,
      0,
      0,
      1,
      t.z,
      0,
      0,
      0,
      1
    ) : this.set(
      1,
      0,
      0,
      t,
      0,
      1,
      0,
      e,
      0,
      0,
      1,
      n,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationX(t) {
    const e = Math.cos(t), n = Math.sin(t);
    return this.set(
      1,
      0,
      0,
      0,
      0,
      e,
      -n,
      0,
      0,
      n,
      e,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationY(t) {
    const e = Math.cos(t), n = Math.sin(t);
    return this.set(
      e,
      0,
      n,
      0,
      0,
      1,
      0,
      0,
      -n,
      0,
      e,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationZ(t) {
    const e = Math.cos(t), n = Math.sin(t);
    return this.set(
      e,
      -n,
      0,
      0,
      n,
      e,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationAxis(t, e) {
    const n = Math.cos(e), s = Math.sin(e), r = 1 - n, a = t.x, o = t.y, l = t.z, c = r * a, h = r * o;
    return this.set(
      c * a + n,
      c * o - s * l,
      c * l + s * o,
      0,
      c * o + s * l,
      h * o + n,
      h * l - s * a,
      0,
      c * l - s * o,
      h * l + s * a,
      r * l * l + n,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeScale(t, e, n) {
    return this.set(
      t,
      0,
      0,
      0,
      0,
      e,
      0,
      0,
      0,
      0,
      n,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeShear(t, e, n, s, r, a) {
    return this.set(
      1,
      n,
      r,
      0,
      t,
      1,
      a,
      0,
      e,
      s,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  compose(t, e, n) {
    const s = this.elements, r = e._x, a = e._y, o = e._z, l = e._w, c = r + r, h = a + a, u = o + o, d = r * c, p = r * h, g = r * u, _ = a * h, f = a * u, m = o * u, b = l * c, x = l * h, v = l * u, w = n.x, A = n.y, C = n.z;
    return s[0] = (1 - (_ + m)) * w, s[1] = (p + v) * w, s[2] = (g - x) * w, s[3] = 0, s[4] = (p - v) * A, s[5] = (1 - (d + m)) * A, s[6] = (f + b) * A, s[7] = 0, s[8] = (g + x) * C, s[9] = (f - b) * C, s[10] = (1 - (d + _)) * C, s[11] = 0, s[12] = t.x, s[13] = t.y, s[14] = t.z, s[15] = 1, this;
  }
  decompose(t, e, n) {
    const s = this.elements;
    let r = yi.set(s[0], s[1], s[2]).length();
    const a = yi.set(s[4], s[5], s[6]).length(), o = yi.set(s[8], s[9], s[10]).length();
    this.determinant() < 0 && (r = -r), t.x = s[12], t.y = s[13], t.z = s[14], qe.copy(this);
    const c = 1 / r, h = 1 / a, u = 1 / o;
    return qe.elements[0] *= c, qe.elements[1] *= c, qe.elements[2] *= c, qe.elements[4] *= h, qe.elements[5] *= h, qe.elements[6] *= h, qe.elements[8] *= u, qe.elements[9] *= u, qe.elements[10] *= u, e.setFromRotationMatrix(qe), n.x = r, n.y = a, n.z = o, this;
  }
  makePerspective(t, e, n, s, r, a, o = _n) {
    const l = this.elements, c = 2 * r / (e - t), h = 2 * r / (n - s), u = (e + t) / (e - t), d = (n + s) / (n - s);
    let p, g;
    if (o === _n)
      p = -(a + r) / (a - r), g = -2 * a * r / (a - r);
    else if (o === Mr)
      p = -a / (a - r), g = -a * r / (a - r);
    else
      throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + o);
    return l[0] = c, l[4] = 0, l[8] = u, l[12] = 0, l[1] = 0, l[5] = h, l[9] = d, l[13] = 0, l[2] = 0, l[6] = 0, l[10] = p, l[14] = g, l[3] = 0, l[7] = 0, l[11] = -1, l[15] = 0, this;
  }
  makeOrthographic(t, e, n, s, r, a, o = _n) {
    const l = this.elements, c = 1 / (e - t), h = 1 / (n - s), u = 1 / (a - r), d = (e + t) * c, p = (n + s) * h;
    let g, _;
    if (o === _n)
      g = (a + r) * u, _ = -2 * u;
    else if (o === Mr)
      g = r * u, _ = -1 * u;
    else
      throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + o);
    return l[0] = 2 * c, l[4] = 0, l[8] = 0, l[12] = -d, l[1] = 0, l[5] = 2 * h, l[9] = 0, l[13] = -p, l[2] = 0, l[6] = 0, l[10] = _, l[14] = -g, l[3] = 0, l[7] = 0, l[11] = 0, l[15] = 1, this;
  }
  equals(t) {
    const e = this.elements, n = t.elements;
    for (let s = 0; s < 16; s++)
      if (e[s] !== n[s]) return !1;
    return !0;
  }
  fromArray(t, e = 0) {
    for (let n = 0; n < 16; n++)
      this.elements[n] = t[n + e];
    return this;
  }
  toArray(t = [], e = 0) {
    const n = this.elements;
    return t[e] = n[0], t[e + 1] = n[1], t[e + 2] = n[2], t[e + 3] = n[3], t[e + 4] = n[4], t[e + 5] = n[5], t[e + 6] = n[6], t[e + 7] = n[7], t[e + 8] = n[8], t[e + 9] = n[9], t[e + 10] = n[10], t[e + 11] = n[11], t[e + 12] = n[12], t[e + 13] = n[13], t[e + 14] = n[14], t[e + 15] = n[15], t;
  }
}
const yi = /* @__PURE__ */ new L(), qe = /* @__PURE__ */ new ue(), Id = /* @__PURE__ */ new L(0, 0, 0), Ud = /* @__PURE__ */ new L(1, 1, 1), Tn = /* @__PURE__ */ new L(), Vs = /* @__PURE__ */ new L(), ke = /* @__PURE__ */ new L(), Ll = /* @__PURE__ */ new ue(), Dl = /* @__PURE__ */ new li();
class on {
  constructor(t = 0, e = 0, n = 0, s = on.DEFAULT_ORDER) {
    this.isEuler = !0, this._x = t, this._y = e, this._z = n, this._order = s;
  }
  get x() {
    return this._x;
  }
  set x(t) {
    this._x = t, this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(t) {
    this._y = t, this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(t) {
    this._z = t, this._onChangeCallback();
  }
  get order() {
    return this._order;
  }
  set order(t) {
    this._order = t, this._onChangeCallback();
  }
  set(t, e, n, s = this._order) {
    return this._x = t, this._y = e, this._z = n, this._order = s, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._order);
  }
  copy(t) {
    return this._x = t._x, this._y = t._y, this._z = t._z, this._order = t._order, this._onChangeCallback(), this;
  }
  setFromRotationMatrix(t, e = this._order, n = !0) {
    const s = t.elements, r = s[0], a = s[4], o = s[8], l = s[1], c = s[5], h = s[9], u = s[2], d = s[6], p = s[10];
    switch (e) {
      case "XYZ":
        this._y = Math.asin(Se(o, -1, 1)), Math.abs(o) < 0.9999999 ? (this._x = Math.atan2(-h, p), this._z = Math.atan2(-a, r)) : (this._x = Math.atan2(d, c), this._z = 0);
        break;
      case "YXZ":
        this._x = Math.asin(-Se(h, -1, 1)), Math.abs(h) < 0.9999999 ? (this._y = Math.atan2(o, p), this._z = Math.atan2(l, c)) : (this._y = Math.atan2(-u, r), this._z = 0);
        break;
      case "ZXY":
        this._x = Math.asin(Se(d, -1, 1)), Math.abs(d) < 0.9999999 ? (this._y = Math.atan2(-u, p), this._z = Math.atan2(-a, c)) : (this._y = 0, this._z = Math.atan2(l, r));
        break;
      case "ZYX":
        this._y = Math.asin(-Se(u, -1, 1)), Math.abs(u) < 0.9999999 ? (this._x = Math.atan2(d, p), this._z = Math.atan2(l, r)) : (this._x = 0, this._z = Math.atan2(-a, c));
        break;
      case "YZX":
        this._z = Math.asin(Se(l, -1, 1)), Math.abs(l) < 0.9999999 ? (this._x = Math.atan2(-h, c), this._y = Math.atan2(-u, r)) : (this._x = 0, this._y = Math.atan2(o, p));
        break;
      case "XZY":
        this._z = Math.asin(-Se(a, -1, 1)), Math.abs(a) < 0.9999999 ? (this._x = Math.atan2(d, c), this._y = Math.atan2(o, r)) : (this._x = Math.atan2(-h, p), this._y = 0);
        break;
      default:
        console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: " + e);
    }
    return this._order = e, n === !0 && this._onChangeCallback(), this;
  }
  setFromQuaternion(t, e, n) {
    return Ll.makeRotationFromQuaternion(t), this.setFromRotationMatrix(Ll, e, n);
  }
  setFromVector3(t, e = this._order) {
    return this.set(t.x, t.y, t.z, e);
  }
  reorder(t) {
    return Dl.setFromEuler(this), this.setFromQuaternion(Dl, t);
  }
  equals(t) {
    return t._x === this._x && t._y === this._y && t._z === this._z && t._order === this._order;
  }
  fromArray(t) {
    return this._x = t[0], this._y = t[1], this._z = t[2], t[3] !== void 0 && (this._order = t[3]), this._onChangeCallback(), this;
  }
  toArray(t = [], e = 0) {
    return t[e] = this._x, t[e + 1] = this._y, t[e + 2] = this._z, t[e + 3] = this._order, t;
  }
  _onChange(t) {
    return this._onChangeCallback = t, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._order;
  }
}
on.DEFAULT_ORDER = "XYZ";
class Ua {
  constructor() {
    this.mask = 1;
  }
  set(t) {
    this.mask = (1 << t | 0) >>> 0;
  }
  enable(t) {
    this.mask |= 1 << t | 0;
  }
  enableAll() {
    this.mask = -1;
  }
  toggle(t) {
    this.mask ^= 1 << t | 0;
  }
  disable(t) {
    this.mask &= ~(1 << t | 0);
  }
  disableAll() {
    this.mask = 0;
  }
  test(t) {
    return (this.mask & t.mask) !== 0;
  }
  isEnabled(t) {
    return (this.mask & (1 << t | 0)) !== 0;
  }
}
let Nd = 0;
const Il = /* @__PURE__ */ new L(), Mi = /* @__PURE__ */ new li(), dn = /* @__PURE__ */ new ue(), Gs = /* @__PURE__ */ new L(), ss = /* @__PURE__ */ new L(), Od = /* @__PURE__ */ new L(), Fd = /* @__PURE__ */ new li(), Ul = /* @__PURE__ */ new L(1, 0, 0), Nl = /* @__PURE__ */ new L(0, 1, 0), Ol = /* @__PURE__ */ new L(0, 0, 1), Fl = { type: "added" }, kd = { type: "removed" }, bi = { type: "childadded", child: null }, jr = { type: "childremoved", child: null };
class Ce extends di {
  constructor() {
    super(), this.isObject3D = !0, Object.defineProperty(this, "id", { value: Nd++ }), this.uuid = fi(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = Ce.DEFAULT_UP.clone();
    const t = new L(), e = new on(), n = new li(), s = new L(1, 1, 1);
    function r() {
      n.setFromEuler(e, !1);
    }
    function a() {
      e.setFromQuaternion(n, void 0, !1);
    }
    e._onChange(r), n._onChange(a), Object.defineProperties(this, {
      position: {
        configurable: !0,
        enumerable: !0,
        value: t
      },
      rotation: {
        configurable: !0,
        enumerable: !0,
        value: e
      },
      quaternion: {
        configurable: !0,
        enumerable: !0,
        value: n
      },
      scale: {
        configurable: !0,
        enumerable: !0,
        value: s
      },
      modelViewMatrix: {
        value: new ue()
      },
      normalMatrix: {
        value: new Ht()
      }
    }), this.matrix = new ue(), this.matrixWorld = new ue(), this.matrixAutoUpdate = Ce.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldAutoUpdate = Ce.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.matrixWorldNeedsUpdate = !1, this.layers = new Ua(), this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.animations = [], this.userData = {};
  }
  onBeforeShadow() {
  }
  onAfterShadow() {
  }
  onBeforeRender() {
  }
  onAfterRender() {
  }
  applyMatrix4(t) {
    this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(t), this.matrix.decompose(this.position, this.quaternion, this.scale);
  }
  applyQuaternion(t) {
    return this.quaternion.premultiply(t), this;
  }
  setRotationFromAxisAngle(t, e) {
    this.quaternion.setFromAxisAngle(t, e);
  }
  setRotationFromEuler(t) {
    this.quaternion.setFromEuler(t, !0);
  }
  setRotationFromMatrix(t) {
    this.quaternion.setFromRotationMatrix(t);
  }
  setRotationFromQuaternion(t) {
    this.quaternion.copy(t);
  }
  rotateOnAxis(t, e) {
    return Mi.setFromAxisAngle(t, e), this.quaternion.multiply(Mi), this;
  }
  rotateOnWorldAxis(t, e) {
    return Mi.setFromAxisAngle(t, e), this.quaternion.premultiply(Mi), this;
  }
  rotateX(t) {
    return this.rotateOnAxis(Ul, t);
  }
  rotateY(t) {
    return this.rotateOnAxis(Nl, t);
  }
  rotateZ(t) {
    return this.rotateOnAxis(Ol, t);
  }
  translateOnAxis(t, e) {
    return Il.copy(t).applyQuaternion(this.quaternion), this.position.add(Il.multiplyScalar(e)), this;
  }
  translateX(t) {
    return this.translateOnAxis(Ul, t);
  }
  translateY(t) {
    return this.translateOnAxis(Nl, t);
  }
  translateZ(t) {
    return this.translateOnAxis(Ol, t);
  }
  localToWorld(t) {
    return this.updateWorldMatrix(!0, !1), t.applyMatrix4(this.matrixWorld);
  }
  worldToLocal(t) {
    return this.updateWorldMatrix(!0, !1), t.applyMatrix4(dn.copy(this.matrixWorld).invert());
  }
  lookAt(t, e, n) {
    t.isVector3 ? Gs.copy(t) : Gs.set(t, e, n);
    const s = this.parent;
    this.updateWorldMatrix(!0, !1), ss.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? dn.lookAt(ss, Gs, this.up) : dn.lookAt(Gs, ss, this.up), this.quaternion.setFromRotationMatrix(dn), s && (dn.extractRotation(s.matrixWorld), Mi.setFromRotationMatrix(dn), this.quaternion.premultiply(Mi.invert()));
  }
  add(t) {
    if (arguments.length > 1) {
      for (let e = 0; e < arguments.length; e++)
        this.add(arguments[e]);
      return this;
    }
    return t === this ? (console.error("THREE.Object3D.add: object can't be added as a child of itself.", t), this) : (t && t.isObject3D ? (t.removeFromParent(), t.parent = this, this.children.push(t), t.dispatchEvent(Fl), bi.child = t, this.dispatchEvent(bi), bi.child = null) : console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", t), this);
  }
  remove(t) {
    if (arguments.length > 1) {
      for (let n = 0; n < arguments.length; n++)
        this.remove(arguments[n]);
      return this;
    }
    const e = this.children.indexOf(t);
    return e !== -1 && (t.parent = null, this.children.splice(e, 1), t.dispatchEvent(kd), jr.child = t, this.dispatchEvent(jr), jr.child = null), this;
  }
  removeFromParent() {
    const t = this.parent;
    return t !== null && t.remove(this), this;
  }
  clear() {
    return this.remove(...this.children);
  }
  attach(t) {
    return this.updateWorldMatrix(!0, !1), dn.copy(this.matrixWorld).invert(), t.parent !== null && (t.parent.updateWorldMatrix(!0, !1), dn.multiply(t.parent.matrixWorld)), t.applyMatrix4(dn), t.removeFromParent(), t.parent = this, this.children.push(t), t.updateWorldMatrix(!1, !0), t.dispatchEvent(Fl), bi.child = t, this.dispatchEvent(bi), bi.child = null, this;
  }
  getObjectById(t) {
    return this.getObjectByProperty("id", t);
  }
  getObjectByName(t) {
    return this.getObjectByProperty("name", t);
  }
  getObjectByProperty(t, e) {
    if (this[t] === e) return this;
    for (let n = 0, s = this.children.length; n < s; n++) {
      const a = this.children[n].getObjectByProperty(t, e);
      if (a !== void 0)
        return a;
    }
  }
  getObjectsByProperty(t, e, n = []) {
    this[t] === e && n.push(this);
    const s = this.children;
    for (let r = 0, a = s.length; r < a; r++)
      s[r].getObjectsByProperty(t, e, n);
    return n;
  }
  getWorldPosition(t) {
    return this.updateWorldMatrix(!0, !1), t.setFromMatrixPosition(this.matrixWorld);
  }
  getWorldQuaternion(t) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(ss, t, Od), t;
  }
  getWorldScale(t) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(ss, Fd, t), t;
  }
  getWorldDirection(t) {
    this.updateWorldMatrix(!0, !1);
    const e = this.matrixWorld.elements;
    return t.set(e[8], e[9], e[10]).normalize();
  }
  raycast() {
  }
  traverse(t) {
    t(this);
    const e = this.children;
    for (let n = 0, s = e.length; n < s; n++)
      e[n].traverse(t);
  }
  traverseVisible(t) {
    if (this.visible === !1) return;
    t(this);
    const e = this.children;
    for (let n = 0, s = e.length; n < s; n++)
      e[n].traverseVisible(t);
  }
  traverseAncestors(t) {
    const e = this.parent;
    e !== null && (t(e), e.traverseAncestors(t));
  }
  updateMatrix() {
    this.matrix.compose(this.position, this.quaternion, this.scale), this.matrixWorldNeedsUpdate = !0;
  }
  updateMatrixWorld(t) {
    this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || t) && (this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), this.matrixWorldNeedsUpdate = !1, t = !0);
    const e = this.children;
    for (let n = 0, s = e.length; n < s; n++)
      e[n].updateMatrixWorld(t);
  }
  updateWorldMatrix(t, e) {
    const n = this.parent;
    if (t === !0 && n !== null && n.updateWorldMatrix(!0, !1), this.matrixAutoUpdate && this.updateMatrix(), this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), e === !0) {
      const s = this.children;
      for (let r = 0, a = s.length; r < a; r++)
        s[r].updateWorldMatrix(!1, !0);
    }
  }
  toJSON(t) {
    const e = t === void 0 || typeof t == "string", n = {};
    e && (t = {
      geometries: {},
      materials: {},
      textures: {},
      images: {},
      shapes: {},
      skeletons: {},
      animations: {},
      nodes: {}
    }, n.metadata = {
      version: 4.6,
      type: "Object",
      generator: "Object3D.toJSON"
    });
    const s = {};
    s.uuid = this.uuid, s.type = this.type, this.name !== "" && (s.name = this.name), this.castShadow === !0 && (s.castShadow = !0), this.receiveShadow === !0 && (s.receiveShadow = !0), this.visible === !1 && (s.visible = !1), this.frustumCulled === !1 && (s.frustumCulled = !1), this.renderOrder !== 0 && (s.renderOrder = this.renderOrder), Object.keys(this.userData).length > 0 && (s.userData = this.userData), s.layers = this.layers.mask, s.matrix = this.matrix.toArray(), s.up = this.up.toArray(), this.matrixAutoUpdate === !1 && (s.matrixAutoUpdate = !1), this.isInstancedMesh && (s.type = "InstancedMesh", s.count = this.count, s.instanceMatrix = this.instanceMatrix.toJSON(), this.instanceColor !== null && (s.instanceColor = this.instanceColor.toJSON())), this.isBatchedMesh && (s.type = "BatchedMesh", s.perObjectFrustumCulled = this.perObjectFrustumCulled, s.sortObjects = this.sortObjects, s.drawRanges = this._drawRanges, s.reservedRanges = this._reservedRanges, s.visibility = this._visibility, s.active = this._active, s.bounds = this._bounds.map((o) => ({
      boxInitialized: o.boxInitialized,
      boxMin: o.box.min.toArray(),
      boxMax: o.box.max.toArray(),
      sphereInitialized: o.sphereInitialized,
      sphereRadius: o.sphere.radius,
      sphereCenter: o.sphere.center.toArray()
    })), s.maxInstanceCount = this._maxInstanceCount, s.maxVertexCount = this._maxVertexCount, s.maxIndexCount = this._maxIndexCount, s.geometryInitialized = this._geometryInitialized, s.geometryCount = this._geometryCount, s.matricesTexture = this._matricesTexture.toJSON(t), this._colorsTexture !== null && (s.colorsTexture = this._colorsTexture.toJSON(t)), this.boundingSphere !== null && (s.boundingSphere = {
      center: s.boundingSphere.center.toArray(),
      radius: s.boundingSphere.radius
    }), this.boundingBox !== null && (s.boundingBox = {
      min: s.boundingBox.min.toArray(),
      max: s.boundingBox.max.toArray()
    }));
    function r(o, l) {
      return o[l.uuid] === void 0 && (o[l.uuid] = l.toJSON(t)), l.uuid;
    }
    if (this.isScene)
      this.background && (this.background.isColor ? s.background = this.background.toJSON() : this.background.isTexture && (s.background = this.background.toJSON(t).uuid)), this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== !0 && (s.environment = this.environment.toJSON(t).uuid);
    else if (this.isMesh || this.isLine || this.isPoints) {
      s.geometry = r(t.geometries, this.geometry);
      const o = this.geometry.parameters;
      if (o !== void 0 && o.shapes !== void 0) {
        const l = o.shapes;
        if (Array.isArray(l))
          for (let c = 0, h = l.length; c < h; c++) {
            const u = l[c];
            r(t.shapes, u);
          }
        else
          r(t.shapes, l);
      }
    }
    if (this.isSkinnedMesh && (s.bindMode = this.bindMode, s.bindMatrix = this.bindMatrix.toArray(), this.skeleton !== void 0 && (r(t.skeletons, this.skeleton), s.skeleton = this.skeleton.uuid)), this.material !== void 0)
      if (Array.isArray(this.material)) {
        const o = [];
        for (let l = 0, c = this.material.length; l < c; l++)
          o.push(r(t.materials, this.material[l]));
        s.material = o;
      } else
        s.material = r(t.materials, this.material);
    if (this.children.length > 0) {
      s.children = [];
      for (let o = 0; o < this.children.length; o++)
        s.children.push(this.children[o].toJSON(t).object);
    }
    if (this.animations.length > 0) {
      s.animations = [];
      for (let o = 0; o < this.animations.length; o++) {
        const l = this.animations[o];
        s.animations.push(r(t.animations, l));
      }
    }
    if (e) {
      const o = a(t.geometries), l = a(t.materials), c = a(t.textures), h = a(t.images), u = a(t.shapes), d = a(t.skeletons), p = a(t.animations), g = a(t.nodes);
      o.length > 0 && (n.geometries = o), l.length > 0 && (n.materials = l), c.length > 0 && (n.textures = c), h.length > 0 && (n.images = h), u.length > 0 && (n.shapes = u), d.length > 0 && (n.skeletons = d), p.length > 0 && (n.animations = p), g.length > 0 && (n.nodes = g);
    }
    return n.object = s, n;
    function a(o) {
      const l = [];
      for (const c in o) {
        const h = o[c];
        delete h.metadata, l.push(h);
      }
      return l;
    }
  }
  clone(t) {
    return new this.constructor().copy(this, t);
  }
  copy(t, e = !0) {
    if (this.name = t.name, this.up.copy(t.up), this.position.copy(t.position), this.rotation.order = t.rotation.order, this.quaternion.copy(t.quaternion), this.scale.copy(t.scale), this.matrix.copy(t.matrix), this.matrixWorld.copy(t.matrixWorld), this.matrixAutoUpdate = t.matrixAutoUpdate, this.matrixWorldAutoUpdate = t.matrixWorldAutoUpdate, this.matrixWorldNeedsUpdate = t.matrixWorldNeedsUpdate, this.layers.mask = t.layers.mask, this.visible = t.visible, this.castShadow = t.castShadow, this.receiveShadow = t.receiveShadow, this.frustumCulled = t.frustumCulled, this.renderOrder = t.renderOrder, this.animations = t.animations.slice(), this.userData = JSON.parse(JSON.stringify(t.userData)), e === !0)
      for (let n = 0; n < t.children.length; n++) {
        const s = t.children[n];
        this.add(s.clone());
      }
    return this;
  }
}
Ce.DEFAULT_UP = /* @__PURE__ */ new L(0, 1, 0);
Ce.DEFAULT_MATRIX_AUTO_UPDATE = !0;
Ce.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0;
const je = /* @__PURE__ */ new L(), fn = /* @__PURE__ */ new L(), Zr = /* @__PURE__ */ new L(), pn = /* @__PURE__ */ new L(), Si = /* @__PURE__ */ new L(), Ei = /* @__PURE__ */ new L(), kl = /* @__PURE__ */ new L(), Kr = /* @__PURE__ */ new L(), Jr = /* @__PURE__ */ new L(), Qr = /* @__PURE__ */ new L(), to = /* @__PURE__ */ new oe(), eo = /* @__PURE__ */ new oe(), no = /* @__PURE__ */ new oe();
class Ze {
  constructor(t = new L(), e = new L(), n = new L()) {
    this.a = t, this.b = e, this.c = n;
  }
  static getNormal(t, e, n, s) {
    s.subVectors(n, e), je.subVectors(t, e), s.cross(je);
    const r = s.lengthSq();
    return r > 0 ? s.multiplyScalar(1 / Math.sqrt(r)) : s.set(0, 0, 0);
  }
  // static/instance method to calculate barycentric coordinates
  // based on: http://www.blackpawn.com/texts/pointinpoly/default.html
  static getBarycoord(t, e, n, s, r) {
    je.subVectors(s, e), fn.subVectors(n, e), Zr.subVectors(t, e);
    const a = je.dot(je), o = je.dot(fn), l = je.dot(Zr), c = fn.dot(fn), h = fn.dot(Zr), u = a * c - o * o;
    if (u === 0)
      return r.set(0, 0, 0), null;
    const d = 1 / u, p = (c * l - o * h) * d, g = (a * h - o * l) * d;
    return r.set(1 - p - g, g, p);
  }
  static containsPoint(t, e, n, s) {
    return this.getBarycoord(t, e, n, s, pn) === null ? !1 : pn.x >= 0 && pn.y >= 0 && pn.x + pn.y <= 1;
  }
  static getInterpolation(t, e, n, s, r, a, o, l) {
    return this.getBarycoord(t, e, n, s, pn) === null ? (l.x = 0, l.y = 0, "z" in l && (l.z = 0), "w" in l && (l.w = 0), null) : (l.setScalar(0), l.addScaledVector(r, pn.x), l.addScaledVector(a, pn.y), l.addScaledVector(o, pn.z), l);
  }
  static getInterpolatedAttribute(t, e, n, s, r, a) {
    return to.setScalar(0), eo.setScalar(0), no.setScalar(0), to.fromBufferAttribute(t, e), eo.fromBufferAttribute(t, n), no.fromBufferAttribute(t, s), a.setScalar(0), a.addScaledVector(to, r.x), a.addScaledVector(eo, r.y), a.addScaledVector(no, r.z), a;
  }
  static isFrontFacing(t, e, n, s) {
    return je.subVectors(n, e), fn.subVectors(t, e), je.cross(fn).dot(s) < 0;
  }
  set(t, e, n) {
    return this.a.copy(t), this.b.copy(e), this.c.copy(n), this;
  }
  setFromPointsAndIndices(t, e, n, s) {
    return this.a.copy(t[e]), this.b.copy(t[n]), this.c.copy(t[s]), this;
  }
  setFromAttributeAndIndices(t, e, n, s) {
    return this.a.fromBufferAttribute(t, e), this.b.fromBufferAttribute(t, n), this.c.fromBufferAttribute(t, s), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    return this.a.copy(t.a), this.b.copy(t.b), this.c.copy(t.c), this;
  }
  getArea() {
    return je.subVectors(this.c, this.b), fn.subVectors(this.a, this.b), je.cross(fn).length() * 0.5;
  }
  getMidpoint(t) {
    return t.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
  }
  getNormal(t) {
    return Ze.getNormal(this.a, this.b, this.c, t);
  }
  getPlane(t) {
    return t.setFromCoplanarPoints(this.a, this.b, this.c);
  }
  getBarycoord(t, e) {
    return Ze.getBarycoord(t, this.a, this.b, this.c, e);
  }
  getInterpolation(t, e, n, s, r) {
    return Ze.getInterpolation(t, this.a, this.b, this.c, e, n, s, r);
  }
  containsPoint(t) {
    return Ze.containsPoint(t, this.a, this.b, this.c);
  }
  isFrontFacing(t) {
    return Ze.isFrontFacing(this.a, this.b, this.c, t);
  }
  intersectsBox(t) {
    return t.intersectsTriangle(this);
  }
  closestPointToPoint(t, e) {
    const n = this.a, s = this.b, r = this.c;
    let a, o;
    Si.subVectors(s, n), Ei.subVectors(r, n), Kr.subVectors(t, n);
    const l = Si.dot(Kr), c = Ei.dot(Kr);
    if (l <= 0 && c <= 0)
      return e.copy(n);
    Jr.subVectors(t, s);
    const h = Si.dot(Jr), u = Ei.dot(Jr);
    if (h >= 0 && u <= h)
      return e.copy(s);
    const d = l * u - h * c;
    if (d <= 0 && l >= 0 && h <= 0)
      return a = l / (l - h), e.copy(n).addScaledVector(Si, a);
    Qr.subVectors(t, r);
    const p = Si.dot(Qr), g = Ei.dot(Qr);
    if (g >= 0 && p <= g)
      return e.copy(r);
    const _ = p * c - l * g;
    if (_ <= 0 && c >= 0 && g <= 0)
      return o = c / (c - g), e.copy(n).addScaledVector(Ei, o);
    const f = h * g - p * u;
    if (f <= 0 && u - h >= 0 && p - g >= 0)
      return kl.subVectors(r, s), o = (u - h) / (u - h + (p - g)), e.copy(s).addScaledVector(kl, o);
    const m = 1 / (f + _ + d);
    return a = _ * m, o = d * m, e.copy(n).addScaledVector(Si, a).addScaledVector(Ei, o);
  }
  equals(t) {
    return t.a.equals(this.a) && t.b.equals(this.b) && t.c.equals(this.c);
  }
}
const oh = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
}, An = { h: 0, s: 0, l: 0 }, $s = { h: 0, s: 0, l: 0 };
function io(i, t, e) {
  return e < 0 && (e += 1), e > 1 && (e -= 1), e < 1 / 6 ? i + (t - i) * 6 * e : e < 1 / 2 ? t : e < 2 / 3 ? i + (t - i) * 6 * (2 / 3 - e) : i;
}
class Wt {
  constructor(t, e, n) {
    return this.isColor = !0, this.r = 1, this.g = 1, this.b = 1, this.set(t, e, n);
  }
  set(t, e, n) {
    if (e === void 0 && n === void 0) {
      const s = t;
      s && s.isColor ? this.copy(s) : typeof s == "number" ? this.setHex(s) : typeof s == "string" && this.setStyle(s);
    } else
      this.setRGB(t, e, n);
    return this;
  }
  setScalar(t) {
    return this.r = t, this.g = t, this.b = t, this;
  }
  setHex(t, e = Ge) {
    return t = Math.floor(t), this.r = (t >> 16 & 255) / 255, this.g = (t >> 8 & 255) / 255, this.b = (t & 255) / 255, Kt.toWorkingColorSpace(this, e), this;
  }
  setRGB(t, e, n, s = Kt.workingColorSpace) {
    return this.r = t, this.g = e, this.b = n, Kt.toWorkingColorSpace(this, s), this;
  }
  setHSL(t, e, n, s = Kt.workingColorSpace) {
    if (t = Da(t, 1), e = Se(e, 0, 1), n = Se(n, 0, 1), e === 0)
      this.r = this.g = this.b = n;
    else {
      const r = n <= 0.5 ? n * (1 + e) : n + e - n * e, a = 2 * n - r;
      this.r = io(a, r, t + 1 / 3), this.g = io(a, r, t), this.b = io(a, r, t - 1 / 3);
    }
    return Kt.toWorkingColorSpace(this, s), this;
  }
  setStyle(t, e = Ge) {
    function n(r) {
      r !== void 0 && parseFloat(r) < 1 && console.warn("THREE.Color: Alpha component of " + t + " will be ignored.");
    }
    let s;
    if (s = /^(\w+)\(([^\)]*)\)/.exec(t)) {
      let r;
      const a = s[1], o = s[2];
      switch (a) {
        case "rgb":
        case "rgba":
          if (r = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))
            return n(r[4]), this.setRGB(
              Math.min(255, parseInt(r[1], 10)) / 255,
              Math.min(255, parseInt(r[2], 10)) / 255,
              Math.min(255, parseInt(r[3], 10)) / 255,
              e
            );
          if (r = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))
            return n(r[4]), this.setRGB(
              Math.min(100, parseInt(r[1], 10)) / 100,
              Math.min(100, parseInt(r[2], 10)) / 100,
              Math.min(100, parseInt(r[3], 10)) / 100,
              e
            );
          break;
        case "hsl":
        case "hsla":
          if (r = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))
            return n(r[4]), this.setHSL(
              parseFloat(r[1]) / 360,
              parseFloat(r[2]) / 100,
              parseFloat(r[3]) / 100,
              e
            );
          break;
        default:
          console.warn("THREE.Color: Unknown color model " + t);
      }
    } else if (s = /^\#([A-Fa-f\d]+)$/.exec(t)) {
      const r = s[1], a = r.length;
      if (a === 3)
        return this.setRGB(
          parseInt(r.charAt(0), 16) / 15,
          parseInt(r.charAt(1), 16) / 15,
          parseInt(r.charAt(2), 16) / 15,
          e
        );
      if (a === 6)
        return this.setHex(parseInt(r, 16), e);
      console.warn("THREE.Color: Invalid hex color " + t);
    } else if (t && t.length > 0)
      return this.setColorName(t, e);
    return this;
  }
  setColorName(t, e = Ge) {
    const n = oh[t.toLowerCase()];
    return n !== void 0 ? this.setHex(n, e) : console.warn("THREE.Color: Unknown color " + t), this;
  }
  clone() {
    return new this.constructor(this.r, this.g, this.b);
  }
  copy(t) {
    return this.r = t.r, this.g = t.g, this.b = t.b, this;
  }
  copySRGBToLinear(t) {
    return this.r = xn(t.r), this.g = xn(t.g), this.b = xn(t.b), this;
  }
  copyLinearToSRGB(t) {
    return this.r = Bi(t.r), this.g = Bi(t.g), this.b = Bi(t.b), this;
  }
  convertSRGBToLinear() {
    return this.copySRGBToLinear(this), this;
  }
  convertLinearToSRGB() {
    return this.copyLinearToSRGB(this), this;
  }
  getHex(t = Ge) {
    return Kt.fromWorkingColorSpace(Ae.copy(this), t), Math.round(Se(Ae.r * 255, 0, 255)) * 65536 + Math.round(Se(Ae.g * 255, 0, 255)) * 256 + Math.round(Se(Ae.b * 255, 0, 255));
  }
  getHexString(t = Ge) {
    return ("000000" + this.getHex(t).toString(16)).slice(-6);
  }
  getHSL(t, e = Kt.workingColorSpace) {
    Kt.fromWorkingColorSpace(Ae.copy(this), e);
    const n = Ae.r, s = Ae.g, r = Ae.b, a = Math.max(n, s, r), o = Math.min(n, s, r);
    let l, c;
    const h = (o + a) / 2;
    if (o === a)
      l = 0, c = 0;
    else {
      const u = a - o;
      switch (c = h <= 0.5 ? u / (a + o) : u / (2 - a - o), a) {
        case n:
          l = (s - r) / u + (s < r ? 6 : 0);
          break;
        case s:
          l = (r - n) / u + 2;
          break;
        case r:
          l = (n - s) / u + 4;
          break;
      }
      l /= 6;
    }
    return t.h = l, t.s = c, t.l = h, t;
  }
  getRGB(t, e = Kt.workingColorSpace) {
    return Kt.fromWorkingColorSpace(Ae.copy(this), e), t.r = Ae.r, t.g = Ae.g, t.b = Ae.b, t;
  }
  getStyle(t = Ge) {
    Kt.fromWorkingColorSpace(Ae.copy(this), t);
    const e = Ae.r, n = Ae.g, s = Ae.b;
    return t !== Ge ? `color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})` : `rgb(${Math.round(e * 255)},${Math.round(n * 255)},${Math.round(s * 255)})`;
  }
  offsetHSL(t, e, n) {
    return this.getHSL(An), this.setHSL(An.h + t, An.s + e, An.l + n);
  }
  add(t) {
    return this.r += t.r, this.g += t.g, this.b += t.b, this;
  }
  addColors(t, e) {
    return this.r = t.r + e.r, this.g = t.g + e.g, this.b = t.b + e.b, this;
  }
  addScalar(t) {
    return this.r += t, this.g += t, this.b += t, this;
  }
  sub(t) {
    return this.r = Math.max(0, this.r - t.r), this.g = Math.max(0, this.g - t.g), this.b = Math.max(0, this.b - t.b), this;
  }
  multiply(t) {
    return this.r *= t.r, this.g *= t.g, this.b *= t.b, this;
  }
  multiplyScalar(t) {
    return this.r *= t, this.g *= t, this.b *= t, this;
  }
  lerp(t, e) {
    return this.r += (t.r - this.r) * e, this.g += (t.g - this.g) * e, this.b += (t.b - this.b) * e, this;
  }
  lerpColors(t, e, n) {
    return this.r = t.r + (e.r - t.r) * n, this.g = t.g + (e.g - t.g) * n, this.b = t.b + (e.b - t.b) * n, this;
  }
  lerpHSL(t, e) {
    this.getHSL(An), t.getHSL($s);
    const n = ms(An.h, $s.h, e), s = ms(An.s, $s.s, e), r = ms(An.l, $s.l, e);
    return this.setHSL(n, s, r), this;
  }
  setFromVector3(t) {
    return this.r = t.x, this.g = t.y, this.b = t.z, this;
  }
  applyMatrix3(t) {
    const e = this.r, n = this.g, s = this.b, r = t.elements;
    return this.r = r[0] * e + r[3] * n + r[6] * s, this.g = r[1] * e + r[4] * n + r[7] * s, this.b = r[2] * e + r[5] * n + r[8] * s, this;
  }
  equals(t) {
    return t.r === this.r && t.g === this.g && t.b === this.b;
  }
  fromArray(t, e = 0) {
    return this.r = t[e], this.g = t[e + 1], this.b = t[e + 2], this;
  }
  toArray(t = [], e = 0) {
    return t[e] = this.r, t[e + 1] = this.g, t[e + 2] = this.b, t;
  }
  fromBufferAttribute(t, e) {
    return this.r = t.getX(e), this.g = t.getY(e), this.b = t.getZ(e), this;
  }
  toJSON() {
    return this.getHex();
  }
  *[Symbol.iterator]() {
    yield this.r, yield this.g, yield this.b;
  }
}
const Ae = /* @__PURE__ */ new Wt();
Wt.NAMES = oh;
let Bd = 0;
class ji extends di {
  static get type() {
    return "Material";
  }
  get type() {
    return this.constructor.type;
  }
  set type(t) {
  }
  constructor() {
    super(), this.isMaterial = !0, Object.defineProperty(this, "id", { value: Bd++ }), this.uuid = fi(), this.name = "", this.blending = Fi, this.side = Fn, this.vertexColors = !1, this.opacity = 1, this.transparent = !1, this.alphaHash = !1, this.blendSrc = wo, this.blendDst = To, this.blendEquation = Zn, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.blendColor = new Wt(0, 0, 0), this.blendAlpha = 0, this.depthFunc = Vi, this.depthTest = !0, this.depthWrite = !0, this.stencilWriteMask = 255, this.stencilFunc = yl, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = mi, this.stencilZFail = mi, this.stencilZPass = mi, this.stencilWrite = !1, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaToCoverage = !1, this.premultipliedAlpha = !1, this.forceSinglePass = !1, this.visible = !0, this.toneMapped = !0, this.userData = {}, this.version = 0, this._alphaTest = 0;
  }
  get alphaTest() {
    return this._alphaTest;
  }
  set alphaTest(t) {
    this._alphaTest > 0 != t > 0 && this.version++, this._alphaTest = t;
  }
  // onBeforeRender and onBeforeCompile only supported in WebGLRenderer
  onBeforeRender() {
  }
  onBeforeCompile() {
  }
  customProgramCacheKey() {
    return this.onBeforeCompile.toString();
  }
  setValues(t) {
    if (t !== void 0)
      for (const e in t) {
        const n = t[e];
        if (n === void 0) {
          console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);
          continue;
        }
        const s = this[e];
        if (s === void 0) {
          console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);
          continue;
        }
        s && s.isColor ? s.set(n) : s && s.isVector3 && n && n.isVector3 ? s.copy(n) : this[e] = n;
      }
  }
  toJSON(t) {
    const e = t === void 0 || typeof t == "string";
    e && (t = {
      textures: {},
      images: {}
    });
    const n = {
      metadata: {
        version: 4.6,
        type: "Material",
        generator: "Material.toJSON"
      }
    };
    n.uuid = this.uuid, n.type = this.type, this.name !== "" && (n.name = this.name), this.color && this.color.isColor && (n.color = this.color.getHex()), this.roughness !== void 0 && (n.roughness = this.roughness), this.metalness !== void 0 && (n.metalness = this.metalness), this.sheen !== void 0 && (n.sheen = this.sheen), this.sheenColor && this.sheenColor.isColor && (n.sheenColor = this.sheenColor.getHex()), this.sheenRoughness !== void 0 && (n.sheenRoughness = this.sheenRoughness), this.emissive && this.emissive.isColor && (n.emissive = this.emissive.getHex()), this.emissiveIntensity !== void 0 && this.emissiveIntensity !== 1 && (n.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (n.specular = this.specular.getHex()), this.specularIntensity !== void 0 && (n.specularIntensity = this.specularIntensity), this.specularColor && this.specularColor.isColor && (n.specularColor = this.specularColor.getHex()), this.shininess !== void 0 && (n.shininess = this.shininess), this.clearcoat !== void 0 && (n.clearcoat = this.clearcoat), this.clearcoatRoughness !== void 0 && (n.clearcoatRoughness = this.clearcoatRoughness), this.clearcoatMap && this.clearcoatMap.isTexture && (n.clearcoatMap = this.clearcoatMap.toJSON(t).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (n.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(t).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (n.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(t).uuid, n.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.dispersion !== void 0 && (n.dispersion = this.dispersion), this.iridescence !== void 0 && (n.iridescence = this.iridescence), this.iridescenceIOR !== void 0 && (n.iridescenceIOR = this.iridescenceIOR), this.iridescenceThicknessRange !== void 0 && (n.iridescenceThicknessRange = this.iridescenceThicknessRange), this.iridescenceMap && this.iridescenceMap.isTexture && (n.iridescenceMap = this.iridescenceMap.toJSON(t).uuid), this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (n.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(t).uuid), this.anisotropy !== void 0 && (n.anisotropy = this.anisotropy), this.anisotropyRotation !== void 0 && (n.anisotropyRotation = this.anisotropyRotation), this.anisotropyMap && this.anisotropyMap.isTexture && (n.anisotropyMap = this.anisotropyMap.toJSON(t).uuid), this.map && this.map.isTexture && (n.map = this.map.toJSON(t).uuid), this.matcap && this.matcap.isTexture && (n.matcap = this.matcap.toJSON(t).uuid), this.alphaMap && this.alphaMap.isTexture && (n.alphaMap = this.alphaMap.toJSON(t).uuid), this.lightMap && this.lightMap.isTexture && (n.lightMap = this.lightMap.toJSON(t).uuid, n.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (n.aoMap = this.aoMap.toJSON(t).uuid, n.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (n.bumpMap = this.bumpMap.toJSON(t).uuid, n.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (n.normalMap = this.normalMap.toJSON(t).uuid, n.normalMapType = this.normalMapType, n.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (n.displacementMap = this.displacementMap.toJSON(t).uuid, n.displacementScale = this.displacementScale, n.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (n.roughnessMap = this.roughnessMap.toJSON(t).uuid), this.metalnessMap && this.metalnessMap.isTexture && (n.metalnessMap = this.metalnessMap.toJSON(t).uuid), this.emissiveMap && this.emissiveMap.isTexture && (n.emissiveMap = this.emissiveMap.toJSON(t).uuid), this.specularMap && this.specularMap.isTexture && (n.specularMap = this.specularMap.toJSON(t).uuid), this.specularIntensityMap && this.specularIntensityMap.isTexture && (n.specularIntensityMap = this.specularIntensityMap.toJSON(t).uuid), this.specularColorMap && this.specularColorMap.isTexture && (n.specularColorMap = this.specularColorMap.toJSON(t).uuid), this.envMap && this.envMap.isTexture && (n.envMap = this.envMap.toJSON(t).uuid, this.combine !== void 0 && (n.combine = this.combine)), this.envMapRotation !== void 0 && (n.envMapRotation = this.envMapRotation.toArray()), this.envMapIntensity !== void 0 && (n.envMapIntensity = this.envMapIntensity), this.reflectivity !== void 0 && (n.reflectivity = this.reflectivity), this.refractionRatio !== void 0 && (n.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (n.gradientMap = this.gradientMap.toJSON(t).uuid), this.transmission !== void 0 && (n.transmission = this.transmission), this.transmissionMap && this.transmissionMap.isTexture && (n.transmissionMap = this.transmissionMap.toJSON(t).uuid), this.thickness !== void 0 && (n.thickness = this.thickness), this.thicknessMap && this.thicknessMap.isTexture && (n.thicknessMap = this.thicknessMap.toJSON(t).uuid), this.attenuationDistance !== void 0 && this.attenuationDistance !== 1 / 0 && (n.attenuationDistance = this.attenuationDistance), this.attenuationColor !== void 0 && (n.attenuationColor = this.attenuationColor.getHex()), this.size !== void 0 && (n.size = this.size), this.shadowSide !== null && (n.shadowSide = this.shadowSide), this.sizeAttenuation !== void 0 && (n.sizeAttenuation = this.sizeAttenuation), this.blending !== Fi && (n.blending = this.blending), this.side !== Fn && (n.side = this.side), this.vertexColors === !0 && (n.vertexColors = !0), this.opacity < 1 && (n.opacity = this.opacity), this.transparent === !0 && (n.transparent = !0), this.blendSrc !== wo && (n.blendSrc = this.blendSrc), this.blendDst !== To && (n.blendDst = this.blendDst), this.blendEquation !== Zn && (n.blendEquation = this.blendEquation), this.blendSrcAlpha !== null && (n.blendSrcAlpha = this.blendSrcAlpha), this.blendDstAlpha !== null && (n.blendDstAlpha = this.blendDstAlpha), this.blendEquationAlpha !== null && (n.blendEquationAlpha = this.blendEquationAlpha), this.blendColor && this.blendColor.isColor && (n.blendColor = this.blendColor.getHex()), this.blendAlpha !== 0 && (n.blendAlpha = this.blendAlpha), this.depthFunc !== Vi && (n.depthFunc = this.depthFunc), this.depthTest === !1 && (n.depthTest = this.depthTest), this.depthWrite === !1 && (n.depthWrite = this.depthWrite), this.colorWrite === !1 && (n.colorWrite = this.colorWrite), this.stencilWriteMask !== 255 && (n.stencilWriteMask = this.stencilWriteMask), this.stencilFunc !== yl && (n.stencilFunc = this.stencilFunc), this.stencilRef !== 0 && (n.stencilRef = this.stencilRef), this.stencilFuncMask !== 255 && (n.stencilFuncMask = this.stencilFuncMask), this.stencilFail !== mi && (n.stencilFail = this.stencilFail), this.stencilZFail !== mi && (n.stencilZFail = this.stencilZFail), this.stencilZPass !== mi && (n.stencilZPass = this.stencilZPass), this.stencilWrite === !0 && (n.stencilWrite = this.stencilWrite), this.rotation !== void 0 && this.rotation !== 0 && (n.rotation = this.rotation), this.polygonOffset === !0 && (n.polygonOffset = !0), this.polygonOffsetFactor !== 0 && (n.polygonOffsetFactor = this.polygonOffsetFactor), this.polygonOffsetUnits !== 0 && (n.polygonOffsetUnits = this.polygonOffsetUnits), this.linewidth !== void 0 && this.linewidth !== 1 && (n.linewidth = this.linewidth), this.dashSize !== void 0 && (n.dashSize = this.dashSize), this.gapSize !== void 0 && (n.gapSize = this.gapSize), this.scale !== void 0 && (n.scale = this.scale), this.dithering === !0 && (n.dithering = !0), this.alphaTest > 0 && (n.alphaTest = this.alphaTest), this.alphaHash === !0 && (n.alphaHash = !0), this.alphaToCoverage === !0 && (n.alphaToCoverage = !0), this.premultipliedAlpha === !0 && (n.premultipliedAlpha = !0), this.forceSinglePass === !0 && (n.forceSinglePass = !0), this.wireframe === !0 && (n.wireframe = !0), this.wireframeLinewidth > 1 && (n.wireframeLinewidth = this.wireframeLinewidth), this.wireframeLinecap !== "round" && (n.wireframeLinecap = this.wireframeLinecap), this.wireframeLinejoin !== "round" && (n.wireframeLinejoin = this.wireframeLinejoin), this.flatShading === !0 && (n.flatShading = !0), this.visible === !1 && (n.visible = !1), this.toneMapped === !1 && (n.toneMapped = !1), this.fog === !1 && (n.fog = !1), Object.keys(this.userData).length > 0 && (n.userData = this.userData);
    function s(r) {
      const a = [];
      for (const o in r) {
        const l = r[o];
        delete l.metadata, a.push(l);
      }
      return a;
    }
    if (e) {
      const r = s(t.textures), a = s(t.images);
      r.length > 0 && (n.textures = r), a.length > 0 && (n.images = a);
    }
    return n;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    this.name = t.name, this.blending = t.blending, this.side = t.side, this.vertexColors = t.vertexColors, this.opacity = t.opacity, this.transparent = t.transparent, this.blendSrc = t.blendSrc, this.blendDst = t.blendDst, this.blendEquation = t.blendEquation, this.blendSrcAlpha = t.blendSrcAlpha, this.blendDstAlpha = t.blendDstAlpha, this.blendEquationAlpha = t.blendEquationAlpha, this.blendColor.copy(t.blendColor), this.blendAlpha = t.blendAlpha, this.depthFunc = t.depthFunc, this.depthTest = t.depthTest, this.depthWrite = t.depthWrite, this.stencilWriteMask = t.stencilWriteMask, this.stencilFunc = t.stencilFunc, this.stencilRef = t.stencilRef, this.stencilFuncMask = t.stencilFuncMask, this.stencilFail = t.stencilFail, this.stencilZFail = t.stencilZFail, this.stencilZPass = t.stencilZPass, this.stencilWrite = t.stencilWrite;
    const e = t.clippingPlanes;
    let n = null;
    if (e !== null) {
      const s = e.length;
      n = new Array(s);
      for (let r = 0; r !== s; ++r)
        n[r] = e[r].clone();
    }
    return this.clippingPlanes = n, this.clipIntersection = t.clipIntersection, this.clipShadows = t.clipShadows, this.shadowSide = t.shadowSide, this.colorWrite = t.colorWrite, this.precision = t.precision, this.polygonOffset = t.polygonOffset, this.polygonOffsetFactor = t.polygonOffsetFactor, this.polygonOffsetUnits = t.polygonOffsetUnits, this.dithering = t.dithering, this.alphaTest = t.alphaTest, this.alphaHash = t.alphaHash, this.alphaToCoverage = t.alphaToCoverage, this.premultipliedAlpha = t.premultipliedAlpha, this.forceSinglePass = t.forceSinglePass, this.visible = t.visible, this.toneMapped = t.toneMapped, this.userData = JSON.parse(JSON.stringify(t.userData)), this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  set needsUpdate(t) {
    t === !0 && this.version++;
  }
  onBuild() {
    console.warn("Material: onBuild() has been removed.");
  }
}
class Dn extends ji {
  static get type() {
    return "MeshBasicMaterial";
  }
  constructor(t) {
    super(), this.isMeshBasicMaterial = !0, this.color = new Wt(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new on(), this.combine = Gc, this.reflectivity = 1, this.refractionRatio = 0.98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = !0, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.color.copy(t.color), this.map = t.map, this.lightMap = t.lightMap, this.lightMapIntensity = t.lightMapIntensity, this.aoMap = t.aoMap, this.aoMapIntensity = t.aoMapIntensity, this.specularMap = t.specularMap, this.alphaMap = t.alphaMap, this.envMap = t.envMap, this.envMapRotation.copy(t.envMapRotation), this.combine = t.combine, this.reflectivity = t.reflectivity, this.refractionRatio = t.refractionRatio, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.wireframeLinecap = t.wireframeLinecap, this.wireframeLinejoin = t.wireframeLinejoin, this.fog = t.fog, this;
  }
}
const ve = /* @__PURE__ */ new L(), Ws = /* @__PURE__ */ new et();
class rn {
  constructor(t, e, n = !1) {
    if (Array.isArray(t))
      throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
    this.isBufferAttribute = !0, this.name = "", this.array = t, this.itemSize = e, this.count = t !== void 0 ? t.length / e : 0, this.normalized = n, this.usage = Ml, this.updateRanges = [], this.gpuType = gn, this.version = 0;
  }
  onUploadCallback() {
  }
  set needsUpdate(t) {
    t === !0 && this.version++;
  }
  setUsage(t) {
    return this.usage = t, this;
  }
  addUpdateRange(t, e) {
    this.updateRanges.push({ start: t, count: e });
  }
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  copy(t) {
    return this.name = t.name, this.array = new t.array.constructor(t.array), this.itemSize = t.itemSize, this.count = t.count, this.normalized = t.normalized, this.usage = t.usage, this.gpuType = t.gpuType, this;
  }
  copyAt(t, e, n) {
    t *= this.itemSize, n *= e.itemSize;
    for (let s = 0, r = this.itemSize; s < r; s++)
      this.array[t + s] = e.array[n + s];
    return this;
  }
  copyArray(t) {
    return this.array.set(t), this;
  }
  applyMatrix3(t) {
    if (this.itemSize === 2)
      for (let e = 0, n = this.count; e < n; e++)
        Ws.fromBufferAttribute(this, e), Ws.applyMatrix3(t), this.setXY(e, Ws.x, Ws.y);
    else if (this.itemSize === 3)
      for (let e = 0, n = this.count; e < n; e++)
        ve.fromBufferAttribute(this, e), ve.applyMatrix3(t), this.setXYZ(e, ve.x, ve.y, ve.z);
    return this;
  }
  applyMatrix4(t) {
    for (let e = 0, n = this.count; e < n; e++)
      ve.fromBufferAttribute(this, e), ve.applyMatrix4(t), this.setXYZ(e, ve.x, ve.y, ve.z);
    return this;
  }
  applyNormalMatrix(t) {
    for (let e = 0, n = this.count; e < n; e++)
      ve.fromBufferAttribute(this, e), ve.applyNormalMatrix(t), this.setXYZ(e, ve.x, ve.y, ve.z);
    return this;
  }
  transformDirection(t) {
    for (let e = 0, n = this.count; e < n; e++)
      ve.fromBufferAttribute(this, e), ve.transformDirection(t), this.setXYZ(e, ve.x, ve.y, ve.z);
    return this;
  }
  set(t, e = 0) {
    return this.array.set(t, e), this;
  }
  getComponent(t, e) {
    let n = this.array[t * this.itemSize + e];
    return this.normalized && (n = Pi(n, this.array)), n;
  }
  setComponent(t, e, n) {
    return this.normalized && (n = Re(n, this.array)), this.array[t * this.itemSize + e] = n, this;
  }
  getX(t) {
    let e = this.array[t * this.itemSize];
    return this.normalized && (e = Pi(e, this.array)), e;
  }
  setX(t, e) {
    return this.normalized && (e = Re(e, this.array)), this.array[t * this.itemSize] = e, this;
  }
  getY(t) {
    let e = this.array[t * this.itemSize + 1];
    return this.normalized && (e = Pi(e, this.array)), e;
  }
  setY(t, e) {
    return this.normalized && (e = Re(e, this.array)), this.array[t * this.itemSize + 1] = e, this;
  }
  getZ(t) {
    let e = this.array[t * this.itemSize + 2];
    return this.normalized && (e = Pi(e, this.array)), e;
  }
  setZ(t, e) {
    return this.normalized && (e = Re(e, this.array)), this.array[t * this.itemSize + 2] = e, this;
  }
  getW(t) {
    let e = this.array[t * this.itemSize + 3];
    return this.normalized && (e = Pi(e, this.array)), e;
  }
  setW(t, e) {
    return this.normalized && (e = Re(e, this.array)), this.array[t * this.itemSize + 3] = e, this;
  }
  setXY(t, e, n) {
    return t *= this.itemSize, this.normalized && (e = Re(e, this.array), n = Re(n, this.array)), this.array[t + 0] = e, this.array[t + 1] = n, this;
  }
  setXYZ(t, e, n, s) {
    return t *= this.itemSize, this.normalized && (e = Re(e, this.array), n = Re(n, this.array), s = Re(s, this.array)), this.array[t + 0] = e, this.array[t + 1] = n, this.array[t + 2] = s, this;
  }
  setXYZW(t, e, n, s, r) {
    return t *= this.itemSize, this.normalized && (e = Re(e, this.array), n = Re(n, this.array), s = Re(s, this.array), r = Re(r, this.array)), this.array[t + 0] = e, this.array[t + 1] = n, this.array[t + 2] = s, this.array[t + 3] = r, this;
  }
  onUpload(t) {
    return this.onUploadCallback = t, this;
  }
  clone() {
    return new this.constructor(this.array, this.itemSize).copy(this);
  }
  toJSON() {
    const t = {
      itemSize: this.itemSize,
      type: this.array.constructor.name,
      array: Array.from(this.array),
      normalized: this.normalized
    };
    return this.name !== "" && (t.name = this.name), this.usage !== Ml && (t.usage = this.usage), t;
  }
}
class ah extends rn {
  constructor(t, e, n) {
    super(new Uint16Array(t), e, n);
  }
}
class lh extends rn {
  constructor(t, e, n) {
    super(new Uint32Array(t), e, n);
  }
}
class Qt extends rn {
  constructor(t, e, n) {
    super(new Float32Array(t), e, n);
  }
}
let zd = 0;
const Ve = /* @__PURE__ */ new ue(), so = /* @__PURE__ */ new Ce(), wi = /* @__PURE__ */ new L(), Be = /* @__PURE__ */ new Ls(), rs = /* @__PURE__ */ new Ls(), be = /* @__PURE__ */ new L();
class Ee extends di {
  constructor() {
    super(), this.isBufferGeometry = !0, Object.defineProperty(this, "id", { value: zd++ }), this.uuid = fi(), this.name = "", this.type = "BufferGeometry", this.index = null, this.indirect = null, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = !1, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = { start: 0, count: 1 / 0 }, this.userData = {};
  }
  getIndex() {
    return this.index;
  }
  setIndex(t) {
    return Array.isArray(t) ? this.index = new (ih(t) ? lh : ah)(t, 1) : this.index = t, this;
  }
  setIndirect(t) {
    return this.indirect = t, this;
  }
  getIndirect() {
    return this.indirect;
  }
  getAttribute(t) {
    return this.attributes[t];
  }
  setAttribute(t, e) {
    return this.attributes[t] = e, this;
  }
  deleteAttribute(t) {
    return delete this.attributes[t], this;
  }
  hasAttribute(t) {
    return this.attributes[t] !== void 0;
  }
  addGroup(t, e, n = 0) {
    this.groups.push({
      start: t,
      count: e,
      materialIndex: n
    });
  }
  clearGroups() {
    this.groups = [];
  }
  setDrawRange(t, e) {
    this.drawRange.start = t, this.drawRange.count = e;
  }
  applyMatrix4(t) {
    const e = this.attributes.position;
    e !== void 0 && (e.applyMatrix4(t), e.needsUpdate = !0);
    const n = this.attributes.normal;
    if (n !== void 0) {
      const r = new Ht().getNormalMatrix(t);
      n.applyNormalMatrix(r), n.needsUpdate = !0;
    }
    const s = this.attributes.tangent;
    return s !== void 0 && (s.transformDirection(t), s.needsUpdate = !0), this.boundingBox !== null && this.computeBoundingBox(), this.boundingSphere !== null && this.computeBoundingSphere(), this;
  }
  applyQuaternion(t) {
    return Ve.makeRotationFromQuaternion(t), this.applyMatrix4(Ve), this;
  }
  rotateX(t) {
    return Ve.makeRotationX(t), this.applyMatrix4(Ve), this;
  }
  rotateY(t) {
    return Ve.makeRotationY(t), this.applyMatrix4(Ve), this;
  }
  rotateZ(t) {
    return Ve.makeRotationZ(t), this.applyMatrix4(Ve), this;
  }
  translate(t, e, n) {
    return Ve.makeTranslation(t, e, n), this.applyMatrix4(Ve), this;
  }
  scale(t, e, n) {
    return Ve.makeScale(t, e, n), this.applyMatrix4(Ve), this;
  }
  lookAt(t) {
    return so.lookAt(t), so.updateMatrix(), this.applyMatrix4(so.matrix), this;
  }
  center() {
    return this.computeBoundingBox(), this.boundingBox.getCenter(wi).negate(), this.translate(wi.x, wi.y, wi.z), this;
  }
  setFromPoints(t) {
    const e = this.getAttribute("position");
    if (e === void 0) {
      const n = [];
      for (let s = 0, r = t.length; s < r; s++) {
        const a = t[s];
        n.push(a.x, a.y, a.z || 0);
      }
      this.setAttribute("position", new Qt(n, 3));
    } else {
      for (let n = 0, s = e.count; n < s; n++) {
        const r = t[n];
        e.setXYZ(n, r.x, r.y, r.z || 0);
      }
      t.length > e.count && console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."), e.needsUpdate = !0;
    }
    return this;
  }
  computeBoundingBox() {
    this.boundingBox === null && (this.boundingBox = new Ls());
    const t = this.attributes.position, e = this.morphAttributes.position;
    if (t && t.isGLBufferAttribute) {
      console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.", this), this.boundingBox.set(
        new L(-1 / 0, -1 / 0, -1 / 0),
        new L(1 / 0, 1 / 0, 1 / 0)
      );
      return;
    }
    if (t !== void 0) {
      if (this.boundingBox.setFromBufferAttribute(t), e)
        for (let n = 0, s = e.length; n < s; n++) {
          const r = e[n];
          Be.setFromBufferAttribute(r), this.morphTargetsRelative ? (be.addVectors(this.boundingBox.min, Be.min), this.boundingBox.expandByPoint(be), be.addVectors(this.boundingBox.max, Be.max), this.boundingBox.expandByPoint(be)) : (this.boundingBox.expandByPoint(Be.min), this.boundingBox.expandByPoint(Be.max));
        }
    } else
      this.boundingBox.makeEmpty();
    (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);
  }
  computeBoundingSphere() {
    this.boundingSphere === null && (this.boundingSphere = new Rr());
    const t = this.attributes.position, e = this.morphAttributes.position;
    if (t && t.isGLBufferAttribute) {
      console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.", this), this.boundingSphere.set(new L(), 1 / 0);
      return;
    }
    if (t) {
      const n = this.boundingSphere.center;
      if (Be.setFromBufferAttribute(t), e)
        for (let r = 0, a = e.length; r < a; r++) {
          const o = e[r];
          rs.setFromBufferAttribute(o), this.morphTargetsRelative ? (be.addVectors(Be.min, rs.min), Be.expandByPoint(be), be.addVectors(Be.max, rs.max), Be.expandByPoint(be)) : (Be.expandByPoint(rs.min), Be.expandByPoint(rs.max));
        }
      Be.getCenter(n);
      let s = 0;
      for (let r = 0, a = t.count; r < a; r++)
        be.fromBufferAttribute(t, r), s = Math.max(s, n.distanceToSquared(be));
      if (e)
        for (let r = 0, a = e.length; r < a; r++) {
          const o = e[r], l = this.morphTargetsRelative;
          for (let c = 0, h = o.count; c < h; c++)
            be.fromBufferAttribute(o, c), l && (wi.fromBufferAttribute(t, c), be.add(wi)), s = Math.max(s, n.distanceToSquared(be));
        }
      this.boundingSphere.radius = Math.sqrt(s), isNaN(this.boundingSphere.radius) && console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this);
    }
  }
  computeTangents() {
    const t = this.index, e = this.attributes;
    if (t === null || e.position === void 0 || e.normal === void 0 || e.uv === void 0) {
      console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
      return;
    }
    const n = e.position, s = e.normal, r = e.uv;
    this.hasAttribute("tangent") === !1 && this.setAttribute("tangent", new rn(new Float32Array(4 * n.count), 4));
    const a = this.getAttribute("tangent"), o = [], l = [];
    for (let D = 0; D < n.count; D++)
      o[D] = new L(), l[D] = new L();
    const c = new L(), h = new L(), u = new L(), d = new et(), p = new et(), g = new et(), _ = new L(), f = new L();
    function m(D, S, M) {
      c.fromBufferAttribute(n, D), h.fromBufferAttribute(n, S), u.fromBufferAttribute(n, M), d.fromBufferAttribute(r, D), p.fromBufferAttribute(r, S), g.fromBufferAttribute(r, M), h.sub(c), u.sub(c), p.sub(d), g.sub(d);
      const P = 1 / (p.x * g.y - g.x * p.y);
      isFinite(P) && (_.copy(h).multiplyScalar(g.y).addScaledVector(u, -p.y).multiplyScalar(P), f.copy(u).multiplyScalar(p.x).addScaledVector(h, -g.x).multiplyScalar(P), o[D].add(_), o[S].add(_), o[M].add(_), l[D].add(f), l[S].add(f), l[M].add(f));
    }
    let b = this.groups;
    b.length === 0 && (b = [{
      start: 0,
      count: t.count
    }]);
    for (let D = 0, S = b.length; D < S; ++D) {
      const M = b[D], P = M.start, z = M.count;
      for (let O = P, F = P + z; O < F; O += 3)
        m(
          t.getX(O + 0),
          t.getX(O + 1),
          t.getX(O + 2)
        );
    }
    const x = new L(), v = new L(), w = new L(), A = new L();
    function C(D) {
      w.fromBufferAttribute(s, D), A.copy(w);
      const S = o[D];
      x.copy(S), x.sub(w.multiplyScalar(w.dot(S))).normalize(), v.crossVectors(A, S);
      const P = v.dot(l[D]) < 0 ? -1 : 1;
      a.setXYZW(D, x.x, x.y, x.z, P);
    }
    for (let D = 0, S = b.length; D < S; ++D) {
      const M = b[D], P = M.start, z = M.count;
      for (let O = P, F = P + z; O < F; O += 3)
        C(t.getX(O + 0)), C(t.getX(O + 1)), C(t.getX(O + 2));
    }
  }
  computeVertexNormals() {
    const t = this.index, e = this.getAttribute("position");
    if (e !== void 0) {
      let n = this.getAttribute("normal");
      if (n === void 0)
        n = new rn(new Float32Array(e.count * 3), 3), this.setAttribute("normal", n);
      else
        for (let d = 0, p = n.count; d < p; d++)
          n.setXYZ(d, 0, 0, 0);
      const s = new L(), r = new L(), a = new L(), o = new L(), l = new L(), c = new L(), h = new L(), u = new L();
      if (t)
        for (let d = 0, p = t.count; d < p; d += 3) {
          const g = t.getX(d + 0), _ = t.getX(d + 1), f = t.getX(d + 2);
          s.fromBufferAttribute(e, g), r.fromBufferAttribute(e, _), a.fromBufferAttribute(e, f), h.subVectors(a, r), u.subVectors(s, r), h.cross(u), o.fromBufferAttribute(n, g), l.fromBufferAttribute(n, _), c.fromBufferAttribute(n, f), o.add(h), l.add(h), c.add(h), n.setXYZ(g, o.x, o.y, o.z), n.setXYZ(_, l.x, l.y, l.z), n.setXYZ(f, c.x, c.y, c.z);
        }
      else
        for (let d = 0, p = e.count; d < p; d += 3)
          s.fromBufferAttribute(e, d + 0), r.fromBufferAttribute(e, d + 1), a.fromBufferAttribute(e, d + 2), h.subVectors(a, r), u.subVectors(s, r), h.cross(u), n.setXYZ(d + 0, h.x, h.y, h.z), n.setXYZ(d + 1, h.x, h.y, h.z), n.setXYZ(d + 2, h.x, h.y, h.z);
      this.normalizeNormals(), n.needsUpdate = !0;
    }
  }
  normalizeNormals() {
    const t = this.attributes.normal;
    for (let e = 0, n = t.count; e < n; e++)
      be.fromBufferAttribute(t, e), be.normalize(), t.setXYZ(e, be.x, be.y, be.z);
  }
  toNonIndexed() {
    function t(o, l) {
      const c = o.array, h = o.itemSize, u = o.normalized, d = new c.constructor(l.length * h);
      let p = 0, g = 0;
      for (let _ = 0, f = l.length; _ < f; _++) {
        o.isInterleavedBufferAttribute ? p = l[_] * o.data.stride + o.offset : p = l[_] * h;
        for (let m = 0; m < h; m++)
          d[g++] = c[p++];
      }
      return new rn(d, h, u);
    }
    if (this.index === null)
      return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
    const e = new Ee(), n = this.index.array, s = this.attributes;
    for (const o in s) {
      const l = s[o], c = t(l, n);
      e.setAttribute(o, c);
    }
    const r = this.morphAttributes;
    for (const o in r) {
      const l = [], c = r[o];
      for (let h = 0, u = c.length; h < u; h++) {
        const d = c[h], p = t(d, n);
        l.push(p);
      }
      e.morphAttributes[o] = l;
    }
    e.morphTargetsRelative = this.morphTargetsRelative;
    const a = this.groups;
    for (let o = 0, l = a.length; o < l; o++) {
      const c = a[o];
      e.addGroup(c.start, c.count, c.materialIndex);
    }
    return e;
  }
  toJSON() {
    const t = {
      metadata: {
        version: 4.6,
        type: "BufferGeometry",
        generator: "BufferGeometry.toJSON"
      }
    };
    if (t.uuid = this.uuid, t.type = this.type, this.name !== "" && (t.name = this.name), Object.keys(this.userData).length > 0 && (t.userData = this.userData), this.parameters !== void 0) {
      const l = this.parameters;
      for (const c in l)
        l[c] !== void 0 && (t[c] = l[c]);
      return t;
    }
    t.data = { attributes: {} };
    const e = this.index;
    e !== null && (t.data.index = {
      type: e.array.constructor.name,
      array: Array.prototype.slice.call(e.array)
    });
    const n = this.attributes;
    for (const l in n) {
      const c = n[l];
      t.data.attributes[l] = c.toJSON(t.data);
    }
    const s = {};
    let r = !1;
    for (const l in this.morphAttributes) {
      const c = this.morphAttributes[l], h = [];
      for (let u = 0, d = c.length; u < d; u++) {
        const p = c[u];
        h.push(p.toJSON(t.data));
      }
      h.length > 0 && (s[l] = h, r = !0);
    }
    r && (t.data.morphAttributes = s, t.data.morphTargetsRelative = this.morphTargetsRelative);
    const a = this.groups;
    a.length > 0 && (t.data.groups = JSON.parse(JSON.stringify(a)));
    const o = this.boundingSphere;
    return o !== null && (t.data.boundingSphere = {
      center: o.center.toArray(),
      radius: o.radius
    }), t;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null;
    const e = {};
    this.name = t.name;
    const n = t.index;
    n !== null && this.setIndex(n.clone(e));
    const s = t.attributes;
    for (const c in s) {
      const h = s[c];
      this.setAttribute(c, h.clone(e));
    }
    const r = t.morphAttributes;
    for (const c in r) {
      const h = [], u = r[c];
      for (let d = 0, p = u.length; d < p; d++)
        h.push(u[d].clone(e));
      this.morphAttributes[c] = h;
    }
    this.morphTargetsRelative = t.morphTargetsRelative;
    const a = t.groups;
    for (let c = 0, h = a.length; c < h; c++) {
      const u = a[c];
      this.addGroup(u.start, u.count, u.materialIndex);
    }
    const o = t.boundingBox;
    o !== null && (this.boundingBox = o.clone());
    const l = t.boundingSphere;
    return l !== null && (this.boundingSphere = l.clone()), this.drawRange.start = t.drawRange.start, this.drawRange.count = t.drawRange.count, this.userData = t.userData, this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
const Bl = /* @__PURE__ */ new ue(), Wn = /* @__PURE__ */ new Pr(), Xs = /* @__PURE__ */ new Rr(), zl = /* @__PURE__ */ new L(), Ys = /* @__PURE__ */ new L(), qs = /* @__PURE__ */ new L(), js = /* @__PURE__ */ new L(), ro = /* @__PURE__ */ new L(), Zs = /* @__PURE__ */ new L(), Hl = /* @__PURE__ */ new L(), Ks = /* @__PURE__ */ new L();
class Mt extends Ce {
  constructor(t = new Ee(), e = new Dn()) {
    super(), this.isMesh = !0, this.type = "Mesh", this.geometry = t, this.material = e, this.updateMorphTargets();
  }
  copy(t, e) {
    return super.copy(t, e), t.morphTargetInfluences !== void 0 && (this.morphTargetInfluences = t.morphTargetInfluences.slice()), t.morphTargetDictionary !== void 0 && (this.morphTargetDictionary = Object.assign({}, t.morphTargetDictionary)), this.material = Array.isArray(t.material) ? t.material.slice() : t.material, this.geometry = t.geometry, this;
  }
  updateMorphTargets() {
    const e = this.geometry.morphAttributes, n = Object.keys(e);
    if (n.length > 0) {
      const s = e[n[0]];
      if (s !== void 0) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let r = 0, a = s.length; r < a; r++) {
          const o = s[r].name || String(r);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[o] = r;
        }
      }
    }
  }
  getVertexPosition(t, e) {
    const n = this.geometry, s = n.attributes.position, r = n.morphAttributes.position, a = n.morphTargetsRelative;
    e.fromBufferAttribute(s, t);
    const o = this.morphTargetInfluences;
    if (r && o) {
      Zs.set(0, 0, 0);
      for (let l = 0, c = r.length; l < c; l++) {
        const h = o[l], u = r[l];
        h !== 0 && (ro.fromBufferAttribute(u, t), a ? Zs.addScaledVector(ro, h) : Zs.addScaledVector(ro.sub(e), h));
      }
      e.add(Zs);
    }
    return e;
  }
  raycast(t, e) {
    const n = this.geometry, s = this.material, r = this.matrixWorld;
    s !== void 0 && (n.boundingSphere === null && n.computeBoundingSphere(), Xs.copy(n.boundingSphere), Xs.applyMatrix4(r), Wn.copy(t.ray).recast(t.near), !(Xs.containsPoint(Wn.origin) === !1 && (Wn.intersectSphere(Xs, zl) === null || Wn.origin.distanceToSquared(zl) > (t.far - t.near) ** 2)) && (Bl.copy(r).invert(), Wn.copy(t.ray).applyMatrix4(Bl), !(n.boundingBox !== null && Wn.intersectsBox(n.boundingBox) === !1) && this._computeIntersections(t, e, Wn)));
  }
  _computeIntersections(t, e, n) {
    let s;
    const r = this.geometry, a = this.material, o = r.index, l = r.attributes.position, c = r.attributes.uv, h = r.attributes.uv1, u = r.attributes.normal, d = r.groups, p = r.drawRange;
    if (o !== null)
      if (Array.isArray(a))
        for (let g = 0, _ = d.length; g < _; g++) {
          const f = d[g], m = a[f.materialIndex], b = Math.max(f.start, p.start), x = Math.min(o.count, Math.min(f.start + f.count, p.start + p.count));
          for (let v = b, w = x; v < w; v += 3) {
            const A = o.getX(v), C = o.getX(v + 1), D = o.getX(v + 2);
            s = Js(this, m, t, n, c, h, u, A, C, D), s && (s.faceIndex = Math.floor(v / 3), s.face.materialIndex = f.materialIndex, e.push(s));
          }
        }
      else {
        const g = Math.max(0, p.start), _ = Math.min(o.count, p.start + p.count);
        for (let f = g, m = _; f < m; f += 3) {
          const b = o.getX(f), x = o.getX(f + 1), v = o.getX(f + 2);
          s = Js(this, a, t, n, c, h, u, b, x, v), s && (s.faceIndex = Math.floor(f / 3), e.push(s));
        }
      }
    else if (l !== void 0)
      if (Array.isArray(a))
        for (let g = 0, _ = d.length; g < _; g++) {
          const f = d[g], m = a[f.materialIndex], b = Math.max(f.start, p.start), x = Math.min(l.count, Math.min(f.start + f.count, p.start + p.count));
          for (let v = b, w = x; v < w; v += 3) {
            const A = v, C = v + 1, D = v + 2;
            s = Js(this, m, t, n, c, h, u, A, C, D), s && (s.faceIndex = Math.floor(v / 3), s.face.materialIndex = f.materialIndex, e.push(s));
          }
        }
      else {
        const g = Math.max(0, p.start), _ = Math.min(l.count, p.start + p.count);
        for (let f = g, m = _; f < m; f += 3) {
          const b = f, x = f + 1, v = f + 2;
          s = Js(this, a, t, n, c, h, u, b, x, v), s && (s.faceIndex = Math.floor(f / 3), e.push(s));
        }
      }
  }
}
function Hd(i, t, e, n, s, r, a, o) {
  let l;
  if (t.side === Ne ? l = n.intersectTriangle(a, r, s, !0, o) : l = n.intersectTriangle(s, r, a, t.side === Fn, o), l === null) return null;
  Ks.copy(o), Ks.applyMatrix4(i.matrixWorld);
  const c = e.ray.origin.distanceTo(Ks);
  return c < e.near || c > e.far ? null : {
    distance: c,
    point: Ks.clone(),
    object: i
  };
}
function Js(i, t, e, n, s, r, a, o, l, c) {
  i.getVertexPosition(o, Ys), i.getVertexPosition(l, qs), i.getVertexPosition(c, js);
  const h = Hd(i, t, e, n, Ys, qs, js, Hl);
  if (h) {
    const u = new L();
    Ze.getBarycoord(Hl, Ys, qs, js, u), s && (h.uv = Ze.getInterpolatedAttribute(s, o, l, c, u, new et())), r && (h.uv1 = Ze.getInterpolatedAttribute(r, o, l, c, u, new et())), a && (h.normal = Ze.getInterpolatedAttribute(a, o, l, c, u, new L()), h.normal.dot(n.direction) > 0 && h.normal.multiplyScalar(-1));
    const d = {
      a: o,
      b: l,
      c,
      normal: new L(),
      materialIndex: 0
    };
    Ze.getNormal(Ys, qs, js, d.normal), h.face = d, h.barycoord = u;
  }
  return h;
}
class ie extends Ee {
  constructor(t = 1, e = 1, n = 1, s = 1, r = 1, a = 1) {
    super(), this.type = "BoxGeometry", this.parameters = {
      width: t,
      height: e,
      depth: n,
      widthSegments: s,
      heightSegments: r,
      depthSegments: a
    };
    const o = this;
    s = Math.floor(s), r = Math.floor(r), a = Math.floor(a);
    const l = [], c = [], h = [], u = [];
    let d = 0, p = 0;
    g("z", "y", "x", -1, -1, n, e, t, a, r, 0), g("z", "y", "x", 1, -1, n, e, -t, a, r, 1), g("x", "z", "y", 1, 1, t, n, e, s, a, 2), g("x", "z", "y", 1, -1, t, n, -e, s, a, 3), g("x", "y", "z", 1, -1, t, e, n, s, r, 4), g("x", "y", "z", -1, -1, t, e, -n, s, r, 5), this.setIndex(l), this.setAttribute("position", new Qt(c, 3)), this.setAttribute("normal", new Qt(h, 3)), this.setAttribute("uv", new Qt(u, 2));
    function g(_, f, m, b, x, v, w, A, C, D, S) {
      const M = v / C, P = w / D, z = v / 2, O = w / 2, F = A / 2, W = C + 1, H = D + 1;
      let J = 0, k = 0;
      const tt = new L();
      for (let nt = 0; nt < H; nt++) {
        const ht = nt * P - O;
        for (let Pt = 0; Pt < W; Pt++) {
          const Yt = Pt * M - z;
          tt[_] = Yt * b, tt[f] = ht * x, tt[m] = F, c.push(tt.x, tt.y, tt.z), tt[_] = 0, tt[f] = 0, tt[m] = A > 0 ? 1 : -1, h.push(tt.x, tt.y, tt.z), u.push(Pt / C), u.push(1 - nt / D), J += 1;
        }
      }
      for (let nt = 0; nt < D; nt++)
        for (let ht = 0; ht < C; ht++) {
          const Pt = d + ht + W * nt, Yt = d + ht + W * (nt + 1), Y = d + (ht + 1) + W * (nt + 1), st = d + (ht + 1) + W * nt;
          l.push(Pt, Yt, st), l.push(Yt, Y, st), k += 6;
        }
      o.addGroup(p, k, S), p += k, d += J;
    }
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new ie(t.width, t.height, t.depth, t.widthSegments, t.heightSegments, t.depthSegments);
  }
}
function Yi(i) {
  const t = {};
  for (const e in i) {
    t[e] = {};
    for (const n in i[e]) {
      const s = i[e][n];
      s && (s.isColor || s.isMatrix3 || s.isMatrix4 || s.isVector2 || s.isVector3 || s.isVector4 || s.isTexture || s.isQuaternion) ? s.isRenderTargetTexture ? (console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."), t[e][n] = null) : t[e][n] = s.clone() : Array.isArray(s) ? t[e][n] = s.slice() : t[e][n] = s;
    }
  }
  return t;
}
function Pe(i) {
  const t = {};
  for (let e = 0; e < i.length; e++) {
    const n = Yi(i[e]);
    for (const s in n)
      t[s] = n[s];
  }
  return t;
}
function Vd(i) {
  const t = [];
  for (let e = 0; e < i.length; e++)
    t.push(i[e].clone());
  return t;
}
function ch(i) {
  const t = i.getRenderTarget();
  return t === null ? i.outputColorSpace : t.isXRRenderTarget === !0 ? t.texture.colorSpace : Kt.workingColorSpace;
}
const Gd = { clone: Yi, merge: Pe };
var $d = `void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`, Wd = `void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;
class kn extends ji {
  static get type() {
    return "ShaderMaterial";
  }
  constructor(t) {
    super(), this.isShaderMaterial = !0, this.defines = {}, this.uniforms = {}, this.uniformsGroups = [], this.vertexShader = $d, this.fragmentShader = Wd, this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.forceSinglePass = !0, this.extensions = {
      clipCullDistance: !1,
      // set to use vertex shader clipping
      multiDraw: !1
      // set to use vertex shader multi_draw / enable gl_DrawID
    }, this.defaultAttributeValues = {
      color: [1, 1, 1],
      uv: [0, 0],
      uv1: [0, 0]
    }, this.index0AttributeName = void 0, this.uniformsNeedUpdate = !1, this.glslVersion = null, t !== void 0 && this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.fragmentShader = t.fragmentShader, this.vertexShader = t.vertexShader, this.uniforms = Yi(t.uniforms), this.uniformsGroups = Vd(t.uniformsGroups), this.defines = Object.assign({}, t.defines), this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.fog = t.fog, this.lights = t.lights, this.clipping = t.clipping, this.extensions = Object.assign({}, t.extensions), this.glslVersion = t.glslVersion, this;
  }
  toJSON(t) {
    const e = super.toJSON(t);
    e.glslVersion = this.glslVersion, e.uniforms = {};
    for (const s in this.uniforms) {
      const a = this.uniforms[s].value;
      a && a.isTexture ? e.uniforms[s] = {
        type: "t",
        value: a.toJSON(t).uuid
      } : a && a.isColor ? e.uniforms[s] = {
        type: "c",
        value: a.getHex()
      } : a && a.isVector2 ? e.uniforms[s] = {
        type: "v2",
        value: a.toArray()
      } : a && a.isVector3 ? e.uniforms[s] = {
        type: "v3",
        value: a.toArray()
      } : a && a.isVector4 ? e.uniforms[s] = {
        type: "v4",
        value: a.toArray()
      } : a && a.isMatrix3 ? e.uniforms[s] = {
        type: "m3",
        value: a.toArray()
      } : a && a.isMatrix4 ? e.uniforms[s] = {
        type: "m4",
        value: a.toArray()
      } : e.uniforms[s] = {
        value: a
      };
    }
    Object.keys(this.defines).length > 0 && (e.defines = this.defines), e.vertexShader = this.vertexShader, e.fragmentShader = this.fragmentShader, e.lights = this.lights, e.clipping = this.clipping;
    const n = {};
    for (const s in this.extensions)
      this.extensions[s] === !0 && (n[s] = !0);
    return Object.keys(n).length > 0 && (e.extensions = n), e;
  }
}
class hh extends Ce {
  constructor() {
    super(), this.isCamera = !0, this.type = "Camera", this.matrixWorldInverse = new ue(), this.projectionMatrix = new ue(), this.projectionMatrixInverse = new ue(), this.coordinateSystem = _n;
  }
  copy(t, e) {
    return super.copy(t, e), this.matrixWorldInverse.copy(t.matrixWorldInverse), this.projectionMatrix.copy(t.projectionMatrix), this.projectionMatrixInverse.copy(t.projectionMatrixInverse), this.coordinateSystem = t.coordinateSystem, this;
  }
  getWorldDirection(t) {
    return super.getWorldDirection(t).negate();
  }
  updateMatrixWorld(t) {
    super.updateMatrixWorld(t), this.matrixWorldInverse.copy(this.matrixWorld).invert();
  }
  updateWorldMatrix(t, e) {
    super.updateWorldMatrix(t, e), this.matrixWorldInverse.copy(this.matrixWorld).invert();
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const Cn = /* @__PURE__ */ new L(), Vl = /* @__PURE__ */ new et(), Gl = /* @__PURE__ */ new et();
class ze extends hh {
  constructor(t = 50, e = 1, n = 0.1, s = 2e3) {
    super(), this.isPerspectiveCamera = !0, this.type = "PerspectiveCamera", this.fov = t, this.zoom = 1, this.near = n, this.far = s, this.focus = 10, this.aspect = e, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix();
  }
  copy(t, e) {
    return super.copy(t, e), this.fov = t.fov, this.zoom = t.zoom, this.near = t.near, this.far = t.far, this.focus = t.focus, this.aspect = t.aspect, this.view = t.view === null ? null : Object.assign({}, t.view), this.filmGauge = t.filmGauge, this.filmOffset = t.filmOffset, this;
  }
  /**
   * Sets the FOV by focal length in respect to the current .filmGauge.
   *
   * The default film gauge is 35, so that the focal length can be specified for
   * a 35mm (full frame) camera.
   *
   * Values for focal length and film gauge must have the same unit.
   */
  setFocalLength(t) {
    const e = 0.5 * this.getFilmHeight() / t;
    this.fov = ws * 2 * Math.atan(e), this.updateProjectionMatrix();
  }
  /**
   * Calculates the focal length from the current .fov and .filmGauge.
   */
  getFocalLength() {
    const t = Math.tan(ps * 0.5 * this.fov);
    return 0.5 * this.getFilmHeight() / t;
  }
  getEffectiveFOV() {
    return ws * 2 * Math.atan(
      Math.tan(ps * 0.5 * this.fov) / this.zoom
    );
  }
  getFilmWidth() {
    return this.filmGauge * Math.min(this.aspect, 1);
  }
  getFilmHeight() {
    return this.filmGauge / Math.max(this.aspect, 1);
  }
  /**
   * Computes the 2D bounds of the camera's viewable rectangle at a given distance along the viewing direction.
   * Sets minTarget and maxTarget to the coordinates of the lower-left and upper-right corners of the view rectangle.
   */
  getViewBounds(t, e, n) {
    Cn.set(-1, -1, 0.5).applyMatrix4(this.projectionMatrixInverse), e.set(Cn.x, Cn.y).multiplyScalar(-t / Cn.z), Cn.set(1, 1, 0.5).applyMatrix4(this.projectionMatrixInverse), n.set(Cn.x, Cn.y).multiplyScalar(-t / Cn.z);
  }
  /**
   * Computes the width and height of the camera's viewable rectangle at a given distance along the viewing direction.
   * Copies the result into the target Vector2, where x is width and y is height.
   */
  getViewSize(t, e) {
    return this.getViewBounds(t, Vl, Gl), e.subVectors(Gl, Vl);
  }
  /**
   * Sets an offset in a larger frustum. This is useful for multi-window or
   * multi-monitor/multi-machine setups.
   *
   * For example, if you have 3x2 monitors and each monitor is 1920x1080 and
   * the monitors are in grid like this
   *
   *   +---+---+---+
   *   | A | B | C |
   *   +---+---+---+
   *   | D | E | F |
   *   +---+---+---+
   *
   * then for each monitor you would call it like this
   *
   *   const w = 1920;
   *   const h = 1080;
   *   const fullWidth = w * 3;
   *   const fullHeight = h * 2;
   *
   *   --A--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 0, w, h );
   *   --B--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 0, w, h );
   *   --C--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 0, w, h );
   *   --D--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 1, w, h );
   *   --E--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 1, w, h );
   *   --F--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 1, w, h );
   *
   *   Note there is no reason monitors have to be the same size or in a grid.
   */
  setViewOffset(t, e, n, s, r, a) {
    this.aspect = t / e, this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = t, this.view.fullHeight = e, this.view.offsetX = n, this.view.offsetY = s, this.view.width = r, this.view.height = a, this.updateProjectionMatrix();
  }
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const t = this.near;
    let e = t * Math.tan(ps * 0.5 * this.fov) / this.zoom, n = 2 * e, s = this.aspect * n, r = -0.5 * s;
    const a = this.view;
    if (this.view !== null && this.view.enabled) {
      const l = a.fullWidth, c = a.fullHeight;
      r += a.offsetX * s / l, e -= a.offsetY * n / c, s *= a.width / l, n *= a.height / c;
    }
    const o = this.filmOffset;
    o !== 0 && (r += t * o / this.getFilmWidth()), this.projectionMatrix.makePerspective(r, r + s, e, e - n, t, this.far, this.coordinateSystem), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(t) {
    const e = super.toJSON(t);
    return e.object.fov = this.fov, e.object.zoom = this.zoom, e.object.near = this.near, e.object.far = this.far, e.object.focus = this.focus, e.object.aspect = this.aspect, this.view !== null && (e.object.view = Object.assign({}, this.view)), e.object.filmGauge = this.filmGauge, e.object.filmOffset = this.filmOffset, e;
  }
}
const Ti = -90, Ai = 1;
class Xd extends Ce {
  constructor(t, e, n) {
    super(), this.type = "CubeCamera", this.renderTarget = n, this.coordinateSystem = null, this.activeMipmapLevel = 0;
    const s = new ze(Ti, Ai, t, e);
    s.layers = this.layers, this.add(s);
    const r = new ze(Ti, Ai, t, e);
    r.layers = this.layers, this.add(r);
    const a = new ze(Ti, Ai, t, e);
    a.layers = this.layers, this.add(a);
    const o = new ze(Ti, Ai, t, e);
    o.layers = this.layers, this.add(o);
    const l = new ze(Ti, Ai, t, e);
    l.layers = this.layers, this.add(l);
    const c = new ze(Ti, Ai, t, e);
    c.layers = this.layers, this.add(c);
  }
  updateCoordinateSystem() {
    const t = this.coordinateSystem, e = this.children.concat(), [n, s, r, a, o, l] = e;
    for (const c of e) this.remove(c);
    if (t === _n)
      n.up.set(0, 1, 0), n.lookAt(1, 0, 0), s.up.set(0, 1, 0), s.lookAt(-1, 0, 0), r.up.set(0, 0, -1), r.lookAt(0, 1, 0), a.up.set(0, 0, 1), a.lookAt(0, -1, 0), o.up.set(0, 1, 0), o.lookAt(0, 0, 1), l.up.set(0, 1, 0), l.lookAt(0, 0, -1);
    else if (t === Mr)
      n.up.set(0, -1, 0), n.lookAt(-1, 0, 0), s.up.set(0, -1, 0), s.lookAt(1, 0, 0), r.up.set(0, 0, 1), r.lookAt(0, 1, 0), a.up.set(0, 0, -1), a.lookAt(0, -1, 0), o.up.set(0, -1, 0), o.lookAt(0, 0, 1), l.up.set(0, -1, 0), l.lookAt(0, 0, -1);
    else
      throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " + t);
    for (const c of e)
      this.add(c), c.updateMatrixWorld();
  }
  update(t, e) {
    this.parent === null && this.updateMatrixWorld();
    const { renderTarget: n, activeMipmapLevel: s } = this;
    this.coordinateSystem !== t.coordinateSystem && (this.coordinateSystem = t.coordinateSystem, this.updateCoordinateSystem());
    const [r, a, o, l, c, h] = this.children, u = t.getRenderTarget(), d = t.getActiveCubeFace(), p = t.getActiveMipmapLevel(), g = t.xr.enabled;
    t.xr.enabled = !1;
    const _ = n.texture.generateMipmaps;
    n.texture.generateMipmaps = !1, t.setRenderTarget(n, 0, s), t.render(e, r), t.setRenderTarget(n, 1, s), t.render(e, a), t.setRenderTarget(n, 2, s), t.render(e, o), t.setRenderTarget(n, 3, s), t.render(e, l), t.setRenderTarget(n, 4, s), t.render(e, c), n.texture.generateMipmaps = _, t.setRenderTarget(n, 5, s), t.render(e, h), t.setRenderTarget(u, d, p), t.xr.enabled = g, n.texture.needsPMREMUpdate = !0;
  }
}
class uh extends Oe {
  constructor(t, e, n, s, r, a, o, l, c, h) {
    t = t !== void 0 ? t : [], e = e !== void 0 ? e : Gi, super(t, e, n, s, r, a, o, l, c, h), this.isCubeTexture = !0, this.flipY = !1;
  }
  get images() {
    return this.image;
  }
  set images(t) {
    this.image = t;
  }
}
class Yd extends ai {
  constructor(t = 1, e = {}) {
    super(t, t, e), this.isWebGLCubeRenderTarget = !0;
    const n = { width: t, height: t, depth: 1 }, s = [n, n, n, n, n, n];
    this.texture = new uh(s, e.mapping, e.wrapS, e.wrapT, e.magFilter, e.minFilter, e.format, e.type, e.anisotropy, e.colorSpace), this.texture.isRenderTargetTexture = !0, this.texture.generateMipmaps = e.generateMipmaps !== void 0 ? e.generateMipmaps : !1, this.texture.minFilter = e.minFilter !== void 0 ? e.minFilter : sn;
  }
  fromEquirectangularTexture(t, e) {
    this.texture.type = e.type, this.texture.colorSpace = e.colorSpace, this.texture.generateMipmaps = e.generateMipmaps, this.texture.minFilter = e.minFilter, this.texture.magFilter = e.magFilter;
    const n = {
      uniforms: {
        tEquirect: { value: null }
      },
      vertexShader: (
        /* glsl */
        `

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`
      ),
      fragmentShader: (
        /* glsl */
        `

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`
      )
    }, s = new ie(5, 5, 5), r = new kn({
      name: "CubemapFromEquirect",
      uniforms: Yi(n.uniforms),
      vertexShader: n.vertexShader,
      fragmentShader: n.fragmentShader,
      side: Ne,
      blending: Un
    });
    r.uniforms.tEquirect.value = e;
    const a = new Mt(s, r), o = e.minFilter;
    return e.minFilter === ei && (e.minFilter = sn), new Xd(1, 10, this).update(t, a), e.minFilter = o, a.geometry.dispose(), a.material.dispose(), this;
  }
  clear(t, e, n, s) {
    const r = t.getRenderTarget();
    for (let a = 0; a < 6; a++)
      t.setRenderTarget(this, a), t.clear(e, n, s);
    t.setRenderTarget(r);
  }
}
const oo = /* @__PURE__ */ new L(), qd = /* @__PURE__ */ new L(), jd = /* @__PURE__ */ new Ht();
class Rn {
  constructor(t = new L(1, 0, 0), e = 0) {
    this.isPlane = !0, this.normal = t, this.constant = e;
  }
  set(t, e) {
    return this.normal.copy(t), this.constant = e, this;
  }
  setComponents(t, e, n, s) {
    return this.normal.set(t, e, n), this.constant = s, this;
  }
  setFromNormalAndCoplanarPoint(t, e) {
    return this.normal.copy(t), this.constant = -e.dot(this.normal), this;
  }
  setFromCoplanarPoints(t, e, n) {
    const s = oo.subVectors(n, e).cross(qd.subVectors(t, e)).normalize();
    return this.setFromNormalAndCoplanarPoint(s, t), this;
  }
  copy(t) {
    return this.normal.copy(t.normal), this.constant = t.constant, this;
  }
  normalize() {
    const t = 1 / this.normal.length();
    return this.normal.multiplyScalar(t), this.constant *= t, this;
  }
  negate() {
    return this.constant *= -1, this.normal.negate(), this;
  }
  distanceToPoint(t) {
    return this.normal.dot(t) + this.constant;
  }
  distanceToSphere(t) {
    return this.distanceToPoint(t.center) - t.radius;
  }
  projectPoint(t, e) {
    return e.copy(t).addScaledVector(this.normal, -this.distanceToPoint(t));
  }
  intersectLine(t, e) {
    const n = t.delta(oo), s = this.normal.dot(n);
    if (s === 0)
      return this.distanceToPoint(t.start) === 0 ? e.copy(t.start) : null;
    const r = -(t.start.dot(this.normal) + this.constant) / s;
    return r < 0 || r > 1 ? null : e.copy(t.start).addScaledVector(n, r);
  }
  intersectsLine(t) {
    const e = this.distanceToPoint(t.start), n = this.distanceToPoint(t.end);
    return e < 0 && n > 0 || n < 0 && e > 0;
  }
  intersectsBox(t) {
    return t.intersectsPlane(this);
  }
  intersectsSphere(t) {
    return t.intersectsPlane(this);
  }
  coplanarPoint(t) {
    return t.copy(this.normal).multiplyScalar(-this.constant);
  }
  applyMatrix4(t, e) {
    const n = e || jd.getNormalMatrix(t), s = this.coplanarPoint(oo).applyMatrix4(t), r = this.normal.applyMatrix3(n).normalize();
    return this.constant = -s.dot(r), this;
  }
  translate(t) {
    return this.constant -= t.dot(this.normal), this;
  }
  equals(t) {
    return t.normal.equals(this.normal) && t.constant === this.constant;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const Xn = /* @__PURE__ */ new Rr(), Qs = /* @__PURE__ */ new L();
class Na {
  constructor(t = new Rn(), e = new Rn(), n = new Rn(), s = new Rn(), r = new Rn(), a = new Rn()) {
    this.planes = [t, e, n, s, r, a];
  }
  set(t, e, n, s, r, a) {
    const o = this.planes;
    return o[0].copy(t), o[1].copy(e), o[2].copy(n), o[3].copy(s), o[4].copy(r), o[5].copy(a), this;
  }
  copy(t) {
    const e = this.planes;
    for (let n = 0; n < 6; n++)
      e[n].copy(t.planes[n]);
    return this;
  }
  setFromProjectionMatrix(t, e = _n) {
    const n = this.planes, s = t.elements, r = s[0], a = s[1], o = s[2], l = s[3], c = s[4], h = s[5], u = s[6], d = s[7], p = s[8], g = s[9], _ = s[10], f = s[11], m = s[12], b = s[13], x = s[14], v = s[15];
    if (n[0].setComponents(l - r, d - c, f - p, v - m).normalize(), n[1].setComponents(l + r, d + c, f + p, v + m).normalize(), n[2].setComponents(l + a, d + h, f + g, v + b).normalize(), n[3].setComponents(l - a, d - h, f - g, v - b).normalize(), n[4].setComponents(l - o, d - u, f - _, v - x).normalize(), e === _n)
      n[5].setComponents(l + o, d + u, f + _, v + x).normalize();
    else if (e === Mr)
      n[5].setComponents(o, u, _, x).normalize();
    else
      throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + e);
    return this;
  }
  intersectsObject(t) {
    if (t.boundingSphere !== void 0)
      t.boundingSphere === null && t.computeBoundingSphere(), Xn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);
    else {
      const e = t.geometry;
      e.boundingSphere === null && e.computeBoundingSphere(), Xn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld);
    }
    return this.intersectsSphere(Xn);
  }
  intersectsSprite(t) {
    return Xn.center.set(0, 0, 0), Xn.radius = 0.7071067811865476, Xn.applyMatrix4(t.matrixWorld), this.intersectsSphere(Xn);
  }
  intersectsSphere(t) {
    const e = this.planes, n = t.center, s = -t.radius;
    for (let r = 0; r < 6; r++)
      if (e[r].distanceToPoint(n) < s)
        return !1;
    return !0;
  }
  intersectsBox(t) {
    const e = this.planes;
    for (let n = 0; n < 6; n++) {
      const s = e[n];
      if (Qs.x = s.normal.x > 0 ? t.max.x : t.min.x, Qs.y = s.normal.y > 0 ? t.max.y : t.min.y, Qs.z = s.normal.z > 0 ? t.max.z : t.min.z, s.distanceToPoint(Qs) < 0)
        return !1;
    }
    return !0;
  }
  containsPoint(t) {
    const e = this.planes;
    for (let n = 0; n < 6; n++)
      if (e[n].distanceToPoint(t) < 0)
        return !1;
    return !0;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
function dh() {
  let i = null, t = !1, e = null, n = null;
  function s(r, a) {
    e(r, a), n = i.requestAnimationFrame(s);
  }
  return {
    start: function() {
      t !== !0 && e !== null && (n = i.requestAnimationFrame(s), t = !0);
    },
    stop: function() {
      i.cancelAnimationFrame(n), t = !1;
    },
    setAnimationLoop: function(r) {
      e = r;
    },
    setContext: function(r) {
      i = r;
    }
  };
}
function Zd(i) {
  const t = /* @__PURE__ */ new WeakMap();
  function e(o, l) {
    const c = o.array, h = o.usage, u = c.byteLength, d = i.createBuffer();
    i.bindBuffer(l, d), i.bufferData(l, c, h), o.onUploadCallback();
    let p;
    if (c instanceof Float32Array)
      p = i.FLOAT;
    else if (c instanceof Uint16Array)
      o.isFloat16BufferAttribute ? p = i.HALF_FLOAT : p = i.UNSIGNED_SHORT;
    else if (c instanceof Int16Array)
      p = i.SHORT;
    else if (c instanceof Uint32Array)
      p = i.UNSIGNED_INT;
    else if (c instanceof Int32Array)
      p = i.INT;
    else if (c instanceof Int8Array)
      p = i.BYTE;
    else if (c instanceof Uint8Array)
      p = i.UNSIGNED_BYTE;
    else if (c instanceof Uint8ClampedArray)
      p = i.UNSIGNED_BYTE;
    else
      throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: " + c);
    return {
      buffer: d,
      type: p,
      bytesPerElement: c.BYTES_PER_ELEMENT,
      version: o.version,
      size: u
    };
  }
  function n(o, l, c) {
    const h = l.array, u = l.updateRanges;
    if (i.bindBuffer(c, o), u.length === 0)
      i.bufferSubData(c, 0, h);
    else {
      u.sort((p, g) => p.start - g.start);
      let d = 0;
      for (let p = 1; p < u.length; p++) {
        const g = u[d], _ = u[p];
        _.start <= g.start + g.count + 1 ? g.count = Math.max(
          g.count,
          _.start + _.count - g.start
        ) : (++d, u[d] = _);
      }
      u.length = d + 1;
      for (let p = 0, g = u.length; p < g; p++) {
        const _ = u[p];
        i.bufferSubData(
          c,
          _.start * h.BYTES_PER_ELEMENT,
          h,
          _.start,
          _.count
        );
      }
      l.clearUpdateRanges();
    }
    l.onUploadCallback();
  }
  function s(o) {
    return o.isInterleavedBufferAttribute && (o = o.data), t.get(o);
  }
  function r(o) {
    o.isInterleavedBufferAttribute && (o = o.data);
    const l = t.get(o);
    l && (i.deleteBuffer(l.buffer), t.delete(o));
  }
  function a(o, l) {
    if (o.isInterleavedBufferAttribute && (o = o.data), o.isGLBufferAttribute) {
      const h = t.get(o);
      (!h || h.version < o.version) && t.set(o, {
        buffer: o.buffer,
        type: o.type,
        bytesPerElement: o.elementSize,
        version: o.version
      });
      return;
    }
    const c = t.get(o);
    if (c === void 0)
      t.set(o, e(o, l));
    else if (c.version < o.version) {
      if (c.size !== o.array.byteLength)
        throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");
      n(c.buffer, o, l), c.version = o.version;
    }
  }
  return {
    get: s,
    remove: r,
    update: a
  };
}
class Ds extends Ee {
  constructor(t = 1, e = 1, n = 1, s = 1) {
    super(), this.type = "PlaneGeometry", this.parameters = {
      width: t,
      height: e,
      widthSegments: n,
      heightSegments: s
    };
    const r = t / 2, a = e / 2, o = Math.floor(n), l = Math.floor(s), c = o + 1, h = l + 1, u = t / o, d = e / l, p = [], g = [], _ = [], f = [];
    for (let m = 0; m < h; m++) {
      const b = m * d - a;
      for (let x = 0; x < c; x++) {
        const v = x * u - r;
        g.push(v, -b, 0), _.push(0, 0, 1), f.push(x / o), f.push(1 - m / l);
      }
    }
    for (let m = 0; m < l; m++)
      for (let b = 0; b < o; b++) {
        const x = b + c * m, v = b + c * (m + 1), w = b + 1 + c * (m + 1), A = b + 1 + c * m;
        p.push(x, v, A), p.push(v, w, A);
      }
    this.setIndex(p), this.setAttribute("position", new Qt(g, 3)), this.setAttribute("normal", new Qt(_, 3)), this.setAttribute("uv", new Qt(f, 2));
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new Ds(t.width, t.height, t.widthSegments, t.heightSegments);
  }
}
var Kd = `#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`, Jd = `#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`, Qd = `#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`, tf = `#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`, ef = `#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`, nf = `#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`, sf = `#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`, rf = `#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`, of = `#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`, af = `#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`, lf = `vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`, cf = `vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`, hf = `float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`, uf = `#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`, df = `#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`, ff = `#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`, pf = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`, mf = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`, gf = `#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`, _f = `#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`, vf = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`, xf = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`, yf = `#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`, Mf = `#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`, bf = `#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`, Sf = `vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`, Ef = `#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`, wf = `#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`, Tf = `#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`, Af = `#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`, Cf = "gl_FragColor = linearToOutputTexel( gl_FragColor );", Rf = `vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`, Pf = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`, Lf = `#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`, Df = `#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`, If = `#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`, Uf = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`, Nf = `#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`, Of = `#ifdef USE_FOG
	varying float vFogDepth;
#endif`, Ff = `#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`, kf = `#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`, Bf = `#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`, zf = `#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`, Hf = `LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`, Vf = `varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`, Gf = `uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`, $f = `#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`, Wf = `ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`, Xf = `varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`, Yf = `BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`, qf = `varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`, jf = `PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`, Zf = `struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`, Kf = `
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`, Jf = `#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`, Qf = `#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`, tp = `#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`, ep = `#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`, np = `#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`, ip = `#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`, sp = `#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`, rp = `#ifdef USE_MAP
	uniform sampler2D map;
#endif`, op = `#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`, ap = `#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`, lp = `float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`, cp = `#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`, hp = `#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`, up = `#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`, dp = `#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`, fp = `#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`, pp = `#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`, mp = `float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`, gp = `#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`, _p = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, vp = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, xp = `#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`, yp = `#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`, Mp = `#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`, bp = `#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`, Sp = `#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`, Ep = `#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`, wp = `#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`, Tp = `vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`, Ap = `#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`, Cp = `vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`, Rp = `#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`, Pp = `#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`, Lp = `float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`, Dp = `#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`, Ip = `#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`, Up = `#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`, Np = `#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`, Op = `float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`, Fp = `#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`, kp = `#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`, Bp = `#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`, zp = `#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`, Hp = `float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`, Vp = `#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`, Gp = `#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`, $p = `#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`, Wp = `#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`, Xp = `#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`, Yp = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`, qp = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`, jp = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`, Zp = `#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;
const Kp = `varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`, Jp = `uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, Qp = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, tm = `#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, em = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, nm = `uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, im = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`, sm = `#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`, rm = `#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`, om = `#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`, am = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`, lm = `uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, cm = `uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`, hm = `uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`, um = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`, dm = `uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, fm = `#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, pm = `#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, mm = `#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`, gm = `#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, _m = `#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`, vm = `#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`, xm = `#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, ym = `#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Mm = `#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`, bm = `#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Sm = `#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, Em = `#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, wm = `uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`, Tm = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`, Am = `#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, Cm = `uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`, Rm = `uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`, Pm = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`, Gt = {
  alphahash_fragment: Kd,
  alphahash_pars_fragment: Jd,
  alphamap_fragment: Qd,
  alphamap_pars_fragment: tf,
  alphatest_fragment: ef,
  alphatest_pars_fragment: nf,
  aomap_fragment: sf,
  aomap_pars_fragment: rf,
  batching_pars_vertex: of,
  batching_vertex: af,
  begin_vertex: lf,
  beginnormal_vertex: cf,
  bsdfs: hf,
  iridescence_fragment: uf,
  bumpmap_pars_fragment: df,
  clipping_planes_fragment: ff,
  clipping_planes_pars_fragment: pf,
  clipping_planes_pars_vertex: mf,
  clipping_planes_vertex: gf,
  color_fragment: _f,
  color_pars_fragment: vf,
  color_pars_vertex: xf,
  color_vertex: yf,
  common: Mf,
  cube_uv_reflection_fragment: bf,
  defaultnormal_vertex: Sf,
  displacementmap_pars_vertex: Ef,
  displacementmap_vertex: wf,
  emissivemap_fragment: Tf,
  emissivemap_pars_fragment: Af,
  colorspace_fragment: Cf,
  colorspace_pars_fragment: Rf,
  envmap_fragment: Pf,
  envmap_common_pars_fragment: Lf,
  envmap_pars_fragment: Df,
  envmap_pars_vertex: If,
  envmap_physical_pars_fragment: $f,
  envmap_vertex: Uf,
  fog_vertex: Nf,
  fog_pars_vertex: Of,
  fog_fragment: Ff,
  fog_pars_fragment: kf,
  gradientmap_pars_fragment: Bf,
  lightmap_pars_fragment: zf,
  lights_lambert_fragment: Hf,
  lights_lambert_pars_fragment: Vf,
  lights_pars_begin: Gf,
  lights_toon_fragment: Wf,
  lights_toon_pars_fragment: Xf,
  lights_phong_fragment: Yf,
  lights_phong_pars_fragment: qf,
  lights_physical_fragment: jf,
  lights_physical_pars_fragment: Zf,
  lights_fragment_begin: Kf,
  lights_fragment_maps: Jf,
  lights_fragment_end: Qf,
  logdepthbuf_fragment: tp,
  logdepthbuf_pars_fragment: ep,
  logdepthbuf_pars_vertex: np,
  logdepthbuf_vertex: ip,
  map_fragment: sp,
  map_pars_fragment: rp,
  map_particle_fragment: op,
  map_particle_pars_fragment: ap,
  metalnessmap_fragment: lp,
  metalnessmap_pars_fragment: cp,
  morphinstance_vertex: hp,
  morphcolor_vertex: up,
  morphnormal_vertex: dp,
  morphtarget_pars_vertex: fp,
  morphtarget_vertex: pp,
  normal_fragment_begin: mp,
  normal_fragment_maps: gp,
  normal_pars_fragment: _p,
  normal_pars_vertex: vp,
  normal_vertex: xp,
  normalmap_pars_fragment: yp,
  clearcoat_normal_fragment_begin: Mp,
  clearcoat_normal_fragment_maps: bp,
  clearcoat_pars_fragment: Sp,
  iridescence_pars_fragment: Ep,
  opaque_fragment: wp,
  packing: Tp,
  premultiplied_alpha_fragment: Ap,
  project_vertex: Cp,
  dithering_fragment: Rp,
  dithering_pars_fragment: Pp,
  roughnessmap_fragment: Lp,
  roughnessmap_pars_fragment: Dp,
  shadowmap_pars_fragment: Ip,
  shadowmap_pars_vertex: Up,
  shadowmap_vertex: Np,
  shadowmask_pars_fragment: Op,
  skinbase_vertex: Fp,
  skinning_pars_vertex: kp,
  skinning_vertex: Bp,
  skinnormal_vertex: zp,
  specularmap_fragment: Hp,
  specularmap_pars_fragment: Vp,
  tonemapping_fragment: Gp,
  tonemapping_pars_fragment: $p,
  transmission_fragment: Wp,
  transmission_pars_fragment: Xp,
  uv_pars_fragment: Yp,
  uv_pars_vertex: qp,
  uv_vertex: jp,
  worldpos_vertex: Zp,
  background_vert: Kp,
  background_frag: Jp,
  backgroundCube_vert: Qp,
  backgroundCube_frag: tm,
  cube_vert: em,
  cube_frag: nm,
  depth_vert: im,
  depth_frag: sm,
  distanceRGBA_vert: rm,
  distanceRGBA_frag: om,
  equirect_vert: am,
  equirect_frag: lm,
  linedashed_vert: cm,
  linedashed_frag: hm,
  meshbasic_vert: um,
  meshbasic_frag: dm,
  meshlambert_vert: fm,
  meshlambert_frag: pm,
  meshmatcap_vert: mm,
  meshmatcap_frag: gm,
  meshnormal_vert: _m,
  meshnormal_frag: vm,
  meshphong_vert: xm,
  meshphong_frag: ym,
  meshphysical_vert: Mm,
  meshphysical_frag: bm,
  meshtoon_vert: Sm,
  meshtoon_frag: Em,
  points_vert: wm,
  points_frag: Tm,
  shadow_vert: Am,
  shadow_frag: Cm,
  sprite_vert: Rm,
  sprite_frag: Pm
}, ct = {
  common: {
    diffuse: { value: /* @__PURE__ */ new Wt(16777215) },
    opacity: { value: 1 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new Ht() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Ht() },
    alphaTest: { value: 0 }
  },
  specularmap: {
    specularMap: { value: null },
    specularMapTransform: { value: /* @__PURE__ */ new Ht() }
  },
  envmap: {
    envMap: { value: null },
    envMapRotation: { value: /* @__PURE__ */ new Ht() },
    flipEnvMap: { value: -1 },
    reflectivity: { value: 1 },
    // basic, lambert, phong
    ior: { value: 1.5 },
    // physical
    refractionRatio: { value: 0.98 }
    // basic, lambert, phong
  },
  aomap: {
    aoMap: { value: null },
    aoMapIntensity: { value: 1 },
    aoMapTransform: { value: /* @__PURE__ */ new Ht() }
  },
  lightmap: {
    lightMap: { value: null },
    lightMapIntensity: { value: 1 },
    lightMapTransform: { value: /* @__PURE__ */ new Ht() }
  },
  bumpmap: {
    bumpMap: { value: null },
    bumpMapTransform: { value: /* @__PURE__ */ new Ht() },
    bumpScale: { value: 1 }
  },
  normalmap: {
    normalMap: { value: null },
    normalMapTransform: { value: /* @__PURE__ */ new Ht() },
    normalScale: { value: /* @__PURE__ */ new et(1, 1) }
  },
  displacementmap: {
    displacementMap: { value: null },
    displacementMapTransform: { value: /* @__PURE__ */ new Ht() },
    displacementScale: { value: 1 },
    displacementBias: { value: 0 }
  },
  emissivemap: {
    emissiveMap: { value: null },
    emissiveMapTransform: { value: /* @__PURE__ */ new Ht() }
  },
  metalnessmap: {
    metalnessMap: { value: null },
    metalnessMapTransform: { value: /* @__PURE__ */ new Ht() }
  },
  roughnessmap: {
    roughnessMap: { value: null },
    roughnessMapTransform: { value: /* @__PURE__ */ new Ht() }
  },
  gradientmap: {
    gradientMap: { value: null }
  },
  fog: {
    fogDensity: { value: 25e-5 },
    fogNear: { value: 1 },
    fogFar: { value: 2e3 },
    fogColor: { value: /* @__PURE__ */ new Wt(16777215) }
  },
  lights: {
    ambientLightColor: { value: [] },
    lightProbe: { value: [] },
    directionalLights: { value: [], properties: {
      direction: {},
      color: {}
    } },
    directionalLightShadows: { value: [], properties: {
      shadowIntensity: 1,
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {}
    } },
    directionalShadowMap: { value: [] },
    directionalShadowMatrix: { value: [] },
    spotLights: { value: [], properties: {
      color: {},
      position: {},
      direction: {},
      distance: {},
      coneCos: {},
      penumbraCos: {},
      decay: {}
    } },
    spotLightShadows: { value: [], properties: {
      shadowIntensity: 1,
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {}
    } },
    spotLightMap: { value: [] },
    spotShadowMap: { value: [] },
    spotLightMatrix: { value: [] },
    pointLights: { value: [], properties: {
      color: {},
      position: {},
      decay: {},
      distance: {}
    } },
    pointLightShadows: { value: [], properties: {
      shadowIntensity: 1,
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {},
      shadowCameraNear: {},
      shadowCameraFar: {}
    } },
    pointShadowMap: { value: [] },
    pointShadowMatrix: { value: [] },
    hemisphereLights: { value: [], properties: {
      direction: {},
      skyColor: {},
      groundColor: {}
    } },
    // TODO (abelnation): RectAreaLight BRDF data needs to be moved from example to main src
    rectAreaLights: { value: [], properties: {
      color: {},
      position: {},
      width: {},
      height: {}
    } },
    ltc_1: { value: null },
    ltc_2: { value: null }
  },
  points: {
    diffuse: { value: /* @__PURE__ */ new Wt(16777215) },
    opacity: { value: 1 },
    size: { value: 1 },
    scale: { value: 1 },
    map: { value: null },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Ht() },
    alphaTest: { value: 0 },
    uvTransform: { value: /* @__PURE__ */ new Ht() }
  },
  sprite: {
    diffuse: { value: /* @__PURE__ */ new Wt(16777215) },
    opacity: { value: 1 },
    center: { value: /* @__PURE__ */ new et(0.5, 0.5) },
    rotation: { value: 0 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new Ht() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Ht() },
    alphaTest: { value: 0 }
  }
}, en = {
  basic: {
    uniforms: /* @__PURE__ */ Pe([
      ct.common,
      ct.specularmap,
      ct.envmap,
      ct.aomap,
      ct.lightmap,
      ct.fog
    ]),
    vertexShader: Gt.meshbasic_vert,
    fragmentShader: Gt.meshbasic_frag
  },
  lambert: {
    uniforms: /* @__PURE__ */ Pe([
      ct.common,
      ct.specularmap,
      ct.envmap,
      ct.aomap,
      ct.lightmap,
      ct.emissivemap,
      ct.bumpmap,
      ct.normalmap,
      ct.displacementmap,
      ct.fog,
      ct.lights,
      {
        emissive: { value: /* @__PURE__ */ new Wt(0) }
      }
    ]),
    vertexShader: Gt.meshlambert_vert,
    fragmentShader: Gt.meshlambert_frag
  },
  phong: {
    uniforms: /* @__PURE__ */ Pe([
      ct.common,
      ct.specularmap,
      ct.envmap,
      ct.aomap,
      ct.lightmap,
      ct.emissivemap,
      ct.bumpmap,
      ct.normalmap,
      ct.displacementmap,
      ct.fog,
      ct.lights,
      {
        emissive: { value: /* @__PURE__ */ new Wt(0) },
        specular: { value: /* @__PURE__ */ new Wt(1118481) },
        shininess: { value: 30 }
      }
    ]),
    vertexShader: Gt.meshphong_vert,
    fragmentShader: Gt.meshphong_frag
  },
  standard: {
    uniforms: /* @__PURE__ */ Pe([
      ct.common,
      ct.envmap,
      ct.aomap,
      ct.lightmap,
      ct.emissivemap,
      ct.bumpmap,
      ct.normalmap,
      ct.displacementmap,
      ct.roughnessmap,
      ct.metalnessmap,
      ct.fog,
      ct.lights,
      {
        emissive: { value: /* @__PURE__ */ new Wt(0) },
        roughness: { value: 1 },
        metalness: { value: 0 },
        envMapIntensity: { value: 1 }
      }
    ]),
    vertexShader: Gt.meshphysical_vert,
    fragmentShader: Gt.meshphysical_frag
  },
  toon: {
    uniforms: /* @__PURE__ */ Pe([
      ct.common,
      ct.aomap,
      ct.lightmap,
      ct.emissivemap,
      ct.bumpmap,
      ct.normalmap,
      ct.displacementmap,
      ct.gradientmap,
      ct.fog,
      ct.lights,
      {
        emissive: { value: /* @__PURE__ */ new Wt(0) }
      }
    ]),
    vertexShader: Gt.meshtoon_vert,
    fragmentShader: Gt.meshtoon_frag
  },
  matcap: {
    uniforms: /* @__PURE__ */ Pe([
      ct.common,
      ct.bumpmap,
      ct.normalmap,
      ct.displacementmap,
      ct.fog,
      {
        matcap: { value: null }
      }
    ]),
    vertexShader: Gt.meshmatcap_vert,
    fragmentShader: Gt.meshmatcap_frag
  },
  points: {
    uniforms: /* @__PURE__ */ Pe([
      ct.points,
      ct.fog
    ]),
    vertexShader: Gt.points_vert,
    fragmentShader: Gt.points_frag
  },
  dashed: {
    uniforms: /* @__PURE__ */ Pe([
      ct.common,
      ct.fog,
      {
        scale: { value: 1 },
        dashSize: { value: 1 },
        totalSize: { value: 2 }
      }
    ]),
    vertexShader: Gt.linedashed_vert,
    fragmentShader: Gt.linedashed_frag
  },
  depth: {
    uniforms: /* @__PURE__ */ Pe([
      ct.common,
      ct.displacementmap
    ]),
    vertexShader: Gt.depth_vert,
    fragmentShader: Gt.depth_frag
  },
  normal: {
    uniforms: /* @__PURE__ */ Pe([
      ct.common,
      ct.bumpmap,
      ct.normalmap,
      ct.displacementmap,
      {
        opacity: { value: 1 }
      }
    ]),
    vertexShader: Gt.meshnormal_vert,
    fragmentShader: Gt.meshnormal_frag
  },
  sprite: {
    uniforms: /* @__PURE__ */ Pe([
      ct.sprite,
      ct.fog
    ]),
    vertexShader: Gt.sprite_vert,
    fragmentShader: Gt.sprite_frag
  },
  background: {
    uniforms: {
      uvTransform: { value: /* @__PURE__ */ new Ht() },
      t2D: { value: null },
      backgroundIntensity: { value: 1 }
    },
    vertexShader: Gt.background_vert,
    fragmentShader: Gt.background_frag
  },
  backgroundCube: {
    uniforms: {
      envMap: { value: null },
      flipEnvMap: { value: -1 },
      backgroundBlurriness: { value: 0 },
      backgroundIntensity: { value: 1 },
      backgroundRotation: { value: /* @__PURE__ */ new Ht() }
    },
    vertexShader: Gt.backgroundCube_vert,
    fragmentShader: Gt.backgroundCube_frag
  },
  cube: {
    uniforms: {
      tCube: { value: null },
      tFlip: { value: -1 },
      opacity: { value: 1 }
    },
    vertexShader: Gt.cube_vert,
    fragmentShader: Gt.cube_frag
  },
  equirect: {
    uniforms: {
      tEquirect: { value: null }
    },
    vertexShader: Gt.equirect_vert,
    fragmentShader: Gt.equirect_frag
  },
  distanceRGBA: {
    uniforms: /* @__PURE__ */ Pe([
      ct.common,
      ct.displacementmap,
      {
        referencePosition: { value: /* @__PURE__ */ new L() },
        nearDistance: { value: 1 },
        farDistance: { value: 1e3 }
      }
    ]),
    vertexShader: Gt.distanceRGBA_vert,
    fragmentShader: Gt.distanceRGBA_frag
  },
  shadow: {
    uniforms: /* @__PURE__ */ Pe([
      ct.lights,
      ct.fog,
      {
        color: { value: /* @__PURE__ */ new Wt(0) },
        opacity: { value: 1 }
      }
    ]),
    vertexShader: Gt.shadow_vert,
    fragmentShader: Gt.shadow_frag
  }
};
en.physical = {
  uniforms: /* @__PURE__ */ Pe([
    en.standard.uniforms,
    {
      clearcoat: { value: 0 },
      clearcoatMap: { value: null },
      clearcoatMapTransform: { value: /* @__PURE__ */ new Ht() },
      clearcoatNormalMap: { value: null },
      clearcoatNormalMapTransform: { value: /* @__PURE__ */ new Ht() },
      clearcoatNormalScale: { value: /* @__PURE__ */ new et(1, 1) },
      clearcoatRoughness: { value: 0 },
      clearcoatRoughnessMap: { value: null },
      clearcoatRoughnessMapTransform: { value: /* @__PURE__ */ new Ht() },
      dispersion: { value: 0 },
      iridescence: { value: 0 },
      iridescenceMap: { value: null },
      iridescenceMapTransform: { value: /* @__PURE__ */ new Ht() },
      iridescenceIOR: { value: 1.3 },
      iridescenceThicknessMinimum: { value: 100 },
      iridescenceThicknessMaximum: { value: 400 },
      iridescenceThicknessMap: { value: null },
      iridescenceThicknessMapTransform: { value: /* @__PURE__ */ new Ht() },
      sheen: { value: 0 },
      sheenColor: { value: /* @__PURE__ */ new Wt(0) },
      sheenColorMap: { value: null },
      sheenColorMapTransform: { value: /* @__PURE__ */ new Ht() },
      sheenRoughness: { value: 1 },
      sheenRoughnessMap: { value: null },
      sheenRoughnessMapTransform: { value: /* @__PURE__ */ new Ht() },
      transmission: { value: 0 },
      transmissionMap: { value: null },
      transmissionMapTransform: { value: /* @__PURE__ */ new Ht() },
      transmissionSamplerSize: { value: /* @__PURE__ */ new et() },
      transmissionSamplerMap: { value: null },
      thickness: { value: 0 },
      thicknessMap: { value: null },
      thicknessMapTransform: { value: /* @__PURE__ */ new Ht() },
      attenuationDistance: { value: 0 },
      attenuationColor: { value: /* @__PURE__ */ new Wt(0) },
      specularColor: { value: /* @__PURE__ */ new Wt(1, 1, 1) },
      specularColorMap: { value: null },
      specularColorMapTransform: { value: /* @__PURE__ */ new Ht() },
      specularIntensity: { value: 1 },
      specularIntensityMap: { value: null },
      specularIntensityMapTransform: { value: /* @__PURE__ */ new Ht() },
      anisotropyVector: { value: /* @__PURE__ */ new et() },
      anisotropyMap: { value: null },
      anisotropyMapTransform: { value: /* @__PURE__ */ new Ht() }
    }
  ]),
  vertexShader: Gt.meshphysical_vert,
  fragmentShader: Gt.meshphysical_frag
};
const tr = { r: 0, b: 0, g: 0 }, Yn = /* @__PURE__ */ new on(), Lm = /* @__PURE__ */ new ue();
function Dm(i, t, e, n, s, r, a) {
  const o = new Wt(0);
  let l = r === !0 ? 0 : 1, c, h, u = null, d = 0, p = null;
  function g(b) {
    let x = b.isScene === !0 ? b.background : null;
    return x && x.isTexture && (x = (b.backgroundBlurriness > 0 ? e : t).get(x)), x;
  }
  function _(b) {
    let x = !1;
    const v = g(b);
    v === null ? m(o, l) : v && v.isColor && (m(v, 1), x = !0);
    const w = i.xr.getEnvironmentBlendMode();
    w === "additive" ? n.buffers.color.setClear(0, 0, 0, 1, a) : w === "alpha-blend" && n.buffers.color.setClear(0, 0, 0, 0, a), (i.autoClear || x) && (n.buffers.depth.setTest(!0), n.buffers.depth.setMask(!0), n.buffers.color.setMask(!0), i.clear(i.autoClearColor, i.autoClearDepth, i.autoClearStencil));
  }
  function f(b, x) {
    const v = g(x);
    v && (v.isCubeTexture || v.mapping === Ar) ? (h === void 0 && (h = new Mt(
      new ie(1, 1, 1),
      new kn({
        name: "BackgroundCubeMaterial",
        uniforms: Yi(en.backgroundCube.uniforms),
        vertexShader: en.backgroundCube.vertexShader,
        fragmentShader: en.backgroundCube.fragmentShader,
        side: Ne,
        depthTest: !1,
        depthWrite: !1,
        fog: !1
      })
    ), h.geometry.deleteAttribute("normal"), h.geometry.deleteAttribute("uv"), h.onBeforeRender = function(w, A, C) {
      this.matrixWorld.copyPosition(C.matrixWorld);
    }, Object.defineProperty(h.material, "envMap", {
      get: function() {
        return this.uniforms.envMap.value;
      }
    }), s.update(h)), Yn.copy(x.backgroundRotation), Yn.x *= -1, Yn.y *= -1, Yn.z *= -1, v.isCubeTexture && v.isRenderTargetTexture === !1 && (Yn.y *= -1, Yn.z *= -1), h.material.uniforms.envMap.value = v, h.material.uniforms.flipEnvMap.value = v.isCubeTexture && v.isRenderTargetTexture === !1 ? -1 : 1, h.material.uniforms.backgroundBlurriness.value = x.backgroundBlurriness, h.material.uniforms.backgroundIntensity.value = x.backgroundIntensity, h.material.uniforms.backgroundRotation.value.setFromMatrix4(Lm.makeRotationFromEuler(Yn)), h.material.toneMapped = Kt.getTransfer(v.colorSpace) !== se, (u !== v || d !== v.version || p !== i.toneMapping) && (h.material.needsUpdate = !0, u = v, d = v.version, p = i.toneMapping), h.layers.enableAll(), b.unshift(h, h.geometry, h.material, 0, 0, null)) : v && v.isTexture && (c === void 0 && (c = new Mt(
      new Ds(2, 2),
      new kn({
        name: "BackgroundMaterial",
        uniforms: Yi(en.background.uniforms),
        vertexShader: en.background.vertexShader,
        fragmentShader: en.background.fragmentShader,
        side: Fn,
        depthTest: !1,
        depthWrite: !1,
        fog: !1
      })
    ), c.geometry.deleteAttribute("normal"), Object.defineProperty(c.material, "map", {
      get: function() {
        return this.uniforms.t2D.value;
      }
    }), s.update(c)), c.material.uniforms.t2D.value = v, c.material.uniforms.backgroundIntensity.value = x.backgroundIntensity, c.material.toneMapped = Kt.getTransfer(v.colorSpace) !== se, v.matrixAutoUpdate === !0 && v.updateMatrix(), c.material.uniforms.uvTransform.value.copy(v.matrix), (u !== v || d !== v.version || p !== i.toneMapping) && (c.material.needsUpdate = !0, u = v, d = v.version, p = i.toneMapping), c.layers.enableAll(), b.unshift(c, c.geometry, c.material, 0, 0, null));
  }
  function m(b, x) {
    b.getRGB(tr, ch(i)), n.buffers.color.setClear(tr.r, tr.g, tr.b, x, a);
  }
  return {
    getClearColor: function() {
      return o;
    },
    setClearColor: function(b, x = 1) {
      o.set(b), l = x, m(o, l);
    },
    getClearAlpha: function() {
      return l;
    },
    setClearAlpha: function(b) {
      l = b, m(o, l);
    },
    render: _,
    addToRenderList: f
  };
}
function Im(i, t) {
  const e = i.getParameter(i.MAX_VERTEX_ATTRIBS), n = {}, s = d(null);
  let r = s, a = !1;
  function o(M, P, z, O, F) {
    let W = !1;
    const H = u(O, z, P);
    r !== H && (r = H, c(r.object)), W = p(M, O, z, F), W && g(M, O, z, F), F !== null && t.update(F, i.ELEMENT_ARRAY_BUFFER), (W || a) && (a = !1, v(M, P, z, O), F !== null && i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, t.get(F).buffer));
  }
  function l() {
    return i.createVertexArray();
  }
  function c(M) {
    return i.bindVertexArray(M);
  }
  function h(M) {
    return i.deleteVertexArray(M);
  }
  function u(M, P, z) {
    const O = z.wireframe === !0;
    let F = n[M.id];
    F === void 0 && (F = {}, n[M.id] = F);
    let W = F[P.id];
    W === void 0 && (W = {}, F[P.id] = W);
    let H = W[O];
    return H === void 0 && (H = d(l()), W[O] = H), H;
  }
  function d(M) {
    const P = [], z = [], O = [];
    for (let F = 0; F < e; F++)
      P[F] = 0, z[F] = 0, O[F] = 0;
    return {
      // for backward compatibility on non-VAO support browser
      geometry: null,
      program: null,
      wireframe: !1,
      newAttributes: P,
      enabledAttributes: z,
      attributeDivisors: O,
      object: M,
      attributes: {},
      index: null
    };
  }
  function p(M, P, z, O) {
    const F = r.attributes, W = P.attributes;
    let H = 0;
    const J = z.getAttributes();
    for (const k in J)
      if (J[k].location >= 0) {
        const nt = F[k];
        let ht = W[k];
        if (ht === void 0 && (k === "instanceMatrix" && M.instanceMatrix && (ht = M.instanceMatrix), k === "instanceColor" && M.instanceColor && (ht = M.instanceColor)), nt === void 0 || nt.attribute !== ht || ht && nt.data !== ht.data) return !0;
        H++;
      }
    return r.attributesNum !== H || r.index !== O;
  }
  function g(M, P, z, O) {
    const F = {}, W = P.attributes;
    let H = 0;
    const J = z.getAttributes();
    for (const k in J)
      if (J[k].location >= 0) {
        let nt = W[k];
        nt === void 0 && (k === "instanceMatrix" && M.instanceMatrix && (nt = M.instanceMatrix), k === "instanceColor" && M.instanceColor && (nt = M.instanceColor));
        const ht = {};
        ht.attribute = nt, nt && nt.data && (ht.data = nt.data), F[k] = ht, H++;
      }
    r.attributes = F, r.attributesNum = H, r.index = O;
  }
  function _() {
    const M = r.newAttributes;
    for (let P = 0, z = M.length; P < z; P++)
      M[P] = 0;
  }
  function f(M) {
    m(M, 0);
  }
  function m(M, P) {
    const z = r.newAttributes, O = r.enabledAttributes, F = r.attributeDivisors;
    z[M] = 1, O[M] === 0 && (i.enableVertexAttribArray(M), O[M] = 1), F[M] !== P && (i.vertexAttribDivisor(M, P), F[M] = P);
  }
  function b() {
    const M = r.newAttributes, P = r.enabledAttributes;
    for (let z = 0, O = P.length; z < O; z++)
      P[z] !== M[z] && (i.disableVertexAttribArray(z), P[z] = 0);
  }
  function x(M, P, z, O, F, W, H) {
    H === !0 ? i.vertexAttribIPointer(M, P, z, F, W) : i.vertexAttribPointer(M, P, z, O, F, W);
  }
  function v(M, P, z, O) {
    _();
    const F = O.attributes, W = z.getAttributes(), H = P.defaultAttributeValues;
    for (const J in W) {
      const k = W[J];
      if (k.location >= 0) {
        let tt = F[J];
        if (tt === void 0 && (J === "instanceMatrix" && M.instanceMatrix && (tt = M.instanceMatrix), J === "instanceColor" && M.instanceColor && (tt = M.instanceColor)), tt !== void 0) {
          const nt = tt.normalized, ht = tt.itemSize, Pt = t.get(tt);
          if (Pt === void 0) continue;
          const Yt = Pt.buffer, Y = Pt.type, st = Pt.bytesPerElement, bt = Y === i.INT || Y === i.UNSIGNED_INT || tt.gpuType === Ta;
          if (tt.isInterleavedBufferAttribute) {
            const at = tt.data, Dt = at.stride, Ft = tt.offset;
            if (at.isInstancedInterleavedBuffer) {
              for (let Nt = 0; Nt < k.locationSize; Nt++)
                m(k.location + Nt, at.meshPerAttribute);
              M.isInstancedMesh !== !0 && O._maxInstanceCount === void 0 && (O._maxInstanceCount = at.meshPerAttribute * at.count);
            } else
              for (let Nt = 0; Nt < k.locationSize; Nt++)
                f(k.location + Nt);
            i.bindBuffer(i.ARRAY_BUFFER, Yt);
            for (let Nt = 0; Nt < k.locationSize; Nt++)
              x(
                k.location + Nt,
                ht / k.locationSize,
                Y,
                nt,
                Dt * st,
                (Ft + ht / k.locationSize * Nt) * st,
                bt
              );
          } else {
            if (tt.isInstancedBufferAttribute) {
              for (let at = 0; at < k.locationSize; at++)
                m(k.location + at, tt.meshPerAttribute);
              M.isInstancedMesh !== !0 && O._maxInstanceCount === void 0 && (O._maxInstanceCount = tt.meshPerAttribute * tt.count);
            } else
              for (let at = 0; at < k.locationSize; at++)
                f(k.location + at);
            i.bindBuffer(i.ARRAY_BUFFER, Yt);
            for (let at = 0; at < k.locationSize; at++)
              x(
                k.location + at,
                ht / k.locationSize,
                Y,
                nt,
                ht * st,
                ht / k.locationSize * at * st,
                bt
              );
          }
        } else if (H !== void 0) {
          const nt = H[J];
          if (nt !== void 0)
            switch (nt.length) {
              case 2:
                i.vertexAttrib2fv(k.location, nt);
                break;
              case 3:
                i.vertexAttrib3fv(k.location, nt);
                break;
              case 4:
                i.vertexAttrib4fv(k.location, nt);
                break;
              default:
                i.vertexAttrib1fv(k.location, nt);
            }
        }
      }
    }
    b();
  }
  function w() {
    D();
    for (const M in n) {
      const P = n[M];
      for (const z in P) {
        const O = P[z];
        for (const F in O)
          h(O[F].object), delete O[F];
        delete P[z];
      }
      delete n[M];
    }
  }
  function A(M) {
    if (n[M.id] === void 0) return;
    const P = n[M.id];
    for (const z in P) {
      const O = P[z];
      for (const F in O)
        h(O[F].object), delete O[F];
      delete P[z];
    }
    delete n[M.id];
  }
  function C(M) {
    for (const P in n) {
      const z = n[P];
      if (z[M.id] === void 0) continue;
      const O = z[M.id];
      for (const F in O)
        h(O[F].object), delete O[F];
      delete z[M.id];
    }
  }
  function D() {
    S(), a = !0, r !== s && (r = s, c(r.object));
  }
  function S() {
    s.geometry = null, s.program = null, s.wireframe = !1;
  }
  return {
    setup: o,
    reset: D,
    resetDefaultState: S,
    dispose: w,
    releaseStatesOfGeometry: A,
    releaseStatesOfProgram: C,
    initAttributes: _,
    enableAttribute: f,
    disableUnusedAttributes: b
  };
}
function Um(i, t, e) {
  let n;
  function s(c) {
    n = c;
  }
  function r(c, h) {
    i.drawArrays(n, c, h), e.update(h, n, 1);
  }
  function a(c, h, u) {
    u !== 0 && (i.drawArraysInstanced(n, c, h, u), e.update(h, n, u));
  }
  function o(c, h, u) {
    if (u === 0) return;
    t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n, c, 0, h, 0, u);
    let p = 0;
    for (let g = 0; g < u; g++)
      p += h[g];
    e.update(p, n, 1);
  }
  function l(c, h, u, d) {
    if (u === 0) return;
    const p = t.get("WEBGL_multi_draw");
    if (p === null)
      for (let g = 0; g < c.length; g++)
        a(c[g], h[g], d[g]);
    else {
      p.multiDrawArraysInstancedWEBGL(n, c, 0, h, 0, d, 0, u);
      let g = 0;
      for (let _ = 0; _ < u; _++)
        g += h[_] * d[_];
      e.update(g, n, 1);
    }
  }
  this.setMode = s, this.render = r, this.renderInstances = a, this.renderMultiDraw = o, this.renderMultiDrawInstances = l;
}
function Nm(i, t, e, n) {
  let s;
  function r() {
    if (s !== void 0) return s;
    if (t.has("EXT_texture_filter_anisotropic") === !0) {
      const C = t.get("EXT_texture_filter_anisotropic");
      s = i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
    } else
      s = 0;
    return s;
  }
  function a(C) {
    return !(C !== Ke && n.convert(C) !== i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT));
  }
  function o(C) {
    const D = C === Ps && (t.has("EXT_color_buffer_half_float") || t.has("EXT_color_buffer_float"));
    return !(C !== yn && n.convert(C) !== i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE) && // Edge and Chrome Mac < 52 (#9513)
    C !== gn && !D);
  }
  function l(C) {
    if (C === "highp") {
      if (i.getShaderPrecisionFormat(i.VERTEX_SHADER, i.HIGH_FLOAT).precision > 0 && i.getShaderPrecisionFormat(i.FRAGMENT_SHADER, i.HIGH_FLOAT).precision > 0)
        return "highp";
      C = "mediump";
    }
    return C === "mediump" && i.getShaderPrecisionFormat(i.VERTEX_SHADER, i.MEDIUM_FLOAT).precision > 0 && i.getShaderPrecisionFormat(i.FRAGMENT_SHADER, i.MEDIUM_FLOAT).precision > 0 ? "mediump" : "lowp";
  }
  let c = e.precision !== void 0 ? e.precision : "highp";
  const h = l(c);
  h !== c && (console.warn("THREE.WebGLRenderer:", c, "not supported, using", h, "instead."), c = h);
  const u = e.logarithmicDepthBuffer === !0, d = e.reverseDepthBuffer === !0 && t.has("EXT_clip_control"), p = i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS), g = i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS), _ = i.getParameter(i.MAX_TEXTURE_SIZE), f = i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE), m = i.getParameter(i.MAX_VERTEX_ATTRIBS), b = i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS), x = i.getParameter(i.MAX_VARYING_VECTORS), v = i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS), w = g > 0, A = i.getParameter(i.MAX_SAMPLES);
  return {
    isWebGL2: !0,
    // keeping this for backwards compatibility
    getMaxAnisotropy: r,
    getMaxPrecision: l,
    textureFormatReadable: a,
    textureTypeReadable: o,
    precision: c,
    logarithmicDepthBuffer: u,
    reverseDepthBuffer: d,
    maxTextures: p,
    maxVertexTextures: g,
    maxTextureSize: _,
    maxCubemapSize: f,
    maxAttributes: m,
    maxVertexUniforms: b,
    maxVaryings: x,
    maxFragmentUniforms: v,
    vertexTextures: w,
    maxSamples: A
  };
}
function Om(i) {
  const t = this;
  let e = null, n = 0, s = !1, r = !1;
  const a = new Rn(), o = new Ht(), l = { value: null, needsUpdate: !1 };
  this.uniform = l, this.numPlanes = 0, this.numIntersection = 0, this.init = function(u, d) {
    const p = u.length !== 0 || d || // enable state of previous frame - the clipping code has to
    // run another frame in order to reset the state:
    n !== 0 || s;
    return s = d, n = u.length, p;
  }, this.beginShadows = function() {
    r = !0, h(null);
  }, this.endShadows = function() {
    r = !1;
  }, this.setGlobalState = function(u, d) {
    e = h(u, d, 0);
  }, this.setState = function(u, d, p) {
    const g = u.clippingPlanes, _ = u.clipIntersection, f = u.clipShadows, m = i.get(u);
    if (!s || g === null || g.length === 0 || r && !f)
      r ? h(null) : c();
    else {
      const b = r ? 0 : n, x = b * 4;
      let v = m.clippingState || null;
      l.value = v, v = h(g, d, x, p);
      for (let w = 0; w !== x; ++w)
        v[w] = e[w];
      m.clippingState = v, this.numIntersection = _ ? this.numPlanes : 0, this.numPlanes += b;
    }
  };
  function c() {
    l.value !== e && (l.value = e, l.needsUpdate = n > 0), t.numPlanes = n, t.numIntersection = 0;
  }
  function h(u, d, p, g) {
    const _ = u !== null ? u.length : 0;
    let f = null;
    if (_ !== 0) {
      if (f = l.value, g !== !0 || f === null) {
        const m = p + _ * 4, b = d.matrixWorldInverse;
        o.getNormalMatrix(b), (f === null || f.length < m) && (f = new Float32Array(m));
        for (let x = 0, v = p; x !== _; ++x, v += 4)
          a.copy(u[x]).applyMatrix4(b, o), a.normal.toArray(f, v), f[v + 3] = a.constant;
      }
      l.value = f, l.needsUpdate = !0;
    }
    return t.numPlanes = _, t.numIntersection = 0, f;
  }
}
function Fm(i) {
  let t = /* @__PURE__ */ new WeakMap();
  function e(a, o) {
    return o === Uo ? a.mapping = Gi : o === No && (a.mapping = $i), a;
  }
  function n(a) {
    if (a && a.isTexture) {
      const o = a.mapping;
      if (o === Uo || o === No)
        if (t.has(a)) {
          const l = t.get(a).texture;
          return e(l, a.mapping);
        } else {
          const l = a.image;
          if (l && l.height > 0) {
            const c = new Yd(l.height);
            return c.fromEquirectangularTexture(i, a), t.set(a, c), a.addEventListener("dispose", s), e(c.texture, a.mapping);
          } else
            return null;
        }
    }
    return a;
  }
  function s(a) {
    const o = a.target;
    o.removeEventListener("dispose", s);
    const l = t.get(o);
    l !== void 0 && (t.delete(o), l.dispose());
  }
  function r() {
    t = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: n,
    dispose: r
  };
}
class km extends hh {
  constructor(t = -1, e = 1, n = 1, s = -1, r = 0.1, a = 2e3) {
    super(), this.isOrthographicCamera = !0, this.type = "OrthographicCamera", this.zoom = 1, this.view = null, this.left = t, this.right = e, this.top = n, this.bottom = s, this.near = r, this.far = a, this.updateProjectionMatrix();
  }
  copy(t, e) {
    return super.copy(t, e), this.left = t.left, this.right = t.right, this.top = t.top, this.bottom = t.bottom, this.near = t.near, this.far = t.far, this.zoom = t.zoom, this.view = t.view === null ? null : Object.assign({}, t.view), this;
  }
  setViewOffset(t, e, n, s, r, a) {
    this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = t, this.view.fullHeight = e, this.view.offsetX = n, this.view.offsetY = s, this.view.width = r, this.view.height = a, this.updateProjectionMatrix();
  }
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const t = (this.right - this.left) / (2 * this.zoom), e = (this.top - this.bottom) / (2 * this.zoom), n = (this.right + this.left) / 2, s = (this.top + this.bottom) / 2;
    let r = n - t, a = n + t, o = s + e, l = s - e;
    if (this.view !== null && this.view.enabled) {
      const c = (this.right - this.left) / this.view.fullWidth / this.zoom, h = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
      r += c * this.view.offsetX, a = r + c * this.view.width, o -= h * this.view.offsetY, l = o - h * this.view.height;
    }
    this.projectionMatrix.makeOrthographic(r, a, o, l, this.near, this.far, this.coordinateSystem), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(t) {
    const e = super.toJSON(t);
    return e.object.zoom = this.zoom, e.object.left = this.left, e.object.right = this.right, e.object.top = this.top, e.object.bottom = this.bottom, e.object.near = this.near, e.object.far = this.far, this.view !== null && (e.object.view = Object.assign({}, this.view)), e;
  }
}
const Ii = 4, $l = [0.125, 0.215, 0.35, 0.446, 0.526, 0.582], Kn = 20, ao = /* @__PURE__ */ new km(), Wl = /* @__PURE__ */ new Wt();
let lo = null, co = 0, ho = 0, uo = !1;
const jn = (1 + Math.sqrt(5)) / 2, Ci = 1 / jn, Xl = [
  /* @__PURE__ */ new L(-jn, Ci, 0),
  /* @__PURE__ */ new L(jn, Ci, 0),
  /* @__PURE__ */ new L(-Ci, 0, jn),
  /* @__PURE__ */ new L(Ci, 0, jn),
  /* @__PURE__ */ new L(0, jn, -Ci),
  /* @__PURE__ */ new L(0, jn, Ci),
  /* @__PURE__ */ new L(-1, 1, -1),
  /* @__PURE__ */ new L(1, 1, -1),
  /* @__PURE__ */ new L(-1, 1, 1),
  /* @__PURE__ */ new L(1, 1, 1)
];
class Yl {
  constructor(t) {
    this._renderer = t, this._pingPongRenderTarget = null, this._lodMax = 0, this._cubeSize = 0, this._lodPlanes = [], this._sizeLods = [], this._sigmas = [], this._blurMaterial = null, this._cubemapMaterial = null, this._equirectMaterial = null, this._compileMaterial(this._blurMaterial);
  }
  /**
   * Generates a PMREM from a supplied Scene, which can be faster than using an
   * image if networking bandwidth is low. Optional sigma specifies a blur radius
   * in radians to be applied to the scene before PMREM generation. Optional near
   * and far planes ensure the scene is rendered in its entirety (the cubeCamera
   * is placed at the origin).
   */
  fromScene(t, e = 0, n = 0.1, s = 100) {
    lo = this._renderer.getRenderTarget(), co = this._renderer.getActiveCubeFace(), ho = this._renderer.getActiveMipmapLevel(), uo = this._renderer.xr.enabled, this._renderer.xr.enabled = !1, this._setSize(256);
    const r = this._allocateTargets();
    return r.depthBuffer = !0, this._sceneToCubeUV(t, n, s, r), e > 0 && this._blur(r, 0, 0, e), this._applyPMREM(r), this._cleanup(r), r;
  }
  /**
   * Generates a PMREM from an equirectangular texture, which can be either LDR
   * or HDR. The ideal input image size is 1k (1024 x 512),
   * as this matches best with the 256 x 256 cubemap output.
   * The smallest supported equirectangular image size is 64 x 32.
   */
  fromEquirectangular(t, e = null) {
    return this._fromTexture(t, e);
  }
  /**
   * Generates a PMREM from an cubemap texture, which can be either LDR
   * or HDR. The ideal input cube size is 256 x 256,
   * as this matches best with the 256 x 256 cubemap output.
   * The smallest supported cube size is 16 x 16.
   */
  fromCubemap(t, e = null) {
    return this._fromTexture(t, e);
  }
  /**
   * Pre-compiles the cubemap shader. You can get faster start-up by invoking this method during
   * your texture's network fetch for increased concurrency.
   */
  compileCubemapShader() {
    this._cubemapMaterial === null && (this._cubemapMaterial = Zl(), this._compileMaterial(this._cubemapMaterial));
  }
  /**
   * Pre-compiles the equirectangular shader. You can get faster start-up by invoking this method during
   * your texture's network fetch for increased concurrency.
   */
  compileEquirectangularShader() {
    this._equirectMaterial === null && (this._equirectMaterial = jl(), this._compileMaterial(this._equirectMaterial));
  }
  /**
   * Disposes of the PMREMGenerator's internal memory. Note that PMREMGenerator is a static class,
   * so you should not need more than one PMREMGenerator object. If you do, calling dispose() on
   * one of them will cause any others to also become unusable.
   */
  dispose() {
    this._dispose(), this._cubemapMaterial !== null && this._cubemapMaterial.dispose(), this._equirectMaterial !== null && this._equirectMaterial.dispose();
  }
  // private interface
  _setSize(t) {
    this._lodMax = Math.floor(Math.log2(t)), this._cubeSize = Math.pow(2, this._lodMax);
  }
  _dispose() {
    this._blurMaterial !== null && this._blurMaterial.dispose(), this._pingPongRenderTarget !== null && this._pingPongRenderTarget.dispose();
    for (let t = 0; t < this._lodPlanes.length; t++)
      this._lodPlanes[t].dispose();
  }
  _cleanup(t) {
    this._renderer.setRenderTarget(lo, co, ho), this._renderer.xr.enabled = uo, t.scissorTest = !1, er(t, 0, 0, t.width, t.height);
  }
  _fromTexture(t, e) {
    t.mapping === Gi || t.mapping === $i ? this._setSize(t.image.length === 0 ? 16 : t.image[0].width || t.image[0].image.width) : this._setSize(t.image.width / 4), lo = this._renderer.getRenderTarget(), co = this._renderer.getActiveCubeFace(), ho = this._renderer.getActiveMipmapLevel(), uo = this._renderer.xr.enabled, this._renderer.xr.enabled = !1;
    const n = e || this._allocateTargets();
    return this._textureToCubeUV(t, n), this._applyPMREM(n), this._cleanup(n), n;
  }
  _allocateTargets() {
    const t = 3 * Math.max(this._cubeSize, 112), e = 4 * this._cubeSize, n = {
      magFilter: sn,
      minFilter: sn,
      generateMipmaps: !1,
      type: Ps,
      format: Ke,
      colorSpace: qi,
      depthBuffer: !1
    }, s = ql(t, e, n);
    if (this._pingPongRenderTarget === null || this._pingPongRenderTarget.width !== t || this._pingPongRenderTarget.height !== e) {
      this._pingPongRenderTarget !== null && this._dispose(), this._pingPongRenderTarget = ql(t, e, n);
      const { _lodMax: r } = this;
      ({ sizeLods: this._sizeLods, lodPlanes: this._lodPlanes, sigmas: this._sigmas } = Bm(r)), this._blurMaterial = zm(r, t, e);
    }
    return s;
  }
  _compileMaterial(t) {
    const e = new Mt(this._lodPlanes[0], t);
    this._renderer.compile(e, ao);
  }
  _sceneToCubeUV(t, e, n, s) {
    const o = new ze(90, 1, e, n), l = [1, -1, 1, 1, 1, 1], c = [1, 1, 1, -1, -1, -1], h = this._renderer, u = h.autoClear, d = h.toneMapping;
    h.getClearColor(Wl), h.toneMapping = Nn, h.autoClear = !1;
    const p = new Dn({
      name: "PMREM.Background",
      side: Ne,
      depthWrite: !1,
      depthTest: !1
    }), g = new Mt(new ie(), p);
    let _ = !1;
    const f = t.background;
    f ? f.isColor && (p.color.copy(f), t.background = null, _ = !0) : (p.color.copy(Wl), _ = !0);
    for (let m = 0; m < 6; m++) {
      const b = m % 3;
      b === 0 ? (o.up.set(0, l[m], 0), o.lookAt(c[m], 0, 0)) : b === 1 ? (o.up.set(0, 0, l[m]), o.lookAt(0, c[m], 0)) : (o.up.set(0, l[m], 0), o.lookAt(0, 0, c[m]));
      const x = this._cubeSize;
      er(s, b * x, m > 2 ? x : 0, x, x), h.setRenderTarget(s), _ && h.render(g, o), h.render(t, o);
    }
    g.geometry.dispose(), g.material.dispose(), h.toneMapping = d, h.autoClear = u, t.background = f;
  }
  _textureToCubeUV(t, e) {
    const n = this._renderer, s = t.mapping === Gi || t.mapping === $i;
    s ? (this._cubemapMaterial === null && (this._cubemapMaterial = Zl()), this._cubemapMaterial.uniforms.flipEnvMap.value = t.isRenderTargetTexture === !1 ? -1 : 1) : this._equirectMaterial === null && (this._equirectMaterial = jl());
    const r = s ? this._cubemapMaterial : this._equirectMaterial, a = new Mt(this._lodPlanes[0], r), o = r.uniforms;
    o.envMap.value = t;
    const l = this._cubeSize;
    er(e, 0, 0, 3 * l, 2 * l), n.setRenderTarget(e), n.render(a, ao);
  }
  _applyPMREM(t) {
    const e = this._renderer, n = e.autoClear;
    e.autoClear = !1;
    const s = this._lodPlanes.length;
    for (let r = 1; r < s; r++) {
      const a = Math.sqrt(this._sigmas[r] * this._sigmas[r] - this._sigmas[r - 1] * this._sigmas[r - 1]), o = Xl[(s - r - 1) % Xl.length];
      this._blur(t, r - 1, r, a, o);
    }
    e.autoClear = n;
  }
  /**
   * This is a two-pass Gaussian blur for a cubemap. Normally this is done
   * vertically and horizontally, but this breaks down on a cube. Here we apply
   * the blur latitudinally (around the poles), and then longitudinally (towards
   * the poles) to approximate the orthogonally-separable blur. It is least
   * accurate at the poles, but still does a decent job.
   */
  _blur(t, e, n, s, r) {
    const a = this._pingPongRenderTarget;
    this._halfBlur(
      t,
      a,
      e,
      n,
      s,
      "latitudinal",
      r
    ), this._halfBlur(
      a,
      t,
      n,
      n,
      s,
      "longitudinal",
      r
    );
  }
  _halfBlur(t, e, n, s, r, a, o) {
    const l = this._renderer, c = this._blurMaterial;
    a !== "latitudinal" && a !== "longitudinal" && console.error(
      "blur direction must be either latitudinal or longitudinal!"
    );
    const h = 3, u = new Mt(this._lodPlanes[s], c), d = c.uniforms, p = this._sizeLods[n] - 1, g = isFinite(r) ? Math.PI / (2 * p) : 2 * Math.PI / (2 * Kn - 1), _ = r / g, f = isFinite(r) ? 1 + Math.floor(h * _) : Kn;
    f > Kn && console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${f} samples when the maximum is set to ${Kn}`);
    const m = [];
    let b = 0;
    for (let C = 0; C < Kn; ++C) {
      const D = C / _, S = Math.exp(-D * D / 2);
      m.push(S), C === 0 ? b += S : C < f && (b += 2 * S);
    }
    for (let C = 0; C < m.length; C++)
      m[C] = m[C] / b;
    d.envMap.value = t.texture, d.samples.value = f, d.weights.value = m, d.latitudinal.value = a === "latitudinal", o && (d.poleAxis.value = o);
    const { _lodMax: x } = this;
    d.dTheta.value = g, d.mipInt.value = x - n;
    const v = this._sizeLods[s], w = 3 * v * (s > x - Ii ? s - x + Ii : 0), A = 4 * (this._cubeSize - v);
    er(e, w, A, 3 * v, 2 * v), l.setRenderTarget(e), l.render(u, ao);
  }
}
function Bm(i) {
  const t = [], e = [], n = [];
  let s = i;
  const r = i - Ii + 1 + $l.length;
  for (let a = 0; a < r; a++) {
    const o = Math.pow(2, s);
    e.push(o);
    let l = 1 / o;
    a > i - Ii ? l = $l[a - i + Ii - 1] : a === 0 && (l = 0), n.push(l);
    const c = 1 / (o - 2), h = -c, u = 1 + c, d = [h, h, u, h, u, u, h, h, u, u, h, u], p = 6, g = 6, _ = 3, f = 2, m = 1, b = new Float32Array(_ * g * p), x = new Float32Array(f * g * p), v = new Float32Array(m * g * p);
    for (let A = 0; A < p; A++) {
      const C = A % 3 * 2 / 3 - 1, D = A > 2 ? 0 : -1, S = [
        C,
        D,
        0,
        C + 2 / 3,
        D,
        0,
        C + 2 / 3,
        D + 1,
        0,
        C,
        D,
        0,
        C + 2 / 3,
        D + 1,
        0,
        C,
        D + 1,
        0
      ];
      b.set(S, _ * g * A), x.set(d, f * g * A);
      const M = [A, A, A, A, A, A];
      v.set(M, m * g * A);
    }
    const w = new Ee();
    w.setAttribute("position", new rn(b, _)), w.setAttribute("uv", new rn(x, f)), w.setAttribute("faceIndex", new rn(v, m)), t.push(w), s > Ii && s--;
  }
  return { lodPlanes: t, sizeLods: e, sigmas: n };
}
function ql(i, t, e) {
  const n = new ai(i, t, e);
  return n.texture.mapping = Ar, n.texture.name = "PMREM.cubeUv", n.scissorTest = !0, n;
}
function er(i, t, e, n, s) {
  i.viewport.set(t, e, n, s), i.scissor.set(t, e, n, s);
}
function zm(i, t, e) {
  const n = new Float32Array(Kn), s = new L(0, 1, 0);
  return new kn({
    name: "SphericalGaussianBlur",
    defines: {
      n: Kn,
      CUBEUV_TEXEL_WIDTH: 1 / t,
      CUBEUV_TEXEL_HEIGHT: 1 / e,
      CUBEUV_MAX_MIP: `${i}.0`
    },
    uniforms: {
      envMap: { value: null },
      samples: { value: 1 },
      weights: { value: n },
      latitudinal: { value: !1 },
      dTheta: { value: 0 },
      mipInt: { value: 0 },
      poleAxis: { value: s }
    },
    vertexShader: Oa(),
    fragmentShader: (
      /* glsl */
      `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`
    ),
    blending: Un,
    depthTest: !1,
    depthWrite: !1
  });
}
function jl() {
  return new kn({
    name: "EquirectangularToCubeUV",
    uniforms: {
      envMap: { value: null }
    },
    vertexShader: Oa(),
    fragmentShader: (
      /* glsl */
      `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`
    ),
    blending: Un,
    depthTest: !1,
    depthWrite: !1
  });
}
function Zl() {
  return new kn({
    name: "CubemapToCubeUV",
    uniforms: {
      envMap: { value: null },
      flipEnvMap: { value: -1 }
    },
    vertexShader: Oa(),
    fragmentShader: (
      /* glsl */
      `

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`
    ),
    blending: Un,
    depthTest: !1,
    depthWrite: !1
  });
}
function Oa() {
  return (
    /* glsl */
    `

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`
  );
}
function Hm(i) {
  let t = /* @__PURE__ */ new WeakMap(), e = null;
  function n(o) {
    if (o && o.isTexture) {
      const l = o.mapping, c = l === Uo || l === No, h = l === Gi || l === $i;
      if (c || h) {
        let u = t.get(o);
        const d = u !== void 0 ? u.texture.pmremVersion : 0;
        if (o.isRenderTargetTexture && o.pmremVersion !== d)
          return e === null && (e = new Yl(i)), u = c ? e.fromEquirectangular(o, u) : e.fromCubemap(o, u), u.texture.pmremVersion = o.pmremVersion, t.set(o, u), u.texture;
        if (u !== void 0)
          return u.texture;
        {
          const p = o.image;
          return c && p && p.height > 0 || h && p && s(p) ? (e === null && (e = new Yl(i)), u = c ? e.fromEquirectangular(o) : e.fromCubemap(o), u.texture.pmremVersion = o.pmremVersion, t.set(o, u), o.addEventListener("dispose", r), u.texture) : null;
        }
      }
    }
    return o;
  }
  function s(o) {
    let l = 0;
    const c = 6;
    for (let h = 0; h < c; h++)
      o[h] !== void 0 && l++;
    return l === c;
  }
  function r(o) {
    const l = o.target;
    l.removeEventListener("dispose", r);
    const c = t.get(l);
    c !== void 0 && (t.delete(l), c.dispose());
  }
  function a() {
    t = /* @__PURE__ */ new WeakMap(), e !== null && (e.dispose(), e = null);
  }
  return {
    get: n,
    dispose: a
  };
}
function Vm(i) {
  const t = {};
  function e(n) {
    if (t[n] !== void 0)
      return t[n];
    let s;
    switch (n) {
      case "WEBGL_depth_texture":
        s = i.getExtension("WEBGL_depth_texture") || i.getExtension("MOZ_WEBGL_depth_texture") || i.getExtension("WEBKIT_WEBGL_depth_texture");
        break;
      case "EXT_texture_filter_anisotropic":
        s = i.getExtension("EXT_texture_filter_anisotropic") || i.getExtension("MOZ_EXT_texture_filter_anisotropic") || i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
        break;
      case "WEBGL_compressed_texture_s3tc":
        s = i.getExtension("WEBGL_compressed_texture_s3tc") || i.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
        break;
      case "WEBGL_compressed_texture_pvrtc":
        s = i.getExtension("WEBGL_compressed_texture_pvrtc") || i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
        break;
      default:
        s = i.getExtension(n);
    }
    return t[n] = s, s;
  }
  return {
    has: function(n) {
      return e(n) !== null;
    },
    init: function() {
      e("EXT_color_buffer_float"), e("WEBGL_clip_cull_distance"), e("OES_texture_float_linear"), e("EXT_color_buffer_half_float"), e("WEBGL_multisampled_render_to_texture"), e("WEBGL_render_shared_exponent");
    },
    get: function(n) {
      const s = e(n);
      return s === null && cs("THREE.WebGLRenderer: " + n + " extension not supported."), s;
    }
  };
}
function Gm(i, t, e, n) {
  const s = {}, r = /* @__PURE__ */ new WeakMap();
  function a(u) {
    const d = u.target;
    d.index !== null && t.remove(d.index);
    for (const g in d.attributes)
      t.remove(d.attributes[g]);
    for (const g in d.morphAttributes) {
      const _ = d.morphAttributes[g];
      for (let f = 0, m = _.length; f < m; f++)
        t.remove(_[f]);
    }
    d.removeEventListener("dispose", a), delete s[d.id];
    const p = r.get(d);
    p && (t.remove(p), r.delete(d)), n.releaseStatesOfGeometry(d), d.isInstancedBufferGeometry === !0 && delete d._maxInstanceCount, e.memory.geometries--;
  }
  function o(u, d) {
    return s[d.id] === !0 || (d.addEventListener("dispose", a), s[d.id] = !0, e.memory.geometries++), d;
  }
  function l(u) {
    const d = u.attributes;
    for (const g in d)
      t.update(d[g], i.ARRAY_BUFFER);
    const p = u.morphAttributes;
    for (const g in p) {
      const _ = p[g];
      for (let f = 0, m = _.length; f < m; f++)
        t.update(_[f], i.ARRAY_BUFFER);
    }
  }
  function c(u) {
    const d = [], p = u.index, g = u.attributes.position;
    let _ = 0;
    if (p !== null) {
      const b = p.array;
      _ = p.version;
      for (let x = 0, v = b.length; x < v; x += 3) {
        const w = b[x + 0], A = b[x + 1], C = b[x + 2];
        d.push(w, A, A, C, C, w);
      }
    } else if (g !== void 0) {
      const b = g.array;
      _ = g.version;
      for (let x = 0, v = b.length / 3 - 1; x < v; x += 3) {
        const w = x + 0, A = x + 1, C = x + 2;
        d.push(w, A, A, C, C, w);
      }
    } else
      return;
    const f = new (ih(d) ? lh : ah)(d, 1);
    f.version = _;
    const m = r.get(u);
    m && t.remove(m), r.set(u, f);
  }
  function h(u) {
    const d = r.get(u);
    if (d) {
      const p = u.index;
      p !== null && d.version < p.version && c(u);
    } else
      c(u);
    return r.get(u);
  }
  return {
    get: o,
    update: l,
    getWireframeAttribute: h
  };
}
function $m(i, t, e) {
  let n;
  function s(d) {
    n = d;
  }
  let r, a;
  function o(d) {
    r = d.type, a = d.bytesPerElement;
  }
  function l(d, p) {
    i.drawElements(n, p, r, d * a), e.update(p, n, 1);
  }
  function c(d, p, g) {
    g !== 0 && (i.drawElementsInstanced(n, p, r, d * a, g), e.update(p, n, g));
  }
  function h(d, p, g) {
    if (g === 0) return;
    t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n, p, 0, r, d, 0, g);
    let f = 0;
    for (let m = 0; m < g; m++)
      f += p[m];
    e.update(f, n, 1);
  }
  function u(d, p, g, _) {
    if (g === 0) return;
    const f = t.get("WEBGL_multi_draw");
    if (f === null)
      for (let m = 0; m < d.length; m++)
        c(d[m] / a, p[m], _[m]);
    else {
      f.multiDrawElementsInstancedWEBGL(n, p, 0, r, d, 0, _, 0, g);
      let m = 0;
      for (let b = 0; b < g; b++)
        m += p[b] * _[b];
      e.update(m, n, 1);
    }
  }
  this.setMode = s, this.setIndex = o, this.render = l, this.renderInstances = c, this.renderMultiDraw = h, this.renderMultiDrawInstances = u;
}
function Wm(i) {
  const t = {
    geometries: 0,
    textures: 0
  }, e = {
    frame: 0,
    calls: 0,
    triangles: 0,
    points: 0,
    lines: 0
  };
  function n(r, a, o) {
    switch (e.calls++, a) {
      case i.TRIANGLES:
        e.triangles += o * (r / 3);
        break;
      case i.LINES:
        e.lines += o * (r / 2);
        break;
      case i.LINE_STRIP:
        e.lines += o * (r - 1);
        break;
      case i.LINE_LOOP:
        e.lines += o * r;
        break;
      case i.POINTS:
        e.points += o * r;
        break;
      default:
        console.error("THREE.WebGLInfo: Unknown draw mode:", a);
        break;
    }
  }
  function s() {
    e.calls = 0, e.triangles = 0, e.points = 0, e.lines = 0;
  }
  return {
    memory: t,
    render: e,
    programs: null,
    autoReset: !0,
    reset: s,
    update: n
  };
}
function Xm(i, t, e) {
  const n = /* @__PURE__ */ new WeakMap(), s = new oe();
  function r(a, o, l) {
    const c = a.morphTargetInfluences, h = o.morphAttributes.position || o.morphAttributes.normal || o.morphAttributes.color, u = h !== void 0 ? h.length : 0;
    let d = n.get(o);
    if (d === void 0 || d.count !== u) {
      let S = function() {
        C.dispose(), n.delete(o), o.removeEventListener("dispose", S);
      };
      d !== void 0 && d.texture.dispose();
      const p = o.morphAttributes.position !== void 0, g = o.morphAttributes.normal !== void 0, _ = o.morphAttributes.color !== void 0, f = o.morphAttributes.position || [], m = o.morphAttributes.normal || [], b = o.morphAttributes.color || [];
      let x = 0;
      p === !0 && (x = 1), g === !0 && (x = 2), _ === !0 && (x = 3);
      let v = o.attributes.position.count * x, w = 1;
      v > t.maxTextureSize && (w = Math.ceil(v / t.maxTextureSize), v = t.maxTextureSize);
      const A = new Float32Array(v * w * 4 * u), C = new rh(A, v, w, u);
      C.type = gn, C.needsUpdate = !0;
      const D = x * 4;
      for (let M = 0; M < u; M++) {
        const P = f[M], z = m[M], O = b[M], F = v * w * 4 * M;
        for (let W = 0; W < P.count; W++) {
          const H = W * D;
          p === !0 && (s.fromBufferAttribute(P, W), A[F + H + 0] = s.x, A[F + H + 1] = s.y, A[F + H + 2] = s.z, A[F + H + 3] = 0), g === !0 && (s.fromBufferAttribute(z, W), A[F + H + 4] = s.x, A[F + H + 5] = s.y, A[F + H + 6] = s.z, A[F + H + 7] = 0), _ === !0 && (s.fromBufferAttribute(O, W), A[F + H + 8] = s.x, A[F + H + 9] = s.y, A[F + H + 10] = s.z, A[F + H + 11] = O.itemSize === 4 ? s.w : 1);
        }
      }
      d = {
        count: u,
        texture: C,
        size: new et(v, w)
      }, n.set(o, d), o.addEventListener("dispose", S);
    }
    if (a.isInstancedMesh === !0 && a.morphTexture !== null)
      l.getUniforms().setValue(i, "morphTexture", a.morphTexture, e);
    else {
      let p = 0;
      for (let _ = 0; _ < c.length; _++)
        p += c[_];
      const g = o.morphTargetsRelative ? 1 : 1 - p;
      l.getUniforms().setValue(i, "morphTargetBaseInfluence", g), l.getUniforms().setValue(i, "morphTargetInfluences", c);
    }
    l.getUniforms().setValue(i, "morphTargetsTexture", d.texture, e), l.getUniforms().setValue(i, "morphTargetsTextureSize", d.size);
  }
  return {
    update: r
  };
}
function Ym(i, t, e, n) {
  let s = /* @__PURE__ */ new WeakMap();
  function r(l) {
    const c = n.render.frame, h = l.geometry, u = t.get(l, h);
    if (s.get(u) !== c && (t.update(u), s.set(u, c)), l.isInstancedMesh && (l.hasEventListener("dispose", o) === !1 && l.addEventListener("dispose", o), s.get(l) !== c && (e.update(l.instanceMatrix, i.ARRAY_BUFFER), l.instanceColor !== null && e.update(l.instanceColor, i.ARRAY_BUFFER), s.set(l, c))), l.isSkinnedMesh) {
      const d = l.skeleton;
      s.get(d) !== c && (d.update(), s.set(d, c));
    }
    return u;
  }
  function a() {
    s = /* @__PURE__ */ new WeakMap();
  }
  function o(l) {
    const c = l.target;
    c.removeEventListener("dispose", o), e.remove(c.instanceMatrix), c.instanceColor !== null && e.remove(c.instanceColor);
  }
  return {
    update: r,
    dispose: a
  };
}
class fh extends Oe {
  constructor(t, e, n, s, r, a, o, l, c, h = ki) {
    if (h !== ki && h !== Xi)
      throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
    n === void 0 && h === ki && (n = oi), n === void 0 && h === Xi && (n = Wi), super(null, s, r, a, o, l, h, n, c), this.isDepthTexture = !0, this.image = { width: t, height: e }, this.magFilter = o !== void 0 ? o : Je, this.minFilter = l !== void 0 ? l : Je, this.flipY = !1, this.generateMipmaps = !1, this.compareFunction = null;
  }
  copy(t) {
    return super.copy(t), this.compareFunction = t.compareFunction, this;
  }
  toJSON(t) {
    const e = super.toJSON(t);
    return this.compareFunction !== null && (e.compareFunction = this.compareFunction), e;
  }
}
const ph = /* @__PURE__ */ new Oe(), Kl = /* @__PURE__ */ new fh(1, 1), mh = /* @__PURE__ */ new rh(), gh = /* @__PURE__ */ new Ld(), _h = /* @__PURE__ */ new uh(), Jl = [], Ql = [], tc = new Float32Array(16), ec = new Float32Array(9), nc = new Float32Array(4);
function Zi(i, t, e) {
  const n = i[0];
  if (n <= 0 || n > 0) return i;
  const s = t * e;
  let r = Jl[s];
  if (r === void 0 && (r = new Float32Array(s), Jl[s] = r), t !== 0) {
    n.toArray(r, 0);
    for (let a = 1, o = 0; a !== t; ++a)
      o += e, i[a].toArray(r, o);
  }
  return r;
}
function ye(i, t) {
  if (i.length !== t.length) return !1;
  for (let e = 0, n = i.length; e < n; e++)
    if (i[e] !== t[e]) return !1;
  return !0;
}
function Me(i, t) {
  for (let e = 0, n = t.length; e < n; e++)
    i[e] = t[e];
}
function Lr(i, t) {
  let e = Ql[t];
  e === void 0 && (e = new Int32Array(t), Ql[t] = e);
  for (let n = 0; n !== t; ++n)
    e[n] = i.allocateTextureUnit();
  return e;
}
function qm(i, t) {
  const e = this.cache;
  e[0] !== t && (i.uniform1f(this.addr, t), e[0] = t);
}
function jm(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y) && (i.uniform2f(this.addr, t.x, t.y), e[0] = t.x, e[1] = t.y);
  else {
    if (ye(e, t)) return;
    i.uniform2fv(this.addr, t), Me(e, t);
  }
}
function Zm(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z) && (i.uniform3f(this.addr, t.x, t.y, t.z), e[0] = t.x, e[1] = t.y, e[2] = t.z);
  else if (t.r !== void 0)
    (e[0] !== t.r || e[1] !== t.g || e[2] !== t.b) && (i.uniform3f(this.addr, t.r, t.g, t.b), e[0] = t.r, e[1] = t.g, e[2] = t.b);
  else {
    if (ye(e, t)) return;
    i.uniform3fv(this.addr, t), Me(e, t);
  }
}
function Km(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z || e[3] !== t.w) && (i.uniform4f(this.addr, t.x, t.y, t.z, t.w), e[0] = t.x, e[1] = t.y, e[2] = t.z, e[3] = t.w);
  else {
    if (ye(e, t)) return;
    i.uniform4fv(this.addr, t), Me(e, t);
  }
}
function Jm(i, t) {
  const e = this.cache, n = t.elements;
  if (n === void 0) {
    if (ye(e, t)) return;
    i.uniformMatrix2fv(this.addr, !1, t), Me(e, t);
  } else {
    if (ye(e, n)) return;
    nc.set(n), i.uniformMatrix2fv(this.addr, !1, nc), Me(e, n);
  }
}
function Qm(i, t) {
  const e = this.cache, n = t.elements;
  if (n === void 0) {
    if (ye(e, t)) return;
    i.uniformMatrix3fv(this.addr, !1, t), Me(e, t);
  } else {
    if (ye(e, n)) return;
    ec.set(n), i.uniformMatrix3fv(this.addr, !1, ec), Me(e, n);
  }
}
function tg(i, t) {
  const e = this.cache, n = t.elements;
  if (n === void 0) {
    if (ye(e, t)) return;
    i.uniformMatrix4fv(this.addr, !1, t), Me(e, t);
  } else {
    if (ye(e, n)) return;
    tc.set(n), i.uniformMatrix4fv(this.addr, !1, tc), Me(e, n);
  }
}
function eg(i, t) {
  const e = this.cache;
  e[0] !== t && (i.uniform1i(this.addr, t), e[0] = t);
}
function ng(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y) && (i.uniform2i(this.addr, t.x, t.y), e[0] = t.x, e[1] = t.y);
  else {
    if (ye(e, t)) return;
    i.uniform2iv(this.addr, t), Me(e, t);
  }
}
function ig(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z) && (i.uniform3i(this.addr, t.x, t.y, t.z), e[0] = t.x, e[1] = t.y, e[2] = t.z);
  else {
    if (ye(e, t)) return;
    i.uniform3iv(this.addr, t), Me(e, t);
  }
}
function sg(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z || e[3] !== t.w) && (i.uniform4i(this.addr, t.x, t.y, t.z, t.w), e[0] = t.x, e[1] = t.y, e[2] = t.z, e[3] = t.w);
  else {
    if (ye(e, t)) return;
    i.uniform4iv(this.addr, t), Me(e, t);
  }
}
function rg(i, t) {
  const e = this.cache;
  e[0] !== t && (i.uniform1ui(this.addr, t), e[0] = t);
}
function og(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y) && (i.uniform2ui(this.addr, t.x, t.y), e[0] = t.x, e[1] = t.y);
  else {
    if (ye(e, t)) return;
    i.uniform2uiv(this.addr, t), Me(e, t);
  }
}
function ag(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z) && (i.uniform3ui(this.addr, t.x, t.y, t.z), e[0] = t.x, e[1] = t.y, e[2] = t.z);
  else {
    if (ye(e, t)) return;
    i.uniform3uiv(this.addr, t), Me(e, t);
  }
}
function lg(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z || e[3] !== t.w) && (i.uniform4ui(this.addr, t.x, t.y, t.z, t.w), e[0] = t.x, e[1] = t.y, e[2] = t.z, e[3] = t.w);
  else {
    if (ye(e, t)) return;
    i.uniform4uiv(this.addr, t), Me(e, t);
  }
}
function cg(i, t, e) {
  const n = this.cache, s = e.allocateTextureUnit();
  n[0] !== s && (i.uniform1i(this.addr, s), n[0] = s);
  let r;
  this.type === i.SAMPLER_2D_SHADOW ? (Kl.compareFunction = nh, r = Kl) : r = ph, e.setTexture2D(t || r, s);
}
function hg(i, t, e) {
  const n = this.cache, s = e.allocateTextureUnit();
  n[0] !== s && (i.uniform1i(this.addr, s), n[0] = s), e.setTexture3D(t || gh, s);
}
function ug(i, t, e) {
  const n = this.cache, s = e.allocateTextureUnit();
  n[0] !== s && (i.uniform1i(this.addr, s), n[0] = s), e.setTextureCube(t || _h, s);
}
function dg(i, t, e) {
  const n = this.cache, s = e.allocateTextureUnit();
  n[0] !== s && (i.uniform1i(this.addr, s), n[0] = s), e.setTexture2DArray(t || mh, s);
}
function fg(i) {
  switch (i) {
    case 5126:
      return qm;
    // FLOAT
    case 35664:
      return jm;
    // _VEC2
    case 35665:
      return Zm;
    // _VEC3
    case 35666:
      return Km;
    // _VEC4
    case 35674:
      return Jm;
    // _MAT2
    case 35675:
      return Qm;
    // _MAT3
    case 35676:
      return tg;
    // _MAT4
    case 5124:
    case 35670:
      return eg;
    // INT, BOOL
    case 35667:
    case 35671:
      return ng;
    // _VEC2
    case 35668:
    case 35672:
      return ig;
    // _VEC3
    case 35669:
    case 35673:
      return sg;
    // _VEC4
    case 5125:
      return rg;
    // UINT
    case 36294:
      return og;
    // _VEC2
    case 36295:
      return ag;
    // _VEC3
    case 36296:
      return lg;
    // _VEC4
    case 35678:
    // SAMPLER_2D
    case 36198:
    // SAMPLER_EXTERNAL_OES
    case 36298:
    // INT_SAMPLER_2D
    case 36306:
    // UNSIGNED_INT_SAMPLER_2D
    case 35682:
      return cg;
    case 35679:
    // SAMPLER_3D
    case 36299:
    // INT_SAMPLER_3D
    case 36307:
      return hg;
    case 35680:
    // SAMPLER_CUBE
    case 36300:
    // INT_SAMPLER_CUBE
    case 36308:
    // UNSIGNED_INT_SAMPLER_CUBE
    case 36293:
      return ug;
    case 36289:
    // SAMPLER_2D_ARRAY
    case 36303:
    // INT_SAMPLER_2D_ARRAY
    case 36311:
    // UNSIGNED_INT_SAMPLER_2D_ARRAY
    case 36292:
      return dg;
  }
}
function pg(i, t) {
  i.uniform1fv(this.addr, t);
}
function mg(i, t) {
  const e = Zi(t, this.size, 2);
  i.uniform2fv(this.addr, e);
}
function gg(i, t) {
  const e = Zi(t, this.size, 3);
  i.uniform3fv(this.addr, e);
}
function _g(i, t) {
  const e = Zi(t, this.size, 4);
  i.uniform4fv(this.addr, e);
}
function vg(i, t) {
  const e = Zi(t, this.size, 4);
  i.uniformMatrix2fv(this.addr, !1, e);
}
function xg(i, t) {
  const e = Zi(t, this.size, 9);
  i.uniformMatrix3fv(this.addr, !1, e);
}
function yg(i, t) {
  const e = Zi(t, this.size, 16);
  i.uniformMatrix4fv(this.addr, !1, e);
}
function Mg(i, t) {
  i.uniform1iv(this.addr, t);
}
function bg(i, t) {
  i.uniform2iv(this.addr, t);
}
function Sg(i, t) {
  i.uniform3iv(this.addr, t);
}
function Eg(i, t) {
  i.uniform4iv(this.addr, t);
}
function wg(i, t) {
  i.uniform1uiv(this.addr, t);
}
function Tg(i, t) {
  i.uniform2uiv(this.addr, t);
}
function Ag(i, t) {
  i.uniform3uiv(this.addr, t);
}
function Cg(i, t) {
  i.uniform4uiv(this.addr, t);
}
function Rg(i, t, e) {
  const n = this.cache, s = t.length, r = Lr(e, s);
  ye(n, r) || (i.uniform1iv(this.addr, r), Me(n, r));
  for (let a = 0; a !== s; ++a)
    e.setTexture2D(t[a] || ph, r[a]);
}
function Pg(i, t, e) {
  const n = this.cache, s = t.length, r = Lr(e, s);
  ye(n, r) || (i.uniform1iv(this.addr, r), Me(n, r));
  for (let a = 0; a !== s; ++a)
    e.setTexture3D(t[a] || gh, r[a]);
}
function Lg(i, t, e) {
  const n = this.cache, s = t.length, r = Lr(e, s);
  ye(n, r) || (i.uniform1iv(this.addr, r), Me(n, r));
  for (let a = 0; a !== s; ++a)
    e.setTextureCube(t[a] || _h, r[a]);
}
function Dg(i, t, e) {
  const n = this.cache, s = t.length, r = Lr(e, s);
  ye(n, r) || (i.uniform1iv(this.addr, r), Me(n, r));
  for (let a = 0; a !== s; ++a)
    e.setTexture2DArray(t[a] || mh, r[a]);
}
function Ig(i) {
  switch (i) {
    case 5126:
      return pg;
    // FLOAT
    case 35664:
      return mg;
    // _VEC2
    case 35665:
      return gg;
    // _VEC3
    case 35666:
      return _g;
    // _VEC4
    case 35674:
      return vg;
    // _MAT2
    case 35675:
      return xg;
    // _MAT3
    case 35676:
      return yg;
    // _MAT4
    case 5124:
    case 35670:
      return Mg;
    // INT, BOOL
    case 35667:
    case 35671:
      return bg;
    // _VEC2
    case 35668:
    case 35672:
      return Sg;
    // _VEC3
    case 35669:
    case 35673:
      return Eg;
    // _VEC4
    case 5125:
      return wg;
    // UINT
    case 36294:
      return Tg;
    // _VEC2
    case 36295:
      return Ag;
    // _VEC3
    case 36296:
      return Cg;
    // _VEC4
    case 35678:
    // SAMPLER_2D
    case 36198:
    // SAMPLER_EXTERNAL_OES
    case 36298:
    // INT_SAMPLER_2D
    case 36306:
    // UNSIGNED_INT_SAMPLER_2D
    case 35682:
      return Rg;
    case 35679:
    // SAMPLER_3D
    case 36299:
    // INT_SAMPLER_3D
    case 36307:
      return Pg;
    case 35680:
    // SAMPLER_CUBE
    case 36300:
    // INT_SAMPLER_CUBE
    case 36308:
    // UNSIGNED_INT_SAMPLER_CUBE
    case 36293:
      return Lg;
    case 36289:
    // SAMPLER_2D_ARRAY
    case 36303:
    // INT_SAMPLER_2D_ARRAY
    case 36311:
    // UNSIGNED_INT_SAMPLER_2D_ARRAY
    case 36292:
      return Dg;
  }
}
class Ug {
  constructor(t, e, n) {
    this.id = t, this.addr = n, this.cache = [], this.type = e.type, this.setValue = fg(e.type);
  }
}
class Ng {
  constructor(t, e, n) {
    this.id = t, this.addr = n, this.cache = [], this.type = e.type, this.size = e.size, this.setValue = Ig(e.type);
  }
}
class Og {
  constructor(t) {
    this.id = t, this.seq = [], this.map = {};
  }
  setValue(t, e, n) {
    const s = this.seq;
    for (let r = 0, a = s.length; r !== a; ++r) {
      const o = s[r];
      o.setValue(t, e[o.id], n);
    }
  }
}
const fo = /(\w+)(\])?(\[|\.)?/g;
function ic(i, t) {
  i.seq.push(t), i.map[t.id] = t;
}
function Fg(i, t, e) {
  const n = i.name, s = n.length;
  for (fo.lastIndex = 0; ; ) {
    const r = fo.exec(n), a = fo.lastIndex;
    let o = r[1];
    const l = r[2] === "]", c = r[3];
    if (l && (o = o | 0), c === void 0 || c === "[" && a + 2 === s) {
      ic(e, c === void 0 ? new Ug(o, i, t) : new Ng(o, i, t));
      break;
    } else {
      let u = e.map[o];
      u === void 0 && (u = new Og(o), ic(e, u)), e = u;
    }
  }
}
class _r {
  constructor(t, e) {
    this.seq = [], this.map = {};
    const n = t.getProgramParameter(e, t.ACTIVE_UNIFORMS);
    for (let s = 0; s < n; ++s) {
      const r = t.getActiveUniform(e, s), a = t.getUniformLocation(e, r.name);
      Fg(r, a, this);
    }
  }
  setValue(t, e, n, s) {
    const r = this.map[e];
    r !== void 0 && r.setValue(t, n, s);
  }
  setOptional(t, e, n) {
    const s = e[n];
    s !== void 0 && this.setValue(t, n, s);
  }
  static upload(t, e, n, s) {
    for (let r = 0, a = e.length; r !== a; ++r) {
      const o = e[r], l = n[o.id];
      l.needsUpdate !== !1 && o.setValue(t, l.value, s);
    }
  }
  static seqWithValue(t, e) {
    const n = [];
    for (let s = 0, r = t.length; s !== r; ++s) {
      const a = t[s];
      a.id in e && n.push(a);
    }
    return n;
  }
}
function sc(i, t, e) {
  const n = i.createShader(t);
  return i.shaderSource(n, e), i.compileShader(n), n;
}
const kg = 37297;
let Bg = 0;
function zg(i, t) {
  const e = i.split(`
`), n = [], s = Math.max(t - 6, 0), r = Math.min(t + 6, e.length);
  for (let a = s; a < r; a++) {
    const o = a + 1;
    n.push(`${o === t ? ">" : " "} ${o}: ${e[a]}`);
  }
  return n.join(`
`);
}
const rc = /* @__PURE__ */ new Ht();
function Hg(i) {
  Kt._getMatrix(rc, Kt.workingColorSpace, i);
  const t = `mat3( ${rc.elements.map((e) => e.toFixed(4))} )`;
  switch (Kt.getTransfer(i)) {
    case Cr:
      return [t, "LinearTransferOETF"];
    case se:
      return [t, "sRGBTransferOETF"];
    default:
      return console.warn("THREE.WebGLProgram: Unsupported color space: ", i), [t, "LinearTransferOETF"];
  }
}
function oc(i, t, e) {
  const n = i.getShaderParameter(t, i.COMPILE_STATUS), s = i.getShaderInfoLog(t).trim();
  if (n && s === "") return "";
  const r = /ERROR: 0:(\d+)/.exec(s);
  if (r) {
    const a = parseInt(r[1]);
    return e.toUpperCase() + `

` + s + `

` + zg(i.getShaderSource(t), a);
  } else
    return s;
}
function Vg(i, t) {
  const e = Hg(t);
  return [
    `vec4 ${i}( vec4 value ) {`,
    `	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,
    "}"
  ].join(`
`);
}
function Gg(i, t) {
  let e;
  switch (t) {
    case Gu:
      e = "Linear";
      break;
    case $u:
      e = "Reinhard";
      break;
    case Wu:
      e = "Cineon";
      break;
    case Xu:
      e = "ACESFilmic";
      break;
    case qu:
      e = "AgX";
      break;
    case ju:
      e = "Neutral";
      break;
    case Yu:
      e = "Custom";
      break;
    default:
      console.warn("THREE.WebGLProgram: Unsupported toneMapping:", t), e = "Linear";
  }
  return "vec3 " + i + "( vec3 color ) { return " + e + "ToneMapping( color ); }";
}
const nr = /* @__PURE__ */ new L();
function $g() {
  Kt.getLuminanceCoefficients(nr);
  const i = nr.x.toFixed(4), t = nr.y.toFixed(4), e = nr.z.toFixed(4);
  return [
    "float luminance( const in vec3 rgb ) {",
    `	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,
    "	return dot( weights, rgb );",
    "}"
  ].join(`
`);
}
function Wg(i) {
  return [
    i.extensionClipCullDistance ? "#extension GL_ANGLE_clip_cull_distance : require" : "",
    i.extensionMultiDraw ? "#extension GL_ANGLE_multi_draw : require" : ""
  ].filter(hs).join(`
`);
}
function Xg(i) {
  const t = [];
  for (const e in i) {
    const n = i[e];
    n !== !1 && t.push("#define " + e + " " + n);
  }
  return t.join(`
`);
}
function Yg(i, t) {
  const e = {}, n = i.getProgramParameter(t, i.ACTIVE_ATTRIBUTES);
  for (let s = 0; s < n; s++) {
    const r = i.getActiveAttrib(t, s), a = r.name;
    let o = 1;
    r.type === i.FLOAT_MAT2 && (o = 2), r.type === i.FLOAT_MAT3 && (o = 3), r.type === i.FLOAT_MAT4 && (o = 4), e[a] = {
      type: r.type,
      location: i.getAttribLocation(t, a),
      locationSize: o
    };
  }
  return e;
}
function hs(i) {
  return i !== "";
}
function ac(i, t) {
  const e = t.numSpotLightShadows + t.numSpotLightMaps - t.numSpotLightShadowsWithMaps;
  return i.replace(/NUM_DIR_LIGHTS/g, t.numDirLights).replace(/NUM_SPOT_LIGHTS/g, t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, e).replace(/NUM_RECT_AREA_LIGHTS/g, t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, t.numPointLights).replace(/NUM_HEMI_LIGHTS/g, t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, t.numPointLightShadows);
}
function lc(i, t) {
  return i.replace(/NUM_CLIPPING_PLANES/g, t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, t.numClippingPlanes - t.numClipIntersection);
}
const qg = /^[ \t]*#include +<([\w\d./]+)>/gm;
function ha(i) {
  return i.replace(qg, Zg);
}
const jg = /* @__PURE__ */ new Map();
function Zg(i, t) {
  let e = Gt[t];
  if (e === void 0) {
    const n = jg.get(t);
    if (n !== void 0)
      e = Gt[n], console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.', t, n);
    else
      throw new Error("Can not resolve #include <" + t + ">");
  }
  return ha(e);
}
const Kg = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function cc(i) {
  return i.replace(Kg, Jg);
}
function Jg(i, t, e, n) {
  let s = "";
  for (let r = parseInt(t); r < parseInt(e); r++)
    s += n.replace(/\[\s*i\s*\]/g, "[ " + r + " ]").replace(/UNROLLED_LOOP_INDEX/g, r);
  return s;
}
function hc(i) {
  let t = `precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;
  return i.precision === "highp" ? t += `
#define HIGH_PRECISION` : i.precision === "mediump" ? t += `
#define MEDIUM_PRECISION` : i.precision === "lowp" && (t += `
#define LOW_PRECISION`), t;
}
function Qg(i) {
  let t = "SHADOWMAP_TYPE_BASIC";
  return i.shadowMapType === Vc ? t = "SHADOWMAP_TYPE_PCF" : i.shadowMapType === bu ? t = "SHADOWMAP_TYPE_PCF_SOFT" : i.shadowMapType === mn && (t = "SHADOWMAP_TYPE_VSM"), t;
}
function t_(i) {
  let t = "ENVMAP_TYPE_CUBE";
  if (i.envMap)
    switch (i.envMapMode) {
      case Gi:
      case $i:
        t = "ENVMAP_TYPE_CUBE";
        break;
      case Ar:
        t = "ENVMAP_TYPE_CUBE_UV";
        break;
    }
  return t;
}
function e_(i) {
  let t = "ENVMAP_MODE_REFLECTION";
  if (i.envMap)
    switch (i.envMapMode) {
      case $i:
        t = "ENVMAP_MODE_REFRACTION";
        break;
    }
  return t;
}
function n_(i) {
  let t = "ENVMAP_BLENDING_NONE";
  if (i.envMap)
    switch (i.combine) {
      case Gc:
        t = "ENVMAP_BLENDING_MULTIPLY";
        break;
      case Hu:
        t = "ENVMAP_BLENDING_MIX";
        break;
      case Vu:
        t = "ENVMAP_BLENDING_ADD";
        break;
    }
  return t;
}
function i_(i) {
  const t = i.envMapCubeUVHeight;
  if (t === null) return null;
  const e = Math.log2(t) - 2, n = 1 / t;
  return { texelWidth: 1 / (3 * Math.max(Math.pow(2, e), 112)), texelHeight: n, maxMip: e };
}
function s_(i, t, e, n) {
  const s = i.getContext(), r = e.defines;
  let a = e.vertexShader, o = e.fragmentShader;
  const l = Qg(e), c = t_(e), h = e_(e), u = n_(e), d = i_(e), p = Wg(e), g = Xg(r), _ = s.createProgram();
  let f, m, b = e.glslVersion ? "#version " + e.glslVersion + `
` : "";
  e.isRawShaderMaterial ? (f = [
    "#define SHADER_TYPE " + e.shaderType,
    "#define SHADER_NAME " + e.shaderName,
    g
  ].filter(hs).join(`
`), f.length > 0 && (f += `
`), m = [
    "#define SHADER_TYPE " + e.shaderType,
    "#define SHADER_NAME " + e.shaderName,
    g
  ].filter(hs).join(`
`), m.length > 0 && (m += `
`)) : (f = [
    hc(e),
    "#define SHADER_TYPE " + e.shaderType,
    "#define SHADER_NAME " + e.shaderName,
    g,
    e.extensionClipCullDistance ? "#define USE_CLIP_DISTANCE" : "",
    e.batching ? "#define USE_BATCHING" : "",
    e.batchingColor ? "#define USE_BATCHING_COLOR" : "",
    e.instancing ? "#define USE_INSTANCING" : "",
    e.instancingColor ? "#define USE_INSTANCING_COLOR" : "",
    e.instancingMorph ? "#define USE_INSTANCING_MORPH" : "",
    e.useFog && e.fog ? "#define USE_FOG" : "",
    e.useFog && e.fogExp2 ? "#define FOG_EXP2" : "",
    e.map ? "#define USE_MAP" : "",
    e.envMap ? "#define USE_ENVMAP" : "",
    e.envMap ? "#define " + h : "",
    e.lightMap ? "#define USE_LIGHTMAP" : "",
    e.aoMap ? "#define USE_AOMAP" : "",
    e.bumpMap ? "#define USE_BUMPMAP" : "",
    e.normalMap ? "#define USE_NORMALMAP" : "",
    e.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
    e.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
    e.displacementMap ? "#define USE_DISPLACEMENTMAP" : "",
    e.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
    e.anisotropy ? "#define USE_ANISOTROPY" : "",
    e.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
    e.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
    e.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
    e.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
    e.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
    e.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
    e.specularMap ? "#define USE_SPECULARMAP" : "",
    e.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
    e.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
    e.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
    e.metalnessMap ? "#define USE_METALNESSMAP" : "",
    e.alphaMap ? "#define USE_ALPHAMAP" : "",
    e.alphaHash ? "#define USE_ALPHAHASH" : "",
    e.transmission ? "#define USE_TRANSMISSION" : "",
    e.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
    e.thicknessMap ? "#define USE_THICKNESSMAP" : "",
    e.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
    e.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
    //
    e.mapUv ? "#define MAP_UV " + e.mapUv : "",
    e.alphaMapUv ? "#define ALPHAMAP_UV " + e.alphaMapUv : "",
    e.lightMapUv ? "#define LIGHTMAP_UV " + e.lightMapUv : "",
    e.aoMapUv ? "#define AOMAP_UV " + e.aoMapUv : "",
    e.emissiveMapUv ? "#define EMISSIVEMAP_UV " + e.emissiveMapUv : "",
    e.bumpMapUv ? "#define BUMPMAP_UV " + e.bumpMapUv : "",
    e.normalMapUv ? "#define NORMALMAP_UV " + e.normalMapUv : "",
    e.displacementMapUv ? "#define DISPLACEMENTMAP_UV " + e.displacementMapUv : "",
    e.metalnessMapUv ? "#define METALNESSMAP_UV " + e.metalnessMapUv : "",
    e.roughnessMapUv ? "#define ROUGHNESSMAP_UV " + e.roughnessMapUv : "",
    e.anisotropyMapUv ? "#define ANISOTROPYMAP_UV " + e.anisotropyMapUv : "",
    e.clearcoatMapUv ? "#define CLEARCOATMAP_UV " + e.clearcoatMapUv : "",
    e.clearcoatNormalMapUv ? "#define CLEARCOAT_NORMALMAP_UV " + e.clearcoatNormalMapUv : "",
    e.clearcoatRoughnessMapUv ? "#define CLEARCOAT_ROUGHNESSMAP_UV " + e.clearcoatRoughnessMapUv : "",
    e.iridescenceMapUv ? "#define IRIDESCENCEMAP_UV " + e.iridescenceMapUv : "",
    e.iridescenceThicknessMapUv ? "#define IRIDESCENCE_THICKNESSMAP_UV " + e.iridescenceThicknessMapUv : "",
    e.sheenColorMapUv ? "#define SHEEN_COLORMAP_UV " + e.sheenColorMapUv : "",
    e.sheenRoughnessMapUv ? "#define SHEEN_ROUGHNESSMAP_UV " + e.sheenRoughnessMapUv : "",
    e.specularMapUv ? "#define SPECULARMAP_UV " + e.specularMapUv : "",
    e.specularColorMapUv ? "#define SPECULAR_COLORMAP_UV " + e.specularColorMapUv : "",
    e.specularIntensityMapUv ? "#define SPECULAR_INTENSITYMAP_UV " + e.specularIntensityMapUv : "",
    e.transmissionMapUv ? "#define TRANSMISSIONMAP_UV " + e.transmissionMapUv : "",
    e.thicknessMapUv ? "#define THICKNESSMAP_UV " + e.thicknessMapUv : "",
    //
    e.vertexTangents && e.flatShading === !1 ? "#define USE_TANGENT" : "",
    e.vertexColors ? "#define USE_COLOR" : "",
    e.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
    e.vertexUv1s ? "#define USE_UV1" : "",
    e.vertexUv2s ? "#define USE_UV2" : "",
    e.vertexUv3s ? "#define USE_UV3" : "",
    e.pointsUvs ? "#define USE_POINTS_UV" : "",
    e.flatShading ? "#define FLAT_SHADED" : "",
    e.skinning ? "#define USE_SKINNING" : "",
    e.morphTargets ? "#define USE_MORPHTARGETS" : "",
    e.morphNormals && e.flatShading === !1 ? "#define USE_MORPHNORMALS" : "",
    e.morphColors ? "#define USE_MORPHCOLORS" : "",
    e.morphTargetsCount > 0 ? "#define MORPHTARGETS_TEXTURE_STRIDE " + e.morphTextureStride : "",
    e.morphTargetsCount > 0 ? "#define MORPHTARGETS_COUNT " + e.morphTargetsCount : "",
    e.doubleSided ? "#define DOUBLE_SIDED" : "",
    e.flipSided ? "#define FLIP_SIDED" : "",
    e.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
    e.shadowMapEnabled ? "#define " + l : "",
    e.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "",
    e.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
    e.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "",
    e.reverseDepthBuffer ? "#define USE_REVERSEDEPTHBUF" : "",
    "uniform mat4 modelMatrix;",
    "uniform mat4 modelViewMatrix;",
    "uniform mat4 projectionMatrix;",
    "uniform mat4 viewMatrix;",
    "uniform mat3 normalMatrix;",
    "uniform vec3 cameraPosition;",
    "uniform bool isOrthographic;",
    "#ifdef USE_INSTANCING",
    "	attribute mat4 instanceMatrix;",
    "#endif",
    "#ifdef USE_INSTANCING_COLOR",
    "	attribute vec3 instanceColor;",
    "#endif",
    "#ifdef USE_INSTANCING_MORPH",
    "	uniform sampler2D morphTexture;",
    "#endif",
    "attribute vec3 position;",
    "attribute vec3 normal;",
    "attribute vec2 uv;",
    "#ifdef USE_UV1",
    "	attribute vec2 uv1;",
    "#endif",
    "#ifdef USE_UV2",
    "	attribute vec2 uv2;",
    "#endif",
    "#ifdef USE_UV3",
    "	attribute vec2 uv3;",
    "#endif",
    "#ifdef USE_TANGENT",
    "	attribute vec4 tangent;",
    "#endif",
    "#if defined( USE_COLOR_ALPHA )",
    "	attribute vec4 color;",
    "#elif defined( USE_COLOR )",
    "	attribute vec3 color;",
    "#endif",
    "#ifdef USE_SKINNING",
    "	attribute vec4 skinIndex;",
    "	attribute vec4 skinWeight;",
    "#endif",
    `
`
  ].filter(hs).join(`
`), m = [
    hc(e),
    "#define SHADER_TYPE " + e.shaderType,
    "#define SHADER_NAME " + e.shaderName,
    g,
    e.useFog && e.fog ? "#define USE_FOG" : "",
    e.useFog && e.fogExp2 ? "#define FOG_EXP2" : "",
    e.alphaToCoverage ? "#define ALPHA_TO_COVERAGE" : "",
    e.map ? "#define USE_MAP" : "",
    e.matcap ? "#define USE_MATCAP" : "",
    e.envMap ? "#define USE_ENVMAP" : "",
    e.envMap ? "#define " + c : "",
    e.envMap ? "#define " + h : "",
    e.envMap ? "#define " + u : "",
    d ? "#define CUBEUV_TEXEL_WIDTH " + d.texelWidth : "",
    d ? "#define CUBEUV_TEXEL_HEIGHT " + d.texelHeight : "",
    d ? "#define CUBEUV_MAX_MIP " + d.maxMip + ".0" : "",
    e.lightMap ? "#define USE_LIGHTMAP" : "",
    e.aoMap ? "#define USE_AOMAP" : "",
    e.bumpMap ? "#define USE_BUMPMAP" : "",
    e.normalMap ? "#define USE_NORMALMAP" : "",
    e.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
    e.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
    e.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
    e.anisotropy ? "#define USE_ANISOTROPY" : "",
    e.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
    e.clearcoat ? "#define USE_CLEARCOAT" : "",
    e.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
    e.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
    e.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
    e.dispersion ? "#define USE_DISPERSION" : "",
    e.iridescence ? "#define USE_IRIDESCENCE" : "",
    e.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
    e.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
    e.specularMap ? "#define USE_SPECULARMAP" : "",
    e.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
    e.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
    e.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
    e.metalnessMap ? "#define USE_METALNESSMAP" : "",
    e.alphaMap ? "#define USE_ALPHAMAP" : "",
    e.alphaTest ? "#define USE_ALPHATEST" : "",
    e.alphaHash ? "#define USE_ALPHAHASH" : "",
    e.sheen ? "#define USE_SHEEN" : "",
    e.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
    e.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
    e.transmission ? "#define USE_TRANSMISSION" : "",
    e.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
    e.thicknessMap ? "#define USE_THICKNESSMAP" : "",
    e.vertexTangents && e.flatShading === !1 ? "#define USE_TANGENT" : "",
    e.vertexColors || e.instancingColor || e.batchingColor ? "#define USE_COLOR" : "",
    e.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
    e.vertexUv1s ? "#define USE_UV1" : "",
    e.vertexUv2s ? "#define USE_UV2" : "",
    e.vertexUv3s ? "#define USE_UV3" : "",
    e.pointsUvs ? "#define USE_POINTS_UV" : "",
    e.gradientMap ? "#define USE_GRADIENTMAP" : "",
    e.flatShading ? "#define FLAT_SHADED" : "",
    e.doubleSided ? "#define DOUBLE_SIDED" : "",
    e.flipSided ? "#define FLIP_SIDED" : "",
    e.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
    e.shadowMapEnabled ? "#define " + l : "",
    e.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "",
    e.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
    e.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "",
    e.decodeVideoTextureEmissive ? "#define DECODE_VIDEO_TEXTURE_EMISSIVE" : "",
    e.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "",
    e.reverseDepthBuffer ? "#define USE_REVERSEDEPTHBUF" : "",
    "uniform mat4 viewMatrix;",
    "uniform vec3 cameraPosition;",
    "uniform bool isOrthographic;",
    e.toneMapping !== Nn ? "#define TONE_MAPPING" : "",
    e.toneMapping !== Nn ? Gt.tonemapping_pars_fragment : "",
    // this code is required here because it is used by the toneMapping() function defined below
    e.toneMapping !== Nn ? Gg("toneMapping", e.toneMapping) : "",
    e.dithering ? "#define DITHERING" : "",
    e.opaque ? "#define OPAQUE" : "",
    Gt.colorspace_pars_fragment,
    // this code is required here because it is used by the various encoding/decoding function defined below
    Vg("linearToOutputTexel", e.outputColorSpace),
    $g(),
    e.useDepthPacking ? "#define DEPTH_PACKING " + e.depthPacking : "",
    `
`
  ].filter(hs).join(`
`)), a = ha(a), a = ac(a, e), a = lc(a, e), o = ha(o), o = ac(o, e), o = lc(o, e), a = cc(a), o = cc(o), e.isRawShaderMaterial !== !0 && (b = `#version 300 es
`, f = [
    p,
    "#define attribute in",
    "#define varying out",
    "#define texture2D texture"
  ].join(`
`) + `
` + f, m = [
    "#define varying in",
    e.glslVersion === bl ? "" : "layout(location = 0) out highp vec4 pc_fragColor;",
    e.glslVersion === bl ? "" : "#define gl_FragColor pc_fragColor",
    "#define gl_FragDepthEXT gl_FragDepth",
    "#define texture2D texture",
    "#define textureCube texture",
    "#define texture2DProj textureProj",
    "#define texture2DLodEXT textureLod",
    "#define texture2DProjLodEXT textureProjLod",
    "#define textureCubeLodEXT textureLod",
    "#define texture2DGradEXT textureGrad",
    "#define texture2DProjGradEXT textureProjGrad",
    "#define textureCubeGradEXT textureGrad"
  ].join(`
`) + `
` + m);
  const x = b + f + a, v = b + m + o, w = sc(s, s.VERTEX_SHADER, x), A = sc(s, s.FRAGMENT_SHADER, v);
  s.attachShader(_, w), s.attachShader(_, A), e.index0AttributeName !== void 0 ? s.bindAttribLocation(_, 0, e.index0AttributeName) : e.morphTargets === !0 && s.bindAttribLocation(_, 0, "position"), s.linkProgram(_);
  function C(P) {
    if (i.debug.checkShaderErrors) {
      const z = s.getProgramInfoLog(_).trim(), O = s.getShaderInfoLog(w).trim(), F = s.getShaderInfoLog(A).trim();
      let W = !0, H = !0;
      if (s.getProgramParameter(_, s.LINK_STATUS) === !1)
        if (W = !1, typeof i.debug.onShaderError == "function")
          i.debug.onShaderError(s, _, w, A);
        else {
          const J = oc(s, w, "vertex"), k = oc(s, A, "fragment");
          console.error(
            "THREE.WebGLProgram: Shader Error " + s.getError() + " - VALIDATE_STATUS " + s.getProgramParameter(_, s.VALIDATE_STATUS) + `

Material Name: ` + P.name + `
Material Type: ` + P.type + `

Program Info Log: ` + z + `
` + J + `
` + k
          );
        }
      else z !== "" ? console.warn("THREE.WebGLProgram: Program Info Log:", z) : (O === "" || F === "") && (H = !1);
      H && (P.diagnostics = {
        runnable: W,
        programLog: z,
        vertexShader: {
          log: O,
          prefix: f
        },
        fragmentShader: {
          log: F,
          prefix: m
        }
      });
    }
    s.deleteShader(w), s.deleteShader(A), D = new _r(s, _), S = Yg(s, _);
  }
  let D;
  this.getUniforms = function() {
    return D === void 0 && C(this), D;
  };
  let S;
  this.getAttributes = function() {
    return S === void 0 && C(this), S;
  };
  let M = e.rendererExtensionParallelShaderCompile === !1;
  return this.isReady = function() {
    return M === !1 && (M = s.getProgramParameter(_, kg)), M;
  }, this.destroy = function() {
    n.releaseStatesOfProgram(this), s.deleteProgram(_), this.program = void 0;
  }, this.type = e.shaderType, this.name = e.shaderName, this.id = Bg++, this.cacheKey = t, this.usedTimes = 1, this.program = _, this.vertexShader = w, this.fragmentShader = A, this;
}
let r_ = 0;
class o_ {
  constructor() {
    this.shaderCache = /* @__PURE__ */ new Map(), this.materialCache = /* @__PURE__ */ new Map();
  }
  update(t) {
    const e = t.vertexShader, n = t.fragmentShader, s = this._getShaderStage(e), r = this._getShaderStage(n), a = this._getShaderCacheForMaterial(t);
    return a.has(s) === !1 && (a.add(s), s.usedTimes++), a.has(r) === !1 && (a.add(r), r.usedTimes++), this;
  }
  remove(t) {
    const e = this.materialCache.get(t);
    for (const n of e)
      n.usedTimes--, n.usedTimes === 0 && this.shaderCache.delete(n.code);
    return this.materialCache.delete(t), this;
  }
  getVertexShaderID(t) {
    return this._getShaderStage(t.vertexShader).id;
  }
  getFragmentShaderID(t) {
    return this._getShaderStage(t.fragmentShader).id;
  }
  dispose() {
    this.shaderCache.clear(), this.materialCache.clear();
  }
  _getShaderCacheForMaterial(t) {
    const e = this.materialCache;
    let n = e.get(t);
    return n === void 0 && (n = /* @__PURE__ */ new Set(), e.set(t, n)), n;
  }
  _getShaderStage(t) {
    const e = this.shaderCache;
    let n = e.get(t);
    return n === void 0 && (n = new a_(t), e.set(t, n)), n;
  }
}
class a_ {
  constructor(t) {
    this.id = r_++, this.code = t, this.usedTimes = 0;
  }
}
function l_(i, t, e, n, s, r, a) {
  const o = new Ua(), l = new o_(), c = /* @__PURE__ */ new Set(), h = [], u = s.logarithmicDepthBuffer, d = s.vertexTextures;
  let p = s.precision;
  const g = {
    MeshDepthMaterial: "depth",
    MeshDistanceMaterial: "distanceRGBA",
    MeshNormalMaterial: "normal",
    MeshBasicMaterial: "basic",
    MeshLambertMaterial: "lambert",
    MeshPhongMaterial: "phong",
    MeshToonMaterial: "toon",
    MeshStandardMaterial: "physical",
    MeshPhysicalMaterial: "physical",
    MeshMatcapMaterial: "matcap",
    LineBasicMaterial: "basic",
    LineDashedMaterial: "dashed",
    PointsMaterial: "points",
    ShadowMaterial: "shadow",
    SpriteMaterial: "sprite"
  };
  function _(S) {
    return c.add(S), S === 0 ? "uv" : `uv${S}`;
  }
  function f(S, M, P, z, O) {
    const F = z.fog, W = O.geometry, H = S.isMeshStandardMaterial ? z.environment : null, J = (S.isMeshStandardMaterial ? e : t).get(S.envMap || H), k = J && J.mapping === Ar ? J.image.height : null, tt = g[S.type];
    S.precision !== null && (p = s.getMaxPrecision(S.precision), p !== S.precision && console.warn("THREE.WebGLProgram.getParameters:", S.precision, "not supported, using", p, "instead."));
    const nt = W.morphAttributes.position || W.morphAttributes.normal || W.morphAttributes.color, ht = nt !== void 0 ? nt.length : 0;
    let Pt = 0;
    W.morphAttributes.position !== void 0 && (Pt = 1), W.morphAttributes.normal !== void 0 && (Pt = 2), W.morphAttributes.color !== void 0 && (Pt = 3);
    let Yt, Y, st, bt;
    if (tt) {
      const ne = en[tt];
      Yt = ne.vertexShader, Y = ne.fragmentShader;
    } else
      Yt = S.vertexShader, Y = S.fragmentShader, l.update(S), st = l.getVertexShaderID(S), bt = l.getFragmentShaderID(S);
    const at = i.getRenderTarget(), Dt = i.state.buffers.depth.getReversed(), Ft = O.isInstancedMesh === !0, Nt = O.isBatchedMesh === !0, Zt = !!S.map, Z = !!S.matcap, rt = !!J, R = !!S.aoMap, Ct = !!S.lightMap, Q = !!S.bumpMap, vt = !!S.normalMap, lt = !!S.displacementMap, It = !!S.emissiveMap, gt = !!S.metalnessMap, T = !!S.roughnessMap, y = S.anisotropy > 0, B = S.clearcoat > 0, X = S.dispersion > 0, K = S.iridescence > 0, q = S.sheen > 0, Et = S.transmission > 0, ut = y && !!S.anisotropyMap, _t = B && !!S.clearcoatMap, Xt = B && !!S.clearcoatNormalMap, it = B && !!S.clearcoatRoughnessMap, xt = K && !!S.iridescenceMap, Ut = K && !!S.iridescenceThicknessMap, Ot = q && !!S.sheenColorMap, yt = q && !!S.sheenRoughnessMap, jt = !!S.specularMap, Vt = !!S.specularColorMap, ce = !!S.specularIntensityMap, I = Et && !!S.transmissionMap, dt = Et && !!S.thicknessMap, $ = !!S.gradientMap, j = !!S.alphaMap, mt = S.alphaTest > 0, ft = !!S.alphaHash, Bt = !!S.extensions;
    let ge = Nn;
    S.toneMapped && (at === null || at.isXRRenderTarget === !0) && (ge = i.toneMapping);
    const we = {
      shaderID: tt,
      shaderType: S.type,
      shaderName: S.name,
      vertexShader: Yt,
      fragmentShader: Y,
      defines: S.defines,
      customVertexShaderID: st,
      customFragmentShaderID: bt,
      isRawShaderMaterial: S.isRawShaderMaterial === !0,
      glslVersion: S.glslVersion,
      precision: p,
      batching: Nt,
      batchingColor: Nt && O._colorsTexture !== null,
      instancing: Ft,
      instancingColor: Ft && O.instanceColor !== null,
      instancingMorph: Ft && O.morphTexture !== null,
      supportsVertexTextures: d,
      outputColorSpace: at === null ? i.outputColorSpace : at.isXRRenderTarget === !0 ? at.texture.colorSpace : qi,
      alphaToCoverage: !!S.alphaToCoverage,
      map: Zt,
      matcap: Z,
      envMap: rt,
      envMapMode: rt && J.mapping,
      envMapCubeUVHeight: k,
      aoMap: R,
      lightMap: Ct,
      bumpMap: Q,
      normalMap: vt,
      displacementMap: d && lt,
      emissiveMap: It,
      normalMapObjectSpace: vt && S.normalMapType === Qu,
      normalMapTangentSpace: vt && S.normalMapType === eh,
      metalnessMap: gt,
      roughnessMap: T,
      anisotropy: y,
      anisotropyMap: ut,
      clearcoat: B,
      clearcoatMap: _t,
      clearcoatNormalMap: Xt,
      clearcoatRoughnessMap: it,
      dispersion: X,
      iridescence: K,
      iridescenceMap: xt,
      iridescenceThicknessMap: Ut,
      sheen: q,
      sheenColorMap: Ot,
      sheenRoughnessMap: yt,
      specularMap: jt,
      specularColorMap: Vt,
      specularIntensityMap: ce,
      transmission: Et,
      transmissionMap: I,
      thicknessMap: dt,
      gradientMap: $,
      opaque: S.transparent === !1 && S.blending === Fi && S.alphaToCoverage === !1,
      alphaMap: j,
      alphaTest: mt,
      alphaHash: ft,
      combine: S.combine,
      //
      mapUv: Zt && _(S.map.channel),
      aoMapUv: R && _(S.aoMap.channel),
      lightMapUv: Ct && _(S.lightMap.channel),
      bumpMapUv: Q && _(S.bumpMap.channel),
      normalMapUv: vt && _(S.normalMap.channel),
      displacementMapUv: lt && _(S.displacementMap.channel),
      emissiveMapUv: It && _(S.emissiveMap.channel),
      metalnessMapUv: gt && _(S.metalnessMap.channel),
      roughnessMapUv: T && _(S.roughnessMap.channel),
      anisotropyMapUv: ut && _(S.anisotropyMap.channel),
      clearcoatMapUv: _t && _(S.clearcoatMap.channel),
      clearcoatNormalMapUv: Xt && _(S.clearcoatNormalMap.channel),
      clearcoatRoughnessMapUv: it && _(S.clearcoatRoughnessMap.channel),
      iridescenceMapUv: xt && _(S.iridescenceMap.channel),
      iridescenceThicknessMapUv: Ut && _(S.iridescenceThicknessMap.channel),
      sheenColorMapUv: Ot && _(S.sheenColorMap.channel),
      sheenRoughnessMapUv: yt && _(S.sheenRoughnessMap.channel),
      specularMapUv: jt && _(S.specularMap.channel),
      specularColorMapUv: Vt && _(S.specularColorMap.channel),
      specularIntensityMapUv: ce && _(S.specularIntensityMap.channel),
      transmissionMapUv: I && _(S.transmissionMap.channel),
      thicknessMapUv: dt && _(S.thicknessMap.channel),
      alphaMapUv: j && _(S.alphaMap.channel),
      //
      vertexTangents: !!W.attributes.tangent && (vt || y),
      vertexColors: S.vertexColors,
      vertexAlphas: S.vertexColors === !0 && !!W.attributes.color && W.attributes.color.itemSize === 4,
      pointsUvs: O.isPoints === !0 && !!W.attributes.uv && (Zt || j),
      fog: !!F,
      useFog: S.fog === !0,
      fogExp2: !!F && F.isFogExp2,
      flatShading: S.flatShading === !0,
      sizeAttenuation: S.sizeAttenuation === !0,
      logarithmicDepthBuffer: u,
      reverseDepthBuffer: Dt,
      skinning: O.isSkinnedMesh === !0,
      morphTargets: W.morphAttributes.position !== void 0,
      morphNormals: W.morphAttributes.normal !== void 0,
      morphColors: W.morphAttributes.color !== void 0,
      morphTargetsCount: ht,
      morphTextureStride: Pt,
      numDirLights: M.directional.length,
      numPointLights: M.point.length,
      numSpotLights: M.spot.length,
      numSpotLightMaps: M.spotLightMap.length,
      numRectAreaLights: M.rectArea.length,
      numHemiLights: M.hemi.length,
      numDirLightShadows: M.directionalShadowMap.length,
      numPointLightShadows: M.pointShadowMap.length,
      numSpotLightShadows: M.spotShadowMap.length,
      numSpotLightShadowsWithMaps: M.numSpotLightShadowsWithMaps,
      numLightProbes: M.numLightProbes,
      numClippingPlanes: a.numPlanes,
      numClipIntersection: a.numIntersection,
      dithering: S.dithering,
      shadowMapEnabled: i.shadowMap.enabled && P.length > 0,
      shadowMapType: i.shadowMap.type,
      toneMapping: ge,
      decodeVideoTexture: Zt && S.map.isVideoTexture === !0 && Kt.getTransfer(S.map.colorSpace) === se,
      decodeVideoTextureEmissive: It && S.emissiveMap.isVideoTexture === !0 && Kt.getTransfer(S.emissiveMap.colorSpace) === se,
      premultipliedAlpha: S.premultipliedAlpha,
      doubleSided: S.side === $e,
      flipSided: S.side === Ne,
      useDepthPacking: S.depthPacking >= 0,
      depthPacking: S.depthPacking || 0,
      index0AttributeName: S.index0AttributeName,
      extensionClipCullDistance: Bt && S.extensions.clipCullDistance === !0 && n.has("WEBGL_clip_cull_distance"),
      extensionMultiDraw: (Bt && S.extensions.multiDraw === !0 || Nt) && n.has("WEBGL_multi_draw"),
      rendererExtensionParallelShaderCompile: n.has("KHR_parallel_shader_compile"),
      customProgramCacheKey: S.customProgramCacheKey()
    };
    return we.vertexUv1s = c.has(1), we.vertexUv2s = c.has(2), we.vertexUv3s = c.has(3), c.clear(), we;
  }
  function m(S) {
    const M = [];
    if (S.shaderID ? M.push(S.shaderID) : (M.push(S.customVertexShaderID), M.push(S.customFragmentShaderID)), S.defines !== void 0)
      for (const P in S.defines)
        M.push(P), M.push(S.defines[P]);
    return S.isRawShaderMaterial === !1 && (b(M, S), x(M, S), M.push(i.outputColorSpace)), M.push(S.customProgramCacheKey), M.join();
  }
  function b(S, M) {
    S.push(M.precision), S.push(M.outputColorSpace), S.push(M.envMapMode), S.push(M.envMapCubeUVHeight), S.push(M.mapUv), S.push(M.alphaMapUv), S.push(M.lightMapUv), S.push(M.aoMapUv), S.push(M.bumpMapUv), S.push(M.normalMapUv), S.push(M.displacementMapUv), S.push(M.emissiveMapUv), S.push(M.metalnessMapUv), S.push(M.roughnessMapUv), S.push(M.anisotropyMapUv), S.push(M.clearcoatMapUv), S.push(M.clearcoatNormalMapUv), S.push(M.clearcoatRoughnessMapUv), S.push(M.iridescenceMapUv), S.push(M.iridescenceThicknessMapUv), S.push(M.sheenColorMapUv), S.push(M.sheenRoughnessMapUv), S.push(M.specularMapUv), S.push(M.specularColorMapUv), S.push(M.specularIntensityMapUv), S.push(M.transmissionMapUv), S.push(M.thicknessMapUv), S.push(M.combine), S.push(M.fogExp2), S.push(M.sizeAttenuation), S.push(M.morphTargetsCount), S.push(M.morphAttributeCount), S.push(M.numDirLights), S.push(M.numPointLights), S.push(M.numSpotLights), S.push(M.numSpotLightMaps), S.push(M.numHemiLights), S.push(M.numRectAreaLights), S.push(M.numDirLightShadows), S.push(M.numPointLightShadows), S.push(M.numSpotLightShadows), S.push(M.numSpotLightShadowsWithMaps), S.push(M.numLightProbes), S.push(M.shadowMapType), S.push(M.toneMapping), S.push(M.numClippingPlanes), S.push(M.numClipIntersection), S.push(M.depthPacking);
  }
  function x(S, M) {
    o.disableAll(), M.supportsVertexTextures && o.enable(0), M.instancing && o.enable(1), M.instancingColor && o.enable(2), M.instancingMorph && o.enable(3), M.matcap && o.enable(4), M.envMap && o.enable(5), M.normalMapObjectSpace && o.enable(6), M.normalMapTangentSpace && o.enable(7), M.clearcoat && o.enable(8), M.iridescence && o.enable(9), M.alphaTest && o.enable(10), M.vertexColors && o.enable(11), M.vertexAlphas && o.enable(12), M.vertexUv1s && o.enable(13), M.vertexUv2s && o.enable(14), M.vertexUv3s && o.enable(15), M.vertexTangents && o.enable(16), M.anisotropy && o.enable(17), M.alphaHash && o.enable(18), M.batching && o.enable(19), M.dispersion && o.enable(20), M.batchingColor && o.enable(21), S.push(o.mask), o.disableAll(), M.fog && o.enable(0), M.useFog && o.enable(1), M.flatShading && o.enable(2), M.logarithmicDepthBuffer && o.enable(3), M.reverseDepthBuffer && o.enable(4), M.skinning && o.enable(5), M.morphTargets && o.enable(6), M.morphNormals && o.enable(7), M.morphColors && o.enable(8), M.premultipliedAlpha && o.enable(9), M.shadowMapEnabled && o.enable(10), M.doubleSided && o.enable(11), M.flipSided && o.enable(12), M.useDepthPacking && o.enable(13), M.dithering && o.enable(14), M.transmission && o.enable(15), M.sheen && o.enable(16), M.opaque && o.enable(17), M.pointsUvs && o.enable(18), M.decodeVideoTexture && o.enable(19), M.decodeVideoTextureEmissive && o.enable(20), M.alphaToCoverage && o.enable(21), S.push(o.mask);
  }
  function v(S) {
    const M = g[S.type];
    let P;
    if (M) {
      const z = en[M];
      P = Gd.clone(z.uniforms);
    } else
      P = S.uniforms;
    return P;
  }
  function w(S, M) {
    let P;
    for (let z = 0, O = h.length; z < O; z++) {
      const F = h[z];
      if (F.cacheKey === M) {
        P = F, ++P.usedTimes;
        break;
      }
    }
    return P === void 0 && (P = new s_(i, M, S, r), h.push(P)), P;
  }
  function A(S) {
    if (--S.usedTimes === 0) {
      const M = h.indexOf(S);
      h[M] = h[h.length - 1], h.pop(), S.destroy();
    }
  }
  function C(S) {
    l.remove(S);
  }
  function D() {
    l.dispose();
  }
  return {
    getParameters: f,
    getProgramCacheKey: m,
    getUniforms: v,
    acquireProgram: w,
    releaseProgram: A,
    releaseShaderCache: C,
    // Exposed for resource monitoring & error feedback via renderer.info:
    programs: h,
    dispose: D
  };
}
function c_() {
  let i = /* @__PURE__ */ new WeakMap();
  function t(a) {
    return i.has(a);
  }
  function e(a) {
    let o = i.get(a);
    return o === void 0 && (o = {}, i.set(a, o)), o;
  }
  function n(a) {
    i.delete(a);
  }
  function s(a, o, l) {
    i.get(a)[o] = l;
  }
  function r() {
    i = /* @__PURE__ */ new WeakMap();
  }
  return {
    has: t,
    get: e,
    remove: n,
    update: s,
    dispose: r
  };
}
function h_(i, t) {
  return i.groupOrder !== t.groupOrder ? i.groupOrder - t.groupOrder : i.renderOrder !== t.renderOrder ? i.renderOrder - t.renderOrder : i.material.id !== t.material.id ? i.material.id - t.material.id : i.z !== t.z ? i.z - t.z : i.id - t.id;
}
function uc(i, t) {
  return i.groupOrder !== t.groupOrder ? i.groupOrder - t.groupOrder : i.renderOrder !== t.renderOrder ? i.renderOrder - t.renderOrder : i.z !== t.z ? t.z - i.z : i.id - t.id;
}
function dc() {
  const i = [];
  let t = 0;
  const e = [], n = [], s = [];
  function r() {
    t = 0, e.length = 0, n.length = 0, s.length = 0;
  }
  function a(u, d, p, g, _, f) {
    let m = i[t];
    return m === void 0 ? (m = {
      id: u.id,
      object: u,
      geometry: d,
      material: p,
      groupOrder: g,
      renderOrder: u.renderOrder,
      z: _,
      group: f
    }, i[t] = m) : (m.id = u.id, m.object = u, m.geometry = d, m.material = p, m.groupOrder = g, m.renderOrder = u.renderOrder, m.z = _, m.group = f), t++, m;
  }
  function o(u, d, p, g, _, f) {
    const m = a(u, d, p, g, _, f);
    p.transmission > 0 ? n.push(m) : p.transparent === !0 ? s.push(m) : e.push(m);
  }
  function l(u, d, p, g, _, f) {
    const m = a(u, d, p, g, _, f);
    p.transmission > 0 ? n.unshift(m) : p.transparent === !0 ? s.unshift(m) : e.unshift(m);
  }
  function c(u, d) {
    e.length > 1 && e.sort(u || h_), n.length > 1 && n.sort(d || uc), s.length > 1 && s.sort(d || uc);
  }
  function h() {
    for (let u = t, d = i.length; u < d; u++) {
      const p = i[u];
      if (p.id === null) break;
      p.id = null, p.object = null, p.geometry = null, p.material = null, p.group = null;
    }
  }
  return {
    opaque: e,
    transmissive: n,
    transparent: s,
    init: r,
    push: o,
    unshift: l,
    finish: h,
    sort: c
  };
}
function u_() {
  let i = /* @__PURE__ */ new WeakMap();
  function t(n, s) {
    const r = i.get(n);
    let a;
    return r === void 0 ? (a = new dc(), i.set(n, [a])) : s >= r.length ? (a = new dc(), r.push(a)) : a = r[s], a;
  }
  function e() {
    i = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: t,
    dispose: e
  };
}
function d_() {
  const i = {};
  return {
    get: function(t) {
      if (i[t.id] !== void 0)
        return i[t.id];
      let e;
      switch (t.type) {
        case "DirectionalLight":
          e = {
            direction: new L(),
            color: new Wt()
          };
          break;
        case "SpotLight":
          e = {
            position: new L(),
            direction: new L(),
            color: new Wt(),
            distance: 0,
            coneCos: 0,
            penumbraCos: 0,
            decay: 0
          };
          break;
        case "PointLight":
          e = {
            position: new L(),
            color: new Wt(),
            distance: 0,
            decay: 0
          };
          break;
        case "HemisphereLight":
          e = {
            direction: new L(),
            skyColor: new Wt(),
            groundColor: new Wt()
          };
          break;
        case "RectAreaLight":
          e = {
            color: new Wt(),
            position: new L(),
            halfWidth: new L(),
            halfHeight: new L()
          };
          break;
      }
      return i[t.id] = e, e;
    }
  };
}
function f_() {
  const i = {};
  return {
    get: function(t) {
      if (i[t.id] !== void 0)
        return i[t.id];
      let e;
      switch (t.type) {
        case "DirectionalLight":
          e = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new et()
          };
          break;
        case "SpotLight":
          e = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new et()
          };
          break;
        case "PointLight":
          e = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new et(),
            shadowCameraNear: 1,
            shadowCameraFar: 1e3
          };
          break;
      }
      return i[t.id] = e, e;
    }
  };
}
let p_ = 0;
function m_(i, t) {
  return (t.castShadow ? 2 : 0) - (i.castShadow ? 2 : 0) + (t.map ? 1 : 0) - (i.map ? 1 : 0);
}
function g_(i) {
  const t = new d_(), e = f_(), n = {
    version: 0,
    hash: {
      directionalLength: -1,
      pointLength: -1,
      spotLength: -1,
      rectAreaLength: -1,
      hemiLength: -1,
      numDirectionalShadows: -1,
      numPointShadows: -1,
      numSpotShadows: -1,
      numSpotMaps: -1,
      numLightProbes: -1
    },
    ambient: [0, 0, 0],
    probe: [],
    directional: [],
    directionalShadow: [],
    directionalShadowMap: [],
    directionalShadowMatrix: [],
    spot: [],
    spotLightMap: [],
    spotShadow: [],
    spotShadowMap: [],
    spotLightMatrix: [],
    rectArea: [],
    rectAreaLTC1: null,
    rectAreaLTC2: null,
    point: [],
    pointShadow: [],
    pointShadowMap: [],
    pointShadowMatrix: [],
    hemi: [],
    numSpotLightShadowsWithMaps: 0,
    numLightProbes: 0
  };
  for (let c = 0; c < 9; c++) n.probe.push(new L());
  const s = new L(), r = new ue(), a = new ue();
  function o(c) {
    let h = 0, u = 0, d = 0;
    for (let S = 0; S < 9; S++) n.probe[S].set(0, 0, 0);
    let p = 0, g = 0, _ = 0, f = 0, m = 0, b = 0, x = 0, v = 0, w = 0, A = 0, C = 0;
    c.sort(m_);
    for (let S = 0, M = c.length; S < M; S++) {
      const P = c[S], z = P.color, O = P.intensity, F = P.distance, W = P.shadow && P.shadow.map ? P.shadow.map.texture : null;
      if (P.isAmbientLight)
        h += z.r * O, u += z.g * O, d += z.b * O;
      else if (P.isLightProbe) {
        for (let H = 0; H < 9; H++)
          n.probe[H].addScaledVector(P.sh.coefficients[H], O);
        C++;
      } else if (P.isDirectionalLight) {
        const H = t.get(P);
        if (H.color.copy(P.color).multiplyScalar(P.intensity), P.castShadow) {
          const J = P.shadow, k = e.get(P);
          k.shadowIntensity = J.intensity, k.shadowBias = J.bias, k.shadowNormalBias = J.normalBias, k.shadowRadius = J.radius, k.shadowMapSize = J.mapSize, n.directionalShadow[p] = k, n.directionalShadowMap[p] = W, n.directionalShadowMatrix[p] = P.shadow.matrix, b++;
        }
        n.directional[p] = H, p++;
      } else if (P.isSpotLight) {
        const H = t.get(P);
        H.position.setFromMatrixPosition(P.matrixWorld), H.color.copy(z).multiplyScalar(O), H.distance = F, H.coneCos = Math.cos(P.angle), H.penumbraCos = Math.cos(P.angle * (1 - P.penumbra)), H.decay = P.decay, n.spot[_] = H;
        const J = P.shadow;
        if (P.map && (n.spotLightMap[w] = P.map, w++, J.updateMatrices(P), P.castShadow && A++), n.spotLightMatrix[_] = J.matrix, P.castShadow) {
          const k = e.get(P);
          k.shadowIntensity = J.intensity, k.shadowBias = J.bias, k.shadowNormalBias = J.normalBias, k.shadowRadius = J.radius, k.shadowMapSize = J.mapSize, n.spotShadow[_] = k, n.spotShadowMap[_] = W, v++;
        }
        _++;
      } else if (P.isRectAreaLight) {
        const H = t.get(P);
        H.color.copy(z).multiplyScalar(O), H.halfWidth.set(P.width * 0.5, 0, 0), H.halfHeight.set(0, P.height * 0.5, 0), n.rectArea[f] = H, f++;
      } else if (P.isPointLight) {
        const H = t.get(P);
        if (H.color.copy(P.color).multiplyScalar(P.intensity), H.distance = P.distance, H.decay = P.decay, P.castShadow) {
          const J = P.shadow, k = e.get(P);
          k.shadowIntensity = J.intensity, k.shadowBias = J.bias, k.shadowNormalBias = J.normalBias, k.shadowRadius = J.radius, k.shadowMapSize = J.mapSize, k.shadowCameraNear = J.camera.near, k.shadowCameraFar = J.camera.far, n.pointShadow[g] = k, n.pointShadowMap[g] = W, n.pointShadowMatrix[g] = P.shadow.matrix, x++;
        }
        n.point[g] = H, g++;
      } else if (P.isHemisphereLight) {
        const H = t.get(P);
        H.skyColor.copy(P.color).multiplyScalar(O), H.groundColor.copy(P.groundColor).multiplyScalar(O), n.hemi[m] = H, m++;
      }
    }
    f > 0 && (i.has("OES_texture_float_linear") === !0 ? (n.rectAreaLTC1 = ct.LTC_FLOAT_1, n.rectAreaLTC2 = ct.LTC_FLOAT_2) : (n.rectAreaLTC1 = ct.LTC_HALF_1, n.rectAreaLTC2 = ct.LTC_HALF_2)), n.ambient[0] = h, n.ambient[1] = u, n.ambient[2] = d;
    const D = n.hash;
    (D.directionalLength !== p || D.pointLength !== g || D.spotLength !== _ || D.rectAreaLength !== f || D.hemiLength !== m || D.numDirectionalShadows !== b || D.numPointShadows !== x || D.numSpotShadows !== v || D.numSpotMaps !== w || D.numLightProbes !== C) && (n.directional.length = p, n.spot.length = _, n.rectArea.length = f, n.point.length = g, n.hemi.length = m, n.directionalShadow.length = b, n.directionalShadowMap.length = b, n.pointShadow.length = x, n.pointShadowMap.length = x, n.spotShadow.length = v, n.spotShadowMap.length = v, n.directionalShadowMatrix.length = b, n.pointShadowMatrix.length = x, n.spotLightMatrix.length = v + w - A, n.spotLightMap.length = w, n.numSpotLightShadowsWithMaps = A, n.numLightProbes = C, D.directionalLength = p, D.pointLength = g, D.spotLength = _, D.rectAreaLength = f, D.hemiLength = m, D.numDirectionalShadows = b, D.numPointShadows = x, D.numSpotShadows = v, D.numSpotMaps = w, D.numLightProbes = C, n.version = p_++);
  }
  function l(c, h) {
    let u = 0, d = 0, p = 0, g = 0, _ = 0;
    const f = h.matrixWorldInverse;
    for (let m = 0, b = c.length; m < b; m++) {
      const x = c[m];
      if (x.isDirectionalLight) {
        const v = n.directional[u];
        v.direction.setFromMatrixPosition(x.matrixWorld), s.setFromMatrixPosition(x.target.matrixWorld), v.direction.sub(s), v.direction.transformDirection(f), u++;
      } else if (x.isSpotLight) {
        const v = n.spot[p];
        v.position.setFromMatrixPosition(x.matrixWorld), v.position.applyMatrix4(f), v.direction.setFromMatrixPosition(x.matrixWorld), s.setFromMatrixPosition(x.target.matrixWorld), v.direction.sub(s), v.direction.transformDirection(f), p++;
      } else if (x.isRectAreaLight) {
        const v = n.rectArea[g];
        v.position.setFromMatrixPosition(x.matrixWorld), v.position.applyMatrix4(f), a.identity(), r.copy(x.matrixWorld), r.premultiply(f), a.extractRotation(r), v.halfWidth.set(x.width * 0.5, 0, 0), v.halfHeight.set(0, x.height * 0.5, 0), v.halfWidth.applyMatrix4(a), v.halfHeight.applyMatrix4(a), g++;
      } else if (x.isPointLight) {
        const v = n.point[d];
        v.position.setFromMatrixPosition(x.matrixWorld), v.position.applyMatrix4(f), d++;
      } else if (x.isHemisphereLight) {
        const v = n.hemi[_];
        v.direction.setFromMatrixPosition(x.matrixWorld), v.direction.transformDirection(f), _++;
      }
    }
  }
  return {
    setup: o,
    setupView: l,
    state: n
  };
}
function fc(i) {
  const t = new g_(i), e = [], n = [];
  function s(h) {
    c.camera = h, e.length = 0, n.length = 0;
  }
  function r(h) {
    e.push(h);
  }
  function a(h) {
    n.push(h);
  }
  function o() {
    t.setup(e);
  }
  function l(h) {
    t.setupView(e, h);
  }
  const c = {
    lightsArray: e,
    shadowsArray: n,
    camera: null,
    lights: t,
    transmissionRenderTarget: {}
  };
  return {
    init: s,
    state: c,
    setupLights: o,
    setupLightsView: l,
    pushLight: r,
    pushShadow: a
  };
}
function __(i) {
  let t = /* @__PURE__ */ new WeakMap();
  function e(s, r = 0) {
    const a = t.get(s);
    let o;
    return a === void 0 ? (o = new fc(i), t.set(s, [o])) : r >= a.length ? (o = new fc(i), a.push(o)) : o = a[r], o;
  }
  function n() {
    t = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: e,
    dispose: n
  };
}
class v_ extends ji {
  static get type() {
    return "MeshDepthMaterial";
  }
  constructor(t) {
    super(), this.isMeshDepthMaterial = !0, this.depthPacking = Ku, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.depthPacking = t.depthPacking, this.map = t.map, this.alphaMap = t.alphaMap, this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this;
  }
}
class x_ extends ji {
  static get type() {
    return "MeshDistanceMaterial";
  }
  constructor(t) {
    super(), this.isMeshDistanceMaterial = !0, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.map = t.map, this.alphaMap = t.alphaMap, this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this;
  }
}
const y_ = `void main() {
	gl_Position = vec4( position, 1.0 );
}`, M_ = `uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;
function b_(i, t, e) {
  let n = new Na();
  const s = new et(), r = new et(), a = new oe(), o = new v_({ depthPacking: Ju }), l = new x_(), c = {}, h = e.maxTextureSize, u = { [Fn]: Ne, [Ne]: Fn, [$e]: $e }, d = new kn({
    defines: {
      VSM_SAMPLES: 8
    },
    uniforms: {
      shadow_pass: { value: null },
      resolution: { value: new et() },
      radius: { value: 4 }
    },
    vertexShader: y_,
    fragmentShader: M_
  }), p = d.clone();
  p.defines.HORIZONTAL_PASS = 1;
  const g = new Ee();
  g.setAttribute(
    "position",
    new rn(
      new Float32Array([-1, -1, 0.5, 3, -1, 0.5, -1, 3, 0.5]),
      3
    )
  );
  const _ = new Mt(g, d), f = this;
  this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = Vc;
  let m = this.type;
  this.render = function(A, C, D) {
    if (f.enabled === !1 || f.autoUpdate === !1 && f.needsUpdate === !1 || A.length === 0) return;
    const S = i.getRenderTarget(), M = i.getActiveCubeFace(), P = i.getActiveMipmapLevel(), z = i.state;
    z.setBlending(Un), z.buffers.color.setClear(1, 1, 1, 1), z.buffers.depth.setTest(!0), z.setScissorTest(!1);
    const O = m !== mn && this.type === mn, F = m === mn && this.type !== mn;
    for (let W = 0, H = A.length; W < H; W++) {
      const J = A[W], k = J.shadow;
      if (k === void 0) {
        console.warn("THREE.WebGLShadowMap:", J, "has no shadow.");
        continue;
      }
      if (k.autoUpdate === !1 && k.needsUpdate === !1) continue;
      s.copy(k.mapSize);
      const tt = k.getFrameExtents();
      if (s.multiply(tt), r.copy(k.mapSize), (s.x > h || s.y > h) && (s.x > h && (r.x = Math.floor(h / tt.x), s.x = r.x * tt.x, k.mapSize.x = r.x), s.y > h && (r.y = Math.floor(h / tt.y), s.y = r.y * tt.y, k.mapSize.y = r.y)), k.map === null || O === !0 || F === !0) {
        const ht = this.type !== mn ? { minFilter: Je, magFilter: Je } : {};
        k.map !== null && k.map.dispose(), k.map = new ai(s.x, s.y, ht), k.map.texture.name = J.name + ".shadowMap", k.camera.updateProjectionMatrix();
      }
      i.setRenderTarget(k.map), i.clear();
      const nt = k.getViewportCount();
      for (let ht = 0; ht < nt; ht++) {
        const Pt = k.getViewport(ht);
        a.set(
          r.x * Pt.x,
          r.y * Pt.y,
          r.x * Pt.z,
          r.y * Pt.w
        ), z.viewport(a), k.updateMatrices(J, ht), n = k.getFrustum(), v(C, D, k.camera, J, this.type);
      }
      k.isPointLightShadow !== !0 && this.type === mn && b(k, D), k.needsUpdate = !1;
    }
    m = this.type, f.needsUpdate = !1, i.setRenderTarget(S, M, P);
  };
  function b(A, C) {
    const D = t.update(_);
    d.defines.VSM_SAMPLES !== A.blurSamples && (d.defines.VSM_SAMPLES = A.blurSamples, p.defines.VSM_SAMPLES = A.blurSamples, d.needsUpdate = !0, p.needsUpdate = !0), A.mapPass === null && (A.mapPass = new ai(s.x, s.y)), d.uniforms.shadow_pass.value = A.map.texture, d.uniforms.resolution.value = A.mapSize, d.uniforms.radius.value = A.radius, i.setRenderTarget(A.mapPass), i.clear(), i.renderBufferDirect(C, null, D, d, _, null), p.uniforms.shadow_pass.value = A.mapPass.texture, p.uniforms.resolution.value = A.mapSize, p.uniforms.radius.value = A.radius, i.setRenderTarget(A.map), i.clear(), i.renderBufferDirect(C, null, D, p, _, null);
  }
  function x(A, C, D, S) {
    let M = null;
    const P = D.isPointLight === !0 ? A.customDistanceMaterial : A.customDepthMaterial;
    if (P !== void 0)
      M = P;
    else if (M = D.isPointLight === !0 ? l : o, i.localClippingEnabled && C.clipShadows === !0 && Array.isArray(C.clippingPlanes) && C.clippingPlanes.length !== 0 || C.displacementMap && C.displacementScale !== 0 || C.alphaMap && C.alphaTest > 0 || C.map && C.alphaTest > 0) {
      const z = M.uuid, O = C.uuid;
      let F = c[z];
      F === void 0 && (F = {}, c[z] = F);
      let W = F[O];
      W === void 0 && (W = M.clone(), F[O] = W, C.addEventListener("dispose", w)), M = W;
    }
    if (M.visible = C.visible, M.wireframe = C.wireframe, S === mn ? M.side = C.shadowSide !== null ? C.shadowSide : C.side : M.side = C.shadowSide !== null ? C.shadowSide : u[C.side], M.alphaMap = C.alphaMap, M.alphaTest = C.alphaTest, M.map = C.map, M.clipShadows = C.clipShadows, M.clippingPlanes = C.clippingPlanes, M.clipIntersection = C.clipIntersection, M.displacementMap = C.displacementMap, M.displacementScale = C.displacementScale, M.displacementBias = C.displacementBias, M.wireframeLinewidth = C.wireframeLinewidth, M.linewidth = C.linewidth, D.isPointLight === !0 && M.isMeshDistanceMaterial === !0) {
      const z = i.properties.get(M);
      z.light = D;
    }
    return M;
  }
  function v(A, C, D, S, M) {
    if (A.visible === !1) return;
    if (A.layers.test(C.layers) && (A.isMesh || A.isLine || A.isPoints) && (A.castShadow || A.receiveShadow && M === mn) && (!A.frustumCulled || n.intersectsObject(A))) {
      A.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse, A.matrixWorld);
      const O = t.update(A), F = A.material;
      if (Array.isArray(F)) {
        const W = O.groups;
        for (let H = 0, J = W.length; H < J; H++) {
          const k = W[H], tt = F[k.materialIndex];
          if (tt && tt.visible) {
            const nt = x(A, tt, S, M);
            A.onBeforeShadow(i, A, C, D, O, nt, k), i.renderBufferDirect(D, null, O, nt, A, k), A.onAfterShadow(i, A, C, D, O, nt, k);
          }
        }
      } else if (F.visible) {
        const W = x(A, F, S, M);
        A.onBeforeShadow(i, A, C, D, O, W, null), i.renderBufferDirect(D, null, O, W, A, null), A.onAfterShadow(i, A, C, D, O, W, null);
      }
    }
    const z = A.children;
    for (let O = 0, F = z.length; O < F; O++)
      v(z[O], C, D, S, M);
  }
  function w(A) {
    A.target.removeEventListener("dispose", w);
    for (const D in c) {
      const S = c[D], M = A.target.uuid;
      M in S && (S[M].dispose(), delete S[M]);
    }
  }
}
const S_ = {
  [Ao]: Co,
  [Ro]: Do,
  [Po]: Io,
  [Vi]: Lo,
  [Co]: Ao,
  [Do]: Ro,
  [Io]: Po,
  [Lo]: Vi
};
function E_(i, t) {
  function e() {
    let I = !1;
    const dt = new oe();
    let $ = null;
    const j = new oe(0, 0, 0, 0);
    return {
      setMask: function(mt) {
        $ !== mt && !I && (i.colorMask(mt, mt, mt, mt), $ = mt);
      },
      setLocked: function(mt) {
        I = mt;
      },
      setClear: function(mt, ft, Bt, ge, we) {
        we === !0 && (mt *= ge, ft *= ge, Bt *= ge), dt.set(mt, ft, Bt, ge), j.equals(dt) === !1 && (i.clearColor(mt, ft, Bt, ge), j.copy(dt));
      },
      reset: function() {
        I = !1, $ = null, j.set(-1, 0, 0, 0);
      }
    };
  }
  function n() {
    let I = !1, dt = !1, $ = null, j = null, mt = null;
    return {
      setReversed: function(ft) {
        if (dt !== ft) {
          const Bt = t.get("EXT_clip_control");
          dt ? Bt.clipControlEXT(Bt.LOWER_LEFT_EXT, Bt.ZERO_TO_ONE_EXT) : Bt.clipControlEXT(Bt.LOWER_LEFT_EXT, Bt.NEGATIVE_ONE_TO_ONE_EXT);
          const ge = mt;
          mt = null, this.setClear(ge);
        }
        dt = ft;
      },
      getReversed: function() {
        return dt;
      },
      setTest: function(ft) {
        ft ? at(i.DEPTH_TEST) : Dt(i.DEPTH_TEST);
      },
      setMask: function(ft) {
        $ !== ft && !I && (i.depthMask(ft), $ = ft);
      },
      setFunc: function(ft) {
        if (dt && (ft = S_[ft]), j !== ft) {
          switch (ft) {
            case Ao:
              i.depthFunc(i.NEVER);
              break;
            case Co:
              i.depthFunc(i.ALWAYS);
              break;
            case Ro:
              i.depthFunc(i.LESS);
              break;
            case Vi:
              i.depthFunc(i.LEQUAL);
              break;
            case Po:
              i.depthFunc(i.EQUAL);
              break;
            case Lo:
              i.depthFunc(i.GEQUAL);
              break;
            case Do:
              i.depthFunc(i.GREATER);
              break;
            case Io:
              i.depthFunc(i.NOTEQUAL);
              break;
            default:
              i.depthFunc(i.LEQUAL);
          }
          j = ft;
        }
      },
      setLocked: function(ft) {
        I = ft;
      },
      setClear: function(ft) {
        mt !== ft && (dt && (ft = 1 - ft), i.clearDepth(ft), mt = ft);
      },
      reset: function() {
        I = !1, $ = null, j = null, mt = null, dt = !1;
      }
    };
  }
  function s() {
    let I = !1, dt = null, $ = null, j = null, mt = null, ft = null, Bt = null, ge = null, we = null;
    return {
      setTest: function(ne) {
        I || (ne ? at(i.STENCIL_TEST) : Dt(i.STENCIL_TEST));
      },
      setMask: function(ne) {
        dt !== ne && !I && (i.stencilMask(ne), dt = ne);
      },
      setFunc: function(ne, We, ln) {
        ($ !== ne || j !== We || mt !== ln) && (i.stencilFunc(ne, We, ln), $ = ne, j = We, mt = ln);
      },
      setOp: function(ne, We, ln) {
        (ft !== ne || Bt !== We || ge !== ln) && (i.stencilOp(ne, We, ln), ft = ne, Bt = We, ge = ln);
      },
      setLocked: function(ne) {
        I = ne;
      },
      setClear: function(ne) {
        we !== ne && (i.clearStencil(ne), we = ne);
      },
      reset: function() {
        I = !1, dt = null, $ = null, j = null, mt = null, ft = null, Bt = null, ge = null, we = null;
      }
    };
  }
  const r = new e(), a = new n(), o = new s(), l = /* @__PURE__ */ new WeakMap(), c = /* @__PURE__ */ new WeakMap();
  let h = {}, u = {}, d = /* @__PURE__ */ new WeakMap(), p = [], g = null, _ = !1, f = null, m = null, b = null, x = null, v = null, w = null, A = null, C = new Wt(0, 0, 0), D = 0, S = !1, M = null, P = null, z = null, O = null, F = null;
  const W = i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  let H = !1, J = 0;
  const k = i.getParameter(i.VERSION);
  k.indexOf("WebGL") !== -1 ? (J = parseFloat(/^WebGL (\d)/.exec(k)[1]), H = J >= 1) : k.indexOf("OpenGL ES") !== -1 && (J = parseFloat(/^OpenGL ES (\d)/.exec(k)[1]), H = J >= 2);
  let tt = null, nt = {};
  const ht = i.getParameter(i.SCISSOR_BOX), Pt = i.getParameter(i.VIEWPORT), Yt = new oe().fromArray(ht), Y = new oe().fromArray(Pt);
  function st(I, dt, $, j) {
    const mt = new Uint8Array(4), ft = i.createTexture();
    i.bindTexture(I, ft), i.texParameteri(I, i.TEXTURE_MIN_FILTER, i.NEAREST), i.texParameteri(I, i.TEXTURE_MAG_FILTER, i.NEAREST);
    for (let Bt = 0; Bt < $; Bt++)
      I === i.TEXTURE_3D || I === i.TEXTURE_2D_ARRAY ? i.texImage3D(dt, 0, i.RGBA, 1, 1, j, 0, i.RGBA, i.UNSIGNED_BYTE, mt) : i.texImage2D(dt + Bt, 0, i.RGBA, 1, 1, 0, i.RGBA, i.UNSIGNED_BYTE, mt);
    return ft;
  }
  const bt = {};
  bt[i.TEXTURE_2D] = st(i.TEXTURE_2D, i.TEXTURE_2D, 1), bt[i.TEXTURE_CUBE_MAP] = st(i.TEXTURE_CUBE_MAP, i.TEXTURE_CUBE_MAP_POSITIVE_X, 6), bt[i.TEXTURE_2D_ARRAY] = st(i.TEXTURE_2D_ARRAY, i.TEXTURE_2D_ARRAY, 1, 1), bt[i.TEXTURE_3D] = st(i.TEXTURE_3D, i.TEXTURE_3D, 1, 1), r.setClear(0, 0, 0, 1), a.setClear(1), o.setClear(0), at(i.DEPTH_TEST), a.setFunc(Vi), Q(!1), vt(_l), at(i.CULL_FACE), R(Un);
  function at(I) {
    h[I] !== !0 && (i.enable(I), h[I] = !0);
  }
  function Dt(I) {
    h[I] !== !1 && (i.disable(I), h[I] = !1);
  }
  function Ft(I, dt) {
    return u[I] !== dt ? (i.bindFramebuffer(I, dt), u[I] = dt, I === i.DRAW_FRAMEBUFFER && (u[i.FRAMEBUFFER] = dt), I === i.FRAMEBUFFER && (u[i.DRAW_FRAMEBUFFER] = dt), !0) : !1;
  }
  function Nt(I, dt) {
    let $ = p, j = !1;
    if (I) {
      $ = d.get(dt), $ === void 0 && ($ = [], d.set(dt, $));
      const mt = I.textures;
      if ($.length !== mt.length || $[0] !== i.COLOR_ATTACHMENT0) {
        for (let ft = 0, Bt = mt.length; ft < Bt; ft++)
          $[ft] = i.COLOR_ATTACHMENT0 + ft;
        $.length = mt.length, j = !0;
      }
    } else
      $[0] !== i.BACK && ($[0] = i.BACK, j = !0);
    j && i.drawBuffers($);
  }
  function Zt(I) {
    return g !== I ? (i.useProgram(I), g = I, !0) : !1;
  }
  const Z = {
    [Zn]: i.FUNC_ADD,
    [Eu]: i.FUNC_SUBTRACT,
    [wu]: i.FUNC_REVERSE_SUBTRACT
  };
  Z[Tu] = i.MIN, Z[Au] = i.MAX;
  const rt = {
    [Cu]: i.ZERO,
    [Ru]: i.ONE,
    [Pu]: i.SRC_COLOR,
    [wo]: i.SRC_ALPHA,
    [Ou]: i.SRC_ALPHA_SATURATE,
    [Uu]: i.DST_COLOR,
    [Du]: i.DST_ALPHA,
    [Lu]: i.ONE_MINUS_SRC_COLOR,
    [To]: i.ONE_MINUS_SRC_ALPHA,
    [Nu]: i.ONE_MINUS_DST_COLOR,
    [Iu]: i.ONE_MINUS_DST_ALPHA,
    [Fu]: i.CONSTANT_COLOR,
    [ku]: i.ONE_MINUS_CONSTANT_COLOR,
    [Bu]: i.CONSTANT_ALPHA,
    [zu]: i.ONE_MINUS_CONSTANT_ALPHA
  };
  function R(I, dt, $, j, mt, ft, Bt, ge, we, ne) {
    if (I === Un) {
      _ === !0 && (Dt(i.BLEND), _ = !1);
      return;
    }
    if (_ === !1 && (at(i.BLEND), _ = !0), I !== Su) {
      if (I !== f || ne !== S) {
        if ((m !== Zn || v !== Zn) && (i.blendEquation(i.FUNC_ADD), m = Zn, v = Zn), ne)
          switch (I) {
            case Fi:
              i.blendFuncSeparate(i.ONE, i.ONE_MINUS_SRC_ALPHA, i.ONE, i.ONE_MINUS_SRC_ALPHA);
              break;
            case Eo:
              i.blendFunc(i.ONE, i.ONE);
              break;
            case vl:
              i.blendFuncSeparate(i.ZERO, i.ONE_MINUS_SRC_COLOR, i.ZERO, i.ONE);
              break;
            case xl:
              i.blendFuncSeparate(i.ZERO, i.SRC_COLOR, i.ZERO, i.SRC_ALPHA);
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", I);
              break;
          }
        else
          switch (I) {
            case Fi:
              i.blendFuncSeparate(i.SRC_ALPHA, i.ONE_MINUS_SRC_ALPHA, i.ONE, i.ONE_MINUS_SRC_ALPHA);
              break;
            case Eo:
              i.blendFunc(i.SRC_ALPHA, i.ONE);
              break;
            case vl:
              i.blendFuncSeparate(i.ZERO, i.ONE_MINUS_SRC_COLOR, i.ZERO, i.ONE);
              break;
            case xl:
              i.blendFunc(i.ZERO, i.SRC_COLOR);
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", I);
              break;
          }
        b = null, x = null, w = null, A = null, C.set(0, 0, 0), D = 0, f = I, S = ne;
      }
      return;
    }
    mt = mt || dt, ft = ft || $, Bt = Bt || j, (dt !== m || mt !== v) && (i.blendEquationSeparate(Z[dt], Z[mt]), m = dt, v = mt), ($ !== b || j !== x || ft !== w || Bt !== A) && (i.blendFuncSeparate(rt[$], rt[j], rt[ft], rt[Bt]), b = $, x = j, w = ft, A = Bt), (ge.equals(C) === !1 || we !== D) && (i.blendColor(ge.r, ge.g, ge.b, we), C.copy(ge), D = we), f = I, S = !1;
  }
  function Ct(I, dt) {
    I.side === $e ? Dt(i.CULL_FACE) : at(i.CULL_FACE);
    let $ = I.side === Ne;
    dt && ($ = !$), Q($), I.blending === Fi && I.transparent === !1 ? R(Un) : R(I.blending, I.blendEquation, I.blendSrc, I.blendDst, I.blendEquationAlpha, I.blendSrcAlpha, I.blendDstAlpha, I.blendColor, I.blendAlpha, I.premultipliedAlpha), a.setFunc(I.depthFunc), a.setTest(I.depthTest), a.setMask(I.depthWrite), r.setMask(I.colorWrite);
    const j = I.stencilWrite;
    o.setTest(j), j && (o.setMask(I.stencilWriteMask), o.setFunc(I.stencilFunc, I.stencilRef, I.stencilFuncMask), o.setOp(I.stencilFail, I.stencilZFail, I.stencilZPass)), It(I.polygonOffset, I.polygonOffsetFactor, I.polygonOffsetUnits), I.alphaToCoverage === !0 ? at(i.SAMPLE_ALPHA_TO_COVERAGE) : Dt(i.SAMPLE_ALPHA_TO_COVERAGE);
  }
  function Q(I) {
    M !== I && (I ? i.frontFace(i.CW) : i.frontFace(i.CCW), M = I);
  }
  function vt(I) {
    I !== yu ? (at(i.CULL_FACE), I !== P && (I === _l ? i.cullFace(i.BACK) : I === Mu ? i.cullFace(i.FRONT) : i.cullFace(i.FRONT_AND_BACK))) : Dt(i.CULL_FACE), P = I;
  }
  function lt(I) {
    I !== z && (H && i.lineWidth(I), z = I);
  }
  function It(I, dt, $) {
    I ? (at(i.POLYGON_OFFSET_FILL), (O !== dt || F !== $) && (i.polygonOffset(dt, $), O = dt, F = $)) : Dt(i.POLYGON_OFFSET_FILL);
  }
  function gt(I) {
    I ? at(i.SCISSOR_TEST) : Dt(i.SCISSOR_TEST);
  }
  function T(I) {
    I === void 0 && (I = i.TEXTURE0 + W - 1), tt !== I && (i.activeTexture(I), tt = I);
  }
  function y(I, dt, $) {
    $ === void 0 && (tt === null ? $ = i.TEXTURE0 + W - 1 : $ = tt);
    let j = nt[$];
    j === void 0 && (j = { type: void 0, texture: void 0 }, nt[$] = j), (j.type !== I || j.texture !== dt) && (tt !== $ && (i.activeTexture($), tt = $), i.bindTexture(I, dt || bt[I]), j.type = I, j.texture = dt);
  }
  function B() {
    const I = nt[tt];
    I !== void 0 && I.type !== void 0 && (i.bindTexture(I.type, null), I.type = void 0, I.texture = void 0);
  }
  function X() {
    try {
      i.compressedTexImage2D.apply(i, arguments);
    } catch (I) {
      console.error("THREE.WebGLState:", I);
    }
  }
  function K() {
    try {
      i.compressedTexImage3D.apply(i, arguments);
    } catch (I) {
      console.error("THREE.WebGLState:", I);
    }
  }
  function q() {
    try {
      i.texSubImage2D.apply(i, arguments);
    } catch (I) {
      console.error("THREE.WebGLState:", I);
    }
  }
  function Et() {
    try {
      i.texSubImage3D.apply(i, arguments);
    } catch (I) {
      console.error("THREE.WebGLState:", I);
    }
  }
  function ut() {
    try {
      i.compressedTexSubImage2D.apply(i, arguments);
    } catch (I) {
      console.error("THREE.WebGLState:", I);
    }
  }
  function _t() {
    try {
      i.compressedTexSubImage3D.apply(i, arguments);
    } catch (I) {
      console.error("THREE.WebGLState:", I);
    }
  }
  function Xt() {
    try {
      i.texStorage2D.apply(i, arguments);
    } catch (I) {
      console.error("THREE.WebGLState:", I);
    }
  }
  function it() {
    try {
      i.texStorage3D.apply(i, arguments);
    } catch (I) {
      console.error("THREE.WebGLState:", I);
    }
  }
  function xt() {
    try {
      i.texImage2D.apply(i, arguments);
    } catch (I) {
      console.error("THREE.WebGLState:", I);
    }
  }
  function Ut() {
    try {
      i.texImage3D.apply(i, arguments);
    } catch (I) {
      console.error("THREE.WebGLState:", I);
    }
  }
  function Ot(I) {
    Yt.equals(I) === !1 && (i.scissor(I.x, I.y, I.z, I.w), Yt.copy(I));
  }
  function yt(I) {
    Y.equals(I) === !1 && (i.viewport(I.x, I.y, I.z, I.w), Y.copy(I));
  }
  function jt(I, dt) {
    let $ = c.get(dt);
    $ === void 0 && ($ = /* @__PURE__ */ new WeakMap(), c.set(dt, $));
    let j = $.get(I);
    j === void 0 && (j = i.getUniformBlockIndex(dt, I.name), $.set(I, j));
  }
  function Vt(I, dt) {
    const j = c.get(dt).get(I);
    l.get(dt) !== j && (i.uniformBlockBinding(dt, j, I.__bindingPointIndex), l.set(dt, j));
  }
  function ce() {
    i.disable(i.BLEND), i.disable(i.CULL_FACE), i.disable(i.DEPTH_TEST), i.disable(i.POLYGON_OFFSET_FILL), i.disable(i.SCISSOR_TEST), i.disable(i.STENCIL_TEST), i.disable(i.SAMPLE_ALPHA_TO_COVERAGE), i.blendEquation(i.FUNC_ADD), i.blendFunc(i.ONE, i.ZERO), i.blendFuncSeparate(i.ONE, i.ZERO, i.ONE, i.ZERO), i.blendColor(0, 0, 0, 0), i.colorMask(!0, !0, !0, !0), i.clearColor(0, 0, 0, 0), i.depthMask(!0), i.depthFunc(i.LESS), a.setReversed(!1), i.clearDepth(1), i.stencilMask(4294967295), i.stencilFunc(i.ALWAYS, 0, 4294967295), i.stencilOp(i.KEEP, i.KEEP, i.KEEP), i.clearStencil(0), i.cullFace(i.BACK), i.frontFace(i.CCW), i.polygonOffset(0, 0), i.activeTexture(i.TEXTURE0), i.bindFramebuffer(i.FRAMEBUFFER, null), i.bindFramebuffer(i.DRAW_FRAMEBUFFER, null), i.bindFramebuffer(i.READ_FRAMEBUFFER, null), i.useProgram(null), i.lineWidth(1), i.scissor(0, 0, i.canvas.width, i.canvas.height), i.viewport(0, 0, i.canvas.width, i.canvas.height), h = {}, tt = null, nt = {}, u = {}, d = /* @__PURE__ */ new WeakMap(), p = [], g = null, _ = !1, f = null, m = null, b = null, x = null, v = null, w = null, A = null, C = new Wt(0, 0, 0), D = 0, S = !1, M = null, P = null, z = null, O = null, F = null, Yt.set(0, 0, i.canvas.width, i.canvas.height), Y.set(0, 0, i.canvas.width, i.canvas.height), r.reset(), a.reset(), o.reset();
  }
  return {
    buffers: {
      color: r,
      depth: a,
      stencil: o
    },
    enable: at,
    disable: Dt,
    bindFramebuffer: Ft,
    drawBuffers: Nt,
    useProgram: Zt,
    setBlending: R,
    setMaterial: Ct,
    setFlipSided: Q,
    setCullFace: vt,
    setLineWidth: lt,
    setPolygonOffset: It,
    setScissorTest: gt,
    activeTexture: T,
    bindTexture: y,
    unbindTexture: B,
    compressedTexImage2D: X,
    compressedTexImage3D: K,
    texImage2D: xt,
    texImage3D: Ut,
    updateUBOMapping: jt,
    uniformBlockBinding: Vt,
    texStorage2D: Xt,
    texStorage3D: it,
    texSubImage2D: q,
    texSubImage3D: Et,
    compressedTexSubImage2D: ut,
    compressedTexSubImage3D: _t,
    scissor: Ot,
    viewport: yt,
    reset: ce
  };
}
function pc(i, t, e, n) {
  const s = w_(n);
  switch (e) {
    // https://registry.khronos.org/OpenGL-Refpages/es3.0/html/glTexImage2D.xhtml
    case qc:
      return i * t;
    case Zc:
      return i * t;
    case Kc:
      return i * t * 2;
    case Jc:
      return i * t / s.components * s.byteLength;
    case Ra:
      return i * t / s.components * s.byteLength;
    case Qc:
      return i * t * 2 / s.components * s.byteLength;
    case Pa:
      return i * t * 2 / s.components * s.byteLength;
    case jc:
      return i * t * 3 / s.components * s.byteLength;
    case Ke:
      return i * t * 4 / s.components * s.byteLength;
    case La:
      return i * t * 4 / s.components * s.byteLength;
    // https://registry.khronos.org/webgl/extensions/WEBGL_compressed_texture_s3tc_srgb/
    case dr:
    case fr:
      return Math.floor((i + 3) / 4) * Math.floor((t + 3) / 4) * 8;
    case pr:
    case mr:
      return Math.floor((i + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    // https://registry.khronos.org/webgl/extensions/WEBGL_compressed_texture_pvrtc/
    case Bo:
    case Ho:
      return Math.max(i, 16) * Math.max(t, 8) / 4;
    case ko:
    case zo:
      return Math.max(i, 8) * Math.max(t, 8) / 2;
    // https://registry.khronos.org/webgl/extensions/WEBGL_compressed_texture_etc/
    case Vo:
    case Go:
      return Math.floor((i + 3) / 4) * Math.floor((t + 3) / 4) * 8;
    case $o:
      return Math.floor((i + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    // https://registry.khronos.org/webgl/extensions/WEBGL_compressed_texture_astc/
    case Wo:
      return Math.floor((i + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    case Xo:
      return Math.floor((i + 4) / 5) * Math.floor((t + 3) / 4) * 16;
    case Yo:
      return Math.floor((i + 4) / 5) * Math.floor((t + 4) / 5) * 16;
    case qo:
      return Math.floor((i + 5) / 6) * Math.floor((t + 4) / 5) * 16;
    case jo:
      return Math.floor((i + 5) / 6) * Math.floor((t + 5) / 6) * 16;
    case Zo:
      return Math.floor((i + 7) / 8) * Math.floor((t + 4) / 5) * 16;
    case Ko:
      return Math.floor((i + 7) / 8) * Math.floor((t + 5) / 6) * 16;
    case Jo:
      return Math.floor((i + 7) / 8) * Math.floor((t + 7) / 8) * 16;
    case Qo:
      return Math.floor((i + 9) / 10) * Math.floor((t + 4) / 5) * 16;
    case ta:
      return Math.floor((i + 9) / 10) * Math.floor((t + 5) / 6) * 16;
    case ea:
      return Math.floor((i + 9) / 10) * Math.floor((t + 7) / 8) * 16;
    case na:
      return Math.floor((i + 9) / 10) * Math.floor((t + 9) / 10) * 16;
    case ia:
      return Math.floor((i + 11) / 12) * Math.floor((t + 9) / 10) * 16;
    case sa:
      return Math.floor((i + 11) / 12) * Math.floor((t + 11) / 12) * 16;
    // https://registry.khronos.org/webgl/extensions/EXT_texture_compression_bptc/
    case gr:
    case ra:
    case oa:
      return Math.ceil(i / 4) * Math.ceil(t / 4) * 16;
    // https://registry.khronos.org/webgl/extensions/EXT_texture_compression_rgtc/
    case th:
    case aa:
      return Math.ceil(i / 4) * Math.ceil(t / 4) * 8;
    case la:
    case ca:
      return Math.ceil(i / 4) * Math.ceil(t / 4) * 16;
  }
  throw new Error(
    `Unable to determine texture byte length for ${e} format.`
  );
}
function w_(i) {
  switch (i) {
    case yn:
    case Wc:
      return { byteLength: 1, components: 1 };
    case Es:
    case Xc:
    case Ps:
      return { byteLength: 2, components: 1 };
    case Aa:
    case Ca:
      return { byteLength: 2, components: 4 };
    case oi:
    case Ta:
    case gn:
      return { byteLength: 4, components: 1 };
    case Yc:
      return { byteLength: 4, components: 3 };
  }
  throw new Error(`Unknown texture type ${i}.`);
}
function T_(i, t, e, n, s, r, a) {
  const o = t.has("WEBGL_multisampled_render_to_texture") ? t.get("WEBGL_multisampled_render_to_texture") : null, l = typeof navigator > "u" ? !1 : /OculusBrowser/g.test(navigator.userAgent), c = new et(), h = /* @__PURE__ */ new WeakMap();
  let u;
  const d = /* @__PURE__ */ new WeakMap();
  let p = !1;
  try {
    p = typeof OffscreenCanvas < "u" && new OffscreenCanvas(1, 1).getContext("2d") !== null;
  } catch {
  }
  function g(T, y) {
    return p ? (
      // eslint-disable-next-line compat/compat
      new OffscreenCanvas(T, y)
    ) : br("canvas");
  }
  function _(T, y, B) {
    let X = 1;
    const K = gt(T);
    if ((K.width > B || K.height > B) && (X = B / Math.max(K.width, K.height)), X < 1)
      if (typeof HTMLImageElement < "u" && T instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && T instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && T instanceof ImageBitmap || typeof VideoFrame < "u" && T instanceof VideoFrame) {
        const q = Math.floor(X * K.width), Et = Math.floor(X * K.height);
        u === void 0 && (u = g(q, Et));
        const ut = y ? g(q, Et) : u;
        return ut.width = q, ut.height = Et, ut.getContext("2d").drawImage(T, 0, 0, q, Et), console.warn("THREE.WebGLRenderer: Texture has been resized from (" + K.width + "x" + K.height + ") to (" + q + "x" + Et + ")."), ut;
      } else
        return "data" in T && console.warn("THREE.WebGLRenderer: Image in DataTexture is too big (" + K.width + "x" + K.height + ")."), T;
    return T;
  }
  function f(T) {
    return T.generateMipmaps;
  }
  function m(T) {
    i.generateMipmap(T);
  }
  function b(T) {
    return T.isWebGLCubeRenderTarget ? i.TEXTURE_CUBE_MAP : T.isWebGL3DRenderTarget ? i.TEXTURE_3D : T.isWebGLArrayRenderTarget || T.isCompressedArrayTexture ? i.TEXTURE_2D_ARRAY : i.TEXTURE_2D;
  }
  function x(T, y, B, X, K = !1) {
    if (T !== null) {
      if (i[T] !== void 0) return i[T];
      console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '" + T + "'");
    }
    let q = y;
    if (y === i.RED && (B === i.FLOAT && (q = i.R32F), B === i.HALF_FLOAT && (q = i.R16F), B === i.UNSIGNED_BYTE && (q = i.R8)), y === i.RED_INTEGER && (B === i.UNSIGNED_BYTE && (q = i.R8UI), B === i.UNSIGNED_SHORT && (q = i.R16UI), B === i.UNSIGNED_INT && (q = i.R32UI), B === i.BYTE && (q = i.R8I), B === i.SHORT && (q = i.R16I), B === i.INT && (q = i.R32I)), y === i.RG && (B === i.FLOAT && (q = i.RG32F), B === i.HALF_FLOAT && (q = i.RG16F), B === i.UNSIGNED_BYTE && (q = i.RG8)), y === i.RG_INTEGER && (B === i.UNSIGNED_BYTE && (q = i.RG8UI), B === i.UNSIGNED_SHORT && (q = i.RG16UI), B === i.UNSIGNED_INT && (q = i.RG32UI), B === i.BYTE && (q = i.RG8I), B === i.SHORT && (q = i.RG16I), B === i.INT && (q = i.RG32I)), y === i.RGB_INTEGER && (B === i.UNSIGNED_BYTE && (q = i.RGB8UI), B === i.UNSIGNED_SHORT && (q = i.RGB16UI), B === i.UNSIGNED_INT && (q = i.RGB32UI), B === i.BYTE && (q = i.RGB8I), B === i.SHORT && (q = i.RGB16I), B === i.INT && (q = i.RGB32I)), y === i.RGBA_INTEGER && (B === i.UNSIGNED_BYTE && (q = i.RGBA8UI), B === i.UNSIGNED_SHORT && (q = i.RGBA16UI), B === i.UNSIGNED_INT && (q = i.RGBA32UI), B === i.BYTE && (q = i.RGBA8I), B === i.SHORT && (q = i.RGBA16I), B === i.INT && (q = i.RGBA32I)), y === i.RGB && B === i.UNSIGNED_INT_5_9_9_9_REV && (q = i.RGB9_E5), y === i.RGBA) {
      const Et = K ? Cr : Kt.getTransfer(X);
      B === i.FLOAT && (q = i.RGBA32F), B === i.HALF_FLOAT && (q = i.RGBA16F), B === i.UNSIGNED_BYTE && (q = Et === se ? i.SRGB8_ALPHA8 : i.RGBA8), B === i.UNSIGNED_SHORT_4_4_4_4 && (q = i.RGBA4), B === i.UNSIGNED_SHORT_5_5_5_1 && (q = i.RGB5_A1);
    }
    return (q === i.R16F || q === i.R32F || q === i.RG16F || q === i.RG32F || q === i.RGBA16F || q === i.RGBA32F) && t.get("EXT_color_buffer_float"), q;
  }
  function v(T, y) {
    let B;
    return T ? y === null || y === oi || y === Wi ? B = i.DEPTH24_STENCIL8 : y === gn ? B = i.DEPTH32F_STENCIL8 : y === Es && (B = i.DEPTH24_STENCIL8, console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")) : y === null || y === oi || y === Wi ? B = i.DEPTH_COMPONENT24 : y === gn ? B = i.DEPTH_COMPONENT32F : y === Es && (B = i.DEPTH_COMPONENT16), B;
  }
  function w(T, y) {
    return f(T) === !0 || T.isFramebufferTexture && T.minFilter !== Je && T.minFilter !== sn ? Math.log2(Math.max(y.width, y.height)) + 1 : T.mipmaps !== void 0 && T.mipmaps.length > 0 ? T.mipmaps.length : T.isCompressedTexture && Array.isArray(T.image) ? y.mipmaps.length : 1;
  }
  function A(T) {
    const y = T.target;
    y.removeEventListener("dispose", A), D(y), y.isVideoTexture && h.delete(y);
  }
  function C(T) {
    const y = T.target;
    y.removeEventListener("dispose", C), M(y);
  }
  function D(T) {
    const y = n.get(T);
    if (y.__webglInit === void 0) return;
    const B = T.source, X = d.get(B);
    if (X) {
      const K = X[y.__cacheKey];
      K.usedTimes--, K.usedTimes === 0 && S(T), Object.keys(X).length === 0 && d.delete(B);
    }
    n.remove(T);
  }
  function S(T) {
    const y = n.get(T);
    i.deleteTexture(y.__webglTexture);
    const B = T.source, X = d.get(B);
    delete X[y.__cacheKey], a.memory.textures--;
  }
  function M(T) {
    const y = n.get(T);
    if (T.depthTexture && (T.depthTexture.dispose(), n.remove(T.depthTexture)), T.isWebGLCubeRenderTarget)
      for (let X = 0; X < 6; X++) {
        if (Array.isArray(y.__webglFramebuffer[X]))
          for (let K = 0; K < y.__webglFramebuffer[X].length; K++) i.deleteFramebuffer(y.__webglFramebuffer[X][K]);
        else
          i.deleteFramebuffer(y.__webglFramebuffer[X]);
        y.__webglDepthbuffer && i.deleteRenderbuffer(y.__webglDepthbuffer[X]);
      }
    else {
      if (Array.isArray(y.__webglFramebuffer))
        for (let X = 0; X < y.__webglFramebuffer.length; X++) i.deleteFramebuffer(y.__webglFramebuffer[X]);
      else
        i.deleteFramebuffer(y.__webglFramebuffer);
      if (y.__webglDepthbuffer && i.deleteRenderbuffer(y.__webglDepthbuffer), y.__webglMultisampledFramebuffer && i.deleteFramebuffer(y.__webglMultisampledFramebuffer), y.__webglColorRenderbuffer)
        for (let X = 0; X < y.__webglColorRenderbuffer.length; X++)
          y.__webglColorRenderbuffer[X] && i.deleteRenderbuffer(y.__webglColorRenderbuffer[X]);
      y.__webglDepthRenderbuffer && i.deleteRenderbuffer(y.__webglDepthRenderbuffer);
    }
    const B = T.textures;
    for (let X = 0, K = B.length; X < K; X++) {
      const q = n.get(B[X]);
      q.__webglTexture && (i.deleteTexture(q.__webglTexture), a.memory.textures--), n.remove(B[X]);
    }
    n.remove(T);
  }
  let P = 0;
  function z() {
    P = 0;
  }
  function O() {
    const T = P;
    return T >= s.maxTextures && console.warn("THREE.WebGLTextures: Trying to use " + T + " texture units while this GPU supports only " + s.maxTextures), P += 1, T;
  }
  function F(T) {
    const y = [];
    return y.push(T.wrapS), y.push(T.wrapT), y.push(T.wrapR || 0), y.push(T.magFilter), y.push(T.minFilter), y.push(T.anisotropy), y.push(T.internalFormat), y.push(T.format), y.push(T.type), y.push(T.generateMipmaps), y.push(T.premultiplyAlpha), y.push(T.flipY), y.push(T.unpackAlignment), y.push(T.colorSpace), y.join();
  }
  function W(T, y) {
    const B = n.get(T);
    if (T.isVideoTexture && lt(T), T.isRenderTargetTexture === !1 && T.version > 0 && B.__version !== T.version) {
      const X = T.image;
      if (X === null)
        console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");
      else if (X.complete === !1)
        console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");
      else {
        Y(B, T, y);
        return;
      }
    }
    e.bindTexture(i.TEXTURE_2D, B.__webglTexture, i.TEXTURE0 + y);
  }
  function H(T, y) {
    const B = n.get(T);
    if (T.version > 0 && B.__version !== T.version) {
      Y(B, T, y);
      return;
    }
    e.bindTexture(i.TEXTURE_2D_ARRAY, B.__webglTexture, i.TEXTURE0 + y);
  }
  function J(T, y) {
    const B = n.get(T);
    if (T.version > 0 && B.__version !== T.version) {
      Y(B, T, y);
      return;
    }
    e.bindTexture(i.TEXTURE_3D, B.__webglTexture, i.TEXTURE0 + y);
  }
  function k(T, y) {
    const B = n.get(T);
    if (T.version > 0 && B.__version !== T.version) {
      st(B, T, y);
      return;
    }
    e.bindTexture(i.TEXTURE_CUBE_MAP, B.__webglTexture, i.TEXTURE0 + y);
  }
  const tt = {
    [Oo]: i.REPEAT,
    [ti]: i.CLAMP_TO_EDGE,
    [Fo]: i.MIRRORED_REPEAT
  }, nt = {
    [Je]: i.NEAREST,
    [Zu]: i.NEAREST_MIPMAP_NEAREST,
    [Os]: i.NEAREST_MIPMAP_LINEAR,
    [sn]: i.LINEAR,
    [zr]: i.LINEAR_MIPMAP_NEAREST,
    [ei]: i.LINEAR_MIPMAP_LINEAR
  }, ht = {
    [td]: i.NEVER,
    [od]: i.ALWAYS,
    [ed]: i.LESS,
    [nh]: i.LEQUAL,
    [nd]: i.EQUAL,
    [rd]: i.GEQUAL,
    [id]: i.GREATER,
    [sd]: i.NOTEQUAL
  };
  function Pt(T, y) {
    if (y.type === gn && t.has("OES_texture_float_linear") === !1 && (y.magFilter === sn || y.magFilter === zr || y.magFilter === Os || y.magFilter === ei || y.minFilter === sn || y.minFilter === zr || y.minFilter === Os || y.minFilter === ei) && console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."), i.texParameteri(T, i.TEXTURE_WRAP_S, tt[y.wrapS]), i.texParameteri(T, i.TEXTURE_WRAP_T, tt[y.wrapT]), (T === i.TEXTURE_3D || T === i.TEXTURE_2D_ARRAY) && i.texParameteri(T, i.TEXTURE_WRAP_R, tt[y.wrapR]), i.texParameteri(T, i.TEXTURE_MAG_FILTER, nt[y.magFilter]), i.texParameteri(T, i.TEXTURE_MIN_FILTER, nt[y.minFilter]), y.compareFunction && (i.texParameteri(T, i.TEXTURE_COMPARE_MODE, i.COMPARE_REF_TO_TEXTURE), i.texParameteri(T, i.TEXTURE_COMPARE_FUNC, ht[y.compareFunction])), t.has("EXT_texture_filter_anisotropic") === !0) {
      if (y.magFilter === Je || y.minFilter !== Os && y.minFilter !== ei || y.type === gn && t.has("OES_texture_float_linear") === !1) return;
      if (y.anisotropy > 1 || n.get(y).__currentAnisotropy) {
        const B = t.get("EXT_texture_filter_anisotropic");
        i.texParameterf(T, B.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(y.anisotropy, s.getMaxAnisotropy())), n.get(y).__currentAnisotropy = y.anisotropy;
      }
    }
  }
  function Yt(T, y) {
    let B = !1;
    T.__webglInit === void 0 && (T.__webglInit = !0, y.addEventListener("dispose", A));
    const X = y.source;
    let K = d.get(X);
    K === void 0 && (K = {}, d.set(X, K));
    const q = F(y);
    if (q !== T.__cacheKey) {
      K[q] === void 0 && (K[q] = {
        texture: i.createTexture(),
        usedTimes: 0
      }, a.memory.textures++, B = !0), K[q].usedTimes++;
      const Et = K[T.__cacheKey];
      Et !== void 0 && (K[T.__cacheKey].usedTimes--, Et.usedTimes === 0 && S(y)), T.__cacheKey = q, T.__webglTexture = K[q].texture;
    }
    return B;
  }
  function Y(T, y, B) {
    let X = i.TEXTURE_2D;
    (y.isDataArrayTexture || y.isCompressedArrayTexture) && (X = i.TEXTURE_2D_ARRAY), y.isData3DTexture && (X = i.TEXTURE_3D);
    const K = Yt(T, y), q = y.source;
    e.bindTexture(X, T.__webglTexture, i.TEXTURE0 + B);
    const Et = n.get(q);
    if (q.version !== Et.__version || K === !0) {
      e.activeTexture(i.TEXTURE0 + B);
      const ut = Kt.getPrimaries(Kt.workingColorSpace), _t = y.colorSpace === Ln ? null : Kt.getPrimaries(y.colorSpace), Xt = y.colorSpace === Ln || ut === _t ? i.NONE : i.BROWSER_DEFAULT_WEBGL;
      i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, y.flipY), i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, y.premultiplyAlpha), i.pixelStorei(i.UNPACK_ALIGNMENT, y.unpackAlignment), i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL, Xt);
      let it = _(y.image, !1, s.maxTextureSize);
      it = It(y, it);
      const xt = r.convert(y.format, y.colorSpace), Ut = r.convert(y.type);
      let Ot = x(y.internalFormat, xt, Ut, y.colorSpace, y.isVideoTexture);
      Pt(X, y);
      let yt;
      const jt = y.mipmaps, Vt = y.isVideoTexture !== !0, ce = Et.__version === void 0 || K === !0, I = q.dataReady, dt = w(y, it);
      if (y.isDepthTexture)
        Ot = v(y.format === Xi, y.type), ce && (Vt ? e.texStorage2D(i.TEXTURE_2D, 1, Ot, it.width, it.height) : e.texImage2D(i.TEXTURE_2D, 0, Ot, it.width, it.height, 0, xt, Ut, null));
      else if (y.isDataTexture)
        if (jt.length > 0) {
          Vt && ce && e.texStorage2D(i.TEXTURE_2D, dt, Ot, jt[0].width, jt[0].height);
          for (let $ = 0, j = jt.length; $ < j; $++)
            yt = jt[$], Vt ? I && e.texSubImage2D(i.TEXTURE_2D, $, 0, 0, yt.width, yt.height, xt, Ut, yt.data) : e.texImage2D(i.TEXTURE_2D, $, Ot, yt.width, yt.height, 0, xt, Ut, yt.data);
          y.generateMipmaps = !1;
        } else
          Vt ? (ce && e.texStorage2D(i.TEXTURE_2D, dt, Ot, it.width, it.height), I && e.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, it.width, it.height, xt, Ut, it.data)) : e.texImage2D(i.TEXTURE_2D, 0, Ot, it.width, it.height, 0, xt, Ut, it.data);
      else if (y.isCompressedTexture)
        if (y.isCompressedArrayTexture) {
          Vt && ce && e.texStorage3D(i.TEXTURE_2D_ARRAY, dt, Ot, jt[0].width, jt[0].height, it.depth);
          for (let $ = 0, j = jt.length; $ < j; $++)
            if (yt = jt[$], y.format !== Ke)
              if (xt !== null)
                if (Vt) {
                  if (I)
                    if (y.layerUpdates.size > 0) {
                      const mt = pc(yt.width, yt.height, y.format, y.type);
                      for (const ft of y.layerUpdates) {
                        const Bt = yt.data.subarray(
                          ft * mt / yt.data.BYTES_PER_ELEMENT,
                          (ft + 1) * mt / yt.data.BYTES_PER_ELEMENT
                        );
                        e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY, $, 0, 0, ft, yt.width, yt.height, 1, xt, Bt);
                      }
                      y.clearLayerUpdates();
                    } else
                      e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY, $, 0, 0, 0, yt.width, yt.height, it.depth, xt, yt.data);
                } else
                  e.compressedTexImage3D(i.TEXTURE_2D_ARRAY, $, Ot, yt.width, yt.height, it.depth, 0, yt.data, 0, 0);
              else
                console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");
            else
              Vt ? I && e.texSubImage3D(i.TEXTURE_2D_ARRAY, $, 0, 0, 0, yt.width, yt.height, it.depth, xt, Ut, yt.data) : e.texImage3D(i.TEXTURE_2D_ARRAY, $, Ot, yt.width, yt.height, it.depth, 0, xt, Ut, yt.data);
        } else {
          Vt && ce && e.texStorage2D(i.TEXTURE_2D, dt, Ot, jt[0].width, jt[0].height);
          for (let $ = 0, j = jt.length; $ < j; $++)
            yt = jt[$], y.format !== Ke ? xt !== null ? Vt ? I && e.compressedTexSubImage2D(i.TEXTURE_2D, $, 0, 0, yt.width, yt.height, xt, yt.data) : e.compressedTexImage2D(i.TEXTURE_2D, $, Ot, yt.width, yt.height, 0, yt.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : Vt ? I && e.texSubImage2D(i.TEXTURE_2D, $, 0, 0, yt.width, yt.height, xt, Ut, yt.data) : e.texImage2D(i.TEXTURE_2D, $, Ot, yt.width, yt.height, 0, xt, Ut, yt.data);
        }
      else if (y.isDataArrayTexture)
        if (Vt) {
          if (ce && e.texStorage3D(i.TEXTURE_2D_ARRAY, dt, Ot, it.width, it.height, it.depth), I)
            if (y.layerUpdates.size > 0) {
              const $ = pc(it.width, it.height, y.format, y.type);
              for (const j of y.layerUpdates) {
                const mt = it.data.subarray(
                  j * $ / it.data.BYTES_PER_ELEMENT,
                  (j + 1) * $ / it.data.BYTES_PER_ELEMENT
                );
                e.texSubImage3D(i.TEXTURE_2D_ARRAY, 0, 0, 0, j, it.width, it.height, 1, xt, Ut, mt);
              }
              y.clearLayerUpdates();
            } else
              e.texSubImage3D(i.TEXTURE_2D_ARRAY, 0, 0, 0, 0, it.width, it.height, it.depth, xt, Ut, it.data);
        } else
          e.texImage3D(i.TEXTURE_2D_ARRAY, 0, Ot, it.width, it.height, it.depth, 0, xt, Ut, it.data);
      else if (y.isData3DTexture)
        Vt ? (ce && e.texStorage3D(i.TEXTURE_3D, dt, Ot, it.width, it.height, it.depth), I && e.texSubImage3D(i.TEXTURE_3D, 0, 0, 0, 0, it.width, it.height, it.depth, xt, Ut, it.data)) : e.texImage3D(i.TEXTURE_3D, 0, Ot, it.width, it.height, it.depth, 0, xt, Ut, it.data);
      else if (y.isFramebufferTexture) {
        if (ce)
          if (Vt)
            e.texStorage2D(i.TEXTURE_2D, dt, Ot, it.width, it.height);
          else {
            let $ = it.width, j = it.height;
            for (let mt = 0; mt < dt; mt++)
              e.texImage2D(i.TEXTURE_2D, mt, Ot, $, j, 0, xt, Ut, null), $ >>= 1, j >>= 1;
          }
      } else if (jt.length > 0) {
        if (Vt && ce) {
          const $ = gt(jt[0]);
          e.texStorage2D(i.TEXTURE_2D, dt, Ot, $.width, $.height);
        }
        for (let $ = 0, j = jt.length; $ < j; $++)
          yt = jt[$], Vt ? I && e.texSubImage2D(i.TEXTURE_2D, $, 0, 0, xt, Ut, yt) : e.texImage2D(i.TEXTURE_2D, $, Ot, xt, Ut, yt);
        y.generateMipmaps = !1;
      } else if (Vt) {
        if (ce) {
          const $ = gt(it);
          e.texStorage2D(i.TEXTURE_2D, dt, Ot, $.width, $.height);
        }
        I && e.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, xt, Ut, it);
      } else
        e.texImage2D(i.TEXTURE_2D, 0, Ot, xt, Ut, it);
      f(y) && m(X), Et.__version = q.version, y.onUpdate && y.onUpdate(y);
    }
    T.__version = y.version;
  }
  function st(T, y, B) {
    if (y.image.length !== 6) return;
    const X = Yt(T, y), K = y.source;
    e.bindTexture(i.TEXTURE_CUBE_MAP, T.__webglTexture, i.TEXTURE0 + B);
    const q = n.get(K);
    if (K.version !== q.__version || X === !0) {
      e.activeTexture(i.TEXTURE0 + B);
      const Et = Kt.getPrimaries(Kt.workingColorSpace), ut = y.colorSpace === Ln ? null : Kt.getPrimaries(y.colorSpace), _t = y.colorSpace === Ln || Et === ut ? i.NONE : i.BROWSER_DEFAULT_WEBGL;
      i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, y.flipY), i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, y.premultiplyAlpha), i.pixelStorei(i.UNPACK_ALIGNMENT, y.unpackAlignment), i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL, _t);
      const Xt = y.isCompressedTexture || y.image[0].isCompressedTexture, it = y.image[0] && y.image[0].isDataTexture, xt = [];
      for (let j = 0; j < 6; j++)
        !Xt && !it ? xt[j] = _(y.image[j], !0, s.maxCubemapSize) : xt[j] = it ? y.image[j].image : y.image[j], xt[j] = It(y, xt[j]);
      const Ut = xt[0], Ot = r.convert(y.format, y.colorSpace), yt = r.convert(y.type), jt = x(y.internalFormat, Ot, yt, y.colorSpace), Vt = y.isVideoTexture !== !0, ce = q.__version === void 0 || X === !0, I = K.dataReady;
      let dt = w(y, Ut);
      Pt(i.TEXTURE_CUBE_MAP, y);
      let $;
      if (Xt) {
        Vt && ce && e.texStorage2D(i.TEXTURE_CUBE_MAP, dt, jt, Ut.width, Ut.height);
        for (let j = 0; j < 6; j++) {
          $ = xt[j].mipmaps;
          for (let mt = 0; mt < $.length; mt++) {
            const ft = $[mt];
            y.format !== Ke ? Ot !== null ? Vt ? I && e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, mt, 0, 0, ft.width, ft.height, Ot, ft.data) : e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, mt, jt, ft.width, ft.height, 0, ft.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : Vt ? I && e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, mt, 0, 0, ft.width, ft.height, Ot, yt, ft.data) : e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, mt, jt, ft.width, ft.height, 0, Ot, yt, ft.data);
          }
        }
      } else {
        if ($ = y.mipmaps, Vt && ce) {
          $.length > 0 && dt++;
          const j = gt(xt[0]);
          e.texStorage2D(i.TEXTURE_CUBE_MAP, dt, jt, j.width, j.height);
        }
        for (let j = 0; j < 6; j++)
          if (it) {
            Vt ? I && e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, 0, 0, 0, xt[j].width, xt[j].height, Ot, yt, xt[j].data) : e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, 0, jt, xt[j].width, xt[j].height, 0, Ot, yt, xt[j].data);
            for (let mt = 0; mt < $.length; mt++) {
              const Bt = $[mt].image[j].image;
              Vt ? I && e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, mt + 1, 0, 0, Bt.width, Bt.height, Ot, yt, Bt.data) : e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, mt + 1, jt, Bt.width, Bt.height, 0, Ot, yt, Bt.data);
            }
          } else {
            Vt ? I && e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, 0, 0, 0, Ot, yt, xt[j]) : e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, 0, jt, Ot, yt, xt[j]);
            for (let mt = 0; mt < $.length; mt++) {
              const ft = $[mt];
              Vt ? I && e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, mt + 1, 0, 0, Ot, yt, ft.image[j]) : e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, mt + 1, jt, Ot, yt, ft.image[j]);
            }
          }
      }
      f(y) && m(i.TEXTURE_CUBE_MAP), q.__version = K.version, y.onUpdate && y.onUpdate(y);
    }
    T.__version = y.version;
  }
  function bt(T, y, B, X, K, q) {
    const Et = r.convert(B.format, B.colorSpace), ut = r.convert(B.type), _t = x(B.internalFormat, Et, ut, B.colorSpace), Xt = n.get(y), it = n.get(B);
    if (it.__renderTarget = y, !Xt.__hasExternalTextures) {
      const xt = Math.max(1, y.width >> q), Ut = Math.max(1, y.height >> q);
      K === i.TEXTURE_3D || K === i.TEXTURE_2D_ARRAY ? e.texImage3D(K, q, _t, xt, Ut, y.depth, 0, Et, ut, null) : e.texImage2D(K, q, _t, xt, Ut, 0, Et, ut, null);
    }
    e.bindFramebuffer(i.FRAMEBUFFER, T), vt(y) ? o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, X, K, it.__webglTexture, 0, Q(y)) : (K === i.TEXTURE_2D || K >= i.TEXTURE_CUBE_MAP_POSITIVE_X && K <= i.TEXTURE_CUBE_MAP_NEGATIVE_Z) && i.framebufferTexture2D(i.FRAMEBUFFER, X, K, it.__webglTexture, q), e.bindFramebuffer(i.FRAMEBUFFER, null);
  }
  function at(T, y, B) {
    if (i.bindRenderbuffer(i.RENDERBUFFER, T), y.depthBuffer) {
      const X = y.depthTexture, K = X && X.isDepthTexture ? X.type : null, q = v(y.stencilBuffer, K), Et = y.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, ut = Q(y);
      vt(y) ? o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER, ut, q, y.width, y.height) : B ? i.renderbufferStorageMultisample(i.RENDERBUFFER, ut, q, y.width, y.height) : i.renderbufferStorage(i.RENDERBUFFER, q, y.width, y.height), i.framebufferRenderbuffer(i.FRAMEBUFFER, Et, i.RENDERBUFFER, T);
    } else {
      const X = y.textures;
      for (let K = 0; K < X.length; K++) {
        const q = X[K], Et = r.convert(q.format, q.colorSpace), ut = r.convert(q.type), _t = x(q.internalFormat, Et, ut, q.colorSpace), Xt = Q(y);
        B && vt(y) === !1 ? i.renderbufferStorageMultisample(i.RENDERBUFFER, Xt, _t, y.width, y.height) : vt(y) ? o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER, Xt, _t, y.width, y.height) : i.renderbufferStorage(i.RENDERBUFFER, _t, y.width, y.height);
      }
    }
    i.bindRenderbuffer(i.RENDERBUFFER, null);
  }
  function Dt(T, y) {
    if (y && y.isWebGLCubeRenderTarget) throw new Error("Depth Texture with cube render targets is not supported");
    if (e.bindFramebuffer(i.FRAMEBUFFER, T), !(y.depthTexture && y.depthTexture.isDepthTexture))
      throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
    const X = n.get(y.depthTexture);
    X.__renderTarget = y, (!X.__webglTexture || y.depthTexture.image.width !== y.width || y.depthTexture.image.height !== y.height) && (y.depthTexture.image.width = y.width, y.depthTexture.image.height = y.height, y.depthTexture.needsUpdate = !0), W(y.depthTexture, 0);
    const K = X.__webglTexture, q = Q(y);
    if (y.depthTexture.format === ki)
      vt(y) ? o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, i.DEPTH_ATTACHMENT, i.TEXTURE_2D, K, 0, q) : i.framebufferTexture2D(i.FRAMEBUFFER, i.DEPTH_ATTACHMENT, i.TEXTURE_2D, K, 0);
    else if (y.depthTexture.format === Xi)
      vt(y) ? o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, i.DEPTH_STENCIL_ATTACHMENT, i.TEXTURE_2D, K, 0, q) : i.framebufferTexture2D(i.FRAMEBUFFER, i.DEPTH_STENCIL_ATTACHMENT, i.TEXTURE_2D, K, 0);
    else
      throw new Error("Unknown depthTexture format");
  }
  function Ft(T) {
    const y = n.get(T), B = T.isWebGLCubeRenderTarget === !0;
    if (y.__boundDepthTexture !== T.depthTexture) {
      const X = T.depthTexture;
      if (y.__depthDisposeCallback && y.__depthDisposeCallback(), X) {
        const K = () => {
          delete y.__boundDepthTexture, delete y.__depthDisposeCallback, X.removeEventListener("dispose", K);
        };
        X.addEventListener("dispose", K), y.__depthDisposeCallback = K;
      }
      y.__boundDepthTexture = X;
    }
    if (T.depthTexture && !y.__autoAllocateDepthBuffer) {
      if (B) throw new Error("target.depthTexture not supported in Cube render targets");
      Dt(y.__webglFramebuffer, T);
    } else if (B) {
      y.__webglDepthbuffer = [];
      for (let X = 0; X < 6; X++)
        if (e.bindFramebuffer(i.FRAMEBUFFER, y.__webglFramebuffer[X]), y.__webglDepthbuffer[X] === void 0)
          y.__webglDepthbuffer[X] = i.createRenderbuffer(), at(y.__webglDepthbuffer[X], T, !1);
        else {
          const K = T.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, q = y.__webglDepthbuffer[X];
          i.bindRenderbuffer(i.RENDERBUFFER, q), i.framebufferRenderbuffer(i.FRAMEBUFFER, K, i.RENDERBUFFER, q);
        }
    } else if (e.bindFramebuffer(i.FRAMEBUFFER, y.__webglFramebuffer), y.__webglDepthbuffer === void 0)
      y.__webglDepthbuffer = i.createRenderbuffer(), at(y.__webglDepthbuffer, T, !1);
    else {
      const X = T.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, K = y.__webglDepthbuffer;
      i.bindRenderbuffer(i.RENDERBUFFER, K), i.framebufferRenderbuffer(i.FRAMEBUFFER, X, i.RENDERBUFFER, K);
    }
    e.bindFramebuffer(i.FRAMEBUFFER, null);
  }
  function Nt(T, y, B) {
    const X = n.get(T);
    y !== void 0 && bt(X.__webglFramebuffer, T, T.texture, i.COLOR_ATTACHMENT0, i.TEXTURE_2D, 0), B !== void 0 && Ft(T);
  }
  function Zt(T) {
    const y = T.texture, B = n.get(T), X = n.get(y);
    T.addEventListener("dispose", C);
    const K = T.textures, q = T.isWebGLCubeRenderTarget === !0, Et = K.length > 1;
    if (Et || (X.__webglTexture === void 0 && (X.__webglTexture = i.createTexture()), X.__version = y.version, a.memory.textures++), q) {
      B.__webglFramebuffer = [];
      for (let ut = 0; ut < 6; ut++)
        if (y.mipmaps && y.mipmaps.length > 0) {
          B.__webglFramebuffer[ut] = [];
          for (let _t = 0; _t < y.mipmaps.length; _t++)
            B.__webglFramebuffer[ut][_t] = i.createFramebuffer();
        } else
          B.__webglFramebuffer[ut] = i.createFramebuffer();
    } else {
      if (y.mipmaps && y.mipmaps.length > 0) {
        B.__webglFramebuffer = [];
        for (let ut = 0; ut < y.mipmaps.length; ut++)
          B.__webglFramebuffer[ut] = i.createFramebuffer();
      } else
        B.__webglFramebuffer = i.createFramebuffer();
      if (Et)
        for (let ut = 0, _t = K.length; ut < _t; ut++) {
          const Xt = n.get(K[ut]);
          Xt.__webglTexture === void 0 && (Xt.__webglTexture = i.createTexture(), a.memory.textures++);
        }
      if (T.samples > 0 && vt(T) === !1) {
        B.__webglMultisampledFramebuffer = i.createFramebuffer(), B.__webglColorRenderbuffer = [], e.bindFramebuffer(i.FRAMEBUFFER, B.__webglMultisampledFramebuffer);
        for (let ut = 0; ut < K.length; ut++) {
          const _t = K[ut];
          B.__webglColorRenderbuffer[ut] = i.createRenderbuffer(), i.bindRenderbuffer(i.RENDERBUFFER, B.__webglColorRenderbuffer[ut]);
          const Xt = r.convert(_t.format, _t.colorSpace), it = r.convert(_t.type), xt = x(_t.internalFormat, Xt, it, _t.colorSpace, T.isXRRenderTarget === !0), Ut = Q(T);
          i.renderbufferStorageMultisample(i.RENDERBUFFER, Ut, xt, T.width, T.height), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + ut, i.RENDERBUFFER, B.__webglColorRenderbuffer[ut]);
        }
        i.bindRenderbuffer(i.RENDERBUFFER, null), T.depthBuffer && (B.__webglDepthRenderbuffer = i.createRenderbuffer(), at(B.__webglDepthRenderbuffer, T, !0)), e.bindFramebuffer(i.FRAMEBUFFER, null);
      }
    }
    if (q) {
      e.bindTexture(i.TEXTURE_CUBE_MAP, X.__webglTexture), Pt(i.TEXTURE_CUBE_MAP, y);
      for (let ut = 0; ut < 6; ut++)
        if (y.mipmaps && y.mipmaps.length > 0)
          for (let _t = 0; _t < y.mipmaps.length; _t++)
            bt(B.__webglFramebuffer[ut][_t], T, y, i.COLOR_ATTACHMENT0, i.TEXTURE_CUBE_MAP_POSITIVE_X + ut, _t);
        else
          bt(B.__webglFramebuffer[ut], T, y, i.COLOR_ATTACHMENT0, i.TEXTURE_CUBE_MAP_POSITIVE_X + ut, 0);
      f(y) && m(i.TEXTURE_CUBE_MAP), e.unbindTexture();
    } else if (Et) {
      for (let ut = 0, _t = K.length; ut < _t; ut++) {
        const Xt = K[ut], it = n.get(Xt);
        e.bindTexture(i.TEXTURE_2D, it.__webglTexture), Pt(i.TEXTURE_2D, Xt), bt(B.__webglFramebuffer, T, Xt, i.COLOR_ATTACHMENT0 + ut, i.TEXTURE_2D, 0), f(Xt) && m(i.TEXTURE_2D);
      }
      e.unbindTexture();
    } else {
      let ut = i.TEXTURE_2D;
      if ((T.isWebGL3DRenderTarget || T.isWebGLArrayRenderTarget) && (ut = T.isWebGL3DRenderTarget ? i.TEXTURE_3D : i.TEXTURE_2D_ARRAY), e.bindTexture(ut, X.__webglTexture), Pt(ut, y), y.mipmaps && y.mipmaps.length > 0)
        for (let _t = 0; _t < y.mipmaps.length; _t++)
          bt(B.__webglFramebuffer[_t], T, y, i.COLOR_ATTACHMENT0, ut, _t);
      else
        bt(B.__webglFramebuffer, T, y, i.COLOR_ATTACHMENT0, ut, 0);
      f(y) && m(ut), e.unbindTexture();
    }
    T.depthBuffer && Ft(T);
  }
  function Z(T) {
    const y = T.textures;
    for (let B = 0, X = y.length; B < X; B++) {
      const K = y[B];
      if (f(K)) {
        const q = b(T), Et = n.get(K).__webglTexture;
        e.bindTexture(q, Et), m(q), e.unbindTexture();
      }
    }
  }
  const rt = [], R = [];
  function Ct(T) {
    if (T.samples > 0) {
      if (vt(T) === !1) {
        const y = T.textures, B = T.width, X = T.height;
        let K = i.COLOR_BUFFER_BIT;
        const q = T.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, Et = n.get(T), ut = y.length > 1;
        if (ut)
          for (let _t = 0; _t < y.length; _t++)
            e.bindFramebuffer(i.FRAMEBUFFER, Et.__webglMultisampledFramebuffer), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + _t, i.RENDERBUFFER, null), e.bindFramebuffer(i.FRAMEBUFFER, Et.__webglFramebuffer), i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0 + _t, i.TEXTURE_2D, null, 0);
        e.bindFramebuffer(i.READ_FRAMEBUFFER, Et.__webglMultisampledFramebuffer), e.bindFramebuffer(i.DRAW_FRAMEBUFFER, Et.__webglFramebuffer);
        for (let _t = 0; _t < y.length; _t++) {
          if (T.resolveDepthBuffer && (T.depthBuffer && (K |= i.DEPTH_BUFFER_BIT), T.stencilBuffer && T.resolveStencilBuffer && (K |= i.STENCIL_BUFFER_BIT)), ut) {
            i.framebufferRenderbuffer(i.READ_FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.RENDERBUFFER, Et.__webglColorRenderbuffer[_t]);
            const Xt = n.get(y[_t]).__webglTexture;
            i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.TEXTURE_2D, Xt, 0);
          }
          i.blitFramebuffer(0, 0, B, X, 0, 0, B, X, K, i.NEAREST), l === !0 && (rt.length = 0, R.length = 0, rt.push(i.COLOR_ATTACHMENT0 + _t), T.depthBuffer && T.resolveDepthBuffer === !1 && (rt.push(q), R.push(q), i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER, R)), i.invalidateFramebuffer(i.READ_FRAMEBUFFER, rt));
        }
        if (e.bindFramebuffer(i.READ_FRAMEBUFFER, null), e.bindFramebuffer(i.DRAW_FRAMEBUFFER, null), ut)
          for (let _t = 0; _t < y.length; _t++) {
            e.bindFramebuffer(i.FRAMEBUFFER, Et.__webglMultisampledFramebuffer), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + _t, i.RENDERBUFFER, Et.__webglColorRenderbuffer[_t]);
            const Xt = n.get(y[_t]).__webglTexture;
            e.bindFramebuffer(i.FRAMEBUFFER, Et.__webglFramebuffer), i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0 + _t, i.TEXTURE_2D, Xt, 0);
          }
        e.bindFramebuffer(i.DRAW_FRAMEBUFFER, Et.__webglMultisampledFramebuffer);
      } else if (T.depthBuffer && T.resolveDepthBuffer === !1 && l) {
        const y = T.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT;
        i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER, [y]);
      }
    }
  }
  function Q(T) {
    return Math.min(s.maxSamples, T.samples);
  }
  function vt(T) {
    const y = n.get(T);
    return T.samples > 0 && t.has("WEBGL_multisampled_render_to_texture") === !0 && y.__useRenderToTexture !== !1;
  }
  function lt(T) {
    const y = a.render.frame;
    h.get(T) !== y && (h.set(T, y), T.update());
  }
  function It(T, y) {
    const B = T.colorSpace, X = T.format, K = T.type;
    return T.isCompressedTexture === !0 || T.isVideoTexture === !0 || B !== qi && B !== Ln && (Kt.getTransfer(B) === se ? (X !== Ke || K !== yn) && console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.") : console.error("THREE.WebGLTextures: Unsupported texture color space:", B)), y;
  }
  function gt(T) {
    return typeof HTMLImageElement < "u" && T instanceof HTMLImageElement ? (c.width = T.naturalWidth || T.width, c.height = T.naturalHeight || T.height) : typeof VideoFrame < "u" && T instanceof VideoFrame ? (c.width = T.displayWidth, c.height = T.displayHeight) : (c.width = T.width, c.height = T.height), c;
  }
  this.allocateTextureUnit = O, this.resetTextureUnits = z, this.setTexture2D = W, this.setTexture2DArray = H, this.setTexture3D = J, this.setTextureCube = k, this.rebindTextures = Nt, this.setupRenderTarget = Zt, this.updateRenderTargetMipmap = Z, this.updateMultisampleRenderTarget = Ct, this.setupDepthRenderbuffer = Ft, this.setupFrameBufferTexture = bt, this.useMultisampledRTT = vt;
}
function A_(i, t) {
  function e(n, s = Ln) {
    let r;
    const a = Kt.getTransfer(s);
    if (n === yn) return i.UNSIGNED_BYTE;
    if (n === Aa) return i.UNSIGNED_SHORT_4_4_4_4;
    if (n === Ca) return i.UNSIGNED_SHORT_5_5_5_1;
    if (n === Yc) return i.UNSIGNED_INT_5_9_9_9_REV;
    if (n === Wc) return i.BYTE;
    if (n === Xc) return i.SHORT;
    if (n === Es) return i.UNSIGNED_SHORT;
    if (n === Ta) return i.INT;
    if (n === oi) return i.UNSIGNED_INT;
    if (n === gn) return i.FLOAT;
    if (n === Ps) return i.HALF_FLOAT;
    if (n === qc) return i.ALPHA;
    if (n === jc) return i.RGB;
    if (n === Ke) return i.RGBA;
    if (n === Zc) return i.LUMINANCE;
    if (n === Kc) return i.LUMINANCE_ALPHA;
    if (n === ki) return i.DEPTH_COMPONENT;
    if (n === Xi) return i.DEPTH_STENCIL;
    if (n === Jc) return i.RED;
    if (n === Ra) return i.RED_INTEGER;
    if (n === Qc) return i.RG;
    if (n === Pa) return i.RG_INTEGER;
    if (n === La) return i.RGBA_INTEGER;
    if (n === dr || n === fr || n === pr || n === mr)
      if (a === se)
        if (r = t.get("WEBGL_compressed_texture_s3tc_srgb"), r !== null) {
          if (n === dr) return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;
          if (n === fr) return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
          if (n === pr) return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
          if (n === mr) return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
        } else
          return null;
      else if (r = t.get("WEBGL_compressed_texture_s3tc"), r !== null) {
        if (n === dr) return r.COMPRESSED_RGB_S3TC_DXT1_EXT;
        if (n === fr) return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;
        if (n === pr) return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;
        if (n === mr) return r.COMPRESSED_RGBA_S3TC_DXT5_EXT;
      } else
        return null;
    if (n === ko || n === Bo || n === zo || n === Ho)
      if (r = t.get("WEBGL_compressed_texture_pvrtc"), r !== null) {
        if (n === ko) return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
        if (n === Bo) return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
        if (n === zo) return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
        if (n === Ho) return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
      } else
        return null;
    if (n === Vo || n === Go || n === $o)
      if (r = t.get("WEBGL_compressed_texture_etc"), r !== null) {
        if (n === Vo || n === Go) return a === se ? r.COMPRESSED_SRGB8_ETC2 : r.COMPRESSED_RGB8_ETC2;
        if (n === $o) return a === se ? r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : r.COMPRESSED_RGBA8_ETC2_EAC;
      } else
        return null;
    if (n === Wo || n === Xo || n === Yo || n === qo || n === jo || n === Zo || n === Ko || n === Jo || n === Qo || n === ta || n === ea || n === na || n === ia || n === sa)
      if (r = t.get("WEBGL_compressed_texture_astc"), r !== null) {
        if (n === Wo) return a === se ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : r.COMPRESSED_RGBA_ASTC_4x4_KHR;
        if (n === Xo) return a === se ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : r.COMPRESSED_RGBA_ASTC_5x4_KHR;
        if (n === Yo) return a === se ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : r.COMPRESSED_RGBA_ASTC_5x5_KHR;
        if (n === qo) return a === se ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : r.COMPRESSED_RGBA_ASTC_6x5_KHR;
        if (n === jo) return a === se ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : r.COMPRESSED_RGBA_ASTC_6x6_KHR;
        if (n === Zo) return a === se ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : r.COMPRESSED_RGBA_ASTC_8x5_KHR;
        if (n === Ko) return a === se ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : r.COMPRESSED_RGBA_ASTC_8x6_KHR;
        if (n === Jo) return a === se ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : r.COMPRESSED_RGBA_ASTC_8x8_KHR;
        if (n === Qo) return a === se ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : r.COMPRESSED_RGBA_ASTC_10x5_KHR;
        if (n === ta) return a === se ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : r.COMPRESSED_RGBA_ASTC_10x6_KHR;
        if (n === ea) return a === se ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : r.COMPRESSED_RGBA_ASTC_10x8_KHR;
        if (n === na) return a === se ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : r.COMPRESSED_RGBA_ASTC_10x10_KHR;
        if (n === ia) return a === se ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : r.COMPRESSED_RGBA_ASTC_12x10_KHR;
        if (n === sa) return a === se ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : r.COMPRESSED_RGBA_ASTC_12x12_KHR;
      } else
        return null;
    if (n === gr || n === ra || n === oa)
      if (r = t.get("EXT_texture_compression_bptc"), r !== null) {
        if (n === gr) return a === se ? r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : r.COMPRESSED_RGBA_BPTC_UNORM_EXT;
        if (n === ra) return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
        if (n === oa) return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
      } else
        return null;
    if (n === th || n === aa || n === la || n === ca)
      if (r = t.get("EXT_texture_compression_rgtc"), r !== null) {
        if (n === gr) return r.COMPRESSED_RED_RGTC1_EXT;
        if (n === aa) return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;
        if (n === la) return r.COMPRESSED_RED_GREEN_RGTC2_EXT;
        if (n === ca) return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
      } else
        return null;
    return n === Wi ? i.UNSIGNED_INT_24_8 : i[n] !== void 0 ? i[n] : null;
  }
  return { convert: e };
}
class C_ extends ze {
  constructor(t = []) {
    super(), this.isArrayCamera = !0, this.cameras = t;
  }
}
class vn extends Ce {
  constructor() {
    super(), this.isGroup = !0, this.type = "Group";
  }
}
const R_ = { type: "move" };
class po {
  constructor() {
    this._targetRay = null, this._grip = null, this._hand = null;
  }
  getHandSpace() {
    return this._hand === null && (this._hand = new vn(), this._hand.matrixAutoUpdate = !1, this._hand.visible = !1, this._hand.joints = {}, this._hand.inputState = { pinching: !1 }), this._hand;
  }
  getTargetRaySpace() {
    return this._targetRay === null && (this._targetRay = new vn(), this._targetRay.matrixAutoUpdate = !1, this._targetRay.visible = !1, this._targetRay.hasLinearVelocity = !1, this._targetRay.linearVelocity = new L(), this._targetRay.hasAngularVelocity = !1, this._targetRay.angularVelocity = new L()), this._targetRay;
  }
  getGripSpace() {
    return this._grip === null && (this._grip = new vn(), this._grip.matrixAutoUpdate = !1, this._grip.visible = !1, this._grip.hasLinearVelocity = !1, this._grip.linearVelocity = new L(), this._grip.hasAngularVelocity = !1, this._grip.angularVelocity = new L()), this._grip;
  }
  dispatchEvent(t) {
    return this._targetRay !== null && this._targetRay.dispatchEvent(t), this._grip !== null && this._grip.dispatchEvent(t), this._hand !== null && this._hand.dispatchEvent(t), this;
  }
  connect(t) {
    if (t && t.hand) {
      const e = this._hand;
      if (e)
        for (const n of t.hand.values())
          this._getHandJoint(e, n);
    }
    return this.dispatchEvent({ type: "connected", data: t }), this;
  }
  disconnect(t) {
    return this.dispatchEvent({ type: "disconnected", data: t }), this._targetRay !== null && (this._targetRay.visible = !1), this._grip !== null && (this._grip.visible = !1), this._hand !== null && (this._hand.visible = !1), this;
  }
  update(t, e, n) {
    let s = null, r = null, a = null;
    const o = this._targetRay, l = this._grip, c = this._hand;
    if (t && e.session.visibilityState !== "visible-blurred") {
      if (c && t.hand) {
        a = !0;
        for (const _ of t.hand.values()) {
          const f = e.getJointPose(_, n), m = this._getHandJoint(c, _);
          f !== null && (m.matrix.fromArray(f.transform.matrix), m.matrix.decompose(m.position, m.rotation, m.scale), m.matrixWorldNeedsUpdate = !0, m.jointRadius = f.radius), m.visible = f !== null;
        }
        const h = c.joints["index-finger-tip"], u = c.joints["thumb-tip"], d = h.position.distanceTo(u.position), p = 0.02, g = 5e-3;
        c.inputState.pinching && d > p + g ? (c.inputState.pinching = !1, this.dispatchEvent({
          type: "pinchend",
          handedness: t.handedness,
          target: this
        })) : !c.inputState.pinching && d <= p - g && (c.inputState.pinching = !0, this.dispatchEvent({
          type: "pinchstart",
          handedness: t.handedness,
          target: this
        }));
      } else
        l !== null && t.gripSpace && (r = e.getPose(t.gripSpace, n), r !== null && (l.matrix.fromArray(r.transform.matrix), l.matrix.decompose(l.position, l.rotation, l.scale), l.matrixWorldNeedsUpdate = !0, r.linearVelocity ? (l.hasLinearVelocity = !0, l.linearVelocity.copy(r.linearVelocity)) : l.hasLinearVelocity = !1, r.angularVelocity ? (l.hasAngularVelocity = !0, l.angularVelocity.copy(r.angularVelocity)) : l.hasAngularVelocity = !1));
      o !== null && (s = e.getPose(t.targetRaySpace, n), s === null && r !== null && (s = r), s !== null && (o.matrix.fromArray(s.transform.matrix), o.matrix.decompose(o.position, o.rotation, o.scale), o.matrixWorldNeedsUpdate = !0, s.linearVelocity ? (o.hasLinearVelocity = !0, o.linearVelocity.copy(s.linearVelocity)) : o.hasLinearVelocity = !1, s.angularVelocity ? (o.hasAngularVelocity = !0, o.angularVelocity.copy(s.angularVelocity)) : o.hasAngularVelocity = !1, this.dispatchEvent(R_)));
    }
    return o !== null && (o.visible = s !== null), l !== null && (l.visible = r !== null), c !== null && (c.visible = a !== null), this;
  }
  // private method
  _getHandJoint(t, e) {
    if (t.joints[e.jointName] === void 0) {
      const n = new vn();
      n.matrixAutoUpdate = !1, n.visible = !1, t.joints[e.jointName] = n, t.add(n);
    }
    return t.joints[e.jointName];
  }
}
const P_ = `
void main() {

	gl_Position = vec4( position, 1.0 );

}`, L_ = `
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;
class D_ {
  constructor() {
    this.texture = null, this.mesh = null, this.depthNear = 0, this.depthFar = 0;
  }
  init(t, e, n) {
    if (this.texture === null) {
      const s = new Oe(), r = t.properties.get(s);
      r.__webglTexture = e.texture, (e.depthNear != n.depthNear || e.depthFar != n.depthFar) && (this.depthNear = e.depthNear, this.depthFar = e.depthFar), this.texture = s;
    }
  }
  getMesh(t) {
    if (this.texture !== null && this.mesh === null) {
      const e = t.cameras[0].viewport, n = new kn({
        vertexShader: P_,
        fragmentShader: L_,
        uniforms: {
          depthColor: { value: this.texture },
          depthWidth: { value: e.z },
          depthHeight: { value: e.w }
        }
      });
      this.mesh = new Mt(new Ds(20, 20), n);
    }
    return this.mesh;
  }
  reset() {
    this.texture = null, this.mesh = null;
  }
  getDepthTexture() {
    return this.texture;
  }
}
class I_ extends di {
  constructor(t, e) {
    super();
    const n = this;
    let s = null, r = 1, a = null, o = "local-floor", l = 1, c = null, h = null, u = null, d = null, p = null, g = null;
    const _ = new D_(), f = e.getContextAttributes();
    let m = null, b = null;
    const x = [], v = [], w = new et();
    let A = null;
    const C = new ze();
    C.viewport = new oe();
    const D = new ze();
    D.viewport = new oe();
    const S = [C, D], M = new C_();
    let P = null, z = null;
    this.cameraAutoUpdate = !0, this.enabled = !1, this.isPresenting = !1, this.getController = function(Y) {
      let st = x[Y];
      return st === void 0 && (st = new po(), x[Y] = st), st.getTargetRaySpace();
    }, this.getControllerGrip = function(Y) {
      let st = x[Y];
      return st === void 0 && (st = new po(), x[Y] = st), st.getGripSpace();
    }, this.getHand = function(Y) {
      let st = x[Y];
      return st === void 0 && (st = new po(), x[Y] = st), st.getHandSpace();
    };
    function O(Y) {
      const st = v.indexOf(Y.inputSource);
      if (st === -1)
        return;
      const bt = x[st];
      bt !== void 0 && (bt.update(Y.inputSource, Y.frame, c || a), bt.dispatchEvent({ type: Y.type, data: Y.inputSource }));
    }
    function F() {
      s.removeEventListener("select", O), s.removeEventListener("selectstart", O), s.removeEventListener("selectend", O), s.removeEventListener("squeeze", O), s.removeEventListener("squeezestart", O), s.removeEventListener("squeezeend", O), s.removeEventListener("end", F), s.removeEventListener("inputsourceschange", W);
      for (let Y = 0; Y < x.length; Y++) {
        const st = v[Y];
        st !== null && (v[Y] = null, x[Y].disconnect(st));
      }
      P = null, z = null, _.reset(), t.setRenderTarget(m), p = null, d = null, u = null, s = null, b = null, Yt.stop(), n.isPresenting = !1, t.setPixelRatio(A), t.setSize(w.width, w.height, !1), n.dispatchEvent({ type: "sessionend" });
    }
    this.setFramebufferScaleFactor = function(Y) {
      r = Y, n.isPresenting === !0 && console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.");
    }, this.setReferenceSpaceType = function(Y) {
      o = Y, n.isPresenting === !0 && console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.");
    }, this.getReferenceSpace = function() {
      return c || a;
    }, this.setReferenceSpace = function(Y) {
      c = Y;
    }, this.getBaseLayer = function() {
      return d !== null ? d : p;
    }, this.getBinding = function() {
      return u;
    }, this.getFrame = function() {
      return g;
    }, this.getSession = function() {
      return s;
    }, this.setSession = async function(Y) {
      if (s = Y, s !== null) {
        if (m = t.getRenderTarget(), s.addEventListener("select", O), s.addEventListener("selectstart", O), s.addEventListener("selectend", O), s.addEventListener("squeeze", O), s.addEventListener("squeezestart", O), s.addEventListener("squeezeend", O), s.addEventListener("end", F), s.addEventListener("inputsourceschange", W), f.xrCompatible !== !0 && await e.makeXRCompatible(), A = t.getPixelRatio(), t.getSize(w), s.renderState.layers === void 0) {
          const st = {
            antialias: f.antialias,
            alpha: !0,
            depth: f.depth,
            stencil: f.stencil,
            framebufferScaleFactor: r
          };
          p = new XRWebGLLayer(s, e, st), s.updateRenderState({ baseLayer: p }), t.setPixelRatio(1), t.setSize(p.framebufferWidth, p.framebufferHeight, !1), b = new ai(
            p.framebufferWidth,
            p.framebufferHeight,
            {
              format: Ke,
              type: yn,
              colorSpace: t.outputColorSpace,
              stencilBuffer: f.stencil
            }
          );
        } else {
          let st = null, bt = null, at = null;
          f.depth && (at = f.stencil ? e.DEPTH24_STENCIL8 : e.DEPTH_COMPONENT24, st = f.stencil ? Xi : ki, bt = f.stencil ? Wi : oi);
          const Dt = {
            colorFormat: e.RGBA8,
            depthFormat: at,
            scaleFactor: r
          };
          u = new XRWebGLBinding(s, e), d = u.createProjectionLayer(Dt), s.updateRenderState({ layers: [d] }), t.setPixelRatio(1), t.setSize(d.textureWidth, d.textureHeight, !1), b = new ai(
            d.textureWidth,
            d.textureHeight,
            {
              format: Ke,
              type: yn,
              depthTexture: new fh(d.textureWidth, d.textureHeight, bt, void 0, void 0, void 0, void 0, void 0, void 0, st),
              stencilBuffer: f.stencil,
              colorSpace: t.outputColorSpace,
              samples: f.antialias ? 4 : 0,
              resolveDepthBuffer: d.ignoreDepthValues === !1
            }
          );
        }
        b.isXRRenderTarget = !0, this.setFoveation(l), c = null, a = await s.requestReferenceSpace(o), Yt.setContext(s), Yt.start(), n.isPresenting = !0, n.dispatchEvent({ type: "sessionstart" });
      }
    }, this.getEnvironmentBlendMode = function() {
      if (s !== null)
        return s.environmentBlendMode;
    }, this.getDepthTexture = function() {
      return _.getDepthTexture();
    };
    function W(Y) {
      for (let st = 0; st < Y.removed.length; st++) {
        const bt = Y.removed[st], at = v.indexOf(bt);
        at >= 0 && (v[at] = null, x[at].disconnect(bt));
      }
      for (let st = 0; st < Y.added.length; st++) {
        const bt = Y.added[st];
        let at = v.indexOf(bt);
        if (at === -1) {
          for (let Ft = 0; Ft < x.length; Ft++)
            if (Ft >= v.length) {
              v.push(bt), at = Ft;
              break;
            } else if (v[Ft] === null) {
              v[Ft] = bt, at = Ft;
              break;
            }
          if (at === -1) break;
        }
        const Dt = x[at];
        Dt && Dt.connect(bt);
      }
    }
    const H = new L(), J = new L();
    function k(Y, st, bt) {
      H.setFromMatrixPosition(st.matrixWorld), J.setFromMatrixPosition(bt.matrixWorld);
      const at = H.distanceTo(J), Dt = st.projectionMatrix.elements, Ft = bt.projectionMatrix.elements, Nt = Dt[14] / (Dt[10] - 1), Zt = Dt[14] / (Dt[10] + 1), Z = (Dt[9] + 1) / Dt[5], rt = (Dt[9] - 1) / Dt[5], R = (Dt[8] - 1) / Dt[0], Ct = (Ft[8] + 1) / Ft[0], Q = Nt * R, vt = Nt * Ct, lt = at / (-R + Ct), It = lt * -R;
      if (st.matrixWorld.decompose(Y.position, Y.quaternion, Y.scale), Y.translateX(It), Y.translateZ(lt), Y.matrixWorld.compose(Y.position, Y.quaternion, Y.scale), Y.matrixWorldInverse.copy(Y.matrixWorld).invert(), Dt[10] === -1)
        Y.projectionMatrix.copy(st.projectionMatrix), Y.projectionMatrixInverse.copy(st.projectionMatrixInverse);
      else {
        const gt = Nt + lt, T = Zt + lt, y = Q - It, B = vt + (at - It), X = Z * Zt / T * gt, K = rt * Zt / T * gt;
        Y.projectionMatrix.makePerspective(y, B, X, K, gt, T), Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert();
      }
    }
    function tt(Y, st) {
      st === null ? Y.matrixWorld.copy(Y.matrix) : Y.matrixWorld.multiplyMatrices(st.matrixWorld, Y.matrix), Y.matrixWorldInverse.copy(Y.matrixWorld).invert();
    }
    this.updateCamera = function(Y) {
      if (s === null) return;
      let st = Y.near, bt = Y.far;
      _.texture !== null && (_.depthNear > 0 && (st = _.depthNear), _.depthFar > 0 && (bt = _.depthFar)), M.near = D.near = C.near = st, M.far = D.far = C.far = bt, (P !== M.near || z !== M.far) && (s.updateRenderState({
        depthNear: M.near,
        depthFar: M.far
      }), P = M.near, z = M.far), C.layers.mask = Y.layers.mask | 2, D.layers.mask = Y.layers.mask | 4, M.layers.mask = C.layers.mask | D.layers.mask;
      const at = Y.parent, Dt = M.cameras;
      tt(M, at);
      for (let Ft = 0; Ft < Dt.length; Ft++)
        tt(Dt[Ft], at);
      Dt.length === 2 ? k(M, C, D) : M.projectionMatrix.copy(C.projectionMatrix), nt(Y, M, at);
    };
    function nt(Y, st, bt) {
      bt === null ? Y.matrix.copy(st.matrixWorld) : (Y.matrix.copy(bt.matrixWorld), Y.matrix.invert(), Y.matrix.multiply(st.matrixWorld)), Y.matrix.decompose(Y.position, Y.quaternion, Y.scale), Y.updateMatrixWorld(!0), Y.projectionMatrix.copy(st.projectionMatrix), Y.projectionMatrixInverse.copy(st.projectionMatrixInverse), Y.isPerspectiveCamera && (Y.fov = ws * 2 * Math.atan(1 / Y.projectionMatrix.elements[5]), Y.zoom = 1);
    }
    this.getCamera = function() {
      return M;
    }, this.getFoveation = function() {
      if (!(d === null && p === null))
        return l;
    }, this.setFoveation = function(Y) {
      l = Y, d !== null && (d.fixedFoveation = Y), p !== null && p.fixedFoveation !== void 0 && (p.fixedFoveation = Y);
    }, this.hasDepthSensing = function() {
      return _.texture !== null;
    }, this.getDepthSensingMesh = function() {
      return _.getMesh(M);
    };
    let ht = null;
    function Pt(Y, st) {
      if (h = st.getViewerPose(c || a), g = st, h !== null) {
        const bt = h.views;
        p !== null && (t.setRenderTargetFramebuffer(b, p.framebuffer), t.setRenderTarget(b));
        let at = !1;
        bt.length !== M.cameras.length && (M.cameras.length = 0, at = !0);
        for (let Ft = 0; Ft < bt.length; Ft++) {
          const Nt = bt[Ft];
          let Zt = null;
          if (p !== null)
            Zt = p.getViewport(Nt);
          else {
            const rt = u.getViewSubImage(d, Nt);
            Zt = rt.viewport, Ft === 0 && (t.setRenderTargetTextures(
              b,
              rt.colorTexture,
              d.ignoreDepthValues ? void 0 : rt.depthStencilTexture
            ), t.setRenderTarget(b));
          }
          let Z = S[Ft];
          Z === void 0 && (Z = new ze(), Z.layers.enable(Ft), Z.viewport = new oe(), S[Ft] = Z), Z.matrix.fromArray(Nt.transform.matrix), Z.matrix.decompose(Z.position, Z.quaternion, Z.scale), Z.projectionMatrix.fromArray(Nt.projectionMatrix), Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert(), Z.viewport.set(Zt.x, Zt.y, Zt.width, Zt.height), Ft === 0 && (M.matrix.copy(Z.matrix), M.matrix.decompose(M.position, M.quaternion, M.scale)), at === !0 && M.cameras.push(Z);
        }
        const Dt = s.enabledFeatures;
        if (Dt && Dt.includes("depth-sensing")) {
          const Ft = u.getDepthInformation(bt[0]);
          Ft && Ft.isValid && Ft.texture && _.init(t, Ft, s.renderState);
        }
      }
      for (let bt = 0; bt < x.length; bt++) {
        const at = v[bt], Dt = x[bt];
        at !== null && Dt !== void 0 && Dt.update(at, st, c || a);
      }
      ht && ht(Y, st), st.detectedPlanes && n.dispatchEvent({ type: "planesdetected", data: st }), g = null;
    }
    const Yt = new dh();
    Yt.setAnimationLoop(Pt), this.setAnimationLoop = function(Y) {
      ht = Y;
    }, this.dispose = function() {
    };
  }
}
const qn = /* @__PURE__ */ new on(), U_ = /* @__PURE__ */ new ue();
function N_(i, t) {
  function e(f, m) {
    f.matrixAutoUpdate === !0 && f.updateMatrix(), m.value.copy(f.matrix);
  }
  function n(f, m) {
    m.color.getRGB(f.fogColor.value, ch(i)), m.isFog ? (f.fogNear.value = m.near, f.fogFar.value = m.far) : m.isFogExp2 && (f.fogDensity.value = m.density);
  }
  function s(f, m, b, x, v) {
    m.isMeshBasicMaterial || m.isMeshLambertMaterial ? r(f, m) : m.isMeshToonMaterial ? (r(f, m), u(f, m)) : m.isMeshPhongMaterial ? (r(f, m), h(f, m)) : m.isMeshStandardMaterial ? (r(f, m), d(f, m), m.isMeshPhysicalMaterial && p(f, m, v)) : m.isMeshMatcapMaterial ? (r(f, m), g(f, m)) : m.isMeshDepthMaterial ? r(f, m) : m.isMeshDistanceMaterial ? (r(f, m), _(f, m)) : m.isMeshNormalMaterial ? r(f, m) : m.isLineBasicMaterial ? (a(f, m), m.isLineDashedMaterial && o(f, m)) : m.isPointsMaterial ? l(f, m, b, x) : m.isSpriteMaterial ? c(f, m) : m.isShadowMaterial ? (f.color.value.copy(m.color), f.opacity.value = m.opacity) : m.isShaderMaterial && (m.uniformsNeedUpdate = !1);
  }
  function r(f, m) {
    f.opacity.value = m.opacity, m.color && f.diffuse.value.copy(m.color), m.emissive && f.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity), m.map && (f.map.value = m.map, e(m.map, f.mapTransform)), m.alphaMap && (f.alphaMap.value = m.alphaMap, e(m.alphaMap, f.alphaMapTransform)), m.bumpMap && (f.bumpMap.value = m.bumpMap, e(m.bumpMap, f.bumpMapTransform), f.bumpScale.value = m.bumpScale, m.side === Ne && (f.bumpScale.value *= -1)), m.normalMap && (f.normalMap.value = m.normalMap, e(m.normalMap, f.normalMapTransform), f.normalScale.value.copy(m.normalScale), m.side === Ne && f.normalScale.value.negate()), m.displacementMap && (f.displacementMap.value = m.displacementMap, e(m.displacementMap, f.displacementMapTransform), f.displacementScale.value = m.displacementScale, f.displacementBias.value = m.displacementBias), m.emissiveMap && (f.emissiveMap.value = m.emissiveMap, e(m.emissiveMap, f.emissiveMapTransform)), m.specularMap && (f.specularMap.value = m.specularMap, e(m.specularMap, f.specularMapTransform)), m.alphaTest > 0 && (f.alphaTest.value = m.alphaTest);
    const b = t.get(m), x = b.envMap, v = b.envMapRotation;
    x && (f.envMap.value = x, qn.copy(v), qn.x *= -1, qn.y *= -1, qn.z *= -1, x.isCubeTexture && x.isRenderTargetTexture === !1 && (qn.y *= -1, qn.z *= -1), f.envMapRotation.value.setFromMatrix4(U_.makeRotationFromEuler(qn)), f.flipEnvMap.value = x.isCubeTexture && x.isRenderTargetTexture === !1 ? -1 : 1, f.reflectivity.value = m.reflectivity, f.ior.value = m.ior, f.refractionRatio.value = m.refractionRatio), m.lightMap && (f.lightMap.value = m.lightMap, f.lightMapIntensity.value = m.lightMapIntensity, e(m.lightMap, f.lightMapTransform)), m.aoMap && (f.aoMap.value = m.aoMap, f.aoMapIntensity.value = m.aoMapIntensity, e(m.aoMap, f.aoMapTransform));
  }
  function a(f, m) {
    f.diffuse.value.copy(m.color), f.opacity.value = m.opacity, m.map && (f.map.value = m.map, e(m.map, f.mapTransform));
  }
  function o(f, m) {
    f.dashSize.value = m.dashSize, f.totalSize.value = m.dashSize + m.gapSize, f.scale.value = m.scale;
  }
  function l(f, m, b, x) {
    f.diffuse.value.copy(m.color), f.opacity.value = m.opacity, f.size.value = m.size * b, f.scale.value = x * 0.5, m.map && (f.map.value = m.map, e(m.map, f.uvTransform)), m.alphaMap && (f.alphaMap.value = m.alphaMap, e(m.alphaMap, f.alphaMapTransform)), m.alphaTest > 0 && (f.alphaTest.value = m.alphaTest);
  }
  function c(f, m) {
    f.diffuse.value.copy(m.color), f.opacity.value = m.opacity, f.rotation.value = m.rotation, m.map && (f.map.value = m.map, e(m.map, f.mapTransform)), m.alphaMap && (f.alphaMap.value = m.alphaMap, e(m.alphaMap, f.alphaMapTransform)), m.alphaTest > 0 && (f.alphaTest.value = m.alphaTest);
  }
  function h(f, m) {
    f.specular.value.copy(m.specular), f.shininess.value = Math.max(m.shininess, 1e-4);
  }
  function u(f, m) {
    m.gradientMap && (f.gradientMap.value = m.gradientMap);
  }
  function d(f, m) {
    f.metalness.value = m.metalness, m.metalnessMap && (f.metalnessMap.value = m.metalnessMap, e(m.metalnessMap, f.metalnessMapTransform)), f.roughness.value = m.roughness, m.roughnessMap && (f.roughnessMap.value = m.roughnessMap, e(m.roughnessMap, f.roughnessMapTransform)), m.envMap && (f.envMapIntensity.value = m.envMapIntensity);
  }
  function p(f, m, b) {
    f.ior.value = m.ior, m.sheen > 0 && (f.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen), f.sheenRoughness.value = m.sheenRoughness, m.sheenColorMap && (f.sheenColorMap.value = m.sheenColorMap, e(m.sheenColorMap, f.sheenColorMapTransform)), m.sheenRoughnessMap && (f.sheenRoughnessMap.value = m.sheenRoughnessMap, e(m.sheenRoughnessMap, f.sheenRoughnessMapTransform))), m.clearcoat > 0 && (f.clearcoat.value = m.clearcoat, f.clearcoatRoughness.value = m.clearcoatRoughness, m.clearcoatMap && (f.clearcoatMap.value = m.clearcoatMap, e(m.clearcoatMap, f.clearcoatMapTransform)), m.clearcoatRoughnessMap && (f.clearcoatRoughnessMap.value = m.clearcoatRoughnessMap, e(m.clearcoatRoughnessMap, f.clearcoatRoughnessMapTransform)), m.clearcoatNormalMap && (f.clearcoatNormalMap.value = m.clearcoatNormalMap, e(m.clearcoatNormalMap, f.clearcoatNormalMapTransform), f.clearcoatNormalScale.value.copy(m.clearcoatNormalScale), m.side === Ne && f.clearcoatNormalScale.value.negate())), m.dispersion > 0 && (f.dispersion.value = m.dispersion), m.iridescence > 0 && (f.iridescence.value = m.iridescence, f.iridescenceIOR.value = m.iridescenceIOR, f.iridescenceThicknessMinimum.value = m.iridescenceThicknessRange[0], f.iridescenceThicknessMaximum.value = m.iridescenceThicknessRange[1], m.iridescenceMap && (f.iridescenceMap.value = m.iridescenceMap, e(m.iridescenceMap, f.iridescenceMapTransform)), m.iridescenceThicknessMap && (f.iridescenceThicknessMap.value = m.iridescenceThicknessMap, e(m.iridescenceThicknessMap, f.iridescenceThicknessMapTransform))), m.transmission > 0 && (f.transmission.value = m.transmission, f.transmissionSamplerMap.value = b.texture, f.transmissionSamplerSize.value.set(b.width, b.height), m.transmissionMap && (f.transmissionMap.value = m.transmissionMap, e(m.transmissionMap, f.transmissionMapTransform)), f.thickness.value = m.thickness, m.thicknessMap && (f.thicknessMap.value = m.thicknessMap, e(m.thicknessMap, f.thicknessMapTransform)), f.attenuationDistance.value = m.attenuationDistance, f.attenuationColor.value.copy(m.attenuationColor)), m.anisotropy > 0 && (f.anisotropyVector.value.set(m.anisotropy * Math.cos(m.anisotropyRotation), m.anisotropy * Math.sin(m.anisotropyRotation)), m.anisotropyMap && (f.anisotropyMap.value = m.anisotropyMap, e(m.anisotropyMap, f.anisotropyMapTransform))), f.specularIntensity.value = m.specularIntensity, f.specularColor.value.copy(m.specularColor), m.specularColorMap && (f.specularColorMap.value = m.specularColorMap, e(m.specularColorMap, f.specularColorMapTransform)), m.specularIntensityMap && (f.specularIntensityMap.value = m.specularIntensityMap, e(m.specularIntensityMap, f.specularIntensityMapTransform));
  }
  function g(f, m) {
    m.matcap && (f.matcap.value = m.matcap);
  }
  function _(f, m) {
    const b = t.get(m).light;
    f.referencePosition.value.setFromMatrixPosition(b.matrixWorld), f.nearDistance.value = b.shadow.camera.near, f.farDistance.value = b.shadow.camera.far;
  }
  return {
    refreshFogUniforms: n,
    refreshMaterialUniforms: s
  };
}
function O_(i, t, e, n) {
  let s = {}, r = {}, a = [];
  const o = i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);
  function l(b, x) {
    const v = x.program;
    n.uniformBlockBinding(b, v);
  }
  function c(b, x) {
    let v = s[b.id];
    v === void 0 && (g(b), v = h(b), s[b.id] = v, b.addEventListener("dispose", f));
    const w = x.program;
    n.updateUBOMapping(b, w);
    const A = t.render.frame;
    r[b.id] !== A && (d(b), r[b.id] = A);
  }
  function h(b) {
    const x = u();
    b.__bindingPointIndex = x;
    const v = i.createBuffer(), w = b.__size, A = b.usage;
    return i.bindBuffer(i.UNIFORM_BUFFER, v), i.bufferData(i.UNIFORM_BUFFER, w, A), i.bindBuffer(i.UNIFORM_BUFFER, null), i.bindBufferBase(i.UNIFORM_BUFFER, x, v), v;
  }
  function u() {
    for (let b = 0; b < o; b++)
      if (a.indexOf(b) === -1)
        return a.push(b), b;
    return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."), 0;
  }
  function d(b) {
    const x = s[b.id], v = b.uniforms, w = b.__cache;
    i.bindBuffer(i.UNIFORM_BUFFER, x);
    for (let A = 0, C = v.length; A < C; A++) {
      const D = Array.isArray(v[A]) ? v[A] : [v[A]];
      for (let S = 0, M = D.length; S < M; S++) {
        const P = D[S];
        if (p(P, A, S, w) === !0) {
          const z = P.__offset, O = Array.isArray(P.value) ? P.value : [P.value];
          let F = 0;
          for (let W = 0; W < O.length; W++) {
            const H = O[W], J = _(H);
            typeof H == "number" || typeof H == "boolean" ? (P.__data[0] = H, i.bufferSubData(i.UNIFORM_BUFFER, z + F, P.__data)) : H.isMatrix3 ? (P.__data[0] = H.elements[0], P.__data[1] = H.elements[1], P.__data[2] = H.elements[2], P.__data[3] = 0, P.__data[4] = H.elements[3], P.__data[5] = H.elements[4], P.__data[6] = H.elements[5], P.__data[7] = 0, P.__data[8] = H.elements[6], P.__data[9] = H.elements[7], P.__data[10] = H.elements[8], P.__data[11] = 0) : (H.toArray(P.__data, F), F += J.storage / Float32Array.BYTES_PER_ELEMENT);
          }
          i.bufferSubData(i.UNIFORM_BUFFER, z, P.__data);
        }
      }
    }
    i.bindBuffer(i.UNIFORM_BUFFER, null);
  }
  function p(b, x, v, w) {
    const A = b.value, C = x + "_" + v;
    if (w[C] === void 0)
      return typeof A == "number" || typeof A == "boolean" ? w[C] = A : w[C] = A.clone(), !0;
    {
      const D = w[C];
      if (typeof A == "number" || typeof A == "boolean") {
        if (D !== A)
          return w[C] = A, !0;
      } else if (D.equals(A) === !1)
        return D.copy(A), !0;
    }
    return !1;
  }
  function g(b) {
    const x = b.uniforms;
    let v = 0;
    const w = 16;
    for (let C = 0, D = x.length; C < D; C++) {
      const S = Array.isArray(x[C]) ? x[C] : [x[C]];
      for (let M = 0, P = S.length; M < P; M++) {
        const z = S[M], O = Array.isArray(z.value) ? z.value : [z.value];
        for (let F = 0, W = O.length; F < W; F++) {
          const H = O[F], J = _(H), k = v % w, tt = k % J.boundary, nt = k + tt;
          v += tt, nt !== 0 && w - nt < J.storage && (v += w - nt), z.__data = new Float32Array(J.storage / Float32Array.BYTES_PER_ELEMENT), z.__offset = v, v += J.storage;
        }
      }
    }
    const A = v % w;
    return A > 0 && (v += w - A), b.__size = v, b.__cache = {}, this;
  }
  function _(b) {
    const x = {
      boundary: 0,
      // bytes
      storage: 0
      // bytes
    };
    return typeof b == "number" || typeof b == "boolean" ? (x.boundary = 4, x.storage = 4) : b.isVector2 ? (x.boundary = 8, x.storage = 8) : b.isVector3 || b.isColor ? (x.boundary = 16, x.storage = 12) : b.isVector4 ? (x.boundary = 16, x.storage = 16) : b.isMatrix3 ? (x.boundary = 48, x.storage = 48) : b.isMatrix4 ? (x.boundary = 64, x.storage = 64) : b.isTexture ? console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.") : console.warn("THREE.WebGLRenderer: Unsupported uniform value type.", b), x;
  }
  function f(b) {
    const x = b.target;
    x.removeEventListener("dispose", f);
    const v = a.indexOf(x.__bindingPointIndex);
    a.splice(v, 1), i.deleteBuffer(s[x.id]), delete s[x.id], delete r[x.id];
  }
  function m() {
    for (const b in s)
      i.deleteBuffer(s[b]);
    a = [], s = {}, r = {};
  }
  return {
    bind: l,
    update: c,
    dispose: m
  };
}
class F_ {
  constructor(t = {}) {
    const {
      canvas: e = Sd(),
      context: n = null,
      depth: s = !0,
      stencil: r = !1,
      alpha: a = !1,
      antialias: o = !1,
      premultipliedAlpha: l = !0,
      preserveDrawingBuffer: c = !1,
      powerPreference: h = "default",
      failIfMajorPerformanceCaveat: u = !1,
      reverseDepthBuffer: d = !1
    } = t;
    this.isWebGLRenderer = !0;
    let p;
    if (n !== null) {
      if (typeof WebGLRenderingContext < "u" && n instanceof WebGLRenderingContext)
        throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");
      p = n.getContextAttributes().alpha;
    } else
      p = a;
    const g = new Uint32Array(4), _ = new Int32Array(4);
    let f = null, m = null;
    const b = [], x = [];
    this.domElement = e, this.debug = {
      /**
       * Enables error checking and reporting when shader programs are being compiled
       * @type {boolean}
       */
      checkShaderErrors: !0,
      /**
       * Callback for custom error reporting.
       * @type {?Function}
       */
      onShaderError: null
    }, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.clippingPlanes = [], this.localClippingEnabled = !1, this._outputColorSpace = Ge, this.toneMapping = Nn, this.toneMappingExposure = 1;
    const v = this;
    let w = !1, A = 0, C = 0, D = null, S = -1, M = null;
    const P = new oe(), z = new oe();
    let O = null;
    const F = new Wt(0);
    let W = 0, H = e.width, J = e.height, k = 1, tt = null, nt = null;
    const ht = new oe(0, 0, H, J), Pt = new oe(0, 0, H, J);
    let Yt = !1;
    const Y = new Na();
    let st = !1, bt = !1;
    const at = new ue(), Dt = new ue(), Ft = new L(), Nt = new oe(), Zt = { background: null, fog: null, environment: null, overrideMaterial: null, isScene: !0 };
    let Z = !1;
    function rt() {
      return D === null ? k : 1;
    }
    let R = n;
    function Ct(E, U) {
      return e.getContext(E, U);
    }
    try {
      const E = {
        alpha: !0,
        depth: s,
        stencil: r,
        antialias: o,
        premultipliedAlpha: l,
        preserveDrawingBuffer: c,
        powerPreference: h,
        failIfMajorPerformanceCaveat: u
      };
      if ("setAttribute" in e && e.setAttribute("data-engine", `three.js r${wa}`), e.addEventListener("webglcontextlost", j, !1), e.addEventListener("webglcontextrestored", mt, !1), e.addEventListener("webglcontextcreationerror", ft, !1), R === null) {
        const U = "webgl2";
        if (R = Ct(U, E), R === null)
          throw Ct(U) ? new Error("Error creating WebGL context with your selected attributes.") : new Error("Error creating WebGL context.");
      }
    } catch (E) {
      throw console.error("THREE.WebGLRenderer: " + E.message), E;
    }
    let Q, vt, lt, It, gt, T, y, B, X, K, q, Et, ut, _t, Xt, it, xt, Ut, Ot, yt, jt, Vt, ce, I;
    function dt() {
      Q = new Vm(R), Q.init(), Vt = new A_(R, Q), vt = new Nm(R, Q, t, Vt), lt = new E_(R, Q), vt.reverseDepthBuffer && d && lt.buffers.depth.setReversed(!0), It = new Wm(R), gt = new c_(), T = new T_(R, Q, lt, gt, vt, Vt, It), y = new Fm(v), B = new Hm(v), X = new Zd(R), ce = new Im(R, X), K = new Gm(R, X, It, ce), q = new Ym(R, K, X, It), Ot = new Xm(R, vt, T), it = new Om(gt), Et = new l_(v, y, B, Q, vt, ce, it), ut = new N_(v, gt), _t = new u_(), Xt = new __(Q), Ut = new Dm(v, y, B, lt, q, p, l), xt = new b_(v, q, vt), I = new O_(R, It, vt, lt), yt = new Um(R, Q, It), jt = new $m(R, Q, It), It.programs = Et.programs, v.capabilities = vt, v.extensions = Q, v.properties = gt, v.renderLists = _t, v.shadowMap = xt, v.state = lt, v.info = It;
    }
    dt();
    const $ = new I_(v, R);
    this.xr = $, this.getContext = function() {
      return R;
    }, this.getContextAttributes = function() {
      return R.getContextAttributes();
    }, this.forceContextLoss = function() {
      const E = Q.get("WEBGL_lose_context");
      E && E.loseContext();
    }, this.forceContextRestore = function() {
      const E = Q.get("WEBGL_lose_context");
      E && E.restoreContext();
    }, this.getPixelRatio = function() {
      return k;
    }, this.setPixelRatio = function(E) {
      E !== void 0 && (k = E, this.setSize(H, J, !1));
    }, this.getSize = function(E) {
      return E.set(H, J);
    }, this.setSize = function(E, U, V = !0) {
      if ($.isPresenting) {
        console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");
        return;
      }
      H = E, J = U, e.width = Math.floor(E * k), e.height = Math.floor(U * k), V === !0 && (e.style.width = E + "px", e.style.height = U + "px"), this.setViewport(0, 0, E, U);
    }, this.getDrawingBufferSize = function(E) {
      return E.set(H * k, J * k).floor();
    }, this.setDrawingBufferSize = function(E, U, V) {
      H = E, J = U, k = V, e.width = Math.floor(E * V), e.height = Math.floor(U * V), this.setViewport(0, 0, E, U);
    }, this.getCurrentViewport = function(E) {
      return E.copy(P);
    }, this.getViewport = function(E) {
      return E.copy(ht);
    }, this.setViewport = function(E, U, V, G) {
      E.isVector4 ? ht.set(E.x, E.y, E.z, E.w) : ht.set(E, U, V, G), lt.viewport(P.copy(ht).multiplyScalar(k).round());
    }, this.getScissor = function(E) {
      return E.copy(Pt);
    }, this.setScissor = function(E, U, V, G) {
      E.isVector4 ? Pt.set(E.x, E.y, E.z, E.w) : Pt.set(E, U, V, G), lt.scissor(z.copy(Pt).multiplyScalar(k).round());
    }, this.getScissorTest = function() {
      return Yt;
    }, this.setScissorTest = function(E) {
      lt.setScissorTest(Yt = E);
    }, this.setOpaqueSort = function(E) {
      tt = E;
    }, this.setTransparentSort = function(E) {
      nt = E;
    }, this.getClearColor = function(E) {
      return E.copy(Ut.getClearColor());
    }, this.setClearColor = function() {
      Ut.setClearColor.apply(Ut, arguments);
    }, this.getClearAlpha = function() {
      return Ut.getClearAlpha();
    }, this.setClearAlpha = function() {
      Ut.setClearAlpha.apply(Ut, arguments);
    }, this.clear = function(E = !0, U = !0, V = !0) {
      let G = 0;
      if (E) {
        let N = !1;
        if (D !== null) {
          const ot = D.texture.format;
          N = ot === La || ot === Pa || ot === Ra;
        }
        if (N) {
          const ot = D.texture.type, pt = ot === yn || ot === oi || ot === Es || ot === Wi || ot === Aa || ot === Ca, wt = Ut.getClearColor(), Tt = Ut.getClearAlpha(), kt = wt.r, zt = wt.g, At = wt.b;
          pt ? (g[0] = kt, g[1] = zt, g[2] = At, g[3] = Tt, R.clearBufferuiv(R.COLOR, 0, g)) : (_[0] = kt, _[1] = zt, _[2] = At, _[3] = Tt, R.clearBufferiv(R.COLOR, 0, _));
        } else
          G |= R.COLOR_BUFFER_BIT;
      }
      U && (G |= R.DEPTH_BUFFER_BIT), V && (G |= R.STENCIL_BUFFER_BIT, this.state.buffers.stencil.setMask(4294967295)), R.clear(G);
    }, this.clearColor = function() {
      this.clear(!0, !1, !1);
    }, this.clearDepth = function() {
      this.clear(!1, !0, !1);
    }, this.clearStencil = function() {
      this.clear(!1, !1, !0);
    }, this.dispose = function() {
      e.removeEventListener("webglcontextlost", j, !1), e.removeEventListener("webglcontextrestored", mt, !1), e.removeEventListener("webglcontextcreationerror", ft, !1), _t.dispose(), Xt.dispose(), gt.dispose(), y.dispose(), B.dispose(), q.dispose(), ce.dispose(), I.dispose(), Et.dispose(), $.dispose(), $.removeEventListener("sessionstart", Ya), $.removeEventListener("sessionend", qa), zn.stop();
    };
    function j(E) {
      E.preventDefault(), console.log("THREE.WebGLRenderer: Context Lost."), w = !0;
    }
    function mt() {
      console.log("THREE.WebGLRenderer: Context Restored."), w = !1;
      const E = It.autoReset, U = xt.enabled, V = xt.autoUpdate, G = xt.needsUpdate, N = xt.type;
      dt(), It.autoReset = E, xt.enabled = U, xt.autoUpdate = V, xt.needsUpdate = G, xt.type = N;
    }
    function ft(E) {
      console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ", E.statusMessage);
    }
    function Bt(E) {
      const U = E.target;
      U.removeEventListener("dispose", Bt), ge(U);
    }
    function ge(E) {
      we(E), gt.remove(E);
    }
    function we(E) {
      const U = gt.get(E).programs;
      U !== void 0 && (U.forEach(function(V) {
        Et.releaseProgram(V);
      }), E.isShaderMaterial && Et.releaseShaderCache(E));
    }
    this.renderBufferDirect = function(E, U, V, G, N, ot) {
      U === null && (U = Zt);
      const pt = N.isMesh && N.matrixWorld.determinant() < 0, wt = Ph(E, U, V, G, N);
      lt.setMaterial(G, pt);
      let Tt = V.index, kt = 1;
      if (G.wireframe === !0) {
        if (Tt = K.getWireframeAttribute(V), Tt === void 0) return;
        kt = 2;
      }
      const zt = V.drawRange, At = V.attributes.position;
      let Jt = zt.start * kt, he = (zt.start + zt.count) * kt;
      ot !== null && (Jt = Math.max(Jt, ot.start * kt), he = Math.min(he, (ot.start + ot.count) * kt)), Tt !== null ? (Jt = Math.max(Jt, 0), he = Math.min(he, Tt.count)) : At != null && (Jt = Math.max(Jt, 0), he = Math.min(he, At.count));
      const fe = he - Jt;
      if (fe < 0 || fe === 1 / 0) return;
      ce.setup(N, G, wt, V, Tt);
      let Ie, te = yt;
      if (Tt !== null && (Ie = X.get(Tt), te = jt, te.setIndex(Ie)), N.isMesh)
        G.wireframe === !0 ? (lt.setLineWidth(G.wireframeLinewidth * rt()), te.setMode(R.LINES)) : te.setMode(R.TRIANGLES);
      else if (N.isLine) {
        let Rt = G.linewidth;
        Rt === void 0 && (Rt = 1), lt.setLineWidth(Rt * rt()), N.isLineSegments ? te.setMode(R.LINES) : N.isLineLoop ? te.setMode(R.LINE_LOOP) : te.setMode(R.LINE_STRIP);
      } else N.isPoints ? te.setMode(R.POINTS) : N.isSprite && te.setMode(R.TRIANGLES);
      if (N.isBatchedMesh)
        if (N._multiDrawInstances !== null)
          te.renderMultiDrawInstances(N._multiDrawStarts, N._multiDrawCounts, N._multiDrawCount, N._multiDrawInstances);
        else if (Q.get("WEBGL_multi_draw"))
          te.renderMultiDraw(N._multiDrawStarts, N._multiDrawCounts, N._multiDrawCount);
        else {
          const Rt = N._multiDrawStarts, cn = N._multiDrawCounts, ee = N._multiDrawCount, Xe = Tt ? X.get(Tt).bytesPerElement : 1, pi = gt.get(G).currentProgram.getUniforms();
          for (let Fe = 0; Fe < ee; Fe++)
            pi.setValue(R, "_gl_DrawID", Fe), te.render(Rt[Fe] / Xe, cn[Fe]);
        }
      else if (N.isInstancedMesh)
        te.renderInstances(Jt, fe, N.count);
      else if (V.isInstancedBufferGeometry) {
        const Rt = V._maxInstanceCount !== void 0 ? V._maxInstanceCount : 1 / 0, cn = Math.min(V.instanceCount, Rt);
        te.renderInstances(Jt, fe, cn);
      } else
        te.render(Jt, fe);
    };
    function ne(E, U, V) {
      E.transparent === !0 && E.side === $e && E.forceSinglePass === !1 ? (E.side = Ne, E.needsUpdate = !0, Ns(E, U, V), E.side = Fn, E.needsUpdate = !0, Ns(E, U, V), E.side = $e) : Ns(E, U, V);
    }
    this.compile = function(E, U, V = null) {
      V === null && (V = E), m = Xt.get(V), m.init(U), x.push(m), V.traverseVisible(function(N) {
        N.isLight && N.layers.test(U.layers) && (m.pushLight(N), N.castShadow && m.pushShadow(N));
      }), E !== V && E.traverseVisible(function(N) {
        N.isLight && N.layers.test(U.layers) && (m.pushLight(N), N.castShadow && m.pushShadow(N));
      }), m.setupLights();
      const G = /* @__PURE__ */ new Set();
      return E.traverse(function(N) {
        if (!(N.isMesh || N.isPoints || N.isLine || N.isSprite))
          return;
        const ot = N.material;
        if (ot)
          if (Array.isArray(ot))
            for (let pt = 0; pt < ot.length; pt++) {
              const wt = ot[pt];
              ne(wt, V, N), G.add(wt);
            }
          else
            ne(ot, V, N), G.add(ot);
      }), x.pop(), m = null, G;
    }, this.compileAsync = function(E, U, V = null) {
      const G = this.compile(E, U, V);
      return new Promise((N) => {
        function ot() {
          if (G.forEach(function(pt) {
            gt.get(pt).currentProgram.isReady() && G.delete(pt);
          }), G.size === 0) {
            N(E);
            return;
          }
          setTimeout(ot, 10);
        }
        Q.get("KHR_parallel_shader_compile") !== null ? ot() : setTimeout(ot, 10);
      });
    };
    let We = null;
    function ln(E) {
      We && We(E);
    }
    function Ya() {
      zn.stop();
    }
    function qa() {
      zn.start();
    }
    const zn = new dh();
    zn.setAnimationLoop(ln), typeof self < "u" && zn.setContext(self), this.setAnimationLoop = function(E) {
      We = E, $.setAnimationLoop(E), E === null ? zn.stop() : zn.start();
    }, $.addEventListener("sessionstart", Ya), $.addEventListener("sessionend", qa), this.render = function(E, U) {
      if (U !== void 0 && U.isCamera !== !0) {
        console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
        return;
      }
      if (w === !0) return;
      if (E.matrixWorldAutoUpdate === !0 && E.updateMatrixWorld(), U.parent === null && U.matrixWorldAutoUpdate === !0 && U.updateMatrixWorld(), $.enabled === !0 && $.isPresenting === !0 && ($.cameraAutoUpdate === !0 && $.updateCamera(U), U = $.getCamera()), E.isScene === !0 && E.onBeforeRender(v, E, U, D), m = Xt.get(E, x.length), m.init(U), x.push(m), Dt.multiplyMatrices(U.projectionMatrix, U.matrixWorldInverse), Y.setFromProjectionMatrix(Dt), bt = this.localClippingEnabled, st = it.init(this.clippingPlanes, bt), f = _t.get(E, b.length), f.init(), b.push(f), $.enabled === !0 && $.isPresenting === !0) {
        const ot = v.xr.getDepthSensingMesh();
        ot !== null && Ur(ot, U, -1 / 0, v.sortObjects);
      }
      Ur(E, U, 0, v.sortObjects), f.finish(), v.sortObjects === !0 && f.sort(tt, nt), Z = $.enabled === !1 || $.isPresenting === !1 || $.hasDepthSensing() === !1, Z && Ut.addToRenderList(f, E), this.info.render.frame++, st === !0 && it.beginShadows();
      const V = m.state.shadowsArray;
      xt.render(V, E, U), st === !0 && it.endShadows(), this.info.autoReset === !0 && this.info.reset();
      const G = f.opaque, N = f.transmissive;
      if (m.setupLights(), U.isArrayCamera) {
        const ot = U.cameras;
        if (N.length > 0)
          for (let pt = 0, wt = ot.length; pt < wt; pt++) {
            const Tt = ot[pt];
            Za(G, N, E, Tt);
          }
        Z && Ut.render(E);
        for (let pt = 0, wt = ot.length; pt < wt; pt++) {
          const Tt = ot[pt];
          ja(f, E, Tt, Tt.viewport);
        }
      } else
        N.length > 0 && Za(G, N, E, U), Z && Ut.render(E), ja(f, E, U);
      D !== null && (T.updateMultisampleRenderTarget(D), T.updateRenderTargetMipmap(D)), E.isScene === !0 && E.onAfterRender(v, E, U), ce.resetDefaultState(), S = -1, M = null, x.pop(), x.length > 0 ? (m = x[x.length - 1], st === !0 && it.setGlobalState(v.clippingPlanes, m.state.camera)) : m = null, b.pop(), b.length > 0 ? f = b[b.length - 1] : f = null;
    };
    function Ur(E, U, V, G) {
      if (E.visible === !1) return;
      if (E.layers.test(U.layers)) {
        if (E.isGroup)
          V = E.renderOrder;
        else if (E.isLOD)
          E.autoUpdate === !0 && E.update(U);
        else if (E.isLight)
          m.pushLight(E), E.castShadow && m.pushShadow(E);
        else if (E.isSprite) {
          if (!E.frustumCulled || Y.intersectsSprite(E)) {
            G && Nt.setFromMatrixPosition(E.matrixWorld).applyMatrix4(Dt);
            const pt = q.update(E), wt = E.material;
            wt.visible && f.push(E, pt, wt, V, Nt.z, null);
          }
        } else if ((E.isMesh || E.isLine || E.isPoints) && (!E.frustumCulled || Y.intersectsObject(E))) {
          const pt = q.update(E), wt = E.material;
          if (G && (E.boundingSphere !== void 0 ? (E.boundingSphere === null && E.computeBoundingSphere(), Nt.copy(E.boundingSphere.center)) : (pt.boundingSphere === null && pt.computeBoundingSphere(), Nt.copy(pt.boundingSphere.center)), Nt.applyMatrix4(E.matrixWorld).applyMatrix4(Dt)), Array.isArray(wt)) {
            const Tt = pt.groups;
            for (let kt = 0, zt = Tt.length; kt < zt; kt++) {
              const At = Tt[kt], Jt = wt[At.materialIndex];
              Jt && Jt.visible && f.push(E, pt, Jt, V, Nt.z, At);
            }
          } else wt.visible && f.push(E, pt, wt, V, Nt.z, null);
        }
      }
      const ot = E.children;
      for (let pt = 0, wt = ot.length; pt < wt; pt++)
        Ur(ot[pt], U, V, G);
    }
    function ja(E, U, V, G) {
      const N = E.opaque, ot = E.transmissive, pt = E.transparent;
      m.setupLightsView(V), st === !0 && it.setGlobalState(v.clippingPlanes, V), G && lt.viewport(P.copy(G)), N.length > 0 && Us(N, U, V), ot.length > 0 && Us(ot, U, V), pt.length > 0 && Us(pt, U, V), lt.buffers.depth.setTest(!0), lt.buffers.depth.setMask(!0), lt.buffers.color.setMask(!0), lt.setPolygonOffset(!1);
    }
    function Za(E, U, V, G) {
      if ((V.isScene === !0 ? V.overrideMaterial : null) !== null)
        return;
      m.state.transmissionRenderTarget[G.id] === void 0 && (m.state.transmissionRenderTarget[G.id] = new ai(1, 1, {
        generateMipmaps: !0,
        type: Q.has("EXT_color_buffer_half_float") || Q.has("EXT_color_buffer_float") ? Ps : yn,
        minFilter: ei,
        samples: 4,
        stencilBuffer: r,
        resolveDepthBuffer: !1,
        resolveStencilBuffer: !1,
        colorSpace: Kt.workingColorSpace
      }));
      const ot = m.state.transmissionRenderTarget[G.id], pt = G.viewport || P;
      ot.setSize(pt.z, pt.w);
      const wt = v.getRenderTarget();
      v.setRenderTarget(ot), v.getClearColor(F), W = v.getClearAlpha(), W < 1 && v.setClearColor(16777215, 0.5), v.clear(), Z && Ut.render(V);
      const Tt = v.toneMapping;
      v.toneMapping = Nn;
      const kt = G.viewport;
      if (G.viewport !== void 0 && (G.viewport = void 0), m.setupLightsView(G), st === !0 && it.setGlobalState(v.clippingPlanes, G), Us(E, V, G), T.updateMultisampleRenderTarget(ot), T.updateRenderTargetMipmap(ot), Q.has("WEBGL_multisampled_render_to_texture") === !1) {
        let zt = !1;
        for (let At = 0, Jt = U.length; At < Jt; At++) {
          const he = U[At], fe = he.object, Ie = he.geometry, te = he.material, Rt = he.group;
          if (te.side === $e && fe.layers.test(G.layers)) {
            const cn = te.side;
            te.side = Ne, te.needsUpdate = !0, Ka(fe, V, G, Ie, te, Rt), te.side = cn, te.needsUpdate = !0, zt = !0;
          }
        }
        zt === !0 && (T.updateMultisampleRenderTarget(ot), T.updateRenderTargetMipmap(ot));
      }
      v.setRenderTarget(wt), v.setClearColor(F, W), kt !== void 0 && (G.viewport = kt), v.toneMapping = Tt;
    }
    function Us(E, U, V) {
      const G = U.isScene === !0 ? U.overrideMaterial : null;
      for (let N = 0, ot = E.length; N < ot; N++) {
        const pt = E[N], wt = pt.object, Tt = pt.geometry, kt = G === null ? pt.material : G, zt = pt.group;
        wt.layers.test(V.layers) && Ka(wt, U, V, Tt, kt, zt);
      }
    }
    function Ka(E, U, V, G, N, ot) {
      E.onBeforeRender(v, U, V, G, N, ot), E.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse, E.matrixWorld), E.normalMatrix.getNormalMatrix(E.modelViewMatrix), N.onBeforeRender(v, U, V, G, E, ot), N.transparent === !0 && N.side === $e && N.forceSinglePass === !1 ? (N.side = Ne, N.needsUpdate = !0, v.renderBufferDirect(V, U, G, N, E, ot), N.side = Fn, N.needsUpdate = !0, v.renderBufferDirect(V, U, G, N, E, ot), N.side = $e) : v.renderBufferDirect(V, U, G, N, E, ot), E.onAfterRender(v, U, V, G, N, ot);
    }
    function Ns(E, U, V) {
      U.isScene !== !0 && (U = Zt);
      const G = gt.get(E), N = m.state.lights, ot = m.state.shadowsArray, pt = N.state.version, wt = Et.getParameters(E, N.state, ot, U, V), Tt = Et.getProgramCacheKey(wt);
      let kt = G.programs;
      G.environment = E.isMeshStandardMaterial ? U.environment : null, G.fog = U.fog, G.envMap = (E.isMeshStandardMaterial ? B : y).get(E.envMap || G.environment), G.envMapRotation = G.environment !== null && E.envMap === null ? U.environmentRotation : E.envMapRotation, kt === void 0 && (E.addEventListener("dispose", Bt), kt = /* @__PURE__ */ new Map(), G.programs = kt);
      let zt = kt.get(Tt);
      if (zt !== void 0) {
        if (G.currentProgram === zt && G.lightsStateVersion === pt)
          return Qa(E, wt), zt;
      } else
        wt.uniforms = Et.getUniforms(E), E.onBeforeCompile(wt, v), zt = Et.acquireProgram(wt, Tt), kt.set(Tt, zt), G.uniforms = wt.uniforms;
      const At = G.uniforms;
      return (!E.isShaderMaterial && !E.isRawShaderMaterial || E.clipping === !0) && (At.clippingPlanes = it.uniform), Qa(E, wt), G.needsLights = Dh(E), G.lightsStateVersion = pt, G.needsLights && (At.ambientLightColor.value = N.state.ambient, At.lightProbe.value = N.state.probe, At.directionalLights.value = N.state.directional, At.directionalLightShadows.value = N.state.directionalShadow, At.spotLights.value = N.state.spot, At.spotLightShadows.value = N.state.spotShadow, At.rectAreaLights.value = N.state.rectArea, At.ltc_1.value = N.state.rectAreaLTC1, At.ltc_2.value = N.state.rectAreaLTC2, At.pointLights.value = N.state.point, At.pointLightShadows.value = N.state.pointShadow, At.hemisphereLights.value = N.state.hemi, At.directionalShadowMap.value = N.state.directionalShadowMap, At.directionalShadowMatrix.value = N.state.directionalShadowMatrix, At.spotShadowMap.value = N.state.spotShadowMap, At.spotLightMatrix.value = N.state.spotLightMatrix, At.spotLightMap.value = N.state.spotLightMap, At.pointShadowMap.value = N.state.pointShadowMap, At.pointShadowMatrix.value = N.state.pointShadowMatrix), G.currentProgram = zt, G.uniformsList = null, zt;
    }
    function Ja(E) {
      if (E.uniformsList === null) {
        const U = E.currentProgram.getUniforms();
        E.uniformsList = _r.seqWithValue(U.seq, E.uniforms);
      }
      return E.uniformsList;
    }
    function Qa(E, U) {
      const V = gt.get(E);
      V.outputColorSpace = U.outputColorSpace, V.batching = U.batching, V.batchingColor = U.batchingColor, V.instancing = U.instancing, V.instancingColor = U.instancingColor, V.instancingMorph = U.instancingMorph, V.skinning = U.skinning, V.morphTargets = U.morphTargets, V.morphNormals = U.morphNormals, V.morphColors = U.morphColors, V.morphTargetsCount = U.morphTargetsCount, V.numClippingPlanes = U.numClippingPlanes, V.numIntersection = U.numClipIntersection, V.vertexAlphas = U.vertexAlphas, V.vertexTangents = U.vertexTangents, V.toneMapping = U.toneMapping;
    }
    function Ph(E, U, V, G, N) {
      U.isScene !== !0 && (U = Zt), T.resetTextureUnits();
      const ot = U.fog, pt = G.isMeshStandardMaterial ? U.environment : null, wt = D === null ? v.outputColorSpace : D.isXRRenderTarget === !0 ? D.texture.colorSpace : qi, Tt = (G.isMeshStandardMaterial ? B : y).get(G.envMap || pt), kt = G.vertexColors === !0 && !!V.attributes.color && V.attributes.color.itemSize === 4, zt = !!V.attributes.tangent && (!!G.normalMap || G.anisotropy > 0), At = !!V.morphAttributes.position, Jt = !!V.morphAttributes.normal, he = !!V.morphAttributes.color;
      let fe = Nn;
      G.toneMapped && (D === null || D.isXRRenderTarget === !0) && (fe = v.toneMapping);
      const Ie = V.morphAttributes.position || V.morphAttributes.normal || V.morphAttributes.color, te = Ie !== void 0 ? Ie.length : 0, Rt = gt.get(G), cn = m.state.lights;
      if (st === !0 && (bt === !0 || E !== M)) {
        const He = E === M && G.id === S;
        it.setState(G, E, He);
      }
      let ee = !1;
      G.version === Rt.__version ? (Rt.needsLights && Rt.lightsStateVersion !== cn.state.version || Rt.outputColorSpace !== wt || N.isBatchedMesh && Rt.batching === !1 || !N.isBatchedMesh && Rt.batching === !0 || N.isBatchedMesh && Rt.batchingColor === !0 && N.colorTexture === null || N.isBatchedMesh && Rt.batchingColor === !1 && N.colorTexture !== null || N.isInstancedMesh && Rt.instancing === !1 || !N.isInstancedMesh && Rt.instancing === !0 || N.isSkinnedMesh && Rt.skinning === !1 || !N.isSkinnedMesh && Rt.skinning === !0 || N.isInstancedMesh && Rt.instancingColor === !0 && N.instanceColor === null || N.isInstancedMesh && Rt.instancingColor === !1 && N.instanceColor !== null || N.isInstancedMesh && Rt.instancingMorph === !0 && N.morphTexture === null || N.isInstancedMesh && Rt.instancingMorph === !1 && N.morphTexture !== null || Rt.envMap !== Tt || G.fog === !0 && Rt.fog !== ot || Rt.numClippingPlanes !== void 0 && (Rt.numClippingPlanes !== it.numPlanes || Rt.numIntersection !== it.numIntersection) || Rt.vertexAlphas !== kt || Rt.vertexTangents !== zt || Rt.morphTargets !== At || Rt.morphNormals !== Jt || Rt.morphColors !== he || Rt.toneMapping !== fe || Rt.morphTargetsCount !== te) && (ee = !0) : (ee = !0, Rt.__version = G.version);
      let Xe = Rt.currentProgram;
      ee === !0 && (Xe = Ns(G, U, N));
      let pi = !1, Fe = !1, Ji = !1;
      const pe = Xe.getUniforms(), Qe = Rt.uniforms;
      if (lt.useProgram(Xe.program) && (pi = !0, Fe = !0, Ji = !0), G.id !== S && (S = G.id, Fe = !0), pi || M !== E) {
        lt.buffers.depth.getReversed() ? (at.copy(E.projectionMatrix), wd(at), Td(at), pe.setValue(R, "projectionMatrix", at)) : pe.setValue(R, "projectionMatrix", E.projectionMatrix), pe.setValue(R, "viewMatrix", E.matrixWorldInverse);
        const Mn = pe.map.cameraPosition;
        Mn !== void 0 && Mn.setValue(R, Ft.setFromMatrixPosition(E.matrixWorld)), vt.logarithmicDepthBuffer && pe.setValue(
          R,
          "logDepthBufFC",
          2 / (Math.log(E.far + 1) / Math.LN2)
        ), (G.isMeshPhongMaterial || G.isMeshToonMaterial || G.isMeshLambertMaterial || G.isMeshBasicMaterial || G.isMeshStandardMaterial || G.isShaderMaterial) && pe.setValue(R, "isOrthographic", E.isOrthographicCamera === !0), M !== E && (M = E, Fe = !0, Ji = !0);
      }
      if (N.isSkinnedMesh) {
        pe.setOptional(R, N, "bindMatrix"), pe.setOptional(R, N, "bindMatrixInverse");
        const He = N.skeleton;
        He && (He.boneTexture === null && He.computeBoneTexture(), pe.setValue(R, "boneTexture", He.boneTexture, T));
      }
      N.isBatchedMesh && (pe.setOptional(R, N, "batchingTexture"), pe.setValue(R, "batchingTexture", N._matricesTexture, T), pe.setOptional(R, N, "batchingIdTexture"), pe.setValue(R, "batchingIdTexture", N._indirectTexture, T), pe.setOptional(R, N, "batchingColorTexture"), N._colorsTexture !== null && pe.setValue(R, "batchingColorTexture", N._colorsTexture, T));
      const Qi = V.morphAttributes;
      if ((Qi.position !== void 0 || Qi.normal !== void 0 || Qi.color !== void 0) && Ot.update(N, V, Xe), (Fe || Rt.receiveShadow !== N.receiveShadow) && (Rt.receiveShadow = N.receiveShadow, pe.setValue(R, "receiveShadow", N.receiveShadow)), G.isMeshGouraudMaterial && G.envMap !== null && (Qe.envMap.value = Tt, Qe.flipEnvMap.value = Tt.isCubeTexture && Tt.isRenderTargetTexture === !1 ? -1 : 1), G.isMeshStandardMaterial && G.envMap === null && U.environment !== null && (Qe.envMapIntensity.value = U.environmentIntensity), Fe && (pe.setValue(R, "toneMappingExposure", v.toneMappingExposure), Rt.needsLights && Lh(Qe, Ji), ot && G.fog === !0 && ut.refreshFogUniforms(Qe, ot), ut.refreshMaterialUniforms(Qe, G, k, J, m.state.transmissionRenderTarget[E.id]), _r.upload(R, Ja(Rt), Qe, T)), G.isShaderMaterial && G.uniformsNeedUpdate === !0 && (_r.upload(R, Ja(Rt), Qe, T), G.uniformsNeedUpdate = !1), G.isSpriteMaterial && pe.setValue(R, "center", N.center), pe.setValue(R, "modelViewMatrix", N.modelViewMatrix), pe.setValue(R, "normalMatrix", N.normalMatrix), pe.setValue(R, "modelMatrix", N.matrixWorld), G.isShaderMaterial || G.isRawShaderMaterial) {
        const He = G.uniformsGroups;
        for (let Mn = 0, bn = He.length; Mn < bn; Mn++) {
          const tl = He[Mn];
          I.update(tl, Xe), I.bind(tl, Xe);
        }
      }
      return Xe;
    }
    function Lh(E, U) {
      E.ambientLightColor.needsUpdate = U, E.lightProbe.needsUpdate = U, E.directionalLights.needsUpdate = U, E.directionalLightShadows.needsUpdate = U, E.pointLights.needsUpdate = U, E.pointLightShadows.needsUpdate = U, E.spotLights.needsUpdate = U, E.spotLightShadows.needsUpdate = U, E.rectAreaLights.needsUpdate = U, E.hemisphereLights.needsUpdate = U;
    }
    function Dh(E) {
      return E.isMeshLambertMaterial || E.isMeshToonMaterial || E.isMeshPhongMaterial || E.isMeshStandardMaterial || E.isShadowMaterial || E.isShaderMaterial && E.lights === !0;
    }
    this.getActiveCubeFace = function() {
      return A;
    }, this.getActiveMipmapLevel = function() {
      return C;
    }, this.getRenderTarget = function() {
      return D;
    }, this.setRenderTargetTextures = function(E, U, V) {
      gt.get(E.texture).__webglTexture = U, gt.get(E.depthTexture).__webglTexture = V;
      const G = gt.get(E);
      G.__hasExternalTextures = !0, G.__autoAllocateDepthBuffer = V === void 0, G.__autoAllocateDepthBuffer || Q.has("WEBGL_multisampled_render_to_texture") === !0 && (console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"), G.__useRenderToTexture = !1);
    }, this.setRenderTargetFramebuffer = function(E, U) {
      const V = gt.get(E);
      V.__webglFramebuffer = U, V.__useDefaultFramebuffer = U === void 0;
    }, this.setRenderTarget = function(E, U = 0, V = 0) {
      D = E, A = U, C = V;
      let G = !0, N = null, ot = !1, pt = !1;
      if (E) {
        const Tt = gt.get(E);
        if (Tt.__useDefaultFramebuffer !== void 0)
          lt.bindFramebuffer(R.FRAMEBUFFER, null), G = !1;
        else if (Tt.__webglFramebuffer === void 0)
          T.setupRenderTarget(E);
        else if (Tt.__hasExternalTextures)
          T.rebindTextures(E, gt.get(E.texture).__webglTexture, gt.get(E.depthTexture).__webglTexture);
        else if (E.depthBuffer) {
          const At = E.depthTexture;
          if (Tt.__boundDepthTexture !== At) {
            if (At !== null && gt.has(At) && (E.width !== At.image.width || E.height !== At.image.height))
              throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");
            T.setupDepthRenderbuffer(E);
          }
        }
        const kt = E.texture;
        (kt.isData3DTexture || kt.isDataArrayTexture || kt.isCompressedArrayTexture) && (pt = !0);
        const zt = gt.get(E).__webglFramebuffer;
        E.isWebGLCubeRenderTarget ? (Array.isArray(zt[U]) ? N = zt[U][V] : N = zt[U], ot = !0) : E.samples > 0 && T.useMultisampledRTT(E) === !1 ? N = gt.get(E).__webglMultisampledFramebuffer : Array.isArray(zt) ? N = zt[V] : N = zt, P.copy(E.viewport), z.copy(E.scissor), O = E.scissorTest;
      } else
        P.copy(ht).multiplyScalar(k).floor(), z.copy(Pt).multiplyScalar(k).floor(), O = Yt;
      if (lt.bindFramebuffer(R.FRAMEBUFFER, N) && G && lt.drawBuffers(E, N), lt.viewport(P), lt.scissor(z), lt.setScissorTest(O), ot) {
        const Tt = gt.get(E.texture);
        R.framebufferTexture2D(R.FRAMEBUFFER, R.COLOR_ATTACHMENT0, R.TEXTURE_CUBE_MAP_POSITIVE_X + U, Tt.__webglTexture, V);
      } else if (pt) {
        const Tt = gt.get(E.texture), kt = U || 0;
        R.framebufferTextureLayer(R.FRAMEBUFFER, R.COLOR_ATTACHMENT0, Tt.__webglTexture, V || 0, kt);
      }
      S = -1;
    }, this.readRenderTargetPixels = function(E, U, V, G, N, ot, pt) {
      if (!(E && E.isWebGLRenderTarget)) {
        console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
        return;
      }
      let wt = gt.get(E).__webglFramebuffer;
      if (E.isWebGLCubeRenderTarget && pt !== void 0 && (wt = wt[pt]), wt) {
        lt.bindFramebuffer(R.FRAMEBUFFER, wt);
        try {
          const Tt = E.texture, kt = Tt.format, zt = Tt.type;
          if (!vt.textureFormatReadable(kt)) {
            console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
            return;
          }
          if (!vt.textureTypeReadable(zt)) {
            console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
            return;
          }
          U >= 0 && U <= E.width - G && V >= 0 && V <= E.height - N && R.readPixels(U, V, G, N, Vt.convert(kt), Vt.convert(zt), ot);
        } finally {
          const Tt = D !== null ? gt.get(D).__webglFramebuffer : null;
          lt.bindFramebuffer(R.FRAMEBUFFER, Tt);
        }
      }
    }, this.readRenderTargetPixelsAsync = async function(E, U, V, G, N, ot, pt) {
      if (!(E && E.isWebGLRenderTarget))
        throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
      let wt = gt.get(E).__webglFramebuffer;
      if (E.isWebGLCubeRenderTarget && pt !== void 0 && (wt = wt[pt]), wt) {
        const Tt = E.texture, kt = Tt.format, zt = Tt.type;
        if (!vt.textureFormatReadable(kt))
          throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");
        if (!vt.textureTypeReadable(zt))
          throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");
        if (U >= 0 && U <= E.width - G && V >= 0 && V <= E.height - N) {
          lt.bindFramebuffer(R.FRAMEBUFFER, wt);
          const At = R.createBuffer();
          R.bindBuffer(R.PIXEL_PACK_BUFFER, At), R.bufferData(R.PIXEL_PACK_BUFFER, ot.byteLength, R.STREAM_READ), R.readPixels(U, V, G, N, Vt.convert(kt), Vt.convert(zt), 0);
          const Jt = D !== null ? gt.get(D).__webglFramebuffer : null;
          lt.bindFramebuffer(R.FRAMEBUFFER, Jt);
          const he = R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE, 0);
          return R.flush(), await Ed(R, he, 4), R.bindBuffer(R.PIXEL_PACK_BUFFER, At), R.getBufferSubData(R.PIXEL_PACK_BUFFER, 0, ot), R.deleteBuffer(At), R.deleteSync(he), ot;
        } else
          throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.");
      }
    }, this.copyFramebufferToTexture = function(E, U = null, V = 0) {
      E.isTexture !== !0 && (cs("WebGLRenderer: copyFramebufferToTexture function signature has changed."), U = arguments[0] || null, E = arguments[1]);
      const G = Math.pow(2, -V), N = Math.floor(E.image.width * G), ot = Math.floor(E.image.height * G), pt = U !== null ? U.x : 0, wt = U !== null ? U.y : 0;
      T.setTexture2D(E, 0), R.copyTexSubImage2D(R.TEXTURE_2D, V, 0, 0, pt, wt, N, ot), lt.unbindTexture();
    }, this.copyTextureToTexture = function(E, U, V = null, G = null, N = 0) {
      E.isTexture !== !0 && (cs("WebGLRenderer: copyTextureToTexture function signature has changed."), G = arguments[0] || null, E = arguments[1], U = arguments[2], N = arguments[3] || 0, V = null);
      let ot, pt, wt, Tt, kt, zt, At, Jt, he;
      const fe = E.isCompressedTexture ? E.mipmaps[N] : E.image;
      V !== null ? (ot = V.max.x - V.min.x, pt = V.max.y - V.min.y, wt = V.isBox3 ? V.max.z - V.min.z : 1, Tt = V.min.x, kt = V.min.y, zt = V.isBox3 ? V.min.z : 0) : (ot = fe.width, pt = fe.height, wt = fe.depth || 1, Tt = 0, kt = 0, zt = 0), G !== null ? (At = G.x, Jt = G.y, he = G.z) : (At = 0, Jt = 0, he = 0);
      const Ie = Vt.convert(U.format), te = Vt.convert(U.type);
      let Rt;
      U.isData3DTexture ? (T.setTexture3D(U, 0), Rt = R.TEXTURE_3D) : U.isDataArrayTexture || U.isCompressedArrayTexture ? (T.setTexture2DArray(U, 0), Rt = R.TEXTURE_2D_ARRAY) : (T.setTexture2D(U, 0), Rt = R.TEXTURE_2D), R.pixelStorei(R.UNPACK_FLIP_Y_WEBGL, U.flipY), R.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL, U.premultiplyAlpha), R.pixelStorei(R.UNPACK_ALIGNMENT, U.unpackAlignment);
      const cn = R.getParameter(R.UNPACK_ROW_LENGTH), ee = R.getParameter(R.UNPACK_IMAGE_HEIGHT), Xe = R.getParameter(R.UNPACK_SKIP_PIXELS), pi = R.getParameter(R.UNPACK_SKIP_ROWS), Fe = R.getParameter(R.UNPACK_SKIP_IMAGES);
      R.pixelStorei(R.UNPACK_ROW_LENGTH, fe.width), R.pixelStorei(R.UNPACK_IMAGE_HEIGHT, fe.height), R.pixelStorei(R.UNPACK_SKIP_PIXELS, Tt), R.pixelStorei(R.UNPACK_SKIP_ROWS, kt), R.pixelStorei(R.UNPACK_SKIP_IMAGES, zt);
      const Ji = E.isDataArrayTexture || E.isData3DTexture, pe = U.isDataArrayTexture || U.isData3DTexture;
      if (E.isRenderTargetTexture || E.isDepthTexture) {
        const Qe = gt.get(E), Qi = gt.get(U), He = gt.get(Qe.__renderTarget), Mn = gt.get(Qi.__renderTarget);
        lt.bindFramebuffer(R.READ_FRAMEBUFFER, He.__webglFramebuffer), lt.bindFramebuffer(R.DRAW_FRAMEBUFFER, Mn.__webglFramebuffer);
        for (let bn = 0; bn < wt; bn++)
          Ji && R.framebufferTextureLayer(R.READ_FRAMEBUFFER, R.COLOR_ATTACHMENT0, gt.get(E).__webglTexture, N, zt + bn), E.isDepthTexture ? (pe && R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER, R.COLOR_ATTACHMENT0, gt.get(U).__webglTexture, N, he + bn), R.blitFramebuffer(Tt, kt, ot, pt, At, Jt, ot, pt, R.DEPTH_BUFFER_BIT, R.NEAREST)) : pe ? R.copyTexSubImage3D(Rt, N, At, Jt, he + bn, Tt, kt, ot, pt) : R.copyTexSubImage2D(Rt, N, At, Jt, he + bn, Tt, kt, ot, pt);
        lt.bindFramebuffer(R.READ_FRAMEBUFFER, null), lt.bindFramebuffer(R.DRAW_FRAMEBUFFER, null);
      } else
        pe ? E.isDataTexture || E.isData3DTexture ? R.texSubImage3D(Rt, N, At, Jt, he, ot, pt, wt, Ie, te, fe.data) : U.isCompressedArrayTexture ? R.compressedTexSubImage3D(Rt, N, At, Jt, he, ot, pt, wt, Ie, fe.data) : R.texSubImage3D(Rt, N, At, Jt, he, ot, pt, wt, Ie, te, fe) : E.isDataTexture ? R.texSubImage2D(R.TEXTURE_2D, N, At, Jt, ot, pt, Ie, te, fe.data) : E.isCompressedTexture ? R.compressedTexSubImage2D(R.TEXTURE_2D, N, At, Jt, fe.width, fe.height, Ie, fe.data) : R.texSubImage2D(R.TEXTURE_2D, N, At, Jt, ot, pt, Ie, te, fe);
      R.pixelStorei(R.UNPACK_ROW_LENGTH, cn), R.pixelStorei(R.UNPACK_IMAGE_HEIGHT, ee), R.pixelStorei(R.UNPACK_SKIP_PIXELS, Xe), R.pixelStorei(R.UNPACK_SKIP_ROWS, pi), R.pixelStorei(R.UNPACK_SKIP_IMAGES, Fe), N === 0 && U.generateMipmaps && R.generateMipmap(Rt), lt.unbindTexture();
    }, this.copyTextureToTexture3D = function(E, U, V = null, G = null, N = 0) {
      return E.isTexture !== !0 && (cs("WebGLRenderer: copyTextureToTexture3D function signature has changed."), V = arguments[0] || null, G = arguments[1] || null, E = arguments[2], U = arguments[3], N = arguments[4] || 0), cs('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'), this.copyTextureToTexture(E, U, V, G, N);
    }, this.initRenderTarget = function(E) {
      gt.get(E).__webglFramebuffer === void 0 && T.setupRenderTarget(E);
    }, this.initTexture = function(E) {
      E.isCubeTexture ? T.setTextureCube(E, 0) : E.isData3DTexture ? T.setTexture3D(E, 0) : E.isDataArrayTexture || E.isCompressedArrayTexture ? T.setTexture2DArray(E, 0) : T.setTexture2D(E, 0), lt.unbindTexture();
    }, this.resetState = function() {
      A = 0, C = 0, D = null, lt.reset(), ce.reset();
    }, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  get coordinateSystem() {
    return _n;
  }
  get outputColorSpace() {
    return this._outputColorSpace;
  }
  set outputColorSpace(t) {
    this._outputColorSpace = t;
    const e = this.getContext();
    e.drawingBufferColorspace = Kt._getDrawingBufferColorSpace(t), e.unpackColorSpace = Kt._getUnpackColorSpace();
  }
}
class k_ extends Ce {
  constructor() {
    super(), this.isScene = !0, this.type = "Scene", this.background = null, this.environment = null, this.fog = null, this.backgroundBlurriness = 0, this.backgroundIntensity = 1, this.backgroundRotation = new on(), this.environmentIntensity = 1, this.environmentRotation = new on(), this.overrideMaterial = null, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  copy(t, e) {
    return super.copy(t, e), t.background !== null && (this.background = t.background.clone()), t.environment !== null && (this.environment = t.environment.clone()), t.fog !== null && (this.fog = t.fog.clone()), this.backgroundBlurriness = t.backgroundBlurriness, this.backgroundIntensity = t.backgroundIntensity, this.backgroundRotation.copy(t.backgroundRotation), this.environmentIntensity = t.environmentIntensity, this.environmentRotation.copy(t.environmentRotation), t.overrideMaterial !== null && (this.overrideMaterial = t.overrideMaterial.clone()), this.matrixAutoUpdate = t.matrixAutoUpdate, this;
  }
  toJSON(t) {
    const e = super.toJSON(t);
    return this.fog !== null && (e.object.fog = this.fog.toJSON()), this.backgroundBlurriness > 0 && (e.object.backgroundBlurriness = this.backgroundBlurriness), this.backgroundIntensity !== 1 && (e.object.backgroundIntensity = this.backgroundIntensity), e.object.backgroundRotation = this.backgroundRotation.toArray(), this.environmentIntensity !== 1 && (e.object.environmentIntensity = this.environmentIntensity), e.object.environmentRotation = this.environmentRotation.toArray(), e;
  }
}
class Fa extends ji {
  static get type() {
    return "LineBasicMaterial";
  }
  constructor(t) {
    super(), this.isLineBasicMaterial = !0, this.color = new Wt(16777215), this.map = null, this.linewidth = 1, this.linecap = "round", this.linejoin = "round", this.fog = !0, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.color.copy(t.color), this.map = t.map, this.linewidth = t.linewidth, this.linecap = t.linecap, this.linejoin = t.linejoin, this.fog = t.fog, this;
  }
}
const Sr = /* @__PURE__ */ new L(), Er = /* @__PURE__ */ new L(), mc = /* @__PURE__ */ new ue(), os = /* @__PURE__ */ new Pr(), ir = /* @__PURE__ */ new Rr(), mo = /* @__PURE__ */ new L(), gc = /* @__PURE__ */ new L();
class B_ extends Ce {
  constructor(t = new Ee(), e = new Fa()) {
    super(), this.isLine = !0, this.type = "Line", this.geometry = t, this.material = e, this.updateMorphTargets();
  }
  copy(t, e) {
    return super.copy(t, e), this.material = Array.isArray(t.material) ? t.material.slice() : t.material, this.geometry = t.geometry, this;
  }
  computeLineDistances() {
    const t = this.geometry;
    if (t.index === null) {
      const e = t.attributes.position, n = [0];
      for (let s = 1, r = e.count; s < r; s++)
        Sr.fromBufferAttribute(e, s - 1), Er.fromBufferAttribute(e, s), n[s] = n[s - 1], n[s] += Sr.distanceTo(Er);
      t.setAttribute("lineDistance", new Qt(n, 1));
    } else
      console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
    return this;
  }
  raycast(t, e) {
    const n = this.geometry, s = this.matrixWorld, r = t.params.Line.threshold, a = n.drawRange;
    if (n.boundingSphere === null && n.computeBoundingSphere(), ir.copy(n.boundingSphere), ir.applyMatrix4(s), ir.radius += r, t.ray.intersectsSphere(ir) === !1) return;
    mc.copy(s).invert(), os.copy(t.ray).applyMatrix4(mc);
    const o = r / ((this.scale.x + this.scale.y + this.scale.z) / 3), l = o * o, c = this.isLineSegments ? 2 : 1, h = n.index, d = n.attributes.position;
    if (h !== null) {
      const p = Math.max(0, a.start), g = Math.min(h.count, a.start + a.count);
      for (let _ = p, f = g - 1; _ < f; _ += c) {
        const m = h.getX(_), b = h.getX(_ + 1), x = sr(this, t, os, l, m, b);
        x && e.push(x);
      }
      if (this.isLineLoop) {
        const _ = h.getX(g - 1), f = h.getX(p), m = sr(this, t, os, l, _, f);
        m && e.push(m);
      }
    } else {
      const p = Math.max(0, a.start), g = Math.min(d.count, a.start + a.count);
      for (let _ = p, f = g - 1; _ < f; _ += c) {
        const m = sr(this, t, os, l, _, _ + 1);
        m && e.push(m);
      }
      if (this.isLineLoop) {
        const _ = sr(this, t, os, l, g - 1, p);
        _ && e.push(_);
      }
    }
  }
  updateMorphTargets() {
    const e = this.geometry.morphAttributes, n = Object.keys(e);
    if (n.length > 0) {
      const s = e[n[0]];
      if (s !== void 0) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let r = 0, a = s.length; r < a; r++) {
          const o = s[r].name || String(r);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[o] = r;
        }
      }
    }
  }
}
function sr(i, t, e, n, s, r) {
  const a = i.geometry.attributes.position;
  if (Sr.fromBufferAttribute(a, s), Er.fromBufferAttribute(a, r), e.distanceSqToSegment(Sr, Er, mo, gc) > n) return;
  mo.applyMatrix4(i.matrixWorld);
  const l = t.ray.origin.distanceTo(mo);
  if (!(l < t.near || l > t.far))
    return {
      distance: l,
      // What do we want? intersection point on the ray or on the segment??
      // point: raycaster.ray.at( distance ),
      point: gc.clone().applyMatrix4(i.matrixWorld),
      index: s,
      face: null,
      faceIndex: null,
      barycoord: null,
      object: i
    };
}
const _c = /* @__PURE__ */ new L(), vc = /* @__PURE__ */ new L();
class ua extends B_ {
  constructor(t, e) {
    super(t, e), this.isLineSegments = !0, this.type = "LineSegments";
  }
  computeLineDistances() {
    const t = this.geometry;
    if (t.index === null) {
      const e = t.attributes.position, n = [];
      for (let s = 0, r = e.count; s < r; s += 2)
        _c.fromBufferAttribute(e, s), vc.fromBufferAttribute(e, s + 1), n[s] = s === 0 ? 0 : n[s - 1], n[s + 1] = n[s] + _c.distanceTo(vc);
      t.setAttribute("lineDistance", new Qt(n, 1));
    } else
      console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
    return this;
  }
}
class an {
  constructor() {
    this.type = "Curve", this.arcLengthDivisions = 200;
  }
  // Virtual base class method to overwrite and implement in subclasses
  //	- t [0 .. 1]
  getPoint() {
    return console.warn("THREE.Curve: .getPoint() not implemented."), null;
  }
  // Get point at relative position in curve according to arc length
  // - u [0 .. 1]
  getPointAt(t, e) {
    const n = this.getUtoTmapping(t);
    return this.getPoint(n, e);
  }
  // Get sequence of points using getPoint( t )
  getPoints(t = 5) {
    const e = [];
    for (let n = 0; n <= t; n++)
      e.push(this.getPoint(n / t));
    return e;
  }
  // Get sequence of points using getPointAt( u )
  getSpacedPoints(t = 5) {
    const e = [];
    for (let n = 0; n <= t; n++)
      e.push(this.getPointAt(n / t));
    return e;
  }
  // Get total curve arc length
  getLength() {
    const t = this.getLengths();
    return t[t.length - 1];
  }
  // Get list of cumulative segment lengths
  getLengths(t = this.arcLengthDivisions) {
    if (this.cacheArcLengths && this.cacheArcLengths.length === t + 1 && !this.needsUpdate)
      return this.cacheArcLengths;
    this.needsUpdate = !1;
    const e = [];
    let n, s = this.getPoint(0), r = 0;
    e.push(0);
    for (let a = 1; a <= t; a++)
      n = this.getPoint(a / t), r += n.distanceTo(s), e.push(r), s = n;
    return this.cacheArcLengths = e, e;
  }
  updateArcLengths() {
    this.needsUpdate = !0, this.getLengths();
  }
  // Given u ( 0 .. 1 ), get a t to find p. This gives you points which are equidistant
  getUtoTmapping(t, e) {
    const n = this.getLengths();
    let s = 0;
    const r = n.length;
    let a;
    e ? a = e : a = t * n[r - 1];
    let o = 0, l = r - 1, c;
    for (; o <= l; )
      if (s = Math.floor(o + (l - o) / 2), c = n[s] - a, c < 0)
        o = s + 1;
      else if (c > 0)
        l = s - 1;
      else {
        l = s;
        break;
      }
    if (s = l, n[s] === a)
      return s / (r - 1);
    const h = n[s], d = n[s + 1] - h, p = (a - h) / d;
    return (s + p) / (r - 1);
  }
  // Returns a unit vector tangent at t
  // In case any sub curve does not implement its tangent derivation,
  // 2 points a small delta apart will be used to find its gradient
  // which seems to give a reasonable approximation
  getTangent(t, e) {
    let s = t - 1e-4, r = t + 1e-4;
    s < 0 && (s = 0), r > 1 && (r = 1);
    const a = this.getPoint(s), o = this.getPoint(r), l = e || (a.isVector2 ? new et() : new L());
    return l.copy(o).sub(a).normalize(), l;
  }
  getTangentAt(t, e) {
    const n = this.getUtoTmapping(t);
    return this.getTangent(n, e);
  }
  computeFrenetFrames(t, e) {
    const n = new L(), s = [], r = [], a = [], o = new L(), l = new ue();
    for (let p = 0; p <= t; p++) {
      const g = p / t;
      s[p] = this.getTangentAt(g, new L());
    }
    r[0] = new L(), a[0] = new L();
    let c = Number.MAX_VALUE;
    const h = Math.abs(s[0].x), u = Math.abs(s[0].y), d = Math.abs(s[0].z);
    h <= c && (c = h, n.set(1, 0, 0)), u <= c && (c = u, n.set(0, 1, 0)), d <= c && n.set(0, 0, 1), o.crossVectors(s[0], n).normalize(), r[0].crossVectors(s[0], o), a[0].crossVectors(s[0], r[0]);
    for (let p = 1; p <= t; p++) {
      if (r[p] = r[p - 1].clone(), a[p] = a[p - 1].clone(), o.crossVectors(s[p - 1], s[p]), o.length() > Number.EPSILON) {
        o.normalize();
        const g = Math.acos(Se(s[p - 1].dot(s[p]), -1, 1));
        r[p].applyMatrix4(l.makeRotationAxis(o, g));
      }
      a[p].crossVectors(s[p], r[p]);
    }
    if (e === !0) {
      let p = Math.acos(Se(r[0].dot(r[t]), -1, 1));
      p /= t, s[0].dot(o.crossVectors(r[0], r[t])) > 0 && (p = -p);
      for (let g = 1; g <= t; g++)
        r[g].applyMatrix4(l.makeRotationAxis(s[g], p * g)), a[g].crossVectors(s[g], r[g]);
    }
    return {
      tangents: s,
      normals: r,
      binormals: a
    };
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    return this.arcLengthDivisions = t.arcLengthDivisions, this;
  }
  toJSON() {
    const t = {
      metadata: {
        version: 4.6,
        type: "Curve",
        generator: "Curve.toJSON"
      }
    };
    return t.arcLengthDivisions = this.arcLengthDivisions, t.type = this.type, t;
  }
  fromJSON(t) {
    return this.arcLengthDivisions = t.arcLengthDivisions, this;
  }
}
class ka extends an {
  constructor(t = 0, e = 0, n = 1, s = 1, r = 0, a = Math.PI * 2, o = !1, l = 0) {
    super(), this.isEllipseCurve = !0, this.type = "EllipseCurve", this.aX = t, this.aY = e, this.xRadius = n, this.yRadius = s, this.aStartAngle = r, this.aEndAngle = a, this.aClockwise = o, this.aRotation = l;
  }
  getPoint(t, e = new et()) {
    const n = e, s = Math.PI * 2;
    let r = this.aEndAngle - this.aStartAngle;
    const a = Math.abs(r) < Number.EPSILON;
    for (; r < 0; ) r += s;
    for (; r > s; ) r -= s;
    r < Number.EPSILON && (a ? r = 0 : r = s), this.aClockwise === !0 && !a && (r === s ? r = -s : r = r - s);
    const o = this.aStartAngle + t * r;
    let l = this.aX + this.xRadius * Math.cos(o), c = this.aY + this.yRadius * Math.sin(o);
    if (this.aRotation !== 0) {
      const h = Math.cos(this.aRotation), u = Math.sin(this.aRotation), d = l - this.aX, p = c - this.aY;
      l = d * h - p * u + this.aX, c = d * u + p * h + this.aY;
    }
    return n.set(l, c);
  }
  copy(t) {
    return super.copy(t), this.aX = t.aX, this.aY = t.aY, this.xRadius = t.xRadius, this.yRadius = t.yRadius, this.aStartAngle = t.aStartAngle, this.aEndAngle = t.aEndAngle, this.aClockwise = t.aClockwise, this.aRotation = t.aRotation, this;
  }
  toJSON() {
    const t = super.toJSON();
    return t.aX = this.aX, t.aY = this.aY, t.xRadius = this.xRadius, t.yRadius = this.yRadius, t.aStartAngle = this.aStartAngle, t.aEndAngle = this.aEndAngle, t.aClockwise = this.aClockwise, t.aRotation = this.aRotation, t;
  }
  fromJSON(t) {
    return super.fromJSON(t), this.aX = t.aX, this.aY = t.aY, this.xRadius = t.xRadius, this.yRadius = t.yRadius, this.aStartAngle = t.aStartAngle, this.aEndAngle = t.aEndAngle, this.aClockwise = t.aClockwise, this.aRotation = t.aRotation, this;
  }
}
class z_ extends ka {
  constructor(t, e, n, s, r, a) {
    super(t, e, n, n, s, r, a), this.isArcCurve = !0, this.type = "ArcCurve";
  }
}
function Ba() {
  let i = 0, t = 0, e = 0, n = 0;
  function s(r, a, o, l) {
    i = r, t = o, e = -3 * r + 3 * a - 2 * o - l, n = 2 * r - 2 * a + o + l;
  }
  return {
    initCatmullRom: function(r, a, o, l, c) {
      s(a, o, c * (o - r), c * (l - a));
    },
    initNonuniformCatmullRom: function(r, a, o, l, c, h, u) {
      let d = (a - r) / c - (o - r) / (c + h) + (o - a) / h, p = (o - a) / h - (l - a) / (h + u) + (l - o) / u;
      d *= h, p *= h, s(a, o, d, p);
    },
    calc: function(r) {
      const a = r * r, o = a * r;
      return i + t * r + e * a + n * o;
    }
  };
}
const rr = /* @__PURE__ */ new L(), go = /* @__PURE__ */ new Ba(), _o = /* @__PURE__ */ new Ba(), vo = /* @__PURE__ */ new Ba();
class vh extends an {
  constructor(t = [], e = !1, n = "centripetal", s = 0.5) {
    super(), this.isCatmullRomCurve3 = !0, this.type = "CatmullRomCurve3", this.points = t, this.closed = e, this.curveType = n, this.tension = s;
  }
  getPoint(t, e = new L()) {
    const n = e, s = this.points, r = s.length, a = (r - (this.closed ? 0 : 1)) * t;
    let o = Math.floor(a), l = a - o;
    this.closed ? o += o > 0 ? 0 : (Math.floor(Math.abs(o) / r) + 1) * r : l === 0 && o === r - 1 && (o = r - 2, l = 1);
    let c, h;
    this.closed || o > 0 ? c = s[(o - 1) % r] : (rr.subVectors(s[0], s[1]).add(s[0]), c = rr);
    const u = s[o % r], d = s[(o + 1) % r];
    if (this.closed || o + 2 < r ? h = s[(o + 2) % r] : (rr.subVectors(s[r - 1], s[r - 2]).add(s[r - 1]), h = rr), this.curveType === "centripetal" || this.curveType === "chordal") {
      const p = this.curveType === "chordal" ? 0.5 : 0.25;
      let g = Math.pow(c.distanceToSquared(u), p), _ = Math.pow(u.distanceToSquared(d), p), f = Math.pow(d.distanceToSquared(h), p);
      _ < 1e-4 && (_ = 1), g < 1e-4 && (g = _), f < 1e-4 && (f = _), go.initNonuniformCatmullRom(c.x, u.x, d.x, h.x, g, _, f), _o.initNonuniformCatmullRom(c.y, u.y, d.y, h.y, g, _, f), vo.initNonuniformCatmullRom(c.z, u.z, d.z, h.z, g, _, f);
    } else this.curveType === "catmullrom" && (go.initCatmullRom(c.x, u.x, d.x, h.x, this.tension), _o.initCatmullRom(c.y, u.y, d.y, h.y, this.tension), vo.initCatmullRom(c.z, u.z, d.z, h.z, this.tension));
    return n.set(
      go.calc(l),
      _o.calc(l),
      vo.calc(l)
    ), n;
  }
  copy(t) {
    super.copy(t), this.points = [];
    for (let e = 0, n = t.points.length; e < n; e++) {
      const s = t.points[e];
      this.points.push(s.clone());
    }
    return this.closed = t.closed, this.curveType = t.curveType, this.tension = t.tension, this;
  }
  toJSON() {
    const t = super.toJSON();
    t.points = [];
    for (let e = 0, n = this.points.length; e < n; e++) {
      const s = this.points[e];
      t.points.push(s.toArray());
    }
    return t.closed = this.closed, t.curveType = this.curveType, t.tension = this.tension, t;
  }
  fromJSON(t) {
    super.fromJSON(t), this.points = [];
    for (let e = 0, n = t.points.length; e < n; e++) {
      const s = t.points[e];
      this.points.push(new L().fromArray(s));
    }
    return this.closed = t.closed, this.curveType = t.curveType, this.tension = t.tension, this;
  }
}
function xc(i, t, e, n, s) {
  const r = (n - t) * 0.5, a = (s - e) * 0.5, o = i * i, l = i * o;
  return (2 * e - 2 * n + r + a) * l + (-3 * e + 3 * n - 2 * r - a) * o + r * i + e;
}
function H_(i, t) {
  const e = 1 - i;
  return e * e * t;
}
function V_(i, t) {
  return 2 * (1 - i) * i * t;
}
function G_(i, t) {
  return i * i * t;
}
function gs(i, t, e, n) {
  return H_(i, t) + V_(i, e) + G_(i, n);
}
function $_(i, t) {
  const e = 1 - i;
  return e * e * e * t;
}
function W_(i, t) {
  const e = 1 - i;
  return 3 * e * e * i * t;
}
function X_(i, t) {
  return 3 * (1 - i) * i * i * t;
}
function Y_(i, t) {
  return i * i * i * t;
}
function _s(i, t, e, n, s) {
  return $_(i, t) + W_(i, e) + X_(i, n) + Y_(i, s);
}
class xh extends an {
  constructor(t = new et(), e = new et(), n = new et(), s = new et()) {
    super(), this.isCubicBezierCurve = !0, this.type = "CubicBezierCurve", this.v0 = t, this.v1 = e, this.v2 = n, this.v3 = s;
  }
  getPoint(t, e = new et()) {
    const n = e, s = this.v0, r = this.v1, a = this.v2, o = this.v3;
    return n.set(
      _s(t, s.x, r.x, a.x, o.x),
      _s(t, s.y, r.y, a.y, o.y)
    ), n;
  }
  copy(t) {
    return super.copy(t), this.v0.copy(t.v0), this.v1.copy(t.v1), this.v2.copy(t.v2), this.v3.copy(t.v3), this;
  }
  toJSON() {
    const t = super.toJSON();
    return t.v0 = this.v0.toArray(), t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t.v3 = this.v3.toArray(), t;
  }
  fromJSON(t) {
    return super.fromJSON(t), this.v0.fromArray(t.v0), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this.v3.fromArray(t.v3), this;
  }
}
class q_ extends an {
  constructor(t = new L(), e = new L(), n = new L(), s = new L()) {
    super(), this.isCubicBezierCurve3 = !0, this.type = "CubicBezierCurve3", this.v0 = t, this.v1 = e, this.v2 = n, this.v3 = s;
  }
  getPoint(t, e = new L()) {
    const n = e, s = this.v0, r = this.v1, a = this.v2, o = this.v3;
    return n.set(
      _s(t, s.x, r.x, a.x, o.x),
      _s(t, s.y, r.y, a.y, o.y),
      _s(t, s.z, r.z, a.z, o.z)
    ), n;
  }
  copy(t) {
    return super.copy(t), this.v0.copy(t.v0), this.v1.copy(t.v1), this.v2.copy(t.v2), this.v3.copy(t.v3), this;
  }
  toJSON() {
    const t = super.toJSON();
    return t.v0 = this.v0.toArray(), t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t.v3 = this.v3.toArray(), t;
  }
  fromJSON(t) {
    return super.fromJSON(t), this.v0.fromArray(t.v0), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this.v3.fromArray(t.v3), this;
  }
}
class yh extends an {
  constructor(t = new et(), e = new et()) {
    super(), this.isLineCurve = !0, this.type = "LineCurve", this.v1 = t, this.v2 = e;
  }
  getPoint(t, e = new et()) {
    const n = e;
    return t === 1 ? n.copy(this.v2) : (n.copy(this.v2).sub(this.v1), n.multiplyScalar(t).add(this.v1)), n;
  }
  // Line curve is linear, so we can overwrite default getPointAt
  getPointAt(t, e) {
    return this.getPoint(t, e);
  }
  getTangent(t, e = new et()) {
    return e.subVectors(this.v2, this.v1).normalize();
  }
  getTangentAt(t, e) {
    return this.getTangent(t, e);
  }
  copy(t) {
    return super.copy(t), this.v1.copy(t.v1), this.v2.copy(t.v2), this;
  }
  toJSON() {
    const t = super.toJSON();
    return t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t;
  }
  fromJSON(t) {
    return super.fromJSON(t), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this;
  }
}
class j_ extends an {
  constructor(t = new L(), e = new L()) {
    super(), this.isLineCurve3 = !0, this.type = "LineCurve3", this.v1 = t, this.v2 = e;
  }
  getPoint(t, e = new L()) {
    const n = e;
    return t === 1 ? n.copy(this.v2) : (n.copy(this.v2).sub(this.v1), n.multiplyScalar(t).add(this.v1)), n;
  }
  // Line curve is linear, so we can overwrite default getPointAt
  getPointAt(t, e) {
    return this.getPoint(t, e);
  }
  getTangent(t, e = new L()) {
    return e.subVectors(this.v2, this.v1).normalize();
  }
  getTangentAt(t, e) {
    return this.getTangent(t, e);
  }
  copy(t) {
    return super.copy(t), this.v1.copy(t.v1), this.v2.copy(t.v2), this;
  }
  toJSON() {
    const t = super.toJSON();
    return t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t;
  }
  fromJSON(t) {
    return super.fromJSON(t), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this;
  }
}
class Mh extends an {
  constructor(t = new et(), e = new et(), n = new et()) {
    super(), this.isQuadraticBezierCurve = !0, this.type = "QuadraticBezierCurve", this.v0 = t, this.v1 = e, this.v2 = n;
  }
  getPoint(t, e = new et()) {
    const n = e, s = this.v0, r = this.v1, a = this.v2;
    return n.set(
      gs(t, s.x, r.x, a.x),
      gs(t, s.y, r.y, a.y)
    ), n;
  }
  copy(t) {
    return super.copy(t), this.v0.copy(t.v0), this.v1.copy(t.v1), this.v2.copy(t.v2), this;
  }
  toJSON() {
    const t = super.toJSON();
    return t.v0 = this.v0.toArray(), t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t;
  }
  fromJSON(t) {
    return super.fromJSON(t), this.v0.fromArray(t.v0), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this;
  }
}
class bh extends an {
  constructor(t = new L(), e = new L(), n = new L()) {
    super(), this.isQuadraticBezierCurve3 = !0, this.type = "QuadraticBezierCurve3", this.v0 = t, this.v1 = e, this.v2 = n;
  }
  getPoint(t, e = new L()) {
    const n = e, s = this.v0, r = this.v1, a = this.v2;
    return n.set(
      gs(t, s.x, r.x, a.x),
      gs(t, s.y, r.y, a.y),
      gs(t, s.z, r.z, a.z)
    ), n;
  }
  copy(t) {
    return super.copy(t), this.v0.copy(t.v0), this.v1.copy(t.v1), this.v2.copy(t.v2), this;
  }
  toJSON() {
    const t = super.toJSON();
    return t.v0 = this.v0.toArray(), t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t;
  }
  fromJSON(t) {
    return super.fromJSON(t), this.v0.fromArray(t.v0), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this;
  }
}
class Sh extends an {
  constructor(t = []) {
    super(), this.isSplineCurve = !0, this.type = "SplineCurve", this.points = t;
  }
  getPoint(t, e = new et()) {
    const n = e, s = this.points, r = (s.length - 1) * t, a = Math.floor(r), o = r - a, l = s[a === 0 ? a : a - 1], c = s[a], h = s[a > s.length - 2 ? s.length - 1 : a + 1], u = s[a > s.length - 3 ? s.length - 1 : a + 2];
    return n.set(
      xc(o, l.x, c.x, h.x, u.x),
      xc(o, l.y, c.y, h.y, u.y)
    ), n;
  }
  copy(t) {
    super.copy(t), this.points = [];
    for (let e = 0, n = t.points.length; e < n; e++) {
      const s = t.points[e];
      this.points.push(s.clone());
    }
    return this;
  }
  toJSON() {
    const t = super.toJSON();
    t.points = [];
    for (let e = 0, n = this.points.length; e < n; e++) {
      const s = this.points[e];
      t.points.push(s.toArray());
    }
    return t;
  }
  fromJSON(t) {
    super.fromJSON(t), this.points = [];
    for (let e = 0, n = t.points.length; e < n; e++) {
      const s = t.points[e];
      this.points.push(new et().fromArray(s));
    }
    return this;
  }
}
var wr = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ArcCurve: z_,
  CatmullRomCurve3: vh,
  CubicBezierCurve: xh,
  CubicBezierCurve3: q_,
  EllipseCurve: ka,
  LineCurve: yh,
  LineCurve3: j_,
  QuadraticBezierCurve: Mh,
  QuadraticBezierCurve3: bh,
  SplineCurve: Sh
});
class Z_ extends an {
  constructor() {
    super(), this.type = "CurvePath", this.curves = [], this.autoClose = !1;
  }
  add(t) {
    this.curves.push(t);
  }
  closePath() {
    const t = this.curves[0].getPoint(0), e = this.curves[this.curves.length - 1].getPoint(1);
    if (!t.equals(e)) {
      const n = t.isVector2 === !0 ? "LineCurve" : "LineCurve3";
      this.curves.push(new wr[n](e, t));
    }
    return this;
  }
  // To get accurate point with reference to
  // entire path distance at time t,
  // following has to be done:
  // 1. Length of each sub path have to be known
  // 2. Locate and identify type of curve
  // 3. Get t for the curve
  // 4. Return curve.getPointAt(t')
  getPoint(t, e) {
    const n = t * this.getLength(), s = this.getCurveLengths();
    let r = 0;
    for (; r < s.length; ) {
      if (s[r] >= n) {
        const a = s[r] - n, o = this.curves[r], l = o.getLength(), c = l === 0 ? 0 : 1 - a / l;
        return o.getPointAt(c, e);
      }
      r++;
    }
    return null;
  }
  // We cannot use the default THREE.Curve getPoint() with getLength() because in
  // THREE.Curve, getLength() depends on getPoint() but in THREE.CurvePath
  // getPoint() depends on getLength
  getLength() {
    const t = this.getCurveLengths();
    return t[t.length - 1];
  }
  // cacheLengths must be recalculated.
  updateArcLengths() {
    this.needsUpdate = !0, this.cacheLengths = null, this.getCurveLengths();
  }
  // Compute lengths and cache them
  // We cannot overwrite getLengths() because UtoT mapping uses it.
  getCurveLengths() {
    if (this.cacheLengths && this.cacheLengths.length === this.curves.length)
      return this.cacheLengths;
    const t = [];
    let e = 0;
    for (let n = 0, s = this.curves.length; n < s; n++)
      e += this.curves[n].getLength(), t.push(e);
    return this.cacheLengths = t, t;
  }
  getSpacedPoints(t = 40) {
    const e = [];
    for (let n = 0; n <= t; n++)
      e.push(this.getPoint(n / t));
    return this.autoClose && e.push(e[0]), e;
  }
  getPoints(t = 12) {
    const e = [];
    let n;
    for (let s = 0, r = this.curves; s < r.length; s++) {
      const a = r[s], o = a.isEllipseCurve ? t * 2 : a.isLineCurve || a.isLineCurve3 ? 1 : a.isSplineCurve ? t * a.points.length : t, l = a.getPoints(o);
      for (let c = 0; c < l.length; c++) {
        const h = l[c];
        n && n.equals(h) || (e.push(h), n = h);
      }
    }
    return this.autoClose && e.length > 1 && !e[e.length - 1].equals(e[0]) && e.push(e[0]), e;
  }
  copy(t) {
    super.copy(t), this.curves = [];
    for (let e = 0, n = t.curves.length; e < n; e++) {
      const s = t.curves[e];
      this.curves.push(s.clone());
    }
    return this.autoClose = t.autoClose, this;
  }
  toJSON() {
    const t = super.toJSON();
    t.autoClose = this.autoClose, t.curves = [];
    for (let e = 0, n = this.curves.length; e < n; e++) {
      const s = this.curves[e];
      t.curves.push(s.toJSON());
    }
    return t;
  }
  fromJSON(t) {
    super.fromJSON(t), this.autoClose = t.autoClose, this.curves = [];
    for (let e = 0, n = t.curves.length; e < n; e++) {
      const s = t.curves[e];
      this.curves.push(new wr[s.type]().fromJSON(s));
    }
    return this;
  }
}
class yc extends Z_ {
  constructor(t) {
    super(), this.type = "Path", this.currentPoint = new et(), t && this.setFromPoints(t);
  }
  setFromPoints(t) {
    this.moveTo(t[0].x, t[0].y);
    for (let e = 1, n = t.length; e < n; e++)
      this.lineTo(t[e].x, t[e].y);
    return this;
  }
  moveTo(t, e) {
    return this.currentPoint.set(t, e), this;
  }
  lineTo(t, e) {
    const n = new yh(this.currentPoint.clone(), new et(t, e));
    return this.curves.push(n), this.currentPoint.set(t, e), this;
  }
  quadraticCurveTo(t, e, n, s) {
    const r = new Mh(
      this.currentPoint.clone(),
      new et(t, e),
      new et(n, s)
    );
    return this.curves.push(r), this.currentPoint.set(n, s), this;
  }
  bezierCurveTo(t, e, n, s, r, a) {
    const o = new xh(
      this.currentPoint.clone(),
      new et(t, e),
      new et(n, s),
      new et(r, a)
    );
    return this.curves.push(o), this.currentPoint.set(r, a), this;
  }
  splineThru(t) {
    const e = [this.currentPoint.clone()].concat(t), n = new Sh(e);
    return this.curves.push(n), this.currentPoint.copy(t[t.length - 1]), this;
  }
  arc(t, e, n, s, r, a) {
    const o = this.currentPoint.x, l = this.currentPoint.y;
    return this.absarc(
      t + o,
      e + l,
      n,
      s,
      r,
      a
    ), this;
  }
  absarc(t, e, n, s, r, a) {
    return this.absellipse(t, e, n, n, s, r, a), this;
  }
  ellipse(t, e, n, s, r, a, o, l) {
    const c = this.currentPoint.x, h = this.currentPoint.y;
    return this.absellipse(t + c, e + h, n, s, r, a, o, l), this;
  }
  absellipse(t, e, n, s, r, a, o, l) {
    const c = new ka(t, e, n, s, r, a, o, l);
    if (this.curves.length > 0) {
      const u = c.getPoint(0);
      u.equals(this.currentPoint) || this.lineTo(u.x, u.y);
    }
    this.curves.push(c);
    const h = c.getPoint(1);
    return this.currentPoint.copy(h), this;
  }
  copy(t) {
    return super.copy(t), this.currentPoint.copy(t.currentPoint), this;
  }
  toJSON() {
    const t = super.toJSON();
    return t.currentPoint = this.currentPoint.toArray(), t;
  }
  fromJSON(t) {
    return super.fromJSON(t), this.currentPoint.fromArray(t.currentPoint), this;
  }
}
class Le extends Ee {
  constructor(t = 1, e = 1, n = 1, s = 32, r = 1, a = !1, o = 0, l = Math.PI * 2) {
    super(), this.type = "CylinderGeometry", this.parameters = {
      radiusTop: t,
      radiusBottom: e,
      height: n,
      radialSegments: s,
      heightSegments: r,
      openEnded: a,
      thetaStart: o,
      thetaLength: l
    };
    const c = this;
    s = Math.floor(s), r = Math.floor(r);
    const h = [], u = [], d = [], p = [];
    let g = 0;
    const _ = [], f = n / 2;
    let m = 0;
    b(), a === !1 && (t > 0 && x(!0), e > 0 && x(!1)), this.setIndex(h), this.setAttribute("position", new Qt(u, 3)), this.setAttribute("normal", new Qt(d, 3)), this.setAttribute("uv", new Qt(p, 2));
    function b() {
      const v = new L(), w = new L();
      let A = 0;
      const C = (e - t) / n;
      for (let D = 0; D <= r; D++) {
        const S = [], M = D / r, P = M * (e - t) + t;
        for (let z = 0; z <= s; z++) {
          const O = z / s, F = O * l + o, W = Math.sin(F), H = Math.cos(F);
          w.x = P * W, w.y = -M * n + f, w.z = P * H, u.push(w.x, w.y, w.z), v.set(W, C, H).normalize(), d.push(v.x, v.y, v.z), p.push(O, 1 - M), S.push(g++);
        }
        _.push(S);
      }
      for (let D = 0; D < s; D++)
        for (let S = 0; S < r; S++) {
          const M = _[S][D], P = _[S + 1][D], z = _[S + 1][D + 1], O = _[S][D + 1];
          (t > 0 || S !== 0) && (h.push(M, P, O), A += 3), (e > 0 || S !== r - 1) && (h.push(P, z, O), A += 3);
        }
      c.addGroup(m, A, 0), m += A;
    }
    function x(v) {
      const w = g, A = new et(), C = new L();
      let D = 0;
      const S = v === !0 ? t : e, M = v === !0 ? 1 : -1;
      for (let z = 1; z <= s; z++)
        u.push(0, f * M, 0), d.push(0, M, 0), p.push(0.5, 0.5), g++;
      const P = g;
      for (let z = 0; z <= s; z++) {
        const F = z / s * l + o, W = Math.cos(F), H = Math.sin(F);
        C.x = S * H, C.y = f * M, C.z = S * W, u.push(C.x, C.y, C.z), d.push(0, M, 0), A.x = W * 0.5 + 0.5, A.y = H * 0.5 * M + 0.5, p.push(A.x, A.y), g++;
      }
      for (let z = 0; z < s; z++) {
        const O = w + z, F = P + z;
        v === !0 ? h.push(F, F + 1, O) : h.push(F + 1, F, O), D += 3;
      }
      c.addGroup(m, D, v === !0 ? 1 : 2), m += D;
    }
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new Le(t.radiusTop, t.radiusBottom, t.height, t.radialSegments, t.heightSegments, t.openEnded, t.thetaStart, t.thetaLength);
  }
}
class za extends Le {
  constructor(t = 1, e = 1, n = 32, s = 1, r = !1, a = 0, o = Math.PI * 2) {
    super(0, t, e, n, s, r, a, o), this.type = "ConeGeometry", this.parameters = {
      radius: t,
      height: e,
      radialSegments: n,
      heightSegments: s,
      openEnded: r,
      thetaStart: a,
      thetaLength: o
    };
  }
  static fromJSON(t) {
    return new za(t.radius, t.height, t.radialSegments, t.heightSegments, t.openEnded, t.thetaStart, t.thetaLength);
  }
}
class Dr extends yc {
  constructor(t) {
    super(t), this.uuid = fi(), this.type = "Shape", this.holes = [];
  }
  getPointsHoles(t) {
    const e = [];
    for (let n = 0, s = this.holes.length; n < s; n++)
      e[n] = this.holes[n].getPoints(t);
    return e;
  }
  // get points of shape and holes (keypoints based on segments parameter)
  extractPoints(t) {
    return {
      shape: this.getPoints(t),
      holes: this.getPointsHoles(t)
    };
  }
  copy(t) {
    super.copy(t), this.holes = [];
    for (let e = 0, n = t.holes.length; e < n; e++) {
      const s = t.holes[e];
      this.holes.push(s.clone());
    }
    return this;
  }
  toJSON() {
    const t = super.toJSON();
    t.uuid = this.uuid, t.holes = [];
    for (let e = 0, n = this.holes.length; e < n; e++) {
      const s = this.holes[e];
      t.holes.push(s.toJSON());
    }
    return t;
  }
  fromJSON(t) {
    super.fromJSON(t), this.uuid = t.uuid, this.holes = [];
    for (let e = 0, n = t.holes.length; e < n; e++) {
      const s = t.holes[e];
      this.holes.push(new yc().fromJSON(s));
    }
    return this;
  }
}
const K_ = {
  triangulate: function(i, t, e = 2) {
    const n = t && t.length, s = n ? t[0] * e : i.length;
    let r = Eh(i, 0, s, e, !0);
    const a = [];
    if (!r || r.next === r.prev) return a;
    let o, l, c, h, u, d, p;
    if (n && (r = n0(i, t, r, e)), i.length > 80 * e) {
      o = c = i[0], l = h = i[1];
      for (let g = e; g < s; g += e)
        u = i[g], d = i[g + 1], u < o && (o = u), d < l && (l = d), u > c && (c = u), d > h && (h = d);
      p = Math.max(c - o, h - l), p = p !== 0 ? 32767 / p : 0;
    }
    return Ts(r, a, e, o, l, p, 0), a;
  }
};
function Eh(i, t, e, n, s) {
  let r, a;
  if (s === f0(i, t, e, n) > 0)
    for (r = t; r < e; r += n) a = Mc(r, i[r], i[r + 1], a);
  else
    for (r = e - n; r >= t; r -= n) a = Mc(r, i[r], i[r + 1], a);
  return a && Ir(a, a.next) && (Cs(a), a = a.next), a;
}
function ci(i, t) {
  if (!i) return i;
  t || (t = i);
  let e = i, n;
  do
    if (n = !1, !e.steiner && (Ir(e, e.next) || me(e.prev, e, e.next) === 0)) {
      if (Cs(e), e = t = e.prev, e === e.next) break;
      n = !0;
    } else
      e = e.next;
  while (n || e !== t);
  return t;
}
function Ts(i, t, e, n, s, r, a) {
  if (!i) return;
  !a && r && a0(i, n, s, r);
  let o = i, l, c;
  for (; i.prev !== i.next; ) {
    if (l = i.prev, c = i.next, r ? Q_(i, n, s, r) : J_(i)) {
      t.push(l.i / e | 0), t.push(i.i / e | 0), t.push(c.i / e | 0), Cs(i), i = c.next, o = c.next;
      continue;
    }
    if (i = c, i === o) {
      a ? a === 1 ? (i = t0(ci(i), t, e), Ts(i, t, e, n, s, r, 2)) : a === 2 && e0(i, t, e, n, s, r) : Ts(ci(i), t, e, n, s, r, 1);
      break;
    }
  }
}
function J_(i) {
  const t = i.prev, e = i, n = i.next;
  if (me(t, e, n) >= 0) return !1;
  const s = t.x, r = e.x, a = n.x, o = t.y, l = e.y, c = n.y, h = s < r ? s < a ? s : a : r < a ? r : a, u = o < l ? o < c ? o : c : l < c ? l : c, d = s > r ? s > a ? s : a : r > a ? r : a, p = o > l ? o > c ? o : c : l > c ? l : c;
  let g = n.next;
  for (; g !== t; ) {
    if (g.x >= h && g.x <= d && g.y >= u && g.y <= p && Ui(s, o, r, l, a, c, g.x, g.y) && me(g.prev, g, g.next) >= 0) return !1;
    g = g.next;
  }
  return !0;
}
function Q_(i, t, e, n) {
  const s = i.prev, r = i, a = i.next;
  if (me(s, r, a) >= 0) return !1;
  const o = s.x, l = r.x, c = a.x, h = s.y, u = r.y, d = a.y, p = o < l ? o < c ? o : c : l < c ? l : c, g = h < u ? h < d ? h : d : u < d ? u : d, _ = o > l ? o > c ? o : c : l > c ? l : c, f = h > u ? h > d ? h : d : u > d ? u : d, m = da(p, g, t, e, n), b = da(_, f, t, e, n);
  let x = i.prevZ, v = i.nextZ;
  for (; x && x.z >= m && v && v.z <= b; ) {
    if (x.x >= p && x.x <= _ && x.y >= g && x.y <= f && x !== s && x !== a && Ui(o, h, l, u, c, d, x.x, x.y) && me(x.prev, x, x.next) >= 0 || (x = x.prevZ, v.x >= p && v.x <= _ && v.y >= g && v.y <= f && v !== s && v !== a && Ui(o, h, l, u, c, d, v.x, v.y) && me(v.prev, v, v.next) >= 0)) return !1;
    v = v.nextZ;
  }
  for (; x && x.z >= m; ) {
    if (x.x >= p && x.x <= _ && x.y >= g && x.y <= f && x !== s && x !== a && Ui(o, h, l, u, c, d, x.x, x.y) && me(x.prev, x, x.next) >= 0) return !1;
    x = x.prevZ;
  }
  for (; v && v.z <= b; ) {
    if (v.x >= p && v.x <= _ && v.y >= g && v.y <= f && v !== s && v !== a && Ui(o, h, l, u, c, d, v.x, v.y) && me(v.prev, v, v.next) >= 0) return !1;
    v = v.nextZ;
  }
  return !0;
}
function t0(i, t, e) {
  let n = i;
  do {
    const s = n.prev, r = n.next.next;
    !Ir(s, r) && wh(s, n, n.next, r) && As(s, r) && As(r, s) && (t.push(s.i / e | 0), t.push(n.i / e | 0), t.push(r.i / e | 0), Cs(n), Cs(n.next), n = i = r), n = n.next;
  } while (n !== i);
  return ci(n);
}
function e0(i, t, e, n, s, r) {
  let a = i;
  do {
    let o = a.next.next;
    for (; o !== a.prev; ) {
      if (a.i !== o.i && h0(a, o)) {
        let l = Th(a, o);
        a = ci(a, a.next), l = ci(l, l.next), Ts(a, t, e, n, s, r, 0), Ts(l, t, e, n, s, r, 0);
        return;
      }
      o = o.next;
    }
    a = a.next;
  } while (a !== i);
}
function n0(i, t, e, n) {
  const s = [];
  let r, a, o, l, c;
  for (r = 0, a = t.length; r < a; r++)
    o = t[r] * n, l = r < a - 1 ? t[r + 1] * n : i.length, c = Eh(i, o, l, n, !1), c === c.next && (c.steiner = !0), s.push(c0(c));
  for (s.sort(i0), r = 0; r < s.length; r++)
    e = s0(s[r], e);
  return e;
}
function i0(i, t) {
  return i.x - t.x;
}
function s0(i, t) {
  const e = r0(i, t);
  if (!e)
    return t;
  const n = Th(e, i);
  return ci(n, n.next), ci(e, e.next);
}
function r0(i, t) {
  let e = t, n = -1 / 0, s;
  const r = i.x, a = i.y;
  do {
    if (a <= e.y && a >= e.next.y && e.next.y !== e.y) {
      const d = e.x + (a - e.y) * (e.next.x - e.x) / (e.next.y - e.y);
      if (d <= r && d > n && (n = d, s = e.x < e.next.x ? e : e.next, d === r))
        return s;
    }
    e = e.next;
  } while (e !== t);
  if (!s) return null;
  const o = s, l = s.x, c = s.y;
  let h = 1 / 0, u;
  e = s;
  do
    r >= e.x && e.x >= l && r !== e.x && Ui(a < c ? r : n, a, l, c, a < c ? n : r, a, e.x, e.y) && (u = Math.abs(a - e.y) / (r - e.x), As(e, i) && (u < h || u === h && (e.x > s.x || e.x === s.x && o0(s, e))) && (s = e, h = u)), e = e.next;
  while (e !== o);
  return s;
}
function o0(i, t) {
  return me(i.prev, i, t.prev) < 0 && me(t.next, i, i.next) < 0;
}
function a0(i, t, e, n) {
  let s = i;
  do
    s.z === 0 && (s.z = da(s.x, s.y, t, e, n)), s.prevZ = s.prev, s.nextZ = s.next, s = s.next;
  while (s !== i);
  s.prevZ.nextZ = null, s.prevZ = null, l0(s);
}
function l0(i) {
  let t, e, n, s, r, a, o, l, c = 1;
  do {
    for (e = i, i = null, r = null, a = 0; e; ) {
      for (a++, n = e, o = 0, t = 0; t < c && (o++, n = n.nextZ, !!n); t++)
        ;
      for (l = c; o > 0 || l > 0 && n; )
        o !== 0 && (l === 0 || !n || e.z <= n.z) ? (s = e, e = e.nextZ, o--) : (s = n, n = n.nextZ, l--), r ? r.nextZ = s : i = s, s.prevZ = r, r = s;
      e = n;
    }
    r.nextZ = null, c *= 2;
  } while (a > 1);
  return i;
}
function da(i, t, e, n, s) {
  return i = (i - e) * s | 0, t = (t - n) * s | 0, i = (i | i << 8) & 16711935, i = (i | i << 4) & 252645135, i = (i | i << 2) & 858993459, i = (i | i << 1) & 1431655765, t = (t | t << 8) & 16711935, t = (t | t << 4) & 252645135, t = (t | t << 2) & 858993459, t = (t | t << 1) & 1431655765, i | t << 1;
}
function c0(i) {
  let t = i, e = i;
  do
    (t.x < e.x || t.x === e.x && t.y < e.y) && (e = t), t = t.next;
  while (t !== i);
  return e;
}
function Ui(i, t, e, n, s, r, a, o) {
  return (s - a) * (t - o) >= (i - a) * (r - o) && (i - a) * (n - o) >= (e - a) * (t - o) && (e - a) * (r - o) >= (s - a) * (n - o);
}
function h0(i, t) {
  return i.next.i !== t.i && i.prev.i !== t.i && !u0(i, t) && // dones't intersect other edges
  (As(i, t) && As(t, i) && d0(i, t) && // locally visible
  (me(i.prev, i, t.prev) || me(i, t.prev, t)) || // does not create opposite-facing sectors
  Ir(i, t) && me(i.prev, i, i.next) > 0 && me(t.prev, t, t.next) > 0);
}
function me(i, t, e) {
  return (t.y - i.y) * (e.x - t.x) - (t.x - i.x) * (e.y - t.y);
}
function Ir(i, t) {
  return i.x === t.x && i.y === t.y;
}
function wh(i, t, e, n) {
  const s = ar(me(i, t, e)), r = ar(me(i, t, n)), a = ar(me(e, n, i)), o = ar(me(e, n, t));
  return !!(s !== r && a !== o || s === 0 && or(i, e, t) || r === 0 && or(i, n, t) || a === 0 && or(e, i, n) || o === 0 && or(e, t, n));
}
function or(i, t, e) {
  return t.x <= Math.max(i.x, e.x) && t.x >= Math.min(i.x, e.x) && t.y <= Math.max(i.y, e.y) && t.y >= Math.min(i.y, e.y);
}
function ar(i) {
  return i > 0 ? 1 : i < 0 ? -1 : 0;
}
function u0(i, t) {
  let e = i;
  do {
    if (e.i !== i.i && e.next.i !== i.i && e.i !== t.i && e.next.i !== t.i && wh(e, e.next, i, t)) return !0;
    e = e.next;
  } while (e !== i);
  return !1;
}
function As(i, t) {
  return me(i.prev, i, i.next) < 0 ? me(i, t, i.next) >= 0 && me(i, i.prev, t) >= 0 : me(i, t, i.prev) < 0 || me(i, i.next, t) < 0;
}
function d0(i, t) {
  let e = i, n = !1;
  const s = (i.x + t.x) / 2, r = (i.y + t.y) / 2;
  do
    e.y > r != e.next.y > r && e.next.y !== e.y && s < (e.next.x - e.x) * (r - e.y) / (e.next.y - e.y) + e.x && (n = !n), e = e.next;
  while (e !== i);
  return n;
}
function Th(i, t) {
  const e = new fa(i.i, i.x, i.y), n = new fa(t.i, t.x, t.y), s = i.next, r = t.prev;
  return i.next = t, t.prev = i, e.next = s, s.prev = e, n.next = e, e.prev = n, r.next = n, n.prev = r, n;
}
function Mc(i, t, e, n) {
  const s = new fa(i, t, e);
  return n ? (s.next = n.next, s.prev = n, n.next.prev = s, n.next = s) : (s.prev = s, s.next = s), s;
}
function Cs(i) {
  i.next.prev = i.prev, i.prev.next = i.next, i.prevZ && (i.prevZ.nextZ = i.nextZ), i.nextZ && (i.nextZ.prevZ = i.prevZ);
}
function fa(i, t, e) {
  this.i = i, this.x = t, this.y = e, this.prev = null, this.next = null, this.z = 0, this.prevZ = null, this.nextZ = null, this.steiner = !1;
}
function f0(i, t, e, n) {
  let s = 0;
  for (let r = t, a = e - n; r < e; r += n)
    s += (i[a] - i[r]) * (i[r + 1] + i[a + 1]), a = r;
  return s;
}
class On {
  // calculate area of the contour polygon
  static area(t) {
    const e = t.length;
    let n = 0;
    for (let s = e - 1, r = 0; r < e; s = r++)
      n += t[s].x * t[r].y - t[r].x * t[s].y;
    return n * 0.5;
  }
  static isClockWise(t) {
    return On.area(t) < 0;
  }
  static triangulateShape(t, e) {
    const n = [], s = [], r = [];
    bc(t), Sc(n, t);
    let a = t.length;
    e.forEach(bc);
    for (let l = 0; l < e.length; l++)
      s.push(a), a += e[l].length, Sc(n, e[l]);
    const o = K_.triangulate(n, s);
    for (let l = 0; l < o.length; l += 3)
      r.push(o.slice(l, l + 3));
    return r;
  }
}
function bc(i) {
  const t = i.length;
  t > 2 && i[t - 1].equals(i[0]) && i.pop();
}
function Sc(i, t) {
  for (let e = 0; e < t.length; e++)
    i.push(t[e].x), i.push(t[e].y);
}
class Ha extends Ee {
  constructor(t = new Dr([new et(0.5, 0.5), new et(-0.5, 0.5), new et(-0.5, -0.5), new et(0.5, -0.5)]), e = {}) {
    super(), this.type = "ExtrudeGeometry", this.parameters = {
      shapes: t,
      options: e
    }, t = Array.isArray(t) ? t : [t];
    const n = this, s = [], r = [];
    for (let o = 0, l = t.length; o < l; o++) {
      const c = t[o];
      a(c);
    }
    this.setAttribute("position", new Qt(s, 3)), this.setAttribute("uv", new Qt(r, 2)), this.computeVertexNormals();
    function a(o) {
      const l = [], c = e.curveSegments !== void 0 ? e.curveSegments : 12, h = e.steps !== void 0 ? e.steps : 1, u = e.depth !== void 0 ? e.depth : 1;
      let d = e.bevelEnabled !== void 0 ? e.bevelEnabled : !0, p = e.bevelThickness !== void 0 ? e.bevelThickness : 0.2, g = e.bevelSize !== void 0 ? e.bevelSize : p - 0.1, _ = e.bevelOffset !== void 0 ? e.bevelOffset : 0, f = e.bevelSegments !== void 0 ? e.bevelSegments : 3;
      const m = e.extrudePath, b = e.UVGenerator !== void 0 ? e.UVGenerator : p0;
      let x, v = !1, w, A, C, D;
      m && (x = m.getSpacedPoints(h), v = !0, d = !1, w = m.computeFrenetFrames(h, !1), A = new L(), C = new L(), D = new L()), d || (f = 0, p = 0, g = 0, _ = 0);
      const S = o.extractPoints(c);
      let M = S.shape;
      const P = S.holes;
      if (!On.isClockWise(M)) {
        M = M.reverse();
        for (let Z = 0, rt = P.length; Z < rt; Z++) {
          const R = P[Z];
          On.isClockWise(R) && (P[Z] = R.reverse());
        }
      }
      const O = On.triangulateShape(M, P), F = M;
      for (let Z = 0, rt = P.length; Z < rt; Z++) {
        const R = P[Z];
        M = M.concat(R);
      }
      function W(Z, rt, R) {
        return rt || console.error("THREE.ExtrudeGeometry: vec does not exist"), Z.clone().addScaledVector(rt, R);
      }
      const H = M.length, J = O.length;
      function k(Z, rt, R) {
        let Ct, Q, vt;
        const lt = Z.x - rt.x, It = Z.y - rt.y, gt = R.x - Z.x, T = R.y - Z.y, y = lt * lt + It * It, B = lt * T - It * gt;
        if (Math.abs(B) > Number.EPSILON) {
          const X = Math.sqrt(y), K = Math.sqrt(gt * gt + T * T), q = rt.x - It / X, Et = rt.y + lt / X, ut = R.x - T / K, _t = R.y + gt / K, Xt = ((ut - q) * T - (_t - Et) * gt) / (lt * T - It * gt);
          Ct = q + lt * Xt - Z.x, Q = Et + It * Xt - Z.y;
          const it = Ct * Ct + Q * Q;
          if (it <= 2)
            return new et(Ct, Q);
          vt = Math.sqrt(it / 2);
        } else {
          let X = !1;
          lt > Number.EPSILON ? gt > Number.EPSILON && (X = !0) : lt < -Number.EPSILON ? gt < -Number.EPSILON && (X = !0) : Math.sign(It) === Math.sign(T) && (X = !0), X ? (Ct = -It, Q = lt, vt = Math.sqrt(y)) : (Ct = lt, Q = It, vt = Math.sqrt(y / 2));
        }
        return new et(Ct / vt, Q / vt);
      }
      const tt = [];
      for (let Z = 0, rt = F.length, R = rt - 1, Ct = Z + 1; Z < rt; Z++, R++, Ct++)
        R === rt && (R = 0), Ct === rt && (Ct = 0), tt[Z] = k(F[Z], F[R], F[Ct]);
      const nt = [];
      let ht, Pt = tt.concat();
      for (let Z = 0, rt = P.length; Z < rt; Z++) {
        const R = P[Z];
        ht = [];
        for (let Ct = 0, Q = R.length, vt = Q - 1, lt = Ct + 1; Ct < Q; Ct++, vt++, lt++)
          vt === Q && (vt = 0), lt === Q && (lt = 0), ht[Ct] = k(R[Ct], R[vt], R[lt]);
        nt.push(ht), Pt = Pt.concat(ht);
      }
      for (let Z = 0; Z < f; Z++) {
        const rt = Z / f, R = p * Math.cos(rt * Math.PI / 2), Ct = g * Math.sin(rt * Math.PI / 2) + _;
        for (let Q = 0, vt = F.length; Q < vt; Q++) {
          const lt = W(F[Q], tt[Q], Ct);
          at(lt.x, lt.y, -R);
        }
        for (let Q = 0, vt = P.length; Q < vt; Q++) {
          const lt = P[Q];
          ht = nt[Q];
          for (let It = 0, gt = lt.length; It < gt; It++) {
            const T = W(lt[It], ht[It], Ct);
            at(T.x, T.y, -R);
          }
        }
      }
      const Yt = g + _;
      for (let Z = 0; Z < H; Z++) {
        const rt = d ? W(M[Z], Pt[Z], Yt) : M[Z];
        v ? (C.copy(w.normals[0]).multiplyScalar(rt.x), A.copy(w.binormals[0]).multiplyScalar(rt.y), D.copy(x[0]).add(C).add(A), at(D.x, D.y, D.z)) : at(rt.x, rt.y, 0);
      }
      for (let Z = 1; Z <= h; Z++)
        for (let rt = 0; rt < H; rt++) {
          const R = d ? W(M[rt], Pt[rt], Yt) : M[rt];
          v ? (C.copy(w.normals[Z]).multiplyScalar(R.x), A.copy(w.binormals[Z]).multiplyScalar(R.y), D.copy(x[Z]).add(C).add(A), at(D.x, D.y, D.z)) : at(R.x, R.y, u / h * Z);
        }
      for (let Z = f - 1; Z >= 0; Z--) {
        const rt = Z / f, R = p * Math.cos(rt * Math.PI / 2), Ct = g * Math.sin(rt * Math.PI / 2) + _;
        for (let Q = 0, vt = F.length; Q < vt; Q++) {
          const lt = W(F[Q], tt[Q], Ct);
          at(lt.x, lt.y, u + R);
        }
        for (let Q = 0, vt = P.length; Q < vt; Q++) {
          const lt = P[Q];
          ht = nt[Q];
          for (let It = 0, gt = lt.length; It < gt; It++) {
            const T = W(lt[It], ht[It], Ct);
            v ? at(T.x, T.y + x[h - 1].y, x[h - 1].x + R) : at(T.x, T.y, u + R);
          }
        }
      }
      Y(), st();
      function Y() {
        const Z = s.length / 3;
        if (d) {
          let rt = 0, R = H * rt;
          for (let Ct = 0; Ct < J; Ct++) {
            const Q = O[Ct];
            Dt(Q[2] + R, Q[1] + R, Q[0] + R);
          }
          rt = h + f * 2, R = H * rt;
          for (let Ct = 0; Ct < J; Ct++) {
            const Q = O[Ct];
            Dt(Q[0] + R, Q[1] + R, Q[2] + R);
          }
        } else {
          for (let rt = 0; rt < J; rt++) {
            const R = O[rt];
            Dt(R[2], R[1], R[0]);
          }
          for (let rt = 0; rt < J; rt++) {
            const R = O[rt];
            Dt(R[0] + H * h, R[1] + H * h, R[2] + H * h);
          }
        }
        n.addGroup(Z, s.length / 3 - Z, 0);
      }
      function st() {
        const Z = s.length / 3;
        let rt = 0;
        bt(F, rt), rt += F.length;
        for (let R = 0, Ct = P.length; R < Ct; R++) {
          const Q = P[R];
          bt(Q, rt), rt += Q.length;
        }
        n.addGroup(Z, s.length / 3 - Z, 1);
      }
      function bt(Z, rt) {
        let R = Z.length;
        for (; --R >= 0; ) {
          const Ct = R;
          let Q = R - 1;
          Q < 0 && (Q = Z.length - 1);
          for (let vt = 0, lt = h + f * 2; vt < lt; vt++) {
            const It = H * vt, gt = H * (vt + 1), T = rt + Ct + It, y = rt + Q + It, B = rt + Q + gt, X = rt + Ct + gt;
            Ft(T, y, B, X);
          }
        }
      }
      function at(Z, rt, R) {
        l.push(Z), l.push(rt), l.push(R);
      }
      function Dt(Z, rt, R) {
        Nt(Z), Nt(rt), Nt(R);
        const Ct = s.length / 3, Q = b.generateTopUV(n, s, Ct - 3, Ct - 2, Ct - 1);
        Zt(Q[0]), Zt(Q[1]), Zt(Q[2]);
      }
      function Ft(Z, rt, R, Ct) {
        Nt(Z), Nt(rt), Nt(Ct), Nt(rt), Nt(R), Nt(Ct);
        const Q = s.length / 3, vt = b.generateSideWallUV(n, s, Q - 6, Q - 3, Q - 2, Q - 1);
        Zt(vt[0]), Zt(vt[1]), Zt(vt[3]), Zt(vt[1]), Zt(vt[2]), Zt(vt[3]);
      }
      function Nt(Z) {
        s.push(l[Z * 3 + 0]), s.push(l[Z * 3 + 1]), s.push(l[Z * 3 + 2]);
      }
      function Zt(Z) {
        r.push(Z.x), r.push(Z.y);
      }
    }
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  toJSON() {
    const t = super.toJSON(), e = this.parameters.shapes, n = this.parameters.options;
    return m0(e, n, t);
  }
  static fromJSON(t, e) {
    const n = [];
    for (let r = 0, a = t.shapes.length; r < a; r++) {
      const o = e[t.shapes[r]];
      n.push(o);
    }
    const s = t.options.extrudePath;
    return s !== void 0 && (t.options.extrudePath = new wr[s.type]().fromJSON(s)), new Ha(n, t.options);
  }
}
const p0 = {
  generateTopUV: function(i, t, e, n, s) {
    const r = t[e * 3], a = t[e * 3 + 1], o = t[n * 3], l = t[n * 3 + 1], c = t[s * 3], h = t[s * 3 + 1];
    return [
      new et(r, a),
      new et(o, l),
      new et(c, h)
    ];
  },
  generateSideWallUV: function(i, t, e, n, s, r) {
    const a = t[e * 3], o = t[e * 3 + 1], l = t[e * 3 + 2], c = t[n * 3], h = t[n * 3 + 1], u = t[n * 3 + 2], d = t[s * 3], p = t[s * 3 + 1], g = t[s * 3 + 2], _ = t[r * 3], f = t[r * 3 + 1], m = t[r * 3 + 2];
    return Math.abs(o - h) < Math.abs(a - c) ? [
      new et(a, 1 - l),
      new et(c, 1 - u),
      new et(d, 1 - g),
      new et(_, 1 - m)
    ] : [
      new et(o, 1 - l),
      new et(h, 1 - u),
      new et(p, 1 - g),
      new et(f, 1 - m)
    ];
  }
};
function m0(i, t, e) {
  if (e.shapes = [], Array.isArray(i))
    for (let n = 0, s = i.length; n < s; n++) {
      const r = i[n];
      e.shapes.push(r.uuid);
    }
  else
    e.shapes.push(i.uuid);
  return e.options = Object.assign({}, t), t.extrudePath !== void 0 && (e.options.extrudePath = t.extrudePath.toJSON()), e;
}
class Va extends Ee {
  constructor(t = 0.5, e = 1, n = 32, s = 1, r = 0, a = Math.PI * 2) {
    super(), this.type = "RingGeometry", this.parameters = {
      innerRadius: t,
      outerRadius: e,
      thetaSegments: n,
      phiSegments: s,
      thetaStart: r,
      thetaLength: a
    }, n = Math.max(3, n), s = Math.max(1, s);
    const o = [], l = [], c = [], h = [];
    let u = t;
    const d = (e - t) / s, p = new L(), g = new et();
    for (let _ = 0; _ <= s; _++) {
      for (let f = 0; f <= n; f++) {
        const m = r + f / n * a;
        p.x = u * Math.cos(m), p.y = u * Math.sin(m), l.push(p.x, p.y, p.z), c.push(0, 0, 1), g.x = (p.x / e + 1) / 2, g.y = (p.y / e + 1) / 2, h.push(g.x, g.y);
      }
      u += d;
    }
    for (let _ = 0; _ < s; _++) {
      const f = _ * (n + 1);
      for (let m = 0; m < n; m++) {
        const b = m + f, x = b, v = b + n + 1, w = b + n + 2, A = b + 1;
        o.push(x, v, A), o.push(v, w, A);
      }
    }
    this.setIndex(o), this.setAttribute("position", new Qt(l, 3)), this.setAttribute("normal", new Qt(c, 3)), this.setAttribute("uv", new Qt(h, 2));
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new Va(t.innerRadius, t.outerRadius, t.thetaSegments, t.phiSegments, t.thetaStart, t.thetaLength);
  }
}
class Ga extends Ee {
  constructor(t = new Dr([new et(0, 0.5), new et(-0.5, -0.5), new et(0.5, -0.5)]), e = 12) {
    super(), this.type = "ShapeGeometry", this.parameters = {
      shapes: t,
      curveSegments: e
    };
    const n = [], s = [], r = [], a = [];
    let o = 0, l = 0;
    if (Array.isArray(t) === !1)
      c(t);
    else
      for (let h = 0; h < t.length; h++)
        c(t[h]), this.addGroup(o, l, h), o += l, l = 0;
    this.setIndex(n), this.setAttribute("position", new Qt(s, 3)), this.setAttribute("normal", new Qt(r, 3)), this.setAttribute("uv", new Qt(a, 2));
    function c(h) {
      const u = s.length / 3, d = h.extractPoints(e);
      let p = d.shape;
      const g = d.holes;
      On.isClockWise(p) === !1 && (p = p.reverse());
      for (let f = 0, m = g.length; f < m; f++) {
        const b = g[f];
        On.isClockWise(b) === !0 && (g[f] = b.reverse());
      }
      const _ = On.triangulateShape(p, g);
      for (let f = 0, m = g.length; f < m; f++) {
        const b = g[f];
        p = p.concat(b);
      }
      for (let f = 0, m = p.length; f < m; f++) {
        const b = p[f];
        s.push(b.x, b.y, 0), r.push(0, 0, 1), a.push(b.x, b.y);
      }
      for (let f = 0, m = _.length; f < m; f++) {
        const b = _[f], x = b[0] + u, v = b[1] + u, w = b[2] + u;
        n.push(x, v, w), l += 3;
      }
    }
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  toJSON() {
    const t = super.toJSON(), e = this.parameters.shapes;
    return g0(e, t);
  }
  static fromJSON(t, e) {
    const n = [];
    for (let s = 0, r = t.shapes.length; s < r; s++) {
      const a = e[t.shapes[s]];
      n.push(a);
    }
    return new Ga(n, t.curveSegments);
  }
}
function g0(i, t) {
  if (t.shapes = [], Array.isArray(i))
    for (let e = 0, n = i.length; e < n; e++) {
      const s = i[e];
      t.shapes.push(s.uuid);
    }
  else
    t.shapes.push(i.uuid);
  return t;
}
class tn extends Ee {
  constructor(t = 1, e = 32, n = 16, s = 0, r = Math.PI * 2, a = 0, o = Math.PI) {
    super(), this.type = "SphereGeometry", this.parameters = {
      radius: t,
      widthSegments: e,
      heightSegments: n,
      phiStart: s,
      phiLength: r,
      thetaStart: a,
      thetaLength: o
    }, e = Math.max(3, Math.floor(e)), n = Math.max(2, Math.floor(n));
    const l = Math.min(a + o, Math.PI);
    let c = 0;
    const h = [], u = new L(), d = new L(), p = [], g = [], _ = [], f = [];
    for (let m = 0; m <= n; m++) {
      const b = [], x = m / n;
      let v = 0;
      m === 0 && a === 0 ? v = 0.5 / e : m === n && l === Math.PI && (v = -0.5 / e);
      for (let w = 0; w <= e; w++) {
        const A = w / e;
        u.x = -t * Math.cos(s + A * r) * Math.sin(a + x * o), u.y = t * Math.cos(a + x * o), u.z = t * Math.sin(s + A * r) * Math.sin(a + x * o), g.push(u.x, u.y, u.z), d.copy(u).normalize(), _.push(d.x, d.y, d.z), f.push(A + v, 1 - x), b.push(c++);
      }
      h.push(b);
    }
    for (let m = 0; m < n; m++)
      for (let b = 0; b < e; b++) {
        const x = h[m][b + 1], v = h[m][b], w = h[m + 1][b], A = h[m + 1][b + 1];
        (m !== 0 || a > 0) && p.push(x, v, A), (m !== n - 1 || l < Math.PI) && p.push(v, w, A);
      }
    this.setIndex(p), this.setAttribute("position", new Qt(g, 3)), this.setAttribute("normal", new Qt(_, 3)), this.setAttribute("uv", new Qt(f, 2));
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new tn(t.radius, t.widthSegments, t.heightSegments, t.phiStart, t.phiLength, t.thetaStart, t.thetaLength);
  }
}
class $a extends Ee {
  constructor(t = 1, e = 0.4, n = 12, s = 48, r = Math.PI * 2) {
    super(), this.type = "TorusGeometry", this.parameters = {
      radius: t,
      tube: e,
      radialSegments: n,
      tubularSegments: s,
      arc: r
    }, n = Math.floor(n), s = Math.floor(s);
    const a = [], o = [], l = [], c = [], h = new L(), u = new L(), d = new L();
    for (let p = 0; p <= n; p++)
      for (let g = 0; g <= s; g++) {
        const _ = g / s * r, f = p / n * Math.PI * 2;
        u.x = (t + e * Math.cos(f)) * Math.cos(_), u.y = (t + e * Math.cos(f)) * Math.sin(_), u.z = e * Math.sin(f), o.push(u.x, u.y, u.z), h.x = t * Math.cos(_), h.y = t * Math.sin(_), d.subVectors(u, h).normalize(), l.push(d.x, d.y, d.z), c.push(g / s), c.push(p / n);
      }
    for (let p = 1; p <= n; p++)
      for (let g = 1; g <= s; g++) {
        const _ = (s + 1) * p + g - 1, f = (s + 1) * (p - 1) + g - 1, m = (s + 1) * (p - 1) + g, b = (s + 1) * p + g;
        a.push(_, f, b), a.push(f, m, b);
      }
    this.setIndex(a), this.setAttribute("position", new Qt(o, 3)), this.setAttribute("normal", new Qt(l, 3)), this.setAttribute("uv", new Qt(c, 2));
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new $a(t.radius, t.tube, t.radialSegments, t.tubularSegments, t.arc);
  }
}
class Ni extends Ee {
  constructor(t = new bh(new L(-1, -1, 0), new L(-1, 1, 0), new L(1, 1, 0)), e = 64, n = 1, s = 8, r = !1) {
    super(), this.type = "TubeGeometry", this.parameters = {
      path: t,
      tubularSegments: e,
      radius: n,
      radialSegments: s,
      closed: r
    };
    const a = t.computeFrenetFrames(e, r);
    this.tangents = a.tangents, this.normals = a.normals, this.binormals = a.binormals;
    const o = new L(), l = new L(), c = new et();
    let h = new L();
    const u = [], d = [], p = [], g = [];
    _(), this.setIndex(g), this.setAttribute("position", new Qt(u, 3)), this.setAttribute("normal", new Qt(d, 3)), this.setAttribute("uv", new Qt(p, 2));
    function _() {
      for (let x = 0; x < e; x++)
        f(x);
      f(r === !1 ? e : 0), b(), m();
    }
    function f(x) {
      h = t.getPointAt(x / e, h);
      const v = a.normals[x], w = a.binormals[x];
      for (let A = 0; A <= s; A++) {
        const C = A / s * Math.PI * 2, D = Math.sin(C), S = -Math.cos(C);
        l.x = S * v.x + D * w.x, l.y = S * v.y + D * w.y, l.z = S * v.z + D * w.z, l.normalize(), d.push(l.x, l.y, l.z), o.x = h.x + n * l.x, o.y = h.y + n * l.y, o.z = h.z + n * l.z, u.push(o.x, o.y, o.z);
      }
    }
    function m() {
      for (let x = 1; x <= e; x++)
        for (let v = 1; v <= s; v++) {
          const w = (s + 1) * (x - 1) + (v - 1), A = (s + 1) * x + (v - 1), C = (s + 1) * x + v, D = (s + 1) * (x - 1) + v;
          g.push(w, A, D), g.push(A, C, D);
        }
    }
    function b() {
      for (let x = 0; x <= e; x++)
        for (let v = 0; v <= s; v++)
          c.x = x / e, c.y = v / s, p.push(c.x, c.y);
    }
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  toJSON() {
    const t = super.toJSON();
    return t.path = this.parameters.path.toJSON(), t;
  }
  static fromJSON(t) {
    return new Ni(
      new wr[t.path.type]().fromJSON(t.path),
      t.tubularSegments,
      t.radius,
      t.radialSegments,
      t.closed
    );
  }
}
class De extends ji {
  static get type() {
    return "MeshStandardMaterial";
  }
  constructor(t) {
    super(), this.isMeshStandardMaterial = !0, this.defines = { STANDARD: "" }, this.color = new Wt(16777215), this.roughness = 1, this.metalness = 0, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new Wt(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = eh, this.normalScale = new et(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.roughnessMap = null, this.metalnessMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new on(), this.envMapIntensity = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = !1, this.fog = !0, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.defines = { STANDARD: "" }, this.color.copy(t.color), this.roughness = t.roughness, this.metalness = t.metalness, this.map = t.map, this.lightMap = t.lightMap, this.lightMapIntensity = t.lightMapIntensity, this.aoMap = t.aoMap, this.aoMapIntensity = t.aoMapIntensity, this.emissive.copy(t.emissive), this.emissiveMap = t.emissiveMap, this.emissiveIntensity = t.emissiveIntensity, this.bumpMap = t.bumpMap, this.bumpScale = t.bumpScale, this.normalMap = t.normalMap, this.normalMapType = t.normalMapType, this.normalScale.copy(t.normalScale), this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this.roughnessMap = t.roughnessMap, this.metalnessMap = t.metalnessMap, this.alphaMap = t.alphaMap, this.envMap = t.envMap, this.envMapRotation.copy(t.envMapRotation), this.envMapIntensity = t.envMapIntensity, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.wireframeLinecap = t.wireframeLinecap, this.wireframeLinejoin = t.wireframeLinejoin, this.flatShading = t.flatShading, this.fog = t.fog, this;
  }
}
class Wa extends Ce {
  constructor(t, e = 1) {
    super(), this.isLight = !0, this.type = "Light", this.color = new Wt(t), this.intensity = e;
  }
  dispose() {
  }
  copy(t, e) {
    return super.copy(t, e), this.color.copy(t.color), this.intensity = t.intensity, this;
  }
  toJSON(t) {
    const e = super.toJSON(t);
    return e.object.color = this.color.getHex(), e.object.intensity = this.intensity, this.groundColor !== void 0 && (e.object.groundColor = this.groundColor.getHex()), this.distance !== void 0 && (e.object.distance = this.distance), this.angle !== void 0 && (e.object.angle = this.angle), this.decay !== void 0 && (e.object.decay = this.decay), this.penumbra !== void 0 && (e.object.penumbra = this.penumbra), this.shadow !== void 0 && (e.object.shadow = this.shadow.toJSON()), this.target !== void 0 && (e.object.target = this.target.uuid), e;
  }
}
class _0 extends Wa {
  constructor(t, e, n) {
    super(t, n), this.isHemisphereLight = !0, this.type = "HemisphereLight", this.position.copy(Ce.DEFAULT_UP), this.updateMatrix(), this.groundColor = new Wt(e);
  }
  copy(t, e) {
    return super.copy(t, e), this.groundColor.copy(t.groundColor), this;
  }
}
const xo = /* @__PURE__ */ new ue(), Ec = /* @__PURE__ */ new L(), wc = /* @__PURE__ */ new L();
class v0 {
  constructor(t) {
    this.camera = t, this.intensity = 1, this.bias = 0, this.normalBias = 0, this.radius = 1, this.blurSamples = 8, this.mapSize = new et(512, 512), this.map = null, this.mapPass = null, this.matrix = new ue(), this.autoUpdate = !0, this.needsUpdate = !1, this._frustum = new Na(), this._frameExtents = new et(1, 1), this._viewportCount = 1, this._viewports = [
      new oe(0, 0, 1, 1)
    ];
  }
  getViewportCount() {
    return this._viewportCount;
  }
  getFrustum() {
    return this._frustum;
  }
  updateMatrices(t) {
    const e = this.camera, n = this.matrix;
    Ec.setFromMatrixPosition(t.matrixWorld), e.position.copy(Ec), wc.setFromMatrixPosition(t.target.matrixWorld), e.lookAt(wc), e.updateMatrixWorld(), xo.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse), this._frustum.setFromProjectionMatrix(xo), n.set(
      0.5,
      0,
      0,
      0.5,
      0,
      0.5,
      0,
      0.5,
      0,
      0,
      0.5,
      0.5,
      0,
      0,
      0,
      1
    ), n.multiply(xo);
  }
  getViewport(t) {
    return this._viewports[t];
  }
  getFrameExtents() {
    return this._frameExtents;
  }
  dispose() {
    this.map && this.map.dispose(), this.mapPass && this.mapPass.dispose();
  }
  copy(t) {
    return this.camera = t.camera.clone(), this.intensity = t.intensity, this.bias = t.bias, this.radius = t.radius, this.mapSize.copy(t.mapSize), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  toJSON() {
    const t = {};
    return this.intensity !== 1 && (t.intensity = this.intensity), this.bias !== 0 && (t.bias = this.bias), this.normalBias !== 0 && (t.normalBias = this.normalBias), this.radius !== 1 && (t.radius = this.radius), (this.mapSize.x !== 512 || this.mapSize.y !== 512) && (t.mapSize = this.mapSize.toArray()), t.camera = this.camera.toJSON(!1).object, delete t.camera.matrix, t;
  }
}
const Tc = /* @__PURE__ */ new ue(), as = /* @__PURE__ */ new L(), yo = /* @__PURE__ */ new L();
class x0 extends v0 {
  constructor() {
    super(new ze(90, 1, 0.5, 500)), this.isPointLightShadow = !0, this._frameExtents = new et(4, 2), this._viewportCount = 6, this._viewports = [
      // These viewports map a cube-map onto a 2D texture with the
      // following orientation:
      //
      //  xzXZ
      //   y Y
      //
      // X - Positive x direction
      // x - Negative x direction
      // Y - Positive y direction
      // y - Negative y direction
      // Z - Positive z direction
      // z - Negative z direction
      // positive X
      new oe(2, 1, 1, 1),
      // negative X
      new oe(0, 1, 1, 1),
      // positive Z
      new oe(3, 1, 1, 1),
      // negative Z
      new oe(1, 1, 1, 1),
      // positive Y
      new oe(3, 0, 1, 1),
      // negative Y
      new oe(1, 0, 1, 1)
    ], this._cubeDirections = [
      new L(1, 0, 0),
      new L(-1, 0, 0),
      new L(0, 0, 1),
      new L(0, 0, -1),
      new L(0, 1, 0),
      new L(0, -1, 0)
    ], this._cubeUps = [
      new L(0, 1, 0),
      new L(0, 1, 0),
      new L(0, 1, 0),
      new L(0, 1, 0),
      new L(0, 0, 1),
      new L(0, 0, -1)
    ];
  }
  updateMatrices(t, e = 0) {
    const n = this.camera, s = this.matrix, r = t.distance || n.far;
    r !== n.far && (n.far = r, n.updateProjectionMatrix()), as.setFromMatrixPosition(t.matrixWorld), n.position.copy(as), yo.copy(n.position), yo.add(this._cubeDirections[e]), n.up.copy(this._cubeUps[e]), n.lookAt(yo), n.updateMatrixWorld(), s.makeTranslation(-as.x, -as.y, -as.z), Tc.multiplyMatrices(n.projectionMatrix, n.matrixWorldInverse), this._frustum.setFromProjectionMatrix(Tc);
  }
}
class Mo extends Wa {
  constructor(t, e, n = 0, s = 2) {
    super(t, e), this.isPointLight = !0, this.type = "PointLight", this.distance = n, this.decay = s, this.shadow = new x0();
  }
  get power() {
    return this.intensity * 4 * Math.PI;
  }
  set power(t) {
    this.intensity = t / (4 * Math.PI);
  }
  dispose() {
    this.shadow.dispose();
  }
  copy(t, e) {
    return super.copy(t, e), this.distance = t.distance, this.decay = t.decay, this.shadow = t.shadow.clone(), this;
  }
}
class y0 extends Wa {
  constructor(t, e) {
    super(t, e), this.isAmbientLight = !0, this.type = "AmbientLight";
  }
}
const Ac = /* @__PURE__ */ new ue();
class M0 {
  constructor(t, e, n = 0, s = 1 / 0) {
    this.ray = new Pr(t, e), this.near = n, this.far = s, this.camera = null, this.layers = new Ua(), this.params = {
      Mesh: {},
      Line: { threshold: 1 },
      LOD: {},
      Points: { threshold: 1 },
      Sprite: {}
    };
  }
  set(t, e) {
    this.ray.set(t, e);
  }
  setFromCamera(t, e) {
    e.isPerspectiveCamera ? (this.ray.origin.setFromMatrixPosition(e.matrixWorld), this.ray.direction.set(t.x, t.y, 0.5).unproject(e).sub(this.ray.origin).normalize(), this.camera = e) : e.isOrthographicCamera ? (this.ray.origin.set(t.x, t.y, (e.near + e.far) / (e.near - e.far)).unproject(e), this.ray.direction.set(0, 0, -1).transformDirection(e.matrixWorld), this.camera = e) : console.error("THREE.Raycaster: Unsupported camera type: " + e.type);
  }
  setFromXRController(t) {
    return Ac.identity().extractRotation(t.matrixWorld), this.ray.origin.setFromMatrixPosition(t.matrixWorld), this.ray.direction.set(0, 0, -1).applyMatrix4(Ac), this;
  }
  intersectObject(t, e = !0, n = []) {
    return pa(t, this, n, e), n.sort(Cc), n;
  }
  intersectObjects(t, e = !0, n = []) {
    for (let s = 0, r = t.length; s < r; s++)
      pa(t[s], this, n, e);
    return n.sort(Cc), n;
  }
}
function Cc(i, t) {
  return i.distance - t.distance;
}
function pa(i, t, e, n) {
  let s = !0;
  if (i.layers.test(t.layers) && i.raycast(t, e) === !1 && (s = !1), s === !0 && n === !0) {
    const r = i.children;
    for (let a = 0, o = r.length; a < o; a++)
      pa(r[a], t, e, !0);
  }
}
class Rc {
  constructor(t = 1, e = 0, n = 0) {
    return this.radius = t, this.phi = e, this.theta = n, this;
  }
  set(t, e, n) {
    return this.radius = t, this.phi = e, this.theta = n, this;
  }
  copy(t) {
    return this.radius = t.radius, this.phi = t.phi, this.theta = t.theta, this;
  }
  // restrict phi to be between EPS and PI-EPS
  makeSafe() {
    return this.phi = Math.max(1e-6, Math.min(Math.PI - 1e-6, this.phi)), this;
  }
  setFromVector3(t) {
    return this.setFromCartesianCoords(t.x, t.y, t.z);
  }
  setFromCartesianCoords(t, e, n) {
    return this.radius = Math.sqrt(t * t + e * e + n * n), this.radius === 0 ? (this.theta = 0, this.phi = 0) : (this.theta = Math.atan2(t, n), this.phi = Math.acos(Se(e / this.radius, -1, 1))), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
class b0 extends ua {
  constructor(t = 10, e = 10, n = 4473924, s = 8947848) {
    n = new Wt(n), s = new Wt(s);
    const r = e / 2, a = t / e, o = t / 2, l = [], c = [];
    for (let d = 0, p = 0, g = -o; d <= e; d++, g += a) {
      l.push(-o, 0, g, o, 0, g), l.push(g, 0, -o, g, 0, o);
      const _ = d === r ? n : s;
      _.toArray(c, p), p += 3, _.toArray(c, p), p += 3, _.toArray(c, p), p += 3, _.toArray(c, p), p += 3;
    }
    const h = new Ee();
    h.setAttribute("position", new Qt(l, 3)), h.setAttribute("color", new Qt(c, 3));
    const u = new Fa({ vertexColors: !0, toneMapped: !1 });
    super(h, u), this.type = "GridHelper";
  }
  dispose() {
    this.geometry.dispose(), this.material.dispose();
  }
}
class S0 extends di {
  constructor(t, e = null) {
    super(), this.object = t, this.domElement = e, this.enabled = !0, this.state = -1, this.keys = {}, this.mouseButtons = { LEFT: null, MIDDLE: null, RIGHT: null }, this.touches = { ONE: null, TWO: null };
  }
  connect() {
  }
  disconnect() {
  }
  dispose() {
  }
  update() {
  }
}
typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", { detail: {
  revision: wa
} }));
typeof window < "u" && (window.__THREE__ ? console.warn("WARNING: Multiple instances of Three.js being imported.") : window.__THREE__ = wa);
const Pc = { type: "change" }, Xa = { type: "start" }, Ah = { type: "end" }, lr = new Pr(), Lc = new Rn(), E0 = Math.cos(70 * Ia.DEG2RAD), xe = new L(), Ue = 2 * Math.PI, re = {
  NONE: -1,
  ROTATE: 0,
  DOLLY: 1,
  PAN: 2,
  TOUCH_ROTATE: 3,
  TOUCH_PAN: 4,
  TOUCH_DOLLY_PAN: 5,
  TOUCH_DOLLY_ROTATE: 6
}, bo = 1e-6;
class w0 extends S0 {
  constructor(t, e = null) {
    super(t, e), this.state = re.NONE, this.enabled = !0, this.target = new L(), this.cursor = new L(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: Oi.ROTATE, MIDDLE: Oi.DOLLY, RIGHT: Oi.PAN }, this.touches = { ONE: Di.ROTATE, TWO: Di.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this._lastPosition = new L(), this._lastQuaternion = new li(), this._lastTargetPosition = new L(), this._quat = new li().setFromUnitVectors(t.up, new L(0, 1, 0)), this._quatInverse = this._quat.clone().invert(), this._spherical = new Rc(), this._sphericalDelta = new Rc(), this._scale = 1, this._panOffset = new L(), this._rotateStart = new et(), this._rotateEnd = new et(), this._rotateDelta = new et(), this._panStart = new et(), this._panEnd = new et(), this._panDelta = new et(), this._dollyStart = new et(), this._dollyEnd = new et(), this._dollyDelta = new et(), this._dollyDirection = new L(), this._mouse = new et(), this._performCursorZoom = !1, this._pointers = [], this._pointerPositions = {}, this._controlActive = !1, this._onPointerMove = A0.bind(this), this._onPointerDown = T0.bind(this), this._onPointerUp = C0.bind(this), this._onContextMenu = N0.bind(this), this._onMouseWheel = L0.bind(this), this._onKeyDown = D0.bind(this), this._onTouchStart = I0.bind(this), this._onTouchMove = U0.bind(this), this._onMouseDown = R0.bind(this), this._onMouseMove = P0.bind(this), this._interceptControlDown = O0.bind(this), this._interceptControlUp = F0.bind(this), this.domElement !== null && this.connect(), this.update();
  }
  connect() {
    this.domElement.addEventListener("pointerdown", this._onPointerDown), this.domElement.addEventListener("pointercancel", this._onPointerUp), this.domElement.addEventListener("contextmenu", this._onContextMenu), this.domElement.addEventListener("wheel", this._onMouseWheel, { passive: !1 }), this.domElement.getRootNode().addEventListener("keydown", this._interceptControlDown, { passive: !0, capture: !0 }), this.domElement.style.touchAction = "none";
  }
  disconnect() {
    this.domElement.removeEventListener("pointerdown", this._onPointerDown), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.domElement.removeEventListener("pointerup", this._onPointerUp), this.domElement.removeEventListener("pointercancel", this._onPointerUp), this.domElement.removeEventListener("wheel", this._onMouseWheel), this.domElement.removeEventListener("contextmenu", this._onContextMenu), this.stopListenToKeyEvents(), this.domElement.getRootNode().removeEventListener("keydown", this._interceptControlDown, { capture: !0 }), this.domElement.style.touchAction = "auto";
  }
  dispose() {
    this.disconnect();
  }
  getPolarAngle() {
    return this._spherical.phi;
  }
  getAzimuthalAngle() {
    return this._spherical.theta;
  }
  getDistance() {
    return this.object.position.distanceTo(this.target);
  }
  listenToKeyEvents(t) {
    t.addEventListener("keydown", this._onKeyDown), this._domElementKeyEvents = t;
  }
  stopListenToKeyEvents() {
    this._domElementKeyEvents !== null && (this._domElementKeyEvents.removeEventListener("keydown", this._onKeyDown), this._domElementKeyEvents = null);
  }
  saveState() {
    this.target0.copy(this.target), this.position0.copy(this.object.position), this.zoom0 = this.object.zoom;
  }
  reset() {
    this.target.copy(this.target0), this.object.position.copy(this.position0), this.object.zoom = this.zoom0, this.object.updateProjectionMatrix(), this.dispatchEvent(Pc), this.update(), this.state = re.NONE;
  }
  update(t = null) {
    const e = this.object.position;
    xe.copy(e).sub(this.target), xe.applyQuaternion(this._quat), this._spherical.setFromVector3(xe), this.autoRotate && this.state === re.NONE && this._rotateLeft(this._getAutoRotationAngle(t)), this.enableDamping ? (this._spherical.theta += this._sphericalDelta.theta * this.dampingFactor, this._spherical.phi += this._sphericalDelta.phi * this.dampingFactor) : (this._spherical.theta += this._sphericalDelta.theta, this._spherical.phi += this._sphericalDelta.phi);
    let n = this.minAzimuthAngle, s = this.maxAzimuthAngle;
    isFinite(n) && isFinite(s) && (n < -Math.PI ? n += Ue : n > Math.PI && (n -= Ue), s < -Math.PI ? s += Ue : s > Math.PI && (s -= Ue), n <= s ? this._spherical.theta = Math.max(n, Math.min(s, this._spherical.theta)) : this._spherical.theta = this._spherical.theta > (n + s) / 2 ? Math.max(n, this._spherical.theta) : Math.min(s, this._spherical.theta)), this._spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this._spherical.phi)), this._spherical.makeSafe(), this.enableDamping === !0 ? this.target.addScaledVector(this._panOffset, this.dampingFactor) : this.target.add(this._panOffset), this.target.sub(this.cursor), this.target.clampLength(this.minTargetRadius, this.maxTargetRadius), this.target.add(this.cursor);
    let r = !1;
    if (this.zoomToCursor && this._performCursorZoom || this.object.isOrthographicCamera)
      this._spherical.radius = this._clampDistance(this._spherical.radius);
    else {
      const a = this._spherical.radius;
      this._spherical.radius = this._clampDistance(this._spherical.radius * this._scale), r = a != this._spherical.radius;
    }
    if (xe.setFromSpherical(this._spherical), xe.applyQuaternion(this._quatInverse), e.copy(this.target).add(xe), this.object.lookAt(this.target), this.enableDamping === !0 ? (this._sphericalDelta.theta *= 1 - this.dampingFactor, this._sphericalDelta.phi *= 1 - this.dampingFactor, this._panOffset.multiplyScalar(1 - this.dampingFactor)) : (this._sphericalDelta.set(0, 0, 0), this._panOffset.set(0, 0, 0)), this.zoomToCursor && this._performCursorZoom) {
      let a = null;
      if (this.object.isPerspectiveCamera) {
        const o = xe.length();
        a = this._clampDistance(o * this._scale);
        const l = o - a;
        this.object.position.addScaledVector(this._dollyDirection, l), this.object.updateMatrixWorld(), r = !!l;
      } else if (this.object.isOrthographicCamera) {
        const o = new L(this._mouse.x, this._mouse.y, 0);
        o.unproject(this.object);
        const l = this.object.zoom;
        this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), this.object.updateProjectionMatrix(), r = l !== this.object.zoom;
        const c = new L(this._mouse.x, this._mouse.y, 0);
        c.unproject(this.object), this.object.position.sub(c).add(o), this.object.updateMatrixWorld(), a = xe.length();
      } else
        console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), this.zoomToCursor = !1;
      a !== null && (this.screenSpacePanning ? this.target.set(0, 0, -1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position) : (lr.origin.copy(this.object.position), lr.direction.set(0, 0, -1).transformDirection(this.object.matrix), Math.abs(this.object.up.dot(lr.direction)) < E0 ? this.object.lookAt(this.target) : (Lc.setFromNormalAndCoplanarPoint(this.object.up, this.target), lr.intersectPlane(Lc, this.target))));
    } else if (this.object.isOrthographicCamera) {
      const a = this.object.zoom;
      this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), a !== this.object.zoom && (this.object.updateProjectionMatrix(), r = !0);
    }
    return this._scale = 1, this._performCursorZoom = !1, r || this._lastPosition.distanceToSquared(this.object.position) > bo || 8 * (1 - this._lastQuaternion.dot(this.object.quaternion)) > bo || this._lastTargetPosition.distanceToSquared(this.target) > bo ? (this.dispatchEvent(Pc), this._lastPosition.copy(this.object.position), this._lastQuaternion.copy(this.object.quaternion), this._lastTargetPosition.copy(this.target), !0) : !1;
  }
  _getAutoRotationAngle(t) {
    return t !== null ? Ue / 60 * this.autoRotateSpeed * t : Ue / 60 / 60 * this.autoRotateSpeed;
  }
  _getZoomScale(t) {
    const e = Math.abs(t * 0.01);
    return Math.pow(0.95, this.zoomSpeed * e);
  }
  _rotateLeft(t) {
    this._sphericalDelta.theta -= t;
  }
  _rotateUp(t) {
    this._sphericalDelta.phi -= t;
  }
  _panLeft(t, e) {
    xe.setFromMatrixColumn(e, 0), xe.multiplyScalar(-t), this._panOffset.add(xe);
  }
  _panUp(t, e) {
    this.screenSpacePanning === !0 ? xe.setFromMatrixColumn(e, 1) : (xe.setFromMatrixColumn(e, 0), xe.crossVectors(this.object.up, xe)), xe.multiplyScalar(t), this._panOffset.add(xe);
  }
  // deltaX and deltaY are in pixels; right and down are positive
  _pan(t, e) {
    const n = this.domElement;
    if (this.object.isPerspectiveCamera) {
      const s = this.object.position;
      xe.copy(s).sub(this.target);
      let r = xe.length();
      r *= Math.tan(this.object.fov / 2 * Math.PI / 180), this._panLeft(2 * t * r / n.clientHeight, this.object.matrix), this._panUp(2 * e * r / n.clientHeight, this.object.matrix);
    } else this.object.isOrthographicCamera ? (this._panLeft(t * (this.object.right - this.object.left) / this.object.zoom / n.clientWidth, this.object.matrix), this._panUp(e * (this.object.top - this.object.bottom) / this.object.zoom / n.clientHeight, this.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), this.enablePan = !1);
  }
  _dollyOut(t) {
    this.object.isPerspectiveCamera || this.object.isOrthographicCamera ? this._scale /= t : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), this.enableZoom = !1);
  }
  _dollyIn(t) {
    this.object.isPerspectiveCamera || this.object.isOrthographicCamera ? this._scale *= t : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), this.enableZoom = !1);
  }
  _updateZoomParameters(t, e) {
    if (!this.zoomToCursor)
      return;
    this._performCursorZoom = !0;
    const n = this.domElement.getBoundingClientRect(), s = t - n.left, r = e - n.top, a = n.width, o = n.height;
    this._mouse.x = s / a * 2 - 1, this._mouse.y = -(r / o) * 2 + 1, this._dollyDirection.set(this._mouse.x, this._mouse.y, 1).unproject(this.object).sub(this.object.position).normalize();
  }
  _clampDistance(t) {
    return Math.max(this.minDistance, Math.min(this.maxDistance, t));
  }
  //
  // event callbacks - update the object state
  //
  _handleMouseDownRotate(t) {
    this._rotateStart.set(t.clientX, t.clientY);
  }
  _handleMouseDownDolly(t) {
    this._updateZoomParameters(t.clientX, t.clientX), this._dollyStart.set(t.clientX, t.clientY);
  }
  _handleMouseDownPan(t) {
    this._panStart.set(t.clientX, t.clientY);
  }
  _handleMouseMoveRotate(t) {
    this._rotateEnd.set(t.clientX, t.clientY), this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
    const e = this.domElement;
    this._rotateLeft(Ue * this._rotateDelta.x / e.clientHeight), this._rotateUp(Ue * this._rotateDelta.y / e.clientHeight), this._rotateStart.copy(this._rotateEnd), this.update();
  }
  _handleMouseMoveDolly(t) {
    this._dollyEnd.set(t.clientX, t.clientY), this._dollyDelta.subVectors(this._dollyEnd, this._dollyStart), this._dollyDelta.y > 0 ? this._dollyOut(this._getZoomScale(this._dollyDelta.y)) : this._dollyDelta.y < 0 && this._dollyIn(this._getZoomScale(this._dollyDelta.y)), this._dollyStart.copy(this._dollyEnd), this.update();
  }
  _handleMouseMovePan(t) {
    this._panEnd.set(t.clientX, t.clientY), this._panDelta.subVectors(this._panEnd, this._panStart).multiplyScalar(this.panSpeed), this._pan(this._panDelta.x, this._panDelta.y), this._panStart.copy(this._panEnd), this.update();
  }
  _handleMouseWheel(t) {
    this._updateZoomParameters(t.clientX, t.clientY), t.deltaY < 0 ? this._dollyIn(this._getZoomScale(t.deltaY)) : t.deltaY > 0 && this._dollyOut(this._getZoomScale(t.deltaY)), this.update();
  }
  _handleKeyDown(t) {
    let e = !1;
    switch (t.code) {
      case this.keys.UP:
        t.ctrlKey || t.metaKey || t.shiftKey ? this._rotateUp(Ue * this.rotateSpeed / this.domElement.clientHeight) : this._pan(0, this.keyPanSpeed), e = !0;
        break;
      case this.keys.BOTTOM:
        t.ctrlKey || t.metaKey || t.shiftKey ? this._rotateUp(-Ue * this.rotateSpeed / this.domElement.clientHeight) : this._pan(0, -this.keyPanSpeed), e = !0;
        break;
      case this.keys.LEFT:
        t.ctrlKey || t.metaKey || t.shiftKey ? this._rotateLeft(Ue * this.rotateSpeed / this.domElement.clientHeight) : this._pan(this.keyPanSpeed, 0), e = !0;
        break;
      case this.keys.RIGHT:
        t.ctrlKey || t.metaKey || t.shiftKey ? this._rotateLeft(-Ue * this.rotateSpeed / this.domElement.clientHeight) : this._pan(-this.keyPanSpeed, 0), e = !0;
        break;
    }
    e && (t.preventDefault(), this.update());
  }
  _handleTouchStartRotate(t) {
    if (this._pointers.length === 1)
      this._rotateStart.set(t.pageX, t.pageY);
    else {
      const e = this._getSecondPointerPosition(t), n = 0.5 * (t.pageX + e.x), s = 0.5 * (t.pageY + e.y);
      this._rotateStart.set(n, s);
    }
  }
  _handleTouchStartPan(t) {
    if (this._pointers.length === 1)
      this._panStart.set(t.pageX, t.pageY);
    else {
      const e = this._getSecondPointerPosition(t), n = 0.5 * (t.pageX + e.x), s = 0.5 * (t.pageY + e.y);
      this._panStart.set(n, s);
    }
  }
  _handleTouchStartDolly(t) {
    const e = this._getSecondPointerPosition(t), n = t.pageX - e.x, s = t.pageY - e.y, r = Math.sqrt(n * n + s * s);
    this._dollyStart.set(0, r);
  }
  _handleTouchStartDollyPan(t) {
    this.enableZoom && this._handleTouchStartDolly(t), this.enablePan && this._handleTouchStartPan(t);
  }
  _handleTouchStartDollyRotate(t) {
    this.enableZoom && this._handleTouchStartDolly(t), this.enableRotate && this._handleTouchStartRotate(t);
  }
  _handleTouchMoveRotate(t) {
    if (this._pointers.length == 1)
      this._rotateEnd.set(t.pageX, t.pageY);
    else {
      const n = this._getSecondPointerPosition(t), s = 0.5 * (t.pageX + n.x), r = 0.5 * (t.pageY + n.y);
      this._rotateEnd.set(s, r);
    }
    this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
    const e = this.domElement;
    this._rotateLeft(Ue * this._rotateDelta.x / e.clientHeight), this._rotateUp(Ue * this._rotateDelta.y / e.clientHeight), this._rotateStart.copy(this._rotateEnd);
  }
  _handleTouchMovePan(t) {
    if (this._pointers.length === 1)
      this._panEnd.set(t.pageX, t.pageY);
    else {
      const e = this._getSecondPointerPosition(t), n = 0.5 * (t.pageX + e.x), s = 0.5 * (t.pageY + e.y);
      this._panEnd.set(n, s);
    }
    this._panDelta.subVectors(this._panEnd, this._panStart).multiplyScalar(this.panSpeed), this._pan(this._panDelta.x, this._panDelta.y), this._panStart.copy(this._panEnd);
  }
  _handleTouchMoveDolly(t) {
    const e = this._getSecondPointerPosition(t), n = t.pageX - e.x, s = t.pageY - e.y, r = Math.sqrt(n * n + s * s);
    this._dollyEnd.set(0, r), this._dollyDelta.set(0, Math.pow(this._dollyEnd.y / this._dollyStart.y, this.zoomSpeed)), this._dollyOut(this._dollyDelta.y), this._dollyStart.copy(this._dollyEnd);
    const a = (t.pageX + e.x) * 0.5, o = (t.pageY + e.y) * 0.5;
    this._updateZoomParameters(a, o);
  }
  _handleTouchMoveDollyPan(t) {
    this.enableZoom && this._handleTouchMoveDolly(t), this.enablePan && this._handleTouchMovePan(t);
  }
  _handleTouchMoveDollyRotate(t) {
    this.enableZoom && this._handleTouchMoveDolly(t), this.enableRotate && this._handleTouchMoveRotate(t);
  }
  // pointers
  _addPointer(t) {
    this._pointers.push(t.pointerId);
  }
  _removePointer(t) {
    delete this._pointerPositions[t.pointerId];
    for (let e = 0; e < this._pointers.length; e++)
      if (this._pointers[e] == t.pointerId) {
        this._pointers.splice(e, 1);
        return;
      }
  }
  _isTrackingPointer(t) {
    for (let e = 0; e < this._pointers.length; e++)
      if (this._pointers[e] == t.pointerId) return !0;
    return !1;
  }
  _trackPointer(t) {
    let e = this._pointerPositions[t.pointerId];
    e === void 0 && (e = new et(), this._pointerPositions[t.pointerId] = e), e.set(t.pageX, t.pageY);
  }
  _getSecondPointerPosition(t) {
    const e = t.pointerId === this._pointers[0] ? this._pointers[1] : this._pointers[0];
    return this._pointerPositions[e];
  }
  //
  _customWheelEvent(t) {
    const e = t.deltaMode, n = {
      clientX: t.clientX,
      clientY: t.clientY,
      deltaY: t.deltaY
    };
    switch (e) {
      case 1:
        n.deltaY *= 16;
        break;
      case 2:
        n.deltaY *= 100;
        break;
    }
    return t.ctrlKey && !this._controlActive && (n.deltaY *= 10), n;
  }
}
function T0(i) {
  this.enabled !== !1 && (this._pointers.length === 0 && (this.domElement.setPointerCapture(i.pointerId), this.domElement.addEventListener("pointermove", this._onPointerMove), this.domElement.addEventListener("pointerup", this._onPointerUp)), !this._isTrackingPointer(i) && (this._addPointer(i), i.pointerType === "touch" ? this._onTouchStart(i) : this._onMouseDown(i)));
}
function A0(i) {
  this.enabled !== !1 && (i.pointerType === "touch" ? this._onTouchMove(i) : this._onMouseMove(i));
}
function C0(i) {
  switch (this._removePointer(i), this._pointers.length) {
    case 0:
      this.domElement.releasePointerCapture(i.pointerId), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.domElement.removeEventListener("pointerup", this._onPointerUp), this.dispatchEvent(Ah), this.state = re.NONE;
      break;
    case 1:
      const t = this._pointers[0], e = this._pointerPositions[t];
      this._onTouchStart({ pointerId: t, pageX: e.x, pageY: e.y });
      break;
  }
}
function R0(i) {
  let t;
  switch (i.button) {
    case 0:
      t = this.mouseButtons.LEFT;
      break;
    case 1:
      t = this.mouseButtons.MIDDLE;
      break;
    case 2:
      t = this.mouseButtons.RIGHT;
      break;
    default:
      t = -1;
  }
  switch (t) {
    case Oi.DOLLY:
      if (this.enableZoom === !1) return;
      this._handleMouseDownDolly(i), this.state = re.DOLLY;
      break;
    case Oi.ROTATE:
      if (i.ctrlKey || i.metaKey || i.shiftKey) {
        if (this.enablePan === !1) return;
        this._handleMouseDownPan(i), this.state = re.PAN;
      } else {
        if (this.enableRotate === !1) return;
        this._handleMouseDownRotate(i), this.state = re.ROTATE;
      }
      break;
    case Oi.PAN:
      if (i.ctrlKey || i.metaKey || i.shiftKey) {
        if (this.enableRotate === !1) return;
        this._handleMouseDownRotate(i), this.state = re.ROTATE;
      } else {
        if (this.enablePan === !1) return;
        this._handleMouseDownPan(i), this.state = re.PAN;
      }
      break;
    default:
      this.state = re.NONE;
  }
  this.state !== re.NONE && this.dispatchEvent(Xa);
}
function P0(i) {
  switch (this.state) {
    case re.ROTATE:
      if (this.enableRotate === !1) return;
      this._handleMouseMoveRotate(i);
      break;
    case re.DOLLY:
      if (this.enableZoom === !1) return;
      this._handleMouseMoveDolly(i);
      break;
    case re.PAN:
      if (this.enablePan === !1) return;
      this._handleMouseMovePan(i);
      break;
  }
}
function L0(i) {
  this.enabled === !1 || this.enableZoom === !1 || this.state !== re.NONE || (i.preventDefault(), this.dispatchEvent(Xa), this._handleMouseWheel(this._customWheelEvent(i)), this.dispatchEvent(Ah));
}
function D0(i) {
  this.enabled === !1 || this.enablePan === !1 || this._handleKeyDown(i);
}
function I0(i) {
  switch (this._trackPointer(i), this._pointers.length) {
    case 1:
      switch (this.touches.ONE) {
        case Di.ROTATE:
          if (this.enableRotate === !1) return;
          this._handleTouchStartRotate(i), this.state = re.TOUCH_ROTATE;
          break;
        case Di.PAN:
          if (this.enablePan === !1) return;
          this._handleTouchStartPan(i), this.state = re.TOUCH_PAN;
          break;
        default:
          this.state = re.NONE;
      }
      break;
    case 2:
      switch (this.touches.TWO) {
        case Di.DOLLY_PAN:
          if (this.enableZoom === !1 && this.enablePan === !1) return;
          this._handleTouchStartDollyPan(i), this.state = re.TOUCH_DOLLY_PAN;
          break;
        case Di.DOLLY_ROTATE:
          if (this.enableZoom === !1 && this.enableRotate === !1) return;
          this._handleTouchStartDollyRotate(i), this.state = re.TOUCH_DOLLY_ROTATE;
          break;
        default:
          this.state = re.NONE;
      }
      break;
    default:
      this.state = re.NONE;
  }
  this.state !== re.NONE && this.dispatchEvent(Xa);
}
function U0(i) {
  switch (this._trackPointer(i), this.state) {
    case re.TOUCH_ROTATE:
      if (this.enableRotate === !1) return;
      this._handleTouchMoveRotate(i), this.update();
      break;
    case re.TOUCH_PAN:
      if (this.enablePan === !1) return;
      this._handleTouchMovePan(i), this.update();
      break;
    case re.TOUCH_DOLLY_PAN:
      if (this.enableZoom === !1 && this.enablePan === !1) return;
      this._handleTouchMoveDollyPan(i), this.update();
      break;
    case re.TOUCH_DOLLY_ROTATE:
      if (this.enableZoom === !1 && this.enableRotate === !1) return;
      this._handleTouchMoveDollyRotate(i), this.update();
      break;
    default:
      this.state = re.NONE;
  }
}
function N0(i) {
  this.enabled !== !1 && i.preventDefault();
}
function O0(i) {
  i.key === "Control" && (this._controlActive = !0, this.domElement.getRootNode().addEventListener("keyup", this._interceptControlUp, { passive: !0, capture: !0 }));
}
function F0(i) {
  i.key === "Control" && (this._controlActive = !1, this.domElement.getRootNode().removeEventListener("keyup", this._interceptControlUp, { passive: !0, capture: !0 }));
}
function So(i, t) {
  if (!i) return t;
  const e = i.trim().replace(/^#/, ""), n = Number.parseInt(e, 16);
  return Number.isNaN(n) ? t : n;
}
function k0(i) {
  const [t, e, n] = i.size, [s, r, a] = i.position, o = new vn();
  o.position.set(s, a, r), i.rotation_deg && (o.rotation.y = Ia.degToRad(-i.rotation_deg));
  const l = So(i.color, 3884116), c = new De({ color: l, roughness: 0.84 }), h = new De({ color: 4674921, roughness: 0.88 });
  if (i.kind === "couch" || i.kind === "couch_l" || i.kind === "couch_u") {
    const d = n * 0.44, p = n * 0.6, g = Math.min(0.24, e * 0.25), _ = new Mt(new ie(t, d, e), c);
    _.position.set(0, -n / 2 + d / 2, 0), o.add(_);
    const f = new Mt(new ie(t, p, g), h);
    f.position.set(0, -n / 2 + d + p * 0.28, e / 2 - g / 2), o.add(f);
    const m = Math.min(0.18, t * 0.08), b = n * 0.62;
    if (i.kind === "couch") {
      const x = new Mt(new ie(m, b, e), c);
      x.position.set(-t / 2 + m / 2, -n / 2 + b / 2, 0);
      const v = new Mt(new ie(m, b, e), c);
      v.position.set(t / 2 - m / 2, -n / 2 + b / 2, 0), o.add(x, v);
    }
    if (i.kind === "couch_l") {
      const x = Math.min(t * 0.65, Math.max(0.65, i.wing_width_m ?? 0.95)), v = Math.max(0.6, i.wing_depth_m ?? 1.15), w = i.l_side === "right", A = w ? t / 2 - x / 2 : -t / 2 + x / 2, C = -e / 2 - v / 2, D = new Mt(new ie(x, d, v), c);
      D.position.set(A, -n / 2 + d / 2, C), o.add(D);
      const S = w ? t / 2 - g / 2 : -t / 2 + g / 2, M = new Mt(new ie(g, p, v), h);
      M.position.set(S, -n / 2 + d + p * 0.28, C), o.add(M);
    }
    if (i.kind === "couch_u") {
      const x = Math.min(t * 0.4, Math.max(0.6, i.wing_width_m ?? 0.9)), v = Math.max(0.6, i.wing_depth_m ?? 1.15), w = -e / 2 - v / 2, A = new Mt(new ie(x, d, v), c);
      A.position.set(-t / 2 + x / 2, -n / 2 + d / 2, w);
      const C = new Mt(new ie(x, d, v), c);
      C.position.set(t / 2 - x / 2, -n / 2 + d / 2, w);
      const D = new Mt(new ie(g, p, v), h);
      D.position.set(-t / 2 + g / 2, -n / 2 + d + p * 0.28, w);
      const S = new Mt(new ie(g, p, v), h);
      S.position.set(t / 2 - g / 2, -n / 2 + d + p * 0.28, w), o.add(A, C, D, S);
    }
    return o;
  }
  if (i.kind === "wardrobe" || i.kind === "sideboard") {
    const d = new De({
      color: So(i.color, i.kind === "wardrobe" ? 4674921 : 3359061),
      roughness: 0.72
    }), p = new Mt(new ie(t, n, e), d);
    o.add(p);
    const g = new Dn({ color: 1976635 }), _ = Math.max(2, Math.round(t / 0.6));
    for (let f = 1; f < _; f += 1) {
      const m = -t / 2 + t * f / _, b = new Mt(new ie(0.015, n * 0.92, 0.015), g);
      b.position.set(m, 0, -e / 2 - 5e-3), o.add(b);
    }
    return o;
  }
  if (i.kind === "tv" || i.kind === "screen") {
    const d = new De({
      color: 593174,
      roughness: 0.2,
      metalness: 0.35
    }), p = new De({ color: 1976635, roughness: 0.5 }), g = new Mt(new ie(t, n, e), p), _ = new Mt(new ie(t * 0.95, n * 0.9, e + 0.01), d);
    return o.add(g, _), o;
  }
  if (i.kind === "table" || i.kind === "desk") {
    const d = new De({
      color: So(i.color, 4937059),
      roughness: 0.68
    }), p = new De({ color: 1976635, roughness: 0.5 }), g = Math.min(0.06, n * 0.12), _ = new Mt(new ie(t, g, e), d);
    _.position.set(0, n / 2 - g / 2, 0), o.add(_);
    const f = Math.max(0.1, n - g), m = new ie(0.05, f, 0.05), b = t / 2 - 0.06, x = e / 2 - 0.06;
    for (const [v, w] of [
      [-b, -x],
      [b, -x],
      [-b, x],
      [b, x]
    ]) {
      const A = new Mt(m, p);
      A.position.set(v, -g / 2, w), o.add(A);
    }
    return o;
  }
  if (i.kind === "bed") {
    const d = new De({ color: l, roughness: 0.8 }), p = new De({ color: 6583435, roughness: 0.9 }), g = new Mt(new ie(t, n * 0.65, e), d);
    g.position.set(0, -n * 0.17, 0);
    const _ = new Mt(new ie(t, n * 1.4, 0.12), d);
    _.position.set(0, n * 0.2, e / 2 - 0.06);
    const f = new Mt(new ie(t * 0.8, 0.12, 0.4), p);
    return f.position.set(0, n * 0.22, e / 2 - 0.35), o.add(g, _, f), o;
  }
  if (i.kind === "custom_poly" && i.polygon && i.polygon.length >= 3) {
    const d = new Dr();
    i.polygon.forEach((f, m) => {
      m === 0 ? d.moveTo(f.x, -f.y) : d.lineTo(f.x, -f.y);
    }), d.closePath();
    const p = new Ha(d, { depth: n, bevelEnabled: !1 });
    p.rotateX(-Math.PI / 2);
    const g = new De({ color: l, roughness: 0.78 }), _ = new Mt(p, g);
    return _.position.set(0, -n / 2, 0), o.add(_), o;
  }
  const u = new Mt(
    new ie(t, n, e),
    new De({ color: l, roughness: 0.75 })
  );
  return o.add(u), o;
}
function Jn(i) {
  return i.visual_style ? {
    kind: i.visual_style.kind,
    scale: i.visual_style.scale ?? 1,
    rotation_deg: i.visual_style.rotation_deg ?? 0
  } : i.geometry.type === "polyline" ? { kind: "led_strip", scale: 1, rotation_deg: 0 } : i.geometry.type === "vertical_column" ? { kind: "floor_strip", scale: 1, rotation_deg: 0 } : { kind: "bulb", scale: 1, rotation_deg: 0 };
}
function B0(i, t, e) {
  const n = {
    entityId: i.entity_id,
    coreMaterials: [],
    haloMaterials: [],
    haloMeshes: [],
    selectionObjects: [],
    pointLights: []
  }, s = Jn(i), r = Math.max(0.5, Math.min(2.2, s.scale ?? 1)), a = new De({
    color: 4674921,
    roughness: 0.25,
    metalness: 0.12
  }), o = new De({
    color: 1976635,
    roughness: 0.65,
    metalness: 0.35
  }), l = new Dn({
    color: 16777215,
    transparent: !0,
    opacity: 0,
    blending: Eo,
    depthWrite: !1
  }), c = new Dn({
    color: 3718648,
    side: $e
  }), h = new Dn({ visible: !1 });
  n.coreMaterials.push(a), n.haloMaterials.push(l);
  const u = i.geometry;
  if (u.type === "polyline" && u.points.length >= 2) {
    const v = u.points.map((O) => new L(O[0], O[2], O[1])), w = new vh(v, !1, "catmullrom", 0.04), A = (u.thickness_m ?? 0.032) * r, C = new Mt(new Ni(w, 32, A, 8, !1), a);
    C.userData.entityId = i.entity_id, t.add(C), e.push(C);
    const D = Math.min(24, Math.max(6, Math.round(w.getLength() * 4)));
    for (let O = 0; O <= D; O += 1) {
      const F = w.getPointAt(O / D), W = new Mt(new tn(A * 1.18, 8, 6), a);
      W.position.copy(F), t.add(W);
    }
    const S = new Mt(
      new Ni(w, 18, A * 3.8, 8, !1),
      h
    );
    S.userData.entityId = i.entity_id, t.add(S), e.push(S);
    const M = new Mt(
      new Ni(w, 24, A * 3, 10, !1),
      l
    );
    t.add(M), n.haloMeshes.push(M);
    const P = new Mt(
      new Ni(w, 24, A * 2.1, 8, !1),
      new Dn({
        color: 3718648,
        transparent: !0,
        opacity: 0.48,
        depthWrite: !1
      })
    );
    P.visible = !1, t.add(P), n.selectionObjects.push(P);
    const z = Math.min(3, v.length);
    for (let O = 0; O < z; O += 1) {
      const F = z === 1 ? 0.5 : O / (z - 1), W = w.getPointAt(F), H = new Mo(16777215, 0, 5.2, 1.8);
      H.position.copy(W), t.add(H), n.pointLights.push(H);
    }
    return n;
  }
  if (u.type === "vertical_column") {
    const [v, w, A] = u.from, [C, D, S] = u.to, M = new L(v, A, w), P = new L(C, S, D), z = M.clone().add(P).multiplyScalar(0.5), O = Math.max(M.distanceTo(P), 0.2), F = (u.radius_m ?? 0.042) * r, W = new Mt(
      new Le(F * 3, F * 3.4, 0.03, 16),
      o
    );
    if (W.position.set(v, 0.015, w), t.add(W), s.kind === "floor_lamp") {
      const k = Math.max(0.2, P.y - 0.12), tt = new Mt(
        new Le(F * 0.4, F * 0.45, k, 10),
        o
      );
      tt.position.set(v, k / 2, w), t.add(tt);
      const nt = new Mt(
        new Le(F * 3.2, F * 4.5, 0.26 * r, 18, 1, !0),
        a
      );
      nt.material.side = $e, nt.position.copy(P), nt.userData.entityId = i.entity_id, t.add(nt), e.push(nt);
      const ht = new Mt(new tn(F * 6.5, 16, 12), l);
      ht.position.copy(P), t.add(ht), n.haloMeshes.push(ht);
      const Pt = new Mt(
        new Le(F * 4.5, F * 4.5, O + 0.2, 10),
        h
      );
      Pt.position.copy(z), Pt.userData.entityId = i.entity_id, t.add(Pt), e.push(Pt);
    } else {
      const k = new Mt(
        new Le(F, F, O, 14),
        a
      );
      k.position.copy(z), k.quaternion.setFromUnitVectors(
        new L(0, 1, 0),
        P.clone().sub(M).normalize()
      ), k.userData.entityId = i.entity_id, t.add(k), e.push(k);
      const tt = new Mt(
        new Le(F * 3.6, F * 3.6, O + 0.12, 10),
        h
      );
      tt.position.copy(z), tt.quaternion.copy(k.quaternion), tt.userData.entityId = i.entity_id, t.add(tt), e.push(tt);
      const nt = new Mt(
        new Le(F * 3.2, F * 3.2, O + 0.06, 14),
        l
      );
      nt.position.copy(z), nt.quaternion.copy(k.quaternion), t.add(nt), n.haloMeshes.push(nt);
    }
    const H = new Mt(new $a(F * 3.2, 0.015, 8, 24), c);
    H.position.copy(z), H.rotation.x = Math.PI / 2, H.visible = !1, t.add(H), n.selectionObjects.push(H);
    const J = new Mo(16777215, 0, 6, 1.7);
    return J.position.copy(s.kind === "floor_lamp" ? P : z), t.add(J), n.pointLights.push(J), n;
  }
  if (u.type !== "point")
    return n;
  const [d, p, g] = u.position, _ = (u.radius_m ?? 0.085) * r, f = new vn();
  if (f.position.set(d, g, p), s.rotation_deg && (f.rotation.y = Ia.degToRad(-s.rotation_deg)), t.add(f), s.kind === "spot") {
    const v = new Mt(
      new Le(_ * 0.75, _ * 0.9, _ * 1.4, 14),
      o
    );
    v.rotation.x = Math.PI / 2.6, f.add(v);
    const w = new Mt(new tn(_ * 0.85, 14, 10), a);
    w.position.set(0, -_ * 0.3, -_ * 0.55), w.userData.entityId = i.entity_id, f.add(w), e.push(w);
    const A = new Mt(
      new za(_ * 3.4, _ * 5.2, 16, 1, !0),
      l
    );
    A.position.set(0, -_ * 2.1, -_ * 1.8), A.rotation.x = -Math.PI * 0.78, f.add(A), n.haloMeshes.push(A);
  } else if (s.kind === "led_strip") {
    const v = new Mt(
      new ie(_ * 5.5, _ * 0.65, _ * 0.75),
      a
    );
    v.userData.entityId = i.entity_id, f.add(v), e.push(v);
    const w = new Mt(
      new ie(_ * 6.5, _ * 1.8, _ * 2.2),
      l
    );
    f.add(w), n.haloMeshes.push(w);
  } else if (s.kind === "table_lamp" || s.kind === "floor_lamp") {
    const v = new Mt(
      new Le(_ * 0.85, _ * 1.05, _ * 0.9, 14),
      o
    );
    v.position.set(0, -_ * 0.75, 0), f.add(v);
    const w = new Mt(
      new Le(_ * 1.15, _ * 1.6, _ * 1.6, 18),
      a
    );
    w.position.set(0, _ * 0.45, 0), w.userData.entityId = i.entity_id, f.add(w), e.push(w);
    const A = new Mt(new tn(_ * 3.2, 16, 12), l);
    f.add(A), n.haloMeshes.push(A);
  } else if (s.kind === "ceiling") {
    const v = new Mt(
      new Le(_ * 2.1, _ * 2.1, _ * 0.45, 20),
      a
    );
    v.userData.entityId = i.entity_id, f.add(v), e.push(v);
    const w = new Mt(new tn(_ * 3.8, 16, 12), l);
    f.add(w), n.haloMeshes.push(w);
  } else {
    const v = new Mt(
      new Le(_ * 0.45, _ * 0.55, _ * 0.7, 12),
      o
    );
    v.position.set(0, -_ * 0.9, 0), f.add(v);
    const w = new Mt(new tn(_, 18, 14), a);
    w.userData.entityId = i.entity_id, f.add(w), e.push(w);
    const A = new Mt(new tn(_ * 3, 16, 12), l);
    f.add(A), n.haloMeshes.push(A);
  }
  const m = new Mt(new tn(_ * 2.7, 10, 8), h);
  m.userData.entityId = i.entity_id, f.add(m), e.push(m);
  const b = new Mt(new Va(_ * 1.7, _ * 2.2, 24), c);
  b.rotation.x = -Math.PI / 2, b.visible = !1, f.add(b), n.selectionObjects.push(b);
  const x = new Mo(16777215, 0, 5.5, 1.8);
  return f.add(x), n.pointLights.push(x), n;
}
class z0 {
  constructor(t, e = {}) {
    this.renderer = null, this.controls = null, this.resizeObserver = null, this.raycaster = new M0(), this.hitMeshes = [], this.lightHandles = /* @__PURE__ */ new Map(), this.currentRoom = null, this.pointerDownPos = null, this.rafId = null, this.isDisposed = !1, this.handlePointerDown = (o) => {
      this.pointerDownPos = { x: o.clientX, y: o.clientY };
    }, this.handlePointerUp = (o) => {
      if (!this.pointerDownPos || !this.renderer || !this.onSelectLight) return;
      const l = Math.hypot(
        o.clientX - this.pointerDownPos.x,
        o.clientY - this.pointerDownPos.y
      );
      if (this.pointerDownPos = null, l > 7) return;
      const c = this.renderer.domElement.getBoundingClientRect(), h = new et(
        (o.clientX - c.left) / c.width * 2 - 1,
        -((o.clientY - c.top) / c.height) * 2 + 1
      );
      this.raycaster.setFromCamera(h, this.camera);
      const u = this.raycaster.intersectObjects(this.hitMeshes, !1);
      if (u.length > 0) {
        const d = u[0].object.userData.entityId;
        typeof d == "string" && this.onSelectLight(d, o.shiftKey || o.ctrlKey || o.metaKey);
      }
    }, this.container = t, this.onSelectLight = e.onSelectLight, this.scene = new k_(), this.scene.background = new Wt(987672), this.roomGroup = new vn(), this.lightsGroup = new vn(), this.scene.add(this.roomGroup), this.scene.add(this.lightsGroup);
    const n = Math.max(t.clientWidth, 300), s = Math.max(t.clientHeight, 200);
    this.camera = new ze(58, n / s, 0.1, 60);
    try {
      this.renderer = new F_({
        antialias: !0,
        powerPreference: "low-power"
      }), this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2)), this.renderer.setSize(n, s), this.container.appendChild(this.renderer.domElement), this.controls = new w0(this.camera, this.renderer.domElement), this.controls.enableDamping = !0, this.controls.dampingFactor = 0.08, this.controls.maxPolarAngle = Math.PI * 0.49, this.controls.minDistance = 0.7, this.controls.maxDistance = 16, this.controls.addEventListener("change", () => this.scheduleRender()), this.renderer.domElement.addEventListener("pointerdown", this.handlePointerDown), this.renderer.domElement.addEventListener("pointerup", this.handlePointerUp);
    } catch {
      this.renderer = null;
    }
    const r = new y0(14412542, 0.32);
    this.scene.add(r);
    const a = new _0(14870768, 1976635, 0.25);
    this.scene.add(a), typeof ResizeObserver < "u" && (this.resizeObserver = new ResizeObserver(() => this.resize()), this.resizeObserver.observe(this.container));
  }
  get isWebGLReady() {
    return this.renderer !== null;
  }
  renderRoom(t, e = "pov") {
    var f, m;
    this.currentRoom = t, this.clearGroup(this.roomGroup), this.clearGroup(this.lightsGroup), this.hitMeshes = [], this.lightHandles.clear();
    const n = Ms(t.floor_polygon), s = n.minX + n.width / 2, r = n.minY + n.depth / 2, a = new Dr();
    t.floor_polygon.forEach((b, x) => {
      x === 0 ? a.moveTo(b.x, -b.y) : a.lineTo(b.x, -b.y);
    }), a.closePath();
    const o = new Ga(a);
    o.rotateX(-Math.PI / 2);
    const l = (f = t.theme) != null && f.floor_color && Number.parseInt(t.theme.floor_color.replace(/^#/, ""), 16) || 1909292, c = new De({
      color: l,
      roughness: 0.85,
      metalness: 0.05
    });
    this.roomGroup.add(new Mt(o, c));
    const h = new b0(
      Math.ceil(Math.max(n.width, n.depth)) + 2,
      14,
      3359061,
      1976635
    );
    h.position.set(s, 4e-3, r), this.roomGroup.add(h);
    const u = (m = t.theme) != null && m.wall_color && Number.parseInt(t.theme.wall_color.replace(/^#/, ""), 16) || 3359061, d = [], p = t.floor_polygon;
    for (let b = 0; b < p.length; b += 1) {
      const x = p[b], v = p[(b + 1) % p.length];
      this.addWallPlane(x.x, x.y, v.x, v.y, t.height_m, 0.28, u), d.push(
        new L(x.x, 0, x.y),
        new L(v.x, 0, v.y),
        new L(x.x, t.height_m, x.y),
        new L(v.x, t.height_m, v.y),
        new L(x.x, 0, x.y),
        new L(x.x, t.height_m, x.y)
      );
    }
    for (const b of t.inner_walls ?? []) {
      const x = b.height_m ?? t.height_m;
      this.addWallPlane(b.from[0], b.from[1], b.to[0], b.to[1], x, 0.42, u), d.push(
        new L(b.from[0], 0, b.from[1]),
        new L(b.to[0], 0, b.to[1]),
        new L(b.from[0], x, b.from[1]),
        new L(b.to[0], x, b.to[1])
      );
    }
    for (const b of t.wall_features ?? []) {
      const x = b.to[0] - b.from[0], v = b.to[1] - b.from[1], w = Math.hypot(x, v);
      if (w < 0.05) continue;
      const A = b.kind === "window", C = A ? 1.15 : 2.05, D = A ? 1.45 : 1.025, S = new Mt(
        new ie(w, C, 0.06),
        new Dn({
          color: A ? 3718648 : 16096779,
          transparent: !0,
          opacity: 0.28
        })
      );
      S.position.set(
        (b.from[0] + b.to[0]) / 2,
        D,
        (b.from[1] + b.to[1]) / 2
      ), S.rotation.y = -Math.atan2(v, x), this.roomGroup.add(S);
    }
    const g = new Ee().setFromPoints(d), _ = new Fa({ color: 4674921 });
    this.roomGroup.add(new ua(g, _));
    for (const b of t.furniture)
      this.roomGroup.add(k0(b));
    for (const b of t.lights) {
      const x = B0(b, this.lightsGroup, this.hitMeshes);
      this.lightHandles.set(b.entity_id, x);
    }
    this.setCameraPreset(e);
  }
  setCameraPreset(t) {
    if (!this.currentRoom) return;
    const e = this.currentRoom, n = Ms(e.floor_polygon), s = n.minX + n.width / 2, r = n.minY + n.depth / 2;
    if (t === "pov") {
      const [a, o, l] = e.camera_pov.position, [c, h, u] = e.camera_pov.target;
      this.camera.position.set(a, l, o), this.controls ? (this.controls.target.set(c, u, h), this.controls.update()) : this.camera.lookAt(c, u, h);
    } else {
      const a = Math.max(n.width, n.depth) * 1.15;
      this.camera.position.set(s + a * 0.35, e.height_m * 1.55, n.maxY + a * 0.55), this.controls ? (this.controls.target.set(s, 0.7, r), this.controls.update()) : this.camera.lookAt(s, 0.7, r);
    }
    this.scheduleRender();
  }
  updateLightStates(t, e) {
    for (const [n, s] of this.lightHandles.entries()) {
      const r = t.get(n), a = e.has(n);
      for (const u of s.selectionObjects)
        u.visible = a;
      const o = (r == null ? void 0 : r.isOn) ?? !1, l = (r == null ? void 0 : r.brightness01) ?? 0, c = r ? new Wt(r.rgb.r / 255, r.rgb.g / 255, r.rgb.b / 255) : new Wt(5395035);
      for (const u of s.coreMaterials)
        o ? (u.color.copy(c), u.emissive.copy(c), u.emissiveIntensity = 0.55 + l * 1.35) : (u.color.setHex(4674921), u.emissive.setHex(0), u.emissiveIntensity = 0);
      for (const u of s.haloMaterials)
        u.color.copy(c), u.opacity = o ? 0.14 + l * 0.34 : 0;
      for (const u of s.haloMeshes) {
        u.visible = o;
        const d = 0.85 + l * 0.6;
        u.scale.setScalar(d);
      }
      const h = s.pointLights.length > 0 && o ? (0.8 + l * 2.8) / Math.sqrt(s.pointLights.length) : 0;
      for (const u of s.pointLights)
        u.color.copy(c), u.intensity = h;
    }
    this.scheduleRender();
  }
  resize() {
    if (!this.renderer) return;
    const t = Math.max(this.container.clientWidth, 1), e = Math.max(this.container.clientHeight, 1);
    this.camera.aspect = t / e, this.camera.updateProjectionMatrix(), this.renderer.setSize(t, e), this.scheduleRender();
  }
  dispose() {
    var t, e;
    this.isDisposed = !0, this.rafId !== null && (cancelAnimationFrame(this.rafId), this.rafId = null), (t = this.resizeObserver) == null || t.disconnect(), this.resizeObserver = null, this.renderer && (this.renderer.domElement.removeEventListener("pointerdown", this.handlePointerDown), this.renderer.domElement.removeEventListener("pointerup", this.handlePointerUp)), (e = this.controls) == null || e.dispose(), this.controls = null, this.clearGroup(this.roomGroup), this.clearGroup(this.lightsGroup), this.hitMeshes = [], this.lightHandles.clear(), this.renderer && (this.renderer.dispose(), this.renderer.domElement.remove(), this.renderer = null);
  }
  scheduleRender() {
    this.isDisposed || !this.renderer || this.rafId !== null || (this.rafId = requestAnimationFrame(() => {
      var e;
      if (this.rafId = null, this.isDisposed || !this.renderer) return;
      const t = ((e = this.controls) == null ? void 0 : e.update()) ?? !1;
      this.renderer.render(this.scene, this.camera), t && this.scheduleRender();
    }));
  }
  addWallPlane(t, e, n, s, r, a, o = 3359061) {
    const l = n - t, c = s - e, h = Math.hypot(l, c);
    if (h < 0.01) return;
    const u = new Ds(h, r), d = new De({
      color: o,
      roughness: 0.9,
      metalness: 0.05,
      transparent: !0,
      opacity: a,
      depthWrite: !1,
      side: $e
    }), p = new Mt(u, d);
    p.position.set((t + n) / 2, r / 2, (e + s) / 2), p.rotation.y = -Math.atan2(c, l), this.roomGroup.add(p);
  }
  clearGroup(t) {
    for (; t.children.length > 0; ) {
      const e = t.children[0];
      t.remove(e), e instanceof Mt || e instanceof ua ? (e.geometry.dispose(), Array.isArray(e.material) ? e.material.forEach((n) => n.dispose()) : e.material.dispose()) : e instanceof vn && this.clearGroup(e);
    }
  }
}
function Ch(i, t, e, n) {
  const s = Math.max(i.width, 1), r = Math.max(i.height, 1), a = Math.min(s / t.width, r / t.height), o = t.width * a, l = t.height * a, c = i.left + (s - o) / 2, h = i.top + (r - l) / 2;
  return {
    x: t.x + (e - c) / a,
    y: t.y + (n - h) / a
  };
}
function nn(i, t, e) {
  i.stopPropagation();
  const n = i.currentTarget, s = n == null ? void 0 : n.closest("svg");
  if (!s) return;
  const r = (o) => {
    const l = s.getBoundingClientRect(), c = Ch(l, t, o.clientX, o.clientY);
    e(c.x, c.y);
  }, a = () => {
    window.removeEventListener("pointermove", r), window.removeEventListener("pointerup", a);
  };
  window.addEventListener("pointermove", r), window.addEventListener("pointerup", a);
}
function ma(i) {
  if (i.geometry.type === "point")
    return [i.geometry.position[0], i.geometry.position[1]];
  if (i.geometry.type === "vertical_column")
    return [i.geometry.from[0], i.geometry.from[1]];
  const t = i.geometry.points;
  return t.length > 0 ? [t[0][0], t[0][1]] : [0, 0];
}
function H0(i, t) {
  if (t.geometry.type === "polyline") return !1;
  const [e, n] = ma(t);
  return i.some((s) => {
    if (s.entity_id === t.entity_id || s.geometry.type === "polyline")
      return !1;
    const [r, a] = ma(s);
    return Math.hypot(r - e, a - n) < 0.18;
  });
}
function V0(i, t) {
  const e = Ms(i.floor_polygon), n = 0.55, s = {
    x: e.minX - n,
    y: e.minY - n,
    width: e.width + n * 2,
    height: e.depth + n * 2
  }, r = `${s.x} ${s.y} ${s.width} ${s.height}`, a = i.floor_polygon.map((w) => `${w.x},${w.y}`).join(" "), [o, l] = i.camera_pov.position, [c, h] = i.camera_pov.target, u = Math.atan2(h - l, c - o), d = 1.4, p = 0.46, g = `${o + Math.cos(u - p) * d},${l + Math.sin(u - p) * d}`, _ = `${o + Math.cos(u + p) * d},${l + Math.sin(u + p) * d}`, f = t.edit, m = !!(f != null && f.enabled), b = [], x = [];
  if (m) {
    for (let w = Math.floor(s.x); w <= Math.ceil(s.x + s.width); w += 0.5)
      b.push(w);
    for (let w = Math.floor(s.y); w <= Math.ceil(s.y + s.height); w += 0.5)
      x.push(w);
  }
  return $t`
    <svg
      viewBox=${r}
      preserveAspectRatio="xMidYMid meet"
      aria-label="2D Draufsicht"
      @click=${(w) => {
    if (!m || !(f != null && f.onCanvasTapXY)) return;
    const A = w.currentTarget, C = Ch(A.getBoundingClientRect(), s, w.clientX, w.clientY);
    f.onCanvasTapXY(C.x, C.y);
  }}
    >
      ${m ? $t`
            ${b.map(
    (w) => $t`
                <line
                  x1=${w}
                  y1=${s.y}
                  x2=${w}
                  y2=${s.y + s.height}
                  stroke="rgba(148,163,184,0.12)"
                  stroke-width="0.015"
                />
              `
  )}
            ${x.map(
    (w) => $t`
                <line
                  x1=${s.x}
                  y1=${w}
                  x2=${s.x + s.width}
                  y2=${w}
                  stroke="rgba(148,163,184,0.12)"
                  stroke-width="0.015"
                />
              `
  )}
          ` : Lt}

      <polygon
        points=${a}
        fill="rgba(255,255,255,0.035)"
        stroke="rgba(148,163,184,0.65)"
        stroke-width="0.06"
      />

      ${(i.inner_walls ?? []).map(
    (w) => $t`
          <line
            x1=${w.from[0]}
            y1=${w.from[1]}
            x2=${w.to[0]}
            y2=${w.to[1]}
            stroke="rgba(148,163,184,0.8)"
            stroke-width="0.08"
            stroke-linecap="round"
          />
        `
  )}

      ${(i.wall_features ?? []).map(
    (w) => $t`
          <line
            x1=${w.from[0]}
            y1=${w.from[1]}
            x2=${w.to[0]}
            y2=${w.to[1]}
            stroke=${w.kind === "window" ? "#38bdf8" : "#f59e0b"}
            stroke-width="0.1"
            stroke-linecap="round"
          />
        `
  )}

      <!-- Aktive Skizzen-Linie beim Neuzeichnen des Grundrisses -->
      ${m && (f != null && f.sketchPoints) && f.sketchPoints.length > 0 ? $t`
            <polyline
              points=${f.sketchPoints.map((w) => `${w.x},${w.y}`).join(" ")}
              fill="none"
              stroke="#f59e0b"
              stroke-width="0.08"
              stroke-dasharray="0.12 0.08"
            />
            ${f.sketchPoints.map(
    (w) => $t`<circle cx=${w.x} cy=${w.y} r="0.1" fill="#f59e0b" />`
  )}
          ` : Lt}

      <!-- Couch-Blickfeld -->
      <polygon points="${o},${l} ${g} ${_}" fill="rgba(56,189,248,0.09)" />
      <circle cx=${o} cy=${l} r="0.08" fill="#38bdf8" opacity="0.85" />

      <!-- Möbel (inkl. L-/U-Couch & Schränke) -->
      ${i.furniture.map((w) => {
    const [A, C] = w.position, [D, S] = w.size, M = w.rotation_deg ? `translate(${A} ${C}) rotate(${w.rotation_deg})` : `translate(${A} ${C})`, P = m && (f == null ? void 0 : f.tool) === "furniture", z = P && (f == null ? void 0 : f.selectedFurnitureId) === w.id, O = xu(w), F = w.kind === "tv" || w.kind === "screen" ? "rgba(15,23,42,0.88)" : w.kind === "wardrobe" ? "rgba(71,85,105,0.42)" : "rgba(100,116,139,0.28)";
    return $t`
          <g
            transform=${M}
            style=${P ? "cursor:grab" : ""}
            @click=${(W) => {
      var H;
      P && (W.stopPropagation(), (H = f == null ? void 0 : f.onSelectFurniture) == null || H.call(f, w.id));
    }}
            @pointerdown=${(W) => {
      var H;
      P && ((H = f == null ? void 0 : f.onSelectFurniture) == null || H.call(f, w.id), f != null && f.onMoveFurnitureXY && nn(W, s, (J, k) => {
        var tt;
        (tt = f.onMoveFurnitureXY) == null || tt.call(f, w.id, qt(J, 0.1), qt(k, 0.1));
      }));
    }}
          >
            ${O.map(
      (W) => $t`
                <rect
                  x=${W.x}
                  y=${W.y}
                  width=${W.width}
                  height=${W.height}
                  rx="0.05"
                  fill=${F}
                  stroke=${z ? "#38bdf8" : P ? "#f59e0b" : "rgba(148,163,184,0.45)"}
                  stroke-width=${z ? "0.065" : P ? "0.05" : "0.035"}
                />
              `
    )}
            ${w.kind === "wardrobe" ? $t`
                  <line
                    x1=${-D / 2 + 0.08}
                    y1=${-S / 2 + 0.08}
                    x2=${D / 2 - 0.08}
                    y2=${S / 2 - 0.08}
                    stroke="rgba(148,163,184,0.45)"
                    stroke-width="0.025"
                  />
                ` : Lt}
            ${w.label ? $t`
                  <text
                    x="0"
                    y="0.06"
                    text-anchor="middle"
                    fill="rgba(226,232,240,0.65)"
                    font-size="0.16"
                    pointer-events="none"
                  >${w.label}</text>
                ` : Lt}
          </g>
        `;
  })}

      <!-- Lichter (mit unterscheidbarem Lampen-/LED-Strip-Design) -->
      ${[...i.lights].sort((w, A) => {
    const C = { polyline: 0, point: 1, vertical_column: 2 };
    return C[w.geometry.type] - C[A.geometry.type];
  }).map((w) => {
    const A = t.visualStates.get(w.entity_id), C = (A == null ? void 0 : A.isOn) ?? !1, D = t.selectedIds.has(w.entity_id), S = A ? A.cssColor : "#52525b", M = A ? Li(A.rgb, 0.28 * A.brightness01) : "transparent", P = m && (f == null ? void 0 : f.tool) === "lights", z = Jn(w), O = (nt) => {
      nt.stopPropagation(), t.onSelectLight(w.entity_id, nt.shiftKey || nt.ctrlKey || nt.metaKey);
    };
    if (w.geometry.type === "polyline") {
      const nt = w.geometry, ht = nt.points.map((Pt) => `${Pt[0]},${Pt[1]}`).join(" ");
      return $t`
              <g class="svg-light" @click=${O}>
                ${C ? $t`<polyline points=${ht} fill="none" stroke=${M} stroke-width="0.34" stroke-linecap="round" stroke-linejoin="round" />` : Lt}
                ${D ? $t`<polyline points=${ht} fill="none" stroke="#38bdf8" stroke-width="0.24" stroke-linecap="round" stroke-linejoin="round" opacity="0.9" />` : Lt}
                <polyline
                  points=${ht}
                  fill="none"
                  stroke="#1e293b"
                  stroke-width="0.13"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <polyline
                  points=${ht}
                  fill="none"
                  stroke=${S}
                  stroke-width="0.08"
                  stroke-dasharray="0.08 0.06"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <polyline points=${ht} fill="none" stroke="transparent" stroke-width="0.34" />
                ${P ? nt.points.map(
        (Pt, Yt) => $t`
                        <circle
                          cx=${Pt[0]}
                          cy=${Pt[1]}
                          r="0.12"
                          fill="#f59e0b"
                          stroke="#fff"
                          stroke-width="0.03"
                          style="cursor:grab"
                          @pointerdown=${(Y) => {
          f != null && f.onMoveLightXY && nn(Y, s, (st, bt) => {
            var at;
            (at = f.onMoveLightXY) == null || at.call(
              f,
              w.entity_id,
              qt(st, 0.05),
              qt(bt, 0.05),
              Yt
            );
          });
        }}
                        />
                      `
      ) : Lt}
              </g>
            `;
    }
    const [F, W] = ma(w), J = H0(i.lights, w) && w.geometry.type === "point", k = (J ? 0.2 : w.geometry.type === "vertical_column" ? 0.11 : 0.14) * (z.scale ?? 1), tt = z.rotation_deg ?? 0;
    return $t`
            <g
              class="svg-light"
              transform=${`translate(${F} ${W}) rotate(${tt})`}
              style=${P ? "cursor:grab" : ""}
              @click=${O}
              @pointerdown=${(nt) => {
      !P || !(f != null && f.onMoveLightXY) || nn(nt, s, (ht, Pt) => {
        var Yt;
        (Yt = f.onMoveLightXY) == null || Yt.call(
          f,
          w.entity_id,
          qt(ht, 0.05),
          qt(Pt, 0.05)
        );
      });
    }}
            >
              ${C ? $t`<circle cx="0" cy="0" r=${k + 0.22} fill=${M} />` : Lt}
              ${D ? $t`<circle cx="0" cy="0" r=${k + 0.08} fill="none" stroke="#38bdf8" stroke-width="0.05" />` : Lt}

              ${z.kind === "spot" ? $t`
                    <polygon
                      points=${`0,0 ${-k * 1.4},${-k * 2.1} ${k * 1.4},${-k * 2.1}`}
                      fill=${C ? M : "rgba(148,163,184,0.2)"}
                    />
                    <circle cx="0" cy="0" r=${k * 0.85} fill=${S} stroke="#fff" stroke-width="0.03" />
                  ` : z.kind === "led_strip" ? $t`
                      <rect
                        x=${-k * 2.2}
                        y=${-k * 0.45}
                        width=${k * 4.4}
                        height=${k * 0.9}
                        rx="0.03"
                        fill=${S}
                        stroke="#fff"
                        stroke-width="0.025"
                      />
                    ` : z.kind === "ceiling" ? $t`
                        <circle
                          cx="0"
                          cy="0"
                          r=${k * 1.3}
                          fill=${S}
                          stroke="#fff"
                          stroke-width="0.03"
                          stroke-dasharray="0.06 0.04"
                        />
                      ` : J ? $t`<circle cx="0" cy="0" r=${k} fill="none" stroke=${S} stroke-width="0.075" />` : $t`<circle cx="0" cy="0" r=${k} fill=${S} stroke="#fff" stroke-width="0.03" />`}
              <circle cx="0" cy="0" r="0.28" fill="transparent" />
            </g>
          `;
  })}

      <!-- Grundriss-Eckpunkte zum Verschieben -->
      ${m && (f == null ? void 0 : f.tool) === "floor" && (!f.sketchPoints || f.sketchPoints.length === 0) ? i.floor_polygon.map(
    (w, A) => $t`
              <circle
                cx=${w.x}
                cy=${w.y}
                r="0.14"
                fill="#f59e0b"
                stroke="#fff"
                stroke-width="0.04"
                style="cursor:grab"
                @pointerdown=${(C) => {
      f.onMovePolygonVertex && nn(C, s, (D, S) => {
        var M;
        (M = f.onMovePolygonVertex) == null || M.call(f, A, qt(D, 0.25), qt(S, 0.25));
      });
    }}
              />
            `
  ) : Lt}

      <!-- Kamera / Couch-POV Griffe -->
      ${m && (f == null ? void 0 : f.tool) === "camera" ? $t`
            <line
              x1=${o}
              y1=${l}
              x2=${c}
              y2=${h}
              stroke="#38bdf8"
              stroke-width="0.05"
              stroke-dasharray="0.1 0.08"
            />
            <circle
              cx=${o}
              cy=${l}
              r="0.16"
              fill="#38bdf8"
              stroke="#fff"
              stroke-width="0.04"
              style="cursor:grab"
              @pointerdown=${(w) => {
    nn(w, s, (A, C) => {
      var D;
      (D = f.onMoveCameraPov) == null || D.call(f, "position", qt(A, 0.1), qt(C, 0.1));
    });
  }}
            />
            <circle
              cx=${c}
              cy=${h}
              r="0.14"
              fill="#f59e0b"
              stroke="#fff"
              stroke-width="0.04"
              style="cursor:grab"
              @pointerdown=${(w) => {
    nn(w, s, (A, C) => {
      var D;
      (D = f.onMoveCameraPov) == null || D.call(f, "target", qt(A, 0.1), qt(C, 0.1));
    });
  }}
            />
          ` : Lt}
    </svg>
  `;
}
function G0(i, t) {
  const e = Ms(i.floor_polygon), n = 0.5, s = {
    x: e.minX - n,
    y: -i.height_m - n,
    width: e.width + n * 2,
    height: i.height_m + n * 2
  }, r = `${s.x} ${s.y} ${s.width} ${s.height}`, a = [];
  for (let c = 0.5; c < i.height_m; c += 0.5)
    a.push(Number(c.toFixed(2)));
  const o = t.edit, l = !!(o != null && o.enabled && o.tool === "lights");
  return $t`
    <svg viewBox=${r} preserveAspectRatio="xMidYMid meet" aria-label="Frontalansicht">
      <rect
        x=${e.minX}
        y=${-i.height_m}
        width=${e.width}
        height=${i.height_m}
        fill="rgba(255,255,255,0.035)"
        stroke="rgba(148,163,184,0.6)"
        stroke-width="0.06"
      />

      ${a.map(
    (c) => $t`
          <line
            x1=${e.minX}
            y1=${-c}
            x2=${e.maxX}
            y2=${-c}
            stroke="rgba(148,163,184,0.16)"
            stroke-width="0.02"
            stroke-dasharray="0.08 0.08"
          />
          <text x=${e.minX + 0.06} y=${-c - 0.04} fill="rgba(148,163,184,0.65)" font-size="0.16">
            ${c.toFixed(1)}m
          </text>
        `
  )}

      <!-- Möbel-Querschnitt -->
      ${i.furniture.map((c) => {
    const [h, , u] = c.position, [d, , p] = c.size;
    return $t`
          <rect
            x=${h - d / 2}
            y=${-(u + p / 2)}
            width=${d}
            height=${p}
            rx="0.04"
            fill=${c.kind === "tv" || c.kind === "screen" ? "rgba(15,23,42,0.8)" : "rgba(100,116,139,0.2)"}
            stroke="rgba(148,163,184,0.35)"
            stroke-width="0.03"
          />
        `;
  })}

      <!-- Lichter nach Höhe Z -->
      ${i.lights.map((c) => {
    const h = t.visualStates.get(c.entity_id), u = (h == null ? void 0 : h.isOn) ?? !1, d = t.selectedIds.has(c.entity_id), p = h ? h.cssColor : "#52525b", g = h ? Li(h.rgb, 0.28 * h.brightness01) : "transparent", _ = (b) => {
      b.stopPropagation(), t.onSelectLight(c.entity_id, b.shiftKey || b.ctrlKey || b.metaKey);
    };
    if (c.geometry.type === "vertical_column") {
      const [b, , x] = c.geometry.from, [v, , w] = c.geometry.to;
      return $t`
            <g class="svg-light" @click=${_}>
              ${u ? $t`<line x1=${b} y1=${-x} x2=${v} y2=${-w} stroke=${g} stroke-width="0.34" stroke-linecap="round" />` : Lt}
              ${d ? $t`<line x1=${b} y1=${-x} x2=${v} y2=${-w} stroke="#38bdf8" stroke-width="0.2" stroke-linecap="round" />` : Lt}
              <line x1=${b} y1=${-x} x2=${v} y2=${-w} stroke=${p} stroke-width="0.1" stroke-linecap="round" />
              <line x1=${b} y1=${-x} x2=${v} y2=${-w} stroke="transparent" stroke-width="0.35" stroke-linecap="round" />
              ${l ? $t`
                    <circle
                      cx=${b}
                      cy=${-x}
                      r="0.11"
                      fill="#f59e0b"
                      stroke="#fff"
                      stroke-width="0.03"
                      style="cursor:ns-resize"
                      @pointerdown=${(A) => {
        nn(A, s, (C, D) => {
          var S;
          (S = o == null ? void 0 : o.onMoveLightXZ) == null || S.call(
            o,
            c.entity_id,
            qt(C, 0.05),
            qt(Math.max(0.05, Math.min(i.height_m, -D)), 0.05),
            "from"
          );
        });
      }}
                    />
                    <circle
                      cx=${v}
                      cy=${-w}
                      r="0.11"
                      fill="#f59e0b"
                      stroke="#fff"
                      stroke-width="0.03"
                      style="cursor:ns-resize"
                      @pointerdown=${(A) => {
        nn(A, s, (C, D) => {
          var S;
          (S = o == null ? void 0 : o.onMoveLightXZ) == null || S.call(
            o,
            c.entity_id,
            qt(C, 0.05),
            qt(Math.max(0.05, Math.min(i.height_m, -D)), 0.05),
            "to"
          );
        });
      }}
                    />
                  ` : Lt}
            </g>
          `;
    }
    if (c.geometry.type === "polyline") {
      const b = c.geometry, x = b.points.map((v) => `${v[0]},${-v[2]}`).join(" ");
      return $t`
            <g class="svg-light" @click=${_}>
              ${u ? $t`<polyline points=${x} fill="none" stroke=${g} stroke-width="0.28" stroke-linecap="round" />` : Lt}
              ${d ? $t`<polyline points=${x} fill="none" stroke="#38bdf8" stroke-width="0.18" stroke-linecap="round" />` : Lt}
              <polyline points=${x} fill="none" stroke=${p} stroke-width="0.08" stroke-linecap="round" />
              <polyline points=${x} fill="none" stroke="transparent" stroke-width="0.34" stroke-linecap="round" />
              ${l ? b.points.map(
        (v, w) => $t`
                      <circle
                        cx=${v[0]}
                        cy=${-v[2]}
                        r="0.1"
                        fill="#f59e0b"
                        stroke="#fff"
                        stroke-width="0.03"
                        style="cursor:ns-resize"
                        @pointerdown=${(A) => {
          nn(A, s, (C, D) => {
            var S;
            (S = o == null ? void 0 : o.onMoveLightXZ) == null || S.call(
              o,
              c.entity_id,
              qt(C, 0.05),
              qt(Math.max(0.05, Math.min(i.height_m, -D)), 0.05),
              w
            );
          });
        }}
                      />
                    `
      ) : Lt}
            </g>
          `;
    }
    const [f, , m] = c.geometry.position;
    return $t`
          <g
            class="svg-light"
            style=${l ? "cursor:grab" : ""}
            @click=${_}
            @pointerdown=${(b) => {
      !l || !(o != null && o.onMoveLightXZ) || nn(b, s, (x, v) => {
        var w;
        (w = o.onMoveLightXZ) == null || w.call(
          o,
          c.entity_id,
          qt(x, 0.05),
          qt(Math.max(0.05, Math.min(i.height_m, -v)), 0.05)
        );
      });
    }}
          >
            ${u ? $t`<circle cx=${f} cy=${-m} r="0.32" fill=${g} />` : Lt}
            ${d ? $t`<circle cx=${f} cy=${-m} r="0.21" fill="none" stroke="#38bdf8" stroke-width="0.05" />` : Lt}
            <circle cx=${f} cy=${-m} r="0.13" fill=${p} stroke="#fff" stroke-width="0.03" />
            <circle cx=${f} cy=${-m} r="0.28" fill="transparent" />
          </g>
        `;
  })}
    </svg>
  `;
}
function $0(i) {
  var e;
  const t = (e = i.attributes) == null ? void 0 : e.entity_id;
  return Array.isArray(t) && t.length > 0;
}
function W0(i, t) {
  var n, s;
  if (!i) return null;
  const e = (n = i.entities) == null ? void 0 : n[t];
  if (e != null && e.area_id)
    return e.area_id;
  if (e != null && e.device_id) {
    const r = (s = i.devices) == null ? void 0 : s[e.device_id];
    if (r != null && r.area_id)
      return r.area_id;
  }
  return null;
}
function X0(i, t = {}) {
  var s, r;
  if (!i) return [];
  const e = t.includeGroups ?? !1, n = [];
  for (const a of Object.values(i.states)) {
    if (!a.entity_id.startsWith("light.")) continue;
    const o = $0(a);
    if (!e && o) continue;
    const l = W0(i, a.entity_id);
    if (t.areaId && l !== t.areaId)
      continue;
    const c = l ? ((r = (s = i.areas) == null ? void 0 : s[l]) == null ? void 0 : r.name) ?? l : null;
    n.push({
      entityId: a.entity_id,
      name: a.attributes.friendly_name ?? a.entity_id,
      areaId: l,
      areaName: c,
      isGroup: o,
      supportedColorModes: a.attributes.supported_color_modes ?? [],
      state: a.state
    });
  }
  return n.sort((a, o) => a.name.localeCompare(o.name, "de"));
}
const Dc = [
  ["bulb", "Lampe / Birne"],
  ["floor_lamp", "Stehlampe (Schirm)"],
  ["floor_strip", "Stehlampe (LED-Säule)"],
  ["led_strip", "LED-Strip (Band)"],
  ["spot", "Spot / Strahler (Kegel)"],
  ["table_lamp", "Tisch- / Bodenlampe"],
  ["ceiling", "Deckenleuchte / Panel"]
], Y0 = [
  ["couch", "Couch (Gerade)"],
  ["couch_l", "Couch (L-Form)"],
  ["couch_u", "Couch (U-Form)"],
  ["wardrobe", "Schrank / Regal"],
  ["sideboard", "Sideboard / Lowboard"],
  ["tv", "TV / Leinwand"],
  ["table", "Tisch / Couchtisch"],
  ["desk", "Schreibtisch"],
  ["bed", "Bett"],
  ["custom_box", "Freier Block"]
];
function q0(i, t, e, n, s) {
  return St`
    <div class="edit-panel">
      <div class="edit-tabs">
        ${[
    ["rooms", "Räume", "lights"],
    ["floor", "Raum & Grundriss", "floor"],
    ["furniture", "Möbel & Couch", "furniture"],
    ["lights", "Lichter & Design", "lights"],
    ["backup", "Export / Import", "lights"]
  ].map(
    ([r, a, o]) => St`
            <button
              type="button"
              class="mini-tab ${n.activeTab === r ? "active" : ""}"
              @click=${() => s.onSelectTab(r, o)}
            >
              ${a}
            </button>
          `
  )}
      </div>

      ${n.activeTab === "rooms" ? j0(i, t, e, s) : n.activeTab === "floor" ? Z0(t, n, s) : n.activeTab === "furniture" ? K0(t, n, s) : n.activeTab === "lights" ? J0(t, e, n, s) : Q0(i, n, s)}
    </div>
  `;
}
function j0(i, t, e, n) {
  const s = Object.values((e == null ? void 0 : e.areas) ?? {}).sort(
    (o, l) => o.name.localeCompare(l.name, "de")
  ), r = () => {
    const o = i.rooms.length + 1, l = `raum_${Date.now().toString(36)}`, c = {
      id: l,
      name: `Raum ${o}`,
      height_m: 2.5,
      floor_polygon: Ea(4.5, 4),
      camera_pov: { position: [2.25, 3.2, 1.2], target: [2.25, 0.3, 1] },
      furniture: [],
      lights: []
    };
    n.onUpdateConfig({ ...i, rooms: [...i.rooms, c] }, l), n.onNotify("ok", `Neuer Raum "${c.name}" angelegt.`);
  }, a = () => {
    if (i.rooms.length <= 1) {
      n.onNotify("warn", "Mindestens ein Raum muss erhalten bleiben.");
      return;
    }
    const o = i.rooms.filter((l) => l.id !== t.id);
    n.onUpdateConfig(
      {
        ...i,
        default_room_id: i.default_room_id === t.id ? o[0].id : i.default_room_id,
        rooms: o
      },
      o[0].id
    );
  };
  return St`
    <div class="edit-grid">
      <label>
        Raumname
        <input
          type="text"
          .value=${t.name}
          @input=${(o) => {
    const l = o.target.value;
    n.onUpdateRoom((c) => ({ ...c, name: l }));
  }}
        />
      </label>
      <label>
        Deckenhöhe (m)
        <input
          type="number"
          step="0.1"
          min="1.8"
          max="6.0"
          .value=${String(t.height_m)}
          @change=${(o) => {
    const l = Number(o.target.value);
    l >= 1.8 && n.onUpdateRoom((c) => ({ ...c, height_m: l }));
  }}
        />
      </label>
      <label>
        HA-Bereich (area_id)
        <select
          .value=${t.area_id ?? ""}
          @change=${(o) => {
    const l = o.target.value || void 0;
    n.onUpdateRoom((c) => ({ ...c, area_id: l }));
  }}
        >
          <option value="">– Kein fester Bereich –</option>
          ${s.map((o) => St`<option value=${o.area_id}>${o.name} (${o.area_id})</option>`)}
        </select>
      </label>
      <div class="edit-actions-row">
        <button type="button" class="action-btn primary" @click=${r}>+ Neuer Raum</button>
        <button type="button" class="action-btn danger" @click=${a}>Raum löschen</button>
      </div>
    </div>
  `;
}
function Z0(i, t, e) {
  var r, a;
  const n = t.sketchPoints.length > 0;
  return St`
    <div class="edit-stack">
      <div class="modes-badge">
        Ziehe die orangen Eckpunkte in der 2D-Draufsicht (0,25m-Raster) oder nutze Vorlagen,
        Skizzen-Modus, Innenwände &amp; Fenster/Türen:
      </div>

      <div class="edit-actions-row">
        <button
          type="button"
          class="action-btn"
          @click=${() => e.onUpdateRoom((o) => ({ ...o, floor_polygon: Ea(5.2, 4.6) }))}
        >
          Rechteck
        </button>
        <button
          type="button"
          class="action-btn"
          @click=${() => e.onUpdateRoom((o) => ({ ...o, floor_polygon: mu(5.5, 4.5, 2, 2) }))}
        >
          L-Form
        </button>
        <button
          type="button"
          class="action-btn"
          @click=${() => e.onUpdateRoom((o) => ({
    ...o,
    floor_polygon: gu(4.5, 4.5, 3.5, 3.5, 0.5)
  }))}
        >
          2 Räume kombiniert
        </button>
      </div>

      <div class="edit-actions-row">
        ${n ? St`
              <button type="button" class="action-btn primary" @click=${() => {
    if (t.sketchPoints.length < 3) {
      e.onNotify("warn", "Bitte mindestens 3 Punkte in der 2D-Draufsicht antippen.");
      return;
    }
    const o = t.sketchPoints;
    e.onUpdateRoom((l) => ({ ...l, floor_polygon: o })), e.onSetState({ sketchPoints: [] }), e.onNotify("ok", `Grundriss mit ${o.length} Ecken übernommen.`);
  }}>
                Skizze übernehmen (${t.sketchPoints.length} Pkt)
              </button>
              <button
                type="button"
                class="action-btn"
                @click=${() => e.onSetState({ sketchPoints: [] })}
              >
                Abbrechen
              </button>
            ` : St`
              <button
                type="button"
                class="action-btn primary"
                @click=${() => {
    e.onSetState({
      editTool: "floor",
      sketchPoints: [{ x: 0, y: 0 }]
    }), e.onNotify(
      "ok",
      "Skizzier-Modus aktiv: Tippe Ecken nacheinander in die 2D-Draufsicht."
    );
  }}
              >
                Grundriss neu skizzieren
              </button>
            `}
        <label class="inline-check">
          <input
            type="checkbox"
            .checked=${t.orthogonalSketch}
            @change=${(o) => e.onSetState({ orthogonalSketch: o.target.checked })}
          />
          90°-Snap
        </label>
        <button
          type="button"
          class="action-btn"
          @click=${() => e.onUpdateRoom((o) => ({
    ...o,
    inner_walls: [...o.inner_walls ?? [], { from: [2.5, 0], to: [2.5, 1.8] }]
  }))}
        >
          + Innenwand
        </button>
        <button
          type="button"
          class="action-btn"
          @click=${() => e.onUpdateRoom((o) => ({
    ...o,
    wall_features: [
      ...o.wall_features ?? [],
      { id: `win_${Date.now().toString(36)}`, kind: "window", from: [0, 1.2], to: [0, 2.8] }
    ]
  }))}
        >
          + Fenster
        </button>
        <button
          type="button"
          class="action-btn"
          @click=${() => e.onUpdateRoom((o) => ({
    ...o,
    wall_features: [
      ...o.wall_features ?? [],
      { id: `door_${Date.now().toString(36)}`, kind: "door", from: [4.2, 0], to: [5.1, 0] }
    ]
  }))}
        >
          + Tür
        </button>
      </div>

      <div class="edit-grid">
        <label>
          Bodenfarbe
          <input
            type="color"
            .value=${((r = i.theme) == null ? void 0 : r.floor_color) ?? "#1d222c"}
            @input=${(o) => {
    const l = o.target.value;
    e.onUpdateRoom((c) => ({ ...c, theme: { ...c.theme, floor_color: l } }));
  }}
          />
        </label>
        <label>
          Wandfarbe
          <input
            type="color"
            .value=${((a = i.theme) == null ? void 0 : a.wall_color) ?? "#334155"}
            @input=${(o) => {
    const l = o.target.value;
    e.onUpdateRoom((c) => ({ ...c, theme: { ...c.theme, wall_color: l } }));
  }}
          />
        </label>
      </div>

      ${(i.wall_features ?? []).length > 0 ? St`
            <div class="edit-list">
              ${(i.wall_features ?? []).map(
    (o) => St`
                  <div class="edit-list-row">
                    <span>
                      ${o.kind === "window" ? "Fenster" : "Tür"}: [${o.from[0]},${o.from[1]}] → [
                      ${o.to[0]},${o.to[1]}]
                    </span>
                    <button
                      type="button"
                      class="mini-tab"
                      @click=${() => e.onUpdateRoom((l) => ({
      ...l,
      wall_features: (l.wall_features ?? []).filter((c) => c.id !== o.id)
    }))}
                    >
                      Entfernen
                    </button>
                  </div>
                `
  )}
            </div>
          ` : Lt}

      <div class="edit-list">
        ${i.floor_polygon.map(
    (o, l) => St`
            <div class="edit-list-row">
              <span>Ecke ${l + 1}: (${o.x.toFixed(2)}m, ${o.y.toFixed(2)}m)</span>
              <div class="subview-tabs">
                <button
                  type="button"
                  class="mini-tab"
                  @click=${() => e.onUpdateRoom((c) => {
      const h = c.floor_polygon[(l + 1) % c.floor_polygon.length], u = {
        x: Math.round((o.x + h.x) / 2 * 4) / 4,
        y: Math.round((o.y + h.y) / 2 * 4) / 4
      }, d = [...c.floor_polygon];
      return d.splice(l + 1, 0, u), { ...c, floor_polygon: d };
    })}
                >
                  + Ecke danach
                </button>
                <button
                  type="button"
                  class="mini-tab"
                  ?disabled=${i.floor_polygon.length <= 3}
                  @click=${() => e.onUpdateRoom((c) => ({
      ...c,
      floor_polygon: vu(c.floor_polygon, l)
    }))}
                >
                  ×
                </button>
              </div>
            </div>
          `
  )}
      </div>
    </div>
  `;
}
function K0(i, t, e) {
  const n = (a, o, l, c = {}) => {
    const h = `${a}_${Date.now().toString(36)}`, u = {
      id: h,
      kind: a,
      label: o,
      position: [2.2, 2.2, l[2] / 2],
      size: l,
      rotation_deg: 0,
      ...c
    };
    e.onUpdateRoom((d) => ({ ...d, furniture: [...d.furniture, u] })), e.onSetState({ selectedFurnitureId: h, editTool: "furniture" });
  }, s = i.furniture.find((a) => a.id === t.selectedFurnitureId) ?? i.furniture[0], r = (a) => {
    s && e.onUpdateRoom((o) => ({
      ...o,
      furniture: o.furniture.map((l) => l.id === s.id ? a(l) : l)
    }));
  };
  return St`
    <div class="edit-stack">
      <div class="edit-actions-row">
        <button
          type="button"
          class="mini-tab ${t.editTool === "furniture" ? "active" : ""}"
          @click=${() => e.onSetState({ editTool: "furniture" })}
        >
          Möbel verschieben
        </button>
        <button
          type="button"
          class="mini-tab ${t.editTool === "camera" ? "active" : ""}"
          @click=${() => e.onSetState({ editTool: "camera" })}
        >
          Couch-Kamera (POV) setzen
        </button>
      </div>

      <div class="edit-actions-row">
        <button type="button" class="action-btn" @click=${() => n("couch", "Couch", [2.4, 0.95, 0.85])}>
          + Couch
        </button>
        <button
          type="button"
          class="action-btn"
          @click=${() => n("couch_l", "L-Couch", [2.7, 0.95, 0.85], {
    l_side: "left",
    wing_width_m: 0.95,
    wing_depth_m: 1.25
  })}
        >
          + L-Couch
        </button>
        <button
          type="button"
          class="action-btn"
          @click=${() => n("couch_u", "U-Couch", [3.1, 0.95, 0.85], {
    wing_width_m: 0.9,
    wing_depth_m: 1.2
  })}
        >
          + U-Couch
        </button>
        <button type="button" class="action-btn" @click=${() => n("wardrobe", "Schrank", [1.6, 0.6, 2.1])}>
          + Schrank
        </button>
        <button type="button" class="action-btn" @click=${() => n("sideboard", "Sideboard", [1.8, 0.45, 0.65])}>
          + Sideboard
        </button>
        <button type="button" class="action-btn" @click=${() => n("tv", "TV / Leinwand", [1.8, 0.1, 1])}>
          + TV
        </button>
        <button type="button" class="action-btn" @click=${() => n("table", "Tisch", [1.2, 0.75, 0.45])}>
          + Tisch
        </button>
      </div>

      <div class="edit-list">
        ${i.furniture.map(
    (a) => St`
            <div
              class="edit-list-row"
              style=${(s == null ? void 0 : s.id) === a.id ? "border-color:#38bdf8" : ""}
            >
              <button
                type="button"
                class="mini-tab ${(s == null ? void 0 : s.id) === a.id ? "active" : ""}"
                @click=${() => e.onSetState({ selectedFurnitureId: a.id })}
              >
                ${a.label ?? a.kind}
              </button>
              <div class="subview-tabs">
                <button
                  type="button"
                  class="mini-tab"
                  @click=${() => e.onUpdateRoom((o) => ({
      ...o,
      furniture: o.furniture.map(
        (l) => l.id === a.id ? { ...l, rotation_deg: ((l.rotation_deg ?? 0) + 45) % 360 } : l
      )
    }))}
                >
                  +45°
                </button>
                <button
                  type="button"
                  class="mini-tab"
                  @click=${() => e.onUpdateRoom((o) => ({
      ...o,
      furniture: o.furniture.filter((l) => l.id !== a.id)
    }))}
                >
                  ×
                </button>
              </div>
            </div>
          `
  )}
      </div>

      ${s ? St`
            <div class="edit-grid">
              <label>
                Möbel-Form
                <select
                  .value=${s.kind}
                  @change=${(a) => {
    const o = a.target.value;
    r((l) => ({ ...l, kind: o }));
  }}
                >
                  ${Y0.map(
    ([a, o]) => St`<option value=${a}>${o}</option>`
  )}
                </select>
              </label>
              <label>
                Bezeichnung
                <input
                  type="text"
                  .value=${s.label ?? ""}
                  @input=${(a) => r((o) => ({ ...o, label: a.target.value }))}
                />
              </label>
              <label>
                Breite (m): ${s.size[0].toFixed(2)}
                <input
                  type="number"
                  step="0.1"
                  min="0.3"
                  max="6"
                  .value=${String(s.size[0])}
                  @change=${(a) => {
    const o = Math.max(0.3, Number(a.target.value));
    r((l) => ({ ...l, size: [o, l.size[1], l.size[2]] }));
  }}
                />
              </label>
              <label>
                Tiefe (m): ${s.size[1].toFixed(2)}
                <input
                  type="number"
                  step="0.05"
                  min="0.05"
                  max="4"
                  .value=${String(s.size[1])}
                  @change=${(a) => {
    const o = Math.max(0.05, Number(a.target.value));
    r((l) => ({ ...l, size: [l.size[0], o, l.size[2]] }));
  }}
                />
              </label>
              <label>
                Höhe (m): ${s.size[2].toFixed(2)}
                <input
                  type="number"
                  step="0.05"
                  min="0.1"
                  max="3"
                  .value=${String(s.size[2])}
                  @change=${(a) => {
    const o = Math.max(0.1, Number(a.target.value));
    r((l) => ({
      ...l,
      size: [l.size[0], l.size[1], o],
      position: [l.position[0], l.position[1], o / 2]
    }));
  }}
                />
              </label>
              <label>
                Drehung (°): ${s.rotation_deg ?? 0}°
                <input
                  type="number"
                  step="15"
                  min="0"
                  max="345"
                  .value=${String(s.rotation_deg ?? 0)}
                  @change=${(a) => r((o) => ({
    ...o,
    rotation_deg: Number(a.target.value) % 360
  }))}
                />
              </label>
              <label>
                Farbe
                <input
                  type="color"
                  .value=${s.color ?? "#3b4454"}
                  @input=${(a) => r((o) => ({ ...o, color: a.target.value }))}
                />
              </label>
              ${s.kind === "couch_l" ? St`
                    <label>
                      Schenkel-Seite
                      <select
                        .value=${s.l_side ?? "left"}
                        @change=${(a) => r((o) => ({
    ...o,
    l_side: a.target.value
  }))}
                      >
                        <option value="left">Links</option>
                        <option value="right">Rechts</option>
                      </select>
                    </label>
                  ` : Lt}
              ${s.kind === "couch_l" || s.kind === "couch_u" ? St`
                    <label>
                      Schenkel-Länge (m)
                      <input
                        type="number"
                        step="0.1"
                        min="0.6"
                        max="3"
                        .value=${String(s.wing_depth_m ?? 1.15)}
                        @change=${(a) => r((o) => ({
    ...o,
    wing_depth_m: Number(a.target.value)
  }))}
                      />
                    </label>
                  ` : Lt}
            </div>
          ` : Lt}
    </div>
  `;
}
function J0(i, t, e, n) {
  var c;
  const s = X0(t, {
    areaId: e.areaFilterOnly ? i.area_id : void 0,
    includeGroups: e.includeGroups
  }), r = e.newLightEntityId || ((c = s[0]) == null ? void 0 : c.entityId) || "", a = () => {
    if (!r) {
      n.onNotify("warn", "Keine Licht-Entity ausgewählt.");
      return;
    }
    if (i.lights.some((p) => p.entity_id === r)) {
      n.onNotify("warn", `${r} ist in diesem Raum bereits platziert.`);
      return;
    }
    const h = s.find((p) => p.entityId === r);
    let u;
    e.newLightType === "vertical_column" ? u = { type: "vertical_column", from: [2, 1, 0.3], to: [2, 1, 1.55] } : e.newLightType === "polyline" ? u = {
      type: "polyline",
      points: [
        [0.5, 3.5, 0.9],
        [0.5, 4.2, 0.9],
        [2.5, 4.2, 0.9]
      ]
    } : u = { type: "point", position: [2, 1.5, 1] };
    const d = {
      entity_id: r,
      label: h == null ? void 0 : h.name,
      visual_style: { kind: e.newLightVisualKind, scale: 1, rotation_deg: 0 },
      geometry: u
    };
    n.onUpdateRoom((p) => ({ ...p, lights: [...p.lights, d] })), n.onSetState({ selectedEditLightId: r }), n.onNotify("ok", `${(h == null ? void 0 : h.name) ?? r} hinzugefügt – in Drauf-/Frontalansicht ziehen!`);
  }, o = i.lights.find((h) => h.entity_id === e.selectedEditLightId) ?? i.lights[0], l = (h) => {
    o && n.onUpdateRoom((u) => ({
      ...u,
      lights: u.lights.map((d) => d.entity_id === o.entity_id ? h(d) : d)
    }));
  };
  return St`
    <div class="edit-stack">
      <div class="modes-badge">
        Ziehe Lichter in der <strong>Draufsicht</strong> (X/Y) und in der{" "}
        <strong>Frontalansicht</strong> (Höhe Z) und wähle unten das Lampen-Design.
      </div>

      <div class="edit-actions-row">
        <label class="inline-check">
          <input
            type="checkbox"
            .checked=${e.areaFilterOnly}
            ?disabled=${!i.area_id}
            @change=${(h) => n.onSetState({ areaFilterOnly: h.target.checked })}
          />
          Nur Bereich "${i.area_id ?? "alle"}"
        </label>
        <label class="inline-check">
          <input
            type="checkbox"
            .checked=${e.includeGroups}
            @change=${(h) => n.onSetState({ includeGroups: h.target.checked })}
          />
          Gruppen anzeigen
        </label>
      </div>

      <div class="edit-grid">
        <label>
          HA-Lichtquelle (entity_id)
          <select
            .value=${r}
            @change=${(h) => n.onSetState({ newLightEntityId: h.target.value })}
          >
            ${s.length === 0 ? St`<option value="">Keine passenden Lampen gefunden</option>` : s.map(
    (h) => St`
                    <option value=${h.entityId}>
                      ${h.name} [${h.supportedColorModes.join(",") || "onoff"}]
                    </option>
                  `
  )}
          </select>
        </label>
        <label>
          Geometrie
          <select
            .value=${e.newLightType}
            @change=${(h) => {
    const u = h.target.value, d = u === "polyline" ? "led_strip" : u === "vertical_column" ? "floor_strip" : "bulb";
    n.onSetState({ newLightType: u, newLightVisualKind: d });
  }}
          >
            <option value="point">Punkt / Einzel-Leuchte</option>
            <option value="vertical_column">Vertikale Säule</option>
            <option value="polyline">3D-Pfad / Über Eck</option>
          </select>
        </label>
        <label>
          Lampen-Design
          <select
            .value=${e.newLightVisualKind}
            @change=${(h) => n.onSetState({
    newLightVisualKind: h.target.value
  })}
          >
            ${Dc.map(
    ([h, u]) => St`<option value=${h}>${u}</option>`
  )}
          </select>
        </label>
        <button type="button" class="action-btn primary" @click=${a}>+ Licht platzieren</button>
      </div>

      <div class="edit-list">
        ${i.lights.map((h) => {
    const u = Jn(h), d = (o == null ? void 0 : o.entity_id) === h.entity_id;
    return St`
            <div class="edit-list-row" style=${d ? "border-color:#38bdf8" : ""}>
              <button
                type="button"
                class="mini-tab ${d ? "active" : ""}"
                @click=${() => n.onSetState({ selectedEditLightId: h.entity_id })}
              >
                ${h.label ?? h.entity_id} · [${u.kind}]
              </button>
              <div class="subview-tabs">
                ${h.geometry.type === "polyline" ? St`
                      <button
                        type="button"
                        class="mini-tab"
                        @click=${() => n.onUpdateRoom((p) => ({
      ...p,
      lights: p.lights.map((g) => {
        if (g.entity_id !== h.entity_id || g.geometry.type !== "polyline")
          return g;
        const _ = g.geometry.points[g.geometry.points.length - 1] ?? [1, 1, 0.9];
        return {
          ...g,
          geometry: {
            ...g.geometry,
            points: [...g.geometry.points, [_[0] + 0.5, _[1], _[2]]]
          }
        };
      })
    }))}
                      >
                        + Pkt
                      </button>
                    ` : Lt}
                <button
                  type="button"
                  class="mini-tab"
                  @click=${() => n.onUpdateRoom((p) => ({
      ...p,
      lights: p.lights.filter((g) => g.entity_id !== h.entity_id)
    }))}
                >
                  ×
                </button>
              </div>
            </div>
          `;
  })}
      </div>

      ${o ? (() => {
    const h = Jn(o);
    return St`
              <div class="edit-grid">
                <label>
                  Design für "${o.label ?? o.entity_id}"
                  <select
                    .value=${h.kind}
                    @change=${(u) => {
      const d = u.target.value;
      l((p) => ({
        ...p,
        visual_style: { ...Jn(p), kind: d }
      }));
    }}
                  >
                    ${Dc.map(
      ([u, d]) => St`<option value=${u}>${d}</option>`
    )}
                  </select>
                </label>
                <label>
                  Name / Label
                  <input
                    type="text"
                    .value=${o.label ?? ""}
                    @input=${(u) => l((d) => ({
      ...d,
      label: u.target.value
    }))}
                  />
                </label>
                <label>
                  Gruppe-Tag (z. B. Front)
                  <input
                    type="text"
                    .value=${o.group_tag ?? ""}
                    @input=${(u) => l((d) => ({
      ...d,
      group_tag: u.target.value || void 0
    }))}
                  />
                </label>
                <label>
                  Größe: ${(h.scale ?? 1).toFixed(1)}×
                  <input
                    type="range"
                    min="0.6"
                    max="1.8"
                    step="0.1"
                    .value=${String(h.scale ?? 1)}
                    @input=${(u) => {
      const d = Number(u.target.value);
      l((p) => ({
        ...p,
        visual_style: { ...Jn(p), scale: d }
      }));
    }}
                  />
                </label>
                <label>
                  Ausrichtung (°): ${h.rotation_deg ?? 0}°
                  <input
                    type="range"
                    min="0"
                    max="345"
                    step="15"
                    .value=${String(h.rotation_deg ?? 0)}
                    @input=${(u) => {
      const d = Number(u.target.value);
      l((p) => ({
        ...p,
        visual_style: { ...Jn(p), rotation_deg: d }
      }));
    }}
                  />
                </label>
              </div>
            `;
  })() : Lt}
    </div>
  `;
}
function Q0(i, t, e) {
  const n = JSON.stringify(i, null, 2);
  return St`
    <div class="edit-stack">
      <div class="edit-actions-row">
        <button type="button" class="action-btn" @click=${async () => {
    var o;
    try {
      await ((o = navigator.clipboard) == null ? void 0 : o.writeText(n)), e.onNotify("ok", "Card-Konfiguration (JSON) in Zwischenablage kopiert.");
    } catch {
      e.onSetState({ importText: n }), e.onNotify("warn", "Zwischenablage blockiert – JSON im Textfeld angezeigt.");
    }
  }}>JSON kopieren</button>
        <button type="button" class="action-btn" @click=${async () => {
    var l, c;
    const o = [
      "title: Licht-Studio",
      "path: licht-studio",
      "subview: true",
      "back_path: /lovelace/home",
      "type: panel",
      "cards:",
      "  - type: custom:hoas-light-widget",
      `    default_room_id: ${i.default_room_id ?? ((l = i.rooms[0]) == null ? void 0 : l.id) ?? "wohnzimmer"}`
    ].join(`
`);
    try {
      await ((c = navigator.clipboard) == null ? void 0 : c.writeText(o)), e.onNotify("ok", "Subview-YAML (Panel-Modus) in Zwischenablage kopiert.");
    } catch {
      e.onSetState({ importText: o }), e.onNotify("warn", "Zwischenablage blockiert – Subview-YAML im Textfeld angezeigt.");
    }
  }}>
          Subview-YAML kopieren
        </button>
        <button
          type="button"
          class="action-btn"
          @click=${() => e.onSetState({ importText: n })}
        >
          Aktuelle Config laden
        </button>
        <button type="button" class="action-btn primary" @click=${() => {
    var o;
    try {
      const l = JSON.parse(t.importText), c = bs(l);
      e.onUpdateConfig(c, (o = c.rooms[0]) == null ? void 0 : o.id), e.onNotify("ok", `Konfiguration mit ${c.rooms.length} Raum/Räumen importiert.`);
    } catch (l) {
      e.onNotify(
        "error",
        `Ungültiges JSON: ${l instanceof Error ? l.message : String(l)}`
      );
    }
  }}>JSON importieren</button>
      </div>
      <textarea
        rows="6"
        placeholder="JSON-Konfiguration hier einfügen zum Importieren oder Anzeigen…"
        .value=${t.importText}
        @input=${(o) => e.onSetState({ importText: o.target.value })}
      ></textarea>
    </div>
  `;
}
const ga = [
  Sa[2],
  // 2700K Warm
  si[2],
  // Bernstein
  si[17],
  // Himmelblau
  si[13]
  // Amethyst
];
function tv(i) {
  const t = i.hue_offset_deg ?? 0, e = i.saturation_scale ?? 1, n = i.brightness_scale ?? 1;
  return t === 0 && Math.abs(e - 1) < 1e-3 && Math.abs(n - 1) < 1e-3 && i.warm_white_hue_deg === void 0 && i.warm_white_saturation_pct === void 0;
}
function ev(i) {
  if (tv(i))
    return;
  const t = {};
  return i.hue_offset_deg && (t.hue_offset_deg = i.hue_offset_deg), i.saturation_scale !== void 0 && Math.abs(i.saturation_scale - 1) >= 1e-3 && (t.saturation_scale = Math.round(i.saturation_scale * 100) / 100), i.brightness_scale !== void 0 && Math.abs(i.brightness_scale - 1) >= 1e-3 && (t.brightness_scale = Math.round(i.brightness_scale * 100) / 100), i.warm_white_hue_deg !== void 0 && (t.warm_white_hue_deg = i.warm_white_hue_deg), i.warm_white_saturation_pct !== void 0 && (t.warm_white_saturation_pct = i.warm_white_saturation_pct), Object.keys(t).length > 0 ? t : void 0;
}
function nv(i, t, e, n) {
  if (!e.open) return Lt;
  const s = i.lights, r = t == null ? void 0 : t.states[e.targetEntityId], a = (r == null ? void 0 : r.attributes.supported_color_modes) ?? [], o = a.includes("hs") && !a.includes("color_temp"), l = (h) => {
    var u, d;
    return ((u = s.find((p) => p.entity_id === h)) == null ? void 0 : u.label) ?? ((d = t == null ? void 0 : t.states[h]) == null ? void 0 : d.attributes.friendly_name) ?? h;
  }, c = (h) => {
    const u = { ...e.draft, ...h };
    n.onChangeState({ draft: u }), n.onLivePreview(e.referenceEntityId, e.targetEntityId, e.testColor, u);
  };
  return St`
    <div class="modal-backdrop" @click=${() => n.onClose(!0)}>
      <div class="modal wizard-modal" @click=${(h) => h.stopPropagation()}>
        <div class="control-header">
          <h3>Farb-Abgleich-Assistent · ${i.name}</h3>
          <span class="modes-badge">Schritt ${e.step} / 2</span>
        </div>

        ${e.step === 1 ? St`
              <div class="modes-badge">
                Wähle eine <strong>Referenzlampe</strong> (z. B. Hue) und die{" "}
                <strong>Ziellampe</strong>, deren Farbton und Helligkeit optisch angeglichen werden
                sollen.
              </div>
              <label>
                Referenzlampe (Soll-Farbton)
                <select
                  .value=${e.referenceEntityId}
                  @change=${(h) => n.onChangeState({
    referenceEntityId: h.target.value
  })}
                >
                  ${s.map(
    (h) => St`<option value=${h.entity_id}>${l(h.entity_id)}</option>`
  )}
                </select>
              </label>

              <label>
                Ziellampe (wird kalibriert)
                <select
                  .value=${e.targetEntityId}
                  @change=${(h) => n.onChangeState({
    targetEntityId: h.target.value
  })}
                >
                  ${s.map(
    (h) => St`<option value=${h.entity_id}>${l(h.entity_id)}</option>`
  )}
                </select>
              </label>

              <div class="modal-footer">
                <button type="button" class="action-btn" @click=${() => n.onClose(!0)}>
                  Abbrechen
                </button>
                <button
                  type="button"
                  class="action-btn primary"
                  ?disabled=${!e.targetEntityId}
                  @click=${() => {
    n.onChangeState({ step: 2 }), n.onLivePreview(
      e.referenceEntityId,
      e.targetEntityId,
      e.testColor,
      e.draft
    );
  }}
                >
                  Weiter &amp; Live testen
                </button>
              </div>
            ` : St`
              <div class="modes-badge">
                Referenz: <strong>${l(e.referenceEntityId)}</strong> → Ziel:{" "}
                <strong>${l(e.targetEntityId)}</strong>
              </div>

              <div class="palette-section">
                <div class="palette-label"><span>1. Testfarbe live an beide senden</span></div>
                <div class="swatch-row">
                  ${ga.map(
    (h) => St`
                      <button
                        type="button"
                        class="mini-tab ${e.testColor.id === h.id ? "active" : ""}"
                        @click=${() => {
      n.onChangeState({ testColor: h }), n.onLivePreview(
        e.referenceEntityId,
        e.targetEntityId,
        h,
        e.draft
      );
    }}
                      >
                        <span
                          class="light-dot"
                          style="display:inline-block;width:8px;height:8px;margin-right:4px;background:${h.hex}"
                        ></span>
                        ${h.label}
                      </button>
                    `
  )}
                </div>
              </div>

              <div class="wizard-sliders">
                <label>
                  Farbton-Verschiebung: ${e.draft.hue_offset_deg ?? 0}°
                  <input
                    type="range"
                    min="-60"
                    max="60"
                    step="1"
                    .value=${String(e.draft.hue_offset_deg ?? 0)}
                    @input=${(h) => c({ hue_offset_deg: Number(h.target.value) })}
                  />
                </label>

                <label>
                  Sättigungs-Faktor: ${Math.round((e.draft.saturation_scale ?? 1) * 100)}%
                  <input
                    type="range"
                    min="50"
                    max="150"
                    step="2"
                    .value=${String(Math.round((e.draft.saturation_scale ?? 1) * 100))}
                    @input=${(h) => c({
    saturation_scale: Number(h.target.value) / 100
  })}
                  />
                </label>

                <label>
                  Helligkeits-Faktor: ${Math.round((e.draft.brightness_scale ?? 1) * 100)}%
                  <input
                    type="range"
                    min="40"
                    max="150"
                    step="2"
                    .value=${String(Math.round((e.draft.brightness_scale ?? 1) * 100))}
                    @input=${(h) => c({
    brightness_scale: Number(h.target.value) / 100
  })}
                  />
                </label>

                ${o ? St`
                      <label>
                        Warmweiß-Farbton (ohne Kelvin):{" "}
                        ${e.draft.warm_white_hue_deg ?? 30}°
                        <input
                          type="range"
                          min="15"
                          max="55"
                          step="1"
                          .value=${String(e.draft.warm_white_hue_deg ?? 30)}
                          @input=${(h) => c({
    warm_white_hue_deg: Number(h.target.value)
  })}
                        />
                      </label>
                      <label>
                        Warmweiß-Sättigung:{" "}
                        ${e.draft.warm_white_saturation_pct ?? 55}%
                        <input
                          type="range"
                          min="10"
                          max="85"
                          step="1"
                          .value=${String(e.draft.warm_white_saturation_pct ?? 55)}
                          @input=${(h) => c({
    warm_white_saturation_pct: Number(
      h.target.value
    )
  })}
                        />
                      </label>
                    ` : Lt}
              </div>

              <div class="modal-footer">
                <button
                  type="button"
                  class="action-btn"
                  @click=${() => n.onChangeState({ step: 1 })}
                >
                  Zurück
                </button>
                <button
                  type="button"
                  class="action-btn"
                  @click=${() => {
    const h = {};
    n.onChangeState({ draft: h }), n.onLivePreview(
      e.referenceEntityId,
      e.targetEntityId,
      e.testColor,
      h
    );
  }}
                >
                  Reset (0)
                </button>
                <button
                  type="button"
                  class="action-btn primary"
                  @click=${() => {
    n.onSaveProfile(e.targetEntityId, ev(e.draft)), n.onClose(!1);
  }}
                >
                  Profil speichern
                </button>
              </div>
            `}
      </div>
    </div>
  `;
}
const Rh = Oc`
  :host {
    display: block;
    box-sizing: border-box;
    --hlw-bg: var(--ha-card-background, var(--card-background-color, #1c1c1e));
    --hlw-surface: var(--secondary-background-color, #262629);
    --hlw-text: var(--primary-text-color, #f2f2f7);
    --hlw-muted: var(--secondary-text-color, #a1a1aa);
    --hlw-accent: var(--primary-color, #03a9f4);
    --hlw-selected: #38bdf8;
    --hlw-border: var(--divider-color, rgba(255, 255, 255, 0.12));
    --hlw-radius: var(--ha-card-border-radius, 12px);
  }

  ha-card {
    background: var(--hlw-bg);
    color: var(--hlw-text);
    border-radius: var(--hlw-radius);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 100%;
    border: 1px solid var(--hlw-border);
  }

  :host([fullwidth]) {
    width: 100%;
    height: 100%;
  }

  :host([fullwidth]) ha-card {
    border: none;
    border-radius: 0;
  }

  @media (min-width: 820px) {
    :host([fullwidth]) .stage-3d {
      height: clamp(360px, 48vh, 560px);
    }
    :host([fullwidth]) .stage-2d svg {
      max-height: clamp(280px, 44vh, 520px);
    }
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 10px 12px;
    border-bottom: 1px solid var(--hlw-border);
    flex-wrap: wrap;
  }

  .room-tabs {
    display: flex;
    align-items: center;
    gap: 6px;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .room-tab {
    appearance: none;
    border: 1px solid var(--hlw-border);
    background: transparent;
    color: var(--hlw-muted);
    border-radius: 999px;
    padding: 5px 12px;
    font-size: 0.82rem;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap;
  }

  .room-tab.active {
    background: var(--hlw-accent);
    border-color: var(--hlw-accent);
    color: #fff;
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .pill-btn {
    appearance: none;
    border: 1px solid var(--hlw-border);
    background: var(--hlw-surface);
    color: var(--hlw-text);
    border-radius: 999px;
    padding: 5px 10px;
    font-size: 0.78rem;
    font-weight: 500;
    cursor: pointer;
  }

  .pill-btn.active {
    background: rgba(56, 189, 248, 0.18);
    border-color: var(--hlw-selected);
    color: var(--hlw-selected);
  }

  .pill-btn.unlocked {
    border-color: #f59e0b;
    color: #f59e0b;
  }

  .split-layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
    padding: 10px 12px;
  }

  @media (min-width: 820px) {
    .split-layout {
      grid-template-columns: 1.35fr 1fr;
      align-items: stretch;
    }
  }

  .panel {
    background: var(--hlw-surface);
    border: 1px solid var(--hlw-border);
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .panel-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 6px 10px;
    font-size: 0.76rem;
    color: var(--hlw-muted);
    border-bottom: 1px solid var(--hlw-border);
  }

  .stage-3d {
    position: relative;
    width: 100%;
    height: 235px;
    background: #0f1218;
    touch-action: none;
  }

  @media (min-width: 820px) {
    .stage-3d {
      height: 310px;
    }
  }

  .stage-3d canvas {
    display: block;
    width: 100%;
    height: 100%;
  }

  .stage-fallback {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    text-align: center;
    font-size: 0.82rem;
    color: var(--hlw-muted);
  }

  .subview-tabs {
    display: inline-flex;
    gap: 4px;
  }

  .mini-tab {
    appearance: none;
    border: 1px solid var(--hlw-border);
    background: transparent;
    color: var(--hlw-muted);
    border-radius: 6px;
    padding: 2px 8px;
    font-size: 0.72rem;
    cursor: pointer;
  }

  .mini-tab.active {
    background: var(--hlw-accent);
    border-color: var(--hlw-accent);
    color: #fff;
  }

  .stage-2d {
    padding: 10px;
    min-height: 175px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
  }

  .stage-2d svg {
    width: 100%;
    max-height: 210px;
    user-select: none;
  }

  .stage-2d.editing svg {
    touch-action: none;
  }

  .svg-light {
    cursor: pointer;
  }

  .quick-bar {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 0 12px 8px;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .quick-chip {
    appearance: none;
    border: 1px solid var(--hlw-border);
    background: transparent;
    color: var(--hlw-muted);
    border-radius: 999px;
    padding: 4px 10px;
    font-size: 0.74rem;
    cursor: pointer;
    white-space: nowrap;
  }

  .quick-chip.active {
    background: rgba(56, 189, 248, 0.16);
    border-color: var(--hlw-selected);
    color: var(--hlw-text);
  }

  .lights-strip {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    padding: 0 12px 10px;
  }

  .light-chip {
    appearance: none;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 10px;
    border-radius: 999px;
    border: 1px solid var(--hlw-border);
    background: var(--hlw-surface);
    font-size: 0.76rem;
    color: var(--hlw-text);
    cursor: pointer;
  }

  .light-chip.selected {
    border-color: var(--hlw-selected);
    box-shadow: 0 0 0 1px var(--hlw-selected);
  }

  .light-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #52525b;
    border: 1px solid rgba(255, 255, 255, 0.25);
  }

  .modes-badge {
    font-size: 0.68rem;
    color: var(--hlw-muted);
  }

  .control-dock {
    margin: 2px 12px 12px;
    padding: 10px;
    border-radius: 10px;
    background: var(--hlw-surface);
    border: 1px solid var(--hlw-border);
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .control-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    flex-wrap: wrap;
  }

  .control-title {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--hlw-text);
  }

  .control-actions {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
  }

  .action-btn {
    appearance: none;
    border: 1px solid var(--hlw-border);
    background: rgba(255, 255, 255, 0.04);
    color: var(--hlw-text);
    border-radius: 8px;
    padding: 5px 10px;
    font-size: 0.76rem;
    font-weight: 500;
    cursor: pointer;
  }

  .action-btn.primary {
    background: var(--hlw-accent);
    border-color: var(--hlw-accent);
    color: #fff;
  }

  .action-btn.danger {
    border-color: rgba(239, 68, 68, 0.5);
    color: #fca5a5;
  }

  .action-btn:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  .brightness-row {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.78rem;
    color: var(--hlw-muted);
  }

  .brightness-row input[type="range"] {
    flex: 1;
    accent-color: var(--hlw-accent);
    cursor: pointer;
  }

  .palette-section {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .palette-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.72rem;
    color: var(--hlw-muted);
  }

  .swatch-row {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .swatch-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 6px;
  }

  .swatch {
    appearance: none;
    width: 100%;
    min-width: 28px;
    height: 28px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    cursor: pointer;
    position: relative;
    padding: 0;
  }

  .swatch-row .swatch {
    width: 30px;
    height: 30px;
  }

  .swatch.active {
    outline: 2px solid #fff;
    outline-offset: 1px;
    transform: scale(1.04);
  }

  .swatch-white {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    color: var(--hlw-muted);
    font-size: 0.65rem;
  }

  .swatch-white .dot {
    width: 30px;
    height: 26px;
    border-radius: 7px;
    border: 1px solid rgba(255, 255, 255, 0.22);
  }

  .swatch-white.active .dot {
    outline: 2px solid #fff;
    outline-offset: 1px;
  }

  .banner {
    padding: 7px 10px;
    border-radius: 8px;
    font-size: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  .banner.warn {
    background: rgba(245, 158, 11, 0.14);
    border: 1px solid rgba(245, 158, 11, 0.45);
    color: #fde68a;
  }

  .banner.ok {
    background: rgba(16, 185, 129, 0.14);
    border: 1px solid rgba(16, 185, 129, 0.45);
    color: #a7f3d0;
  }

  .banner.error {
    background: rgba(239, 68, 68, 0.14);
    border: 1px solid rgba(239, 68, 68, 0.45);
    color: #fecaca;
  }

  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.65);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    z-index: 999;
  }

  .modal {
    width: 100%;
    max-width: 420px;
    background: var(--hlw-bg);
    color: var(--hlw-text);
    border: 1px solid var(--hlw-border);
    border-radius: 12px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  }

  .modal h3 {
    margin: 0;
    font-size: 0.96rem;
  }

  .modal label {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 0.78rem;
    color: var(--hlw-muted);
  }

  .modal input,
  .modal select,
  .edit-panel input,
  .edit-panel select,
  .edit-panel textarea {
    background: var(--hlw-surface);
    color: var(--hlw-text);
    border: 1px solid var(--hlw-border);
    border-radius: 8px;
    padding: 7px 10px;
    font-size: 0.82rem;
    font-family: inherit;
    box-sizing: border-box;
    width: 100%;
  }

  .edit-panel {
    margin: 2px 12px 12px;
    padding: 10px;
    border-radius: 10px;
    background: rgba(245, 158, 11, 0.06);
    border: 1px solid rgba(245, 158, 11, 0.35);
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .edit-tabs,
  .edit-actions-row {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    align-items: center;
  }

  .edit-stack {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .edit-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 8px;
    align-items: end;
  }

  .edit-grid label {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 0.74rem;
    color: var(--hlw-muted);
  }

  .inline-check {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.76rem;
    color: var(--hlw-text);
    cursor: pointer;
  }

  .inline-check input {
    width: auto;
  }

  .edit-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
    max-height: 155px;
    overflow-y: auto;
  }

  .edit-list-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 5px 8px;
    border-radius: 6px;
    background: var(--hlw-surface);
    border: 1px solid var(--hlw-border);
    font-size: 0.75rem;
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 4px;
    flex-wrap: wrap;
  }

  .wizard-modal {
    max-width: 460px;
  }

  .wizard-sliders {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .wizard-sliders input[type="range"] {
    width: 100%;
    padding: 0;
    accent-color: var(--hlw-accent);
  }

  .empty-state {
    padding: 28px 16px;
    text-align: center;
    color: var(--hlw-muted);
    font-size: 0.88rem;
  }
`;
var iv = Object.defineProperty, sv = Object.getOwnPropertyDescriptor, Is = (i, t, e, n) => {
  for (var s = n > 1 ? void 0 : n ? sv(t, e) : t, r = i.length - 1, a; r >= 0; r--)
    (a = i[r]) && (s = (n ? a(t, e, s) : a(s)) || s);
  return n && s && iv(t, e, s), s;
};
let hi = class extends ii {
  constructor() {
    super(...arguments), this._config = fs(), this._jsonDraft = "";
  }
  setConfig(i) {
    this._config = bs(i), this._jsonDraft = JSON.stringify(this._config, null, 2), this._error = void 0;
  }
  _emitConfigChanged(i) {
    this._config = i, this._jsonDraft = JSON.stringify(i, null, 2), this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: i },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _applyJsonDraft() {
    try {
      const i = JSON.parse(this._jsonDraft), t = bs(i);
      this._error = void 0, this._emitConfigChanged(t);
    } catch (i) {
      this._error = i instanceof Error ? i.message : String(i);
    }
  }
  render() {
    return St`
      <div class="edit-panel">
        <div class="control-header">
          <span class="control-title">HOAS LightWidget · Karten-Konfiguration</span>
          <button type="button" class="action-btn primary" @click=${this._applyJsonDraft}>
            Übernehmen
          </button>
        </div>
        <div class="modes-badge">
          Tipp: Öffne auf der Karte selbst das Schloss ("Gesperrt" → "Edit-Mode: Offen"), um
          Grundriss, Möbel und Lampen direkt per Drag &amp; Drop in 2D zu zeichnen und danach als
          JSON hier einzufügen.
        </div>
        <textarea
          rows="14"
          .value=${this._jsonDraft}
          @input=${(i) => this._jsonDraft = i.target.value}
        ></textarea>
        ${this._error ? St`<div class="banner error"><span>Fehler: ${this._error}</span></div>` : St``}
      </div>
    `;
  }
};
hi.styles = Rh;
Is([
  ui({ attribute: !1 })
], hi.prototype, "hass", 2);
Is([
  le()
], hi.prototype, "_config", 2);
Is([
  le()
], hi.prototype, "_jsonDraft", 2);
Is([
  le()
], hi.prototype, "_error", 2);
hi = Is([
  Ma("hoas-light-widget-editor")
], hi);
var rv = Object.defineProperty, ov = Object.getOwnPropertyDescriptor, Ki = (i, t, e, n) => {
  for (var s = n > 1 ? void 0 : n ? ov(t, e) : t, r = i.length - 1, a; r >= 0; r--)
    (a = i[r]) && (s = (n ? a(t, e, s) : a(s)) || s);
  return n && s && rv(t, e, s), s;
};
let Bn = class extends ii {
  constructor() {
    super(...arguments), this.narrow = !1, this._syncStatus = "loading", this._hasLoadedFromServer = !1;
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._saveTimer && clearTimeout(this._saveTimer);
  }
  updated(i) {
    super.updated(i), i.has("hass") && this.hass && !this._hasLoadedFromServer && (this._hasLoadedFromServer = !0, this._loadServerConfig());
    const t = this.renderRoot.querySelector("hoas-light-widget");
    t && this._loadedConfig && i.has("_loadedConfig") && t.setConfig(this._loadedConfig);
  }
  async _loadServerConfig() {
    var i;
    if (!((i = this.hass) != null && i.callWS)) {
      this._loadedConfig = fs(), this._syncStatus = "ready";
      return;
    }
    try {
      const t = await this.hass.callWS({
        type: "hoas_light_widget/get_config"
      });
      t != null && t.config && Array.isArray(t.config.rooms) && t.config.rooms.length > 0 ? this._loadedConfig = bs(t.config) : this._loadedConfig = fs(), this._syncStatus = "ready";
    } catch {
      this._loadedConfig = fs(), this._syncStatus = "error";
    }
  }
  _handleConfigChanged(i) {
    var e, n;
    const t = (e = i.detail) == null ? void 0 : e.config;
    t && (this._loadedConfig = t, (n = this.hass) != null && n.callWS && (this._saveTimer && clearTimeout(this._saveTimer), this._syncStatus = "saving", this._saveTimer = setTimeout(async () => {
      var s, r;
      try {
        await ((r = (s = this.hass) == null ? void 0 : s.callWS) == null ? void 0 : r.call(s, {
          type: "hoas_light_widget/save_config",
          config: t
        })), this._syncStatus = "ready";
      } catch {
        this._syncStatus = "error";
      }
    }, 350)));
  }
  render() {
    var e;
    const i = ((e = this.panel) == null ? void 0 : e.title) ?? "Licht-Studio", t = this._syncStatus === "loading" ? "Lade…" : this._syncStatus === "saving" ? "Speichere…" : this._syncStatus === "error" ? "Offline / Lokal" : "Auf HA gespeichert";
    return St`
      <div class="panel-topbar">
        <div class="topbar-left">
          <ha-menu-button .hass=${this.hass} .narrow=${this.narrow}></ha-menu-button>
          <span class="topbar-title">${i}</span>
        </div>
        <span class="sync-badge ${this._syncStatus}">${t}</span>
      </div>
      <div class="panel-body">
        <hoas-light-widget
          fullwidth
          .hass=${this.hass}
          @config-changed=${this._handleConfigChanged}
        ></hoas-light-widget>
      </div>
    `;
  }
};
Bn.styles = Oc`
    :host {
      display: flex;
      flex-direction: column;
      width: 100%;
      min-height: 100vh;
      box-sizing: border-box;
      background: var(--primary-background-color, #111318);
      color: var(--primary-text-color, #f2f2f7);
    }

    .panel-topbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      height: var(--header-height, 56px);
      padding: 0 16px 0 8px;
      background: var(--app-header-background-color, var(--card-background-color, #1c1c1e));
      color: var(--app-header-text-color, var(--primary-text-color, #f2f2f7));
      border-bottom: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
      box-sizing: border-box;
    }

    .topbar-left {
      display: flex;
      align-items: center;
      gap: 8px;
      min-width: 0;
    }

    .topbar-title {
      font-size: 1.1rem;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .sync-badge {
      font-size: 0.76rem;
      padding: 4px 10px;
      border-radius: 999px;
      border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.14));
      color: var(--secondary-text-color, #a1a1aa);
      white-space: nowrap;
    }

    .sync-badge.saving {
      color: #f59e0b;
      border-color: rgba(245, 158, 11, 0.45);
    }

    .sync-badge.error {
      color: #fca5a5;
      border-color: rgba(239, 68, 68, 0.45);
    }

    .panel-body {
      flex: 1;
      width: 100%;
      display: flex;
      flex-direction: column;
    }

    hoas-light-widget {
      flex: 1;
      width: 100%;
    }
  `;
Ki([
  ui({ attribute: !1 })
], Bn.prototype, "hass", 2);
Ki([
  ui({ type: Boolean })
], Bn.prototype, "narrow", 2);
Ki([
  ui({ attribute: !1 })
], Bn.prototype, "panel", 2);
Ki([
  le()
], Bn.prototype, "_loadedConfig", 2);
Ki([
  le()
], Bn.prototype, "_syncStatus", 2);
Bn = Ki([
  Ma("hoas-light-panel")
], Bn);
var av = Object.defineProperty, lv = Object.getOwnPropertyDescriptor, de = (i, t, e, n) => {
  for (var s = n > 1 ? void 0 : n ? lv(t, e) : t, r = i.length - 1, a; r >= 0; r--)
    (a = i[r]) && (s = (n ? a(t, e, s) : a(s)) || s);
  return n && s && av(t, e, s), s;
};
const Ic = "hoas-light-widget:prefs:v1";
let ae = class extends ii {
  constructor() {
    super(...arguments), this.fullwidth = !1, this._editUnlocked = !1, this._editState = {
      activeTab: "lights",
      editTool: "lights",
      sketchPoints: [],
      orthogonalSketch: !0,
      selectedFurnitureId: "",
      selectedEditLightId: "",
      areaFilterOnly: !1,
      includeGroups: !1,
      newLightEntityId: "",
      newLightType: "point",
      newLightVisualKind: "bulb",
      importText: ""
    }, this._multiSelectMode = !1, this._selectedIds = [], this._cameraPreset = "pov", this._secondaryView = "top", this._webglUnavailable = !1, this._brightnessPct = 80, this._favorites = [...pl], this._recentColors = [], this._previewOverrides = /* @__PURE__ */ new Map(), this._pendingPayloads = /* @__PURE__ */ new Map(), this._sceneModalOpen = !1, this._sceneMode = "new", this._sceneName = "", this._sceneTargetId = "", this._sceneSaving = !1, this._wizardState = {
      open: !1,
      step: 1,
      referenceEntityId: "",
      targetEntityId: "",
      testColor: ga[0],
      draft: {}
    }, this._stage3d = null, this._longPressTriggered = !1;
  }
  static getStubConfig() {
    return fs();
  }
  static getConfigElement() {
    return document.createElement("hoas-light-widget-editor");
  }
  setConfig(i) {
    var n;
    const t = bs(i);
    this._config = t, (!this._activeRoomId || !dl(t, this._activeRoomId)) && (this._activeRoomId = t.default_room_id ?? ((n = t.rooms[0]) == null ? void 0 : n.id));
    const e = this._loadLocalPrefs();
    this._favorites = t.favorites && t.favorites.length > 0 ? [...t.favorites] : e.favorites ?? [...pl], this._recentColors = t.recent_colors && t.recent_colors.length > 0 ? [...t.recent_colors] : e.recent_colors ?? [], this._selectedIds = [], this._previewOverrides = /* @__PURE__ */ new Map(), this._pendingPayloads = /* @__PURE__ */ new Map();
  }
  _loadLocalPrefs() {
    var i;
    try {
      const t = (i = window.localStorage) == null ? void 0 : i.getItem(Ic);
      if (!t) return {};
      const e = JSON.parse(t);
      return typeof e == "object" && e !== null ? e : {};
    } catch {
      return {};
    }
  }
  _saveLocalPrefs() {
    var i;
    try {
      (i = window.localStorage) == null || i.setItem(
        Ic,
        JSON.stringify({
          favorites: this._favorites,
          recent_colors: this._recentColors
        })
      );
    } catch {
    }
  }
  getCardSize() {
    return 9;
  }
  getGridSize() {
    return {
      columns: 12,
      rows: 11,
      min_columns: 6,
      min_rows: 8
    };
  }
  disconnectedCallback() {
    var i;
    super.disconnectedCallback(), this._brightnessTimer && clearTimeout(this._brightnessTimer), this._wizardTimer && clearTimeout(this._wizardTimer), this._longPressTimer && clearTimeout(this._longPressTimer), (i = this._stage3d) == null || i.dispose(), this._stage3d = null;
  }
  updated(i) {
    super.updated(i);
    const t = this._getActiveRoom();
    if (t) {
      if (this._stage3d)
        i.has("_config") || i.has("_activeRoomId") ? this._stage3d.renderRoom(t, this._cameraPreset) : i.has("_cameraPreset") && this._stage3d.setCameraPreset(this._cameraPreset);
      else {
        const e = this.renderRoot.querySelector(".stage-3d");
        e && (this._stage3d = new z0(e, {
          onSelectLight: (n, s) => this._handleLightSelection(n, s)
        }), this._webglUnavailable = !this._stage3d.isWebGLReady, this._stage3d.renderRoom(t, this._cameraPreset));
      }
      if (this._stage3d) {
        const e = this._buildVisualStates(t);
        this._stage3d.updateLightStates(e, new Set(this._selectedIds));
      }
    }
  }
  _getActiveRoom() {
    if (this._config)
      return dl(this._config, this._activeRoomId);
  }
  _commitConfig(i, t) {
    this._config = i, t && (this._activeRoomId = t), this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: i },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _updateActiveRoom(i) {
    if (!this._config) return;
    const t = this._getActiveRoom();
    if (!t) return;
    const e = i(t), n = {
      ...this._config,
      rooms: this._config.rooms.map((s) => s.id === t.id ? e : s)
    };
    this._commitConfig(n);
  }
  _buildVisualStates(i) {
    var e;
    const t = /* @__PURE__ */ new Map();
    for (const n of i.lights) {
      const s = (e = this.hass) == null ? void 0 : e.states[n.entity_id], r = this._previewOverrides.get(n.entity_id);
      t.set(n.entity_id, au(n, s, r));
    }
    return t;
  }
  _selectRoom(i) {
    this._activeRoomId = i, this._selectedIds = [], this._previewOverrides = /* @__PURE__ */ new Map(), this._pendingPayloads = /* @__PURE__ */ new Map(), this._snapshotCreatedForRoom = void 0, this._statusBanner = void 0, this._editState = { ...this._editState, sketchPoints: [] };
  }
  _toggleEditLock() {
    this._editUnlocked = !this._editUnlocked, this._editUnlocked || (this._editState = { ...this._editState, sketchPoints: [] });
  }
  _setCameraPreset(i) {
    var t;
    this._cameraPreset = i, (t = this._stage3d) == null || t.setCameraPreset(i);
  }
  _handleLightSelection(i, t) {
    var n;
    if (this._multiSelectMode || t ? this._selectedIds.includes(i) ? this._selectedIds = this._selectedIds.filter((s) => s !== i) : this._selectedIds = [...this._selectedIds, i] : this._selectedIds = this._selectedIds.length === 1 && this._selectedIds[0] === i ? [] : [i], this._selectedIds.length === 1) {
      const s = (n = this.hass) == null ? void 0 : n.states[this._selectedIds[0]];
      s && typeof s.attributes.brightness == "number" && (this._brightnessPct = Math.max(1, Math.round(s.attributes.brightness / 255 * 100)));
    }
  }
  _selectByGroupTag(i, t) {
    this._selectedIds = i.lights.filter((e) => e.group_tag === t).map((e) => e.entity_id);
  }
  _selectAllLights(i) {
    this._selectedIds = i.lights.map((t) => t.entity_id);
  }
  _clearSelection() {
    this._selectedIds = [];
  }
  _buildEditHandlers() {
    if (this._editUnlocked)
      return {
        enabled: !0,
        tool: this._editState.editTool,
        sketchPoints: this._editState.sketchPoints,
        selectedFurnitureId: this._editState.selectedFurnitureId,
        onSelectFurniture: (i) => {
          this._editState = { ...this._editState, selectedFurnitureId: i };
        },
        onMoveLightXY: (i, t, e, n) => {
          this._updateActiveRoom((s) => ({
            ...s,
            lights: s.lights.map((r) => r.entity_id !== i ? r : r.geometry.type === "point" ? {
              ...r,
              geometry: { ...r.geometry, position: [t, e, r.geometry.position[2]] }
            } : r.geometry.type === "vertical_column" ? {
              ...r,
              geometry: {
                ...r.geometry,
                from: [t, e, r.geometry.from[2]],
                to: [t, e, r.geometry.to[2]]
              }
            } : r.geometry.type === "polyline" && n !== void 0 ? {
              ...r,
              geometry: {
                ...r.geometry,
                points: r.geometry.points.map(
                  (a, o) => o === n ? [t, e, a[2]] : a
                )
              }
            } : r)
          }));
        },
        onMoveLightXZ: (i, t, e, n) => {
          this._updateActiveRoom((s) => ({
            ...s,
            lights: s.lights.map((r) => {
              if (r.entity_id !== i) return r;
              if (r.geometry.type === "point")
                return {
                  ...r,
                  geometry: { ...r.geometry, position: [t, r.geometry.position[1], e] }
                };
              if (r.geometry.type === "vertical_column") {
                const a = n === "from" ? [t, r.geometry.from[1], e] : [t, r.geometry.from[1], r.geometry.from[2]], o = n === "to" ? [t, r.geometry.to[1], e] : [t, r.geometry.to[1], r.geometry.to[2]];
                return {
                  ...r,
                  geometry: { ...r.geometry, from: a, to: o }
                };
              }
              return r.geometry.type === "polyline" && typeof n == "number" ? {
                ...r,
                geometry: {
                  ...r.geometry,
                  points: r.geometry.points.map(
                    (a, o) => o === n ? [t, a[1], e] : a
                  )
                }
              } : r;
            })
          }));
        },
        onMovePolygonVertex: (i, t, e) => {
          this._updateActiveRoom((n) => ({
            ...n,
            floor_polygon: n.floor_polygon.map(
              (s, r) => r === i ? { x: Math.max(0, t), y: Math.max(0, e) } : s
            )
          }));
        },
        onMoveFurnitureXY: (i, t, e) => {
          this._updateActiveRoom((n) => ({
            ...n,
            furniture: n.furniture.map(
              (s) => s.id === i ? { ...s, position: [t, e, s.position[2]] } : s
            )
          }));
        },
        onMoveCameraPov: (i, t, e) => {
          this._updateActiveRoom((n) => ({
            ...n,
            camera_pov: {
              ...n.camera_pov,
              [i]: [t, e, n.camera_pov[i][2]]
            }
          }));
        },
        onCanvasTapXY: (i, t) => {
          if (this._editState.sketchPoints.length === 0) return;
          const e = this._editState.sketchPoints[this._editState.sketchPoints.length - 1], n = this._editState.orthogonalSketch ? _u(e, { x: i, y: t }, 0.25) : { x: qt(Math.max(0, i), 0.25), y: qt(Math.max(0, t), 0.25) };
          n.x === e.x && n.y === e.y || (this._editState = {
            ...this._editState,
            sketchPoints: [...this._editState.sketchPoints, n]
          });
        }
      };
  }
  _getSnapshotId(i) {
    return `hoas_preview_${ml(i.id)}`;
  }
  async _ensureSessionSnapshot(i) {
    if (!(!this.hass || this._snapshotCreatedForRoom === i.id))
      try {
        await uu(this.hass, i, this._getSnapshotId(i)), this._snapshotCreatedForRoom = i.id;
      } catch {
      }
  }
  async _applyIntentToSelection(i, t) {
    var a;
    if (this._selectedIds.length === 0) {
      this._statusBanner = {
        kind: "warn",
        text: "Bitte zuerst mindestens eine Lichtquelle im Raum markieren."
      };
      return;
    }
    t.color && (this._activeColor = t.color, this._recentColors = lu(this._recentColors, t.color), this._saveLocalPrefs());
    const e = ((a = this._config) == null ? void 0 : a.calibrations) ?? {}, n = this._selectedIds.map((o) => {
      var c;
      const l = (c = this.hass) == null ? void 0 : c.states[o];
      return Br(o, l, t, e[o]);
    }), s = new Map(this._previewOverrides), r = new Map(this._pendingPayloads);
    for (const o of n)
      o.status === "skipped_no_color" || !o.scenePayload || (r.set(o.entityId, o.scenePayload), s.set(o.entityId, {
        isOn: o.isOn,
        brightness01: o.previewBrightness01,
        rgb: o.previewRgb
      }));
    if (this._previewOverrides = s, this._pendingPayloads = r, !!this.hass) {
      await this._ensureSessionSnapshot(i);
      try {
        const o = await gl(this.hass, n);
        if (o.skipped.length > 0) {
          const l = o.skipped.map((c) => c.friendlyName).join(", ");
          this._statusBanner = {
            kind: "warn",
            text: `${o.skipped.length} Lampe(n) ohne Farbmodus übersprungen: ${l}`
          };
        } else
          this._statusBanner = void 0;
      } catch (o) {
        this._statusBanner = {
          kind: "error",
          text: `Steuerung fehlgeschlagen: ${o instanceof Error ? o.message : String(o)}`
        };
      }
    }
  }
  _handleSwatchTap(i, t) {
    this._applyIntentToSelection(i, {
      action: "on",
      brightnessPct: this._brightnessPct,
      color: t
    });
  }
  _handleBrightnessInput(i, t) {
    const e = Number(t.target.value);
    this._brightnessPct = e, this._brightnessTimer && clearTimeout(this._brightnessTimer), this._brightnessTimer = setTimeout(() => {
      this._selectedIds.length > 0 && this._applyIntentToSelection(i, {
        action: "on",
        brightnessPct: this._brightnessPct,
        color: this._activeColor
      });
    }, 160);
  }
  _toggleFavorite(i) {
    this._favorites = cu(this._favorites, i), this._saveLocalPrefs(), this._config && this._commitConfig({ ...this._config, favorites: this._favorites });
  }
  async _openCalibrationWizard(i) {
    var s, r, a, o;
    if (i.lights.length === 0) return;
    await this._ensureSessionSnapshot(i);
    const t = ((s = i.lights.find(
      (l) => {
        var c, h, u;
        return (u = (h = (c = this.hass) == null ? void 0 : c.states[l.entity_id]) == null ? void 0 : h.attributes.supported_color_modes) == null ? void 0 : u.includes("color_temp");
      }
    )) == null ? void 0 : s.entity_id) ?? i.lights[0].entity_id, e = (this._selectedIds[0] && this._selectedIds[0] !== t ? this._selectedIds[0] : void 0) ?? ((r = i.lights.find((l) => l.entity_id !== t)) == null ? void 0 : r.entity_id) ?? i.lights[0].entity_id, n = ((o = (a = this._config) == null ? void 0 : a.calibrations) == null ? void 0 : o[e]) ?? {};
    this._wizardState = {
      open: !0,
      step: 1,
      referenceEntityId: t,
      targetEntityId: e,
      testColor: ga[0],
      draft: { ...n }
    };
  }
  _handleWizardLivePreview(i, t, e, n) {
    var l, c;
    const s = {
      action: "on",
      brightnessPct: 80,
      color: e
    }, r = Br(
      i,
      (l = this.hass) == null ? void 0 : l.states[i],
      s,
      void 0
    ), a = Br(
      t,
      (c = this.hass) == null ? void 0 : c.states[t],
      s,
      n
    ), o = new Map(this._previewOverrides);
    for (const h of [r, a])
      h.status === "applied" && o.set(h.entityId, {
        isOn: h.isOn,
        brightness01: h.previewBrightness01,
        rgb: h.previewRgb
      });
    this._previewOverrides = o, this.hass && (this._wizardTimer && clearTimeout(this._wizardTimer), this._wizardTimer = setTimeout(() => {
      if (!this.hass) return;
      const h = i === t ? [a] : [r, a];
      gl(this.hass, h, 0.25);
    }, 140));
  }
  _saveCalibrationProfile(i, t) {
    if (!this._config) return;
    const e = { ...this._config.calibrations ?? {} };
    t ? e[i] = t : delete e[i], this._commitConfig({ ...this._config, calibrations: e }), this._statusBanner = {
      kind: "ok",
      text: t ? `Kalibrierungsprofil für ${i} gespeichert.` : `Kalibrierungsprofil für ${i} auf Neutral zurückgesetzt.`
    };
  }
  _handleChipPointerDown(i) {
    this._longPressTriggered = !1, this._longPressTimer && clearTimeout(this._longPressTimer), this._longPressTimer = setTimeout(() => {
      this._longPressTriggered = !0, this._multiSelectMode = !0, this._selectedIds.includes(i) || (this._selectedIds = [...this._selectedIds, i]);
    }, 450);
  }
  _handleChipPointerUp() {
    this._longPressTimer && (clearTimeout(this._longPressTimer), this._longPressTimer = void 0);
  }
  async _handleRestoreSnapshot(i) {
    if (!(!this.hass || this._snapshotCreatedForRoom !== i.id))
      try {
        await du(this.hass, this._getSnapshotId(i)), this._previewOverrides = /* @__PURE__ */ new Map(), this._pendingPayloads = /* @__PURE__ */ new Map(), this._snapshotCreatedForRoom = void 0, this._statusBanner = {
          kind: "ok",
          text: "Ausgangszustand des Raums wiederhergestellt."
        };
      } catch (t) {
        this._statusBanner = {
          kind: "error",
          text: `Zurücksetzen fehlgeschlagen: ${t instanceof Error ? t.message : String(t)}`
        };
      }
  }
  _openSaveSceneModal(i) {
    var e;
    this._sceneMode = "new", this._sceneName = `${i.name} – Ambiente`;
    const t = this._getExistingScenes();
    this._sceneTargetId = ((e = t[0]) == null ? void 0 : e.id) ?? "", this._sceneModalOpen = !0;
  }
  _getExistingScenes() {
    return this.hass ? Object.values(this.hass.states).filter((i) => i.entity_id.startsWith("scene.") && !i.entity_id.startsWith("scene.hoas_preview_")).map((i) => ({
      id: i.entity_id.replace(/^scene\./, ""),
      entityId: i.entity_id,
      name: i.attributes.friendly_name ?? i.entity_id
    })) : [];
  }
  async _submitSaveScene(i) {
    var r;
    if (!this.hass) return;
    const t = this._buildVisualStates(i), e = fu(i, this.hass, this._pendingPayloads, t), n = this._sceneMode === "overwrite" && this._sceneTargetId ? this._sceneTargetId : ml(this._sceneName), s = this._sceneMode === "overwrite" && this._sceneTargetId ? ((r = this._getExistingScenes().find((a) => a.id === this._sceneTargetId)) == null ? void 0 : r.name) ?? this._sceneTargetId : this._sceneName.trim() || `${i.name} Szene`;
    this._sceneSaving = !0;
    try {
      await pu(this.hass, {
        sceneId: n,
        name: s,
        icon: "mdi:lightbulb-group",
        entities: e
      }), this._sceneModalOpen = !1, this._statusBanner = {
        kind: "ok",
        text: `Szene "${s}" gespeichert (${Object.keys(e).length} Raum-Lampen inkl. Aus-Status).`
      };
    } catch (a) {
      this._statusBanner = {
        kind: "error",
        text: `Szene konnte nicht gespeichert werden: ${a instanceof Error ? a.message : String(a)}`
      };
    } finally {
      this._sceneSaving = !1;
    }
  }
  _renderBanner() {
    return this._statusBanner ? St`
      <div class="banner ${this._statusBanner.kind}" style="margin:0 12px 10px">
        <span>${this._statusBanner.text}</span>
        <button
          type="button"
          class="mini-tab"
          @click=${() => this._statusBanner = void 0}
        >
          ×
        </button>
      </div>
    ` : Lt;
  }
  _renderControlDock(i) {
    const t = this._selectedIds.length, e = this._activeColor ? this._favorites.some((n) => {
      var s;
      return n.id === ((s = this._activeColor) == null ? void 0 : s.id);
    }) : !1;
    return St`
      <div class="control-dock">
        <div class="control-header">
          <span class="control-title">
            ${t > 0 ? `${t} Lichtquelle(n) gewählt` : "Lichtquelle(n) oben markieren"}
          </span>
          <div class="control-actions">
            <button
              type="button"
              class="action-btn"
              ?disabled=${t === 0}
              @click=${() => void this._applyIntentToSelection(i, {
      action: "on",
      brightnessPct: this._brightnessPct,
      color: this._activeColor
    })}
            >
              An
            </button>
            <button
              type="button"
              class="action-btn danger"
              ?disabled=${t === 0}
              @click=${() => void this._applyIntentToSelection(i, { action: "off" })}
            >
              Aus
            </button>
            ${this._snapshotCreatedForRoom === i.id ? St`
                  <button
                    type="button"
                    class="action-btn"
                    @click=${() => void this._handleRestoreSnapshot(i)}
                  >
                    Zurücksetzen
                  </button>
                ` : Lt}
            <button
              type="button"
              class="action-btn primary"
              @click=${() => this._openSaveSceneModal(i)}
            >
              Als HA-Szene speichern
            </button>
          </div>
        </div>

        <div class="brightness-row">
          <span>Helligkeit</span>
          <input
            type="range"
            min="1"
            max="100"
            .value=${String(this._brightnessPct)}
            @input=${(n) => this._handleBrightnessInput(i, n)}
            aria-label="Helligkeit"
          />
          <strong>${this._brightnessPct}%</strong>
        </div>

        ${this._favorites.length > 0 ? St`
              <div class="palette-section">
                <div class="palette-label">
                  <span>Favoriten</span>
                  ${this._activeColor ? St`
                        <button
                          type="button"
                          class="mini-tab ${e ? "active" : ""}"
                          @click=${() => this._activeColor && this._toggleFavorite(this._activeColor)}
                        >
                          ${e ? "★ Favorit" : "☆ Als Favorit"}
                        </button>
                      ` : Lt}
                </div>
                <div class="swatch-row">
                  ${this._favorites.map(
      (n) => {
        var s;
        return St`
                      <button
                        type="button"
                        class="swatch ${((s = this._activeColor) == null ? void 0 : s.id) === n.id ? "active" : ""}"
                        style="background:${n.hex}"
                        title=${n.label}
                        aria-label=${n.label}
                        @click=${() => this._handleSwatchTap(i, n)}
                      ></button>
                    `;
      }
    )}
                </div>
              </div>
            ` : Lt}

        ${this._recentColors.length > 0 ? St`
              <div class="palette-section">
                <div class="palette-label"><span>Zuletzt verwendet</span></div>
                <div class="swatch-row">
                  ${this._recentColors.map(
      (n) => {
        var s;
        return St`
                      <button
                        type="button"
                        class="swatch ${((s = this._activeColor) == null ? void 0 : s.id) === n.id ? "active" : ""}"
                        style="background:${n.hex}"
                        title=${n.label}
                        aria-label=${n.label}
                        @click=${() => this._handleSwatchTap(i, n)}
                      ></button>
                    `;
      }
    )}
                </div>
              </div>
            ` : Lt}

        <div class="palette-section">
          <div class="palette-label"><span>Weißtöne (Kelvin)</span></div>
          <div class="swatch-row">
            ${Sa.map(
      (n) => {
        var s;
        return St`
                <button
                  type="button"
                  class="swatch-white ${((s = this._activeColor) == null ? void 0 : s.id) === n.id ? "active" : ""}"
                  title=${n.label}
                  @click=${() => this._handleSwatchTap(i, n)}
                >
                  <span class="dot" style="background:${n.hex}"></span>
                  <span>${n.kelvin}K</span>
                </button>
              `;
      }
    )}
          </div>
        </div>

        <div class="palette-section">
          <div class="palette-label"><span>Master-Farbkarte</span></div>
          <div class="swatch-grid">
            ${si.map(
      (n) => {
        var s;
        return St`
                <button
                  type="button"
                  class="swatch ${((s = this._activeColor) == null ? void 0 : s.id) === n.id ? "active" : ""}"
                  style="background:${n.hex}"
                  title=${n.label}
                  aria-label=${n.label}
                  @click=${() => this._handleSwatchTap(i, n)}
                ></button>
              `;
      }
    )}
          </div>
        </div>
      </div>
    `;
  }
  _renderSceneModal(i) {
    if (!this._sceneModalOpen) return Lt;
    const t = this._getExistingScenes();
    return St`
      <div class="modal-backdrop" @click=${() => this._sceneModalOpen = !1}>
        <div class="modal" @click=${(e) => e.stopPropagation()}>
          <h3>HA-Szene speichern · ${i.name}</h3>
          <div class="subview-tabs">
            <button
              type="button"
              class="mini-tab ${this._sceneMode === "new" ? "active" : ""}"
              @click=${() => this._sceneMode = "new"}
            >
              Neue Szene
            </button>
            <button
              type="button"
              class="mini-tab ${this._sceneMode === "overwrite" ? "active" : ""}"
              ?disabled=${t.length === 0}
              @click=${() => this._sceneMode = "overwrite"}
            >
              Bestehende überschreiben
            </button>
          </div>

          ${this._sceneMode === "new" ? St`
                <label>
                  Szenen-Name
                  <input
                    type="text"
                    .value=${this._sceneName}
                    @input=${(e) => this._sceneName = e.target.value}
                  />
                </label>
              ` : St`
                <label>
                  Ziel-Szene auswählen
                  <select
                    .value=${this._sceneTargetId}
                    @change=${(e) => this._sceneTargetId = e.target.value}
                  >
                    ${t.map(
      (e) => St`<option value=${e.id}>${e.name} (${e.entityId})</option>`
    )}
                  </select>
                </label>
              `}

          <div class="modes-badge">
            Es werden alle ${i.lights.length} Lampen des Raums gespeichert (inkl. ausgeschalteter
            Lampen als "off").
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="action-btn"
              @click=${() => this._sceneModalOpen = !1}
            >
              Abbrechen
            </button>
            <button
              type="button"
              class="action-btn primary"
              ?disabled=${this._sceneSaving}
              @click=${() => void this._submitSaveScene(i)}
            >
              ${this._sceneSaving ? "Speichere…" : "Szene speichern"}
            </button>
          </div>
        </div>
      </div>
    `;
  }
  render() {
    if (!this._config)
      return St`<ha-card><div class="empty-state">Warte auf Konfiguration…</div></ha-card>`;
    const i = this._getActiveRoom();
    if (!i)
      return St`
        <ha-card>
          <div class="empty-state">
            Noch kein Raum konfiguriert. Öffne den Edit-Mode, um einen Raum anzulegen.
          </div>
        </ha-card>
      `;
    const t = this._buildVisualStates(i), e = new Set(this._selectedIds), n = Array.from(
      new Set(i.lights.map((r) => r.group_tag).filter((r) => !!r))
    ), s = this._buildEditHandlers();
    return St`
      <ha-card>
        <div class="header">
          <div class="room-tabs" role="tablist" aria-label="Räume">
            ${this._config.rooms.map(
      (r) => St`
                <button
                  type="button"
                  role="tab"
                  aria-selected=${r.id === i.id}
                  class="room-tab ${r.id === i.id ? "active" : ""}"
                  @click=${() => this._selectRoom(r.id)}
                >
                  ${r.name}
                </button>
              `
    )}
          </div>
          <div class="header-actions">
            ${this._editUnlocked ? Lt : St`
                  <button
                    type="button"
                    class="pill-btn ${this._multiSelectMode ? "active" : ""}"
                    @click=${() => this._multiSelectMode = !this._multiSelectMode}
                    aria-pressed=${this._multiSelectMode}
                  >
                    + Mehrfach
                  </button>
                  ${i.lights.length > 0 ? St`
                        <button
                          type="button"
                          class="pill-btn"
                          @click=${() => void this._openCalibrationWizard(i)}
                        >
                          Abgleich
                        </button>
                      ` : Lt}
                `}
            <button
              type="button"
              class="pill-btn ${this._editUnlocked ? "unlocked" : ""}"
              @click=${this._toggleEditLock}
              aria-pressed=${this._editUnlocked}
            >
              ${this._editUnlocked ? "Edit-Mode: Offen" : "Gesperrt"}
            </button>
          </div>
        </div>

        <div class="split-layout">
          <div class="panel">
            <div class="panel-title">
              <span>3D-Ansicht · ${i.name}</span>
              <div class="subview-tabs">
                <button
                  type="button"
                  class="mini-tab ${this._cameraPreset === "pov" ? "active" : ""}"
                  @click=${() => this._setCameraPreset("pov")}
                >
                  Couch-POV
                </button>
                <button
                  type="button"
                  class="mini-tab ${this._cameraPreset === "orbit" ? "active" : ""}"
                  @click=${() => this._setCameraPreset("orbit")}
                >
                  360° Orbit
                </button>
              </div>
            </div>
            <div class="stage-3d">
              ${this._webglUnavailable ? St`<div class="stage-fallback">WebGL nicht verfügbar – 2D-Ansichten aktiv</div>` : Lt}
            </div>
          </div>

          <div class="panel">
            <div class="panel-title">
              <span>
                ${this._secondaryView === "top" ? "2D-Draufsicht (X/Y)" : "Frontalansicht (X/Z Höhe)"}
              </span>
              <div class="subview-tabs">
                <button
                  type="button"
                  class="mini-tab ${this._secondaryView === "top" ? "active" : ""}"
                  @click=${() => this._secondaryView = "top"}
                >
                  Drauf
                </button>
                <button
                  type="button"
                  class="mini-tab ${this._secondaryView === "front" ? "active" : ""}"
                  @click=${() => this._secondaryView = "front"}
                >
                  Frontal
                </button>
              </div>
            </div>
            <div class="stage-2d ${this._editUnlocked ? "editing" : ""}">
              ${this._secondaryView === "top" ? V0(i, {
      selectedIds: e,
      visualStates: t,
      onSelectLight: (r, a) => this._handleLightSelection(r, a),
      edit: s
    }) : G0(i, {
      selectedIds: e,
      visualStates: t,
      onSelectLight: (r, a) => this._handleLightSelection(r, a),
      edit: s
    })}
            </div>
          </div>
        </div>

        ${this._editUnlocked ? q0(this._config, i, this.hass, this._editState, {
      onSelectTab: (r, a) => {
        this._editState = { ...this._editState, activeTab: r, editTool: a };
      },
      onUpdateConfig: (r, a) => this._commitConfig(r, a),
      onUpdateRoom: (r) => this._updateActiveRoom(r),
      onSetState: (r) => {
        this._editState = { ...this._editState, ...r };
      },
      onNotify: (r, a) => {
        this._statusBanner = { kind: r, text: a };
      }
    }) : St`
              <div class="quick-bar">
                <button
                  type="button"
                  class="quick-chip"
                  @click=${() => this._selectAllLights(i)}
                >
                  Alle (${i.lights.length})
                </button>
                ${n.map(
      (r) => St`
                    <button
                      type="button"
                      class="quick-chip"
                      @click=${() => this._selectByGroupTag(i, r)}
                    >
                      ${r}
                    </button>
                  `
    )}
                ${this._selectedIds.length > 0 ? St`
                      <button type="button" class="quick-chip active" @click=${this._clearSelection}>
                        Auswahl (${this._selectedIds.length}) ×
                      </button>
                    ` : Lt}
              </div>

              <div class="lights-strip">
                ${i.lights.map((r) => {
      var d, p;
      const a = (d = this.hass) == null ? void 0 : d.states[r.entity_id], o = t.get(r.entity_id), l = ((p = a == null ? void 0 : a.attributes.supported_color_modes) == null ? void 0 : p.join(", ")) ?? "unbekannt", c = r.label ?? (a == null ? void 0 : a.attributes.friendly_name) ?? r.entity_id, h = e.has(r.entity_id), u = o != null && o.isOn ? ` · ${Math.round(o.brightness01 * 100)}%` : " · Aus";
      return St`
                    <button
                      type="button"
                      class="light-chip ${h ? "selected" : ""}"
                      @pointerdown=${() => this._handleChipPointerDown(r.entity_id)}
                      @pointerup=${() => this._handleChipPointerUp()}
                      @pointercancel=${() => this._handleChipPointerUp()}
                      @click=${(g) => {
        if (this._longPressTriggered) {
          this._longPressTriggered = !1;
          return;
        }
        this._handleLightSelection(
          r.entity_id,
          g.shiftKey || g.ctrlKey || g.metaKey
        );
      }}
                    >
                      <span
                        class="light-dot"
                        style="background:${(o == null ? void 0 : o.cssColor) ?? "#52525b"}"
                      ></span>
                      <span>${c}${u}</span>
                      <span class="modes-badge">[${l}]</span>
                    </button>
                  `;
    })}
              </div>

              ${this._renderControlDock(i)}
            `}
        ${this._renderBanner()} ${this._renderSceneModal(i)}
        ${nv(i, this.hass, this._wizardState, {
      onClose: (r) => {
        this._wizardState = { ...this._wizardState, open: !1 }, r && this._snapshotCreatedForRoom === i.id && this._handleRestoreSnapshot(i);
      },
      onChangeState: (r) => {
        var o, l;
        const a = { ...this._wizardState, ...r };
        r.targetEntityId && r.targetEntityId !== this._wizardState.targetEntityId && (a.draft = { ...((l = (o = this._config) == null ? void 0 : o.calibrations) == null ? void 0 : l[r.targetEntityId]) ?? {} }), this._wizardState = a;
      },
      onLivePreview: (r, a, o, l) => this._handleWizardLivePreview(r, a, o, l),
      onSaveProfile: (r, a) => this._saveCalibrationProfile(r, a)
    })}
      </ha-card>
    `;
  }
};
ae.styles = Rh;
de([
  ui({ attribute: !1 })
], ae.prototype, "hass", 2);
de([
  ui({ type: Boolean, reflect: !0 })
], ae.prototype, "fullwidth", 2);
de([
  le()
], ae.prototype, "_config", 2);
de([
  le()
], ae.prototype, "_activeRoomId", 2);
de([
  le()
], ae.prototype, "_editUnlocked", 2);
de([
  le()
], ae.prototype, "_editState", 2);
de([
  le()
], ae.prototype, "_multiSelectMode", 2);
de([
  le()
], ae.prototype, "_selectedIds", 2);
de([
  le()
], ae.prototype, "_cameraPreset", 2);
de([
  le()
], ae.prototype, "_secondaryView", 2);
de([
  le()
], ae.prototype, "_webglUnavailable", 2);
de([
  le()
], ae.prototype, "_brightnessPct", 2);
de([
  le()
], ae.prototype, "_activeColor", 2);
de([
  le()
], ae.prototype, "_favorites", 2);
de([
  le()
], ae.prototype, "_recentColors", 2);
de([
  le()
], ae.prototype, "_previewOverrides", 2);
de([
  le()
], ae.prototype, "_pendingPayloads", 2);
de([
  le()
], ae.prototype, "_snapshotCreatedForRoom", 2);
de([
  le()
], ae.prototype, "_statusBanner", 2);
de([
  le()
], ae.prototype, "_sceneModalOpen", 2);
de([
  le()
], ae.prototype, "_sceneMode", 2);
de([
  le()
], ae.prototype, "_sceneName", 2);
de([
  le()
], ae.prototype, "_sceneTargetId", 2);
de([
  le()
], ae.prototype, "_sceneSaving", 2);
de([
  le()
], ae.prototype, "_wizardState", 2);
ae = de([
  Ma("hoas-light-widget")
], ae);
window.customCards = window.customCards ?? [];
window.customCards.some((i) => i.type === "hoas-light-widget") || window.customCards.push({
  type: "hoas-light-widget",
  name: "HOAS LightWidget",
  description: "3D/2D Raum-Visualisierung und einheitliche Ambiente-Lichtsteuerung",
  preview: !0
});
export {
  ae as HoasLightWidget
};
//# sourceMappingURL=hoas-light-widget.js.map
