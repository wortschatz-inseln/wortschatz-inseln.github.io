window.__Component = class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { idx: 0, input: "", retry: "", phase: "write", mode: "type", penShown: false, attempt: "", found: 0, retryWrong: false };
    this.words = [
      { w: "Hund", strat: "Verl\xE4ngern", hint: "Verl\xE4ngere das Wort: der Hund \u2013 die Hun-de. Jetzt h\xF6rst du das d.", crit: [3] },
      { w: "kommen", strat: "Nachdenken", hint: "Nach dem kurzen o kommen zwei gleiche Mitlaute: mm.", crit: [3, 4] },
      { w: "Vater", strat: "Merken", hint: "Merkwort: Vater schreibt man mit V \u2013 wie Vogel.", crit: [0] },
      { w: "Biene", strat: "Nachdenken", hint: "Das lange i schreibt man meistens ie.", crit: [1, 2] },
      { w: "Wald", strat: "Verl\xE4ngern", hint: "Verl\xE4ngere das Wort: der Wald \u2013 die W\xE4l-der. Jetzt h\xF6rst du das d.", crit: [3] }
    ];
  }
  speak(slow) {
    try {
      const u = new window.SpeechSynthesisUtterance(this.words[this.state.idx].w);
      u.lang = "de-DE";
      u.rate = slow ? 0.5 : 0.85;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    } catch (e) {
    }
  }
  check() {
    const val = this.state.input.trim();
    if (!val) return;
    const ok = val === this.words[this.state.idx].w;
    this.setState({ phase: ok ? "right" : "wrong", attempt: val, found: this.state.found + (ok ? 1 : 0) });
  }
  forge() {
    const val = this.state.retry.trim();
    if (!val) return;
    if (val === this.words[this.state.idx].w) this.setState({ phase: "forged", retryWrong: false });
    else this.setState({ retryWrong: true });
  }
  renderVals() {
    const s = this.state;
    const word = this.words[s.idx];
    const solved = s.phase === "right" || s.phase === "forged";
    const stones = this.words.map((_, i) => {
      const done = i < s.idx || i === s.idx && solved;
      const current = i === s.idx && !solved;
      return { n: i + 1, done, current, todo: !done && !current };
    });
    const letters = word.w.split("").map((ch, i) => {
      const crit = word.crit.indexOf(i) !== -1;
      return { ch, crit, plain: !crit };
    });
    const isLast = s.idx === this.words.length - 1;
    const kikiText = { write: "H\xF6r genau hin!", right: "Super geh\xF6rt!", wrong: "Fehler zeigen uns den Weg.", forged: "Stark geschmiedet!" };
    return {
      stones,
      letters,
      word: word.w,
      strat: word.strat,
      hint: word.hint,
      num: s.idx + 1,
      found: s.found,
      input: s.input,
      retry: s.retry,
      attempt: s.attempt,
      hasAttempt: s.attempt !== "",
      empty: s.input.trim() === "",
      retryEmpty: s.retry.trim() === "",
      retryWrong: s.retryWrong,
      isWrite: s.phase === "write",
      isRight: s.phase === "right",
      isWrong: s.phase === "wrong",
      isForged: s.phase === "forged",
      isType: s.mode === "type",
      isPen: s.mode === "pen",
      isPenWrite: s.mode === "pen" && !s.penShown,
      isPenCompare: s.mode === "pen" && s.penShown,
      typeClass: s.mode === "type" ? "seg-on" : "seg",
      penClass: s.mode === "pen" ? "seg-on" : "seg",
      isLast,
      notLast: !isLast,
      kiki: kikiText[s.phase],
      speakNormal: () => this.speak(false),
      speakSlow: () => this.speak(true),
      setType: () => this.setState({ mode: "type", penShown: false }),
      setPen: () => this.setState({ mode: "pen", penShown: false }),
      onInput: (e) => this.setState({ input: e.target.value }),
      onRetry: (e) => this.setState({ retry: e.target.value, retryWrong: false }),
      onKey: (e) => {
        if (e.key === "Enter") this.check();
      },
      onRetryKey: (e) => {
        if (e.key === "Enter") this.forge();
      },
      check: () => this.check(),
      forge: () => this.forge(),
      penCompare: () => this.setState({ penShown: true }),
      penRight: () => this.setState({ phase: "right", found: s.found + 1 }),
      penWrong: () => this.setState({ phase: "wrong", attempt: "" }),
      next: () => this.setState({ idx: Math.min(s.idx + 1, this.words.length - 1), input: "", retry: "", phase: "write", penShown: false, attempt: "", retryWrong: false })
    };
  }
};
