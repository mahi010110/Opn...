# Plateformes de lab informatique locales et auto-hébergées : inventaire et couverture réelle (état au 13 novembre 2026)

> **Note de méthode.** Recherche effectuée le 13/11/2026. Plusieurs sites officiels (eve-ng.net, developer.cisco.com, docs.ludus.cloud, blog.cloudmylab.com) n'étaient pas lisibles directement depuis l'environnement de recherche : leur contenu a été obtenu via les extraits cités par le moteur de recherche. Ces points sont à revérifier avant publication. Quand c'est indiqué, les numéros et dates de « dernière version » viennent des registres officiels interrogés directement le 13/11/2026 : PyPI (GNS3, netlab, Kathará, virl2-client), l'index de modules Go `proxy.golang.org` (containerlab, clabernetes, Incus, fournisseurs Terraform) et l'API GitLab (Ludus). Les étoiles GitHub ont été relevées le même jour sur les pages GitHub.
> **Légende.** [éditeur] = affirmation marketing ou communiqué de l'éditeur. [secondaire] = source tierce non officielle. [concurrent] = blog d'une société qui vend des labs hébergés concurrents (CloudMyLab, NetPilot). [ancien] = information antérieure à 2025, à revérifier.

## 1. Émulateurs réseau (EVE-NG, PNETLab, GNS3, CML, Containerlab, netlab, Kathará, Mininet) : que peuvent-ils réellement exécuter (VM complètes, ESXi imbriqué, Windows Server, stockage, WiFi) ?

### Takeaway
EVE-NG, GNS3 et CML orchestrent QEMU/KVM. Ils exécutent de vraies VM (Windows Server, Linux, OS réseau virtuels, pare-feu) et, avec des réglages, un ESXi imbriqué. Ils gèrent aussi des conteneurs Docker : GNS3 depuis longtemps ; EVE-NG, avec un moteur Docker réimplémenté via sysbox en 6.4 (date d'introduction initiale non vérifiée) ; CML depuis la 2.9 (juillet 2025). Containerlab, netlab, Kathará et Mininet sont centrés sur les conteneurs ou les namespaces ; containerlab peut quand même encapsuler des VM via vrnetlab. Aucun n'émule nativement le WiFi, et le stockage n'y est qu'« une VM de plus ». Changement majeur de 2026 : EVE-NG Community (63 nœuds, gratuit) est en fin de vie depuis juin 2026. EVE-NG v7 le remplace par un mode « Freemium » limité à 7 nœuds.

### Cited Findings

#### EVE-NG (Community / Freemium / Professional / Learning Centre)
- La page de téléchargement officielle marque la build gratuite « EVE Community Edition Version 6.2.0-4 » comme « EOS-EOL — End of Support & End of Life June, 2026 ». L'ISO reste téléchargeable mais ne reçoit plus ni mises à jour ni support (extrait moteur) — [EVE-NG Download](https://www.eve-ng.net/index.php/download/) ; [EVE-NG Community](https://www.eve-ng.net/index.php/community/)
- EVE-NG v7 est sorti le 24/06/2026. Les notes de version v7.0.1-2 décrivent un « Freemium mode (7 nodes, unlimited VPCS, admin only) ». La Community n'a pas été reportée en v7 — [CloudMyLab, juin 2026 [concurrent]](https://blog.cloudmylab.com/eve-ngs-free-tier-is-now-7-nodes) ; [NetPilot [concurrent]](https://www.netpilot.io/blog/eve-ng-free-tier-7-nodes-2026)
- La page d'accueil officielle affiche « EVE-NG Professional Edition … Release 7.4.0-2, 1 November, 2026 ». La page de téléchargement montrait encore Freemium en 7.2.0-18 (extrait moteur) — [eve-ng.net](https://eve-ng.net/)
- Incohérence côté éditeur : la page de comparaison des éditions présente encore « Community » comme gratuite à 63 nœuds — [EVE-NG Features compare](https://www.eve-ng.net/index.php/features-compare/)
- Prix sur la page officielle de comparaison (consultée via moteur, 2026) : Professional 150 EUR ; Learning Center / Corporate « 150 EUR + Added Roles » ; jusqu'à 1024 nœuds par lab [éditeur] — [EVE-NG Features compare](https://www.eve-ng.net/index.php/features-compare/) ; [CloudMyLab [concurrent]](https://blog.cloudmylab.com/eve-ng-community-vs-eve-ng-professional?hsLang=en)
  - La licence est annuelle. Un renouvellement ne prolonge pas la licence en cours : les jours restants sont perdus — [EVE Licensing Model](https://www.eve-ng.net/index.php/documentation/eve-licensing-model)
  - Un revendeur affiche Learning Center à 164 $/an + 325 $/utilisateur — [CloudMyLab (revendeur)](https://cloudmylab.com/eve-ng/). Un ancien message du forum cite 112,40 $ pour une licence Pro d'un an [ancien] — [Forum EVE-NG](https://eve-ng.net/forum/viewtopic.php?p=9596)
- L'EULA autorise EVE-NG LTD à « modify, update, reduce, expand, remove, or replace the features, limits » — [EVE-NG EULA](https://www.eve-ng.net/index.php/documentation/eula/)
- Docker : l'entrée 6.4.0 des notes de version annonce « new docker in docker using SYSBOX container for security isolation » — [EVE-NG Release notes](https://www.eve-ng.net/index.php/documentation/release-notes/)
- ESXi imbriqué : un how-to officiel explique comment ajouter VMware ESXi comme nœud. Il part de l'appliance Nested ESXi 6.5d (« other versions should also be supported »), avec conversion VMDK→qcow2 [ancien : basé sur ESXi 6.5] — [EVE-NG HowTo ESXi](https://www.eve-ng.net/index.php/documentation/howtos/howto-add-vm-ware-esxi/)
- Windows Server : un guide officiel décrit la création de ses propres images (2008 R2 à 2022 ; profil 2022 de 4 vCPU / 8 Go de RAM). Le préfixe de nommage est « winserver- » — [EVE-NG HowTo Windows Server](https://www.eve-ng.net/index.php/documentation/howtos/howto-create-own-windows-server-on-the-eve/) ; [QEMU image namings](https://www.eve-ng.net/index.php/documentation/qemu-image-namings)
- Hôtes supportés : VMware ESXi 6.7+, VMware Workstation 16+ et Proxmox. L'ancienne page des prérequis indique au contraire « Hyper-V, Promox and XEN Citrix are not officially supported » (contradiction sur Proxmox) — [Supported HW/SW](https://www.eve-ng.net/index.php/supported-hardware-and-software-systems/) ; [System Requirement](https://www.eve-ng.net/index.php/documentation/installation/system-requirement/)
- Processeur : Intel VT-x/EPT requis ; AMD-V/RVI est « capable … but not officially supported ». La documentation précise : « MAC M1, M2 and M3 CPUs are not supported due issues with VMWare Fusion and nested CPU » — [System Requirement](https://www.eve-ng.net/index.php/documentation/installation/system-requirement/) ; [Not Supported Systems or HW](https://www.eve-ng.net/index.php/not-supported-systems-or-hw/)
- Sous Hyper-V, EVE-NG n'est « not supported … in a practical sense because it interferes with nested KVM functionality » [secondaire] — [aboutnetworks.net](https://aboutnetworks.net/eve-ng-on-hyper-v)
- WiFi : le contrôleur virtuel Cisco C9800-CL tourne comme nœud, mais pour un modérateur du forum « AP can be only real stuff » — [Forum EVE-NG](https://eve-ng.net/forum/viewtopic.php?p=40760)
- Dégradation de liens : un add-on open source NETem règle bande passante, délai, gigue et perte [secondaire] — [networkacademy.io](https://www.networkacademy.io/ccie-enterprise/sdwan/packet-loss-latency-and-jitter-on-eve-ng)

#### PNETLab
- La documentation officielle décrit une version hors ligne « with full features of the online version, and it is free » — [PNETLab documentation](https://pnetlab.com/pages/documentation)
- En mode hors ligne, seuls les « Open Labs » du Store sont accessibles. En mode en ligne, une inscription donne accès à tous les labs. Identifiants par défaut : admin/pnet — [PNETLab Download](https://www.pnetlab.com/pages/download)
- La page des versions ne liste que 5.3.11 et 4.0.2, sans date claire — [PNETLab releases](https://pnetlab.com/pages/releases)
- Une « v6 BETA » circule via des scripts communautaires hébergés sur des miroirs tiers (labhub.eu.org), exécutés en root. Des erreurs d'installation de PHP 7.2 apparaissent car les dépôts backport ont disparu — [cnblogs](https://cnblogs.com/amsilence/p/18515521) ; [Telegram NetLabHub](https://t.me/s/NetLabHub?after=264)
- PNETLab est un fork de l'EVE-NG Community (vers 2019) avec des nœuds illimités, mais avec des compromis sur « support, development activity, and legal clarity » [concurrent] — [CloudMyLab](https://blog.cloudmylab.com/pnetlab-vs-eve-ng-free-fork-or-the-real-thing)

#### GNS3
- Version stable : 3.0.6, publiée le 28/01/2026 (gns3-server et gns3-gui sur PyPI). La 3.0.0 date du 20/12/2024 — [PyPI gns3-server](https://pypi.org/project/gns3-server/) ; [Wikipedia GNS3](https://en.wikipedia.org/wiki/Graphical_Network_Simulator-3)
- La branche 2.2 est toujours maintenue : 2.2.61 publiée le 30/07/2026 (PyPI) — [PyPI gns3-server, historique](https://pypi.org/project/gns3-server/#history)
- La 3.1 est en alpha : 3.1.0a7 publiée le 21/10/2026 (PyPI). Les notes de la pré-version 3.1.0a4 (09/07/2026) contiennent « Make AI features (AI Copilot + MCP) optional via [ai-features] extra » et « Add API Key support for MCP authentication » — [GitHub GNS3 v3.1.0a4](https://github.com/GNS3/gns3-gui/releases/tag/v3.1.0a4)
- La documentation 3.1 annonce une nouvelle interface web (console, VNC et Wireshark dans le navigateur) et une collaboration multi-utilisateurs avec permissions — [GNS3 3.1 Documentation](https://docs.gns3.com/docs-3.1-en/)
- Selon une source tierce, le serveur 3.0 ne fonctionne que sous Linux, la GNS3 VM est basée sur Ubuntu 22.04 et l'API repose sur FastAPI/Pydantic [secondaire] — [packettracernetwork.com](https://www.packettracernetwork.com/features/gns3-300-newfeatures.html)
- Types de nœuds :
  - Dynamips : vrais IOS Cisco.
  - IOU.
  - QEMU : moteur principal, recommandé sous Linux.
  - Docker : partage le noyau de l'hôte.
  - Intégration de VM VirtualBox/VMware existantes (« does not have control of the configuration »).
  - VPCS.
  - Source — [GNS3 docs, Which emulators](https://docs.gns3.com/docs/emulators/which-emulators-should-i-use)
- La GNS3 VM tourne localement sur VMware Workstation, VirtualBox ou Hyper-V, ou à distance sur ESXi. La documentation 3.1 ajoute un guide KVM/QEMU — [GNS3 VM](https://docs.gns3.com/docs/getting-started/installation/download-gns3-vm) ; [GNS3 3.1 docs](https://docs.gns3.com/docs-3.1-en/)
- gns3-gui : 2,7k étoiles, licence GPL-3.0 — [GitHub gns3-gui](https://github.com/GNS3/gns3-gui)
- Apple Silicon :
  - En 2021, un mainteneur indiquait que la GNS3 VM ne fonctionne pas car tout son contenu cible Intel [ancien].
  - Une VM ARM communautaire existe, et un artefact « GNS3.VM.ARM64.2.2.24.zip » est mentionné.
  - Les appliances x86 (Palo Alto, NX-OSv, vEOS) restent problématiques.
  - Sources — [Issue #3257](https://github.com/GNS3/gns3-gui/issues/3257) ; [Discussion #3261](https://github.com/GNS3/gns3-gui/discussions/3261) ; [Habr](https://habr.com/ru/articles/983362/) ; [Nerdy Drunk](https://nerdydrunk.info/cisco:gns3-apple-silicon)

#### Cisco Modeling Labs (CML)
- CML-Free permet jusqu'à 5 nœuds simultanés sans licence. Il est apparu avec la 2.8 (2.8.0 du 06/11/2024) — [CML-Free](https://developer.cisco.com/docs/modeling-labs/cml-free/) ; [CML 2.8 Release Notes](https://developer.cisco.com/docs/modeling-labs/2-8/cml-release-notes/) ; [Software Version History](https://developer.cisco.com/docs/modeling-labs/software-version-history)
- Prix (2026) :
  - Personal : 199 $ (ou 2 Cisco Learning Credits), 20 nœuds Cisco, mono-utilisateur, non extensible, support communautaire — [Cisco Training CML](https://www.cisco.com/site/us/en/learn/training-certifications/training/modeling-labs/index.html)
  - Personal Plus : 349 $ (ou 4 CLC), 40 nœuds — [Cisco CML](https://www.cisco.com/c/en/us/products/cloud-systems-management/modeling-labs/index.html) ; [At-a-Glance](https://www.cisco.com/c/en/us/products/collateral/cloud-systems-management/modeling-labs/modeling-labs-personal-plus-aag.html)
  - Des tiers présentent ces offres comme des abonnements annuels (« ~349 $/an ») [concurrent] — [NetPilot](https://www.netpilot.io/blog/cisco-cml-cost)
- CML 2.9 (18/07/2025) :
  - Ajouts : prise en charge de conteneurs Docker (définitions de nœuds personnalisées), conteneurs pouvant se relier aux VM, clonage d'images disque, permissions fines, dépôts de labs externes.
  - La limite de nœuds actifs passe de 320 à 520.
  - Cisco affirme que les conteneurs consomment « significantly less CPU, memory, and disk » que les VM [éditeur].
  - Sources — [CML 2.9 Release Notes](https://developer.cisco.com/docs/modeling-labs/2-9/cml-release-notes/) ; [Cisco blog 2.9](https://blogs.cisco.com/learning/unlock-new-possibilities-with-cisco-modeling-labs-2-9)
  - La restriction « une image par définition de nœud » a été levée en 2.10 — [Cisco blog, custom containers](https://blogs.cisco.com/learning/building-custom-containers-for-cisco-modeling-labs-cml-a-practical-guide/)
- CML 2.10 : intégration d'un serveur MCP pour outils d'IA, streaming de capture de paquets vers Wireshark, icônes personnalisées, démarrage automatique ordonné des labs — [CML 2.10 docs](https://developer.cisco.com/docs/modeling-labs/2-10/) ; [Cisco Developer CML](https://developer.cisco.com/modeling-labs/) ; [Cisco CML](https://www.cisco.com/c/en/us/products/cloud-systems-management/modeling-labs/index.html)
  - La date exacte de la 2.10 n'a pas été trouvée. Le client Python virl2-client 2.10.1 a été publié le 28/09/2026 — [PyPI virl2-client](https://pypi.org/project/virl2-client/)
- Lab-as-code : fournisseur Terraform `terraform-provider-cml2` v0.10.2 (10/11/2026, index Go) — [GitHub terraform-provider-cml2](https://github.com/CiscoDevNet/terraform-provider-cml2) ; [proxy.golang.org](https://proxy.golang.org/github.com/!cisco!dev!net/terraform-provider-cml2/@latest)
- Dégradations natives : le « Link conditioning » règle bande passante, latence (RTT), gigue et perte par lien ; un nœud « WAN Emulator » existe aussi — [CML Link Conditioning](https://developer.cisco.com/docs/modeling-labs/link-conditioning/) ; [CML WAN Emulator](https://developer.cisco.com/docs/modeling-labs/wan-emulator)
- WiFi : « CML does not offer images for access points (APs) or wireless clients ». Le 9800-CL peut gérer des AP physiques via une connectivité externe en pont — [CML Catalyst 9800-CL](https://developer.cisco.com/docs/modeling-labs/catalyst-9800-cl/)
- Matériel : appliance x86_64 sous KVM, au minimum 4 cœurs VT-x/AMD-V et 16 Go de RAM pour 5 à 8 nœuds [secondaire, non vérifié] — [cciedump](https://cciedump.spoto.net/blog/?p=24336). Chiffres officiels — [CML 2.9 System Requirements](https://developer.cisco.com/docs/modeling-labs/2-9/system-requirements/)

#### Containerlab (+ clabernetes)
- Tag v0.83.0 daté du 06/11/2026 (index Go). Environ 3,0k étoiles, licence BSD-3-Clause — [GitHub containerlab](https://github.com/srl-labs/containerlab) ; [proxy.golang.org](https://proxy.golang.org/github.com/srl-labs/containerlab/@latest)
- Catalogue (selon le dépôt ; sous Linux, « No software apart from Docker is required ») — [GitHub containerlab](https://github.com/srl-labs/containerlab) :
  - OS réseau en conteneur : SR Linux, cEOS, XRd, SONiC, cRPD/cSRX, Cumulus VX, VyOS, FD.io VPP, ArcOS, etc.
  - OS réseau en VM via vrnetlab/boxen : vMX, vSRX, vJunos, XRv9k, Nexus 9000v, c8000v, CSR1000v, vIOS, ASAv, FTDv, vEOS, PAN, FortiGate, AOS-CX, Huawei VRP, F5 BIG-IP, OpenBSD, FreeBSD, OpenWRT.
- Le kind `generic_vm` lance des VM arbitraires empaquetées en conteneur via vrnetlab, par exemple Ubuntu via hellt/vrnetlab/ubuntu. Aucune documentation n'a été trouvée pour un invité Windows — [containerlab generic_vm](https://containerlab.dev/manual/kinds/generic_vm) ; [lab generic_vm01](https://containerlab.dev/lab-examples/generic_vm01)
- Windows : via WSL2, directement ou dans un devcontainer — [containerlab Windows](https://containerlab.dev/windows/)
- macOS : support officiel ARM et Intel (revue de la v0.73, mars 2026). Les images VM vrnetlab exigent la virtualisation imbriquée, « only available on M3+ chip with macOS version 15 and above » — [containerlab macOS](https://containerlab.dev/macos/) ; [Brian Linkletter, 03/2026](https://brianlinkletter.com/2026/03/containerlab-network-emulator-v0-73-review/)
- Une analyse d'IP Infusion (spécifique à OcNOS) note que sur Apple Silicon le binaire x86_64 tourne sous émulation, que Colima sur ARM est « limited/slow », et que WSL2 + Docker Desktop fonctionne bien [éditeur] — [IP Infusion](https://www.ipinfusion.com/blog/ocnos-in-containerlab-part-2-platform-analysis/)
- Dégradations : `containerlab tools netem set` applique délai, gigue et perte par interface — [netem set](https://containerlab.dev/cmd/tools/netem/set) ; [Link impairments](https://containerlab.dev/manual/impairments/)
- Interface graphique : le dépôt de l'extension VS Code est archivé. Le développement a été déplacé vers srl-labs/containerlab-app ; l'extension est publiée sur VS Marketplace et Open VSX — [GitHub vscode-containerlab](https://github.com/srl-labs/vscode-containerlab)
- clabernetes (containerlab sur Kubernetes) : v0.11.0 du 31/10/2026 (index Go) — [GitHub clabernetes](https://github.com/srl-labs/clabernetes)

#### netlab
- Version 26.10 du 03/10/2026, avec un rythme mensuel (26.7 le 12/07, 26.8 le 10/08, 26.9 le 18/09/2026) — [PyPI networklab](https://pypi.org/project/networklab/)
- 756 étoiles. À partir d'une topologie YAML de haut niveau, netlab génère la configuration containerlab ou Vagrant/libvirt, l'inventaire Ansible, le plan d'adressage IPv4/IPv6 et les configurations des équipements (OSPF, IS-IS, BGP, EVPN, MPLS, SRv6) — [GitHub netlab](https://github.com/ipspace/netlab)
- `netlab tc` gère les dégradations de liens ; installation documentée sur une VM Ubuntu — [netlab tc](https://netlab.tools/netlab/tc/) ; [netlab Ubuntu VM](https://netlab.tools/install/ubuntu-vm)

#### Kathará
- Version 3.8.4 du 06/11/2026 — [PyPI kathara](https://pypi.org/project/kathara/)
- 658 étoiles, GPL-3.0 — [GitHub Kathara](https://github.com/KatharaFramework/Kathara)
  - Chaque équipement est un conteneur, avec Docker ou Kubernetes (Megalos) comme backend.
  - Un lab se décrit avec `lab.conf` et des fichiers `*.startup`, ou via une API Python.
  - Images fournies : Quagga, FRR, Bind, P4, OVS. Aucune mention de VM.

#### Mininet
- 5,9k étoiles, BSD-3-Clause. La version courante annoncée est « Mininet 2.3.1b4 » — [GitHub mininet](https://github.com/mininet/mininet)
  - Les hôtes sont des processus dans des namespaces réseau, les commutateurs sont OVS/OpenFlow, les liens sont des paires veth.
- Le dernier paquet PyPI est 2.3.0.dev6 (24/09/2020) — [PyPI mininet](https://pypi.org/project/mininet/)

#### Cisco Packet Tracer (simulateur, pour référence)
- Packet Tracer 9.0.0 (build 9.0.0.0810) a été publié officiellement vers octobre 2025 [secondaire non officiel] — [packettracernetwork.com](https://www.packettracernetwork.com/download/)
- Cisco indique que la 9.0 ajoute la pratique de compétences industrielles — [Packet Tracer What's New](https://tutorials.ptnetacad.net/help/default/whatsNew.htm)

### Inferences
- Classement par variété de ce que chaque outil fait tourner : EVE-NG Pro ≈ GNS3 > CML > containerlab > netlab (méta-outil) > Kathará > Mininet. Seuls EVE-NG, GNS3 et CML combinent dans une même interface des VM complètes (Windows, ESXi, appliances) et des conteneurs.
- Le passage d'EVE-NG à 7 nœuds gratuits (juin 2026) rend son offre gratuite insuffisante pour un lab « IT complet ». Un lab minimal (DC, client, routeur, pare-feu, NAS, switch) atteint déjà 6 à 7 nœuds. Les alternatives gratuites restent GNS3, containerlab et PNETLab, dont le statut juridique et le suivi sont flous.
- Tous les émulateurs basés sur QEMU exigent un hôte x86 avec VT-x/AMD-V. Apple Silicon est structurellement désavantagé, car la plupart des images réseau et de Windows Server sont x86.
- Les outils « texte d'abord » (containerlab, netlab, Kathará) sont les plus adaptés au lab-as-code et à une génération par une IA. EVE-NG, GNS3 et CML sont « GUI d'abord » avec des API.
- Les acteurs installés ajoutent eux-mêmes de l'IA et du MCP : GNS3 3.1 alpha (AI Copilot + MCP), CML 2.10 (serveur MCP), Ludus 2.1 (documentation MCP, voir §2). C'est un signal concurrentiel pour le projet étudiant (le volet IA est traité ailleurs).

### Gaps
- Pages officielles EVE-NG v7 non lues directement. Le contenu exact du Freemium au-delà des 7 nœuds (Docker ? API ? import d'images ?) n'a pas pu être vérifié. La base Ubuntu 24.04 de la v7 n'apparaît que dans des posts LinkedIn non vérifiés.
- L'API REST d'EVE-NG, la prise en charge de Docker dans Freemium et toute compatibilité ARM d'EVE-NG v7 n'ont pas été vérifiées (aucune preuve trouvée).
- Date exacte de sortie de CML 2.10 inconnue. Contradiction non résolue : licence CML Personal ponctuelle ou annuelle.
- Aucune annonce officielle de PNETLab v6 trouvée ; activité réelle du projet inconnue.
- Date de Mininet 2.3.1b4 non trouvée.
- Pas de documentation trouvée sur Windows Server dans containerlab (`generic_vm`) ni sur ESXi imbriqué dans GNS3 ou CML : possible en théorie via QEMU/KVM, mais non documenté.

## 2. Home labs basés sur hyperviseur (Proxmox VE, VMware Workstation Pro, VirtualBox, Hyper-V, Incus) et couches d'automatisation (Vagrant, Terraform/Ansible, Ludus, GOAD, AutomatedLab, DetectionLab, Labtainers, cyber ranges)

### Takeaway
Proxmox VE (gratuit, AGPLv3) est la plateforme d'infrastructure la plus complète : KVM, LXC, images OCI depuis la 9.1, SDN et stockage. Mais c'est un OS serveur à installer sur la machine, pas une application de bureau. VMware Workstation Pro est gratuit pour tous depuis novembre 2024 et reste l'hôte de bureau de référence pour l'ESXi imbriqué. ESXi 9 exige cependant un droit VCF/VVF ; seul ESXi 8.0U3e est gratuit. Hyper-V est intégré à Windows Pro mais ne fait pas tourner d'ESXi moderne. Les couches « lab-as-code » (Ludus 2.x, GOAD v3, AutomatedLab, Vagrant/Terraform) sont actives mais spécialisées (AD, sécurité, Windows) et gourmandes : 20 à 32 Go de RAM par lab.

### Cited Findings

#### Proxmox VE
- 9.0 sortie le 05/08/2025, basée sur Debian 13 « Trixie » — [LXer](https://lxer.com/module/newswire/view/356262/index.html)
- 9.1 sortie le 19/11/2025 [éditeur] :
  - Images OCI pour créer des conteneurs LXC, système ou applicatifs. Heise souligne que l'import OCI est encore en « tech preview » — [heise](https://heise.de/-11086586) ; [Linuxiac](https://linuxiac.com/proxmox-ve-9-1-released-with-oci-based-lxc-deployment/)
  - Nouveau flag vCPU pour activer les extensions de virtualisation imbriquée sans exposer le type CPU « host ».
  - TPM en qcow2.
  - Source — [Proxmox, communiqué 9.1](https://www.proxmox.com/en/about/company-details/press-releases/proxmox-virtual-environment-9-1)
- 9.2 sortie le 21/05/2026 [éditeur] — [Proxmox, communiqué 9.2](https://www.proxmox.com/en/about/company-details/press-releases/proxmox-virtual-environment-9-2) ; [StorageReview](https://www.storagereview.com/news/proxmox-virtual-environment-9-2-released-with-dynamic-load-balancer-and-expanded-sdn-features) :
  - Load balancer dynamique, SDN avec WireGuard et BGP natifs, profils CPU personnalisés.
  - Pile technique : Debian 13.5, noyau 7.0, QEMU 11.0, LXC 7.0, ZFS 2.4, Ceph Tentacle 20.2.1.
  - PVE 8.4 reçoit des correctifs de sécurité jusqu'en août 2026.
- Licence et prix : AGPLv3, toutes les fonctions disponibles sans abonnement (dépôt no-subscription). Abonnements optionnels, par socket CPU et par an, au tarif d'octobre 2026 : Community 120 € (anciennement 115 €), Basic 370 €, Standard 550 €, Premium 1 100 € — [Proxmox pricing](https://www.proxmox.com/en/proxmox-ve/pricing) ; [HorizonIQ, 07/2026 [secondaire]](https://www.horizoniq.com/blog/proxmox-subscription/)
- ESXi imbriqué sur Proxmox (sources communautaires, pas de doc officielle) :
  - Recette : CPU « host », carte réseau vmxnet3, mode promiscuous sur le bridge, au moins 16 Go sur l'hôte et 8 Go pour la VM ESXi — [virtualizationhowto [ancien : 2023]](https://www.virtualizationhowto.com/2023/12/nested-esxi-install-in-proxmox-step-by-step) ; [Forum Proxmox](https://forum.proxmox.com/threads/nested-esxi-virtualisation.121235/)
  - Régression après PVE 8, corrigée en 8.1 selon le forum — [Forum Proxmox, PVE 8](https://forum.proxmox.com/threads/proxmox-8-breaks-nested-virtualization.130509/)
  - Écran violet (PSOD) signalé avec ESXi 8.0.3 « free » sur PVE 8.4.1 — [Forum Proxmox, PSOD](https://forum.proxmox.com/goto/post?id=778476)
- Lab-as-code : fournisseur Terraform bpg/proxmox v0.122.0 (12/11/2026, index Go) — [GitHub bpg/terraform-provider-proxmox](https://github.com/bpg/terraform-provider-proxmox) ; [proxy.golang.org](https://proxy.golang.org/github.com/bpg/terraform-provider-proxmox/@latest)

#### VMware Workstation Pro / Fusion Pro et droits ESXi
- Gratuit pour un usage personnel depuis mai 2024 (17.5.2) ; l'usage commercial restait alors payant — [BetaNews, 15/05/2024](https://betanews.com/2024/05/15/vmware-fusion-workstation-now-free)
- Gratuit pour les usages commercial, éducatif et personnel depuis novembre 2024, sans clé de licence [secondaire] — [GadgetBond](https://gadgetbond.com/vmware-fusion-workstation-pro-free-personal-commercial-use/)
- Versions :
  - 25H2 (2025) — [MalwareTips 25H2](https://malwaretips.com/threads/vmware-workstation-pro-25h2-vmware-workstation-pro-is-now-free.137937/)
  - 26H1 publiée le 14/05/2026 (build 25388281) [secondaire] — [Softprom](https://softprom.com/a-new-era-of-virtualization-broadcom-releases-vmware-workstation-pro-26h1-and-makes-the-product-free-for-everyone) ; [MalwareTips 26H1](https://malwaretips.com/threads/vmware-workstation-pro-26h1.141362/)
  - 26H1u1 vers le 03/09/2026 (correctifs de sécurité) [secondaire].
- Le téléchargement passe par le portail Broadcom ; la nécessité d'un compte est contestée selon les sources — [dev.to](https://dev.to/andreasdev/how-to-download-vmware-workstation-pro-26h1-free-in-2026-no-broadcom-account-needed-52fh)
- ESXi imbriqué sous Workstation peut exiger de désactiver la sécurité basée sur la virtualisation (VBS) de Windows (William Lam, déc. 2024) — [williamlam.com, tag workstation](https://williamlam.com/tag/workstation)
- ESXi 9.0 n'est disponible que dans un abonnement VCF/VVF. L'appliance « Nested ESXi 9.x » exige ce droit (août 2025) — [William Lam, 08/2025](https://williamlam.com/2025/08/updated-nested-esxi-8-x-9-0-virtual-appliance.html)
- ESXi 8.0U3e est gratuit depuis le 10/04/2025, avec licence intégrée, sans support officiel, téléchargeable avec un compte Broadcom — [Broadcom KB 399823](https://knowledge.broadcom.com/external/article/399823) ; [The Register](https://www.theregister.com/2025/04/14/vmware_free_esxi_returns/)
- VCF 9.1 (mai 2026) : William Lam publie des contournements pour les labs (forçage de la chaîne d'identification CPU, TRIM/UNMAP pour vSAN imbriqué) — [William Lam, 05/2026](https://williamlam.com/2026/05/vcf-9-1-comprehensive-esx-configuration-workarounds-for-lab-deployments.html)

#### VirtualBox
- 7.2 sortie le 14/08/2025 — [OMG! Ubuntu](https://www.omgubuntu.co.uk/2025/08/virtualbox-7-2-0-brings-more-ui-changes-windows-on-arm-support) ; [Oracle, notes 7.2](https://docs.oracle.com/en/virtualization/virtualbox/7.2/relnotes/EN-VBOX-7-2-RELNOTES.pdf) ; [LHC@home](https://lhcathome.cern.ch/lhcathome/forum_thread.php?id=6371) :
  - Virtualisation ARM sur ARM pour Apple Silicon ; avant, seule l'émulation x86 était proposée.
  - Hôtes Windows on Arm en expérimental.
  - Correctif de virtualisation imbriquée pour les CPU Intel uniquement.
  - Les VM ARM ne tournent pas sur un hôte x86.
- Mises à jour de maintenance :
  - 7.2.8 en avril 2026 — [UbuntuHandbook](https://ubuntuhandbook.org/index.php/2026/04/virtualbox-7-2-8-released-with-initial-7-0-kernel-support/)
  - 7.2.16 en août 2026 — [UbuntuHandbook](https://ubuntuhandbook.org/index.php/2026/08/virtualbox-7-2-16-released-with-intel-fred-support/)
  - Une 7.2.22 est annoncée au 20/10/2026 [secondaire, numérotation incohérente avec la cadence connue] — [warp2search](https://www.warp2search.net/story/virtualbox-7222-releases-with-security-fixes/)

#### Hyper-V (Windows)
- Disponible sur Windows 11 Pro/Enterprise 64 bits ; SLAT requis — [Microsoft Learn, prérequis Hyper-V](https://learn.microsoft.com/en-us/virtualization/hyper-v-on-windows/reference/hyper-v-requirements)
- Virtualisation imbriquée — [Microsoft Learn, nested virtualization](https://learn.microsoft.com/en-us/windows-server/virtualization/hyper-v/enable-nested-virtualization) ; [Thomas Maurer, 2021](https://www.thomasmaurer.ch/2021/09/hyper-v-nested-virtualization-for-amd-processors/) :
  - Intel : VT-x + EPT, hôte Windows 10+ ou Server 2016+, configuration de VM 8.0+.
  - AMD : EPYC/Ryzen, hôte Windows 11 ou Server 2022+, configuration de VM 9.3+.
- ESXi dans Hyper-V : la seule voie documentée est une VM de génération 1 avec carte réseau « Legacy » et pilotes « net-tulip » injectés. Elle ne fonctionne qu'avec ESXi ≤ 6.0 (build 5572656). Microsoft ne supporte pas d'hyperviseurs tiers dans des VM Hyper-V [ancien] — [NAKIVO](https://www.nakivo.com/blog/install-esxi-hyper-v) ; [TurboGeek](https://www.turbogeek.co.uk/nested-vmware-esxi-host-in-hyper-v)
- Coexistence : une réponse de Microsoft Q&A indique qu'il faut désactiver Hyper-V pour utiliser la virtualisation imbriquée sous VirtualBox ou Workstation — [Microsoft Q&A](https://learn.microsoft.com/en-us/answers/a/1962013)

#### Incus (fork communautaire de LXD : conteneurs et VM)
- Incus 7.0 LTS, annoncé le 05/05/2026 et supporté jusqu'en juin 2031 — [Linuxiac](https://linuxiac.com/incus-7-0-lts-container-and-virtual-machine-manager-released/) ; [Annonce Incus 7.0 LTS](https://discuss.linuxcontainers.org/t/incus-7-0-lts-has-been-released/26641) :
  - Conteneurs applicatifs créés depuis des images OCI (Docker), en plus des conteneurs système et des VM QEMU.
  - Pilote de stockage TrueNAS et support LINSTOR.
  - Prérequis minimaux : noyau 6.12, QEMU 8.2.
- Dernière version : 7.6.0 du 30/10/2026 (index Go) — [GitHub lxc/incus](https://github.com/lxc/incus) ; [proxy.golang.org](https://proxy.golang.org/github.com/lxc/incus/v7/@latest)

#### Apple Silicon comme hôte
- La virtualisation imbriquée est disponible sur Mac M3 et ultérieurs ; les API imbriquées de Hypervisor.framework existent depuis macOS 15. UTM 4.6 l'active par défaut pour les VM Linux (backend Apple Virtualization) — [Forum Parallels](https://forum.parallels.com/posts/936647/) ; [MacRumors](https://forums.macrumors.com/threads/nested-virtualization.2443059)
- Parallels n'est pas supporté selon les forums ; pour VMware Fusion, aucune déclaration de support — [Broadcom community](https://community.broadcom.com/vmware-cloud-foundation/question/nested-virtualization-with-vmware-fusion-in-sequoia)

#### Vagrant / Terraform
- Vagrant : dernière version stable 2.4.9, avec des dates contradictoires selon un agrégateur (2025-08-21 vs 2023). Seules des nightlies 2.4.10.dev existent en 2026 — [Versio.io](https://www.versio.io/it/product-release-end-of-life-eol-hashicorp-vagrant.html) ; [releases.sh](https://releases.sh/hashicorp/vagrant)
- Licence : passage de MIT à Business Source License 1.1 en août 2023 ; la 2.4.0 est la première version sous BSL — [HashiCorp](https://hashicorp.com/blog/hashicorp-adopts-business-source-license) ; [Debian bug](https://mail-archive.com/debian-bugs-rc@lists.debian.org/msg705346.html)
- IBM a racheté HashiCorp pour 6,4 Md$ [secondaire] — [Redress Compliance, 04/2026](https://redresscompliance.com/ibm-hashicorp-acquisition.html)
- Fournisseur Terraform libvirt : v0.8.3 du 04/03/2025 (index Go) — [GitHub terraform-provider-libvirt](https://github.com/dmacvicar/terraform-provider-libvirt)

#### Ludus (cyber range sur Proxmox, Bad Sector Labs)
- Ludus 2.0.0 est sorti le 08/03/2026 ; la dernière version est 2.3.10 (23/10/2026) — [GitLab Ludus releases](https://gitlab.com/badsectorlabs/ludus/-/releases)
  - 2.1.0 (15/04/2026) : historique des logs de déploiement, quotas par utilisateur (« enterprise »), documentation du serveur MCP.
  - 2.2.0 (16/06/2026) : « Sources » pour partager blueprints, templates et rôles.
  - 2.3.0 (15/07/2026) : clé `ludus_extensions` pour stocker du YAML arbitraire dans la configuration de range.
- Licence AGPL-3.0. Miroir GitHub : 230 étoiles ; GitLab : 145 étoiles, 181 forks, activité au 12/11/2026 — [GitHub ludus (miroir)](https://github.com/badsectorlabs/ludus)
  - Construit des ranges sur Proxmox avec Packer et Ansible, jusqu'à 254 réseaux /24, via CLI et API.
  - Le README part d'un « clean Debian 12 host », ce qui est peut-être obsolète pour la v2.
- Exigences : au moins 32 Go de RAM par utilisateur/range et un CPU au score Passmark > 6 000. Hébergement cloud possible sur Azure Dv3/Ev3 et AWS *.metal (extrait moteur) — [Ludus docs](https://docs.ludus.cloud/docs/intro/)
- Un niveau « Enterprise » payant existe (quotas, fichier de licence hors ligne) — [GitLab Ludus releases](https://gitlab.com/badsectorlabs/ludus/-/releases)

#### GOAD (Game of Active Directory, Orange Cyberdefense)
- 8,6k étoiles, GPL-3.0, « GOAD (v3) » — [GitHub GOAD](https://github.com/Orange-Cyberdefense/GOAD)
  - Labs : GOAD (5 VM, 2 forêts, 3 domaines), GOAD-Light (3 VM), MINILAB (2), SCCM (4), NHA (5), DRACARYS (3).
  - Windows en évaluation de 180 jours ; ensuite, licence ou reconstruction du lab.
- RAM : au moins 24 Go pour GOAD, 20 Go pour GOAD-Light — [GOAD docs Linux](https://orange-cyberdefense.github.io/GOAD/installation/linux)
- Fournisseurs :
  - VirtualBox — [GOAD provider VirtualBox](https://orange-cyberdefense.github.io/GOAD/providers/virtualbox)
  - Azure et AWS via Terraform ; Proxmox (« complex ») — [GOAD installation](https://orange-cyberdefense.github.io/GOAD/installation)
  - Ludus — [Elastic Security Labs](https://www.elastic.co/security-labs/automating-goad-and-live-malware-labs)
  - Guide pour hôte Windows — [GOAD Windows](https://orange-cyberdefense.github.io/GOAD/installation/windows)

#### AutomatedLab (PowerShell, Hyper-V / Azure)
- 2,2k étoiles, licence MIT — [GitHub AutomatedLab](https://github.com/AutomatedLab/AutomatedLab)
  - Plateformes : Hyper-V et Azure ; KVM « planned ».
  - Invités : Windows client et serveur de 7/2008 R2 à 2022 ; Linux (RHEL/CentOS/Fedora, Ubuntu Server, SUSE).
  - Rôles et produits : AD, PKI, IIS, SQL 2012–2022, Exchange 2013–2019, System Center, etc.
  - Hôte : Windows Server 2012 R2+ ou Windows 8.1+.
- Version 5.61.x (winget). Une pré-version 5.61.3 est « Generated on: 7/2/2026 » — [PowerShell Gallery](https://www.powershellgallery.com/packages/AutomatedLabCore/5.61.3-preview/Content/AutomatedLabCore.psd1) ; [wingetly](https://wingetly.io/apps/automated-lab/automated-lab)

#### DetectionLab
- « As of 2023-01-01, DetectionLab is no longer being actively maintained » — [GitHub DetectionLab](https://github.com/clong/DetectionLab)
  - 5,1k étoiles, licence MIT.
  - Fournisseurs : VirtualBox, VMware, Hyper-V, libvirt, Proxmox, ESXi, AWS, Azure.

#### Labtainers (Naval Postgraduate School)
- Plus de 50 exercices de cybersécurité gratuits, basés sur Docker — [NPS Labtainers](https://nps.edu/web/c3o/labtainers)
- Commits jusqu'en janvier 2026 — [GitHub Labtainers](https://github.com/mfthomps/Labtainers)

#### Cyber ranges open source
- KYPO CRP (Université Masaryk) — [KYPO CRP](https://crp.kypo.muni.cz/) ; [CONCORDIA](https://www.concordia-h2020.eu/news/concordia-releases-an-open-source-cyber-range-platform/) ; [KYPO, support Windows](https://crp.kypo.muni.cz/news/new-release-of-kypo-crp-brings-support-for-windows-machines) :
  - Open source sous licence MIT depuis 2020.
  - Développement actif terminé ; le successeur s'appelle CyberRangeCZ.
  - Requiert OpenStack.
  - Machines Windows supportées depuis la 21.04.

### Inferences
- Pour un PC unique, deux familles s'opposent. D'un côté, Proxmox VE est l'hôte le plus capable, mais il occupe toute la machine. De l'autre, les hyperviseurs de bureau (Workstation, VirtualBox, Hyper-V) cohabitent avec Windows, mais avec des conflits de virtualisation imbriquée (Hyper-V/VBS).
- Le lab le plus « complet » qu'un étudiant peut monter aujourd'hui sur une seule machine Windows est sans doute Workstation Pro (gratuit), avec EVE-NG ou GNS3 VM et des VM ESXi 8.0U3e et TrueNAS. Cela suppose de désactiver VBS, et l'ensemble est géré dans 2 à 3 interfaces différentes.
- Côté cybersécurité, Ludus 2.x est la solution la plus « produit » : YAML, API, CLI, blueprints, MCP. Il impose cependant un serveur Proxmox dédié et 32 Go par range. GOAD fournit le contenu (labs AD) au-dessus de plusieurs fournisseurs.
- DetectionLab (abandonné en 2023) et KYPO (développement arrêté) montrent que les labs open source meurent souvent faute de mainteneurs. C'est un risque pour un projet étudiant.
- La licence BSL de Vagrant et le rachat par IBM peuvent peser sur un projet open source qui l'embarquerait. Le volet licences est traité par un autre axe.

### Gaps
- Notes de version officielles de Workstation 26H1 non lues : le support d'ESXi 9 imbriqué et la coexistence VBS en 26H1 ne sont pas vérifiés.
- Licence de l'Extension Pack VirtualBox (PUEL) non étudiée ici (axe licences).
- Proxmox sur ARM et sur Apple Silicon non étudié.
- Support de Windows Server 2025 par AutomatedLab non confirmé (la page liste jusqu'à 2022).
- Splunk Attack Range, SecGen et CyberRangeCZ (le successeur) non étudiés en détail.
- Aucune preuve qu'ESXi 7, 8 ou 9 fonctionne dans Hyper-V.

## 3. WiFi dans les labs : mininet-wifi, mac80211_hwsim, hostapd en VM, support dans EVE-NG/GNS3 ; que font réellement les utilisateurs ?

### Takeaway
Aucune plateforme majeure (EVE-NG, CML, GNS3, containerlab, Proxmox) n'émule nativement une radio WiFi, et QEMU n'offre pas de carte WiFi émulée. La seule brique logicielle est le module noyau Linux mac80211_hwsim, associé à hostapd et wpa_supplicant, avec des surcouches : Mininet-WiFi (namespaces), vwifi (relais entre VM QEMU/GNS3) et WiFiChallenge Lab (VM de pentest). Ces solutions sont limitées à des invités Linux. En pratique, les utilisateurs combinent un contrôleur virtuel (9800-CL) avec des AP physiques, utilisent des labs mac80211_hwsim prêts à l'emploi, ou Packet Tracer (simulation).

### Cited Findings
- mac80211_hwsim simule un nombre arbitraire de radios 802.11 et copie les trames vers les radios sur le même canal. Exemple documenté : un AP (hostapd) et une station — [Doc noyau mac80211_hwsim](https://docs.kernel.org/5.10/networking/mac80211_hwsim/mac80211_hwsim.html)
- vwifi (LGPL-3.0, 105 étoiles) relie les radios hwsim de VM différentes, qui par défaut ne se voient pas — [GitHub vwifi](https://github.com/Raizo62/vwifi) :
  - Architecture : `vwifi-server` sur l'hôte, `vwifi-client` dans chaque VM, transport VHOST (vsock) ou TCP.
  - Testé avec hostapd/wpa_supplicant (Open, WEP, WPA2, WPA-EAP), Aircrack-NG et OpenWrt.
  - Perte de paquets simulée selon la distance ; mobilité des nœuds GNS3.
  - GNS3 ≥ 2.2 via `-device vhost-vsock-pci`.
  - Le README cite aussi VirtualBox, VMware et Hyper-V, mais ne documente que QEMU et GNS3.
  - Invités Linux uniquement ; Windows est listé comme non terminé.
- GSoC 2025 (LibreMesh) : ajout du WiFi aux simulations QEMU grâce à vwifi — [Freifunk blog, 09/2025](https://blog.freifunk.net/2025/09/01/gsoc-2025-bringing-wi-fi-support-to-qemu-simulations-for-libremesh/)
- Indices que QEMU et les OS réseau n'ont pas de WiFi virtuel natif : projet Hackweek openSUSE « virtual wifi adapter in qemu » ; demande de fonctionnalité MikroTik pour mac80211_hwsim — [openSUSE Hackweek](https://hackweek.opensuse.org/24/projects/virtual-wifi-adapter-in-qemu) ; [Forum MikroTik](https://forum.mikrotik.com/t/feature-request-add-mac80211-hwsim-support/176038)
- Mininet-WiFi (543 étoiles) est un fork de Mininet qui ajoute stations et AP — [GitHub mininet-wifi](https://github.com/intrig-unicamp/mininet-wifi) :
  - Outils iw, iwconfig, wpa_supplicant ; wmediumd en option.
  - Ubuntu 16.04+ recommandé ; Docker en mode privilégié avec montage de /sys et /lib/modules.
  - Image OVA Lubuntu 20.04 de 4,6 Go.
  - Aucune intégration documentée avec des VM externes.
- WiFiChallenge Lab v2.0 (Docker) : « virtualized WiFi pentesting laboratory without physical WiFi cards ». VM Ubuntu avec réseaux OPN/WPA2/WPA3/Enterprise, GPL-3.0. La version originale est dépréciée — [GitHub WiFiChallengeLab-docker](https://github.com/r4ulcl/WiFiChallengeLab-docker) ; [Dépôt original](https://github.com/r4ulcl/WiFiChallengeLab)
- CyberCX Virtual Wireless Lab : mac80211_hwsim avec conteneurs Docker — [GitHub CyberCX](https://github.com/CyberCX-STA/Virtual-Wireless-Lab)
- Mai 2026 : des chercheurs ont publié en open source un « Wi-Fi cyber range » (hostapd pour les AP, wpa_supplicant pour les clients, dnsmasq pour le DHCP, FreeRADIUS pour le 802.1X/EAP) — [Help Net Security, 13/05/2026](https://www.helpnetsecurity.com/2026/05/13/wi-fi-cyber-range-security/)
- CML : pas d'images d'AP ni de clients sans fil ; un 9800-CL peut gérer des AP physiques pontés — [CML Catalyst 9800-CL](https://developer.cisco.com/docs/modeling-labs/catalyst-9800-cl/)
- EVE-NG : 9800-CL possible, AP physiques uniquement — [Forum EVE-NG](https://eve-ng.net/forum/viewtopic.php?p=40760)
- Associer un AP physique à un 9800-CL de lab pose des problèmes fréquents. Un contournement « lab only » consiste à désactiver la validation du hash SSC — [Cisco Suisse blog](https://gblogs.cisco.com/ch-tech/setup-your-lab-with-catalyst-9800-cl/) ; [Cisco Community](https://community.cisco.com/t5/wireless/can-t-join-2702i-to-c9800-cl-wlc/m-p/4290215)
- Packet Tracer 9.0 simule des WLC 2504 (CAPWAP, plusieurs SSID mappés sur des VLAN) et 3504, ainsi que des routeurs domestiques [secondaire non officiel] — [packettracernetwork.com](https://www.packettracernetwork.com/features/wireless-lan-devices.html)

### Inferences
- Pour une application « tout-en-un », la voie réaliste est la suivante : une VM ou un conteneur Linux « radio » avec mac80211_hwsim, puis vwifi pour relier des invités Linux (OpenWrt, hostapd, clients Linux, Kali). Des clients WiFi Windows, macOS ou mobiles sont impossibles en pur logiciel faute d'équivalent hwsim.
- Les contrôleurs virtuels des constructeurs (9800-CL) servent à apprendre la configuration, pas la radio. Un « vrai » WiFi exige du matériel : AP physiques, ou adaptateur USB passé à la VM (pratique non sourcée ici).
- Le seul domaine où un produit couvre le WiFi « clé en main » est le pentest WiFi (WiFiChallenge Lab, le cyber range de mai 2026). Il n'existe pas d'équivalent pour le WiFi d'entreprise multi-constructeurs.

### Gaps
- Pratiques réelles des communautés (r/homelab, r/ccna) sur le passthrough USB de cartes WiFi : non collectées.
- Aucune prise en charge WiFi trouvée dans containerlab, CML ou Proxmox.
- Contrôleurs virtuels d'autres constructeurs (Aruba, Fortinet, etc.) non étudiés.
- Cloonix (cité dans un résultat comme utilisant hwsim) non vérifié.

## 4. Stockage dans les labs : SAN (iSCSI, émulation Fibre Channel) et NAS ; quelles plateformes facilitent cela ?

### Takeaway
iSCSI, NFS/SMB et NVMe/TCP s'émulent facilement en logiciel (TrueNAS Community Edition, cibles Linux) et sont le standard des labs vSphere ou Proxmox imbriqués. Le Fibre Channel n'a pas d'équivalent purement logiciel et gratuit : il faut des HBA QLogic réels en mode cible ou du matériel d'occasion. Aucune plateforme de lab ne fournit le stockage « clé en main » : on ajoute une VM TrueNAS ou ONTAP Simulator comme n'importe quel nœud.

### Cited Findings
- TrueNAS 25.10 « Goldeye » (octobre 2025) [éditeur] — [TrueNAS blog Goldeye](https://www.truenas.com/blog/truenas-goldeye-25-10) ; [AlternativeTo, 08/2025](https://alternativeto.net/news/2025/8/truenas-25-10-unifies-core-and-scale-adds-terabit-ethernet-and-web-based-installer) ; [Linuxiac](https://linuxiac.com/truenas-25-10-open-source-nas-released-with-nvme-of-zfs-enhancements/) ; [TrueNAS 25.10.1](https://www.truenas.com/blog/truenas-25-10-1) ; [Release notes 25.10](https://www.truenas.com/docs/scale/25.10/gettingstarted/scalereleasenotes/) :
  - Unifie CORE et SCALE.
  - La Community Edition propose NVMe/TCP ; NVMe/RDMA et la haute disponibilité sont réservés à l'édition Enterprise.
  - iSCSI et Fibre Channel sont conservés.
  - Selon une note de version, NVMe-oF n'est pas compatible avec les initiateurs VMware.
  - La 25.10.1 est désignée comme version « stable ».
- Recette type d'un lab vSphere imbriqué : Workstation, vCenter 9.0 en appliance et TrueNAS en VM pour l'iSCSI partagé. Attention à l'horloge d'essai ESXi de 60 jours [éditeur : NAKIVO vend de la sauvegarde] — [NAKIVO, lab VMware](https://nakivo.com/blog/building-vmware-home-lab-complete) ; [NAKIVO, cible iSCSI TrueNAS](https://www.nakivo.com/blog/how-to-install-truenas-iscsi-target/) ; [ServeTheHome, TrueNAS + ESXi [ancien]](https://www.servethehome.com/building-a-lab-part-1-planning-with-truenas-and-vmware-esxi/)
- Un guide homelab recommande un réseau de stockage dédié (VLAN ou switch séparé) pour l'iSCSI, même en 1 GbE — [homelab-guide](https://homelab-guide.pages.dev/homelab-iscsi-storage-network)
- vSAN imbriqué : contournements TRIM/UNMAP pour les labs VCF 9.1 (mai 2026) — [William Lam, 05/2026](https://williamlam.com/2026/05/vcf-9-1-comprehensive-esx-configuration-workarounds-for-lab-deployments.html)
- Incus 7.0 LTS ajoute un pilote de stockage TrueNAS — [Linuxiac](https://linuxiac.com/incus-7-0-lts-container-and-virtual-machine-manager-released/)
- NetApp ONTAP Simulator — [NetApp KB](https://kb.netapp.com/on-prem/ontap/Ontap_OS/OS-KBs/Where_can_the_NetApp_ONTAP_9_Simulator_be_downloaded) ; [Matrixpost](https://blog.matrixpost.net/step-by-step-guide-part-1-how-to-build-your-own-netapp-ontap-9-lab/) :
  - Appliance gratuite, mais téléchargement réservé (identifiant client ou partenaire, numéro de série). Format OVA pour vSphere.
  - Selon un guide tiers, FCP et iSCSI sont « simulated but not functional » (à vérifier), avec 2 nœuds maximum.
  - Un guide de 2025 utilise ONTAP 9.16.1.
- Fibre Channel :
  - Aucun commutateur FC virtuel gratuit n'a été trouvé — [InfoSec Institute forum](https://community.infosecinstitute.com/discussion/comment/490824)
  - Le « Virtual Fibre Channel » de Hyper-V exige des HBA physiques et un SAN compatible NPIV — [Microsoft Learn, Virtual FC](https://learn.microsoft.com/en-us/windows-server/virtualization/hyper-v/plan/virtual-fibre-channel-for-hyper-v)
  - Les homelabbers achètent du FC d'occasion (cartes à environ 5 $) — [Hackaday](https://hackaday.io/page/4369)
  - NexentaStor CE (COMSTAR) a servi de cible FC — [vcdx181](https://vcdx181.com/stage-vi-i-want-fibrechannel-at-home/)
  - Un commentateur n'a « never heard of a free fibre channel implementation for a home lab » — [VMware Community](https://communities.vmware.com/t5/VMware-vSphere-Discussions/Homelab-FC-storage/m-p/2304569)
- Linux LIO/targetcli : une cible FC n'est possible qu'avec des HBA QLogic (pilote qla2xxx en mode cible, `qlini_mode=disabled`) — [targetcli man](https://www.mankier.com/8/targetcli) ; [linux-iscsi.org, Fibre Channel](https://linux-iscsi.org/?p=405)

### Inferences
- Pour l'application : le SAN se fera en iSCSI ou NVMe/TCP (TrueNAS CE, targetcli), le NAS avec TrueNAS (NFS/SMB). Le Fibre Channel ne peut être qu'une simulation pédagogique (concepts de zoning et de WWN dans une interface), pas une émulation réelle.
- L'ONTAP Simulator, dont l'accès est réservé, ne peut probablement pas être redistribué ni téléchargé automatiquement par un outil tiers. TrueNAS CE est le candidat naturel pour un NAS/SAN « intégré ».
- Les combinaisons Proxmox + TrueNAS et Workstation + ESXi imbriqué + TrueNAS sont les recettes les plus documentées. Aucun émulateur réseau n'a de modèle TrueNAS officiel (non trouvé).

### Gaps
- OpenMediaVault, StarWind VSAN et le rôle « iSCSI Target Server » de Windows Server en lab : non vérifiés dans cette recherche.
- Existence de modèles TrueNAS prêts à l'emploi dans EVE-NG, GNS3 ou CML : non vérifiée.
- Aucune source trouvée sur une émulation de HBA Fibre Channel dans QEMU : c'est une absence de preuve, pas une preuve d'absence.

## 5. Quel outil s'approche le plus du « tout faire » depuis une seule interface, et que manque-t-il (débutants, UI unifiée, hôte Windows, Apple Silicon, ressources, prix) ?

### Takeaway
Aucun outil existant ne « fait tout » depuis une interface unique sur un PC. Côté topologies, EVE-NG Pro (et GNS3 en open source) s'en approche le plus : VM QEMU (Windows Server, OS réseau, pare-feu, ESXi imbriqué, VM de stockage) et Docker dans une même interface. Mais ces outils sont x86 uniquement, sans WiFi, et EVE-NG est payant au-delà de 7 nœuds depuis juin 2026. Côté infrastructure, Proxmox VE (avec Ludus et GOAD) s'en approche aussi, mais c'est un OS serveur sans éditeur de topologie pour débutants. Lacunes persistantes : UX unifiée pour débutants, hôte Windows natif, Apple Silicon, WiFi, Fibre Channel, ressources (20 à 32 Go par lab AD) et licences des images.

### Cited Findings
- Largeur d'exécution dans une seule interface :
  - EVE-NG : QEMU (Windows Server 2008 R2–2022, ESXi via how-to) et Docker (sysbox depuis la 6.4) — [HowTo Windows Server](https://www.eve-ng.net/index.php/documentation/howtos/howto-create-own-windows-server-on-the-eve/) ; [HowTo ESXi](https://www.eve-ng.net/index.php/documentation/howtos/howto-add-vm-ware-esxi/) ; [Release notes](https://www.eve-ng.net/index.php/documentation/release-notes/)
  - GNS3 : QEMU, Docker, Dynamips, IOU, VirtualBox, VMware — [GNS3 docs](https://docs.gns3.com/docs/emulators/which-emulators-should-i-use)
  - CML : VM et conteneurs depuis la 2.9 — [CML 2.9 Release Notes](https://developer.cisco.com/docs/modeling-labs/2-9/cml-release-notes/)
  - Proxmox : VM, LXC et OCI — [communiqué 9.1](https://www.proxmox.com/en/about/company-details/press-releases/proxmox-virtual-environment-9-1)
  - Incus : VM, conteneurs système et OCI — [Linuxiac](https://linuxiac.com/incus-7-0-lts-container-and-virtual-machine-manager-released/)
- Prix et paliers gratuits :
  - EVE-NG Freemium 7 nœuds, Pro 150 € — [CloudMyLab [concurrent]](https://blog.cloudmylab.com/eve-ngs-free-tier-is-now-7-nodes) ; [Features compare](https://www.eve-ng.net/index.php/features-compare/)
  - CML-Free 5 nœuds, Personal 199 $, Personal Plus 349 $ — [CML-Free](https://developer.cisco.com/docs/modeling-labs/cml-free/) ; [Cisco CML](https://www.cisco.com/c/en/us/products/cloud-systems-management/modeling-labs/index.html)
  - Proxmox gratuit (AGPLv3) — [Proxmox pricing](https://www.proxmox.com/en/proxmox-ve/pricing)
  - Workstation Pro gratuit — [GadgetBond](https://gadgetbond.com/vmware-fusion-workstation-pro-free-personal-commercial-use/)
- Hôtes :
  - EVE-NG : M1/M2/M3 non supportés, Hyper-V non supporté — [System Requirement](https://www.eve-ng.net/index.php/documentation/installation/system-requirement/)
  - containerlab : WSL2, et macOS avec VM réservées aux M3+ sous macOS 15 — [containerlab Windows](https://containerlab.dev/windows/) ; [containerlab macOS](https://containerlab.dev/macos/)
  - GNS3 : GNS3 VM sur Hyper-V, VirtualBox ou Workstation — [GNS3 VM](https://docs.gns3.com/docs/getting-started/installation/download-gns3-vm)
  - Workstation avec ESXi imbriqué peut exiger de désactiver VBS — [William Lam](https://williamlam.com/tag/workstation)
- Ressources :
  - Image Windows Server 2022 dans EVE-NG : 4 vCPU / 8 Go — [HowTo Windows Server](https://www.eve-ng.net/index.php/documentation/howtos/howto-create-own-windows-server-on-the-eve/)
  - GOAD : 24 Go — [GOAD docs](https://orange-cyberdefense.github.io/GOAD/installation/linux)
  - Ludus : 32 Go par range — [Ludus docs](https://docs.ludus.cloud/docs/intro/)
  - ESXi imbriqué : 8 Go par VM ESXi, 16 Go minimum sur l'hôte [secondaire] — [virtualizationhowto](https://www.virtualizationhowto.com/2023/12/nested-esxi-install-in-proxmox-step-by-step)
- Licences des contenus :
  - Windows en évaluation de 180 jours dans GOAD — [GitHub GOAD](https://github.com/Orange-Cyberdefense/GOAD)
  - ESXi 9 réservé à VCF/VVF — [William Lam](https://williamlam.com/2025/08/updated-nested-esxi-8-x-9-0-virtual-appliance.html)
  - ONTAP Simulator à accès réservé — [NetApp KB](https://kb.netapp.com/on-prem/ontap/Ontap_OS/OS-KBs/Where_can_the_NetApp_ONTAP_9_Simulator_be_downloaded)
- Injection de « pannes » native, limitée aux dégradations de liens :
  - CML link conditioning — [CML](https://developer.cisco.com/docs/modeling-labs/link-conditioning/)
  - containerlab netem — [containerlab](https://containerlab.dev/cmd/tools/netem/set)
  - netlab tc — [netlab](https://netlab.tools/netlab/tc/)
  - add-on NETem pour EVE-NG — [networkacademy.io](https://www.networkacademy.io/ccie-enterprise/sdwan/packet-loss-latency-and-jitter-on-eve-ng)
- Les acteurs installés ajoutent IA et MCP en 2026 :
  - GNS3 3.1.0a4 (AI Copilot + MCP, juillet 2026) — [GitHub GNS3](https://github.com/GNS3/gns3-gui/releases/tag/v3.1.0a4)
  - CML 2.10 (serveur MCP) — [CML 2.10](https://developer.cisco.com/docs/modeling-labs/2-10/)
  - Ludus 2.1 (documentation MCP, avril 2026) — [GitLab Ludus](https://gitlab.com/badsectorlabs/ludus/-/releases)
  - Serveur MCP communautaire pour CML (`cml-mcp`, CML 2.9+) — [PyPI cml-mcp](https://pypi.org/project/cml-mcp/0.27.0/)

### Inferences

#### Tableau A — ce que chaque outil peut exécuter (synthèse des sections 1 à 4)
Légende : Oui = documenté ; Partiel = possible avec limites ou bricolage ; « (inf.) » = déduit, non documenté ; ? = non vérifié.

| Outil (version, date) | Conteneurs | VM complètes QEMU/KVM | Hyperviseur imbriqué (ESXi / Proxmox / Hyper-V) | Windows Server | OS réseau / pare-feu | Stockage (TrueNAS, iSCSI) | WiFi |
|---|---|---|---|---|---|---|---|
| EVE-NG Pro / LC (7.4.0-2, 01/11/2026) | Oui (Docker, sysbox) | Oui | ESXi : Oui (how-to basé sur 6.5d) ; autres : ? | Oui (2008 R2–2022) | Oui (cœur de cible) | Partiel : VM QEMU (inf.) | Non (WLC virtuel + AP physiques) |
| EVE-NG Freemium (v7, juin 2026) | ? | Oui (7 nœuds max) | idem Pro, dans la limite de 7 nœuds | Oui (inf.) | Oui | Partiel (inf.) | Non |
| PNETLab (5.3.11 ; v6 bêta communautaire) | ? | Oui (fork EVE-NG) | Partiel (inf.) | Partiel (inf.) | Oui | Partiel (inf.) | Non |
| GNS3 (3.0.6, 28/01/2026 ; 3.1 alpha) | Oui (Docker) | Oui (QEMU + VM VirtualBox/VMware) | Partiel (inf. via QEMU/KVM ou VM VMware) | Oui (image fournie par l'utilisateur, inf.) | Oui | Partiel : VM (inf.) | Partiel (vwifi, invités Linux) |
| CML (2.10, 2026) | Oui (depuis 2.9) | Oui | ? | ? (images personnalisées) | Oui (centré Cisco) | ? | Non (9800-CL + AP physiques) |
| Containerlab (0.83.0, 06/11/2026) | Oui (cœur) | Partiel (OS réseau + `generic_vm` Linux via vrnetlab) | Non documenté | Non documenté | Oui (large catalogue) | Partiel : conteneur Linux (inf.) | Non trouvé |
| netlab (26.10, 03/10/2026) | via containerlab | via libvirt/Vagrant | Non | Non | Oui | Non | Non |
| Kathará (3.8.4, 06/11/2026) | Oui | Non | Non | Non | FRR / Quagga / P4 / OVS | Non | Non |
| Mininet (2.3.1b4) / Mininet-WiFi | namespaces | Non | Non | Non | OVS / OpenFlow | Non | Mininet-WiFi (hwsim) |
| Packet Tracer (9.0, ~10/2025) | simulation | Non | Non | Non (serveurs simulés) | Cisco simulé | Non | Oui (simulé) |
| Proxmox VE (9.2, 21/05/2026) | LXC + OCI (tech preview) | Oui | ESXi : Partiel (recette communautaire) | Oui | Oui (VM) | Oui (VM TrueNAS ; ZFS/Ceph natifs) | Non |
| VMware Workstation Pro (26H1, 05/2026) | Non (inf.) | Oui | ESXi : Oui (référence William Lam ; VBS à désactiver) | Oui | Oui (VM) | Oui (VM) | Non |
| VirtualBox (7.2.x, 2025–2026) | Non | Oui | Partiel (Intel/AMD ; ESXi non vérifié) | Oui | Oui (VM) | Oui (VM) | Non |
| Hyper-V (Windows 11 Pro) | Non | Oui | Hyper-V imbriqué : Oui ; ESXi moderne : Non | Oui | Oui (VM) | Oui (VM) | Non |
| Incus (7.6.0, 30/10/2026) | Oui (système + OCI) | Oui | ? | ? | Partiel (inf.) | Pilote TrueNAS (stockage hôte) | Non |
| Ludus (2.3.10, 23/10/2026) | Non | Oui (sur Proxmox) | ? | Oui (AD) | ? | ? | Non |
| GOAD (v3) | Non | Oui (via fournisseur) | Non | Oui (AD, eval 180 j) | Non | Non | Non |
| AutomatedLab (5.61.x, 2026) | Non | Oui (Hyper-V / Azure) | Non | Oui (cœur, jusqu'à 2022) | Non | Non | Non |
| Labtainers | Oui (Docker) | Non | Non | Non | Non | Non | Non |

#### Tableau B — hôte, licence, automatisation, activité
| Outil | Hôte Windows | Hôte Linux | macOS / Apple Silicon | Licence et prix (date) | Open source | Lab-as-code / API | Activité (13/11/2026) |
|---|---|---|---|---|---|---|---|
| EVE-NG | via VM Workstation ; Hyper-V non supporté | Ubuntu bare metal | Non (M1/M2/M3 non supportés) | Freemium 7 nœuds ; Pro 150 € ; LC 150 € + rôles (2026) ; Community EOL 06/2026 | Non | API REST : ? | Pro 7.4.0-2 (01/11/2026) |
| PNETLab | via VM | Ubuntu 20.04 (scripts v6) | Non (inf.) | Gratuit ; compte en ligne pour le Store | Non | ? | 5.3.11 (non daté) ; v6 bêta communautaire |
| GNS3 | Client natif + GNS3 VM (Hyper-V / VirtualBox / Workstation) | Oui | Client macOS ; Apple Silicon partiel (images x86 KO) | Gratuit | Oui (GPL-3.0) | API REST (FastAPI) ; MCP en 3.1 alpha | 3.0.6 (28/01/2026) ; 2.2.61 (30/07/2026) ; 3.1.0a7 (21/10/2026) ; 2,7k étoiles |
| CML | via VM (inf.) | Appliance x86/KVM | Non (x86 requis, inf.) | Free 5 nœuds ; Personal 199 $ ; Personal Plus 349 $ | Non | REST + virl2-client + Terraform + MCP (2.10) | client 2.10.1 (28/09/2026) ; Terraform 0.10.2 (10/11/2026) |
| Containerlab | WSL2 | Natif | Oui (ARM/Intel) ; VM seulement sur M3+ / macOS 15 | Gratuit | Oui (BSD-3) | YAML + CLI + extension VS Code | 0.83.0 (06/11/2026) ; ~3,0k étoiles |
| netlab | ? | Oui (Ubuntu) | ? | Gratuit | Oui | YAML (génère containerlab / Vagrant / Ansible) | 26.10 (03/10/2026) ; 756 étoiles |
| Kathará | ? (installeurs par OS) | Oui | ? | Gratuit | Oui (GPL-3.0) | lab.conf + API Python | 3.8.4 (06/11/2026) ; 658 étoiles |
| Mininet | Non (via VM) | Oui | Non | Gratuit | Oui (BSD-3) | API Python | 2.3.1b4 (non daté) ; 5,9k étoiles |
| Proxmox VE | Non (OS bare metal) | Oui (Debian) | Non | Gratuit (AGPLv3) ; abonnement optionnel 120 €/socket/an (10/2026) | Oui | API REST + Terraform (bpg v0.122.0) + Ansible | 9.2 (21/05/2026) |
| Workstation Pro / Fusion Pro | Oui | Oui | Fusion : invités ARM (inf.) | Gratuit pour tous depuis 11/2024 | Non | ? (Vagrant, vmrun) | 26H1 (14/05/2026) ; 26H1u1 (~03/09/2026) |
| VirtualBox | Oui | Oui | Oui (7.2 : invités ARM sur ARM) | Gratuit ; Extension Pack non étudié | Oui (base) | VBoxManage + Vagrant (inf.) | 7.2.16 (08/2026) ; 7.2.22 (20/10/2026, à vérifier) |
| Hyper-V | Windows Pro / Enterprise | Non | Non | Inclus dans Windows | Non | PowerShell (+ AutomatedLab) | — |
| Incus | ? | Oui | ? | Gratuit | Oui | API / CLI | 7.0 LTS (05/05/2026) ; 7.6.0 (30/10/2026) |
| Ludus | Non (serveur Proxmox) | Oui | Non | AGPL-3.0 + niveau Enterprise | Oui | YAML de range + API + CLI + MCP | 2.3.10 (23/10/2026) ; 230 étoiles (miroir GitHub) |
| GOAD | Oui (guide Windows) | Oui | ? | GPL-3.0 (Windows eval 180 j) | Oui | Vagrant / Terraform / Ansible | v3 ; 8,6k étoiles |
| AutomatedLab | Oui (Hyper-V) | Azure seulement | best-effort | MIT | Oui | PowerShell | 5.61.x (2026) ; 2,2k étoiles |
| DetectionLab | — | — | — | MIT | Oui | Vagrant / Terraform / Ansible | Abandonné depuis le 01/01/2023 ; 5,1k étoiles |
| Labtainers | via VM (inf.) | Oui | ? | Gratuit | Oui | scripts | commits jusqu'en 01/2026 |

#### Analyse
- **Le plus proche du « tout faire » dans une interface :** EVE-NG Pro, au prix de 150 €/an, d'un hôte x86 Intel et de l'absence de WiFi. Son équivalent open source et gratuit est GNS3, qui est aussi le seul à avoir un client Windows et macOS natif et une passerelle WiFi (vwifi). GNS3 reste réputé complexe, et la 3.1 avec interface web et IA est encore en alpha en novembre 2026.
- **Le plus proche côté infrastructure :** Proxmox VE (ou Incus), avec Ludus et GOAD par-dessus. Il fait tourner tout ce qui est VM ou conteneur, y compris ESXi, Windows Server, TrueNAS et des pare-feu. Mais il n'a pas de canevas de topologie réseau, son UX est orientée administrateur, et il exige une machine dédiée.
- **Le plus proche du « lab-as-code » piloté par une IA :** containerlab ou netlab (YAML, CLI, multi-OS via WSL2 et macOS). Leur couverture se limite surtout aux OS réseau et à Linux.
- **Lacunes pour la vision de l'étudiant** (ce qu'aucun outil n'offre aujourd'hui) :
  - Une interface unique pour débutants couvrant réseau, systèmes (AD, Windows), hyperviseurs imbriqués, stockage et WiFi.
  - Un vrai support d'hôte Windows natif sans conflit Hyper-V/VBS.
  - Un support Apple Silicon pour les images x86.
  - Un WiFi au-delà des invités Linux.
  - Le Fibre Channel.
  - Des besoins en ressources raisonnables pour un PC étudiant de 16 à 32 Go.
  - Un modèle de licence clair pour les images (Cisco, Windows en évaluation, ESXi 9, ONTAP).
  - Une injection de pannes au niveau système (services, AD, DNS, stockage) : aucune bibliothèque intégrée de ce type n'a été trouvée, seulement des dégradations de liens (netem, link conditioning). C'est une absence de preuve, à confirmer par l'axe IA.
- **Risque concurrentiel :** GNS3 (3.1 alpha), CML (2.10) et Ludus (2.1) ajoutent déjà de l'IA et du MCP. Le différenciateur de l'application devra être l'intégration de bout en bout et l'UX pour débutants, plutôt que « l'IA » seule.

### Gaps
- Aucune enquête quantitative récente (2025–2026) sur les usages (r/homelab, r/ccna, r/networking) n'a pu être collectée. La part de marché ou d'usage de chaque outil n'est donc pas chiffrée.
- Aucun comparatif neutre et daté de 2026 couvrant à la fois émulateurs réseau et hyperviseurs n'a été trouvé. Les comparatifs disponibles viennent surtout de vendeurs de labs hébergés (CloudMyLab, NetPilot).
- Les cellules marquées « ? » ou « (inf.) » des tableaux A et B n'ont pas été vérifiées dans la documentation officielle. Exemples : Windows Server et ESXi dans CML, ESXi imbriqué dans GNS3, Docker dans EVE-NG Freemium, hôtes Windows/macOS de Kathará et netlab, API d'EVE-NG et de Workstation.
- Le fonctionnement des OS réseau en VM (vrnetlab) dans containerlab sous WSL2, qui exige la virtualisation imbriquée dans WSL2, n'a pas été vérifié.
