import type { NextApiRequest, NextApiResponse } from 'next';
import { searchUsersByUsername } from '@/server/user';

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  switch (req.method) {
    case 'GET': {
      const username = req.query.username as string;
      const page = req.query.page as string;

      if (!username) {
        return res.status(400).json({ success: false });
      }

      const { isEnd, total, users } = await searchUsersByUsername(
        username,
        parseInt(page, 10),
      );

      return res
        .status(200)
        .json({ success: users.length > 0, isEnd, total, users });
    }

    default:
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
