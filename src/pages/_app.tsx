import '../styles/global.css';

import { ThemeProvider } from '@mui/material/styles';
import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';

import { theme } from '@/theme';
import type { UserSession } from '@/types';

const MyApp = ({
  Component,
  pageProps,
}: AppProps<{ userSession: UserSession }>) => {
  return (
    <ThemeProvider theme={theme}>
      <NextNProgress color="#29D" height={10} />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
