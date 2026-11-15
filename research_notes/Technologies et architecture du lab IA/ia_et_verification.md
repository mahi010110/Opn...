# Couche IA et couche de vérification automatique d'un lab IT supervisé par IA (app desktop Tauri, local-first) : état au 13 novembre 2026

> **Méthode et fiabilité.** Recherche menée le 13/11/2026.
> - **[Registre]** : versions et dates relevées le 13/11/2026 dans les registres officiels : PyPI (API JSON), crates.io, npm, proxy Go `proxy.golang.org`.
> - **[GitHub]** : licence SPDX détectée, étoiles (★), date de création et de dernier push, relevées via l'API de recherche GitHub le 13/11/2026. Les ★ mesurent la popularité, pas la qualité. « NOASSERTION » signifie que GitHub n'a pas reconnu la licence ; dans ce cas, la licence déclarée dans le registre est donnée à côté.
> - **[README]/[Doc]** : README ou documentation officielle lus directement (fichiers bruts GitHub ou site officiel).
> - **[Secondaire]**, **[Agrégateur]** : blog ou site tiers. **[Marketing éditeur]** : affirmation non vérifiée d'un vendeur. **[Prépublication]** : article arXiv non relu par des pairs.
> - **Limites.** `arxiv.org`, `huggingface.co` et `hermes-agent.nousresearch.com` n'étaient pas joignables depuis l'environnement. Les résumés d'articles arXiv viennent donc d'extraits du moteur de recherche, et les fiches de modèles Hugging Face (licences exactes des poids) n'ont pas pu être lues. La documentation de Hermes Agent a été lue dans ses sources sur GitHub. Le quota de recherches web a été épuisé en fin de travail : quelques points restent non vérifiés et sont listés dans les « Gaps ».

---

## 1. Architecture de l'agent dans une app desktop : boucle d'outils écrite à la main ou framework ? Exposer le lab en serveur MCP, être client MCP ? Quelle approche pour une app Tauri local-first ?

### Takeaway
Fin 2026, tous les grands frameworks d'agent savent « mettre en pause un appel d'outil pour approbation humaine ». Mais les plus mûrs sont en **Python ou TypeScript** (OpenAI Agents SDK, PydanticAI, LangGraph, Claude Agent SDK). Les embarquer dans Tauri impose un processus annexe (« sidecar ») Python ou Node, avec sa chaîne d'approvisionnement : la compromission de LiteLLM en mars 2026 montre que ce risque est réel. Le Claude Agent SDK est en plus lié aux modèles Anthropic et au moteur Claude Code, et son SDK TypeScript n'est pas sous licence libre. Côté Rust, **rig-core** (MIT, 0.46) et **genai** (MIT/Apache, 0.7) fournissent l'abstraction de fournisseurs, et **rmcp** (SDK MCP officiel en Rust, 3.10) le protocole MCP. Pour une app Tauri local-first, l'option la plus saine est donc une **boucle d'agent fine écrite en Rust**, au-dessus de ces crates. Le lab y est exposé comme un **jeu d'outils typés**, publié **aussi** en serveur MCP. Ce serveur permet aux abonnés Claude (Claude Desktop, Claude Code) d'utiliser le lab de façon légitime. **Hermes Agent** (MIT) est une excellente **source de conception** (mémoire, compétences apprises, approbations), mais un mauvais composant à embarquer.

### Cited Findings

#### Frameworks d'agent : maturité, licence, adéquation Tauri

| Option | Ce que c'est | Maturité (13/11/2026) | Licence | Adéquation Tauri | Sources |
|---|---|---|---|---|---|
| **Claude Agent SDK** | Boucle d'agent d'Anthropic : outils, hooks, permissions, sous-agents, serveurs MCP | Python 0.2.181 (12/11/2026) ; TS 0.3.325 (13/11/2026) ; 8 538 ★ (Python) | Python : MIT. TS : « SEE LICENSE IN README.md », aucune licence SPDX sur GitHub | Sidecar Python ou Node. Modèles Anthropic, ou fournisseurs cloud tiers (Bedrock, Google, Microsoft Foundry) | [PyPI](https://pypi.org/project/claude-agent-sdk/) ; [npm](https://www.npmjs.com/package/@anthropic-ai/claude-agent-sdk) ; [GitHub py](https://github.com/anthropics/claude-agent-sdk-python) ; [GitHub ts](https://github.com/anthropics/claude-agent-sdk-typescript) |
| **OpenAI Agents SDK** | Agents, transferts entre agents (handoffs), garde-fous, traces, approbation humaine | Python 0.24.0 (15/10/2026), 30 656 ★ ; JS 0.22.0 (12/11/2026) | MIT | Sidecar Python ou Node | [PyPI](https://pypi.org/project/openai-agents/) ; [npm](https://www.npmjs.com/package/@openai/agents) |
| **PydanticAI** | Agents typés, indépendants du fournisseur ; « deferred tools » pour l'approbation humaine | 2.68.0 (12/11/2026), 21 194 ★ | MIT | Sidecar Python | [PyPI](https://pypi.org/project/pydantic-ai/) ; [docs deferred tools](https://github.com/pydantic/pydantic-ai/blob/main/docs/deferred-tools.md) |
| **LangGraph** | Graphes d'états pour agents | Python 1.2.21 (12/11/2026), 44 913 ★ ; JS 1.7.4 | MIT | Sidecar Python ou Node | [PyPI](https://pypi.org/project/langgraph/) ; [npm](https://www.npmjs.com/package/@langchain/langgraph) |
| **Hermes Agent** (Nous Research) | Agent autonome « qui s'améliore » : mémoire, compétences, cron, passerelle de messagerie, 6 backends de terminal | 263 199 ★, créé le 22/07/2025, push quotidien ; paquet PyPI `hermes-agent` 0.19.0 (20/07/2026) | MIT | Application complète en Python, pas une bibliothèque à embarquer | [README](https://github.com/NousResearch/hermes-agent) ; [PyPI](https://pypi.org/project/hermes-agent/) |
| **rig** (rig-core) | Bibliothèque Rust : API unique sur plus de 20 fournisseurs et plus de 10 bases vectorielles ; MCP via la fonctionnalité `rmcp` | rig-core 0.46.0 (31/10/2026), 4,37 M de téléchargements, 9 141 ★ ; crates `rig-sqlite` et `rig-lancedb` en 0.46.0 | MIT | Natif Rust | [crates.io](https://crates.io/crates/rig-core) ; [docs.rs](https://docs.rs/crate/rig/latest) ; [README](https://github.com/0xPlaygrounds/rig) |
| **genai** | Client Rust multi-fournisseurs | 0.7.4 (11/11/2026), 941 ★ | MIT OR Apache-2.0 | Natif Rust | [crates.io](https://crates.io/crates/genai) ; [GitHub](https://github.com/jeremychone/rust-genai) |
| Autres crates Rust | `async-openai` 0.43.0 (MIT) ; `swiftide` 0.34.0 (agents et pipelines RAG, MIT) ; `autoagents` 0.4.0 ; `llm` 1.3.8 (avril 2026) ; `langchain-rust` 8.0.0 | voir colonne précédente | MIT ou MIT/Apache | Natif Rust | [crates.io async-openai](https://crates.io/crates/async-openai) ; [swiftide](https://crates.io/crates/swiftide) ; [llm](https://crates.io/crates/llm) |
| **goose** | Agent desktop et CLI, natif MCP | 56 546 ★, push 13/11/2026 ; dépôt passé sous l'organisation `aaif-goose` | Apache-2.0 | Application complète (cœur Rust) | [GitHub](https://github.com/aaif-goose/goose) |
| **Jan** | App de chat locale **construite avec Tauri**, llama.cpp intégré, fournisseurs cloud, MCP | 45 712 ★, push 13/11/2026 | Apache 2.0 selon le README | Preuve directe qu'une app Tauri + llama.cpp + MCP + BYOK fonctionne | [README](https://github.com/janhq/jan) |

- **Permissions du Claude Agent SDK** [Doc] : chaque appel d'outil passe dans l'ordre par 1) les hooks, 2) les règles de refus, 3) les règles « ask », 4) le mode de permission, 5) les règles d'autorisation, 6) le callback `canUseTool`. Les modes sont `default`, `dontAsk`, `acceptEdits`, `bypassPermissions`, `plan` et `auto` (un classifieur juge les commandes shell). Une règle de refus s'applique « même en mode `bypassPermissions` ». La doc avertit que les outils auto-approuvés « n'atteignent jamais `canUseTool` ». Un outil MCP dont le serveur pose `_meta["anthropic/requiresUserInteraction"]` force toujours la confirmation — [Configure permissions](https://code.claude.com/docs/en/agent-sdk/permissions.md)
- La même page montre que le SDK s'exécute **par Claude Code** (« When Claude requests a tool, Claude Code checks the call »). Le binaire Claude Code lui-même est publié sous « SEE LICENSE IN README.md » (npm `@anthropic-ai/claude-code` 2.1.325, 13/11/2026) — [Doc](https://code.claude.com/docs/en/agent-sdk/permissions.md) ; [npm](https://www.npmjs.com/package/@anthropic-ai/claude-code)
- **Approbation humaine dans l'OpenAI Agents SDK (Python)** [Doc] : un outil déclare `needs_approval=True`, ou une fonction asynchrone qui décide appel par appel. Les approbations en attente remontent comme `interruptions`, pour tout le run, y compris les agents imbriqués et les transferts — [human_in_the_loop.md](https://github.com/openai/openai-agents-python/blob/main/docs/human_in_the_loop.md)
- **Approbation humaine dans PydanticAI** [Doc] : un outil marqué « requires approval » produit des `DeferredToolRequests` de type `'approval'`, `'question'` ou `'external'`. Ils se résolvent en ligne via la capacité `HandleDeferredToolCalls`, ou en arrêtant puis en reprenant le run — [deferred-tools.md](https://github.com/pydantic/pydantic-ai/blob/main/docs/deferred-tools.md)
- **Hermes Agent** [README] : il est indépendant du fournisseur (« Nous Portal, OpenRouter, OpenAI, your own endpoint »). Il offre une boucle d'apprentissage fermée : « Autonomous skill creation after complex tasks. Skills self-improve during use. FTS5 session search with LLM summarization ». Il propose six backends de terminal (local, Docker, SSH, Modal, Daytona, Vercel Sandbox), une intégration MCP, Windows en natif, et une passerelle Telegram, Discord, Slack, WhatsApp et Signal — [README](https://github.com/NousResearch/hermes-agent)
- **rig a changé de nature** [README] : le dépôt contient désormais la bibliothèque et « `rig`, a terminal coding agent built on it that you extend with Bevy plugins ». Sa commande `/login` « signs in with a ChatGPT plan or saves a provider's API key ». Le support MCP est « native-only » (WASI non supporté) — [README](https://github.com/0xPlaygrounds/rig) ; [docs.rs](https://docs.rs/crate/rig/latest)

#### MCP, ACP et MCP Apps (protocoles d'interopérabilité)
- **MCP 2026-07-28 = version stable actuelle** (release candidate le 21/05/2026) [Doc]. Le cœur devient **sans état** : la poignée de main `initialize` et l'en-tête `Mcp-Session-Id` disparaissent. Les requêtes « Multi Round-Trip » (MRTR, `resultType: "input_required"`) remplacent l'élicitation, le sampling et `roots/list` lancés par le serveur. Roots, Sampling et Logging sont dépréciés (SEP-2577), mais fonctionnent encore « for at least twelve months ». Le transport HTTP+SSE est déprécié. Les listes d'outils deviennent cachables (`ttlMs`, `cacheScope`). Tasks et MCP Apps deviennent des extensions. `application_type` (SEP-837) permet les redirections OAuth vers `localhost` pour les apps desktop et CLI — [blog MCP](https://blog.modelcontextprotocol.io/posts/2026-07-28/)
- La spec des outils 2026-07-28 répète que, pour la sécurité, il devrait toujours y avoir « a human in the loop with the ability to deny tool invocations ». Elle ajoute que les clients « **MUST** consider tool annotations to be untrusted unless they come from trusted servers » — [tools.mdx 2026-07-28](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/main/docs/specification/2026-07-28/server/tools.mdx)
- **SDK MCP** [Registre] :
  - `rmcp` 3.10.0 (12/11/2026, Apache-2.0, 49 M de téléchargements), le SDK officiel en Rust — [crates.io](https://crates.io/crates/rmcp) ; [GitHub](https://github.com/modelcontextprotocol/rust-sdk)
  - `mcp` (Python) 2.3.0 (02/10/2026) ; `@modelcontextprotocol/sdk` (TS) 1.32.2 (23/10/2026) ; `fastmcp` 4.2.0 (13/11/2026) — [PyPI mcp](https://pypi.org/project/mcp/) ; [npm](https://www.npmjs.com/package/@modelcontextprotocol/sdk) ; [PyPI fastmcp](https://pypi.org/project/fastmcp/)
- **MCP Apps** [README] : extension qui permet de « Build interactive UIs for MCP tools — charts, forms, dashboards — that render inline in Claude, ChatGPT and any other compliant chat client ». Spec datée du 2026-01-26 ; npm `@modelcontextprotocol/ext-apps` 2.0.4 (27/10/2026, MIT) — [README](https://github.com/modelcontextprotocol/ext-apps) ; [npm](https://www.npmjs.com/package/@modelcontextprotocol/ext-apps)
- **ACP (Agent Client Protocol)** : standard JSON-RPC créé par Zed pour brancher un agent de code dans un éditeur.
  - Dépôt sous Apache-2.0, 4 640 ★ ; crate `agent-client-protocol` 5.2.0 (10/11/2026) ; npm `@agentclientprotocol/sdk` 2.6.0 — [GitHub](https://github.com/agentclientprotocol/agent-client-protocol) ; [crates.io](https://crates.io/crates/agent-client-protocol)
  - Gemini CLI le parle nativement (`--acp`). Claude Code passe par l'adaptateur `claude-agent-acp` (npm `@zed-industries/claude-agent-acp` 0.23.1, 26/03/2026), Codex par `codex-acp` [Secondaire] — [philschmid.de](https://www.philschmid.de/acp-overview) ; [morphllm](https://www.morphllm.com/agent-client-protocol) ; [npm](https://www.npmjs.com/package/@zed-industries/claude-agent-acp)
- **Les benchmarks réseau ont choisi MCP comme interface agent ↔ lab.** NIKA donne aux agents « MCP tools to inspect hosts, routers, switches, and Kubernetes clusters, capture packets ». Il fournit des agents LangGraph, mcp-agent et AutoGen, ainsi que Codex et Claude Code en bac à sable [README] — [NIKA](https://github.com/sands-lab/nika)
- GNS3 3.1 (alpha) intègre un service MCP de 82 outils, dont `injection_skill_get`, qui expose 50 pannes YAML (voir les notes « Labs informatiques locaux pilotés par IA ») — [docs GNS3 3.1](https://docs.gns3.com/docs-3.1-en/ai-tools/use-mcp-service)

### Inferences
- **Boucle maison ou framework ?** La boucle d'outils elle-même est simple : appel du modèle → appels d'outils → politique d'autorisation → exécution → résultat → modèle. La valeur est ailleurs : politique de permissions, journal d'audit, gestion du contexte, budgets. Aucun framework Python ou TS ne fournit ces pièces adaptées à un lab. Une boucle Rust de quelques centaines de lignes, au-dessus de `genai` ou `rig-core` (fournisseurs) et `rmcp` (MCP), garde les clés API et les décisions de sécurité **dans le processus Rust**, hors de la WebView. Elle évite aussi d'embarquer un interpréteur Python.
- **Choix entre rig et genai.** rig apporte agents, RAG et intégrations vectorielles (sqlite, lancedb), mais son API bouge vite (0.x, découpage en crates, ajout d'un agent Bevy). genai est plus mince, donc plus stable à envelopper. Dans les deux cas, il faut isoler la dépendance derrière un trait `LlmProvider` interne.
- **Double exposition du lab.** Les mêmes outils typés (`list_nodes`, `exec_in_node`, `read_file_in_node`, `capture_packets`, `annotate_topology`, `inject_fault`, `check_state`, `get_hint`) servent la boucle interne et un **serveur MCP rmcp** (stdio pour Claude Desktop et Claude Code, HTTP en `localhost`). C'est la voie propre pour les abonnés Claude (section 2). Les outils qui modifient le lab doivent porter `destructiveHint` et `_meta["anthropic/requiresUserInteraction"]`. Mais l'application doit **appliquer elle-même** la politique côté serveur : les annotations ne sont que des indices, que l'hôte peut ignorer.
- **Concevoir dès le départ pour MCP sans état (2026-07-28).** Pas de session de transport : le serveur rend des « handles » explicites (`lab_id`, `attempt_id`) que le modèle repasse en argument. Il utilise MRTR (`input_required`) pour demander une confirmation au milieu d'un appel.
- **Mode « agent externe » (plus tard).** Via ACP, l'app pourrait piloter le Claude Code, Codex ou Gemini CLI **installé et connecté par l'utilisateur**, comme le fait Zed. Cela reste secondaire : contrôle moins fin, dépendance à des adaptateurs tiers.
- **Hermes Agent comme modèle, pas comme dépendance.** Reprendre ses idées : mémoire bornée en « instantané figé », compétences au format agentskills.io, curateur, modes d'approbation smart, manual et off (sections 3 et 4).

### Gaps
- Aucun comparatif publié de frameworks d'agent **pour apps desktop** (empreinte mémoire, démarrage, packaging) n'a été trouvé.
- La stabilité de l'API de rig entre 0.4x et 1.0 n'a pas été évaluée. Le crate `rig-mcp` (pont séparé) existe en 0.2.x et l'articulation exacte avec rig-core 0.46 n'est pas claire.
- Le support effectif de MCP 2026-07-28 par `rmcp` 3.x, Claude Desktop et Claude Code (stateless, MRTR) n'a pas été vérifié ; Anthropic annonce un déploiement progressif ([blog Claude](https://claude.com/fr/blog/bringing-mcp-2026-07-28-to-claude)).
- La documentation du site de Hermes Agent n'était pas joignable. Les sources Markdown de la doc sur GitHub ont été utilisées à la place.

---

## 2. Apporter sa clé (BYOK) et modèles locaux : couches d'abstraction, inférence locale, modèles open-weight bons en appel d'outils (2026) et matériel requis ; brancher un abonnement Claude via MCP

### Takeaway
Pour une app Rust, l'abstraction de fournisseurs se fait **dans le processus** (genai ou rig). Un serveur compatible OpenAI couvre déjà Ollama, llama.cpp, LM Studio, vLLM et OpenRouter. Il faut y ajouter des adaptateurs natifs Anthropic et Gemini pour le cache et les sorties structurées. **LiteLLM est à éviter en dépendance embarquée** (Python, compromission PyPI du 24/03/2026). En local, **Ollama** (MIT, v0.40.16) reste le plus simple. Il parle aussi l'API Anthropic depuis la v0.14 (janvier 2026), ce qui permet de faire tourner Claude Code sur un modèle local. **llama.cpp** (MIT) est l'option embarquable : Jan le fait dans Tauri. Côté modèles, **gpt-oss-20b** (Apache-2.0) tient dans 16 Go. **Gemma 4** (Apache-2.0 depuis le 02/04/2026) va de 2B à 31B, avec appel d'outils natif. **Qwen3.6-35B-A3B** (Apache-2.0) demande environ 21-24 Go de VRAM quantifié. Les meilleurs open-weight restent derrière les modèles fermés sur les tâches de terminal. **Abonnement Claude** : Anthropic **interdit** aux apps tierces d'utiliser la connexion claude.ai. La voie légitime est que **l'utilisateur branche son propre Claude Desktop ou Claude Code sur le serveur MCP de l'app**.

### Cited Findings

#### Couches d'abstraction et passerelles
- **LiteLLM** [Registre][Secondaire] :
  - Version 1.109.1 (12/11/2026), licence MIT sur PyPI (NOASSERTION sur GitHub), 63 220 ★ — [PyPI](https://pypi.org/project/litellm/)
  - Le 24/03/2026, les versions malveillantes **1.82.7 et 1.82.8** ont été publiées sur PyPI. Elles volaient des identifiants via `proxy_server.py` et un fichier `litellm_init.pth` exécuté au démarrage de Python. L'attaque est liée à la compromission de Trivy par TeamPCP : un Trivy non épinglé dans la CI aurait volé le jeton de publication PyPI. Les dépendants (DSPy, CrewAI) pouvaient tirer la version piégée par transitivité — [JFrog](https://research.jfrog.com/post/litellm-compromised-teampcp/) ; [FutureSearch](https://futuresearch.ai/blog/litellm-pypi-supply-chain-attack/) ; [PureAI](https://pureai.com/Articles/2026/03/25/PyPI-Removes-Compromised-LiteLLM-Releases-After-Warnings-of-Stolen-Credentials.aspx)
- **OpenRouter** (SaaS propriétaire, une seule clé pour des centaines de modèles) :
  - Annonce officielle d'octobre 2025 : 1 000 000 de requêtes BYOK gratuites par mois, puis 5 % de frais — [OpenRouter](https://openrouter.ai/announcements/1-million-free-byok-requests-per-month)
  - Selon un tiers [Secondaire] : 50 requêtes par jour et 20 par minute sur les modèles gratuits sans crédit, 1 000 par jour avec au moins 10 $ de crédits, et 5,5 % de frais à l'achat de crédits. Un instantané non daté de la page tarifs donne d'autres plafonds BYOK : **sources contradictoires** — [dupple.com](https://dupple.com/learn/openrouter-pricing) ; [TrueFoundry](https://www.truefoundry.com/blog/openrouter-pricing)
- **Vercel AI SDK** : npm `ai` **7.0.172** (13/11/2026, Apache-2.0 ; NOASSERTION sur GitHub) ; fournisseur `@openrouter/ai-sdk-provider` 3.1.0 [Registre] — [npm ai](https://www.npmjs.com/package/ai)
- **Mastra** (framework TS) : `@mastra/core` 1.83.0 (Apache-2.0 sur npm) [Registre] — [npm](https://www.npmjs.com/package/@mastra/core)

#### Inférence locale

| Moteur | Rôle | Maturité | Licence | Adéquation Tauri / étudiant | Sources |
|---|---|---|---|---|---|
| **Ollama** | Serveur local de modèles ; API compatible OpenAI **et Anthropic** | v0.40.16 (08/11/2026), 186 884 ★ | MIT | Très simple pour l'utilisateur (installation séparée) ; propose aussi des modèles cloud payants | [proxy Go](https://proxy.golang.org/github.com/ollama/ollama/@latest) ; [compat. Anthropic](https://docs.ollama.com/api/anthropic-compatibility) |
| **llama.cpp** | Moteur C/C++ ; `llama-server` compatible OpenAI | push 13/11/2026, 134 863 ★ ; crate Rust `llama-cpp-2` 0.1.161 (03/11/2026) | MIT ; liaisons Rust MIT/Apache | **Embarquable** : Jan l'intègre via son plugin Tauri `tauri-plugin-llamacpp` | [GitHub](https://github.com/ggml-org/llama.cpp) ; [crates.io](https://crates.io/crates/llama-cpp-2) ; [Jan README](https://github.com/janhq/jan) |
| **LM Studio** | App desktop avec serveur local | CLI `lms` : 5 425 ★, push 10/11/2026 | CLI `lms` sous MIT ; l'app elle-même n'est pas sous licence libre (voir Gaps) | Alternative grand public à Ollama | [lms](https://github.com/lmstudio-ai/lms) |
| **vLLM** | Serveur haut débit | 0.33.0 (02/11/2026), 96 869 ★ | Apache-2.0 | Peu adapté à un portable étudiant | [PyPI](https://pypi.org/project/vllm/) |
| **mistral.rs** / **candle** | Inférence 100 % Rust | mistralrs 0.8.1 (02/04/2026) ; candle-core 0.11.1 (31/10/2026) | MIT ; MIT/Apache | Embarquable, mais écosystème moins large que llama.cpp | [crates.io mistralrs](https://crates.io/crates/mistralrs) ; [candle](https://crates.io/crates/candle-core) |
| **Lemonade** (AMD), **Foundry Local** (Microsoft) | Runtimes locaux orientés Windows et matériel | 6 209 ★ ; 2 649 ★ | Apache-2.0 ; NOASSERTION | Options Windows, à surveiller | [Lemonade](https://github.com/lemonade-sdk/lemonade) ; [Foundry Local](https://github.com/microsoft/foundry-local) |

- **Ollama ↔ API Anthropic** [Doc] : depuis la v0.14.0 (16/01/2026), on peut lancer `ANTHROPIC_BASE_URL=http://localhost:11434` puis `claude --model gpt-oss:20b`. La compatibilité est déclarée comme un « subset » de l'API Messages — [docs Ollama](https://docs.ollama.com/api/anthropic-compatibility) ; [blog Ollama](https://registry.ollama.ai/blog/claude)

#### Modèles open-weight pour l'appel d'outils (fin 2026)
- **gpt-oss-20b et 120b** (OpenAI) [README] :
  - 20b : 21B paramètres dont 3,6B actifs, « run within 16GB of memory » grâce à MXFP4. 120b : 117B dont 5,1B actifs, un GPU de 80 Go.
  - Licence Apache 2.0. Appel de fonctions natif et Structured Outputs.
  - Piège : il faut le format de réponse « harmony », sinon le modèle « will not work correctly ».
  - [gpt-oss](https://github.com/openai/gpt-oss)
- **Gemma 4** (Google, 02/04/2026) [Secondaire] : passe sous **Apache 2.0** (fin de la licence Gemma). Quatre tailles : E2B, E4B (2,3B et 4,5B effectifs), 26B MoE (environ 3,8B actifs), 31B dense. Appel de fonctions, JSON structuré et instructions système natifs ; contexte de 256K pour 26B et 31B — [The Register](https://www.theregister.com/2026/04/02/googles_gemma_4_open_weights/) ; [eWeek](https://www.eweek.com/news/google-gemma-4-apache-2-open-models/)
- **Qwen3.6-35B-A3B** (Alibaba, avril 2026, le 16/04 selon la majorité des sources) [Secondaire] :
  - Apache-2.0 ; appel d'outils natif. Sous vLLM, il faut `--enable-auto-tool-choice --tool-call-parser qwen3_coder`, sinon « tool calls can silently fail ».
  - Environ 21 Go de VRAM minimum en quantifié ; tient sur une carte de 24 Go avec un contexte réduit (32K ou 64K).
  - [GGUF Unsloth](https://huggingface.co/unsloth/Qwen3.6-35B-A3B-GGUF) ; [dev.to vLLM](https://dev.to/lavellehatcherjr/serving-qwen36-35b-a3b-with-vllm-and-building-a-coding-agent-with-tool-calling-2kob) ; [D. Vaughan](https://codex.danielvaughan.com/2026/04/16/qwen36-35b-a3b-local-agentic-coding-breakthrough/)
- **Terminal-Bench 2.0** (tâches réelles en terminal, proches de l'admin système), instantané BenchLM du 29/10/2026 [Agrégateur] :
  - Modèles fermés : GPT-5.5 82 %, GPT-5.3 Codex 77,3 %.
  - Open-weight : Kimi K2.6 67,9 %, MiniMax M3 66,7 %, DeepSeek V4 Pro 63,3 %, Qwen3.6-27B 59,3 %, **Qwen3.6-35B-A3B 51,5 %**.
  - En 2025, Kimi K2 Thinking plafonnait à 36 % : l'écart se resserre.
  - Le miroir Vals a été archivé pour cause de saturation du benchmark.
  - [BenchLM](https://benchlm.ai/benchmarks/terminalBench2) ; [Vals](https://www.vals.ai/benchmarks/terminal-bench-2)
- **BFCL (Berkeley Function Calling Leaderboard)** :
  - Dernière mise à jour officielle le 16/12/2025 — [Berkeley](https://gorilla.cs.berkeley.edu/leaderboard.html)
  - Epoch AI (10/09/2026) juge BFCL v4 « **Flawed** » : des questions « irrelevant » ne se réussissent qu'en refusant tout appel — [Epoch AI](https://epoch.ai/benchmarks/berkeley-function-calling-leaderboard/review)
  - Les agrégateurs se contredisent : en tête, soit Qwen3.7 Max (propriétaire), soit Qwen3.5-397B-A17B — [BenchLM BFCL](https://benchlm.ai/benchmarks/bfcl-v4) ; [llm-stats](https://llm-stats.com/benchmarks/bfcl-v4)
- BenchLM classe **GLM-5.1** premier open-weight en « tool use » (77,5) et Kimi K2.6 à 66,6 [Agrégateur] — [BenchLM](https://www.benchlm.ai/best/tool-use)
- **Rappel des benchmarks d'opérations** :
  - ITBench-AA (27/05/2026) : 59 tâches SRE, « all evaluated models score below 50% » — [ITBench](https://github.com/itbench-hub/ITBench)
  - NIKA : les LLM détectent mieux les pannes qu'ils ne les localisent (voir les notes précédentes) — [arXiv 2512.16381](https://arxiv.org/abs/2512.16381)

#### Brancher un abonnement existant
- **Position officielle d'Anthropic** (page « Legal and compliance » de Claude Code, lue le 13/11/2026) [Doc] :
  - « Developers building products or services that interact with Claude's capabilities, including those using the Agent SDK, should use API key authentication »
  - « Anthropic does not permit third-party developers to offer Claude.ai login into their own applications, or to route requests through Free, Pro, Max, or Ultra plan credentials on behalf of their users »
  - Les développeurs « may not collect, store, or intermediate Claude.ai credentials or session tokens »
  - En revanche, cela « [does not] prevent an end user from signing in to the unmodified Claude Code binary with their own Claude subscription »
  - [code.claude.com](https://code.claude.com/docs/en/legal-and-compliance)
- **Chronologie 2026** [Secondaire puis Doc] :
  - 19/02 : interdiction explicite des jetons OAuth d'abonnement dans les outils tiers — [The Register](https://www.theregister.com/2026/02/20/anthropic_clarifies_ban_third_party_claude_access)
  - 04/04 : application effective — [fusion94](https://fusion94.org/blog/2026-04-04-anthropic-kills-claude-subscriptions-for-third-party-tools/)
  - Mai : annonce d'un pool de crédits séparé pour l'Agent SDK, que l'article d'aide dit **suspendu le 15/06/2026** (« For now, nothing has changed »)
  - Depuis le 07/10/2026 : « Claude Max, Ultra, and Team plans now include monthly API credits », utilisables **avec une clé API** d'une organisation Console liée. Connecté avec son abonnement, l'Agent SDK et `claude -p` « still draw from your subscription limits »
  - [support.claude.com](https://support.claude.com/en/articles/15036540-use-the-claude-agent-sdk-with-your-claude-plan)
- **ChatGPT** [Doc][Secondaire] : les connecteurs MCP personnalisés passent par le « developer mode ». ChatGPT ne se connecte qu'à des serveurs **distants en HTTPS**, pas en stdio local. La disponibilité selon les offres est **contradictoire** : la page d'aide OpenAI réserve l'import aux admins Enterprise et Edu, Boomi dit Plus et Pro en lecture seule — [OpenAI Help](https://help.openai.com/en/articles/12584461-developer-mode-and-mcp-connectors) ; [Boomi](https://help.boomi.com/docs/Atomsphere/Platform/Connect_chatgpt_setup) ; [hjarni](https://hjarni.com/blog/how-to-use-mcp-with-chatgpt)

### Inferences
- **Trois voies à proposer dans l'app :**
  - **A. Clé API** (Anthropic, OpenAI, Gemini, Mistral, DeepSeek, OpenRouter…), stockée dans le trousseau du système (section 3). C'est la voie d'Anthropic pour les apps tierces. Les détenteurs d'un abonnement Max, Ultra ou Team peuvent y consommer leurs crédits API mensuels.
  - **B. Modèle local** via un serveur compatible OpenAI (Ollama, llama.cpp, LM Studio). Plus tard, llama.cpp embarqué comme Jan.
  - **C. « Apporte ton assistant »** : l'utilisateur ajoute le serveur MCP du lab dans son Claude Desktop ou Claude Code (ou Hermes, goose, Codex). L'IA tourne alors dans **son** client, avec **son** abonnement. L'app ne voit jamais de jeton.
  - Pour ChatGPT, il faudrait exposer le lab sur Internet en HTTPS (tunnel) : à déconseiller pour un lab, car cela élargit la surface d'attaque.
- **Paliers matériels réalistes pour un étudiant** (par déduction des sources ci-dessus) :
  - 8 Go de VRAM ou 16 Go de RAM : Gemma 4 E4B ou un petit Qwen, suffisants pour reformuler, classer et donner des indices pré-écrits, pas pour diagnostiquer seul.
  - 16 Go : gpt-oss-20b.
  - 24 Go : Qwen3.6-35B-A3B ou Gemma 4 26B MoE, avec un contexte limité.
  - Générer des pannes et des cours reste mieux confié à un grand modèle cloud, **une seule fois**, avec mise en cache.
- **Ne pas choisir un modèle d'après BFCL seul.** Le benchmark est jugé défaillant, et le harnais compte beaucoup. Mieux vaut un **petit banc d'essai maison** : 20 à 30 tâches du lab avec vérificateurs automatiques (section 6), relancé à chaque nouveau modèle. C'est aussi un argument de présentation pour le dossier d'examen.
- Si un composant TS (Vercel AI SDK) était utilisé, il ne doit **pas** tourner dans la WebView avec la clé en mémoire JS : garder les appels réseau vers les fournisseurs dans Rust.

### Gaps
- Aucune mesure fiable de la qualité des **appels d'outils en français** (consignes et sorties en français) n'a été trouvée pour les modèles open-weight.
- Les fiches officielles Hugging Face (Gemma 4, Qwen3.6, licences exactes et tailles GGUF) n'ont pas pu être lues (hôte bloqué). Les chiffres de VRAM viennent de tiers.
- La politique d'OpenAI sur la connexion « ChatGPT plan » dans des agents tiers (proposée par rig et d'autres) n'a pas été vérifiée.
- Le statut de licence de l'application LM Studio (gratuite mais propriétaire, d'après les connaissances générales) n'a pas été revérifié en 2026.
- La limite de mémoire de 16 Go pour gpt-oss-20b est une affirmation de l'éditeur ; la vitesse réelle sur portable n'a pas été mesurée.

---

## 3. Sécurité et garde-fous pour un agent qui exécute des commandes : niveaux de permission, approbations, listes blanches, confinement au réseau et aux machines du lab, sandbox, journaux d'audit, injection de prompt via le contenu du lab, clés API dans le trousseau

### Takeaway
L'état de l'art 2026 est une **défense en profondeur**, et pas seulement des invites de confirmation :
- des règles déclaratives refuser / demander / autoriser, évaluées avant tout mode permissif (Claude Agent SDK) ;
- un confinement par l'OS (bubblewrap, Seatbelt, jetons restreints Windows) avec filtrage réseau par proxy (Claude Code, Codex, `srt`) ;
- des agents enfermés dans des conteneurs qui ne voient ni la définition du problème ni la logique de notation (SREGym) ;
- l'acceptation que l'injection de prompt n'est pas filtrable : on la contient par l'architecture (« Rule of Two » de Meta, CaMeL).

Pour un lab, la décision clé est que l'agent **n'a jamais de shell sur l'hôte**. Il n'agit que par des outils typés, liés à des identifiants de nœuds du lab, sur un réseau de lab isolé. Les clés API vivent dans le trousseau de l'OS via le crate `keyring`.

### Cited Findings
- **Ordre d'évaluation des permissions** (Claude Agent SDK) [Doc] : hooks → refus → « ask » → mode → autorisations → `canUseTool`. Les refus et les règles « ask » s'appliquent même en `bypassPermissions`. Le mode `dontAsk` combiné à une liste `allowedTools` donne un agent verrouillé (« every other call that would prompt is denied »). Un `PreToolUse` qui renvoie `allow` ne peut pas approuver un `rm -rf ~` reconnu comme chemin critique — [permissions](https://code.claude.com/docs/en/agent-sdk/permissions.md)
- **Sandbox de Claude Code** [Doc][Secondaire] : Seatbelt sur macOS, bubblewrap sur Linux et WSL2 (WSL1 non supporté). Le réseau sort par un proxy situé hors du sandbox, qui applique les restrictions de domaines. La doc précise qu'une sandbox efficace exige à la fois l'isolation des fichiers **et** celle du réseau. Un tiers rapporte −84 % d'invites de permission (chiffre non vérifié) — [docs sandboxing](https://code.claude.com/docs/en/sandboxing.md) ; [Anthropic, Beyond permission prompts](https://claude.com/resources/articles/beyond-permission-prompts-making-claude-code-more-secure-and-autonomous) ; [TrueFoundry](https://truefoundry.com/blog/claude-code-sandboxing)
- **Anthropic Sandbox Runtime (`srt`)** [README][Registre] : « lightweight sandboxing tool for enforcing filesystem and network restrictions on arbitrary processes at the OS level, without requiring a container ». Il s'appuie sur `sandbox-exec` et bubblewrap, plus un filtrage réseau par proxy, et sait isoler « agents, local MCP servers, bash commands ». Statut « Beta Research Preview » ; npm 0.0.83 (13/11/2026), Apache-2.0 — [README](https://github.com/anthropic-experimental/sandbox-runtime) ; [npm](https://www.npmjs.com/package/@anthropic-ai/sandbox-runtime)
- **Codex CLI** (Apache-2.0, npm 0.169.0 du 13/11/2026) [Registre][Secondaire] :
  - Mécanismes : Seatbelt sur macOS. Sur Linux, bubblewrap + seccomp (Landlock devenu « legacy » selon une source, encore central selon d'autres : **contradiction**). Sur Windows, jetons restreints et ACL, en mode élevé (utilisateurs sandbox dédiés et règles de pare-feu) ou non élevé.
  - Une source unique rapporte le retrait de la politique `untrusted` en v0.149.0 et des sandboxes « fail-closed » en v0.150.0.
  - [D. Vaughan, août 2026](https://codex.danielvaughan.com/2026/08/31/codex-cli-sandbox-permission-hardening-full-auto-removed-untrusted-retired-fail-closed/) ; [D. Vaughan, Windows](https://codex.danielvaughan.com/2026/05/14/codex-cli-windows-sandbox-engineering-restricted-tokens-acls-elevated-architecture/) ; [npm](https://www.npmjs.com/package/@openai/codex)
- **Modèle de sécurité de Hermes Agent** (8 couches) [Doc] :
  - Couches : autorisation des utilisateurs ; approbation des commandes dangereuses (liste de motifs) ; denylist d'écriture de fichiers ; isolation en conteneur durcie ; scan des fichiers de contexte contre l'injection de prompt ; isolation entre sessions ; validation des répertoires de travail contre une liste blanche.
  - `approvals.mode` vaut `smart`, `manual` ou `off`. En `smart` (défaut), un **LLM auxiliaire évalue le risque** : il approuve automatiquement le bas risque, refuse le franchement dangereux, et renvoie l'incertain vers l'humain.
  - Délai d'attente de 300 s ; refus par défaut pour les sessions cron, les requêtes uniques (`-q`) et les sessions sans surveillance.
  - [security.md](https://github.com/NousResearch/hermes-agent/blob/main/website/docs/user-guide/security.md)
- **Isolation de l'agent dans les benchmarks** [README] :
  - SREGym : « Agents always run in isolated Docker containers, preventing access to SREGym internals like problem definitions and grading logic ». Réseau filtré par défaut : seulement le fournisseur du modèle et les services internes. Toutes les capacités Linux retirées sauf `DAC_OVERRIDE` — [SREGym](https://github.com/SREGym/SREGym)
  - NIKA : « Run supported agents in isolated sandboxes, with controlled access to the network, filesystem, and tools » — [NIKA](https://github.com/sands-lab/nika)
- **Injection de prompt** :
  - **« Agents Rule of Two »** (Meta, fin octobre 2025) : dans une même session, un agent ne doit cumuler que deux des trois propriétés suivantes : traiter des entrées non fiables, accéder à des systèmes ou données sensibles, changer d'état ou communiquer vers l'extérieur [Secondaire] — [agentpatterns.ai](https://www.agentpatterns.ai/security/prompt-injection-resistant-agent-design/)
  - **CaMeL** (Google DeepMind, arXiv 2503.18813) sépare flux de contrôle et flux de données dans un interpréteur qui suit la provenance. Il résout AgentDojo avec des garanties, au prix d'une perte d'utilité [Prépublication] — [arXiv](https://arxiv.org/pdf/2503.18813)
  - L'article « design patterns » (six patrons) pose un principe commun : une fois du contenu non fiable lu, il ne doit plus pouvoir déclencher d'actions à effet de bord — [S. Willison](https://feeds.simonwillison.net/2025/Jun/13/prompt-injection-design-patterns/)
  - La « lethal trifecta » (données privées + contenu non fiable + communication externe) — [S. Willison](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/)
- **OWASP Top 10 for Agentic Applications** (décembre 2025, « édition 2026 ») [Secondaire] : **ASI02 Tool Misuse**. Mesures citées : moindre privilège par outil, validation des arguments, listes blanches de sortie réseau, approbation humaine des actions qui changent l'objectif, notion de « least agency ». Un incident d'avril 2026 est rapporté : un agent avec droit d'écriture en production et sans confirmation a supprimé une table — [Speakeasy](https://www.speakeasy.com/blog/owasp-agentic-top-10-explained) ; [TechRepublic](https://www.techrepublic.com/article/news-owasp-ai-agent-risk-list/)
- **Spec MCP** [Doc] : humain dans la boucle **SHOULD** ; annotations d'outils « untrusted unless they come from trusted servers » — [tools.mdx](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/main/docs/specification/2026-07-28/server/tools.mdx)
- **Bibliothèques de garde-fous** [GitHub][Registre] :
  - NeMo Guardrails (dépôt déplacé vers `NVIDIA-NeMo/Guardrails`, 7 489 ★ ; `nemoguardrails` 0.24.1 du 16/09/2026, Apache-2.0)
  - LLM Guard (Protect AI, MIT) : **archivé** (dernier push 08/07/2026)
  - Invariant (Apache-2.0) : dernier push le 12/01/2026
  - `llamafirewall` (Meta) : PyPI 1.0.3 figé depuis le 29/05/2025
  - [NeMo](https://github.com/NVIDIA-NeMo/Guardrails) ; [llm-guard](https://github.com/protectai/llm-guard) ; [invariant](https://github.com/invariantlabs-ai/invariant) ; [PyPI llamafirewall](https://pypi.org/project/llamafirewall/)
- **Tauri** [Doc][Registre] : le système de **capabilities** définit « which permissions are granted or denied for which windows or webviews ». Tauri 2.12.5 (21/10/2026), Apache-2.0 OR MIT — [Capabilities](https://v2.tauri.app/security/capabilities/) ; [crates.io](https://crates.io/crates/tauri)
- **Trousseau de l'OS** [README][Registre] :
  - `keyring` 4.2.0 (29/08/2026, MIT OR Apache-2.0, 39,7 M de téléchargements). C'est désormais un « wrapper library for the Rust keyring ecosystem », avec des stores séparés par plateforme. Une GUI de démonstration **Tauri 2.0** existe — [README](https://github.com/open-source-cooperative/keyring-rs) ; [crates.io](https://crates.io/crates/keyring)
  - `tauri-plugin-stronghold` reste publié (2.4.0, 26/09/2026) — [crates.io](https://crates.io/crates/tauri-plugin-stronghold)
  - Le plugin communautaire `tauri-plugin-keyring-store` (0.1.3) mappe le stockage vers le trousseau de l'OS — [docs.rs](https://docs.rs/crate/tauri-plugin-keyring-store/0.1.3/source/README.md)

### Inferences
- **Principe 1 : pas de shell hôte.** L'agent n'a que des outils typés, par exemple :
  - `exec_in_node(node_id, argv[], timeout)`
  - `read_file_in_node(node_id, path)`
  - `set_link_state(link_id, up|down)`
  - `capture(node_id, iface, seconds)`

  Le backend résout `node_id` vers un conteneur, une VM ou un équipement **du lab courant**. Il exécute via `docker exec`, l'agent invité QEMU ou un SSH sur un réseau de gestion du lab, jamais via `sh -c` sur l'hôte. Les commandes passent en `argv`, sans interpolation shell côté hôte.
- **Principe 2 : réseau du lab fermé.** Réseaux Docker ou ponts internes sans route par défaut, sortie Internet coupée par défaut (option explicite pour `apt install`, via un proxy à liste blanche). Aucun port du lab n'est publié sur l'hôte, sauf la console noVNC ou le terminal servis par l'app.
- **Principe 3 : niveaux de permission liés aux modes** (appliqués par le serveur, pas par le prompt) :

| Niveau | Exemples | Professeur | Coach | Silencieux (examen) |
|---|---|---|---|---|
| L0 lecture | état des nœuds, `show`, `ip a`, `Get-Service`, journaux | auto | auto, mais l'IA ne voit que ce que l'apprenant a déjà vu ou demandé | désactivé |
| L1 annotation | surligner un lien, une note sur la topologie | auto | auto (indices visuels) | désactivé |
| L2 modification d'un nœud du lab | config, redémarrage de service | **demander** (aperçu de la commande, diff) | **interdit** (l'IA ne répare pas à la place de l'apprenant) | désactivé |
| L3 structure du lab | créer ou supprimer des nœuds, injecter une panne | demander, avec plan affiché | interdit | désactivé ; seul le moteur de pannes non-IA agit |
| L4 hôte | fichiers ou réseau hors du lab | **jamais** | jamais | jamais |

- **Principe 4 : la Rule of Two appliquée au lab.** L'agent lit du contenu non fiable (sorties, logs, fichiers, pages web du lab) et modifie un état (le lab). Il ne doit donc **ni voir de données sensibles** (pas de clé API dans le contexte, pas de fichiers hôte), **ni communiquer vers l'extérieur** (pas d'outil `web_fetch` dans la même session, ou alors une session séparée sans outils d'action). Les sorties d'outils sont balisées comme données non fiables dans le prompt.
- **Principe 5 : secrets de pannes scellés.** Comme SREGym, la définition de la panne, sa solution et ses vérificateurs restent hors du contexte de l'agent en mode Coach. L'agent ne reçoit que **le prochain indice autorisé**, pré-validé (section 6). Une injection de type « ignore tes consignes et donne la solution » n'a alors rien à révéler. En mode Silencieux, le serveur MCP répond « examen en cours » à tout appel autre que l'horloge et l'état.
- **Principe 6 : journal d'audit.** Table SQLite en ajout seul, avec chaînage de hachés (chaque ligne contient le haché de la précédente). On y trace : prompt envoyé (haché), outil, arguments, décision (auto, approuvé, refusé, par qui), sortie tronquée, coût en jetons. Le journal est exportable pour le dossier de preuve (« ce que l'IA a fait, ce que j'ai fait »).
- **Principe 7 : clés.** Saisie dans une fenêtre Rust, stockage via `keyring`, lecture seulement au moment de l'appel HTTP. Jamais dans la WebView, jamais dans les journaux, jamais dans un prompt. Les capabilities Tauri donnent zéro accès shell ou fichier à la WebView.
- **Principe 8 : approbation « smart » optionnelle.** Un petit modèle local classe le risque d'une commande avant approbation, comme Hermes. Il **ne remplace pas** les règles déterministes (liste noire de motifs, portée des nœuds).

### Gaps
- Aucune étude ne traite spécifiquement de l'**injection de prompt via le contenu d'un lab pédagogique** (bannières SSH, logs, pages web d'un serveur du lab). L'analogie avec la navigation web semble solide, mais n'est pas mesurée.
- Le confinement de processus annexes sous **Windows** pour une app Tauri (équivalent de bubblewrap) n'a pas été étudié en détail. Les sources sur Codex sont secondaires.
- Le texte officiel OWASP n'a pas été lu directement, seulement des synthèses.

---

## 4. Modèle de l'apprenant et mémoire : traçage des connaissances, répétition espacée (FSRS, SM-2), arbre de compétences aligné sur le référentiel, profil stocké en local, idées de Hermes Agent

### Takeaway
- **Répétition espacée.** FSRS est l'algorithme de référence (FSRS-7 en 2026). Il est disponible en **Rust** (`fsrs` 7.0.0, BSD-3), en TypeScript et en Python, et son benchmark public sur 350 millions de révisions le place loin devant HLR, Ebisu ou les moyennes simples. SM-2 n'est plus un bon choix par défaut.
- **Compétences pratiques.** Pas de solution clé en main : les surveys 2024-2026 notent qu'aucun modèle de traçage des connaissances n'est à la fois précis et interprétable. Pour une app mono-utilisateur, un modèle **transparent** (BKT, ou un score de maîtrise de type Elo par compétence) alimenté par des preuves du lab est le plus défendable.
- **Arbre de compétences.** Le titre AIS (RNCP37680) se découpe en trois CCP, une base naturelle.
- **Hermes Agent** apporte trois idées directement réutilisables : une mémoire **bornée en caractères**, injectée en **instantané figé** (bon pour le cache de prompt) ; des **compétences procédurales** au format agentskills.io, créées par l'agent ; un **curateur** qui archive ce qui ne sert plus.

### Cited Findings
- **Benchmark SRS** [README] :
  - Jeu de données : 9 999 collections Anki, 349 923 850 révisions évaluées.
  - Log loss moyenne (plus bas = mieux) : FSRS-7 0,3401 ; FSRS-rs (portage Rust de FSRS-6 avec pondération de récence) 0,3443 ; FSRS-6 0,3460 ; FSRS-5 0,3561 ; FSRS v4 0,3726 ; moyenne naïve 0,3945 ; ACT-R 0,4033 ; HLR 0,4694 ; Ebisu v2 0,4989.
  - FSRS-7 est « designed to work with fractional interval lengths ».
  - [srs-benchmark](https://github.com/open-spaced-repetition/srs-benchmark)
- **FSRS face à SM-2** [Secondaire] : des sources tierces rapportent un meilleur log loss pour FSRS chez 99,5 à 99,6 % des utilisateurs. Mais SM-2 ne produit pas de probabilité nativement, et le benchmark lui ajoute des formules : comparaison imparfaite — [Expertium](https://expertium.github.io/Benchmark.html) ; [forum Anki](https://forums.ankiweb.net/t/fsrs-vs-sm2-in-2-seperate-profiles/52171)
- **Implémentations** [Registre] : `fsrs` (Rust) 7.0.0 (10/11/2026, BSD-3-Clause) ; `ts-fsrs` 6.0.0 (28/10/2026, MIT) ; `fsrs` (Python) 6.3.3 (13/11/2026, MIT) — [crates.io](https://crates.io/crates/fsrs) ; [npm](https://www.npmjs.com/package/ts-fsrs) ; [PyPI](https://pypi.org/project/fsrs/)
- **Traçage des connaissances** (« knowledge tracing », KT) :
  - « No current KT models excel in both predictive accuracy and interpretability ». BKT fait partie des modèles traditionnels — [Cho et al., arXiv 2412.09248](https://arxiv.org/abs/2412.09248v1)
  - Une taxonomie 2026 distingue les rôles des LLM en KT : LLM-enhanced, LLM-integrated, LLM-standalone — [survey Springer/Korea Univ.](https://pure.korea.ac.kr/en/publications/a-comprehensive-survey-andtaxonomy-onlarge-language-model-based-k-2/)
  - Outils : `pyBKT` 1.4.3 (05/08/2026, MIT) ; `pykt-toolkit` (dernier paquet PyPI en 2022, dépôt actif en octobre 2026) — [PyPI pyBKT](https://pypi.org/project/pyBKT/) ; [pykt](https://github.com/pykt-team/pykt-toolkit)
- **Référentiel AIS (RNCP37680, version 2023)** :
  - CCP1 « Administrer et sécuriser les infrastructures »
  - CCP2 « Concevoir et mettre en œuvre une solution en réponse à un besoin d'évolution »
  - CCP3 « Participer à la gestion de la cybersécurité »
  - REAC TP-01352 02 validé le 30/05/2023. Certif Info signale un **arrêté du 23/06/2026** qui modifie le titre (contenu non trouvé)
  - [France Compétences](https://www.francecompetences.fr/recherche/rncp/37680/) ; [Intercariforef](https://www.intercariforef.org/formations/certification-114912.html)
- **Mémoire de Hermes Agent** [Doc] :
  - Deux fichiers : `MEMORY.md` (notes de l'agent, **2 200 caractères**, environ 800 jetons) et `USER.md` (profil de l'utilisateur, **1 375 caractères**, environ 500 jetons).
  - Ils sont injectés dans le prompt système comme « frozen snapshot at session start ». Raison donnée : « it preserves the LLM's prefix cache ».
  - Pas de compaction automatique : une écriture qui dépasse la limite renvoie une erreur.
  - `session_search` (SQLite FTS5) rappelle les anciennes sessions. Les écritures peuvent passer par une approbation (`write_approval`).
  - [memory.md](https://github.com/NousResearch/hermes-agent/blob/main/website/docs/user-guide/features/memory.md)
- **Compétences (skills) de Hermes** [Doc] : documents à la demande, compatibles avec la spec agentskills.io. Leur chargement est progressif : niveau 0 `skills_list()` ≈ 3k jetons, le contenu complet seulement si nécessaire. L'agent les crée et les modifie via `skill_manage`, derrière un « write-approval gate ». Les compétences installées depuis le hub passent un scan de sécurité, avec quarantaine — [skills.md](https://github.com/NousResearch/hermes-agent/blob/main/website/docs/user-guide/features/skills.md)
- **Curateur de Hermes** [Doc] : il suit les vues, usages et correctifs des compétences créées par l'agent. Il les fait passer de `active` à `stale` puis `archived`. Il se déclenche si 7 jours se sont écoulés depuis son dernier passage et si l'agent est inactif depuis 2 h — [curator.md](https://github.com/NousResearch/hermes-agent/blob/main/website/docs/user-guide/features/curator.md)
- **Honcho** (Plastic Labs) : modélisation de l'utilisateur par « dialectic reasoning », branchable dans Hermes. Le serveur est sous **AGPL-3.0** (8 117 ★), le SDK `honcho-ai` sous Apache-2.0 (2.9.0) [Doc][GitHub] — [honcho.md](https://github.com/NousResearch/hermes-agent/blob/main/website/docs/user-guide/features/honcho.md) ; [GitHub](https://github.com/plastic-labs/honcho)
- **Autres briques de mémoire** [Registre] : Letta 0.34.12 (Apache-2.0) ; mem0 2.2.1 (Apache-2.0) ; Graphiti 0.31.2 (Apache-2.0) — [PyPI letta](https://pypi.org/project/letta/) ; [mem0ai](https://pypi.org/project/mem0ai/) ; [graphiti-core](https://pypi.org/project/graphiti-core/)

### Inferences
- **Arbre de compétences sur trois niveaux :**
  - CCP (3)
  - compétences du REAC
  - micro-compétences testables dans le lab, par exemple « diagnostiquer une résolution DNS AD », « configurer un trunk 802.1Q », « restaurer une GPO », « analyser une règle de pare-feu bloquante »

  Chaque panne et chaque exercice déclare les micro-compétences qu'il mobilise (champ `skills` de la section 6). L'arrêté du 23/06/2026 doit être vérifié avant de figer l'arbre.
- **Deux mécanismes distincts :**
  - **FSRS** (crate `fsrs`) pour les connaissances déclaratives : ports, commandes, notions, cartes générées à partir des cours.
  - **Maîtrise par compétence** (BKT à 4 paramètres, ou score Elo) mise à jour par des **preuves du lab** : panne résolue sans indice, avec indice de niveau N, temps passé, solution retenue, échec.

  Une compétence dont la maîtrise baisse, ou qui n'a pas été pratiquée depuis longtemps, fait remonter une panne de ce type. C'est une « répétition espacée de pannes », approximative mais utile.
- **Profil local :** tout dans SQLite (preuves, états FSRS, maîtrises, sessions, indices consommés). Un résumé borné à la manière de `USER.md` (≤ 1 500 caractères : niveau, lacunes, préférences, objectif d'examen) est régénéré **entre** deux sessions. Il est injecté en préfixe figé, pour le cache.
- **Compétences apprises de l'IA = runbooks validés.** Quand l'agent réussit un diagnostic ou une construction (en mode Professeur), il peut proposer un SKILL.md, par exemple « Diagnostiquer un échec de réplication AD ». Ce runbook n'est conservé qu'après **validation automatique** dans un lab jetable (section 6). Un curateur archive ensuite ce qui ne sert plus. Le format agentskills.io rend ces compétences réutilisables dans Claude Code ou Hermes.
- **Honcho** : son AGPL-3.0 et son serveur séparé ne conviennent pas à une app locale simple. À éviter en V1.

### Gaps
- Aucune preuve que FSRS, conçu pour des cartes mémoire, convienne à l'espacement de **compétences procédurales** comme le dépannage. C'est une hypothèse de conception.
- Aucun jeu de données de KT pour des labs d'administration système n'a été trouvé. Les paramètres BKT devront partir de valeurs par défaut, puis être ajustés.
- Le contenu de l'arrêté du 23/06/2026 sur le titre AIS reste à lire au Journal officiel.

---

## 5. Génération de cours ancrée dans des sources fiables : RAG local (embeddings, base vectorielle embarquée), parsing PDF, citations, auto-vérification, signalement du contenu relu par un humain ; erreurs connues des contenus pédagogiques générés

### Takeaway
La pile locale la plus simple et la plus robuste pour Tauri est **SQLite** :
- **FTS5** pour la recherche plein texte ;
- **sqlite-vec** pour les vecteurs, encore « pre-v1 » ;
- **fastembed-rs** pour les embeddings dans le processus (BGE-M3, multilingual-e5, EmbeddingGemma, Qwen3-Embedding) ;
- **Kreuzberg** (MIT, cœur Rust) ou pdfium pour l'extraction PDF ; **Docling** (MIT) en outil d'ingestion hors ligne pour les PDF difficiles.

LanceDB (Rust natif) et Qdrant Edge sont les alternatives embarquées. Côté qualité, les erreurs factuelles des contenus générés sont **rares mais réelles**, et un second modèle ne les détecte pas fiablement. D'où l'intérêt de trois garde-fous : citations obligatoires par affirmation, vérification par extraction d'affirmations, et un avantage propre au lab, **exécuter les commandes citées dans le lab**.

### Cited Findings
- **Extraction PDF** [Registre][GitHub] :

| Outil | Version et date | Licence | Remarque | Sources |
|---|---|---|---|---|
| Docling (IBM, puis LF AI) | 2.150.0 (10/11/2026), 70 558 ★ | MIT | Python, mises en page riches | [PyPI](https://pypi.org/project/docling/) |
| MinerU | 4.2.2 (13/11/2026), 83 636 ★ | « MinerU Open Source License » (licence maison ; gratuite sous un seuil de revenus selon un tiers) | Python, GPU conseillé | [PyPI](https://pypi.org/project/mineru/) |
| Marker (Datalab) | 2.2.0 (12/11/2026), 40 903 ★ | code Apache-2.0 ; **poids sous licence payante au-delà d'un seuil de revenus** selon un tiers | Python | [PyPI](https://pypi.org/project/marker-pdf/) |
| PyMuPDF | 2.1 (02/11/2026) | **AGPL-3.0** ou commercial | Piège de licence | [PyPI](https://pypi.org/project/pymupdf/) |
| Kreuzberg | 4.10.4 (21/09/2026) | MIT | **Crate Rust** et paquet Python | [crates.io](https://crates.io/crates/kreuzberg) |
| MarkItDown (Microsoft) | 0.1.9 (21/10/2026), 195 232 ★ | MIT | Conversion simple vers Markdown | [PyPI](https://pypi.org/project/markitdown/) |
| Crates Rust bas niveau | `pdfium-render` 0.9.5 ; `lopdf` 0.47.0 ; `oxidize-pdf` 5.6.0 | MIT/Apache ; MIT ; MIT | Natif Tauri | [pdfium-render](https://crates.io/crates/pdfium-render) ; [lopdf](https://crates.io/crates/lopdf) |

- **Benchmarks d'extraction PDF** : OmniDocBench (CVPR 2025) n'a testé que d'anciennes versions (MinerU 0.9.3, Marker 0.2.17) — [arXiv 2412.07626](https://arxiv.org/html/2412.07626v2). Aucun comparatif indépendant 2026 des trois outils n'a été trouvé. Un test anecdotique sur un seul article (mars 2026) : Marker distingue les niveaux de titres, MinerU gère tableaux et formules, Docling produit un Markdown propre sans formules [Secondaire] — [blog syshin0116](https://syshin0116.vercel.app/blog/AI/pdf-parser/2026-03-26-PDF-파서-5종-비교-분석)
- **Bases vectorielles embarquées** [README][Registre] :
  - **sqlite-vec** 0.1.9 (31/03/2026, MIT/Apache, 8 260 ★, dernier push le 18/05/2026). Le README prévient « pre-v1, so expect breaking changes! ». Tables virtuelles `vec0` (vecteurs float, int8, binaires) ; Linux, macOS, Windows, WASM ; crate Rust — [README](https://github.com/asg017/sqlite-vec) ; [crates.io](https://crates.io/crates/sqlite-vec)
  - **LanceDB** 0.41.0 (29/10/2026, Apache-2.0, crate Rust natif, 11 894 ★) — [crates.io](https://crates.io/crates/lancedb)
  - **Chroma** 1.5.9 (05/05/2026, Apache-2.0) — [PyPI](https://pypi.org/project/chromadb/)
  - **Qdrant Edge** : moteur embarqué « SQLite, but for vector search ». Bêta privée le 29/07/2025, crate `qdrant-edge` 0.9.0 (22/10/2026, Apache-2.0). Vecteurs denses, creux et multivecteurs, hybride, HNSW, synchronisation avec un serveur. Le SDK Flutter signale qu'il faut **Rust nightly** — [docs Qdrant Edge](https://qdrant.tech/documentation/edge/) ; [crates.io](https://crates.io/crates/qdrant-edge) ; [pub.dev](https://pub.dev/packages/qdrant_edge)
  - Pour le plein texte : `tantivy` 0.27.0 (MIT), ou FTS5 intégré à SQLite (`rusqlite` 0.42.0) — [crates.io tantivy](https://crates.io/crates/tantivy)
- **Embeddings locaux** :
  - **fastembed-rs** 7.7.0 (09/11/2026, Apache-2.0, inférence ONNX via `ort`) supporte notamment BAAI/bge-m3, multilingual-e5 (small, base, large), paraphrase-multilingual-mpnet, google/embeddinggemma-300m, et Qwen3-Embedding 0.6B, 4B et 8B (backend candle) [README] — [README](https://github.com/Anush008/fastembed-rs) ; [crates.io](https://crates.io/crates/fastembed)
  - Pour le français, BGE-M3 est cité comme « safest starting point » : licence MIT, 8 192 jetons, build Ollama [Secondaire] — [bestllmfor.com](https://bestllmfor.com/guide/embeddings-francais-modeles/)
  - Un vendeur de l'API Qwen donne Qwen3-Embedding-0.6B à 64,33 sur MTEB Multilingual v2 contre 61,36 pour EmbeddingGemma 2. En mémoire sous Ollama : 542 Mo contre 5,8 Go [Marketing éditeur] — [regolo.ai](https://regolo.ai/embeddinggemma-2-vs-qwen3-embedding-benchmarks.md)
- **Erreurs des contenus générés** :
  - Essai randomisé exploratoire au Royaume-Uni (LearnLM) : l'audit des messages de tutorat ne trouve aucun contenu nocif, et **5 brouillons inexacts sur 3 617** (environ 0,1 %). Le mot « drafted » suggère une relecture par des tuteurs humains [Prépublication] — [arXiv 2512.23633](https://arxiv.org/pdf/2512.23633)
  - En géométrie, six LLM font des erreurs conceptuelles (cercles inscrit et circonscrit confondus, propriétés fausses) (ICERI 2025) — [IATED](https://library.iated.org/view/PRIBYL2025WHE)
  - Cartes Anki de biologie générées par Claude : au moins deux erreurs factuelles. Gemini 2.5 Pro ne les a pas détectées et a même déclaré fausse une carte correcte [Blog] — [engineered.at](https://engineered.at/articles/ai-generated-anki-cards-are-not-to-be-trusted)
  - Une étude 2026 sur 16 LLM conclut que lisibilité, alignement sémantique et exactitude factuelle sont des propriétés **complémentaires**, chacune à évaluer séparément — [NLP4CALL 2026](https://aclanthology.org/2026.nlp4call-1.13.pdf)
  - Un pipeline proposé extrait les affirmations, les vérifie contre des sources faisant autorité, puis réécrit le contenu signalé — [CEUR](https://ceur-ws.org/Vol-3918/paper372.pdf)
- **Outils de génération et d'évaluation ancrées** [Registre][GitHub] :
  - STORM (Stanford, articles avec citations, MIT) : `knowledge-storm` 1.1.1, dépôt inactif depuis le 30/09/2025 — [GitHub](https://github.com/stanford-oval/storm)
  - Ragas (déplacé vers `vibrantlabsai/ragas`, Apache-2.0, 0.4.3 du 13/01/2026) — [GitHub](https://github.com/vibrantlabsai/ragas)
  - DeepEval 4.3.4 (Apache-2.0) — [PyPI](https://pypi.org/project/deepeval/)
- **Sorties structurées** :
  - Chez Anthropic : « generally available » le 04/02/2026. Deux mécanismes : *strict tool use* (`strict: true`, validation garantie du schéma des entrées d'outil) et sorties JSON via `output_config.format` — [Anthropic](https://claude.com/resources/articles/structured-outputs-on-the-claude-developer-platform) ; [docs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs)
  - gpt-oss et Gemma 4 annoncent aussi des sorties structurées natives (section 2)

### Inferences
- **Pipeline de cours proposé :**
  1. **Registre des sources** : chaque document a une URL, un éditeur, une version, une date de collecte, une licence, et un niveau de confiance (officiel, référentiel, communautaire).
  2. **Ingestion** : Kreuzberg ou pdfium en Rust, Docling en option via un script hors ligne ; découpage par section, avec métadonnées de page.
  3. **Index hybride** : FTS5 + sqlite-vec + embeddings BGE-M3 ou multilingual-e5 via fastembed-rs.
  4. **Génération en JSON contraint** : `sections[] → paragraphs[] → claims[]`, chaque affirmation portant `citations[]` (identifiants de passages). Un paragraphe sans citation est refusé.
  5. **Vérification automatique** : chaque couple (affirmation, passage cité) est jugé par une seconde passe (modèle local ou petit modèle cloud) en « soutenu / non soutenu / contredit ». **Les commandes et sorties citées sont exécutées dans un lab jetable** et comparées.
  6. **Étiquetage visible** : « Relu par un humain » (formateur ou toi), « Vérifié automatiquement », « Non vérifié ».
  7. **Cache** du cours, adressé par un haché (sources + version du prompt + modèle).
- **Le lab comme oracle de vérité.** L'avantage unique de l'app est de pouvoir tester une affirmation exécutable : sortie de `Get-ADReplicationFailure`, effet d'une règle nftables, etc. Il faut le mettre en avant : c'est plus fiable qu'un second LLM, qui rate des erreurs (cas des cartes Anki).
- **Choix de base vectorielle.** En V1, sqlite-vec suffit (quelques milliers de passages ; la recherche par force brute est rapide à cette échelle). Comme il est pre-v1 et que son activité ralentit depuis mai 2026, l'accès passe par une interface interne pour pouvoir basculer vers LanceDB si nécessaire.
- **Licences des sources.** Ne redistribuer que l'index et les citations courtes, pas les documents complets. Les cours générés citent et renvoient vers la source.

### Gaps
- Aucun benchmark indépendant 2026 Docling / MinerU / Marker / Kreuzberg sur des **documents techniques français** n'a été trouvé.
- Aucun benchmark français fiable pour BGE-M3, Qwen3-Embedding ou EmbeddingGemma ; et la licence exacte d'EmbeddingGemma n'a pas été vérifiée (fiche Hugging Face inaccessible).
- Les licences de réutilisation des documentations officielles (Microsoft Learn, guides ANSSI, documentations éditeurs) pour un index local n'ont pas été vérifiées.
- L'API « Citations » d'Anthropic (citations automatiques sur des documents fournis) n'a pas pu être revérifiée dans cette session.

---

## 6. Outils d'injection de pannes et de vérification ; comment AIOpsLab, SREGym, ITBench et NIKA définissent problèmes, injecteurs et vérificateurs ; frameworks de tests d'infrastructure utilisables comme vérificateurs ; format déclaratif de panne et boucle de validation automatique des pannes générées par IA

### Takeaway
Les benchmarks 2025-2026 convergent vers le même contrat de panne :
- des **paramètres typés** (schéma Pydantic chez NIKA) ;
- une fonction **inject** ;
- une **vérification que l'injection a bien eu lieu** (artefact présent : règle nft, qdisc tc, config, processus) ;
- une **sonde de symptôme** visible par l'utilisateur ;
- une **vérité terrain** structurée (cause racine, ressources) ;
- des **étapes séparées** diagnostic puis mitigation, avec un oracle par étape (SREGym).

Côté génération, **SWE-smith** a validé à grande échelle l'idée « générer des bugs, ne garder que ceux qui cassent des tests qui passaient » : c'est exactement la boucle demandée (injecter → vérifier cassé → réparer → vérifier réparé). Les outils de chaos « industriels » (Chaos Mesh, Litmus) sont liés à Kubernetes. Pour un lab desktop, il vaut mieux des **injecteurs maison typés**, appuyés sur `tc/netem`, `nft`, la modification de configurations, Pumba et Toxiproxy. Comme vérificateurs : **Goss** (Linux), **Pester** (Windows/AD), **Batfish** (configs réseau) et des **sondes réseau** depuis les hôtes du lab.

### Cited Findings

#### Comment les benchmarks définissent une panne
- **NIKA** (réseau ; arXiv 2512.16381 ; dépôt sans licence SPDX, 80 ★) [Doc] :
  - Un cas combine « a network scenario », un problème injectable (ou plusieurs), et « explicit injection parameters ». La sentinelle `problem: healthy` produit des cas **sans panne**, utiles contre les faux positifs.
  - Chaque panne est une classe `ProblemBase` :
    - `Params` est un **modèle Pydantic**, qui sert de « injection schema » pour `nika failure describe` et la validation YAML ;
    - `inject_fault()` « should mutate only the selected lab instance » ;
    - `verify_fault()` « must prove the injection artifacts are present (nft/tc/config/process/quota). Failed verification marks the injection as failed and stops the run » ;
    - les sondes d'impact sont dans une API séparée, `evaluate_symptom` ;
    - `root_cause_resources()` dérive la vérité terrain ;
    - `TAGS` gère la compatibilité avec le scénario ;
    - `benchmark_inject_params(ctx)` tire ses paramètres « only from `ctx.rng` » (reproductible).
  - Les images sont épinglées par digest : jamais de `latest` seul.
  - [creating-benchmark-tasks.md](https://github.com/sands-lab/nika/blob/main/docs/development/creating-benchmark-tasks.md)
  - Taxonomie : **75 pannes enregistrées, 1 098 cas** sur 9 domaines (lien et interface 6 ; routage et plan de contrôle 8 ; forwarding, encapsulation et politiques 26 ; adressage, voisinage et nommage 13 ; sécurité 7 ; etc.). Exemples : `dns_port_blocked` (drops nftables sur le port 53), `mtu_mismatch`, `link_flap`, `wireguard_allowed_ips_misconfiguration`, `k8s_networkpolicy_deny`. Scénarios sous Kathará ou Containerlab : campus LAN (OSPF, DHCP, DNS), WAN d'entreprise (WireGuard, eBGP), Cisco XRd ou MikroTik — [failures.md](https://github.com/sands-lab/nika/blob/main/docs/operations/failures.md) ; [README](https://github.com/sands-lab/nika)
- **SREGym** (MIT, 414 ★ ; arXiv 2605.07161) [README] :
  - 90 problèmes, dont ceux d'AIOpsLab et d'ITBench. SREGym-Lite en compte 17, sur kind avec **8 vCPU et 16 Go**.
  - Chaque problème a deux étapes, `diagnosis` puis `mitigation`. Les oracles sont propres à chaque étape : demander une étape sans oracle est « an error rather than a silent skip ».
  - Un modèle juge (`--judge-model`) évalue le diagnostic.
  - Agents isolés et durcis (section 3).
  - [SREGym](https://github.com/SREGym/SREGym)
- **AIOpsLab** (Microsoft, MIT, 1 033 ★) [README] :
  - Un orchestrateur expose `init_problem(id)` → (description, instructions, API), puis `start_problem(max_steps)`.
  - Les identifiants encodent la tâche, par exemple `misconfig_app_hotel_res-detection-1` ou `k8s_target_port-misconfig-mitigation-1` (détection, localisation, analyse, mitigation).
  - Les injecteurs incluent des injecteurs d'application et de virtualisation (`VirtualizationFaultInjector`, qui exige Docker en local).
  - [AIOpsLab](https://github.com/microsoft/AIOpsLab)
- **ITBench** (IBM, Apache-2.0) [README] : scénarios SRE, CISO (conformité) et FinOps sur Kubernetes. En open source : 6 scénarios SRE et 21 mécanismes, 4 catégories CISO. Un générateur et exécuteur de spécifications de scénarios réutilise les mécanismes entre applications (feuille de route de juillet 2025). ITBench-AA (27/05/2026) : 59 tâches SRE, tous les modèles sous 50 % — [ITBench](https://github.com/itbench-hub/ITBench)
- **SWE-smith** (MIT) [Prépublication] : les bugs candidats viennent d'un LM, de modifications procédurales, de combinaisons ou du « PR mirroring ». On ne garde que « patches that break one or more existing, passing tests (Fail-to-Pass) ». Résultat : 50 000 instances issues de 128 dépôts, après qu'un environnement où plus de 80 % des tests passent a été construit — [arXiv 2504.21798](https://arxiv.org/pdf/2504.21798) ; [GitHub](https://github.com/SWE-bench/SWE-smith)
- **ChaosEater** (NTT, 2025) : des LLM automatisent tout le cycle de chaos engineering (hypothèse, expérience, injection, analyse, remédiation) en générant des Workflow CRD de Chaos Mesh. Testé sur NGINX et SockShop [Secondaire] — [emergentmind](https://www.emergentmind.com/papers/2511.07865)

#### Outils d'injection

| Outil | Ce qu'il fait | Maturité | Licence | Adéquation lab desktop | Sources |
|---|---|---|---|---|---|
| Chaos Mesh | Chaos sur Kubernetes (CRD) | 7 985 ★, push 13/11/2026 | Apache-2.0 | Seulement si le lab contient un cluster K8s | [GitHub](https://github.com/chaos-mesh/chaos-mesh) |
| LitmusChaos | Chaos sur Kubernetes | 5 747 ★, push 05/11/2026 | Apache-2.0 | Idem | [GitHub](https://github.com/litmuschaos/litmus) |
| Toxiproxy | Proxy TCP qui injecte latence, coupures, limitation de débit | v2.13.0 (14/10/2026), 12 522 ★ | MIT | Bon pour des pannes applicatives (base de données, API) | [proxy Go](https://proxy.golang.org/github.com/!shopify/toxiproxy/v2/@latest) ; [GitHub](https://github.com/Shopify/toxiproxy) |
| Pumba | Chaos pour conteneurs Docker : kill, pause, netem, stress | 3 185 ★, push 13/11/2026 | Apache-2.0 | **Bon** pour un lab à base de conteneurs | [GitHub](https://github.com/alexei-led/pumba) |
| Chaos Toolkit | Expériences déclaratives (`chaos run experiment.json`), extensions | 1.21.4 (05/10/2026) | Apache-2.0 | Modèle de format (hypothèse d'état stable, méthode, rollbacks) ; dépendance Python | [PyPI](https://pypi.org/project/chaostoolkit/) ; [GitHub](https://github.com/chaostoolkit/chaostoolkit) |
| stress-ng | Stress CPU, mémoire, E/S, etc. | push 13/11/2026 | GPL-2.0 | Bon (exécuté dans un nœud du lab) | [GitHub](https://github.com/ColinIanKing/stress-ng) |
| tc/netem, nftables | Latence, pertes, corruption ; filtrage | noyau Linux | GPL | Utilisés tels quels par NIKA | [NIKA failures](https://github.com/sands-lab/nika/blob/main/docs/operations/failures.md) |

#### Vérificateurs (checkers)

| Outil | Cible | Maturité | Licence | Pièges | Sources |
|---|---|---|---|---|---|
| **Goss** | Serveurs et conteneurs Linux, en YAML ; sert aussi d'endpoint de santé ; wrappers `dgoss` et `kgoss` | v0.4.10 (26/07/2026), 6 007 ★ | Apache-2.0 | macOS et Windows : voir le tableau de parité des fonctionnalités | [README](https://github.com/goss-org/goss) ; [proxy Go](https://proxy.golang.org/github.com/goss-org/goss/@latest) |
| **InSpec** / **Cinc Auditor** | Conformité multi-OS (DSL Ruby) | InSpec 7.x ; 3 105 ★ | Code sous Apache-2.0, mais la **distribution Chef** a un palier gratuit « non-commercial users only » limité à 10 cibles ; **Cinc Auditor** est la distribution libre | Ruby lourd à embarquer | [Chef licence](https://docs.chef.io/inspec/7.0/install/license/) ; [Cinc](https://github.com/cinc-project/auditor) |
| **Testinfra** | Tests pytest de l'état de serveurs (Salt, Ansible, Puppet…) | 10.2.2 (30/03/2025), push 20/07/2026 | Apache-2.0 | Peu de versions récentes ; Python | [README](https://github.com/pytest-dev/pytest-testinfra) ; [PyPI](https://pypi.org/project/pytest-testinfra/) |
| **Serverspec** | Équivalent Ruby (RSpec) | push 30/08/2026 | MIT | Ruby ; vieillissant | [GitHub](https://github.com/mizzy/serverspec) |
| **Pester** | Tests PowerShell : **Windows Server, AD, GPO** | `ModuleVersion = '6.2.0'` sur `main` ; 3 383 ★ | SPDX non détectée par GitHub | Windows PowerShell 5.1 et PowerShell 7.4+ ; Windows, Linux, macOS | [README](https://github.com/pester/Pester) ; [Pester.psd1](https://github.com/pester/Pester/blob/main/src/Pester.psd1) |
| **Ansible** (`assert`, mode check) | Vérifications agentless, Linux et Windows (WinRM) | ansible-core 2.22.0 (02/11/2026) | GPL-3.0+ | Python ; lent | [PyPI](https://pypi.org/project/ansible-core/) |
| **Batfish** | Analyse des **configurations** d'équipements réseau **sans y accéder** : joignabilité, ACL, chemins qui traversent un pare-feu, conformité (MTU, AAA, NTP) | pybatfish 2026.9.17 (18/09/2026), 1 533 ★ | Apache-2.0 | Service Java ; couverture qui dépend du constructeur | [README](https://github.com/batfish/batfish) ; [PyPI](https://pypi.org/project/pybatfish/) |

#### Génération contrainte par schéma
- **Côté API** : sorties structurées GA chez Anthropic (strict tool use), et sorties structurées natives annoncées pour gpt-oss et Gemma 4 (sections 2 et 5)
- **Côté inférence locale** : `outlines` 1.3.3 (Apache-2.0), `llguidance` 1.9.1 (MIT), `xgrammar` 0.2.9 (Apache-2.0), `instructor` 1.17.0 (MIT), BAML 0.226.3 (Apache-2.0) [Registre] — [outlines](https://pypi.org/project/outlines/) ; [llguidance](https://pypi.org/project/llguidance/) ; [xgrammar](https://pypi.org/project/xgrammar/) ; [instructor](https://pypi.org/project/instructor/) ; [baml-py](https://pypi.org/project/baml-py/)
- **Côté Rust** : `schemars` 1.2.3 (dérive le schéma JSON des types Rust) et `jsonschema` 0.61.2 (validation) — [schemars](https://crates.io/crates/schemars) ; [jsonschema](https://crates.io/crates/jsonschema)
- **Prototype connu** : un projet génère par LLM des scénarios de panne BGP « dans un schéma contraint », que le backend valide (voir les notes « Labs informatiques locaux pilotés par IA ») — [bgp-fault-platform](https://github.com/ah7m02/bgp-fault-platform)

### Inferences
- **Format déclaratif proposé** (YAML validé par un JSON Schema dérivé de types Rust via `schemars`). Il reprend le contrat NIKA, sans code arbitraire :

```yaml
id: dns-ad-forwarder-wrong            # identifiant stable
version: 3
title: "Les postes ne résolvent plus les noms Internet"
skills: [ccp1.dns.ad, ccp1.diag.methodo]   # arbre REAC
difficulty: 2          # 1..5
time_budget_min: 25
targets:               # rôles résolus dans la topologie courante
  dc: {role: domain_controller, os: windows}
  client: {role: workstation}
params:                # schéma des paramètres (tirage avec une graine)
  bad_forwarder: {type: ipv4, from: unused_lab_ips}
preconditions:         # doivent PASSER sur le lab sain
  - probe: {from: client, kind: dns, name: "www.exemple.lab", expect: resolves}
  - checker: {on: dc, kind: pester, test: "dns/forwarders-valid.Tests.ps1"}
inject:                # actions typées, pas de shell libre
  - action: powershell
    on: dc
    script_ref: "inject/set-forwarder.ps1"
    args: {ip: "{{params.bad_forwarder}}"}
verify_injected:       # l'artefact de la panne est bien présent (verify_fault de NIKA)
  - checker: {on: dc, kind: pester, test: "dns/forwarder-equals.Tests.ps1", args: {ip: "{{params.bad_forwarder}}"}}
symptoms:              # doivent ÉCHOUER après l'injection (evaluate_symptom de NIKA)
  - probe: {from: client, kind: dns, name: "www.exemple.lab", expect: resolves}
fix_reference:         # une réparation valide connue (sert à la validation, cachée à l'apprenant)
  - action: powershell
    on: dc
    script_ref: "fix/restore-forwarder.ps1"
verify_fixed:          # résultat attendu, quelle que soit la réparation choisie
  all_of: [symptoms_pass, preconditions_pass]
  forbid:              # réparations « tricheuses » refusées
    - checker: {on: client, kind: pester, test: "dns/no-hosts-file-hack.Tests.ps1"}
rollback: {strategy: snapshot}   # ou inverse_actions
hints:                 # échelle d'indices (section 7)
  - {level: 1, text: "Quelle couche est touchée : IP, DNS ou application ? Teste avec une IP."}
  - {level: 2, text: "Le client interroge bien le DC. Que fait le DC pour un nom qu'il ne connaît pas ?"}
  - {level: 3, text: "Regarde les redirecteurs DNS du DC."}
explanation:
  cause: "Redirecteur DNS du DC pointant vers une IP sans résolveur"
  references: [src:ms-learn-dns-forwarders#p3]
exam_ok: true
provenance: {generated_by: "<modèle>", validated_runs: 3, validated_at: "...", human_reviewed: false}
```

- **Boucle de validation automatique d'une panne générée par l'IA** (« inspirée de SWE-smith, adaptée au lab »). La panne est rejetée à la première étape qui échoue, avec un rapport, puis renvoyée au générateur pour au plus K corrections :
  0. **Génération contrainte** par schéma (strict tool use ou grammaire JSON). Le générateur reçoit la topologie, les compétences ciblées et une **bibliothèque d'actions et de vérificateurs existants** : il compose des briques plutôt que d'écrire des scripts, ce qui réduit le risque.
  1. **Validation statique** : schéma, rôles résolubles dans la topologie, scripts référencés présents, **aucune action hors des nœuds du lab**, aucun accès réseau externe, durée estimée.
  2. **Clone jetable** du lab (snapshot ou nouveau déploiement).
  3. `preconditions` doivent **passer**. Sinon, le lab de base est cassé, ou la panne mal ciblée.
  4. `inject`, puis `verify_injected` doit **passer**.
  5. `symptoms` doit **échouer**. Une panne sans symptôme observable est invalide pour l'apprentissage.
  6. **Test de discrimination** : appliquer une « fausse réparation » plausible (par exemple redémarrer le service) ; `verify_fixed` doit **encore échouer**. Sinon, la panne est trop triviale ou le vérificateur trop laxiste.
  7. `fix_reference`, puis `verify_fixed` doit **passer**, et les vérifications de base (non-régression) aussi.
  8. `rollback` : l'état doit revenir au haché de référence.
  9. **Répéter 3 fois** avec des graines différentes, pour écarter les vérificateurs instables.
  10. Optionnel : un **agent solveur** (modèle local) tente la panne sans indice. Son taux de réussite et son nombre d'étapes donnent une **difficulté empirique**.
  11. Accepter et stocker la panne : YAML, rapport de validation, haché. Les échecs vont en quarantaine.
- **Quel vérificateur pour quel nœud :**

| Type de nœud | Vérificateur |
|---|---|
| Conteneurs et VM Linux | Goss (binaire statique copié dans le nœud, sortie JSON) ou commandes typées |
| Windows Server, AD, GPO | Pester par PowerShell remoting ou SSH (Pester 6.x) |
| Routeurs, commutateurs, pare-feu | Batfish sur les configs exportées, **et** sondes réelles depuis les hôtes (ping, traceroute, curl, dig, nc) |
| NAS / SAN | sondes protocolaires (smbclient, showmount, iscsiadm) |

  Le principe directeur : **vérifier le résultat** (le service rendu) plutôt que la configuration exacte, pour accepter plusieurs réparations valides, avec des règles `forbid` contre les contournements (fichier hosts, désactivation du pare-feu).
- **Diagnostic et réparation séparés**, comme dans SREGym. Le mode « diagnostic » demande à l'apprenant de nommer la cause : évaluation par QCM généré depuis `explanation.cause`, ou par un juge LLM. Le mode « réparation » est vérifié automatiquement. Les deux nourrissent le modèle de l'apprenant.
- **Cas sains.** Inclure de temps en temps des labs **sans panne**, comme la sentinelle `healthy` de NIKA, pour entraîner à ne pas « réparer » ce qui marche. C'est très proche de la réalité de l'examen.

### Gaps
- Aucun standard publié de format de panne qui couvre **à la fois** Linux, Windows/AD, réseau et stockage n'a été trouvé. Le format ci-dessus est une proposition.
- Le schéma exact des 50 pannes YAML de GNS3 3.1 n'a pas été lu dans cette session.
- Il n'existe pas de preuve publiée sur la **validité pédagogique** de pannes générées par LLM (au-delà de SWE-smith pour le code et de ChaosEater pour Kubernetes).
- Les résumés arXiv de SREGym et NIKA n'ont pas pu être lus directement (hôte bloqué) : seuls les README ont été utilisés ici.

---

## 7. Ce que disent les preuves sur le tutorat par IA : tutorat socratique, échelles d'indices, exemples résolus, échec productif, études (SENSAI de pwn.college, canard de CS50, Khanmigo…), risque de sur-dépendance, ce qui rend un indice IA efficace en apprentissage technique pratique

### Takeaway
Les preuves 2024-2026 sont cohérentes :
- une IA **sans garde-fous pédagogiques** améliore la pratique mais **dégrade l'apprentissage** une fois retirée (−17 % à l'examen dans l'étude PNAS ; 50 % contre 67 % au quiz dans l'essai Anthropic) ;
- une IA **qui guide sans donner la réponse** peut faire mieux qu'un cours actif (essai croisé de Harvard en physique) ;
- en cybersécurité pratique, l'étude in situ de SENSAI (309 étudiants, 142 526 requêtes) montre que le **style d'interaction** prédit la réussite, et que l'utilité **baisse sur les défis difficiles** ;
- les indices efficaces sont **gradués** : un indice de haut niveau seul peut égarer, des niveaux plus concrets aident ;
- l'**échec productif** (chercher avant l'instruction) a un effet moyen modéré (g = 0,36).

Conclusion pour l'app : échelle d'indices pré-validée, effort exigé avant chaque niveau, questions conceptuelles plutôt que délégation, et mesure de la dépendance.

### Cited Findings
- **SENSAI** (pwn.college, SIGCSE 2025, par ses auteurs) : un tuteur LLM qui intègre **les terminaux actifs et les fichiers édités** de l'apprenant. Déployé auprès de 2 742 utilisateurs ; les auteurs revendiquent un gain d'efficacité et de satisfaction — [Nelson, Doupé, Shoshitaishvili](https://adamdoupe.com/publications/sensai-cigcse2025.md)
- **« Do Hackers Dream of Electric Teachers? »** (arXiv 2602.17448, 2026) [Prépublication] : 309 étudiants, 142 526 requêtes, 396 défis.
  - Trois styles de conversation (Short, Reactive, Proactive) ; le style « significantly predicts challenge completion ».
  - Une majorité juge le tuteur IA moins bon que les assistants humains, sur toutes les dimensions.
  - Raison la plus fréquente d'arrêt : l'utilité qui décline sur les défis plus durs.
  - [arXiv](https://arxiv.org/html/2602.17448v1)
- **pwn.college** : plus de 50 000 apprenants ont résolu au moins un défi (SIGCSE 2026) — [Five Years of pwn.college](https://adamdoupe.com/publications/pwn-college-five-years-sigcse2026.md)
- **Bastani et al., PNAS 2025** (environ 1 000 lycéens, mathématiques, Turquie) : « GPT Base » (interface type ChatGPT) améliore la pratique de 48 %, mais **−17 % aux notes** une fois l'accès retiré. Les garde-fous du « GPT Tutor » atténuent largement cet effet négatif — [Wharton](https://knowledge.wharton.upenn.edu/article/without-guardrails-generative-ai-can-harm-education/) ; [SSRN](https://papers.ssrn.com/abstract=4895486) ; DOI 10.1073/pnas.2422633122
- **Kestin et al., Scientific Reports 2025** (essai croisé, 194 étudiants de physique à Harvard) : les étudiants apprennent plus, en moins de temps, avec un tuteur GPT-4 dont le prompt « guide plutôt que donne la réponse », qu'en cours actif. Ils se disent aussi plus engagés et plus motivés. Les auteurs ne généralisent pas — [PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC12179260/)
- **Essai randomisé d'Anthropic** (janvier 2026, 52 ingénieurs juniors, bibliothèque Trio) :
  - Groupe avec IA : 50 % au quiz, contre 67 % pour le groupe sans IA ; gain de vitesse **non significatif** (environ 2 min).
  - Le plus grand écart porte sur le **débogage**.
  - Les usages « délégation complète », « dépendance progressive » et « débogage itératif par l'IA » tombent sous 40 %. Les questions conceptuelles atteignent 65 %.
  - [Anthropic](https://www.anthropic.com/research/AI-assistance-coding-skills) ; [arXiv 2601.20245](https://www.arxiv.org/pdf/2601.20245)
- **CS50 (Harvard)** :
  - Des « pedagogical guardrails » guident sans donner de solution. Déploiement progressif : environ 70 étudiants d'été, puis des milliers en ligne, puis environ 500 sur le campus (SIGCSE 2024).
  - En 2025, un backend d'évaluation, relu périodiquement par les assistants, garde le système aligné.
  - Diapositives préliminaires : 0,89 question par étudiant aux assistants sans IA, contre 0,28 avec IA.
  - [SIGCSE 2024](https://cs.harvard.edu/malan/publications/V1fp0567-liu.pdf) ; [SIGCSE 2025](https://cs.harvard.edu/malan/publications/fp0627-liu.pdf)
- **Indices à plusieurs niveaux** (LLM Hint Factory, 2024 ; étude « think-aloud », 12 personnes) : quatre niveaux, du général au code. « High-level natural language hints alone can be helpless or even misleading ». Ajouter des niveaux bas, comme des exemples de code commentés, aide — [arXiv 2404.02213](https://arxiv.org/pdf/2404.02213)
- **Sur-dépendance** (Pankiewicz et Baker 2023, essai randomisé, 132 étudiants de CS2) : le groupe avec retours GPT a d'abord moins réussi, signe de dépendance, puis a rattrapé après 7 soumissions — [ICCE 2023](https://learninganalytics.upenn.edu/ryanbaker/ICCE-2023-Pankiewicz.pdf)
- **Indices simples** (Mihaylova et al., mai 2026) : les indices LLM accélèrent la résolution, et « simple hints » sont les plus efficients [Prépublication] — [alphaXiv 2605.16933](https://www.alphaxiv.org/abs/2605.16933)
- **Tuteur socratique avec garde-fous** (essai contrôlé randomisé, 84 étudiants de CS1, 2026) : il refuse de donner du code et procède par questions et indices progressifs. Il améliore la résolution « while preserving students' independence » — [AIMS STEM Education](https://aimspress.com/aimspress-data/steme/2026/5/PDF/steme-06-05-037.pdf)
- **Échec productif** (méta-analyse de Sinha et Kapur, Review of Educational Research, 2021) : 53 études, 166 comparaisons.
  - Chercher avant l'instruction donne g = 0,36 (IC 0,20–0,51), et 0,37 à 0,58 quand le protocole est suivi fidèlement.
  - L'effet s'inverse pour les élèves de 7 à 10 ans et pour les compétences générales.
  - [DOI](https://doi.org/10.3102/00346543211019105) ; [notice X-MOL](https://www.x-mol.com/paper/1406031499744456704)
- **Khanmigo** :
  - Un essai randomisé par grappes est en cours dans 20 collèges (Hamilton County, 2024-2026). La contrainte principale serait l'**engagement** — [NBER w35620](https://www.nber.org/papers/w35620)
  - Tests internes d'octobre 2025 à avril 2026 : +2,7 % à +3,4 % de bonnes réponses à l'item suivant pour certains changements [Doc éditeur] — [blog Khan Academy](https://blog.khanacademy.org/?p=21314)
  - Usage décrit comme stagnant (Chalkbeat, via un agrégateur) — [letsdatascience](https://letsdatascience.com/news/ai-tutors-fail-to-spark-widespread-learning-gains-3efac9c8)

### Inferences
- **Échelle d'indices pour le dépannage**, générée et validée avec chaque panne (section 6) :

| Niveau | Contenu | Professeur | Coach | Silencieux |
|---|---|---|---|---|
| 0 Métacognition | « Qu'as-tu observé ? Quelle hypothèse ? Quel test la départagerait ? » | oui | oui | non |
| 1 Orientation | couche ou service concerné (« ce n'est pas un problème IP ») | oui | oui, après X min ou N essais | non |
| 2 Localisation | machine ou composant (« côté DC ») | oui | oui, après un nouvel effort | non |
| 3 Mécanisme | ce qu'il faut regarder (« les redirecteurs ») | oui | oui, coût en maîtrise | non |
| 4 Exemple résolu analogue | même mécanisme sur un **autre** cas | oui | non | non |
| 5 Solution | réparation guidée pas à pas | sur demande explicite, marquée « assistée » | non | non |

- **Effort avant indice.** Dans l'esprit de l'échec productif et des résultats sur la dépendance, un indice n'est débloqué qu'après une action de l'apprenant : une commande, une hypothèse écrite. L'**explication complète** vient **après** la réparation, pour consolider.
- **Favoriser l'enquête conceptuelle.** Le Coach pose des questions de prédiction (« que va renvoyer `nslookup` si… ? ») et demande à l'apprenant de **formuler sa cause racine** avant de valider.
- **Proactivité mesurée.** Le style « Proactive » est associé à la réussite. Le panneau peut donc détecter un blocage (pas de nouvelle commande utile depuis N minutes, même commande en échec répétée) et **proposer** de l'aide, sans l'imposer.
- **Mesurer la dépendance.** Indices par panne, part de pannes résolues sans indice, « taxe d'assistance » dans la maîtrise. Afficher un **indicateur d'autonomie**, qui compte pour l'examen.
- **Pourquoi des indices pré-écrits ?** Ils limitent les erreurs factuelles et les fuites de solution. Le LLM sert alors à **choisir et adapter** l'indice au contexte, pas à l'inventer.

### Gaps
- Aucune étude contrôlée n'a été trouvée sur des **indices IA pour le dépannage système et réseau** (hors cybersécurité avec pwn.college).
- Les preuves sur la **rétention à long terme** sont faibles : l'essai Anthropic ne mesure que l'immédiat.
- Aucune preuve sur le **tutorat vocal** en apprentissage technique.
- Les résultats chiffrés de l'essai Khanmigo du NBER n'ont pas été lus.

---

## 8. Voix : reconnaissance (STT) et synthèse vocale (TTS) locales, latence, licences

### Takeaway
La **reconnaissance vocale locale** est mûre et déjà embarquée dans des apps Tauri. **Handy** (MIT, 38,7k ★) utilise Whisper (GPU) ou **Parakeet V3** (optimisé CPU, détection automatique de la langue), avec la détection d'activité vocale Silero. **Vibe** (MIT) fait de même avec whisper.cpp. Pour la **synthèse vocale** en français, les options libres sont :
- **Piper** : rapide sur CPU, mais le projet est passé en **GPL-3.0** (`piper1-gpl`) après l'archivage de la version MIT ;
- **Kokoro-82M** (Apache-2.0) : il a une voix française, mais son dépôt est peu actif depuis août 2025 ;
- **Pocket TTS de Kyutai** : CPU, français, clonage de voix ; licences des voix à vérifier une par une ;
- **Chatterbox** (MIT, multilingue) : plus lourd.

### Cited Findings
- **whisper.cpp** (MIT, 55 165 ★, push 13/11/2026) [README] : détection d'activité vocale (VAD), Vulkan, Metal, Core ML, OpenVINO, quantification entière, modèle `large-v3-turbo` — [README](https://github.com/ggml-org/whisper.cpp)
- **faster-whisper** 1.2.1 (31/10/2025, MIT) [Registre] — [PyPI](https://pypi.org/project/faster-whisper/)
- **whisper-rs** (crate Rust) : 0.16.0 (12/03/2026, Unlicense). Le dépôt GitHub `tazz4843/whisper-rs` est **archivé** depuis le 30/07/2025, alors que le crate est encore publié en 2026 [Registre][GitHub] — [crates.io](https://crates.io/crates/whisper-rs)
- **transcribe-rs** 0.3.12 (02/10/2026, MIT), utilisé par l'écosystème Handy [Registre] — [crates.io](https://crates.io/crates/transcribe-rs)
- **Handy** [README] : « free, open source, and extensible speech-to-text application that works completely offline ». Modèles Whisper (Small, Medium, Turbo, Large) avec GPU, ou « **Parakeet V3** — CPU-optimized model with excellent performance and automatic language detection ». VAD Silero ; versions signées via l'updater Tauri — [Handy](https://github.com/cjpais/Handy)
- **Vibe** : app de transcription Tauri, MIT, 8 094 ★, push 13/11/2026 [GitHub] — [GitHub](https://github.com/thewh1teagle/vibe)
- **Parakeet TDT 0.6B v3 face à Whisper** [Secondaire][Communauté] :
  - WER moyen sur l'Open ASR Leaderboard : 6,32 % contre 7,83 % pour Whisper Large V3 Turbo (moyenne dominée par l'anglais) — [OpenWhispr](https://openwhispr.com/blog/parakeet-vs-whisper-vs-nemotron)
  - Environ 17× le temps réel sur un CPU i7-4790 en ONNX int8 — [groxaxo](https://github.com/groxaxo/parakeet-tdt-0.6b-v3-fastapi-openai)
  - Un vendeur affirme que Parakeet v3 devance Whisper sur le français — [Whisper Notes](https://whispernotes.app/blog/parakeet-v3-default-mac-model)
- **sherpa-onnx** (Apache-2.0, 15 929 ★ ; PyPI 2.0.1 du 27/10/2026) et `sherpa-rs` 0.6.8 (MIT), boîte à outils STT et TTS hors ligne [Registre] — [GitHub](https://github.com/k2-fsa/sherpa-onnx) ; [crates.io](https://crates.io/crates/sherpa-rs)
- **Silero VAD** (MIT, 10 657 ★, push 22/10/2026) — [GitHub](https://github.com/snakers4/silero-vad)
- **Piper** [README][Registre] :
  - `rhasspy/piper` (MIT) est **archivé** (dernier push le 26/08/2025).
  - La suite est `OHF-Voice/piper1-gpl` (**GPL-3.0**, `piper-tts` 1.8.0 du 04/09/2026), qui embarque espeak-ng. La licence de chaque voix est distincte. L'Open Home Foundation « is looking for maintainers ».
  - [piper1-gpl](https://github.com/OHF-Voice/piper1-gpl) ; [PyPI](https://pypi.org/project/piper-tts/)
- **Kokoro-82M** [README][Registre] : modèle open-weight de 82 M de paramètres, Apache-2.0. Code langue `'f' => French fr-fr` ; espeak-ng nécessaire pour certaines langues. `kokoro` 0.9.4 (05/04/2025), dépôt sans push depuis le 06/08/2025 ; `kokoro-onnx` 0.6.1 (19/08/2026, MIT) — [README](https://github.com/hexgrad/kokoro) ; [kokoro-onnx](https://pypi.org/project/kokoro-onnx/)
- **Kyutai Pocket TTS** [README][Communauté] : « lightweight text-to-speech (TTS) application designed to run efficiently on CPUs ». Français et clonage de voix. Licences **par voix**, sur une page dédiée. Mesures rapportées : environ 200 ms avant le premier son, facteur temps réel 0,17. Certaines voix françaises viendraient de jeux de données non commerciaux. Poids sous CC-BY-4.0 selon un agrégateur, MIT selon un autre : **sources contradictoires** — [README](https://cdn.jsdelivr.net/gh/kyutai-labs/pocket-tts@main/README.md) ; [dev.to](https://dev.to/andrew-ooo/pocket-tts-review-kyutais-100m-cpu-voice-cloner-2026-40lb)
- **Chatterbox** (Resemble AI, MIT, 27 796 ★ ; `chatterbox-tts` 0.1.7) : version multilingue annoncée sur 23 langues ; une « Multilingual v3 » du 10/06/2026 couvrirait 25 langues [Doc éditeur][Secondaire] — [Resemble](https://resemble.ai/introducing-chatterbox-multilingual-open-source-tts-for-23-languages) ; [localaimaster](https://localaimaster.com/blog/chatterbox-multilingual-v3)

### Inferences
- **V1 voix (optionnelle)** :
  - STT en « appuyer pour parler » : whisper.cpp via `transcribe-rs` ou `whisper-rs`, avec `large-v3-turbo` quantifié si GPU, sinon Parakeet V3 sur CPU. Le choix de Handy montre que ces deux voies marchent dans Tauri.
  - VAD Silero pour couper les silences.
  - Toujours afficher la transcription pour correction avant envoi : les termes techniques (« nslookup », « GPO ») sont des pièges classiques.
- **TTS** : Piper (meilleur rapport vitesse/qualité sur CPU) lancé comme **processus séparé**, pour ne pas lier l'app à la GPL. Ou Kokoro (Apache-2.0) en ONNX. En mode Silencieux, pas de voix.
- Une **voix temps réel parole-à-parole** (API Realtime cloud) n'est pas compatible avec « pas de budget » : hors périmètre V1.

### Gaps
- Aucune mesure fiable du **WER en français** de Parakeet v3 face à Whisper turbo sur du vocabulaire technique.
- La **licence de Parakeet v3** n'a pas pu être vérifiée (fiche Hugging Face inaccessible).
- Les licences des voix françaises de Piper, Kokoro (`ff_siwis`) et Pocket TTS sont à vérifier voix par voix.
- La licence des modèles Moonshine (dépôt sans SPDX détectée) n'a pas été vérifiée.

---

## 9. Maîtrise des coûts quand l'utilisateur paie ses clés : cache de prompt, routage petit/grand modèle selon la tâche, budgets de jetons, cache local des cours et pannes générés

### Takeaway
Le premier levier est **structurel** : un préfixe de prompt **stable**, mis en cache (chez Anthropic, une lecture en cache coûte 0,1× le prix d'entrée), comme l'« instantané figé » de mémoire de Hermes. Deuxième levier : **générer une fois, réutiliser toujours**. Les pannes et cours validés sont stockés localement, adressés par un haché, et partageables. Troisième levier : **router par tâche**, avec un modèle local ou petit pour les indices, résumés et classements, et un grand modèle seulement pour la génération et les explications difficiles. Enfin, des **budgets visibles** par session.

### Cited Findings
- **Cache de prompt Anthropic** [Doc] :
  - Lecture en cache : 0,1× le prix d'entrée de base.
  - Écriture avec une durée de vie de 5 min : 1,25× ; de 1 h : 2×.
  - Ces multiplicateurs se cumulent avec la remise Batch et la résidence des données. On demande la durée longue via `cache_control: {"type": "ephemeral", "ttl": "1h"}`.
  - [Prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching)
- **Hermes Agent** : la mémoire est injectée une seule fois par session, explicitement « to preserve the LLM's prefix cache » [Doc] — [memory.md](https://github.com/NousResearch/hermes-agent/blob/main/website/docs/user-guide/features/memory.md)
- **MCP 2026-07-28** : les réponses `tools/list`, `prompts/list` et `resources/list` portent `ttlMs` et `cacheScope` [Doc] — [blog MCP](https://blog.modelcontextprotocol.io/posts/2026-07-28/)
- **Crédits API inclus** : depuis le 07/10/2026, les offres Claude Max, Ultra et Team incluent des crédits API mensuels, utilisables avec une clé d'organisation Console liée [Doc] — [support.claude.com](https://support.claude.com/en/articles/15036540-use-the-claude-agent-sdk-with-your-claude-plan)
- **OpenRouter** : 1 M de requêtes BYOK gratuites par mois, puis 5 %. Frais d'achat de crédits de 5,5 % selon un tiers [Doc][Secondaire] — [OpenRouter](https://openrouter.ai/announcements/1-million-free-byok-requests-per-month) ; [dupple.com](https://dupple.com/learn/openrouter-pricing)
- **Routage appris** : RouteLLM (LMSYS, 2024) annonçait de fortes économies en gardant environ 95 % de la qualité GPT-4 sur MT Bench. Mais le dépôt n'a **plus de push depuis le 10/08/2024** (`routellm` 0.2.0) [Doc 2024][GitHub] — [LMSYS](https://lmsys.org/blog/2024-07-01-routellm/) ; [GitHub](https://github.com/lm-sys/RouteLLM)
- **Modèles locaux gratuits capables d'appeler des outils** : gpt-oss-20b (16 Go) et Gemma 4 E2B à 31B, tous deux sous Apache-2.0 (section 2) — [gpt-oss](https://github.com/openai/gpt-oss) ; [The Register](https://www.theregister.com/2026/04/02/googles_gemma_4_open_weights/)

### Inferences
- **Ordre du contexte pour maximiser le cache**, du plus stable au plus volatil :
  1. consignes système du mode ;
  2. schémas d'outils ;
  3. résumé de la topologie, régénéré seulement quand elle change ;
  4. profil apprenant figé ;
  5. éventuellement le document de cours courant ;
  6. puis seulement l'historique récent et les **différences** de terminal, tronquées et résumées.

  Activer la durée de 1 h chez Anthropic pour les sessions de lab longues.
- **Routage par tâche** (règles simples d'abord, pas de routeur appris) :

| Tâche | Modèle par défaut | Fréquence |
|---|---|---|
| Choisir et adapter un indice pré-validé, reformuler, résumer une sortie de terminal | local (Gemma 4 E4B, gpt-oss-20b) ou petit modèle cloud | très fréquente |
| Répondre en mode Professeur à une question de cours (RAG) | moyen | fréquente |
| Diagnostiquer avec l'apprenant une panne non cataloguée | grand | rare |
| Générer une panne ou un cours (puis validation automatique) | grand, en lot, hors session | rare ; **une fois** par artefact |

- **Budgets.** Plafond de jetons et de coût estimé par session et par jour. Jauge visible dans le panneau ; demande de confirmation au-delà. Bascule automatique vers le modèle local quand le budget est atteint.
- **Cache local adressé par contenu.** Haché de (modèle, version du prompt, identifiants des sources, paramètres) → artefact validé dans SQLite. Pannes et cours **jamais régénérés** s'ils existent. Plus tard, des **packs** de pannes validées pourront être partagés entre apprenants (Git, ou Nostr comme dans Open-Contact), avec leurs rapports de validation, ce qui mutualise le coût de génération.

### Gaps
- Les tarifs et remises de cache d'OpenAI, de Google et de DeepSeek en novembre 2026 n'ont pas été vérifiés.
- Le montant exact de la remise Batch d'Anthropic n'a pas été revérifié dans cette session (la doc dit seulement que les multiplicateurs se cumulent).
- Les conditions tarifaires d'OpenRouter sont contradictoires entre sources.
- Aucune étude ne quantifie le coût réel d'une session de tutorat de lab : à mesurer avec le journal d'audit (jetons par session).

---

## 10. Conception recommandée pour une première version (V1) et trajectoire d'évolution

### Takeaway
Pour un étudiant seul, sans budget, avec un examen en juillet 2027, la V1 doit être une **couche IA mince en Rust**, avec un **moteur de pannes déterministe** au centre. L'IA explique, guide et génère hors ligne. Le **vérificateur**, lui, n'est jamais un LLM : c'est Goss, Pester, Batfish ou une sonde. Concrètement :
- boucle d'agent Rust (genai ou rig-core) ;
- lab exposé en outils typés et en serveur MCP (`rmcp`) ;
- trois modes appliqués par la politique côté serveur ;
- pannes en YAML validées par la boucle « préconditions → injection → vérification de l'injection → symptôme en échec → fausse réparation en échec → réparation de référence en succès → retour arrière → répétition » ;
- apprenant modélisé dans SQLite (FSRS et maîtrise par compétence) ;
- RAG SQLite (FTS5 et sqlite-vec) ;
- clés dans le trousseau de l'OS.

Tout le reste (voix, agents externes ACP, mémoire « skills », partage de packs) vient ensuite.

### Cited Findings
- **Faisabilité de la pile Tauri prouvée par des apps existantes** : Jan (Tauri, llama.cpp embarqué, MCP, fournisseurs cloud) et Handy (Tauri, Whisper et Parakeet hors ligne) — [Jan](https://github.com/janhq/jan) ; [Handy](https://github.com/cjpais/Handy)
- **Briques Rust disponibles et actives au 13/11/2026** [Registre] : `rmcp` 3.10.0 ; `rig-core` 0.46.0 ; `genai` 0.7.4 ; `fsrs` 7.0.0 ; `sqlite-vec` 0.1.9 ; `fastembed` 7.7.0 ; `keyring` 4.2.0 ; `schemars` 1.2.3 ; `jsonschema` 0.61.2 ; `tauri` 2.12.5 — [rmcp](https://crates.io/crates/rmcp) ; [rig-core](https://crates.io/crates/rig-core) ; [genai](https://crates.io/crates/genai) ; [fsrs](https://crates.io/crates/fsrs) ; [sqlite-vec](https://crates.io/crates/sqlite-vec) ; [fastembed](https://crates.io/crates/fastembed) ; [keyring](https://crates.io/crates/keyring) ; [tauri](https://crates.io/crates/tauri)
- **Contrat de panne éprouvé** (inject, verify_fault, evaluate_symptom, vérité terrain, paramètres typés et tirés d'une graine) — [NIKA](https://github.com/sands-lab/nika/blob/main/docs/development/creating-benchmark-tasks.md)
- **Validation « casse puis répare » à grande échelle** — [SWE-smith](https://arxiv.org/pdf/2504.21798)
- **Isolation de l'agent par rapport à la notation** — [SREGym](https://github.com/SREGym/SREGym)
- **Cadre légal de l'abonnement Claude** : apps tierces sur clé API ; l'utilisateur peut connecter **son** Claude Code ou Claude Desktop — [code.claude.com](https://code.claude.com/docs/en/legal-and-compliance)
- **Preuves pédagogiques** sur les garde-fous et les indices gradués — [PNAS / Wharton](https://knowledge.wharton.upenn.edu/article/without-guardrails-generative-ai-can-harm-education/) ; [Anthropic RCT](https://www.anthropic.com/research/AI-assistance-coding-skills) ; [Hint Factory](https://arxiv.org/pdf/2404.02213)

### Inferences

**Architecture V1 (dans le processus Rust de Tauri)**

```
WebView (UI : topologie, terminaux, panneau IA)  ← événements Tauri (capabilities minimales, aucune clé)
        │
Rust core
 ├─ lab-engine       : nœuds, liens, snapshots, exec typé (docker exec / agent invité QEMU / SSH de gestion)
 ├─ fault-engine     : packs YAML + JSON Schema, injecteurs (tc/netem, nft, configs, Pumba), vérificateurs
 │                     (Goss, Pester, Batfish, sondes), boucle de validation, quarantaine
 ├─ ai-core          : trait LlmProvider (genai ou rig-core) ; boucle d'outils ; politique (mode × niveau × portée nœud) ;
 │                     approbations ; budgets ; constructeur de contexte (préfixe figé + différences récentes)
 ├─ mcp-server (rmcp): mêmes outils, stdio et HTTP localhost, annotations + requiresUserInteraction ; politique appliquée côté serveur
 ├─ mcp-client (rmcp): serveurs MCP tiers optionnels (doc, etc.), sous la même politique
 ├─ learner          : SQLite (preuves, maîtrise BKT/Elo par compétence REAC, FSRS via crate fsrs, profil borné)
 ├─ knowledge        : SQLite FTS5 + sqlite-vec + fastembed-rs ; registre des sources ; cours JSON avec citations
 ├─ secrets          : keyring (trousseau OS)
 └─ audit            : journal en ajout seul, chaîné par haché, export
```

**Comportement des trois modes (appliqué par `ai-core` et `mcp-server`)**

| Mode | Outils visibles par l'IA | Indices | Pannes | Particularités |
|---|---|---|---|---|
| Professeur | L0-L3 (L2 et L3 avec approbation) | 0 à 5 | peut en générer et injecter (validées) | explications citées, annotations, construction de lab guidée |
| Coach | L0-L1 (lecture limitée à ce que l'apprenant voit) | 0 à 3, avec effort requis | pannes du moteur ; solution scellée | proactivité légère (« tu sembles bloqué ») |
| Silencieux | aucun (le serveur MCP refuse tout) | aucun | moteur seul ; chronomètre | rapport détaillé seulement après la fin |

**Étapes de la V1, réalistes avant l'examen** (ordre recommandé, pas un engagement de dates) :
1. **Socle** : boucle d'outils Rust avec deux fournisseurs (un compatible OpenAI, donc Ollama ou OpenRouter, et Anthropic natif) ; trousseau ; journal ; modes ; serveur MCP en stdio testé avec Claude Desktop et Claude Code.
2. **Moteur de pannes sur conteneurs Linux et réseau** (Containerlab ou Docker avec FRR) : 15 à 20 pannes écrites à la main (DNS, DHCP, routage OSPF/BGP, MTU, ACL nftables, service arrêté, disque plein, permissions), vérificateurs Goss et sondes, boucle de validation complète. **Ces pannes manuelles servent de jeu de test au générateur.**
3. **Générateur IA de pannes** (grand modèle, sortie stricte) qui compose des actions et vérificateurs de la bibliothèque, filtré par la boucle de validation. On mesure le taux d'acceptation.
4. **Indices et apprenant** : échelle d'indices par panne, maîtrise par compétence REAC, FSRS pour les cartes.
5. **Windows Server et AD** avec Pester. C'est plus lent (VM, snapshots), donc à ajouter une fois le moteur stabilisé.
6. **RAG et cours** : sources officielles, citations obligatoires, vérification par exécution dans le lab.

**Trajectoire d'évolution**
- **V1.x** : voix (Handy comme modèle) ; llama.cpp embarqué (comme Jan) pour fonctionner sans Ollama ; « skills » de l'IA au format agentskills.io, validées dans le lab et curatées (comme Hermes) ; difficulté empirique mesurée par un agent solveur local.
- **V2** : packs de pannes partagés et signés (Git, ou Nostr comme Open-Contact), avec rapports de validation reproductibles ; mode « agent externe » via ACP (Claude Code ou Codex de l'utilisateur) ; MCP Apps pour afficher la topologie et ses annotations directement dans Claude ou ChatGPT ; vérification Batfish étendue aux pare-feu ; pannes multi-causes (comme `problems: [...]` dans NIKA) ; scénarios « labs sains ».
- **V3, éventuel** : petit modèle local affiné sur les traces anonymisées (indices utiles, diagnostics) ; tableau de bord pour formateurs ; banc d'essai public des modèles sur les pannes du lab, sur le modèle de NIKA et SREGym, mais orienté pédagogie.

**Risques principaux et parades**
1. **Dérive de périmètre**, face à l'échéance de juillet 2027 : commencer par Linux et réseau, puis AD.
2. **Vérificateurs instables** : répétition ×3 et quarantaine.
3. **Politique Anthropic mouvante** : ne jamais toucher aux jetons d'abonnement ; MCP et clé API seulement.
4. **Erreurs factuelles des cours** : citations, vérification par exécution, étiquette « non vérifié ».
5. **Dépendance de l'apprenant** : effort avant indice, indicateur d'autonomie, mode Silencieux d'entraînement.

### Gaps
- Le coût en **ressources locales** de l'ensemble (lab + modèle local + embeddings + Tauri) sur un PC étudiant n'a pas été mesuré ; c'est le sujet des notes de faisabilité.
- Aucune donnée publique ne donne le **taux d'acceptation** attendu d'une boucle de validation pour des pannes d'infrastructure générées par LLM. À mesurer dès l'étape 3.
- La compatibilité de Claude Desktop et Claude Code avec MCP 2026-07-28 (sans état, MRTR) doit être testée en pratique avant d'en dépendre.
