import React, { FC } from 'react';
import { Avatar, Text, WrapItem } from '@chakra-ui/react';
import type { GitHubUser } from '@/server/user';

type UserCardProps = GitHubUser;

const UserCard: FC<UserCardProps> = ({ avatarUrl, username }) => (
  <WrapItem alignItems="center" m={[2, 4]} maxW="36">
    <Avatar name={username} src={avatarUrl} />
    <Text mx="2" isTruncated>
      {username}
    </Text>
  </WrapItem>
);

export default UserCard;
