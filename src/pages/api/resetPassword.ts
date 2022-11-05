import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetch(
    `${process.env.SERVER_BASE_URL}/api/v1/reset-password`,
    {
      method: req.method,
      body: req.body,
      headers: {
        authorization: req.headers.authorization || '',
        'Content-Type': 'application/json',
      },
    }
  );

  const data = await response.json();
  res.status(response.status).json(data);
}
