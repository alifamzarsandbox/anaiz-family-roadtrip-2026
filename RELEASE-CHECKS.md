# Semakan pelepasan — 21 Oktober 2026

**Phase 6 selesai.** Sumber disediakan untuk muat naik manual ke repository sebenar `anaiz-gunungjerai`. Tiada commit, push, penciptaan repository atau deployment dibuat dalam sesi pembangunan.

## Build dan konfigurasi

- Pemasangan bersih melalui `npm ci --no-fund --no-audit` berjaya; `npm run build` berjaya menggunakan Node.js 24.
- `package-lock.json` sepadan dengan dependency dalam `package.json`.
- Semua rujukan aset dalam HTML/CSS produksi menggunakan `/anaiz-gunungjerai/` dan menunjuk kepada fail yang wujud. Tiada respons aset gagal atau ralat JavaScript dikesan dalam ujian browser.
- Workflow disemak secara statik: push ke `main`, `npm ci`, build, artifact `dist`, official Pages actions, concurrency, kebenaran build/deploy dan environment Pages tersedia. Workflow belum dijalankan di GitHub.
- Pakej manual menggunakan senarai fail sumber yang jelas; tidak merangkumi `node_modules/`, `dist/`, `.git/` atau skrip QA setempat.

## Susun atur dan visual

Semua lima babak diperiksa pada setiap viewport berikut dalam Chrome 155.0.8059.85:

| Viewport | Keputusan |
| --- | --- |
| 320 × 568 | Lulus |
| 360 × 640 | Lulus |
| 375 × 812 | Lulus |
| 390 × 844 | Lulus |
| 430 × 932 | Lulus |
| 768 × 1024 | Lulus |
| 1024 × 768 | Lulus |
| 1440 × 900 | Lulus |
| 844 × 390 (landscape) | Lulus |

Tiada limpahan mendatar, pertindihan panel teks dengan kereta/progress, pertindihan countdown dengan kereta/progress, atau butang terpotong dikesan pada titik pemeriksaan babak. Butang mempunyai sasaran minimum 44px. Kereta kekal dalam viewport. Screenshot pembukaan dan ketibaan telefon serta pembukaan desktop turut diperiksa secara visual.

Pengiraan safe-area diuji dengan penggantian CSS sintetik: inset atas 44px/bawah 34px pada 390 × 844 dan kiri/kanan 44px/bawah 21px pada 844 × 390. Pembukaan dan ketibaan lulus tanpa pertindihan; semua butang berada dalam kawasan selamat. API emulasi safe-area native CDP tidak tersedia. Ujian ini tidak menggantikan ujian notch/toolbar Safari sebenar.

## Interaksi dan aksesibiliti

- Butang mula, ulang dan ketiga-tiga lokasi berjaya membawa pengguna ke babak serta memindahkan fokus ke tajuk destinasi.
- Navigasi papan kekunci, fokus selepas scroll, lokasi aktif, dan kebolehbalikan efek ketibaan lulus ujian regresi. Kawalan babak tersembunyi tidak memasuki urutan tab.
- Reduced motion memberikan navigasi segera dan mematikan gerakan dekoratif. Aliran mula → ketibaan → ulang serta fokus turut lulus dalam Edge 155.0.4283.62.
- Countdown disahkan terhadap tengah malam Malaysia (`2026-10-23T16:00:00Z`), pengiraan hari/jam/minit/saat, satu milisaat sebelum tamat, tepat ketika tamat, dan masa selepas tamat. Tiada nombor negatif.
- Timer browser berdetik dan bertukar kepada mesej hari perjalanan. Ujian menggunakan zon waktu browser `America/New_York` untuk memastikan sasaran kekal waktu Malaysia.
- axe-core 4.10.3: **0 pelanggaran automatik** pada kelima-lima babak di 390 × 844 dengan peraturan WCAG 2 A/AA, 2.1 AA dan 2.2 AA. Pemeriksaan kontras terhadap latar SVG ditandai `incomplete`; teks diperiksa secara visual, tetapi tiada tuntutan pensijilan WCAG menyeluruh dibuat.
- Tiada autoplay muzik. Ilustrasi dekoratif dan partikel tidak menghalang input.

## Saiz dan prestasi

- Font WOFF2 Latin: **88,772 bait** berbanding 390,744 bait aset font sebelum pengoptimuman (pengurangan kira-kira 77%). Ini membandingkan fail yang dihasilkan build, bukan jumlah muat turun sebenar setiap lawatan.
- JavaScript produksi: **381,978 bait**, sekitar 122.48 kB gzip menurut Vite.
- CSS produksi: **16,499 bait**, sekitar 4.64 kB gzip menurut Vite.
- Sampel scroll Chrome dengan CPU throttle 4×, 150 sela frame: median **16 ms**, persentil ke-95 **26 ms**, **0** sela melebihi 50 ms. Angka ini ialah sampel sintetik desktop, bukan jaminan prestasi Android.
- Sway pokok menggunakan MotionValue jarak yang sedia ada; tiada timer animasi tambahan atau state React per frame. Font dimuatkan setempat dengan `font-display: swap`.

## Had pengesahan

Peranti Android/iPhone fizikal, Safari/iOS, pembaca skrin sebenar, perubahan toolbar native dan deployment GitHub sebenar belum diuji. Selepas muat naik, semak URL Pages pada telefon sasaran dan pastikan workflow hijau. Panduan lengkap tersedia dalam [README.md](README.md).

Semua enam fasa pembangunan telah selesai. Menunggu pengesahan akhir pengguna; tiada fasa tambahan dimulakan secara automatik.
