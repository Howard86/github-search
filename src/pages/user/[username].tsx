import React, { FC } from 'react';
import {
  VStack,
  Text,
  Container,
  HStack,
  Button,
  Collapse,
  useDisclosure,
} from '@chakra-ui/react';
import type { GetServerSideProps } from 'next';
import { SingleGitHubUser, getUserByUsername } from '@/server/user';

interface UserPageProps {
  user: SingleGitHubUser;
}

const UserPage: FC<UserPageProps> = ({ user }) => {
  // FIXME: 'plan' exists when accessing tokens' owner, should remove in server
  const { plan, ...rest } = user;
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Container as="main" p={[4, 8, 12]} minH="80vh" centerContent>
      <Button onClick={onToggle}>Show API response</Button>
      <Collapse in={isOpen} animateOpacity>
        <VStack spacing={2}>
          {Object.keys(rest).map((key) => (
            <HStack key={key} alignItems="start">
              <Text fontWeight="bold">{key}</Text>
              <Text>{user[key]}</Text>
            </HStack>
          ))}
        </VStack>
      </Collapse>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const username = context.params.username as string;
  const user = await getUserByUsername(username);

  return { props: { user } };
};

export default UserPage;
