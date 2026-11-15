# Contenus et pédagogie pour un lab d'infrastructure supervisé par IA : référentiels, ressources réutilisables, bibliothèques de pannes, contenus sécurité et conception fondée sur les preuves (état au 13 novembre 2026)

> **Note de méthode (13/11/2026).** L'environnement de recherche ne laissait passer que GitHub et les registres de paquets. **WebFetch et curl étaient bloqués** pour francecompetences.fr, legifrance.gouv.fr, cyber.gouv.fr, learn.microsoft.com, learningcontent.cisco.com, lpi.org, docs.netgate.com, rules.emergingthreats.net et arxiv.org. Pour ces sites, le contenu vient des **synthèses du moteur de recherche**, à revérifier sur la page d'origine avant publication. En revanche, les **licences, étoiles (★), dates de dernier push et formats des dépôts GitHub ont été vérifiés directement** le 13/11/2026 : API de recherche GitHub et fichiers `LICENSE`/`README` lus sur raw.githubusercontent.com. Ces points sont marqués **[GitHub vérifié]**.
> **Étiquettes.** **[Officiel]** = autorité ou éditeur (ministère, France Compétences, ANSSI, MITRE, CompTIA, Cisco, Microsoft…). **[Projet]** = dépôt ou documentation du projet lui-même. **[Communauté]** = dépôt ou contenu communautaire. **[Secondaire]** = organisme de formation, blog, presse, site de préparation. **[Recherche]** = article scientifique ou actes de conférence, le plus souvent lus via leur résumé. Une source [Secondaire] ne vaut pas texte officiel, en particulier pour les dates d'examen et les licences.

---

## 1. Référentiels et objectifs à cartographier : AIS (RNCP 37680) et l'arrêté de juin 2026, TSSR, BTS SIO SISR, BUT R&T, CCNA, Network+, Security+, Linux+, LPIC-1, AZ-900/AZ-104, RHCSA

### Takeaway
L'**arrêté du 23 juin 2026 ne réécrit pas l'AIS**. D'après les sources trouvées, il **prolonge de six mois l'enregistrement du RNCP 37680, jusqu'au 28/02/2027**, et une **nouvelle version du titre est attendue au 1er mars 2027**. Un examen en juillet 2027 risque donc de relever d'un référentiel pas encore publié, ou de mesures transitoires : c'est à vérifier auprès du centre. Le **TSSR a déjà été renouvelé** (RNCP 42463, arrêté du 16 juin 2026). Côté certifications, deux bascules sont en cours : **CCNA v2.0 au 3 février 2027**, avec un domaine IA d'environ 10 %, et **Security+ SY0-801 au 17 novembre 2026**.

Les thèmes qui reviennent partout sont les suivants : réseau L2/L3, services DNS/DHCP/annuaire, administration Linux et Windows, virtualisation, stockage et sauvegarde, supervision et journalisation, durcissement, détection et réponse aux incidents, automatisation, et **dépannage méthodique**. Les **référentiels français** sont des informations publiques réutilisables. Les **objectifs des certifications** sont protégés par le droit d'auteur : il faut les référencer par identifiant, avec une paraphrase et un lien.

### Cited Findings

**Titre professionnel AIS (niveau 6), RNCP 37680**
- [Officiel via moteur] La fiche France Compétences cite deux textes : l'**arrêté du 23 juin 2026** relatif au titre professionnel d'administrateur d'infrastructures sécurisées (JO du 26/06/2026, NOR **TRSD2612248A**) et un arrêté antérieur du 26 avril 2023. La **fin d'enregistrement est fixée au 28/02/2027**, alors que l'échéance était auparavant le 01/09/2026 — [France Compétences RNCP37680](https://www.francecompetences.fr/recherche/rncp/37680/) ; [Intercariforef, fiche 114912](https://www.intercariforef.org/formations/certification-114912.html)
- [Secondaire] Un centre de formation indique que l'arrêté de 2026 a **prolongé l'enregistrement de six mois** et qu'une **nouvelle version du titre est attendue au 1er mars 2027**. Il signale aussi une « correspondance totale » avec l'ancienne version RNCP 31113 — [ESIC](https://www.esic.fr/administrateur-infrastructures-securisees/)
- [Secondaire] La date de l'arrêté initial varie selon les sources : 26 avril 2023 ou 26 mars 2023. La publication au JO du 13/05/2023, elle, est concordante. Plusieurs pages affichent encore l'ancienne échéance du 01/09/2026 — [Intercariforef, Certif Info 114912](https://www.intercariforef.org/outils/recherche-certifinfo/certifications/114912)
- [Officiel] Le **REAC TP-01352, version 02, validé le 30/05/2023**, structure le titre en trois activités, qui correspondent à **trois CCP** :
  - « **Administrer et sécuriser les infrastructures** » ;
  - « **Concevoir et mettre en œuvre une solution en réponse à un besoin d'évolution** » ;
  - « **Participer à la gestion de la cybersécurité** ». Les anciennes compétences de sécurité y sont regroupées.

  — [certifpro.francecompetences.fr, référentiel d'activités](https://certifpro.francecompetences.fr/api/fiches/refActivity/24214/465506)
- [Officiel / Secondaire] La fiche officielle du CCP 3 cite explicitement « Participer à la mesure et à l'analyse du niveau de sécurité de l'infrastructure ». Un organisme de formation y ajoute la détection et le traitement des incidents, ainsi que l'élaboration de la politique de sécurité — [Studi, CCP « Participer à la gestion de la cybersécurité »](https://www.studi.com/fr/formation/infra-reseaux-cybersecurite/gestion-cybersecurite)
- [Secondaire] L'évaluation finale combine une **mise en situation professionnelle**, un **dossier professionnel** et un **entretien technique** devant jury. Aucune durée officielle n'a été trouvée — [Diplomeo, TP AIS](https://diplomeo.com/formation/tp_administrateur_d_infrastructures_securisees_25947)
- [Officiel] Le titre est accessible par la VAE (fiche France VAE) — [France VAE](https://vae.gouv.fr/certifications/d211b5c4-ed9f-4efe-b637-84505110efca/)

**TSSR (niveau 5)**
- [Secondaire] Un **arrêté du 16 juin 2026** (NOR **TRSD2612221A**) porte sur le titre TSSR. La fiche RNCP 37682 est « remplacée par **RNCP42463** » — [Intercariforef, TSSR 121360](https://www.intercariforef.org/formations/certification-121360.html) ; [France Compétences RNCP37682](https://www.francecompetences.fr/recherche/rncp/37682/) ; [Centre Inffo](https://www.centre-inffo.fr/site-droit-formation/actualites-droit/titre-professionnel-de-technicien-superieur-systemes-et-reseaux)
- [Secondaire] La nouvelle fiche compte **3 blocs**. Deux libellés sont lisibles : BC01 « Assurer le support aux utilisateurs » et BC03 « Exploiter les éléments de l'infrastructure ». Le libellé du BC02 est illisible dans le document source — [Gefor, programme TP TSSR 09/2026](https://www.gefor.com/wp-content/uploads/2026/07/Pg_-TP_TSSR_09.26.pdf)

**BTS SIO, option SISR**
- [Officiel] La session 2026 s'appuie sur le référentiel existant. Pour l'épreuve E6 SISR (coefficient 4), le dossier était à déposer avant le 9 avril 2026, et les réalisations doivent respecter l'**annexe II-E** (environnement technique) — [SIEC, guide E6 BTS SIO 2026](https://siec.education.fr/candidats/docutheque/download/bts-services-informatiques-aux-organisations-sio-session-2026/14%20-%20EPREUVE%20PRATIQUE%20E6%20-%20GUIDE%20D%27ELABORATION%20DU%20DOSSIER%20PROFESSIONNEL%20-%20BTS%20SIO%202026.pdf)
- [Officiel] La définition des épreuves figure dans un **arrêté du 8 juillet 2024** — [SIEC, circulaire nationale 2025](https://siec.education.fr/candidats/docutheque/download/bts-services-informatiques-aux-organisations-sio-session-2025-0/0%20-%20BTS%20SIO%20-%202025%20-%20Circulaire%20nationale.pdf)
- [Officiel] Structure du référentiel de 2019 :
  - le bloc 2 dépend de l'option ; en SISR, il s'intitule « **Administration des systèmes et des réseaux** » ;
  - le bloc 3, « **Cybersécurité des services informatiques** », a une unité propre à chaque option.

  — [Eduscol, présentation de l'Inspection générale, 2022](https://sti.eduscol.education.fr/sites/eduscol.education.fr.sti/files/seminaires/14891/14891-2-bts-sio-mc-sno-27092022.pdf)
- [Secondaire] Le bloc 2 SISR couvre l'installation, le test et le déploiement d'une infrastructure réseau, puis son exploitation, son dépannage et sa supervision. Le bloc 3 couvre la protection des données à caractère personnel, l'identité numérique de l'organisation et la sécurisation des équipements et des usages — [Nomad Education, bloc 3](https://www.nomadeducation.fr/revisions/bts-services-informatiques-aux-organisations-sio-lbd65373/bloc-3-cybersecurite-des-services-informatiques-cyeeb824)
- [Officiel] Les annales E6 citent la compétence « Mettre en œuvre et vérifier la conformité d'une infrastructure à un référentiel, une norme ou un standard de sécurité » — [Académie de Lille, sujet E6 SISR](https://pedagogie.ac-lille.fr/ecogestion/wp-content/uploads/sites/53/2024/04/BTS-SIO-23-E-6sisr_villeduparc_sujet_bat_2023-copie.pdf)
- [Secondaire] Un document d'établissement de 2026 emploie l'intitulé « **BTS Cybersécurité et services informatiques aux organisations (SIO)** », avec les options SISR et SLAM. Ce changement de nom n'a été confirmé par aucun texte officiel trouvé — [Lycée CCI Gard, BTS SIO 2026](https://lycee.gard.cci.fr/wp-content/uploads/2026/01/bts-sio-2026.pdf)
- [Secondaire] Autre diplôme proche pour les publics « autres diplômes français » : le **BTS CIEL** (Cybersécurité, Informatique et réseaux, Électronique) — [Diplomeo, BTS CIEL](https://diplomeo.com/diplomes/176456)

**BUT Réseaux et Télécommunications**
- [Officiel] Le programme national de 2022 (annexe 22) couvre notamment les parcours **Cybersécurité** et **Développement système et cloud**, avec un référentiel de compétences et un référentiel de formation — [MESRI, annexe 22 BUT R&T (2022)](https://cache.media.education.gouv.fr/file/SP4-MESRI-26-5-2022/16/0/spe617_annexe22_1426160.pdf)
- [Communauté] Le parcours Cybersécurité s'organise autour de cinq compétences : **Administrer, Connecter, Programmer** (tronc commun), plus **Sécuriser** et **Surveiller** — [ScoDoc, référentiel R&T parcours Cyber](https://scodoc.org/git/viennet/Referentiels/raw/branch/main/latex/img/RT_BUT_Competences_Parcours_Cybersecurite_V.pdf) ; [Université Grenoble Alpes](https://formations.univ-grenoble-alpes.fr/plugins/odf-web/odf/_content/subprogram-parcours-cybersecurite-2/Parcours%20Cybers%C3%A9curit%C3%A9.pdf)

**Certifications internationales**
- **Cisco CCNA 200-301**
  - [Officiel] Le PDF des objectifs v2.0 existe, sous copyright 2026 — [Cisco, 200-301 CCNA v2.0 Exam Topics](https://learningcontent.cisco.com/documents/marketing/exam-topics/200-301_CCNA_v2.0_Exam_Topics_PDF.pdf)
  - [Secondaire] Calendrier : publication du programme v2.0 le 20 mai 2026 ; dernier jour pour passer la v1.1 le 2 février 2027 ; v2.0 seule disponible à partir du **3 février 2027** — [CertCrush](https://www.certcrush.app/blog/ccna-v2-0-2027-changes-sit-v1-1-first) ; [Smenode](https://smenode-academy.com/blog/ccna-v2-0-what-exam-topics-changed-feb-2027-deadline/)
  - [Secondaire] Structure : on passe de six à **cinq domaines**, dont un domaine **IA d'environ 10 %**. Les domaines 1.0 et 2.0 pèsent chacun 25 %, et la commutation passe de 20 % à 25 %. Le libellé exact du domaine IA n'a pas été vu — [CBT Nuggets](https://www.cbtnuggets.com/blog/ccna-2-0-what-s-new-and-how-to-prepare) ; [FlashGenius](https://flashgenius.net/guides/ccna-v20-vs-v11-what-changes-in-the-200-301-exam-for-2027)
- **CompTIA Network+ N10-009**
  - [Secondaire] Cinq domaines : Networking Concepts 23 %, Network Implementation 20 %, Network Operations 19 %, Network Security 14 %, **Network Troubleshooting 24 %**. Jusqu'à 90 questions, dont des **PBQ** (questions pratiques) — [Infosec Institute](https://infosecinstitute.com/resources/network/network-overview-of-domains/) ; [Destcert](https://destcert.com/resources/n10-009-objectives/)
- **CompTIA Security+**
  - [Officiel] La V8 (**SY0-801**) sort le **17 novembre 2026** : 90 questions maximum, 90 minutes — [CompTIA Security+ V8](https://www.comptia.org/en-us/certifications/security/v8/)
  - [Secondaire] Le retrait de la SY0-701 en anglais est annoncé au 11 juin 2027 — [Training Camp](https://trainingcamp.com/articles/comptia-security-sy0-801-release-date-and-everything-we-know-so-far/)
  - [Secondaire / brouillon] Pondérations de la SY0-801 : General Security Concepts 16 %, Threats/Vulnerabilities/Attacks 24 % (chiffre non officiel), Security Architecture 19 %, Security Operations 27 %, Program Management 14 %. Trois objectifs IA seraient ajoutés. Pour comparaison, la SY0-701 pèse 12/22/18/28/20 — [CertEmpire](https://certempire.com/?p=95282) ; [brouillon d'objectifs CompTIA](https://lecbyo.files.cmp.optimizely.com/download/a21abd92c0c211f09e7b823169c9afdb)
- **CompTIA Linux+ XK0-006 (V8)**
  - [Secondaire] Sortie le 15 juillet 2025 : 90 questions, 90 minutes, score de réussite 720.
  - [Secondaire] Cinq domaines : System Management 23 %, Services and User Management, Security, Automation/Orchestration/Scripting 17 % (Ansible, Puppet, OpenTofu, Kubernetes, Python, Git), **Troubleshooting 22 %**.

  — [Training Camp, XK0-006](https://trainingcamp.com/articles/comptia-linux-xk0-006-exam-guide-domains-pbqs-and-a-study-approach-that-actually-works-in-2026/) ; [MeasureUp](https://www.measureup.com/xk0-006-comptia-linux-practice-test.html)
- **LPIC-1**
  - [Officiel] La **version 5.0** (101-500 et 102-500) est toujours la version en vigueur. Aucune annonce de v6 n'a été trouvée — [LPI, objectifs 101](https://www.lpi.org/our-certifications/exam-101-objectives/) ; [LPI, objectifs 102](https://www.lpi.org/our-certifications/exam-102-objectives) ; [Pearson VUE, LPI](https://www.pearsonvue.com/us/en/lpi.html)
  - [Officiel] Les **LPI Learning Materials** de la v5.0 sont **gratuits et publiés sous CC BY-NC-ND 4.0** — [LPI Learning, 101-500](https://learning.lpi.org/en/learning-materials/101-500) ; [102-500](https://learning.lpi.org/en/learning-materials/102-500)
- **Microsoft AZ-104**
  - [Officiel / Secondaire] Le « skills outline » a été mis à jour le **17 avril 2026**. Il comporte cinq domaines : identités et gouvernance, stockage, calcul, réseau virtuel, supervision et maintenance. Les pondérations diffèrent selon les sources tierces — [Microsoft Learn, guide d'étude AZ-104](https://learn.microsoft.com/certifications/resources/study-guides/az-104) ; [Readynez](https://www.readynez.com/en/blog/az-104-outlook-2026-what-changed-and-a-practical-plan-to-pass/)
- **Red Hat RHCSA (EX200)**
  - [Secondaire] L'examen porte sur **RHEL 10**. Il est entièrement pratique, en une seule partie de 3 heures.
  - [Secondaire] L'objectif « conteneurs » a disparu ; Flatpak et les profils de tuning font leur entrée. Red Hat recommande les cours RH124/RH134 ou RH199.

  — [Open Exam Prep](https://open-exam-prep.com/blog/red-hat-rhcsa-ex200-exam-guide-2026) ; [learn.redhat.com](https://learn.redhat.com/t5/General/Has-There-Been-a-Recent-Update-to-the-EX200-Exam-Objectives/m-p/53276) ; [WebAsha](https://www.webasha.com/blog/online-rhcsa-ex200-training-certification-study-material-exam-readiness-for-rhel)

**Conditions d'utilisation des référentiels**
- [Officiel] Pour CompTIA, tout le contenu d'examen est sa **propriété intellectuelle protégée par le droit d'auteur**. Les PDF d'objectifs portent « Copyright © CompTIA, Inc. All rights reserved ». Pour toute question d'autorisation, CompTIA renvoie à examsecurity@comptia.org — [CompTIA, Unauthorized Training Materials](https://www.comptia.org/en-us/resources/test-policies/unauthorized-training-materials/)
- [Officiel] Informations publiques françaises (cadre CRPA) :
  - la **Licence Ouverte 2.0** (SPDX `etalab-2.0`) vise la réutilisation libre et gratuite des informations publiques au sens de l'**article L321-1 du CRPA** ;
  - l'article D.323-2-1 retient la Licence Ouverte et l'ODbL pour la réutilisation gratuite ;
  - les droits de propriété intellectuelle de tiers sont exclus.

  — [data.gouv.fr, Licence Ouverte 2.0](https://www.data.gouv.fr/pages/legal/licences/etalab-2.0) ; [Etalab, texte LO 2.0](https://www.etalab.gouv.fr/wp-content/uploads/2017/04/ETALAB-Licence-Ouverte-v2.0.pdf) ; [guide 2026 de la réutilisation des données publiques (secondaire)](https://donneespersonnelles.fr/reutilisation-donnees-publiques)

### Inferences
- **Calendrier de l'AIS pour l'utilisateur.**
  - Avec une fin d'enregistrement au 28/02/2027 et une nouvelle version attendue au 1er mars 2027, une session d'examen en **juillet 2027** relèvera probablement de la **nouvelle version**, sauf mesures transitoires prévues par l'arrêté ou le centre (épreuves de rattrapage, sessions déjà engagées). Il faut le confirmer **par écrit** auprès du centre agréé ou de la DREETS.
  - Côté application : modéliser les référentiels **par version** (REAC TP-01352 v02 de 2023, puis REAC 2027) et prévoir une vue « écarts entre versions ». Le parcours AIS ne doit pas être figé en dur.
- **Stockage des objectifs.**
  - Pour les titres du ministère du Travail et les diplômes de l'Éducation nationale, intégrer le texte intégral des REAC/RC et des blocs : ce sont des informations publiques réutilisables sous le régime CRPA/Licence Ouverte, sauf contenu de tiers.
  - Pour Cisco, CompTIA, Red Hat et Microsoft, ne stocker que l'**identifiant de l'objectif**, une **paraphrase courte** et le **lien officiel**. Ne pas redistribuer les PDF.
  - Pour LPI, lier les Learning Materials (BY-NC-ND) sans les adapter ni les traduire.
- **Thèmes récurrents.** La matrice ci-dessous est une inférence tirée des intitulés de domaines ou blocs vérifiés plus haut. ● = domaine ou bloc explicite ; ○ = présent mais partiel ; – = absent ou hors périmètre ; ? = non vérifié.

| Thème | AIS | TSSR | BTS SISR | BUT R&T | CCNA v2 | Net+ | Sec+ | Linux+ | LPIC-1 | AZ-104 | RHCSA |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Réseau L2/L3 (VLAN, routage, adressage) | ● | ○ | ● | ● | ● | ● | ○ | ○ | ○? | ○ (VNet) | ○ |
| Services DNS/DHCP | ● | ● | ● | ● | ● | ● | ○ | ○ | ○? | ○ | ○ |
| Annuaire et identités (AD/LDAP/Entra) | ● | ● | ● | ○ | – | ○ | ● | ○ | – | ● | ○ |
| Administration Linux | ● | ● | ● | ● | – | – | ○ | ● | ● | – | ● |
| Administration Windows Server | ● | ● | ● | ○ | – | – | ○ | – | – | ○ | – |
| Virtualisation, cloud, stockage | ● | ● | ● | ● | ○ | ○ | ○ | ○ | – | ● | ● (stockage) |
| Sauvegarde et restauration | ● | ● | ● | ○ | – | ○ | ● | ○ | – | ● | – |
| Supervision et journalisation | ● | ● | ● | ● (Surveiller) | ○ | ● | ● | ○ | ○? | ● | ○ |
| Durcissement et conformité | ● | ○ | ● | ● (Sécuriser) | ● | ● | ● | ● | ○? | ○ | ● (SELinux, firewall) |
| Détection et réponse aux incidents | ● (CCP3) | – | ● | ● | ○ | ○ | ● | ○ | – | ○ | – |
| Automatisation et scripts | ○ | ○ | ○ | ● (Programmer) | ● | ○ | ○ | ● | ● | ○ | ● |
| Dépannage méthodique | ● | ● | ● | ● | ● | ● (24 %) | ○ | ● (22 %) | ○ | ○ | ● |

- **Cloud (AZ-900/AZ-104).** Aucun service Azure ne s'émule localement. Le parcours Azure doit se composer de cours, de quiz et d'**analogues locaux** : RBAC vers groupes et ACL, NSG vers règles de pare-feu, peering de VNet vers routage. Les vrais labs Azure se font dans l'abonnement de l'apprenant, en dehors de l'application.
- **Priorités pour un apprenant AIS solo.** Le CCP1 (administrer et sécuriser) et le CCP3 (cybersécurité) concentrent le plus de labs pratiques. Le CCP2 (concevoir une évolution) se travaille surtout par des **études de cas et des dossiers** : architecture cible, plan de mise en production, supervision. L'IA peut s'y entraîner comme examinateur blanc pour l'entretien technique.

### Gaps
- Le **texte intégral de l'arrêté du 23 juin 2026** et la **fiche RNCP 37680** n'ont pas pu être ouverts (Légifrance et France Compétences bloqués). Restent à confirmer :
  - le contenu exact de l'arrêté (simple prorogation, ou modification des modalités) ;
  - les mesures transitoires pour les candidats de 2027 ;
  - la date de publication du nouveau REAC.
- La **liste officielle des compétences des CCP 1 et 2 de l'AIS** n'a pas été retrouvée. Les libellés connus du REAC 2023 sont à confirmer sur la fiche RNCP et n'ont pas été vérifiés dans cette session. Ils seraient les suivants :
  - CCP1 : appliquer les bonnes pratiques d'administration ; administrer et sécuriser les réseaux, les systèmes et les infrastructures virtualisées ;
  - CCP2 : concevoir une solution technique d'évolution ; mettre en production ; mettre en œuvre et optimiser la supervision ;
  - CCP3 : mesure et analyse du niveau de sécurité ; politique de sécurité ; détection et traitement des incidents.
- Les **durées officielles des épreuves de l'AIS** n'ont pas été trouvées.
- Le **BC02 du nouveau TSSR** (RNCP 42463) reste illisible dans la seule source trouvée.
- Statut officiel du renommage « BTS Cybersécurité et services informatiques aux organisations » : rien trouvé au BO.
- Les **libellés exacts des domaines du CCNA v2.0** (dont celui du domaine IA), les **pondérations définitives de la SY0-801**, les **objectifs officiels du RHCSA sur RHEL 10** et le **contenu de l'AZ-900 en 2026** n'ont pas été vérifiés sur les pages officielles.
- Aucune politique de Cisco, Red Hat ou Microsoft sur la **réutilisation des listes d'objectifs** par des tiers n'a été trouvée.

---

## 2. Ressources pédagogiques ouvertes et réutilisables : licences, et usage par une IA (citer, adapter, ancrer, redistribuer)

### Takeaway
Un **socle réellement réutilisable** existe :
- les guides de l'**ANSSI** (Licence Ouverte) ;
- les **docs Microsoft sur GitHub** et la documentation **Kubernetes** (CC BY 4.0) ;
- la documentation **Red Hat** (CC BY-SA 3.0) ;
- le **Debian Administrator's Handbook** (CC BY-SA 3.0 et GPL-2+) ;
- **OWASP** (CC BY-SA 4.0) ;
- **CNP3** (CC BY-SA 3.0) ;
- **Linux Journey** (CC BY-SA 4.0, avec restriction de marque) ;
- la doc **OPNsense** (BSD-2) ;
- les docs **Wazuh** (GPL-2.0+) et **TrueNAS** (GPL-3.0).

Les ressources suivantes ne se prêtent qu'à la **citation courte et au lien** : LPI Learning Materials (BY-NC-ND), CIS (BY-NC-SA ou BY-NC-ND), docs Centreon (ND/NC), docs Zabbix (accord écrit requis), docs pfSense (aucune licence explicite). SecNumacadémie est en refonte et ses conditions sont inconnues.

Pour l'IA, la règle découle de ce tableau :
- **ancrage et adaptation libres** avec attribution, et partage à l'identique (SA) quand la licence l'exige ;
- pour le reste : **interrogation au moment de l'usage, citations courtes attribuées et liens** ;
- **jamais d'index pré-construit redistribué** avec l'application.

### Cited Findings

**Cadre juridique (France/UE) pour « ancrer » une IA**
- [Secondaire juridique] La **courte citation** (CPI L122-5 3° a) n'est licite qu'à plusieurs conditions :
  - elle est justifiée par le caractère critique, polémique, **pédagogique**, scientifique ou d'information de l'œuvre qui l'accueille ;
  - elle est **courte** et intégrée à des développements propres ; la reproduction intégrale n'en est pas une (Cass. Ass. plén., 5 novembre 1993) ;
  - le **nom de l'auteur et la source** sont indiqués.

  L'exception pédagogique du 3° e) est distincte. — [Le Petit Juriste](https://www.lepetitjuriste.fr/le-droit-de-citation-en-documentation-synthese-karen-azoulay/) ; [Legavox](https://www.legavox.fr/blog/murielle-cahen/courte-citation-uvre-licite-lors-34120.htm) ; [ARTCENA](https://www.artcena.fr/artcena-juridique/droits-dauteurs-et-droits-voisins/droit-dauteur/exceptions-au-droit-dauteur)
- [Officiel / Secondaire] L'article **L122-5-3 du CPI** transpose l'article 4 de la directive 2019/790. Il ouvre une **exception de fouille de textes et de données (TDM)**, définie comme une analyse automatisée destinée à « dégager des informations ». Les titulaires de droits peuvent s'y opposer (**opt-out**) par des procédés lisibles par machine. Une proposition de loi sur la présomption d'exploitation des contenus par les fournisseurs d'IA est en discussion (amendements de juin 2026) — [Question écrite AN n° 16057](https://www.assemblee-nationale.fr/dyn/17/questions/QANR5L17QE16057) ; [Kohen Avocats](https://kohenavocats.fr/?p=2062913) ; [Conseil d'État, avis](https://conseil-etat.fr/site/avis-consultatifs/derniers-avis-rendus/a-l-assemblee-nationale-et-au-senat/avis-sur-une-proposition-de-loi-relative-a-l-instauration-d-une-presomption-d-exploitation-des-contenus-culturels-par-les-fournisseurs-d-intelligen)

**ANSSI et SecNumacadémie**
- [Officiel] Les licences des publications de l'ANSSI varient selon les documents :
  - selon les mentions légales de cyber.gouv.fr, les contenus du site (guides, recommandations, notes techniques, éléments graphiques) relèvent de la **Licence Ouverte v1.0**, sauf mention contraire ; les **logos exigent une autorisation préalable** ;
  - des guides récents portent la **Licence Ouverte v2.0** : c'est le cas des « Fondamentaux de la sauvegarde », version du 18/10/2023, avec obligation de mentionner la source et la date de dernière mise à jour ;
  - un document partenaire de 2022 est sous **CC BY-NC-ND**.

  Il faut donc vérifier la licence imprimée sur chaque document. — [cyber.gouv.fr, mentions légales](https://cyber.gouv.fr/mentions-legales/) ; [ANSSI, Fondamentaux de la sauvegarde](https://messervices.cyber.gouv.fr/documents-guides/anssi-fondamentaux-sauvegarde_systemes_dinformation_v1-0.pdf) ; [guide « parcours prestataire » sous CC BY-NC-ND](https://cyber.gouv.fr/sites/default/files/document/20220613-anssi-np-parcours-guide-prestataire.pdf)
- [Officiel] L'ANSSI privilégie la **licence Apache 2.0** pour le code qu'elle publie — [ANSSI, Open source](https://cyber.gouv.fr/enjeux-technologiques/open-source/)
- [Officiel] **SecNumacadémie** est fermé pour refonte : l'ancienne version a été arrêtée en février 2026 et la nouvelle est annoncée pour fin 2026. Le nouveau format prévoit un parcours personnalisé en trois niveaux de maîtrise et des modules thématiques, par exemple NIS2 ou gestion de crise. L'ancien MOOC comptait 4 modules de 5 unités, avec une attestation à 80 % de réussite. **Aucune condition d'utilisation des contenus** n'a été trouvée — [ANSSI, le MOOC en évolution](https://cyber.gouv.fr/actualites/le-mooc-secnumacademie-en-cours-devolution) ; [ANSSI, page MOOC](https://cyber.gouv.fr/offre-de-service/formations-entrainement-et-decouverte-des-metiers/formations/formations-delivrees-par-lanssi/mooc-secnumacademie/)

**Documentation officielle des éditeurs et des projets**
- [Projet, GitHub vérifié] Les dépôts publics de documentation Microsoft sont sous **CC BY 4.0** : `MicrosoftDocs/windowsserverdocs` (1 636 ★, push le 13/11/2026) et `MicrosoftDocs/azure-docs` (11 003 ★, push le 12/11/2026) — [windowsserverdocs](https://github.com/MicrosoftDocs/windowsserverdocs) ; [azure-docs](https://github.com/MicrosoftDocs/azure-docs)
- [Officiel] Le **Microsoft Learn MCP Server** est un point d'accès hébergé, gratuit et **sans authentification**. Il permet à un agent de chercher dans la documentation officielle, de récupérer des articles en markdown et des exemples de code. Il ne renvoie que de la documentation publique et sert à l'ancrage et à la citation — [Microsoft Developer Blog, 28/05/2026](https://developer.microsoft.com/blog/improve-your-agentic-developer-tools-by-grounding-in-microsoft-learn/) ; [Engineering@Microsoft, 11/02/2026](https://devblogs.microsoft.com/engineering-at-microsoft/how-we-built-the-microsoft-learn-mcp-server/) ; [Neowin](https://www.neowin.net/news/developers-can-now-access-official-microsoft-docs-faster-through-new-mcp-server/)
- [Officiel] La documentation **Red Hat** est sous **CC BY-SA 3.0** :
  - les distributeurs doivent fournir l'URL de l'original ;
  - les versions modifiées doivent **retirer les marques Red Hat** ;
  - certaines notices renoncent à la section 4d.

  — [Red Hat, legal notice](https://docs.redhat.com/legal-notice) ; [notice RHEL 6.10](https://docs.redhat.com/en/documentation/Red_Hat_Enterprise_Linux/6/html/6.10_Release_Notes/legal-notice)
- [Projet] Le **Debian Administrator's Handbook** est sous double licence **CC BY-SA 3.0 et GPL-2+** — [debian-handbook.info, « liberation »](https://debian-handbook.info/liberation/) ; [debian.org](https://www.debian.org/doc/manuals/debian-handbook/index.hr.html)
- [Projet, GitHub vérifié] La documentation **Ubuntu Server** n'a pas de fichier LICENSE dans `canonical/ubuntu-server-documentation`, et le champ « license » de `docs/conf.py` est vide (« TODO ») — [dépôt](https://github.com/canonical/ubuntu-server-documentation) ; [conf.py](https://github.com/canonical/ubuntu-server-documentation/blob/main/docs/conf.py)
- [Projet, GitHub vérifié] Pour **FRR**, « parts with various licenses », avec un identifiant SPDX en tête de chaque fichier. Aucune licence explicite n'a été trouvée pour la documentation (`doc/user/conf.py` ne mentionne qu'un copyright) — [FRR COPYING](https://github.com/FRRouting/frr/blob/master/COPYING)
- [Projet, GitHub vérifié] La documentation **OPNsense** est sous **BSD 2-clause** (211 ★, push le 13/11/2026) — [opnsense/docs LICENSE](https://github.com/opnsense/docs/blob/master/LICENSE)
- [Officiel / Communauté] La documentation **pfSense** n'a **pas de licence explicite** depuis son passage sur docs.netgate.com. L'ancienne documentation était sous CC non commerciale. La marque « pfSense » est encadrée par une politique de marque — [Redmine pfSense #15175](https://redmine.pfsense.org/issues/15175) ; [politique de marque pfSense](https://pfsense.org/trademarks.html)
- [Projet, GitHub vérifié] **Wazuh** :
  - la documentation est sous « GNU **GPL v2 ou ultérieure** » (README de `wazuh/wazuh-documentation`) ;
  - le moteur (`src/engine/`) est sous **AGPL-3.0-or-later**, et des bibliothèques partagées sont sous GPL-2.0-only OR AGPL-3.0-or-later ;
  - **tout le reste est sous GPL v2**, ce qui inclut l'arborescence `ruleset/`.

  — [wazuh-documentation README](https://github.com/wazuh/wazuh-documentation/blob/main/README.md) ; [wazuh LICENSE](https://github.com/wazuh/wazuh/blob/main/LICENSE)
- [Officiel] La documentation **Zabbix** n'est **pas sous GPL**. La copie imprimée à usage personnel est permise. Toute autre utilisation, totale ou partielle, dans une autre publication exige un **accord écrit préalable**. Le logiciel, lui, est sous **AGPL-3.0** ([GitHub vérifié]) — [Zabbix Manual 3.4](https://www.zabbix.com/documentation/3.4/manual) ; [Zabbix Manual 7.2](https://www.zabbix.com/documentation/7.2/manual) ; [zabbix/zabbix](https://github.com/zabbix/zabbix)
- [Projet, GitHub vérifié] Le LICENSE de la documentation **Centreon** est **contradictoire** : badge **CC BY-ND 4.0**, mais texte intitulé « CC Attribution-**NonCommercial** 4.0 ». Dans les deux cas, l'adaptation ou l'usage commercial sont restreints — [centreon-documentation LICENSE](https://github.com/centreon/centreon-documentation/blob/master/LICENSE.md)
- [Projet, GitHub vérifié] Licences d'autres documentations : **TrueNAS** sous **GPL-3.0** (push le 13/11/2026), site **Kubernetes** sous **CC BY 4.0** (push le 13/11/2026) — [truenas/documentation](https://github.com/truenas/documentation) ; [kubernetes/website](https://github.com/kubernetes/website)

**Manuels et cours ouverts**
- [Projet, GitHub vérifié] **CNP3** (*Computer Networking: Principles, Protocols and Practice*, 3e édition) : selon le README, « all the files » sont sous **CC BY-SA 3.0 Unported**. Le dépôt `cnp3/ebook` compte 171 ★, push le 12/03/2026 ; l'ancien dépôt des éditions 1 et 2 n'a plus bougé depuis 2022 — [cnp3/ebook](https://github.com/cnp3/ebook) ; [obonaventure/cnp3](https://github.com/obonaventure/cnp3)
- [Projet, GitHub vérifié] **Linux Journey** : le contenu est sous **CC BY-SA 4.0**, maintenu par **LabEx**. La licence n'autorise pas à reprendre le nom, la marque, l'organisation du cours ou une « substantial content collection » pour créer un service imitant ou remplaçant Linux Journey. Le dépôt `labex-labs/linuxjourney` compte 1 544 ★, push le 13/11/2026 — [labex-labs/linuxjourney](https://github.com/labex-labs/linuxjourney)
- [Projet] **TLDP** : la licence varie selon chaque document. Le guide des auteurs recommande la **GFDL** ou l'**OPL** sans options A et B, et le manifeste se dit neutre sur le choix. Pages largement anciennes ; le dépôt `tLDP/LDP` date son dernier push du 13/08/2026 — [LDP Author Guide](https://www.linuxdoc.org/LDP/LDP-Author-Guide/makingcopyright.html) ; [manifeste LDP](https://www.iitk.ac.in/LDP/manifesto.html) ; [tLDP/LDP](https://github.com/tLDP/LDP)
- [Communauté, GitHub vérifié] **Linux Upskill Challenge** : **CC BY 4.0**, dépôt `snori74` **archivé** (dernier push en 2021) — [LICENSE](https://github.com/snori74/linuxupskillchallenge/blob/master/LICENSE)
- [Communauté, GitHub vérifié] **devops-exercises** (86 796 ★) : licence Creative Commons 3.0 avec clause **non commerciale** (GitHub indique NOASSERTION). C'est une banque de questions et réponses, pas de labs — [bregman-arie/devops-exercises](https://github.com/bregman-arie/devops-exercises/blob/master/LICENSE)

**OWASP, CIS, NIST**
- [Projet, GitHub vérifié] **OWASP Top 10, WSTG, ASVS et Cheat Sheet Series** sont sous **CC BY-SA 4.0**. Tous sont actifs, avec des pushes en septembre–novembre 2026. La Cheat Sheet Series compte 34 050 ★ — [OWASP/Top10 LICENSE](https://github.com/OWASP/Top10/blob/master/LICENSE) ; [OWASP/wstg](https://github.com/OWASP/wstg) ; [OWASP/ASVS](https://github.com/OWASP/ASVS) ; [OWASP/CheatSheetSeries](https://github.com/OWASP/CheatSheetSeries)
- [Officiel / Secondaire] Les **CIS Benchmarks** en PDF sont sous **CC BY-NC-SA 4.0** (usage non commercial). Les **CIS Controls** sont sous **CC BY-NC-ND 4.0**. CIS-CAT Lite est réservé à l'usage interne non commercial — [CIS, conditions d'utilisation (non-membres)](https://www.cisecurity.org/terms-of-use-for-non-member-cis-products) ; [MITRE cis-bench, licensing](https://mitre.github.io/cis-bench/about/licensing)
- [Officiel] **NIST SP 800-61 Rev. 3** (avril 2025) remplace la Rev. 2 de 2012. La réponse aux incidents y est intégrée à la gestion du risque, selon un **profil CSF 2.0** (Govern, Identify, Protect, Detect, Respond, Recover) — [NIST CSRC](https://csrc.nist.gov/pubs/sp/800/61/r3/final)

### Inferences
- **Grille de réutilisation proposée.** Inférence à partir des licences ci-dessus ; à faire valider par un juriste avant publication.

| Ressource | Couverture utile | Licence | Citer | Adapter, traduire | Ancrer une IA (RAG) | Redistribuer dans l'app | Maintenance |
|---|---|---|---|---|---|---|---|
| Guides ANSSI | Durcissement, AD, journalisation, sauvegarde, remédiation | LO 1.0 ou 2.0 (selon le document) | Oui, avec source et date | Oui | Oui | Oui (sans logos) | Active (2026) |
| Docs Microsoft sur GitHub | Windows Server, AD DS, DNS/DHCP, Azure | CC BY 4.0 | Oui | Oui | Oui (ou MCP Learn en ligne) | Oui, avec attribution | Très active |
| Docs Red Hat | RHEL : stockage, SELinux, firewalld, réseau | CC BY-SA 3.0 | Oui | Oui, en BY-SA, sans marques Red Hat | Oui | Oui, en BY-SA | Active |
| Debian Handbook | Administration Debian | CC BY-SA 3.0 / GPL-2+ | Oui | Oui, en SA | Oui | Oui | Active |
| Ubuntu Server docs | Ubuntu | Non déterminée | Courte citation et lien | Non (par prudence) | Interrogation à l'usage | Non | Active |
| Doc FRR | OSPF, BGP sous Linux | Non déterminée (code GPL) | Courte citation et lien | Prudence | Interrogation à l'usage | Non | Très active |
| Doc OPNsense | Pare-feu, VPN, IDS | BSD-2 | Oui | Oui | Oui | Oui | Très active |
| Doc pfSense | Pare-feu | Aucune licence explicite, marque encadrée | Courte citation et lien | Non | Interrogation à l'usage | Non | Active |
| Docs et PoC Wazuh | SIEM, FIM, détection | GPL-2.0+ | Oui | Oui, dérivé en GPL | Oui | Oui, en GPL | Très active |
| Docs Zabbix | Supervision | Propriétaire (accord écrit) | Courte citation et lien | Non | Interrogation à l'usage seulement | Non | Active |
| Docs Centreon | Supervision | BY-ND ou BY-NC (contradictoire) | Courte citation et lien | Non | Interrogation à l'usage | Non | Active |
| Docs TrueNAS | NAS, iSCSI, SMB, NFS | GPL-3.0 | Oui | Oui, en GPL | Oui | Oui, en GPL | Active |
| Docs Kubernetes | K8s | CC BY 4.0 | Oui | Oui | Oui | Oui | Très active |
| CNP3 | Fondamentaux réseau | CC BY-SA 3.0 | Oui | Oui, en SA | Oui | Oui | Moyenne |
| Linux Journey | Linux pour débutants | CC BY-SA 4.0 + restriction de marque | Oui | Oui, sans copier la structure complète | Oui | Extraits seulement | Active (LabEx) |
| TLDP | HOWTO Linux anciens | GFDL, OPL… (selon le document) | Oui | Selon le document | Selon le document | Selon le document | Faible |
| LPI Learning Materials | LPIC-1 v5 | CC BY-NC-ND 4.0 | Oui | **Non** | Interrogation à l'usage, citations courtes | Non (pas de version modifiée) | Active |
| OWASP | Sécurité web | CC BY-SA 4.0 | Oui | Oui, en SA | Oui | Oui | Très active |
| CIS Benchmarks | Durcissement | CC BY-NC-SA 4.0 | Oui | En NC-SA | En usage non commercial | Risqué (NC) | Active |
| NIST SP 800-61r3 | Réponse aux incidents | Publication fédérale américaine | Oui | Oui | Oui | Probablement oui (à vérifier) | 2025 |
| SecNumacadémie | Sensibilisation | Inconnue | Lien | Non | Non | Non | En refonte |

- **Règles d'ancrage pour l'IA de l'application.**
  1. Tenir un **registre des sources** : URL, version et date, licence, et opérations permises (citer, adapter, ancrer, redistribuer).
  2. Pour les licences **ouvertes**, l'application peut embarquer des extraits et un index, avec **attribution visible** et partage à l'identique (SA) pour les contenus dérivés. Les cours générés à partir de sources BY-SA doivent sortir sous BY-SA. Les sources GPL (Wazuh, TrueNAS) imposent la GPL au texte dérivé : séparer les fiches par source, ou publier les dérivés sous la licence la plus contraignante.
  3. Pour les sources **sans licence ouverte**, appliquer le modèle « apportez votre documentation » : l'apprenant lance l'indexation locale depuis l'URL officielle, ou l'IA interroge la source en ligne (cas du MCP Microsoft Learn). Le texte généré ne contient que des **citations courtes, attribuées et intégrées à une explication**. L'application ne livre **aucun index pré-construit**.
  4. L'exception TDM (L122-5-3) couvre l'**analyse**, pas la **reproduction de passages** dans un cours généré. Elle ne suffit donc pas à justifier de reprendre de longs extraits.
- **Publier les contenus propres de l'application sous CC BY-SA 4.0.** Cette licence est compatible avec les sources LO, CC BY et CC BY-SA 4.0, ce qui évite les conflits. À vérifier : la licence CC BY-SA 3.0 permet en principe de publier une adaptation sous une version ultérieure.

### Gaps
- Licence exacte de la documentation **Ubuntu Server** (conf.py vide) et de la **documentation FRR**.
- **Conditions d'utilisation du site Microsoft Learn** pour les modules de formation (learning paths, distincts des docs GitHub en CC BY 4.0) : non vérifiées.
- **Conditions de la nouvelle SecNumacadémie** : rien de publié trouvé.
- Licence de la **documentation Proxmox VE** et des fiches **CERT-FR** : non recherchées.
- La compatibilité CC BY-SA 3.0 → 4.0 et l'articulation des citations avec la GPL relèvent d'une analyse juridique non faite ici.
- Les documents ANSSI affichent tantôt la **LO 1.0**, tantôt la **LO 2.0** : pas de règle générale. Il faut lire chaque PDF.

---

## 3. Bibliothèques de scénarios et de pannes existantes : formats, licences, réutilisation

### Takeaway
Deux sources seulement offrent de **gros catalogues de pannes réutilisables** :
- **GNS3/gns3-skills**, côté réseau : 840 pannes décrites dans 51 fichiers YAML, sous GPL-3.0. Ce sont des métadonnées, pas des scripts d'injection et de vérification ;
- les **bancs d'essai SRE**, côté Kubernetes et microservices : AIOpsLab (MIT), SREGym (90 problèmes, MIT), ITBench (Apache-2.0).

Pour Linux et les services, **SadServers n'est pas ouvert**. **BrokenOps** (MIT) offre le **meilleur modèle de format** (`lab.yaml`, cloud-init, `verify.sh`, CI) mais compte très peu de labs. chaos_lab n'a qu'un scénario et pas de licence. Côté labs et formations, **Kathará-Labs** (GPL-3.0) et **CyberRangeCZ/KYPO** (code sous MIT, conception des scénarios sous CC BY 4.0) sont exploitables. **Aucune bibliothèque ouverte ne couvre** AD/GPO, PKI, la sauvegarde ou le dépannage de Wazuh et de la supervision : ce sera à écrire.

### Cited Findings

**Réseau : gns3-skills**
- [Projet, GitHub vérifié] GNS3/gns3-skills : GPL-3.0-or-later, créé le 25/05/2026, push le 03/11/2026, 6 ★. Le résumé du 03/11/2026 annonce **51 fichiers de compétences d'injection et 840 pannes**, sur plus de 60 protocoles. Le README, moins à jour, parle de 50 fichiers et 815 scénarios — [SKILLS_SUMMARY.md](https://github.com/GNS3/gns3-skills/blob/main/SKILLS_SUMMARY.md) ; [README](https://github.com/GNS3/gns3-skills/blob/main/README.md)
- [Projet, GitHub vérifié] Répartition des 840 pannes :
  - par **gravité** : critique 49, haute 486, moyenne 161, basse 144 ;
  - par **difficulté** : débutant 183, intermédiaire 399, avancé 258.

  Exemples de fichiers : `bgp_issues.yaml` (67 pannes), `ospf_issues.yaml` (48), `mpbgp_issues.yaml` (38), `mpls_issues.yaml` (37), `eigrp_issues.yaml` et `isis_issues.yaml` (33 chacun), `multicast_issues.yaml` (26), `packet_filter_issues.yaml` (25), `srv6_issues.yaml` (24), `ipsec_vpn_issues.yaml` (19), `rip_issues.yaml` (18), `nat_issues.yaml` (14), ainsi que des fichiers d'une douzaine de pannes : `vlan_trunk_issues.yaml`, `stp_issues.yaml`, `dhcp_issues.yaml` (11), `dns_issues.yaml` (9), `security_aaa_issues.yaml` (802.1X/AAA), `port_security_issues.yaml`, `dhcp_snooping_dai_issues.yaml`, `snmp_syslog_issues.yaml`, `fhr_issues.yaml` (VRRP/HSRP) et `infra_security_issues.yaml` — [SKILLS_SUMMARY.md](https://github.com/GNS3/gns3-skills/blob/main/SKILLS_SUMMARY.md)
- [Projet, GitHub vérifié] **Format d'une panne** : un fichier contient `name`, `description` et `protocols`, puis une table `issues`. Chaque entrée de cette table comporte :
  - `name` et `description`, obligatoires ;
  - `severity` (low, medium, high, critical) et `difficulty` (beginner, intermediate, advanced) ;
  - `protocols`, `symptoms`, `troubleshooting_hints` et `applicability`.

  Le dépôt fournit aussi des « device skills » (commandes de configuration et d'affichage, notes, alias), des règles d'analyse de paquets tshark, des invites système pour les modes « troubleshooting_injection » et « teaching_assistant », une liste de commandes interdites et des **scripts de validation CI** (`validate_yaml.py`, `validate_skills.py`) — [README, section « Skill Format »](https://github.com/GNS3/gns3-skills/blob/main/README.md)

**Linux, services et DevOps**
- [Projet, GitHub vérifié] **SadServers** :
  - le dépôt public compte 3 024 ★ (push le 03/11/2026) mais n'a **aucune licence**. Le README précise que le **code n'est pas public**, pour ne pas révéler les solutions et pour des raisons de sécurité ;
  - chaque scénario associe une description de la panne et un **test vérifiant la résolution**, sur une VM éphémère ;
  - les mêmes auteurs mènent les projets SREBattle (benchmark d'IA) et SadPager (simulateur d'astreinte).

  — [README SadServers](https://github.com/SadServers/sadservers/blob/main/README.md)
- [Projet, GitHub vérifié] **BrokenOps** :
  - plateforme de dépannage Linux sur **KVM/libvirt natif** (ni WSL2 ni Docker Desktop), sous MIT, 2 ★, push le 04/08/2026 ;
  - chaque lab est un dossier `labs/<id>/` qui contient un `lab.yaml` (id, name, category, difficulty, summary, ressources de la VM, `cloud_init`, `verify_script`, `exposed_ports`, `port_works_initially`, `initial_access`), un état cassé créé par cloud-init, un script de vérification et une solution ;
  - le script `scripts/test_labs.py` exécute les vérifications en CI. Exemple de lab : « Nginx Service Down ».

  — [README](https://github.com/HimanM/BrokenOps) ; [LAB_FORMAT.md](https://github.com/HimanM/BrokenOps/blob/main/LAB_FORMAT.md)
- [Projet, GitHub vérifié] **chaos_lab** :
  - TUI en Go, créé le 05/11/2026, 0 ★, **aucune licence** ;
  - un seul scénario, « wrong-http-root » (mauvaise racine de documents HTTP), exécuté dans un « Docker Sandbox » (`sbx`) ;
  - commandes `hint`, `verify` et `variant`, notation depuis l'hôte, tuteur IA optionnel via OpenCode.

  — [rishavnandi/chaos_lab](https://github.com/rishavnandi/chaos_lab)
- [Communauté, GitHub vérifié] Petites collections récentes de break/fix, trouvées par recherche GitHub le 13/11/2026 :

  | Dépôt | Licence | ★ | Contenu |
  |---|---|---|---|
  | [Linux-Troubleshooting-Scenarios-with-solutions](https://github.com/mismailzz/Linux-Troubleshooting-Scenarios-with-solutions) | MIT | 58 | Scénarios Linux avec solutions (dernier push 2022) |
  | [under-the-hood-labs](https://github.com/monegim/under-the-hood-labs) | MIT | 4 | Linux, réseau, stockage |
  | [devops-troubleshooting-labs](https://github.com/RomanVihovsky/devops-troubleshooting-labs) | MIT | 4 | Labs hors ligne : Linux, Swarm, Kubernetes, Terraform |
  | [prove-it-labs](https://github.com/h-vance/prove-it-labs) | MIT | 3 | 26 exercices orientés symptômes |
  | [infra-sparring](https://github.com/festradax07/infra-sparring) | Aucune | 1 | Agent IA qui casse le lab sur demande pour réviser les certifications Linux |
- [Communauté, GitHub vérifié] **Kubernetes** : exercices récents de dépannage.

  | Dépôt | Licence | ★ | Contenu |
  |---|---|---|---|
  | [K8sMissions](https://github.com/jalilabdollahi/k8smissions) | MIT | 3 | 200 défis progressifs, push le 11/11/2026 |
  | [cka-lab-runner](https://github.com/CuriousLearner/cka-lab-runner) | MIT | 11 | Préparation au CKA |
  | [kubelings](https://github.com/madhank93/kubelings) | Aucune | 0 | Exercices à la manière de rustlings |
  | [infra-bench](https://github.com/midat-fx/infra-bench) | Aucune | 0 | Scénarios Kubernetes et Terraform avec « verifiers proven against wrong fixes » (vérificateurs éprouvés contre de mauvaises corrections) |

  Il existe aussi [kubernetes-the-hard-way](https://github.com/kelseyhightower/kubernetes-the-hard-way) (Apache-2.0, 50 685 ★, dernier push en 2025).

**Bancs d'essai SRE et chaos engineering**
- [Projet, GitHub vérifié] **AIOpsLab** :
  - MIT, 1 033 ★, push le 07/11/2026 ;
  - suite de problèmes extensible, avec des identifiants du type `misconfig_app_hotel_res-detection-1` ou `-mitigation-1` ;
  - injecteurs de pannes, dont `VirtualizationFaultInjector`, qui exige Docker en local ;
  - API REST qui liste les problèmes et évalue un agent.

  — [microsoft/AIOpsLab](https://github.com/microsoft/AIOpsLab). Selon les notes de recherche voisines (non revérifié ici) : 48 problèmes et des tâches de détection, localisation, analyse de cause et atténuation — [arXiv 2501.06706](https://arxiv.org/abs/2501.06706)
- [Projet, GitHub vérifié] **SREGym** :
  - MIT, 414 ★, push le 13/11/2026 ;
  - **90 problèmes**, dont un sous-ensemble **SREGym-Lite de 17 problèmes** exécutable sur Kind ;
  - prérequis : Python ≥ 3.12, Docker, Helm ≥ 4.0, kubectl ;
  - des pannes **rejouent des post-mortems réels** : regex WAF de Cloudflare saturant le CPU, incompatibilité TLS d'un webhook d'admission, table conntrack saturée, épuisement d'adresses IP sur GKE, « poison pill » Kafka, panne du Pi-Day de Reddit.

  — [SREGym README](https://github.com/SREGym/SREGym) ; [arXiv 2605.07161](https://arxiv.org/abs/2605.07161)
- [Projet, GitHub vérifié] **ITBench** : Apache-2.0, 520 ★, push le 13/11/2026. Les dépôts satellites, comme ITBench-Scenarios, sont archivés et fusionnés dans le dépôt principal — [itbench-hub/ITBench](https://github.com/itbench-hub/ITBench) ; [ITBench-Scenarios](https://github.com/itbench-hub/ITBench-Scenarios)
- [Projet, GitHub vérifié] Moteurs d'injection Kubernetes : **Chaos Mesh** (Apache-2.0, 7 985 ★) et **LitmusChaos** (Apache-2.0, 5 747 ★), tous deux actifs en novembre 2026 — [chaos-mesh](https://github.com/chaos-mesh/chaos-mesh) ; [litmus](https://github.com/litmuschaos/litmus)

**Labs réseau et cyber ranges ouverts**
- [Projet, GitHub vérifié] **Kathará-Labs** : GPL-3.0, 167 ★, push le 27/10/2026. Ce sont les scénarios officiels de Kathará : tutoriels (capture de paquets, `tc`, API Python) et « main labs » du cours « Internet and Data Centers » de Roma Tre — [KatharaFramework/Kathara-Labs](https://github.com/KatharaFramework/Kathara-Labs)
- [Projet, GitHub vérifié] **CyberRangeCZ** (ex-plateforme KYPO, Masaryk University) : 117 dépôts sous MIT, dont des bibliothèques de formations : `library-junior-hacker`, `-adaptive`, `library-secret-laboratory`, `library-locust-3302`, `library-demo-training(-adaptive)`.
  - **Junior hacker** suit cette progression : se connecter au bac à sable, scanner avec nmap, deviner un mot de passe SSH, transférer des fichiers avec scp, casser un zip avec fcrackzip, changer un mot de passe.
  - Topologie : un attaquant Kali, puis un serveur, un client et un routeur sous Debian 12.
  - Double licence : **code (Vagrant, Ansible) sous MIT**, **conception du jeu sous CC BY 4.0**.

  — [library-junior-hacker](https://github.com/cyberrangecz/library-junior-hacker) ; [organisation cyberrangecz](https://github.com/cyberrangecz)
- [Projet, GitHub vérifié] Outils de **validation réseau** réutilisables : **Batfish** (Apache-2.0, 1 533 ★), qui analyse les configurations et peut « garantir la correction » ; **Containerlab** (BSD-3-Clause, 2 955 ★) — [batfish](https://github.com/batfish/batfish) ; [containerlab](https://github.com/srl-labs/containerlab)

### Inferences
- **Format unifié proposé**, en reprenant le meilleur de chaque modèle :
  - des **métadonnées pédagogiques** dans le style de gns3-skills : gravité, difficulté, symptômes, indices, applicabilité ;
  - un **cycle de vie exécutable** dans le style de BrokenOps : `setup` (état sain), `inject`, `verify`, `solution`, `reset` ;
  - un **contrôle anti-fausse correction** dans le style d'infra-bench : chaque panne déclare des **invariants** à préserver, par exemple « le pare-feu reste actif », « SELinux reste en mode enforcing », « l'isolement entre VLAN est conservé ». Une « correction » qui casse la sécurité échoue.
- **Licences et réutilisation.**
  - Les YAML de gns3-skills sont sous **GPL-3.0**. Une application elle-même sous GPL-3.0 peut les reprendre et les adapter. Sous MIT ou Apache, il vaut mieux s'en servir comme **référence** et réécrire les pannes, en citant la source.
  - AIOpsLab et SREGym (MIT) et ITBench (Apache-2.0) se réutilisent librement, avec la notice de licence.
  - SadServers et les dépôts sans licence ne servent que d'**inspiration** : pas de copie, tous droits réservés par défaut.
- **Qualité.** La plupart des collections Linux et Kubernetes sont **très jeunes ou confidentielles** (0 à 60 ★, sauf SadServers). Leur valeur tient au format et aux idées, pas au volume. La seule bibliothèque large et maintenue, gns3-skills, n'existe que depuis mai 2026 et ne compte que 6 ★.
- **Lacunes à combler soi-même** : Windows Server et AD (jonction, Kerberos, GPO, réplication), PKI, sauvegarde et restauration, stockage iSCSI, NFS et SMB, supervision (Zabbix, Centreon), SIEM Wazuh, Wi-Fi d'entreprise, pare-feux OPNsense et VPN. Ce sont précisément les sujets de l'AIS (section 6).

### Gaps
- Le **format exact des problèmes d'AIOpsLab et de SREGym** (classes Python, oracles de notation) et le nombre de problèmes d'AIOpsLab en novembre 2026 n'ont pas été vérifiés dans le code.
- **Pourquoi le code de SadServers n'est pas ouvert** est connu ; le contenu du dossier `scenarios/` de son dépôt public, en revanche, n'a pas été inspecté.
- Les **scénarios Killercoda** et les labs iximiuz n'ont pas été examinés (licences non vérifiées).
- Le **dépôt GitLab KYPO d'origine** (muni-kypo-trainings) n'est pas accessible depuis l'environnement. Seuls les miroirs CyberRangeCZ ont été lus.

---

## 4. Contenus sécurité pour le mode attaque/défense : licences et usage sûr dans un lab isolé

### Takeaway
Le corpus offensif et défensif ouvert est **riche et presque entièrement réutilisable** :
- **ATT&CK v20.1** (licence MITRE gratuite, avec notice) ;
- **Atomic Red Team** (MIT ; 1 950 tests, 353 techniques) ;
- **Caldera** (Apache-2.0) ;
- **Sigma** (plus de 3 000 règles sous DRL 1.1, qui exige de citer l'auteur jusque dans l'affichage des alertes) ;
- **Wazuh** (règles sous GPL-2.0) ;
- **Suricata** (GPL-2.0) et **ET Open** (MIT selon l'index de suricata-update, mais signalements contradictoires) ;
- des cibles vulnérables sous licence libre : DVWA, Juice Shop, WebGoat, Metasploitable3, vulhub, **GOAD** pour l'AD ;
- des référentiels de réponse aux incidents : NIST 800-61r3, corpus de remédiation de l'ANSSI, IRM du CERT-SG en CC BY 3.0.

Deux points d'attention : les règles d'**Elastic** sont sous **Elastic License 2.0** (ne pas les redistribuer), et VulnHub n'est plus alimenté. Pour la sécurité : réseau **host-only sans sortie Internet**, consentement explicite, et prudence juridique au regard de l'article **323-3-1 du Code pénal**, dont l'exception de « motif légitime » est lue strictement.

### Cited Findings

**Référentiel d'attaques et émulation d'adversaire**
- [Officiel, GitHub vérifié] **MITRE ATT&CK** : la dernière version publiée est la **v20.1** pour les matrices Enterprise, ICS et Mobile, modifiée le 05/11/2026 selon `index.json` d'attack-stix-data.
  - La licence est **non exclusive et gratuite**, y compris pour un usage commercial. Toute copie doit reproduire le copyright de MITRE et la licence.
  - MITRE avertit que couvrir des techniques ATT&CK ne garantit pas une défense complète.

  — [attack-stix-data (index.json, LICENSE.txt)](https://github.com/mitre-attack/attack-stix-data) ; ATT&CK Navigator sous Apache-2.0 — [attack-navigator](https://github.com/mitre-attack/attack-navigator)
- [Projet, GitHub vérifié] **Atomic Red Team** : MIT, 12 853 ★, push le 09/11/2026.
  - L'index CSV compte **2 468 lignes**, soit **1 950 tests uniques** (par GUID) répartis sur **353 techniques** : Windows 1 324 tests uniques, Linux 424, macOS 262.
  - **Format YAML** : `attack_technique`, `display_name`, puis une liste `atomic_tests`. Chaque test comporte `name`, `auto_generated_guid`, `description`, `supported_platforms`, `input_arguments` (avec valeurs par défaut), et un `executor` qui contient `command`, `cleanup_command`, `name` (bash, powershell…) et `elevation_required`.
  - Exemple : T1136.001, création d'un compte local `useradd`, avec nettoyage par `userdel`.

  — [index CSV](https://github.com/redcanaryco/atomic-red-team/blob/master/atomics/Indexes/Indexes-CSV/index.csv) ; [T1136.001.yaml](https://github.com/redcanaryco/atomic-red-team/blob/master/atomics/T1136.001/T1136.001.yaml)
- [Projet, GitHub vérifié] **MITRE Caldera** : sous **Apache-2.0**, comme son plugin **stockpile**.
  - Une **ability** est décrite en YAML : `id`, `name`, `description`, `tactic`, `technique` (avec `attack_id` et `name`), puis `platforms`. Chaque plateforme (darwin, linux, windows) donne pour chaque exécuteur (sh, psh…) une `command` et des `parsers` qui alimentent les « facts ».
  - Il existe aussi **caldera-ot** (Apache-2.0, push le 11/11/2026).

  — [mitre/caldera](https://github.com/mitre/caldera) ; [exemple d'ability stockpile](https://github.com/mitre/stockpile/blob/master/data/abilities/discovery/c0da588f-79f0-4263-8998-7496b1a40596.yml) ; [caldera-ot](https://github.com/mitre/caldera-ot)
- [Projet, GitHub vérifié] **Adversary Emulation Library** du CTID : Apache-2.0, 2 183 ★, dernier push le 28/05/2025 (maintenance faible) — [adversary_emulation_library](https://github.com/center-for-threat-informed-defense/adversary_emulation_library)

**Cibles vulnérables par conception**
- [Projet, GitHub vérifié] **DVWA** : GPL-3.0, 14 019 ★, push le 18/10/2026. Le README avertit : « **Do not upload it to your hosting provider's public html folder or any Internet facing servers** ». Il recommande une VM — [DVWA](https://github.com/digininja/DVWA)
- [Projet, GitHub vérifié] **OWASP Juice Shop** : MIT, 14 438 ★, push le 11/11/2026. **WebGoat** : GPL-2.0-or-later. **vulhub** : environnements docker-compose vulnérables par CVE, MIT, 21 490 ★, push le 17/10/2026 — [juice-shop](https://github.com/juice-shop/juice-shop) ; [WebGoat LICENSE](https://github.com/WebGoat/WebGoat) ; [vulhub](https://github.com/vulhub/vulhub)
- [Projet, GitHub vérifié] **Metasploitable3** : BSD-3-Clause, dernier push le 13/02/2025 (peu actif) — [rapid7/metasploitable3](https://github.com/rapid7/metasploitable3)
- [Secondaire] **VulnHub**, racheté par OffSec en 2020 :
  - selon un blog, aucune nouvelle machine depuis juillet 2022, mais le catalogue, les miroirs et les sommes de contrôle restaient en ligne en octobre 2026 ;
  - OffSec avait promis en 2020 de garder le contenu gratuit ;
  - la licence dépend de chaque VM.

  — [HackerDNA](https://hackerdna.com/blog/vulnhub) ; [OffSec, acquisition](https://www.offsec.com/offsec/offsec-vulnhub) ; [SecurityWeek](https://www.securityweek.com/offensive-security-acquires-cybersecurity-training-project-vulnhub/amp/)
- [Projet, GitHub vérifié / Secondaire] **GOAD (Game of Active Directory)** d'Orange Cyberdefense : GPL-3.0, 8 619 ★, push le 23/10/2026. Trois variantes :
  - **MINILAB** : 2 VM, 1 forêt, 1 domaine ;
  - **GOAD-Light** : 3 VM, 1 forêt, 2 domaines ;
  - **GOAD complet** : 5 VM, 2 forêts, 3 domaines.

  Un guide tiers estime les besoins à environ 20 Go de RAM et 4 vCPU pour GOAD-Light, et 24 Go de RAM, 8 vCPU et environ 115 Go de disque pour GOAD complet — [Orange-Cyberdefense/GOAD](https://github.com/Orange-Cyberdefense/GOAD) ; [Ludus, guide GOAD](https://docs.ludus.cloud/docs/environment-guides/goad) ; [Help Net Security](https://www.helpnetsecurity.com/2023/10/26/goad-game-of-active-directory/)

**Détection**
- [Projet, GitHub vérifié] **Sigma** : plus de **3 000 règles** (catégories générique, threat hunting et menaces émergentes), 11 498 ★, push le 13/11/2026.
  - La spécification et le logo sont dans le domaine public ; les **règles sont sous Detection Rule License (DRL) 1.1**.
  - La DRL 1.1, dérivée de la licence MIT, autorise l'usage commercial et la modification. En cas de partage, elle impose de conserver l'auteur, un lien vers la règle et la mention de la licence.
  - Surtout, **les messages issus de correspondances avec les règles doivent conserver l'identification de l'auteur**, par exemple dans une colonne de la vue des alertes.

  — [SigmaHQ/sigma LICENSE et README](https://github.com/SigmaHQ/sigma) ; [Detection-Rule-License](https://github.com/SigmaHQ/Detection-Rule-License)
- [Projet, GitHub vérifié] **Wazuh** : règles sous GPL v2 (section 2) ; les fichiers de règles portent « Copyright (C) 2015, Wazuh Inc. ». Le **guide de preuve de concept** liste les cas d'usage suivants :
  - FIM, détection de vulnérabilités, SCA (évaluation de configuration), surveillance Docker ;
  - injection SQL, XSS, intégration d'un IDS réseau, processus cachés, blocage d'IP malveillantes par réputation, supervision AWS ;
  - pages retirées du build en attente de mise à jour : netcat non autorisé, trojan, **brute force**, malware avec VirusTotal, YARA, audit des commandes, Shellshock, enrichissement des alertes par LLM.

  Lab recommandé : une VM Ubuntu 24.04 (1 vCPU, 2 Go), une RHEL 9 (1 vCPU, 2 Go), un Windows 11 (2 vCPU, 4 Go) et un nœud central unique. Le guide conseille de **prendre un instantané** de l'environnement avant chaque cas d'usage — [Wazuh PoC guide (source)](https://github.com/wazuh/wazuh-documentation/blob/main/source/proof-of-concept-guide/index.rst)
- [Projet, GitHub vérifié / Communauté] **Suricata** est sous **GPL-2.0** (6 883 ★). L'index officiel de **suricata-update** déclare **`license: MIT`** pour **ET Open**. Un utilisateur du forum ET évoque pourtant une répartition **BSD/GPL selon les plages de SID**, et un document tiers parle de fichiers sous licence ETPRO : la question n'est pas tranchée. ET Pro est commercial et exige une licence OEM pour être redistribué dans un produit — [OISF/suricata](https://github.com/OISF/suricata) ; [suricata-intel-index, index.yaml](https://github.com/OISF/suricata-intel-index/blob/master/index.yaml) ; [forum ET, licences](https://community.emergingthreats.net/t/licensing-of-third-party-rules/2396) ; [ET FAQ](https://community.emergingthreats.net/t/frequently-asked-questions/56)
- [Projet, GitHub vérifié] Autres contenus de détection :

  | Dépôt | Licence | Activité / remarque |
  |---|---|---|
  | [Elastic detection-rules](https://github.com/elastic/detection-rules) | **Elastic License 2.0** (non OSI) | — |
  | [Splunk security_content](https://github.com/splunk/security_content) | Apache-2.0 | Actif |
  | [Splunk attack_data](https://github.com/splunk/attack_data) | Apache-2.0 | Jeux de données d'attaques, actif |
  | [Falco rules](https://github.com/falcosecurity/rules) | Apache-2.0 | — |
  | [YARA-Rules/rules](https://github.com/Yara-Rules/rules) | GPL-2.0 | Dernier push en 2024 |
  | [Neo23x0/signature-base](https://github.com/Neo23x0/signature-base) | DRL 1.1 | — |
  | [OTRF Security-Datasets](https://github.com/OTRF/Security-Datasets) | MIT | Dernier push en 2024 |
  | [ThreatHunter-Playbook](https://github.com/OTRF/ThreatHunter-Playbook) | MIT | — |

**Durcissement et audit**
- [Projet, GitHub vérifié] **ComplianceAsCode/content** (BSD-3-Clause, push le 13/11/2026) contient `controls/anssi.yml` : politique **ANSSI-BP-028** « Configuration Recommendations of a GNU/Linux System », **version 2.0**, avec les niveaux **minimal, intermediary, enhanced et high**, chacun héritant du précédent. Les contrôles R1… sont reliés à la source ANSSI — [controls/anssi.yml](https://github.com/ComplianceAsCode/content/blob/master/controls/anssi.yml)
- [Officiel, GitHub vérifié] **ORADAD**, l'outil de collecte de l'AD publié par l'ANSSI, est sous GPL-3.0 (294 ★, push le 04/11/2026). L'ANSSI a publié un recueil de **points de contrôle AD**, réalisables avec ORADAD, PingCastle ou BloodHound. Le guide « Recommandations relatives à l'administration sécurisée des SI reposant sur AD » est daté du 02/10/2023 — [ANSSI-FR/ORADAD](https://github.com/ANSSI-FR/ORADAD) ; [Next, recueil de points de contrôle](https://next.ink/brief-article/active-directory-face-a-un-risque-croissant-lanssi-publie-ses-recommandations/) ; [Le Monde Informatique](https://www.lemondeinformatique.fr/actualites/lireamp-l-anssi-publie-un-guide-sur-la-securisation-des-si-reposant-sur-active-directory-91922.html)
- [Officiel] L'ANSSI a aussi publié un guide de **journalisation des systèmes Microsoft Windows en environnement AD** — [ANSSI, journalisation Windows/AD](https://cyber.gouv.fr/sites/default/files/2022/01/anssi-guide-recommandations_securite_journalisation_systemes_microsoft_windows_environnement_active_directory.pdf)
- [Projet, GitHub vérifié] **Lynis** (GPL-3.0, 16 686 ★) et **dev-sec/ansible-collection-hardening** (Apache-2.0, 5 538 ★) sont tous deux actifs — [Lynis](https://github.com/CISOfy/lynis) ; [dev-sec](https://github.com/dev-sec/ansible-collection-hardening)

**Réponse aux incidents**
- [Officiel] **Corpus de remédiation de l'ANSSI**, organisé en trois volets :
  - **stratégique** : « Les clés de décision » ;
  - **opérationnel** : « Piloter la remédiation » et « Préparer la remédiation », plus un outil de suivi ;
  - **technique** : « **La remédiation du Tier 0 Active Directory** ».

  Le volet opérationnel a été enrichi le **13 janvier 2026**, et les trois guides initiaux sont traduits en anglais — [ANSSI, corpus remédiation](https://cyber.gouv.fr/actualites/lanssi-publie-un-corpus-de-guides-dedies-la-remediation-dincidents-cyber) ; [ANSSI, volet opérationnel 2026](https://cyber.gouv.fr/actualites/lanssi-etoffe-le-volet-operationnel-de-son-corpus-sur-la-remediation/) ; [Piloter la remédiation](https://cyber.gouv.fr/securisation/gestion-de-crise/piloter-la-remediation-dun-incident-cyber/)
- [Officiel] **NIST SP 800-61r3** (avril 2025), alignée sur CSF 2.0 (voir section 2) — [NIST](https://csrc.nist.gov/pubs/sp/800/61/r3/final)
- [Communauté, GitHub vérifié] **IRM (Incident Response Methodologies 2022)** du CERT Société Générale : **CC BY 3.0 Unported**, 1 153 ★, dernier push le 11/04/2025 — [certsocietegenerale/IRM](https://github.com/certsocietegenerale/IRM)

**Cadre légal français**
- [Secondaire juridique] L'**article 323-3-1 du Code pénal** réprime le fait, « sans motif légitime, **notamment de recherche ou de sécurité informatique** », d'importer, détenir, offrir, céder ou mettre à disposition des outils conçus ou adaptés pour commettre les infractions des articles 323-1 à 323-3. Cette précision a été ajoutée par la LPM de 2013.
- [Secondaire juridique] Dans une affaire de keylogger, la Cour de cassation a validé une lecture **restrictive** : l'exemption viserait les personnes autorisées à maintenir et sécuriser un SI. La jurisprudence sur le « motif légitime » reste mince.

  — [donneespersonnelles.fr, LPM](https://www.donneespersonnelles.fr/les-3-merveilles-de-la-lpm) ; [Next, Cour de cassation et keylogger](https://next.ink/8318/106061-la-cour-cassation-precise-infractions-entourant-lusage-et-detention-dun-keylogger/) ; [CMS Francis Lefebvre](https://cms.law/en/fra/legal-updates/L-usage-d-un-keylogger-constitue-t-il-une-intrusion-dans-un-systeme-automatise-de-traitement-de-donnees)

### Inferences
- **Boucle « purple team » standardisée pour le mode attaque/défense.** Chaque scénario enchaîne :
  1. une **technique ATT&CK** ;
  2. une **émulation** : un test Atomic, ou une ability Caldera pour une chaîne d'actions ;
  3. une **détection attendue** : un identifiant de règle Wazuh, une règle Sigma (avec son auteur, comme l'exige la DRL) ou une signature Suricata ;
  4. une **réponse** issue d'un playbook : IRM du CERT-SG, NIST 800-61r3 ou remédiation ANSSI ;
  5. une **vérification** : l'alerte est apparue, l'artefact a été retiré grâce au `cleanup_command`, et la configuration durcie bloque la rejoue.

  Le format Atomic (`cleanup_command`, `input_arguments`) facilite les variantes paramétrées et la remise à zéro.
- **Règles de sécurité de l'application.**
  - Cibles vulnérables uniquement sur des **réseaux internes ou host-only, sans route vers Internet** ; c'est l'avertissement même de DVWA.
  - Les outils offensifs vivent **dans les VM du lab**, jamais sur l'hôte.
  - Le mode attaque est activé explicitement, avec une charte d'usage et une **journalisation**.
  - Pas de mode « cible externe ». Cela renforce le « motif légitime » (formation et sécurité informatique) au sens de l'article 323-3-1, sans le garantir. Distribuer des outils offensifs dans une application publique mérite un avis juridique.
- **Choix des licences pour un dépôt open source.**
  - À privilégier : Atomic (MIT), Caldera et stockpile (Apache), Sigma (DRL : prévoir le **champ auteur** dans l'interface des alertes), Wazuh (GPL), Juice Shop et vulhub (MIT), GOAD (GPL : le récupérer à l'exécution plutôt que l'embarquer), IRM (CC BY).
  - À **ne pas embarquer** : les règles Elastic (ELv2), ET Pro et les VM VulnHub sans licence claire.
  - Pour ET Open, **le récupérer à l'exécution avec suricata-update** plutôt que de le redistribuer, tant que la licence reste ambiguë.
- **Ressources matérielles.** GOAD-Light (environ 20 Go de RAM selon un guide tiers) dépasse la plupart des portables à 16 Go. Pour Kerberoasting et consorts, prévoir un **« mini-domaine »** maison : 1 DC et 1 client, avec des faiblesses injectées par script. GOAD reste une option pour les machines de 32 Go.

### Gaps
- Le **texte de licence officiel d'ET Open**, dans l'archive de rules.emergingthreats.net, n'a pas pu être lu.
- La licence de **Metasploitable 2** (image Rapid7 sur SourceForge) n'a pas été trouvée.
- Le **nombre d'abilities de Caldera/stockpile** et le **nombre exact de règles Wazuh** n'ont pas été comptés.
- **Licences Windows des images GOAD** (versions d'évaluation de 180 jours ?) : non confirmées.
- La licence des publications du **CISA** (playbooks fédéraux) n'a pas été vérifiée.
- Aucune analyse juridique spécifique n'a été trouvée sur la **distribution d'outils offensifs dans une application de formation open source** en droit français.

---

## 5. Conception fondée sur les preuves : dépannage, exemples résolus et résolution de problèmes, échec productif, indices, récupération espacée, gamification, évaluation des labs

### Takeaway
Les preuves convergent vers un schéma clair :
- **enseigner explicitement une méthode de dépannage et le modèle du système** (Jonassen & Hung ; dépannage structuré) ;
- commencer par des **exemples résolus avec sous-objectifs étiquetés**, puis **les estomper** quand l'expertise grandit (effet d'inversion d'expertise) ;
- demander des **auto-explications** ;
- réserver l'**échec productif** aux objectifs conceptuels ;
- donner des **indices gradués** (pointer, enseigner, réponse finale) qui freinent l'**abus d'indices** ;
- s'appuyer sur la **récupération espacée**, l'un des deux leviers jugés « haute utilité » ;
- **éviter les classements publics**, car les effets de la gamification sont modestes et parfois négatifs ;
- **évaluer sur des preuves de performance** (traces, état final), selon l'*evidence-centered design*.

Côté IA, un tuteur **sans garde-fous** nuit à l'apprentissage, alors qu'un tuteur **guidant**, sans donner les réponses, le préserve, voire l'accélère.

### Cited Findings

**Pédagogie du dépannage**
- [Recherche] **Jonassen & Hung (2006)**, *Educational Psychology Review* 18(1) :
  - les méthodes antérieures ne construisent pas de compétences transférables ;
  - les auteurs proposent une architecture qui combine un **modèle conceptuel multicouche du système**, un **simulateur** et une **bibliothèque de cas** (récits de dépannage vécus servant de conseils) ;
  - le dépannage se situe entre les problèmes bien et mal structurés.

  — [DOI 10.1007/s10648-006-9001-8](https://dx.doi.org/10.1007/s10648-006-9001-8) ; [PDF](https://nicole-martin-7l52.squarespace.com/s/JonassenHung_LearningToTroubleshootDesignArchitecture.pdf)
- [Secondaire / Recherche] Schaafstal et al. ont conçu une formation au **« Structured Troubleshooting »** à partir des différences entre novices et experts. Des sources secondaires la disent indépendante du domaine : elle a réussi en électricité, en informatique et en mécanique. Les résultats chiffrés de l'étude de 2000 n'ont pas été lus — [actes ICCE (APSCE)](https://library.apsce.net/index.php/ICCE/article/download/3553/3429/4517) ; [ASEE](https://peer.asee.org/47617.pdf)
- [Recherche] Une étude de 2026 a mesuré le dépannage réseau avec **Packet Tracer**. La plupart des étudiants finissent par rétablir le service, mais beaucoup procèdent **par essais et erreurs**. Ceux qui suivent une **méthode diagnostique systématique** réussissent mieux, et les auteurs recommandent de l'enseigner — [UiTM, International Journal on e-Learning and Higher Education](https://ir.uitm.edu.my/id/eprint/131055/1/131055.pdf)

**Exemples résolus, sous-objectifs et auto-explication**
- [Recherche] **Barbieri et al. (2023)**, méta-analyse publiée dans *Educational Psychology Review*, portant sur les mathématiques :
  - l'effet des **exemples résolus** est moyen : **g = 0,48** ;
  - les exemples **uniquement corrects** font mieux que les exemples erronés ou mixtes ;
  - ajouter des consignes d'auto-explication a réduit l'effet ;
  - un poster antérieur de la même équipe donnait g = 0,43, sans modérateur significatif.

  — [Springer PDF](https://link.springer.com/content/pdf/10.1007/s10648-023-09745-1.pdf) ; [poster](https://www.cehd.udel.edu/wp-content/uploads/2022/02/Worked-Examples-Meta-Poster_022722_SC.pdf)
- [Recherche] **Effet d'inversion d'expertise** : les exemples résolus perdent leur efficacité quand l'expertise augmente. L'**estompage** (*fading*) fait passer progressivement de l'exemple à la résolution autonome — [Educational Psychology Review, 2010](https://link.springer.com/doi/10.1007/s10648-010-9136-5)
- [Recherche] Les **sous-objectifs étiquetés** (Margulieux, Morrison et al.) donnent de meilleurs gains et une meilleure résolution de problèmes que les exemples non étiquetés. Ils réduisent aussi les abandons et les échecs en cours d'introduction à la programmation. Un rapport ITiCSE de 2019 ne montre en revanche qu'un petit effet sur les examens. Les études viennent surtout du même groupe — [Never Work in Theory](https://neverworkintheory.org/2023/03/10/reducing-withdrawal-and-failure-rates-with-labeled-subgoals.html) ; [NSF PAR](https://par.nsf.gov/servlets/purl/10099373) ; [Raspberry Pi Foundation](https://www.raspberrypi.org/app/uploads/2020/07/Using-subgoal-labels-to-reduce-cognitive-load-in-introductory-programming.pdf)
- [Recherche] **Bisra et al. (2018)**, méta-analyse sur l'auto-explication : 64 rapports, 69 tailles d'effet, **g = 0,55**. Les consignes interrogatives donnent g = 0,56, les consignes impératives g = 0,40 — [SFU Summit](https://summit.sfu.ca/item/34322) ; [Clearinghouse TUM](https://www.clearinghouse.edu.tum.de/wp-content/uploads/2023/09/CHU-KR-25_ENG_Bisra_2018_Selbsterklaerungen.pdf)

**Échec productif**
- [Recherche] **Sinha & Kapur (2021)**, *Review of Educational Research* : 53 études et 166 comparaisons entre « résolution puis instruction » (PS-I) et « instruction puis résolution » (I-PS).
  - Les effets sont plus grands quand le design respecte fidèlement les principes de l'échec productif : g de 0,37 à 0,58.
  - Une correction du biais de publication porte l'estimation à **g = 0,87**.
  - Les élèves jeunes (CE1–CM2) et les compétences générales seraient plutôt favorisés par l'ordre I-PS.
  - **Les extraits consultés sont incohérents sur les chiffres** : il faut lire l'article.

  — [DOI 10.3102/00346543211019105](https://doi.org/10.3102/00346543211019105) ; [X-MOL](https://www.x-mol.com/paper/1406031499744456704)

**Indices et aide à la demande**
- [Recherche] **VanLehn (2006)**, « The Behavior of Tutoring Systems » : la séquence d'indices classique pour une étape est **Point → Teach → Bottom-out**.
  - « Point » attire l'attention sur les conditions du problème.
  - « Teach » énonce brièvement la connaissance et montre comment l'appliquer.
  - « Bottom-out » donne l'étape elle-même.

  — [PDF VanLehn 2006](https://www.cs.uky.edu/~sgware/reading/papers/vanlehn2006behavior.pdf) ; [résumé](https://subhadityamukherjee.github.io/AI-knowledge-base/KB/The-Behavior-of-Tutoring-Systems)
- [Recherche] **Aleven, Roll, McLaren & Koedinger (2016)**, « Help Helps, But Only So Much » :
  - les élèves cliquent vite à travers les niveaux pour atteindre l'**indice final**, qui donne la réponse ;
  - dans une unité d'un Cognitive Tutor de géométrie, l'**abus d'indices** concernait **36 % des actions**, et 14 % si l'on compte les demandes rapides successives comme une seule ;
  - les auteurs proposent une taxonomie : abus d'aide, évitement de l'aide, abus d'essais ;
  - d'autres travaux trouvent une **corrélation négative entre le nombre d'indices finaux utilisés et l'apprentissage**.

  — [notice Aleven et al. 2016](https://cris.iucc.ac.il/en/publications/help-helps-but-only-so-much-research-on-help-seeking-with-intelli/) ; [LearnLab, Help abuse](https://learnlab.org/research/wiki/index.php/Help_abuse) ; [LearnLab, Clicking through hints](https://learnlab.org/research/wiki/index.php/Clicking_through_hints)

**Tuteurs fondés sur un LLM**
- [Recherche] **Bastani et al., PNAS 2025** : près de 1 000 lycéens en mathématiques.
  - Pendant l'entraînement, l'accès à GPT-4 améliore les résultats de **+48 %** avec « GPT Base » et de **+127 %** avec « GPT Tutor », la version à garde-fous.
  - À l'examen sans IA, le groupe GPT Base fait **moins bien** : les élèves s'en sont servis comme d'une béquille. La prépublication indiquait −17 %, chiffre non confirmé dans la version PNAS.
  - Les garde-fous de GPT Tutor **atténuent largement** cet effet négatif, avec des résultats proches du groupe contrôle.

  — [RePEc, PNAS 122(26)](https://ideas.repec.org/a/nas/journl/v122y2025pe2422633122.html) ; [Wharton](https://knowledge.wharton.upenn.edu/article/without-guardrails-generative-ai-can-harm-education/) ; [SSRN](https://papers.ssrn.com/abstract=4895486)
- [Recherche] **Pardos & Bhandari, PLOS ONE 2024** : N = 274.
  - Les aides générées par ChatGPT produisent des **gains d'apprentissage équivalents** à celles rédigées par des tuteurs humains.
  - **32 % des aides générées échouaient au contrôle qualité**. L'**auto-cohérence** (*self-consistency*) ramène ce taux à environ 0 % en algèbre et 13 % en statistiques.
  - L'article est sous CC BY.

  — [DOAJ](https://doaj.org/article/97449e9adb3248b8944d95edbfec683d) ; [eScholarship](https://escholarship.org/content/qt42x5f0tm/qt42x5f0tm.pdf)
- [Recherche] **Kestin et al., Scientific Reports 2025** : essai croisé sur 194 étudiants de physique à Harvard. Avec un tuteur GPT-4 conçu pour **guider la résolution sans donner les réponses**, les étudiants apprennent **plus de deux fois plus**, en moins de temps, qu'en cours d'apprentissage actif. Limites : un seul établissement, deux sujets, des tests à court terme — [Hechinger Report](https://hechingerreport.org/?p=103689) ; [revue critique ETC Journal](https://etcjournal.com/2025/11/10/review-of-kestin-et-al-s-june-2025-harvard-study-on-ai-tutoring/)
- [Recherche] **CS50 Duck (SIGCSE 2024)** : un assistant à « **garde-fous pédagogiques** », qui guide sans donner de solutions et ne répond qu'aux questions liées au cours. Il a été déployé auprès d'environ 70 étudiants l'été, puis de milliers en ligne et d'environ 500 sur le campus. Aucune évaluation indépendante des garde-fous n'a été trouvée — [Liu et al., SIGCSE 2024](https://cs.harvard.edu/malan/publications/V1fp0567-liu.pdf) ; [doc CS50.ai](https://cs50.readthedocs.io/cs50.ai/)
- [Recherche, non revérifié ici] **SENSAI** (pwn.college, SIGCSE TS 2025) : tuteur qui exploite le contexte réel du terminal de l'apprenant, de façon socratique — [Doupé et al.](https://adamdoupe.com/publications/sensai-cigcse2025.md)

**Pratique de récupération et espacement**
- [Recherche] **Adesope et al. (2017)** : 272 tailles d'effet issues de 118 articles. Les tests de pratique font mieux que les autres conditions : **g = 0,61** en effets fixes, 0,70 en effets aléatoires. L'effet est comparable en classe (0,67) et en laboratoire (0,62), avec ou sans rétroaction. Les QCM sont au moins aussi efficaces que le rappel libre — [Learning Scientists](https://www.learningscientists.org/blog/2017/2/9-1) ; [Frontiers, revue 2019](https://www.frontiersin.org/articles/10.3389/feduc.2019.00005)
- [Recherche] **Dunlosky et al. (2013)** : sur 10 techniques, seules la **pratique distribuée** et les **tests de pratique** obtiennent l'utilité « **haute** ». La pratique entrelacée, l'interrogation élaborative et l'auto-explication sont jugées « modérées » ; relecture et surlignage, « faibles » — [APS](https://www.psychologicalscience.org/news/releases/which-study-strategies-make-the-grade.html) ; [AFT](https://www.aft.org/ae/fall2013/dunlosky)
- [Projet, GitHub vérifié] **FSRS (Free Spaced Repetition Scheduler)** : ts-fsrs (872 ★) et py-fsrs (531 ★) sont sous MIT et actifs (push le 13/11/2026). Le banc d'essai srs-benchmark s'appuie sur un jeu de données d'environ **10 000 utilisateurs d'Anki et environ 727 millions de révisions**. Les métriques sont la log-loss, l'AUC et le RMSE par classes. **FSRS-7**, la plus récente, gère des intervalles fractionnaires — [srs-benchmark](https://github.com/open-spaced-repetition/srs-benchmark) ; [ts-fsrs](https://github.com/open-spaced-repetition/ts-fsrs) ; [py-fsrs](https://github.com/open-spaced-repetition/py-fsrs)

**Gamification**
- [Recherche] **Sailer & Homner (2020)**, *Educational Psychology Review* 32 : effets d'environ **g = 0,49** sur les résultats cognitifs, 0,36 sur la motivation et 0,25 sur le comportement, ce dernier étant le moins stable. La **fiction de jeu** et l'**interaction sociale** modèrent l'effet comportemental, avec un avantage pour les designs « compétitifs-collaboratifs » — [OPUS Augsburg](https://opus.bibliothek.uni-augsburg.de/opus4/frontdoor/index/index/docId/109056)
- [Recherche] **Huang et al. (2020)**, *ETR&D* : effet global d'environ g = 0,46. Selon un article ultérieur qui le cite, les études **sans classement** montrent un impact significativement plus grand. Une méta-analyse coréenne de 2022 trouve que badges et classement combinés font mieux (SMD 0,48) que l'un ou l'autre seul (0,40) — [Springer ETR&D](https://springerlink.bibliotecabuap.elogim.com/content/pdf/10.1007/s11423-020-09807-z.pdf) ; [KoreaScience](https://koreascience.kr/article/JAKO202230853598218.pdf)
- [Recherche] **Hanus & Fox (2015)**, *Computers & Education* 80 : 71 étudiants suivis sur 16 semaines. Dans le cours gamifié (classement, badges, pièces), la **motivation intrinsèque, la satisfaction et le sentiment d'autonomie baissent** au fil du semestre, et les **notes d'examen final sont plus basses**, un effet médié par la motivation intrinsèque. L'échantillon est petit — [Peeref](https://peeref.com/works/355703) ; [revue PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC8916940)

**Évaluation des labs pratiques**
- [Recherche] L'**evidence-centered design (ECD)** de Mislevy a été appliqué à **Cisco Packet Tracer**. Les tâches pratiques (concevoir, configurer et dépanner un réseau) sont notées automatiquement. Les **journaux d'actions** alimentent des modèles de mesure, notamment des réseaux bayésiens, selon un modèle de délivrance en quatre processus. L'approche est utilisée à très grande échelle par la Networking Academy — [CRESST Report 778](https://cresst.org/publication/an-evidence-centered-design-for-learning-and-assessment-in-the-digital-world/) ; [JEDM 2012](https://jedm.educationaldatamining.org/index.php/JEDM/article/view/23) ; [JSET 2010](https://link.springer.com/content/pdf/10.1007/s10956-009-9192-0.pdf)
- [Recherche] **KYPO / CyberRangeCZ** (Masaryk University) a produit plusieurs travaux : formation **adaptative** (FIE 2021, avec questionnaire préalable court), « Smart Environment for Adaptive Learning of Cybersecurity Skills » (*IEEE TLT* 16(3), 2023), et **rétroaction automatique** aux participants (*Education and Information Technologies*, 2023). Les résultats chiffrés n'ont pas été lus — [FIE 2021, diapositives](https://is.muni.cz/publication/1783806/2021-FIE-reinforcing-cybersecurity-hands-on-training-with-adaptive-learning-presentation.pdf) ; [TLT 2023](https://www.muni.cz/en/research/publications/2246149) ; [EaIT 2023](https://is.muni.cz/publication/2319997/2023-EaIT-automated-feedback-participants-hands-on-cybersecurity-training-paper.pdf)
- [Officiel / Secondaire] Les certifications cibles utilisent déjà l'évaluation par la performance : **PBQ** de Network+ et Linux+, et **RHCSA 100 % pratique** (voir section 1).

### Inferences
De la preuve à la règle de conception (détaillée en section 6) :
1. **Rendre la méthode visible.** Chaque lab de dépannage impose un journal « symptôme → hypothèse → test → résultat → conclusion ». L'IA évalue la **démarche**, pas seulement l'état final. C'est la réponse directe au constat « essais et erreurs » de l'étude Packet Tracer.
2. **Débutants : exemple résolu étiqueté, puis estompé.** Pour chaque famille de pannes : un exemple résolu avec sous-objectifs (« vérifier la couche 1… 2… 3… »), puis un exemple partiellement résolu, puis une panne autonome. Pour les avancés, on saute l'exemple après un **pré-test**, à cause de l'inversion d'expertise.
3. **Échec productif réservé au conceptuel** : concevoir un plan d'adressage, une segmentation VLAN ou une politique de sauvegarde **avant** le cours, puis consolider. Pas pour les novices sur des procédures.
4. **Indices gradués et coûteux** (Point → Teach → Bottom-out, avec délais). La détection d'abus d'aide et d'évitement de l'aide adapte la stratégie.
5. **Tuteur IA à garde-fous** : pas de solution complète avant l'échelon final ; contexte réel du lab ; **vérification par auto-cohérence** des indices (Pardos & Bhandari) ; refus des demandes hors périmètre (CS50).
6. **Récupération espacée** pour les connaissances (FSRS) **et** pour les compétences : rejouer plus tard des **variantes** de pannes déjà résolues.
7. **Gamification sobre** : progression de maîtrise et badges de compétences, **sans classement public** par défaut, avec éventuellement des défis coopératifs.
8. **Évaluation de type ECD** : chaque tâche déclare les **preuves** attendues (état final vérifié, commandes clés, temps, indices utilisés), qui alimentent l'estimation de maîtrise par compétence.

### Gaps
- Aucune étude contrôlée n'a été trouvée **spécifiquement sur l'enseignement du dépannage d'infrastructures** (Linux, AD, réseau) avec un tuteur LLM. Les preuves viennent des mathématiques, de la physique, de la programmation et de l'électronique : le transfert est plausible, pas démontré.
- Les **chiffres exacts de Sinha & Kapur (2021)** et les **résultats de Schaafstal et al. (2000)** n'ont pas été lus dans le texte intégral.
- **Cepeda et al. (2008)** sur l'écart optimal d'espacement et **Kulik et al. (1990)** sur la pédagogie de la maîtrise n'ont pas été retrouvés dans les résultats.
- Les **résultats chiffrés de KYPO** (formation adaptative, rétroaction automatique) n'ont pas été lus.
- Aucune preuve n'a été trouvée sur l'efficacité des **« séries » (*streaks*)** ou sur la **validité des notes automatiques** dans les labs d'infrastructure.

---

## 6. Scénarios de lab typiques et premier catalogue (20 à 50 labs et pannes), avec les principes de conception des cours, des indices et du suivi de progression

### Takeaway
Les scénarios typiques sont bien documentés par des sources réutilisables :
- les **cas d'usage du PoC Wazuh** ;
- les **guides ANSSI** : AD, journalisation, sauvegarde, BP-028 Linux, remédiation du Tier 0 ;
- les **familles de pannes de gns3-skills** : VLAN, OSPF, NAT, DHCP, DNS, IPsec, 802.1X, SNMP/Syslog ;
- les **formations CyberRangeCZ** ;
- le **modèle de lab de BrokenOps**.

Un premier catalogue de **45 labs et pannes paramétrables** est proposé ci-dessous, chacun avec une **vérification d'état déterministe**, des **invariants de sécurité** et une correspondance avec les référentiels. Ces labs doivent passer une **chaîne de validation automatique** avant d'être servis : sain → cassé → réparé → mauvaises réparations refusées → réinitialisation.

### Cited Findings
- [Projet, GitHub vérifié] Les cas d'usage du **PoC Wazuh** (FIM, vulnérabilités, SCA, Docker, SQLi, XSS, IDS réseau, processus cachés, blocage d'IP, brute force, YARA, audit des commandes, etc.) et l'architecture de lab recommandée sont décrits en section 4 — [Wazuh PoC guide](https://github.com/wazuh/wazuh-documentation/blob/main/source/proof-of-concept-guide/index.rst)
- [Officiel] Guides de l'ANSSI réutilisables comme base de cours et de critères de validation :
  - « **Fondamentaux de la sauvegarde** » (LO 2.0, 2023) — [PDF](https://messervices.cyber.gouv.fr/documents-guides/anssi-fondamentaux-sauvegarde_systemes_dinformation_v1-0.pdf) ;
  - **journalisation Windows/AD** — [PDF](https://cyber.gouv.fr/sites/default/files/2022/01/anssi-guide-recommandations_securite_journalisation_systemes_microsoft_windows_environnement_active_directory.pdf) ;
  - **administration sécurisée des SI reposant sur AD** (2023) et **points de contrôle AD** — [Le Monde Informatique](https://www.lemondeinformatique.fr/actualites/lireamp-l-anssi-publie-un-guide-sur-la-securisation-des-si-reposant-sur-active-directory-91922.html) ;
  - **BP-028 v2.0 (Linux)**, déjà outillée en profils OpenSCAP par ComplianceAsCode — [anssi.yml](https://github.com/ComplianceAsCode/content/blob/master/controls/anssi.yml) ;
  - **remédiation du Tier 0 AD** — [ANSSI](https://cyber.gouv.fr/actualites/lanssi-publie-un-corpus-de-guides-dedies-la-remediation-dincidents-cyber)
- [Projet, GitHub vérifié] Familles de pannes réseau prêtes à décrire : `vlan_trunk`, `stp`, `port_security`, `dhcp`, `dhcp_snooping_dai`, `dns`, `ospf`, `nat`, `ipsec_vpn`, `security_aaa` (802.1X), `snmp_syslog`, `packet_filter`, `fhr` (VRRP/HSRP) — [gns3-skills SKILLS_SUMMARY](https://github.com/GNS3/gns3-skills/blob/main/SKILLS_SUMMARY.md)
- [Projet, GitHub vérifié] Formation offensive d'entrée de gamme déjà conçue et sous licence libre : la progression **Junior hacker** décrite en section 3 (nmap, SSH, scp, fcrackzip, passwd), sur une topologie attaquant, serveur, client et routeur — [library-junior-hacker](https://github.com/cyberrangecz/library-junior-hacker)
- [Projet, GitHub vérifié] Mécanique de lab cassé et vérification : `lab.yaml`, état cassé par cloud-init, `verify.sh` et contrôle CI de l'état initial (`port_works_initially`) — [BrokenOps LAB_FORMAT](https://github.com/HimanM/BrokenOps/blob/main/LAB_FORMAT.md). Validation YAML de catalogue en CI — [gns3-skills](https://github.com/GNS3/gns3-skills/blob/main/README.md). Vérificateurs « éprouvés contre de mauvaises corrections » — [infra-bench](https://github.com/midat-fx/infra-bench)
- [Officiel] Les épreuves E6 du BTS SIO SISR reposent sur des **réalisations professionnelles** conformes à l'environnement technique de l'annexe II-E. Les annales mobilisent la **conformité à un référentiel de sécurité** — [SIEC E6 2026](https://siec.education.fr/candidats/docutheque/download/bts-services-informatiques-aux-organisations-sio-session-2026/14%20-%20EPREUVE%20PRATIQUE%20E6%20-%20GUIDE%20D%27ELABORATION%20DU%20DOSSIER%20PROFESSIONNEL%20-%20BTS%20SIO%202026.pdf) ; [annales E6 (académie de Lille)](https://pedagogie.ac-lille.fr/ecogestion/wp-content/uploads/sites/53/2024/04/BTS-SIO-E6-SISR-22mr-CaledoBank-copie.pdf)
- [Projet] Wi-Fi simulable en logiciel avec `mac80211_hwsim`, hostapd et wpa_supplicant ; le WPA2-Enterprise est documenté dans Mininet-WiFi (cf. notes voisines « faisabilité technique ») — [Mininet-WiFi, mac80211_hwsim](https://mininet-wifi.github.io/mac80211_hwsim/)
- [Officiel] Les **post-mortems réels** rejoués par SREGym fournissent des « récits de dépannage » pour la bibliothèque de cas recommandée par Jonassen & Hung — [SREGym](https://github.com/SREGym/SREGym)

### Inferences

#### Premier catalogue proposé (45 entrées)
Ce catalogue est une proposition d'auteur, pas un inventaire existant.

**Légendes**
- **Niveau** : D = débutant, I = intermédiaire, A = avancé.
- **Env.** = environnement d'exécution : C = conteneur, VM = machine virtuelle, W = VM Windows Server d'évaluation, R = topologie réseau (Containerlab, FRR, Open vSwitch).
- **Validation** = contrôle d'état automatique. **Inv.** = invariant de sécurité à préserver.
- **Réf.** = correspondances avec les référentiels : AIS CCP1/2/3 ; TSSR ; BTS = BTS SIO SISR (bloc 2 ou 3) ; BUT ; CCNA ; N+ (Network+) ; S+ (Security+) ; L+ (Linux+) ; LPIC ; RHCSA.
- **Sources** = licences entre parenthèses.
- Chaque panne est un **modèle paramétré** : l'IA choisit les paramètres (interface, VLAN, enregistrement, compte…), ce qui garantit la diversité et empêche de mémoriser la solution.

**A. Socle Linux et services**

| ID | Lab / panne (variantes) | Niv. | Env. | Validation automatique (Inv.) | Réf. | Sources d'ancrage |
|---|---|---|---|---|---|---|
| L01 | Service web arrêté après redémarrage : unit désactivée, erreur de syntaxe, port déjà pris | D | C/VM | `systemctl is-active` + HTTP 200 depuis un client (Inv. : pare-feu actif) | AIS CCP1, BTS b2, L+, LPIC, RHCSA | Modèle BrokenOps « nginx-broken » (MIT) ; Debian Handbook (CC BY-SA) |
| L02 | Disque plein : inodes épuisés, fichier supprimé encore ouvert, logrotate absent | D/I | VM | Espace et inodes sous le seuil + service OK + rotation active | L+ (Troubleshooting), LPIC | Red Hat docs (CC BY-SA 3.0) |
| L03 | Accès refusé : droits, umask, ACL, **contexte SELinux** erroné | I | VM (RHEL-like) | Accès OK (Inv. : SELinux **enforcing**) | RHCSA, L+ Security | Red Hat docs |
| L04 | Connexion SSH par clé cassée : droits de `~/.ssh`, AllowUsers, sshd_config invalide | D | C | Connexion par clé OK (Inv. : connexion root par mot de passe refusée) | AIS CCP1, LPIC | ANSSI BP-028 via ComplianceAsCode (BSD-3) |
| L05 | Stockage LVM : volume logique ou FS plein à étendre ; fstab erroné qui bloque le démarrage | I | VM | Taille cible montée + redémarrage OK | RHCSA, LPIC, AIS CCP1 | Red Hat docs |
| L06 | Tâche planifiée muette (cron ou timer) ; dérive d'horloge (chrony) | D | C/VM | Tâche exécutée + décalage sous le seuil | LPIC, L+ | Debian Handbook |

**B. Réseau (L2/L3)**

| ID | Lab / panne (variantes) | Niv. | Env. | Validation automatique (Inv.) | Réf. | Sources d'ancrage |
|---|---|---|---|---|---|---|
| N01 | VLAN : port d'accès dans le mauvais VLAN, VLAN non autorisé sur le trunk, VLAN natif incohérent | D/I | R | Ping intra-VLAN OK (Inv. : **isolement inter-VLAN** conservé) | CCNA, N+, BTS b2, BUT, AIS CCP1 | gns3-skills `vlan_trunk_issues` (GPL-3.0) ; CNP3 (CC BY-SA) |
| N02 | Passerelle, masque ou route par défaut erronés ; routage inter-VLAN cassé | D | R | Traceroute conforme au chemin attendu | CCNA, N+, TSSR | CNP3 ; gns3-skills `static_route_issues` |
| N03 | OSPF : aire, timers, MTU, interface passive | I | R (FRR) | Adjacence FULL + préfixes présents | CCNA, BUT | gns3-skills `ospf_issues` (48 pannes) |
| N04 | NAT/PAT : sortie « Internet » simulée en panne, mauvaise interface, ACL de NAT | I | R / OPNsense | Accès à l'hôte « Internet » simulé + traduction observée | CCNA, N+ | gns3-skills `nat_issues` |
| N05 | Boucle STP, port-security, DHCP snooping et DAI | I/A | R (OVS) | Pas de tempête ; port bloqué attendu (Inv. : DHCP pirate bloqué) | CCNA, N+ | gns3-skills `stp`, `port_security`, `dhcp_snooping_dai` |
| N06 | BGP (option avancée) : ASN voisin, filtre de préfixes | A | R (FRR) | Session Established + préfixe reçu | BUT (opérateurs) | gns3-skills `bgp_issues` (67 pannes) |

**C. Services d'infrastructure et stockage**

| ID | Lab / panne (variantes) | Niv. | Env. | Validation automatique (Inv.) | Réf. | Sources d'ancrage |
|---|---|---|---|---|---|---|
| S01 | DHCP : étendue épuisée, relais absent entre VLAN, option routeur ou DNS fausse | D/I | C ou W | Bail obtenu avec les options attendues | BTS b2, TSSR, N+, AIS CCP1 | gns3-skills `dhcp_issues` ; Microsoft docs (CC BY 4.0) |
| S02 | DNS : A/PTR manquant, **serial SOA non incrémenté** (secondaire en retard), redirecteur faux, résolveur client faux | I | C ou W | `dig` autoritaire et récursif conformes ; secondaire synchronisé | BTS b2, TSSR, AIS CCP1, N+ | gns3-skills `dns_issues` ; Debian Handbook |
| S03 | Partages SMB et NFS : droits de partage contre droits NTFS, `root_squash`, export trop large | I | VM / W / TrueNAS | Matrice d'accès lecture/écriture conforme (Inv. : pas d'accès « Everyone ») | BTS b2, TSSR, AIS CCP1 | TrueNAS docs (GPL-3.0) ; Microsoft docs |
| S04 | iSCSI : CHAP incohérent, IQN non autorisé, LUN non montée | I/A | VM (LIO) + initiateur | LUN visible et montée au redémarrage | AIS CCP1 | Red Hat docs ; TrueNAS docs |

**D. Windows Server et Active Directory**

| ID | Lab / panne (variantes) | Niv. | Env. | Validation automatique (Inv.) | Réf. | Sources d'ancrage |
|---|---|---|---|---|---|---|
| W01 | Jonction au domaine impossible : client pointant vers un DNS public, enregistrements **SRV** absents | D | W ×2 | Contrôleur de domaine localisé (`nltest /dsgetdc`) + machine jointe | TSSR, BTS b2, AIS CCP1 | Microsoft docs windowsserverdocs (CC BY 4.0) |
| W02 | Kerberos : décalage d'horloge, SPN dupliqué | I | W | Ticket obtenu (`klist`) ; aucune erreur dans le journal | AIS CCP1 | Microsoft docs |
| W03 | GPO non appliquée : filtrage de sécurité, mauvaise OU, filtre WMI, SYSVOL | I | W | `gpresult` montre la GPO et le paramètre effectif | TSSR, BTS b2, AIS CCP1 | Microsoft docs |
| W04 | Réplication en échec entre 2 contrôleurs : DNS, pare-feu RPC | A | W ×3 | `repadmin /replsummary` sans erreur | AIS CCP1 | Microsoft docs |
| W05 | Durcissement AD selon l'ANSSI : comptes à privilèges hors Tier 0, délégation non contrainte, mots de passe qui n'expirent jamais | I/A | Mini-domaine ou GOAD-Light | Indicateurs des points de contrôle passés au vert (collecte de type ORADAD) | AIS CCP3, BTS b3 | Guides AD de l'ANSSI (LO) ; ORADAD (GPL-3.0) ; remédiation du Tier 0 |
| W06 | Objet AD supprimé : restauration par la corbeille AD ; restauration d'état système | I | W | Objet restauré avec ses attributs et appartenances | AIS CCP1/3 | Microsoft docs |

**E. Périmètre, VPN, accès, PKI**

| ID | Lab / panne (variantes) | Niv. | Env. | Validation automatique (Inv.) | Réf. | Sources d'ancrage |
|---|---|---|---|---|---|---|
| F01 | Pare-feu OPNsense : ordre des règles, règle trop large, redirection de port mal ciblée, DMZ | I | VM OPNsense | **Matrice de flux** testée (autorisé et interdit) par nmap et curl | AIS CCP1, BTS b3, N+, S+ | Doc OPNsense (BSD-2) |
| F02 | VPN site à site IPsec ou WireGuard : propositions IKE, clé ou pair, AllowedIPs, route manquante | I/A | VM | Tunnel établi + flux autorisés seulement | AIS CCP1, N+, CCNA | gns3-skills `ipsec_vpn_issues` ; doc OPNsense |
| F03 | **Wi-Fi d'entreprise simulé** WPA2/WPA3-Enterprise : secret RADIUS faux, certificat serveur non approuvé, VLAN dynamique non appliqué | A | VM Linux (hwsim, hostapd, FreeRADIUS) | Client authentifié en EAP + placé dans le bon VLAN | AIS CCP1, N+, BTS | gns3-skills `security_aaa_issues` ; Mininet-WiFi |
| F04 | PKI : certificat expiré, **intermédiaire manquant**, SAN non conforme, CRL injoignable | I | C (openssl, nginx) ou AD CS | Vérification stricte de la chaîne + nom valide | AIS CCP1/3, S+ | OWASP Cheat Sheets (CC BY-SA) ; Microsoft docs AD CS |

**F. Supervision, journalisation, SIEM, IDS**

| ID | Lab / panne (variantes) | Niv. | Env. | Validation automatique (Inv.) | Réf. | Sources d'ancrage |
|---|---|---|---|---|---|---|
| M01 | Zabbix : agent injoignable (pare-feu, `Server=`, PSK TLS), déclencheur mal réglé | I | C/VM | Hôte remonté ; déclencheur en PROBLEM sur une panne simulée | AIS CCP2, BTS b2 | Doc Zabbix (**lien seulement**) |
| M02 | SNMP : communauté v2c fausse, authentification v3 incohérente, ACL | I | R + collecteur | Équipement interrogé, métriques présentes | CCNA, N+, AIS CCP2 | gns3-skills `snmp_syslog_issues` |
| M03 | Centralisation des journaux (rsyslog, journald) : horodatage, NTP, rotation | D/I | C | Message témoin reçu avec la bonne heure | AIS CCP3, L+ | Guide de journalisation de l'ANSSI (LO) |
| M04 | Agent Wazuh non connecté ; FIM silencieux (répertoire non surveillé) | D/I | Wazuh + agents | Agent actif + alerte FIM sur modification témoin | AIS CCP3, S+ | PoC Wazuh FIM (GPL-2.0+) |
| M05 | Brute force SSH/RDP : détection et **réponse active** (blocage d'IP) | I | Wazuh + attaquant | Alerte au bon niveau + IP bloquée, puis débloquée | AIS CCP3, S+ | PoC Wazuh brute force et réputation d'IP |
| M06 | Suricata avec ET Open : mauvaise interface, HOME_NET faux, règles non chargées ; détecter un scan | I | VM Suricata + Wazuh | Alerte ET attendue sur le trafic témoin | AIS CCP3, S+ | Suricata (GPL-2.0) ; ET Open (licence à vérifier) ; PoC Wazuh NIDS |

**G. Sauvegarde et continuité**

| ID | Lab / panne (variantes) | Niv. | Env. | Validation automatique (Inv.) | Réf. | Sources d'ancrage |
|---|---|---|---|---|---|---|
| B01 | Sauvegarde 3-2-1 : tâche « réussie » qui exclut le bon dossier, rétention trop courte, copie non chiffrée, **restauration jamais testée** | I | C/VM (restic, Borg ou Proxmox Backup Server) | Restauration d'un fichier témoin avec **empreinte identique** | AIS CCP1/3, BTS | Fondamentaux de la sauvegarde ANSSI (LO 2.0) |
| B02 | Rançongiciel **simulé** (chiffrement inoffensif d'un partage) : restauration depuis une copie hors ligne ou immuable | A | VM + SMB | Données restaurées + vecteur fermé | AIS CCP3, S+ | Remédiation ANSSI ; IRM CERT-SG (CC BY 3.0) |

**H. Durcissement et conformité**

| ID | Lab / panne (variantes) | Niv. | Env. | Validation automatique (Inv.) | Réf. | Sources d'ancrage |
|---|---|---|---|---|---|---|
| H01 | Durcissement Linux **ANSSI BP-028** (minimal, puis intermédiaire) mesuré par OpenSCAP | I | VM | Score du profil au-dessus du seuil (Inv. : services métier opérationnels) | AIS CCP3, BTS b3, L+ | ComplianceAsCode (BSD-3) ; BP-028 (LO) |
| H02 | Audit Lynis et plan de remédiation priorisé et justifié | D | C/VM | Indice Lynis amélioré + justification écrite évaluée par l'IA | AIS CCP3, L+ | Lynis (GPL-3.0) |
| H03 | Windows et AD : LLMNR et NetBIOS désactivés par GPO, signature SMB, journalisation avancée | I | W | Paramètres effectifs vérifiés ; l'attaque d'empoisonnement (mode attaque) échoue | AIS CCP3 | Journalisation AD ANSSI (LO) ; Microsoft docs |

**I. Attaque/défense en réseau isolé**

| ID | Lab / panne (variantes) | Niv. | Env. | Validation automatique (Inv.) | Réf. | Sources d'ancrage |
|---|---|---|---|---|---|---|
| P01 | Compte local malveillant (**Atomic T1136.001**), puis détection, puis réponse | D | VM + Wazuh | Alerte attendue + compte supprimé (`cleanup_command`) | AIS CCP3, S+ | Atomic (MIT) ; Sigma (DRL) ; ATT&CK (licence MITRE) |
| P02 | Kerberoasting et AS-REP roasting, détection, remédiation (comptes de service, mots de passe longs, gMSA) | A | Mini-domaine ou GOAD-Light | Détection déclenchée ; après remédiation, le ticket n'est plus exploitable | AIS CCP3 | GOAD (GPL-3.0) ; guides AD ANSSI ; Sigma |
| P03 | Application web vulnérable (DVWA ou Juice Shop) : injection SQL détectée, puis corrigée ou filtrée | I | C | Attaque bloquée ou alertée + application fonctionnelle | S+, BTS b3 | DVWA (GPL-3.0) ; Juice Shop (MIT) ; OWASP WSTG ; PoC Wazuh SQLi |
| P04 | « Junior hacker » (reconnaissance, SSH faible, exfiltration), puis version défense : fail2ban ou Wazuh, politique de mots de passe | D | 4 C/VM | Questions et drapeaux + état durci vérifié | S+, BTS b3, AIS CCP3 | CyberRangeCZ junior-hacker (MIT, CC BY 4.0) |
| P05 | Réponse à incident guidée : processus caché ou trojan simulé, puis triage, isolement, collecte, éradication et rapport | I | Wazuh + poste | Liste de contrôle remplie + artefacts identifiés + rapport | AIS CCP3, S+ | NIST 800-61r3 ; IRM (CC BY 3.0) ; remédiation ANSSI ; PoC Wazuh |

**J. Virtualisation, conteneurs, Kubernetes (parcours optionnels)**

| ID | Lab / panne (variantes) | Niv. | Env. | Validation automatique (Inv.) | Réf. | Sources d'ancrage |
|---|---|---|---|---|---|---|
| V01 | VM sans réseau : bridge ou tag VLAN ; instantané et restauration | D/I | KVM / Proxmox imbriqué | VM joignable ; restauration réussie | AIS CCP1, BTS b2 | Doc Proxmox (licence à vérifier) |
| V02 | Docker : port non publié, volume avec les mauvais droits, réseau bridge | D | C | Service accessible | L+, AIS CCP1 | PoC Wazuh Docker ; BrokenOps |
| V03 | Kubernetes : CrashLoopBackOff, ImagePullBackOff, selector de Service faux, NetworkPolicy bloquante | I | kind | Pods Ready + endpoint qui répond | L+ (orchestration) | SREGym-Lite (MIT) ; AIOpsLab (MIT) ; K8sMissions (MIT) ; docs K8s (CC BY 4.0) |

**K. Études de cas pour le CCP2 de l'AIS (conception d'une évolution, sans panne)**

| ID | Lab / panne (variantes) | Niv. | Env. | Validation automatique (Inv.) | Réf. | Sources d'ancrage |
|---|---|---|---|---|---|---|
| K01 | Concevoir l'ajout d'un site distant : adressage, VPN, AD, supervision | A | Dossier + lab cible | Le plan est déployé, puis les contrôles N02, F02, W01 et M01 passent | AIS CCP2 | Sources officielles ci-dessus |
| K02 | Plan de mise en production avec retour arrière (montée de version d'un service) | I | Lab | Bascule, puis retour arrière testés | AIS CCP2 | Docs éditeurs |
| K03 | Mettre en place la supervision d'un nouveau service : métriques, seuils, alertes | I | Lab | Alerte déclenchée sur une panne injectée | AIS CCP2 | Zabbix (lien) ; doc Wazuh |
| K04 | Soutenance blanche : l'IA joue le jury de l'entretien technique sur le dossier de l'apprenant | — | — | Grille d'évaluation explicite + questions de relance | AIS (épreuve) | REAC (LO/CRPA) |

#### Chaîne de validation automatique des pannes, avant tout usage
Inférence directe des modèles BrokenOps, gns3-skills et infra-bench :
1. **Validation statique** du modèle : schéma YAML, champs obligatoires, commandes interdites.
2. **Ligne de base saine** : déployer l'état sain ; tous les `verify` et les **invariants** doivent passer.
3. **Injection** : appliquer la panne avec ses paramètres ; les `verify` ciblés doivent **échouer avec la signature de symptôme déclarée**, et les autres services rester sains (panne isolée).
4. **Correction de référence** : appliquer la solution ; tout doit repasser au vert.
5. **Mauvaises corrections connues**, par exemple « désactiver le pare-feu », « passer SELinux en permissive », « ouvrir les droits en 777 » : les invariants doivent **échouer**.
6. **Réinitialisation et idempotence** : remettre à zéro ou restaurer l'instantané, puis rejouer deux fois. Si l'un des contrôles échoue, la panne n'est pas servie.

#### Principes de conception : cours, indices, suivi de progression
**Cours**
- **Ancrés et sourcés** : chaque affirmation technique du cours généré renvoie à une entrée du registre des sources (section 2). Pour les sources ouvertes, extraits et attribution ; pour les autres, paraphrase, citation courte et lien. L'IA **refuse de générer** sur un sujet sans source fiable indexée.
- **Structure en quatre temps** :
  1. un modèle du système (schéma des couches et dépendances, selon Jonassen & Hung) ;
  2. un **exemple résolu à sous-objectifs étiquetés** ;
  3. un exemple estompé ;
  4. une panne autonome, puis un **quiz de récupération**.

  Un pré-test permet de sauter les étapes 2 et 3 (inversion d'expertise).
- **Méthode explicite** : gabarit de démarche structurée (symptôme, hypothèses, tests, isolement, correction, vérification, documentation), avec **auto-explication** demandée à la fin (« pourquoi cette cause produit-elle ce symptôme ? »).
- **Échec productif** sur les sujets de conception (adressage, segmentation, sauvegarde, architecture du CCP2), suivi d'une consolidation. Pas pour les procédures des débutants.
- **Bibliothèque de cas** : courts récits d'incidents réels, avec un lien vers le post-mortem d'origine (exemples de SREGym), comme « conseils d'expert ».

**Indices**
- **Échelle à cinq niveaux** :
  - **I0 Relance** : « Qu'as-tu déjà vérifié ? Quelle couche ? »
  - **I1 Pointer** : composant ou couche où regarder.
  - **I2 Enseigner** : rappel du concept et de la famille de commandes, avec lien vers la source.
  - **I3 Cibler** : la vérification précise à faire.
  - **I4 Réponse finale** : la correction.

  I4 n'est accessible qu'après un délai ou un nombre minimal d'essais. Il est **coûteux** pour la maîtrise, et oblige ensuite à **expliquer la cause** et à passer une **variante** de la même panne plus tard.
- **Anti-abus** : demandes rapides en série, donc abus d'aide → délai et relance socratique ; long blocage sans demande, donc évitement de l'aide → proposition proactive de I0 ou I1. Les deux comportements sont journalisés comme indicateurs.
- **Garde-fous du tuteur LLM** :
  - contexte réel (état du lab, journal de commandes, métadonnées secrètes de la panne, **jamais montrées**) ;
  - pas de solution complète avant I4 ;
  - **vérification par auto-cohérence** de chaque indice (plusieurs générations, et un indice divergent n'est pas servi), ou contrôle de l'indice contre le `verify` ;
  - refus hors périmètre ;
  - en **mode examen** : aucun indice.

**Suivi de progression et révision**
- **Graphe de compétences canonique**, avec des compétences atomiques comme « diagnostiquer une résolution DNS ». Chaque compétence est reliée aux identifiants des référentiels versionnés (REAC AIS 2023 puis 2027, blocs TSSR et BTS, objectifs CCNA, Security+, etc.). Un même lab alimente plusieurs parcours.
- **Preuves de type ECD** par tâche : état final vérifié, commandes clés observées, temps, niveau d'indice atteint, qualité de l'explication. Elles alimentent une **estimation de maîtrise** par compétence (modèle bayésien simple ou de type Elo), affichée comme une jauge et non comme une note unique.
- **Révision espacée double** :
  - **FSRS** (ts-fsrs, MIT) pour les cartes de connaissances (ports, commandes, concepts) ;
  - **re-cassage espacé** pour les compétences : une panne réussie revient plus tard **sous une autre variante**, à des intervalles calés sur la maîtrise estimée.
- **Gamification sobre** : progression, badges **adossés à des compétences**, objectifs hebdomadaires personnels. **Pas de classement public par défaut** (Hanus & Fox ; Huang et al.). Les éventuels défis sont **coopératifs** ou contre soi-même.
- **Mode examen blanc** calqué sur les épreuves : mise en situation chronométrée sans indices (format AIS ou RHCSA), questions de type PBQ (Network+, Linux+, Security+), et entretien technique simulé à partir du dossier de l'apprenant (AIS).
- **Sécurité et éthique** : réseaux de lab isolés, mode attaque activé explicitement, journal d'audit, et aucune cible extérieure (section 4).

### Gaps
- Le catalogue n'a pas été **testé sur matériel** : temps d'exécution, RAM par lab et faisabilité des labs W et F03 sur un portable de 16 Go sont à mesurer. Les notes voisines sur la faisabilité technique donnent les contraintes de virtualisation imbriquée et de Wi-Fi.
- Les **niveaux de difficulté** sont estimés sans données d'usage. Il faudra les recalibrer à partir des taux de réussite et du nombre d'indices utilisés.
- **Correspondance fine avec les compétences AIS** : en attente du REAC 2027 et de la liste officielle des compétences des CCP (section 1).
- Licence de la **documentation Proxmox** et des **guides Microsoft AD CS** : non vérifiées.
- Aucune source n'évalue les **échelles d'indices à cinq niveaux** ni le **re-cassage espacé** dans des labs d'infrastructure. Ce sont des extrapolations des travaux sur les tuteurs intelligents et sur la récupération espacée, à valider par des tests utilisateurs ou un pilote A/B.
