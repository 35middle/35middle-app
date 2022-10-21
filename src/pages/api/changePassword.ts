import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = window.localStorage.getItem('token');

  const response = await fetch(
    `${process.env.SERVER_BASE_URL}/api/v1/change-password/${token}`,
    {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: req.body,
    }
  );

  const data = await response.json();
  res.status(response.status).json(data);
}
