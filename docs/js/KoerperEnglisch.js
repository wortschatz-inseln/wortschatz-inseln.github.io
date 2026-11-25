window.__Component = class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.de = { head: "Kopf", hair: "Haare", eyes: "Augen", ears: "Ohren", nose: "Nase", mouth: "Mund", arm: "Arm", hand: "Hand", leg: "Bein", foot: "Fu\xDF" };
    this.spots = [
      { part: "head", x: 112, y: 44, w: 136, h: 130 },
      { part: "hair", x: 116, y: 26, w: 128, h: 40 },
      { part: "ears", x: 86, y: 93, w: 44, h: 44 },
      { part: "ears", x: 230, y: 93, w: 44, h: 44 },
      { part: "eyes", x: 134, y: 88, w: 92, h: 40 },
      { part: "nose", x: 158, y: 114, w: 44, h: 30 },
      { part: "mouth", x: 150, y: 144, w: 60, h: 30 },
      { part: "arm", x: 80, y: 206, w: 44, h: 120 },
      { part: "arm", x: 236, y: 206, w: 44, h: 120 },
      { part: "hand", x: 78, y: 328, w: 48, h: 48 },
      { part: "hand", x: 234, y: 328, w: 48, h: 48 },
      { part: "leg", x: 126, y: 360, w: 50, h: 140 },
      { part: "leg", x: 184, y: 360, w: 50, h: 140 },
      { part: "foot", x: 106, y: 504, w: 148, h: 40 }
    ];
    this.order = ["nose", "hand", "hair", "foot", "eyes", "mouth", "leg", "ears", "arm", "head"];
    this.rounds = [["head", "hair", "eyes", "ears", "nose"], ["mouth", "arm", "hand", "leg", "foot"]];
    this.deOrder = [["Augen", "Nase", "Kopf", "Ohren", "Haare"], ["Bein", "Mund", "Fu\xDF", "Hand", "Arm"]];
    this.state = { mode: "point", i: 0, solved: false, wrong: "", msg: "", round: 0, sel: "", matched: [] };
  }
  say(t) {
    try {
      const u = new window.SpeechSynthesisUtterance(t);
      u.lang = "en-GB";
      u.rate = 0.8;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    } catch (e) {
    }
  }
  tap(part) {
    const s = this.state;
    if (s.mode !== "point" || s.solved || s.i >= this.order.length) return;
    const target = this.order[s.i];
    if (part === target) {
      this.setState({ solved: true, wrong: "", msg: "Yes! " + target + " hei\xDFt " + this.de[target] + "." });
      this.say(target);
    } else {
      this.setState({ wrong: part, msg: "Das ist: " + part + " (" + this.de[part] + "). Such noch einmal: " + target });
    }
  }
  pickDe(text) {
    const s = this.state;
    if (!s.sel) {
      this.setState({ msg: "Tippe zuerst ein englisches Wort an." });
      return;
    }
    if (this.de[s.sel] === text) {
      const matched = s.matched.concat([s.sel]);
      this.say(s.sel);
      this.setState({ matched, sel: "", msg: matched.length === 5 ? "Super, Runde geschafft!" : s.sel + " = " + text });
    } else {
      this.setState({ msg: "Das passt nicht. Lies das englische Wort noch einmal." });
    }
  }
  renderVals() {
    const s = this.state;
    const isPoint = s.mode === "point";
    const pointDone = s.i >= this.order.length;
    const target = pointDone ? "" : this.order[s.i];
    const spots = this.spots.map((p) => ({
      x: p.x,
      y: p.y,
      w: p.w,
      h: p.h,
      aria: this.de[p.part],
      cls: isPoint && s.solved && p.part === target ? "spot-good" : isPoint && s.wrong === p.part ? "spot-bad" : "",
      tap: () => this.tap(p.part)
    }));
    const r = this.rounds[Math.min(s.round, 1)];
    const roundSolved = s.matched.length === 5;
    const enList = r.map((w) => {
      const done = s.matched.indexOf(w) !== -1;
      return { text: w, disabled: done, cls: done ? "btn-good" : s.sel === w ? "btn-sel" : "btn-soft", pick: () => {
        this.setState({ sel: w, msg: "" });
        this.say(w);
      } };
    });
    const deList = this.deOrder[Math.min(s.round, 1)].map((d) => {
      const done = s.matched.some((m) => this.de[m] === d);
      return { text: d, disabled: done, cls: done ? "btn-good" : "btn-soft", pick: () => this.pickDe(d) };
    });
    return {
      isPoint,
      isPairs: !isPoint,
      cPoint: isPoint ? "btn-on" : "btn-soft",
      cPairs: isPoint ? "btn-soft" : "btn-on",
      setPoint: () => this.setState({ mode: "point", i: 0, solved: false, wrong: "", msg: "" }),
      setPairs: () => this.setState({ mode: "pairs", round: 0, sel: "", matched: [], msg: "", wrong: "" }),
      spots,
      num: Math.min(s.i + 1, 10),
      target,
      pointRunning: !pointDone,
      pointDone,
      pointSolved: s.solved,
      speak: () => this.say(target),
      nextPoint: () => this.setState({ i: s.i + 1, solved: false, wrong: "", msg: "" }),
      msg: s.msg,
      msgColor: isPoint && s.solved || !isPoint && s.msg && s.msg.indexOf("passt nicht") === -1 && s.msg.indexOf("zuerst") === -1 ? "#0C7C74" : "#B45309",
      round: Math.min(s.round + 1, 2),
      enList,
      deList,
      roundSolved,
      pairsRunning: s.round < 2,
      pairsDone: s.round >= 2,
      nextRound: () => this.setState({ round: s.round + 1, matched: [], sel: "", msg: "" })
    };
  }
};
