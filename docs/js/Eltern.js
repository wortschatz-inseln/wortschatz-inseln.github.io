window.__Component = class Component extends DCLogic {
  constructor(props) {
    super(props);
    const W = window.WSI, dev = W.dev();
    let view = "gate";
    if (!dev.setupDone) view = "setup";
    else if (W.isUnlocked()) view = "home";
    this.state = { view, step: 1, answer: "", gateWrong: false, pinA: "", msg: "", names: [], newName: "", mode: "own", restoreText: "", tab: "lern", exportText: "", delId: "" };
  }
  setMsg(m) {
    this.setState({ msg: m });
  }
  unlock() {
    if (window.WSI.checkPin(this.state.answer)) {
      window.WSI.unlock();
      this.setState({ view: "home", answer: "", gateWrong: false, msg: "" });
    } else this.setState({ gateWrong: true });
  }
  lab(w) {
    if (!w || !w.words || !w.words.length) return "noch keine";
    let d = "";
    if (w.from) {
      const f = w.from.split("-"), t = (w.to || w.from).split("-");
      d = f[2] + "." + (f[1] === t[1] ? "" : f[1] + ".") + "\u2013" + t[2] + "." + t[1] + ".";
    }
    return (w.title ? w.title + (d ? " \xB7 " + d : "") : d || "Eigene W\xF6rter") + " (" + w.words.length + " W\xF6rter)";
  }
  validPin(p) {
    return /^[0-9]{4,6}$/.test(p);
  }
  finish() {
    const W = window.WSI, s = this.state, dev = W.dev();
    s.names.forEach((n) => W.addProfile(n));
    dev.pin = s.pinA;
    dev.mode = s.mode;
    dev.setupDone = true;
    dev.created = Date.now();
    W.save();
    W.unlock();
    window.location.href = "Start.html";
  }
  addName(list) {
    const n = this.state.newName.replace(/\s+/g, " ").trim();
    if (!n) return;
    if (list.some((x) => x.toLowerCase() === n.toLowerCase())) {
      this.setState({ msg: "Diesen Namen gibt es schon.", newName: "" });
      return;
    }
    list.push(n.slice(0, 20));
  }
  renderVals() {
    const s = this.state, W = window.WSI, dev = W.dev();
    const view = s.view;
    const titles = { gate: "Eltern-Bereich", setup: "Einrichtung", home: "Eltern-Bereich" };
    const hasMsg = !!s.msg;
    const chg = (key, extra) => (e) => {
      if (e.target.value !== this.state[key]) this.setState(Object.assign({ [key]: e.target.value }, extra));
    };
    const base = {
      title: titles[view],
      showBack: dev.setupDone,
      isGate: view === "gate",
      isSetup: view === "setup",
      isHome: view === "home",
      hasMsg,
      msg: s.msg,
      gateTitle: dev.pin ? "Eltern-Code eingeben" : "Kurz best\xE4tigen, dass du erwachsen bist",
      gateLabel: dev.pin ? "Code" : "Was ist 7 \xD7 8?",
      gateType: dev.pin ? "password" : "text",
      answer: s.answer,
      gateWrong: s.gateWrong,
      onAnswer: chg("answer", { gateWrong: false }),
      onGateKey: (e) => {
        if (e.key === "Enter") this.unlock();
      },
      unlock: () => this.unlock(),
      pinA: s.pinA,
      onPinA: chg("pinA", { msg: "" }),
      newName: s.newName,
      onNewName: chg("newName", { msg: "" }),
      restoreText: s.restoreText,
      onRestore: chg("restoreText", { msg: "" }),
      modeOwnCls: (view === "setup" ? s.mode : dev.mode) === "own" ? "opt-on" : "opt-off",
      modeAppCls: (view === "setup" ? s.mode : dev.mode) === "app" ? "opt-on" : "opt-off"
    };
    if (view === "setup") {
      const step = s.step;
      return Object.assign(base, {
        stepDots: [1, 2, 3, 4].map((n) => ({ bg: n <= step ? "#0C7C74" : "#C9DDE4" })),
        st1: step === 1,
        stRestore: step === "restore",
        st2: step === 2,
        st3: step === 3,
        st4: step === 4,
        next1: () => {
          if (this.validPin(s.pinA)) this.setState({ step: 2, msg: "" });
          else this.setState({ msg: "Bitte 4 bis 6 Ziffern w\xE4hlen." });
        },
        toRestore: () => this.setState({ step: "restore", msg: "" }),
        backToSetup: () => this.setState({ step: 1, msg: "" }),
        doRestoreSetup: () => {
          if (W.importAll(s.restoreText)) {
            W.unlock();
            window.location.href = "Start.html";
          } else this.setState({ msg: "Das ist keine g\xFCltige Sicherung." });
        },
        setupNames: s.names.map((n, i) => ({ name: n, aria: n + " entfernen", remove: () => {
          const l = s.names.slice();
          l.splice(i, 1);
          this.setState({ names: l });
        } })),
        onNewKey: (e) => {
          if (e.key === "Enter") {
            const l = s.names.slice();
            this.addName(l);
            this.setState({ names: l, newName: "" });
          }
        },
        addSetupName: () => {
          const l = s.names.slice();
          this.addName(l);
          this.setState({ names: l, newName: "" });
        },
        backTo1: () => this.setState({ step: 1, msg: "" }),
        next2: () => {
          if (s.names.length) this.setState({ step: 3, msg: "" });
          else this.setState({ msg: "Bitte mindestens ein Kind eintragen." });
        },
        pickOwn: () => this.setState({ mode: "own" }),
        pickApp: () => this.setState({ mode: "app" }),
        backTo2: () => this.setState({ step: 2 }),
        next3: () => this.setState({ step: 4 }),
        sumNames: s.names.join(", "),
        sumMode: s.mode === "own" ? "selber verwalten" : "aus der App",
        sumPin: "gesetzt",
        finish: () => this.finish()
      });
    }
    if (view === "gate") return base;
    const tabs = [["lern", "Lernwochen"], ["kids", "Kinder"], ["backup", "Sicherung"], ["code", "Eltern-Code"]].map((t) => ({ label: t[1], on: s.tab === t[0], cls: s.tab === t[0] ? "seg-on" : "btn-soft", pick: () => this.setState({ tab: t[0], msg: "", delId: "" }) }));
    const kidRows = W.profiles().map((p) => {
      const d = W.profileData(p.id);
      return { name: p.name, cur: this.lab(d && d.current), nxt: d && d.next ? this.lab(d.next) : "noch nicht eingetragen", canEdit: true, isApp: false, editLabel: dev.mode === "app" ? "Eigene Lernw\xF6rter hinzuf\xFCgen" : "Lernw\xF6rter eintragen", own: d ? (d.shelf || []).filter((b) => b.week.source !== "app").length + (d.current && d.current.words && d.current.words.length && d.current.source !== "app" ? 1 : 0) : 0, edit: () => {
        W.setActive(p.id);
        W.unlock();
        window.location.href = "Lernwoche.html#eintragen";
      } };
    });
    const kidList = W.profiles().map((p) => ({
      name: p.name,
      rename: (e) => {
        W.renameProfile(p.id, e.target.value);
        this.setState({});
      },
      delLabel: s.delId === p.id ? "Wirklich l\xF6schen?" : "L\xF6schen",
      delColor: s.delId === p.id ? "#B45309" : "#10304A",
      del: () => {
        if (s.delId === p.id) {
          if (W.profiles().length > 1) {
            W.removeProfile(p.id);
            this.setState({ delId: "", msg: "Gel\xF6scht." });
          } else this.setState({ delId: "", msg: "Das letzte Kind kann nicht gel\xF6scht werden." });
        } else this.setState({ delId: p.id, msg: "" });
      }
    }));
    const mail = s.exportText && s.exportText.length < 4e4 ? "mailto:?subject=" + encodeURIComponent("Sicherung Wortschatz-Inseln") + "&body=" + encodeURIComponent(s.exportText) : "#";
    return Object.assign(base, {
      backupDue: W.backupDue(),
      goBackup: () => this.setState({ tab: "backup" }),
      tabs,
      tabLern: s.tab === "lern",
      tabKids: s.tab === "kids",
      tabBackup: s.tab === "backup",
      tabCode: s.tab === "code",
      pickOwn: () => {
        dev.mode = "own";
        W.save();
        this.setState({});
      },
      pickApp: () => {
        dev.mode = "app";
        W.save();
        this.setState({});
      },
      kidRows,
      kidList,
      addKid: () => {
        const n = s.newName.trim();
        if (!n) return;
        if (W.profiles().some((p) => p.name.toLowerCase() === n.toLowerCase())) {
          this.setState({ msg: "Diesen Namen gibt es schon.", newName: "" });
          return;
        }
        W.addProfile(n);
        this.setState({ newName: "", msg: n + " ist dabei." });
      },
      onHomeNewKey: (e) => {
        if (e.key === "Enter") {
          const n = s.newName.trim();
          if (n && !W.profiles().some((p) => p.name.toLowerCase() === n.toLowerCase())) {
            W.addProfile(n);
            this.setState({ newName: "", msg: n + " ist dabei." });
          }
        }
      },
      backupInfo: W.backupInfo(),
      makeBackup: () => this.setState({ exportText: W.exportAll(), msg: "" }),
      hasExport: !!s.exportText,
      exportText: s.exportText,
      mailHref: mail,
      selectAll: () => {
        try {
          const t = document.getElementById("bk");
          t.focus();
          t.setSelectionRange(0, 9999999);
          t.select();
        } catch (e) {
        }
      },
      doRestoreHome: () => {
        if (W.importAll(s.restoreText)) {
          W.unlock();
          this.setState({ restoreText: "", exportText: "", msg: "Sicherung eingespielt." });
        } else this.setState({ msg: "Das ist keine g\xFCltige Sicherung." });
      },
      pinState: dev.pin ? "Ein Eltern-Code ist gesetzt." : "Kein Code gesetzt \u2013 es gilt die Rechenaufgabe 7 \xD7 8.",
      setPin: () => {
        if (this.validPin(s.pinA)) {
          dev.pin = s.pinA;
          W.save();
          this.setState({ pinA: "", msg: "Neuer Code gespeichert." });
        } else this.setState({ msg: "Bitte 4 bis 6 Ziffern w\xE4hlen." });
      }
    });
  }
};
