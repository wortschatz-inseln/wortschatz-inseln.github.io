window.__Component = class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { picked: 0 };
  }
  renderVals() {
    const p = this.state.picked;
    const msg = ["", "Danke! Morgen gibt es ein paar neue W\xF6rter mehr.", "Super, dann bleibt es so.", "Danke! Morgen gibt es mehr Hilfen und weniger neue W\xF6rter."];
    return {
      name: window.WSI.name() || "du",
      c1: p === 1 ? "btn-picked" : "btn-soft",
      c2: p === 2 ? "btn-picked" : "btn-soft",
      c3: p === 3 ? "btn-picked" : "btn-soft",
      p1: p === 1,
      p2: p === 2,
      p3: p === 3,
      thanks: msg[p],
      pick1: () => this.setState({ picked: 1 }),
      pick2: () => this.setState({ picked: 2 }),
      pick3: () => this.setState({ picked: 3 })
    };
  }
};
