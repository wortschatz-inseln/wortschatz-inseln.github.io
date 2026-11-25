window.__Component = class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.tasks = [
      { type: "listen", word: "dog", options: ["cat", "dog", "fish", "bird"] },
      { type: "listen", word: "frog", options: ["bee", "dog", "frog", "cat"] },
      { type: "read", word: "cat", options: ["bird", "cat", "frog", "fish"] },
      { type: "build", word: "dog", letters: ["g", "b", "o", "d"] },
      { type: "listen", word: "bee", options: ["fish", "frog", "bird", "bee"] },
      { type: "read", word: "fish", options: ["dog", "fish", "bee", "cat"] },
      { type: "build", word: "fish", letters: ["s", "h", "a", "f", "i"] },
      { type: "chunk", word: "bird", options: ["frog", "bird", "bee"] }
    ];
    this.de = { dog: "Hund", cat: "Katze", fish: "Fisch", bird: "Vogel", frog: "Frosch", bee: "Biene" };
    this.state = { idx: 0, tried: [], solved: false, built: "", used: [], wrongTile: false, done: false };
  }
  say(text) {
    try {
      const u = new window.SpeechSynthesisUtterance(text);
      u.lang = "en-GB";
      u.rate = 0.8;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    } catch (e) {
    }
  }
  pick(choice) {
    const t = this.tasks[this.state.idx];
    if (this.state.solved) return;
    if (choice === t.word) {
      this.setState({ solved: true });
      this.say(t.type === "chunk" ? "I can see a " + t.word : t.word);
    } else {
      this.setState({ tried: this.state.tried.concat([choice]) });
    }
  }
  tap(i) {
    const s = this.state;
    const t = this.tasks[s.idx];
    if (s.solved || s.used.indexOf(i) !== -1) return;
    const ch = t.letters[i];
    if (ch === t.word[s.built.length]) {
      const built = s.built + ch;
      const solved = built === t.word;
      this.setState({ built, used: s.used.concat([i]), wrongTile: false, solved });
      if (solved) this.say(t.word);
    } else {
      this.setState({ wrongTile: true });
    }
  }
  flags(name) {
    return { isDog: name === "dog", isCat: name === "cat", isFish: name === "fish", isBird: name === "bird", isFrog: name === "frog", isBee: name === "bee" };
  }
  renderVals() {
    const s = this.state;
    const t = this.tasks[Math.min(s.idx, this.tasks.length - 1)];
    const crates = this.tasks.map((_, i) => {
      const full = i < s.idx || i === s.idx && s.solved || s.done;
      const cur = i === s.idx && !s.solved && !s.done;
      return { fill: full ? "#B9775A" : cur ? "#FFC23D" : "#fff", border: full ? "#8B5A2B" : cur ? "#D99A12" : "#C9DDE4" };
    });
    const isOpt = t.type === "listen" || t.type === "read";
    const options = (isOpt ? t.options : []).map((o) => Object.assign({
      label: t.type === "read" ? "Bild " + (t.options.indexOf(o) + 1) : "Bild " + (t.options.indexOf(o) + 1),
      cls: s.solved && o === t.word ? "pick-right" : s.tried.indexOf(o) !== -1 ? "pick-tried" : "",
      disabled: s.tried.indexOf(o) !== -1,
      pick: () => this.pick(o)
    }, this.flags(o)));
    const slots = t.type === "build" ? t.word.split("").map((ch, i) => ({ ch, color: i < s.built.length ? "#10304A" : "#C5D6DE" })) : [];
    const tiles = t.type === "build" ? t.letters.map((ch, i) => ({ ch, cls: s.used.indexOf(i) !== -1 ? "tile-used" : "", tap: () => this.tap(i) })) : [];
    const words = t.type === "chunk" ? t.options.map((w) => ({ text: w, disabled: s.tried.indexOf(w) !== -1 || s.solved, cls: s.tried.indexOf(w) !== -1 ? "pick-tried" : "", pick: () => this.pick(w) })) : [];
    const labels = { listen: "Listen and find", read: "Read and find", build: "Build the word", chunk: "Finish the sentence" };
    const prompts = {
      listen: ["H\xF6r zu! Welches Tier ist es?", "Tippe auf \u201EListen\u201C, dann auf das Bild."],
      read: ["Lies das Wort. Welches Bild passt?", "Tippe aufs Wort, dann h\xF6rst du es."],
      build: ["Bau das Wort mit den Buchstaben.", "Die graue Vorlage hilft dir."],
      chunk: ["Welches Wort passt in den Satz?", "Schau dir das Bild an."]
    };
    let msg = "";
    let msgColor = "#0C7C74";
    if (s.solved) msg = ["Great!", "Well done!", "Super!", "Yes, that's right!"][s.idx % 4] + " \u2013 " + t.word + " hei\xDFt " + this.de[t.word] + ".";
    else if (s.wrongTile) {
      msg = "Schau auf die Vorlage: Welcher Buchstabe kommt jetzt?";
      msgColor = "#B45309";
    } else if (s.tried.length) {
      msg = "Nicht ganz \u2013 h\xF6r oder schau noch einmal.";
      msgColor = "#B45309";
    }
    const kikiText = s.done ? "Wow, alles an Bord!" : s.solved ? "Super gemacht!" : t.type === "build" ? "Schau genau hin!" : "Ahoi! Los geht's.";
    return Object.assign({
      crates,
      notDone: !s.done,
      done: s.done,
      num: s.idx + 1,
      stepLabel: labels[t.type],
      prompt: prompts[t.type][0],
      promptDe: prompts[t.type][1],
      isListen: t.type === "listen",
      isRead: t.type === "read",
      isBuild: t.type === "build",
      isChunk: t.type === "chunk",
      showOptions: isOpt,
      word: t.word,
      options,
      slots,
      tiles,
      words,
      gapText: s.solved ? t.word : "",
      gapColor: "#0C7C74",
      solved: s.solved,
      msg,
      msgColor,
      kiki: kikiText,
      speakWord: () => this.say(t.word),
      next: () => {
        if (s.idx >= this.tasks.length - 1) this.setState({ done: true });
        else this.setState({ idx: s.idx + 1, tried: [], solved: false, built: "", used: [], wrongTile: false });
      },
      pic: this.flags(t.word)
    });
  }
};
