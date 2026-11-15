# Projet 2 — le lab informatique supervisé par une IA

*Nom : pas encore choisi.*
*En une phrase : une app de bureau qui fait tourner des labs informatiques
complets, avec un prof IA qui construit, casse, explique et vérifie.*
*C'est le **projet fil rouge** de l'examen de juillet 2027.*

---

## 1. L'idée

En formation, on apprend sur des supports éparpillés : Packet Tracer, VMware
Workstation, les bacs à sable des hébergeurs cloud… Et on s'entraîne
rarement au dépannage, parce qu'il faut quelqu'un pour casser les choses.

L'app **réunit tout ça dans un seul outil**, et y ajoute une IA qui :

- **construit le lab avec toi**, ou **le construit à ta place** à partir
  d'une description (« un AD, un DNS et un pare-feu ») ;
- **glisse des pannes** en secret, que tu dois trouver et réparer ;
- **donne des cours** et explique clairement, avec un **visuel en direct** ;
- **supervise tout**, depuis un panneau sur le côté.

On peut la voir comme un mélange de **GNS3 / EVE-NG** (le moteur de lab) et
de **Hermes Agent** de Nous Research (un agent IA qui apprend à te
connaître), plus ce qu'aucun des trois n'a : **la pédagogie** (cours, pannes
vérifiées, progression) au-delà du seul réseau.

Elle doit être **utile à tout le monde**, pas seulement aux élèves de la même
formation.

## 2. La décision d'architecture

Deux idées ont été comparées :

1. **L'app fait tout tourner elle-même** (l'idée de départ) ;
2. l'app pilote seulement les outils existants (Packet Tracer, VMware, cloud).

**Choix retenu : l'idée 1, construite par couches.**

- L'app **embarque son propre moteur** : QEMU (logiciel libre qui fait
  tourner des VM sur Windows, Mac et Linux) et un **environnement Linux
  d'appoint** qui héberge les conteneurs, le réseau virtuel, le WiFi simulé
  et le stockage iSCSI.
- Elle fait elle-même tout ce qu'elle peut, et ne se branche sur un outil
  extérieur **que quand c'est inévitable** :
  - le vrai Cisco (IOS) : via Packet Tracer ou Cisco Modeling Labs, car les
    images Cisco ne peuvent pas être fournies ;
  - ESXi sur un PC Windows : via VMware Workstation ;
  - le cloud : via les bacs à sable des hébergeurs.
- **Un même lab en trois tailles** (plus tard) : petit dans le navigateur,
  moyen sur ton PC, gros sur un serveur de la classe (Proxmox). Même fichier
  de lab, même IA ; l'app choisit où le lancer.

## 3. Ce qui est possible, et ce qui ne l'est pas

### Ce que l'app peut faire tourner elle-même

- des serveurs Linux et des conteneurs ;
- Windows Server (AD, DNS, DHCP, GPO, certificats), à partir de l'ISO que
  l'utilisateur fournit, installé automatiquement ;
- des routeurs et switchs libres (FRR, VyOS, Open vSwitch) : FRR a des
  commandes très proches de Cisco ;
- des pare-feu et VPN (OPNsense, pfSense, WireGuard, IPsec) ;
- la sécurité : détection d'intrusion (Suricata), SIEM (Wazuh), RADIUS et
  802.1X, une machine Kali pour l'attaque ;
- la supervision (Zabbix, Centreon), la sauvegarde, GLPI ;
- un NAS et un SAN iSCSI, du partage NFS et SMB ;
- Docker et Kubernetes léger ;
- du WiFi simulé (dans l'environnement Linux, entre machines Linux) ;
- ESXi imbriqué, mais seulement sur un PC sous Linux.

### Possible, mais limité

- **Packet Tracer** : l'IA peut préparer et charger une topologie (des
  projets le font déjà), mais suivre et vérifier en direct ce que tu fais
  dedans est limité : c'est un logiciel fermé.
- **Le cloud** : attention aux coûts sur un compte perso ; les bacs à sable
  d'école ont des droits limités et des accès qui expirent.
- **Les gros labs** dépendent de la RAM : sur 16 Go, un lab moyen à la fois ;
  un vSphere complet avec vCenter demande au moins 32 Go.
- **L'IA peut se tromper** : un script vérifie toujours les pannes, et les
  cours citent leurs sources.

### Impossible

- tout faire tourner en même temps sur un PC d'élève ;
- fournir Packet Tracer, Windows, ESXi ou les images Cisco dans l'app ;
- le vrai WiFi radio, et le Fibre Channel ;
- Windows Server ou ESXi sur un Mac à puce Apple (beaucoup trop lent) ;
- ESXi 9 gratuit (seul ESXi 8.0U3e l'est).

## 4. Comment l'app fonctionne

### Le parcours

1. Tu dis à l'IA « je veux apprendre le DHCP », ou tu lui donnes le PDF de
   ton TP.
2. Elle propose un lab avec son schéma. Tu valides ou tu modifies.
3. L'app regarde ton PC (RAM, processeur) et choisit où lancer le lab.
4. Le lab démarre : schéma en direct, terminal d'une machine en un clic.
5. **Mode cours** : l'IA explique, et tu vois les vrais paquets du lab
   passer en animation.
6. **Mode construire** : tu configures, l'IA vérifie chaque étape.
7. **Mode panne** : l'IA casse quelque chose en secret, tu reçois un ticket
   (« le PC2 n'a plus Internet »), tu cherches, tu demandes des indices si
   tu bloques, l'app vérifie ta réparation, puis l'IA explique et rejoue le
   déroulé.
8. À la fin : un compte rendu, la doc du lab générée, et une ligne de plus
   dans ton portfolio.

### L'interface

Quatre espaces :

- **Apprendre** : les cours, rangés par parcours ;
- **Lab** : le schéma en direct au centre, les terminaux en bas, l'IA à
  droite ; en haut, les modes Cours, Construire, Panne, Examen ;
- **Pannes et défis** : le catalogue, la panne du jour, les missions ;
- **Ma progression** : les compétences validées et le portfolio.

### Le panneau IA

- Elle **discute**, à l'écrit ou à l'oral.
- Elle **voit** l'état du lab, les terminaux, les erreurs.
- Elle **intervient d'elle-même** (« tu viens de couper l'interface du
  routeur, c'est voulu ? »).
- Elle peut **prendre la main avec ton accord** : tu la vois taper les
  commandes, avec l'explication à côté.
- Elle **annote le schéma** : une flèche, une machine en rouge.
- Trois niveaux de présence : **Prof** (explique tout), **Coach** (seulement
  des indices), **Silencieuse** (mode examen).

### Les parcours (utile à tout le monde)

- « je débute de zéro » ;
- « je prépare une certification » (CCNA, Azure…) ;
- « je prépare un titre ou un diplôme » (le titre AIS est un parcours parmi
  d'autres) ;
- « je veux comprendre un sujet » (curieux, homelab).

L'IA adapte le niveau, et la bibliothèque de labs et de pannes est partagée.
Une version anglaise plus tard ouvrirait le monde entier.

## 5. Sous le capot

- **Le fichier de lab** : un fichier texte (YAML) qui décrit les machines,
  les câbles et les configurations. Partageable comme un fichier Packet
  Tracer.
- **Le moteur** : QEMU et l'environnement Linux d'appoint (une distribution
  WSL2 propre à l'app sous Windows, une VM Lima sous macOS, le système
  lui-même sous Linux). Le réseau est câblé comme dans containerlab (paires
  veth, bridges, Open vSwitch, tc/netem pour dégrader les liens).
- **Remise à zéro instantanée** : une image de référence en lecture seule et
  une couche jetable par machine et par session.
- **Le catalogue de pannes** : chaque panne est un fichier qui décrit
  - ses paramètres (l'IA les choisit, pour que chaque panne soit
    différente) ;
  - ses préconditions ;
  - comment l'injecter, et comment vérifier qu'elle a bien été injectée ;
  - le symptôme visible ;
  - comment vérifier la réparation, et refuser les mauvaises réparations ;
  - le retour arrière ;
  - trois niveaux d'indices et l'explication ;
  - ses sources et sa correspondance avec les référentiels.
- **La boucle de validation** : toute panne, surtout si l'IA l'invente, est
  testée sur une copie du lab avant d'être donnée : lab sain → cassé →
  mauvaise réparation refusée → bonne réparation acceptée → remise à zéro.
  Si un test échoue, la panne est jetée.
- **La vérification n'est jamais faite par l'IA** : ce sont des scripts et
  des outils de test (Goss pour Linux, Pester pour Windows et AD, Batfish pour
  les configurations réseau, des sondes depuis les machines du lab).
- **L'IA** : une boucle d'agent légère, avec des actions typées (créer le lab,
  lancer une commande sur une machine du lab, lire l'état, injecter,
  vérifier, dessiner). Elle **n'a jamais de terminal sur ton PC**, seulement
  sur les machines du lab.
- **Les cours** : générés en s'appuyant sur des sources fiables et
  réutilisables (guides de l'ANSSI, documentation Microsoft, Debian, Red Hat,
  OWASP…), avec citations ; un formateur peut marquer un chapitre comme
  relu. Bonus propre au lab : les commandes citées dans un cours peuvent être
  exécutées pour vérifier qu'elles marchent.
- **L'élève** : sa progression, ses points faibles et ses révisions
  espacées sont gardés sur son PC.

## 6. Le MVP

Le MVP se fait en deux temps : **la v1** (le cœur), puis **la version
examen** (ce qu'il faut en plus pour le jury AIS).

### V1 — le cœur

**Plateformes** : Windows 11 et Linux d'abord ; macOS si possible.

**Fonctions** :

1. **Le moteur** : environnement Linux d'appoint, conteneurs, réseau virtuel
   (FRR, Open vSwitch), dégradation de liens, remise à zéro.
2. **Le fichier de lab** en YAML, et quelques labs de départ.
3. **Le catalogue de pannes** et sa **boucle de validation**, avec une
   vingtaine de pannes (liste ci-dessous).
4. **Les trois modes** : construis avec moi, construis pour moi, casse-le.
5. **Le panneau IA** avec les trois niveaux (Prof, Coach, Silencieuse),
   appliqués par l'app et pas seulement demandés à l'IA.
6. **L'IA au choix** : ta clé API, un modèle local (Ollama), ou ton
   abonnement Claude via un **serveur MCP** exposé par l'app.
7. **Le schéma en direct** : il compare le lab prévu et le lab réel, et met
   en rouge ce qui diffère.
8. **Les terminaux** intégrés.
9. **Les paquets en animation** : capture dans le lab, puis liste
   d'événements rejouée pas à pas, comme le mode simulation de Packet
   Tracer.
10. **Le tableau blanc** où l'IA dessine (schémas générés).
11. **Le replay** de la session et un compte rendu à la fin.
12. **La progression** : compétences validées et révisions.

**Les pannes de la v1** (tirées du catalogue de 45 proposé par la
recherche, toutes en conteneurs ou en réseau virtuel) :

| ID | Panne | Vérification |
|---|---|---|
| L01 | Service web arrêté après redémarrage (unité désactivée, erreur de syntaxe, port pris) | service actif et page qui répond |
| L02 | Disque plein (inodes, fichier supprimé encore ouvert, pas de rotation des journaux) | espace libre et service OK |
| L04 | Connexion SSH par clé cassée (droits, configuration) | connexion par clé OK, root par mot de passe refusé |
| L06 | Tâche planifiée muette, horloge décalée | tâche exécutée, décalage faible |
| N01 | VLAN : mauvais VLAN d'accès, VLAN non autorisé sur le trunk | ping intra-VLAN OK, isolement inter-VLAN gardé |
| N02 | Passerelle, masque ou route par défaut faux | chemin conforme |
| N03 | OSPF : aire, timers, MTU, interface passive | voisinage complet, routes présentes |
| N04 | NAT : mauvaise interface, règle manquante | accès à l'« Internet » simulé |
| N05 | Boucle STP, protection de port, DHCP pirate | pas de tempête, DHCP pirate bloqué |
| S01 | DHCP : étendue épuisée, relais absent, mauvaise option | bail obtenu avec les bonnes options |
| S02 | DNS : enregistrement manquant, secondaire en retard, mauvais résolveur | réponses conformes |
| S03 | Partage NFS ou SMB : droits, export trop large | matrice d'accès conforme |
| F02 | VPN WireGuard : clé, pair, routes autorisées | tunnel établi, seuls les flux prévus passent |
| F04 | Certificats : expiré, intermédiaire manquant, nom non conforme | chaîne valide |
| M03 | Centralisation des journaux : heure, rotation | message témoin reçu à la bonne heure |
| B01 | Sauvegarde « réussie » qui ne sauvegarde pas ce qu'il faut | restauration d'un fichier témoin identique |

**Bonus si le temps le permet** : un **duel** (même panne, chacun son lab,
le premier qui répare gagne), pour la démo.

### Version examen — ce qu'il faut en plus pour juillet

Le jury AIS évalue l'infrastructure et la sécurité. La version examen ajoute
donc :

1. **Des VM** : un domaine Active Directory construit automatiquement depuis
   l'ISO Windows Server d'évaluation, et un pare-feu OPNsense.
2. **Des pannes Windows et AD** : jonction au domaine impossible (DNS,
   enregistrements SRV), GPO non appliquée, durcissement AD selon l'ANSSI.
3. **Le mode attaque et défense, en solo** : l'IA attaque le lab (scan,
   force brute) avec des scénarios d'Atomic Red Team, et tu détectes et
   bloques avec Wazuh (alerte, blocage d'adresse).
4. **Une matrice de flux du pare-feu** vérifiée automatiquement.

### Hors MVP (versions suivantes)

- le multijoueur complet (coop, maître du jeu, attaque et défense entre
  amis, tournois) ;
- le serveur distant Proxmox pour les gros labs (ESXi, vCenter, tout en même
  temps) ;
- les connecteurs Packet Tracer, Cisco Modeling Labs, VMware Workstation et
  bacs à sable cloud ;
- le lab dans le navigateur ;
- la voix ;
- la bibliothèque partagée, les missions client, le TP du prof avec barème,
  la panne du jour et les badges, l'export vers Ansible et PowerShell ;
- le lien avec l'espace de vie et Open-Contact.

## 7. Pistes techniques issues de la recherche

*À confirmer dans le compte rendu de synthèse (en attente).*

| Partie | Piste |
|---|---|
| App de bureau | Tauri 2 (Rust) et une interface React + TypeScript ; le moteur dans un processus séparé de l'interface |
| Moteur | Environnement Linux d'appoint : WSL2 sous Windows, Lima sous macOS ; conteneurs pilotés par la bibliothèque Rust bollard ; containerlab comme backend réseau possible ; QEMU piloté par QMP et l'agent invité |
| VM Windows | Installation automatique depuis l'ISO de l'utilisateur (fichier de réponses, pilotes virtio), commandes via l'agent invité QEMU ou SSH |
| IA | Boucle d'agent fine en Rust (rig-core ou genai), serveur MCP avec rmcp, clés dans le trousseau du système (crate keyring), modèles locaux via Ollama |
| Vérification | Goss (Linux), Pester (Windows et AD), Batfish (réseau), sondes depuis le lab |
| Cours | Recherche locale dans SQLite (FTS5 et sqlite-vec), embeddings locaux (fastembed-rs), extraction PDF |
| Progression | SQLite, maîtrise par compétence et révisions espacées FSRS (crate Rust fsrs) |
| Schéma | React Flow avec mise en page automatique ELK |
| Terminaux et consoles | xterm.js ; noVNC branché directement sur la console des VM QEMU |
| Paquets | Capture dans le lab, analyse avec etherparse ; Wireshark en WebAssembly (Wiregasm) à la demande |
| Tableau blanc | Excalidraw et Mermaid |
| Replay | Journal d'événements et enregistrements de terminal au format asciicast v3 |
| Multijoueur (plus tard) | Rendez-vous par Nostr (code ou QR), transport iroh en Rust, état partagé Loro, résultats signés, arbitre qui vérifie par scripts |
| Distribution | GitHub Releases ; signature Windows gratuite via SignPath Foundation pour l'open source ; Apple coûte 99 $/an |
| Licence | **À décider** : Apache-2.0 ou MIT si l'app lance QEMU et les outils GPL comme programmes séparés ; GPL-3.0 si l'on intègre des bibliothèques sous copyleft (Wiregasm, elkjs). À faire valider |

Points d'attention relevés :

- sous Linux, la vue web de Tauri n'a pas WebRTC : la partie réseau entre
  joueurs devra vivre côté Rust ;
- l'IA sans garde-fous pédagogiques fait progresser pendant l'exercice mais
  **dégrade l'apprentissage** une fois retirée : indices gradués, effort
  demandé avant chaque indice, pas de réponse donnée directement ;
- éviter les classements publics : la gamification a des effets modestes,
  parfois négatifs ;
- les sources de cours n'ont pas toutes une licence qui permet de les
  réutiliser : certaines (Zabbix, pfSense, LPI) ne se citent qu'en court,
  avec un lien.

## 8. L'examen (titre AIS)

- **Titre professionnel Administrateur d'infrastructures sécurisées**,
  niveau 6, RNCP 37680, ministère du Travail.
- **Trois blocs** :
  1. administrer et sécuriser les infrastructures ;
  2. concevoir et mettre en œuvre une solution en réponse à un besoin
     d'évolution ;
  3. participer à la gestion de la cybersécurité.
- **L'épreuve** : un ou plusieurs projets réalisés avant la session, un
  dossier de projet lu par le jury, un diaporama, une présentation de 20 à
  40 minutes selon le bloc, puis un entretien technique d'environ une heure
  (plus un questionnaire pour un bloc).
- **⚠️ À vérifier auprès du centre** : l'arrêté du 23 juin 2026 prolonge
  l'enregistrement du RNCP 37680 jusqu'au 28 février 2027, et une nouvelle
  version du titre est attendue au 1er mars 2027. L'examen de juillet 2027
  pourrait donc relever d'un nouveau référentiel, ou de mesures
  transitoires.
- **C'est l'élève qui choisit le sujet** du projet.

**Le lien avec les blocs** :

- le mode panne correspond au bloc 1 (administrer, dépanner) ;
- les missions client et l'automatisation correspondent au bloc 2 ;
- le mode attaque et défense (détecter, réagir) correspond au bloc 3.

**Comment le présenter** :

- le projet = **une plateforme qui déploie des infrastructures sécurisées et
  y provoque des incidents** ; dans le dossier, les infrastructures (schémas,
  sécurisation, supervision, sauvegarde) passent avant le code ;
- une **démo en direct** où l'IA casse un lab et où l'élève répare devant le
  jury, avec une **vidéo de secours** ;
- savoir expliquer chaque partie, y compris celles écrites avec l'aide d'une
  IA ;
- faire valider le cadrage par le formateur.

## 9. Le calendrier jusqu'à juillet 2027

| Période | Objectif |
|---|---|
| Novembre – décembre 2026 | Cadrage, maquettes des écrans, choix techniques, premier prototype du moteur |
| Janvier – mars 2027 | V1 : conteneurs, réseau, une vingtaine de pannes, cours, schéma en direct, panneau IA |
| Avril – mai 2027 | Version examen : VM Windows et AD, pare-feu, attaque et défense avec Wazuh |
| Juin 2027 | Tests avec la classe, dossier de projet, diaporama, vidéo de démo |
| Juillet 2027 | Examen |

## 10. Les risques

- **La quantité de travail** : « tout » demande des années. D'où les couches
  et le MVP.
- **La fiabilité de l'IA** : toujours vérifier par scripts, citer les
  sources.
- **Les performances** sur un PC d'élève : à mesurer très tôt.
- **La virtualisation imbriquée sous Windows** : selon la configuration du PC
  (Hyper-V, sécurité basée sur la virtualisation), certaines combinaisons ne
  marchent pas.
- **Le multijoueur à distance sans serveur** ne passe pas sur tous les
  réseaux.
- **La concurrence sur le réseau** : GNS3 3.1 couvrira bien le réseau quand
  il sera stable. La différence de ce projet, c'est le dépannage systèmes,
  sécurité et stockage, et la pédagogie.
- **Les licences** des images et des sources de cours : l'app ne distribue
  aucune image propriétaire, chacun apporte les siennes.

## 11. Les recherches

- [`reports/Labs informatiques locaux pilotés par IA.md`](../../reports/Labs%20informatiques%20locaux%20pilotés%20par%20IA.md) :
  ce qui existe déjà, ce qui est faisable et légal sur un PC d'élève.
- [`research_notes/Technologies et architecture du lab IA/`](../../research_notes/Technologies%20et%20architecture%20du%20lab%20IA/) :
  les notes des cinq axes (moteur de lab ; IA et vérification ; app,
  interface et visuels ; multijoueur et écosystème ; contenus et pédagogie),
  dont le catalogue complet de 45 labs et pannes. **Compte rendu de synthèse
  à rédiger.**
