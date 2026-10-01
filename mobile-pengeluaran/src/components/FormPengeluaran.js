import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import styles from '../styles';
import { rupiah, tanggalLokal } from '../helpers';

const CATEGORIES = [
  { id: null, nama: 'Tanpa kategori' },
  { id: 1, nama: 'Makanan & Minuman' },
  { id: 2, nama: 'Transportasi' },
  { id: 3, nama: 'Belanja' },
  { id: 4, nama: 'Pendidikan' },
  { id: 5, nama: 'Kesehatan' },
  { id: 6, nama: 'Hiburan' },
  { id: 7, nama: 'Lainnya' },
];

export { CATEGORIES };

// ═══════════════════════════════════════════════════════════════════
// SCREEN: 02_Tambah_Kosong & 04_Tambah_Terisi
// ═══════════════════════════════════════════════════════════════════
export function Screen02TambahKosong(props) {
  const {
    insets, inputJudul, setInputJudul, inputNominal, setInputNominal,
    selectedCategoryId, setSelectedCategoryId, setPrevScreen,
    setCurrentScreen, triggerSaveNew,
  } = props;

  const currentCatName = CATEGORIES.find((c) => c.id === selectedCategoryId)?.nama;

  return (
    <View style={[styles.screenContainer, { paddingTop: insets.top }]}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <View style={styles.backHeaderRow}>
          <Pressable style={styles.backLinkBtn} onPress={() => setCurrentScreen('01_Daftar')}>
            <Text style={styles.backLinkText}>‹ Kembali</Text>
          </Pressable>
        </View>

        <ScrollView contentContainerStyle={styles.scrollPadding}>
          <Text style={styles.pageTitle}>Tambah pengeluaran</Text>

          <View style={styles.formBoxClean}>
            {/* Field 1: Judul */}
            <View style={styles.inputGroup}>
              <Text style={styles.fieldLabelClean}>Judul</Text>
              <TextInput
                style={styles.textInputClean}
                placeholder="Masukkan judul"
                placeholderTextColor="#94A3B8"
                value={inputJudul}
                onChangeText={setInputJudul}
              />
            </View>

            {/* Field 2: Nominal */}
            <View style={styles.inputGroup}>
              <Text style={styles.fieldLabelClean}>Nominal</Text>
              <TextInput
                style={styles.textInputClean}
                placeholder="0"
                placeholderTextColor="#94A3B8"
                keyboardType="numeric"
                value={inputNominal}
                onChangeText={setInputNominal}
              />
            </View>

            {/* Field 3: Kategori (opsional) */}
            <View style={styles.inputGroup}>
              <Text style={styles.fieldLabelClean}>Kategori (opsional)</Text>
              <Pressable
                style={styles.selectInputClean}
                onPress={() => {
                  setPrevScreen('02_Tambah_Kosong');
                  setCurrentScreen('03_Pilih_Kategori');
                }}
              >
                <Text
                  style={
                    selectedCategoryId != null
                      ? styles.selectInputCleanTextSelected
                      : styles.selectInputCleanText
                  }
                >
                  {selectedCategoryId != null ? (currentCatName || 'Tanpa kategori') : 'Pilih kategori'}
                </Text>
                <Text style={{ fontSize: 16, color: '#0F766E' }}>›</Text>
              </Pressable>
              <Text style={styles.cleanInfoText}>Tanggal otomatis dari server</Text>
            </View>

            {/* Submit Button */}
            <Pressable
              style={styles.tealFullBtn}
              onPress={() => {
                if (!inputJudul.trim() || !inputNominal.trim()) {
                  setCurrentScreen('05_Form_Error');
                } else {
                  triggerSaveNew();
                }
              }}
            >
              <Text style={styles.tealFullBtnText}>Simpan</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

export function Screen04TambahTerisi(props) {
  return <Screen02TambahKosong {...props} />;
}

// ═══════════════════════════════════════════════════════════════════
// SCREEN: 03_Pilih_Kategori
// ═══════════════════════════════════════════════════════════════════
export function Screen03PilihKategori(props) {
  const { insets, selectedCategoryId, setSelectedCategoryId, prevScreen, setCurrentScreen } = props;

  // Active selected ID (defaults to 2 'Makanan' if null)
  const activeId = selectedCategoryId != null ? selectedCategoryId : 2;

  const handleSelect = (catId) => {
    setSelectedCategoryId(catId);
    setCurrentScreen(prevScreen || '02_Tambah_Kosong');
  };

  return (
    <View style={[styles.screenContainer, { paddingTop: insets.top }]}>
      <View style={styles.backHeaderRow}>
        <Pressable style={styles.backLinkBtn} onPress={() => setCurrentScreen(prevScreen || '02_Tambah_Kosong')}>
          <Text style={styles.backLinkText}>‹ Kembali</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollPadding}>
        <Text style={styles.pageTitle}>Pilih kategori</Text>

        <View style={{ marginTop: 14 }}>
          {CATEGORIES.map((cat) => {
            const isSelected = activeId === cat.id;

            return (
              <Pressable
                key={String(cat.id ?? 'none')}
                style={[styles.catOptionCard, isSelected && styles.catOptionCardSelected]}
                onPress={() => handleSelect(cat.id)}
              >
                <Text style={styles.catOptionName}>{cat.nama}</Text>
                <View style={[styles.catRadioCircle, isSelected && styles.catRadioCircleSelected]}>
                  {isSelected && <View style={styles.catRadioInnerDot} />}
                </View>
              </Pressable>
            );
          })}
        </View>

        <Pressable
          style={[styles.tealFullBtn, { marginTop: 20 }]}
          onPress={() => {
            setSelectedCategoryId(activeId);
            setCurrentScreen(prevScreen || '02_Tambah_Kosong');
          }}
        >
          <Text style={styles.tealFullBtnText}>Pilih</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SCREEN: 05_Form_Error
// ═══════════════════════════════════════════════════════════════════
export function Screen05FormError(props) {
  const { insets, setCurrentScreen, triggerSaveNew } = props;

  return (
    <View style={[styles.screenContainer, { paddingTop: insets.top }]}>
      <View style={styles.backHeaderRow}>
        <Pressable style={styles.backLinkBtn} onPress={() => setCurrentScreen('01_Daftar')}>
          <Text style={styles.backLinkText}>‹ Kembali</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollPadding}>
        <Text style={styles.pageTitle}>Tambah pengeluaran</Text>

        <View style={styles.errorBannerBox}>
          <Text style={styles.errorBannerText}>Silakan perbaiki kesalahan di atas</Text>
        </View>

        <View style={styles.formBoxClean}>
          <View style={styles.inputGroup}>
            <Text style={styles.fieldLabelClean}>Judul</Text>
            <TextInput style={[styles.textInputClean, styles.textInputError]} value="" placeholder="Masukkan judul" />
            <Text style={styles.fieldErrorText}>Judul wajib diisi</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.fieldLabelClean}>Nominal</Text>
            <TextInput style={[styles.textInputClean, styles.textInputError]} value="" placeholder="0" />
            <Text style={styles.fieldErrorText}>Nominal harus berupa angka positif</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.fieldLabelClean}>Kategori (opsional)</Text>
            <View style={styles.selectInputClean}>
              <Text style={styles.selectInputCleanText}>Pilih kategori</Text>
            </View>
            <Text style={styles.cleanInfoText}>Tanggal otomatis dari server</Text>
          </View>

          <Pressable style={styles.tealFullBtn} onPress={triggerSaveNew}>
            <Text style={styles.tealFullBtnText}>Simpan</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SCREEN: 09_Ubah (Edit Form)
// ═══════════════════════════════════════════════════════════════════
export function Screen09Ubah(props) {
  const {
    insets, editJudul, setEditJudul, editNominal, setEditNominal,
    editCatatan, setEditCatatan, selectedCategoryId, setSelectedCategoryId,
    setPrevScreen, setCurrentScreen, triggerSaveEdit, selectedItem,
  } = props;

  const currentCatName = CATEGORIES.find((c) => c.id === (selectedCategoryId ?? selectedItem?.id_kategori ?? 2))?.nama || selectedItem?.kategori || 'Makanan';

  return (
    <View style={[styles.screenContainer, { paddingTop: insets.top }]}>
      <View style={styles.backHeaderRow}>
        <Pressable style={styles.backLinkBtn} onPress={() => setCurrentScreen('08_Detail')}>
          <Text style={styles.backLinkText}>‹ Kembali</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollPadding}>
        <Text style={styles.pageTitle}>Ubah pengeluaran</Text>

        <View style={styles.formBoxClean}>
          <View style={styles.inputGroup}>
            <Text style={styles.fieldLabelClean}>Judul</Text>
            <TextInput style={styles.textInputClean} value={editJudul} onChangeText={setEditJudul} />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.fieldLabelClean}>Nominal</Text>
            <TextInput style={styles.textInputClean} value={editNominal} keyboardType="numeric" onChangeText={setEditNominal} />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.fieldLabelClean}>Kategori</Text>
            <Pressable
              style={styles.selectInputClean}
              onPress={() => {
                setPrevScreen('09_Ubah');
                setCurrentScreen('03_Pilih_Kategori');
              }}
            >
              <Text style={styles.selectInputCleanTextSelected}>{currentCatName}</Text>
              <Text style={{ fontSize: 16, color: '#0F766E' }}>›</Text>
            </Pressable>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.fieldLabelClean}>Tanggal</Text>
            <View style={styles.selectInputClean}>
              <Text style={styles.selectInputCleanTextSelected}>{tanggalLokal(selectedItem?.tanggal || '2026-09-10')}</Text>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.fieldLabelClean}>Catatan</Text>
            <TextInput style={styles.textInputClean} value={editCatatan} onChangeText={setEditCatatan} placeholder="Belum ada catatan" />
          </View>

          <Pressable style={styles.tealFullBtn} onPress={triggerSaveEdit}>
            <Text style={styles.tealFullBtnText}>Simpan perubahan</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
