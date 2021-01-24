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
import type { GetStaticPaths, GetStaticProps } from 'next';
import { getUserByUsername, User } from '@/server/user';

type UserPageProps = User;

const FIVE_MINUTES = 5 * 60;

const renderName = (name: string) => <Text key={name}>{name}</Text>;

const UserPage: FC<UserPageProps> = ({
  info,
  repositories,
  followers,
  followings,
}) => {
  const { isOpen, onToggle } = useDisclosure();

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

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  // blocking will server-render new page and cache
  fallback: 'blocking',
});

export const getStaticProps: GetStaticProps = async (context) => {
  const username = context.params.username as string;

  try {
    const user = await getUserByUsername(username);
    return { props: user, revalidate: FIVE_MINUTES };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
};

export default UserPage;
