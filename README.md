# ANAIZ FAMILY ROAD TRIP 2026

Buku perjalanan interaktif keluarga dalam Bahasa Melayu. Sabak Bernam → Sik → Gunung Jerai, 24–25 Oktober 2026 (Sabtu & Ahad), 2 hari 1 malam.

## Status pembangunan

**Phase 6 — Final Testing & Release Preparation selesai.** Lima babak, animasi scroll dua arah, countdown waktu Malaysia, navigasi dan reduced motion telah disahkan pada build produksi. Projek sedia untuk muat naik manual; tiada deployment dibuat dalam sesi pembangunan. Keputusan dan had ujian direkodkan dalam [RELEASE-CHECKS.md](RELEASE-CHECKS.md).

Pakej serahan: `release/anaiz-family-trip-manual-upload.zip`. Ekstrak ZIP terlebih dahulu, kemudian muat naik **kandungannya**, bukan fail ZIP atau folder pembungkus. Salinan sumber yang sudah disusun turut tersedia dalam `release/anaiz-family-trip/` di workspace asal. Folder `release/` tidak perlu dimuat naik.

## Pembangunan setempat

Gunakan Node.js 24 LTS dengan npm.

```sh
npm ci
npm run dev
```

Buka URL yang dicetak Vite, dengan laluan `/anaiz-gunungjerai/`.

```sh
npm run build
npm run preview
```

`dist/` ialah hasil build sahaja. Font Playfair Display dan DM Sans dibundel setempat melalui Fontsource menggunakan subset Latin WOFF2, termasuk italic sebenar. Lesen font terdapat dalam `public/licenses/`; tiada permintaan Google Fonts semasa laman dibuka. Buka laman melalui pelayan Vite, bukan dengan klik dua kali pada `index.html`.

## Struktur

```text
src/
  App.jsx
  main.jsx
  components/
    AppShell.jsx
    IllustrationPreview.jsx
    JourneyStage.jsx
    JourneyProgress.jsx
    CountdownTimer.jsx
    ArrivalEffects.jsx
    illustrations/
      AnimatedCar.jsx
      SceneryElements.jsx
      SceneryLayers.jsx
      JourneyScenery.jsx
  data/trip.js
  hooks/
    useJourneyMotion.js
    useJourneyNavigation.js
  scenes/
    StoryPanel.jsx
    StoryScenes.jsx
    HeroScene.jsx
    JourneyScene.jsx
    ArrivalScene.jsx
  styles/
    global.css
    fonts.css
  utils/countdown.js
public/
  favicon.svg
  licenses/
.github/workflows/deploy.yml
RELEASE-CHECKS.md
```

Tailwind CSS menggunakan plugin Vite. Polisi Motion disediakan melalui `MotionConfig` dan menghormati tetapan reduced motion pengguna. Tarikh mula disimpan dengan zon waktu Malaysia (`+08:00`).

Ilustrasi menggunakan SVG/JSX asal tanpa aset imej luaran. `SceneryLayers` dan `IllustrationPreview` mengekalkan kajian statik Phase 2 untuk kegunaan semula. ID SVG unik dijana melalui React `useId`.

## Enjin perjalanan

`useJourneyMotion` mempunyai satu `useScroll`, disasarkan kepada `JourneyStage` dengan offset `start start` hingga `end end`. `useSpring` melicinkan nilai itu; semua gerakan dihasilkan melalui `useTransform` dan MotionValues. Enjin animasi tidak mengemas kini state React setiap frame; state lokasi aktif hanya berubah pada sempadan lokasi. Tiada scroll hijacking atau nested scroll container.

Pentas menggunakan CSS sticky dan `svh` supaya perubahan toolbar telefon tidak mengubah panjang perjalanan. Kamera SVG menyesuaikan nisbah paparan melalui ResizeObserver pada resize sahaja. Lapisan bergerak melalui transform dan opacity. Kereta kekal di tengah, roda berputar dua arah, gunung membesar dan jarak perjalanan melambat pada penghujung. Apabila scroll berhenti, gerakan berhenti setelah spring stabil. Reduced motion mematikan gerakan translasi, putaran, skala dan lantunan sambil mengekalkan pertukaran landskap melalui opacity.

Rujukan API: [Motion useScroll](https://motion.dev/docs/react-use-scroll). Ujian akhir meliputi emulasi viewport dan CPU desktop; prestasi pada peranti Android sebenar belum disahkan.

## Lima babak cerita

`StoryScenes` menetapkan lima tetingkap kemajuan: 0–20% (Sabak Bernam), 20–40% (On The Road), 40–60% (Sik), 60–80% (Gunung Jerai), dan 80–100% (ketibaan). `StoryPanel` menerbitkan opacity, translasi kecil dan visibility daripada MotionValue kemajuan yang sama. Babak yang tidak kelihatan menggunakan `visibility: hidden` supaya teks tersembunyi tidak dibaca sebagai babak aktif oleh teknologi bantuan. Perubahan babak boleh diundur dengan scroll tanpa pencetus sekali sahaja.

Satu jalan melintasi pentas dan bersambung dengan jalan berliku di kejauhan; landskap Sik menonjolkan sungai sebelum gunung diperkenalkan. Pagar kayu muncul di penghujung untuk membentuk kawasan tinjau gunung. Versi landscape skrin pendek menggunakan teks di sebelah kiri dan kereta di kanan supaya kandungan kekal boleh dibaca.

## Interaksi dan aksesibiliti

- **Jom Mulakan Perjalanan 🚗** membawa pembaca ke babak On The Road. **Ulang Perjalanan ↺** kembali ke pembukaan. Tiga penanda lokasi juga boleh ditekan untuk melawat Sabak Bernam, Sik atau ketibaan di Gunung Jerai.
- Navigasi menggunakan smooth scroll asli browser. Apabila sampai, fokus berpindah ke tajuk babak tanpa scroll tambahan. Input manual membatalkan pemindahan fokus yang masih menunggu. Reduced motion menggunakan scroll segera.
- Progress rail menggunakan MotionValue yang sama dengan landskap; state React bagi lokasi aktif hanya berubah apabila melepasi sempadan lokasi. Penanda aktif mempunyai `aria-current="step"`.
- Countdown menggunakan tarikh ISO `2026-10-24T00:00:00+08:00`, bukan zon waktu komputer. Nilainya dikira semula daripada jam peranti setiap saat, tidak pernah negatif dan bertukar kepada **IT'S ROAD TRIP DAY! 🚗** selepas tamat. Jam peranti perlu tepat. Kiraan disegerakkan apabila tab kembali aktif; interval dihentikan selepas tamat.
- Countdown menggunakan `role="timer"` tanpa pengumuman setiap saat. Butang mempunyai sasaran sentuhan sekurang-kurangnya 44px dan penunjuk fokus jelas. Kandungan babak tersembunyi dikeluarkan daripada paparan dan urutan tab melalui visibility.
- Daun dan partikel ketibaan bergerak dengan scroll, tidak menangkap input, dan dihentikan sepenuhnya apabila reduced motion diaktifkan. Tiada autoplay muzik atau animasi masa tanpa henti.

## Muat naik manual ke GitHub

1. Gunakan repository public sedia ada bernama **anaiz-gunungjerai** pada akaun `alifamzarsandbox`.
2. Ekstrak pakej ZIP. Pilih **Add file → Upload files**. Muat naik kandungan yang diekstrak ke root repository pada branch **main**, termasuk `src/`, `public/`, `package.json`, `package-lock.json`, `vite.config.js`, `index.html`, `.gitignore`, `README.md`, `RELEASE-CHECKS.md` dan `.github/workflows/deploy.yml`. Jangan muat naik folder pembungkus projek.
3. **Jangan muat naik `node_modules/` atau `dist/`.** GitHub web upload tidak menggunakan `.gitignore` untuk menapis fail yang dipilih; pilih fail sumber sahaja.
4. Pastikan fail tersembunyi `.github/workflows/deploy.yml` turut dimuat naik. Jika folder itu tidak termasuk dalam drag-and-drop, gunakan **Add file → Create new file**, taip laluan `.github/workflows/deploy.yml` dan salin kandungannya. Lakukan perkara sama untuk `.gitignore` jika perlu.
5. Pergi ke **Settings → Pages → Build and deployment → Source → GitHub Actions**.
6. Workflow berjalan apabila terdapat push/commit ke `main`. Jika run awal gagal sebelum Pages diaktifkan, pergi ke tab **Actions**, pilih workflow dan **Run workflow** pada `main`.
7. Tunggu job build dan deploy berjaya. URL repository ini ialah `https://alifamzarsandbox.github.io/anaiz-gunungjerai/` dan turut dipaparkan dalam Settings → Pages.

Vite dikonfigurasi dengan base `/anaiz-gunungjerai/` agar sepadan dengan nama repository sebenar. Workflow menggunakan `npm ci`, membina projek, memuat naik `dist/` dan deploy melalui official GitHub Pages actions. Setiap kemas kini manual pada `main` akan mencetuskan workflow semula.

Job build mempunyai kebenaran `contents: read` dan `pages: read`; job deploy mempunyai `pages: write` dan `id-token: write`. Concurrency mengelakkan deployment serentak. Workflow disemak secara setempat; pengesahan deployment sebenar berlaku selepas anda mengaktifkan Pages dan menjalankannya di GitHub.

## Mengubah kandungan

- Tarikh, tempoh dan nama lokasi: `src/data/trip.js`. Tarikh countdown mesti mempunyai offset `+08:00`; semak juga teks tarikh dalam babak ketibaan dan label aksesibiliti countdown jika menukar tarikh acara.
- Teks cerita: `src/scenes/`. Warna dan susun atur: `src/styles/global.css`.
- Kereta dan landskap: `src/components/illustrations/`. Gerakan: `src/hooks/useJourneyMotion.js` dan `JourneyScenery.jsx`.

## Jika laman belum muncul

- **Workflow tiada:** pastikan `.github/workflows/deploy.yml` wujud pada branch `main` dan GitHub Actions dibenarkan dalam repository.
- **Pages belum diaktifkan:** pilih sumber **GitHub Actions** dalam Settings → Pages, kemudian jalankan workflow semula.
- **Laman kosong atau aset 404:** pastikan nama repository ialah `anaiz-gunungjerai` dan base dalam `vite.config.js` ialah `/anaiz-gunungjerai/`. Jika menukar nama, ubah base sebelum build.
- **`npm ci` gagal:** pastikan `package-lock.json` dimuat naik bersama `package.json`, dan gunakan Node.js 24 seperti workflow. Selepas perubahan dependency, jana dan muat naik lockfile yang sepadan.
- **Countdown tidak tepat:** semak jam peranti. Selepas 24 Oktober 2026, laman sengaja menunjukkan mesej hari perjalanan dan bukannya nombor negatif.

Tiada repository, upload atau deployment dibuat secara automatik dari sesi pembangunan ini. Pengesahan pengguna terakhir masih diperlukan selepas serahan Phase 6.

Rujukan konfigurasi: [Tailwind + Vite](https://tailwindcss.com/docs/installation/using-vite), [Motion for React](https://motion.dev/docs/react-installation), [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
