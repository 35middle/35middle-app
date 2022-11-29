import type { IronSessionOptions } from 'iron-session';

import type { UserEntity } from '@/pages/api/login';

export const sessionOptions: IronSessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: 'user_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    domain: '35middle.com',
  },
  ttl: 60 * 60 * 24 * 7, // 7 days
};

// This is where we specify the typings of req.session.*
declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      accessToken: string;
      userEntity: UserEntity;
    };
  }
}
