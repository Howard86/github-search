import React, { FC, useState } from 'react';
import {
  VStack,
  Box,
  Heading,
  Collapse,
  Button,
  Img,
  Wrap,
} from '@chakra-ui/react';
import type { User } from '@/server/service/user';
import ProfileField from './ProfileField';
import ProfileBadge from './ProfileBadge';

export interface ProfileProps {
  shown: ShownProps;
  hidden: User['minor'];
  badges: User['badges'];
}

export interface ShownProps {
  avatarUrl: string;
  name: string;
  login: string;
  bio: string;
  email: string;
  location: string;
  company: string;
  websiteUrl: string;
  twitterUsername: string;
  repositories: number;
  followers: number;
  following: number;
  gists: number;
}

const Profile: FC<ProfileProps> = ({ shown, hidden, badges }) => {
  const [show, setShow] = useState(false);

  const handleToggle = () => setShow((prev) => !prev);
  const { avatarUrl, name, ...rest } = shown;

  return (
    <VStack w={['full', '24rem']}>
      <Img
        borderRadius="full"
        boxSize="200"
        htmlHeight="200"
        htmlWidth="200"
        src={avatarUrl}
        alt={name}
      />
      <Heading as="h1" fontWeight="medium">
        {name}
      </Heading>
      <Wrap>
        {Object.keys(badges).map((key: keyof ProfileProps['badges']) => (
          <ProfileBadge key={key} name={key} shown={badges[key]} />
        ))}
      </Wrap>

      <Box align="start" w="full">
        {Object.keys(rest).map((key: keyof ShownProps) => (
          <ProfileField key={key} fieldKey={key} fieldValue={rest[key]} />
        ))}
        <Collapse in={show}>
          {Object.keys(hidden).map((key: keyof ProfileProps['hidden']) => (
            <ProfileField key={key} fieldKey={key} fieldValue={hidden[key]} />
          ))}
        </Collapse>
        {/* {Object.keys(badges).map((key: keyof ProfileProps['badges']) => (
          <ProfileField
            key={key}
            fieldKey={key}
            fieldValue={convertBoolean(badges[key])}
          />
        ))} */}
      </Box>

      <Button onClick={handleToggle}>Show {show ? ' less' : ' more'}</Button>
    </VStack>
  );
};

export default Profile;
