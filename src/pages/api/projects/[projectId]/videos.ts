import { withIronSessionApiRoute } from 'iron-session/next';
import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

import type { VideoEntity } from '@/hooks/useVideosByProjectId';
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
    const { projectId } = req.query;
    const response = await fetch(
      `${process.env.SERVER_BASE_URL}/api/v1/videos?projectId=${projectId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${req.session.user?.accessToken}`,
        },
      }
    );

    if (response.ok) {
      const data = (await response.json()) as VideoEntity[];
      res.status(200).json(data);
    } else {
      res.status(response.status).json({ message: 'Failed to fetch videos' });
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
