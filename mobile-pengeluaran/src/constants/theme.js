// Design tokens extracted from design reference
export const COLORS = {
  primary: '#0F766E',
  primaryDark: '#005C55',
  primaryLight: '#CCFBF1',
  primaryContainer: '#A3FAEF',

  surface: '#F8FAFC',
  surfaceContainer: '#FFFFFF',
  surfaceContainerHigh: '#F1F5F9',

  onSurface: '#0F172A',
  onSurfaceVariant: '#64748B',
  onPrimary: '#FFFFFF',

  border: '#CBD5E1',
  borderLight: '#E2E8F0',
  divider: '#F1F5F9',

  error: '#DC2626',
  errorContainer: '#FEF2F2',
  errorText: '#991B1B',

  success: '#16A34A',
  successContainer: '#F0FDF4',

  warning: '#D97706',
  warningContainer: '#FFFBEB',

  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',

  skeleton: '#E2E8F0',
  backdrop: 'rgba(15, 23, 42, 0.5)',

  slate50: '#F8FAFC',
  slate100: '#F1F5F9',
  slate200: '#E2E8F0',
  slate300: '#CBD5E1',
  slate400: '#94A3B8',
  slate500: '#64748B',
  slate600: '#475569',
  slate700: '#334155',
  slate800: '#1E293B',
  slate900: '#0F172A',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const FONT_SIZE = {
  xs: 11,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  '2xl': 20,
  '3xl': 24,
  '4xl': 32,
};

export const FONT_WEIGHT = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};

export const SHADOWS = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  fab: {
    shadowColor: '#0F766E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
};
