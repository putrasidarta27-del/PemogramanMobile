import React from 'react';
import {
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { rupiah } from '../helpers';
import styles from '../styles';

// ═══════════════════════════════════════════════════════════════════
// COMPONENT: Bottom Navigation Bar (Screens 01, 07, 10, 12, 13, 14)
// ═══════════════════════════════════════════════════════════════════
export function BottomNav({
  insets,
  activeTab,
  setActiveTab,
  setCurrentScreen,
  setInputJudul,
  setInputNominal,
  setSelectedCategoryId,
  setShowScreenPicker,
  fetchBackendList,
}) {
  return (
    <View style={[styles.bottomNavContainer, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      {/* 1. Beranda */}
      <Pressable
        style={styles.navItem}
        onPress={() => {
          setActiveTab('beranda');
          setCurrentScreen('01_Daftar');
        }}
      >
        <Text style={[styles.navIcon, activeTab === 'beranda' && styles.navIconActive]}>⊞</Text>
        <Text style={[styles.navLabel, activeTab === 'beranda' && styles.navLabelActive]}>
          Beranda
        </Text>
      </Pressable>

      {/* 2. Laporan */}
      <Pressable
        style={styles.navItem}
        onPress={() => {
          setActiveTab('laporan');
          setCurrentScreen('10_Daftar_Diubah');
        }}
      >
        <Text style={[styles.navIcon, activeTab === 'laporan' && styles.navIconActive]}>📊</Text>
        <Text style={[styles.navLabel, activeTab === 'laporan' && styles.navLabelActive]}>
          Laporan
        </Text>
      </Pressable>

      {/* 3. Center Floating (+) Button */}
      <View style={styles.navCenterFabWrapper}>
        <Pressable
          style={styles.navCenterFab}
          onPress={() => {
            setInputJudul('');
            setInputNominal('');
            setSelectedCategoryId(null);
            setCurrentScreen('02_Tambah_Kosong');
          }}
        >
          <Text style={styles.navCenterFabIcon}>＋</Text>
        </Pressable>
      </View>

      {/* 4. Anggaran */}
      <Pressable
        style={styles.navItem}
        onPress={() => {
          setActiveTab('anggaran');
          setCurrentScreen('12_Daftar_Dihapus');
        }}
      >
        <Text style={[styles.navIcon, activeTab === 'anggaran' && styles.navIconActive]}>🏛️</Text>
        <Text style={[styles.navLabel, activeTab === 'anggaran' && styles.navLabelActive]}>
          Anggaran
        </Text>
      </Pressable>

      {/* 5. Pengaturan */}
      <Pressable
        style={styles.navItem}
        onPress={() => {
          setActiveTab('pengaturan');
          setShowScreenPicker(true);
        }}
      >
        <Text style={[styles.navIcon, activeTab === 'pengaturan' && styles.navIconActive]}>⚙️</Text>
        <Text style={[styles.navLabel, activeTab === 'pengaturan' && styles.navLabelActive]}>
          Pengaturan
        </Text>
      </Pressable>
    </View>
  );
}

// ═══════════════════════════════════════════════════════════════════
// MODAL: 06_Menyimpan (Saving Data...)
// ═══════════════════════════════════════════════════════════════════
export function ModalMenyimpan({ showSavingModal, setShowSavingModal }) {
  return (
    <Modal visible={showSavingModal} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.deleteCardModal}>
          <ActivityIndicator size="large" color="#0F766E" style={{ marginBottom: 16 }} />
          <Text style={styles.deleteModalTitle}>Menyimpan</Text>
          <Text style={styles.deleteModalSubText}>Menyimpan pengeluaran...</Text>
          <Pressable
            style={[styles.deleteModalCancelBtn, { width: '100%', marginTop: 8 }]}
            onPress={() => setShowSavingModal && setShowSavingModal(false)}
          >
            <Text style={styles.deleteModalCancelText}>Batal</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

// ═══════════════════════════════════════════════════════════════════
// MODAL: 11_Konfirmasi_Hapus (Delete Confirmation Modal)
// ═══════════════════════════════════════════════════════════════════
export function ModalKonfirmasiHapus({
  showDeleteModal,
  setShowDeleteModal,
  selectedItem,
  triggerDeleteConfirm,
}) {
  return (
    <Modal visible={showDeleteModal} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.deleteCardModal}>
          <Text style={styles.deleteModalTitle}>Hapus pengeluaran?</Text>
          <Text style={styles.deleteModalItemTitle}>{selectedItem?.judul || 'Makan siang'}</Text>
          <Text style={styles.deleteModalItemAmount}>{rupiah(selectedItem?.nominal || 20000)}</Text>
          <Text style={styles.deleteModalSubText}>Tindakan ini tidak dapat dibatalkan.</Text>

          {/* Actions */}
          <View style={styles.deleteModalActions}>
            <Pressable style={styles.deleteModalCancelBtn} onPress={() => setShowDeleteModal(false)}>
              <Text style={styles.deleteModalCancelText}>Batal</Text>
            </Pressable>

            <Pressable style={styles.deleteModalConfirmBtn} onPress={triggerDeleteConfirm}>
              <Text style={styles.deleteModalConfirmText}>Hapus</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}


// ═══════════════════════════════════════════════════════════════════
// MODAL: Screen Picker (Screen 01 to Screen 15 Selector)
// ═══════════════════════════════════════════════════════════════════
export function ScreenPickerModal({
  showScreenPicker,
  setShowScreenPicker,
  currentScreen,
  setCurrentScreen,
  setShowSavingModal,
  setShowDeleteModal,
  insets,
}) {
  const screensList = [
    { id: '01_Daftar', num: '01', name: 'Daftar', desc: 'Tampilan utama daftar pengeluaran awal' },
    { id: '02_Tambah_Kosong', num: '02', name: 'Tambah Kosong', desc: 'Form tambah pengeluaran kosong' },
    { id: '03_Pilih_Kategori', num: '03', name: 'Pilih Kategori', desc: 'Modal/Layar pemilihan kategori' },
    { id: '04_Tambah_Terisi', num: '04', name: 'Tambah Terisi', desc: 'Form terisi lengkap tervalidasi' },
    { id: '05_Form_Error', num: '05', name: 'Form Error', desc: 'Form dengan peringatan validasi merah' },
    { id: '06_Menyimpan_Demo', num: '06', name: 'Menyimpan', desc: 'Modal proses simpan data sistem' },
    { id: '07_Daftar_Baru', num: '07', name: 'Daftar Baru', desc: 'Daftar setelah data berhasil ditambahkan' },
    { id: '08_Detail', num: '08', name: 'Detail', desc: 'Detail pengeluaran lengkap dengan aksi' },
    { id: '09_Ubah', num: '09', name: 'Ubah', desc: 'Form edit transaksi dengan TRX ID' },
    { id: '10_Daftar_Diubah', num: '10', name: 'Daftar Diubah', desc: 'Daftar setelah data berhasil diubah' },
    { id: '11_Konfirmasi_Hapus_Demo', num: '11', name: 'Konfirmasi Hapus', desc: 'Dialog konfirmasi hapus transaksi' },
    { id: '12_Daftar_Dihapus', num: '12', name: 'Daftar Dihapus', desc: 'Daftar setelah data dihapus & ledger disesuaikan' },
    { id: '13_Daftar_Kosong', num: '13', name: 'Daftar Kosong', desc: 'Keadaan kosong belum ada catatan' },
    { id: '14_Gagal_Memuat', num: '14', name: 'Gagal Memuat', desc: 'Tampilan server offline / gagal koneksi' },
    { id: '15_Data_Tidak_Ada', num: '15', name: 'Data Tidak Ada', desc: 'Tampilan error 404 ID tidak ditemukan' },
  ];

  return (
    <Modal visible={showScreenPicker} transparent animationType="slide">
      <View style={styles.modalOverlayBottom}>
        <View style={[styles.screenPickerCard, { paddingBottom: Math.max(insets.bottom, 16) }]}>
          <View style={styles.screenPickerHeader}>
            <View>
              <Text style={styles.screenPickerTitle}>Pilih Tampilan Layar (1-15)</Text>
              <Text style={styles.screenPickerSubtitle}>
                Setiap layar dibuat 100% persis dengan desain Figma Stitch
              </Text>
            </View>
            <Pressable onPress={() => setShowScreenPicker(false)} style={styles.screenPickerCloseBtn}>
              <Text style={styles.screenPickerCloseText}>✕</Text>
            </Pressable>
          </View>

          <ScrollView style={{ maxHeight: 420 }} showsVerticalScrollIndicator={false}>
            {screensList.map((item) => (
              <Pressable
                key={item.id}
                style={[
                  styles.screenPickerItem,
                  currentScreen === item.id && styles.screenPickerItemActive,
                ]}
                onPress={() => {
                  setShowScreenPicker(false);
                  if (item.id === '06_Menyimpan_Demo') {
                    setShowSavingModal(true);
                    setTimeout(() => setShowSavingModal(false), 2500);
                  } else if (item.id === '11_Konfirmasi_Hapus_Demo') {
                    setShowDeleteModal(true);
                  } else {
                    setCurrentScreen(item.id);
                  }
                }}
              >
                <View style={[styles.screenPickerBadge, currentScreen === item.id && styles.screenPickerBadgeActive]}>
                  <Text style={[styles.screenPickerBadgeText, currentScreen === item.id && styles.screenPickerBadgeTextActive]}>
                    {item.num}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.screenPickerName, currentScreen === item.id && styles.screenPickerNameActive]}>
                    {item.name}
                  </Text>
                  <Text style={styles.screenPickerDesc}>{item.desc}</Text>
                </View>
                <Text style={{ fontSize: 16, color: '#94A3B8' }}>›</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
