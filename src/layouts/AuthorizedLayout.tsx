import type { ReactNode } from 'react';

import Footer from '@/components/Footer';
import { AppConfig } from '@/utils/AppConfig';

import NavBar from '../components/NavBar';

type Props = {
  children: ReactNode;
};

const AuthorizedLayout = ({ children }: Props) => (
  <div className="flex h-screen w-full flex-col text-gray-700 antialiased">
    <NavBar title={AppConfig.title} />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);

export default AuthorizedLayout;
