// Baut aus src/boards/*.dc.html die fertige App in docs/ (läuft auf iOS 10)
import fs from 'fs'; import path from 'path'; import crypto from 'crypto';
import { transformSync } from 'esbuild';

const SRC = 'src', OUT = 'docs';
fs.rmSync(OUT, { recursive: true, force: true });
for (const d of ['', '/js', '/assets', '/fonts']) fs.mkdirSync(OUT + d, { recursive: true });

// Assets
const blob = {
  '8afe67a526188b5eb29b4b6893e4e37f': 'kiki.png', 'f3e4e2b874922ec15c7e0fefc0ca158e': 'truhe.png',
  'dd5e18cef46ea9e431968be39083e2a6': 'truhe_offen.png', 'acfdf38d0373ca0a7947164fb80b4115': 'medaille.png',
  '7cc4054899026178b05414d224634f11': 'karte.jpg', 'd2268aea1accd890631f17a7afbdd625': 'insel-strand.png',
  '38c5855d3564c7b07175662af8c52749': 'insel-vulkan.png', '4cbf5fb668e206f2b49be84c54d71fdf': 'insel-hafen.png',
  '53361ba37e80facc5e986900fbdc2f70': 'woerter.json'
};
for (const f of fs.readdirSync(SRC + '/assets')) fs.copyFileSync(`${SRC}/assets/${f}`, `${OUT}/assets/${f}`);

// Schriften (selbst gehostet)
const fonts = [['fredoka', [500, 600, 700], 'Fredoka'], ['nunito', [400, 600, 700, 800], 'Nunito'], ['andika', [400, 700], 'Andika']];
let fontCss = '';
for (const [pkg, ws, fam] of fonts) for (const w of ws) {
  const fn = `${pkg}-latin-${w}-normal.woff2`;
  fs.copyFileSync(`node_modules/@fontsource/${pkg}/files/${fn}`, `${OUT}/fonts/${fn}`);
  fontCss += `@font-face{font-family:'${fam}';font-weight:${w};font-style:normal;src:url(fonts/${fn}) format('woff2')}\n`;
}
const baseCss = fontCss + `
html,body{margin:0;padding:0;background:#EEF7F9;-webkit-text-size-adjust:100%}
body{-webkit-tap-highlight-color:transparent;-webkit-touch-callout:none;touch-action:manipulation}
#wrap{position:relative;width:100%;overflow:hidden}
#stage{position:absolute;left:0;top:0;width:1194px;height:834px;-webkit-transform-origin:0 0;transform-origin:0 0}
button,.btn{-webkit-user-select:none;user-select:none}
input,textarea{-webkit-user-select:text;user-select:text}
`;
fs.writeFileSync(OUT + '/app.css', baseCss);

const esb = (code) => transformSync(code, { target: 'es2015', minify: false, loader: 'js' }).code;

// Boards
const pages = [];
for (const f of fs.readdirSync(SRC + '/boards').filter((x) => x.endsWith('.dc.html'))) {
  const name = f.replace('.dc.html', '');
  let html = fs.readFileSync(`${SRC}/boards/${f}`, 'utf8');
  const title = (html.match(/<title>([^<]*)<\/title>/) || [, name])[1];
  const sm = html.match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/);
  let script = sm[1];
  let tplHtml = html.match(/<x-dc>([\s\S]*?)<\/x-dc>/)[1];
  const helm = (tplHtml.match(/<helmet>([\s\S]*?)<\/helmet>/) || [, ''])[1];
  tplHtml = tplHtml.replace(/<helmet>[\s\S]*?<\/helmet>/, '');
  const css = [...helm.matchAll(/<style>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join('\n');
  const fix = (s) => s.replace(/\.dc\.html/g, '.html').replace(/\/_blob\/([0-9a-f]{32})/g, (m, id) => {
    if (!blob[id]) throw new Error('unbekanntes Asset ' + id + ' in ' + f);
    return 'assets/' + blob[id];
  });
  tplHtml = fix(tplHtml); script = fix(script);
  // gap-Regeln aus dem CSS (für alte Safari-Versionen)
  const gaps = [];
  for (const m of css.matchAll(/\.([\w-]+)\s*\{([^{}]*)\}/g)) {
    const g = /(?:^|;)\s*gap:\s*(\d+)px/.exec(m[2]); const d = /display:\s*([a-z-]+)/.exec(m[2]);
    if (g && d) gaps.push({ cls: m[1], gap: +g[1], display: d[1].replace('inline-', '') });
  }
  const bg = (tplHtml.match(/background:\s*(#[0-9A-Fa-f]{3,6})/) || [, '#EEF7F9'])[1];
  fs.writeFileSync(`${OUT}/js/${name}.js`, esb(script.replace(/class Component extends DCLogic/, 'window.__Component = class Component extends DCLogic')));
  pages.push(name);
  const page = `<!doctype html>
<html lang="de" manifest="app.appcache">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="Wortschatz-Inseln">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<link rel="apple-touch-icon" href="assets/kiki.png">
<title>${title}</title>
<link rel="stylesheet" href="app.css">
<style>body{background:${bg}}
${css}</style>
<script>window.__GAPS=${JSON.stringify(gaps)};</script>
</head>
<body>
<div id="wrap"><div id="stage"></div></div>
<script type="text/x-tpl" id="tpl">${tplHtml}</script>
<script src="app.js"></script>
<script src="js/${name}.js"></script>
<script src="boot.js"></script>
</body>
</html>`;
  fs.writeFileSync(`${OUT}/${name}.html`, page);
  if (name === 'Main') fs.writeFileSync(`${OUT}/index.html`, page);
}
// Laufzeit: app.js (DCLogic + Mini-Renderer, boot erst nach Board-Skript)
let rt = fs.readFileSync(`${SRC}/runtime.js`, 'utf8').replace("if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();", 'window.__boot = boot;');
fs.writeFileSync(OUT + '/app.js', esb(rt));
fs.writeFileSync(OUT + '/boot.js', "if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', window.__boot); else window.__boot();\n");

// Appcache (Offline + schneller Start)
const files = [];
(function walk(d) { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); e.isDirectory() ? walk(p) : files.push(path.relative(OUT, p)); } })(OUT);
const list = files.filter((x) => x !== 'index.html' && x !== 'app.appcache').sort();
const h = crypto.createHash('md5');
for (const x of list) h.update(fs.readFileSync(path.join(OUT, x)));
fs.writeFileSync(OUT + '/app.appcache', `CACHE MANIFEST\n# version ${h.digest('hex')}\nCACHE:\nindex.html\n${list.join('\n')}\nNETWORK:\n*\n`);
fs.writeFileSync(OUT + '/.nojekyll', '');
console.log('Seiten:', pages.join(', '), '| Dateien:', list.length);
