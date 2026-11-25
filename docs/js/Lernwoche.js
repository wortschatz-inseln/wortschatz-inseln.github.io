window.__Component = class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.words = [
      { w: "pl\xF6tzlich", idea2: "Denk an etwas \xDCberraschendes.", forms: "pl\xF6tzlich", idea: "Was passiert pl\xF6tzlich?", typ: "Adjektiv", syl: ["pl\xF6tz", "lich"], crit: [4, 5], tip: "Nach kurzem \xF6 kommt tz." },
      { w: "streiten", idea2: "Denk an Geschwister oder Freunde, die sich nicht einig sind.", forms: "streit|stritt", idea: "Wer streitet \u2013 und wor\xFCber?", typ: "Verb", syl: ["strei", "ten"], crit: [3, 4], tip: "Achte auf ei und auf st am Anfang." },
      { w: "Angst", idea2: "Denk an etwas Gruseliges.", forms: "Angst|\xC4ngst", idea: "Wovor hat jemand Angst?", art: "die", pl: "\xC4ngste", typ: "Nomen", syl: ["Angst"], crit: [0], tip: "Nomen schreibt man gro\xDF: die Angst." },
      { w: "Urlaub", idea2: "Denk an Ferien und Reisen.", forms: "Urlaub", idea: "Wohin fahrt ihr in den Urlaub?", art: "der", pl: "Urlaube", typ: "Nomen", syl: ["Ur", "laub"], crit: [0, 5], tip: "Verl\xE4ngere: die Urlau-be \u2013 deshalb b am Ende." },
      { w: "immer", idea2: "Was machst du jeden Tag?", forms: "immer", idea: "Was machst du immer?", typ: "anderes", syl: ["im", "mer"], crit: [1, 2], tip: "Kurzes i, dann zwei m." },
      { w: "Ecke", idea2: "Denk an dein Zimmer.", forms: "Ecke", idea: "Was steht in der Ecke?", art: "die", pl: "Ecken", typ: "Nomen", syl: ["E", "cke"], crit: [0, 1, 2], tip: "Nach kurzem E kommt ck. Und gro\xDF, weil Nomen." },
      { w: "Spa\xDF", idea2: "Was machst du richtig gern?", forms: "Spa\xDF|Sp\xE4\xDF", idea: "Was macht dir Spa\xDF?", art: "der", pl: "Sp\xE4\xDFe", typ: "Nomen", syl: ["Spa\xDF"], crit: [0, 3], tip: "Nach langem a kommt \xDF. Und gro\xDF: der Spa\xDF." },
      { w: "\xE4rgern", idea2: "Was findest du doof?", forms: "\xE4rger|\xE4rgr", idea: "Wor\xFCber \xE4rgert sich jemand?", typ: "Verb", syl: ["\xE4r", "gern"], crit: [0], tip: "\xE4, weil es von \xC4rger kommt." },
      { w: "sp\xE4t", idea2: "Denk an die Uhr und ans Zubettgehen.", forms: "sp\xE4t", idea: "Wer kommt zu sp\xE4t?", typ: "Adjektiv", syl: ["sp\xE4t"], crit: [2, 3], tip: "sp\xE4t mit \xE4 \u2013 verl\xE4ngere: sp\xE4ter, deshalb t." },
      { w: "Unterricht", idea2: "Denk an die Schule.", forms: "Unterricht", idea: "Was macht ihr im Unterricht?", art: "der", typ: "Nomen", syl: ["Un", "ter", "richt"], crit: [0, 7, 8], tip: "Gro\xDF, weil Nomen. Am Ende: richt mit ch." }
    ];
    this.sentences = [
      "Pl\xF6tzlich hatte der Hund gro\xDFe Angst.",
      "Im Urlaub haben wir immer viel Spa\xDF.",
      "Die Kinder streiten in der Ecke.",
      "Nach dem Unterricht kommt Paul sp\xE4t nach Hause."
    ];
    this.defaultWeek = { id: "2026-11-09", from: "2026-11-09", to: "2026-11-13", words: this.words, sentences: this.sentences };
    this.loadStore();
    this.applyWeek();
    this.ex = {
      satz: { title: "Satz-Werkstatt", desc: "Erst ansehen, dann nur h\xF6ren \u2013 eigene S\xE4tze schreiben", meta: "3 Runden \xB7 10 W\xF6rter" },
      diktat: { title: "Wort-Diktat", desc: "H\xF6ren und richtig schreiben", meta: "Rechtschreibung \xB7 10 W\xF6rter" },
      silben: { title: "Silben-Schnitt", desc: "W\xF6rter in Silben trennen", meta: "Silbenb\xF6gen \xB7 7 W\xF6rter" },
      koenig: { title: "Silbenk\xF6nige", desc: "In jeder Silbe den K\xF6nig finden", meta: "Vokale \xB7 7 W\xF6rter" },
      plural: { title: "Einer \u2013 viele", desc: "Aus Einzahl wird Mehrzahl", meta: "Einzahl / Mehrzahl \xB7 4 W\xF6rter" },
      wortart: { title: "Wort-Detektiv", desc: "Nomen rot, Verb blau, Adjektiv gr\xFCn", meta: "Wortarten \xB7 10 W\xF6rter" },
      gross: { title: "Gro\xDF oder klein?", desc: "Im Satz die gro\xDFen W\xF6rter finden", meta: "Gro\xDFschreibung \xB7 4 S\xE4tze" },
      abc: { title: "ABC-Reihe", desc: "W\xF6rter wie im W\xF6rterbuch ordnen", meta: "Nachschlagen \xB7 3 Runden" },
      zeichen: { title: "Satz-Ende", desc: "Punkt, Fragezeichen oder Ausrufezeichen?", meta: "Satzarten" },
      gefuehl: { title: "Gef\xFChle-W\xF6rter", desc: "Welches Gef\xFChl passt in den Satz?", meta: "Nomen f\xFCr Gef\xFChle" },
      zerleg: { title: "Wort-Zerleger", desc: "Lange Nomen teilen und nachschlagen", meta: "W\xF6rterbuch" },
      spur: { title: "Schreibschrift", desc: "W\xF6rter mit dem Finger nachspuren", meta: "Schreibschrift \xB7 10 W\xF6rter" },
      heft: { title: "Sch\xF6nschrift", desc: "Ins Heft schreiben und selbst bewerten", meta: "Heft \xB7 10 W\xF6rter" }
    };
    this.zeichen = [
      ["Welche Aufgaben hat ein Klassensprecher", "?"],
      ["Er soll gut vermitteln k\xF6nnen", "."],
      ["Er soll sich mit den meisten Kindern gut verstehen", "."],
      ["Nat\xFCrlich darf er auch lustig sein", ".!"],
      ["W\xE4hlt Hugo", "!"],
      ["Lasst uns mal nach unserem Hochbeet schauen", "!."],
      ["Sind die Kartoffeln schon reif", "?"],
      ["Die M\xF6hren und den Brokkoli k\xF6nnen wir auch ernten", "."],
      ["Kennt jemand ein leckeres Rezept", "?"],
      ["Wir k\xF6nnten einen Auflauf zubereiten", "."],
      ["Der wird lecker", "!."]
    ];
    this.gefuehle = [
      ["An meinem Geburtstag strahle ich vor ___.", "Gl\xFCck"],
      ["Ich weine vor ___, wenn ich mich verletzt habe.", "Schmerz"],
      ["Bei der Nachtwanderung habe ich vor ___ gezittert.", "Angst"],
      ["Wenn ich mich ungerecht behandelt f\xFChle, koche ich vor ___.", "Wut"]
    ];
    this.rewards = [
      ["\u{1F41A}", "Goldmuschel", "Kiki hat sie am Strand gefunden. Sie rauscht, wenn du ein Wort richtig schreibst."],
      ["\u{1F9ED}", "Kompass", "Er zeigt dir immer den Weg zur n\xE4chsten Insel."],
      ["\u{1F52D}", "Fernrohr", "Damit entdeckst du jeden Fehler schon von Weitem."],
      ["\u{1F5DD}\uFE0F", "Goldschl\xFCssel", "Er \xF6ffnet die geheimen T\xFCren der Wort-H\xF6hle."],
      ["\u{1FA99}", "Piratenm\xFCnze", "Ein alter Schatz \u2013 nur f\xFCr echte Wort-Piraten."],
      ["\u2693", "Anker", "Jetzt sitzt dein Wissen fest wie ein Schiff im Hafen."],
      ["\u{1F3DD}\uFE0F", "Geheiminsel", "Nur wer flei\xDFig \xFCbt, findet diese Insel."],
      ["\u{1F451}", "Kiki-Krone", "Die Krone der Kapit\xE4nin \u2013 du bist ein Wortschatz-Profi!"]
    ];
    this.gefExtra = {
      Angst: ["Nachts im Dunkeln habe ich ___ vor Gespenstern.", "Der kleine Hund zittert vor ___ beim Gewitter."],
      Schmerz: ["Nach dem Sturz hatte ich gro\xDFen ___ im Knie.", "Das Pflaster lindert den ___ an der Wunde."],
      Gl\u00FCck: ["Ich hatte viel ___ und habe im Spiel gewonnen.", "Wir w\xFCnschen dir viel ___ zum Geburtstag."],
      Wut: ["Ich habe eine ___ im Bauch, weil du mein Spielzeug kaputt gemacht hast.", "Er stampft vor ___ mit dem Fu\xDF auf den Boden."]
    };
    this.zerleg = [
      { w: "Pausenkiste", cut: 6, a: "die Pause", b: "die Kiste" },
      { w: "Hofdienst", cut: 3, a: "der Hof", b: "der Dienst" },
      { w: "Freundebuch", cut: 7, a: "der Freund", b: "das Buch" },
      { w: "Fu\xDFballtor", cut: 7, a: "der Fu\xDFball", b: "das Tor" }
    ];
    this.bookAbc = [["befehlen", "erlauben", "kr\xE4ftig", "\xE4hnlich"], ["dreckig", "\xFCberqueren", "f\xFChlen", "helfen"], ["Pause", "richtig", "Dienst", "verlieren"]];
    this.state = { screen: "hub", i: 0, phase: "ask", input: "", attempt: "", cuts: [], caps: [], picked: [], wrongPick: "", done: [], msg: "", wasWrong: false, results: null, showIdea: false, self1: false, self2: false, written: [], round: 1, missed: [], tries: 0, dictReady: false, rep: 1, errs: [], stufe: 1, pool: [], repRefs: [], lastReward: null, truheOpen: false, done: this.store.progress.done.slice(), gateAns: "", gateWrong: false, edFrom: "", edTo: "", edText: "", edSent: "", rows: [], edMsg: "", edOk: true, hubMsg: "" };
    try {
      if (window.location.hash === "#eintragen") {
        if (window.WSI && window.WSI.isUnlocked()) {
          this.state.screen = "edit";
          this.state.wantEditor = true;
        } else window.location.replace("Eltern.html");
      }
    } catch (e) {
    }
  }
  syncApp() {
    if (!window.WSI || window.WSI.dev().mode !== "app") return;
    fetch("data/lernwoche.json").then((r) => r.json()).then((d) => {
      const list = d && d.weeks ? d.weeks.slice() : d && d.week ? [d.week] : [];
      list.sort((a, b) => a.from < b.from ? -1 : 1);
      const st = this.store, today = this.iso(/* @__PURE__ */ new Date());
      let changed = false, newCur = false;
      const fresh = (id) => ({ id, done: [], kept: [], flaw: [], opened: 0, bonus: 0 });
      list.forEach((wk) => {
        if (!wk || !wk.id) return;
        if (st.current.id === wk.id || st.next && st.next.id === wk.id || (st.shelf || []).some((b) => b.week.id === wk.id)) return;
        changed = true;
        if (wk.from > today) {
          if (!st.next) st.next = wk;
          return;
        }
        if (st.current.words && st.current.words.length && st.current.from > wk.from) {
          st.shelf = (st.shelf || []).concat([{ week: wk, progress: fresh(wk.id) }]);
          return;
        }
        this.archiveCurrent();
        st.current = wk;
        st.progress = fresh(wk.id);
        newCur = true;
      });
      if (!changed) return;
      this.persist();
      if (newCur) {
        this.applyWeek();
        this.setState(Object.assign({ hubMsg: "Neue Lernwoche aus der App." }, this.reset()));
      } else this.setState({});
    }).catch(() => {
    });
  }
  componentDidUpdate() {
    try {
      this.syncSpur();
    } catch (e) {
    }
  }
  componentDidMount() {
    this.syncApp();
    try {
      fetch("assets/woerter.json").then((r) => r.json()).then((arr) => {
        this.dict = new Set(arr);
        this.dictArr = arr;
        this.rank = /* @__PURE__ */ new Map();
        arr.forEach((w, k) => {
          if (!this.rank.has(w)) this.rank.set(w, k);
        });
        this.setState({ dictReady: true });
      }).catch(() => {
      });
    } catch (e) {
    }
    if (this.state.wantEditor) this.openEditor();
  }
  known(t) {
    return !!this.dict && this.dict.has(t);
  }
  compound(t) {
    for (let i = 3; i < t.length - 2; i++) {
      const a = t.slice(0, i);
      const b = t.slice(i);
      const bb = b[0].toUpperCase() + b.slice(1);
      const cands = a.endsWith("s") ? [a, a.slice(0, -1)] : [a];
      if (cands.some((x) => this.known(x) || this.known(x.toLowerCase()) || this.known(x[0].toUpperCase() + x.slice(1))) && this.known(bb)) return true;
    }
    return false;
  }
  spell(text) {
    if (!this.dict) return [];
    const toks = text.split(" ").map((t) => t.replace(/[.,!?;:„“"()]/g, ""));
    const out = [];
    toks.forEach((t, k) => {
      if (!t || !/^[A-Za-zÄÖÜäöüß-]+$/.test(t)) return;
      const alt = (t[0] === t[0].toUpperCase() ? t[0].toLowerCase() : t[0].toUpperCase()) + t.slice(1);
      if (this.known(t) || k === 0 && this.known(alt) || this.compound(t)) return;
      if (this.known(alt)) {
        out.push({ k, t, kind: alt[0] === alt[0].toUpperCase() ? "gross" : "klein", fix: alt });
        return;
      }
      if (k > 0 && t[0] === t[0].toUpperCase()) return;
      out.push({ k, t, kind: "unbekannt", fix: this.suggest(k === 0 ? t[0].toLowerCase() + t.slice(1) : t) });
    });
    return out;
  }
  dist(a, b) {
    if (Math.abs(a.length - b.length) > 2) return 9;
    const d = [];
    for (let i = 0; i <= a.length; i++) {
      d.push([i]);
    }
    for (let j = 1; j <= b.length; j++) d[0][j] = j;
    for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return d[a.length][b.length];
  }
  suggest(t) {
    if (!this.dictArr) return "";
    const low = t.toLowerCase();
    let best = "";
    let bestScore = 3;
    for (const w of this.dictArr) {
      if (Math.abs(w.length - t.length) > 2) continue;
      const wl = w.toLowerCase();
      const d = Math.min(this.dist(low, wl), this.dist(low.replace(/ß/g, "ss"), wl.replace(/ß/g, "ss")) + 0.4);
      const score = d + (wl[0] === low[0] ? 0 : 1) + (w[0] === t[0] ? 0 : 0.5);
      if (score < bestScore && score > 0) {
        bestScore = score;
        best = w;
        if (score <= 0.4) break;
      }
    }
    return best;
  }
  items(screen) {
    const s = this.state;
    if (screen === "satz" || !s) return this.baseItems(screen);
    const L0 = s.stufe > 1 ? s.pool : this.baseItems(screen);
    return s.rep > 1 ? s.repRefs.map((r) => L0[r]) : L0;
  }
  baseItems(screen) {
    const w = this.words;
    if (screen === "satz") return this.state.round === 3 ? this.state.missed.map((n) => w[n]) : w;
    if (screen === "diktat" || screen === "wortart") return w;
    if (screen === "silben") return w.filter((x) => x.syl.length > 1);
    if (screen === "koenig") return w.filter((x) => !!this.kingTokens(x));
    if (screen === "spur" || screen === "heft") return w;
    if (screen === "plural") return w.filter((x) => !!x.pl);
    if (screen === "gross") return this.grossList();
    if (screen === "abc") return this.abcRounds.concat(this.bookAbc);
    if (screen === "zeichen") return this.zeichen;
    if (screen === "gefuehl") return this.gefuehle;
    if (screen === "zerleg") return this.zerleg;
    return [];
  }
  norm(x) {
    x = String(x || "").trim().replace(/\s+/g, " ");
    try {
      return x.normalize("NFC");
    } catch (e) {
      return x;
    }
  }
  kbKey(k) {
    const s = this.state;
    if (s.phase !== "ask") return;
    if (k === "SHIFT") {
      this.setState({ shift: !s.shift });
      return;
    }
    if (k === "READ") {
      if (s.input.trim()) this.say(s.input, 0.8);
      return;
    }
    if (k === "BACK") {
      this.setState({ input: s.input.slice(0, -1), msg: "" });
      return;
    }
    if (k === "ENTER") {
      if (s.screen === "satz") this.checkSatz();
      else this.check();
      return;
    }
    const max = s.screen === "satz" ? 160 : 32;
    if (s.input.length >= max) return;
    const ch = k === "SPACE" ? " " : s.shift && k !== "\xDF" ? k.toUpperCase() : k;
    this.setState({ input: s.input + ch, shift: false, msg: "" });
  }
  diffHint(v, a) {
    const n = (x) => x.replace(/ß/g, "ss").toLowerCase();
    if (v !== a && v.toLowerCase() === a.toLowerCase()) return "Achte auf gro\xDF und klein: " + (/^[A-ZÄÖÜ]/.test(a) ? "Das Wort beginnt mit einem gro\xDFen Buchstaben. " : "Das Wort beginnt klein. ");
    if (v !== a && n(v) === n(a)) return "\xDF oder ss? ";
    return "";
  }
  kingTokens(it) {
    const re = /^(.*?)(aa|ee|oo|au|äu|eu|ei|ie|ai|[aeiouäöü])(.*)$/i;
    const out = [];
    const syl = it.syl && it.syl.length ? it.syl : [it.w];
    for (let k = 0; k < syl.length; k++) {
      const m = syl[k].match(re);
      if (!m) return null;
      const push = (t, king, first2) => out.push({ t, king, sp: first2 && k > 0 });
      let first = true;
      m[1].split("").forEach((c) => {
        push(c, false, first);
        first = false;
      });
      push(m[2], true, first);
      m[3].split("").forEach((c) => push(c, false, false));
    }
    return out;
  }
  spurText(ctx, it, color, line) {
    const W = 740;
    let sz = 120;
    ctx.textBaseline = "alphabetic";
    for (; sz > 50; sz -= 4) {
      ctx.font = sz + "px 'Schreibschrift', cursive";
      if (ctx.measureText(it.w).width <= W - 70) break;
    }
    const x = (W - ctx.measureText(it.w).width) / 2;
    ctx.fillStyle = color;
    ctx.fillText(it.w, x, 168);
    if (line) {
      ctx.lineWidth = line;
      ctx.lineJoin = "round";
      ctx.strokeStyle = color;
      ctx.strokeText(it.w, x, 168);
    }
  }
  spurSetup() {
    if (this._spurOn) return;
    this._spurOn = true;
    this._strokes = [];
    const self = this;
    const isC = (e) => !!(e.target && e.target.id === "spurc");
    const pos = (e) => {
      const c = document.getElementById("spurc");
      if (!c) return null;
      const r = c.getBoundingClientRect();
      const t = e.touches && e.touches[0] || e.changedTouches && e.changedTouches[0] || e;
      return { x: (t.clientX - r.left) * c.width / r.width, y: (t.clientY - r.top) * c.height / r.height };
    };
    const down = (e) => {
      if (!isC(e) || self.state.screen !== "spur" || self.state.phase !== "ask") return;
      const p = pos(e);
      if (!p) return;
      if (e.cancelable) e.preventDefault();
      self._cur = [p];
      self._strokes.push(self._cur);
      self.spurDraw();
    };
    const move = (e) => {
      if (!self._cur) return;
      const p = pos(e);
      if (!p) return;
      if (e.cancelable) e.preventDefault();
      self._cur.push(p);
      self.spurDraw();
    };
    const up = () => {
      self._cur = null;
    };
    document.addEventListener("touchstart", down, false);
    document.addEventListener("touchmove", move, false);
    document.addEventListener("touchend", up, false);
    document.addEventListener("touchcancel", up, false);
    document.addEventListener("mousedown", down, false);
    document.addEventListener("mousemove", move, false);
    document.addEventListener("mouseup", up, false);
    try {
      if (document.fonts && document.fonts.load) document.fonts.load("96px 'Schreibschrift'").then(() => {
        this._spurKey = null;
        this.syncSpur();
      });
    } catch (e) {
    }
  }
  spurDraw(width, ctx0) {
    const c = document.getElementById("spurc");
    if (!c && !ctx0) return;
    const ctx = ctx0 || c.getContext("2d");
    if (!ctx0) ctx.clearRect(0, 0, 740, 250);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = width || 12;
    ctx.strokeStyle = "#075A54";
    ctx.fillStyle = "#075A54";
    (this._strokes || []).forEach((st) => {
      if (st.length === 1) {
        ctx.beginPath();
        ctx.arc(st[0].x, st[0].y, (width || 12) / 2, 0, 6.3);
        ctx.fill();
        return;
      }
      ctx.beginPath();
      ctx.moveTo(st[0].x, st[0].y);
      for (let k = 1; k < st.length; k++) ctx.lineTo(st[k].x, st[k].y);
      ctx.stroke();
    });
  }
  syncSpur() {
    const s = this.state;
    if (!s || s.screen !== "spur") return;
    this.spurSetup();
    const g = document.getElementById("spurg");
    const c = document.getElementById("spurc");
    if (!g || !c) return;
    const it = this.items("spur")[s.i];
    if (!it) return;
    const wk = [this.store.current.id, s.i, s.rep, s.tries, it.w].join("|");
    if (wk !== this._spurWord) {
      this._spurWord = wk;
      this._strokes = [];
      this._cur = null;
      c.getContext("2d").clearRect(0, 0, 740, 250);
    }
    const key = wk + "|" + s.phase;
    if (key === this._spurKey) return;
    this._spurKey = key;
    const ctx = g.getContext("2d");
    ctx.clearRect(0, 0, 740, 250);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#B8D8E4";
    [[120, 0], [168, 1], [214, 0]].forEach((l) => {
      ctx.beginPath();
      if (ctx.setLineDash) ctx.setLineDash(l[1] ? [] : [8, 8]);
      ctx.moveTo(14, l[0]);
      ctx.lineTo(726, l[0]);
      ctx.stroke();
    });
    if (ctx.setLineDash) ctx.setLineDash([]);
    this.spurText(ctx, it, s.phase === "right" ? "#8FD0C6" : "#C3D4DC");
  }
  spurScore() {
    const c = document.getElementById("spurc");
    const it = this.items("spur")[this.state.i];
    if (!c || !it) return null;
    const mk = () => {
      const x = document.createElement("canvas");
      x.width = 740;
      x.height = 250;
      return x;
    };
    const core = mk(), tol = mk(), thick = mk();
    this.spurText(core.getContext("2d"), it, "#000", 0);
    this.spurText(tol.getContext("2d"), it, "#000", 34);
    this.spurDraw(44, thick.getContext("2d"));
    const d = (x) => x.getContext("2d").getImageData(0, 0, 740, 250).data;
    const a = d(core), b = d(thick), t = d(tol), u = d(c);
    let cn = 0, ch = 0, un = 0, ui = 0;
    for (let p = 3; p < a.length; p += 4) {
      if (a[p] > 100) {
        cn++;
        if (b[p] > 100) ch++;
      }
      if (u[p] > 100) {
        un++;
        if (t[p] > 100) ui++;
      }
    }
    return { none: un < 400, cov: cn ? ch / cn : 0, prec: un ? ui / un : 0 };
  }
  clearSpur() {
    this._strokes = [];
    this._cur = null;
    this.spurDraw();
  }
  rateHeft(n) {
    const s = this.state;
    if (s.phase !== "ask") return;
    if (n === 1) this.setState({ errs: this.errList(), phase: "right", picked: ["1"], msg: "Mut zur \xDCbung \u2013 das schreiben wir gleich noch einmal." });
    else this.setState({ phase: "right", picked: [String(n)], msg: n === 3 ? "Richtig sch\xF6n! \u2728" : "Gut gemacht!" });
  }
  say(text, rate) {
    try {
      const u = new window.SpeechSynthesisUtterance(text);
      u.lang = "de-DE";
      u.rate = rate || 0.85;
      if (window.speechSynthesis.speaking) window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    } catch (e) {
    }
  }
  open(key, stufe) {
    if (!this.baseItems(key).length) return;
    const st = this.isSingle(key) ? 1 : stufe || 1;
    const pool = st > 1 ? this.mkTasks(key, this.baseItems(key).map((_, k) => k), st - 2) : [];
    this.setState(Object.assign({ screen: key, i: 0, rep: 1, errs: [], stufe: st, pool, repRefs: [], lastReward: null }, this.reset(), key === "satz" ? { written: [], round: 1, missed: [] } : {}));
  }
  reset() {
    return { phase: "ask", input: "", attempt: "", cuts: [], caps: [], picked: [], wrongPick: "", msg: "", wasWrong: false, results: null, showIdea: false, self1: false, self2: false, tries: 0, marked: [], shift: false };
  }
  iso(d) {
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  nextMonday() {
    const d = /* @__PURE__ */ new Date();
    const add = (8 - d.getDay()) % 7 || 7;
    d.setDate(d.getDate() + add);
    const f = new Date(d.getTime());
    f.setDate(f.getDate() + 4);
    return [this.iso(d), this.iso(f)];
  }
  weekName(w) {
    const d = w.from ? this.dateLabel(w.from, w.to) : "";
    if (w.title) return w.title + (d ? " \xB7 " + d : "");
    return d || "Eigene W\xF6rter";
  }
  isAppMode() {
    try {
      return window.WSI.dev().mode === "app";
    } catch (e) {
      return false;
    }
  }
  dateLabel(from, to) {
    const p = (x) => {
      const a2 = (x || "").split("-");
      return a2.length === 3 ? [a2[2], a2[1]] : ["", ""];
    };
    const a = p(from);
    const b = p(to || from);
    if (!a[0]) return "";
    if (a[1] === b[1]) return a[0] + ".\u2013" + b[0] + "." + b[1] + ".";
    return a[0] + "." + a[1] + ".\u2013" + b[0] + "." + b[1] + ".";
  }
  loadStore() {
    let st = null;
    try {
      const raw = window.WSILS.getItem("wsi.lernwoche.v1");
      if (raw) st = JSON.parse(raw);
    } catch (e) {
      st = null;
    }
    if (!st || !st.current || !st.current.words) st = { current: this.emptyWeek(), next: null, progress: null };
    const today = this.iso(/* @__PURE__ */ new Date());
    if (st.next && st.next.from <= today) {
      st.shelf = st.shelf || [];
      if (st.progress && st.current && st.current.words.length && st.progress.id === st.current.id) st.shelf.push({ week: st.current, progress: st.progress });
      st.current = st.next;
      st.next = null;
      st.progress = null;
    }
    st.shelf = st.shelf || [];
    if (!st.current.id) st.current.id = st.current.from;
    if (!st.progress || st.progress.id !== st.current.id) st.progress = { id: st.current.id, done: [], kept: [], flaw: [], opened: 0, bonus: 0 };
    const pg = st.progress;
    pg.flaw = pg.flaw || [];
    pg.opened = pg.opened || 0;
    pg.bonus = pg.bonus || 0;
    pg.done = pg.done.map((k) => k.indexOf("#") === -1 ? k + "#1" : k);
    this.store = st;
    this.persist();
  }
  emptyWeek() {
    const t = this.iso(/* @__PURE__ */ new Date());
    return { id: "leer", from: t, to: t, words: [], sentences: [], empty: true };
  }
  archiveCurrent() {
    const st = this.store;
    if (!st.current.words || !st.current.words.length) return;
    st.shelf = (st.shelf || []).filter((b) => b.week.id !== st.current.id);
    st.shelf.push({ week: st.current, progress: st.progress });
    if (st.shelf.length > 40) st.shelf = st.shelf.slice(-40);
  }
  openPack(id) {
    const st = this.store;
    const b = (st.shelf || []).filter((x) => x.week.id === id)[0];
    if (!b) return;
    this.archiveCurrent();
    st.shelf = st.shelf.filter((x) => x.week.id !== id);
    st.current = b.week;
    st.progress = b.progress;
    const pg = st.progress;
    pg.flaw = pg.flaw || [];
    pg.opened = pg.opened || 0;
    pg.bonus = pg.bonus || 0;
    pg.kept = pg.kept || [];
    this.persist();
    this.applyWeek();
    this.setState(Object.assign({ screen: "hub", hubMsg: "Du \xFCbst jetzt: " + this.weekName(b.week) }, this.reset()));
  }
  isSingle(k) {
    return k === "satz" || k === "spur" || k === "heft";
  }
  packTotal() {
    return Object.keys(this.ex).reduce((a, k) => a + (this.isSingle(k) ? 1 : 3), 0);
  }
  packStat(wk, pg) {
    const tot = this.packTotal(), d = Math.min(tot, (pg.done || []).length);
    const status = d === 0 ? "Neu" : d >= tot ? "Geschafft" : "In Arbeit";
    return { d, tot, pct: Math.round(100 * d / tot) + "%", status, label: d + " von " + tot };
  }
  persist() {
    try {
      window.WSILS.setItem("wsi.lernwoche.v1", JSON.stringify(this.store));
    } catch (e) {
    }
  }
  applyWeek() {
    const wk = this.store.current;
    this.words = wk.words;
    this.abcRounds = this.abcFrom(this.words);
  }
  grossList() {
    const wk = this.store.current;
    if (wk.sentences && wk.sentences.length) return wk.sentences;
    return (this.store.progress.kept || []).slice(-6);
  }
  abcFrom(ws) {
    const names = [];
    ws.forEach((x) => {
      if (names.indexOf(x.w) === -1 && x.w.indexOf(" ") === -1) names.push(x.w);
    });
    if (names.length < 3) return [];
    const r = [];
    for (let i = 0; i < names.length && r.length < 4; i += 4) {
      let g = names.slice(i, i + 4);
      if (g.length < 3) g = g.concat(names.filter((n) => g.indexOf(n) === -1).slice(0, 4 - g.length));
      r.push(g);
    }
    return r;
  }
  umlaut(w) {
    for (let i = w.length - 1; i >= 0; i--) {
      const c = w[i].toLowerCase();
      if (c === "u" && i > 0 && w[i - 1].toLowerCase() === "e") {
        i--;
        continue;
      }
      if (c === "u" && i > 0 && w[i - 1].toLowerCase() === "a") {
        const up = w[i - 1] === "A";
        return w.slice(0, i - 1) + (up ? "\xC4" : "\xE4") + w.slice(i);
      }
      const map = { a: "\xE4", o: "\xF6", u: "\xFC" };
      if (map[c] && !(c === "a" && w[i + 1] && w[i + 1].toLowerCase() === "a")) {
        const r = w[i] === c ? map[c] : map[c].toUpperCase();
        return w.slice(0, i) + r + w.slice(i + 1);
      }
      if ("ei\xE4\xF6\xFC".indexOf(c) !== -1 && i < w.length - 2) {
      }
    }
    return w;
  }
  guessTyp(w, art) {
    if (art) return "Nomen";
    if (/^[A-ZÄÖÜ]/.test(w)) return "Nomen";
    const low = w.toLowerCase();
    const other = ["immer", "nie", "oft", "manchmal", "heute", "gestern", "morgen", "jetzt", "gleich", "bald", "schon", "noch", "sehr", "auch", "nur", "und", "oder", "aber", "weil", "dass", "denn", "wenn", "als", "dann", "hier", "dort", "da", "oben", "unten", "neben", "hinter", "vor", "\xFCber", "unter", "zwischen", "gegen", "ohne", "mit", "nach", "bei", "seit", "von", "zu", "vielleicht", "wieder", "zusammen", "drau\xDFen", "drinnen", "links", "rechts", "vorbei", "zur\xFCck", "nichts", "etwas", "alle", "viele", "wer", "wie", "was", "wo", "warum", "wann", "ihr", "wir", "sie", "er", "ich", "du", "mein", "dein", "kein", "ein", "eine", "nachher", "vorher", "sofort", "endlich", "pl\xF6tzlich", "trotzdem", "deshalb", "darum", "genug", "fast", "ganz", "\xFCberall", "nirgends", "irgendwo"];
    if (other.indexOf(low) !== -1) return "anderes";
    if (/(ig|lich|isch|bar|sam|los|haft|voll)$/.test(low)) return "Adjektiv";
    if (/(en|ern|eln)$/.test(low) && low.length > 3) return "Verb";
    return "Adjektiv";
  }
  guessArt(w) {
    const l = w.toLowerCase();
    if (/(ung|heit|keit|schaft|ion|tät|ei|ik|in|e)$/.test(l)) return "die";
    if (/(chen|lein|ment|[^aeiou]um)$/.test(l)) return "das";
    return "der";
  }
  guessPl(w) {
    if (!this.rank) return "";
    const l = w.toLowerCase();
    const uml = this.umlaut(w);
    const has = (x) => this.rank.has(x);
    if (/e$/.test(l)) return has(w + "n") ? w + "n" : "";
    if (/(ung|heit|keit|schaft|ion|tät)$/.test(l)) return w + "en";
    if (/in$/.test(l)) return w + "nen";
    if (/(chen|lein)$/.test(l)) return w;
    if (/(er|el|en)$/.test(l)) return uml !== w && has(uml) ? uml : w;
    const c = [w + "e", uml + "e", w + "er", uml + "er", w + "s", w + "en"].filter((x, k, a) => a.indexOf(x) === k && has(x));
    if (!c.length) return "";
    if (c.indexOf(w + "en") !== -1 && c.length > 1) c.splice(c.indexOf(w + "en"), 1);
    c.sort((a, b) => this.rank.get(a) - this.rank.get(b));
    return c[0];
  }
  sylls(w) {
    if (w.indexOf(" ") !== -1) return [w];
    const l = w.toLowerCase();
    const units = [];
    let i = 0;
    while (i < w.length) {
      let n = 1;
      if (l.slice(i, i + 3) === "sch") n = 3;
      else if (["ch", "ck", "ph", "th", "qu", "ei", "ie", "au", "eu", "\xE4u", "ai", "aa", "ee", "oo"].indexOf(l.slice(i, i + 2)) !== -1) n = 2;
      units.push(w.slice(i, i + n));
      i += n;
    }
    const isV = (u) => "aeiou\xE4\xF6\xFCy".indexOf(u[0].toLowerCase()) !== -1;
    const vi = [];
    units.forEach((u, k) => {
      if (isV(u)) vi.push(k);
    });
    if (vi.length < 2) return [w];
    const cuts = [];
    for (let k = 0; k < vi.length - 1; k++) {
      const c = vi[k + 1] - vi[k] - 1;
      cuts.push(c <= 1 ? vi[k] + 1 : vi[k + 1] - 1);
    }
    const out = [];
    let start = 0;
    cuts.forEach((c) => {
      out.push(units.slice(start, c).join(""));
      start = c;
    });
    out.push(units.slice(start).join(""));
    return out.filter((x) => x);
  }
  autoTip(x) {
    const w = x.w;
    const l = w.toLowerCase();
    const found = [];
    const add = (tip, i, n) => {
      const c = [];
      for (let k = i; k < i + n; k++) c.push(k);
      found.push({ tip, crit: c });
    };
    let m;
    if ((m = l.indexOf("ck")) !== -1) add("Nach kurzem Vokal kommt ck.", m, 2);
    else if ((m = l.indexOf("tz")) !== -1) add("Nach kurzem Vokal kommt tz.", m, 2);
    else if ((m = l.search(/([bdfgklmnprst])\1/)) !== -1) add("Kurzer Vokal \u2013 dann zwei " + l[m] + ".", m, 2);
    if ((m = l.indexOf("\xDF")) !== -1) add("Nach langem Vokal oder ei, au, eu kommt \xDF.", m, 1);
    if ((m = l.indexOf("ie")) !== -1) add("Langes i schreibt man meist ie.", m, 2);
    if ((m = l.search(/[aeiouäöü]h(?![aeiouäöü])/)) !== -1) add("Merkwort: Hier steckt ein h drin.", m + 1, 1);
    if ((m = l.indexOf("\xE4")) !== -1) add("\xE4 oder e? Gibt es ein verwandtes Wort mit a oder au?", m, l[m + 1] === "u" ? 2 : 1);
    if (/^(sp|st)/.test(l)) add("Am Anfang sp/st schreiben \u2013 auch wenn man schp/scht spricht.", 0, 2);
    if (/[bdg]$/.test(l)) add("Verl\xE4ngere das Wort \u2013 dann h\xF6rst du, was ans Ende geh\xF6rt.", l.length - 1, 1);
    const use = found.slice(0, x.typ === "Nomen" ? 1 : 2);
    if (x.typ === "Nomen") use.push({ tip: "Gro\xDF, weil Nomen: " + x.art + " " + w + ".", crit: [0] });
    if (!use.length) use.push({ tip: "Sprich das Wort langsam und deutlich mit.", crit: [] });
    const crit = [];
    use.forEach((u) => u.crit.forEach((k) => {
      if (crit.indexOf(k) === -1) crit.push(k);
    }));
    return { tip: use.map((u) => u.tip).join(" "), crit: crit.sort((a2, b2) => a2 - b2) };
  }
  buildWord(r) {
    const w = r.w.trim();
    const typ = r.typ;
    const x = { w, typ };
    if (typ === "Nomen") {
      x.art = r.art || this.guessArt(w);
      if (r.pl.trim()) x.pl = r.pl.trim();
    }
    const parts = r.syl.split(/[-–·|\s]+/).map((p) => p.trim()).filter((p) => p);
    x.syl = parts.join("") === w ? parts : this.sylls(w);
    const t = this.autoTip(x);
    x.tip = t.tip;
    x.crit = t.crit;
    const esc = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    let forms = [w];
    if (typ === "Nomen" && x.pl && x.pl !== w) forms.push(x.pl);
    if (typ === "Verb") {
      const st = w.replace(/e?n$/, "");
      if (st.length >= 3) {
        const lastE = st.lastIndexOf("e");
        forms = [st, this.umlaut(st)];
        if (lastE > 0) forms.push(st.slice(0, lastE) + "ie" + st.slice(lastE + 1), st.slice(0, lastE) + "i" + st.slice(lastE + 1));
      }
    }
    if (typ === "Adjektiv" && /e$/.test(w) && w.length > 3) forms = [w.slice(0, -1)];
    x.forms = forms.filter((f, k, a) => a.indexOf(f) === k).map(esc).join("|");
    const acc = { der: "den", die: "die", das: "das" };
    if (typ === "Nomen") x.idea = "Erz\xE4hl etwas \xFCber " + acc[x.art] + " " + w + ".";
    else if (typ === "Verb") x.idea = "Wer kann " + w + "? Und wo?";
    else if (typ === "Adjektiv") x.idea = "Was oder wer ist " + w + "?";
    else x.idea = "Erz\xE4hl etwas von deinem Tag mit diesem Wort.";
    x.idea2 = "Wer? Wo? Wann? Denk an zu Hause, die Schule oder deine Freunde.";
    return x;
  }
  rowFrom(w, art, pl) {
    const typ = this.guessTyp(w, art);
    const row = { w, art: "", typ, pl: "", syl: this.sylls(w).join("-"), flag: false };
    if (typ === "Nomen") {
      if (w[0] !== w[0].toUpperCase()) row.w = w[0].toUpperCase() + w.slice(1);
      row.art = art || this.guessArt(row.w);
      row.pl = pl || this.guessPl(row.w);
      if (!art || !pl && !row.pl) row.flag = true;
      if (!pl && row.pl) row.flag = true;
    } else if (typ === "Adjektiv" && !/(ig|lich|isch|bar|sam|los|haft|voll)$/.test(w.toLowerCase())) row.flag = true;
    else if (typ === "Verb") row.flag = false;
    return row;
  }
  parseText(text) {
    const out = [];
    text.split(/\n|;/).forEach((line) => {
      const parts = line.split(/\s*(?:,|\s[–—-]\s)\s*/).map((p) => p.replace(/[^A-Za-zÄÖÜäöüß \-]/g, "").replace(/\s+/g, " ").trim()).filter((p) => p);
      let k = 0;
      while (k < parts.length) {
        let p = parts[k];
        let art = "";
        const m = p.match(/^(der|die|das)\s+(.+)$/i);
        if (m) {
          art = m[1].toLowerCase();
          p = m[2];
        }
        let pl = "";
        if (art && parts[k + 1] && /^die\s+/i.test(parts[k + 1])) {
          pl = parts[k + 1].replace(/^die\s+/i, "");
          k++;
        }
        if (p) out.push({ w: p, art, pl });
        k++;
      }
    });
    return out;
  }
  openEditor() {
    const nm = this.nextMonday();
    const wk = this.store.next;
    const rows = wk ? wk.words.map((x) => ({ w: x.w, art: x.art || "", typ: x.typ, pl: x.pl || "", syl: x.syl.join("-"), flag: false })) : [];
    this.setState({ screen: "edit", edTitle: wk ? wk.title || "" : "", edFrom: wk ? wk.from : this.isAppMode() ? "" : nm[0], edTo: wk ? wk.to : this.isAppMode() ? "" : nm[1], edText: "", edSent: wk ? (wk.sentences || []).join("\n") : "", rows, edMsg: wk ? "Die geplante Woche ist geladen \u2013 du kannst sie \xE4ndern." : "", edOk: true });
  }
  saveWeek(now) {
    const s = this.state;
    const seen = [];
    const rows = s.rows.filter((r) => {
      const w = r.w.trim();
      if (!w || seen.indexOf(w) !== -1) return false;
      seen.push(w);
      return true;
    });
    if (rows.length < 3) {
      this.setState({ edMsg: "Bitte mindestens 3 Lernw\xF6rter eintragen.", edOk: false });
      return;
    }
    if (rows.length > 16) {
      this.setState({ edMsg: "H\xF6chstens 16 W\xF6rter pro Woche, bitte.", edOk: false });
      return;
    }
    const appMode = this.isAppMode();
    if (!s.edFrom && !appMode) {
      this.setState({ edMsg: "Bitte ein Startdatum w\xE4hlen.", edOk: false });
      return;
    }
    const sentences = s.edSent.split("\n").map((t) => t.replace(/\s+/g, " ").trim()).filter((t) => t.split(" ").length >= 3).map((t) => /[.!?]$/.test(t) ? t : t + ".");
    const week = { id: (s.edFrom || "eigen") + "#" + Date.now(), from: s.edFrom || "", to: s.edTo || s.edFrom || "", title: (s.edTitle || "").trim().slice(0, 30), source: "own", added: Date.now(), words: rows.map((r) => this.buildWord(r)), sentences };
    if (appMode) {
      this.store.shelf = (this.store.shelf || []).concat([{ week, progress: { id: week.id, done: [], kept: [], flaw: [], opened: 0, bonus: 0 } }]);
      this.persist();
      this.setState({ screen: "regal", hubMsg: "" });
      return;
    }
    const today = this.iso(/* @__PURE__ */ new Date());
    if (now || week.from <= today) {
      this.archiveCurrent();
      this.store.current = week;
      this.store.progress = { id: week.id, done: [], kept: [], flaw: [], opened: 0, bonus: 0 };
      if (this.store.next && (now || this.store.next.from <= today)) this.store.next = null;
      this.persist();
      this.applyWeek();
      this.setState(Object.assign({ screen: "hub", i: 0, done: [], hubMsg: "Neue Lernwoche ist gestartet: " + rows.length + " W\xF6rter." }, this.reset()));
    } else {
      this.store.next = week;
      this.persist();
      this.setState({ screen: "hub", hubMsg: "" });
    }
  }
  editVals() {
    const s = this.state;
    const typs = ["Nomen", "Verb", "Adjektiv", "anderes"];
    const cls = { Nomen: "btn-red", Verb: "btn-blue", Adjektiv: "btn-green", anderes: "btn-soft" };
    const arts = ["der", "die", "das"];
    const upd = (k, patch) => {
      const rows = s.rows.slice();
      rows[k] = Object.assign({}, rows[k], patch, { flag: false });
      this.setState({ rows, edMsg: "" });
    };
    const cur = this.store.current;
    return {
      edTitle: s.edTitle || "",
      onTitle: (e) => this.setState({ edTitle: e.target.value }),
      edOwnMode: !this.isAppMode(),
      edHeading: this.isAppMode() ? "Eigene Lernw\xF6rter f\xFCrs Lernregal" : "Lernw\xF6rter f\xFCr die kommende Woche",
      edFromLabel: this.isAppMode() ? "Von (optional)" : "Von",
      edToLabel: this.isAppMode() ? "Bis (optional)" : "Bis",
      edCurrentInfo: "Aktuell: " + this.weekName(cur) + " \xB7 " + cur.words.length + " W\xF6rter",
      loadCurrent: () => {
        const wk = this.store.current;
        this.setState({ edTitle: wk.title || "", edFrom: wk.from, edTo: wk.to, edSent: (wk.sentences || []).join("\n"), rows: wk.words.map((x) => ({ w: x.w, art: x.art || "", typ: x.typ, pl: x.pl || "", syl: x.syl.join("-"), flag: false })), edMsg: "Die aktuelle Woche ist geladen. \u201ESofort starten\u201C \xFCbernimmt die \xC4nderungen (Fortschritt beginnt neu).", edOk: true });
      },
      edFrom: s.edFrom,
      edTo: s.edTo,
      onFrom: (e) => this.setState({ edFrom: e.target.value }),
      onTo: (e) => this.setState({ edTo: e.target.value }),
      edText: s.edText,
      onEdText: (e) => this.setState({ edText: e.target.value }),
      edTextEmpty: s.edText.trim() === "",
      edSent: s.edSent,
      onEdSent: (e) => this.setState({ edSent: e.target.value }),
      analyze: () => {
        const have = s.rows.map((r) => r.w.toLowerCase());
        const add = this.parseText(s.edText).filter((p) => have.indexOf(p.w.toLowerCase()) === -1).map((p) => this.rowFrom(p.w, p.art, p.pl));
        this.setState({ rows: s.rows.concat(add), edText: "", edMsg: add.length ? add.length + " W\xF6rter \xFCbernommen." : "Keine neuen W\xF6rter gefunden.", edOk: true });
      },
      edCount: s.rows.length ? s.rows.length + " Lernw\xF6rter" : "Noch keine Lernw\xF6rter",
      noRows: s.rows.length === 0,
      rows: s.rows.map((r, k) => ({
        w: r.w,
        pl: r.pl,
        syl: r.syl,
        bg: r.flag ? "#FFF4C7" : "#F6F9F1",
        artLabel: r.typ === "Nomen" ? r.art || "der" : "\u2013",
        noArt: r.typ !== "Nomen",
        noPl: r.typ !== "Nomen",
        plHint: r.typ === "Nomen" ? "keine" : "",
        typLabel: r.typ === "anderes" ? "Anderes" : r.typ,
        typCls: cls[r.typ],
        delLabel: r.w + " l\xF6schen",
        cycleArt: () => upd(k, { art: arts[(arts.indexOf(r.art) + 1) % 3] }),
        cycleTyp: () => {
          const t = typs[(typs.indexOf(r.typ) + 1) % 4];
          const patch = { typ: t };
          if (t === "Nomen") {
            patch.w = r.w ? r.w[0].toUpperCase() + r.w.slice(1) : r.w;
            patch.art = r.art || this.guessArt(r.w);
            patch.pl = r.pl || this.guessPl(patch.w);
          } else if (r.typ === "Nomen" && r.w) patch.w = r.w[0].toLowerCase() + r.w.slice(1);
          upd(k, patch);
        },
        onW: (e) => {
          const w = e.target.value;
          const old = r.sylAuto !== false && r.syl === this.sylls(r.w).join("-");
          upd(k, Object.assign({ w }, old ? { syl: this.sylls(w.trim()).join("-") } : {}));
        },
        onPl: (e) => upd(k, { pl: e.target.value }),
        onSyl: (e) => upd(k, { syl: e.target.value }),
        del: () => this.setState({ rows: s.rows.filter((_, j) => j !== k) })
      })),
      addRow: () => this.setState({ rows: s.rows.concat([{ w: "", art: "der", typ: "Nomen", pl: "", syl: "", flag: false }]) }),
      edMsg: s.edMsg,
      edMsgColor: s.edOk ? "#0C7C74" : "#B45309",
      saveNow: () => this.saveWeek(true),
      savePlan: () => this.saveWeek(false),
      planLabel: this.isAppMode() ? "Ins Lernregal legen" : s.edFrom ? "Ab " + s.edFrom.split("-")[2] + "." + s.edFrom.split("-")[1] + ". planen" : "Planen"
    };
  }
  shuf(a) {
    const r = a.slice();
    for (let i = r.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = r[i];
      r[i] = r[j];
      r[j] = t;
    }
    return r;
  }
  errList() {
    const s = this.state;
    const ref = s.rep > 1 && s.screen !== "satz" ? s.repRefs[s.i] : s.i;
    return s.errs.indexOf(ref) === -1 ? s.errs.concat([ref]) : s.errs;
  }
  refName(screen, ref) {
    const b = this.baseItems(screen)[ref];
    if (!b) return "";
    if (typeof b === "string") return b.split(" ").slice(0, 3).join(" ") + " \u2026";
    if (Array.isArray(b)) return screen === "abc" ? "ABC-Runde " + (ref + 1) : screen === "gefuehl" ? b[1] : b[0].split(" ").slice(0, 3).join(" ") + " \u2026";
    return b.w;
  }
  flipCase(t) {
    return (t[0] === t[0].toUpperCase() ? t[0].toLowerCase() : t[0].toUpperCase()) + t.slice(1);
  }
  misspell(w) {
    const out = [];
    const cap = /^[A-ZÄÖÜ]/.test(w);
    const l = w.toLowerCase();
    const add = (x) => {
      if (!x || x === l) return;
      const r = cap ? x[0].toUpperCase() + x.slice(1) : x;
      if (r !== w && out.indexOf(r) === -1) out.push(r);
    };
    let m;
    if (/ck/.test(l)) add(l.replace("ck", "k"));
    if (/tz/.test(l)) add(l.replace("tz", "z"));
    if (m = l.match(/([bdfgklmnprst])\1/)) add(l.replace(m[0], m[1]));
    if (/ß/.test(l)) add(l.replace("\xDF", "ss"));
    if (/ss/.test(l)) add(l.replace("ss", "\xDF"));
    if (/ie/.test(l)) add(l.replace("ie", "i"));
    if (/äu/.test(l)) add(l.replace("\xE4u", "eu"));
    else if (/eu/.test(l)) add(l.replace("eu", "\xE4u"));
    if (/ä/.test(l)) add(l.replace("\xE4", "e"));
    if (/ö/.test(l)) add(l.replace("\xF6", "e"));
    if (/ü/.test(l)) add(l.replace("\xFC", "u"));
    if (/[bdg]$/.test(l)) add(l.replace(/b$/, "p").replace(/d$/, "t").replace(/g$/, "k"));
    if (m = l.match(/([aeiouäöü])h(?=[^aeiouäöü])/)) add(l.replace(m[0], m[1]));
    if (/^f/.test(l)) add("v" + l.slice(1));
    if (/^v/.test(l)) add("f" + l.slice(1));
    if (/^st/.test(l)) add("scht" + l.slice(2));
    if (/^sp/.test(l)) add("schp" + l.slice(2));
    return out;
  }
  wrongSpells(w) {
    const wrong = [];
    if (/^[A-ZÄÖÜ]/.test(w)) wrong.push(w[0].toLowerCase() + w.slice(1));
    const c = this.shuf(this.misspell(w));
    while (wrong.length < 2 && c.length) wrong.push(c.pop());
    for (let i = 1; wrong.length < 2 && i < w.length - 1; i++) {
      if (w[i] !== w[i + 1]) {
        const x = w.slice(0, i) + w[i + 1] + w[i] + w.slice(i + 2);
        if (wrong.indexOf(x) === -1 && x !== w) wrong.push(x);
      }
    }
    return wrong;
  }
  plDistr(w, pl) {
    const u = this.umlaut(w);
    const c = [w + "e", w + "en", w + "n", w + "er", w + "s", u + "e", u + "er", u, w].filter((x, k, a) => x !== pl && a.indexOf(x) === k);
    return this.shuf(c).slice(0, 2);
  }
  mkTasks(screen, refs, v) {
    const base = this.baseItems(screen);
    return refs.map((ref) => {
      const it = base[ref];
      let t = this.mkTask(screen, it, v) || this.mkTask(screen, it, 1 - v);
      if (!t) t = { mode: "type", prompt: "Noch einmal \xFCben.", sub: "H\xF6r zu und schreib das Wort.", show: "", speak: it.w || "", answer: it.w || "", okMsg: "Richtig!", badMsg: "Fast \u2013 h\xF6r noch einmal hin." };
      t.ref = ref;
      return t;
    });
  }
  mkTask(screen, it, v) {
    const lab = { Nomen: "ein Nomen", Verb: "ein Verb", Adjektiv: "ein Adjektiv", anderes: "kein Nomen, Verb oder Adjektiv" };
    if (screen === "diktat") {
      if (v === 0) {
        const wr = this.wrongSpells(it.w);
        if (wr.length < 2) return null;
        return { mode: "choice", prompt: "Welche Schreibweise ist richtig?", sub: "H\xF6r das Wort und tippe die richtige Schreibweise.", show: "", speak: it.w, options: this.shuf([it.w].concat(wr.slice(0, 2))), answer: it.w, okMsg: "Richtig! " + it.tip, badMsg: "Nicht ganz. Tipp: " + it.tip };
      }
      const idx = it.crit.length ? it.crit : [Math.min(1, it.w.length - 1)];
      return { mode: "type", alt: idx.map((k) => it.w[k]).join(""), prompt: "Schreib das ganze Wort.", sub: "Die L\xFCcken sind die kniffligen Stellen. Du darfst auch nur die fehlenden Buchstaben tippen.", show: it.w.split("").map((ch, k) => idx.indexOf(k) !== -1 ? "_" : ch).join(""), speak: it.w, answer: it.w, okMsg: "Richtig! " + it.tip, badMsg: "Fast! Tipp: " + it.tip };
    }
    if (screen === "silben") {
      if (v === 0) {
        let o = this.shuf(it.syl);
        for (let k = 0; k < 6 && o.join("|") === it.syl.join("|"); k++) o = this.shuf(it.syl);
        return { mode: "order", prompt: "Baue das Wort aus den Silben.", sub: "Tippe die Silben in der richtigen Reihenfolge.", show: "", speak: it.w, options: o, answer: it.syl, okMsg: "Genau! " + it.syl.join(" \u2013 "), badMsg: "Nicht ganz. Sprich das Wort langsam und klatsche mit." };
      }
      const n = it.syl.length;
      return { mode: "choice", prompt: "Wie viele Silben hat das Wort?", sub: "Klatsche beim Sprechen mit.", show: it.w, speak: it.syl.join(" - "), slow: true, options: ["1", "2", "3", "4"].slice(0, Math.max(3, Math.min(4, n + 1))), answer: String(n), okMsg: "Richtig! " + it.syl.join(" \u2013 "), badMsg: "Nicht ganz. Sprich langsam und klatsche bei jeder Silbe." };
    }
    if (screen === "plural") {
      if (v === 0) {
        const d = this.plDistr(it.w, it.pl);
        if (d.length < 2) return null;
        return { mode: "choice", prompt: "Wie hei\xDFt die Mehrzahl?", sub: "Sprich \u201Eviele \u2026\u201C laut.", show: it.art + " " + it.w, options: this.shuf([it.pl].concat(d)), answer: it.pl, okMsg: "Richtig! " + it.art + " " + it.w + " \u2013 die " + it.pl + ".", badMsg: "Nicht ganz. Sprich \u201Eviele \u2026\u201C laut und h\xF6r aufs Ende." };
      }
      return { mode: "choice", prompt: "Wie hei\xDFt das Wort in der Einzahl?", sub: "Welcher Artikel passt?", show: "die " + it.pl, options: this.shuf(["der", "die", "das"].map((a) => a + " " + it.w)), answer: it.art + " " + it.w, okMsg: "Richtig! " + it.art + " " + it.w + " \u2013 die " + it.pl + ".", badMsg: "Probier: der, die oder das \u2013 was klingt richtig?" };
    }
    if (screen === "wortart") {
      const others = this.words.filter((x) => x.typ !== it.typ);
      if (v === 0) {
        if (others.length < 2) return null;
        const p = this.shuf(others);
        return { mode: "choice", upper: true, prompt: "Welches Wort ist " + lab[it.typ] + "?", sub: "Tippe das passende Wort.", show: "", options: this.shuf([it.w, p[0].w, p[1].w]), answer: it.w, okMsg: "Richtig! " + (it.typ === "Nomen" ? it.art + " " + it.w + " \u2013 Nomen schreibt man gro\xDF." : it.w + " ist " + lab[it.typ] + "."), badMsg: "Nicht ganz. Nomen: der, die, das \xB7 Verb: ich \u2026 \xB7 Adjektiv: Wie ist etwas?" };
      }
      const truth = Math.random() < 0.5;
      const keys = Object.keys(lab).filter((k) => k !== it.typ);
      const shown = truth ? it.typ : keys[Math.floor(Math.random() * keys.length)];
      return { mode: "choice", prompt: "Stimmt das?", sub: "Denk an die Tipps: der/die/das, ich \u2026, Wie ist etwas?", show: it.w.replace(/ß/g, "\u1E9E").toUpperCase() + " ist " + lab[shown] + ".", options: ["Stimmt", "Stimmt nicht"], answer: truth ? "Stimmt" : "Stimmt nicht", okMsg: "Richtig! " + it.w + " ist " + lab[it.typ] + ".", badMsg: "Nicht ganz. Pr\xFCfe: Passt der, die oder das davor? Passt \u201Eich \u2026\u201C?" };
    }
    if (screen === "gross") {
      const end = (it.match(/[.!?]$/) || ["."])[0];
      const toks = it.replace(/[.!?]$/, "").split(" ");
      const fl = this.shuf(toks.map((_, k) => k));
      if (v === 0) {
        const mk = (k) => toks.map((t, j) => j === k ? this.flipCase(t) : t).join(" ") + end;
        return { mode: "choice", wide: true, prompt: "Welcher Satz ist richtig geschrieben?", sub: "Achte auf gro\xDF und klein.", show: "", options: this.shuf([it, mk(fl[0]), mk(fl[1])]), answer: it, okMsg: "Richtig! Satzanfang und Nomen schreibt man gro\xDF.", badMsg: "Nicht ganz. Trick: Kann ich der, die oder das davorsetzen?" };
      }
      const wr = toks.map((t, j) => j === fl[0] ? this.flipCase(t) : t);
      return { mode: "choice", prompt: "Ein Wort ist falsch geschrieben.", sub: "Tippe das Wort, bei dem gro\xDF oder klein nicht stimmt.", show: wr.join(" ") + end, options: wr, answer: wr[fl[0]], okMsg: "Genau! Richtig hei\xDFt es: " + toks[fl[0]], badMsg: "Nicht ganz. Trick: Kann ich der, die oder das davorsetzen?" };
    }
    if (screen === "abc") {
      const g = this.shuf(it).slice(0, 3);
      const sorted = g.slice().sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase(), "de"));
      const first = v === 0;
      return { mode: "choice", prompt: first ? "Welches Wort kommt im W\xF6rterbuch zuerst?" : "Welches Wort kommt im W\xF6rterbuch zuletzt?", sub: "Schau auf den ersten Buchstaben. \xE4 wird wie a einsortiert.", show: "", options: g, answer: first ? sorted[0] : sorted[sorted.length - 1], okMsg: "Richtig! " + sorted.join(" \u2013 "), badMsg: "Schau auf den ersten Buchstaben. Welcher kommt im ABC fr\xFCher?" };
    }
    if (screen === "zeichen") {
      const mk = it[1][0];
      if (v === 0) {
        const names = ["Aussagesatz", "Fragesatz", "Aufforderung oder Ausruf"];
        return { mode: "choice", wide: true, prompt: "Welche Satzart ist das?", sub: "Aussage (.) \xB7 Frage (?) \xB7 Aufforderung oder Ausruf (!)", show: it[0] + mk, options: names, answer: names[mk === "." ? 0 : mk === "?" ? 1 : 2], okMsg: "Richtig! Am Ende steht: " + mk, badMsg: "Lies den Satz laut: Fragt er etwas? Fordert er auf?" };
      }
      const oth = this.zeichen.filter((z) => z[1].indexOf(mk) === -1);
      if (oth.length < 2) return null;
      return { mode: "choice", wide: true, prompt: "Welcher Satz braucht " + { ".": "einen Punkt", "?": "ein Fragezeichen", "!": "ein Ausrufezeichen" }[mk] + "?", sub: "Lies die S\xE4tze laut.", show: "", options: this.shuf([it[0]].concat(this.shuf(oth).slice(0, 2).map((z) => z[0]))), answer: it[0], okMsg: "Richtig! " + it[0] + mk, badMsg: "Lies die S\xE4tze laut: Welcher passt?" };
    }
    if (screen === "gefuehl") {
      const ex = this.gefExtra[it[1]][v === 0 ? 0 : 1];
      const full = ex.replace("___", it[1]);
      if (v === 0) return { mode: "choice", prompt: "Welches Gef\xFChl passt?", sub: "Angst, Schmerz, Gl\xFCck oder Wut", show: ex.replace("___", "\u25A2\u25A2\u25A2"), options: this.shuf(["Angst", "Schmerz", "Gl\xFCck", "Wut"]), answer: it[1], okMsg: "Richtig! " + full, badMsg: "Lies den Satz mit dem Wort laut: Passt es?" };
      return { mode: "type", prompt: "Schreib das passende Gef\xFChl-Wort.", sub: "Gef\xFChle sind Nomen \u2013 denk an den Anfangsbuchstaben.", show: ex.replace("___", "\u25A2\u25A2\u25A2"), answer: it[1], okMsg: "Richtig! " + full, badMsg: "Nicht ganz. Gef\xFChle sind Nomen und werden gro\xDFgeschrieben." };
    }
    if (screen === "koenig") {
      const tk = this.kingTokens(it);
      if (!tk) return null;
      const kings = tk.filter((t) => t.king).map((t) => t.t.toLowerCase());
      const word = it.syl.join(" \xB7 ");
      const bad = "Nicht ganz. Jede Silbe hat genau einen K\xF6nig \u2013 einen Vokal oder Doppellaut.";
      if (v === 0) {
        const pick = tk.filter((t) => t.king)[Math.floor(Math.random() * kings.length)].t;
        const oth = [];
        tk.forEach((t) => {
          const l = t.t.toLowerCase();
          if (!t.king && kings.indexOf(l) === -1 && oth.indexOf(l) === -1) oth.push(l);
        });
        if (oth.length < 2) return null;
        return { mode: "choice", prompt: "Welcher Teil ist ein K\xF6nig?", sub: "In jeder Silbe wohnt genau ein K\xF6nig.", show: word, options: this.shuf([pick.toLowerCase()].concat(this.shuf(oth).slice(0, 2))), answer: pick.toLowerCase(), okMsg: "Richtig! Die K\xF6nige: " + kings.join(" \u2013 ") + ".", badMsg: bad };
      }
      const V = ["a", "e", "i", "o", "u", "au", "ei", "ie"];
      const ans = kings.join(" \u2013 ");
      const alts = [];
      const add = (a) => {
        const x = a.join(" \u2013 ");
        if (x !== ans && alts.indexOf(x) === -1) alts.push(x);
      };
      this.shuf(kings.map((_, k) => k)).forEach((k) => {
        const a = kings.slice();
        a[k] = this.shuf(V.filter((x) => x !== kings[k]))[0];
        add(a);
      });
      const cons = tk.filter((t) => !t.king).map((t) => t.t.toLowerCase());
      if (cons.length) this.shuf(kings.map((_, k) => k)).forEach((k) => {
        const a = kings.slice();
        a[k] = cons[Math.floor(Math.random() * cons.length)];
        add(a);
      });
      if (alts.length < 2) return null;
      return { mode: "choice", prompt: "Welche K\xF6nige wohnen im Wort?", sub: "Sprich das Wort in Silben.", show: word, options: this.shuf([ans].concat(this.shuf(alts).slice(0, 2))), answer: ans, okMsg: "Richtig! Die K\xF6nige: " + ans + ".", badMsg: bad, speak: it.syl.join(" - "), slow: true };
    }
    if (screen === "zerleg") {
      const A = it.a.replace(/^(der|die|das) /, "");
      const B = it.b.replace(/^(der|die|das) /, "");
      const b = B[0].toLowerCase() + B.slice(1);
      const show = it.a + " + " + it.b;
      if (v === 0) {
        const wr = this.shuf([A + b, A + "n" + b, A + "s" + b, A + "e" + b, A + B].filter((x, k, a) => x !== it.w && a.indexOf(x) === k)).slice(0, 2);
        return { mode: "choice", prompt: "Wie schreibt man das zusammengesetzte Nomen?", sub: "Achte auf kleine Buchstaben in der Mitte und auf Fugen-n.", show, options: this.shuf([it.w].concat(wr)), answer: it.w, okMsg: "Richtig! " + show + " = " + it.w, badMsg: "Nicht ganz. Das zweite Nomen wird mitten im Wort klein geschrieben." };
      }
      return { mode: "type", prompt: "Schreib das zusammengesetzte Nomen.", sub: "Setz die beiden Nomen zu einem Wort zusammen.", show, answer: it.w, okMsg: "Richtig! " + show + " = " + it.w, badMsg: "Fast! Mitten im Wort schreibt man klein \u2013 manchmal steht ein n oder s dazwischen." };
    }
    return null;
  }
  pickTask(o) {
    const s = this.state;
    const t = this.items(s.screen)[s.i];
    if (!t || s.phase !== "ask") return;
    if (t.mode === "order") {
      if (o === t.answer[s.picked.length]) {
        const p = s.picked.concat([o]);
        if (p.length === t.answer.length) this.setState({ picked: p, phase: "right", msg: t.okMsg });
        else this.setState({ picked: p, msg: "" });
      } else this.setState({ errs: this.errList(), msg: t.badMsg });
      return;
    }
    if (o === t.answer) this.setState({ phase: "right", wrongPick: "", msg: t.okMsg });
    else this.setState({ errs: this.errList(), wrongPick: o, msg: t.badMsg });
  }
  checkTask() {
    const s = this.state;
    const t = this.items(s.screen)[s.i];
    const v = this.norm(s.input);
    if (!t || s.phase !== "ask" || !v) return;
    if (v === t.answer || t.alt && v === t.alt) this.setState({ phase: "right", msg: t.okMsg });
    else this.setState({ errs: this.errList(), msg: this.diffHint(v, t.answer) + t.badMsg });
  }
  right(msg) {
    this.setState({ phase: "right", msg });
  }
  check() {
    const s = this.state;
    if (s.stufe > 1 && s.screen !== "satz") return this.checkTask();
    const it = this.items(s.screen)[s.i];
    if (s.screen === "diktat") {
      const v = this.norm(s.input);
      if (!v) return;
      if (v === it.w) this.setState({ phase: "right", attempt: v, wasWrong: false, msg: "Richtig! " + it.tip });
      else this.setState({ errs: this.errList(), phase: "right", attempt: v, wasWrong: true, msg: "Fast! " + this.diffHint(v, it.w) + it.tip });
    }
    if (s.screen === "silben") {
      const expected = [];
      let pos = 0;
      it.syl.slice(0, -1).forEach((p) => {
        pos += p.length;
        expected.push(pos);
      });
      const got = s.cuts.slice().sort((a, b) => a - b);
      if (got.join(",") === expected.join(",")) this.right("Genau! " + it.syl.join(" \u2013 ") + (it.w === "Ecke" ? ". ck bleibt zusammen!" : "."));
      else this.setState({ errs: this.errList(), msg: "Noch nicht. Sprich langsam und klatsche bei jeder Silbe." });
    }
    if (s.screen === "koenig") {
      const tk = this.kingTokens(it);
      const kg = [];
      tk.forEach((t, k) => {
        if (t.king) kg.push(k);
      });
      const got = s.picked.slice().sort((a, b) => a - b);
      if (got.join(",") === kg.join(",")) this.right("Genau! Die K\xF6nige: " + tk.filter((t) => t.king).map((t) => t.t.toLowerCase()).join(" \u2013 ") + ".");
      else if (got.length !== kg.length) this.setState({ errs: this.errList(), msg: "Noch nicht. Jede Silbe hat genau einen K\xF6nig. Wie viele Silben hat das Wort?" });
      else this.setState({ errs: this.errList(), msg: "Fast! K\xF6nige sind a, e, i, o, u, \xE4, \xF6, \xFC und au, \xE4u, eu, ei, ie." });
    }
    if (s.screen === "spur") {
      const r = this.spurScore();
      if (!r) return;
      if (r.none) {
        this.setState({ msg: "Fahr das Wort mit dem Finger nach \u2013 von links nach rechts." });
        return;
      }
      if (r.cov >= 0.6 && r.prec >= 0.5) this.right("Sauber gespurt!");
      else if (s.tries >= 2) this.setState({ errs: this.errList(), phase: "right", msg: "Gut gek\xE4mpft! Das spuren wir sp\xE4ter noch einmal." });
      else this.setState({ tries: s.tries + 1, msg: r.cov < 0.6 ? "Da fehlt noch ein St\xFCck. Spur das ganze Wort nach." : "Bleib n\xE4her an der Linie \u2013 versuch es noch einmal." });
    }
    if (s.screen === "zerleg") {
      if (s.cuts.length === 1 && s.cuts[0] === it.cut) this.right("Genau! Im W\xF6rterbuch suchst du: " + it.a + " und " + it.b + ".");
      else if (s.cuts.length > 1) this.setState({ errs: this.errList(), msg: "Nur ein Strich: Teile das Wort in zwei Nomen." });
      else this.setState({ errs: this.errList(), msg: "Noch nicht. Welche zwei Nomen stecken darin? Tipp: Manchmal steht ein n oder s dazwischen." });
    }
    if (s.screen === "plural") {
      const v = this.norm(s.input);
      if (!v) return;
      if (v === it.pl) this.right(it.pl === it.w ? "Richtig! Bei " + it.w + " bleibt es gleich \u2013 nur der Artikel wird zu \u201Edie\u201C." : "Richtig! " + it.art + " " + it.w + " \u2013 die " + it.pl + ".");
      else this.setState({ errs: this.errList(), msg: /[äöü]/.test(it.pl) ? "Tipp: Hier wird aus a ein \xE4. Sprich \u201Eviele \u2026\u201C laut." : "Tipp: Sprich \u201Eviele \u2026\u201C laut und h\xF6r aufs Ende." });
    }
    if (s.screen === "gross") {
      const toks = it.replace(/[.!?]$/, "").split(" ");
      const wrong = toks.filter((t, k) => t[0] === t[0].toUpperCase() !== (s.caps.indexOf(k) !== -1));
      if (!wrong.length) this.right("Super! Satzanfang und Nomen schreibt man gro\xDF.");
      else this.setState({ errs: this.errList(), msg: "Noch " + wrong.length + " Wort" + (wrong.length > 1 ? "e" : "") + " falsch. Trick: Kann ich der, die oder das davorsetzen?" });
    }
  }
  checkSatz() {
    const s = this.state;
    const it = this.items("satz")[s.i];
    const text = this.norm(s.input);
    if (!text) return;
    const tries = s.tries + 1;
    const toks = text.split(" ").map((t) => t.replace(/[.,!?;:„“"]/g, ""));
    const re = new RegExp(it.forms, "i");
    const k = toks.findIndex((t) => re.test(t));
    const isNoun = it.typ === "Nomen";
    let wordOk = false;
    let wordMsg = "Ich finde das Lernwort nicht richtig geschrieben. So schreibt man es: " + (it.art ? it.art + " " : "") + it.w;
    if (k !== -1) {
      const t = toks[k];
      const strict = new RegExp(it.forms);
      const first = t[0];
      if (isNoun && first !== first.toUpperCase()) wordMsg = it.w + " ist ein Nomen \u2013 schreib es gro\xDF.";
      else if (!isNoun && k > 0 && first !== first.toLowerCase()) wordMsg = it.w + " ist kein Nomen \u2013 mitten im Satz schreibt man es klein.";
      else if (!strict.test(k === 0 && !isNoun ? t[0].toLowerCase() + t.slice(1) : t)) wordMsg = "Schau noch einmal genau: " + it.w;
      else wordOk = true;
    }
    const results = [
      { label: "Lernwort richtig geschrieben", ok: wordOk, tip: wordOk ? "" : wordMsg },
      { label: "Gro\xDFer Anfangsbuchstabe", ok: text[0] === text[0].toUpperCase() && text[0] !== text[0].toLowerCase(), tip: "Ein Satz beginnt immer gro\xDF." },
      { label: "Punkt, ! oder ? am Ende", ok: /[.!?]$/.test(text), tip: "Am Satzende steht ein Punkt." },
      { label: "Mindestens 4 W\xF6rter", ok: toks.filter((t) => t).length >= 4, tip: "Erz\xE4hl noch etwas mehr: Wer? Wo? Wann?" }
    ];
    const flagged = this.spell(text).filter((f) => f.k !== k || !wordOk);
    const spellTips = flagged.map((f) => f.kind === "gross" ? "\u201E" + f.t + "\u201C \u2013 gro\xDF?" : f.kind === "klein" ? "\u201E" + f.t + "\u201C \u2013 klein?" : tries >= 2 && f.fix ? "\u201E" + f.t + "\u201C \u2192 " + f.fix : "\u201E" + f.t + "\u201C \u2013 Stolperstelle?");
    results.push({ label: this.dict ? "Alle W\xF6rter richtig geschrieben" : "Rechtschreibpr\xFCfung l\xE4dt \u2026", ok: flagged.length === 0, tip: spellTips.join("  \xB7  ") });
    const idx = this.words.indexOf(it);
    let missed = s.missed;
    if (tries === 1 && !wordOk && s.round < 3 && missed.indexOf(idx) === -1) missed = missed.concat([idx]);
    const hardOk = results.slice(0, 4).every((r) => r.ok);
    const allOk = hardOk && flagged.length === 0;
    const letPass = hardOk && !allOk && tries >= 2;
    const msg = allOk ? "Stark! Jetzt noch einmal vorlesen und selbst pr\xFCfen." : letPass ? "Die Wortliste kennt nicht jedes Wort. Wenn du sicher bist, darfst du weiter \u2013 Mama oder Papa schauen sp\xE4ter dr\xFCber." : "Fast! Schau auf die Hinweise und verbessere deinen Satz.";
    this.setState({ results, tries, missed, marked: flagged.map((f) => f.k), phase: allOk || letPass ? "self" : "ask", msg });
  }
  saveSatz() {
    const s = this.state;
    const text = s.input.trim().replace(/\s+/g, " ");
    const pr = this.store.progress;
    if (/^[A-ZÄÖÜ][A-Za-zÄÖÜäöüß ,]+[.!?]$/.test(text) && text.split(" ").length >= 3 && (pr.kept || []).indexOf(text) === -1) {
      pr.kept = (pr.kept || []).concat([text]).slice(-12);
      this.persist();
    }
    this.setState({ phase: "right", written: s.written.concat([{ t: text, round: s.round }]), msg: "Dein Satz liegt in der Schatzkiste!" });
  }
  pickType(t) {
    const s = this.state;
    const it = this.items("wortart")[s.i];
    if (s.phase !== "ask") return;
    if (t === it.typ) {
      const extra = it.typ === "Nomen" ? " \u2013 " + it.art + " " + it.w + ". Nomen schreibt man gro\xDF!" : " \u2013 " + it.w + " schreibt man klein.";
      const label = it.typ === "anderes" ? "Richtig, " + it.w + " ist kein Nomen, Verb oder Adjektiv \u2013 das unterstreichst du nicht" : "Richtig, ein " + t;
      this.setState({ phase: "right", wrongPick: "", msg: label + extra });
    } else {
      this.setState({ errs: this.errList(), wrongPick: t, msg: "Nicht ganz. Probier die Tipps unter den Kn\xF6pfen." });
    }
  }
  pickChoice(c) {
    const s = this.state;
    const it = this.items(s.screen)[s.i];
    if (s.phase !== "ask") return;
    if (s.screen === "zeichen") {
      const ok = it[1].indexOf(c) !== -1;
      const kind = { ".": "Aussagesatz \u2013 Punkt.", "?": "Fragesatz \u2013 Fragezeichen.", "!": "Aufforderung oder Ausruf \u2013 Ausrufezeichen." };
      if (ok) this.setState({ phase: "right", wrongPick: "", msg: "Richtig: " + kind[c] + (it[1].length > 1 ? " (Hier passt auch " + (c === "." ? "!" : ".") + ")" : "") });
      else this.setState({ errs: this.errList(), wrongPick: c, msg: c === "?" ? "Fragt der Satz etwas? Lies ihn laut." : "Lies den Satz laut: Fragt er etwas? Fordert er auf?" });
    } else {
      if (c === it[1]) this.setState({ phase: "right", wrongPick: "", msg: "Richtig! " + it[0].replace("___", it[1]) + " Gef\xFChle sind Nomen \u2013 gro\xDF!" });
      else this.setState({ errs: this.errList(), wrongPick: c, msg: "Passt das Gef\xFChl? Lies den Satz mit dem Wort laut." });
    }
  }
  pickAbc(w) {
    const s = this.state;
    const round = this.items("abc")[s.i];
    const sorted = round.slice().sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase(), "de"));
    if (w === sorted[s.picked.length]) {
      const picked = s.picked.concat([w]);
      if (picked.length === round.length) this.setState({ picked, phase: "right", msg: "Richtig sortiert \u2013 so findest du W\xF6rter im W\xF6rterbuch!" });
      else this.setState({ picked, msg: "" });
    } else {
      this.setState({ errs: this.errList(), msg: "Schau auf den ersten Buchstaben. Welcher kommt im ABC fr\xFCher?" });
    }
  }
  renderVals() {
    const s = this.state;
    const keys = Object.keys(this.ex);
    const pr = this.store.progress;
    const doneSet = pr.done;
    const nDone = pr.done.length;
    const chests = Math.floor(nDone / 4);
    const shelfList = this.store.shelf || [];
    const starsOf = (g) => (g.done || []).length + (g.flaw || []).length + (g.bonus || 0);
    const allStars = shelfList.reduce((a, b) => a + starsOf(b.progress), starsOf(pr));
    const stars = allStars;
    const ps = this.packStat(this.store.current, pr);
    const rk = [[0, "Strandl\xE4ufer"], [6, "Muschelsucherin"], [13, "Schatzj\xE4gerin"], [23, "Inselforscherin"], [35, "Kapit\xE4nin"]].filter((x) => stars >= x[0]).pop()[1];
    const names = ["", "Entdecker", "Forscher", "Meister"];
    const cur = this.store.current;
    const nx = this.store.next;
    const n = this.words.length;
    const cnt = { satz: n, diktat: n, wortart: n, silben: this.baseItems("silben").length, plural: this.baseItems("plural").length, gross: this.grossList().length, abc: this.baseItems("abc").length, zeichen: this.zeichen.length, gefuehl: this.gefuehle.length, zerleg: this.zerleg.length, koenig: this.baseItems("koenig").length, spur: n, heft: n };
    const metaOf = { satz: "3 Runden \xB7 " + n + " W\xF6rter", diktat: "Rechtschreibung \xB7 " + n + " W\xF6rter", silben: "Silbenb\xF6gen \xB7 " + cnt.silben + " W\xF6rter", plural: "Einzahl / Mehrzahl \xB7 " + cnt.plural + " W\xF6rter", wortart: "Wortarten \xB7 " + n + " W\xF6rter", gross: cnt.gross ? "Gro\xDFschreibung \xB7 " + cnt.gross + " S\xE4tze" : "Erst S\xE4tze in der Satz-Werkstatt schreiben", abc: "Nachschlagen \xB7 " + cnt.abc + " Runden", zeichen: "Satzarten \xB7 " + cnt.zeichen + " S\xE4tze", gefuehl: "Nomen f\xFCr Gef\xFChle \xB7 " + cnt.gefuehl + " S\xE4tze", zerleg: "W\xF6rterbuch \xB7 " + cnt.zerleg + " W\xF6rter", koenig: "Vokale \xB7 " + cnt.koenig + " W\xF6rter", spur: "Schreibschrift \xB7 " + n + " W\xF6rter", heft: "Heft \xB7 " + n + " W\xF6rter" };
    const shown = keys.filter((k) => cnt[k] > 0 || k === "gross" && n > 0);
    const base = {
      isHub: s.screen === "hub",
      isRegal: s.screen === "regal",
      allStars,
      packCount: shelfList.length + 1,
      packPct: ps.pct,
      packLabel: ps.label + " \xDCbungen",
      toRegal: () => this.setState({ screen: "regal", hubMsg: "" }),
      packs: [{ week: this.store.current, progress: pr, now: true }].filter((b) => b.week.words.length).concat(shelfList.slice().sort((x, y) => {
        const k = (b) => b.week.from || new Date(b.week.added || 0).toISOString().slice(0, 10);
        return k(x) < k(y) ? 1 : -1;
      })).map((b) => {
        const st2 = this.packStat(b.week, b.progress), cl = { "Neu": ["#EEF3E4", "#5C7A2E"], "In Arbeit": ["#FFF4D6", "#8A4B08"], "Geschafft": ["#D8F0EC", "#075A54"] }[st2.status];
        return { src: b.week.source === "app" ? "app" : "own", title: this.weekName(b.week), words: b.week.words.slice(0, 5).map((x) => x.w).join(" \xB7 ") + (b.week.words.length > 5 ? " \u2026" : ""), status: b.now ? "Aktuell \xB7 " + st2.status : st2.status, chipBg: cl[0], chipFg: cl[1], pct: st2.pct, label: st2.label, bg: b.now ? "#FFF8E6" : "#fff", border: b.now ? "#FFC23D" : st2.status === "Geschafft" ? "#0C7C74" : "#D6E2C4", open: () => b.now ? this.setState({ screen: "hub", hubMsg: "" }) : this.openPack(b.week.id) };
      }),
      isGate: s.screen === "gate",
      isEdit: s.screen === "edit",
      isExercise: ["hub", "gate", "edit", "truhe", "regal"].indexOf(s.screen) === -1,
      chestReady: chests > pr.opened,
      chestWait: !(chests > pr.opened),
      chestNo: chests + 1,
      inChest: nDone % 4,
      chestPips: [0, 1, 2, 3].map((k) => ({ bg: k < nDone % 4 ? "#FFC23D" : "#fff" })),
      stars,
      rank: rk,
      hasShelf: pr.opened > 0,
      shelf: Array.from({ length: Math.min(pr.opened, 8) }, (_, k) => this.rewards[k % this.rewards.length][0]).join(" "),
      isTruhe: s.screen === "truhe",
      toTruhe: () => this.setState({ screen: "truhe", truheOpen: false }),
      doneCount: 0,
      totalCount: shown.length + 1,
      weekSub: this.words.length ? "Lernw\xF6rter: " + this.weekName(cur) + " \u2013 starte mit der Satz-Werkstatt!" : "Hier warten die \xDCbungen \u2013 die Lernw\xF6rter tragen die Eltern ein.",
      noWords: this.words.length === 0,
      hasWords: this.words.length > 0,
      hasNote: !!(s.hubMsg || nx),
      note: s.hubMsg || (nx ? "Ab " + this.dateLabel(nx.from, nx.to) + " warten " + nx.words.length + " neue W\xF6rter" : ""),
      toGate: () => this.setState({ screen: "gate", gateAns: "", gateWrong: false }),
      chips: this.words.map((x) => ({ w: (x.art ? x.art + " " : "") + x.w, size: n > 12 ? "16px" : "18px" })),
      cards: this.hubCards = shown.map((k) => {
        const mx = this.isSingle(k) ? 1 : 3;
        const lv = [1, 2, 3].slice(0, mx);
        const ds = lv.map((n2) => pr.done.indexOf(k + "#" + n2) !== -1);
        const fl = lv.map((n2) => pr.flaw.indexOf(k + "#" + n2) !== -1);
        const nx2 = ds.indexOf(false) + 1;
        const all = nx2 === 0;
        return { key: k, ic: { satz: "\u{1F4DD}", diktat: "\u{1F442}", silben: "\u2702\uFE0F", koenig: "\u{1F451}", plural: "\u{1F465}", wortart: "\u{1F50E}", gross: "\u{1F520}", abc: "\u{1F524}", zeichen: "\u2757", gefuehl: "\u{1F60A}", zerleg: "\u{1F9E9}", spur: "\u270D\uFE0F", heft: "\u{1F4D3}" }[k] || "\u2B50", fin: all, title: this.ex[k].title, desc: this.ex[k].desc, next: all ? "Alles geschafft \u2013 nochmal \xFCben" : mx === 1 ? "Los geht's" : "Weiter: Stufe " + nx2 + " \xB7 " + names[nx2], pips: ds.map((d, i) => ({ bg: fl[i] ? "#FFC23D" : d ? "#0C7C74" : "#fff", bd: fl[i] ? "#D99A12" : "#0C7C74" })), medal: mx > 1 && all, border: all ? "#0C7C74" : k === "satz" ? "#FFC23D" : "#D6E2C4", bg: k === "satz" ? "#FFF8E6" : "#fff", star: k === "satz", open: () => this.open(k, all ? mx > 1 ? 1 + Math.floor(Math.random() * 3) : 1 : nx2) };
      }).map((c, i) => ({ c, i })).sort((x, y) => x.c.fin - y.c.fin || x.i - y.i).map((x) => x.c),
      groups: [["Sch\xF6n schreiben", "\u270F\uFE0F", "#EAF5F3", "#9AD3CA", ["satz", "diktat", "spur", "heft"]], ["Silben & W\xF6rter", "\u{1F451}", "#FFF6DC", "#F0C766", ["silben", "koenig", "zerleg", "abc"]], ["W\xF6rter erkennen", "\u{1F50E}", "#F0F5E6", "#B7CC93", ["wortart", "plural", "gross", "zeichen", "gefuehl"]], ["Englisch", "\u{1F1EC}\u{1F1E7}", "#E8F4FC", "#9CC6FF", []]].map((g) => ({ title: g[0], ic: g[1], bg: g[2], bd: g[3], english: g[0] === "Englisch", cards: this.hubCards.filter((c) => g[4].indexOf(c.key) !== -1) })).filter((g) => g.cards.length || g.english),
      toHub: () => this.setState({ screen: "hub", hubMsg: "", rep: 1, errs: [], stufe: 1, pool: [], repRefs: [] })
    };
    base.packsApp = base.packs.filter((p) => p.src === "app");
    base.packsOwn = base.packs.filter((p) => p.src === "own");
    base.hasPacksApp = base.packsApp.length > 0;
    base.hasPacksOwn = base.packsOwn.length > 0;
    if (s.screen === "hub" || s.screen === "regal") return base;
    if (s.screen === "truhe") {
      const rw = this.rewards[pr.opened % this.rewards.length];
      return Object.assign(base, { truheClosed: !s.truheOpen, truheOpen: s.truheOpen, rwEmoji: rw[0], rwName: rw[1], rwText: rw[2], openIt: () => this.setState({ truheOpen: true }), closeTruhe: () => {
        pr.opened += 1;
        pr.bonus += 3;
        this.persist();
        this.setState({ screen: "hub", truheOpen: false });
      } });
    }
    if (s.screen === "gate") {
      const unlock = () => {
        if (s.gateAns.trim() === "56") this.openEditor();
        else this.setState({ gateWrong: true });
      };
      return Object.assign(base, { gateAns: s.gateAns, gateWrong: s.gateWrong, onGate: (e) => this.setState({ gateAns: e.target.value, gateWrong: false }), onGateKey: (e) => {
        if (e.key === "Enter") unlock();
      }, unlock });
    }
    if (s.screen === "edit") return Object.assign(base, this.editVals());
    const list = this.items(s.screen);
    const listDone = s.i >= list.length;
    const missedAfter = s.missed;
    const moreRep = s.screen !== "satz" && listDone && s.errs.length > 0 && s.rep < 3;
    const moreRounds = moreRep || s.screen === "satz" && listDone && (s.round === 1 || s.round === 2 && missedAfter.length > 0);
    const taskRound = s.screen !== "satz" && s.stufe > 1;
    const finished = listDone && !moreRounds;
    const it = listDone ? null : list[s.i];
    const dots = list.map((_, k) => ({ fill: k < s.i || k === s.i && s.phase === "right" ? "#0C7C74" : k === s.i ? "#FFC23D" : "#fff", border: k < s.i || k === s.i && s.phase === "right" ? "#075A54" : k === s.i ? "#D99A12" : "#C9DDE4" }));
    const answered = !finished && s.phase === "right";
    const prompts = {
      satz: ["Bilde einen Satz mit dem Lernwort.", "Schreib ihn auf. Tipp: Wer? Was? Wo? Wann?"],
      diktat: ["H\xF6r zu und schreib das Wort.", "Achte auf doppelte Buchstaben und auf gro\xDF oder klein."],
      silben: ["Wo trennst du das Wort?", "Tippe zwischen die Buchstaben, um einen Silbenstrich zu setzen."],
      plural: ["Wie hei\xDFt es, wenn es viele sind?", "Schreib die Mehrzahl."],
      wortart: ["Was f\xFCr ein Wort ist das?", "Das Wort steht in Gro\xDFbuchstaben \u2013 du findest heraus, wie man es schreibt."],
      gross: ["Welche W\xF6rter schreibt man gro\xDF?", "Tippe die W\xF6rter an, die einen gro\xDFen Anfangsbuchstaben brauchen."],
      zeichen: ["Welches Zeichen geh\xF6rt ans Ende?", "Aussage: Punkt \xB7 Frage: ? \xB7 Aufforderung oder Ausruf: !"],
      gefuehl: ["Welches Gef\xFChl passt?", "Angst, Schmerz, Gl\xFCck oder Wut"],
      zerleg: ["Welche zwei Nomen stecken im Wort?", "Setz einen Strich, wo das erste Nomen endet."],
      koenig: ["Wo wohnen die Silbenk\xF6nige?", "Tippe in jeder Silbe den K\xF6nig an: einen Vokal oder Doppellaut."],
      spur: ["Spur das Wort nach.", "Fahr mit dem Finger auf der Schrift entlang \u2013 von links nach rechts."],
      heft: ["Schreib das Wort ins Heft.", "Zweimal in Sch\xF6nschrift. Dann bewertest du dich selbst."],
      abc: ["Bring die W\xF6rter in ABC-Reihenfolge.", "Tippe das Wort an, das zuerst kommt. \xE4 wird wie a einsortiert."]
    };
    const v = Object.assign(base, {
      exTitle: this.ex[s.screen].title,
      dots,
      finished,
      running: !listDone,
      roundBreak: moreRounds,
      breakTitle: moreRep ? "Fast geschafft!" : s.round === 1 ? "Runde 1 geschafft!" : "Runde 2 geschafft!",
      breakText: moreRep ? "Bei " + s.errs.length + (s.errs.length === 1 ? " Aufgabe" : " Aufgaben") + " ist noch etwas durcheinandergeraten: " + s.errs.map((r) => this.refName(s.screen, r)).join(", ") + ". Gleich kommen genau diese Aufgaben noch einmal \u2013 bis sie sitzen." : s.round === 1 ? "Jetzt wird es kniffliger: In Runde 2 siehst du das Wort nicht mehr. Du h\xF6rst es nur \u2013 und schreibst es selbst richtig in deinen Satz." : "Bei " + missedAfter.length + (missedAfter.length === 1 ? " Wort" : " W\xF6rtern") + " war das Lernwort noch nicht ganz richtig: " + missedAfter.map((n2) => this.words[n2].w).join(", ") + ". Die \xFCben wir in Runde 3 noch einmal \u2013 nur h\xF6ren.",
      breakButton: moreRep ? "Noch einmal \xFCben" : s.round === 1 ? "Runde 2 starten" : "Runde 3 starten",
      startRound: () => {
        if (s.screen !== "satz") {
          const refs = s.errs.slice();
          const L0 = s.stufe > 1 ? s.pool : this.baseItems(s.screen);
          const f = L0[refs[0]];
          this.setState(Object.assign({ rep: s.rep + 1, repRefs: refs, errs: [], i: 0 }, this.reset()));
          const sp = s.stufe > 1 ? f.speak : s.screen === "diktat" ? f.w : "";
          if (sp) this.say(sp, f.slow ? 0.5 : 0.85);
          return;
        }
        const r = s.round + 1;
        const first = r === 3 ? this.words[s.missed[0]] : this.words[0];
        this.setState(Object.assign({ round: r, i: 0 }, this.reset()));
        this.say((first.art ? first.art + " " : "") + first.w);
      },
      hasReward: !!s.lastReward,
      rewardText: !s.lastReward ? "" : s.lastReward.replay ? "Sch\xF6n ge\xFCbt! Diese Stufe z\xE4hlte schon." : "\u2B50 +" + (s.lastReward.flaw ? "2 Sterne \u2013 ohne Fehler!" : "1 Stern") + (s.lastReward.medal ? " \xB7 \u{1F3C5} Meister-Medaille!" : "") + (s.lastReward.chest ? " \xB7 Schatztruhe voll!" : " \xB7 Truhe: " + s.lastReward.inChest + " von 4"),
      finishBtn: chests > pr.opened ? "Zur Lernwoche \u2013 deine Truhe wartet!" : "Zur Lernwoche",
      finishText: s.screen === "heft" ? "Alle W\xF6rter stehen in deinem Heft. Zeig es Mama oder Papa!" : s.screen === "spur" ? "Alle W\xF6rter sch\xF6n nachgespurt \u2013 bald schreibst du sie ganz allein!" : s.screen === "satz" ? s.written.length + " eigene S\xE4tze! Zeig sie Mama oder Papa und lies sie zusammen vor." : "Du hast alle Aufgaben bei \u201E" + this.ex[s.screen].title + "\u201C gel\xF6st." + (s.errs.length ? " Noch wackelig \u2013 das \xFCben wir bald noch einmal: " + s.errs.map((r) => this.refName(s.screen, r)).join(", ") + "." : " Such dir das n\xE4chste Spiel aus!"),
      written: s.written.map((x) => ({ t: x.t, r: "R" + x.round })),
      prompt: prompts[s.screen][0],
      subPrompt: prompts[s.screen][1],
      isSatz: s.screen === "satz",
      isDiktat: s.screen === "diktat",
      isSilben: s.screen === "silben" || s.screen === "zerleg",
      isPlural: s.screen === "plural",
      isWortart: ["wortart", "zeichen", "gefuehl"].indexOf(s.screen) !== -1,
      isGross: s.screen === "gross",
      isAbc: s.screen === "abc",
      isKoenig: s.screen === "koenig",
      isSpur: s.screen === "spur",
      isHeft: s.screen === "heft",
      asking: !finished && s.phase === "ask",
      answered,
      input: s.input,
      empty: s.input.trim() === "",
      attempt: s.attempt,
      wasWrong: s.wasWrong,
      msg: s.msg,
      msgColor: s.phase === "right" || s.phase === "self" ? "#0C7C74" : "#B45309",
      onInput: (e) => this.setState({ input: e.target.value, msg: "" }),
      onKey: (e) => {
        if (e.key === "Enter") this.check();
      },
      check: () => this.check(),
      next: () => {
        const n2 = s.i + 1;
        const upd = Object.assign({ i: n2 }, this.reset());
        const lastRound = s.screen !== "satz" ? s.errs.length === 0 || s.rep >= 3 : s.round === 3 || s.round === 2 && s.missed.length === 0;
        if (n2 >= list.length && lastRound) {
          const key = s.screen + "#" + s.stufe;
          if (pr.done.indexOf(key) === -1) {
            const flaw = s.screen === "satz" ? s.missed.length === 0 && s.round < 3 : s.rep === 1 && s.errs.length === 0;
            pr.done = pr.done.concat([key]);
            if (flaw) pr.flaw = pr.flaw.concat([key]);
            this.persist();
            upd.lastReward = { replay: false, flaw, chest: pr.done.length % 4 === 0, inChest: pr.done.length % 4, medal: !this.isSingle(s.screen) && [1, 2, 3].every((m) => pr.done.indexOf(s.screen + "#" + m) !== -1) };
          } else upd.lastReward = { replay: true };
        }
        this.setState(upd);
        if (s.screen === "satz" && s.round >= 2 && n2 < list.length) this.say((list[n2].art ? list[n2].art + " " : "") + list[n2].w);
      },
      cardH: "660px",
      cardPad: "32px 44px",
      cardGap: "22px",
      showKb: false,
      kbRows: [],
      kTokens: [],
      hBtns: [],
      spurShow: "",
      heftWord: "",
      signed: !!pr.signed,
      notSigned: !pr.signed,
      signWrong: !!s.signWrong,
      signPin: s.signPin || "",
      onSignPin: (e) => this.setState({ signPin: e.target.value, signWrong: false }),
      doSign: () => {
        let ok = false;
        try {
          ok = window.WSI.checkPin(s.signPin);
        } catch (e) {
        }
        if (ok) {
          pr.signed = true;
          pr.bonus = (pr.bonus || 0) + 1;
          this.persist();
          this.setState({ signPin: "", signWrong: false });
        } else this.setState({ signWrong: true });
      },
      clearSpur: () => this.clearSpur(),
      letters: [],
      silLetters: [],
      silSolution: "",
      singular: "",
      plural: "",
      shownWord: "",
      typeButtons: [],
      tokens: [],
      abcPicked: [],
      abcLeft: [],
      speak: () => {
      },
      speakSlow: () => {
      },
      satzWord: "",
      idea: "",
      showIdea: false,
      results: [],
      hasResults: false,
      isSelf: false,
      satzAsking: false,
      satzLocked: false,
      wordShown: false,
      wordHidden: false,
      isTask: false,
      tHasShow: false,
      tShow: "",
      tSize: "54px",
      tHasSpeak: false,
      tSpeakFn: () => {
      },
      tChoice: false,
      tType: false,
      tOrder: false,
      tOptions: [],
      tPicked: [],
      tLeft: [],
      roundLabel: "",
      speakSlowWord: () => {
      },
      markedTokens: [],
      hasMarks: false
    });
    const kbOn = !finished && s.phase === "ask" && !listDone && ((s.screen === "diktat" || s.screen === "plural") && !taskRound || s.screen === "satz" || taskRound && it && it.mode === "type");
    if (kbOn) {
      v.showKb = true;
      v.cardH = "420px";
      v.cardPad = "16px 40px";
      v.cardGap = "10px";
      const rows = [["q", "w", "e", "r", "t", "z", "u", "i", "o", "p", "\xFC"], ["a", "s", "d", "f", "g", "h", "j", "k", "l", "\xF6", "\xE4"], ["SHIFT", "y", "x", "c", "v", "b", "n", "m", "\xDF", "BACK"], s.screen === "satz" ? ["READ", ",", ".", "?", "!", "SPACE", "ENTER"] : ["ENTER"]];
      v.kbRows = rows.map((row) => ({ keys: row.map((k) => {
        const sp = k === "SHIFT" || k === "BACK" || k === "ENTER" || k === "SPACE" || k === "READ";
        const on = k === "SHIFT" && s.shift;
        const l = k === "SHIFT" ? "\u21E7" : k === "BACK" ? "\u232B" : k === "ENTER" ? s.screen === "satz" ? "Pr\xFCfen" : "Pr\xFCfen \u2713" : k === "SPACE" ? "Leerzeichen" : k === "READ" ? "\u{1F50A}" : s.shift && k !== "\xDF" ? k.toUpperCase() : k;
        return { l, press: () => this.kbKey(k), flex: k === "SPACE" ? "3.5" : k === "ENTER" ? s.screen === "satz" ? "2" : "3" : sp ? "1.5" : "1", bg: k === "ENTER" ? "#0C7C74" : on ? "#FFC23D" : sp ? "#D6E2C4" : "#fff", fg: k === "ENTER" ? "#fff" : "#10304A", edge: k === "ENTER" ? "#075A54" : on ? "#D99A12" : "#B8CBB0", size: sp && k !== "SHIFT" && k !== "BACK" && k !== "READ" ? "20px" : "28px" };
      }) }));
    }
    if (listDone) return v;
    if (taskRound) {
      const t = it;
      v.isTask = true;
      v.isDiktat = v.isSilben = v.isPlural = v.isWortart = v.isGross = v.isAbc = v.isKoenig = v.isSpur = v.isHeft = false;
      v.prompt = t.prompt;
      v.subPrompt = t.sub;
      v.roundLabel = "Stufe " + s.stufe + " \xB7 " + names[s.stufe] + (s.rep > 1 ? " \xB7 Wiederholung" : "");
      v.tHasShow = !!t.show;
      v.tShow = t.show;
      v.tSize = t.show && t.show.length > 28 ? "30px" : "56px";
      v.tHasSpeak = !!t.speak;
      v.tSpeakFn = () => this.say(t.speak, t.slow ? 0.5 : 0.85);
      v.tChoice = t.mode === "choice";
      v.tType = t.mode === "type";
      v.tOrder = t.mode === "order";
      if (t.mode === "choice") v.tOptions = t.options.map((o) => ({ l: t.upper ? o.replace(/ß/g, "\u1E9E").toUpperCase() : o, w: t.wide ? "100%" : "auto", size: t.wide ? "28px" : "40px", cls: s.phase === "right" && o === t.answer ? "btn-good" : s.wrongPick === o ? "btn-bad" : "btn-soft", disabled: s.phase === "right", pick: () => this.pickTask(o) }));
      if (t.mode === "order") {
        const left = t.options.slice();
        s.picked.forEach((x) => {
          const k = left.indexOf(x);
          if (k !== -1) left.splice(k, 1);
        });
        v.tPicked = s.picked.map((x) => ({ w: x }));
        v.tLeft = left.map((x) => ({ w: x, pick: () => this.pickTask(x) }));
      }
      return v;
    }
    if (s.screen === "satz") {
      const hidden = s.round >= 2;
      v.satzWord = (it.art ? it.art + " " : "") + it.w;
      v.wordShown = !hidden;
      v.wordHidden = hidden;
      v.roundLabel = ["", "Runde 1 \xB7 Wort ansehen", "Runde 2 \xB7 Nur h\xF6ren", "Runde 3 \xB7 Noch einmal h\xF6ren"][s.round];
      v.idea = hidden ? it.idea2 : it.idea;
      v.speakSlowWord = () => this.say((it.art ? it.art + " " : "") + it.w, 0.55);
      v.showIdea = s.showIdea;
      v.toggleIdea = () => this.setState({ showIdea: !s.showIdea });
      v.speak = () => this.say((it.art ? it.art + " " : "") + it.w);
      v.readBack = () => this.say(s.input, 0.8);
      v.onSatz = (e) => this.setState({ input: e.target.value });
      v.checkSatz = () => this.checkSatz();
      v.satzAsking = s.phase === "ask";
      v.satzLocked = s.phase !== "ask";
      v.hasResults = !!s.results;
      v.results = (s.results || []).map((r) => ({ label: r.label, tip: r.tip, showTip: !r.ok, mark: r.ok ? "\u2713" : "!", color: r.ok ? "#075A54" : "#8A4B08", bg: r.ok ? "#E6F5F2" : "#FFF4D6" }));
      v.isSelf = s.phase === "self";
      v.self1 = s.self1;
      v.self2 = s.self2;
      v.toggleSelf1 = () => this.setState({ self1: !s.self1 });
      v.toggleSelf2 = () => this.setState({ self2: !s.self2 });
      v.selfNotDone = !s.self2;
      v.markedTokens = s.input.trim().split(/\s+/).map((t, k) => ({ t, bg: (s.marked || []).indexOf(k) !== -1 ? "#FFE08A" : "transparent" }));
      v.hasMarks = (s.marked || []).length > 0;
      v.saveSatz = () => this.saveSatz();
    }
    if (s.screen === "diktat") {
      v.letters = it.w.split("").map((ch, k) => ({ ch, bg: it.crit.indexOf(k) !== -1 ? "#FFE08A" : "transparent" }));
      v.speak = () => this.say(it.w);
    }
    if (s.screen === "zeichen" || s.screen === "gefuehl") {
      const z = s.screen === "zeichen";
      v.shownWord = z ? it[0] + (s.phase === "right" ? s.picked[0] || "" : " \u25A2") : s.phase === "right" ? it[0].replace("___", it[1]) : it[0].replace("___", "\u25A2\u25A2\u25A2");
      v.shownSize = "40px";
      const opts = z ? [[".", "Punkt"], ["?", "Frage"], ["!", "Ausruf"]] : [["Angst", ""], ["Schmerz", ""], ["Gl\xFCck", ""], ["Wut", ""]];
      const good = z ? it[1] : it[1];
      v.typeButtons = opts.map((o) => ({ label: o[0], hint: o[1], cls: s.phase === "right" && good.indexOf(o[0]) !== -1 && (z ? s.picked[0] === o[0] : true) ? "btn-good" : s.wrongPick === o[0] ? "btn-bad" : "btn-soft", disabled: s.phase === "right", pick: () => {
        if (z) this.setState({ picked: [o[0]] });
        this.pickChoice(o[0]);
      } }));
    }
    if (s.screen === "zerleg") {
      const letters = it.w.split("");
      v.silLetters = letters.map((ch, k) => {
        const pos = k + 1;
        const cut = s.cuts.indexOf(pos) !== -1;
        return { ch, hasGap: k < letters.length - 1, cut, gapColor: cut ? "#F08A24" : "#E4EDF1", toggle: () => {
          if (s.phase !== "ask") return;
          this.setState({ cuts: cut ? s.cuts.filter((c) => c !== pos) : s.cuts.concat([pos]), msg: "" });
        } };
      });
      v.silSolution = it.a + " + " + it.b;
      v.speakSlow = () => this.say(it.w, 0.6);
    }
    if (s.screen === "silben") {
      const letters = it.w.split("");
      v.silLetters = letters.map((ch, k) => {
        const pos = k + 1;
        const cut = s.cuts.indexOf(pos) !== -1;
        return {
          ch,
          hasGap: k < letters.length - 1,
          cut,
          gapColor: cut ? "#F08A24" : "#E4EDF1",
          toggle: () => {
            if (s.phase !== "ask") return;
            this.setState({ cuts: cut ? s.cuts.filter((c) => c !== pos) : s.cuts.concat([pos]), msg: "" });
          }
        };
      });
      v.silSolution = it.syl.join(" \u2013 ");
      v.speakSlow = () => this.say(it.syl.join(" - "), 0.5);
    }
    if (s.screen === "koenig") {
      const tk = this.kingTokens(it);
      v.kTokens = tk.map((t, k) => {
        const on = s.picked.indexOf(k) !== -1;
        const good = s.phase === "right" && t.king;
        return { t: t.t, crown: on || good ? "\u{1F451}" : "", ml: t.sp ? "26px" : "4px", bg: good ? "#D8F0EC" : on ? "#FFE08A" : "#F8FCFD", bd: good ? "#0C7C74" : on ? "#F0B429" : "#C9DDE4", toggle: () => {
          if (s.phase !== "ask") return;
          this.setState({ picked: on ? s.picked.filter((c) => c !== k) : s.picked.concat([k]), msg: "" });
        } };
      });
      v.speakSlow = () => this.say(it.syl.join(" - "), 0.5);
    }
    if (s.screen === "heft") {
      v.heftWord = it.w;
      v.speak = () => this.say(it.w);
      const rate = [[1, "\u2605", "Noch wackelig"], [2, "\u2605\u2605", "Ganz ordentlich"], [3, "\u2605\u2605\u2605", "Richtig sch\xF6n"]];
      v.hBtns = rate.map((r) => ({ stars: r[1], label: r[2], cls: s.phase === "right" ? s.picked[0] === String(r[0]) ? "btn-good" : "btn-soft" : "btn-soft", disabled: s.phase === "right", pick: () => this.rateHeft(r[0]) }));
    }
    if (s.screen === "plural") {
      v.singular = it.art + " " + it.w;
      v.plural = it.pl;
    }
    if (s.screen === "wortart") {
      v.shownWord = it.w.replace(/ß/g, "\u1E9E").toUpperCase();
      v.shownSize = "70px";
      const defs = [["Nomen", "der, die, das \u2026", "btn-red"], ["Verb", "ich \u2026, du \u2026", "btn-blue"], ["Adjektiv", "Wie ist etwas?", "btn-green"], ["anderes", "nicht unterstreichen", "btn-soft"]];
      v.typeButtons = defs.map((d) => ({
        label: d[0] === "anderes" ? "Anderes Wort" : d[0],
        hint: d[1],
        cls: s.phase === "right" && d[0] === it.typ ? "btn-good" : s.wrongPick === d[0] ? "btn-bad" : d[2],
        disabled: s.phase === "right",
        pick: () => this.pickType(d[0])
      }));
    }
    if (s.screen === "gross") {
      const toks = it.replace(/[.!?]$/, "").split(" ");
      v.tokens = toks.map((t, k) => {
        const on = s.caps.indexOf(k) !== -1;
        const shown2 = on ? t[0].toUpperCase() + t.slice(1) : t[0].toLowerCase() + t.slice(1);
        const correct = t[0] === t[0].toUpperCase() === on;
        return {
          text: shown2 + (k === toks.length - 1 ? (it.match(/[.!?]$/) || ["."])[0] : ""),
          on,
          cls: s.phase === "right" ? on ? "btn-good" : "btn-soft" : on ? "btn-on" : "btn-soft",
          toggle: () => {
            if (s.phase !== "ask") return;
            this.setState({ caps: on ? s.caps.filter((c) => c !== k) : s.caps.concat([k]), msg: "" });
          }
        };
      });
    }
    if (s.screen === "abc") {
      v.abcPicked = s.picked.map((w, k) => ({ n: k + 1, w }));
      v.abcLeft = it.filter((w) => s.picked.indexOf(w) === -1).map((w) => ({ w, pick: () => this.pickAbc(w) }));
    }
    return v;
  }
};
