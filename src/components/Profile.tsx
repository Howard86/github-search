import React, { FC, useState } from 'react';
import { VStack, Box, Heading, Collapse, Button, Img } from '@chakra-ui/react';
import ProfileField from './ProfileField';

export interface ProfileProps {
  avatarUrl: string;
  username: string;
  id: number;
  nodeId: string;
  gravatarId: string;
  type: string;
  siteAdmin: boolean;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string;
  hireable: boolean;
  bio: string;
  twitterUsername: string;
  repositoryCount: number;
  gistCount: number;
  followerCount: number;
  followingCount: number;
  createdAt: string;
  updatedAt: string;
}

const HIDDEN_KEYS: (keyof ProfileProps)[] = [
  'id',
  'gravatarId',
  'nodeId',
  'type',
  'siteAdmin',
  'createdAt',
  'updatedAt',
];

const convertBoolean = (value: string | number | boolean) => {
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }

  return value;
};

const Profile: FC<ProfileProps> = (props) => {
  const [show, setShow] = useState(false);

  const handleToggle = () => setShow((prev) => !prev);
  const {
    avatarUrl,
    name,
    children,
    // hide the following,
    id,
    nodeId,
    gravatarId,
    type,
    siteAdmin,
    createdAt,
    updatedAt,
    ...rest
  } = props;

  return (
    <VStack w={['90vw', '24rem']}>
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

      <Box align="start" w="full">
        {Object.keys(rest).map((key: keyof ProfileProps) => (
          <ProfileField
            key={key}
            fieldKey={key}
            fieldValue={convertBoolean(rest[key])}
          />
        ))}
        <Collapse in={show}>
          {HIDDEN_KEYS.map((key) => (
            <ProfileField
              key={key}
              fieldKey={key}
              fieldValue={convertBoolean(props[key])}
            />
          ))}
        </Collapse>
      </Box>

      <Button onClick={handleToggle}>Show {show ? ' less' : ' more'}</Button>
    </VStack>
  );
};

export default Profile;
