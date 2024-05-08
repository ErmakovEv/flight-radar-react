import { createTheme } from '@mui/material';

export const tokens = {
  grey: {
    100: '#000000',
    200: '#1a1c1e',
    500: '#7d7f87',
    800: '#d9d9d9',
    900: '#ffffff',
  },
  primary: {
    500: '#239fd8',
    600: '#47813b',
  },
  secondary: {
    500: '#68be56',
    600: '#26a20d',
  },
  greenAccent: {
    100: '#dbf5ee',
    200: '#b7ebde',
    300: '#94e2cd',
    400: '#70d8bd',
    500: '#4cceac',
    600: '#3da58a',
    700: '#2e7c67',
    800: '#1e5245',
    900: '#0f2922',
  },
  redAccent: {
    100: '#f8dcdb',
    200: '#f1b9b7',
    300: '#e99592',
    400: '#e2726e',
    500: '#db4f4a',
    600: '#af3f3b',
    700: '#832f2c',
    800: '#58201e',
    900: '#2c100f',
  },
  blueAccent: {
    100: '#e1e2fe',
    200: '#c3c6fd',
    300: '#a4a9fc',
    400: '#868dfb',
    500: '#6870fa',
    600: '#535ac8',
    700: '#3e4396',
    800: '#2a2d64',
    900: '#151632',
  },
};

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: tokens.primary[500],
    },
    secondary: {
      main: tokens.secondary[600],
    },
    info: {
      light: tokens.grey[200],
      main: tokens.grey[500],
      dark: tokens.grey[900],
    },
    background: {
      default: tokens.grey[800],
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: tokens.primary[500],
    },
    secondary: {
      main: tokens.secondary[500],
    },
    info: {
      light: tokens.grey[800],
      main: tokens.grey[500],
      dark: tokens.grey[100],
    },
    background: {
      default: tokens.grey[200],
    },
  },
});
