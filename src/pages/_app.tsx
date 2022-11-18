import '../styles/global.css';

import { ThemeProvider } from '@mui/material/styles';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import { theme } from '@/theme';
import type { UserSession } from '@/types';

import store from '../store/index';

const MyApp = ({
  Component,
  pageProps,
}: AppProps<{ userSession: UserSession }>) => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ThemeProvider>
  );
};

export default MyApp;
