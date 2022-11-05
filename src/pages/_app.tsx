import '../styles/global.css';

import { ThemeProvider } from '@mui/material/styles';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';

import AuthorizedLayout from '@/layouts/AuthorizedLayout';
import { theme } from '@/theme';

import store from '../store/index';

const unauthorizedPath = [
  '/login',
  '/register',
  '/reset-password',
  '/forget-password',
];

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  const app = () => {
    if (unauthorizedPath.includes(router.pathname)) {
      return <Component {...pageProps} />;
    }

    return (
      <AuthorizedLayout>
        <Component {...pageProps} />
      </AuthorizedLayout>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>{app()}</Provider>
    </ThemeProvider>
  );
};

export default MyApp;
