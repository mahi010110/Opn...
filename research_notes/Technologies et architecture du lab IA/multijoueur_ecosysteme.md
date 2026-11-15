# Multijoueur, réseau pair-à-pair, attaque/défense, partage de contenus, identité portable et pratiques open source pour une app de bureau de labs IT sans serveur (état au 13 novembre 2026)

> Méthode : versions et dates vérifiées le 13/11/2026 directement dans les registres (npm, crates.io, proxy Go, PyPI, Docker Hub, API GitLab) et dans les fichiers bruts des dépôts GitHub (README, LICENSE, CHANGELOG). L'API GitHub et les pages github.com (onglet Releases) étaient bloquées dans cette session : quand un projet ne publie ni paquet ni image, la « dernière release » n'a pas pu être lue (voir les Gaps). Les sites tailscale.com, zerotier.com, netbird.io, w3.org, gnu.org, news.ycombinator.com et gitlab.ics.muni.cz n'étaient pas joignables en direct : leurs informations viennent de recherches web (résumés de résultats), ce qui est signalé à chaque fois.

## 1. Collaboration temps réel : état partagé (CRDT), terminaux partagés, curseurs, voix P2P

### Takeaway
Les trois bibliothèques CRDT de référence (Yjs/yrs, Automerge, Loro) sont actives en 2026, sous MIT, et indépendantes du transport. Loro colle le mieux à un backend Rust/Tauri : même cœur en Rust et en JS, et un « time travel » dans l'historique, utile pour les replays. Aucun outil de terminal partagé n'est à la fois sans serveur et maintenu : les serveurs publics tmate ont fermé en juillet 2025 et sshx ne s'auto-héberge pas. La solution robuste consiste à envoyer le flux d'un PTY sur le canal P2P vers xterm.js et à l'enregistrer en asciicast v3. La voix WebRTC dans la webview Tauri marche sur Windows et macOS, mais pas avec le WebKitGTK standard de Linux.

### Cited Findings

#### CRDT (état partagé)
- **Yjs** (JS) : 13.6.33 publiée le 2026-09-23, licence MIT — [registre npm](https://registry.npmjs.org/yjs)
- **yrs** (portage Rust de Yjs, dépôt y-crdt) : 0.28.1 publiée le 2026-11-04, MIT, ≈2,39 M de téléchargements sur 90 jours — [crates.io](https://crates.io/crates/yrs)
- Yjs délègue le réseau et la persistance à des « providers » interchangeables (liste de « connection providers » dans le README) — [README Yjs](https://github.com/yjs/yjs/blob/HEAD/README.md)
- **y-webrtc** promet « encryption and authorization over untrusted signaling servers », annonce des serveurs de signalisation publics, un mot de passe de salle optionnel, et fournit son propre serveur de signalisation (`bin/server.js`) — [README y-webrtc](https://github.com/yjs/y-webrtc/blob/HEAD/README.md). Dernière version npm : 10.3.0 du 2023-12-28, rien depuis — [registre npm](https://registry.npmjs.org/y-webrtc)
- **Automerge** : JS 3.5.0 (2026-09-16) et Rust 0.12.0 (2026-09-16), MIT. Le cœur Rust est exposé en JS+WASM et en C — [npm](https://registry.npmjs.org/@automerge/automerge), [crates.io](https://crates.io/crates/automerge), [README](https://github.com/automerge/automerge/blob/HEAD/README.md). Pour automerge-repo, le tag npm « latest » pointe sur une 2.6.0-alpha.3 (2026-08-07) — [npm](https://registry.npmjs.org/@automerge/automerge-repo)
- **Loro** : 1.17.1 (2026-10-22) en Rust et en JS, MIT. Fonctionnalités annoncées : synchronisation P2P, CRDT de texte riche, arbre déplaçable, « time travel » rapide dans l'historique, contrôle de version avec collaboration temps réel, snapshot superficiel façon « git shallow clone » — [crates.io](https://crates.io/crates/loro), [npm](https://registry.npmjs.org/loro-crdt), [README](https://github.com/loro-dev/loro/blob/HEAD/README.md)

#### Terminaux partagés et enregistrement
- **tmux** : dernière version listée 3.8 (entrée « CHANGES FROM 3.7c TO 3.8 »), licence permissive de type ISC — [CHANGES](https://github.com/tmux/tmux/blob/HEAD/CHANGES), [COPYING](https://github.com/tmux/tmux/blob/HEAD/COPYING)
- **tmate** : « The public tmate servers (ssh.tmate.io) were shut down in July 2025, so tmate no longer works out of the box ». La réécriture du serveur en Rust et le retour du service hébergé sont suivis dans l'issue #336. En attendant, il faut faire tourner son propre `tmate-ssh-server` — [README tmate](https://github.com/tmate-io/tmate/blob/HEAD/README.md). L'image Docker `tmate-ssh-server` n'a pas bougé depuis le 2021-03-21 — [Docker Hub](https://hub.docker.com/r/tmate/tmate-ssh-server/tags)
- **ttyd** (terminal dans le navigateur, via WebSocket) : MIT. Image 1.7.8 publiée le 2026-03-19, tags `latest`/`alpine` rafraîchis le 2026-08-12 — [LICENSE](https://github.com/tsl0922/ttyd/blob/HEAD/LICENSE), [Docker Hub](https://hub.docker.com/r/tsl0922/ttyd/tags)
- **sshx** : terminal web collaboratif, avec les curseurs des autres en temps réel et un chiffrement de bout en bout (Argon2 + AES). Les serveurs sont hébergés par l'auteur sur Fly.io, et « Self-hosted deployments are not supported at the moment ». Licence MIT — [README](https://github.com/ekzhang/sshx/blob/HEAD/README.md), [LICENSE](https://github.com/ekzhang/sshx/blob/HEAD/LICENSE)
- **upterm** : partage de session via un relais SSH, public (`uptermd.upterm.dev`) ou auto-hébergé. v0.41.1 du 2026-11-05 — [README](https://github.com/owenthereal/upterm/blob/HEAD/README.md), [proxy Go](https://proxy.golang.org/github.com/owenthereal/upterm/@latest)
- **xterm.js** : `@xterm/xterm` 6.0.0 (2025-12-22), MIT — [npm](https://registry.npmjs.org/@xterm/xterm)
- **asciinema** (CLI réécrit, publié sur crates.io) : 3.0.0 (2025-09-15), 3.1.0 (2026-01-14), 3.2.0 (2026-03-01), licence GPL-3.0-or-later — [CHANGELOG](https://github.com/asciinema/asciinema/blob/HEAD/CHANGELOG.md), [crates.io](https://crates.io/crates/asciinema). Il enregistre au format asciicast v3 (`.cast`), diffuse en direct en local ou à distance, et embarque un serveur HTTP avec lecteur web pour regarder sur le LAN ou en localhost — [README](https://github.com/asciinema/asciinema/blob/HEAD/README.md)
- **asciinema-player** : 3.18.0 (2026-11-05), Apache-2.0 — [npm](https://registry.npmjs.org/asciinema-player)

#### Présence et curseurs
- sshx sert de référence pour les curseurs des participants affichés en temps réel sur un terminal partagé — [README sshx](https://github.com/ekzhang/sshx/blob/HEAD/README.md)
- Trystero gère la présence (`userId` par utilisateur, `peerId` par onglet, présence multi-onglets) — [README Trystero](https://github.com/dmotz/trystero/blob/HEAD/README.md), [docs/identity.md](https://github.com/dmotz/trystero/blob/HEAD/docs/identity.md)

#### Voix et médias P2P (WebRTC)
- Trystero : « media flow straight from browser to browser, end-to-end encrypted ». v0.27.0 publiée le 2026-11-11, MIT — [README](https://github.com/dmotz/trystero/blob/HEAD/README.md), [npm](https://registry.npmjs.org/trystero), [LICENSE](https://github.com/dmotz/trystero/blob/HEAD/LICENSE)
- Linux, premier écueil : le bug WebKit « [GTK] Enable WebRTC on WebkitGTK » (ouvert en 2024) montre que WebRTC est désactivé dans les builds standard — [WebKit Bugzilla 274711](https://bugs.webkit.org/show_bug.cgi?id=274711)
- Un développeur n'a obtenu dans Tauri un WebRTC *partiel* qu'avec trois conditions : un WebKitGTK recompilé, les réglages WebRTC/media-stream activés, et X11 au lieu de Wayland — [discussion Tauri #8426](https://github.com/tauri-apps/tauri/discussions/8426)
- Une équipe qui développe une app Tauri rapportait en 2025 que le WebKitGTK par défaut ne supporte pas WebRTC — [blog Hopp](https://gethopp.app/blog/hate-webkit)
- Piste CEF : l'équipe Tauri maintient un fork `cef-rs`, des bindings Rust de Chromium Embedded Framework pour Linux, macOS et Windows — [ecosyste.ms : tauri-apps/cef-rs](https://awesome.ecosyste.ms/projects/github.com%2Ftauri-apps%2Fcef-rs)
- Exemple d'adoption de CEF : Dorion v7.0.0 l'a choisi sous Linux pour obtenir la voix et le partage d'écran — [newreleases](https://newreleases.io/project/github/SpikeHD/Dorion/release/v7.0.0)
- Tauri : branche stable 2.12.5. Une 3.0.0-alpha.6 est publiée (crate mise à jour le 2026-11-06). Licence Apache-2.0 OR MIT — [crates.io tauri](https://crates.io/crates/tauri)
- WebRTC natif côté Rust :
  - `webrtc` (webrtc-rs) : 0.21.1 stable, MIT/Apache-2.0, ≈3,8 M de téléchargements sur 90 jours — [crates.io](https://crates.io/crates/webrtc)
  - `str0m` : 0.25.0 (2026-11-03), MIT OR Apache-2.0 — [crates.io](https://crates.io/crates/str0m)
- WebRTC en Go : Pion v4.2.26 (2026-10-28), MIT — [proxy Go](https://proxy.golang.org/github.com/pion/webrtc/v4/@latest), [LICENSE](https://github.com/pion/webrtc/blob/HEAD/LICENSE)

### Inferences
- **Choix CRDT** : Loro est le meilleur candidat pour une app Tauri. Un seul document vit côté Rust (superviseur IA, persistance) et côté webview (UI). Le time travel donne gratuitement la timeline du débrief. yrs/Yjs reste une alternative solide avec un écosystème plus large (éditeurs), tandis qu'Automerge a un tag « latest » en alpha pour son module repo. Les trois sont sous MIT, donc compatibles avec n'importe quelle licence d'app.
- **Ne pas dépendre de y-webrtc**, qui n'est plus publié depuis fin 2023 et repose sur WebRTC dans la webview, donc casse sous Linux. Mieux vaut un mini-provider maison : on sérialise les updates CRDT et on les fait passer par le canal P2P choisi (action Trystero, ou stream iroh, voir §2).
- **Terminal partagé maison** : PTY lancé côté hôte, en Rust. Les octets passent sur le canal P2P chiffré et sont affichés dans xterm.js chez les pairs. Ajouter un « jeton clavier » (une seule personne tape à la fois), un mode observateur par défaut et un enregistrement `.cast` au format asciicast v3, lu ensuite par asciinema-player (Apache-2.0).
- **asciinema** : produire le format soi-même plutôt qu'embarquer le CLI, qui est sous GPL-3.0-or-later. Cela évite la question de licence si l'app reste permissive.
- **tmux** sert seulement si les joueurs ont un accès SSH à la même machine (co-op via l'overlay du §2). tmate, sshx et upterm réintroduisent un relais tiers ou un serveur à héberger.
- **Curseurs et présence** : messages éphémères (position dans le terminal, nœud survolé dans le schéma réseau) envoyés en non-fiable. On ne les stocke pas dans l'historique CRDT, pour ne pas le polluer.
- **Voix** : la traiter comme une option.
  - Windows (WebView2) et macOS (WKWebView) : WebRTC via Trystero dans la webview.
  - Linux : pas de voix intégrée tant que Tauri n'offre pas CEF, ou bien un pipeline Rust (str0m/webrtc-rs plus capture et codec audio), plus lourd. Repli simple : un outil vocal externe.
  - Le maillage WebRTC tient bien à 2–5 personnes, ce qui suffit pour duel et co-op. Un tournoi de classe n'a pas besoin de voix.

### Gaps
- La licence d'upterm n'a pas été vérifiée (README lu, LICENSE non lu).
- Les plans Tauri 3 pour la webview Linux (CEF officiel ou non) ne sont pas confirmés. Le poids ajouté par CEF (100 à 170 Mo selon des retours non vérifiés) reste à mesurer.
- Pas de benchmark indépendant 2026 entre Loro, Yjs et Automerge.
- La maturité des crates audio Rust (capture et Opus) pour une voix native n'a pas été examinée.

## 2. Relier les réseaux de lab entre ordinateurs de joueurs sans serveur payant

### Takeaway
- **Bibliothèque à intégrer** : iroh (Rust, MIT/Apache-2.0, version 1.0 le 2026-06-15, 1.4.1 le 2026-10-21) est la meilleure option. Il compose un pair par clé publique, perce le NAT et bascule sur des relais. Ses relais publics restent réservés au développement et à l'usage « hobby », sans SLA.
- **VPN maillé sans serveur à lancer à côté de l'app** : EasyTier (Rust, LGPL-3.0, v2.7.0 en octobre 2026, nœuds publics communautaires gratuits) colle le mieux.
- **Headscale, Nebula, innernet, NetBird auto-hébergé** : tous exigent au moins un nœud joignable.
- **Offres gratuites hébergées** : Tailscale (6 utilisateurs, selon des tiers), NetBird (5 utilisateurs et 100 machines), ZeroTier (10 appareils). Elles dépannent un petit groupe mais imposent des comptes.
- **TURN gratuit le plus crédible** : Cloudflare (1 000 Go/mois). Trystero estime que 10 à 15 % des connexions réelles exigent un TURN.
- **Pour ponter des segments L2** : VXLAN (méthode multi-nœuds de containerlab) par-dessus l'overlay, ou sockets `stream`/`dgram` de QEMU.

### Cited Findings

#### Overlays et VPN maillés
- **WireGuard** :
  - wireguard-go est sous MIT — [LICENSE](https://github.com/WireGuard/wireguard-go/blob/HEAD/LICENSE)
  - boringtun (WireGuard en espace utilisateur, Rust, Cloudflare) : 0.7.1 du 2026-05-01, BSD-3-Clause — [crates.io](https://crates.io/crates/boringtun)
- **Tailscale** (client) :
  - Version et licence : v1.104.7 du 2026-11-12, BSD-3-Clause — [proxy Go](https://proxy.golang.org/tailscale.com/@latest), [LICENSE](https://github.com/tailscale/tailscale/blob/HEAD/LICENSE)
  - Offre gratuite : selon des sites tiers, la refonte tarifaire du 2026-04-08 porte le plan « Personal » à 6 utilisateurs avec appareils illimités, 50 ressources taguées, usage non commercial uniquement — [activepieces](https://www.activepieces.com/blog/tailscale-pricing-plans-costs-and-features-2026), [newsletter IT Support Group](https://thisisanitsupportgroup.beehiiv.com/p/tailscale-s-free-tier-just-doubled-if-you-ve-been-putting-it-off-today-s-the-morning)
  - Une autre fiche tierce mentionne encore « 3 users, 100 devices », probablement l'ancienne offre — [CostBench](https://www.costbench.com/software/business-vpn/tailscale/free-plan/)
- **Headscale** (serveur de contrôle Tailscale auto-hébergé) :
  - Licence et versions : BSD-3-Clause ; v0.29.7 du 2026-10-30 — [LICENSE](https://github.com/juanfont/headscale/blob/HEAD/LICENSE), [proxy Go](https://proxy.golang.org/github.com/juanfont/headscale/@latest)
  - La 0.30.0 en préparation remplace l'API REST v1 et retire gRPC/Protobuf — [CHANGELOG](https://github.com/juanfont/headscale/blob/HEAD/CHANGELOG.md)
  - Périmètre volontairement étroit : un *seul* tailnet, « suitable for a personal use, or a small open-source organisation » — [README](https://github.com/juanfont/headscale/blob/HEAD/README.md)
  - Relais : serveur DERP embarqué, désactivé par défaut. Une fois activé, il s'ajoute à la liste des DERP « free-to-use » de Tailscale, qu'on peut aussi retirer. Il utilise STUN (udp/3478) — [docs/ref/derp.md](https://github.com/juanfont/headscale/blob/HEAD/docs/ref/derp.md)
- **ZeroTier** :
  - Versions : 1.16.0 (2025-08-21), 1.16.1 (2025-12-22), 1.16.2 (2026-05-20) — [RELEASE-NOTES](https://github.com/zerotier/ZeroTierOne/blob/HEAD/RELEASE-NOTES.md)
  - Licence : MPL pour `node/`, `osdep/`, `service/` et le reste, sauf `ext/` et `nonfree/`, partie « source available » non libre — [LICENSE.txt](https://github.com/zerotier/ZeroTierOne/blob/HEAD/LICENSE.txt)
  - Offre gratuite : 10 appareils et 1 réseau selon la page tarifaire officielle — [zerotier.com/pricing.md](https://www.zerotier.com/pricing.md), [AgentDeals](https://agentdeals.dev/vendor/zerotier)
  - Le forum évoque une ancienne limite plus haute (100) — [forum ZeroTier](https://discuss.zerotier.com/t/zerotier-private-network-limit-free-tier/17486)
- **Nebula** (Slack/Defined Networking) :
  - Licence et version : MIT ; v1.12.0 du 2026-10-29, avec une section « Breaking » — [proxy Go](https://proxy.golang.org/github.com/slackhq/nebula/@latest), [CHANGELOG](https://github.com/slackhq/nebula/blob/HEAD/CHANGELOG.md), [LICENSE](https://github.com/slackhq/nebula/blob/HEAD/LICENSE)
  - Fonctionnement : certificats signés par une CA du réseau, « lighthouses » de découverte qui exigent une IP routable et stable, perçage UDP — [README](https://github.com/slackhq/nebula/blob/HEAD/README.md)
- **NetBird** :
  - Version : v0.83.1 du 2026-11-13 — [proxy Go](https://proxy.golang.org/github.com/netbirdio/netbird/@latest)
  - Licence : BSD-3-Clause pour tout le dépôt, *sauf* `management/`, `signal/`, `relay/` et `combined/`, sous une licence distincte (AGPL-3.0 d'après le fichier, texte tronqué dans mon extraction) — [LICENSE](https://github.com/netbirdio/netbird/blob/HEAD/LICENSE)
  - Fonctions : relais de secours, SSH/RDP dans le navigateur, Rosenpass (post-quantique), cloud ou auto-hébergé — [README](https://github.com/netbirdio/netbird/blob/HEAD/README.md)
  - Offre cloud gratuite : 5 utilisateurs et 100 machines — [docs NetBird, plans](https://docs.netbird.io/manage/settings/plans-and-billing)
- **innernet** (tonari) : basé sur WireGuard, MIT ; 2.0.0 du 2026-07-02. Chaque réseau exige un serveur de coordination — [crates.io](https://crates.io/crates/innernet), [README](https://github.com/tonarino/innernet/blob/HEAD/README.md)
- **EasyTier** (Rust/Tokio) :
  - Licence LGPL-3.0 — [LICENSE](https://github.com/EasyTier/EasyTier/blob/HEAD/LICENSE)
  - Version : image v2.7.0 publiée le 2026-10-06 ; le tag `latest` pointait encore sur v2.6.4 du 2026-05-12 — [Docker Hub](https://hub.docker.com/r/easytier/easytier/tags)
  - Sur crates.io, la crate est figée à 2.0.3 (2024) — [crates.io](https://crates.io/crates/easytier)
  - Fonctionnement : « decentralized », « no centralized services required ». Chiffrement AES-GCM ou WireGuard. Traversée NAT UDP/IPv6, y compris entre deux NAT de type 4. « Subnet proxy » pour partager des sous-réseaux. Portail WireGuard. Nœuds publics partagés gratuits fournis par la communauté pour qui n'a pas d'IP publique — [README](https://github.com/EasyTier/EasyTier/blob/HEAD/README.md)
  - Sous Windows, exécution avec privilèges administrateur et DLL/pilote fournis dans le zip de release — [README](https://github.com/EasyTier/EasyTier/blob/HEAD/README.md)
- **Hyprspace** (VPN sur libp2p) : Apache-2.0, v0.15.0 du 2026-06-23 — [LICENSE](https://github.com/hyprspace/hyprspace/blob/HEAD/LICENSE), [proxy Go](https://proxy.golang.org/github.com/hyprspace/hyprspace/@latest)
- **iroh** (bibliothèque Rust) :
  - Versions : 1.0.0 (2026-06-15), 1.1.0 (2026-08-25), 1.2.0 (2026-09-09), 1.4.1 (2026-10-21) — [CHANGELOG](https://github.com/n0-computer/iroh/blob/HEAD/CHANGELOG.md)
  - Licence MIT OR Apache-2.0, ≈2,5 M de téléchargements sur 90 jours — [crates.io](https://crates.io/crates/iroh)
  - Fonctionnement : « an API for dialing by public key ». Tente une connexion directe par perçage de NAT, puis bascule sur « an open ecosystem of public relay servers ». Connexions QUIC via `noq` — [README](https://github.com/n0-computer/iroh/blob/HEAD/README.md)
  - Annonce de la 1.0 — [blog iroh 1.0](https://iroh.computer/blog/v1)
- **libp2p** : rust-libp2p 0.57.1 (2026-10-15, MIT), js-libp2p 3.5.1 (2026-10-19, Apache-2.0 OR MIT) — [crates.io](https://crates.io/crates/libp2p), [npm](https://registry.npmjs.org/libp2p)

#### Ponter des segments de lab (L2) entre machines
- **containerlab** :
  - Version et licence : v0.83.0 du 2026-11-06, BSD-3-Clause (Nokia) — [proxy Go](https://proxy.golang.org/github.com/srl-labs/containerlab/@latest), [LICENSE](https://github.com/srl-labs/containerlab/blob/HEAD/LICENSE)
  - Labs multi-nœuds : des tunnels VXLAN unicast entre les machines qui hébergent les nœuds — [docs multi-node](https://github.com/srl-labs/containerlab/blob/HEAD/docs/manual/multi-node.md)
  - Exemple `vxlan01` : déploiement sur deux machines dont les interfaces sont « cousues » via VXLAN — [exemple multinode](https://github.com/srl-labs/containerlab/blob/HEAD/docs/lab-examples/multinode.md)
- **QEMU** :
  - Les backends réseau `-netdev stream` (TCP, socket unix, descripteur de fichier) et `-netdev dgram` (UDP unicast/multicast, descripteur de fichier) relient la carte réseau d'une VM à un socket, sans interface TAP — [qemu-options.hx](https://github.com/qemu/qemu/blob/HEAD/qemu-options.hx)
  - Le backend `user` accepte une option `restrict=on|off` — [qemu-options.hx](https://github.com/qemu/qemu/blob/HEAD/qemu-options.hx)

#### NAT, STUN, TURN et relais gratuits
- Trystero : « On most home Wi-Fi and mobile networks », ses serveurs STUN intégrés suffisent pour percer le NAT. En revanche, « roughly 10–15% of real-world internet connections » (réseaux d'entreprise stricts, NAT restrictifs ou symétriques) exigent un serveur TURN. Si aucun `turnConfig` n'est fourni, ces pairs ne se connectent pas — [docs/troubleshooting.md](https://github.com/dmotz/trystero/blob/HEAD/docs/troubleshooting.md). Ce chiffre est une estimation du projet, pas une étude indépendante.
- **Cloudflare Realtime TURN** : 1 000 Go/mois gratuits, puis 0,05 $/Go. Ce quota est partagé avec le SFU de Cloudflare, et la page produit annonce « no credit card required » — [page produit TURN/SFU](https://www.cloudflare.com/products/turn-sfu/), [tarifs Realtime](https://developers.cloudflare.com/realtime/sfu/pricing). La FAQ indique que seul le trafic sortant serveur→client est facturé — [FAQ TURN](https://developers.cloudflare.com/realtime/turn/faq/)
- **coturn** (serveur TURN libre) : licence BSD — [LICENSE](https://github.com/coturn/coturn/blob/HEAD/LICENSE)
- **Relais publics iroh (n0)** :
  - Usage prévu : développement et usage « hobby », sans SLA ; ne pas en dépendre en production. Le relais est limité en débit sur le trafic relayé, avec une limite globale pour tous les utilisateurs, modifiable à tout moment. Seule la dernière version stable est supportée — [docs iroh : rate limiting](https://docs.iroh.computer/relays/rate-limiting), [relais publics](https://docs.iroh.computer/iroh-services/relays/public)
  - Fin de service sur les relais publics : 2026-09-30 pour les 0.9x et les RC 1.0, 2026-12-31 pour les 0.35x — [blog iroh 1.0](https://iroh.computer/blog/v1)
  - Une page « concepts » se montre plus permissive pour la production : contradiction interne à la doc — [docs iroh : concepts](https://docs.iroh.computer/concepts/relays)
  - Alternatives : relais auto-hébergé, ou relais payants (partagés ou dédiés) — [add a relay](https://docs.iroh.computer/add-a-relay)
- **EasyTier** : nœuds publics communautaires gratuits, avec perçage NAT automatique — [README](https://github.com/EasyTier/EasyTier/blob/HEAD/README.md)

#### Signalisation sans serveur (rendez-vous)
- **Trystero** (déjà utilisé par Open-Contact) :
  - Le paquet principal utilise par défaut le réseau décentralisé **Nostr**, en se connectant à plusieurs relais publics en parallèle (redondance par défaut : 5), sans compte — [docs/signaling.md](https://github.com/dmotz/trystero/blob/HEAD/docs/signaling.md)
  - Autres stratégies, en paquets séparés `@trystero-p2p/*` : MQTT sur brokers publics MQTT-over-WebSocket (redondance 4), trackers WebTorrent publics (redondance 3), Supabase, Firebase, et un relais WebSocket minimal auto-hébergé (`ws-relay`) — [docs/signaling.md](https://github.com/dmotz/trystero/blob/HEAD/docs/signaling.md), [README](https://github.com/dmotz/trystero/blob/HEAD/README.md)
  - Les offres SDP sont chiffrées en AES-256-GCM avant de toucher un relais, et un `password` de salle dérive la clé — [README](https://github.com/dmotz/trystero/blob/HEAD/README.md)
  - Sur les relais publics partagés, les topics dérivent de `(appId, roomId)` : il faut donc préfixer l'`appId` par un domaine. Taille des bundles : ≈41 à 64 Ko — [docs/signaling.md](https://github.com/dmotz/trystero/blob/HEAD/docs/signaling.md)
- **Nostr** : NIP-65 (liste de relais d'un utilisateur), NIP-29 (groupes gérés par un relais), NIP-17 (messages privés), NIP-44 (chiffrement versionné) — [index des NIPs](https://github.com/nostr-protocol/nips/blob/HEAD/README.md)
- **khatru** (framework Go pour écrire un relais Nostr, utilisable pour un relais de classe) : v0.19.1 du 2025-09-22 — [proxy Go](https://proxy.golang.org/github.com/fiatjaf/khatru/@latest)

#### Découverte LAN (mDNS)
- **mdns-sd** (Rust, mDNS/DNS-SD) : 0.21.7 du 2026-11-02, Apache-2.0 OR MIT, ≈3,55 M de téléchargements sur 90 jours — [crates.io](https://crates.io/crates/mdns-sd)

### Inferences
- **Adéquation au « zéro serveur payant »**, de la meilleure à la plus faible :
  1. **iroh, intégré à l'app** : aucun service à installer, pas de pilote TUN, transport par clé publique, ce qui colle à l'identité par clé. Limite : en production, il faut prévoir un relais de secours (auto-hébergé ou communautaire).
  2. **EasyTier, en binaire séparé** : vrai VPN maillé sans coordinateur, nœuds publics gratuits. Limites : droits administrateur et pilote TUN, et licence LGPL-3.0. Le lancer comme processus séparé plutôt que de le lier statiquement au binaire Rust.
  3. **Offres gratuites hébergées** (Tailscale, NetBird, ZeroTier) : pratiques pour 2 à 6 personnes, mais avec comptes tiers, usage non commercial et plafonds d'appareils. ZeroTier (10 appareils) ne tient pas une classe.
  4. **Headscale, Nebula, innernet, NetBird auto-hébergé** : il faut un nœud joignable (PC du formateur avec redirection de port, ou petite VM gratuite), donc ce n'est pas du vrai « sans serveur ».
  5. **WireGuard brut** : clés et endpoints à distribuer à la main, aucune traversée NAT coordonnée.
- **Ne pas étendre le L2 à travers internet hors du mode attaque/défense** :
  - Par défaut, préférer un routage L3 avec un plan d'adressage par joueur (par exemple 10.<n° joueur>.0.0/16) pour éviter les collisions.
  - VXLAN ou GRETAP au-dessus de l'overlay seulement quand un scénario exige un même domaine de diffusion (DHCP, ARP spoofing, VLAN).
  - Prévoir le surcoût d'en-têtes : WireGuard ≈60–80 octets, VXLAN ≈50 octets. Réduire la MTU interne (≈1 370 ou moins) ou activer le MSS clamping. Ces ordres de grandeur sont à valider en test.
- **Piste « sans pilote ni droits admin » pour les VM** : brancher les cartes des VM QEMU sur des sockets `stream`/`dgram` ouverts par l'app, qui relaie les trames vers le pair par iroh (datagrammes QUIC). Cela vaut pour les VM seulement : les conteneurs exigent des veth/bridges, donc root (containerlab exige déjà sudo).
- **Mode classe sur LAN** : mDNS plus connexions directes, aucun relais. Point de vigilance : les Wi-Fi d'école ou d'entreprise isolent souvent les clients (multicast et P2P bloqués). Il faut alors un relais local sur la machine du formateur (iroh-relay ou relais Nostr de classe) et, en dernier recours, le partage de connexion d'un téléphone.
- **TURN pour la branche WebRTC** (Open-Contact, voix) : Cloudflare est la seule offre gratuite à gros volume trouvée. Les identifiants TURN éphémères sont en général générés avec une clé d'API secrète, et embarquer cette clé dans une app de bureau publique serait une fuite. Il faudrait donc une petite fonction serverless gratuite, ou laisser chaque formateur saisir sa propre clé (à vérifier, voir Gaps).

### Gaps
- La page officielle de tarifs Tailscale n'était pas joignable : le chiffre de 6 utilisateurs vient de sites tiers.
- Un article de 2026 évoque une offre « Commercial Starter » à 2 000 € pour l'auto-hébergement de NetBird ([wz-it](https://wz-it.com/en/blog/netbird-self-hosting-license-commercial-starter/)) : je n'ai pas pu vérifier ce que cela change aux licences.
- Non vérifiés :
  - la fonction de relais de Nebula et les relais libp2p (circuit relay, DCUtR) ;
  - la politique d'usage et la fiabilité des nœuds publics EasyTier ;
  - la liste des brokers MQTT et trackers publics de Trystero.
- Aucune statistique indépendante de réussite du perçage NAT en 2026 (seulement l'estimation de Trystero).
- Le mécanisme exact de génération des identifiants Cloudflare TURN n'a pas été vérifié.
- Les valeurs de MTU et d'en-têtes sont des ordres de grandeur non sourcés dans cette session.

## 3. Frameworks attaque/défense, compétition, cyber ranges, émulation d'adversaire et isolation

### Takeaway
Les gameservers attaque/défense open source partagent le même modèle, qu'on peut reprendre tel quel pour un arbitre IA : des « ticks » ; des flags déposés et relus par des checkers ; un score SLA + attaque + défense. Ce sont FAUST (licence de type ISC), ForcAD (GPL-3.0), EnoEngine et enochecker3 (MIT), et saarCTF. CTFd 3.8.9 (Apache-2.0) couvre le format jeopardy. Les ranges (Ludus AGPL-3.0, GOAD GPL-3.0, CyberRangeCZ MIT sur OpenStack) sont trop lourds à embarquer mais fournissent scénarios et règles d'isolement. Pour l'adversaire automatisé, MITRE Caldera est devenu Apache Caldera (en incubation, annonce du 2026-05-20), et Atomic Red Team (MIT) fournit environ 1 950 tests ATT&CK.

### Cited Findings

#### Gameservers attaque/défense et checkers
- **FAUST CTF Gameserver** (dépôt `fausecteam/ctf-gameserver`) :
  - Conçu pour FAUST CTF mais réutilisable, « scalable to large online CTFs, battle-tested ». Documentation sur ctf-gameserver.org — [README](https://github.com/fausecteam/ctf-gameserver/blob/HEAD/README.md)
  - Composants : *Web* (Django : inscriptions, scoreboard, pages d'info) et *Controller* (progression du jeu, tick courant, flags à placer) — [README](https://github.com/fausecteam/ctf-gameserver/blob/HEAD/README.md)
  - Licence permissive de type ISC — [LICENSE](https://github.com/fausecteam/ctf-gameserver/blob/HEAD/LICENSE)
- **ForcAD** (dépôt `pomo-mondreganto/ForcAD`) :
  - Licence GPL-3.0 — [LICENSE](https://github.com/pomo-mondreganto/ForcAD/blob/HEAD/LICENSE)
  - Le README avertit que la doc de la branche de développement « might not be stable or even working » et renvoie vers la dernière release stable — [README](https://github.com/pomo-mondreganto/ForcAD/blob/HEAD/README.md)
  - Fonctionnement : scoreboard sur :8080, admin sur /admin, visualisation Celery (Flower), paramètre `round_time`. Un wiki couvre l'écriture de checkers et la modification du système de score — [README](https://github.com/pomo-mondreganto/ForcAD/blob/HEAD/README.md)
- **saarCTF gameserver** (miroir `efiens/saarctf-gameserver`, utilisé pour saarCTF 2020, principalement développé par @MarkusBauer) :
  - Architecture : bases centrales PostgreSQL, Redis, RabbitMQ ; un « controlserver » qui gère le minuteur de rounds, lance les checkers, calcule le classement et produit le scoreboard — [README](https://github.com/efiens/saarctf-gameserver/blob/HEAD/README.md)
  - saarsec publie aussi ses services (par exemple saarCTF 2025), construits avec docker compose — [saarsec/saarctf-2025](https://github.com/saarsec/saarctf-2025), [topic GitHub saarctf](https://github.com/topics/saarctf)
- **ENOWARS** :
  - EnoEngine (« the engine powering our CTFs ») : écrit en C# pour les performances, configuré par un `ctf.json`, avec docker-compose ; MIT — [README](https://github.com/enowars/EnoEngine/blob/HEAD/README.md), [LICENSE](https://github.com/enowars/EnoEngine/blob/HEAD/LICENSE)
  - Bibliothèque de checkers enochecker3 : 0.14.0 du 2026-04-14, MIT (copyright Attacking-Lab 2025) — [PyPI](https://pypi.org/project/enochecker3/), [LICENSE](https://github.com/enowars/enochecker3/blob/HEAD/LICENSE)
- **Outils côté équipes** :
  - **Tulip** : analyseur de flux réseau pour l'attaque/défense, qui génère des snippets Python rejouant le trafic. Développé par la Team Europe pour l'ICC, fork de flower ; GPL-3.0 — [README](https://github.com/OpenAttackDefenseTools/tulip/blob/HEAD/README.md), [LICENSE](https://github.com/OpenAttackDefenseTools/tulip/blob/HEAD/LICENSE)
  - **DestructiveFarm** (ferme d'exploits) : MIT — [LICENSE](https://github.com/DestructiveVoice/DestructiveFarm/blob/HEAD/LICENSE.txt)

#### Jeopardy
- **CTFd** :
  - Versions : 3.8.6 (2026-06-16), 3.8.7 (2026-08-19), 3.8.8 (2026-10-02), 3.8.9 (2026-10-21) — [CHANGELOG](https://github.com/CTFd/CTFd/blob/HEAD/CHANGELOG.md), [Docker Hub](https://hub.docker.com/r/ctfd/ctfd/tags)
  - Licence Apache-2.0 — [LICENSE](https://github.com/CTFd/CTFd/blob/HEAD/LICENSE)
  - Outil `ctfcli` : 0.1.8 du 2026-07-14 — [PyPI](https://pypi.org/project/ctfcli/)

#### Cyber ranges
- **Ludus** (Bad Sector Labs) :
  - Licence AGPL-3.0 ; 2.3.8 (2026-10-13), 2.3.9 (2026-10-20), 2.3.10 (2026-10-23) — [releases GitLab](https://gitlab.com/badsectorlabs/ludus/-/releases)
  - Construit sur Proxmox : d'une installation Debian 12 jusqu'à un réseau Active Directory virtuel en quelques commandes, avec des rôles Ansible — [README](https://gitlab.com/badsectorlabs/ludus/-/blob/main/README.md)
  - « Testing mode » : prend des snapshots des VM et les coupe d'internet, en autorisant sélectivement des domaines ou IP — [README](https://gitlab.com/badsectorlabs/ludus/-/blob/main/README.md)
- **GOAD** (Orange Cyberdefense) :
  - Licence GPL-3.0 — [LICENSE](https://github.com/Orange-Cyberdefense/GOAD/blob/HEAD/LICENSE)
  - Labs : GOAD-Light (3 VM, 1 forêt, 2 domaines), MINILAB (2 VM : un DC Windows Server 2019 et un poste Windows 10), SCCM (4 VM), NHA (5 VM, 2 domaines, sans schéma fourni) — [README](https://github.com/Orange-Cyberdefense/GOAD/blob/HEAD/README.md)
  - Fournisseurs : VirtualBox, VMware, Azure, AWS, Proxmox, Ludus — [docs providers](https://github.com/Orange-Cyberdefense/GOAD/blob/HEAD/docs/mkdocs/docs/providers/index.md)
- **KYPO → CyberRangeCZ** :
  - Le développement actif de KYPO CRP est terminé. Son successeur, CyberRangeCZ (cyberrange.cz), reste compatible. KYPO est sous MIT, publié en open source en 2020 via CONCORDIA, et exige OpenStack — [KYPO CRP](https://crp.kypo.muni.cz/), [10e anniversaire](https://crp.kypo.muni.cz/news/10th-anniversary-of-the-kypo-cyber-range-platform), [CONCORDIA](https://www.concordia-h2020.eu/kypo-cyber-range/)
  - Un article d'octobre 2026 le décrit comme l'une des plateformes open source les plus matures — [CEUR-WS](https://ceur-ws.org/Vol-4281/paper04.pdf)
- **Autres briques utiles** :
  - SecGen (génération aléatoire de VM vulnérables) : GPL-3.0 — [LICENSE](https://github.com/cliffe/SecGen/blob/HEAD/LICENSE)
  - GHOSTS (CMU SEI, « NPC Automation Platform » qui simule des utilisateurs) : licence permissive de type MIT — [LICENSE](https://github.com/cmu-sei/GHOSTS/blob/HEAD/LICENSE.md)
  - Vulhub (environnements Docker vulnérables) : MIT — [LICENSE](https://github.com/vulhub/vulhub/blob/HEAD/LICENSE)
  - Kathará (émulation réseau par conteneurs) : GPL-3.0 — [LICENSE](https://github.com/KatharaFramework/Kathara/blob/HEAD/LICENSE)

#### Émulation d'adversaire
- **Caldera** :
  - MITRE a annoncé le 2026-05-20 donner Caldera à l'Apache Incubator, sous le nom « Apache Caldera (Incubating) ». La page de l'incubateur date le début du projet au 2025-12-19 — [MITRE 360, juillet 2026](https://www.mitre.org/news-insights/mitre-360/mitre-360-july-2026), [Apache Incubator](https://incubator.apache.org/projects/caldera.html)
  - Le README pointe désormais vers `apache/caldera` et caldera.apache.org. Agent par défaut : Sandcat ; écosystème de plugins — [README apache/caldera](https://github.com/apache/caldera/blob/HEAD/README.md)
  - Licence Apache-2.0 — [LICENSE](https://github.com/mitre/caldera/blob/HEAD/LICENSE)
  - D'après les minutes du board (juillet 2026, extraites via recherche), la mise en place n'était pas terminée — [minutes du board Apache](https://whimsy.apache.org/board/minutes/Caldera.html)
- **Atomic Red Team** : « library of tests mapped to the MITRE ATT&CK framework », pour tester de façon « quickly, portably, and reproducibly ». Le badge affiche 1 950 atomics ; licence MIT — [README](https://github.com/redcanaryco/atomic-red-team/blob/HEAD/README.md), [LICENSE](https://github.com/redcanaryco/atomic-red-team/blob/HEAD/LICENSE.txt)

#### Isolation
- Docker : `docker network create --internal` « Restrict external access to the network ». Les conteneurs d'un réseau interne peuvent communiquer entre eux, mais pas avec l'extérieur — [référence CLI Docker](https://github.com/docker/cli/blob/HEAD/docs/reference/commandline/network_create.md)
- QEMU : option `restrict=on|off` du backend `user` — [qemu-options.hx](https://github.com/qemu/qemu/blob/HEAD/qemu-options.hx)
- Ludus : le « testing mode » coupe les VM d'internet, avec une liste d'autorisations sélectives — [README Ludus](https://gitlab.com/badsectorlabs/ludus/-/blob/main/README.md)

### Inferences
- **Reprendre le protocole des checkers plutôt qu'un gameserver complet.** Chaque service du pack fournit un checker déterministe (`putflag` / `getflag` / `check` SLA), dans l'esprit d'enochecker3 (MIT, réutilisable sans contrainte). À chaque tick, l'arbitre (machine neutre) dépose les flags, vérifie la disponibilité et compte les flags soumis. Le score est calculé par ce code déterministe ; l'IA commente, explique et propose des indices, mais ne fixe pas seule les points.
- **Licences à surveiller** :
  - FAUST (ISC), EnoEngine et enochecker3 (MIT), CTFd (Apache-2.0) se réutilisent sans difficulté dans une app permissive.
  - ForcAD (GPL-3.0) et GOAD (GPL-3.0) imposent la GPL à leur code ou à leurs rôles s'ils sont intégrés.
  - Ludus (AGPL-3.0) : s'en inspirer, ne pas copier.
  - Distribuer les rôles GOAD comme pack séparé sous leur propre licence.
- **Règles d'isolement minimales pour le mode attaque/défense** :
  1. Un réseau « arène » dédié : bridge Linux ou réseau Docker `--internal`.
  2. Aucune route ni NAT vers le LAN ou internet de l'hôte (nftables en `policy drop` sur l'hôte, `restrict=on` sur toute NIC `user` des VM).
  3. Le tunnel P2P n'accepte que les préfixes de l'arène (AllowedIPs WireGuard ou filtre applicatif côté iroh).
  4. Pas de dossiers partagés hôte↔VM dans l'arène.
  5. Snapshot avant la partie et restauration après, comme le mode test de Ludus.
  6. Consentement explicite et durée limitée affichés aux deux équipes.
  7. Journalisation (pcap côté arbitre) pour le débrief. Tulip montre la valeur d'une analyse de flux pour les deux camps.
- **Adversaire automatisé** : Atomic Red Team (MIT) donne un catalogue de « coups » ATT&CK que l'IA maître du jeu peut jouer contre un défenseur seul. Caldera (Apache-2.0) apporte un C2 plus complet, mais son passage en incubation Apache et la gestion d'agents le rendent plus lourd à embarquer.
- **CTFd en local** sur la machine du formateur (Docker) suffit pour un tournoi jeopardy de classe sans serveur payant.

### Gaps
- Dernières releases de FAUST ctf-gameserver et de ForcAD non lues (onglet Releases de GitHub inaccessible).
- Licence du dépôt saarCTF gameserver non trouvée (aucun fichier LICENSE standard dans le miroir efiens).
- État 2026 de CyberRangeCZ (versions, licence, exigences) non vérifié : gitlab.ics.muni.cz est bloqué.
- Pas de write-up d'organisateur (FAUST, ECSC) consulté sur les leçons d'infrastructure.
- Date de graduation d'Apache Caldera inconnue ; les minutes évoquent des difficultés (listes de diffusion), à lire directement.

## 4. Game design pédagogique multijoueur : matchmaking, arbitre, classements sans serveur, anti-triche, replays et débriefs

### Takeaway
Tout se construit sans serveur à partir de primitives existantes :
- **Matchmaking** : code ou QR de salle, chiffré par mot de passe et plafonné en sièges (Trystero) ;
- **Résultats** : signés par des clés (Ed25519/secp256k1), échangés en P2P et éventuellement publiés en événements Nostr ;
- **Arbitre** : modèle « tick + checkers » des gameservers attaque/défense, où la vérification se fait toujours côté arbitre ;
- **Replays** : asciicast v3, time travel Loro et captures réseau.

Les preuves de triche restent limitées : sans serveur de confiance, on obtient de l'intégrité (signatures, engagements), pas une garantie anti-triche absolue.

### Cited Findings
- **Trystero, salles privées** :
  - « Combine `password` and `maxUsers` to spin up private, seat-capped matches ». Le mot de passe « encrypts discovery so outsiders stay out » — [README Trystero](https://github.com/dmotz/trystero/blob/HEAD/README.md)
  - Chaque participant reçoit un `userId` de 22 caractères, « derived from a public keypair and verified », donc infalsifiable, avec persistance configurable et clés d'identité personnalisables — [docs/identity.md](https://github.com/dmotz/trystero/blob/HEAD/docs/identity.md), [README](https://github.com/dmotz/trystero/blob/HEAD/README.md)
- **Nostr, types d'événements** :
  - Événements « regular » stockés par les relais. Événements « replaceable » (10000–19999, 0, 3) : seule la dernière version par (pubkey, kind) DOIT être gardée. Événements « addressable » référencés par une étiquette `a` du type `kind:pubkey:d` — [NIP-01](https://github.com/nostr-protocol/nips/blob/HEAD/01.md)
  - NIP-58 (badges) : définition de badge = événement addressable kind 30009 avec une étiquette `d`. Attribution = kind 8 qui référence la définition et liste les bénéficiaires (`p`) ; « Awarded badges are immutable ». Badges affichés au profil = kind 10008 ; ensembles de badges = kind 30008 — [NIP-58](https://github.com/nostr-protocol/nips/blob/HEAD/58.md)
  - Suppression (NIP-09) : kind 5, une simple *demande*. Les relais « SHOULD » supprimer et les clients « SHOULD » masquer, sans garantie — [NIP-09](https://github.com/nostr-protocol/nips/blob/HEAD/09.md)
- **Modèle d'arbitre des gameservers** :
  - Le Controller de FAUST coordonne le tick courant et les flags à placer — [README FAUST](https://github.com/fausecteam/ctf-gameserver/blob/HEAD/README.md)
  - Le controlserver de saarCTF lance les checkers et calcule le classement — [README saarCTF](https://github.com/efiens/saarctf-gameserver/blob/HEAD/README.md)
  - ForcAD expose le système de score et l'écriture de checkers dans son wiki — [README ForcAD](https://github.com/pomo-mondreganto/ForcAD/blob/HEAD/README.md)
- **Replays et débriefs** :
  - asciicast v3 et lecteur web, y compris diffusion live sur le LAN — [README asciinema](https://github.com/asciinema/asciinema/blob/HEAD/README.md)
  - Time travel dans l'historique Loro — [README Loro](https://github.com/loro-dev/loro/blob/HEAD/README.md)
  - Tulip génère des snippets qui rejouent des flux observés — [README Tulip](https://github.com/OpenAttackDefenseTools/tulip/blob/HEAD/README.md)
- **Signatures légères** : minisign signe et vérifie des fichiers en Ed25519 (signatures petites et rapides), compatible avec signify — [README minisign](https://github.com/jedisct1/minisign/blob/HEAD/README.md)
- **Tournoi jeopardy** : CTFd 3.8.9 (Apache-2.0) — [CHANGELOG CTFd](https://github.com/CTFd/CTFd/blob/HEAD/CHANGELOG.md)

### Inferences
- **Matchmaking** :
  - Code court lisible (6–8 caractères, alphabet sans ambiguïté) avec QR. `roomId` = hachage du code ; `password` = code, ce qui chiffre la découverte.
  - `appId` namespacé (par exemple `fr.<projet>.labs`) ; `maxUsers` = 2 pour un duel, N pour la co-op.
  - Hors-ligne ou réseau hostile : échange de SDP ou de tickets de connexion par QR, comme Open-Contact.
  - Le **rôle arbitre** est un siège spécial : formateur, IA locale d'un tiers, ou à défaut l'IA de chaque joueur avec vérification croisée.
- **Équité au départ (duel)** : engagement-révélation.
  1. Chaque joueur publie `H(graine_i)`, puis révèle `graine_i`.
  2. La panne est tirée de `H(graine_1 ‖ graine_2 ‖ hash_du_pack)`.
  3. Personne ne peut pré-calculer la panne.
  4. Les deux apps instancient la même panne depuis le même pack signé.
- **Résultat signé** : objet JSON canonique contenant
  - le hash du pack, la graine et l'identifiant du scénario ;
  - t0 et t_fin, sous forme d'horloge relative fondée sur des messages échangés et signés ;
  - la sortie du checker ;
  - le hash de l'enregistrement `.cast` ;
  - la signature du joueur, puis la contre-signature de l'arbitre.

  Le **classement** est une fonction déterministe recalculée localement par chacun à partir du journal de ces résultats, répliqué en P2P (append-only, dans un document CRDT du groupe).
- **Anti-triche « raisonnable »** :
  1. Le checker final est lancé par l'arbitre contre le lab vivant du joueur, à travers le canal P2P et en lecture seule, plutôt que par le joueur.
  2. Commandes et sorties sont hachées en chaîne dans le journal (chaque entrée inclut le hash de la précédente).
  3. Une contre-vérification aléatoire peut porter sur l'enregistrement.
  4. La triche reste possible pour un joueur qui modifie l'app ; c'est acceptable dans un cadre pédagogique, si on l'assume.
- **Publication** : publication Nostr facultative (événement addressable à kind dédié) pour les adultes volontaires. Jamais par défaut, et jamais pour des mineurs (NIP-09 ne garantit pas l'effacement).
- **Débrief généré par l'IA** à partir de la timeline Loro, des `.cast`, des sorties de checkers et, en attaque/défense, des flux capturés. Il produit « ce qui a cassé », « ce qui a été tenté », « la bonne démarche » et un lien vers le cours associé du pack. C'est le principal levier pédagogique.
- **Modes** :
  - *Duel* : labs séparés, aucune connexion réseau de lab.
  - *Co-op* : lab de l'hôte faisant autorité, terminaux partagés.
  - *Maître du jeu* : le MJ choisit des pannes dans un catalogue fermé du pack. Elles sont exécutées par l'app de la victime après consentement ; aucun shell distant.
  - *Attaque/défense* : voir §3, ticks et checkers.
  - *Tournoi* : système suisse ou élimination piloté par la machine du formateur, avec CTFd pour le volet jeopardy.

### Gaps
- Aucune source académique consultée sur l'efficacité pédagogique des formats duel, co-op ou attaque/défense.
- Pas de standard existant pour des classements P2P signés ; le schéma proposé est une conception à prototyper.
- Pas trouvé de bibliothèque prête à l'emploi d'« horloge vérifiable » sans serveur.

## 5. Partager labs, packs de pannes et cours : Git/GitHub, OCI/ORAS, Nostr, IPFS ; versionnage, signature, licences des contenus

### Takeaway
Le canal le plus simple et gratuit :
- un dépôt Git par pack ;
- des GitHub Releases pour les gros fichiers (≤ 2 GiB par fichier) ;
- éventuellement des artefacts OCI poussés avec ORAS sur GHCR, gratuit pour les paquets publics ;
- une signature par cosign en mode keyless depuis GitHub Actions, avec minisign pour une vérification hors-ligne simple.

Nostr (NIP-94, Blossom, NIP-34) et Radicle offrent une distribution décentralisée crédible mais secondaire. IPFS exige un pinning, donc quelqu'un qui garde le contenu en ligne.

### Cited Findings
- **GitHub (gratuit)** :
  - GitHub Packages est gratuit pour les paquets publics ; le privé a des quotas — [docs GitHub, facturation Packages](https://github.com/github/docs/blob/HEAD/data/reusables/package_registry/packages-billing.md)
  - Releases : jusqu'à 1 000 fichiers par release, chaque fichier sous 2 GiB — [about-releases](https://github.com/github/docs/blob/HEAD/content/repositories/releasing-projects-on-github/about-releases.md), [variables releases](https://github.com/github/docs/blob/HEAD/data/variables/releases.yml), [variables large_files](https://github.com/github/docs/blob/HEAD/data/variables/large_files.yml)
  - Fichiers dans le dépôt : limite de 100 MiB par fichier — [variables large_files](https://github.com/github/docs/blob/HEAD/data/variables/large_files.yml)
  - GitHub Pages : dépôt source recommandé ≤ 1 GB, site publié ≤ 1 GB, bande passante « soft » de 100 GB/mois, pas pour une activité commerciale — [GitHub Pages limits](https://github.com/github/docs/blob/HEAD/content/pages/getting-started-with-github-pages/github-pages-limits.md)
- **OCI 1.1 et ORAS** :
  - Le manifeste d'image accepte un champ `artifactType`, obligatoire si le `config.mediaType` est vide — [image-spec manifest.md](https://github.com/opencontainers/image-spec/blob/HEAD/manifest.md)
  - La distribution-spec définit l'API « Referrers » : liste des manifestes liés à un digest, par exemple les signatures ou SBOM attachés à un pack — [distribution-spec](https://github.com/opencontainers/distribution-spec/blob/HEAD/spec.md)
  - ORAS CLI : v1.3.6 du 2026-10-24, Apache-2.0 — [proxy Go](https://proxy.golang.org/oras.land/oras/@latest), [LICENSE](https://github.com/oras-project/oras/blob/HEAD/LICENSE)
- **Signature** :
  - **cosign** : v3.1.4 du 2026-10-20 (la branche v2 a eu une 2.6.5 le 2026-08-05), Apache-2.0 — [proxy Go v3](https://proxy.golang.org/github.com/sigstore/cosign/v3/@latest), [proxy Go v2](https://proxy.golang.org/github.com/sigstore/cosign/v2/@latest), [LICENSE](https://github.com/sigstore/cosign/blob/HEAD/LICENSE)
  - Par défaut, cosign signe en « keyless » via la CA Fulcio et le journal de transparence Rekor de Sigstore, avec authentification OIDC. La vérification exige `--certificate-identity` et `--certificate-oidc-issuer` — [README cosign](https://github.com/sigstore/cosign/blob/HEAD/README.md)
  - **actions/attest-build-provenance** : attestations de provenance signées par un certificat Sigstore éphémère ; l'instance publique de Sigstore est utilisée pour les dépôts publics — [README](https://github.com/actions/attest-build-provenance/blob/HEAD/README.md)
  - **minisign** : Ed25519, licence ISC — [README](https://github.com/jedisct1/minisign/blob/HEAD/README.md), [LICENSE](https://github.com/jedisct1/minisign/blob/HEAD/LICENSE)
- **Nostr** :
  - NIP-94 (métadonnées de fichier), NIP-B7 (Blossom), NIP-34 (« git stuff » : dépôts et patches sur Nostr) — [index des NIPs](https://github.com/nostr-protocol/nips/blob/HEAD/README.md)
  - Blossom : endpoints HTTP pour stocker des « blobs » adressés par leur sha256 sur des serveurs publics, identités par clés Nostr, extensions via des « BUDs ». Spécification dans le domaine public — [README Blossom](https://github.com/hzrd149/blossom/blob/HEAD/README.md), [LICENSE](https://github.com/hzrd149/blossom/blob/HEAD/LICENSE.txt)
- **IPFS** :
  - Kubo v0.43.1 du 2026-09-14 ; licence en transition de MIT seul vers MIT/Apache-2.0 — [proxy Go](https://proxy.golang.org/github.com/ipfs/kubo/@latest), [LICENSE](https://github.com/ipfs/kubo/blob/HEAD/LICENSE)
  - La documentation distingue persistance et permanence : le pinning évite que les données soient effacées — [docs IPFS, persistance](https://github.com/ipfs/ipfs-docs/blob/HEAD/docs/concepts/persistence.md)
- **Radicle** (forge Git pair-à-pair) :
  - 1.6.0 « Amaryllis » (2026-01-14, avec build Windows), 1.7.0 (2026-03-18, correctif de sécurité suivi d'une 1.7.1 le 2026-03-20), 1.8.0 (2026-03-30) — [radicle 1.6.0](https://radicle.xyz/2026/01/14/radicle-1.6.0), [radicle 1.7.0](https://radicle.xyz/2026/03/18/radicle-1.7.0), [radicle 1.8.0](https://radicle.xyz/2026/03/30/radicle-1.8.0), [AlternativeTo](https://alternativeto.net/news/2026/1/radicle-1-6-0-amaryllis-released-major-updates-and-windows-build-support)
  - Une 1.9.0 « Hawthorn » est signalée vers mai 2026, sans confirmation — [Distill](https://distillintelligence.com/news/radicle)
- **Releases de l'app** : tauri-action construit l'app Tauri pour macOS, Linux et Windows et peut créer une GitHub Release puis y déposer les paquets — [README tauri-action](https://github.com/tauri-apps/tauri-action/blob/HEAD/README.md)
- **Contributions** :
  - Un CLA (Contributor License Agreement) « can create administrative work for project maintainers » ; un DCO (Developer Certificate of Origin) est la façon dont « many projects » (par exemple Node.js) font attester que chaque commit est autorisé — [opensource.guide, aspects juridiques](https://github.com/github/opensource.guide/blob/HEAD/_articles/legal.md)
  - Une licence sans brevet explicite, comme MIT, peut justifier de chercher un accord de brevet — [opensource.guide](https://github.com/github/opensource.guide/blob/HEAD/_articles/legal.md)

### Inferences
- **Format de pack proposé** : un dossier Git contenant
  - `pack.yaml` : id, version semver, compatibilité d'app, compétences visées, licences SPDX distinctes pour le code et pour les contenus, auteurs ;
  - `topology/` : containerlab, compose ou définitions de VM ;
  - `faults/` : scripts de panne idempotents et réversibles ;
  - `checkers/` : protocole put/get/check ;
  - `course/` : Markdown ;
  - `debrief/` : grilles pour l'IA.

  Un index JSON signé recense les hash des fichiers. Les gros fichiers (images disque) vont en Release ou en OCI, jamais dans Git.
- **Distribution en couches** :
  1. GitHub (source de vérité, PR de revue communautaire).
  2. Miroir OCI avec ORAS sur GHCR, pour profiter des digests et des « referrers » qui attachent signatures et SBOM.
  3. Optionnel : annonce Nostr (NIP-94/Blossom) pour la découverte, et Radicle pour qui refuse GitHub.

  L'app vérifie toujours le hash et la signature avant d'exécuter un script de panne, car un pack exécute du code avec des droits élevés.
- **Signature** : cosign keyless dans GitHub Actions pour les packs officiels (identité = workflow du dépôt). minisign ou clé Nostr pour les packs communautaires signés par leur auteur. L'app tient une liste de clés de confiance (officielles, formateur, auteurs suivis) et affiche clairement « non signé / signé par X ».
- **Licences des contenus** :
  - Code des checkers et scripts : MIT ou Apache-2.0 (Apache apporte un octroi de brevet explicite).
  - Cours et textes : Creative Commons, CC BY 4.0 pour une réutilisation maximale ou CC BY-SA 4.0 pour imposer le partage à l'identique.
  - Mettre un champ SPDX par fichier ou par dossier.
  - DCO plutôt que CLA pour un projet solo (moins de charge administrative).
- **IPFS** n'apporte rien par rapport aux Releases et à OCI tant que personne ne « pinne » durablement. À réserver à une éventuelle communauté.

### Gaps
- FAQ Creative Commons (CC pour du logiciel) non consultée ; compatibilité CC BY-SA 4.0 → GPLv3 non vérifiée (gnu.org inaccessible).
- Quotas 2026 de Git LFS sur GitHub non vérifiés.
- Politiques de rétention et de taille des serveurs Blossom publics non vérifiées.
- Date exacte de Radicle 1.9 non confirmée.

## 6. Identité portable et preuves de compétences entre apps : clés, Nostr, DID, Verifiable Credentials, Open Badges 3.0 ; RGPD et mineurs

### Takeaway
Une paire de clés par apprenant suffit à porter l'identité entre le lab, Open-Contact et l'app école. Les clés Nostr sont un bon choix pratique (NIP-46 pour signer depuis un autre appareil, NIP-49 pour le chiffrement au repos). Trystero sait d'ailleurs dériver un `userId` vérifié d'une paire de clés.

Pour une compétence « vérifiée » et lisible par un recruteur, le standard est Open Badges 3.0 : une Verifiable Credential compatible VC Data Model 2.0, Recommandation W3C en 2025. Il doit être émis par un tiers vérificateur (formateur, école), pas auto-émis. NIP-58 (badges Nostr) peut servir de miroir public.

Pour les mineurs, en France, le consentement seul n'est valable qu'à partir de 15 ans. La publication sur des relais publics est quasi irréversible.

### Cited Findings
- **Nostr, primitives d'identité** :
  - NIP-05 (identifiant DNS), NIP-46 (« Nostr Remote Signing »), NIP-49 (« Private Key Encryption », `ncryptsec`), NIP-58 (badges), NIP-17 et NIP-44 (messagerie chiffrée) — [index des NIPs](https://github.com/nostr-protocol/nips/blob/HEAD/README.md)
  - Badges NIP-58 : kinds 30009 (définition), 8 (attribution immuable), 10008 (badges affichés au profil), 30008 (ensembles) — [NIP-58](https://github.com/nostr-protocol/nips/blob/HEAD/58.md)
- **Bibliothèques Nostr** :
  - rust-nostr `nostr-sdk` : 0.45.6 du 2026-11-03, MIT. Le dépôt déclaré est désormais `github.com/nostrdevkit/nostr` — [crates.io](https://crates.io/crates/nostr-sdk)
  - `nostr-tools` : 2.26.0 du 2026-11-07, licence Unlicense — [npm](https://registry.npmjs.org/nostr-tools)
  - NDK : 3.0.3 du 2026-02-23, MIT — [npm](https://registry.npmjs.org/@nostr-dev-kit/ndk)
- **Trystero** : `userId` dérivé d'une paire de clés publique et vérifié ; clés d'identité personnalisables — [docs/identity.md](https://github.com/dmotz/trystero/blob/HEAD/docs/identity.md), [README](https://github.com/dmotz/trystero/blob/HEAD/README.md)
- **W3C** :
  - La famille Verifiable Credentials 2.0 (sept spécifications, dont le Data Model v2.0) est devenue Recommandation W3C en 2025 — [annonce W3C](https://www.w3.org/news/2025/the-verifiable-credentials-2-0-family-of-specifications-is-now-a-w3c-recommendation), [communiqué W3C](https://www.w3.org/press-releases/2025/verifiable-credentials-2-0)
  - Une note « VC Overview » a été publiée le 2026-06-17 — [W3C TR](https://www.w3.org/TR/2026/NOTE-vc-overview-20260617/)
  - Data Integrity EdDSA (cryptosuites `eddsa-rdfc-2022` / `eddsa-jcs-2022`, clés en Multikey) est cité par les errata 1EdTech comme Recommandation W3C du 15 mai 2025 — [errata Open Badges 3.0](https://standards.1edtech.org/open-badges/specifications/standards/v3p0/errata), [W3C vc-di-eddsa (version CR)](https://www.w3.org/TR/2024/CRD-vc-di-eddsa-20240816/)
- **Open Badges 3.0 (1EdTech)** :
  - Une assertion OB 3.0 *est* une Verifiable Credential, signée de façon compatible avec le VC Data Model 2.0, d'après 1EdTech et des sources secondaires — [POK, guide OB3](https://www.pok.tech/blog/posts/open-badge-3-0-complete-guide-digital-credentials)
  - Spécification finale approuvée en juin 2024 selon une source secondaire — [POK](https://www.pok.tech/blog/posts/open-badge-3-0-complete-guide-digital-credentials)
  - La liste des formats de preuve autorisés a été sortie de la spécification et placée dans le guide de conformité et de certification — [errata OB 3.0](https://standards.1edtech.org/open-badges/specifications/standards/v3p0/errata), [guide de conformité](https://standards.1edtech.org/open-badges/specifications/standards/v3p0/cert)
  - Exemples d'implémentation : `eddsa-rdfc-2022` avec clés Ed25519 et un émetteur en `did:web`, soit un simple fichier JSON servi en HTTPS (source fournisseur) — [Longsight](https://www.longsight.com/blog/credential-signing-stack)
  - Les modèles du W3C CCG utilisent `did:key` pour émetteurs et bénéficiaires, à titre illustratif — [W3C CCG vc-ed-models](https://w3c-ccg.github.io/vc-ed-models)
- **Digital Credentials Consortium (MIT)** :
  - Indique supporter OB 3.0 et VCDM 2.0 ; CLR 2.0 « TBD » pour son wallet — [DCC standards](https://digitalcredentials.mit.edu/dcc-standards)
  - Learner Credential Wallet : MIT — [LICENSE](https://github.com/digitalcredentials/learner-credential-wallet/blob/HEAD/LICENSE)
- **Bibliothèques VC** :
  - `@digitalbazaar/vc` : 7.3.0 (2026-02-05), BSD-3-Clause — [npm](https://registry.npmjs.org/@digitalbazaar/vc)
  - `@credo-ts/core` : 0.7.4 (2026-10-28), Apache-2.0 — [npm](https://registry.npmjs.org/@credo-ts/core)
  - `@veramo/core` : 7.0.2 (2026-09-23), Apache-2.0 — [npm](https://registry.npmjs.org/@veramo/core)
  - `ssi` (SpruceID, Rust) : 0.16.0 (2026-04-16), Apache-2.0, ≈28,6 k téléchargements sur 90 jours — [crates.io](https://crates.io/crates/ssi)
- **Europe** :
  - L'infrastructure European Digital Credentials for Learning (EDC) est « freely available » pour toute organisation qui veut émettre. Elle émet des VC en JSON-LD alignées sur W3C VC v1.1 — [Europass EDC](https://europass.europa.eu/en/european-digital-credentials-learning), [outils Europass](https://europass.europa.eu/en/europass-digital-tools/european-digital-credentials-learning)
  - Une proposition de la Commission de septembre 2026 (« Skills Portability Act ») exigerait la conformité au W3C VC Data Model pour les attestations de qualification numériques. Ce n'est qu'une proposition — [document du Conseil](https://data.consilium.europa.eu/doc/document/ST-13243-2026-ADD-1/en/pdf)
- **RGPD et mineurs (France)** :
  - Un mineur peut consentir seul à partir de 15 ans pour un service en ligne fondé sur le consentement (article 45 de la loi Informatique et Libertés). En dessous, il faut le consentement conjoint du mineur et du titulaire de l'autorité parentale — [CNIL, recommandation 4](https://cnil.fr/fr/recommandation-4-rechercher-le-consentement-dun-parent-pour-les-mineurs-de-moins-de-15-ans)
  - La CNIL relève que les textes ne précisent ni les services concernés ni les modalités de vérification de l'âge et du consentement — [CNIL, consultation publique](https://www.cnil.fr/fr/la-cnil-lance-une-consultation-publique-sur-les-droits-des-mineurs-dans-lenvironnement-numerique), [donneespersonnelles.fr](https://www.donneespersonnelles.fr/rgpd-donnees-mineurs)
- **Effacement sur Nostr** : la suppression n'est qu'une demande que les relais « SHOULD » honorer, et les demandes elles-mêmes restent publiées indéfiniment — [NIP-09](https://github.com/nostr-protocol/nips/blob/HEAD/09.md)

### Inferences
- **Une clé, plusieurs usages** :
  - L'apprenant garde une clé maîtresse : secp256k1 au format Nostr, stockée chiffrée (NIP-49) ou dans le trousseau de l'OS.
  - Il signe avec elle ses résultats de lab, son profil Open-Contact et son appartenance aux groupes de l'app école.
  - Le `userId` Trystero peut être rattaché à cette clé via les clés d'identité personnalisables (à vérifier en prototype).
  - Un `did:key` dérivé de la même famille de clés permettrait d'être bénéficiaire d'un OB3. Attention : secp256k1 (Nostr) ≠ Ed25519 (cryptosuite eddsa des OB3). Il faudra soit deux clés liées par une attestation croisée, soit vérifier qu'une cryptosuite secp256k1 acceptée existe dans le guide de conformité OB3.
- **Qui émet la preuve ?**
  - Un badge auto-émis ne vaut rien pour un recruteur.
  - Émetteurs crédibles : (1) le formateur ou l'organisme, via `did:web` sur le domaine de l'école ou une clé publiée ; (2) l'arbitre d'un tournoi.
  - Contenu recommandé du badge : le bloc de compétences visé (référentiel du titre « Administrateur d'infrastructures sécurisées »), le hash du pack et du scénario, et un lien vers la preuve (résultat signé et éventuellement enregistrement).
  - Côté Open-Contact : vérification locale (`@digitalbazaar/vc` en JS, `ssi` en Rust) et affichage « vérifié par X le JJ/MM ».
  - Un miroir NIP-58 est optionnel, réservé aux adultes qui veulent un affichage public.
- **Compatibilité européenne** : EDC est gratuit et basé VC. Viser OB 3.0 maintenant et garder un export EDC possible plus tard, si le « Skills Portability Act » aboutit.
- **RGPD by design** :
  - Tout reste local par défaut, et le pseudonyme est la règle.
  - Aucune donnée d'élève sur un relais public, et les codes de classe ne contiennent pas de nom.
  - Le tableau de bord formateur ne reçoit que ce que l'élève envoie (minimisation).
  - Pour les moins de 15 ans : consentement parental pour tout traitement fondé sur le consentement, et désactivation de toute publication publique.
  - L'effacement doit être réel : données locales seulement. Sur Nostr, l'effacement ne peut pas être garanti, donc on n'y publie rien de personnel par défaut.

### Gaps
- Statut 2026 de DID 1.1 non vérifié (w3.org inaccessible en direct).
- Méthode `did:nostr` non examinée.
- Date exacte de finalisation d'OB 3.0 : seule une source secondaire indique juin 2024.
- Contenu normatif du guide de conformité OB3 (cryptosuites acceptées, notamment secp256k1) non lu.
- Calendrier du portefeuille d'identité numérique européen (EUDI) et lien avec les diplômes non vérifiés.
- Statut de la loi française de 2023 sur la « majorité numérique » non vérifié.

## 7. Gérer le projet open source : licence et compatibilité, documentation contributeurs, visibilité, hébergement gratuit

### Takeaway
L'app peut rester permissive (Apache-2.0 seule, ou MIT OR Apache-2.0 comme Tauri) si elle *lance* QEMU (GPL-2.0), GNS3 (GPL-3.0) et containerlab (BSD-3) comme programmes séparés, sans lier leur code. Apache-2.0 est compatible avec la GPLv3 mais pas avec la GPLv2. Hermes Agent est sous MIT.

Visibilité : Show HN exige un produit essayable sans inscription. r/homelab impose un flair « Project: Software » et la déclaration de l'usage d'IA. Depuis le 2026-10-24, r/opensource *interdit* les projets « faits par IA ou pour l'IA » et exige un an de maintenance et plusieurs contributeurs : fermé pour ce projet.

Distribution : GitHub Pages et Releases sont gratuits. La signature Windows est gratuite via SignPath Foundation pour l'open source, le Microsoft Store gratuit pour les individus. Apple coûte 99 $/an.

### Cited Findings
- **Licences des composants** :
  - **QEMU** : « as a whole is released under the GNU General Public License, version 2 ». Certaines parties ont des licences compatibles GPLv2 ; les fichiers sans mention sont « GPLv2 or later » ; les firmwares fournis sont des programmes séparés sous leurs propres licences — [LICENSE QEMU](https://github.com/qemu/qemu/blob/HEAD/LICENSE)
  - **GNS3** : gns3-server sous GPL-3.0, version 3.0.6 du 2026-01-28 — [LICENSE](https://github.com/GNS3/gns3-server/blob/HEAD/LICENSE), [PyPI](https://pypi.org/project/gns3-server/)
  - **containerlab** : BSD-3-Clause (Nokia, 2021) — [LICENSE](https://github.com/srl-labs/containerlab/blob/HEAD/LICENSE)
  - **Hermes Agent** : MIT (Nous Research, 2025). Présenté comme « the self-improving AI agent » avec une boucle d'apprentissage qui crée des « skills », et décliné en Hermes Desktop — [LICENSE](https://github.com/NousResearch/hermes-agent/blob/HEAD/LICENSE), [README](https://github.com/NousResearch/hermes-agent/blob/HEAD/README.md)
  - **Tauri et wry** : Apache-2.0 OR MIT — [crates.io tauri](https://crates.io/crates/tauri), [crates.io wry](https://crates.io/crates/wry)
  - **EasyTier** : LGPL-3.0 — [LICENSE](https://github.com/EasyTier/EasyTier/blob/HEAD/LICENSE)
  - **Ludus** : AGPL-3.0 — [GitLab](https://gitlab.com/badsectorlabs/ludus/-/releases)
  - **GOAD** et **ForcAD** : GPL-3.0 — [LICENSE GOAD](https://github.com/Orange-Cyberdefense/GOAD/blob/HEAD/LICENSE), [LICENSE ForcAD](https://github.com/pomo-mondreganto/ForcAD/blob/HEAD/LICENSE)
- **Compatibilité** :
  - Selon la FSF, Apache-2.0 est une licence libre compatible avec la GPLv3 mais pas avec la GPLv2, à cause des clauses de brevet — [liste FSF (copie gnu.org)](https://www.gnu.org/l/license-list.html)
  - L'ASF précise que la compatibilité est à sens unique : du code Apache peut entrer dans un projet GPLv3, pas l'inverse — [ASF, GPL compatibility](https://apache.org/licenses/GPL-compatibility.html)
- **Contribution** : CLA vs DCO comme vu au §5 ; les dépendances permissives (MIT, Apache 2.0, ISC, BSD) posent peu de contraintes — [opensource.guide](https://github.com/github/opensource.guide/blob/HEAD/_articles/legal.md)
- **Visibilité** :
  - **Show HN** : réservé à « something you've made that other people can play with ». Pas de pages d'atterrissage ni de levées de fonds ; idéalement essayable sans inscription ni e-mail — [règles Show HN](https://news.ycombinator.com/showhn.html) (contenu obtenu via résultats de recherche, page non chargée directement)
  - **r/homelab** (annonce de modération relayée par un miroir tiers, environ fin octobre 2026) : les flairs « Project: Software » exigent un minimum de karma (AutoMod retire sinon). Le post doit expliquer en quoi le projet concerne r/homelab et décrire le rôle de l'IA ou des LLM dans le développement. Les ventes vont sur r/homelabsales — [miroir r/homelab](https://r.datuan.dev/r/HomeLab), [miroir wiki](https://axebps-redlib.hf.space/r/homelab/wiki/Rules)
  - **r/opensource** (règles annoncées le 2026-10-24) :
    - interdiction des projets qui utilisent l'IA, sont faits par IA ou destinés à l'IA ;
    - pour être promu, un projet doit être maintenu activement depuis au moins un an, avoir plusieurs contributeurs (environ 3 ou plus), une communauté existante et une licence OSI ;
    - le compte de l'auteur doit avoir au moins un an ; forte contestation, création de r/TrueOpenSource — [Tom's Hardware](https://tomshardware.com/tech-industry/artificial-intelligence/reddits-r-opensource-bans-ai-made-and-ai-focused-projects-also-bans-non-english-speakers-sweeping-new-rules-spark-backlash-over-linux-kernel-contributions-and-solo-developers), [Help Net Security](https://helpnetsecurity.com/2026/10/26/reddit-r-opensource-ai-ban), [RuntimeWire](https://runtimewire.com/article/r-opensource-bars-ai-projects-and-requires-a-year-of-maintenance-for-promotion)
- **Hébergement et distribution gratuits** :
  - GitHub Pages (≤ 1 GB, 100 GB/mois « soft ») — [limites Pages](https://github.com/github/docs/blob/HEAD/content/pages/getting-started-with-github-pages/github-pages-limits.md)
  - GitHub Releases (≤ 2 GiB par fichier, 1 000 fichiers par release) — [about-releases](https://github.com/github/docs/blob/HEAD/content/repositories/releasing-projects-on-github/about-releases.md)
  - tauri-action (build multiplateforme et publication de Release) — [README](https://github.com/tauri-apps/tauri-action/blob/HEAD/README.md)
- **Signature de code** :
  - **SignPath Foundation** fournit gratuitement un certificat de signature de code aux projets open source qualifiés (licence OSI, MFA exigée) :
    - c'est la Fondation qui apparaît comme éditeur ;
    - une mention est obligatoire (« Free code signing provided by SignPath.io, certificate by SignPath Foundation ») ;
    - Pandoc et OpenRCT2 l'utilisent — [signpath.org](https://signpath.org/), [conditions](https://signpath.org/terms), [politique Pandoc](https://pandoc.org/code-signing-policy.html)
  - **Microsoft Store** : inscription gratuite pour les développeurs individuels dans près de 200 pays (vérification d'identité par pièce d'identité et selfie). Les comptes entreprise restent payants (99 $ une fois) — [blog Windows Developer, 2025-09-10](https://blogs.windows.com/windowsdeveloper/2025/09/10/free-developer-registration-for-individual-developers-on-microsoft-store/)
  - **Apple** facture toujours 99 $/an aux développeurs — [Windows Central](https://www.windowscentral.com/microsoft/windows-11/microsoft-store-drops-fees-for-individual-developers-apple-still-charges-usd99-per-year)

### Inferences
- **Choix de licence de l'app** :
  - Apache-2.0, ou MIT OR Apache-2.0 comme Tauri et iroh. Apache apporte l'octroi de brevet et reste compatible avec un futur passage de composants en GPLv3. C'est permis tant que :
    1. QEMU, GNS3, containerlab, EasyTier, CTFd, etc. sont *invoqués* comme exécutables séparés (agrégat) ;
    2. aucun fichier GPL n'est copié dans le code de l'app ;
    3. les binaires redistribués sont livrés avec leurs licences et un lien vers leur source.
  - Si l'app doit embarquer du code GPL-3.0 (GNS3, ForcAD, rôles GOAD), il faut soit passer l'app en GPL-3.0, soit garder ces éléments en modules ou packs séparés.
  - La GPL-2.0-only de QEMU est incompatible avec Apache-2.0 en cas de lien direct : ne jamais lier libqemu.
  - L'AGPL ne concerne que du code exécuté comme service réseau : sans serveur, c'est peu pertinent, sauf à copier du code Ludus.
- **Dossiers du dépôt** : README (captures, GIF asciinema), CONTRIBUTING (DCO, style, tests de packs), CODE_OF_CONDUCT, SECURITY.md (les packs exécutent du code : processus de signalement indispensable), GOVERNANCE léger, gabarits d'issues et de PR, label « good first issue ». Le guide de rédaction de packs compte autant que la doc du code, car c'est par les packs que la communauté contribuera.
- **Plan de visibilité réaliste pour un projet solo d'IA** :
  - **Écarter** r/opensource : la règle anti-IA et l'exigence d'un an de maintenance le ferment.
  - **Viser** :
    1. Show HN quand une démo marche *sans inscription* (binaire téléchargeable et pack d'exemple) ;
    2. r/homelab avec le flair adapté et une déclaration honnête de l'usage d'IA ;
    3. r/networking et r/sysadmin, selon leurs règles (non vérifiées) ;
    4. communautés francophones (LinuxFr.org, forums de formations TSSR/AIS), écoles et formateurs, plus directement utiles ;
    5. des « awesome lists » (homelab, cybersécurité, CTF).
  - Une doc soignée sur GitHub Pages et des vidéos courtes (asciinema, GIF) comptent plus que le lancement.
- **Signature** :
  - Windows : SignPath Foundation, en contrepartie d'une politique de signature publique ; Microsoft Store gratuit en complément.
  - macOS : pas de notarisation sans 99 $/an. Il faut documenter le contournement Gatekeeper ou distribuer via Homebrew.
  - Linux : AppImage, deb, Flatpak, avec sommes de contrôle signées (minisign).

### Gaps
- Liste FSF et FAQ GPL non chargées directement : gnu.org est bloqué ; contenu obtenu via recherche et copies.
- Règles de r/networking, critères de GitHub Trending, conditions de Read the Docs et Codeberg Pages : non vérifiés.
- Version actuelle du Contributor Covenant non vérifiée.
- Exigences exactes de notarisation Apple non sourcées (seul le prix de 99 $/an l'est).
- Le miroir r/homelab est tiers : vérifier le texte exact dans la barre latérale officielle.

## 8. Design recommandé : multijoueur et liens d'écosystème (synthèse)

### Takeaway
Architecture recommandée, dans le prolongement d'Open-Contact :
- **Identité** : une clé par apprenant.
- **Rendez-vous** : Nostr, via Trystero ou nostr-sdk, avec salle chiffrée par code ou QR.
- **Transport** : iroh en Rust (QUIC, perçage NAT, relais), parce que WebRTC ne fonctionne pas dans la webview Linux.
- **État partagé** : Loro.
- **Terminaux** : PTY → xterm.js.
- **Résultats** : signés, avec un arbitre qui exécute des checkers déterministes ; l'IA explique, le code note.
- **Réseau de lab partagé** : seulement en attaque/défense, sur un segment arène isolé.
- **Preuves de compétence** : Open Badges 3.0 émis par le formateur, vérifiés localement par Open-Contact.
- **App école** : groupes par code dérivant une clé, tableau de bord alimenté par les résultats signés que les élèves envoient.

### Cited Findings
- Rendez-vous Nostr chiffré, mot de passe de salle, `maxUsers`, `userId` vérifié — [Trystero, README](https://github.com/dmotz/trystero/blob/HEAD/README.md), [docs/signaling.md](https://github.com/dmotz/trystero/blob/HEAD/docs/signaling.md), [docs/identity.md](https://github.com/dmotz/trystero/blob/HEAD/docs/identity.md)
- Environ 10 à 15 % des connexions exigent un TURN — [Trystero, troubleshooting](https://github.com/dmotz/trystero/blob/HEAD/docs/troubleshooting.md). Cloudflare TURN offre 1 000 Go/mois gratuits — [Cloudflare](https://www.cloudflare.com/products/turn-sfu/)
- WebRTC absent du WebKitGTK standard — [WebKit 274711](https://bugs.webkit.org/show_bug.cgi?id=274711), [Tauri #8426](https://github.com/tauri-apps/tauri/discussions/8426)
- iroh 1.x (composer par clé publique, perçage NAT, relais) et relais publics limités au développement et au « hobby » — [README iroh](https://github.com/n0-computer/iroh/blob/HEAD/README.md), [CHANGELOG](https://github.com/n0-computer/iroh/blob/HEAD/CHANGELOG.md), [docs iroh : rate limiting](https://docs.iroh.computer/relays/rate-limiting)
- Loro (time travel, P2P), xterm.js, asciicast v3 — [Loro](https://github.com/loro-dev/loro/blob/HEAD/README.md), [npm xterm](https://registry.npmjs.org/@xterm/xterm), [asciinema](https://github.com/asciinema/asciinema/blob/HEAD/README.md)
- Modèle tick et checkers des gameservers attaque/défense — [FAUST](https://github.com/fausecteam/ctf-gameserver/blob/HEAD/README.md), [saarCTF](https://github.com/efiens/saarctf-gameserver/blob/HEAD/README.md), [enochecker3](https://pypi.org/project/enochecker3/)
- Isolation : Docker `--internal`, QEMU `restrict`, mode test de Ludus — [Docker CLI](https://github.com/docker/cli/blob/HEAD/docs/reference/commandline/network_create.md), [qemu-options.hx](https://github.com/qemu/qemu/blob/HEAD/qemu-options.hx), [Ludus](https://gitlab.com/badsectorlabs/ludus/-/blob/main/README.md)
- Ponts L2 par VXLAN multi-nœuds — [containerlab](https://github.com/srl-labs/containerlab/blob/HEAD/docs/manual/multi-node.md)
- OB 3.0 = VC (VCDM 2.0, Recommandation W3C 2025) ; badges NIP-58 ; EDC gratuit — [W3C](https://www.w3.org/news/2025/the-verifiable-credentials-2-0-family-of-specifications-is-now-a-w3c-recommendation), [NIP-58](https://github.com/nostr-protocol/nips/blob/HEAD/58.md), [Europass EDC](https://europass.europa.eu/en/european-digital-credentials-learning)
- Seuil de 15 ans et consentement parental ; effacement Nostr non garanti — [CNIL](https://cnil.fr/fr/recommandation-4-rechercher-le-consentement-dun-parent-pour-les-mineurs-de-moins-de-15-ans), [NIP-09](https://github.com/nostr-protocol/nips/blob/HEAD/09.md)
- Distribution et signature des packs : GHCR gratuit en public, ORAS, cosign keyless, minisign — [GitHub Packages](https://github.com/github/docs/blob/HEAD/data/reusables/package_registry/packages-billing.md), [ORAS](https://proxy.golang.org/oras.land/oras/@latest), [cosign](https://github.com/sigstore/cosign/blob/HEAD/README.md), [minisign](https://github.com/jedisct1/minisign/blob/HEAD/README.md)

### Inferences

#### A. Couches techniques (de bas en haut)
1. **Identité** : clé maîtresse par apprenant (format Nostr, chiffrée au repos), partagée par Open-Contact, l'app lab et l'app école. Pseudonyme par défaut. Rotation et révocation par événement signé.
2. **Rendez-vous** :
   - salle = hachage d'un code court (QR), avec `password` = code ;
   - signalisation sur relais Nostr publics (redondance 5), repli MQTT ou trackers ;
   - en classe : mDNS en plus, et relais Nostr ou iroh local sur la machine du formateur ;
   - hors réseau : échange de tickets de connexion par QR.

   Deux implémentations :
   - (a) **réutiliser Trystero dans la webview**. La signalisation passe par WebSocket, qui fonctionne partout, et WebRTC est utilisé sous Windows et macOS ;
   - (b) **recommandée** : publier sur Nostr, depuis Rust avec `nostr-sdk`, un *ticket iroh* (NodeId + adresses) chiffré avec la clé de salle. Le transport est alors 100 % Rust et identique sur les trois OS.
3. **Transport** :
   - iroh (QUIC) : streams fiables pour les terminaux et la synchronisation CRDT, datagrammes pour les trames de lab ;
   - relais publics n0 en développement ;
   - en production :
     - un `iroh-relay` auto-hébergeable, que le formateur lance en un clic sur sa machine ou sur une VM gratuite ;
     - un relais communautaire ;
     - à défaut, dégradation en mode asynchrone (duel avec résultats échangés plus tard).
   - La branche WebRTC (voix, compatibilité Open-Contact) peut utiliser Cloudflare TURN si un formateur fournit son compte.
4. **État partagé** : un document Loro par partie contenant les métadonnées (pack, graine, joueurs, rôles), la check-list de diagnostic, les notes, les annotations de topologie, le journal d'actions haché en chaîne et les résultats signés. La présence et les curseurs passent en messages éphémères.
5. **Terminaux** : PTY sur l'hôte, flux sur un stream iroh, xterm.js chez les pairs. Jeton clavier, mode observateur, enregistrement asciicast v3 pour chaque joueur.
6. **Réseau de lab** :
   - *aucun* dans les modes duel, co-op et maître du jeu : tout passe par l'interface de l'app ;
   - en attaque/défense seulement : un segment « arène » isolé, transporté en L3 par iroh (ou EasyTier/WireGuard en option avancée) ;
   - VXLAN uniquement si le scénario exige du L2 ;
   - pare-feu par défaut en refus, snapshot et restauration.

#### B. Modes de jeu
- **Duel** :
  1. engagement-révélation des graines, puis même panne tirée du même pack signé ;
  2. chacun répare son lab local ;
  3. le checker, lancé par l'arbitre (ou par les deux apps, avec croisement des résultats), détermine le gagnant ;
  4. résultats signés et replays `.cast` échangés, débrief IA comparatif (« ta démarche vs la sienne »).
- **Co-op** : lab de l'hôte faisant autorité ; terminaux partagés et CRDT ; l'IA superviseur de l'hôte distribue des indices au groupe ; score d'équipe.
- **Maître du jeu** : le MJ choisit des pannes dans le catalogue *fermé* du pack (pas de commande libre). Chaque ordre est signé, montré à la victime puis accepté une fois pour la session, et journalisé. L'IA peut tenir le rôle de MJ automatique, avec Atomic Red Team pour le volet sécurité.
- **Attaque/défense** :
  - les défenseurs hébergent l'infrastructure (pack attaque/défense) ;
  - les attaquants rejoignent l'arène ;
  - l'arbitre, machine neutre, exécute les ticks : flags, SLA, soumission ;
  - l'IA arbitre commente et détecte les infractions (par exemple un trafic hors arène, bloqué de toute façon) ;
  - débrief : flux capturés, `.cast` et timeline.
- **Tournoi de classe** : la machine du formateur sert de directeur (appariements, collecte des résultats signés, classement déterministe). CTFd local pour l'épreuve jeopardy ; export CSV pour l'évaluation.

#### C. Liens d'écosystème
- **Lab → Open-Contact** :
  - le formateur, l'organisme ou l'arbitre de tournoi émet un **Open Badge 3.0** (VC) : bloc de compétences, scénario, hash du pack et preuve ;
  - Open-Contact importe le badge, le vérifie localement et l'affiche sur le profil de recherche d'emploi, avec le niveau de confiance de l'émetteur ;
  - option NIP-58 pour un affichage Nostr public, adultes volontaires seulement ;
  - les simples « auto-attestations » (succès en solo) s'affichent comme « pratiqué », jamais comme « vérifié ».
- **Lab → app école** :
  - groupe de classe = code partagé, dont on dérive une clé (même mécanique qu'Open-Contact) ;
  - le tableau de bord formateur agrège les résultats signés que *les élèves* poussent, avec minimisation et pseudonymes possibles ;
  - consentement parental géré pour les moins de 15 ans ;
  - aucune donnée sur un relais public ; tout réside sur les machines.
- **Identité commune** : une seule clé, avec affichage de la même empreinte dans les trois apps. NIP-46 pour signer depuis un téléphone. Possibilité future d'exporter vers EDC.

#### D. Ordre de construction conseillé (examen en juillet 2027)
1. Duel asynchrone : packs signés et résultats signés, sans aucun réseau temps réel.
2. Co-op à deux : Nostr + iroh, terminal partagé, Loro.
3. Maître du jeu.
4. Badges OB3 émis par le formateur et affichage dans Open-Contact.
5. Attaque/défense, la partie la plus risquée : isolation, réseau, arbitrage.
6. Tournoi de classe.

### Gaps
- Le couplage Trystero `userId` ↔ clé Nostr ↔ `did:key`/OB3 (secp256k1 vs Ed25519) reste à prototyper.
- Pas de mesure réelle du taux de connexions directes iroh ou WebRTC sur des réseaux d'école français.
- La disponibilité future des relais publics iroh pour un usage éducatif gratuit n'est pas garantie (pas de SLA).
- Le choix entre l'option (a) Trystero/WebRTC et l'option (b) iroh dépend d'un test de compatibilité Tauri sous Linux (CEF) non réalisé ici.
