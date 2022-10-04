import type {
  PaletteColorOptions,
  TypeText,
} from '@mui/material/styles/createPalette';

export const primary: PaletteColorOptions = {
  main: '#570df8',
  light: '#8249FC',
  dark: '#3D00BF',
};

export const secondary: PaletteColorOptions = {
  main: '#616161',
  light: '#8E8E8E',
  dark: '#373737',
};

export const error: PaletteColorOptions = {
  main: '#D32F2F',
  light: '#EF5350',
  dark: '#C62828',
};

export const warning: PaletteColorOptions = {
  main: '#ED6C02',
  light: '#FF9800',
  dark: '#E65100',
};

export const info: PaletteColorOptions = {
  main: primary.main,
  light: primary.light,
  dark: primary.dark,
};

export const success: PaletteColorOptions = {
  main: '#2E7D32',
  light: '#4CAF50',
  dark: '#1B5E20',
};

export const text: Partial<TypeText> = {
  primary: secondary.dark,
  secondary: secondary.main,
  disabled: secondary.light,
};
