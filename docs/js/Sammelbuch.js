window.__Component = class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { filter: "all" };
    this.islands = {
      silben: { name: "Silben-Strand", tint: "#E3F4E3", lang: "de-DE", img: "assets/insel-strand.png" },
      vulkan: { name: "Verl\xE4ngerungs-Vulkan", tint: "#F8E2D7", lang: "de-DE", img: "assets/insel-vulkan.png" },
      hafen: { name: "Englisch-Hafen", tint: "#DDE8FA", lang: "en-GB", img: "assets/insel-hafen.png" }
    };
    this.items = [
      { w: "Banane", i: "silben", d: 3 },
      { w: "Tomate", i: "silben", d: 3 },
      { w: "Sonne", i: "silben", d: 3 },
      { w: "Lama", i: "silben", d: 3 },
      { w: "Hund", i: "vulkan", d: 2 },
      { w: "Wald", i: "vulkan", d: 3 },
      { w: "Bild", i: "vulkan", d: 1 },
      { w: "Kind", i: "vulkan", d: 1 },
      { w: "Rakete", i: "silben", d: 3 },
      { w: "dog", i: "hafen", d: 3 },
      { w: "house", i: "hafen", d: 2 },
      { w: "friend", i: "hafen", d: 1 }
    ];
  }
  say(item) {
    try {
      const u = new window.SpeechSynthesisUtterance(item.w);
      u.lang = this.islands[item.i].lang;
      u.rate = 0.85;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    } catch (e) {
    }
  }
  renderVals() {
    const f = this.state.filter;
    const defs = [["all", "Alle"], ["silben", "Silben-Strand"], ["vulkan", "Verl\xE4ngerungs-Vulkan"], ["hafen", "Englisch-Hafen"]];
    const chips = defs.map((d) => {
      const n = d[0] === "all" ? this.items.length : this.items.filter((x) => x.i === d[0]).length;
      return { label: d[1] + " \xB7 " + n, on: f === d[0], cls: f === d[0] ? "chip-on" : "btn-soft", pick: () => this.setState({ filter: d[0] }) };
    });
    const cards = this.items.filter((x) => f === "all" || x.i === f).map((x) => {
      const isl = this.islands[x.i];
      const mastered = x.d >= 3;
      return {
        word: x.w,
        island: isl.name,
        img: isl.img,
        tint: isl.tint,
        mastered,
        open: !mastered,
        left: 3 - x.d,
        border: mastered ? "#0C7C74" : "#C9DDE4",
        borderStyle: mastered ? "solid" : "dashed",
        aria: x.w + ", " + (mastered ? "gemeistert" : "noch " + (3 - x.d) + " Mal richtig schreiben") + ". Anh\xF6ren",
        dots: [0, 1, 2].map((n) => ({ fill: n < x.d ? "#0C7C74" : "#fff" })),
        say: () => this.say(x)
      };
    });
    return { chips, cards };
  }
};
