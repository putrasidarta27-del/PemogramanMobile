import React from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { rupiah, tanggalLokal } from '../helpers';
import styles from '../styles';

const SCREEN_01_ITEMS = [
  { id: 1, judul: 'Makan siang', nominal: 20000, kategori: 'Makanan', id_kategori: 2, tanggal: '2026-09-10', catatan: 'Belum ada catatan' },
  { id: 2, judul: 'Bensin', nominal: 15000, kategori: 'Transportasi', id_kategori: 3, tanggal: '2026-09-09', catatan: 'Bensin motor' },
  { id: 3, judul: 'Buku catatan', nominal: 35000, kategori: 'Pendidikan', id_kategori: 1, tanggal: '2026-09-08', catatan: 'Buku tulis & pulpen' },
];

export { SCREEN_01_ITEMS };

// ═══════════════════════════════════════════════════════════════════
// SCREEN: 01_Daftar (Template Persis Gambar 1 & 2)
// ═══════════════════════════════════════════════════════════════════
export function Screen01Daftar(props) {
  const { insets, itemsList, setSelectedItem, setCurrentScreen, setInputJudul, setInputNominal, setSelectedCategoryId, fetchBackendList } = props;
  const displayList = itemsList && itemsList.length > 0 ? itemsList : SCREEN_01_ITEMS;

  return (
    <View style={[styles.screenContainer, { paddingTop: insets.top }]}>
      {/* Header matching Stitch template */}
      <View style={styles.daftarHeaderContainer}>
        <Text style={styles.daftarTitle}>Pengeluaran</Text>
        <Pressable
          style={styles.tambahFullBtn}
          onPress={() => {
            setInputJudul('');
            setInputNominal('');
            setSelectedCategoryId(null);
            setCurrentScreen('02_Tambah_Kosong');
          }}
        >
          <Text style={styles.tambahFullBtnText}>+ Tambah pengeluaran</Text>
        </Pressable>
        <Pressable style={styles.muatUlangRow} onPress={fetchBackendList}>
          <Text style={styles.muatUlangText}>↻ Muat ulang data</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollListPadding}>
        {displayList.map((item, index) => (
          <Pressable
            key={String(item.id || index)}
            style={styles.card01}
            onPress={() => {
              setSelectedItem(item);
              setCurrentScreen('08_Detail');
            }}
          >
            <View style={styles.card01TopRow}>
              <Text style={styles.card01Title}>{item.judul}</Text>
              <Text style={styles.card01Amount}>{rupiah(item.nominal)}</Text>
            </View>
            <Text style={styles.card01SubText}>
              {item.kategori} • {tanggalLokal(item.tanggal)}
            </Text>
            <Text style={styles.card01LinkText}>Lihat detail</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SCREEN: 07_Daftar_Baru (Setelah Tambah Data)
// ═══════════════════════════════════════════════════════════════════
export function Screen07DaftarBaru(props) {
  const { insets, itemsList, setSelectedItem, setCurrentScreen, fetchBackendList } = props;
  const displayList = itemsList && itemsList.length > 0 ? itemsList : SCREEN_01_ITEMS;

  return (
    <View style={[styles.screenContainer, { paddingTop: insets.top }]}>
      <View style={styles.daftarHeaderContainer}>
        <Text style={styles.daftarTitle}>Pengeluaran</Text>
        <Pressable
          style={styles.tambahFullBtn}
          onPress={() => setCurrentScreen('02_Tambah_Kosong')}
        >
          <Text style={styles.tambahFullBtnText}>+ Tambah pengeluaran</Text>
        </Pressable>
        <Pressable style={styles.muatUlangRow} onPress={fetchBackendList}>
          <Text style={styles.muatUlangText}>↻ Muat ulang data</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollListPadding}>
        <View style={styles.bannerSuccess}>
          <Text style={styles.bannerSuccessText}>Pengeluaran berhasil ditambahkan</Text>
        </View>

        {displayList.map((item, idx) => (
          <Pressable
            key={String(item.id || idx)}
            style={styles.card01}
            onPress={() => {
              setSelectedItem(item);
              setCurrentScreen('08_Detail');
            }}
          >
            <View style={styles.card01TopRow}>
              <Text style={styles.card01Title}>{item.judul}</Text>
              <Text style={styles.card01Amount}>{rupiah(item.nominal)}</Text>
            </View>
            <Text style={styles.card01SubText}>
              {item.kategori} • {tanggalLokal(item.tanggal)}
            </Text>
            <Text style={styles.card01LinkText}>Lihat detail</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SCREEN: 10_Daftar_Diubah (Setelah Ubah Data)
// ═══════════════════════════════════════════════════════════════════
export function Screen10DaftarDiubah(props) {
  const { insets, itemsList, setSelectedItem, setCurrentScreen, fetchBackendList } = props;
  const displayList = itemsList && itemsList.length > 0 ? itemsList : SCREEN_01_ITEMS;

  return (
    <View style={[styles.screenContainer, { paddingTop: insets.top }]}>
      <View style={styles.daftarHeaderContainer}>
        <Text style={styles.daftarTitle}>Pengeluaran</Text>
        <Pressable
          style={styles.tambahFullBtn}
          onPress={() => setCurrentScreen('02_Tambah_Kosong')}
        >
          <Text style={styles.tambahFullBtnText}>+ Tambah pengeluaran</Text>
        </Pressable>
        <Pressable style={styles.muatUlangRow} onPress={fetchBackendList}>
          <Text style={styles.muatUlangText}>↻ Muat ulang data</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollListPadding}>
        <View style={styles.bannerSuccess}>
          <Text style={styles.bannerSuccessText}>Pengeluaran berhasil diubah</Text>
        </View>

        {displayList.map((item, idx) => (
          <Pressable
            key={String(item.id || idx)}
            style={styles.card01}
            onPress={() => {
              setSelectedItem(item);
              setCurrentScreen('08_Detail');
            }}
          >
            <View style={styles.card01TopRow}>
              <Text style={styles.card01Title}>{item.judul}</Text>
              <Text style={styles.card01Amount}>{rupiah(item.nominal)}</Text>
            </View>
            <Text style={styles.card01SubText}>
              {item.kategori} • {tanggalLokal(item.tanggal)}
            </Text>
            <Text style={styles.card01LinkText}>Lihat detail</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SCREEN: 12_Daftar_Dihapus (Setelah Hapus Data)
// ═══════════════════════════════════════════════════════════════════
export function Screen12DaftarDihapus(props) {
  const { insets, itemsList, setSelectedItem, setCurrentScreen, fetchBackendList } = props;
  const displayList = itemsList || SCREEN_01_ITEMS;

  return (
    <View style={[styles.screenContainer, { paddingTop: insets.top }]}>
      <View style={styles.daftarHeaderContainer}>
        <Text style={styles.daftarTitle}>Pengeluaran</Text>
        <Pressable
          style={styles.tambahFullBtn}
          onPress={() => setCurrentScreen('02_Tambah_Kosong')}
        >
          <Text style={styles.tambahFullBtnText}>+ Tambah pengeluaran</Text>
        </Pressable>
        <Pressable style={styles.muatUlangRow} onPress={fetchBackendList}>
          <Text style={styles.muatUlangText}>↻ Muat ulang data</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollListPadding}>
        <View style={styles.bannerSuccess}>
          <Text style={styles.bannerSuccessText}>Pengeluaran berhasil dihapus</Text>
        </View>

        {displayList.map((item, idx) => (
          <Pressable
            key={String(item.id || idx)}
            style={styles.card01}
            onPress={() => {
              setSelectedItem(item);
              setCurrentScreen('08_Detail');
            }}
          >
            <View style={styles.card01TopRow}>
              <Text style={styles.card01Title}>{item.judul}</Text>
              <Text style={styles.card01Amount}>{rupiah(item.nominal)}</Text>
            </View>
            <Text style={styles.card01SubText}>
              {item.kategori} • {tanggalLokal(item.tanggal)}
            </Text>
            <Text style={styles.card01LinkText}>Lihat detail</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SCREEN: 13_Daftar_Kosong (Keadaan Belum Ada Data)
// ═══════════════════════════════════════════════════════════════════
export function Screen13DaftarKosong(props) {
  const { insets, setCurrentScreen } = props;

  return (
    <View style={[styles.screenContainer, { paddingTop: insets.top }]}>
      <View style={styles.daftarHeaderContainer}>
        <Text style={styles.daftarTitle}>Pengeluaran</Text>
        <Pressable
          style={styles.tambahFullBtn}
          onPress={() => setCurrentScreen('02_Tambah_Kosong')}
        >
          <Text style={styles.tambahFullBtnText}>+ Tambah pengeluaran</Text>
        </Pressable>
      </View>

      <View style={styles.centerStateCard}>
        <Text style={styles.emptyStateTitle}>Belum ada pengeluaran</Text>
        <Text style={styles.emptyStateSub}>Catatan pengeluaran Anda akan muncul di sini</Text>
      </View>
    </View>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SCREEN: 14_Gagal_Memuat (Server Offline / Error)
// ═══════════════════════════════════════════════════════════════════
export function Screen14GagalMemuat(props) {
  const { insets, fetchBackendList } = props;

  return (
    <View style={[styles.screenContainer, { paddingTop: insets.top }]}>
      <View style={styles.daftarHeaderContainer}>
        <Text style={styles.daftarTitle}>Pengeluaran</Text>
      </View>

      <View style={styles.centerStateCard}>
        <Text style={styles.errorStateTitle}>Gagal memuat data</Text>
        <Text style={styles.errorStateSub}>Periksa koneksi internet Anda dan coba lagi.</Text>
        <Pressable style={styles.batalOutlineBtn} onPress={fetchBackendList}>
          <Text style={styles.batalOutlineBtnText}>Coba lagi</Text>
        </Pressable>
      </View>
    </View>
  );
}
