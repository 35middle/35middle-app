import type { ReactNode } from 'react';

import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import type { UserSession } from '@/types';
import { AppConfig } from '@/utils/AppConfig';

type Props = {
  children: ReactNode;
  userSession?: UserSession;
};

const AuthorizedLayout = ({ children, userSession }: Props) => {
  return (
    <div className="flex h-screen w-full flex-col text-gray-700 antialiased">
      <NavBar title={AppConfig.title} userSession={userSession} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};
export default AuthorizedLayout;
