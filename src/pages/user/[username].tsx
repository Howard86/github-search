import React, { FC } from 'react';
import {
  VStack,
  Text,
  Container,
  HStack,
  Button,
  Collapse,
  useDisclosure,
  Heading,
  Box,
} from '@chakra-ui/react';
import type { GetServerSideProps } from 'next';
import { getUserByUsername, User } from '@/server/user';

type UserPageProps = User;

const UserPage: FC<UserPageProps> = ({
  info,
  repositories,
  followers,
  followings,
}) => {
  const { isOpen, onToggle } = useDisclosure();

  if (!info) {
    return (
      <Container as="main" p={[4, 8, 12]} minH="80vh" centerContent>
        <Text>Not Found</Text>
      </Container>
    );
  }

  const renderName = (name: string) => <Text key={name}>{name}</Text>;

  // FIXME: 'plan' exists when accessing tokens' owner, should remove in server
  const { plan, ...rest } = info;

  return (
    <Container as="main" p={[4, 8, 12]} minH="80vh" centerContent>
      <VStack spacing={4}>
        <Box>
          <Heading>Repositories</Heading>
          {repositories.map(renderName)}
        </Box>
        <Box>
          <Heading>Followers</Heading>
          {followers.map(renderName)}
        </Box>
        <Box>
          <Heading>Followings</Heading>
          {followings.map(renderName)}
        </Box>
        <Button onClick={onToggle}>Show API response</Button>
        <Collapse in={isOpen} animateOpacity>
          <VStack spacing={2}>
            {Object.keys(rest).map((key) => (
              <HStack key={key} alignItems="start">
                <Text fontWeight="bold">{key}</Text>
                <Text>{info[key]}</Text>
              </HStack>
            ))}
          </VStack>
        </Collapse>
      </VStack>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const username = context.params.username as string;

  try {
    const user = await getUserByUsername(username);
    return { props: user };
  } catch (error) {
    console.error(error);
    return { props: { user: null } };
  }
};

export default UserPage;
