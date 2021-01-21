import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Container, VStack, Wrap, Text } from '@chakra-ui/react';
import { selectUser } from '@/redux/user';
import SearchBar from '@/components/SearchBar';
import UserCard from '@/components/UserCard';

const Home: FC = () => {
  const { users, message } = useSelector(selectUser);

  return (
    <Container as="main" p={[4, 8, 12]} minH="80vh" centerContent>
      <VStack my="auto" spacing={[2, 4]}>
        <SearchBar />
        {message && <Text color="red.300">{message}</Text>}
        <Wrap>
          {users.map((user) => (
            <UserCard
              key={user.username}
              username={user.username}
              avatarUrl={user.avatarUrl}
            />
          ))}
        </Wrap>
      </VStack>
    </Container>
  );
};

export default Home;
