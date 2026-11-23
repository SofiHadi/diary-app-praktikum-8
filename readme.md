## Perbedaan Local State, Global Redux State, dan Persistent Database

Dalam pengembangan aplikasi React Native, pengelolaan data dibagi menjadi tiga tingkatan sesuai cakupan dan ketahanannya:

### 1. Local State (`useState` / `useReducer`)

- **Definisi:** State yang dibuat dan dikelola secara internal di dalam satu komponen tertentu.
- **Cakupan:** Hanya dapat diakses oleh komponen tersebut (atau diteruskan ke komponen anak melalui _props_).
- **Ketahanan Data:** Bersifat sementara di memori (_volatile_). Nilai akan ter-reset ke kondisi awal saat pengguna meninggalkan halaman atau komponen mengalami _unmount_.
- **Contoh pada Aplikasi Ini:** Input form sementara (`title`, `body`, `mood`, dan pesan `error`) pada layar `create.tsx` dan `edit/[id].tsx` sebelum tombol simpan ditekan.

### 2. Global Redux State (`Redux Toolkit Store`)

- **Definisi:** State terpusat (_single source of truth_) yang disimpan di luar pohon komponen menggunakan Redux Store.
- **Cakupan:** Dapat dibaca dan diperbarui dari layar mana saja secara sinkron menggunakan `useAppSelector` dan `useAppDispatch`.
- **Ketahanan Data:** Bertahan selama aplikasi berjalan di memori (RAM) saat berpindah antar-tab atau layar, namun akan kembali ke `initialState` ketika aplikasi ditutup sepenuhnya (_force close_) atau di-reload.
- **Contoh pada Aplikasi Ini:** Daftar catatan `entries`, status `liked` (favorite), statistik jumlah diary, dan `moodFilter` yang tersinkronisasi otomatis antara layar **Home**, **Detail**, **Edit**, dan **Favorites**.

### 3. Persistent Database (`AsyncStorage`, `SQLite`, `MMKV`, atau Backend API)

- **Definisi:** Penyimpanan data permanen di memori internal perangkat (_local storage/database_) atau server cloud.
- **Cakupan:** Dapat diakses lintas sesi aplikasi, bahkan setelah aplikasi ditutup atau perangkat di-restart.
- **Ketahanan Data:** Bersifat permanen (_persistent_) hingga data dihapus secara eksplisit oleh pengguna atau aplikasi di-uninstall.
- **Contoh Implementasi:** Mengintegrasikan `redux-persist` dengan `@react-native-async-storage/async-storage` atau menyimpan data ke database SQLite/REST API agar catatan diary tidak hilang saat aplikasi ditutup.

### Ringkasan Perbandingan

| Aspek                     | Local State                   | Global Redux State               | Persistent Database               |
| :------------------------ | :---------------------------- | :------------------------------- | :-------------------------------- |
| **Lokasi Penyimpanan**    | Memori komponen (RAM)         | Memori aplikasi terpusat (RAM)   | Storage perangkat (Disk) / Server |
| **Akses Lintas Screen**   | Tidak (harus lewat props)     | Ya, langsung dari semua screen   | Ya, melalui query / async read    |
| **Saat Pindah Screen**    | Hilang jika screen di-unmount | Tetap tersimpan                  | Tetap tersimpan                   |
| **Saat Aplikasi Ditutup** | Hilang                        | Hilang (reset ke `initialState`) | Tetap tersimpan permanen          |
| **Kegunaan Utama**        | Input form, toggle UI lokal   | Data bersama & sinkronisasi UI   | Penyimpanan data jangka panjang   |
