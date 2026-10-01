import { StyleSheet } from 'react-native';

// ═══════════════════════════════════════════════════════════════════
// EXACT STYLES MATCHING FIGMA STITCH TEMPLATE SCREENSHOTS
// ═══════════════════════════════════════════════════════════════════
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollPadding: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  scrollListPadding: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 40,
  },

  // ─── Header: Back Button Bar (< Kembali) ───
  backHeaderRow: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  backLinkBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backLinkText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0F766E',
  },

  // ─── Header: Primary Page Title ───
  pageHeaderRow: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0F172A',
  },

  // ─── Screen 01_Daftar Elements ───
  daftarHeaderContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
  },
  daftarTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 12,
  },
  tambahFullBtn: {
    height: 48,
    backgroundColor: '#0F766E',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  tambahFullBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  muatUlangRow: {
    alignSelf: 'flex-end',
    paddingVertical: 4,
  },
  muatUlangText: {
    fontSize: 13,
    color: '#0F766E',
    fontWeight: '500',
  },

  // ─── Transaction Card (Clean Stitch Style) ───
  card01: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
  },
  card01TopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  card01Title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  card01Amount: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F766E',
  },
  card01SubText: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 10,
  },
  card01LinkText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F766E',
  },

  // ─── Form Inputs (Clean Stitch Style) ───
  formBoxClean: {
    gap: 16,
    marginTop: 8,
  },
  inputGroup: {
    gap: 6,
  },
  fieldLabelClean: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
  },
  textInputClean: {
    height: 48,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    paddingHorizontal: 14,
    fontSize: 15,
    color: '#0F172A',
    backgroundColor: '#FFFFFF',
  },
  selectInputClean: {
    height: 48,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
  },
  selectInputCleanText: {
    fontSize: 15,
    color: '#64748B',
  },
  selectInputCleanTextSelected: {
    fontSize: 15,
    color: '#0F172A',
    fontWeight: '600',
  },
  cleanInfoText: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2,
  },
  tealFullBtn: {
    height: 48,
    backgroundColor: '#0F766E',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  tealFullBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },

  // ─── Error Alert Banner (Screen 05) ───
  errorBannerBox: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FCA5A5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 14,
  },
  errorBannerText: {
    color: '#DC2626',
    fontSize: 13,
    fontWeight: '600',
  },
  textInputError: {
    borderColor: '#EF4444',
    borderWidth: 1.5,
    backgroundColor: '#FEF2F2',
  },
  fieldErrorText: {
    fontSize: 12,
    color: '#DC2626',
    fontWeight: '500',
    marginTop: 2,
  },

  // ─── Select Category Options (Screen 03) ───
  catOptionCard: {
    height: 52,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
  },
  catOptionCardSelected: {
    borderColor: '#0F766E',
    borderWidth: 1.5,
  },
  catOptionName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0F172A',
  },
  catRadioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  catRadioCircleSelected: {
    borderColor: '#0F766E',
  },
  catRadioInnerDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0F766E',
  },

  // ─── Detail Screen (Screen 08) ───
  card08: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    padding: 18,
    gap: 14,
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
  },
  row08: {
    gap: 4,
  },
  label08: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  val08Judul: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },
  val08Nominal: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F766E',
  },
  val08Normal: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0F172A',
  },
  val08Sub: {
    fontSize: 14,
    color: '#64748B',
  },
  actionRow08: {
    flexDirection: 'row',
    gap: 12,
  },
  ubahBtn08: {
    flex: 1,
    height: 46,
    backgroundColor: '#0F766E',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ubahBtn08Text: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  hapusBtn08: {
    paddingHorizontal: 20,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hapusBtn08Text: {
    color: '#DC2626',
    fontSize: 15,
    fontWeight: '700',
  },

  // ─── Loading Screen (Screen 06) ───
  savingCenterView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  savingTitleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
    marginTop: 16,
    marginBottom: 24,
  },
  batalOutlineBtn: {
    height: 42,
    paddingHorizontal: 28,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  batalOutlineBtnText: {
    fontSize: 14,
    color: '#475569',
    fontWeight: '600',
  },

  // ─── Banners (Screen 07, 10, 12) ───
  bannerSuccess: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 14,
  },
  bannerSuccessText: {
    color: '#166534',
    fontSize: 13,
    fontWeight: '600',
  },

  // ─── Empty & Error States (Screen 13, 14, 15) ───
  centerStateCard: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 24,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 6,
  },
  emptyStateSub: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 18,
  },
  errorStateTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#DC2626',
    marginBottom: 6,
  },
  errorStateSub: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 20,
  },

  // ─── Modal Konfirmasi Hapus (Screen 11) ───
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  deleteCardModal: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 24,
    alignItems: 'center',
  },
  deleteModalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 8,
  },
  deleteModalItemTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  deleteModalItemAmount: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F766E',
    marginBottom: 10,
  },
  deleteModalSubText: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 20,
  },
  deleteModalActions: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  deleteModalCancelBtn: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteModalCancelText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
  },
  deleteModalConfirmBtn: {
    flex: 1,
    height: 44,
    backgroundColor: '#DC2626',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteModalConfirmText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default styles;
