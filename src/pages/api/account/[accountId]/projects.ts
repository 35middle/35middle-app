import { withIronSessionApiRoute } from 'iron-session/next';
import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

import type { ProjectEntity } from '@/hooks/useProjectsByAccountId';
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
  if (req.method === 'GET') {
    const { accountId } = req.query;
    const response = await fetch(
      `${process.env.SERVER_BASE_URL}/api/v1/projects?accountId=${accountId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${req.session.user?.accessToken}`,
        },
      }
    );

    if (response.ok) {
      const data = (await response.json()) as ProjectEntity[];
      res.status(200).json(data);
    } else {
      res.status(response.status).json({ message: response.statusText });
    }
  }

  if (req.method === 'POST' || req.method === 'PUT') {
    const response = await fetch(
      `${process.env.SERVER_BASE_URL}/api/v1/projects`,
      {
        method: req.method,
        body: req,
        headers: { 'Content-Type': req.headers['content-type'] || '' },
      }
    );

    // const data: ProjectEntity = await response.json();
    if (response.ok) {
      const data = await response.json();
      res.status(200).json(data);
    }
  }
},
sessionOptions);
