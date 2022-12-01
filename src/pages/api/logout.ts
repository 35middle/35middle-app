import { serialize } from 'cookie';
import { withIronSessionApiRoute } from 'iron-session/next';

import { sessionOptions } from '@/lib/session';

export default withIronSessionApiRoute(function logoutRoute(req, res) {
  res.setHeader('Set-Cookie', [
    serialize('CloudFront-Policy', '', { path: '/', expires: new Date(0) }),
    serialize('CloudFront-Key-Pair-Id', '', {
      path: '/',
      expires: new Date(0),
    }),
    serialize('CloudFront-Signature', '', { path: '/', expires: new Date(0) }),
  ]);
  req.session.destroy();
  res.setHeader('Cache-Control', 'no-store, max-age=0').redirect('/login');
}, sessionOptions);
