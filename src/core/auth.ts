import { withIronSessionSsr } from 'iron-session/next';
import type { GetServerSideProps } from 'next';

import { sessionOptions } from '@/lib/session';
import type { BasePageProps } from '@/types';

export const getServerSideProps: GetServerSideProps<BasePageProps> =
  withIronSessionSsr(async function getServerSideProps(context) {
    if (context.req.session.user) {
      return {
        props: {
          userSession: context.req.session.user.userEntity || null,
        },
      };
    }

    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }, sessionOptions);
