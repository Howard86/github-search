import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { SearchIcon } from '@chakra-ui/icons';
import debounce from 'lodash.debounce';
import {
  VStack,
  Heading,
  Stack,
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  Wrap,
  HStack,
  Text,
} from '@chakra-ui/react';
import Loader from '@/components/Loader';
import UserCard from '@/components/UserCard';
import { SearchUserResponse } from '@/redux/api';
import { search, selectUser } from '@/redux/user';
import { useAppDispatch } from '@/redux/store';
import { useSelector } from 'react-redux';

interface SearchPageProps {
  initialName: string;
}

const DEFAULT_PAGE = 1;
const DEBOUNCE_MINI_SECONDS = 500;

const SearchPage: NextPage<SearchPageProps> = ({ initialName }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { users, message } = useSelector(selectUser);

  const [username, setUsername] = useState(initialName);
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [isLoading, setLoading] = useState(true);
  const [isEnd, setIsEnd] = useState(true);
  const [showPagination, setShowPagination] = useState(false);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setUsername(event.target.value);
    router.push(`/search?q=${event.target.value}`, undefined, {
      shallow: true,
    });
  };

  const handleOnClick = useCallback(
    async (name: string, pageNumber: number): Promise<void> => {
      setLoading(true);
      setIsEnd(true);
      setPage(pageNumber);
      const action = await dispatch(
        search({ username: name, page: pageNumber }),
      );
      setLoading(false);

      const response = action.payload as SearchUserResponse;
      if (response) {
        setIsEnd(response.isEnd);
        setShowPagination(response.totalPage > DEFAULT_PAGE);
      }
    },
    [],
  );

  const debounceSearch = useCallback(
    debounce((name) => {
      handleOnClick(name, DEFAULT_PAGE);
    }, DEBOUNCE_MINI_SECONDS),
    [],
  );

  const handleOnSearchClick = () => debounceSearch(username);

  const handleIncrement = () => handleOnClick(username, page + 1);

  const handleDecrement = () => handleOnClick(username, page - 1);

  useEffect(() => {
    if (username !== '') {
      debounceSearch(username);
    }
  }, [username]);

  return (
    <VStack my="auto" spacing={[2, 4]} w="full">
      <Heading as="h1">GitHub Search</Heading>
      <Stack direction={['column', 'row']} align="center">
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="GitHub username"
            type="text"
            name="search"
            aria-label="GitHub Search"
            value={username}
            onChange={handleOnChange}
          />
        </InputGroup>
        <Button onClick={handleOnSearchClick} isLoading={isLoading}>
          Search
        </Button>
      </Stack>
      {message && <Text color="tomato">{message}</Text>}
      <Wrap justify="center" w="full">
        {users.map((user) => (
          <UserCard
            key={user.username}
            username={user.username}
            avatarUrl={user.avatarUrl}
          />
        ))}
      </Wrap>
      {isLoading && <Loader />}
      {showPagination && (
        <HStack>
          <Button onClick={handleDecrement} isDisabled={page === 1}>
            -
          </Button>
          <Text>{page}</Text>
          <Button onClick={handleIncrement} isDisabled={isEnd}>
            +
          </Button>
        </HStack>
      )}
    </VStack>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const initialName = context.query.q as string;

  if (!initialName) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      initialName,
    },
  };
};

export default SearchPage;
