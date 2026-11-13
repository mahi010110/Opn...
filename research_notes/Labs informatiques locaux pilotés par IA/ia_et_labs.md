# IA (agents LLM) et labs informatiques : produits, projets open source, serveurs MCP et recherche (état au 13 novembre 2026)

> **Méthode et fiabilité.** Recherches web (moteur de recherche) ; **API de recherche GitHub interrogée le 13/11/2026** pour les étoiles (★), dates de création, de dernier push et licences des dépôts cités ; **API JSON de PyPI** pour les dates de versions (gns3-server, gns3-copilot, gns3-mcp, cml-mcp). Les pages docs.gns3.com et netpilot.io **n'ont pas pu être ouvertes directement** depuis l'environnement (réseau restreint) : ce qui les concerne provient des extraits renvoyés par le moteur de recherche. Les affirmations des éditeurs sont marquées **[marketing éditeur]**. Statuts utilisés : **[Livré]**, **[Bêta]**, **[Alpha/préversion]**, **[Annoncé]**, **[Prototype]** (dépôt perso, ≤ ~20 ★), **[Recherche]**. Les étoiles GitHub ne mesurent que la popularité, pas la qualité.

## 1. Plateformes commerciales : quelles fonctions IA autour des labs (tuteur, labs générés, pannes injectées, correction auto) ? Cloud ou local ? Prix ?

### Takeaway
Fin 2026, presque toutes les grandes plateformes ont un **tuteur ou assistant IA dans les labs** : TryHackMe Echo, HTB Coach, KodeKloud AI Tutor, QA Ela, Immersive AI In-Lab Assistant, OffSec KAI, LabEx Labby, Pluralsight Iris, pwn.college SENSAI. Plusieurs plateformes B2B **génèrent des labs par IA pour les auteurs** (Instruqt, Immersive Lab Builder, Skillable). Seuls **KodeKloud AI Tutor** et **Skillable AI Practice Generator** laissent l'apprenant faire générer un lab ou une tâche à la demande. **Aucune plateforme commerciale grand public ne documente une IA qui injecte en secret une panne, puis vérifie automatiquement la réparation de l'apprenant.** Seul NetPilot évoque l'injection de pannes, dans un cadre « recherche réseau » [marketing éditeur]. Tout est **hébergé dans le cloud** et utilise le modèle de l'éditeur : l'apprenant ne peut pas apporter sa propre clé API (« BYOK »). L'ouverture à l'IA de l'utilisateur passe par des **serveurs MCP officiels** : HTB pour les CTF, iximiuz Labs et Pluralsight.

### Cited Findings

#### Cybersécurité grand public
- **TryHackMe – Echo [Livré, septembre 2025]**
  - Echo est l'assistant d'apprentissage IA intégré à la plateforme. Le billet de l'éditeur de septembre 2025 le présente comme en service.
  - Il guide dans les labs et les parcours, donne des indices liés à la tâche en cours et explique les notions. Pour les utilisateurs avancés, il condense les sorties de commandes et propose d'autres méthodes.
  - L'éditeur affirme que ce n'est « pas un chatbot générique » [marketing éditeur] — [TryHackMe blog](https://tryhackme.com/resources/blog/how-ai-is-changing-the-way-we-learn-cybersecurity-introducing-echo)
  - Un résumé tiers décrit Echo comme un tuteur qui évite les impasses et commente les actions de l'apprenant — [Recapio](https://recapio.com/digest/meet-echo-your-personal-tutor-by-tryhackme)
- **TryHackMe – offres.** Trois formules individuelles : Free, Premium et MAX. MAX accompagne les changements d'offre postérieurs au 29/06/2026. Aucune source trouvée ne précise quelles formules incluent Echo — [TryHackMe MAX](https://tryhackme.com/resources/blog/introducing-tryhackme-max) ; [hackerdna (tiers)](https://hackerdna.com/blog/tryhackme-pricing)
  - Selon des guides tiers, l'offre gratuite limite l'AttackBox (cloud) à 1 h par jour — [hackerdna](https://hackerdna.com/blog/tryhackme-pricing)
- **TryHackMe – autres assistants.** Des salles sur la sécurité IA/ML embarquent leurs propres assistants dans le lab (ex. salle « ContAInment ») ; ce n'est pas Echo — [TryHackMe room](https://tryhackme.com/room/containment)
- **Hack The Box – HTB Coach [Bêta, 24/06/2026]**
  - Lancé sur HTB Academy avec la traduction multilingue.
  - Il explique les termes dans le contexte du module, résume les sections et génère des quiz adaptatifs (QCM, mises en situation, questions pratiques) avec retour.
  - Commandes, URL et code restent en anglais pour que les labs fonctionnent. Arrivée « bientôt » annoncée pour HTB Enterprise — [HTB blog](https://www.hackthebox.com/blog/ai-learning-htb-coach) ; [HTB help center](https://help.hackthebox.com/en/articles/15085276-htb-coach-in-academy) ; [changelog](https://roadmap.hackthebox.com/changelog/htb-coach-and-multilingual-translation-are-now-live-on-htb-academy)
- **Hack The Box – serveur MCP pour la plateforme CTF [Livré, juin 2025 ; contrôles admin juillet 2025]**
  - Il permet aux agents IA d'interagir avec les challenges et de soumettre les flags, avec validation et score immédiats. Chaque participant génère son jeton MCP depuis son profil.
  - Le blog le présente comme « un assistant ou tuteur IA à vos côtés 24/7 » pour les joueurs solo [marketing éditeur] — [HTB blog MCP](https://hackthebox.com/blog/model-context-protocol) ; [changelog CTF](https://roadmap.hackthebox.com/changelog/enable-mcp-on-your-next-ctf-event) ; [changelog admin](https://roadmap.hackthebox.com/changelog/mcp-server-options-for-admins)
  - Test interne « Attack of the Agents » : selon HTB, l'agent priorisait les cibles faciles — [HTB blog](https://www.hackthebox.com/blog/attack-of-the-agents-ctf)
- **Hack The Box – HTB AI Range [Livré, 03/12/2025]**
  - Cyber range pour évaluer des agents IA, et des équipes humain + IA côte à côte. HTB le présente comme le « premier au monde » [marketing éditeur].
  - Il est accompagné d'une certification AI Red Teamer développée avec Google, annoncée pour début 2026 — [BusinessWire](https://www.businesswire.com/news/home/20251203955741/en/Hack-The-Box-Launches-the-Worlds-First-AI-Cyber-Range-to-Benchmark-AI-Agents-and-Accelerate-Human-AI-Teaming-Across-Offensive-and-Defensive-Cyber-Operations) ; [HTB blog](https://www.hackthebox.com/blog/htb-ai-range-launch)
  - **Enterprise Edition [Livré, octobre 2026]** : les entreprises y testent leurs propres agents, avec scores par rôle et réussite/échec par environnement. Deux rôles seulement au lancement (pentester, analyste SOC).
  - Date discordante : 6–7/10/2026 selon une source, 20/10/2026 selon IT Brief — [LetsDataScience](https://letsdatascience.com/news/hack-the-box-launches-enterprise-ai-agent-testing-ec0224eb) ; [IT Brief AU](https://itbrief.com.au/story/hack-the-box-launches-ai-range-for-enterprise-security-teams)
- **OffSec – KAI**
  - Assistant IA limité aux modules PEN-200 et SEC-100 et à leurs labs de module. Il ne couvre pas les « challenge labs ».
  - KAI LE, réservé à Learn Enterprise, couvre tous les modules. Un assistant IA distinct est destiné aux administrateurs (données et reporting) — [OffSec KAI](https://offsec.com/learning/tools/knowledge-ai) ; [OffSec help](https://help.offsec.com/hc/en-us/articles/26587607952404) ; [assistant admin](https://help.offsec.com/hc/en-us/articles/52996258092180-Introducing-AI-Assistant-for-Enterprise-Administrators)
- **Immersive (Immersive Labs) – AI In-Lab Assistant [Livré, date non trouvée]**
  - Chatbot intégré au lab qui donne des indices sans révéler la réponse. Absent des labs personnalisés, des évaluations adaptatives et des labs « demonstrate ».
  - S'active via le paramètre « IA générative » de la plateforme — [communauté Immersive](https://community.immersivelabs.com/blog/the-human-connection-blog/boosting-cyber-readiness-together-introducing-the-new-ai-in-lab-assistant/3463) ; [support](https://support.immersivelabs.com/hc/en-us/articles/40179769275409-AI-In-Lab-Assistant-Your-On-Demand-Learning-Companion)
- **Immersive – génération de labs pour les auteurs**
  - « GenAI cyber exercise creator » : 12/11/2024 — [BusinessWire via Mammoth Times](https://business.mammothtimes.com/mammothtimes/article/bizwire-2024-11-12-immersive-labs-unveils-genai-powered-cyber-exercise-creator-to-rapidly-prepare-workforces-for-threats)
  - Lab Builder : 16/07/2025 — [BusinessWire](https://www.businesswire.com/news/home/20250716705581/en/Immersive-Announces-AI-Powered-Lab-Customization-Feature-to-Improve-Cyber-Skills-Across-the-Technical-Workforce)
  - **Lab Builder AI Assistant [Livré, 20/10/2025]** : un lab entier se construit par conversation (ex. un lab sur Log4j). Passe des « heures aux minutes » [marketing éditeur] — [Immersive](https://www.immersivelabs.com/whats-new/ai-co-pilot) ; [support](https://support.immersivelabs.com/hc/en-us/articles/50467127879057-AI-Lab-Builder-Assitant)
  - Version 2.0 (17/12/2025) : mise à jour et modernisation des labs existants — [Immersive](https://www.immersivelabs.com/whats-new/beyond-content-creation-evolve-your-defense-with-lab-builder-ai-assistant-2-0)
- **pwn.college – SENSAI [Livré, gratuit ; article SIGCSE TS 2025]**
  - Tuteur LLM socratique, décrit comme reposant sur l'API GPT-4o. Il exploite le contexte de travail de l'apprenant (terminaux actifs, fichiers édités).
  - Déployé dans un cursus universitaire (R1) et ouvert à une communauté mondiale en ligne — [article SENSAI](https://adamdoupe.com/publications/sensai-cigcse2025.md) ; [SIGCSE 2025](https://sigcse2025.sigcse.org/details/sigcse-ts-2025-Papers/59/SENSAI-Large-Language-Models-as-Applied-Cybersecurity-Tutors)
  - Infrastructure open source : [pwncollege/dojo](https://github.com/pwncollege/dojo), 521 ★, BSD-2, dernier push 29/10/2026.
  - Plus de 50 000 apprenants ont résolu au moins un challenge en cinq ans — [SIGCSE 2026](https://adamdoupe.com/publications/pwn-college-five-years-sigcse2026.md)

#### DevOps, Linux, cloud
- **KodeKloud – AI Tutor [Livré, listé sur Product Hunt en juin 2026]**
  - L'apprenant tape un sujet et reçoit une micro-leçon personnalisée avec un **lab pratique**. L'outil peut **générer un sujet absent du catalogue**. Les labs tournent dans des environnements réels, pas simulés.
  - **Live Assist** « surveille le terminal en temps réel et intervient dès que quelque chose se passe mal » [marketing éditeur].
  - KodeKloud se distingue des « copilotes de lab », qui aident seulement à finir des labs existants — [KodeKloud AI Tutor](https://kodekloud.com/ai-tutor)
  - Un fil communautaire décrit deux volets : tuteur personnalisé et lab assisté par IA — [forum KodeKloud](https://kodekloud.com/community/t/how-ai-tutor-works/482247)
  - Accès gratuit, sans carte bancaire, selon le message du CEO Mumshad Mannambeth. Fiche Product Hunt datée de juin 2026, sans date exacte de lancement — [Product Hunt](https://www.producthunt.com/products/kodekloud-ai-tutor) ; [message du fondateur](https://www.producthunt.com/p/kodekloud-ai-tutor/ai-tutor-by-kodekloud)
  - Une offre « AI Assistant plan » existait auparavant (date inconnue) — [forum](https://kodekloud.com/community/t/unable-to-use-kodekloud-ai-assistant-plan-features/474956)
- **SadServers – pas d'IA trouvée, mais le modèle break/fix de référence**
  - Scénarios de dépannage interactifs sur de vraies VM cloud, avec indices, solutions et vérification de la solution — [FAQ](https://sadservers.com/faq) ; [docs](https://docs.sadservers.com/docs/faq/)
  - Offre Hobbyist gratuite avec limites quotidiennes. Les meilleurs scénarios sont payants. L'offre Business peut masquer indices et solutions et fixer une durée maximale — [FAQ](https://sadservers.com/faq)
  - SadServers se positionne aussi pour **tester et entraîner des agents IA** sur des tâches Linux/DevOps, et pour déjouer les « aides IA cachées » en entretien d'embauche — [SadServers Business](https://sadservers.com/solutions/business)
  - Dépôt [SadServers/sadservers](https://github.com/SadServers/sadservers) : 3 024 ★, dernier push 03/11/2026, licence non déclarée. Lancé sur Hacker News en octobre 2022 (2ᵉ place du jour) — [README](https://github.com/fduran/sadservers/blob/main/README.md)
- **iximiuz Labs – Labs MCP [Livré ; annoncé dans une newsletter « d'août », année non vérifiée]**
  - Serveur MCP officiel distant (labs.iximiuz.com/mcp). Il connecte Claude, ChatGPT, Claude Code, Codex ou Cursor aux playgrounds : lister, démarrer (`search_playgrounds`, `start_play`, `list_plays`) et parcourir les contenus.
  - Usages documentés : se faire aider sur un challenge, tester un script sur plusieurs distributions — [What is Labs MCP](https://labs.iximiuz.com/docs/labs-mcp/what-is-labs-mcp) ; [Labs MCP in practice](https://labs.iximiuz.com/docs/labs-mcp/labs-mcp-in-practice) ; [newsletter](https://newsletter.iximiuz.com/posts/serverlabs-mcp-and-the-cool-use-cases-it-unlocks-the-activity-log-and-other-features-that-landed-in-august)
  - Correction **déterministe** : les challenges vérifient l'**état final** du playground, quelles que soient les commandes utilisées, et proposent indices, retour et vérification automatique — [docs challenges](https://labs.iximiuz.com/docs/learning-materials/challenges)
  - iximiuz précise ne pas être « sur le marché du sandboxing d'agents » : les agents s'exécutent hors des playgrounds — [docs](https://labs.iximiuz.com/docs/labs-mcp/labs-mcp-in-practice)
  - Modèle freemium : chaque challenge résolu ajoute 5 min de temps quotidien ; 10 challenges donnent un mois Premium — [newsletter](https://newsletter.iximiuz.com/posts/get-better-playgrounds-by-solving-challenges)
  - CLI open source [iximiuz/labctl](https://github.com/iximiuz/labctl) : 462 ★, Apache-2.0.
- **LabEx – Labby [Livré]**
  - Assistant IA intégré aux labs (Linux, DevOps, cybersécurité) : guide, explique et commente le code à chaque étape — [LabEx](https://labex.io/) ; [Introduction à LabEx](https://labex.io/tutorials/linux-introduction-to-labex-178589)
  - Une fiche Product Hunt (LabEx Engineer) affirme que Labby « voit ce que vous faites dans l'environnement » et valide en temps réel. Source unique, à confirmer — [Product Hunt](https://www.producthunt.com/p/labex-beta/labex-engineer)
  - Le modèle sous-jacent (ChatGPT ou autre) varie selon les sources.
- **QA (platform.qa.com) – Ela dans les labs [Livré]**
  - Donne des indices, jamais la solution complète. **10 questions maximum par session.** Indisponible pendant les challenges, examens et quiz.
  - Couvre les labs cloud AWS, GCP, Azure et les labs de code. QA prévient que les réponses peuvent être inexactes — [QA help](https://support.platform.qa.com/hc/en-us/articles/27317615191700-Ela-Tutor-in-Labs) ; [QA blog](https://qa.com/resources/blog/introducing-ela-your-expert-learning-assistant)
- **Pluralsight / A Cloud Guru**
  - **Iris [Livré, 30/07/2024]** : utilise OpenAI et l'API de recherche Pluralsight (RAG sur le catalogue) pour orienter vers cours, labs et évaluations — [Pluralsight](https://www.pluralsight.com/resources/blog/news/iris-ai-assistant) ; [PR Newswire](https://prnewswire.com/news-releases/pluralsight-launches-ai-assistant-iris-to-accelerate-and-personalize-the-learning-experience-302209240.html)
  - AI Sandbox (avril 2026) et programme Cloud Ready (mai 2026) — [Pluralsight](https://www.pluralsight.com/resources/blog/news/2026-new-features-integrations-ilt) ; [Training Industry](https://trainingindustry.com/press-release/artificial-intelligence/pluralsight-launches-new-ai-sandbox-guided-learning-and-enterprise-integrations-to-help-teams-build-job-ready-tech-skills/)
  - **Pluralsight AI MCP [Livré, lancé le 14/10/2026 à la conférence Shift]**
    - Relie Claude Code, GitHub Copilot, Cursor, ChatGPT Enterprise, Gemini et Copilot Studio aux cours, labs et analyses. Sans surcoût.
    - Le blog annonce une disponibilité au 15/10/2026 pour les clients existants : légère discordance de date — [Pluralsight](https://www.pluralsight.com/resources/blog/news/2026-new-features-ai-mcp-skill-iq-suite) ; [communiqué](https://vendordirectory.shrm.org/company/866569/news/3890853/pluralsight-launches-ai-mcp-bringing-expert-led-learning-into-ai-workflows)
    - La page tarifs liste l'offre Teams avec « 2 500+ hands-on labs » et l'accès à AI MCP — [tarifs](https://pluralsight.com/businesses/pricing). Le communiqué Iris de 2024 annonçait 3 000 labs : chiffres discordants.
- **AWS Skill Builder**
  - **SimuLearn** : simulations où l'apprenant échange avec des « clients virtuels » IA puis construit dans la console AWS. Le parcours SimuLearn Generative AI Practitioner est gratuit — [AWS blog](https://aws.amazon.com/blogs/training-and-certification/introducing-aws-simulearn-generative-ai-practitioner)
  - Un **AWS Learning Assistant** répond en temps réel pendant les labs autonomes. Builder Labs : plus de 200 expériences guidées — [AWS pricing](https://aws.amazon.com/training/digital/pricing)
- **CBT Nuggets – IT Trainerbot [Livré, date non confirmée]**
  - Assistant IA qui répond aux questions IT à partir du contenu de formation CBT Nuggets.
  - La version de base n'inclut ni labs ni examens blancs. La version Plus, liée à un abonnement, donne accès aux labs — [annonce](https://www.cbtnuggets.com/blog/cbt-nuggets-launches-it-trainerbot-trusted-expert-answers-for-it-teams) ; [FAQ](https://www.cbtnuggets.com/support/it-trainerbot/it-trainerbot-overview-features-and-frequently-asked-questions)
  - Un agrégateur d'emplois date le lancement au 02/11/2026. Non confirmé — [Simplify](https://simplify.jobs/c/CBT-Nuggets)
- **INE – aucune fonction IA de lab trouvée.**
  - Skill Dive : plus de 2 400 labs (octobre 2023) — [INE](https://ine.com/newsroom/ine-introduces-skill-dive-2400-on-demand-labs-for-applied-learning-in-cybersecurity-networking-and-cloud-computing)
  - Cours « AI in Automation » (novembre 2025) — [INE](https://ine.com/newsroom/ine-debuts-hands-on-ai-automation-course)
- **Killercoda – aucune fonction IA trouvée.** La recherche n'a renvoyé que des dépôts de scénarios et un article ancien — [ITNEXT](https://itnext.io/katacoda-alternative-1d33599af75f)

#### Réseau (Cisco et simulateurs)
- **Cisco U. – AI Assistant [Livré]**
  - « Compagnon virtuel » d'IA générative pour le parcours d'apprentissage — [Cisco U.](https://u.cisco.com/ai-assistant)
  - Le Deep Network Model est accessible via cet assistant, réservé aux titulaires d'une certification de niveau expert active au 01/07/2025 — [Cisco blog](https://blogs.cisco.com/learning/cisco-u-ai-assistant-with-deep-network-model-use-cases)
- **Cisco – labs construits par IA via MCP (blog de Joe Clarke, Distinguished Engineer, date non trouvée)**
  - « Speak Your Lab into Existence » présente le nouveau serveur MCP de Cisco Modeling Labs (CML), qui donne à l'assistant IA « des mains » pour agir — [Cisco blog](https://blogs.cisco.com/learning/speak-your-lab-into-existence-with-ai-driven-cisco-modeling-labs-and-mcp)
  - Selon les extraits du blog Cisco Learning (billet principal ou billet connexe, l'attribution exacte n'a pas pu être vérifiée), l'assistant crée le lab, ajoute et relie les nœuds, configure OSPF, puis vérifie les voisinages OSPF. Une démo utilise un modèle local via LM Studio.
- **Cisco Live US 2026 (juin)** : nouveau référentiel CCNA, **outils IA intégrés à l'examen pratique CCIE**, formation CCNA sur Cisco U. avec scénarios intégrés. Aucun « lab IA » dédié aux apprenants n'a été trouvé — [Cisco blog](https://blogs.cisco.com/learning/the-skills-payload-whats-landing-at-cisco-live-us-2026)
- **Packet Tracer / Networking Academy** : aucun assistant IA officiel trouvé dans Packet Tracer. Les résultats « IA + Packet Tracer » viennent de tiers (NetPilot, bibliothèques de prompts). Le Cisco AI Assistant vise l'exploitation (Meraki, Catalyst Center) — [Cisco AI Assistant](https://www.cisco.com/c/en/us/solutions/collateral/artificial-intelligence/ai-assistant-so.html)
- **Boson NetSim** : aucune fonction IA trouvée. Les résultats « NetSim + IA » concernent TETCOS NetSim, un produit 5G/6G sans rapport — [comparatif NetPilot](https://www.netpilot.io/blog/boson-netsim-alternative)
- **NetPilot (netpilot.io) – agent IA commercial de labs réseau [Livré, 2026]**
  - Transforme une **description en anglais courant** ou des configurations importées en **lab multi-constructeurs déployé**, avec de vrais CLI.
  - Nokia SR Linux est inclus. Les autres OS (Cisco, Juniper, Arista, Palo Alto, Fortinet, Aruba, Dell, SONiC, « 14+ NOS ») s'ajoutent en apportant ses propres images (« BYOI ») — [everydev](https://www.everydev.ai/tools/netpilot) ; [NetPilot](https://netpilot.io/cisco-cml-alternative)
  - Déploiement : cloud NetPilot, environnement dédié, auto-hébergé, ou isolé (air-gapped) avec un LLM local [marketing éditeur] — [everydev](https://www.everydev.ai/tools/netpilot)
  - **Injection de pannes** : « reproduire des bugs multi-constructeurs, injecter des pannes ». Démo : maillage FRR de 5 nœuds avec pertes de liens aléatoires, puis test de latence et de pertes [marketing éditeur] — [NetPilot research lab](https://www.netpilot.io/network-research-lab)
  - **Tuteur IA** qui « corrige la config, explique ce qui a cassé » et réexporte un `.pkt` Packet Tracer fonctionnel [marketing éditeur] — [NetPilot CCNA](https://netpilot.io/ccna-practice-lab) ; [Packet Tracer helper](https://netpilot.io/packet-tracer-helper)
  - Prix : offre gratuite et **Pro à 15 $/mois** selon un annuaire tiers (non confirmé par l'éditeur) — [everydev](https://www.everydev.ai/tools/netpilot)
  - Organisation GitHub créée le 17/04/2026 : [netpilot-labs/example-prompts](https://github.com/netpilot-labs/example-prompts) (7 ★), [netpilot-labs/community](https://github.com/netpilot-labs/community) (3 ★).

#### Plateformes B2B de création et diffusion de labs
- **Instruqt**
  - Génération de lab par IA : Labs → Create lab → **With AI**, avec une étape de « plan » à approuver avant la génération — [docs génération](https://docs.labs.instruqt.com/ai-lab-generation/generating-a-lab/) ; [docs plan](https://docs.labs.instruqt.com/ai-lab-generation/lab-plan/)
  - **Plugin Claude Code pour construire des parcours [Livré, juin 2026]** : il génère consignes, onglets, ressources de sandbox et scripts de cycle de vie, challenge par challenge ou en lot.
  - Le même lancement ajoute le support natif de Vertex AI, Amazon Bedrock et de calcul GPU — [docs](https://docs.instruqt.com/ai-capabilities/building-with-ai) ; [TechIntelPro](https://techintelpro.com/news/ai/enterprise-ai/instruqt-debuts-ai-assisted-content-creation-with-native-vertex-ai-and-bedrock)
- **Skillable [GA, août 2026, clients volontaires]**
  - IA intégrée à tout le cycle de vie du lab : création, diffusion et **validation** — [Training Industry](https://trainingindustry.com/press-release/artificial-intelligence/skillable-launches-ai-capabilities-across-the-entire-lab-lifecycle-including-authoring-delivery-and-validation/) ; [IT Brief AU, 25/08/2026](https://itbrief.com.au/story/skillable-launches-ai-tools-across-lab-training-workflow)
  - **AI Practice Generator** : l'apprenant saisit une invite et l'IA crée une **nouvelle tâche pratique dans l'environnement de lab actif**. Les auteurs peuvent plafonner l'usage — [docs](https://docs.skillable.com/docs/practice-generator)
  - IA **agnostique du modèle** : l'organisation peut **brancher ses propres modèles** — [docs Skillable AI](https://docs.skillable.com/docs/skillable-ai)
  - « Chat Assistant » : tuteur au périmètre restreint — [docs](https://docs.skillable.com/docs/chat-assistant)

#### Outils de « pannes simulées par LLM » (sans vraie infrastructure)
- **Scenar.io** : une IA joue à la fois le serveur à diagnostiquer et l'examinateur, pour préparer des entretiens DevOps. L'auteur en a fait un produit à partir de ses sessions d'entraînement avec Claude — [DEV](https://dev.to/fock1e/why-i-built-scenario-an-ai-powered-devops-interview-practice-tool-2ha4)

### Inferences
- Les fonctions IA commerciales se rangent en **quatre familles** :
  - **(a) tuteur ou indices dans le lab**, souvent avec des garde-fous : pas de solution complète, quotas comme les 10 questions d'Ela ;
  - **(b) génération de labs pour les auteurs** : Instruqt, Immersive, Skillable ;
  - **(c) génération à la demande par l'apprenant** : KodeKloud, Skillable ;
  - **(d) exposition MCP** pour que l'utilisateur branche sa propre IA : HTB CTF, iximiuz, Pluralsight.
- Le **mode « l'IA casse en secret, l'apprenant répare, vérification automatique »** n'est pas une fonction documentée chez les acteurs grand public. Le break/fix existe (SadServers, défis iximiuz) mais avec des **scénarios écrits à la main** et une vérification par état.
- **Aucun acteur commercial n'est « local sur PC »** pour l'apprenant ; seul NetPilot propose de l'auto-hébergé (offre entreprise). **Le BYOK côté apprenant est absent** : l'IA est payée et choisie par l'éditeur. Skillable ne le permet qu'au niveau de l'organisation cliente.
- La tendance 2025-2026 consiste à **exposer la plateforme en MCP** plutôt qu'à imposer son propre chatbot (HTB, iximiuz, Pluralsight). C'est cohérent avec le mode « IA connectée via MCP » de l'idée.

### Gaps
- **Prix non trouvés ou non publics** : TryHackMe (montants Premium et MAX), HTB Academy et HTB Coach, Instruqt, Skillable et Immersive (B2B sur devis), SadServers (montants des offres payantes), LabEx, KodeKloud (hors AI Tutor gratuit).
- **Dates non trouvées** : Immersive AI In-Lab Assistant, billet Cisco « Speak Your Lab into Existence », lancement exact de Labs MCP (iximiuz) et d'IT Trainerbot (CBT Nuggets).
- **Plans incluant Echo** (TryHackMe) : aucune source.
- **A Cloud Guru** : aucune fonction IA propre, distincte de Pluralsight, n'a été identifiée.
- **NetPilot** : on ignore si l'IA choisit seule les pannes, si elles sont réversibles et si la réparation de l'apprenant est vérifiée. La documentation n'a pas pu être consultée directement.

## 2. Projets open source où un LLM construit, configure ou casse des environnements de lab

### Takeaway
Le mode **« l'IA construit le lab »** est largement couvert par des serveurs MCP et agents open source, surtout réseau : GNS3, Packet Tracer, CML, EVE-NG, Containerlab, NetClaw. Mais l'écosystème est **très jeune** (dépôts créés en 2025-2026) et fragmenté. Le mode **« l'IA casse »** est rare. Le projet le plus abouti est **GNS3 3.1**, encore en **alpha** (3.1.0a7, 21/10/2026). Il intègre un assistant IA à trois volets (assistant pédagogique, automatisation de lab, injection de pannes), un catalogue de **50 pannes en YAML** (GNS3/gns3-skills) et un **service MCP de 82 outils**, avec la clé API de l'utilisateur. Pour les systèmes et Kubernetes, l'injection de pannes avec correction automatique existe dans des cadres conçus pour **évaluer des agents IA**, pas des humains : AIOpsLab, SREGym, ITBench, ChaosEater (voir §4). La **vérification automatique de la réparation humaine** se trouve surtout dans des outils sans IA (BrokenOps, SadServers) ou dans des prototypes minuscules.

### Cited Findings

#### GNS3 : le cas le plus proche de l'idée, côté réseau
- **GNS3 3.1 – AI Assistant (« GNS3 Copilot ») [Alpha/préversion]**
  - Né comme projet communautaire de Guobin Yue (yueguobin), il est **intégré à GNS3 3.1**. Il s'appuie sur des LLM pour gérer la topologie, diagnostiquer des pannes et automatiser la configuration — [docs GNS3 3.1](https://docs.gns3.com/docs-3.1-en/ai-tools/use-ai-assistant)
  - **Mode « Teaching Assistant »** : questions en langage naturel sur la topologie, avec des outils en lecture seule (diagnostic, analyse de paquets, gestion des nœuds). **Il ne peut pas modifier les configurations**, ce qui est réservé au mode « Lab Automation Assistant » — [docs GNS3](https://docs.gns3.com/docs-3.1-en/ai-tools/use-ai-assistant)
- **GNS3 3.1 – injection de pannes**
  - L'IA analyse la topologie, choisit le type de panne et l'injecte pour entraîner au dépannage.
  - Le mode d'injection dispose d'un outil de filtre de paquets (délai, perte, corruption sur les liens), d'un outil de configuration par lots et d'un outil de lecture des configurations. Point d'entrée `POST /chat/inject` ; le projet doit être ouvert, sinon erreur 403.
  - À la fin, le **panneau de l'assistant liste les étapes de l'injection**, utile « si vous n'êtes pas sûr de la cause » — [docs fault injection](https://docs.gns3.com/docs-3.1-en/ai-tools/use-fault-injection)
  - Un extrait indique que chaque panne est livrée avec des commandes de récupération ; un second extrait de la même page ne le confirme pas : **point à vérifier**.
- **GNS3/gns3-skills (officiel GNS3) [Livré comme dépôt]**
  - « Prompts d'agent, compétences par équipement et compétences d'injection de pannes pour GNS3 » : **50 fichiers YAML de pannes**, chargés dans un registre interrogé par l'assistant.
  - Dépôt : 6 ★, GPL-3.0, créé le 25/05/2026, dernier push 03/11/2026 — [GitHub](https://github.com/GNS3/gns3-skills) ; [docs AI skills](https://docs.gns3.com/docs-3.1-en/ai-tools/use-ai-skills)
- **GNS3 3.1 – service MCP intégré**
  - **82 outils en 12 catégories** selon la documentation, 84 selon la PR de fusion. L'outil `injection_skill_get` expose le savoir sur les pannes aux clients MCP externes.
  - PR #3039 de yueguobin, fusionnée dans la branche 3.1 : transport Streamable HTTP, outils de connaissance des skills — [docs MCP](https://docs.gns3.com/docs-3.1-en/ai-tools/use-mcp-service) ; [PR #3039](https://github.com/GNS3/gns3-server/pull/3039)
- **GNS3 – BYOK**
  - L'utilisateur fournit sa propre clé. Les préréglages documentés sont DeepSeek, Anthropic et xAI.
  - La FAQ évoque un LLM local pour les réseaux isolés. Ollama n'est pas explicitement confirmé — [FAQ GNS3](https://docs.gns3.com/docs-3.1-en/faq/ai-assistant) ; [guide de configuration](https://yueguobin.github.io/gns3-copilot/user/llm-quick-configuration-guide)
- **GNS3 – maturité**
  - Sur PyPI, `gns3-server` 3.1 n'existe qu'en alpha : 3.1.0a1 (25/04/2026), puis a2 (12/05), a3 (06/06), a4 (09/07), a5 (19/08), a6 (27/09), a7 (21/10/2026). **La dernière version stable est la 3.0.6 (28/01/2026)** — [PyPI gns3-server](https://pypi.org/project/gns3-server/) ; [blog GNS3 alpha 3](https://www.gns3.com/community/blog/gns3-3-1-0-alpha-3-released)
  - Dépôts : [GNS3/gns3-gui](https://github.com/GNS3/gns3-gui) 2 669 ★ ; [GNS3/gns3-server](https://github.com/GNS3/gns3-server) 1 046 ★ (GPL-3.0, push 13/11/2026).
- **gns3-copilot (projet d'origine)**
  - Dépôt [yueguobin/gns3-copilot](https://github.com/yueguobin/gns3-copilot) : 48 ★, créé le 08/09/2025, dernier push 01/08/2026, workflow d'agent LangGraph.
  - PyPI 0.0.1 (06/12/2025) à 0.3.0 (13/01/2026), 22 versions — [PyPI](https://pypi.org/project/gns3-copilot/) ; [architecture](https://yueguobin.github.io/gns3-copilot/architecture)
  - La feuille de route annonce un système multi-agents (agent d'exécution, agent de supervision) et un empaquetage en serveur MCP — [annonce du projet](https://yueguobin.github.io/gns3-copilot/project-announcement)

#### Autres émulateurs réseau : l'IA construit ou configure le lab
- **Packet Tracer**
  - [Mats2208/MCP-Packet-Tracer](https://github.com/Mats2208/MCP-Packet-Tracer) : **377 ★**, MIT, créé le 08/03/2026, push 11/11/2026. « Décrivez un réseau en langage naturel : il génère, valide et déploie des topologies complètes. »
  - Autres : [muhammadbalawal/cisco-pt-mcp](https://github.com/muhammadbalawal/cisco-pt-mcp) (37 ★) ; [Jcorderop02/packet-tracer-mcp](https://github.com/Jcorderop02/packet-tracer-mcp) (15 ★, Packet Tracer 9 : OSPF, BGP, VLAN, NAT, VoIP) ; [A-Town-corp/MCP-Packet-Tracer](https://github.com/A-Town-corp/MCP-Packet-Tracer) (6 ★, 60 outils).
- **Cisco Modeling Labs (CML)**
  - [xorrkaz/cml-mcp](https://github.com/xorrkaz/cml-mcp) : 80 ★, BSD-2, créé le 09/08/2025, push 10/11/2026. Publié par Joe Clarke (Cisco) et promu sur le blog Cisco.
  - PyPI 0.1.0 (09/08/2025) à **0.40.0 (03/11/2026), 63 versions** : projet très actif — [PyPI cml-mcp](https://pypi.org/project/cml-mcp/) ; [blog Cisco](https://blogs.cisco.com/learning/speak-your-lab-into-existence-with-ai-driven-cisco-modeling-labs-and-mcp)
- **EVE-NG** : uniquement des serveurs MCP communautaires, aucun officiel (détail au §3). Prototype [Hany-elnour/network-lab-orchestrator](https://github.com/Hany-elnour/network-lab-orchestrator) (0 ★, MIT, 2026) : Claude, MCP, Docker et l'API EVE-NG pour générer, configurer et gérer des labs de niveau CCNA/CCNP.
- **Containerlab – NetClaw**
  - [automateyournetwork/netclaw](https://github.com/automateyournetwork/netclaw) : **727 ★**, Apache-2.0, créé le 19/02/2026, push 13/11/2026.
  - Se décrit comme un « agent IA d'ingénierie réseau niveau CCIE » [description du projet], basé sur OpenClaw et Claude. Il pilote pyATS, ContainerLab, CML et NSO.
  - La compétence `clab-lab-management` déploie des topologies décrites en JSON. Le nombre de skills varie selon les sources (42 à 98) — [README](https://raw.githubusercontent.com/automateyournetwork/netclaw/main/README.md) ; [skills.sh](https://skills.sh/automateyournetwork/netclaw/clab-lab-management)
- **Containerlab – autres projets**
  - [JNPRAutomate/agentic-ai-workshop](https://github.com/JNPRAutomate/agentic-ai-workshop) : atelier Juniper sur l'IA agentique avec serveurs MCP JunOS et Linux. 18 ★, MIT.
  - [pdudotdev/aiNOC](https://github.com/pdudotdev/aiNOC) : cadre de dépannage réseau multi-constructeurs basé sur Claude Code et FastMCP. 14 ★, GPL-3.0.
  - [gesh75/multivendor-ai-network-lab](https://github.com/gesh75/multivendor-ai-network-lab) : lab de 26 équipements avec remédiation automatique encadrée par niveau de risque. 11 ★.
- **Générateurs de topologies depuis du texte [Prototypes]**
  - [Custodia-Systems/Cuna](https://github.com/Custodia-Systems/Cuna) : topologies GNS3 et Packet Tracer (1 ★).
  - [soferf/netlab-ai](https://github.com/soferf/netlab-ai) : `.pkt` générés par LLM + LoRA (0 ★).
  - [sjohnston1972/netbud](https://github.com/sjohnston1972/netbud) : topologies Containerlab, GNS3 et draw.io (1 ★).
  - [joxorsayan/netsim](https://github.com/joxorsayan/netsim) : simulateur web avec CLI type IOS, capture pcap et **tuteur IA exécuté sur l'appareil**. 11 ★, MIT, 21/06/2026.

#### Prototypes où l'IA casse ou génère des scénarios de panne
- [ah7m02/bgp-fault-platform](https://github.com/ah7m02/bgp-fault-platform) (1 ★, 24/07/2026) : « Plateforme d'injection et de **validation** de pannes BGP pour un lab Cisco multi-AS. **Un LLM génère les scénarios de panne dans un schéma contraint** ; le backend [les valide]. » C'est exactement le mode 3, sous forme de prototype.
- [Yuchuwa/CVELab](https://github.com/Yuchuwa/CVELab) (1 ★, MIT) : l'IA décompose des CVE en scénarios ContainerLab de formation reproductibles.
- [TrueFurina/2025-Challenge-Cup-CyberRange-AI-Arena](https://github.com/TrueFurina/2025-Challenge-Cup-CyberRange-AI-Arena) (2 ★) : cyber range dynamique piloté par LLM, agents rouge et bleu, génération automatique de topologie.
- [rishavnandi/chaos_lab](https://github.com/rishavnandi/chaos_lab) (0 ★, 05/11/2026) : « terrain d'incidents » en terminal, bacs à sable Linux isolés, **correction déterministe**, tutorat IA optionnel.
- [torm89/eks-incident-lab](https://github.com/torm89/eks-incident-lab) (0 ★) : 15 scénarios de chaos sur Amazon EKS (cloud), à détecter, diagnostiquer et corriger.
- [chryaner/terrarium](https://github.com/chryaner/terrarium) (1 ★) : VM jetables à « forker, casser et restaurer » en CLI ou via MCP.
- [iknowjason/AutomatedEmulation](https://github.com/iknowjason/AutomatedEmulation) (222 ★, MIT, dernier push 23/11/2025) : lab d'émulation d'adversaire automatisé, avec Terraform et un serveur MCP, pour construire des opérations Caldera assistées par LLM.
- **ChaosEater** — [ntt-dkiku/chaos-eater](https://github.com/ntt-dkiku/chaos-eater) (33 ★, ASE 2025 NIER) : un LLM automatise tout le cycle de chaos engineering sur Kubernetes géré en IaC (détail au §4).
- **Lab Rescue Agent** : système multi-agents qui réparent des labs de certification en échec (triage, puis plan de correction, de retour arrière et de **vérification**), testé sur scénarios synthétiques — [ecosyste.ms](https://awesome.ecosyste.ms/projects/github.com%2Farmando71988padilla-cloud%2Flab-rescue-agent)

#### Break/fix et vérification automatique, sans IA (bases réutilisables)
- **BrokenOps** — [HimanM/BrokenOps](https://github.com/HimanM/BrokenOps) : 2 ★, MIT, créé le 05/06/2026, push 04/08/2026.
  - Plateforme open source qui lance **localement des VM Ubuntu volontairement cassées**, sur KVM/libvirt avec des disques overlay qcow2.
  - Terminal dans le navigateur, **vérification automatique par scripts de correction**, progression gamifiée.
  - **Linux natif uniquement** (ni WSL2 ni Docker Desktop) — [site](https://himanm.github.io/BrokenOps/)
- **SecGen** — [SecGen/SecGen](https://github.com/SecGen/SecGen) (316 ★, GPL-3.0) : générateur de VM vulnérables aléatoires (pré-LLM). Le dépôt d'origine n'a plus bougé depuis 2019 ; le développement se poursuit dans le fork cliffe/SecGen.
- **openSUSE Hack Week** : proposition d'outil « qui casse un OS Linux et exige de le réparer », décliné pour Rancher/Kubernetes. C'est une proposition, pas un outil fini — [Hack Week](https://hackweek.opensuse.org/24/projects/rancher-slash-k8s-trouble-maker)

#### Tuteurs IA open source orientés pratique
- [skillcoco/skillcoco](https://github.com/skillcoco/skillcoco) (9 ★, MIT, 16/07/2026) : « application **desktop** open source, utilisable hors ligne, apprentissage adaptatif, **labs en terminal**, **tuteur IA BYOK** ». C'est la forme la plus proche de l'idée (desktop + BYOK), sans infrastructure lourde ni injection de pannes documentée.
- [BSinghOP/Kronex](https://github.com/BSinghOP/Kronex) (1 ★) : copilote local pour apprendre la cybersécurité (CTF, labs autorisés).
- [spectra142/labtutor](https://github.com/spectra142/labtutor) (0 ★) : tuteur cybersécurité hors ligne sur LLM local, outils de pentest sur liste blanche.

#### Agents IA d'exploitation (diagnostic, pas pédagogie)
- [k8sgpt-ai/k8sgpt](https://github.com/k8sgpt-ai/k8sgpt) : 8 325 ★, Apache-2.0.
- [HolmesGPT/holmesgpt](https://github.com/HolmesGPT/holmesgpt) : 3 882 ★, « SRE Agent – CNCF Sandbox Project ».
- [kagent-dev/kagent](https://github.com/kagent-dev/kagent) : 4 269 ★.
- Agents homelab via MCP : [Higangssh/homebutler](https://github.com/Higangssh/homebutler) (357 ★) ; [SikamikanikoBG/homelab-monitor](https://github.com/SikamikanikoBG/homelab-monitor) (236 ★, MCP en lecture seule) ; [jmagar/claude-homelab](https://github.com/jmagar/claude-homelab) (87 ★) ; [bjeans/homelab-mcp](https://github.com/bjeans/homelab-mcp) (44 ★).

#### Pratiques « à la main » rapportées par la communauté
- Un utilisateur décrit Claude en « surveillant d'examen Kubernetes strict » : Claude construit l'environnement, montre l'état sain, **puis introduit une panne réelle aléatoire** — [LinkedIn](https://my.linkedin.com/in/velanthekamalai)
- Un auteur a branché AIOpsLab sur son homelab. Il annonce un diagnostic ramené de 30 à 5 min en moyenne sur 12 incidents (témoignage personnel) — [blog](https://williamzujkowski.github.io/posts/i-built-an-ai-agent-to-debug-my-homelab-llm-powered-incident-response-with-aiopslab)
- Fil Level1Techs sur un agent LLM d'installation et de dépannage de homelab, testé sur des pannes provoquées « par erreur » — [Level1Techs](https://forum.level1techs.com/t/homelab-llm-driven-sysadmin/253100)
- Retour d'expérience prudent : un agent unique chargé de nettoyer un service a redémarré un autre serveur. L'auteur a ensuite séparé les agents et ajouté des contraintes explicites « MAY / NEVER » — [DEV](https://dev.to/stevenjvik/i-ran-7-autonomous-ai-agents-on-my-homelab-proxmox-cluster-heres-what-actually-happened-43ka)

### Inferences
- **Construire** un lab avec un LLM est devenu banal pour les outils réseau via MCP. Les briques sont matures pour Packet Tracer, CML et GNS3, plus fragiles pour EVE-NG et Containerlab.
- **Casser intelligemment et vérifier la réparation d'un humain** reste presque vide en open source. Seul GNS3 3.1 l'industrialise, et seulement côté réseau ; le reste, ce sont des prototypes à 0–2 ★.
- Le **catalogue de pannes YAML de GNS3** (GPL-3.0) et la logique « pannes connues + vérification d'état » de BrokenOps et SadServers sont des modèles directs pour le mode 3. Attention à la licence : la GPL-3.0 de gns3-skills impose la réciprocité en cas de réutilisation du code.
- Beaucoup de dépôts « AI cyber range » portent en réalité sur **l'attaque des LLM** (OWASP Top 10 LLM), pas sur des labs construits par IA. Il faut éviter la confusion dans l'inventaire.

### Gaps
- Le texte complet des pages docs.gns3.com (types exacts des 50 pannes, existence d'une **vérification automatique de la réparation**, échelle d'indices, masquage de la solution) n'a pas pu être lu directement. Seuls des extraits ont été consultés.
- Aucun projet open source trouvé ne couvre **stockage (SAN iSCSI/FC, NAS), ESXi imbriqué ou Wi-Fi** dans un mode « l'IA construit ou casse ». Dans les recherches « mininet + LLM », seul [bps90/llms-mininet-wifi](https://github.com/bps90/llms-mininet-wifi) touche au Wi-Fi (0 ★, contenu inconnu).
- La qualité réelle des prototypes cités n'a pas été évaluée (pas d'installation ni de test).

## 3. Serveurs MCP pour les outils de lab et d'infrastructure : lesquels existent, qui les maintient, quelle maturité, quelles opérations ?

### Takeaway
Des **serveurs MCP officiels** existent pour :
- **Docker** : MCP Gateway, 1,6 k★ ;
- **Terraform** : HashiCorp, 1,6 k★ ;
- **Kubernetes** : containers/kubernetes-mcp-server, 2,2 k★ ;
- **Ansible Automation Platform** : Red Hat, préversion technique, avec un statut GA discordant ;
- **TrueNAS**, **NetBox** ;
- **GNS3** : intégré à la 3.1, en alpha ;
- **CML** : serveur publié par un ingénieur Cisco et promu par Cisco ;
- les plateformes **iximiuz Labs**, **HTB (CTF)** et **Pluralsight**.

Pour **Proxmox, VMware ESXi/vCenter/Workstation, VirtualBox, Hyper-V, libvirt/QEMU, Vagrant, EVE-NG et Containerlab**, il n'existe que des serveurs **communautaires**, de qualité inégale. Le plus populaire est ProxmoxMCP-Plus (649 ★) ; beaucoup plafonnent sous 100 ★, et certains sont déjà abandonnés. **Aucun serveur MCP Wi-Fi ou SAN** n'a été trouvé.

### Cited Findings

Données GitHub relevées le 13/11/2026 : étoiles, date de création, dernier push, licence. « Officiel » signifie publié par l'éditeur ou son organisation GitHub.

| Outil | Serveur MCP (mainteneur) | Maturité (★, création → dernier push, licence) | Opérations annoncées | Source |
|---|---|---|---|---|
| **GNS3** | Service MCP **intégré à GNS3 3.1** (officiel) | Alpha (3.1.0a7, 21/10/2026) | 82 outils, 12 catégories ; `injection_skill_get` (pannes) | [docs](https://docs.gns3.com/docs-3.1-en/ai-tools/use-mcp-service) ; [PR #3039](https://github.com/GNS3/gns3-server/pull/3039) |
| GNS3 | ChistokhinSV/gns3-mcp (communautaire) | 17 ★, 30/10/2025 → 07/11/2026, MIT ; PyPI 0.45.0 (01/11/2025) → 0.56.6 (07/11/2026), 32 versions | « Automatisation de labs GNS3, intégration agent IA » | [GitHub](https://github.com/ChistokhinSV/gns3-mcp) ; [PyPI](https://pypi.org/project/gns3-mcp/) |
| GNS3 | Wael-Rd/gns3-mcp-server ; Olaw2jr/gns3-mcp | 28 ★ (dernier push 06/01/2026) ; 2 ★ | Simulation pilotée par IA ; API du contrôleur v3 + automatisation de la console | [GitHub](https://github.com/Wael-Rd/gns3-mcp-server) ; [GitHub](https://github.com/Olaw2jr/gns3-mcp) |
| **EVE-NG** | moimran/eveng-mcp (communautaire) | 15 ★, 11/06/2025 → 11/06/2025 (inactif) | Transports stdio/SSE, configuration Claude Desktop | [GitHub](https://github.com/moimran/eveng-mcp) ; [Glama](https://glama.ai/mcp/servers/moimran/eveng-mcp) |
| EVE-NG | madmickstar/mcp_eveng ; jmtech-pro/eveng-mcp ; axiom-works-ai/eveng-mcp-server | 1 ★ (MIT, push 10/10/2026) ; 2 ★ ; 2 ★ | API REST complète, 3 transports ; labs, nœuds, liens, commandes console | [GitHub](https://github.com/madmickstar/mcp_eveng) ; [GitHub](https://github.com/jmtech-pro/eveng-mcp) ; [PyPI](https://pypi.org/project/eveng-mcp-server) |
| **CML** | xorrkaz/cml-mcp (Joe Clarke, Cisco) | 80 ★, 09/08/2025 → 10/11/2026, BSD-2 ; PyPI 0.40.0 (03/11/2026) ; CML ≥ 2.9 | Créer un lab, ajouter et relier des nœuds, configurer (OSPF), vérifier les voisinages (d'après les extraits du blog Cisco Learning) | [GitHub](https://github.com/xorrkaz/cml-mcp) ; [blog Cisco](https://blogs.cisco.com/learning/speak-your-lab-into-existence-with-ai-driven-cisco-modeling-labs-and-mcp) |
| **Containerlab** | Aucun serveur MCP officiel ; srl-labs/clab-api-server (officiel, **REST**) | 31 ★, 12/04/2025 → 13/11/2026, Apache-2.0 | API REST de containerlab, socle des MCP communautaires | [GitHub](https://github.com/srl-labs/clab-api-server) ; [présentation Nokia](https://hunog.hu/wp-content/uploads/2025/09/08_Gidofalvy_Nokia_Containerlab-HUNOG3.pdf) |
| Containerlab | FloSch62/clab-mcp-server ; seanerama/clab-mcp-server ; baijuw/clab-mcp-server | 13 ★ (01/05/2025, inactif, « expérimental ») ; 4 ★ ; 3 ★ | Gestion de topologies via l'API containerlab | [GitHub](https://github.com/FloSch62/clab-mcp-server) ; [mcp.so](https://mcp.so/servers/clab-mcp-server) ; [GitHub](https://github.com/seanerama/clab-mcp-server) |
| **Packet Tracer** | Mats2208/MCP-Packet-Tracer (communautaire) | 377 ★, 08/03/2026 → 11/11/2026, MIT | Générer, valider et déployer des topologies (OSPF…) | [GitHub](https://github.com/Mats2208/MCP-Packet-Tracer) |
| **Proxmox VE** | RekklesNA/ProxmoxMCP-Plus (communautaire) | **649 ★**, 23/05/2025 → 10/11/2026, MIT | VM, LXC, sauvegardes, snapshots via MCP et OpenAPI, « en sécurité » | [GitHub](https://github.com/RekklesNA/ProxmoxMCP-Plus) |
| Proxmox VE | canvrno/ProxmoxMCP ; GethosTheWalrus/proxmox-mcp ; ry-ops/proxmox-mcp-server | 298 ★ (dernier push 19/02/2025, inactif) ; 235 ★ ; 81 ★ (MIT) | VM, conteneurs, stockage, cluster | [GitHub](https://github.com/canvrno/ProxmoxMCP) ; [GitHub](https://github.com/GethosTheWalrus/proxmox-mcp) ; [GitHub](https://github.com/ry-ops/proxmox-mcp-server) |
| **VMware vCenter/ESXi** | vmware-skills/VMware-AIops (communautaire, pas Broadcom) | 87 ★, 25/02/2026 → 13/11/2026, MIT | Cycle de vie des VM, déploiement, opérations dans l'invité, contrôles de politique, journal d'audit ; projets frères Monitor, NSX, VKS, Harden | [GitHub](https://github.com/vmware-skills/VMware-AIops) ; [Glama](https://glama.ai/mcp/servers/vmware-skills/VMware-AIops) |
| VMware ESXi | bright8192/esxi-mcp-server ; giuliolibrando/vmware-vsphere-mcp-server ; Nginx1/esxi-mcp | 65 ★ (dernier push 01/07/2025) ; 27 ★ ; 1 ★ | Gestion de VM ; vCenter ; 63 outils, OVF, ESXCLI | [GitHub](https://github.com/bright8192/esxi-mcp-server) ; [GitHub](https://github.com/giuliolibrando/vmware-vsphere-mcp-server) ; [GitHub](https://github.com/Nginx1/esxi-mcp) |
| VMware (Broadcom) | « VCF Code Assist MCP Server » (Fling **expérimental**) | Non supporté | Génération de code pour les SDK VCF, sans pilotage de l'infrastructure | [William Lam](https://williamlam.com/tag/mcp) |
| **VMware Workstation** | ZacharyZcR/vmware-mcp | 75 ★, 15/01/2026 → 15/01/2026 (aucune activité depuis) | Contrôle des VM de Workstation Pro | [GitHub](https://github.com/ZacharyZcR/vmware-mcp) |
| **VirtualBox / Hyper-V** | sandraschi/virtualization-mcp | 20 ★, 06/10/2025 → 06/11/2026, MIT | VirtualBox, Hyper-V, Windows Sandbox : VM, réseau, stockage, snapshots | [GitHub](https://github.com/sandraschi/virtualization-mcp) |
| Hyper-V | originsec/hyperv-mcp ; n2ns/hyper-hand | 17 ★ (Apache-2.0, 13/05/2026) ; 5 ★ | Gestion des VM et exécution dans l'invité ; captures d'écran, clavier et souris, checkpoints | [GitHub](https://github.com/originsec/hyperv-mcp) ; [GitHub](https://github.com/n2ns/hyper-hand) |
| VirtualBox / Vagrant | usemanusai/Virtualbox-mcp-server ; gitrgoliveira/vagrant-mcp-server | 7 ★ ; 4 ★ (dernier push 04/08/2025) | VM VirtualBox et Vagrant | [GitHub](https://github.com/usemanusai/Virtualbox-mcp-server) ; [GitHub](https://github.com/gitrgoliveira/vagrant-mcp-server) |
| **libvirt / QEMU (KVM)** | MatiasVara/libvirt-mcp ; Neanderthal/mcp-qemu-vm | 11 ★ (« expérimental », dernier push 23/07/2025) ; 25 ★ (MIT, 24/06/2026) | Domaines libvirt ; contrôle de VM QEMU | [GitHub](https://github.com/MatiasVara/libvirt-mcp) ; [GitHub](https://github.com/Neanderthal/mcp-qemu-vm) |
| **Docker** | docker/mcp-gateway (**officiel Docker**) | 1 632 ★, 22/04/2025 → 26/10/2026, MIT | Plugin CLI `docker mcp` / passerelle pour exécuter des serveurs MCP | [GitHub](https://github.com/docker/mcp-gateway) |
| Docker | ckreiling/mcp-server-docker ; QuantGeekDev/docker-mcp | 756 ★ (GPL-3.0, 07/08/2026) ; 504 ★ (dernier push 14/12/2024, inactif) | Pilotage de Docker (conteneurs…) | [GitHub](https://github.com/ckreiling/mcp-server-docker) ; [GitHub](https://github.com/QuantGeekDev/docker-mcp) |
| **Kubernetes** | containers/kubernetes-mcp-server | **2 246 ★**, 11/02/2025 → 13/11/2026, Apache-2.0 | Kubernetes et OpenShift | [GitHub](https://github.com/containers/kubernetes-mcp-server) |
| Kubernetes | Flux159/mcp-server-kubernetes ; rohitg00/kubectl-mcp-server | 1 612 ★ (MIT) ; 972 ★ (« publié dans le CNCF Landscape ») | Commandes de gestion Kubernetes | [GitHub](https://github.com/Flux159/mcp-server-kubernetes) ; [GitHub](https://github.com/rohitg00/kubectl-mcp-server) |
| **Ansible** | MCP server for Red Hat AAP (**officiel Red Hat**) ; dépôt ansible/aap-mcp-server | Préversion technique dans AAP 2.6.4 (pod, port 8448 HTTPS) et 2.7 ; GA selon Network World ; dépôt 34 ★, 15/10/2025 → 03/11/2026, Apache-2.0 | Accès des outils IA au contrôleur AAP, avec limites | [Red Hat](https://www.redhat.com/en/blog/it-automation-agentic-ai-introducing-mcp-server-red-hat-ansible-automation-platform) ; [Network World](https://www.networkworld.com/article/4170084/red-hat-opens-ansible-to-ai-agents-within-limits.html) ; [GitHub](https://github.com/ansible/aap-mcp-server) |
| Ansible | sibilleb/AAP-Enterprise-MCP-Server ; bsahane/mcp-ansible ; tarnover/mcp-sysoperator | 35 ★ (dernier push 18/07/2025) ; 30 ★ ; 27 ★ | AAP et EDA ; Ansible, Terraform, LocalStack | [GitHub](https://github.com/sibilleb/AAP-Enterprise-MCP-Server) ; [GitHub](https://github.com/tarnover/mcp-sysoperator) |
| **Terraform** | hashicorp/terraform-mcp-server (**officiel HashiCorp**) | 1 559 ★, 19/04/2025 → 12/11/2026, MPL-2.0 | Intégration à l'écosystème Terraform | [GitHub](https://github.com/hashicorp/terraform-mcp-server) |
| Terraform | nwiizo/tfmcp | 372 ★, MIT | Gestion d'environnements Terraform par l'IA (« expérimental ») | [GitHub](https://github.com/nwiizo/tfmcp) |
| **NAS (TrueNAS)** | truenas/truenas-mcp (**organisation TrueNAS**) | 117 ★, 04/02/2026 → 11/11/2026, GPL-3.0 | Surveiller et gérer TrueNAS | [GitHub](https://github.com/truenas/truenas-mcp) |
| NAS | vespo92/TrueNasCoreMCP ; spranab/truenas-mcp | 34 ★ ; 8 ★ (278 actions) | TrueNAS Core ; TrueNAS SCALE | [GitHub](https://github.com/vespo92/TrueNasCoreMCP) ; [GitHub](https://github.com/spranab/truenas-mcp) |
| Réseau (source de vérité, tests) | netboxlabs/netbox-mcp-server (**officiel**) ; automateyournetwork/pyATS_MCP | 256 ★ (lecture seule) ; 90 ★ (« expérimental ») | Lecture des données NetBox ; commandes et tests pyATS | [GitHub](https://github.com/netboxlabs/netbox-mcp-server) ; [GitHub](https://github.com/automateyournetwork/pyATS_MCP) |
| Plateformes de labs | iximiuz Labs MCP ; HTB CTF MCP ; Pluralsight AI MCP (officiels, distants) | Livrés (voir §1) | Playgrounds et contenus ; challenges et flags ; cours, labs, analyses | [iximiuz](https://labs.iximiuz.com/docs/labs-mcp/what-is-labs-mcp) ; [HTB](https://hackthebox.com/blog/model-context-protocol) ; [Pluralsight](https://www.pluralsight.com/resources/blog/news/2026-new-features-ai-mcp-skill-iq-suite) |

- **CML 2.10 et MCP intégré** : un résultat de recherche affirme que « CML 2.10 embarque un serveur MCP first-party ». La page produit Cisco ne cite pour la 2.10 que les icônes personnalisées, le démarrage automatique des labs et les commutateurs non gérés. Les notes de la 2.9 ne parlent pas de MCP. **Affirmation non vérifiée** — [Cisco CML](https://www.cisco.com/c/en/us/products/cloud-systems-management/modeling-labs/index.html) ; [notes CML 2.9](https://developer.cisco.com/docs/modeling-labs/2-9/cml-release-notes/)
- **Ansible – autre point d'entrée** : la documentation AAP 2.6 décrit un « Ansible Lightspeed intelligent assistant with MCP servers » — [Red Hat docs](https://docs.redhat.com/en/documentation/red_hat_ansible_automation_platform/2.6/whats_new-ansible_lightspeed_intelligent_assistant_with_mcp_servers)
- **Broadcom** mise sur la gouvernance des agents (Tanzu, AgentMinder, passerelle MCP) dans VMware Private AI Cloud (VMware Explore, août 2026), plutôt que sur un serveur MCP vSphere officiel — [SiliconANGLE](https://siliconangle.com/2026/08/31/broadcoms-private-ai-cloud-spans-infrastructure-agents-data-and-security/)
- **Sécurité des serveurs MCP** : Cisco publie un scanner open source de menaces MCP — [cisco-ai-defense/mcp-scanner](https://github.com/cisco-ai-defense/mcp-scanner) (1 118 ★, Apache-2.0).
- **Recherches sans résultat** : aucun serveur MCP officiel trouvé pour Proxmox, VirtualBox (Oracle), Hyper-V (Microsoft), EVE-NG ou Containerlab. Aucun serveur MCP pour Wi-Fi (hostapd, mac80211_hwsim) ni pour SAN (cibles iSCSI/FC) — recherches GitHub « wifi lab llm », « eve-ng mcp », « org:srl-labs mcp » ; [mcp.so containerlab](https://mcp.so/servers/clab-mcp-server)

### Inferences
- Pour une application desktop qui pilote VM, conteneurs, ESXi imbriqué, NAS et Wi-Fi, **s'appuyer sur les MCP tiers serait fragile**. Hors Docker, Kubernetes, Terraform, TrueNAS et Ansible AAP, ils sont communautaires, parfois abandonnés (canvrno/ProxmoxMCP, QuantGeekDev/docker-mcp, bright8192/esxi-mcp-server) et aux licences hétérogènes (GPL-3.0 pour ckreiling, TrueNAS et gns3-skills ; MIT ou Apache ailleurs).
- L'option la plus robuste semble être d'**exposer un serveur MCP propre à l'application**, de niveau « lab » : `create_lab`, `inject_fault`, `check_state`, `get_hint`. Il réutiliserait en interne les API natives, et les serveurs tiers serviraient d'inspiration.
- Des schémas de sécurité émergent et sont transposables à un outil qui laisse l'IA modifier des VM :
  - **lecture seule par défaut** (NetBox, VMware-Monitor) ;
  - **contrôles de politique et journal d'audit** (VMware-AIops) ;
  - **politiques déclaratives limitant nœuds et outils** (NIKA, §4).

### Gaps
- Le contenu des registres MCP (registre officiel, mcp.so, Smithery, Glama, PulseMCP) n'a pas été parcouru systématiquement ; il n'a été vu qu'au travers des résultats de recherche. D'autres serveurs, notamment pour Windows, NAS Synology ou équipements Wi-Fi, peuvent exister.
- Les listes exactes d'opérations n'ont pas été vérifiées dans le code ; elles reprennent les descriptions des dépôts.
- Le statut GA du serveur MCP d'AAP est contradictoire : préversion technique selon Red Hat, GA selon Network World. La date n'est pas confirmée.

## 4. Recherche académique et industrielle (2023-2026) : agents LLM pour le dépannage réseau et système, injection de pannes, tuteurs IA pour labs pratiques

### Takeaway
La recherche 2025-2026 a produit plusieurs **plateformes open source qui injectent des pannes et notent automatiquement**, avec pour but d'**évaluer des agents IA** et non des étudiants :
- en réseau : **NIKA**, **NetArena** (ex-NetPress, ICLR 2026), **CTBench** ;
- en SRE et cloud : **AIOpsLab** (MLSys 2025), **ITBench**, **SREGym** (NeurIPS 2026), **ChaosEater**.

Leur conclusion convergente : les LLM **détectent** assez bien, mais **localisent et identifient la cause racine** nettement moins bien. Côté pédagogie, l'étude de référence est **SENSAI / pwn.college** : tuteur avec contexte terminal, 309 étudiants, 142 526 requêtes. D'autres travaux génèrent des **environnements de cyber range ou de CTF par LLM** (CTF-Forge, ARCeR, AgentCyTE). Aucune étude trouvée n'évalue un dispositif complet « l'IA casse, l'humain répare, l'IA corrige » sur des labs d'infrastructure.

### Cited Findings

#### Dépannage réseau par agents LLM
- **NIKA – « A Network Arena for Benchmarking AI Agents on Network Troubleshooting »** [Recherche] — arXiv 2512.16381, 18/12/2025
  - Auteurs : Z. Wang, A. Cornacchia, A. Sacco, F. Galante, M. Canini, D. Jiang.
  - Présenté comme le plus grand benchmark public de diagnostic d'incidents réseau par LLM : des centaines d'incidents (640 dans le texte v1), 5 scénarios du datacenter au FAI, 54 types de problèmes.
  - **Plus de 30 outils de surveillance et de dépannage exposés en MCP** : sketches, INT, API de contrôleur SDN, CLI de commutateurs. Des **politiques déclaratives** limitent les nœuds et outils accessibles à l'agent. Jeu de données de plus de 900 traces de raisonnement.
  - Résultat : les grands modèles détectent mieux, mais peinent à localiser la panne et à trouver la cause racine — [arXiv](https://arxiv.org/abs/2512.16381v1) ; [papers.cool](https://papers.cool/arxiv/2512.16381)
  - Code : [sands-lab/nika](https://github.com/sands-lab/nika), 80 ★, créé le 18/12/2025, push 13/11/2026.
  - **Conflit sur la publication** : une liste de références la donne acceptée à ICLR 2026 ; une autre recherche ne trouve aucune trace et suggère une confusion avec NetArena.
- **Précurseur de NIKA** : « Towards a Playground to Democratize Experimentation and Benchmarking of AI Agents for Network Troubleshooting », arXiv 2507.01997, juillet 2025 — [arXiv](https://arxiv.org/html/2507.01997v2) ; dépôt [zhihao1998/LLM4NetLab](https://github.com/zhihao1998/LLM4NetLab) (13 ★).
  - Agent construit sur NIKA : [SADE-NetworkAgent](https://github.com/Overlxrd-uwu/SADE-NetworkAgent) (IEEE LCN 2026, 11 ★).
- **NetArena (ex-NetPress) – ICLR 2026** [Recherche], arXiv 2506.03231, juin 2025
  - Génère dynamiquement des benchmarks pour agents réseau, avec vérité terrain, et s'intègre à des **émulateurs réseau** pour mesurer exactitude, sécurité et latence.
  - Trois applications : planification de capacité de datacenter, **mauvaise configuration de routage**, dépannage de politiques de microservices.
  - Les agents n'atteignent que **13 à 38 % de performance moyenne** sur des requêtes réalistes à grande échelle, et jusqu'à 3 % seulement — [arXiv](https://arxiv.org/pdf/2506.03231) ; [ICLR 2026](https://iclr.cc/virtual/2026/poster/10010955) ; [Microsoft Research](https://www.microsoft.com/en-us/research/?p=1162334)
  - Code : [Froot-NetSys/NetArena](https://github.com/Froot-NetSys/NetArena), 49 ★.
- **NetConfEval (CoNEXT 2024)** : benchmark de LLM pour la configuration réseau. NIKA lui reproche de porter sur la synthèse de configuration **statique**, pas sur le dépannage d'un réseau vivant — [RedHatResearch/conext24-NetConfEval](https://github.com/RedHatResearch/conext24-NetConfEval) (44 ★) ; [NIKA](https://arxiv.org/abs/2512.16381v1)
- **CTBench (arXiv 2608.12002, août 2026)** : dépannage télécom, avec restauration de chemin et analyse de cause racine. Les agents restent « loin d'un dépannage fiable ». La réparation sur réseau vivant n'est pas testée — [arXiv](https://arxiv.org/pdf/2608.12002)
  - Selon un article secondaire, l'outil NetCanvas (Huawei) ferait passer le taux de réussite de 30,3 % à 54,5 %. Non vérifié — [BestHub](https://www.besthub.dev/articles/netcanvas-huawei-gts-gives-ai-agents-an-interactive-visual-topology-for-network-troubleshooting-eb1756d81333)
  - Voisin : FaulT-Bench, avec des tickets utilisateurs peu fiables — [arXiv 2608.27021](https://arxiv.org/pdf/2608.27021)

#### Systèmes, cloud et SRE : injection de pannes et notation automatique
- **AIOpsLab (Microsoft et coauteurs ; arXiv 2501.06706, janvier 2025 ; MLSys 2025)**
  - Déploie des microservices (DeathStarBench), dispose d'une **bibliothèque de pannes extensible intégrée à Chaos Mesh**, génère de la charge, orchestre l'interaction agent-cloud (Agent-Cloud Interface) et analyse les résultats.
  - 48 problèmes, 4 agents évalués — [arXiv](https://arxiv.org/abs/2501.06706) ; [Microsoft Research](https://www.microsoft.com/en-us/research/publication/aiopslab-a-holistic-framework-for-evaluating-ai-agents-for-enabling-autonomous-cloud)
  - Selon un résumé secondaire : 100 % en détection, 46–62 % en localisation, 36–46 % en cause racine, 0–55 % en mitigation. À vérifier dans l'article — [HF discussion](https://huggingface.co/datasets/rl-llm-wiki/knowledge-base/discussions/351)
  - Toujours selon un résumé secondaire, le cadre vise « des opérateurs humains comme des agents LLM » — [chatpaper](https://chatpaper.com/paper/40632)
  - Code : [microsoft/AIOpsLab](https://github.com/microsoft/AIOpsLab), 1 033 ★, MIT, push 07/11/2026.
- **ITBench (IBM)** : cadre open source de benchmark de l'automatisation IT (scénarios SRE, CISO, FinOps) — [itbench-hub/ITBench](https://github.com/itbench-hub/ITBench), 520 ★, Apache-2.0, créé le 05/02/2025, push 13/11/2026.
- **SREGym (arXiv 2605.07161, mai 2026 ; poster NeurIPS 2026)**
  - 90 problèmes sur Kubernetes et Helm, dont 34 repris d'AIOpsLab et ITBench. Pannes allant de la mauvaise configuration applicative aux défaillances OS et matérielles, injectées notamment par eBPF, avec du bruit de fond.
  - Deux modes : proactif (l'agent détecte lui-même) et réactif (sur alerte). Jusqu'à 40 % d'écart entre agents — [arXiv](https://arxiv.org/abs/2605.07161) ; [NeurIPS](https://neurips.cc/virtual/2026/poster/139695)
  - Classement tiers auto-déclaré : Claude Code avec Sonnet 4.6 à 60,7 % de bout en bout, sans bruit — [benchmarklist](https://benchmarklist.com/benchmarks/sregym/)
  - Code : [SREGym/SREGym](https://github.com/SREGym/SREGym), 414 ★, MIT.
- **ChaosEater (NTT)** : arXiv 2501.11107 (janvier 2025, révisé en avril 2025), suite arXiv 2511.07865, ASE 2025 NIER.
  - Chaque étape du cycle de chaos engineering est confiée à un agent LLM sur des systèmes Kubernetes gérés en IaC.
  - Limites citées : environnements de développement uniquement, reconfiguration limitée aux manifestes Kubernetes — [arXiv](https://arxiv.org/abs/2501.11107) ; [arXiv suite](https://arxiv.org/html/2511.07865v1) ; [ASE 2025](https://conf.researchr.org/details/ase-2025/ase-2025-nier-track/16/LLM-Powered-Fully-Automated-Chaos-Engineering-Towards-Enabling-Anyone-to-Build-Resil)
- **ResolveLab** : « environnements d'outils avec pannes injectées et notation par effets de bord » pour évaluer et post-entraîner des agents LLM — [Ta0p1/ResolveLab](https://github.com/Ta0p1/ResolveLab), 104 ★, MIT, créé le 20/10/2026.

#### Génération d'environnements (cyber range, CTF) par LLM
- **CTF-Dojo / CTF-Forge (arXiv 2508.18370, août 2025)** : un LLM transforme des artefacts de CTF publics en **environnements Docker exécutables**. Plus de 98 % de réussite après validation manuelle ; 658 challenges fonctionnels ; « minutes au lieu de semaines » — [arXiv](https://arxiv.org/pdf/2508.18370)
- **ARCeR (arXiv 2504.12143, avril 2025, Université de Calabre)** : génération et déploiement automatiques de cyber ranges à partir d'une **description en langage naturel**, par RAG agentique. Étude de cas sur CyRIS — [arXiv](https://arxiv.org/html/2504.12143v1)
- **AgentCyTE (arXiv 2510.25189, octobre 2025)** : raisonnement LLM et émulation réseau contrainte par schéma pour générer et affiner des environnements de menace exécutables (formation et expérimentation) — [arXiv](https://arxiv.org/html/2510.25189v1)
- **« From Concept to Deployment: An AI Assistant for Generating and Configuring Cyber Range Scenarios »** (IEEE CSR 2025, août 2025) — [Crossref](https://api.crossref.org/works/10.1109%2FCSR64739.2025.11130019)
- **CyExec** : scénarios d'exercices générés par GPT avec RAG (date non vérifiée) — [Bohrium](https://www.bohrium.com/paper-details/applications-of-llms-for-generating-cyber-security-exercise-scenarios/1055879423397462059-2649)
- **Dynamic Cyber Ranges (arXiv 2604.24184, avril 2026)** : des agents défenseurs pilotés par LLM coévoluent avec l'attaquant dans des ranges existants — [alphaXiv](https://www.alphaxiv.org/abs/2604.24184.md)
- **Cyber range avec automatisation d'attaque guidée par LLM** (JISA 2026) — [engin-zhou/cyber-range-experiments](https://github.com/engin-zhou/cyber-range-experiments)

#### Tuteurs IA pour labs pratiques et correction automatique
- **SENSAI (SIGCSE TS 2025 ; Nelson, Doupé, Shoshitaishvili)** : tuteur LLM qui exploite le contexte réel de l'apprenant (terminaux actifs, fichiers édités) et le guide de façon socratique. Déployé dans un cursus universitaire et pour une communauté mondiale — [article](https://adamdoupe.com/publications/sensai-cigcse2025.md) ; [SIGCSE](https://sigcse2025.sigcse.org/details/sigcse-ts-2025-Papers/59/SENSAI-Large-Language-Models-as-Applied-Cybersecurity-Tutors)
- **« Do Hackers Dream of Electric Teachers? » (arXiv 2602.17448, février 2026)** — [arXiv](https://arxiv.org/abs/2602.17448v1)
  - Étude d'un semestre : 309 étudiants, **142 526 requêtes** au tuteur, 396 challenges couvrant 9 thèmes.
  - Trois styles de conversation identifiés. Recommandation : employer le tuteur IA **en complément des assistants humains** et enseigner aux étudiants comment bien l'interroger.
  - Selon un résumé de recherche non vérifié dans le texte, les styles seraient « Short / Reactive / Proactive ». Le tuteur serait moins utile sur les sujets difficiles et jugé moins bon que les assistants humains.
- **Correction de copies Linux/bash par LLM (arXiv 2607.02432, juillet 2026)** : 1 200 réponses d'examen réelles notées par 4 LLM et 3 correcteurs humains. La question centrale est la fiabilité et l'alignement des notes sur une grille — [arXiv](https://arxiv.org/pdf/2607.02432)
  - Voisin : notation de bout en bout dans un cours de systèmes d'exploitation — [arXiv 2405.19694](https://arxiv.org/pdf/2405.19694)
- **Réseau (Packet Tracer, CCNA)** : aucune étude indépendante trouvée sur l'efficacité de tuteurs LLM. Les résultats sont du marketing (NetPilot) ou des bibliothèques de prompts — [NetPilot](https://netpilot.io/packet-tracer-helper)

#### Agents qui résolvent des challenges (contexte)
- **PentestGPT** : « cadre agentique de test d'intrusion automatisé par LLM » — [GreyDGL/PentestGPT](https://github.com/GreyDGL/PentestGPT), 16 413 ★, MIT, push 14/07/2026.

### Inferences
- Les benchmarks montrent que **diagnostiquer est difficile pour un LLM, alors qu'injecter une panne connue est simple et déterministe**. Pour le mode 3, il vaut donc mieux que l'IA **choisisse et paramètre** une panne dans un catalogue (comme les YAML de GNS3 ou la bibliothèque d'AIOpsLab), avec une **vérification déterministe d'état** (méthode iximiuz et SadServers). Le LLM servirait aux **indices et explications**, plutôt qu'à diagnostiquer ou noter librement.
- Les cadres AIOpsLab, SREGym, ITBench et NIKA sont **réutilisables pour former des humains** : l'humain prend la place de l'agent, et leurs bibliothèques de pannes et correcteurs automatiques sont sous licence MIT ou Apache (sauf NIKA, licence non déclarée). C'est un raccourci technique pour le mode 3 côté Kubernetes et réseau.
- L'étude SENSAI suggère que la valeur du tuteur dépend de son **accès au contexte réel** (terminal, fichiers) et d'une posture **socratique**. Le tuteur ne remplace pas l'humain : c'est un argument pour une échelle d'indices progressive plutôt qu'un chat libre.

### Gaps
- Aucune étude trouvée (2023-2026) n'évalue l'**apprentissage humain** dans un dispositif « l'IA injecte des pannes et vérifie la réparation » sur des labs d'infrastructure (VM, réseau, stockage).
- Les chiffres détaillés d'AIOpsLab et de « Do Hackers Dream… » proviennent de résumés secondaires ; les articles complets n'ont pas été lus.
- La publication de NIKA à ICLR 2026 n'est pas confirmée (sources contradictoires).
- Les travaux sur le Wi-Fi, les SAN ou ESXi avec agents LLM n'ont pas été trouvés.

## 5. Existe-t-il un outil qui combine lab local (VM + conteneurs), IA qui construit, IA qui injecte des pannes, vérification automatique et clé API personnelle ? Équivalents les plus proches et manques

### Takeaway
**Non : au 13/11/2026, aucun outil trouvé ne réunit les cinq briques** pour un lab **local multi-domaines** (VM, conteneurs, ESXi imbriqué, SAN, NAS, Wi-Fi). L'équivalent le plus proche est **GNS3 3.1**, encore en alpha. Il est local, open source (GPL), avec clé API personnelle ou LLM local, et réunit un assistant pédagogique, une automatisation de lab, une **injection de pannes par IA**, 50 pannes en YAML et un MCP de 82 outils. Mais il reste **centré réseau**, et la **vérification automatique de la réparation** n'est pas documentée. Côté commercial, **NetPilot** (cloud ou auto-hébergé, réseau uniquement) et **KodeKloud AI Tutor** / **Skillable** (cloud, DevOps) couvrent chacun une partie. Les **benchmarks de recherche** (AIOpsLab, SREGym, NIKA) apportent l'injection et la notation automatique, mais pour des agents, pas des humains.

### Cited Findings

#### Grille de comparaison
« ✓ » = documenté, « ~ » = partiel ou affirmé par l'éditeur, « ? » = non trouvé, « ✗ » = absent.

| Solution | Local sur PC | Couverture | IA guide | IA construit | IA injecte des pannes | Vérif. auto | BYOK / MCP | Open source | Statut, prix | Sources |
|---|---|---|---|---|---|---|---|---|---|---|
| **GNS3 3.1** (AI Assistant + gns3-skills + MCP) | ✓ | Réseau (VM QEMU et Docker hébergeables) | ✓ (Teaching Assistant, lecture seule) | ✓ (Lab Automation Assistant) | ✓ (mode injection, 50 YAML) | ? (étapes affichées ; contrôle de la réparation non documenté) | ✓ BYOK (DeepSeek, Anthropic, xAI ; LLM local évoqué) ✓ MCP 82 outils | ✓ GPL-3.0 | Alpha (3.1.0a7, 21/10/2026), gratuit | [docs AI](https://docs.gns3.com/docs-3.1-en/ai-tools/use-ai-assistant) ; [pannes](https://docs.gns3.com/docs-3.1-en/ai-tools/use-fault-injection) ; [MCP](https://docs.gns3.com/docs-3.1-en/ai-tools/use-mcp-service) ; [PyPI](https://pypi.org/project/gns3-server/) |
| **NetPilot** | ~ (auto-hébergé ou air-gapped en entreprise) | Réseau multi-constructeurs | ~ (tuteur) | ✓ (anglais courant → lab) | ~ (« inject failures », cadre recherche) | ? | ~ (LLM local en air-gapped) | ✗ | Livré ; gratuit + Pro 15 $/mois (source tierce) | [everydev](https://www.everydev.ai/tools/netpilot) ; [research lab](https://www.netpilot.io/network-research-lab) |
| **KodeKloud AI Tutor** | ✗ (cloud) | DevOps, cloud, IA | ✓ (Live Assist) | ✓ (micro-lab à la demande) | ✗ | ? | ✗ | ✗ | Livré (juin 2026), gratuit selon le CEO | [KodeKloud](https://kodekloud.com/ai-tutor) ; [Product Hunt](https://www.producthunt.com/p/kodekloud-ai-tutor/ai-tutor-by-kodekloud) |
| **Skillable AI** | ✗ (cloud) | Selon les labs clients | ✓ (Chat Assistant) | ✓ (auteurs + Practice Generator) | ✗ | ~ (« validation » annoncée) | ~ (l'organisation peut brancher ses modèles) | ✗ | GA août 2026, B2B | [Training Industry](https://trainingindustry.com/press-release/artificial-intelligence/skillable-launches-ai-capabilities-across-the-entire-lab-lifecycle-including-authoring-delivery-and-validation/) ; [docs](https://docs.skillable.com/docs/practice-generator) |
| **iximiuz Labs + Labs MCP** | ✗ (cloud, microVM) | Linux, conteneurs, Kubernetes, réseau | ~ (via l'IA de l'utilisateur) | ~ (démarre des playgrounds) | ✗ | ✓ (état final) | ✓ MCP (votre IA) | ~ (labctl Apache-2.0) | Livré, freemium | [Labs MCP](https://labs.iximiuz.com/docs/labs-mcp/what-is-labs-mcp) ; [challenges](https://labs.iximiuz.com/docs/learning-materials/challenges) |
| **SadServers** | ✗ (VM cloud) | Linux, DevOps | ✗ | ✗ | ✗ (scénarios écrits à la main) | ✓ | ✗ | ✗ (code non sous licence déclarée) | Livré, freemium | [FAQ](https://sadservers.com/faq) |
| **BrokenOps** | ✓ (KVM/libvirt, Linux natif) | Linux (VM Ubuntu) | ✗ | ✗ | ✗ (pannes prédéfinies) | ✓ (scripts) | ✗ | ✓ MIT | Prototype (2 ★) | [GitHub](https://github.com/HimanM/BrokenOps) |
| **pwn.college + SENSAI** | ~ (dojo auto-hébergeable) | Cybersécurité | ✓ (contexte terminal) | ✗ | ✗ | ✓ (flags) | ✗ | ✓ dojo BSD-2 | Livré, gratuit | [SENSAI](https://adamdoupe.com/publications/sensai-cigcse2025.md) ; [dojo](https://github.com/pwncollege/dojo) |
| **AIOpsLab / SREGym / ITBench** | ✓ (Kubernetes local possible) | Microservices, Kubernetes | ✗ (pour agents) | ✓ (déploiement scripté) | ✓ (Chaos Mesh, eBPF) | ✓ (notation auto) | ✓ (n'importe quel agent) | ✓ MIT / Apache | Recherche (1 033 / 414 / 520 ★) | [AIOpsLab](https://github.com/microsoft/AIOpsLab) ; [SREGym](https://github.com/SREGym/SREGym) ; [ITBench](https://github.com/itbench-hub/ITBench) |
| **NIKA** | ✓ (émulation) | Réseau | ✗ | ✓ | ✓ (incidents) | ✓ | ✓ MCP (30+ outils) | ~ (licence non déclarée) | Recherche (80 ★) | [arXiv](https://arxiv.org/abs/2512.16381v1) ; [GitHub](https://github.com/sands-lab/nika) |
| **CML + cml-mcp** (Cisco) | ✓ (CML installé localement ; voir l'étude plateformes) | Réseau Cisco | ~ (via votre IA) | ✓ | ✗ | ✗ | ✓ MCP (votre IA ; démo LM Studio) | ~ (MCP BSD-2, CML propriétaire) | Livré (cml-mcp 0.40.0) | [blog Cisco](https://blogs.cisco.com/learning/speak-your-lab-into-existence-with-ai-driven-cisco-modeling-labs-and-mcp) ; [PyPI](https://pypi.org/project/cml-mcp/) |
| **MCP-Packet-Tracer** | ✓ | Réseau (Packet Tracer) | ~ | ✓ (génère, valide, déploie) | ✗ | ~ (« valide » la topologie générée) | ✓ MCP | ✓ MIT | Communautaire (377 ★) | [GitHub](https://github.com/Mats2208/MCP-Packet-Tracer) |
| **skillcoco** | ✓ (application desktop) | Labs en terminal | ✓ (tuteur BYOK) | ? | ? | ? | ✓ BYOK | ✓ MIT | Prototype (9 ★) | [GitHub](https://github.com/skillcoco/skillcoco) |
| **bgp-fault-platform** | ? | Réseau (BGP, Cisco) | ✗ | ✗ | ✓ (LLM, schéma contraint) | ✓ (validation backend) | ? | ? (licence non déclarée) | Prototype (1 ★) | [GitHub](https://github.com/ah7m02/bgp-fault-platform) |
| **chaos_lab** | ✓ (bacs à sable Linux) | Linux | ✓ (tutorat IA optionnel) | ✗ | ? (incidents) | ✓ (déterministe) | ? | ? | Prototype (0 ★, 05/11/2026) | [GitHub](https://github.com/rishavnandi/chaos_lab) |

#### Concurrents et signaux à surveiller
- **GNS3 3.1 stable** couvrirait nativement les trois modes pour la partie réseau, gratuitement et en local. La branche 3.1 publie environ une alpha par mois depuis avril 2026 (sept alphas du 25/04 au 21/10/2026) ; aucune date de version stable n'a été trouvée — [PyPI](https://pypi.org/project/gns3-server/)
- **NetPilot** vise explicitement les étudiants CCNA, CCNP et CCIE et les utilisateurs de Packet Tracer, GNS3, EVE-NG et CML (pages « alternative ») [marketing éditeur] — [NetPilot GNS3 alternative](https://www.netpilot.io/gns3-alternative) ; [Packet Tracer alternative](https://netpilot.io/packet-tracer-alternative)
- **Usage manuel avec Claude Code et des serveurs MCP** déjà pratiqué par des ingénieurs : construction de lab CML par conversation, Claude « surveillant d'examen » qui injecte une panne aléatoire — [blog Cisco](https://blogs.cisco.com/learning/speak-your-lab-into-existence-with-ai-driven-cisco-modeling-labs-and-mcp) ; [LinkedIn](https://my.linkedin.com/in/velanthekamalai)

### Inferences
- **Espace libre identifié** : il n'existe pas d'application **desktop et locale** qui orchestre des labs **multi-domaines**, au-delà du seul réseau, et réunisse :
  - **(a) construction par IA** à partir d'une description ;
  - **(b) mode guidé** pendant que l'utilisateur construit, avec accès au contexte terminal comme SENSAI ;
  - **(c) panne secrète choisie par IA** dans un catalogue, avec **vérification déterministe** de la réparation et **échelle d'indices** ;
  - **(d) clé API personnelle ou MCP**, au choix de l'utilisateur.

  Les briques existent séparément. Le **différenciateur** serait l'intégration, la couverture « systèmes, stockage, virtualisation » et la pédagogie du mode 3 (secret, indices, score).
- **Principaux manques par rapport à l'idée** :
  - aucun outil IA ne couvre **ESXi imbriqué / vCenter**, **SAN (iSCSI/FC)**, **NAS** ou **Wi-Fi**. Il existe des MCP communautaires (ESXi) et officiels (TrueNAS), mais sans pédagogie ;
  - la **vérification de la réparation humaine** après une panne générée par IA n'existe qu'en prototypes ;
  - le **secret de la panne** est fragile chez GNS3, qui affiche les étapes d'injection dans le panneau de l'assistant (bien pratique pour le débogage, mais à masquer pour un exercice) ;
  - le **BYOK** est absent des offres commerciales grand public.
- **Risque concurrentiel** : la partie réseau risque d'être « commoditisée » par GNS3 3.1, gratuit et local, puis par NetPilot. L'idée gagnerait à se différencier sur les domaines non réseau, sur l'orchestration VM et conteneurs sur PC, et sur l'expérience pédagogique (indices, scoring, rejouabilité).
- **Ressources directement réutilisables, sous réserve de licence** :
  - catalogues de pannes : gns3-skills (GPL-3.0), AIOpsLab (MIT, Chaos Mesh), SREGym (MIT) ;
  - logique de vérification d'état : modèle iximiuz et BrokenOps (MIT) ;
  - schémas de garde-fous : politiques déclaratives de NIKA, audit de VMware-AIops.

### Gaps
- Le **comportement réel** de l'injection de pannes de GNS3 3.1 n'a pas pu être testé ni lu en entier : vérification automatique de la réparation, granularité des indices, possibilité de masquer la solution, liste des 50 pannes.
- L'**injection de pannes de NetPilot** (contrôle utilisateur ou IA, réversibilité, correction) n'est connue que par des pages marketing, consultées via des extraits.
- **Reddit, Hacker News et Product Hunt** n'ont été que partiellement explorés. Aucun fil Reddit ou « Show HN » n'a été trouvé pour un outil « l'IA casse mon lab pour que je m'entraîne » ; seuls SadServers (HN, 2022), BrokenOps et des billets de blog sont apparus — [README SadServers](https://github.com/fduran/sadservers/blob/main/README.md)
- Il n'est pas exclu qu'un projet récent et peu étoilé, hors des termes de recherche utilisés, combine davantage de briques. Le rythme de création de dépôts « MCP + lab » est très élevé en 2026.
