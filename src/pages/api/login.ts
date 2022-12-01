import { serialize } from 'cookie';
import { withIronSessionApiRoute } from 'iron-session/next';

import { sessionOptions } from '@/lib/session';
import signCloudfrontCookie from '@/utils/signCloudfrontCookie';

export type UserEntity = {
  _id: string;
  email: string;
  lastName: string;
  firstName: string;
  accountId: string;
};

export default withIronSessionApiRoute(async function loginRoute(req, res) {
  // get user from database then:
  const response = await fetch(`${process.env.SERVER_BASE_URL}/api/v1/login`, {
    method: req.method,
    headers: { 'Content-Type': 'application/json' },
    body: req.body,
  });

  const {
    userEntity,
    accessToken,
  }: { userEntity: UserEntity; accessToken: string } = await response.json();

  req.session.user = {
    accessToken,
    userEntity,
  };

  const cfCookies = await signCloudfrontCookie();
  const cookies = Object.entries(cfCookies).map(([key, value]) => {
    return serialize(key, value, {
      path: '/',
      expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7),
      domain: '35middle.com',
      secure: true,
    });
  });

  res.setHeader('Set-Cookie', cookies);

  await req.session.save();
  res.status(response.status).json(userEntity);
}, sessionOptions);
