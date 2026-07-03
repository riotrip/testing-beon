# 📋 Panduan Instalasi - Sistem Manajemen RT

Aplikasi web untuk mengelola data penghuni rumah, tagihan iuran, pengeluaran operasional, dan laporan keuangan RT.

## 🚀 Quick Start

### Prerequisites

- Node.js v18+ dan npm
- PHP 8.1+ dan Composer
- MySQL 8.0+
- Git

### Step 1: Clone Repository

```bash
git clone <repository-url>
cd testing_beon
```

### Step 2: Setup Backend (Laravel)

```bash
cd backend

# Install PHP dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Configure database di .env
# DB_HOST=localhost
# DB_PORT=3306
# DB_DATABASE=testing_beon
# DB_USERNAME=root
# DB_PASSWORD=

# Run migrations & seeders
php artisan migrate:fresh --seed

# Create storage symlink (untuk public files/photos)
php artisan storage:link

# Start server (port 8000)
php artisan serve
```

### Step 3: Setup Frontend (React + Vite)

```bash
cd ../frontend

# Install JavaScript dependencies
npm install

# Configure API endpoint di .env
# VITE_API_URL=http://localhost:8000/api

# Start development server (port 5173)
npm run dev
```

### Step 4: Access Application

```
Frontend: http://localhost:5173
Backend API: http://localhost:8000/api
```

---

## 📦 Tech Stack

**Backend:**

- Laravel 11.x (PHP Framework)
- Sanctum (API Authentication)
- MySQL Database

**Frontend:**

- React 19.2.7
- React Router 7.18.1
- Tailwind CSS
- Vite (Build Tool)
- Axios (HTTP Client)

---

## ✨ Fitur-Fitur Aplikasi

### 0. Login

- email: rt@gmail.com
- password: password

<img width="1904" height="1039" alt="image" src="https://github.com/user-attachments/assets/63615b24-dc22-4db4-a7d9-30e9f874ec44" />

### 1. 📊 Dashboard

Halaman utama yang menampilkan ringkasan data dan statistik RT/RW

**Konten:**

- Total Rumah (jumlah unit properti terdaftar)
- Total Warga (jumlah penghuni aktif)
- Saldo Kas (selisih pemasukan - pengeluaran)
- Tagihan Pending (tagihan yang belum dibayar)
- Aktivitas Terkini

<img width="1721" height="1039" alt="image" src="https://github.com/user-attachments/assets/c7934581-6097-4df2-8c5a-b520968f2fc1" />

---

### 2. 🏠 Master - Manajemen Rumah

Mengelola data properti/unit rumah dengan status kepemilikan

**Fitur:**

- **Tampil Daftar Rumah** - Tabel semua unit dengan nomor, alamat, dan status
  - Status: "Dihuni" (hijau) / "Tidak Dihuni" (merah)
  - Kolom: Nomor, Alamat, Status, Aksi
- **Tambah Rumah (Add)** - Form untuk menambah unit baru
  - Input: Nomor Rumah, Alamat
  - Default Status: Tidak Dihuni
- **Edit Rumah** - Ubah data unit yang sudah ada
  - Input: Nomor Rumah, Alamat, Status
- **Lihat Detail (Detail)** - Melihat informasi lengkap dan riwayat penghuni
  - Data: Nomor, Alamat, Status
  - Riwayat Penghuni: Nama, Tanggal Masuk, Tanggal Keluar
- **Hapus Rumah** - Menghapus unit dengan konfirmasi

<img width="1721" height="1039" alt="image" src="https://github.com/user-attachments/assets/920cd2d0-cf61-4a92-8318-242d05b2d9a1" />
<img width="1721" height="1039" alt="image" src="https://github.com/user-attachments/assets/163b81e1-558d-4922-a449-88eda4468d3f" />
<img width="1721" height="1039" alt="image" src="https://github.com/user-attachments/assets/745c0360-0be7-45e1-9f97-d57ce9b456f9" />
<img width="1721" height="1039" alt="image" src="https://github.com/user-attachments/assets/1d136d45-c81d-4431-992b-724730d33c66" />
<img width="1721" height="1039" alt="image" src="https://github.com/user-attachments/assets/f7b91cc8-5afe-4bc9-a5d0-ddbe230a095f" />

---

### 3. 👥 Master - Manajemen Penghuni (Tenant)

Mengelola data penghuni/warga dengan penugasan ke rumah

**Fitur:**

- **Tampil Daftar Penghuni** - Tabel semua warga dengan info dasar
  - Kolom: Nama, No. HP, Status Kawin, Status (Aktif/Nonaktif), Aksi
  - Badge Status Kawin: Kawin/Belum Kawin
- **Tambah Penghuni (Add)** - Form untuk menambah warga baru
  - Input: Nama (required), Foto KTP (required), No. HP, Status Kawin
  - Optional: Assign ke Rumah saat pembuatan dengan Tanggal Masuk
- **Edit Penghuni** - Ubah data warga
  - Input: Nama, No. HP, Status Kawin, Status
- **Lihat Detail (Detail)** - Melihat informasi lengkap dan riwayat menghuni
  - Data: Nama, No. HP, Status Kawin, Status Aktif
  - Riwayat Menghuni: Nama Rumah, Tanggal Masuk, Tanggal Keluar
- **Assign ke Rumah** - Menempatkan penghuni ke unit yang kosong
  - Syarat: Hanya bisa assign ke rumah dengan status "Tidak Dihuni"
  - Input: Pilih Rumah, Tanggal Masuk
  - Efek: Status rumah otomatis berubah menjadi "Dihuni"
- **Hapus/Nonaktifkan Penghuni** - Menghapus/menonaktifkan warga

<img width="1721" height="1039" alt="image" src="https://github.com/user-attachments/assets/f2357def-1bd0-42f5-bf1d-2bb11c82bced" />
<img width="1721" height="1039" alt="image" src="https://github.com/user-attachments/assets/320bfa28-007c-475d-a768-4378c74391da" />
<img width="1721" height="1039" alt="image" src="https://github.com/user-attachments/assets/db66ee36-52ee-4f6f-99c0-a6f1fce3a7ee" />
<img width="1721" height="1039" alt="image" src="https://github.com/user-attachments/assets/4c13c9a1-7bad-49fc-aaab-b996fa376232" />
<img width="1721" height="1039" alt="image" src="https://github.com/user-attachments/assets/3a87fef8-190c-4ed9-ae64-1c8dd92f51ef" />

---

### 4. 💳 Transaksi - Penagihan (Billing/Invoice)

Mengelola tagihan iuran bulanan/tahunan penghuni

**Fitur:**

- **Tampil Daftar Tagihan** - Tabel semua tagihan iuran
  - Kolom: Rumah, Jenis Iuran, Periode, Nominal, Status Bayar, Aksi
  - Badge Status: "Lunas" (hijau) / "Belum Bayar" (amber)
- **Generate Tagihan (Tambah)** - Membuat tagihan baru
  - Input: Pilih Rumah, Jenis Iuran (Bulanan/Tahunan), Periode, Nominal
  - Default Status: Belum Bayar
- **Update Status Pembayaran** - Menandai tagihan sebagai lunas
  - Input: Status Bayar (Belum Bayar/Lunas)
- **Hapus Tagihan** - Menghapus tagihan yang sudah dibuat

<img width="1721" height="1172" alt="image" src="https://github.com/user-attachments/assets/1f5a5e51-484e-4e42-9782-545000decc57" />
<img width="1721" height="1039" alt="image" src="https://github.com/user-attachments/assets/ebf931cb-b44d-4356-a540-2ab7334349d5" />
<img width="1721" height="1039" alt="image" src="https://github.com/user-attachments/assets/a41c91bd-58ae-4835-b520-e96c34299c1f" />
<img width="1721" height="1039" alt="image" src="https://github.com/user-attachments/assets/8441d57a-81a5-4d8e-8ecb-40009f84c038" />

---

### 5. 💰 Transaksi - Pengeluaran (Expenses)

Mencatat biaya operasional RT/RW

**Fitur:**

- **Tampil Daftar Pengeluaran** - Tabel semua transaksi pengeluaran
  - Kolom: Tanggal, Kategori, Deskripsi, Nominal, Aksi
  - Kategori Badge: Perbaikan / Utilitas / Lainnya
- **Catat Pengeluaran (Add)** - Membuat pengeluaran baru
  - Input: Tanggal, Kategori (Perbaikan/Utilitas/Lainnya), Deskripsi, Jumlah
- **Edit Pengeluaran** - Mengubah data pengeluaran
  - Input: Tanggal, Kategori, Deskripsi, Jumlah
- **Hapus Pengeluaran** - Menghapus pencatatan pengeluaran

<img width="1721" height="1039" alt="image" src="https://github.com/user-attachments/assets/0b0c9c08-c781-4754-8658-b0f3a0f223a9" />
<img width="1721" height="1039" alt="image" src="https://github.com/user-attachments/assets/11509b36-9d34-4eb8-8d88-07fa09d15e94" />
<img width="1721" height="1039" alt="image" src="https://github.com/user-attachments/assets/20d77b86-2695-46de-9c6c-bcdcf6f4d5c8" />
<img width="1721" height="1039" alt="image" src="https://github.com/user-attachments/assets/78545e7d-77f8-4034-819f-e2fba664178e" />

---

### 6. 📈 Laporan - Laporan Keuangan

Dashboard keuangan dengan summary pemasukan dan pengeluaran per bulan

**Fitur:**

- **Filter Tahun** - Input tahun untuk melihat data tahun tertentu
- **Summary per Bulan** - Tabel ringkasan keuangan bulanan
  - Kolom: Bulan, Total Pemasukan, Total Pengeluaran, Aksi
  - Warna: Pemasukan (hijau), Pengeluaran (merah)
- **Detail Transaksi per Periode** - Melihat detail pemasukan dan pengeluaran
  - Pemasukan: Daftar tagihan yang sudah dibayar untuk periode tersebut
  - Pengeluaran: Daftar pengeluaran operasional untuk periode tersebut
  - Kolom: Keterangan, Nominal, Tanggal

<img width="1721" height="1039" alt="image" src="https://github.com/user-attachments/assets/e3784093-6861-4259-ba4a-0308bcb24e15" />
<img width="1721" height="1039" alt="image" src="https://github.com/user-attachments/assets/e5e959fa-27db-49b1-8134-731b652bb913" />

---

## 🔐 Authentication & Security

- **API Authentication**: Sanctum Token
- **Endpoint Protection**: Semua API endpoint memerlukan token valid
- **Secure Token Storage**: Token disimpan di localStorage
- **Automatic Token Management**: Token akan otomatis di-refresh bila diperlukan

---

## 📁 Project Structure

```
testing_beon/
├── backend/                          # Laravel API
│   ├── app/
│   │   ├── Http/Controllers/        # API Controllers
│   │   └── Models/                  # Database Models
│   ├── database/
│   │   ├── migrations/              # Database Schema
│   │   └── seeders/                 # Sample Data
│   ├── routes/
│   │   └── api.php                  # API Routes
│   └── .env                         # Configuration
│
├── frontend/                        # React App
│   ├── src/
│   │   ├── pages/                   # Page Components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Master/
│   │   │   │   ├── Rumah.jsx
│   │   │   │   └── Penghuni.jsx
│   │   │   ├── Transaction/
│   │   │   │   ├── Tagihan.jsx
│   │   │   │   └── Pengeluaran.jsx
│   │   │   └── Report/
│   │   │       └── Laporan.jsx
│   │   ├── components/              # Reusable Components
│   │   │   ├── Rumah/               # Rumah Modals
│   │   │   ├── Penghuni/            # Penghuni Modals
│   │   │   ├── Tagihan/             # Tagihan Modals
│   │   │   ├── Pengeluaran/         # Pengeluaran Modals
│   │   │   ├── Laporan/             # Laporan Modals
│   │   │   └── common/              # Shared Components
│   │   ├── api/
│   │   │   └── axios.js             # API Configuration
│   │   └── main.jsx                 # Entry Point
│   ├── .env                         # Frontend Configuration
│   └── vite.config.js               # Build Configuration
│
└── create.md                        # Documentation
```

---

## 🏗️ Entity Relationship Diagram (ERD)

<img width="5364" height="3964" alt="image" src="https://github.com/user-attachments/assets/b5fa1d87-a8f8-4657-bb74-213089b0b5d2" />
<img width="600" height="536" alt="image" src="https://github.com/user-attachments/assets/cfa3e458-3010-4ac8-9da0-53beee1b8216" />

## 🧪 Testing

### Backend API Testing (Postman/Insomnia)

```
Base URL: http://localhost:8000/api

Endpoints:
- POST /login - Login & dapatkan token
- GET /rumah - Daftar rumah
- POST /rumah - Tambah rumah
- GET /penghuni - Daftar penghuni
- POST /rumah/{id}/tambah-penghuni - Assign penghuni ke rumah
```

### Frontend Development

```bash
# Development mode dengan hot reload
npm run dev

# Build untuk production
npm run build

# Preview build
npm run preview
```

---

## 🐛 Troubleshooting

### Backend Issues

**Error: "Connection refused" saat koneksi database**

- Pastikan MySQL sudah running: `sudo systemctl start mysql`
- Periksa konfigurasi .env untuk DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD

**Error: "CORS error"**

- Periksa CORS configuration di `config/cors.php`
- Pastikan frontend URL sudah di-whitelist

**Error: "Storage link not found"**

- Jalankan: `php artisan storage:link`

### Frontend Issues

**Error: "API_URL is not defined"**

- Pastikan file .env di folder frontend sudah ada dengan VITE_API_URL

**Error: "Cannot find module '@components'"**

- Jalankan: `npm install`

**Port 5173 already in use**

- Gunakan port alternatif: `npm run dev -- --port 5174`

---

## Thank You
