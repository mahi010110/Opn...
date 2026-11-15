# Moteur de lab : technologies, bibliothèques et conceptions éprouvées (état au 13 novembre 2026)

> **Méthode.** Les sources primaires ont été lues directement dans les dépôts GitHub/GitLab des projets : README, docs, code source, fichiers LICENSE et configuration du noyau WSL. Les versions et dates donnent le dernier tag git stable et la date du commit taggé, relevés le 13/11/2026. Elles peuvent différer d'un ou deux jours de l'annonce officielle.
>
> WebFetch était bloqué pour la plupart des domaines hors GitHub (cncf.io, qemu.org, computingforgeeks.com, falcao.org, mats2208.github.io) ; ces pages ont été remplacées par des recherches web ciblées. Le quota de recherche web a été épuisé en fin de session. Les points non revérifiés sont signalés dans les sections « Gaps ».

---

## 1. Embarquer QEMU ou une VM d'appoint dans une application desktop (Lima, Colima, Podman machine, Rancher Desktop, UTM, quickemu, Multipass, GNS3 ; WHPX / HVF / Virtualization.framework / KVM ; virtualisation imbriquée ; GPL)

### Takeaway
Lima (Apache-2.0, CNCF Incubating, v2.3.0 du 06/11/2026) est la référence réutilisable la plus complète. Il pilote QEMU avec l'accélérateur natif de chaque OS (KVM, HVF, WHPX), ainsi que Virtualization.framework (« vz »), WSL2 et, depuis la v2.3, l'API HCS de Windows. Depuis la v2.2, il installe aussi Windows Server 2025 sans intervention.

La virtualisation imbriquée dépend entièrement de l'accélérateur :
- KVM : oui ;
- HVF sur Apple Silicon : seulement avec QEMU ≥ 11.1 ;
- Virtualization.framework : M3+ et macOS 15+ ;
- WSL2 : oui, sur Windows 11 seulement ;
- QEMU/WHPX : aucune prise en charge documentée.

### Cited Findings

#### Lima (Go, Apache-2.0)
- **Versions.** v2.0.0 le 06/11/2025, v2.2.0 le 21/07/2026, v2.3.0 le 06/11/2026 — [tags Lima](https://github.com/lima-vm/lima/tags). La v2.0 apporte des pilotes de VM enfichables, l'accélération GPU (pilote krunkit) et un serveur MCP ; Lima devient alors projet CNCF Incubating — [CNCF, nov. 2025](https://www.cncf.io/blog/2025/11/11/lima-becomes-a-cncf-incubating-project/) ; [CNCF, Lima v2.0 « secure AI workflows »](https://www.cncf.io/blog/2025/12/11/lima-v2-0-new-features-for-secure-ai-workflows/) ; [FOSDEM 2026 « Lima v2.0: expanding the focus to hardening AI »](https://fosdem.org/2026/schedule/event/lima).
- **MCP.** Lima fournit des outils MCP pour lire, écrire et exécuter des fichiers dans une VM servant de bac à sable. Ces outils sont calqués sur ceux de Gemini CLI — [CNCF, Lima v2.0](https://www.cncf.io/blog/2025/12/11/lima-v2-0-new-features-for-secure-ai-workflows/).
- **Choix du pilote (vmType).** L'organigramme officiel recommande Windows → `wsl2`, Linux → `qemu`, macOS → `vz`. QEMU ne sert sur macOS que pour exécuter une VM Intel entière sur ARM, ce que la doc qualifie de « slow ». `vz` est le pilote par défaut sur macOS ≥ 13.5 depuis Lima 1.0. Le vmType ne peut plus être changé après la création — [doc vmType](https://github.com/lima-vm/lima/blob/master/website/content/en/docs/config/vmtype/_index.md).
- **Accélérateur QEMU choisi automatiquement.** Le code renvoie `hvf` sur macOS (via `kern.hv_support`), `kvm` sur Linux si `/dev/kvm` existe et `whpx` sur Windows, sinon `tcg` avec un avertissement « Expect very poor performance » — [pkg/driver/qemu/qemu.go](https://github.com/lima-vm/lima/blob/master/pkg/driver/qemu/qemu.go).
- **QEMU sur un hôte Windows (doc Lima).** QEMU y a besoin de `ssh`, `scp` et `ssh-keygen`, fournis par le client OpenSSH de Windows. Les montages passent par reverse-sshfs, car « QEMU for Windows has no 9p support ». Versions QEMU recommandées : ≥ 8.2.1 sur macOS, ≥ 6.2.0 sur Linux — [doc qemu](https://github.com/lima-vm/lima/blob/master/website/content/en/docs/config/vmtype/qemu.md).
- **Pilote `hcs` (nouveau en v2.3, expérimental).** Il utilise directement l'API Host Compute System de Windows — [doc hcs](https://github.com/lima-vm/lima/blob/master/website/content/en/docs/config/vmtype/hcs.md) ; [CNCF, Lima v2.3 « native on Windows, vmnet on Linux and menu TUI »](https://cncf.io/blog/2026/11/08/lima-v2-3-native-on-windows-vmnet-on-linux-and-menu-tui). Restrictions documentées :
  - testé seulement sur Windows 11 x86_64 ;
  - mode « plain » uniquement (pas de montage de fichiers ni de redirection dynamique de ports) ;
  - l'utilisateur doit être membre du groupe `Hyper-V Administrators` et lancer `limactl` en administrateur ;
  - une seule instance à la fois, car le sous-réseau HCN est fixe ;
  - le DNS doit être indiqué explicitement ;
  - démarrage uniquement depuis un `.vhdx` (conversion automatique depuis qcow2).
- **Pilote `wsl2` (expérimental).** Il exige un rootfs au format `.tar` et non une image disque. L'exemple officiel utilise un rootfs du projet Finch (AWS). Seule une partie des options Lima est prise en charge — [doc wsl2](https://github.com/lima-vm/lima/blob/master/website/content/en/docs/config/vmtype/wsl2.md).
- **Pilote `krunkit` (expérimental, Lima ≥ 2.0, macOS ≥ 14, Apple Silicon).** Il s'appuie sur libkrun (HVF sur macOS, KVM sur Linux) avec un GPU dans l'invité. Il est livré comme pilote externe (`lima-driver-krunkit`), ce qui illustre l'architecture de pilotes en plugins de Lima 2.x — [doc krunkit](https://github.com/lima-vm/lima/blob/master/website/content/en/docs/config/vmtype/krunkit.md).
- **Invités Windows (Lima ≥ 2.2, expérimental).** `limactl start template:windows-2025` fonctionne avec QEMU seulement, en mode plain seulement, avec un provisioning limité — [doc invités Windows](https://github.com/lima-vm/lima/blob/master/website/content/en/docs/usage/guests/windows.md) ; [CNCF, Lima v2.2](https://www.cncf.io/blog/2026/07/28/lima-v2-2-windows-guests-and-tpm-2-0-emulation/).
  - Il faut un générateur d'ISO Joliet sur l'hôte (`hdiutil`, `xorrisofs`, `genisoimage` ou `mkisofs`).
  - Le mot de passe est généré aléatoirement et écrit dans `%USERPROFILE%\password.txt`.
  - Le TPM est émulé par swtpm : par défaut pour Windows 11, en option pour Server 2025.
  - L'ISO de Windows 11 doit être téléchargée manuellement.

#### Colima, Podman machine, Rancher Desktop, UTM, quickemu, Multipass
- **Colima** (v0.10.3 du 04/06/2026) se décrit comme « container runtimes on macOS (and Linux) with minimal setup » ; il n'existe pas de version Windows — [README Colima](https://github.com/abiosoft/colima) ; [tags](https://github.com/abiosoft/colima/tags).
- **Podman machine** (Podman v6.2.0 du 10/11/2026 ; v6.0.0 du 24/06/2026). Fournisseurs de VM par plateforme, l'astérisque marquant le défaut : Linux `qemu*` ; macOS `libkrun*` et `applehv` ; Windows `wsl*` et `hyperv` — [podman-machine.1.md](https://github.com/containers/podman/blob/main/docs/source/markdown/podman-machine.1.md) ; [tags](https://github.com/containers/podman/tags).
  - Podman 6.0 retire la prise en charge des Mac Intel, de Windows 10, de cgroups v1, d'iptables, de CNI et de slirp4netns (remplacé par pasta). Le dépôt est désormais référencé sous l'organisation `podman-container-tools` — [RELEASE_NOTES](https://github.com/containers/podman/blob/main/RELEASE_NOTES.md).
  - Côté Windows, démarrer ou arrêter une machine Hyper-V ne demande plus les droits administrateur (la création si). Une nouvelle commande `podman system hyperv-prep` prépare l'hôte. `podman machine os update` n'est pas pris en charge avec le fournisseur wsl — [Linuxiac, Podman 6.0](https://linuxiac.com/podman-6-0-lands-with-breaking-changes-amd-gpus-support/).
  - Podman Desktop en est à la v1.30.7 (13/11/2026) — [tags](https://github.com/podman-desktop/podman-desktop/tags).
- **Rancher Desktop** (v1.25.0 du 04/11/2026) est une application Electron écrite principalement en TypeScript, pour Windows, macOS et Linux — [README](https://github.com/rancher-sandbox/rancher-desktop) ; [tags](https://github.com/rancher-sandbox/rancher-desktop/tags).
- **UTM** (v5.0.8 du 16/10/2026, Apache-2.0) se décrit comme « based off of QEMU ». Il utilise l'accélération matérielle via Hypervisor.framework + QEMU, démarre les invités macOS via Virtualization.framework, affiche via SPICE/QXL et dispose du JIT TCG ; il cible macOS, iOS et visionOS — [README UTM](https://github.com/utmapp/UTM) ; [LICENSE](https://github.com/utmapp/UTM/blob/main/LICENSE).
- **quickemu** (4.9.9 du 10/02/2026, MIT) est un wrapper de QEMU. Son outil `quickget` « automatically downloads the upstream OS », y compris Windows et macOS. Hôtes pris en charge : Linux et macOS seulement — [README quickemu](https://github.com/quickemu-project/quickemu).
- **Multipass** (v1.17.1 du 21/10/2026, GPL-3.0) utilise QEMU sur Linux, HCS sur Windows, et QEMU ou Apple Virtualization Framework sur macOS. Il prend en charge les métadonnées cloud-init — [README Multipass](https://github.com/canonical/multipass) ; [LICENSE](https://github.com/canonical/multipass/blob/main/LICENSE).

#### GNS3
- **Versions** : gns3-server v3.0.6 (28/01/2026), v2.2.61 (30/07/2026), v3.1.0a7 en alpha (21/10/2026) ; v3.0.0 date du 20/12/2024. Licence GPL-3.0 — [tags gns3-server](https://github.com/GNS3/gns3-server/tags) ; [LICENSE](https://github.com/GNS3/gns3-server/blob/master/LICENSE).
- **Architecture.** Le serveur pilote Dynamips, VirtualBox et QEMU/KVM. Le client lourd (GUI) et le Web UI contrôlent le serveur via une API REST HTTP. uBridge est requis, Dynamips aussi pour les images IOS, et VPCS est recommandé. QEMU est « strongly recommended on Linux », car la plupart des nœuds en dépendent (IOSv, vEOS) — [README gns3-server](https://github.com/GNS3/gns3-server).

#### QEMU : versions et accélérateurs
- **Versions.** 11.0.0 (tag du 21/04/2026) ; 11.1.0 (11/08/2026) ; correctif 11.1.3 (28/10/2026). La 11.2.0 est en release candidate (rc0) et la branche master porte `VERSION` = 11.1.90 — [tags QEMU](https://github.com/qemu/qemu/tags) ; [VERSION](https://gitlab.com/qemu-project/qemu/-/blob/master/VERSION).
- **QEMU 11.0** apporte un accélérateur « nitro » (AWS Nitro Enclaves), améliore les accélérateurs MSHV et WHPX, et ajoute WHPX pour la carte `virt` ARM — [QEMU 11.0](https://www.qemu.org/2026/04/22/qemu-11-0-0/) ; [Linuxiac](https://linuxiac.com/qemu-11-0-released-with-dropped-32-bit-host-support/) ; [patch « WHPX support for Arm »](https://patchew.org/QEMU/20251121100240.89117-1-mohamed@unpredictable.fr).
- **QEMU 11.1** : « the 'hvf' accelerator now supports nested virtualization and vGIC » — [QEMU 11.1](https://www.qemu.org/2026/08/11/qemu-11-1-0/) ; [Linuxiac](https://linuxiac.com/qemu-11-1-adds-risc-v-big-endian-support-arm-nested-virtualization/) ; [série de patches HVF nested](https://patchew.org/QEMU/20260228220837.35275-1-mohamed@unpredictable.fr).
- **Documentation WHPX** (nouvelle depuis 11.0). WHPX repose sur l'API Windows Hypervisor Platform, construite au-dessus de Hyper-V. Il faut activer la fonctionnalité Windows `HypervisorPlatform` (`DISM /online /Enable-Feature /FeatureName:HypervisorPlatform /All`) — [whpx.rst](https://gitlab.com/qemu-project/qemu/-/blob/master/docs/system/whpx.rst).
  - **Versions minimales.** x86_64 est testé à partir de Windows 10 2004. Sur arm64, il faut Windows 11 24H2 avec les mises à jour d'avril ou mai 2025.
  - **Performance.** `-accel whpx,ssd=off` désactive le « separate security domain » ; la doc annonce un gain de performance MMIO significatif, au prix de mitigations de sécurité.
  - **Problèmes connus.**
    - Les modes VGA hérités sont lents.
    - Les invités qui font du MMIO avec des instructions MMX/SSE/AVX ne sont pas gérés.
    - Sous Windows 10, une interruption PIC ne réveille pas l'invité ; contournement : `-M q35,pic=off` avec UEFI.
    - Sur arm64, SVE et SME ne sont pas gérés.
  - Le document ne mentionne nulle part la virtualisation imbriquée.
- **Licence de QEMU.** « The QEMU emulator as a whole is released under the GNU General Public License, version 2 ». Certaines parties sont sous des licences compatibles. Les firmwares livrés avec QEMU sont « separate programs […] distributed together » avec leurs propres licences — [LICENSE QEMU](https://gitlab.com/qemu-project/qemu/-/blob/master/LICENSE).

#### Matrice de virtualisation imbriquée (pour exécuter KVM, Hyper-V, Proxmox ou des NOS VM dans un nœud)

| Hôte / accélérateur | Imbrication | Source |
|---|---|---|
| Linux x86 + KVM | Oui si le paramètre `nested` de `kvm_intel`/`kvm_amd` est actif (Lima le lit) | [qemu.go](https://github.com/lima-vm/lima/blob/master/pkg/driver/qemu/qemu.go) |
| Linux arm64 + KVM | QEMU ≥ 10.1 et noyau ≥ 6.16 démarré avec `kvm-arm.mode=nested` | [qemu_linux_arm64.go](https://github.com/lima-vm/lima/blob/master/pkg/driver/qemu/qemu_linux_arm64.go) |
| macOS Apple Silicon + QEMU/HVF | QEMU ≥ 11.1, invités arm64 seulement | [qemu_darwin_arm64.go](https://github.com/lima-vm/lima/blob/master/pkg/driver/qemu/qemu_darwin_arm64.go) |
| macOS Intel + HVF | Non (« HVF does not support nested virtualization ») | [qemu_darwin_amd64.go](https://github.com/lima-vm/lima/blob/master/pkg/driver/qemu/qemu_darwin_amd64.go) |
| macOS + Virtualization.framework | Puce M3+ et macOS 15+ (`isNestedVirtualizationSupported`). Apple `container` conditionne sa fonction d'imbrication au même test. Parallels la déclarait non prise en charge fin 2024 | [hada.io](https://news.hada.io/topic?id=15318) ; [forum Parallels](https://forum.parallels.com/threads/macos-15-sequoia-nested-virtualization-for-m3-macs.364397/) ; [instagit/apple container](https://instagit.com/apple/container/how-to-enable-nested-virtualization-in-containers) |
| Windows + Hyper-V | Par VM via `Set-VMProcessor -ExposeVirtualizationExtensions $true`. Intel VT-x+EPT : Windows 10+ ou Server 2016+, configuration de VM ≥ 8.0. AMD EPYC/Ryzen : Windows 11+ ou Server 2022+, configuration ≥ 9.3 | [Microsoft Learn](https://learn.microsoft.com/ms-my/windows-server/virtualization/hyper-v/enable-nested-virtualization) ; [T. Maurer](https://www.thomasmaurer.ch/2021/09/hyper-v-nested-virtualization-for-amd-processors/) |
| Windows + WSL2 | `nestedVirtualization` vaut `true` par défaut, « Only available on Windows 11 ». Le noyau WSL 6.18.52.3 contient `CONFIG_KVM=m`, `KVM_INTEL=m`, `KVM_AMD=m` | [wsl-config.md](https://github.com/MicrosoftDocs/WSL/blob/main/WSL/wsl-config.md) ; [config-wsl 6.18](https://github.com/microsoft/WSL2-Linux-Kernel/blob/linux-msft-wsl-6.18.y/arch/x86/configs/config-wsl) |
| Windows + QEMU/WHPX | Aucune prise en charge documentée | [whpx.rst](https://gitlab.com/qemu-project/qemu/-/blob/master/docs/system/whpx.rst) |

- **Confirmations pratiques de l'imbrication sous WSL2.**
  - La distribution WSL-Containerlab exécute les NOS à base de VM sous Windows 11 mais pas sous Windows 10 (tableau « VM-based NOSes : Windows 10 No / Windows 11 Yes ») ; elle exige WSL ≥ 2.4.4 — [README WSL-Containerlab](https://github.com/srl-labs/wsl-containerlab).
  - dockur/windows fonctionne « on Windows 11 with nested virtualization enabled ». En revanche, Docker Desktop sous Linux, macOS et Windows 10 « does not currently provide KVM access to containers » — [README dockur/windows](https://github.com/dockur/windows).
- **Tauri**, la base actuelle de l'application : CLI stable v2.12.4 (21/10/2026) ; une v3 est en alpha (`cli-v3.0.0-alpha.6`) — [tags Tauri](https://github.com/tauri-apps/tauri/tags).

### Inferences
- **Lima comme gestionnaire de la VM d'appoint.**
  - Lima n'est pas une bibliothèque Rust. En revanche, `limactl`, sous licence Apache-2.0, peut être livré en exécutable « sidecar » par l'application Tauri et piloté en CLI avec sortie JSON.
  - Il couvre les trois OS avec un seul modèle (instances YAML, templates, pilotes `qemu`/`vz`/`wsl2`/`hcs`), et sait déjà installer Windows Server 2025 sans intervention. C'est le moyen le plus rapide d'obtenir un moteur multi-plateforme fonctionnel avant juillet 2027.
  - Le pilote `hcs`, limité à une instance avec droits admin, reste trop jeune pour la V1.
- **Sous Windows, deux voies complémentaires (exploitables sur l'édition Home comme Pro, voir Gaps).**
  - **Voie 1 : WSL2.** C'est la seule voie qui offre KVM imbriqué, donc les NOS vrnetlab, Proxmox ou Hyper-V imbriqués, et uniquement sous Windows 11.
  - **Voie 2 : QEMU + WHPX directement sur l'hôte.** Elle convient aux VM « feuilles », par exemple Windows Server/AD, mais sans imbrication.
  - Windows 10 n'est plus une cible raisonnable : pas d'imbrication WSL, et Podman 6 l'abandonne.
- **Sous Apple Silicon.** Les invités x86 tournent en émulation TCG, ce que la doc Lima qualifie de « slow » ; Windows Server 2025 étant x86-64 uniquement, un lab AD complet sur Mac relève du tier distant. L'imbrication suppose une puce M3+ avec macOS 15+ (VZ) ou QEMU ≥ 11.1 (HVF).
- **GPL et redistribution de QEMU.** Livrer QEMU (GPLv2) dans l'installeur d'une application sous licence permissive est une pratique courante : UTM, sous Apache-2.0, est construit sur QEMU. Les obligations portent sur QEMU lui-même : fournir le code source correspondant aux binaires distribués (avec les correctifs éventuels) et respecter la licence propre à chaque firmware. Piloter QEMU comme processus séparé (CLI ou QMP) évite d'en faire une œuvre dérivée de l'application. Ceci n'est pas un avis juridique.
- **Modèle de distribution.** Le plus simple pour un projet solo est de ne pas compiler QEMU soi-même : réutiliser des binaires amont (paquets Linux, Homebrew sur macOS, builds MSYS2 sur Windows) et publier un lien vers les sources correspondantes.

### Gaps
- **Taille d'empaquetage** (QEMU limité à une cible, Lima, Rancher Desktop, Podman) : aucune mesure fiable trouvée. À mesurer sur un prototype.
- **WHPX imbriqué** : l'absence d'imbrication est déduite de l'absence de mention dans `whpx.rst` et dans Lima, pas d'une déclaration explicite.
- **Fonctionnement interne de Rancher Desktop** (Lima sur macOS/Linux, WSL2 sur Windows) : non revérifié dans cette session.
- **Disponibilité sur Windows Home** des fonctionnalités Windows Hypervisor Platform et Virtual Machine Platform, face à Hyper-V réservé aux éditions Pro : non revérifiée.
- **Conflits entre hyperviseurs** (VMware ou VirtualBox lorsque Hyper-V/WSL2 est actif) : non revérifiés.
- **Contenu détaillé** des articles CNCF sur Lima 2.2/2.3 et des notes de version QEMU : WebFetch était bloqué pour cncf.io et qemu.org, seuls des extraits de recherche ont été utilisés.

---

## 2. Conteneurs sur Windows et macOS sans Docker Desktop (VM Linux d'appoint, WSL2, Podman, containerd/nerdctl, Incus) et bibliothèques clientes Rust/Go

### Takeaway
Sous Windows 11, trois voies existent sans Docker Desktop :
1. une distribution WSL2 dédiée avec Docker Engine, containerd ou Podman (ce que recommande containerlab) ;
2. Podman machine, sur WSL par défaut ou Hyper-V ;
3. les nouveaux « WSL Containers », disponibles en GA depuis septembre 2026 : CLI `wslc.exe` et API C, C# et C++.

Sur macOS, les options sont Lima, Colima, Podman (libkrun par défaut) ou Apple `container` (macOS 26). Côté Rust, bollard couvre Docker et Podman. Incus expose une API REST décrite en OpenAPI, mais aucun client Rust n'a été vérifié.

### Cited Findings
- **WSL Containers.**
  - Il y a deux composants : `wslc.exe`, un CLI pour construire, exécuter et inspecter des conteneurs Linux (`wslc run`, `wslc image ls`, `-p 8080:80`), et une **API pour applications Windows**. L'API est distribuée dans le paquet NuGet `Microsoft.WSL.Containers`, avec des projections **C, C# et C++**. Ses objets sont `WslcService` (prérequis), `Session` (hôte WSL qui gère images et conteneurs) et `Container` — [wsl-container.md](https://github.com/MicrosoftDocs/WSL/blob/main/WSL/wsl-container.md).
  - Les WSL Containers sont en GA avec WSL 3.0.1 (tag du 25/09/2026, annonce du 29/09/2026). WSL 3.0 passe au noyau Linux 6.18, utilise virtiofs par défaut et introduit un mode réseau expérimental « consomme ». Il n'y a pas encore de `wslc compose` — [it-connect](https://www.it-connect.fr/microsoft-devoile-wsl-3-et-les-conteneurs-wsl-pour-windows/) ; [BornCity](https://borncity.com/news/wsl-3-0-microsoft-macht-linux-container-unter-windows-allgemein-verfuegbar/) ; [tags WSL](https://github.com/microsoft/WSL/tags).
  - Microsoft refuse de parler de « WSL 3 » comme d'une nouvelle version majeure — [Windows Latest](https://windowslatest.com/2026/06/28/microsoft-denies-wsl-3-exists-reveals-windows-11s-wsl-containers-ship-next-week).
  - Dernier tag : 3.0.5 (29/10/2026) — [tags WSL](https://github.com/microsoft/WSL/tags).
- **Réglages WSL utiles à un moteur de lab** — [wsl-config.md](https://github.com/MicrosoftDocs/WSL/blob/main/WSL/wsl-config.md) :
  - `networkingMode` accepte `none`, `nat`, `bridged` (déprécié), `mirrored` et `consomme` ;
  - `loadKernelModules` charge des modules supplémentaires au démarrage ;
  - `kernelModules` pointe vers un VHD de modules personnalisé ;
  - `nestedVirtualization` (Windows 11 seulement) ;
  - `virtiofs` (expérimental).
- **containerlab sous Windows.** La doc recommande WSL avec Docker installé dans la distribution. Elle met en garde contre l'intégration WSL de Docker Desktop (à désactiver pour la VM de lab) et propose la distribution « WSL-Containerlab » — [windows.md](https://github.com/srl-labs/containerlab/blob/main/docs/windows.md) ; [WSL-Containerlab](https://github.com/srl-labs/wsl-containerlab).
- **containerlab sous macOS.** La doc recommande une VM Linux arm64 (OrbStack dans le guide) et des images arm64 ; les images x86 tournent sous Rosetta avec pénalité — [macos.md](https://github.com/srl-labs/containerlab/blob/main/docs/macos.md).
- **Podman machine** : fournisseurs par OS et ruptures de Podman 6, détaillés en section 1 — [podman-machine.1.md](https://github.com/containers/podman/blob/main/docs/source/markdown/podman-machine.1.md) ; [RELEASE_NOTES](https://github.com/containers/podman/blob/main/RELEASE_NOTES.md).
- **containerd** v2.4.2 (13/10/2026) et **nerdctl** v2.4.2 (30/10/2026) — [tags containerd](https://github.com/containerd/containerd/tags) ; [tags nerdctl](https://github.com/containerd/nerdctl/tags).
- **Incus** (Apache-2.0).
  - Le démon « only works on Linux » ; sur les autres OS, seul le client `incus` est fourni — [installing.md](https://github.com/lxc/incus/blob/main/doc/installing.md) ; [COPYING](https://github.com/lxc/incus/blob/main/COPYING).
  - L'API REST est documentée, avec une spécification OpenAPI — [rest-api.md](https://github.com/lxc/incus/blob/main/doc/rest-api.md) ; [rest-api.yaml](https://github.com/lxc/incus/blob/main/doc/rest-api.yaml).
  - Incus 7.0 LTS (tag du 02/05/2026), supporté jusqu'en juin 2031 — [Linuxiac](https://linuxiac.com/incus-7-0-lts-container-and-virtual-machine-manager-released/) ; [annonce](https://discuss.linuxcontainers.org/t/incus-7-0-lts-has-been-released/26641) :
    - prérequis : Linux 6.12, QEMU 8.2, LXC 6.0 ;
    - conteneurs applicatifs OCI ;
    - buckets S3 intégrés qui remplacent MinIO ;
    - pilote de stockage TrueNAS et LINSTOR ;
    - API de sauvegarde bas niveau.
  - Dernières versions : 7.6.0 (29/10/2026) ; correctifs LTS 7.0.2 et 6.0.7 (16/10/2026) — [tags Incus](https://github.com/lxc/incus/tags).
- **Apple `container`** (Apache-2.0, Swift). Chaque conteneur Linux tourne dans une VM légère, sur Mac Apple silicon et macOS 26 ou plus récent seulement, via le paquet Swift « Containerization » — [README](https://github.com/apple/container). Versions : 1.0.0 (08/06/2026), 1.7.1 (06/11/2026) — [tags](https://github.com/apple/container/tags).
- **bollard** (Rust, Apache-2.0, v0.21.1 du 16/08/2026). Client asynchrone (Hyper/Tokio) de l'API Docker qui traite **Podman comme runtime de premier rang**, découvre automatiquement le socket de Podman rootless et prend en charge les **named pipes** sous Windows — [README bollard](https://github.com/fussybeaver/bollard) ; [tags](https://github.com/fussybeaver/bollard/tags).
- **podman-api-rs** (MIT) cible l'API libpod v4.5.1 ; le crate est en retard par rapport à Podman 6 — [README](https://github.com/vv9k/podman-api-rs).
- **Autres liaisons natives.**
  - Go : hcsshim v0.15.0 (15/10/2026) pour l'API HCS Windows — [tags hcsshim](https://github.com/microsoft/hcsshim/tags) ; Code-Hex/vz v3.8.0 (29/09/2026) pour Virtualization.framework — [tags vz](https://github.com/Code-Hex/vz/tags).
  - Rust : le crate `arcbox-vz` expose la configuration Virtualization.framework, dont le test d'imbrication — [docs.rs arcbox-vz](https://docs.rs/crate/arcbox-vz/0.4.9/source/src/configuration/platform.rs) ; libvirt-rust v0.5.0 (29/10/2026) — [tags](https://github.com/libvirt/libvirt-rust/tags).

### Inferences
- **Option V1 recommandée sous Windows : une distribution WSL2 propre à l'application.** Un rootfs `.tar` construit en CI est importé avec `wsl --import`, puis contient containerd ou Docker Engine, containerlab et le réseau du lab. L'application garde ainsi le contrôle du noyau (modules), du réseau (veth, bridges) et des versions, comme le font WSL-Containerlab et Finch. Elle parle au moteur de conteneurs via bollard à travers un socket exposé ou relayé.
- **Où placer `wslc` et son API.** Ils conviennent pour des nœuds conteneurs simples sans gérer de VM. En revanche, rien n'indique qu'ils permettent les manipulations réseau fines d'un lab (veth arbitraires, netem, OVS) : à réserver à une V2 après expérimentation. L'API étant en C, un appel depuis Rust par FFI est envisageable.
- **Incus dans la VM d'appoint ou sur le nœud distant.** Il unifierait conteneurs système, conteneurs OCI et VM, avec snapshots et stockage ZFS/btrfs, derrière une seule API REST. Le client Rust est à générer depuis `rest-api.yaml`.
- **Podman machine.** C'est une alternative clé en main, mais elle impose son propre cycle de vie de VM. Mieux vaut considérer Podman comme un moteur de conteneurs installable dans la VM d'appoint que comme gestionnaire de VM de l'application.

### Gaps
- **Limites réseau** de WSL Containers (modes, veth personnalisés, privilèges) : non documentées dans les pages lues.
- **Client Rust maintenu** pour l'API Incus : aucun trouvé.
- **Licence de Podman** : non revérifiée dans cette session (Apache-2.0 selon les connaissances antérieures).

---

## 3. Nœuds légers et rapides : micro-VM et sandboxes (Firecracker, Cloud Hypervisor, Kata, gVisor, crosvm, libkrun, OpenVMM)

### Takeaway
Les micro-VM matures (Firecracker, Cloud Hypervisor, Kata) et gVisor sont **Linux/KVM uniquement**. Elles ne sont donc utilisables que dans la VM Linux d'appoint, avec virtualisation imbriquée, ou sur un nœud Linux ou distant.

Pour les autres hôtes :
- libkrun couvre macOS (HVF) et Linux (KVM) ;
- crosvm prend en charge Windows (WHPX/HAXM) mais vise ChromeOS et Android, sans versions publiées ;
- OpenVMM (Rust, MIT) reste centré sur le paravisor OpenHCL.

### Cited Findings
- **Firecracker** (Apache-2.0, v1.18.0 du 05/11/2026). Il s'appuie sur KVM et peut aussi tourner en « Nitro Sandbox ». Mémoire par défaut : 128 MiB — [README](https://github.com/firecracker-microvm/firecracker) ; [tags](https://github.com/firecracker-microvm/firecracker/tags).
  - **Spécification.** Moins de 125 ms entre la réception de l'appel API `InstanceStart` et le démarrage de l'invité (1 vCPU, 128 MiB, noyau adapté). Surcoût mémoire des threads du VMM ≤ 5 MiB. Socket d'API disponible en moins de 8 ms CPU — [SPECIFICATION.md](https://github.com/firecracker-microvm/firecracker/blob/main/SPECIFICATION.md).
  - **Nouveautés de la 1.18.** Découverte automatique des périphériques PCIe branchés à chaud, `SendCtrlAltDel` sur aarch64, et options `drive_overrides` et `pmem_overrides` de `PUT /snapshot/load` pour remplacer les fichiers de sauvegarde lors de la restauration d'un snapshot — [CHANGELOG](https://github.com/firecracker-microvm/firecracker/blob/main/CHANGELOG.md).
- **Cloud Hypervisor** (v54.1 du 10/11/2026). Fonctionne sur KVM ou MSHV, en x86-64 et AArch64 (riscv64 expérimental). Accepte des invités Linux 64 bits **et Windows** (Server 2025, Windows 11) et le branchement à chaud CPU, mémoire et PCI — [README](https://github.com/cloud-hypervisor/cloud-hypervisor) ; [tags](https://github.com/cloud-hypervisor/cloud-hypervisor/tags).
- **Kata Containers** (Apache-2.0, 3.32.0 du 22/06/2026). Runtime de conteneurs dans des VM légères, compatible avec plusieurs hyperviseurs (voir docs/hypervisors.md) — [README](https://github.com/kata-containers/kata-containers) ; [tags](https://github.com/kata-containers/kata-containers/tags).
- **gVisor** (Apache-2.0, release-20261109.0). Noyau en espace utilisateur avec le runtime OCI `runsc`, intégré à Docker et Kubernetes ; exige Linux 5.6+ — [README](https://github.com/google/gvisor) ; [LICENSE](https://github.com/google/gvisor/blob/master/LICENSE).
- **crosvm** (BSD-3-Clause). VMM de ChromeOS, aussi utilisé par l'application Terminal d'Android, Cuttlefish et « Windows ». Accélérateurs : KVM, Gunyah, GenieZone et Halla sur Linux/Android ; **WHPX et HAXM sur Windows**. virtio-block accepte raw, qcow2 et zstd. Le dépôt ne publie aucun tag de version — [README](https://github.com/google/crosvm).
- **libkrun** (Apache-2.0, v1.19.8 du 06/11/2026). Bibliothèque dynamique qui embarque un VMM, sur KVM (Linux) et HVF (macOS) — [README](https://github.com/containers/libkrun) ; [tags](https://github.com/containers/libkrun/tags).
  - **Utilisateurs** : `crun` (Podman `--runtime=krun`), krunkit (GPU via venus sur macOS, v1.3.2 du 03/07/2026) et muvm (v0.7.0).
  - **Réseau** : TSI (Transparent Socket Impersonation) détourne les sockets de l'invité via virtio-vsock, sans interface réseau virtuelle.
  - **Variantes** : SEV et TDX.
  - **Périphériques virtio** : console, block, fs, gpu, net, vsock, balloon, rng.
- **OpenVMM** (MIT). « currently focused on its role in the OpenHCL paravisor ». Aucune version produit n'est publiée ; seuls des tags `vmgstool` existent — [README](https://github.com/microsoft/openvmm) ; [LICENSE](https://github.com/microsoft/openvmm/blob/main/LICENSE) ; [tags](https://github.com/microsoft/openvmm/tags).
- **Apple `container`.** Un conteneur égale une VM légère via Virtualization.framework, sur macOS 26 seulement (voir section 2) — [README](https://github.com/apple/container).

### Inferences
- Pour le lab, des « nœuds Linux instantanés » (clients, serveurs web, routeurs FRR) sont plus simples en **conteneurs** dans la VM d'appoint. Les micro-VM n'apportent un vrai gain que pour :
  - une isolation noyau, par exemple pour des exercices de sécurité ;
  - des snapshots mémoire restaurables très vite (Firecracker `snapshot/load` avec remplacement des disques).
- **Cloud Hypervisor** est le seul de la famille rust-vmm à accepter Windows Server en invité. Sur Linux ou dans la VM d'appoint, ce serait une alternative plus légère à QEMU pour certains nœuds, mais au prix d'un deuxième VMM à maintenir.
- **libkrun** est intéressant pour une V2 sur Mac et Linux (VM d'appoint à démarrage rapide, GPU), mais pas pour Windows. OpenVMM et crosvm ne sont pas des choix raisonnables pour un développeur solo en 2027.

### Gaps
- **Mesures de temps de boot** comparables (Cloud Hypervisor, Kata, libkrun) : aucune source primaire chiffrée lue.
- **Licence exacte de Cloud Hypervisor** : fichier de licence introuvable à la racine dans cette session (Apache-2.0 et BSD-3 selon les connaissances antérieures).
- **Feuille de route d'OpenVMM** (macOS/HVF, usage hors OpenHCL) : non vérifiée.

---

## 4. Réseau virtuel pour topologies mixtes conteneurs + VM (bridges, veth, netns, OVS, VXLAN, tc/netem ; câblage containerlab, netlab, vrnetlab, GNS3 ; containerlab/netlab comme backends)

### Takeaway
La conception éprouvée s'appuie sur des primitives du noyau dans une VM Linux, complétées par des tunnels L2 entre hôtes :
- dans la VM Linux, une paire veth par lien point à point (containerlab) ;
- des bridges Linux ou OVS pour les segments multi-accès ;
- tc/netem pour les dégradations de lien ;
- un miroir tc entre les interfaces du conteneur et celles de la VM pour les NOS « VM-dans-conteneur » (vrnetlab) ;
- entre hôtes ou entre OS, de l'Ethernet transporté sur UDP ou sur flux (uBridge de GNS3, `-netdev dgram`, `stream` ou `socket` de QEMU, VXLAN).

Le noyau WSL 6.18 fournit déjà toutes ces primitives. containerlab peut servir de backend (CLI ou REST via clab-api-server) et netlab (MIT) de générateur.

### Cited Findings
- **Primitives présentes dans le noyau WSL2 6.18.52.3** — [config-wsl](https://github.com/microsoft/WSL2-Linux-Kernel/blob/linux-msft-wsl-6.18.y/arch/x86/configs/config-wsl) :
  - intégrées (`=y`) : `VETH`, `VXLAN`, `NF_TABLES` ;
  - en modules (`=m`) : `BRIDGE`, `OPENVSWITCH`, `NET_SCH_NETEM`, `MACVLAN`, `TUN`, `VHOST_NET`, `GENEVE`, `WIREGUARD`, `BONDING`, `IP_VS`, `NET_CLS_BPF` ;
  - `NET_TEAM` absent ;
  - les modules `=m` se chargent via `loadKernelModules` — [wsl-config.md](https://github.com/MicrosoftDocs/WSL/blob/main/WSL/wsl-config.md).
- **containerlab** (BSD-3-Clause, Nokia ; v0.83.0 du 06/11/2026) — [LICENSE](https://github.com/srl-labs/containerlab/blob/main/LICENSE) ; [tags](https://github.com/srl-labs/containerlab/tags) :
  - **VM dans un conteneur.** Intégration vrnetlab : la VM est empaquetée dans un conteneur, et un backend **tc** « mirrors the traffic to and from container interfaces to the appropriate VM interfaces », sans bridge intermédiaire, donc transparent pour toutes les trames. La VM hôte de containerlab doit avoir la virtualisation imbriquée. Les variables `QEMU_SMP`, `QEMU_MEMORY`, `QEMU_CPU` et `QEMU_ADDITIONAL_ARGS` sont ajustables dans la topologie — [vrnetlab.md](https://github.com/srl-labs/containerlab/blob/main/docs/manual/vrnetlab.md).
  - **Kinds `bridge` et `ovs-bridge`** pour raccorder la topologie à d'autres ressources, par exemple une VM externe — [vrnetlab.md](https://github.com/srl-labs/containerlab/blob/main/docs/manual/vrnetlab.md).
  - **Kind `generic_vm`.** Toute VM qcow2 (Ubuntu, AlmaLinux…) via vrnetlab ; Ubuntu 22.04 met environ 1 minute à démarrer — [generic_vm.md](https://github.com/srl-labs/containerlab/blob/main/docs/manual/kinds/generic_vm.md).
  - **Dégradations de lien.** `containerlab tools netem set|show|reset` règle délai, gigue et perte, par exemple `--loss 10` sur une interface de nœud — [impairments.md](https://github.com/srl-labs/containerlab/blob/main/docs/manual/impairments.md).
  - **Nouveautés de la 0.83.** `containerlab capture` (capture des deux extrémités d'un lien en direct dans Wireshark), améliorations du runtime clabernetes (« c9s »), MikroTik CHR jusqu'à 64 interfaces de données sur AMD64, `tools snapshot save` pour des labs partiellement déployés, nettoyage des interfaces `vxlan-stitch` — [rn/0.83.md](https://github.com/srl-labs/containerlab/blob/main/docs/rn/0.83.md).
  - **API REST : clab-api-server** (v0.10.0 du 07/11/2026). Elle « embeds Containerlab as a Go library » et peut se lancer avec `containerlab tools api-server start` (HTTPS sur le port 8090 par défaut). L'authentification se fait par JWT avec comptes Linux et PAM. Elle était en bêta dans la 0.68 — [doc api-server](https://containerlab.dev/manual/api-server/) ; [pkg.go.dev](https://pkg.go.dev/github.com/srl-labs/clab-api-server@v0.1.11) ; [tags](https://github.com/srl-labs/clab-api-server/tags).
  - **clabernetes** (containerlab sur Kubernetes) : v0.11.0 du 31/10/2026 — [tags](https://github.com/srl-labs/clabernetes/tags).
- **vrnetlab, fork srl-labs** (MIT ; dernier tag v0.21.0 du 12/01/2025). Scripts qui fabriquent une image conteneur à partir d'un disque de VM fourni par l'utilisateur — [README](https://github.com/srl-labs/vrnetlab) ; [LICENSE](https://github.com/srl-labs/vrnetlab/blob/master/LICENSE).
- **netlab** (MIT ; release_26.10 du 03/10/2026) — [README](https://github.com/ipspace/netlab) ; [LICENSE](https://github.com/ipspace/netlab/blob/dev/LICENSE.md) ; [providers.md](https://github.com/ipspace/netlab/blob/dev/docs/providers.md) :
  - génère soit un fichier containerlab, soit un Vagrantfile pour libvirt/KVM, plus l'inventaire Ansible ;
  - commandes `netlab connect`, `netlab exec` et `netlab collect` ;
  - fournisseurs : `libvirt` (via vagrant-libvirt), `clab` et `external` ;
  - le fournisseur VirtualBox a disparu après la 26.06.
- **Kathará** (GPL-3.0 ; 3.8.4 du 05/11/2026). Émulation réseau sur Docker ou Kubernetes (« Megalos »), avec des API Python, successeur compatible de Netkit — [README](https://github.com/KatharaFramework/Kathara) ; [LICENSE](https://github.com/KatharaFramework/Kathara/blob/master/LICENSE).
- **uBridge de GNS3** (GPL-3.0 ; v1.3.2 du 31/10/2026) — [README uBridge](https://github.com/GNS3/ubridge) ; [LICENSE](https://github.com/GNS3/ubridge/blob/master/LICENSE) :
  - un relais en espace utilisateur qui relie des NIO (tunnels UDP, Ethernet, TAP, sockets UNIX) avec des filtres par bridge (délai, gigue, perte) ;
  - un « kernel data plane » qu'il pilote : TAP persistants, bridges noyau (ports, VLAN, STP), VXLAN, veth, tc/netem et capture AF_PACKET.
- **Backends réseau de QEMU** — [qemu-options.hx](https://gitlab.com/qemu-project/qemu/-/blob/master/qemu-options.hx) :
  - `-netdev user` (slirp) ;
  - `tap` ;
  - `socket` (TCP listen/connect ou multicast) ;
  - `stream` (inet, unix ou fd) ;
  - `dgram` (UDP unicast ou multicast) ;
  - `passt`.
- **gvisor-tap-vsock** (v0.9.0 du 07/10/2026). Remplace libslirp et VPNKit, écrit en Go pur, avec DNS configurable et redirection dynamique de ports. Utilisable avec QEMU, Hyperkit, Hyper-V et User Mode Linux ; depuis QEMU 7.2 sans wrapper, via `-netdev stream,addr.type=unix` — [README](https://github.com/containers/gvisor-tap-vsock) ; [tags](https://github.com/containers/gvisor-tap-vsock/tags).
- **Réseau `user-v2` de Lima.** Réseau en mode utilisateur avec communication VM ↔ VM et noms `lima-<nom>.internal`. Accès depuis l'hôte par `limactl tunnel` (proxy SOCKS, expérimental) — [user-v2.md](https://github.com/lima-vm/lima/blob/master/website/content/en/docs/config/network/user-v2.md).
- **Open vSwitch** v4.0.0 (17/08/2026), Apache-2.0 — [tags OVS](https://github.com/openvswitch/ovs/tags) ; [LICENSE](https://github.com/openvswitch/ovs/blob/main/LICENSE).

### Inferences
- **Architecture réseau recommandée : un « fabric » unique dans la VM Linux d'appoint.**
  - **Liens point à point** : veth (modèle containerlab).
  - **Segments LAN, VLAN et WiFi simulé** : bridges ou OVS.
  - **Qualité de lien** : netem.
  - **Dégradations (pannes)** : `ip link set down`, netem ou nftables, pilotés par l'IA.
  - **VM tournant hors de la VM d'appoint** (QEMU/WHPX sur l'hôte Windows) : raccordées au fabric par `-netdev stream` ou `dgram` vers un petit commutateur en espace utilisateur dans la VM d'appoint, à la manière d'uBridge, ou par des interfaces TAP.
- **Format de lab.** Réutiliser la syntaxe YAML de containerlab (`nodes`, `kinds`, `links: endpoints: ["r1:eth1","r2:eth1"]`) et l'étendre (VM QEMU, WiFi, stockage, scénarios de pannes) donne un format déjà connu des réseauteurs. containerlab peut être appelé dans la VM d'appoint en CLI, avec `inspect --format json`, ou via clab-api-server.
- **netlab** sert de générateur optionnel (Python et Ansible dans la VM d'appoint) pour des labs de routage avancés, mais n'est pas indispensable en V1.
- **Labs collaboratifs (V2+).** VXLAN ou WireGuard (tous deux dans le noyau WSL) entre la VM d'appoint et le nœud distant ou d'autres pairs, avec la signalisation Nostr/WebRTC déjà maîtrisée pour l'échange des clés et points d'accès.

### Gaps
- **Débit et latence** d'un pont UDP entre QEMU/WHPX sur l'hôte et la VM WSL2 (traversée du NAT ou du mode mirrored de WSL) : aucune mesure trouvée.
- **Détails du mode réseau `consomme`** de WSL : non documentés dans les pages lues.
- **Fonctionnement du nouveau `tools snapshot save`** de containerlab : seule son existence est attestée.

---

## 5. Snapshots et réinitialisation rapide (overlays qcow2, snapshots de VM, CRIU, btrfs/ZFS ; stratégies des plateformes de lab)

### Takeaway
La « remise à zéro instantanée » repose sur une image dorée en lecture seule plus un overlay qcow2 jetable par nœud et par session : on supprime l'overlay et on le recrée. On peut y ajouter, au besoin :
- des snapshots RAM+disque (`savevm`/`loadvm` de QEMU, `snapshot/load` de Firecracker) ;
- des snapshots de système de fichiers (btrfs/ZFS, pour conteneurs et pools Incus) ;
- CRIU pour figer des conteneurs, plus fragile.

Les plateformes (Ludus, containerlab) prennent un snapshot avant l'exercice.

### Cited Findings
- **QEMU** — [docs/system/images.rst](https://gitlab.com/qemu-project/qemu/-/blob/master/docs/system/images.rst) :
  - les **snapshots de VM** (état complet : CPU, RAM, périphériques, disques) se créent avec `savevm`, se restaurent avec `loadvm` et se suppriment avec `delvm` ;
  - il faut au moins un périphérique bloc inscriptible au format **qcow2** ;
  - le mode `-snapshot` rend tous les disques temporaires ;
  - les images qcow2 peuvent s'appuyer sur un fichier de base (backing file).
- **Firecracker 1.18.** `PUT /snapshot/load` accepte `drive_overrides` et `pmem_overrides` pour changer les fichiers de sauvegarde des disques à la restauration, ce qui permet de cloner un snapshot doré vers des disques propres à chaque clone — [CHANGELOG](https://github.com/firecracker-microvm/firecracker/blob/main/CHANGELOG.md).
- **CRIU** v4.3.1 (12/11/2026) : « checkpoint/restore functionality for Linux » en espace utilisateur — [README CRIU](https://github.com/checkpoint-restore/criu) ; [tags](https://github.com/checkpoint-restore/criu/tags). Le noyau WSL 6.18 a `CONFIG_CHECKPOINT_RESTORE=y` et `CONFIG_BTRFS_FS=m` — [config-wsl](https://github.com/microsoft/WSL2-Linux-Kernel/blob/linux-msft-wsl-6.18.y/arch/x86/configs/config-wsl).
- **containerlab.** Une commande `tools snapshot save` existe ; la 0.83 la rend capable de sauvegarder un lab partiellement déployé — [rn/0.83.md](https://github.com/srl-labs/containerlab/blob/main/docs/rn/0.83.md).
- **Ludus**, plateforme de « cyber ranges » sur Proxmox. Son *Testing mode* « snapshots VMs and blocks them from the internet » — [README Ludus](https://gitlab.com/badsectorlabs/ludus).
- **Proxmox VE 9.1** (19/11/2025) ajoute la prise en charge de l'état TPM au format qcow2. C'est utile pour snapshotter des VM Windows 11 avec vTPM sur stockage qcow2 — [Proxmox, nouveautés 9.1](https://proxmox.com/de/services/training-kurse/videos/proxmox-virtual-environment/whats-new-in-proxmox-ve-9-1).
- **Incus 7.0 LTS** ajoute une « low-level backup API » — [Linuxiac](https://linuxiac.com/incus-7-0-lts-container-and-virtual-machine-manager-released/).

### Inferences
- **Stratégie V1.**
  - **Construction des images dorées** : par l'application (section 6), en qcow2 compressé et en lecture seule.
  - **Au déploiement** : `qemu-img create -f qcow2 -b golden.qcow2 -F qcow2 node.qcow2` pour chaque nœud.
  - **Réinitialisation** : arrêter la VM, supprimer et recréer l'overlay ; c'est quasi instantané et indépendant de la taille de l'image.
  - **Points de reprise pédagogiques** (« avant la panne injectée ») : `savevm`/`loadvm` sur l'overlay, ou snapshot externe via QMP.
  - **Conteneurs** : recréer depuis l'image, qui est déjà immuable.
- **Points de vigilance.**
  - `loadvm` est proportionnel à la RAM de la VM : quelques Go pour un contrôleur de domaine.
  - Une restauration RAM d'une VM Windows jointe au domaine peut désynchroniser les horloges ou les tickets Kerberos, ce qui milite pour des resets « à froid » sur les scénarios AD.
- **Pour une V2** : btrfs (module WSL) ou Incus avec ZFS/btrfs pour les pools de conteneurs et rootfs ; CRIU seulement pour des démonstrations (connexions TCP et périphériques non gérés).

### Gaps
- **Mécanisme exact de « wipe »** d'EVE-NG et de CML (overlays par nœud) : non revérifié dans cette session.
- **Temps de restauration chiffrés** (QEMU `loadvm` d'une VM Windows de 4 Go, Firecracker) : aucune source primaire lue.
- **Documentation des snapshots Incus** : non lue.

---

## 6. Automatisation des invités et images dorées (autounattend.xml, virtio, cloud-init/cloudbase-init, Packer, agent invité QEMU, WinRM/SSH/PowerShell, Ansible ; construire depuis l'ISO de l'utilisateur ; exécuter des commandes pour injecter des pannes)

### Takeaway
Construire automatiquement une VM Windows Server depuis une ISO d'évaluation ou fournie par l'utilisateur est éprouvé **sans Packer** : Lima 2.2 le fait (autounattend sur ISO Joliet, ISO virtio-win, swtpm), dockur/windows aussi. Packer, sous licence BSL 1.1, combiné aux templates rgl/windows-vagrant, reste la voie classique.

Dans l'invité, l'agent QEMU (`guest-exec`, `guest-file-*`) fonctionne même sans réseau. Windows Server 2025 embarque OpenSSH, installé mais désactivé, ce qui fait de SSH un canal quasi universel.

### Cited Findings
- **Lima, template `windows-2025.yaml`** — [template](https://github.com/lima-vm/lima/blob/master/templates/windows-2025.yaml) ; [doc](https://github.com/lima-vm/lima/blob/master/website/content/en/docs/usage/guests/windows.md) :
  - l'image vient de `https://aka.ms/WinServ2025iso-enus`, l'ISO d'évaluation de Microsoft ;
  - « Windows server 2025 is only for x86-64 » ;
  - l'ISO virtio-win 0.1.271 est téléchargée depuis fedorapeople.org ;
  - le mode « boot » de provisioning n'existe pas, faute d'étape équivalente à l'« init » de cloud-init.
- **dockur/windows** (MIT ; v6.06 du 05/10/2026) — [README](https://github.com/dockur/windows) ; [licence](https://github.com/dockur/windows/blob/master/license.md) ; [tags](https://github.com/dockur/windows/tags) :
  - « Automatic download and hands-free installation » ;
  - versions proposées dont Server 2025 (7,6 Go), 2022 (6,0 Go) et 2019 (5,3 Go) ;
  - exige KVM ; au moins 2 Go de RAM et 32 Go de disque ;
  - console web sur le port 8006 ;
  - une variante ARM64 existe (dockur/windows-arm).
- **quickemu / quickget** (MIT) : téléchargement automatique de l'OS amont, Windows compris — [README](https://github.com/quickemu-project/quickemu).
- **rgl/windows-vagrant** — [README](https://github.com/rgl/windows-vagrant) :
  - templates Packer pour Windows 11, 2022 et 2025 sur Hyper-V, libvirt, QEMU, Proxmox VE et vSphere ;
  - possibilité d'utiliser sa propre ISO (`PKR_VAR_iso_url='windows-2022.iso'`) ;
  - exige Packer 1.16+.
- **Licences HashiCorp** :
  - **Packer** v1.16.2 (22/10/2026) est sous **Business Source License**, avec IBM comme concédant, pour « Packer Version 1.10.0 or later ». L'« Additional Use Grant » autorise l'usage en production sauf offre concurrente des versions payantes d'IBM — [LICENSE Packer](https://github.com/hashicorp/packer/blob/main/LICENSE) ; [tags](https://github.com/hashicorp/packer/tags).
  - **packer-plugin-qemu** est sous MPL-2.0 — [LICENSE](https://github.com/hashicorp/packer-plugin-qemu/blob/main/LICENSE).
  - **Vagrant** : sur la branche main, le fichier LICENSE (« Copyright IBM Corp. 2026 ») contient le texte de la **licence MIT** ; dernière release v2.4.9 du 21/08/2025 — [LICENSE Vagrant](https://github.com/hashicorp/vagrant/blob/main/LICENSE) ; [tags](https://github.com/hashicorp/vagrant/tags).
- **virtio-win.** ISO « stable » et « latest » sur fedorapeople.org, avec `qemu-ga`. Les binaires Windows sont construits par Red Hat à partir de code public ; le dépôt détaille les signatures des pilotes — [virtio-win-pkg-scripts](https://github.com/virtio-win/virtio-win-pkg-scripts).
- **cloud-init** 26.2 (27/07/2026) et **cloudbase-init** 1.1.9 (08/10/2026), l'équivalent de cloud-init pour Windows — [tags cloud-init](https://github.com/canonical/cloud-init/tags) ; [tags cloudbase-init](https://github.com/cloudbase/cloudbase-init/tags).
- **Agent invité QEMU (QGA)** : commandes `guest-exec`, `guest-file-open`, `guest-file-write`, `guest-network-get-interfaces`, `guest-get-osinfo` et `guest-shutdown` — [qga/qapi-schema.json](https://gitlab.com/qemu-project/qemu/-/blob/master/qga/qapi-schema.json).
- **Bibliothèques Rust de pilotage** :
  - `qapi` (qapi-rs, MIT ; v0.15.0 du 09/09/2024) offre des types pour QMP et pour l'agent invité, via les features `qmp` et `qga`, avec exemples tokio asynchrones — [README](https://github.com/arcnmx/qapi-rs) ; [COPYING](https://github.com/arcnmx/qapi-rs/blob/main/COPYING) ;
  - `russh` (Apache-2.0 ; v0.65.1 du 03/11/2026) — [tags](https://github.com/Eugeny/russh/tags) ; [LICENSE](https://github.com/Eugeny/russh/blob/main/LICENSE.txt).
- **Windows Server 2025.** OpenSSH y est « Installed but not enabled » : il faut démarrer et configurer le service — [Microsoft Learn, OpenSSH](https://learn.microsoft.com/windows-server/administration/openssh/openssh_install_firstuse) ; [vue d'ensemble](https://learn.microsoft.com/en-ca/windows-server/administration/openssh/openssh_overview).
- **AutomatedLab** (PowerShell). Labs sur Hyper-V ou Azure à partir des ISO (contrôleur de domaine, autorité de certification…). Hôtes Windows Server 2012 R2+ ou Windows 8.1+ ; « ISO files for all operating systems (Hyper-V only) » — [README](https://github.com/AutomatedLab/AutomatedLab).
- **GOAD** (Orange Cyberdefense). Labs AD vulnérables : GOAD (5 VM, 2 forêts, 3 domaines), GOAD-Light (3 VM), MINILAB (2 VM), SCCM, NHA et DRACARYS. Ils utilisent des Windows d'évaluation de 180 jours — [README GOAD](https://github.com/Orange-Cyberdefense/GOAD).
- **Ludus** (AGPL-3.0). Transforme un hôte Debian 12 en hôte Ludus sur Proxmox, avec 13 templates Packer (HCL ou JSON), déploiement de rôles Ansible et un « virtual Active Directory network with a few simple commands » — [README](https://gitlab.com/badsectorlabs/ludus) ; [LICENSE](https://gitlab.com/badsectorlabs/ludus/-/blob/main/LICENSE).
- **netlab** génère l'inventaire Ansible et collecte les configurations via Ansible — [README netlab](https://github.com/ipspace/netlab).
- **Consoles graphiques embarquables** :
  - **IronRDP** (Rust ; fichier LICENSE-APACHE) : implémentation modulaire de RDP pour clients natifs, **WebAssembly** et .NET — [README](https://github.com/Devolutions/IronRDP) ;
  - **noVNC** v1.7.0 (28/04/2026) — [tags](https://github.com/novnc/noVNC/tags).

### Inferences
- **Pipeline « image dorée » proposé (V1, en Rust, sans Packer)** :
  1. l'utilisateur fournit l'ISO, ou l'application ouvre le lien d'évaluation Microsoft, l'utilisateur acceptant les conditions ;
  2. l'application génère `autounattend.xml` (partitions, langue fr-FR, mot de passe, `FirstLogonCommands` pour activer `sshd`, installer `qemu-ga` et les pilotes virtio depuis l'ISO virtio-win) sur une petite ISO Joliet ;
  3. QEMU démarre avec trois lecteurs (ISO Windows, ISO virtio-win, ISO de réponse) ;
  4. l'application attend que l'agent invité réponde (`guest-ping`, `guest-get-osinfo`) ;
  5. elle exécute sysprep si besoin, puis fige l'image en qcow2 en lecture seule.

  C'est le schéma de Lima 2.2 et de dockur. Pour Linux : images cloud et ISO NoCloud `cidata` (cloud-init).
- **Canal d'exécution pour l'IA, par ordre de robustesse** :
  1. **l'agent invité QEMU** (`guest-exec`, lecture et écriture de fichiers), qui fonctionne même quand l'exercice a « cassé » le réseau, ce qui est essentiel pour l'injection de pannes et la vérification d'état ;
  2. **SSH** via russh (Linux, et Windows Server 2025 une fois sshd activé, avec PowerShell distant) ;
  3. **WinRM** ou Ansible (dans la VM d'appoint) pour les rôles AD complexes, en s'inspirant des rôles GOAD et Ludus.
- **Licences.** Ludus (AGPL) et GOAD servent de références de scénarios. Il vaut mieux réécrire les rôles nécessaires qu'intégrer du code AGPL dans un binaire distribué sous une autre licence. Packer (BSL) peut rester un outil optionnel que l'utilisateur installe lui-même.

### Gaps
- **Rust et WinRM/PSRP** : aucune bibliothèque Rust maintenue n'a été vérifiée.
- **Vagrant** : il n'est pas établi quelle release porte la licence MIT visible sur main (la v2.4.9 est antérieure au changement de copyright 2026).
- **PowerShell Direct (Hyper-V), `vmrun runProgramInGuest` (VMware) et `VBoxManage guestcontrol`** : non revérifiés dans cette session.
- **Conditions de redistribution** des ISO et VHD d'évaluation Microsoft : non vérifiées. Il faut partir du principe que l'utilisateur télécharge lui-même.

---

## 7. Briques par composant : WiFi simulé, stockage (iSCSI/NAS/objet), OS réseau, pare-feu, Kubernetes léger, hyperviseurs imbriqués

### Takeaway
Tout l'essentiel existe en logiciel libre dans la VM Linux d'appoint, et le noyau WSL 6.18 contient déjà mac80211_hwsim, LIO, OVS et netem. vwifi (LGPL-3.0) relie mac80211_hwsim entre VM.

Les appliances lourdes ont leur place dans le tier distant ou en lancement à la demande : TrueNAS (≥ 8 Go de RAM recommandés), OPNsense (3 à 4 Go), pfSense CE (installeur en ligne obligatoire). MinIO n'est plus maintenu ; ses remplaçants sont RustFS (Apache-2.0, 1.0), Garage (AGPL), SeaweedFS et le S3 intégré d'Incus.

### Cited Findings

#### WiFi simulé
- **Modules WiFi du noyau WSL 6.18** : `CONFIG_MAC80211_HWSIM=m`, `CONFIG_MAC80211=m` et `CONFIG_CFG80211=m` — [config-wsl](https://github.com/microsoft/WSL2-Linux-Kernel/blob/linux-msft-wsl-6.18.y/arch/x86/configs/config-wsl).
- **vwifi** (LGPL-3.0 ; v7.1 du 06/04/2026) — [README vwifi](https://github.com/Raizo62/vwifi) ; [LICENSE](https://github.com/Raizo62/vwifi/blob/master/LICENSE.md) ; [tags](https://github.com/Raizo62/vwifi/tags) :
  - simule le 802.11 entre VM Linux sous QEMU, VirtualBox, VMware, Hyper-V et GNS3 ;
  - `vwifi-client` tourne dans chaque VM sur `mac80211_hwsim` ; `vwifi-server` tourne sur l'hôte ;
  - transport VHOST (vsock) par défaut, ou TCP sur un réseau distinct du WiFi simulé ;
  - option de perte de paquets ; mobilité dans GNS3 ;
  - exemples de configurations hostapd et wpa_supplicant.
- **Mininet-WiFi** s'appuie sur les modules noyau de l'hôte (conteneur `--privileged`, `/lib/modules` monté) et sur wmediumd. Dernier tag : 2.4.3 (2020) — [README](https://github.com/intrig-unicamp/mininet-wifi) ; [tags](https://github.com/intrig-unicamp/mininet-wifi/tags).
- **FreeRADIUS** : tag `release_3_2_10` du 03/06/2026 — [tags](https://github.com/FreeRADIUS/freeradius-server/tags).

#### Stockage
- **iSCSI (LIO).** Le noyau WSL a `CONFIG_TARGET_CORE=m`, `CONFIG_ISCSI_TARGET=m` et `CONFIG_TCM_USER2=m`, ainsi que `CONFIG_NFSD=m` pour NFS — [config-wsl](https://github.com/microsoft/WSL2-Linux-Kernel/blob/linux-msft-wsl-6.18.y/arch/x86/configs/config-wsl). targetcli-fb est en v3.0.2 (06/01/2026) — [tags](https://github.com/open-iscsi/targetcli-fb/tags).
- **TrueNAS.**
  - La version 26 a eu sa première bêta en avril 2026. Le guide matériel recommande au moins 8 Go de RAM pour un usage de base, jusqu'à 8 disques — [blog TrueNAS 26](https://www.truenas.com/blog/blog-truenas-26-beta1-release) ; [guide matériel 26](https://www.truenas.com/docs/scale/26/gettingstarted/tnhardwareguide/).
  - Un tag `TS-27.0.0-RC.1` (01/10/2026) existe dans le dépôt middleware — [tags middleware](https://github.com/truenas/middleware/tags).
  - Incus 7.0 propose un pilote de stockage TrueNAS — [Linuxiac](https://linuxiac.com/incus-7-0-lts-container-and-virtual-machine-manager-released/).
- **Stockage objet.**
  - **MinIO** : « THIS REPOSITORY IS NO LONGER MAINTAINED ». L'éditeur renvoie vers « AIStor Free » et « AIStor Enterprise ». Dernier tag communautaire : RELEASE.2025-10-15 — [README MinIO](https://github.com/minio/minio) ; [tags](https://github.com/minio/minio/tags).
  - **RustFS** (Apache-2.0) : 1.0.0 (16/09/2026), 1.0.5 (09/11/2026), mode distribué disponible — [README](https://github.com/rustfs/rustfs) ; [tags](https://github.com/rustfs/rustfs/tags).
  - **Garage** (AGPL-3.0) : v2.5.0 (23/10/2026) — [LICENSE](https://github.com/deuxfleurs-org/garage/blob/master/LICENSE) ; [tags](https://github.com/deuxfleurs-org/garage/tags).
  - **SeaweedFS** 4.53 (08/11/2026) — [tags](https://github.com/seaweedfs/seaweedfs/tags).
  - **versitygw** v1.11.0 (06/11/2026) — [tags](https://github.com/versity/versitygw/tags).
  - **Incus 7.0** intègre des buckets S3 de base qui remplacent MinIO — [Linuxiac](https://linuxiac.com/incus-7-0-lts-container-and-virtual-machine-manager-released/).

#### OS réseau
- **FRR** : frr-10.7.1 (25/08/2026) — [tags](https://github.com/FRRouting/frr/tags).
- **Nokia SR Linux** : conteneur gratuit (`docker pull ghcr.io/nokia/srlinux`) ; image native ARM64 en « preview » — [srl.md](https://github.com/srl-labs/containerlab/blob/main/docs/manual/kinds/srl.md).
- **Images ARM64 pour Mac** : Arista cEOS, FRR et Juniper cRPD existent en ARM64. Les images x86 cEOS et Cisco IOL fonctionnent sous Rosetta. Les images vrnetlab exigent M3+ et macOS 15 — [macos.md](https://github.com/srl-labs/containerlab/blob/main/docs/macos.md).
- **MikroTik CHR** : image officielle `mikrotik/chr` sur Docker Hub (QEMU, Alpine et disque CHR dans un conteneur), kind `mikrotik_chr` depuis containerlab 0.82 ; ou via vrnetlab (`mikrotik_ros`) — [mikrotik_chr.md](https://github.com/srl-labs/containerlab/blob/main/docs/manual/kinds/mikrotik_chr.md) ; [rn/0.83.md](https://github.com/srl-labs/containerlab/blob/main/docs/rn/0.83.md).
- **Autres kinds containerlab documentés** : SONiC (`sonic-vs`, `sonic-vm`), Fortinet FortiGate, FreeBSD, OpenBSD, Cisco IOL, cEOS — [arborescence docs/manual/kinds](https://github.com/srl-labs/containerlab/tree/main/docs/manual/kinds).
- **OpenWrt** v25.12.6 (18/10/2026) et **Open vSwitch** v4.0.0 (17/08/2026) — [tags OpenWrt](https://github.com/openwrt/openwrt/tags) ; [tags OVS](https://github.com/openvswitch/ovs/tags).

#### Pare-feu
- **OPNsense** : 26.7.9 (11/11/2026) ; un tag bêta 27.1 existe — [tags opnsense/core](https://github.com/opnsense/core/tags). Exigences de la doc — [hardware.rst](https://github.com/opnsense/docs/blob/master/source/manual/hardware.rst) :
  - minimum : CPU double cœur 1 GHz, 3 Go de RAM (image nano sur SD ou CF) ;
  - configuration suivante : 4 Go de RAM et SSD de 40 Go ;
  - l'installeur demande au moins 3 Go de mémoire.
- **pfSense CE 2.8** : pas d'ISO hors ligne officielle, seulement le « Netgate Installer » qui télécharge le logiciel pendant l'installation. Des utilisateurs se rabattent sur l'ISO hors ligne 2.7.2, mise à jour ensuite — [forum Netgate](https://forum.netgate.com/topic/197601/pfsense-2-8-0-full-iso-img?page=4) ; [post](https://forum.netgate.com/post/1220685). Paquet REST tiers pfrest/pfsense-api : v2.11.0 (01/11/2026) — [tags](https://github.com/jaredhendrickson13/pfsense-api/tags).

#### Kubernetes léger
- **k3s** v1.37.2+k3s1 (29/10/2026). Minimum : serveur 2 cœurs et 2 Go, agent 1 cœur et 512 Mo — [requirements.md](https://github.com/k3s-io/docs/blob/main/docs/installation/requirements.md) ; [tags](https://github.com/k3s-io/k3s/tags).
- **kind** v0.33.0 (26/08/2026), **minikube** v1.39.0 (02/09/2026), **Talos** v1.14.6 (11/11/2026) — [tags kind](https://github.com/kubernetes-sigs/kind/tags) ; [tags minikube](https://github.com/kubernetes/minikube/tags) ; [tags Talos](https://github.com/siderolabs/talos/tags).

#### Hyperviseurs imbriqués
- **Proxmox VE 9.1** (19/11/2025) : Debian 13.2 et noyau 6.17.2 ; QEMU 10.1.2, LXC 6.0.5, ZFS 2.3.4. Nouveautés : drapeau vCPU pour contrôler finement la virtualisation imbriquée, création de LXC depuis des images OCI (préversion technique) et Intel TDX — [Proxmox](https://proxmox.com/de/services/training-kurse/videos/proxmox-virtual-environment/whats-new-in-proxmox-ve-9-1) ; [forum](https://forum.proxmox.com/threads/proxmox-virtual-environment-9-1-available.176254/).
- **ESXi gratuit** : de retour avec ESXi 8.0 Update 3e (avril 2025), téléchargeable avec un compte Broadcom, sans support — [Virtualization Review](https://virtualizationreview.com/articles/2025/04/18/esxi-is-free-again.aspx) ; [VirtualizationHowto](https://www.virtualizationhowto.com/2025/04/vmware-esxi-free-edition-available-again-with-8-0u3e-dow).
- **Hyper-V imbriqué** : prérequis Intel/AMD détaillés en section 1 — [Microsoft Learn](https://learn.microsoft.com/ms-my/windows-server/virtualization/hyper-v/enable-nested-virtualization).
- **Alternatives Linux à AD** : Samba 4.25.1 (23/10/2026) et FreeIPA 4.13.5 (09/11/2026) — [tags Samba](https://github.com/samba-team/samba/tags) ; [tags FreeIPA](https://github.com/freeipa/freeipa/tags).

### Inferences
- **WiFi** :
  - placer hostapd (AP), wpa_supplicant (clients), FreeRADIUS (802.1X/EAP) et vwifi (pour relier des VM) dans la VM d'appoint, en conteneurs, avec des radios `mac80211_hwsim` ;
  - les clients Windows ne peuvent pas utiliser hwsim. Pour enseigner 802.1X à des postes Windows, la voie réaliste est le **802.1X filaire** (authentificateur hostapd en mode filaire, ou un switch virtuel), à valider ;
  - Packet Tracer reste utile pour le WiFi « Cisco WLC ».
- **Stockage** :
  - SAN = LIO/targetcli dans la VM d'appoint, ou le rôle « iSCSI Target Server » de Windows Server ;
  - NAS = Samba et NFS dans des conteneurs ;
  - objet = RustFS (licence permissive) ou Garage ;
  - TrueNAS seulement dans le tier distant ou pour des labs « NAS » dédiés.
- **Pare-feu** :
  - **OPNsense** (2 vCPU, 3 à 4 Go) est le meilleur candidat local, grâce à son API REST et à son installation hors ligne ;
  - **pfSense CE** pose problème, car son installeur exige Internet ; c'est gênant pour un lab isolé ;
  - **nftables ou VyOS** en conteneur suffisent pour les bases.
- **AD sur Mac ARM** : Samba AD DC (arm64) permet des TP d'annuaire compatibles avec les outils RSAT, mais pas d'administrer un « vrai » Windows Server. À valider pédagogiquement face au référentiel de l'examen.
- **Kubernetes** : k3s (2 Go côté serveur) ou kind dans la VM d'appoint suffisent.
- **Proxmox ou Hyper-V imbriqués** : en local seulement si la machine a 16 Go ou plus et l'imbrication (WSL2 sous Windows 11, KVM sous Linux). Sinon, tier distant.

### Gaps
- **Version actuelle de hostapd/wpa_supplicant** et syntaxe exacte du mode « wired » : non vérifiées (recherche épuisée).
- **VyOS** (images « Stream » ou rolling gratuites en 2026) : non vérifié.
- **Licence gratuite de MikroTik CHR** (limitation de débit) : non revérifiée dans cette session.
- **Prérequis d'ESXi 8 ou 9 imbriqué** (NIC vmxnet3, imbrication sous KVM/AMD) : non vérifiés. Existence d'une édition gratuite d'ESXi 9 : inconnue.
- **Exigence RAM officielle de TrueNAS 27** : non trouvée.

---

## 8. Tier navigateur « zéro installation » (v86, JSLinux, WebVM/CheerpX, container2wasm ; réseau entre VM navigateur)

### Takeaway
Ce tier n'est viable que pour de petits labs Linux :
- **v86** (BSD-2) émule du x86 32 bits sans multicœur ; il dispose d'un backend réseau « inbrowser » qui relie plusieurs VM du même navigateur sans serveur ;
- **container2wasm** (Apache-2.0) exécute des conteneurs x86_64 par émulation (Bochs), avec un réseau via gvisor-tap-vsock compilé pour le navigateur ;
- **WebVM** repose sur CheerpX, dont l'usage par des organisations, **y compris académiques**, exige une licence.

### Cited Findings
- **v86** — [README v86](https://github.com/copy/v86) ; [LICENSE/README](https://github.com/copy/v86#license) ; [tags](https://github.com/copy/v86/tags) :
  - licence « Simplified BSD License » ;
  - émule un CPU x86 avec SSE3 complet ; il manque notamment le **multicœur** et les **extensions 64 bits** ;
  - cartes réseau NE2000 et virtio-net ;
  - profils de démonstration (Windows 98/2000, Linux) ;
  - pas de version numérotée récente : tags « 0.5 » (25/03/2025) et « latest » (30/10/2026).
- **Backends réseau de v86** — [networking.md](https://github.com/copy/v86/blob/master/docs/networking.md) :
  - `inbrowser` fournit des « raw ethernet services for multiple v86 guests running within the same browser process » via l'API BroadcastChannel, sans proxy ;
  - `wsproxy` (relais WebSocket) ;
  - `wisp` ;
  - `fetch` (proxy CORS).
- **container2wasm** (Apache-2.0 ; v0.8.5 du 04/11/2026) — [README](https://github.com/container2wasm/container2wasm) ; [LICENSE](https://github.com/container2wasm/container2wasm/blob/main/LICENSE) ; [tags](https://github.com/container2wasm/container2wasm/tags) :
  - convertit une image de conteneur en WASM en émulant Bochs (x86_64), TinyEMU (riscv64) ou QEMU (aarch64) ;
  - s'exécute sur des runtimes WASI ou dans le navigateur ;
  - réseau via `c2w-net-proxy`, basé sur gvisor-tap-vsock et exécuté dans le navigateur, ou délégué à `c2w-net` par WebSocket.
- **WebVM** — [README WebVM](https://github.com/leaningtech/webvm) :
  - le dépôt est sous Apache-2.0 ;
  - le déploiement public de **CheerpX** est « free to use for technological exploration, testing and use by individuals. Any other use by organizations, including non-profit, academia and the public sector, requires a license » ;
  - réseau via Tailscale, sans ICMP (`ping` indisponible).

### Inferences
- **Un mode « démo / révision » dans le navigateur** (réutilisable dans l'application Tauri, dont la WebView exécute du WASM) se construirait ainsi : v86 avec un petit Linux (Buildroot/Alpine 32 bits) et le backend `inbrowser` pour des TP réseau de base entre plusieurs VM du même onglet. container2wasm conviendrait pour un conteneur x86_64 isolé, lent mais 64 bits.
- **Pour relier des VM navigateur entre machines**, la voie naturelle est un relais d'Ethernet sur WebRTC, en réutilisant la pile Nostr/WebRTC d'Open-Contact pour la signalisation : les trames v86 seraient transportées par data channels. Aucun produit existant ne le fait ; c'est un développement spécifique.
- **WebVM/CheerpX est à éviter** pour un outil destiné à des centres de formation (licence organisationnelle).

### Gaps
- **JSLinux et TinyEMU** (licence, réseau) : non vérifiés (recherche épuisée).
- **Performances mesurées** de container2wasm (Bochs) : non trouvées.
- **QEMU compilé en WebAssembly en amont** : non confirmé (aucune mention trouvée dans `build-platforms.rst`).

---

## 9. Tier distant lourd (API Proxmox VE, Incus/LXD distant, libvirt distant) et formats « lab-as-code »

### Takeaway
Pour l'étudiant, le tier distant le plus éprouvé est Proxmox VE 9.x, piloté par son API REST et par le fournisseur Terraform/OpenTofu `bpg/proxmox` (MPL-2.0, très actif). Ludus montre la chaîne complète Proxmox + Packer + Ansible pour des labs AD, mais il est sous AGPL. Incus 7.0 LTS est l'alternative qui réunit conteneurs et VM derrière une API distante unique.

### Cited Findings
- **Proxmox VE 9.1** : voir section 7 pour les composants et nouveautés — [Proxmox](https://proxmox.com/de/services/training-kurse/videos/proxmox-virtual-environment/whats-new-in-proxmox-ve-9-1).
- **Fournisseurs Terraform/OpenTofu pour Proxmox** :
  - `bpg/proxmox` v0.122.0 (11/11/2026), MPL-2.0 — [README](https://github.com/bpg/terraform-provider-proxmox) ; [LICENSE](https://github.com/bpg/terraform-provider-proxmox/blob/main/LICENSE) ; [tags](https://github.com/bpg/terraform-provider-proxmox/tags) ;
  - `Telmate/proxmox` : toujours en release candidate (`v3.0.2-rc10`), dernière stable v2.9.14 (2023) — [tags](https://github.com/Telmate/terraform-provider-proxmox/tags).
- **OpenTofu** v1.13.9 (05/11/2026) — [tags](https://github.com/opentofu/opentofu/tags).
- **libvirt** v12.9.0 (02/11/2026) ; libvirt-rust v0.5.0 (29/10/2026) ; terraform-provider-libvirt v0.9.9 (30/08/2026) — [tags libvirt](https://github.com/libvirt/libvirt/tags) ; [libvirt-rust](https://github.com/libvirt/libvirt-rust/tags) ; [provider](https://github.com/dmacvicar/terraform-provider-libvirt/tags).
- **Incus distant** : démon Linux uniquement, client sur les autres OS, API REST avec spécification OpenAPI ; terraform-provider-incus v1.2.1 (14/10/2026) — [installing.md](https://github.com/lxc/incus/blob/main/doc/installing.md) ; [rest-api.md](https://github.com/lxc/incus/blob/main/doc/rest-api.md) ; [tags provider](https://github.com/lxc/terraform-provider-incus/tags).
- **Ludus** (AGPL-3.0) : Proxmox, Packer, Ansible, mode test avec snapshots — [README](https://gitlab.com/badsectorlabs/ludus).
- **Formats « lab-as-code » rencontrés** :
  - topologie YAML de containerlab — [vrnetlab.md](https://github.com/srl-labs/containerlab/blob/main/docs/manual/vrnetlab.md) ;
  - YAML de netlab (génère containerlab ou Vagrantfile + Ansible) — [README netlab](https://github.com/ipspace/netlab) ;
  - templates Packer HCL (rgl/windows-vagrant, Ludus) — [rgl](https://github.com/rgl/windows-vagrant) ;
  - Terraform/OpenTofu (bpg, libvirt, incus) ;
  - Kathará (format Netkit) — [Kathará](https://github.com/KatharaFramework/Kathara) ;
  - templates YAML de Lima — [template Windows](https://github.com/lima-vm/lima/blob/master/templates/windows-2025.yaml) ;
  - topologies clabernetes sur Kubernetes — [clabernetes](https://github.com/srl-labs/clabernetes).

### Inferences
- **En V1**, l'application parle directement à l'API REST de Proxmox (jetons d'API, `reqwest` en Rust) pour quelques opérations : cloner depuis un template, démarrer et arrêter, snapshot et rollback, console. Terraform/OpenTofu reste un export optionnel du lab, de type « lab-as-code ».
- **Format pivot** : le YAML de l'application (style containerlab). Des exporteurs secondaires sont possibles : containerlab pur pour la partie réseau, Terraform `bpg` pour Proxmox.
- **Ressources « sans budget »** : un PC recyclé sous Proxmox chez l'étudiant ou un serveur de l'organisme de formation. Ce point a été traité par une recherche antérieure et n'a pas été revérifié ici.

### Gaps
- **Version de Proxmox VE à jour au 13/11/2026** (une 9.2 ou plus existe-t-elle ?) : non vérifiée.
- **Clients Rust de l'API Proxmox** (crates officiels Proxmox sous AGPL, crates communautaires) : non vérifiés.
- **Proxmox Datacenter Manager** : non vérifié.

---

## 10. Connecteurs vers les outils externes (VMware Workstation, Hyper-V, VirtualBox, GNS3, EVE-NG, Cisco Modeling Labs, Packet Tracer)

### Takeaway
Chaque outil externe expose une surface scriptable :
- VMware Workstation : `vmrest` (REST), `vmrun`, `vmcli` et `dictTool` en 25H2 ;
- Hyper-V : PowerShell et HCS ;
- VirtualBox : `VBoxManage` ;
- GNS3 : REST ;
- EVE-NG : REST, plus la bibliothèque `evengsdk` ;
- CML : REST, plus `virl2-client` ; l'offre Free est limitée à 5 nœuds.

Packet Tracer 9 se pilote soit par son canal officiel IPC/PTMP (celui des « ExApps »), soit par un module de script PTBuilder qui interroge un pont HTTP local. Plusieurs serveurs MCP sous licence MIT ou BSD le font déjà.

### Cited Findings
- **VMware Workstation Pro 25H2** (octobre 2025) : nouvelle nomenclature et nouvel utilitaire CLI `dictTool` pour inspecter et éditer les `.vmx` — [Virtualization Review](https://virtualizationreview.com/Articles/2025/10/27/VMware-Workstation-25H2--A-New-Name-and-Era-for-VMware-Workstation.aspx) ; [Neowin](https://www.neowin.net/news/vmware-workstation-pro-25h2-is-out-with-new-command-line-tool-usb-32-support-and-more/) ; [WindowsPro](https://www.windowspro.de/news/vmware-workstation-25h2-erweiterter-linux-usb-support-neues-cli-tool/05984.html).
  - **vmrest** : identifiants créés avec `vmrest.exe -C` (vmrest 1.3.1 signalé) ; le service REST dépend du processus vmrest ; l'accès distant exige HTTPS — [doc VMware](https://docs.vmware.com/en/VMware-Workstation-Pro/17/com.vmware.ws.using.doc/GUID-9FAAA4DD-1320-450D-B684-2845B311640F.html) ; [serveur MCP PyPI](https://pypi.org/project/vmware-workstation-pro-mcp-server).
  - **vmcli** : un serveur MCP tiers signale que `vmcli.exe` (26.x) lit son mot de passe en console interactive et recommande REST et `vmrun` pour les scripts. Source unique, non officielle — [vmware-mcp (Glama)](https://glama.ai/mcp/servers/omichelbraga/vmware-mcp).
  - **Gratuité** : Workstation Pro serait gratuit avec un compte Broadcom, pour un usage personnel et commercial. Source secondaire unique — [VirtualizationHowto](https://www.virtualizationhowto.com/tag/vmware-esxi-free/).
- **Hyper-V** :
  - imbrication via `Set-VMProcessor -ExposeVirtualizationExtensions $true` (VM éteinte) — [Microsoft Learn](https://learn.microsoft.com/ms-my/windows-server/virtualization/hyper-v/enable-nested-virtualization) ;
  - l'API HCS est utilisée par Lima (`hcs`) et Multipass — [doc hcs](https://github.com/lima-vm/lima/blob/master/website/content/en/docs/config/vmtype/hcs.md) ; [Multipass](https://github.com/canonical/multipass) ;
  - Podman propose un fournisseur `hyperv` — [podman-machine.1.md](https://github.com/containers/podman/blob/main/docs/source/markdown/podman-machine.1.md).
- **VirtualBox** :
  - 7.2.0 (août 2025) : correctif de virtualisation imbriquée sur Intel, AVX/AVX2 pour les hôtes adossés à Hyper-V — [notes Oracle 7.2](https://docs.oracle.com/en/virtualization/virtualbox/7.2/relnotes/EN-VBOX-7-2-RELNOTES.pdf) ; [UbuntuHandbook](https://ubuntuhandbook.org/index.php/2025/08/virtualbox-7-2-0-released/) ;
  - 7.2.14 (2026) : ajustement de l'imbrication Hyper-V sur processeurs anciens, selon une source secondaire — [Linux Compatible](https://www.linuxcompatible.org/story/oracle-releases-virtualbox-7214-with-windows-11-secure-boot-crash-fix/).
- **GNS3** : API REST entre le serveur et les clients GUI et Web UI ; serveur v3.0.6 stable, 3.1 en alpha — [README](https://github.com/GNS3/gns3-server) ; [tags](https://github.com/GNS3/gns3-server/tags).
- **EVE-NG** : `evengsdk` (MIT) est une « Open source library and command line utilities to work with the EVE-NG REST API » — [README evengsdk](https://github.com/ttafsir/evengsdk) ; [LICENSE](https://github.com/ttafsir/evengsdk/blob/master/LICENSE).
- **Cisco Modeling Labs** :
  - **CML-Free** limite le nombre de nœuds, sans compter les « Unmanaged Switch » ni les « External Connector » ; la doc 2.8 indique 5 nœuds simultanés — [CML-Free](https://developer.cisco.com/docs/modeling-labs/cml-free/) ; [CML-Free 2.8](https://developer.cisco.com/docs/modeling-labs/2-8/cml-free/) ;
  - **CML 2.10** passe à une licence par utilisateur concurrent — [page produit Cisco](https://www.cisco.com/c/en/us/products/cloud-systems-management/modeling-labs/index.html) ;
  - **`virl2-client`** 2.10.1 (28/09/2026), Apache-2.0, Python ≥ 3.10 — [PyPI](https://pypi.org/project/virl2-client/).
- **Packet Tracer** : 9.0.0, build 9.0.0.0810, publiée officiellement ; 9.0 ajoute des équipements industriels (IE-3400, ISA-3000) — [packettracernetwork.com](https://www.packettracernetwork.com/features/packet-tracer-9-new-features.html) ; [communauté Cisco](https://community.cisco.com/t5/online-tools-and-resources/cisco-packet-tracer-9-0-new-features/td-p/5285503).
- **Serveurs MCP pour Packet Tracer et leur mode de connexion** :
  - **kiskander/pt-mcp-server** (partie MCP sous BSD-2-Clause) — [README](https://github.com/kiskander/pt-mcp-server) :
    - utilise l'interface d'applications externes de PT, « the IPC API over PTMP, the same channel Cisco's "ExApps" use » ;
    - enregistrement unique via *Extensions → IPC → Configure Apps… → Add* ; port 39000 ; clé partagée ;
    - testé sur macOS et Windows avec PT 9.0.1, en étant connecté à NetAcad ;
    - n'envoie que des appels IPC vérifiés ; l'appel brut est désactivé par défaut.
  - **Mats2208/MCP-Packet-Tracer** (MIT, Python) — [README](https://github.com/Mats2208/MCP-Packet-Tracer) ; [LICENSE](https://github.com/Mats2208/MCP-Packet-Tracer/blob/main/LICENSE) ; [fiche Glama](https://glama.ai/mcp/servers/Mats2208/MCP-Packet-Tracer) :
    - 111 outils ; pont HTTP authentifié sur 127.0.0.1:54321 ;
    - PT 8.2 ou plus, testé sur 9.0 et 9.0.1, sous Windows et macOS ;
    - « PKA Builder » pour générer des examens `.pka` ;
    - d'après sa fiche, le serveur génère du JavaScript pour l'API PTBuilder ; un module `.pts` (fork de PTBuilder) interroge `/next` toutes les 500 ms et exécute ce code dans PT.
  - **caixax/packet-tracer-mcp** : module `Builder-MCP.pts` modifié, connecté automatiquement au démarrage de PT — [dépôt](https://github.com/caixax/packet-tracer-mcp).
  - **jcorderop02/packet-tracer-mcp** (MIT, TypeScript/Bun, 57 outils, statut expérimental, PT 9.0.0.0810) : une extension `.pts` interroge un pont HTTP local, et le serveur appelle l'API IPC native pour écrire — [README](https://github.com/jcorderop02/packet-tracer-mcp).

### Inferences
- **Priorité V1** : Packet Tracer (pédagogie Cisco) et CML-Free (vrai IOS, 5 nœuds).
  - **Packet Tracer** : l'approche IPC/PTMP de pt-mcp-server est la plus « officielle » et la plus robuste. Elle n'exige qu'un enregistrement unique et pas de script injecté. L'application peut soit faire tourner l'un de ces serveurs MCP comme outil de l'IA, soit réimplémenter un client PTMP en Rust en s'inspirant du code sous licence BSD.
  - **CML-Free** : client REST direct, ou `virl2-client` dans la VM d'appoint.
- **VMware Workstation** n'est utile que pour l'ESXi imbriqué sous Windows (V2), via `vmrest` et `vmrun`, en évitant `vmcli` pour l'automatisation. Hyper-V et VirtualBox servent plutôt de cibles d'export ou d'import que de moteurs.
- **Point de vigilance** : Packet Tracer exige d'être connecté à NetAcad et n'est pas redistribuable ; l'utilisateur l'installe lui-même.

### Gaps
- **Documentation officielle Cisco de l'IPC/PTMP** pour PT 9 : non trouvée ; connue seulement via les projets tiers.
- **Endpoints exacts de vmrest 25H2** et existence d'une « Workstation 26 » : non vérifiés (sources contradictoires).
- **API REST d'EVE-NG** (Community ou Pro, authentification) : seulement via evengsdk.
- **Détail de l'API v3 de GNS3** (authentification, contrôleur) : non vérifié.
- **Limite exacte de CML-Free en 2.10** : la doc courante ne donne pas le chiffre dans l'extrait lu.

---

## 11. Pile recommandée : première version (V1, avant l'examen de juillet 2027) et versions ultérieures

### Takeaway
**V1** = une application Tauri 2 (Rust) qui sert de plan de contrôle et pilote une VM Linux d'appoint unique (le « fabric ») :
- sous Windows 11 : une distribution WSL2 propre à l'application ;
- sous macOS : une VM Lima/vz ;
- sous Linux : le système hôte.

Cette VM contient containerlab, un moteur de conteneurs, QEMU/KVM, OVS/netem, vwifi/hostapd/FreeRADIUS et LIO. Les VM Windows Server sont construites automatiquement depuis l'ISO de l'utilisateur (autounattend + virtio-win + agent invité QEMU) et pilotées par QMP/QGA et SSH. Les labs lourds vont sur Proxmox, et Packet Tracer et CML sont raccordés par connecteurs.

**Plus tard (V2 et au-delà)** : HCS/Hyper-V natif, API WSL Containers, Incus, micro-VM Firecracker, tier navigateur v86 et labs P2P.

### Cited Findings

#### Faits clés qui fondent le choix
- WSL2 offre KVM imbriqué par défaut sous Windows 11. Son noyau 6.18 contient KVM, mac80211_hwsim, LIO, OVS, netem, VXLAN, veth et bridge — [wsl-config.md](https://github.com/MicrosoftDocs/WSL/blob/main/WSL/wsl-config.md) ; [config-wsl](https://github.com/microsoft/WSL2-Linux-Kernel/blob/linux-msft-wsl-6.18.y/arch/x86/configs/config-wsl).
- containerlab recommande WSL sous Windows et exécute les NOS VM seulement sous Windows 11 — [windows.md](https://github.com/srl-labs/containerlab/blob/main/docs/windows.md) ; [WSL-Containerlab](https://github.com/srl-labs/wsl-containerlab).
- Lima choisit WHPX, HVF ou KVM, fait tourner Windows Server 2025 sans intervention et propose WSL2/HCS sous Windows — [qemu.go](https://github.com/lima-vm/lima/blob/master/pkg/driver/qemu/qemu.go) ; [doc Windows](https://github.com/lima-vm/lima/blob/master/website/content/en/docs/usage/guests/windows.md).
- bollard (Docker et Podman, named pipes Windows), qapi-rs (QMP et agent invité), russh et IronRDP (RDP en WASM) couvrent le pilotage en Rust — [bollard](https://github.com/fussybeaver/bollard) ; [qapi-rs](https://github.com/arcnmx/qapi-rs) ; [russh](https://github.com/Eugeny/russh) ; [IronRDP](https://github.com/Devolutions/IronRDP).

#### Tableau de versions (dernier tag git stable, date du commit taggé, relevé le 13/11/2026)

| Brique | Version (date) | Licence vérifiée |
|---|---|---|
| QEMU | 11.1.3 (28/10/2026) ; 11.2 en rc | GPLv2 ([LICENSE](https://gitlab.com/qemu-project/qemu/-/blob/master/LICENSE)) |
| Lima | 2.3.0 (06/11/2026) | Apache-2.0 (en-têtes SPDX du code, [qemu_darwin_arm64.go](https://github.com/lima-vm/lima/blob/master/pkg/driver/qemu/qemu_darwin_arm64.go)) |
| Podman | 6.2.0 (10/11/2026) | non revérifiée |
| WSL | 3.0.5 (29/10/2026) | — ([tags](https://github.com/microsoft/WSL/tags)) |
| containerlab | 0.83.0 (06/11/2026) | BSD-3-Clause |
| clab-api-server | 0.10.0 (07/11/2026) | — |
| netlab | 26.10 (03/10/2026) | MIT |
| Incus | 7.6.0 (29/10/2026) ; LTS 7.0.2 | Apache-2.0 |
| Firecracker | 1.18.0 (05/11/2026) | Apache-2.0 |
| Cloud Hypervisor | 54.1 (10/11/2026) | non revérifiée |
| libkrun | 1.19.8 (06/11/2026) | Apache-2.0 |
| Apple container | 1.7.1 (06/11/2026) | Apache-2.0 |
| bollard | 0.21.1 (16/08/2026) | Apache-2.0 |
| russh | 0.65.1 (03/11/2026) | Apache-2.0 |
| qapi-rs | 0.15.0 (09/09/2024) | MIT |
| Open vSwitch | 4.0.0 (17/08/2026) | Apache-2.0 |
| CRIU | 4.3.1 (12/11/2026) | — |
| vwifi | 7.1 (06/04/2026) | LGPL-3.0 |
| targetcli-fb | 3.0.2 (06/01/2026) | — |
| FRR | 10.7.1 (25/08/2026) | — |
| OPNsense | 26.7.9 (11/11/2026) | — |
| k3s | 1.37.2+k3s1 (29/10/2026) | — |
| RustFS | 1.0.5 (09/11/2026) | Apache-2.0 |
| Garage | 2.5.0 (23/10/2026) | AGPL-3.0 |
| container2wasm | 0.8.5 (04/11/2026) | Apache-2.0 |
| bpg/proxmox | 0.122.0 (11/11/2026) | MPL-2.0 |
| Packer | 1.16.2 (22/10/2026) | BSL 1.1 |
| virl2-client | 2.10.1 (28/09/2026) | Apache-2.0 |
| UTM | 5.0.8 (16/10/2026) | Apache-2.0 |
| Multipass | 1.17.1 (21/10/2026) | GPL-3.0 |
| GNS3 server | 3.0.6 (28/01/2026) | GPL-3.0 |
| Tauri (CLI) | 2.12.4 (21/10/2026) | — |

Sources des versions : pages de tags GitHub de chaque projet, par exemple [Lima](https://github.com/lima-vm/lima/tags), [containerlab](https://github.com/srl-labs/containerlab/tags), [QEMU](https://github.com/qemu/qemu/tags), [Incus](https://github.com/lxc/incus/tags), [Firecracker](https://github.com/firecracker-microvm/firecracker/tags).

### Inferences

#### V1 : périmètre réaliste pour un développeur solo d'ici l'été 2027, Windows 11 en priorité
1. **Plan de contrôle** :
   - application **Tauri 2.x** (la v3 est en alpha, donc à éviter) ;
   - format de lab **YAML style containerlab**, étendu avec des sections `vm`, `wifi`, `storage` et `faults` ;
   - état local (local-first) ;
   - **serveur MCP** de l'application exposant `deploy`, `inject_fault`, `check_state` et `reset`, sur le modèle de l'usage MCP de Lima et des serveurs MCP Packet Tracer.
2. **Moteur local Windows 11** :
   - une **distribution WSL2 dédiée**, rootfs `.tar` construit en CI et importé par l'application, comme WSL-Containerlab ou Finch ;
   - réglages `.wslconfig` : `nestedVirtualization=true` et `loadKernelModules` (`mac80211_hwsim`, `openvswitch`, `target_core_mod`, `iscsi_target_mod`, `sch_netem`…) ;
   - contenu de la distribution : containerd ou Docker Engine + containerlab (BSD-3) + images vrnetlab que l'utilisateur fournit + OVS/bridges/netem + QEMU/KVM + vwifi, hostapd, wpa_supplicant et FreeRADIUS + targetcli (LIO) + Samba/NFS + RustFS.
   - **Pilotage depuis Rust** : bollard pour les conteneurs ; qapi-rs pour QMP et l'agent invité QEMU ; russh pour SSH ; `wsl.exe -d <distro> --` en secours.
3. **Windows Server / AD (local)** :
   - voie A : QEMU/KVM **dans** WSL2 (imbrication), qui unifie réseau et snapshots ;
   - voie B : QEMU+WHPX **sur l'hôte** (comme Lima sous Windows), raccordé au fabric par `-netdev stream` ou `dgram`.
   - Les deux sont à **mesurer en semaine 1** (voir Gaps). Images dorées construites selon le pipeline de la section 6, avec reset par overlays qcow2.
4. **macOS Apple Silicon** : une VM d'appoint **Lima `vz`** arm64 avec le même contenu (images arm64 : FRR, SR Linux preview, cEOS et cRPD arm64, Alpine). Les Windows Server x86 et les NOS x86 en VM passent par le tier distant. Samba AD DC sert de repli pour les TP d'annuaire.
5. **Linux** : les mêmes composants directement sur l'hôte (KVM natif), ou dans une VM Lima/QEMU pour isoler.
6. **Tier distant** : Proxmox VE 9.x via son API REST (jetons). Templates construits avec le même pipeline, ou Packer si l'utilisateur l'installe. S'inspirer des scénarios Ludus et GOAD sans intégrer de code AGPL.
7. **Connecteurs V1** : Packet Tracer (IPC/PTMP, approche pt-mcp-server) et CML-Free (REST).
8. **Consoles** : xterm.js (série et SSH), noVNC (VNC de QEMU), IronRDP en WASM (RDP vers Windows), le tout dans la WebView Tauri.
9. **Budget de ressources** : profils de lab dimensionnés pour 8 Go et pour 16 Go, avec arrêt des nœuds inactifs. OPNsense (3 à 4 Go), contrôleur de domaine (2 à 4 Go) et TrueNAS (8 Go) ne peuvent pas tous tourner en même temps sur 8 Go.

#### Versions ultérieures (V2 et au-delà)
- **Windows** :
  - pilote **HCS/Hyper-V** natif pour les éditions Pro, inspiré du pilote `hcs` de Lima et de Multipass ;
  - **API WSL Containers** (C/FFI) pour des nœuds conteneurs sans VM gérée ;
  - **VMware Workstation** (vmrest/vmrun) pour l'ESXi imbriqué.
- **Unification** : **Incus 7.x** dans la VM d'appoint ou sur le nœud distant pour regrouper conteneurs système, conteneurs OCI, VM et snapshots ZFS/btrfs, avec le S3 intégré.
- **Nœuds rapides** : **Firecracker** ou **Cloud Hypervisor** dans la VM d'appoint pour des nœuds Linux à démarrage très court et snapshot/restore, plus gVisor ou Kata pour l'isolation dans les exercices de sécurité.
- **Navigateur** : tier zéro installation avec **v86** (`inbrowser`) et **container2wasm**, et un relais Ethernet sur WebRTC fondé sur la pile Nostr/WebRTC existante.
- **Labs collaboratifs** : interconnexion **P2P entre étudiants ou avec le formateur** par VXLAN sur WireGuard (modules présents dans WSL), avec signalisation Nostr.
- **Mac** : imbrication sur M3+ (QEMU ≥ 11.1 avec HVF, ou VZ) pour des NOS VM et un Proxmox ARM imbriqué.
- **Échelle** : clab-api-server ou clabernetes pour des labs multi-nœuds en salle de formation.

### Gaps
- **Mesures indispensables avant de figer la V1** :
  - performance d'un Windows Server 2025 sous QEMU/KVM imbriqué dans WSL2, comparée à QEMU/WHPX sur l'hôte (temps d'installation, temps de réponse du contrôleur de domaine) ;
  - empreinte RAM réelle de la distribution WSL d'appoint ;
  - taille de l'installeur.
- **Accès à l'imbrication** : est-il acceptable de réserver les labs « VM imbriquées » à Windows 11 avec virtualisation activée dans le BIOS ? Proportion de PC d'étudiants concernés : inconnue.
- **Licences non revérifiées** dans cette session : Podman, Cloud Hypervisor, noVNC (le fichier LICENSE.txt cite plusieurs licences), hostapd, FreeRADIUS, targetcli-fb, OPNsense.
- **Accès réseau** : cette session n'a pas pu consulter cncf.io, qemu.org et d'autres domaines par WebFetch, et le quota de recherche web a été épuisé. Une vérification complémentaire est recommandée pour VyOS, hostapd, MikroTik CHR, ESXi imbriqué, JSLinux, l'API v3 de GNS3 et l'API d'EVE-NG.
