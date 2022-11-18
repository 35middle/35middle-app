import cookie from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  const serializedCookies = cookie.serialize('access_token', '', {
    httpOnly: true,
    path: '/',
    sameSite: 'strict',
    secure: true,
    maxAge: 0,
    expires: new Date(0),
  });
  res.setHeader('Set-Cookie', serializedCookies).redirect('/login');
}
