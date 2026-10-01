import React from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { rupiah, tanggalLokal } from '../helpers';
import styles from '../styles';

// ═══════════════════════════════════════════════════════════════════
// SCREEN: 08_Detail (Detail Screen)
// ═══════════════════════════════════════════════════════════════════
export function Screen08Detail(props) {
  const {
    insets, selectedItem, setCurrentScreen,
    setShowDeleteModal, setEditJudul, setEditNominal, setEditCatatan, setSelectedCategoryId,
  } = props;

  const item = selectedItem;

  // Jika tidak ada item yang dipilih, kembali ke daftar
  if (!item) {
    return (
      <View style={[styles.screenContainer, { paddingTop: insets.top }]}>
        <View style={styles.backHeaderRow}>
          <Pressable style={styles.backLinkBtn} onPress={() => setCurrentScreen('01_Daftar')}>
            <Text style={styles.backLinkText}>‹ Kembali</Text>
          </Pressable>
        </View>
        <View style={styles.centerStateCard}>
          <Text style={styles.emptyStateTitle}>Pilih transaksi</Text>
          <Text style={styles.emptyStateSub}>Silakan pilih transaksi dari daftar.</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.screenContainer, { paddingTop: insets.top }]}>
      {/* Back Button Header */}
      <View style={styles.backHeaderRow}>
        <Pressable style={styles.backLinkBtn} onPress={() => setCurrentScreen('01_Daftar')}>
          <Text style={styles.backLinkText}>‹ Kembali</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollPadding}>
        <Text style={[styles.pageTitle, { marginBottom: 16 }]}>Detail pengeluaran</Text>

        {/* Detail Card */}
        <View style={styles.card08}>
          <View style={styles.row08}>
            <Text style={styles.label08}>JUDUL PENGELUARAN</Text>
            <Text style={styles.val08Judul}>{item.judul}</Text>
          </View>

          <View style={styles.row08}>
            <Text style={styles.label08}>NOMINAL</Text>
            <Text style={styles.val08Nominal}>{rupiah(item.nominal)}</Text>
          </View>

          <View style={styles.row08}>
            <Text style={styles.label08}>TANGGAL</Text>
            <Text style={styles.val08Normal}>{tanggalLokal(item.tanggal)}</Text>
          </View>

          <View style={styles.row08}>
            <Text style={styles.label08}>KATEGORI</Text>
            <Text style={styles.val08Normal}>
              {item.kategori} {item.id_kategori ? `(ID: ${item.id_kategori})` : ''}
            </Text>
          </View>

          <View style={styles.row08}>
            <Text style={styles.label08}>CATATAN</Text>
            <Text style={styles.val08Sub}>{item.catatan || 'Belum ada catatan'}</Text>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionRow08}>
          <Pressable
            style={styles.ubahBtn08}
            onPress={() => {
              setEditJudul(item.judul);
              setEditNominal(item.nominal != null ? String(item.nominal) : '');
              setEditCatatan(item.catatan || '');
              if (setSelectedCategoryId) {
                setSelectedCategoryId(item.id_kategori || 2);
              }
              setCurrentScreen('09_Ubah');
            }}
          >
            <Text style={styles.ubahBtn08Text}>Ubah</Text>
          </Pressable>


          <Pressable style={styles.hapusBtn08} onPress={() => setShowDeleteModal(true)}>
            <Text style={styles.hapusBtn08Text}>Hapus</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SCREEN: 15_Data_Tidak_Ada (404 Error Screen)
// ═══════════════════════════════════════════════════════════════════
export function Screen15DataTidakAda(props) {
  const { insets, setCurrentScreen } = props;

  return (
    <View style={[styles.screenContainer, { paddingTop: insets.top }]}>
      <View style={styles.backHeaderRow}>
        <Pressable style={styles.backLinkBtn} onPress={() => setCurrentScreen('01_Daftar')}>
          <Text style={styles.backLinkText}>‹ Kembali</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollPadding}>
        <Text style={[styles.pageTitle, { marginBottom: 16 }]}>Detail pengeluaran</Text>

        <View style={styles.centerStateCard}>
          <Text style={styles.emptyStateTitle}>Data tidak ditemukan</Text>
          <Text style={styles.emptyStateSub}>Pengeluaran ini mungkin telah dihapus.</Text>
          <Pressable style={[styles.tealFullBtn, { width: '100%', marginTop: 20 }]} onPress={() => setCurrentScreen('01_Daftar')}>
            <Text style={styles.tealFullBtnText}>Kembali ke daftar</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
