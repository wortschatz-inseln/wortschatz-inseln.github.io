window.__Component = class Component extends DCLogic {
  renderVals() {
    const W = window.WSI;
    return { name: W.name() || "du", multi: W.profiles().length > 1, backupDue: W.backupDue() };
  }
};
