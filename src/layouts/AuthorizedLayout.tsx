import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import { accountActions } from '@/store/index';
import { AppConfig } from '@/utils/AppConfig';

type Props = {
  children: ReactNode;
};

const AuthorizedLayout = ({ children }: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getAccountId = async () => {
      try {
        // const response = await fetch('', {
        //   method: 'GET',
        // });
        // const data = await response.json();
        // if (response.ok) {
        //   dispatch(accountActions.setAccountId(data.accountId));
        // } else {
        //   dispatch(accountActions.setAccountId(data.accountId));
        // }
        const data = { accountId: '123' };
        dispatch(accountActions.setAccountId(data.accountId));
      } catch (e: any) {
        console.log(e);
      }
    };
    getAccountId();
  }, []);

  return (
    <div className="flex h-screen w-full flex-col text-gray-700 antialiased">
      <NavBar title={AppConfig.title} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};
export default AuthorizedLayout;
