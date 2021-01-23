import React, { FC } from 'react';
import NextLink from 'next/link';
import { Avatar, Link, Text, WrapItem } from '@chakra-ui/react';

interface UserCardProps {
  avatarUrl: string;
  username: string;
}

const UserCard: FC<UserCardProps> = ({ avatarUrl, username }) => (
  <WrapItem m={[2, 4]}>
    <NextLink href={`/user/${username}`} passHref>
      <Link textAlign="center" maxW={[28, 36, 44]}>
        <Avatar name={username} src={avatarUrl} size="xl" />
        <Text mx="2" isTruncated>
          {username}
        </Text>
      </Link>
    </NextLink>
  </WrapItem>
);

export default UserCard;
