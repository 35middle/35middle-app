import '../styles/global.css';

import { ThemeProvider } from '@mui/material/styles';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import AuthorizedLayout from '@/layouts/AuthorizedLayout';
import { theme } from '@/theme';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  const getTitle = (): string | null => {
    if (
      router.pathname === '/account-settings' ||
      router.pathname === '/account-settings/[accountId]'
    ) {
      return 'Account Settings';
    }
    return null;
  };

  if (
    ['/login', '/register', '/reset-password', '/forget-password'].includes(
      router.pathname
    )
  ) {
    return (
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <AuthorizedLayout title={getTitle()}>
        <Component {...pageProps} />
      </AuthorizedLayout>
    </ThemeProvider>
  );
};

export default MyApp;
