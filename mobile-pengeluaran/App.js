import React, { useEffect, useState, useCallback } from 'react';
import { BackHandler, View, StatusBar, Pressable, Text } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

import { api } from './src/api';

// ─── Components ───────────────────────────────────────────────────
import { ModalMenyimpan, ModalKonfirmasiHapus, ScreenPickerModal } from './src/components/Tombol';
import {
  Screen01Daftar,
  Screen07DaftarBaru,
  Screen10DaftarDiubah,
  Screen12DaftarDihapus,
  Screen13DaftarKosong,
  Screen14GagalMemuat,
} from './src/components/DaftarPengeluaran';
import { Screen08Detail, Screen15DataTidakAda } from './src/components/DetailPengeluaran';
import {
  Screen02TambahKosong,
  Screen03PilihKategori,
  Screen04TambahTerisi,
  Screen05FormError,
  Screen09Ubah,
  CATEGORIES,
} from './src/components/FormPengeluaran';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ExpenseApp />
    </SafeAreaProvider>
  );
}

function ExpenseApp() {
  const insets = useSafeAreaInsets();

  // Active Screen
  const [currentScreen, setCurrentScreen] = useState('01_Daftar');
  const [prevScreen, setPrevScreen] = useState('01_Daftar');

  // Bottom Nav Tab
  const [activeTab, setActiveTab] = useState('beranda');

  // Screen Switcher Modal
  const [showScreenPicker, setShowScreenPicker] = useState(false);

  // Modal 06_Menyimpan & Modal 11_Konfirmasi_Hapus
  const [showSavingModal, setShowSavingModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Selected Detail Item
  const [selectedItem, setSelectedItem] = useState(null);

  // Form Inputs for 02, 04, 05, 09
  const [inputJudul, setInputJudul] = useState('');
  const [inputNominal, setInputNominal] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [inputCatatan, setInputCatatan] = useState('');

  // Edit screen fields (09_Ubah)
  const [editJudul, setEditJudul] = useState('Makan Siang Ayam Geprek Komplit');
  const [editNominal, setEditNominal] = useState('25000');
  const [editCatatan, setEditCatatan] = useState('Paket geprek level 3 + es teh + tambah tahu');

  // Success Banners Dismissal
  const [banner07Visible, setBanner07Visible] = useState(true);
  const [banner10Visible, setBanner10Visible] = useState(true);
  const [banner12Visible, setBanner12Visible] = useState(true);

  // Network diagnostic accordion on screen 14
  const [showNetworkInfo, setShowNetworkInfo] = useState(false);

  // Sync with real backend if accessible
  const [refreshing, setRefreshing] = useState(false);
  const [realItems, setRealItems] = useState(null);
  const [itemsList, setItemsList] = useState([]);

  // ─── Hardware Back Button ──────────────────────────────────────
  useEffect(() => {
    const onBack = () => {
      if (showDeleteModal) {
        setShowDeleteModal(false);
        return true;
      }
      if (showScreenPicker) {
        setShowScreenPicker(false);
        return true;
      }
      if (currentScreen === '03_Pilih_Kategori') {
        setCurrentScreen(prevScreen);
        return true;
      }
      if (currentScreen === '09_Ubah') {
        setCurrentScreen('08_Detail');
        return true;
      }
      if (currentScreen !== '01_Daftar') {
        setCurrentScreen('01_Daftar');
        return true;
      }
      return false;
    };
    const sub = BackHandler.addEventListener('hardwareBackPress', onBack);
    return () => sub.remove();
  }, [currentScreen, prevScreen, showDeleteModal, showScreenPicker]);

  // ─── Fetch real backend items silently in background ───────────
  const fetchBackendList = useCallback(async (isManual = false) => {
    try {
      setRefreshing(true);
      const data = await api.list();
      if (Array.isArray(data) && data.length > 0) {
        setRealItems(data);
        setItemsList(data);
        // Kembali ke daftar jika sebelumnya di layar kosong/error
        setCurrentScreen((prev) =>
          (prev === '13_Daftar_Kosong' || prev === '14_Gagal_Memuat') ? '01_Daftar' : prev
        );
      } else if (Array.isArray(data) && data.length === 0) {
        // Backend kosong → tampil layar 13
        setItemsList([]);
        setCurrentScreen('13_Daftar_Kosong');
      }
    } catch {
      // Jika user sengaja tekan muat ulang dan server mati → tampil layar 14
      if (isManual) {
        setCurrentScreen('14_Gagal_Memuat');
      }
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchBackendList();
  }, [fetchBackendList]);

  // ─── Cek item masih ada di server (untuk Layar 15) ────────────
  const bukaDetail = useCallback(async (item) => {
    setSelectedItem(item);
    try {
      await api.detail(item.id);
      setCurrentScreen('08_Detail');
    } catch (e) {
      if (e.status === 404) {
        setCurrentScreen('15_Data_Tidak_Ada');
      } else {
        setCurrentScreen('08_Detail');
      }
    }
  }, []);

  // ─── Trigger Save Flow ─────────────────────────────────────────
  const triggerSaveNew = async () => {
    setShowSavingModal(true);

    const catObj = CATEGORIES.find((c) => c.id === selectedCategoryId);
    const categoryName = catObj ? catObj.nama : 'Tanpa kategori';
    const nominalNum = parseFloat(String(inputNominal).replace(/[^0-9.]/g, '')) || 0;

    const newItem = {
      id: Date.now(),
      judul: inputJudul.trim() || 'Pengeluaran Baru',
      nominal: nominalNum,
      kategori: categoryName,
      id_kategori: selectedCategoryId,
      tanggal: new Date().toISOString().split('T')[0],
      catatan: inputCatatan || '',
    };

    try {
      const saved = await api.create({
        judul: newItem.judul,
        nominal: newItem.nominal,
        id_kategori: newItem.id_kategori,
        kategori: newItem.kategori,
        catatan: newItem.catatan,
      });
      if (saved && saved.id) {
        newItem.id = saved.id;
      }
    } catch (e) {
      console.log('Backend create fallback:', e.message);
    }

    setItemsList((prev) => [newItem, ...prev]);

    // Reset inputs
    setInputJudul('');
    setInputNominal('');
    setSelectedCategoryId(null);
    setInputCatatan('');

    setTimeout(() => {
      setShowSavingModal(false);
      setBanner07Visible(true);
      setCurrentScreen('07_Daftar_Baru');
    }, 800);
  };

  const triggerSaveEdit = async () => {
    if (!selectedItem) return;
    setShowSavingModal(true);

    const catObj = CATEGORIES.find((c) => c.id === selectedCategoryId);
    const categoryName = catObj ? catObj.nama : (selectedItem.kategori || 'Tanpa kategori');
    const nominalNum = parseFloat(String(editNominal).replace(/[^0-9.]/g, '')) || selectedItem.nominal;

    const updatedItem = {
      ...selectedItem,
      judul: editJudul.trim() || selectedItem.judul,
      nominal: nominalNum,
      kategori: categoryName,
      id_kategori: selectedCategoryId ?? selectedItem.id_kategori,
      catatan: editCatatan,
    };

    try {
      await api.update(selectedItem.id, {
        judul: updatedItem.judul,
        nominal: updatedItem.nominal,
        id_kategori: updatedItem.id_kategori,
        kategori: updatedItem.kategori,
        catatan: updatedItem.catatan,
      });
    } catch (e) {
      console.log('Backend edit fallback:', e.message);
    }

    setItemsList((prev) => prev.map((item) => (item.id === selectedItem.id ? updatedItem : item)));
    setSelectedItem(updatedItem);

    setTimeout(() => {
      setShowSavingModal(false);
      setBanner10Visible(true);
      setCurrentScreen('10_Daftar_Diubah');
    }, 800);
  };

  const triggerDeleteConfirm = async () => {
    setShowDeleteModal(false);

    if (selectedItem) {
      try {
        await api.remove(selectedItem.id);
      } catch (e) {
        console.log('Backend delete fallback:', e.message);
      }
      setItemsList((prev) => prev.filter((item) => item.id !== selectedItem.id));
    }

    setTimeout(() => {
      setBanner12Visible(true);
      setCurrentScreen('12_Daftar_Dihapus');
    }, 300);
  };

  // ─── Shared Props for all components ───────────────────────────
  const sharedProps = {
    insets,
    currentScreen, setCurrentScreen,
    prevScreen, setPrevScreen,
    activeTab, setActiveTab,
    showScreenPicker, setShowScreenPicker,
    showSavingModal, setShowSavingModal,
    showDeleteModal, setShowDeleteModal,
    selectedItem, setSelectedItem,
    itemsList, setItemsList,
    inputJudul, setInputJudul,
    inputNominal, setInputNominal,
    selectedCategoryId, setSelectedCategoryId,
    inputCatatan, setInputCatatan,
    editJudul, setEditJudul,
    editNominal, setEditNominal,
    editCatatan, setEditCatatan,
    banner07Visible, setBanner07Visible,
    banner10Visible, setBanner10Visible,
    banner12Visible, setBanner12Visible,
    showNetworkInfo, setShowNetworkInfo,
    refreshing, realItems,
    fetchBackendList,
    fetchBackendListManual: () => fetchBackendList(true),
    bukaDetail,
    triggerSaveNew,
    triggerSaveEdit,
    triggerDeleteConfirm,
  };

  // ═══════════════════════════════════════════════════════════════
  // MAIN ROUTING - FIGMA SLIDES 01 HINGGA 15
  // ═══════════════════════════════════════════════════════════════
  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      {/* Slide 06: Modal Menyimpan Data */}
      <ModalMenyimpan showSavingModal={showSavingModal} setShowSavingModal={setShowSavingModal} />

      {/* Slide 11: Modal Dialog Konfirmasi Hapus Transaksi */}
      <ModalKonfirmasiHapus
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        selectedItem={selectedItem}
        triggerDeleteConfirm={triggerDeleteConfirm}
      />

      {/* Layar Modal Navigasi Pemilih Layar (1-15) */}
      <ScreenPickerModal
        showScreenPicker={showScreenPicker}
        setShowScreenPicker={setShowScreenPicker}
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
        setShowSavingModal={setShowSavingModal}
        setShowDeleteModal={setShowDeleteModal}
        insets={insets}
      />

      {/* Slide 01: Layar Utama Daftar Pengeluaran Awal */}
      {currentScreen === '01_Daftar' && <Screen01Daftar {...sharedProps} />}

      {/* Slide 02: Form Tambah Pengeluaran (Kosong) */}
      {currentScreen === '02_Tambah_Kosong' && <Screen02TambahKosong {...sharedProps} />}

      {/* Slide 03: Modal / Layar Pemilihan Kategori Transaksi */}
      {currentScreen === '03_Pilih_Kategori' && <Screen03PilihKategori {...sharedProps} />}

      {/* Slide 04: Form Tambah Pengeluaran (Terisi Valid) */}
      {currentScreen === '04_Tambah_Terisi' && <Screen04TambahTerisi {...sharedProps} />}

      {/* Slide 05: Form Tambah Pengeluaran (Peringatan Red Error Validasi) */}
      {currentScreen === '05_Form_Error' && <Screen05FormError {...sharedProps} />}

      {/* Slide 07: Daftar Pengeluaran Setelah Data Ditambahkan (Banner Green Success) */}
      {currentScreen === '07_Daftar_Baru' && <Screen07DaftarBaru {...sharedProps} />}

      {/* Slide 08: Layar Detail Rincian Transaksi */}
      {currentScreen === '08_Detail' && <Screen08Detail {...sharedProps} />}

      {/* Slide 09: Form Ubah / Edit Transaksi */}
      {currentScreen === '09_Ubah' && <Screen09Ubah {...sharedProps} />}

      {/* Slide 10: Daftar Pengeluaran Setelah Data Diubah (Banner Blue Info) */}
      {currentScreen === '10_Daftar_Diubah' && <Screen10DaftarDiubah {...sharedProps} />}

      {/* Slide 12: Daftar Pengeluaran Setelah Data Dihapus (Banner Gray Ledger) */}
      {currentScreen === '12_Daftar_Dihapus' && <Screen12DaftarDihapus {...sharedProps} />}

      {/* Slide 13: Layar Empty State (Belum ada catatan transaksi) */}
      {currentScreen === '13_Daftar_Kosong' && <Screen13DaftarKosong {...sharedProps} />}

      {/* Slide 14: Layar Error Network / Server Offline */}
      {currentScreen === '14_Gagal_Memuat' && <Screen14GagalMemuat {...sharedProps} />}

      {/* Slide 15: Layar Error 404 / Data Transaksi Tidak Ditemukan */}
      {currentScreen === '15_Data_Tidak_Ada' && <Screen15DataTidakAda {...sharedProps} />}
    </View>
  );
}