import type { NextApiRequest, NextApiResponse } from 'next';
import type { GetUserFollowCount } from '@/redux/api';
import { getUserByUsername } from '@/server/user';

export default async (
  req: NextApiRequest,
  res: NextApiResponse<GetUserFollowCount>,
): Promise<void> => {
  const username = req.query.username as string;

  switch (req.method) {
    case 'GET': {
      const user = await getUserByUsername(username);

      if (!user) {
        return res.status(404).json({ success: false });
      }

      return res.status(200).json({
        success: true,
        followerCount: user.major.followers.total,
        followingCount: user.major.following.total,
      });
    }

    default:
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
