import type { NextApiRequest, NextApiResponse } from 'next';
import type { SearchUserResponse } from '@/redux/api';
import userService from '@/server/service';

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

      const result = await userService.searchUsersByUsername(
        username,
        parseInt(page, 10),
      );

      return res
        .status(200)
        .json({ success: result.users.length > 0, ...result });
    }

    default:
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
