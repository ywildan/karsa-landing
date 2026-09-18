# Karsa — implementation report

Seluruh sepuluh section selesai. Project final: `/home/ywldan/Documents/karsa-landing/`, sibling dari workspace awal. Tidak ada source di workspace awal yang diubah.

## Validasi

| Pemeriksaan | Hasil |
| --- | --- |
| `npm run typecheck` (`tsc --noEmit`, strict) | PASS |
| `npm run lint` (`eslint . --max-warnings=0`) | PASS — tanpa error atau warning |
| `npm run build` | PASS — Next.js 15.5.25, prerender statis |
| Browser | Chromium 151.0.7922.34 |
| Viewport | 375px, 768px, 1280px |
| Browser assertions | 59 PASS |
| Console / hydration errors | Tidak ada |
| Horizontal overflow | Tidak ada pada ketiga viewport |
| Reduced motion | Konten langsung terlihat, transform dan smooth scroll dinonaktifkan |
| JavaScript dimatikan | Konten tetap terlihat; demo diganti penjelasan |
| Keyboard | Pemilihan mahasiswa, poin, simpan, dan reset berfungsi |
| Link | Anchor valid; sign-in mengarah ke URL app yang diminta |
| Progress bar | Berakhir pada nilai ilustrasi yang ditentukan |

First Load JS halaman: 153 kB menurut output build Next.js; route halaman 50.2 kB. Ini ukuran bundle, bukan klaim performa lapangan. Font berhasil diunduh oleh `next/font/google` dan terverifikasi termuat di browser.

Instalasi npm memberi pemberitahuan deprecation ESLint 9 dan kebijakan install-script `unrs-resolver` pada environment npm yang digunakan. Tidak perlu mengubah stack atau menambahkan paket: lint, typecheck, dan build berhasil. Build awal sempat terkena batasan jaringan sandbox; build final berhasil dengan akses unduhan font.

## Keputusan implementasi

- Semua pilihan font, clamp, radius, warna, dan easing mengikuti brief. Hero selesai dalam 1.3 detik.
- Teks tombol orange memakai near-black untuk keterbacaan.
- Tambahan `input-demo.tsx` membuat Three-tap input bisa dicoba. State lokal saja; tanpa backend, penyimpanan, atau pengiriman data.
- Kartu informasi statis tidak bergerak saat hover. Umpan balik hover diberikan pada kontrol interaktif, untuk menjaga makna interaksi.
- Preview dan data kelas diberi label ilustrasi. Nilai numerik UI bukan statistik penggunaan produk.
- Request access menuju penjelasan `#access`, mengikuti asumsi brief yang disetujui.
- Copy “instructor” dipertahankan dan peran PJ dijelaskan pada workflow.
- Konten pada mobile tersusun vertikal; desktop menggunakan grid dua belas kolom dan bento dengan span berbeda.
- Screenshot per section menyembunyikan nav sticky saat pengambilan supaya nav tidak menutupi potongan section; screenshot halaman penuh menyertakan nav asli.

## Screenshots

Buka [galeri interaktif](index.html) untuk berganti antara desktop, tablet, dan mobile. Total 33 PNG: sepuluh section untuk setiap viewport, ditambah tiga halaman penuh.

| Section | Desktop | Tablet | Mobile |
| --- | --- | --- | --- |
| 01. Navigation | [1280px](screenshots/01-nav-1280.png) | [768px](screenshots/01-nav-768.png) | [375px](screenshots/01-nav-375.png) |
| 02. Hero | [1280px](screenshots/02-hero-1280.png) | [768px](screenshots/02-hero-768.png) | [375px](screenshots/02-hero-375.png) |
| 03. The problem | [1280px](screenshots/03-problem-1280.png) | [768px](screenshots/03-problem-768.png) | [375px](screenshots/03-problem-375.png) |
| 04. The idea | [1280px](screenshots/04-idea-1280.png) | [768px](screenshots/04-idea-768.png) | [375px](screenshots/04-idea-375.png) |
| 05. How it works | [1280px](screenshots/05-workflow-1280.png) | [768px](screenshots/05-workflow-768.png) | [375px](screenshots/05-workflow-375.png) |
| 06. Features | [1280px](screenshots/06-features-1280.png) | [768px](screenshots/06-features-768.png) | [375px](screenshots/06-features-375.png) |
| 07. The numbers | [1280px](screenshots/07-numbers-1280.png) | [768px](screenshots/07-numbers-768.png) | [375px](screenshots/07-numbers-375.png) |
| 08. Roadmap | [1280px](screenshots/08-status-1280.png) | [768px](screenshots/08-status-768.png) | [375px](screenshots/08-status-375.png) |
| 09. CTA | [1280px](screenshots/09-access-1280.png) | [768px](screenshots/09-access-768.png) | [375px](screenshots/09-access-375.png) |
| 10. Footer | [1280px](screenshots/10-footer-1280.png) | [768px](screenshots/10-footer-768.png) | [375px](screenshots/10-footer-375.png) |

Halaman penuh: [1280px](screenshots/full-1280.png), [768px](screenshots/full-768.png), [375px](screenshots/full-375.png).

## File yang dibuat

Source, konfigurasi, dokumentasi, dan artefak review berikut semuanya file baru di project sibling. Dependency terpasang di `node_modules/`; build lokal berada di `.next/`, keduanya diabaikan oleh Git.

```text
.gitignore
README.md
app/globals.css
app/icon.svg
app/layout.tsx
app/page.tsx
components.json
components/landing/cta.tsx
components/landing/features.tsx
components/landing/footer.tsx
components/landing/hero.tsx
components/landing/idea.tsx
components/landing/input-demo.tsx
components/landing/nav.tsx
components/landing/numbers.tsx
components/landing/problem.tsx
components/landing/record-preview.tsx
components/landing/reveal.tsx
components/landing/status.tsx
components/landing/workflow.tsx
components/ui/badge.tsx
components/ui/button.tsx
components/ui/card.tsx
eslint.config.mjs
lib/utils.ts
next-env.d.ts
next.config.ts
package-lock.json
package.json
postcss.config.mjs
review/browser-checks.json
review/index.html
tailwind.config.ts
tsconfig.json
review/REPORT.md
review/screenshots/*.png (33 files)
```

## Review berikutnya

1. Konfirmasi status milestone, klaim fitur, dan target Genap 2026/2027 sebelum publikasi. Copy berasal dari brief; implementasi app utama tidak diaudit.
2. Nilai komposisi hero, keterbacaan preview mini, dan ritme whitespace menggunakan galeri responsive.
3. Bila alur permintaan akses tersedia, ganti anchor `#access` dengan tujuan resmi tersebut.
4. Panduan Vercel tersedia di README. Belum ada deployment publik atau perubahan pada autentikasi app utama.
