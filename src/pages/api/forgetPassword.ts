import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetch(
    `${process.env.SERVER_BASE_URL}/api/v1/forget-password`,
    {
      method: req.method,
      headers: { 'Content-Type': 'application/json' },
      body: req.body,
    }
  );
  console.log(process.env.SERVER_BASE_URL);

  const data = await response.json();
  res.status(response.status).json(data);
}
