import type { GetServerSideProps } from 'next';

import type { BasePageProps } from '@/types';

export const getServerSideProps: GetServerSideProps<BasePageProps> = async (
  context
) => {
  const result = await fetch(`${process.env.SERVER_BASE_URL}/api/v1/me`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${context.req.cookies?.access_token}`,
    },
  });

  if (result.ok) {
    const user = await result.json();
    return {
      props: {
        userSession: user,
      },
    };
  }

  return {
    redirect: {
      destination: '/login',
      permanent: false,
    },
  };
};
