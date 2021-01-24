import React, { FC } from 'react';
import useUserFollow from '@/hooks/useUserFollow';
import { HStack, Tag, TagLabel, TagLeftIcon, Tooltip } from '@chakra-ui/react';
import { BsFillPersonCheckFill, BsFillPersonPlusFill } from 'react-icons/bs';

interface UserFollowLabelProps {
  username: string;
}

const UserFollowLabel: FC<UserFollowLabelProps> = ({ username }) => {
  const { isLoading, data } = useUserFollow(username);

  return (
    <HStack spacing={[1, 2]}>
      <Tooltip label="followers" aria-label="followers' tooltip">
        <Tag colorScheme="blue">
          <TagLeftIcon as={BsFillPersonPlusFill} />
          <TagLabel>{isLoading ? '...' : data.followerCount}</TagLabel>
        </Tag>
      </Tooltip>
      <Tooltip label="followings" aria-label="followings' tooltip">
        <Tag colorScheme="purple">
          <TagLeftIcon as={BsFillPersonCheckFill} />
          <TagLabel>{isLoading ? '...' : data.followingCount}</TagLabel>
        </Tag>
      </Tooltip>
    </HStack>
  );
};

export default React.memo(UserFollowLabel);
