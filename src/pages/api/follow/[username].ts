import type { NextApiRequest, NextApiResponse } from 'next';
import { getUserFollowersAndFollowing } from '@/server/user';
import { GetUserFollowCount } from '@/redux/api';

export default async (
  req: NextApiRequest,
  res: NextApiResponse<GetUserFollowCount>,
): Promise<void> => {
  const username = req.query.username as string;

  switch (req.method) {
    case 'GET': {
      try {
        const userFollow = await getUserFollowersAndFollowing(username);
        return res.status(200).json({
          success: true,
          followerCount: userFollow.followers.length,
          followingCount: userFollow.followings.length,
        });
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
