window.__Component = class Component extends DCLogic {
  constructor(props) {
    super(props);
    const W = window.WSI;
    this.kids = W.profiles();
    try {
      const forced = /[?&]w=1/.test(window.location.search);
      if (this.kids.length === 0) window.location.replace("Eltern.html#setup");
      else if (this.kids.length === 1 && !forced) {
        W.setActive(this.kids[0].id);
        window.location.replace("Main.html");
      }
    } catch (e) {
    }
  }
  renderVals() {
    return {
      kids: this.kids.map((k) => ({ name: k.name, pick: () => {
        window.WSI.setActive(k.id);
        window.location.href = "Main.html";
      } }))
    };
  }
};
