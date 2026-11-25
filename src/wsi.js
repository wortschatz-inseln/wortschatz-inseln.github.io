/* Gemeinsames Modul: Geräte-Einstellungen, Profile, Eltern-Code, Sicherung */
(function () {
  var DK = 'wsi.device';
  var DAY = 86400000;
  function ls() { try { return window.localStorage; } catch (e) { return null; } }
  function read() {
    var d = null, s = ls();
    try { d = JSON.parse(s.getItem(DK) || 'null'); } catch (e) { d = null; }
    if (!d || !d.profiles) d = { v: 1, setupDone: false, pin: '', profiles: [], active: '', mode: 'own', created: Date.now(), lastBackup: 0 };
    return d;
  }
  var dev = read();
  function save() { try { ls().setItem(DK, JSON.stringify(dev)); } catch (e) {} }
  function prof(id) { for (var i = 0; i < dev.profiles.length; i++) if (dev.profiles[i].id === id) return dev.profiles[i]; return null; }
  function mapKey(k) { return (k.indexOf('wsi.') === 0 && k !== DK && dev.active) ? 'wsi.p.' + dev.active + '.' + k.slice(4) : k; }
  function keysWith(prefix) { var s = ls(), out = [], i; if (!s) return out; for (i = 0; i < s.length; i++) { var k = s.key(i); if (k && k.indexOf(prefix) === 0) out.push(k); } return out; }

  var WSI = {
    dev: function () { return dev; },
    save: save,
    name: function () { var p = prof(dev.active); return p ? p.name : ''; },
    profiles: function () { return dev.profiles.slice(); },
    setActive: function (id) { if (prof(id)) { dev.active = id; save(); } },
    addProfile: function (name) {
      name = String(name || '').replace(/\s+/g, ' ').trim().slice(0, 20);
      if (!name) return null;
      var p = { id: 'p' + Date.now().toString(36) + Math.floor(Math.random() * 100), name: name };
      var first = dev.profiles.length === 0;
      dev.profiles.push(p);
      if (!dev.active) dev.active = p.id;
      // alte Daten (vor Profilen) dem ersten Profil zuordnen
      if (first) { var s = ls(), old = s && s.getItem('wsi.lernwoche.v1'); if (old) { s.setItem('wsi.p.' + p.id + '.lernwoche.v1', old); s.removeItem('wsi.lernwoche.v1'); } }
      save();
      return p;
    },
    renameProfile: function (id, name) { var p = prof(id); name = String(name || '').replace(/\s+/g, ' ').trim().slice(0, 20); if (p && name) { p.name = name; save(); } },
    removeProfile: function (id) {
      var s = ls(), ks = keysWith('wsi.p.' + id + '.'), i;
      for (i = 0; i < ks.length; i++) s.removeItem(ks[i]);
      dev.profiles = dev.profiles.filter(function (p) { return p.id !== id; });
      if (dev.active === id) dev.active = dev.profiles.length ? dev.profiles[0].id : '';
      save();
    },
    profileData: function (id) { var s = ls(), raw = s && s.getItem('wsi.p.' + id + '.lernwoche.v1'); try { return raw ? JSON.parse(raw) : null; } catch (e) { return null; } },
    checkPin: function (a) { a = String(a || '').trim(); return dev.pin ? a === dev.pin : a === '56'; },
    unlock: function () { try { window.sessionStorage.setItem('wsi.unlocked', String(Date.now())); } catch (e) {} },
    isUnlocked: function () { try { var t = +window.sessionStorage.getItem('wsi.unlocked'); return !!t && Date.now() - t < 15 * 60000; } catch (e) { return false; } },
    hasData: function () { return keysWith('wsi.p.').length > 0; },
    backupDue: function () { return dev.setupDone && WSI.hasData() && Date.now() - (dev.lastBackup || dev.created) > 14 * DAY; },
    backupInfo: function () {
      if (!dev.lastBackup) return 'Noch keine Sicherung erstellt.';
      var d = new Date(dev.lastBackup), days = Math.floor((Date.now() - dev.lastBackup) / DAY);
      return 'Letzte Sicherung: ' + d.getDate() + '.' + (d.getMonth() + 1) + '.' + d.getFullYear() + (days > 0 ? ' (vor ' + days + ' Tagen)' : ' (heute)');
    },
    exportAll: function () {
      var s = ls(), data = {}, ks = keysWith('wsi.p.'), i;
      dev.lastBackup = Date.now(); save();
      for (i = 0; i < ks.length; i++) data[ks[i]] = s.getItem(ks[i]);
      return JSON.stringify({ app: 'wsi', v: 1, at: new Date().toISOString(), device: dev, data: data });
    },
    importAll: function (txt) {
      var o;
      try { o = JSON.parse(String(txt || '').trim()); } catch (e) { return false; }
      if (!o || o.app !== 'wsi' || !o.device || !o.device.profiles || !o.data) return false;
      var s = ls(), ks = keysWith('wsi.p.'), i;
      for (i = 0; i < ks.length; i++) s.removeItem(ks[i]);
      for (var k in o.data) if (k.indexOf('wsi.p.') === 0) s.setItem(k, o.data[k]);
      dev = o.device; dev.setupDone = true; dev.lastBackup = Date.now();
      save();
      return true;
    }
  };
  window.WSI = WSI;
  window.WSILS = {
    getItem: function (k) { var s = ls(); return s ? s.getItem(mapKey(k)) : null; },
    setItem: function (k, v) { var s = ls(); if (s) s.setItem(mapKey(k), v); },
    removeItem: function (k) { var s = ls(); if (s) s.removeItem(mapKey(k)); }
  };
  if (dev.setupDone && !prof(dev.active) && dev.profiles.length) { dev.active = dev.profiles[0].id; save(); }
  // Erste Öffnung auf einem Gerät: zuerst in den Eltern-Bereich
  if (!dev.setupDone && !/Eltern\.html/.test(window.location.pathname)) window.location.replace('Eltern.html#setup');
})();
