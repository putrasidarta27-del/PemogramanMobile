// server.js
import express from 'express';
import cors from 'cors';
import { pool } from './db.js';
import 'dotenv/config';
const app = express();
app.use(cors()); // izinkan akses dari aplikasi mobile
app.use(express.json()); // baca body berformat JSON
app.get('/', (req, res) => {
res.send('API Pengeluaran berjalan');
});

let kategori = [
  { id: 1, nama: 'Makanan & Minuman' },
  { id: 2, nama: 'Transportasi' },
  { id: 3, nama: 'Belanja' },
  { id: 4, nama: 'Pendidikan' },
  { id: 5, nama: 'Kesehatan' },
  { id: 6, nama: 'Hiburan' },
  { id: 7, nama: 'Lainnya' },
];

let daftar = [
  { id: 1, judul: 'Makan siang', nominal: 20000, kategori: 'Makanan & Minuman', id_kategori: 1, tanggal: new Date().toISOString().split('T')[0], catatan: 'Nasi padang + es teh' },
  { id: 2, judul: 'Bensin', nominal: 15000, kategori: 'Transportasi', id_kategori: 2, tanggal: new Date().toISOString().split('T')[0], catatan: 'Pertalite motor' },
];

// ambil seluruh kategori
app.get('/kategori', (req, res) => {
  res.json(kategori);
});

// ambil seluruh data
app.get('/pengeluaran', (req, res) => {
  res.json(daftar);
});

// ambil satu data berdasarkan id
app.get('/pengeluaran/:id', (req, res) => {
  const item = daftar.find((d) => d.id === Number(req.params.id));
  if (!item) {
    return res.status(404).json({ pesan: 'Data tidak ditemukan' });
  }
  res.json(item);
});

app.post('/pengeluaran', (req, res) => {
  const { judul, nominal } = req.body;

  if (!judul || !nominal) {
    return res.status(400).json({
      pesan: 'judul dan nominal wajib diisi',
    });
  }
  if (Number(nominal) <= 0) {
    return res.status(400).json({
      pesan: 'nominal harus lebih dari nol',
    });
  }

  const kat = kategori.find((k) => k.id === Number(req.body.id_kategori));
  const baru = {
    id: Date.now(),
    judul,
    nominal: Number(nominal),
    id_kategori: req.body.id_kategori || null,
    kategori: kat ? kat.nama : (req.body.kategori || 'Tanpa kategori'),
    catatan: req.body.catatan || '',
    tanggal: req.body.tanggal || new Date().toISOString().split('T')[0],
  };
  daftar.push(baru);
  res.status(201).json(baru);
});

// Endpoint PUT
app.put('/pengeluaran/:id', (req, res) => {
  const i = daftar.findIndex((d) => d.id === Number(req.params.id));
  if (i === -1) {
    return res.status(404).json({ pesan: 'Data tidak ditemukan' });
  }
  const kat = req.body.id_kategori ? kategori.find((k) => k.id === Number(req.body.id_kategori)) : null;
  daftar[i] = {
    ...daftar[i],
    ...req.body,
    ...(kat ? { kategori: kat.nama } : {}),
    id: daftar[i].id,
  };
  res.json(daftar[i]);
});

// Endpoint DELETE
app.delete('/pengeluaran/:id', (req, res) => {
  const ada = daftar.some((d) => d.id === Number(req.params.id));
  if (!ada) {
    return res.status(404).json({ pesan: 'Data tidak ditemukan' });
  }
  daftar = daftar.filter((d) => d.id !== Number(req.params.id));
  res.status(204).end();
});

const PORT = 3000;
app.listen(PORT, () => {
console.log(`Server berjalan di http://localhost:${PORT}`);
});