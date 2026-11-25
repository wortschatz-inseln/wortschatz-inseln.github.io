window.__Component = class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { unlocked: false, answer: "", gateWrong: false };
  }
  unlock() {
    if (this.state.answer.trim() === "56") this.setState({ unlocked: true, gateWrong: false });
    else this.setState({ gateWrong: true });
  }
  renderVals() {
    const s = this.state;
    let st = null;
    try {
      st = JSON.parse(window.localStorage.getItem("wsi.lernwoche.v1") || "null");
    } catch (e) {
      st = null;
    }
    const lab = (w) => {
      const f = (w.from || "").split("-");
      const t = (w.to || w.from || "").split("-");
      return f[2] + "." + (f[1] === t[1] ? "" : f[1] + ".") + "\u2013" + t[2] + "." + t[1] + ". \xB7 " + w.words.length + " W\xF6rter";
    };
    const strategies = [
      { name: "Mitsprechen", example: "Ba-na-ne", v: 92 },
      { name: "Merken", example: "Vater, Vogel", v: 78 },
      { name: "Nachdenken", example: "kommen, Biene", v: 70 },
      { name: "Verl\xE4ngern", example: "Hund, Wald", v: 55 }
    ].map((x) => ({
      name: x.name,
      example: x.example,
      width: x.v + "%",
      label: x.v < 60 ? x.v + " % \xB7 gerade dran" : x.v + " %",
      color: x.v < 60 ? "#F08A24" : "#0C7C74"
    }));
    return {
      locked: !s.unlocked,
      unlocked: s.unlocked,
      answer: s.answer,
      gateWrong: s.gateWrong,
      onAnswer: (e) => this.setState({ answer: e.target.value, gateWrong: false }),
      onGateKey: (e) => {
        if (e.key === "Enter") this.unlock();
      },
      unlock: () => this.unlock(),
      curInfo: st && st.current ? lab(st.current) : "09.\u201313.11. \xB7 10 W\xF6rter",
      nextInfo: st && st.next ? lab(st.next) : "noch nicht eingetragen",
      nextColor: st && st.next ? "#0C7C74" : "#B45309",
      strategies
    };
  }
};
