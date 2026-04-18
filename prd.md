# Product Requirements Document
## Choose Your Lens — Interactive Portfolio Website

---

| Field | Detail |
|---|---|
| Nama Proyek | Choose Your Lens — Personal Interactive Portfolio |
| Versi | 1.0 |
| Tanggal | 18 April 2026 |
| Author | Rafif Alton |
| Status | Draft |
| Prioritas | Tinggi |

---

## Daftar Isi

1. [Overview & Visi Produk](#1-overview--visi-produk)
2. [Target Audience](#2-target-audience)
3. [Problem Statement](#3-problem-statement)
4. [Success Metrics](#4-success-metrics)
5. [Arsitektur Konsep](#5-arsitektur-konsep)
6. [Spesifikasi Persona](#6-spesifikasi-persona)
   - 6.1 [Web3 Lens](#61-web3-lens)
   - 6.2 [Cybersecurity Lens](#62-cybersecurity-lens)
   - 6.3 [Kehidupan Saya Lens](#63-kehidupan-saya-lens)
7. [UX Flow & Navigasi](#7-ux-flow--navigasi)
8. [Sistem Visual](#8-sistem-visual)
9. [Spesifikasi Teknis](#9-spesifikasi-teknis)
10. [Komponen & Fitur](#10-komponen--fitur)
11. [Konten & Copy Strategy](#11-konten--copy-strategy)
12. [Responsivitas & Aksesibilitas](#12-responsivitas--aksesibilitas)
13. [Performa & SEO](#13-performa--seo)
14. [Roadmap Implementasi](#14-roadmap-implementasi)
15. [Risiko & Mitigasi](#15-risiko--mitigasi)
16. [Out of Scope](#16-out-of-scope)

---

## 1. Overview & Visi Produk

### Deskripsi Singkat

"Choose Your Lens" adalah sebuah portofolio website personal yang menolak konvensi satu-tampilan-untuk-semua. Pengunjung diberikan kendali untuk memilih perspektif mana yang ingin mereka gunakan untuk mengenal pemiliknya. Setiap pilihan menghasilkan pengalaman yang berbeda secara menyeluruh: layout berbeda, tipografi berbeda, tone bahasa berbeda, interaksi berbeda, dan genre konten yang berbeda.

### Visi

Menciptakan portofolio yang terasa bukan seperti dokumen, tapi seperti pengalaman. Pengunjung yang datang dengan keperluan berbeda mendapatkan "versi" yang paling relevan, sehingga kesan yang ditinggalkan jauh lebih kuat dan spesifik dibandingkan portofolio generik.

### Proposisi Nilai

Kebanyakan portofolio mencoba menjawab semua pertanyaan dari semua orang secara bersamaan. Hasilnya: terlalu padat, tidak berkarakter, dan tidak meninggalkan kesan mendalam. "Choose Your Lens" mengakui bahwa identitas seseorang adalah multidimensional, dan memutuskan untuk merayakan itu secara eksplisit — bukan menyembunyikannya di balik satu halaman yang generic.

---

## 2. Target Audience

### Per Persona

**Web3 Lens**
- Rekruter atau hiring manager di perusahaan blockchain, DeFi protocol, atau Web3 startup
- Developer atau kontributor komunitas crypto yang ingin berkolaborasi
- Investor atau anggota komunitas yang ingin memverifikasi rekam jejak on-chain
- Karakteristik: familiar dengan terminologi blockchain, menghargai transparansi on-chain, kemungkinan besar membuka di laptop/desktop

**Cybersecurity Lens**
- Dosen atau peneliti di bidang keamanan informasi
- Security engineer atau penetration tester yang ingin berkolaborasi atau merekrut
- Perusahaan yang mencari freelance security assessor
- Karakteristik: technical-minded, menghargai presisi dan detail, skeptis terhadap klaim yang tidak didukung bukti

**Kehidupan Saya Lens**
- Teman, kenalan kampus, atau kolega informal
- Orang yang baru mengenal Rafif dari media sosial dan ingin mengenal lebih jauh
- Jurnalis atau blogger yang ingin tahu cerita di balik seseorang
- Karakteristik: tidak harus memiliki latar belakang teknikal, kemungkinan besar membuka di HP

---

## 3. Problem Statement

Portofolio konvensional memiliki beberapa masalah mendasar:

**Masalah 1 — Audiens yang terlalu beragam, konten yang terlalu kompromi.** Ketika mencoba berbicara ke semua orang, kamu tidak berbicara secara mendalam ke siapapun. Seorang rekruter Web3 dan seorang teman lama memiliki kebutuhan informasi yang sama sekali berbeda.

**Masalah 2 — Identitas multidimensional yang dipaksa menjadi satu narasi.** Seorang yang sekaligus aktif di Web3, mendalami cybersecurity, dan memiliki kehidupan personal yang kaya dipaksa memilih satu "judul" yang merepresentasikan semuanya — yang pada akhirnya tidak merepresentasikan apapun secara mendalam.

**Masalah 3 — Pengalaman yang pasif dan tidak memorable.** Kebanyakan portofolio dibaca, bukan dialami. Tidak ada alasan bagi pengunjung untuk mengingat satu portofolio dibanding yang lain kecuali karena kontennya — yang umumnya serupa.

**Solusi yang diajukan:** Membagi pengalaman menjadi tiga jalur paralel yang masing-masing dirancang secara khusus untuk audiens dan konteksnya. Pengunjung secara aktif memilih jalur mereka, menciptakan engagement yang lebih tinggi dan kesan yang lebih personal.

---

## 4. Success Metrics

### Kuantitatif

| Metrik | Target Minimum | Target Ideal |
|---|---|---|
| Average session duration | > 2 menit | > 3.5 menit |
| Bounce rate (entry screen) | < 50% | < 35% |
| Persona completion rate (scroll sampai contact) | > 40% | > 60% |
| Lighthouse Performance Score | > 85 | > 92 |
| Lighthouse Accessibility Score | > 88 | > 95 |
| Mobile usability (Google) | Pass | Pass |
| Time to Interactive (TTI) | < 3.5 detik | < 2 detik |

### Kualitatif

- Pengunjung memahami konsep "Choose Your Lens" tanpa instruksi tambahan dalam 5 detik pertama
- Setiap persona terasa kohesif dan memiliki identitas kuat yang tidak ambigu
- Tidak ada kebingungan saat berpindah antar persona
- Persona Kehidupan Saya terasa personal dan autentik, bukan performatif
- Persona Cybersecurity terasa presisi dan kredibel secara teknikal
- Persona Web3 terasa native bagi orang dalam komunitas, bukan surface-level

---

## 5. Arsitektur Konsep

### Struktur Halaman

```
/ (Lens Selection Screen)
├── /web3              → Web3 Lens
│   ├── #about
│   ├── #projects
│   ├── #skills
│   └── #contact
├── /cybersecurity     → Cybersecurity Lens
│   ├── #about
│   ├── #projects
│   ├── #skills
│   └── #contact
└── /life              → Kehidupan Saya Lens
    ├── #about
    ├── #journal
    ├── #interests
    └── #contact
```

### Filosofi Arsitektur

Ketiga persona berbagi satu codebase React tetapi memiliki komponen dan theme yang sepenuhnya independen. Tidak ada komponen yang di-share secara visual di antara persona — kalaupun ada komponen universal seperti "ContactSection", ia di-render dengan implementasi visual yang berbeda per persona. Ini memastikan bahwa penambahan atau perubahan di satu persona tidak berisiko merusak persona lain.

### State Global

State yang dikelola secara global hanya dua: `activeLens` (string: `'web3' | 'cybersecurity' | 'life' | null`) dan `transitionState` (string: `'idle' | 'transitioning' | 'complete'`). Semua state lain (animasi, interaksi minor) bersifat lokal per komponen.

---

## 6. Spesifikasi Persona

---

### 6.1 Web3 Lens

#### Identitas Visual

| Elemen | Nilai |
|---|---|
| Background Utama | `#0A0A0F` |
| Background Surface | `#0F1117` |
| Background Card | `#141820` |
| Accent Primer | `#00D4FF` (Electric Blue) |
| Accent Sekunder | `#FFD700` (Gold) |
| Text Primer | `#E8EDF5` |
| Text Sekunder | `#7A8899` |
| Border | `rgba(0, 212, 255, 0.15)` |
| Font Heading | `Space Mono`, monospace |
| Font Body | `IBM Plex Sans Condensed`, sans-serif |
| Font Code/Badge | `IBM Plex Mono`, monospace |
| Cursor | Custom hex-shaped cursor |

#### Estetika & Layout

Seluruh halaman mengadopsi estetika "smart contract module". Setiap section terlihat seperti sebuah block yang independent, verifiable, dan connected. Garis-garis tegas, sudut tajam atau sedikit rounded (border-radius maksimum 6px), dan banyaknya elemen berbasis grid menciptakan kesan sistemik yang khas dari arsitektur blockchain.

Background memiliki lapisan partikel hex-grid yang bergerak sangat lambat (menggunakan canvas atau CSS animation sederhana), menciptakan kedalaman tanpa mengganggu konten. Tidak berlebihan — hanya cukup untuk memberi kesan "living network".

#### Struktur Konten

**Hero Section**
- Nama ditampilkan dalam format wallet-address: `0xRafif...Alton`
- Tagline berupa satu kalimat dalam bahasa teknikal-namun-jelas, contoh: `Building on Lisk. DeFi strategist. Community founder.`
- Avatar menggunakan Jazzicon atau Blockies (avatar generatif berbasis hash), bukan foto
- Status indicator: titik hijau berkedip dengan label `● ONLINE — Block #XXXXXXXX`
- Tombol CTA: `[Initiate Connection →]` dan `[View On-Chain Activity]`

**About Section**
- Judul section: `// about.md`
- Konten ditulis seperti README singkat atau whitepaper introduction
- Highlight key stats dalam format card: Total Commits, Communities Founded, Networks Deployed
- Tidak ada narasi panjang — poin-poin yang dense dan informative

**Projects Section**
- Judul section: `// deployed_contracts/`
- Setiap project ditampilkan sebagai "Contract Card" dengan: nama project, network (Lisk, Ethereum, dll), status (Active/Archived), deskripsi singkat, dan link
- Ada "Transaction Feed" — sebuah komponen yang mensimulasikan aktivitas on-chain dari project-project yang pernah dikerjakan, ditampilkan seperti mini blockchain explorer
- Filter by network/status

**Skills Section**
- Judul section: `// stack.json`
- Skills ditampilkan dalam format JSON visual:
  ```json
  {
    "blockchain": ["Solidity", "Lisk SDK", "Ethers.js"],
    "frontend": ["React", "Next.js", "TailwindCSS"],
    "tools": ["Hardhat", "Foundry", "The Graph"]
  }
  ```
- Setiap skill badge memiliki tooltip saat hover yang menampilkan "gas cost" sebagai metafora level kompleksitas (Gas: Low / Medium / High)

**Contact Section**
- Judul section: `// initiate_transaction.sol`
- Form kontak dikemas seperti smart contract call dengan field: `to:`, `message:`, `value: 0 ETH`
- Link sosial dalam format on-chain address yang bisa diklik

#### Animasi & Interaksi Khas

**Loading Animation (masuk ke persona):**
Animasi block confirmation selama ~1.5 detik:
```
Block Confirming...
■ □ □  0 / 3 confirmations
■ ■ □  1 / 3 confirmations  
■ ■ ■  2 / 3 confirmations
✓ Confirmed — Block #XXXXXXXX
```

**TransactionFeed Component:**
Komponen real-time (mock data) yang menampilkan aktivitas seperti blockchain explorer:
- `[DEPLOY] CommunityDAO.sol → Lisk Mainnet — 2d ago`
- `[INTERACT] AirdropClaim.sol — 5d ago`
- `[CREATE] TokenGating.sol — 12d ago`

**Hover Effects:**
- Project card hover: glow effect pada border dengan warna accent
- Button hover: scanline animation sebelum action
- Link hover: underline dengan warna gradient electric blue ke gold

---

### 6.2 Cybersecurity Lens

#### Identitas Visual

| Elemen | Nilai |
|---|---|
| Background Utama | `#030508` |
| Background Surface | `#070B10` |
| Background Card | `#0C1018` |
| Accent Primer | `#00FF41` (Matrix Green) |
| Accent Sekunder | `#FF3B30` (Alert Red) |
| Accent Tersier | `#FFB700` (Warning Amber) |
| Text Primer | `#C0D4C0` |
| Text Sekunder | `#5A7A5A` |
| Border | `rgba(0, 255, 65, 0.2)` |
| Font Heading | `JetBrains Mono`, monospace |
| Font Body | `JetBrains Mono`, monospace |
| Font Semua | Monospace konsisten tanpa pengecualian |
| Cursor | Custom crosshair cursor |

#### Estetika & Layout

Seluruh halaman menyerupai terminal/CLI interface. Tidak ada elemen dekoratif yang tidak bisa "dijelaskan" dalam konteks terminal. Navigation bukan berupa navbar konvensional — ia berupa command prompt yang bisa diinteraksikan. Setiap section dibuka dengan sebuah command line dan "output"-nya adalah konten section tersebut.

Ada efek subtle scanline (garis-garis horizontal tipis yang sangat transparan) sebagai overlay untuk memperkuat estetika CRT monitor. Ini hanya terlihat pada layar dengan kontras tinggi dan tidak boleh mengganggu keterbacaan.

Cursor berkedip di akhir setiap heading utama, persis seperti terminal yang menunggu input.

#### Struktur Konten

**Hero Section**
```
root@rafif-alton:~$ whoami
> Informatics student | Penetration Tester | Security Researcher
> Location: Balikpapan, ID
> Status: [AVAILABLE FOR ENGAGEMENT]
root@rafif-alton:~$ █
```
- Tagline ditampilkan sebagai output command
- Avatar menggunakan foto dengan filter scanline/halftone — jika tidak ada foto, gunakan ASCII art wajah sederhana
- CTA: `[./contact.sh]` dan `[cat resume.pdf]`

**About Section**
```
root@rafif-alton:~$ cat about.txt
```
- Konten ditampilkan seolah-olah sedang "di-print" ke terminal
- Highlight dalam format `[INFO]`, `[SKILLS]`, `[CERTIFICATIONS]`
- Stats ditampilkan dalam format: `TARGETS ASSESSED: 3`, `VULNERABILITIES FOUND: 12`, `TOOLS MASTERED: 8`

**Projects Section**
```
root@rafif-alton:~$ ls -la assessments/
```
Setiap project security ditampilkan seperti Nmap scan result:
```
TARGET    : artikelku.funshop.id
SCAN TYPE : Full vulnerability assessment
TOOLS     : Nmap, Nikto, Wireshark, Burp Suite
STATUS    : [COMPLETED]
FINDINGS  : 4 vulnerabilities (1 HIGH, 2 MEDIUM, 1 LOW)
REPORT    : [READ REPORT →]
```

**Skills Section**
```
root@rafif-alton:~$ cat skills.txt | grep -v "0%"
```
Skills ditampilkan sebagai loading bar yang animasinya seperti progress bar di terminal:
```
[████████████████░░░░] 80%  Penetration Testing
[██████████████░░░░░░] 72%  Network Analysis  
[████████████░░░░░░░░] 60%  Vulnerability Assessment
[██████████░░░░░░░░░░] 50%  Malware Analysis
```

**Interactive Terminal (Easter Egg & Core Feature)**
Sebuah komponen terminal interaktif yang bisa diketik pengunjung dengan commands terbatas:
```
$ help          → menampilkan daftar commands yang tersedia
$ about         → menampilkan bio singkat
$ skills        → menampilkan skill list
$ projects      → menampilkan project list
$ contact       → menampilkan info kontak
$ clear         → membersihkan terminal
$ whoami        → menampilkan identitas
$ ls            → menampilkan "files" yang tersedia
$ cat [file]    → membuka file tertentu (readme.txt, etc.)
```
Command yang tidak dikenal menghasilkan:
```
bash: [command]: command not found
```

**Contact Section**
```
root@rafif-alton:~$ ./contact.sh
[+] Initializing secure channel...
[+] Encryption: TLS 1.3
[*] Enter your message:
```
Form kontak dikemas seperti script execution dengan field yang muncul satu per satu.

#### Animasi & Interaksi Khas

**Loading Animation (masuk ke persona):**
Simulasi boot sequence selama ~1.5 detik:
```
Initializing security protocols...
Loading threat intelligence database... [OK]
Establishing encrypted connection....... [OK]
Scanning environment..................... [OK]
Access granted. Welcome.
```

**Idle Alert:**
Jika pengunjung idle lebih dari 30 detik, muncul notifikasi di pojok bawah:
```
⚠ ALERT: Unusual inactivity detected
[DISMISS] [INVESTIGATE]
```
Setelah 3 detik atau saat diklik, notifikasi "resolve" sendiri:
```
✓ Threat neutralized. Resume normal operations.
```

**Project Card Hover:**
Saat hover di project card, muncul animasi singkat "Scanning target..." sebelum detail terbuka penuh. Durasinya cukup pendek (~400ms) agar tidak frustrasi.

**Glitch Effect:**
Pada heading utama, ada subtle glitch animation yang terjadi secara random setiap 8–12 detik — hanya beberapa frame, cukup untuk terasa "alive" tanpa mengganggu.

---

### 6.3 Kehidupan Saya Lens

#### Identitas Visual

| Elemen | Nilai |
|---|---|
| Background Utama | `#FAFAF7` (Cream) |
| Background Surface | `#F2F1ED` |
| Background Card | `#FFFFFF` |
| Accent Primer | `#C4622D` (Terracotta) |
| Accent Sekunder | `#2D6A4F` (Forest Green) |
| Accent Tersier | `#E9C46A` (Sand Yellow) |
| Text Primer | `#111111` |
| Text Sekunder | `#555550` |
| Text Tersier | `#999994` |
| Border | `rgba(0,0,0,0.08)` |
| Font Heading | `Playfair Display`, serif |
| Font Body | `Source Serif 4`, serif |
| Font Label/Tag | `DM Sans`, sans-serif |
| Cursor | Default (organic, tidak dikustom) |

#### Estetika & Layout

Terasa seperti sebuah majalah personal atau zine digital yang dibuat dengan sadar dan hati-hati. Banyak negative space. Grid tidak selalu uniform — ada elemen yang "break out" dari grid untuk menciptakan dinamika visual yang editorialistik. Tidak ada satu pun elemen yang terasa teknikal atau artificial.

Foto diizinkan di sini. Jika ada foto, diperlakukan dengan natural — tidak ada filter teknologis, tidak ada overlay scanline, tidak ada avatar generatif. Grain overlay yang sangat subtle diperbolehkan untuk kesan editorial.

Secara keseluruhan, persona ini adalah antitesis dari dua persona sebelumnya. Jika Web3 dan Cybersecurity keduanya dingin dan presisi, Kehidupan Saya harus hangat dan organik.

#### Struktur Konten

**Hero Section**
- Nama dalam tipografi serif yang besar dan elegan, tanpa ornamen teknikal
- Tagline berupa satu kalimat yang jujur dan personal, contoh: *"Mahasiswa informatika di Balikpapan yang belajar cara dunia bekerja — dari blockchain sampai geopolitik."*
- Foto atau ilustrasi yang hangat (bukan avatar generatif)
- CTA: `Baca Cerita Saya →` dan `Kirim Surat`

**About Section**
- Narasi panjang yang ditulis dalam first-person, conversational, jujur
- Tidak dalam format bullet point — paragraf mengalir seperti esai pendek
- Highlight: siapa, dari mana, sedang belajar apa, kenapa tertarik pada bidang-bidang yang digeluti
- Boleh ada sedikit humor atau kerentanan (contoh: "Saya belajar paling efektif jam 10 malam ke atas. Bukan kebiasaan yang ideal, tapi hasilnya nyata.")

**Learning Journal**
- Timeline vertikal yang menampilkan kapan dan apa yang dipelajari
- Bukan format resume — lebih seperti catatan personal
- Setiap entry: tanggal/periode, judul topik, satu kalimat refleksi
- Contoh entry: `Okt 2025 — Mulai serius belajar DeFi. Awalnya hanya tertarik yield farming, akhirnya tersedot ke tokenomics dan macroeconomics.`

**Currently Obsessed With**
- 3–5 card dalam format "post-it" yang menampilkan topik yang sedang aktif dipelajari
- Setiap card: nama topik, satu kalimat kenapa menarik, satu resource rekomendasi
- Topik yang relevan: macroeconomics, geopolitics, DeFi mechanics, data science fundamentals
- Card ini bisa di-update secara manual dengan mudah (data dari file JSON atau CMS sederhana)

**Interests Section**
- Bukan daftar skill — tapi daftar hal yang membuat penasaran
- Format yang lebih visual: grid icon + label, atau full-width card dengan ilustrasi minimal
- Contoh: Isu geopolitik, Financial markets, Decentralized governance, Pola belajar dan produktivitas

**Contact Section**
- Header: *"Kirim Surat"* — bukan "Contact Me", bukan form cold dan formal
- Form sederhana dengan field: nama, email, pesan
- Tone instruksi form yang hangat: *"Tidak perlu formal. Tulis seperti kepada teman."*
- Link sosial dalam format yang natural (bukan wallet address atau command line)

#### Animasi & Interaksi Khas

**Loading Animation (masuk ke persona):**
Sederhana — fade in yang sangat smooth dengan sedikit upward movement, seperti membuka halaman buku. Tidak ada teks loading, tidak ada progress bar. Durasinya ~0.8 detik.

**Quote Carousel:**
Sebuah komponen yang menampilkan quote — dari tokoh yang dikagumi atau quote personal — yang berganti secara perlahan setiap 6 detik dengan crossfade halus. Quote menggunakan tipografi serif italic yang besar.

**Post-it Card Animation:**
Kartu "Currently Obsessed With" memiliki efek subtle hover: sedikit terangkat dengan bayangan yang muncul, seolah-olah kartu fisik yang diangkat dari permukaan.

**Reading Progress:**
Di persona ini (yang paling banyak teks), ada sebuah thin progress bar di bagian atas halaman yang menunjukkan seberapa jauh pengunjung sudah men-scroll.

---

## 7. UX Flow & Navigasi

### Entry Screen (Lens Selection)

Entry screen adalah halaman paling krusial dalam proyek ini. Ia harus menyampaikan konsep dengan jelas dalam 3 detik pertama tanpa memerlukan instruksi eksplisit.

**Layout Desktop:**
Tiga panel horizontal yang memenuhi viewport (33.3% width masing-masing). Setiap panel:
- Memiliki visual preview dari persona-nya (partikel hex untuk Web3, karakter green terminal untuk Cybersec, elemen hangat untuk Kehidupan)
- Menampilkan nama persona dan satu kalimat deskriptor
- Saat hover, panel melebar sedikit (40% width) sementara dua lainnya mengecil (30% masing-masing)
- Saat hover lebih lama (>500ms), preview visual menjadi lebih vivid/animated
- Klik memicu transisi masuk ke persona

**Layout Mobile:**
Tiga kartu vertikal yang bisa di-scroll. Setiap kartu: full-width, tinggi ~40vh, dengan visual preview dan label. Tap untuk masuk ke persona. Swipe horizontal tidak diimplementasikan (terlalu mirip carousel biasa).

**Copy di Entry Screen:**
Satu baris kalimat di atas tiga panel:
> *"Pilih cara kamu mengenal saya."*

Tidak perlu penjelasan lebih panjang. Pilihan yang tersedia sudah self-explanatory.

### Persistent Navigation (In-Persona)

Di dalam setiap persona, navigasi in-page dan tombol ganti persona tersedia secara persistent. Implementasinya berbeda per persona untuk memperkuat karakter:

- **Web3:** Sebuah small widget di bottom-right berbentuk hexagon dengan icon wallet. Hover membuka mini-menu: section anchors + "Switch Lens"
- **Cybersecurity:** Sebuah tombol di bottom-right berbentuk terminal prompt `[>_]`. Hover membuka mini-menu dalam style CLI
- **Kehidupan Saya:** Sebuah floating dot kecil di bottom-right yang saat hover berubah menjadi sebuah mini-navigation yang warm dan rounded

### Transisi Antar Persona

Ketika pengunjung mengklik "Change Lens" dari dalam sebuah persona, urutan yang terjadi adalah:
1. Transisi keluar (exit animation khas persona asal) — ~0.5 detik
2. Transisi ke selection screen dengan efek brief, atau langsung ke persona baru jika ada direct switch — ~0.3 detik
3. Transisi masuk (entry animation khas persona tujuan) — ~0.8 detik

Total transisi tidak boleh melebihi 1.8 detik. Melebihi itu terasa lambat.

### Deep Linking

URL `/web3#projects` harus langsung membuka persona Web3 dan scroll ke section projects. Ini diimplementasikan dengan `useEffect` yang mendeteksi URL hash setelah persona fully mounted dan melakukan smooth scroll ke target section.

---

## 8. Sistem Visual

### Ringkasan Komparatif

| Aspek | Web3 | Cybersecurity | Kehidupan Saya |
|---|---|---|---|
| Background | `#0A0A0F` near-black | `#030508` terminal black | `#FAFAF7` cream |
| Accent Primer | `#00D4FF` electric blue | `#00FF41` matrix green | `#C4622D` terracotta |
| Accent Sekunder | `#FFD700` gold | `#FF3B30` alert red | `#2D6A4F` forest green |
| Font Heading | Space Mono | JetBrains Mono | Playfair Display |
| Font Body | IBM Plex Sans | JetBrains Mono | Source Serif 4 |
| Border Radius Max | 6px (tajam) | 0–4px (terminal-like) | 16px (organik) |
| Border Style | Solid, subtle glow | Dashed, glow effect | Barely-there, shadow-based |
| Cursor | Custom hex shape | Custom crosshair | Default browser |
| Background Effect | Animated hex-grid particles | Subtle scanline overlay | Grain texture (static) |
| Image Treatment | Generative/none | Scanline filter | Natural, warm grain |
| Loading Animation | Block confirmation | Boot sequence | Soft fade |
| Button Style | Outlined, monospace, cold | `[EXECUTE]` terminal style | Rounded, warm, serif label |
| Scroll Behavior | Snap-based per section | "Output printing" feel | Natural editorial scroll |

### Motion Principles

**Web3:** Easing yang lebih mechanical — `cubic-bezier(0.25, 0.46, 0.45, 0.94)`. Animasi yang terasa seperti state machine: dari A ke B secara definite, tanpa "wobble" atau spring.

**Cybersecurity:** Text animations yang terasa seperti output terminal — karakter muncul satu per satu (typewriter effect) untuk heading utama. Transition yang abrupt (tidak smooth berlebihan) karena terminal tidak punya "smooth transition".

**Kehidupan Saya:** Easing yang paling organik — `cubic-bezier(0.34, 1.56, 0.64, 1)` (slight spring/bounce untuk elemen tertentu). Animasi yang lebih lambat dan breathable. Tidak ada sesuatu yang terjadi secara tiba-tiba.

### Font Loading Strategy

Semua font di-subset hanya untuk karakter Latin dan karakter Indonesia yang relevan. Font dimuat dengan `font-display: swap` untuk mencegah FOIT (Flash of Invisible Text). Font untuk persona yang tidak aktif di-preload secara diam-diam saat Lens Selection Screen sedang ditampilkan, sehingga saat persona dipilih, fontnya sudah tersedia.

---

## 9. Spesifikasi Teknis

### Tech Stack

| Layer | Teknologi | Justifikasi |
|---|---|---|
| Framework | React 18 | Ekosistem mature, komponen reusable, concurrent features |
| Bundler | Vite 5 | HMR tercepat, build time minimal, native ESM |
| Styling | Tailwind CSS v3 | Utility-first memudahkan theming per-persona, tree-shaking otomatis |
| Animasi | Framer Motion 11 | `AnimatePresence` untuk page transitions, gesture support, layout animations |
| 3D Effects | Three.js / R3F | Hanya untuk partikel Web3 background — dimuat lazy, hanya saat persona Web3 aktif |
| State Management | Zustand | Ringan (< 1KB), tidak boilerplate, subscription granular |
| Routing | React Router v6 | Declarative routing, nested routes, hash support untuk deep linking |
| Terminal Component | xterm.js (opsional) | Jika InteractiveTerminal membutuhkan lebih dari text simulation sederhana |
| Analytics | Umami (self-hosted) | Privacy-first, no cookies, GDPR compliant, bisa host di Vercel |
| Deployment | Vercel | Free tier cukup, zero-config deploy, edge network, automatic HTTPS |

### Arsitektur Folder

```
src/
├── components/
│   ├── common/           # Komponen universal (tidak per-persona)
│   │   ├── LensSelector/
│   │   ├── PersistentNav/
│   │   └── LensTransition/
│   ├── web3/             # Komponen eksklusif Web3
│   │   ├── HeroWeb3/
│   │   ├── TransactionFeed/
│   │   ├── ContractCard/
│   │   └── BlockConfirmLoader/
│   ├── cybersec/         # Komponen eksklusif Cybersecurity
│   │   ├── HeroCybersec/
│   │   ├── InteractiveTerminal/
│   │   ├── NmapProjectCard/
│   │   ├── BootSequenceLoader/
│   │   └── IdleAlertNotification/
│   └── life/             # Komponen eksklusif Kehidupan Saya
│       ├── HeroLife/
│       ├── LearningJournal/
│       ├── CurrentlyObsessedWith/
│       ├── QuoteCarousel/
│       └── PostItCard/
├── pages/
│   ├── LensSelectionPage.jsx
│   ├── Web3Page.jsx
│   ├── CybersecPage.jsx
│   └── LifePage.jsx
├── store/
│   └── lensStore.js      # Zustand store
├── themes/
│   ├── web3.theme.js
│   ├── cybersec.theme.js
│   └── life.theme.js
├── content/
│   ├── web3.content.js   # Semua copy untuk Web3
│   ├── cybersec.content.js
│   └── life.content.js
├── hooks/
│   ├── useTheme.js
│   ├── useDeepLink.js
│   └── useIdleDetection.js
└── utils/
    ├── transitions.js
    └── formatters.js
```

### Sistem Theming

Theme system menggunakan CSS Custom Properties yang di-inject ke `<html>` element saat persona aktif. Setiap theme object mendefinisikan seluruh design tokens yang diperlukan:

```javascript
// themes/web3.theme.js
export const web3Theme = {
  '--color-bg-primary': '#0A0A0F',
  '--color-bg-surface': '#0F1117',
  '--color-bg-card': '#141820',
  '--color-accent-primary': '#00D4FF',
  '--color-accent-secondary': '#FFD700',
  '--color-text-primary': '#E8EDF5',
  '--color-text-secondary': '#7A8899',
  '--color-border': 'rgba(0, 212, 255, 0.15)',
  '--font-heading': '"Space Mono", monospace',
  '--font-body': '"IBM Plex Sans Condensed", sans-serif',
  '--border-radius-max': '6px',
  '--transition-easing': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
}
```

Saat tema berganti, semua CSS variable di-update secara atomik melalui sebuah `applyTheme(themeObject)` utility function, dan komponen yang menggunakan CSS variables akan otomatis bereaksi.

### Code Splitting

Setiap persona di-lazy load menggunakan `React.lazy()` dan dibungkus `Suspense`. Asset, font, dan komponen eksklusif persona B tidak ikut ter-bundle saat pengunjung berada di persona A.

```javascript
const Web3Page = React.lazy(() => import('./pages/Web3Page'));
const CybersecPage = React.lazy(() => import('./pages/CybersecPage'));
const LifePage = React.lazy(() => import('./pages/LifePage'));
```

Three.js dan R3F hanya di-import di dalam komponen yang memerlukannya (Web3 background particles), yang sudah terlindungi oleh lazy loading di atas.

---

## 10. Komponen & Fitur

### Komponen Universal

Komponen-komponen ini ada di semua persona tetapi di-render dengan implementasi visual yang berbeda:

| Komponen | Deskripsi |
|---|---|
| `HeroSection` | Section pertama setiap persona. Props: `persona`. Render berbeda total per persona |
| `AboutSection` | Informasi tentang Rafif. Tone dan format berbeda per persona |
| `ProjectsSection` | Showcase project. Card style berbeda per persona |
| `SkillsSection` | Skills dan kompetensi. Visualisasi berbeda per persona |
| `ContactSection` | Form kontak. Label, tone, dan visual berbeda per persona |
| `PersistentNav` | Navigasi yang selalu terlihat. Style berbeda per persona |
| `LensTransition` | Overlay animasi saat berganti persona |
| `ReadingProgress` | Progress bar scroll (aktif di semua persona, tapi paling prominent di Kehidupan Saya) |

### Komponen Eksklusif Web3

| Komponen | Deskripsi |
|---|---|
| `BlockConfirmLoader` | Animasi loading block confirmation saat masuk ke persona Web3 |
| `HexParticleBackground` | Canvas atau Three.js background dengan partikel hex-grid animasi |
| `TransactionFeed` | Mock blockchain explorer feed yang menampilkan aktivitas on-chain |
| `ContractCard` | Card project berbentuk smart contract module |
| `WalletAddressHeader` | Format nama sebagai wallet address |
| `OnChainActivityBadge` | Badge yang menampilkan network/status project |
| `GasCostTooltip` | Tooltip hover di skill badge yang menampilkan "gas cost" sebagai metafora |

### Komponen Eksklusif Cybersecurity

| Komponen | Deskripsi |
|---|---|
| `BootSequenceLoader` | Animasi loading boot sequence saat masuk ke persona |
| `ScanlineOverlay` | CSS overlay yang memberi efek CRT scanline di seluruh halaman |
| `InteractiveTerminal` | Terminal emulator yang menerima input command dari pengunjung |
| `BlinkingCursor` | Cursor berkedip di akhir heading |
| `NmapProjectCard` | Card project dalam format Nmap scan result |
| `TerminalProgressBar` | Progress bar dalam format ASCII untuk skills |
| `IdleAlertNotification` | Notifikasi "ALERT" yang muncul saat pengunjung idle >30 detik |
| `GlitchText` | Text glitch animation untuk heading utama |
| `TypewriterText` | Karakter muncul satu per satu seperti terminal output |

### Komponen Eksklusif Kehidupan Saya

| Komponen | Deskripsi |
|---|---|
| `SoftFadeLoader` | Animasi loading yang sederhana dan hangat |
| `LearningJournal` | Timeline vertikal catatan perjalanan belajar |
| `CurrentlyObsessedWith` | Grid card post-it topik yang sedang dipelajari |
| `QuoteCarousel` | Rotasi quote dengan crossfade halus |
| `PostItCard` | Card dengan estetika post-it note |
| `EditorialGrid` | Grid layout editorial yang tidak uniform |
| `GrainOverlay` | Subtle grain texture overlay untuk kesan fotografis |

---

## 11. Konten & Copy Strategy

### Web3 Lens — Panduan Penulisan

**Tone:** Technical-confident. Menulis untuk seseorang yang sudah "dalam" dunia ini. Tidak perlu menjelaskan apa itu blockchain — pembacanya tahu. Justru tunjukkan depth dengan terminologi yang tepat dan konteks yang spesifik.

**Prinsip:**
- Singkat dan dense. Tidak ada kalimat yang tidak membawa informasi
- Gunakan verba aktif yang kuat: "Building", "Deployed", "Contributing to"
- Jangan overstate. Jika belum berpengalaman di suatu area, jangan pura-pura. Credibility di dunia Web3 dibangun dari kejujuran on-chain, bukan klaim off-chain
- Angka lebih baik dari kata sifat. Bukan "sangat berpengalaman" tapi "3 protokol deployed"

**Contoh copy:**
> *Hero tagline:* `Building on Lisk. Community-first. On-chain by default.`
> *About opening:* `Developer dan researcher dengan fokus pada ekosistem Lisk dan mekanisme DeFi. Saya percaya infrastruktur yang baik harus accessible — itulah kenapa saya juga aktif membangun komunitas, bukan hanya protokol.`

### Cybersecurity Lens — Panduan Penulisan

**Tone:** Precise, no fluff. Setiap kata harus justified. Menulis untuk seseorang yang menghargai efisiensi dan mendeteksi BS dari jauh.

**Prinsip:**
- Tidak ada basa-basi pembuka. Langsung ke substansi
- Format terminal hanya boleh digunakan jika kontennya memang cocok — jangan paksakan semua hal menjadi command-line
- Klaim harus bisa diverifikasi. Jika menulis "menemukan vulnerabilitas HIGH", harus ada report atau referensi
- Gunakan terminologi yang tepat: CVE, CVSS score, attack surface, threat model — bukan kata-kata general seperti "berbahaya" atau "rentan"

**Contoh copy:**
> *Hero output:*
> ```
> [INFO] Role      : Penetration Tester / Security Researcher
> [INFO] Location  : Balikpapan, Indonesia
> [INFO] Scope     : Web Application, Network, OSINT
> [INFO] Status    : Open to engagement
> ```

### Kehidupan Saya Lens — Panduan Penulisan

**Tone:** Personal, reflektif, conversational. Ini adalah satu-satunya persona yang boleh menggunakan "Saya" secara bebas dan berbicara tentang perasaan atau proses belajar yang tidak selalu berhasil.

**Prinsip:**
- Autentik lebih penting dari impressive. Lebih baik mengakui masih belajar daripada terkesan seperti sudah ahli
- Konkret dan spesifik. Bukan "saya tertarik macroeconomics" tapi "saya tertarik bagaimana keputusan bank sentral di Amerika bisa mempengaruhi harga beras di Balikpapan"
- Boleh ada opini. Persona ini adalah tempat untuk memiliki sudut pandang
- Jangan menulis seperti LinkedIn. Tidak ada "passionate about", "synergy", atau frasa corporate

**Contoh copy:**
> *About opening:* *"Saya mahasiswa Teknik Informatika di Balikpapan yang kebetulan lebih tertarik pada kenapa sesuatu terjadi daripada bagaimana cara membuatnya. Siang ngoding, malam membaca tentang bagaimana kebijakan Fed mempengaruhi likuiditas global. Tidak selalu kohesif, tapi itulah saya."*

---

## 12. Responsivitas & Aksesibilitas

### Breakpoints

| Breakpoint | Range | Perilaku Utama |
|---|---|---|
| Mobile | < 768px | Entry screen: 3 kartu vertikal. InteractiveTerminal nonaktif. Layout single-column |
| Tablet | 768px – 1024px | Entry screen: 3 panel horizontal kecil. Grid 2 kolom untuk project cards |
| Desktop | > 1024px | Entry screen: 3 panel full-height. Layout optimal. Semua fitur aktif |
| Wide Desktop | > 1440px | Max-width container 1400px, centered, dengan generous padding |

### Aksesibilitas (WCAG 2.1 Level AA)

- Semua warna teks memenuhi minimum contrast ratio 4.5:1 untuk body text dan 3:1 untuk large text
- Semua interactive elements memiliki focus state yang visible
- Seluruh konten dapat diakses via keyboard navigation
- Interactive Terminal di Cybersecurity memiliki ARIA label yang tepat dan dapat diakses via screen reader dalam mode degraded (hanya menampilkan konten sebagai list jika JS tidak tersedia)
- Semua gambar (jika ada) memiliki alt text yang deskriptif
- Reduced motion: semua animasi menghormati `prefers-reduced-motion: reduce`. Jika pengguna mengaktifkan setting ini, animasi kompleks diganti dengan fade sederhana atau dihilangkan

---

## 13. Performa & SEO

### Target Performa

| Metrik | Target |
|---|---|
| Largest Contentful Paint (LCP) | < 2.5 detik |
| First Input Delay (FID) | < 100ms |
| Cumulative Layout Shift (CLS) | < 0.1 |
| Time to Interactive (TTI) | < 3.5 detik |
| Total Bundle Size (initial) | < 200KB gzipped |
| Total Bundle Size (per persona, lazy) | < 100KB gzipped masing-masing |

### SEO Strategy

Setiap persona memiliki meta tags yang berbeda untuk memaksimalkan relevansi di search engine:

**Web3 Lens (`/web3`):**
```html
<title>Rafif Alton — Web3 Developer & DeFi Researcher</title>
<meta name="description" content="Building on Lisk. DeFi strategist and community founder. Explore my on-chain projects and blockchain research." />
<meta property="og:image" content="/og-web3.png" />
```

**Cybersecurity Lens (`/cybersecurity`):**
```html
<title>Rafif Alton — Penetration Tester & Security Researcher</title>
<meta name="description" content="Informatics student specializing in web application penetration testing, vulnerability analysis, and network security. Based in Balikpapan." />
<meta property="og:image" content="/og-cybersec.png" />
```

**Kehidupan Saya Lens (`/life`):**
```html
<title>Rafif Alton — Mahasiswa, Pelajar, Penulis</title>
<meta name="description" content="Mahasiswa Teknik Informatika Balikpapan yang tertarik macroeconomics, geopolitics, dan bagaimana teknologi mengubah dunia." />
<meta property="og:image" content="/og-life.png" />
```

Setiap OG image berdesain berbeda dan mencerminkan estetika masing-masing persona.

### Sitemap & robots.txt

`sitemap.xml` mencantumkan semua empat URL (entry + 3 persona) dengan `changefreq: monthly` dan `priority` berbeda (entry: 1.0, persona: 0.8). `robots.txt` mengizinkan semua crawler.

---

## 14. Roadmap Implementasi

### Fase 1 — Foundation & Entry Screen
**Durasi estimasi: 7 hari**

Deliverables:
- Setup Vite + React + Tailwind + Framer Motion
- Implementasi theme system (CSS custom properties + Zustand)
- React Router setup dengan empat routes
- Lens Selection Screen lengkap (desktop + mobile layout, hover effects, transisi masuk)
- LensTransition component (exit + entry animations untuk semua persona)
- PersistentNav component (3 varian)
- Font loading strategy

Definition of Done Fase 1: Pengunjung bisa membuka website, melihat Lens Selection Screen, memilih persona, dan masuk ke placeholder page yang sudah fully themed dengan persistent nav yang berfungsi.

---

### Fase 2 — Web3 Lens & Cybersecurity Lens
**Durasi estimasi: 14 hari**

Minggu pertama fokus Web3:
- Seluruh layout dan konten Web3 (statis)
- HexParticleBackground
- TransactionFeed component
- ContractCard component
- BlockConfirmLoader

Minggu kedua fokus Cybersecurity:
- Seluruh layout dan konten Cybersecurity (statis)
- ScanlineOverlay
- InteractiveTerminal (core feature)
- NmapProjectCard
- BootSequenceLoader + GlitchText + TypewriterText
- IdleAlertNotification

Definition of Done Fase 2: Kedua persona production-ready dari sisi konten dan interaksi inti.

---

### Fase 3 — Kehidupan Saya & Polish
**Durasi estimasi: 7 hari**

Tiga hari pertama: Kehidupan Saya Lens
- Seluruh layout dan konten Kehidupan Saya
- LearningJournal timeline
- CurrentlyObsessedWith cards
- QuoteCarousel
- SoftFadeLoader

Empat hari terakhir: Polish
- Perhalus semua transisi antar persona
- Tambahkan micro-interactions yang masih kurang
- Audit responsivitas di semua breakpoints (mobile, tablet, desktop, wide)
- Audit aksesibilitas (contrast ratio, keyboard nav, ARIA)
- Bug fixing dan cross-browser testing (Chrome, Firefox, Safari)

Definition of Done Fase 3: Ketiga persona terasa kohesif sebagai satu produk. Tidak ada visual bug di tiga breakpoint utama.

---

### Fase 4 — Optimasi, SEO, & Deploy
**Durasi estimasi: 3–4 hari**

- Lighthouse audit lengkap dan iterasi perbaikan
- Image optimization (WebP, lazy loading, proper sizing)
- Font subsetting untuk ukuran optimal
- Meta tags dan OG images per persona
- Buat tiga OG images (satu per persona)
- Setup Vercel deployment (connect GitHub repo, environment variables)
- Domain setup dan SSL verification
- Setup Umami analytics (self-hosted di Vercel atau Railway)
- Smoke testing pasca-deploy

Definition of Done Fase 4: Website live di domain final, semua persona berfungsi di production, analytics aktif.

---

### Timeline Keseluruhan

```
Minggu 1    : Fase 1 — Foundation & Entry Screen
Minggu 2    : Fase 2a — Web3 Lens
Minggu 3    : Fase 2b — Cybersecurity Lens
Minggu 4    : Fase 3a — Kehidupan Saya + Polish
Minggu 5    : Fase 4 — Optimasi & Deploy
─────────────────────────────────────────────────
Total       : ~5 minggu (estimasi solo developer, part-time)
```

---

## 15. Risiko & Mitigasi

| Risiko | Kemungkinan | Dampak | Mitigasi |
|---|---|---|---|
| Scope creep animasi | Tinggi | Tinggi | Tetapkan Framer Motion sebagai batas atas. Tidak ada Three.js kecuali benar-benar diperlukan untuk fitur spesifik yang sudah didefinisikan |
| InteractiveTerminal terlalu kompleks | Sedang | Sedang | Batasi command yang didukung sejak awal. Jika implementasi xterm.js terlalu berat, buat text-simulation sederhana yang hanya menerima input dan memprint output hardcoded |
| Konten terlalu tipis / tidak autentik | Sedang | Tinggi | Tulis konten sebelum membangun komponen. Jangan buat komponen canggih untuk konten yang belum ada |
| Performa buruk karena Three.js | Sedang | Sedang | Implementasikan dengan lazy loading ketat. Berikan fallback CSS animation jika GPU tidak memadai |
| Entry screen membingungkan | Rendah | Tinggi | User test sederhana dengan 2–3 orang yang tidak tahu konteks proyek ini. Jika mereka bingung dalam 5 detik, revisi copy dan visual |
| Konsistensi visual antar persona memudar | Sedang | Rendah | Buat design tokens yang jelas sejak fase 1. Gunakan theme object sebagai satu-satunya source of truth untuk warna dan tipografi |
| Mobile experience yang buruk | Sedang | Sedang | Mobile-first untuk komponen baru. Test di perangkat nyata, bukan hanya browser devtools |

---

## 16. Out of Scope

Berikut adalah hal-hal yang secara eksplisit **tidak** termasuk dalam versi 1.0 ini:

- Backend/database apapun (tidak ada CMS, tidak ada server, tidak ada database)
- Fitur blog atau konten yang bisa di-update secara dinamis (konten diupdate via code)
- Authentication atau area protected
- Multi-bahasa (Inggris dan Indonesia akan dicampur secara natural per persona, tidak ada language switcher formal)
- Dark/light mode toggle (setiap persona sudah memiliki mood warnanya sendiri yang tidak perubah)
- Lebih dari tiga persona di versi 1.0
- Integrasi wallet (tidak ada connect wallet sungguhan — ini bukan dApp)
- Real-time data dari blockchain (TransactionFeed menggunakan mock data)

---

*Dokumen ini adalah living document. Setiap perubahan signifikan dari spesifikasi di atas harus didokumentasikan dengan versi baru.*

---

**End of Document — PRD v1.0**
