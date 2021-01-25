import React, { FC, memo } from 'react';
import NextLink from 'next/link';
import { Avatar, Link, Text, VStack, WrapItem } from '@chakra-ui/react';
import UserFollowLabel from './UserFollowLabel';

interface UserCardProps {
  avatarUrl: string;
  username: string;
}

const UserCard: FC<UserCardProps> = ({ avatarUrl, username }) => (
  <WrapItem m="4" w={[1 / 3, 1 / 4, 1 / 7]} justifyContent="center">
    <VStack>
      <NextLink href={`/user/${username}`} prefetch={false} passHref>
        <Link textAlign="center" maxW={[28, 36, 44]}>
          <Avatar name={username} src={avatarUrl} size="xl" />
          <Text isTruncated>{username}</Text>
        </Link>
      </NextLink>
      <UserFollowLabel username={username} />
    </VStack>
  </WrapItem>
);

export default memo(UserCard);
