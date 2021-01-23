import React, { FC } from 'react';
import useUserFollow from '@/hooks/useUserFollow';
import { Stack, Tag, Text } from '@chakra-ui/react';

interface UserFollowLabelProps {
  username: string;
}

const UserFollowLabel: FC<UserFollowLabelProps> = ({ username }) => {
  const { isLoading, data } = useUserFollow(username);

  if (isLoading) {
    return null;
  }

  return (
    <Stack direction={['column', 'row']} spacing={['1', '2']}>
      <Tag colorScheme="blue">
        Followers
        <Text ml="1" as="span" fontWeight="bold">
          {data.followerCount}
        </Text>
      </Tag>
      <Tag colorScheme="purple">
        Following
        <Text ml="1" as="span" fontWeight="bold">
          {data.followingCount}
        </Text>
      </Tag>
    </Stack>
  );
};

export default UserFollowLabel;
