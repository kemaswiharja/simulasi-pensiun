# Simulasi Uang Pensiun

Aplikasi web satu halaman untuk menyimulasikan hak pegawai akibat putusnya hubungan kerja,
mengacu pada **Peraturan Dasar Kepegawaian YPT 2024 (PDP.1363/00/DGS-HK01/YPT/2024), Pasal 36**:

1. **Uang Pesangon**: faktor alasan PHK × pengali masa kerja (1–10) × Upah
2. **Uang Penghargaan Masa Kerja (UPMK)**: faktor alasan PHK × pengali (1–8, atau 10 untuk X ≥ 24 tahun) × Upah
3. **Uang Penggantian Hak**: uang penggantian cuti tahunan yang belum diambil dan belum gugur + ongkos pulang
4. **Uang Pisah**: 1 × Upah bulan terakhir, hanya untuk alasan PHK tertentu (ayat 7–8)

Upah = Gaji Dasar + Tunjangan Dasar + Insentif Premium (ayat 2).
Batas masa kerja: batas bawah inklusif, batas atas eksklusif (misalnya 1 tahun ≤ X < 2 tahun).

Contoh (pensiun): masa kerja 25 tahun 6 bulan, Upah Rp7 juta
→ Pesangon 2 × 10 × Rp7 juta = Rp140 juta, UPMK 1 × 10 × Rp7 juta = Rp70 juta.

Uang penggantian cuti = (sisa cuti belum gugur / hari kerja sebulan) × Upah.
Contoh di peraturan: (5/22) × Rp4.000.000 = Rp909.090.

## Deploy ke Vercel

1. Masuk ke [vercel.com](https://vercel.com) dengan akun GitHub.
2. Pilih **Add New → Project**, lalu impor repo ini.
3. Framework Preset: **Other**. Tidak perlu build command. Klik **Deploy**.

## Tombol Suka & penghitung pengunjung

Angka disimpan di Upstash Redis lewat fungsi `api/counter.js`.

1. Di proyek Vercel, buka **Storage → Create Database → Upstash for Redis** (paket Free), lalu sambungkan ke proyek ini.
2. Buka **Deployments → Redeploy** supaya env var database terbaca.
3. Untuk melihat angka mentah: buka `/api/counter` di alamat situs.

Simulasi ini hanya perkiraan. Besaran resmi mengikuti ketetapan Yayasan.
