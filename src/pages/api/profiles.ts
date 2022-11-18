import type { NextApiResponse } from 'next';

export default async function handler(res: NextApiResponse) {
  const users = {
    id: '6357ea350b29357ff613c14a',
    email: 'tzhang0997@gmail.com',
    lastName: 'ZHANG',
    firstName: 'TING',
    accountId: '6357ea350b29357ff613c14a',
  };

  res.status(200).json(users);
}
