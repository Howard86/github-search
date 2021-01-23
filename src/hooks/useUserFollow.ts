import { useState, useEffect } from 'react';
import { GetUserFollowCount, UserFollowCount, getLocal } from '@/redux/api';

interface UseUserFollow {
  isLoading: boolean;
  data: UserFollowCount;
}

const useUserFollow = (username: string): UseUserFollow => {
  const [data, setData] = useState<UserFollowCount>({
    followerCount: 0,
    followingCount: 0,
  });
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mount = true;

    getLocal<GetUserFollowCount>(`follow/${username}`)
      .then((response) => {
        const { success, ...rest } = response;
        if (mount && success) {
          // as success has checked
          setData(rest as UserFollowCount);
        }
      })
      .finally(() => setLoading(false));
    return () => {
      mount = false;
    };
  }, []);

  return { isLoading, data };
};

export default useUserFollow;
