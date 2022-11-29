import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader('Cache-Control', 's-maxage=86400');
  if (req.method === 'GET') {
    const { preview } = req.query;
    const response = await fetch(
      `${process.env.SERVER_BASE_URL}/api/v1/videos/video-preview/${preview}`,
      {
        method: 'GET',
      }
    );

    if (response.ok) {
      response.body?.pipe(res);
    }
  }
}
