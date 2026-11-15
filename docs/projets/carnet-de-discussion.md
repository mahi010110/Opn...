# Carnet de discussion

Carnet chronologique tenu par Claude pendant la discussion des 12 au 15 novembre 2026.
Les décisions à jour sont dans [`README.md`](README.md) et les deux fiches projet : en cas de doute, elles priment sur ce carnet.

> Ajout du 15/11 : la recherche « Technologies et architecture du lab IA » a montré que l'arrêté du 23 juin 2026 prolonge l'enregistrement du RNCP 37680 jusqu'au 28/02/2027, et qu'une nouvelle version du titre AIS est attendue au 1er mars 2027. À vérifier auprès du centre pour l'examen de juillet 2027.


---

## L'auteur et la façon de travailler

- Étudiant en formation informatique (systèmes et réseaux) et développeur.
  En formation, il travaille sur plusieurs supports : Packet Tracer,
  VMware Workstation, bacs à sable des hébergeurs cloud.
- But : s'amuser, faire des outils **utiles et open source**, les publier
  pour **se faire connaître**. **Pas pour gagner de l'argent.** Pas de budget,
  pas de serveur à payer.
- Préférences : français, tutoiement, **réponses simples** (il a demandé
  « Simplifie »). Pour l'instant **on discute seulement** : ne rien coder ni
  lancer sans son feu vert. Faire des recherches quand il le demande. Aller
  plus loin que ses idées quand il le demande.
- Dépôt de cette session : `mahi010110/Opn...` = site de présentation
  d'OpenContact, « projet mort pour l'instant ». **Dépôt public.** Branche de
  travail : `claude/sweet-hypatia-p4qlsl` (rapports et notes de recherche
  poussés dessus, donc publics). Un hook demande de commit + push les
  fichiers non suivis du dépôt.
- Il a d'autres idées : une seule (le lab IA) a été racontée pour l'instant.
- **13/11 — sujet en cours : le projet 2 (lab IA).** Attention, Claude a
  d'abord mal compris : l'utilisateur n'a PAS dit qu'il préférait le
  projet 1. Il parlait des deux idées pour le lab IA :
  1. **la sienne** : l'app fait tout tourner elle-même ;
  2. **celle de Claude** : l'app pilote les outils existants (Packet
     Tracer, VMware Workstation, cloud).
  Il **préfère la 1** et ne veut pas changer d'idée.
- **Avis de Claude (13/11)** : la 1 est la meilleure si on la construit
  par couches. L'app embarque son moteur (QEMU + une petite VM Linux pour
  les conteneurs, le réseau, le WiFi simulé, l'iSCSI) et ne se branche sur
  un outil externe que quand c'est inévitable : IOS Cisco (Packet Tracer
  ou CML), ESXi sur PC Windows (VMware Workstation), cloud (bacs à sable).
  ESXi dans le moteur intégré : seulement sur un PC Linux. Impossible
  quoi qu'il arrive : tout en même temps sur 16 Go, vrai WiFi radio, Fibre
  Channel, labs x86 sur Mac à puce Apple. Gros chantier → par couches.
- **Autres idées proposées (13/11)** : lab dans le navigateur (Linux émulé
  en WebAssembly, ex. v86, zéro installation, petits labs) ; serveur de la
  classe (un PC costaud de l'école fait tourner les gros labs) ; combinaison
  « un même lab en trois tailles » : navigateur → PC → serveur de classe.
- Idées plus petites évoquées dans le message mal compris (à garder en
  réserve) : « Wireshark expliqué » (capture rejouée en animation),
  « colle tes configs, obtiens ton schéma », portfolio relié à Open-Contact.
- **13/11 — très enthousiaste (« Oh WaW super »).** Il envisage d'en faire
  son **projet fil rouge pour son examen**. Il a demandé : comment l'app
  fonctionnerait, quoi d'autre dedans, et ce que font GNS3 et EVE-NG.
- Réponse de Claude (13/11) :
  - GNS3 / EVE-NG = émulateurs réseau (vrais OS des équipements, en VM ou
    conteneurs) ; Packet Tracer = simulateur (imite Cisco). GNS3 gratuit,
    open source, app + « GNS3 VM » ; EVE-NG serveur avec interface web,
    Community en fin de vie (juin 2026) → Freemium 7 nœuds, Pro ~150 €/an.
    Les deux : surtout réseau, images à fournir, aucun cours ni panne
    (sauf GNS3 3.1 alpha, réseau seulement).
  - Parcours proposé : demander un sujet ou donner son TP en PDF → l'IA
    propose un lab (schéma) → l'app choisit où le lancer → cours avec
    visuel → construire avec vérif → panne secrète (ticket, indices,
    vérif, explication, replay) → rapport, doc, portfolio.
  - Sous le capot : fichier de lab texte partageable ; moteur QEMU + VM
    Linux ; catalogue de pannes ; IA avec des outils ; scripts de
    vérification ; schéma et animations tirés de l'état réel.
  - En plus : bibliothèque de labs et pannes partagés ; TP du prof avec
    barème ; voyage dans le temps (sauvegardes) ; panne du jour, badges ;
    attaque / défense (l'IA attaque ton lab) ; missions client avec cahier
    des charges ; export vers Ansible / PowerShell pour le vrai matériel ;
    à deux sur le même lab.
  - Fil rouge : vérifier avec le formateur que ça colle au référentiel
    (mettre en avant les compétences infra) ; viser une v1 qui marche
    plutôt qu'un « tout » inachevé ; pouvoir expliquer chaque partie au
    jury. Questions posées : quel diplôme, quand est l'examen.
- **Son diplôme (13/11)** : titre professionnel **Administrateur
  d'infrastructures sécurisées (AIS)**, niveau 6, RNCP 37680, ministère du
  Travail. 3 CCP : (1) administrer et sécuriser les infrastructures ;
  (2) concevoir et mettre en œuvre une solution en réponse à un besoin
  d'évolution ; (3) participer à la gestion de la cybersécurité (mesurer
  et améliorer la sécurité, détecter et répondre aux incidents). Examen :
  projet(s) réalisé(s) avant la session → dossier de projet (lu par le
  jury) + diaporama, présentation de 20 à 40 min selon le bloc, entretien
  technique ~1 h (+ questionnaire pour un bloc). Un arrêté du 23 juin 2026
  (NOR TRSD2612248A) a modifié le titre : contenu non vérifié → demander au
  centre quelle version s'applique. Date d'examen : pas encore donnée.
- **Réponse de Claude (13/11, après le diplôme)** :
  - Possible ? Oui, chaque brique existe déjà ; « complet » = des années ;
    pour l'examen, une v1 solide.
  - Lien avec les CCP : mode panne → CCP 1 ; missions client + automatisation
    → CCP 2 ; attaque / défense (SIEM, détection, réponse) → CCP 3. Cadrer
    le projet sur les infrastructures sécurisées que l'app déploie (l'app =
    couche d'automatisation), valider avec le formateur. Démo live « l'IA
    casse, je répare » + vidéo de secours.
  - Présentation dans l'app : 4 espaces (Apprendre, Lab, Pannes et défis,
    Ma progression) ; écran de lab = schéma vivant au centre, terminaux en
    bas, IA à droite, modes Cours / Construire / Panne / Examen.
  - Autres émulations : Windows Server (AD, DNS, DHCP, GPO, PKI), clients,
    Linux ; routeurs / switchs libres (+ Cisco via Packet Tracer / CML) ;
    pare-feu, VPN, proxy, IDS, SIEM (Wazuh), RADIUS / 802.1X, bastion ;
    supervision (Zabbix, Centreon) ; sauvegarde ; virtualisation imbriquée ;
    NAS / SAN ; Docker, Kubernetes ; GLPI ; Kali pour l'attaque ; cloud via
    bacs à sable ; WiFi simulé.
  - Cours complets et pannes très diverses générés par l'IA : oui, avec
    deux garde-fous → cours construits sur le référentiel AIS et des
    sources fiables (docs officielles, guides ANSSI), relecture formateur
    possible ; chaque panne inventée est testée automatiquement sur une
    copie du lab (casser → vérifier cassé → réparer → vérifier réparé)
    avant d'être donnée ; les pannes validées enrichissent la bibliothèque.
- **13/11 (suite)** :
  - **Examen en juillet (2027). C'est lui qui choisit le sujet** du projet.
  - Il veut **de tout** (presque tout émuler) et **tout supervisé par
    l'IA**, avec une discussion sur le côté.
  - **Important** : le projet est sa motivation, mais il doit être **utile
    à tout le monde**, même hors de sa formation, et à ceux qui veulent
    juste apprendre → app générale ; l'AIS n'est qu'un parcours parmi
    d'autres.
  - Il compare l'idée à un mix de **Hermes Agent (Nous Research)** + GNS3 +
    EVE-NG. Hermes Agent : agent IA open source (MIT, sorti en février
    2026), n'importe quel modèle, crée des « skills » à partir de
    l'expérience, mémoire de l'utilisateur entre sessions, sous-agents,
    joignable par Telegram / Discord / Slack / WhatsApp. Réponse de Claude :
    bonne image (moteur de lab de GNS3 / EVE-NG + agent qui apprend comme
    Hermes), plus ce qu'aucun n'a : la pédagogie (cours, pannes vérifiées,
    progression) au-delà du réseau. Idées à reprendre d'Hermes : mémoire de
    l'élève, procédures apprises, choix libre du modèle ; voire s'appuyer
    dessus (MIT), à vérifier.
  - Panneau IA proposé : discussion (texte ou voix) + elle voit l'état du
    lab et les terminaux + elle intervient d'elle-même + elle peut prendre
    la main (avec accord) et on la voit taper + elle annote le schéma.
    Trois niveaux : Prof, Coach, Silencieuse (examen).
  - Calendrier proposé jusqu'à juillet : cadrage et maquettes (nov.-déc.) →
    v1 conteneurs + pannes + cours + schéma (janv.-mars) → VM Windows / AD,
    pare-feu, attaque / défense avec SIEM (avril-mai) → tests avec la
    classe, dossier, diaporama, vidéo de démo (juin) → examen (juillet).

## Vue d'ensemble (13/11)

- **Deux gros projets** : projet 1 (espace de vie école) et projet 2 (lab
  IA, candidat pour l'examen de juillet). Plus Open-Contact, déjà existant.
- Il veut **relier les trois plus tard** et « voit grand ». Ponts évoqués :
  OC → école (suivi de recherche de stage / alternance) ; lab → école (mode
  classe, TP du prof, résultats) ; lab → OC (portfolio de compétences
  vérifiées sur le profil, utile pour l'alternance). Conseil de Claude : un
  projet à la fois (le lab d'abord, pour juillet), mais penser les ponts
  dès maintenant (même identité / clés, formats ouverts, même moteur
  sans serveur).
- Il adore le **multijoueur** : dépannage à plusieurs, attaque entre amis.
  Modes proposés : duel (même panne, chacun son lab, le plus rapide gagne :
  le plus facile, ne fait circuler que le départ et les scores) ; coop
  (plusieurs sur le même lab : facile sur le même Wi-Fi, moins fiable à
  distance sans relais) ; maître du jeu (un ami casse le lab de l'autre,
  l'IA vérifie) ; attaque / défense (bleus vs rouges, l'IA arbitre ;
  idéalement les deux camps sur une même machine ou le serveur de classe) ;
  tournoi de classe. Lobby = un code / QR comme les groupes d'OC. L'IA :
  arbitre, maître du jeu, commentatrice, coach privé par équipe, débrief
  avec replay. Règle d'or : l'attaque reste enfermée dans le lab, jamais
  vers de vrais systèmes. Multijoueur après le solo ; un duel simple
  possible en bonus pour la démo de juillet.
- **13/11 — « est-ce vraiment possible, pas du bidon ? »** Réponse : pas du
  bidon, ambitieux ; chaque brique existe ailleurs ; personne n'a tout
  assemblé ; incertain : quantité de travail, fiabilité de l'IA, perfs sur
  PC d'élève, multijoueur à distance sans serveur, Packet Tracer fermé.
- **13/11 — grosse recherche lancée** (« prends ton temps ») : tout ce qui
  peut servir à réussir le lab IA (technologies, outils, architectures,
  contenus). Dossier `research_notes/Technologies et architecture du lab
  IA/`, rapport attendu dans `reports/Technologies et architecture du lab
  IA.md`. Cinq axes : moteur de lab ; IA et vérification ; app, interface
  et visuels ; multijoueur et écosystème ; contenus et pédagogie.

## Open-Contact (son app existante)

- Dépôt `mahi010110/Open-Contact` (public). App web installable (PWA) sur
  GitHub Pages : suivi de recherche de stage / alternance / emploi + réseau
  (amis, groupes, demandes « quelqu'un chez Aztek ? »).
- Sans aucun serveur : données dans le navigateur (IndexedDB) ; relais Nostr
  publics (via Trystero) pour se trouver et garder les messages ; liaison
  directe WebRTC ; pas de TURN (aucun gratuit ne tient, mesuré) ; QR hors
  ligne et fichiers `.oc` en secours.
- Briques réutilisables : groupe = code (PBKDF2 → étiquette + clé AES-GCM),
  messages de groupe 1 / 7 / 30 jours, boîte aux lettres ECDH P-256 gardée
  par les relais, rôles chef / adjoint signés, retrait d'un membre = nouveau
  code, sync entre ses appareils (le plus récent gagne), phrase de secours,
  « demande suivie comme un colis », statuts de pistes dont « Décroché ».
- Limites mesurées : ~64 Ko par événement de relais, portage ~64 parts de
  9 Ko, pas de notification app fermée, relais gardent 30 jours max.
- Base native `natif/` (Tauri, Rust) gelée, avec un serveur MCP local.
- Licence : « tous droits réservés » → pas open source au sens strict
  (à changer s'il veut de l'open source : MIT, AGPL…).

## Projet 1 — l'espace de vie centre / profs / élèves

- **Évolution de l'idée** : appli d'émargement (« faire l'appel ») + boîte
  de documents administratifs à signer → pont élève ↔ formation →
  **espace de vie complet** centre de formation / profs / élèves.
- **Ce qu'il veut** :
  - messagerie élève ↔ prof ↔ école ;
  - suivi de l'avancée de l'élève, surtout sa **recherche de stage ou
    d'alternance** (pas d'emploi), en **connectant Open-Contact** à la
    nouvelle app ; si l'élève ne veut pas : questions-réponses régulières +
    preuves envoyées ;
  - appels et visios ;
  - documentation façon Classroom : doc de la formation pour tous, doc du
    prof pour les élèves, doc de l'école pour les profs ;
  - l'émargement et les documents signés (idée de départ).
- **Ce qu'on a établi** :
  - faisable sans serveur avec le moteur d'Open-Contact ;
  - lien OC → école : l'élève scanne le QR de l'école dans OC, choisit ce
    qu'il partage, OC envoie un résumé chiffré (boîte). C'est une exception
    à la promesse « le suivi privé ne sort jamais » : chiffres seulement,
    jamais les notes, aperçu avant envoi, révocable, toujours facultatif ;
  - piège : deux apps sur `mahi010110.github.io` = même stockage navigateur
    → domaine séparé ;
  - limites : pas de notif app fermée (l'appel quotidien fait ouvrir l'app) ;
    petits fichiers seulement par les relais ; appels 1:1 possibles mais
    échecs sans TURN ; visio de classe impossible en direct (> 4-5 pers.)
    → lien Jitsi ;
  - ordre conseillé : messagerie + suivi de recherche → émargement +
    documents → documentation → appels ;
  - pitch : « le Pronote des centres de formation, libre et sans serveur » ;
  - noms : **Préau** (préféré de Claude), Liaison, Relais, OpenPromo, Le Fil.
    À éviter : proche d'OpenClassrooms, Cordées de la réussite, « campus ».
    Vérifier GitHub, domaine, INPI.
- **Recherche** : `reports/Potentiel app émargement centres de formation.md`.
  À retenir (le volet argent ne compte plus) :
  - aucune règle n'impose de serveur pour l'émargement (sauf DPC santé ;
    Île-de-France et Auvergne-Rhône-Alpes imposent SoWeSign) ;
  - seule la signature qualifiée est présumée fiable (Cass. 5 mars 2026) →
    contreseing du formateur, QR tournant, export au modèle du financeur,
    archive 5 à 10 ans, horodatage qualifié de l'empreinte ;
  - apps élèves actuelles mal notées (Edusign Android ~3,8/5, SoWeSign
    exige Bluetooth + localisation) ;
  - Qualiopi demande le suivi des absences, les relances, et pour
    l'alternance le lien avec l'entreprise ; aider à trouver un employeur
    est une mission légale des CFA.

## Projet 2 — le lab informatique avec un prof IA

- **Ce qu'il veut (13/11/2026)** : une app qui **réunit les supports de sa
  formation** (Packet Tracer, VMware Workstation, bacs à sable cloud…) et
  fait tout tourner « même VM, ESXi, SAN, NAS, WiFi », avec une IA branchée
  par clé API qui :
  - construit le lab avec lui, ou le construit elle-même ;
  - glisse des pannes à dépanner ;
  - **donne des cours et explique clairement avec un visuel en direct**.
  Il veut que Claude aille **plus loin que ses idées**.
- **Recherche** : `reports/Labs informatiques locaux pilotés par IA.md`.
  - Ça n'existe pas en entier. Le plus proche : **GNS3 3.1** (alpha, local,
    GPL, clé perso, assistant, 50 pannes YAML, MCP 82 outils), mais réseau
    seulement, panne visible, vérification non documentée. Tuteurs IA en
    ligne partout (TryHackMe, HTB, KodeKloud…), mais dans le cloud, et aucun
    « l'IA casse en secret puis vérifie ».
  - MCP existants : Packet Tracer (MCP-Packet-Tracer, 377 étoiles), CML ;
    officiels pour Docker, Kubernetes, Terraform, TrueNAS ; Proxmox, VMware,
    EVE-NG seulement communautaires et fragiles.
  - Limites : vSphere + vCenter ≈ 30 Go de RAM ; ESXi 9 pas gratuit (ESXi
    8.0U3e gratuit) ; ESXi imbriqué sous Windows → couper Hyper-V / VBS
    (casse WSL2 et Docker) ; WiFi émulé seulement sous Linux ; Fibre Channel
    impossible ; aucune image Windows / Cisco / VMware dans l'app (chacun
    apporte les siennes) ; images Cisco de CML utilisables seulement dans CML.
  - Sur 16 Go : réseau en conteneurs, domaine AD + pare-feu, ou petit SAN /
    NAS (un à la fois).
  - Architecture conseillée : app = chef d'orchestre (Tauri) ; petits labs
    sur le PC ; gros labs sur un serveur Proxmox à côté.
  - Cœur : **catalogue de pannes** (injection, vérification par l'état final,
    3 niveaux d'indices, explication, retour arrière). L'IA choisit la panne
    et donne les indices, un script vérifie, le tuteur ne voit pas la
    solution. Serveur MCP propre (créer le lab, injecter, vérifier, indice).
  - Plan : v1 Docker seul (~20 pannes Linux / réseau, 3 modes) ; v2 VM (AD,
    pare-feu, iSCSI, WiFi) ; v3 serveur Proxmox (ESXi, vCenter).
  - Visibilité : publier le format des pannes comme format ouvert.
  - Modèles Claude (prix nov. 2026, par million de tokens entrée / sortie) :
    Opus 5.5 par défaut 4 $ / 20 $, Sonnet 5.5 2 $ / 10 $, Haiku 5.5
    0,10 $ / 0,50 $ ; modèle local possible (Ollama), moins bon.
- **Nouvelle précision (13/11)** : « réunir » = brancher l'app sur les
  outils qu'il utilise déjà plutôt que tout refaire : ses outils font
  tourner les labs, l'app les pilote, l'IA enseigne.
- **Réponse de Claude du 13/11** :
  - Possible : piloter VMware Workstation (créer, snapshots, commandes dans
    les VM via VMware Tools → construire, casser, vérifier, même Windows
    Server) ; Docker, GNS3, EVE-NG, Proxmox (API) ; bacs à sable cloud avec
    ses accès ; prof IA (cours à son niveau, questions plutôt que réponses,
    quiz) ; visuel en direct (schéma du lab dessiné depuis le vrai état,
    vrais paquets rejoués en animation pendant l'explication, tableau blanc,
    voix) ; ses PDF de cours comme source.
  - Possible mais limité : Packet Tracer (préparer et charger une topologie
    oui, voir et vérifier en direct très limité, logiciel fermé) ; cloud
    (coût sur compte perso, bacs à sable d'école limités et accès qui
    expirent) ; gros labs selon la RAM (vCenter ≥ 32 Go) ; l'IA peut se
    tromper → scripts de vérification + sources.
  - Pas possible : tout en même temps sur un PC d'élève ; fournir Packet
    Tracer / Windows / ESXi / images Cisco ; vrai WiFi radio et Fibre
    Channel ; IA à la fois gratuite et excellente (clé payante, modèle
    local moins bon, ou abonnement Claude via MCP).
  - Idées en plus proposées : l'IA joue l'utilisateur en panne (support,
    ticket) ; replay du lab commenté ; traducteur Cisco / Linux / Windows /
    cloud ; épreuve blanche chronométrée ; révisions sur les points faibles ;
    doc automatique ou relue ; mode classe (lien avec le projet 1) ;
    portfolio de compétences (lien avec Open-Contact pour l'alternance).
  - Question posée : quel cloud dans sa formation, combien de RAM sur les PC.
