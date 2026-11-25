(function() {
  var SVGNS = "http://www.w3.org/2000/svg";
  var BOOL = { disabled: 1, checked: 1, hidden: 1, readonly: 1, selected: 1, required: 1 };
  if (!window.fetch) {
    window.fetch = function(url) {
      return new Promise(function(res, rej) {
        var x = new XMLHttpRequest();
        x.open("GET", url);
        x.onload = function() {
          res({ ok: true, json: function() {
            return Promise.resolve(JSON.parse(x.responseText));
          }, text: function() {
            return Promise.resolve(x.responseText);
          } });
        };
        x.onerror = function() {
          rej(new Error("net"));
        };
        x.send();
      });
    };
  }
  var comp = null, stage = null, tpl = null, pending = false;
  window.DCLogic = function DCLogic(props) {
    this.props = props || {};
    this.state = {};
  };
  window.DCLogic.prototype.setState = function(p) {
    if (typeof p === "function") p = p(this.state);
    for (var k in p) this.state[k] = p[k];
    schedule();
  };
  function schedule() {
    if (pending) return;
    pending = true;
    setTimeout(function() {
      pending = false;
      render();
    }, 0);
  }
  var RX = /\{\{\s*([^}]*?)\s*\}\}/g;
  function parts(s) {
    var out = [], last = 0, m;
    RX.lastIndex = 0;
    while (m = RX.exec(s)) {
      if (m.index > last) out.push(s.slice(last, m.index));
      out.push({ e: m[1] });
      last = m.index + m[0].length;
    }
    if (last < s.length) out.push(s.slice(last));
    return out;
  }
  function conv(n) {
    if (n.nodeType === 3) return { k: "t", p: parts(n.nodeValue) };
    if (n.nodeType !== 1) return null;
    var tag = n.localName, ch = [], i, c;
    for (i = 0; i < n.childNodes.length; i++) {
      c = conv(n.childNodes[i]);
      if (c) ch.push(c);
    }
    if (tag === "sc-if") return { k: "if", e: parts(n.getAttribute("value"))[0].e, c: ch };
    if (tag === "sc-for") return { k: "for", e: parts(n.getAttribute("list"))[0].e, as: n.getAttribute("as"), c: ch };
    var at = [];
    for (i = 0; i < n.attributes.length; i++) {
      var a = n.attributes[i];
      if (a.name.indexOf("hint-placeholder") === 0) continue;
      at.push({ n: a.name, p: parts(a.value) });
    }
    return { k: "e", tag, ns: n.namespaceURI, a: at, c: ch };
  }
  function look(path, sc) {
    if (path === "true") return true;
    if (path === "false") return false;
    if (/^-?\d+(\.\d+)?$/.test(path)) return +path;
    var seg = path.split("."), v = sc[seg[0]];
    for (var i = 1; i < seg.length; i++) {
      if (v == null) return void 0;
      v = v[seg[i]];
    }
    return v;
  }
  function str(v) {
    return v == null ? "" : String(v);
  }
  function fixStyle(s) {
    if (POLY) s = s.replace(/(^|;)\s*gap:[^;]*/g, "$1");
    return s.replace(/inset:\s*0(px)?\s*(;|$)/g, "top:0;right:0;bottom:0;left:0;");
  }
  function ev(node, sc, out) {
    var i, j, v;
    if (node.k === "t") {
      var t = "";
      for (i = 0; i < node.p.length; i++) {
        v = node.p[i];
        t += typeof v === "string" ? v : str(look(v.e, sc));
      }
      out.push(t);
    } else if (node.k === "if") {
      if (look(node.e, sc)) for (i = 0; i < node.c.length; i++) ev(node.c[i], sc, out);
    } else if (node.k === "for") {
      var list = look(node.e, sc) || [];
      for (j = 0; j < list.length; j++) {
        var s2 = Object.create(sc);
        s2[node.as] = list[j];
        for (i = 0; i < node.c.length; i++) ev(node.c[i], s2, out);
      }
    } else {
      var vn = { tag: node.tag, ns: node.ns, a: {}, h: {}, c: [] };
      for (i = 0; i < node.a.length; i++) {
        var at = node.a[i], name = at.n, val;
        if (at.p.length === 1 && typeof at.p[0] !== "string") val = look(at.p[0].e, sc);
        else {
          val = "";
          for (j = 0; j < at.p.length; j++) {
            v = at.p[j];
            val += typeof v === "string" ? v : str(look(v.e, sc));
          }
        }
        if (name.indexOf("on") === 0) {
          if (typeof val === "function") vn.h[name.slice(2)] = val;
          continue;
        }
        if (BOOL[name]) {
          if (val && val !== "false") vn.a[name] = "";
          continue;
        }
        if (val == null || val === false && name !== "aria-pressed") {
          if (name === "value") vn.a.value = "";
          continue;
        }
        val = String(val);
        if (name === "style") {
          vn.gs = val;
          val = fixStyle(val);
        }
        vn.a[name] = val;
      }
      for (i = 0; i < node.c.length; i++) ev(node.c[i], sc, vn.c);
      out.push(vn);
    }
  }
  function mk(v) {
    var e = v.ns && v.ns !== "http://www.w3.org/1999/xhtml" ? document.createElementNS(v.ns, v.tag) : document.createElement(v.tag);
    e._a = {};
    e._h = {};
    e._l = {};
    patchEl(e, v);
    return e;
  }
  function handler(e) {
    var f = this._h && this._h[e.type === "input" ? "change" : e.type];
    if (f) return f(e);
  }
  function patchEl(d, v) {
    var k, old = d._a, isIn = d.localName === "input" || d.localName === "textarea";
    for (k in v.a) {
      if (k === "value" && isIn) continue;
      if (old[k] !== v.a[k]) {
        d.setAttribute(k, v.a[k]);
        if (BOOL[k]) {
          try {
            d[k] = true;
          } catch (x) {
          }
        }
      }
    }
    for (k in old) if (!(k in v.a) && !(k === "value" && isIn)) {
      d.removeAttribute(k);
      if (BOOL[k]) {
        try {
          d[k] = false;
        } catch (x) {
        }
      }
    }
    if (isIn && "value" in v.a) {
      var nv = v.a.value;
      if (d.value !== nv && (document.activeElement !== d || old.value !== nv)) d.value = nv;
    }
    d._a = v.a;
    d._h = v.h;
    for (k in v.h) if (!d._l[k]) {
      d._l[k] = 1;
      d.addEventListener(k, handler);
      if (k === "change") d.addEventListener("input", handler);
    }
    patchKids(d, v.c);
    gapFix(d, v);
  }
  function patchKids(p, vc) {
    var i, d, v, t;
    for (i = 0; i < vc.length; i++) {
      v = vc[i];
      d = p.childNodes[i];
      if (typeof v === "string") {
        if (d && d.nodeType === 3) {
          if (d.nodeValue !== v) d.nodeValue = v;
        } else {
          t = document.createTextNode(v);
          if (d) p.replaceChild(t, d);
          else p.appendChild(t);
        }
      } else if (d && d.nodeType === 1 && d.localName === v.tag && d.namespaceURI === (v.ns || d.namespaceURI)) {
        patchEl(d, v);
      } else {
        t = mk(v);
        if (d) p.replaceChild(t, d);
        else p.appendChild(t);
      }
    }
    while (p.childNodes.length > vc.length) p.removeChild(p.lastChild);
  }
  var GAPS = window.__GAPS || [];
  var POLY = false;
  function detectGap() {
    var d = document.createElement("div");
    d.style.cssText = "display:flex;gap:1px;position:absolute;visibility:hidden";
    d.appendChild(document.createElement("i"));
    d.appendChild(document.createElement("i"));
    document.body.appendChild(d);
    var ok = d.scrollWidth === 1;
    document.body.removeChild(d);
    if (/[?&]gap=poly/.test(location.search)) {
      var st = document.createElement("style");
      st.textContent = ".btn{gap:0!important}";
      document.head.appendChild(st);
      return true;
    }
    return !ok;
  }
  function gapOf(d, v) {
    var s = v.gs || "", m = /(?:^|;)\s*gap:\s*(\d+)px(?:\s+(\d+)px)?/.exec(s), g = null, i;
    var disp = /display:\s*([a-z-]+)/.exec(s), dir = /flex-direction:\s*(column|row)/.exec(s), wrap = /flex-wrap:\s*wrap/.test(s);
    var display = disp ? disp[1] : null, col = dir ? dir[1] === "column" : false;
    if (m) g = m[2] && !(dir && dir[1] === "column") ? +m[2] : +m[1];
    var cls = d.getAttribute && d.getAttribute("class");
    if (cls && GAPS.length) {
      for (i = 0; i < GAPS.length; i++) {
        var r = GAPS[i];
        if ((" " + cls + " ").indexOf(" " + r.cls + " ") >= 0) {
          if (g == null) g = r.gap;
          if (!display) display = r.display;
        }
      }
    }
    if (g == null || !display) return null;
    return { g, grid: display === "grid", col, wrap };
  }
  function gapFix(d, v) {
    if (!POLY) return;
    var o = gapOf(d, v);
    if (!o) return;
    if (o.grid) {
      d.style.gridGap = o.g + "px";
      return;
    }
    var n = d.childNodes, i, prev = null, c, hasPrev = false, items = [];
    for (i = 0; i < n.length; i++) {
      c = n[i];
      if (c.nodeType === 1) items.push(c);
      else if (c.nodeType === 3 && /\S/.test(c.nodeValue)) items.push(null);
    }
    if (o.wrap) {
      d._neg = o.g;
      d.style.marginBottom = "-" + o.g + "px";
    }
    var ml = o.col ? "marginTop" : "marginLeft", mr = o.col ? "marginBottom" : "marginRight", g = o.g + "px";
    for (i = 0; i < items.length; i++) {
      c = items[i];
      if (!c) continue;
      if (o.wrap) {
        c.style.marginRight = g;
        c.style.marginBottom = g;
        continue;
      }
      c.style[ml] = i > 0 ? g : "";
      var mv = i + 1 < items.length && items[i + 1] === null ? o.g : 0;
      if (mr === "marginBottom" && c._neg) mv -= c._neg;
      c.style[mr] = mv ? mv + "px" : "";
    }
  }
  function render() {
    var out = [];
    var sc = /* @__PURE__ */ Object.create(null);
    var vals = comp.renderVals();
    for (var k in vals) sc[k] = vals[k];
    for (var i = 0; i < tpl.length; i++) ev(tpl[i], sc, out);
    patchKids(stage, out);
  }
  function fit() {
    var w = window.innerWidth, h = window.innerHeight;
    var s = Math.min(w / 1194, h / 834);
    var ox = Math.max(0, (w - 1194 * s) / 2), oy = Math.max(0, (h - 834 * s) / 2);
    var wr = document.getElementById("wrap");
    wr.style.height = h + "px";
    var t = "translate(" + ox + "px," + oy + "px) scale(" + s + ")";
    stage.style.webkitTransform = t;
    stage.style.transform = t;
  }
  function boot() {
    stage = document.getElementById("stage");
    var src = document.getElementById("tpl").textContent;
    var doc = new DOMParser().parseFromString("<!doctype html><html><body>" + src + "</body></html>", "text/html");
    tpl = [];
    for (var i = 0; i < doc.body.childNodes.length; i++) {
      var c = conv(doc.body.childNodes[i]);
      if (c) tpl.push(c);
    }
    POLY = detectGap();
    comp = new window.__Component({});
    fit();
    render();
    try {
      if (comp.componentDidMount) comp.componentDidMount();
    } catch (e) {
      if (window.console) console.error(e);
    }
    window.addEventListener("resize", fit);
    window.addEventListener("orientationchange", function() {
      setTimeout(fit, 200);
    });
    if (window.applicationCache) {
      window.applicationCache.addEventListener("updateready", function() {
        try {
          window.applicationCache.swapCache();
        } catch (e) {
        }
        window.location.reload();
      });
    }
  }
  window.__boot = boot;
})();
