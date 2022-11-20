import type { NextApiRequest, NextApiResponse } from 'next';

import type { ProjectEntity } from '@/hooks/useProjectsByAccountId';

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  // const { accountId } = req.query;
  // const response = await fetch(
  //   `${process.env.SERVER_BASE_URL}/api/v1/projects?accountId=${accountId}`,
  //   {
  //     method: 'GET',
  //     headers: { 'Content-Type': 'application/json' },
  //   }
  // );

  // const data: ProjectEntity[] = await response.json();

  const data: ProjectEntity[] = [
    {
      id: '60f1b0b0b9b1b8b1b1b1b1b1',
      name: 'Project 1',
      imageUrl: 'https://via.placeholder.com/150.png',
      accountId: '60f1b0b0b9b1b8b1b1b1b1b1',
      color: '#faac3a',
    },
    {
      id: '60f1b0b0b9b1b8b1b1b1b1b2',
      name: 'Project 1',
      imageUrl: 'https://via.placeholder.com/150.png',
      accountId: '60f1b0b0b9b1b8b1b1b1b1b1',
      color: '#0a8213',
    },
    {
      id: '60f1b0b0b9b1b8b1b1b1b1b3',
      name: 'Project 1',
      imageUrl: 'https://via.placeholder.com/150.png',
      accountId: '60f1b0b0b9b1b8b1b1b1b1b1',
      color: undefined,
    },
    {
      id: '60f1b0b0b9b1b8b1b1b1b1b4',
      name: 'Project 1',
      imageUrl: 'https://via.placeholder.com/150.png',
      accountId: '60f1b0b0b9b1b8b1b1b1b1b1',
    },
    {
      id: '60f1b0b0b9b1b8b1b1b1b1b5',
      name: 'Project 1',
      imageUrl: 'https://via.placeholder.com/150.png',
      accountId: '60f1b0b0b9b1b8b1b1b1b1b1',
    },
    {
      id: '60f1b0b0b9b1b8b1b1b1b1b1',
      name: 'Project 1',
      imageUrl: 'https://via.placeholder.com/150.png',
      accountId: '60f1b0b0b9b1b8b1b1b1b1b1',
      color: '#faac3a',
    },
    {
      id: '60f1b0b0b9b1b8b1b1b1b1b2',
      name: 'Project 1',
      imageUrl: 'https://via.placeholder.com/150.png',
      accountId: '60f1b0b0b9b1b8b1b1b1b1b1',
      color: '#0a8213',
    },
    {
      id: '60f1b0b0b9b1b8b1b1b1b1b3',
      name: 'Project 1',
      imageUrl: 'https://via.placeholder.com/150.png',
      accountId: '60f1b0b0b9b1b8b1b1b1b1b1',
      color: undefined,
    },
    {
      id: '60f1b0b0b9b1b8b1b1b1b1b4',
      name: 'Project 1',
      imageUrl: 'https://via.placeholder.com/150.png',
      accountId: '60f1b0b0b9b1b8b1b1b1b1b1',
    },
    {
      id: '60f1b0b0b9b1b8b1b1b1b1b5',
      name: 'Project 1',
      imageUrl: 'https://via.placeholder.com/150.png',
      accountId: '60f1b0b0b9b1b8b1b1b1b1b1',
    },
    {
      id: '60f1b0b0b9b1b8b1b1b1b1b1',
      name: 'Project 1',
      imageUrl: 'https://via.placeholder.com/150.png',
      accountId: '60f1b0b0b9b1b8b1b1b1b1b1',
      color: '#faac3a',
    },
    {
      id: '60f1b0b0b9b1b8b1b1b1b1b2',
      name: 'Project 1',
      imageUrl: 'https://via.placeholder.com/150.png',
      accountId: '60f1b0b0b9b1b8b1b1b1b1b1',
      color: '#0a8213',
    },
    {
      id: '60f1b0b0b9b1b8b1b1b1b1b3',
      name: 'Project 1',
      imageUrl: 'https://via.placeholder.com/150.png',
      accountId: '60f1b0b0b9b1b8b1b1b1b1b1',
      color: undefined,
    },
    {
      id: '60f1b0b0b9b1b8b1b1b1b1b4',
      name: 'Project 1',
      imageUrl: 'https://via.placeholder.com/150.png',
      accountId: '60f1b0b0b9b1b8b1b1b1b1b1',
    },
    {
      id: '60f1b0b0b9b1b8b1b1b1b1b5',
      name: 'Project 1',
      imageUrl: 'https://via.placeholder.com/150.png',
      accountId: '60f1b0b0b9b1b8b1b1b1b1b1',
    },
  ];

  res.status(200).json(data);
}
