import { createTheme } from '@mui/material';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      paper: '#f2f2f2',
    },
    text: {
      primary: '#f2b423',
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      paper: '#222',
    },
    text: {
      primary: '#2a9be6',
    },
  },
});
