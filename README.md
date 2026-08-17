# Site de présentation d'OpenContact

La page qui explique [OpenContact](https://github.com/mahi010110/Open-Contact)
à quelqu'un qui ne l'a pas encore ouvert.

**En ligne :** https://mahi010110.github.io/Opn.../

## Ce que c'est

Une page statique, sans dépendance et sans étape de build. Elle reprend
l'identité « Utilitaire 98 » du produit — encre sur papier, bevels francs,
ombres dures sans flou, coins droits — pour que le site et l'application se
ressemblent.

| | |
|---|---|
| `index.html` | Toute la page |
| `styles.css` | Les tokens de couleur, typo et relief, copiés du produit |
| `assets/fonts/` | Silkscreen, Public Sans, IBM Plex Mono (OFL, licences incluses) |
| `assets/` | Le logo et l'icône |
| `captures/` | Les captures d'écran de l'application, prises dans un vrai navigateur |

**Rien n'est chargé depuis un réseau** — pas de CDN, pas de police distante,
pas de script tiers. Le site suit la même règle que le produit.

## Lancer en local

```sh
python3 -m http.server 8000
```

Puis <http://localhost:8000>.

## Vérifier avant de livrer

```sh
node outils/verifier.mjs
```

Lance le site dans un vrai Chromium et contrôle, en 390 × 844, 360 × 640 et
1280 × 800, dans **les deux thèmes** : aucun élément plus large que le cadre,
cibles ≥ 44 px au doigt et ≥ 32 px à la souris, images chargées et décrites,
captures accordées au thème, bascule fonctionnelle, zéro erreur console.

Le contrôle de débordement **plante une sonde** avant de mesurer : s'il ne
voit pas sa propre sonde, il échoue. Un contrôle qui ne sait plus échouer ne
prouve rien.

## Refaire les captures

```sh
node outils/captures.mjs
```

Elles sont prises dans l'application **réelle**, jamais dessinées, avec des
données de démonstration entièrement fictives — chaque écran dans les deux
thèmes.

Les deux scripts s'appuient sur l'outillage du dépôt
[Open-Contact](https://github.com/mahi010110/Open-Contact), attendu à côté de
celui-ci. S'il est ailleurs :

```sh
OC_REPO=/chemin/vers/Open-Contact node outils/captures.mjs
```

## Propriété

© 2026 Maheydine Saadi Hamed Ounchiouene. Tous droits réservés — voir [`LICENSE`](LICENSE).

Les polices sont sous SIL Open Font License 1.1 et restent la propriété de
leurs auteurs ; leurs licences sont dans `assets/fonts/`.
