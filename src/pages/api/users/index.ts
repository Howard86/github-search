import type { NextApiRequest, NextApiResponse } from 'next';
import { searchUsersByUsername } from '@/server/search-user';
import type { SearchUserResponse } from '@/redux/api';

export default async (
  req: NextApiRequest,
  res: NextApiResponse<SearchUserResponse>,
): Promise<void> => {
  switch (req.method) {
    case 'GET': {
      const username = req.query.username as string;
      const page = req.query.page as string;

      if (!username) {
        return res.status(400).json({ success: false });
      }

      try {
        const result = await searchUsersByUsername(
          username,
          parseInt(page, 10),
        );
        return res
          .status(200)
          .json({ success: result.users.length > 0, ...result });
      } catch (error) {
        console.error(error);
        return res.status(400).json({ success: false });
      }
    }

    default:
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
