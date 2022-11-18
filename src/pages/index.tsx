import Router from 'next/router';
import { useEffect } from 'react';

import type { BasePageProps } from '@/types';

export { getServerSideProps } from '@/core/auth';

type Props = BasePageProps;

const Index = ({ userSession }: Props) => {
  useEffect(() => {
    if (userSession) {
      Router.replace(`/account/${userSession.accountId}/projects`);
    }
  }, []);
};

export default Index;
