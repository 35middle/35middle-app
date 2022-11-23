import { getIronSession } from 'iron-session/edge';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { sessionOptions } from '@/lib/session';

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();
  const session = await getIronSession(req, res, sessionOptions);
  const { user } = session;

  if (user?.userEntity) {
    return NextResponse.redirect(
      new URL(`/account/${user.userEntity.accountId}/projects`, req.url)
    );
  }

  return res;
};

export const config = {
  matcher: ['/login', '/reset-password'],
};
