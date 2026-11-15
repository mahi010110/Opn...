# Les projets — vue d'ensemble

*Documentation tenue avec Claude, dernière mise à jour le 15 novembre 2026.*
*Rien n'est encore codé : on est en phase de discussion et de recherche.*

Cette doc rassemble tout ce qui a été décidé pendant la discussion, pour ne
rien perdre et pouvoir reprendre à tout moment.

| Document | Contenu |
|---|---|
| [`projet-1-espace-de-vie.md`](projet-1-espace-de-vie.md) | L'espace de vie école / profs / élèves, et son MVP |
| [`projet-2-lab-ia.md`](projet-2-lab-ia.md) | Le lab informatique supervisé par une IA (projet fil rouge de l'examen), et son MVP |
| [`carnet-de-discussion.md`](carnet-de-discussion.md) | Le carnet chronologique de la discussion : chaque idée, chaque décision, chaque correction |

---

## Le but

- S'amuser, construire des outils **utiles et open source**, les publier pour
  **se faire connaître**. Pas pour gagner de l'argent.
- Aucun budget, aucun serveur à payer.
- Des outils **utiles à tout le monde**, pas seulement aux élèves de la même
  formation : débutants, candidats à une certification, curieux.

## Les trois briques

| | État | En une phrase |
|---|---|---|
| **Open-Contact** | Existe (app web installable, sans serveur) | Le suivi de la recherche de stage, d'alternance ou d'emploi, et l'entraide entre camarades |
| **Projet 1 — l'espace de vie** | Idée cadrée, MVP défini | Le lien entre l'école, les profs et les élèves : messagerie, suivi de l'élève, demandes, puis appel et documents signés |
| **Projet 2 — le lab IA** | Idée cadrée, MVP défini, recherche technique faite | Une app de bureau qui fait tourner des labs informatiques et un prof IA qui construit, casse, explique et vérifie |

**Priorité : le projet 2**, parce que c'est le projet fil rouge de l'examen
de juillet 2027. Le projet 1 vient ensuite. Un seul projet à la fois.

## Comment les trois se relieront (plus tard)

- **Open-Contact → espace de vie** : l'élève partage, s'il le veut, l'avancée
  de sa recherche de stage ou d'alternance avec son école.
- **Lab IA → espace de vie** : le prof lance un TP ou une panne pour la
  classe et voit les résultats.
- **Lab IA → Open-Contact** : les labs réussis deviennent des preuves de
  compétences sur le profil, utiles pour décrocher une alternance.

Ce qu'il faut penser dès maintenant pour ne rien refaire :

- **une même identité** par personne dans les trois apps (une paire de clés,
  par exemple une clé Nostr) ;
- **des formats ouverts** lisibles par les trois (labs, pannes, résultats
  signés, badges de compétences au format Open Badges 3.0) ;
- **le même moteur sans serveur** que celui d'Open-Contact (relais Nostr
  publics, liaison directe, QR hors ligne).

## Les recherches

| Recherche | Où | État |
|---|---|---|
| Potentiel d'une app d'émargement pour les centres de formation | [`reports/Potentiel app émargement centres de formation.md`](../../reports/Potentiel%20app%20émargement%20centres%20de%20formation.md) | Terminée (le volet « argent » ne compte plus) |
| Est-ce que le lab IA existe déjà ? | [`reports/Labs informatiques locaux pilotés par IA.md`](../../reports/Labs%20informatiques%20locaux%20pilotés%20par%20IA.md) | Terminée |
| Technologies et architecture du lab IA | [`research_notes/Technologies et architecture du lab IA/`](../../research_notes/Technologies%20et%20architecture%20du%20lab%20IA/) | Notes des 5 axes terminées, **compte rendu de synthèse à rédiger** |

Les notes brutes de chaque recherche sont dans `research_notes/`.

## Pour reprendre avec Claude

- Parler en français, tutoyer, faire **simple**.
- **On discute** : ne rien coder ni lancer sans feu vert explicite.
- Faire des recherches quand c'est demandé, et aller plus loin que les idées
  proposées quand c'est demandé.
- Relire d'abord ce dossier, puis le carnet de discussion.
- Prochaine étape prévue (en attente du feu vert) : rédiger le compte rendu
  de synthèse de la recherche « Technologies et architecture du lab IA ».
- Attention : ce dépôt est **public**. Tout ce qui est poussé est visible.
