/* Captures pour le site de présentation — prises dans l'app RÉELLE,
   jamais dessinées. Données de démonstration entièrement fictives. */
import path from 'path';
import { mkdir } from 'fs/promises';
import { fileURLToPath, pathToFileURL } from 'url';

/* Le dépôt du produit : à côté de celui-ci par défaut, sinon OC_REPO. */
const ICI = path.dirname(fileURLToPath(import.meta.url));
const PRODUIT = process.env.OC_REPO || path.resolve(ICI, '..', '..', 'Open-Contact');
const { chromium, chromiumPath, serveRepo, attendre } =
  await import(pathToFileURL(path.join(PRODUIT, 'tests', 'e2e', 'outils.mjs')).href);

const SORTIE = path.resolve(ICI, '..', 'captures');
await mkdir(SORTIE, { recursive: true });

const jour = d => { const t = new Date('2026-08-16T12:00:00Z'); t.setDate(t.getDate() + d);
  return t.toISOString().slice(0, 10); };
const ms = d => new Date(jour(d) + 'T10:00:00Z').getTime();

const ct = (n, nom, role, mail) => ({ id: 'c' + n, name: nom, role,
  email: mail, phone: '06 39 98 00 0' + n, activatedAt: ms(-30) });

const PISTES = [
  { id: 'p1', name: 'Adrastia Systèmes', city: 'Toulouse', domain: 'cyber',
    status: 'active', positions: ['alternance'],
    desc: 'Sécurité offensive et audit pour les collectivités du Sud-Ouest.',
    techs: ['Python', 'Kubernetes'], website: 'adrastia.test',
    vecu: 'stage', vecuQui: 'Léa',
    contacts: [ct(1, 'Camille Ferrand', 'Responsable recrutement', 'c.ferrand@adrastia.test')],
    nextAction: jour(0), nextActionText: 'Relancer Camille', nextActionCt: 'c1',
    appliedAt: jour(-9), updatedAt: ms(-2), createdAt: ms(-30) },

  { id: 'p2', name: 'Ostral Cyberdéfense', city: 'Bordeaux', domain: 'cyber',
    status: 'reply', positions: ['alternance', 'stage'],
    desc: 'SOC mutualisé, 40 personnes. Recrute en alternance chaque année.',
    techs: ['Splunk', 'Suricata'], website: 'ostral.test',
    contacts: [ct(2, 'Nadia Berthier', 'Manager SOC', 'n.berthier@ostral.test')],
    nextAction: jour(0), nextActionText: 'Préparer l’entretien', nextActionCt: 'c2',
    appliedAt: jour(-14), updatedAt: ms(-1), createdAt: ms(-40) },

  { id: 'p3', name: 'Halcyon Data', city: 'Toulouse', domain: 'cloud',
    status: 'active', positions: ['stage'],
    desc: 'Hébergeur souverain. Infrastructure et automatisation.',
    techs: ['Terraform', 'Go'], website: 'halcyon.test',
    contacts: [ct(3, 'Yanis Ould', 'Lead SRE', 'y.ould@halcyon.test')],
    nextAction: jour(-1), nextActionText: 'Envoyer mon CV à jour', nextActionCt: 'c3',
    appliedAt: jour(-6), updatedAt: ms(-3), createdAt: ms(-25) },

  { id: 'p4', name: 'Novaquitaine Réseaux', city: 'Pau', domain: 'esn',
    status: 'active', positions: ['alternance'],
    desc: 'ESN régionale, missions longues chez les industriels.',
    website: 'novaquitaine.test',
    contacts: [ct(4, 'Sofia Meriem', 'RH', 's.meriem@novaquitaine.test')],
    appliedAt: jour(-26), updatedAt: ms(-26), createdAt: ms(-50) },

  { id: 'p5', name: 'Groupe Ravenel', city: 'Agen', domain: 'dsi',
    status: 'active', positions: ['alternance'],
    desc: 'DSI interne, 900 postes. Parc Windows et virtualisation.',
    website: 'ravenel.test',
    contacts: [ct(5, 'Marc Delaunay', 'Adjoint DSI', 'm.delaunay@ravenel.test')],
    appliedAt: jour(-52), updatedAt: ms(-52), createdAt: ms(-70) },

  { id: 'p6', name: 'Vergne Assurances', city: 'Bordeaux', domain: 'commerce',
    status: 'todo', positions: ['alternance'],
    desc: 'Mutuelle régionale. Refonte de son poste de travail.',
    techs: ['Intune'], website: 'vergne.test',
    vecu: 'connait', vecuQui: 'Awa',
    contacts: [ct(6, 'Hélène Sarrazin', 'Chargée de recrutement', 'h.sarrazin@vergne.test')],
    updatedAt: ms(-4), createdAt: ms(-4) },

  { id: 'p7', name: 'Atelier Barbaste', city: 'Nérac', domain: 'industrie',
    status: 'todo', positions: ['stage'],
    desc: 'Menuiserie industrielle, informatisation de l’atelier.',
    website: 'barbaste.test',
    contacts: [ct(7, 'Paul Barbaste', 'Gérant', 'contact@barbaste.test')],
    updatedAt: ms(-5), createdAt: ms(-5) },

  { id: 'p8', name: 'Lombard Négoce', city: 'Toulouse', domain: 'commerce',
    status: 'todo', positions: ['alternance'],
    desc: 'Négoce de matériaux, 12 agences.', website: 'lombard.test',
    contacts: [ct(8, 'Inès Fabre', 'RH', 'i.fabre@lombard.test')],
    updatedAt: ms(-7), createdAt: ms(-7) },

  { id: 'p9', name: 'Sylvestre Cloud', city: 'Bayonne', domain: 'cloud',
    status: 'todo', positions: ['stage', 'alternance'],
    desc: 'Petit hébergeur, infogérance de PME.', website: 'sylvestre.test',
    contacts: [ct(9, 'Théo Ancelin', 'Cofondateur', 't.ancelin@sylvestre.test')],
    updatedAt: ms(-8), createdAt: ms(-8) }
];

const SEED = PISTES;                       /* DATA_KEY porte un TABLEAU nu */
const PROFIL = { firstName: 'Maheydine' };

const { server, base } = await serveRepo();
const browser = await chromium.launch({ executablePath: chromiumPath() });
const erreurs = [];

async function shot(nom, route, { w = 390, h = 844, theme = 'light' } = {}){
  const ctx = await browser.newContext({
    viewport: { width: w, height: h }, hasTouch: w < 901,
    deviceScaleFactor: 2, colorScheme: theme === 'dark' ? 'dark' : 'light' });
  const p = await ctx.newPage();
  p.on('pageerror', e => erreurs.push(nom + ' : ' + e));
  p.on('console', m => { if (m.type() === 'error') erreurs.push(nom + ' : ' + m.text()); });

  await p.goto(base + '/#/' + route, { waitUntil: 'load' });
  await p.evaluate(async ({ d, prof }) => {
    const st = await import('./engine/storage.js');
    await st.kvInit();
    await st.kvSet(st.DATA_KEY, JSON.stringify(d));
    await st.kvSet(st.PROFILE_KEY, JSON.stringify(prof));
  }, { d: SEED, prof: PROFIL });
  await p.evaluate(t => localStorage.setItem('oc_theme', t), theme);
  await p.reload({ waitUntil: 'load' });
  await attendre(p, async n => (await import('./ui/state.js')).S.companies.length === n,
    { message: 'pistes chargées' }).catch(() => {});
  await p.waitForTimeout(900);
  await p.screenshot({ path: SORTIE + '/' + nom + '.png' });
  console.log('✓', nom + '.png', `${w}×${h}`, theme);
  await ctx.close();
}

/* Chaque écran dans LES DEUX thèmes : une capture claire posée sur une
   page sombre fait un bloc éblouissant, et casse la règle « tout se
   vérifie dans les deux thèmes ». */
await shot('aujourdhui', 'aujourdhui');
await shot('aujourdhui-sombre', 'aujourdhui', { theme: 'dark' });
await shot('pistes', 'pistes');
await shot('pistes-sombre', 'pistes', { theme: 'dark' });

await browser.close();
server.close();

if (erreurs.length){ console.error('\nERREURS CONSOLE :\n' + erreurs.join('\n')); process.exitCode = 1; }
else console.log('\nZéro erreur console.');
