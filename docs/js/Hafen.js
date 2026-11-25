window.__Component = class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { grade: 3 };
    this.g3 = [
      ["Hello & me", "Begr\xFC\xDFen, sich vorstellen", 9, 9],
      ["Numbers", "Zahlen bis 20", 13, 13],
      ["Colours", "Farben", 10, 10],
      ["School things", "Schulsachen", 10, 7],
      ["My family", "Familie", 8, 5],
      ["Animals", "Tiere", 10, 4, true],
      ["Food & drinks", "Essen und Trinken", 10, 0],
      ["Clothes", "Kleidung", 9, 0],
      ["My body", "K\xF6rper", 10, 0],
      ["Weather & seasons", "Wetter und Jahreszeiten", 10, 0],
      ["Festivals", "Feste im Jahr", 9, 0]
    ];
    this.g4 = [
      ["Shopping", "Einkaufen", 8],
      ["My dream house", "Mein Traumhaus", 10],
      ["My day", "Mein Tag, Wochentage", 10],
      ["Free time", "Freizeit und Sport", 8],
      ["My favourite animal", "Mein Lieblingstier", 10],
      ["Children of the world", "Kinder der Welt", 8],
      ["In town", "In der Stadt", 8]
    ];
  }
  renderVals() {
    const g = this.state.grade;
    const themes = g === 3 ? this.g3.map((t) => ({ en: t[0], de: t[1], count: t[3] + "/" + t[2], width: Math.round(t[3] / t[2] * 100) + "%", isToday: !!t[4], isOpen: !t[4], isLocked: false, isDone: t[3] === t[2], border: t[3] === t[2] ? "#0C7C74" : "#C9DDE4" })) : this.g4.map((t) => ({ en: t[0], de: t[1], count: "", width: "0%", isToday: false, isOpen: false, isLocked: true, isDone: false, border: "#C9DDE4" }));
    return {
      themes,
      is3: g === 3,
      is4: g === 4,
      c3: g === 3 ? "tab-on" : "btn-soft",
      c4: g === 4 ? "tab-on" : "btn-soft",
      set3: () => this.setState({ grade: 3 }),
      set4: () => this.setState({ grade: 4 })
    };
  }
};
