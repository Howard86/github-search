import type { NextApiRequest, NextApiResponse } from 'next';
import { getUserByUsername } from '@/server/user';
import type { GetUserResponse } from '@/redux/api';

export default async (
  req: NextApiRequest,
  res: NextApiResponse<GetUserResponse>,
): Promise<void> => {
  const username = req.query.username as string;

  switch (req.method) {
    case 'GET': {
      try {
        const user = await getUserByUsername(username);
        return res.status(200).json({ success: true, user });
      } catch (error) {
        console.error(error);
        return res.status(404).json({ success: false });
      }
    }

    default:
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
