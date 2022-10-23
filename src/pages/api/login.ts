import type { NextApiRequest, NextApiResponse } from 'next';

type UserEntity = {
  _id: string;
  email: string;
  lastName: string;
  firstName: string;
  accountId: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetch(`${process.env.SERVER_BASE_URL}/api/v1/login`, {
    method: req.method,
    headers: { 'Content-Type': 'application/json' },
    body: req.body,
  });

  const data: UserEntity = await response.json();
  res.setHeader('Set-Cookie', response.headers.get('Set-Cookie') || '');
  res.status(response.status).json(data);
}
