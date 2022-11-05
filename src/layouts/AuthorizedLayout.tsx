import { Box } from '@mui/material';
import Head from 'next/head';
import type { ReactNode } from 'react';

import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import type { BasePageProps } from '@/types';
import { AppConfig } from '@/utils/AppConfig';

type Props = BasePageProps & {
  children: ReactNode;
  title: string;
  description: string;
};

const AuthorizedLayout = ({
  children,
  userSession,
  title,
  description,
}: Props) => {
  return (
    <main>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <Box className="flex h-screen w-full flex-col bg-background text-gray-700 antialiased">
        <NavBar title={AppConfig.title} userSession={userSession} />
        <main className="flex-1">{children}</main>
        <Footer />
      </Box>
    </main>
  );
};
export default AuthorizedLayout;
