/* Vérifie le site de présentation en le lançant réellement :
   deux tailles, deux thèmes, zéro erreur console, aucun débordement
   latéral, et toutes les cibles à la bonne taille selon l'ergonomie. */
import http from 'http';
import path from 'path';
import { readFile } from 'fs/promises';
import { fileURLToPath, pathToFileURL } from 'url';

const ICI = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(ICI, '..');
const PRODUIT = process.env.OC_REPO || path.resolve(ROOT, '..', 'Open-Contact');
const { chromium, chromiumPath } =
  await import(pathToFileURL(path.join(PRODUIT, 'tests', 'e2e', 'outils.mjs')).href);
const MIME = { '.html':'text/html', '.css':'text/css', '.js':'text/javascript',
  '.svg':'image/svg+xml', '.png':'image/png', '.woff2':'font/woff2', '.txt':'text/plain' };

const server = http.createServer(async (req, res) => {
  try{
    let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (p === '/') p = '/index.html';
    const data = await readFile(path.join(ROOT, p));
    res.writeHead(200, { 'content-type': MIME[path.extname(p)] || 'application/octet-stream' });
    res.end(data);
  }catch(e){ if(!res.headersSent) res.writeHead(404); res.end(); }
});
await new Promise(r => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}`;

const browser = await chromium.launch({ executablePath: chromiumPath() });
let ko = 0;
const fail = m => { console.error('  ✗ ' + m); ko++; };

for (const [w, h, tactile] of [[390, 844, true], [360, 640, true], [1280, 800, false]]){
  for (const theme of ['light', 'dark']){
    const errs = [];
    const ctx = await browser.newContext({ viewport:{ width:w, height:h },
      hasTouch: tactile, deviceScaleFactor: 1,
      colorScheme: theme === 'dark' ? 'dark' : 'light' });
    const p = await ctx.newPage();
    p.on('pageerror', e => errs.push(String(e)));
    p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
    await p.goto(base + '/', { waitUntil: 'load' });
    await p.waitForTimeout(500);

    const tag = `${w}×${h} ${theme}`;
    console.log(`\n━━━ ${tag} ━━━`);

    /* le thème demandé est-il bien appliqué ? */
    const applique = await p.evaluate(() => document.documentElement.getAttribute('data-theme'));
    if (applique !== theme) fail(`${tag} : thème « ${applique} » au lieu de « ${theme} »`);
    else console.log('  ✓ thème suivi du système');

    /* Aucun débordement latéral — on vise la CAUSE (un enfant plus large
       que sa boîte), pas seulement le symptôme, que `overflow-x:hidden`
       masquerait. Un élément garé à gauche hors écran (lien d'évitement)
       n'est PAS une cause : en LTR, seul le dépassement à DROITE pousse.
       Le contrôle se vérifie lui-même en plantant une sonde : s'il ne
       la voit pas, il ne verrait pas non plus un vrai défaut. */
    const mesurer = () => {
      const vw = document.documentElement.clientWidth;
      const out = [];
      document.querySelectorAll('body *').forEach(n => {
        const r = n.getBoundingClientRect();
        if (r.width && r.right > vw + 1)
          out.push(n.tagName.toLowerCase() + '.' + (n.className || '').toString().slice(0,30)
                   + ' [' + Math.round(r.left) + '→' + Math.round(r.right) + '/' + vw + ']');
      });
      return { vw, scrollW: document.documentElement.scrollWidth, out: out.slice(0, 5) };
    };

    const sonde = await p.evaluate(m => {
      const d = document.createElement('div');
      d.id = 'sonde-debordement';
      d.style.cssText = 'width:' + (document.documentElement.clientWidth + 400) + 'px;height:4px';
      document.body.appendChild(d);
      const vu = eval('(' + m + ')')().out.length;
      d.remove();
      return vu;
    }, mesurer.toString());
    if (!sonde) fail(`${tag} : le contrôle de débordement est AVEUGLE — il n'a pas vu sa propre sonde`);

    const large = await p.evaluate(m => eval('(' + m + ')')(), mesurer.toString());
    if (large.out.length) fail(`${tag} : ${large.out.length} élément(s) plus larges que le cadre — ` + large.out.join(' · '));
    else if (large.scrollW > large.vw + 1) fail(`${tag} : la page défile latéralement (${large.scrollW} > ${large.vw})`);
    else console.log('  ✓ rien ne déborde latéralement (sonde vue)');

    /* cibles : 44 px au doigt, 32 px à la souris (produit, §5) */
    const min = tactile ? 44 : 32;
    const petites = await p.evaluate(m => {
      const out = [];
      document.querySelectorAll('a.btn, button, a.skip').forEach(n => {
        const r = n.getBoundingClientRect();
        if (!r.width || !r.height) return;                 /* replié = pas une cible */
        if (r.height < m - 0.5) out.push((n.textContent||n.getAttribute('aria-label')||'?')
          .trim().slice(0,22) + ' ' + Math.round(r.width) + '×' + Math.round(r.height));
      });
      return out;
    }, min);
    if (petites.length) fail(`${tag} : ${petites.length} cible(s) sous ${min} px — ` + petites.join(' · '));
    else console.log(`  ✓ toutes les cibles ≥ ${min} px`);

    /* les captures se chargent vraiment */
    const cassees = await p.evaluate(() => [...document.images]
      .filter(i => !i.complete || i.naturalWidth === 0)
      .map(i => i.getAttribute('src')));
    if (cassees.length) fail(`${tag} : image(s) cassée(s) — ` + cassees.join(' · '));
    else console.log('  ✓ toutes les images chargent');

    /* Toute image VISIBLE porte un alt NON VIDE. Un alt vide passerait un
       simple `!== null` : ici la capture affichée est la seule exposée au
       lecteur d'écran, donc elle doit se décrire elle-même. */
    const sansAlt = await p.evaluate(() => [...document.images]
      .filter(i => i.offsetParent !== null || getComputedStyle(i).position === 'fixed')
      .filter(i => !(i.getAttribute('alt') || '').trim() && !i.closest('a.brand'))
      .map(i => i.getAttribute('src')));
    if (sansAlt.length) fail(`${tag} : image(s) visible(s) sans alt utile — ` + sansAlt.join(' · '));
    else console.log('  ✓ toute image visible se décrit');

    /* la bonne capture pour le thème : jamais une claire sur fond sombre */
    const capt = await p.evaluate(() => {
      const vu = s => [...document.querySelectorAll(s)].filter(n => n.offsetParent !== null).length;
      return { clair: vu('.sh-clair'), sombre: vu('.sh-sombre') };
    });
    const attendu = theme === 'dark' ? capt.sombre && !capt.clair : capt.clair && !capt.sombre;
    if (!attendu) fail(`${tag} : captures — ${capt.clair} claire(s) et ${capt.sombre} sombre(s) visibles`);
    else console.log(`  ✓ captures au thème (${theme === 'dark' ? capt.sombre : capt.clair} visibles)`);

    if (errs.length) fail(`${tag} : ${errs.length} erreur(s) console — ` + errs.slice(0,3).join(' | '));
    else console.log('  ✓ zéro erreur console');

    if (w === 1280 && theme === 'light')
      await p.screenshot({ path: path.join(ROOT, 'captures', '.apercu-clair.png'), fullPage: true });
    if (w === 390 && theme === 'dark')
      await p.screenshot({ path: path.join(ROOT, 'captures', '.apercu-sombre.png'), fullPage: true });

    await ctx.close();
  }
}

/* le bouton de thème bascule-t-il vraiment, et dans les deux sens ? */
{
  const ctx = await browser.newContext({ viewport:{ width:390, height:844 }, hasTouch:true });
  const p = await ctx.newPage();
  await p.goto(base + '/', { waitUntil: 'load' });
  const avant = await p.evaluate(() => document.documentElement.dataset.theme);
  await p.click('#theme');
  const apres = await p.evaluate(() => document.documentElement.dataset.theme);
  await p.click('#theme');
  const retour = await p.evaluate(() => document.documentElement.dataset.theme);
  if (avant === apres || apres === retour) fail(`bascule de thème : ${avant} → ${apres} → ${retour}`);
  else console.log(`\n  ✓ bascule de thème : ${avant} → ${apres} → ${retour}`);
  await ctx.close();
}

await browser.close();
server.close();
console.log(ko ? `\n${ko} PROBLÈME(S)` : '\nSite : OK');
process.exitCode = ko ? 1 : 0;
