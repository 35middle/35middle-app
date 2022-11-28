import { withIronSessionApiRoute } from 'iron-session/next';
import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

import { sessionOptions } from '@/lib/session';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default withIronSessionApiRoute(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    const response = await fetch(
      `${process.env.SERVER_BASE_URL}/api/v1/videos/${req.query.videoId}`,
      {
        method: req.method,
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${req.session.user?.accessToken}`,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      res.status(200).json(data);
    }
  }
},
sessionOptions);
