import type { ReactNode } from 'react';

import Footer from '@/components/Footer';

import NavBar from '../components/NavBar';

type Props = {
  children: ReactNode;
  title: string | null;
};

const AuthorizedLayout = ({ children, title }: Props) => (
  <div className="flex h-screen w-full flex-col text-gray-700 antialiased">
    <NavBar title={title} />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);

export default AuthorizedLayout;
