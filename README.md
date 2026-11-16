# Simulasi Uang Pensiun

Aplikasi web satu halaman untuk menyimulasikan uang pensiun yang terdiri dari:

1. **Uang Pesangon**: pengali 1×–10× (Gaji Dasar + Tunjangan Dasar) sesuai masa kerja
2. **Uang Penghargaan Masa Kerja (UPMK)**: pengali 1×–8×, dan 10× untuk masa kerja > 24 tahun
3. **Uang Penggantian Hak**: 15% × UPMK (bagi yang memenuhi syarat) + cuti/THR/insentif yang belum dibayar + hal lain yang ditetapkan Yayasan

Contoh: masa kerja 25 tahun 6 bulan, Gaji Dasar Rp1 juta, Tunjangan Dasar Rp6 juta
→ Rp70 juta + Rp70 juta + Rp10,5 juta = **Rp150,5 juta**.

## Deploy ke Vercel

1. Masuk ke [vercel.com](https://vercel.com) dengan akun GitHub.
2. Pilih **Add New → Project**, lalu impor repo ini.
3. Framework Preset: **Other**. Tidak perlu build command. Klik **Deploy**.

## Tombol Suka & penghitung pengunjung

Angka disimpan di Upstash Redis lewat fungsi `api/counter.js`.

1. Di proyek Vercel, buka **Storage → Create Database → Upstash for Redis** (paket Free), lalu sambungkan ke proyek ini.
2. Buka **Deployments → Redeploy** supaya env var database terbaca.
3. Untuk melihat angka mentah: buka `/api/counter` di alamat situs.

Statistik kunjungan yang lebih rinci (negara, perangkat, halaman) tersedia di tab **Analytics** setelah Web Analytics diaktifkan.

Simulasi ini hanya perkiraan. Besaran resmi mengikuti ketetapan Yayasan.
