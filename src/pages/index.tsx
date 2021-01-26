import React, { ChangeEvent, useState, useEffect, useCallback } from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { SearchIcon } from '@chakra-ui/icons';
import {
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  Stack,
  HStack,
  VStack,
  Wrap,
  Text,
  Heading,
} from '@chakra-ui/react';
import debounce from 'lodash.debounce';

import UserCard from '@/components/UserCard';
import Loader from '@/components/Loader';
import { useAppDispatch } from '@/redux/store';
import { search, selectUser } from '@/redux/user';
import type { SearchUserResponse } from '@/redux/api';

const DEFAULT_USERNAME = '';
const DEFAULT_PAGE = 1;
const DEBOUNCE_MINI_SECONDS = 500;

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const { isSearching, users, message } = useSelector(selectUser);

  const [username, setUsername] = useState(DEFAULT_USERNAME);
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [isEnd, setIsEnd] = useState(true);
  const [showPagination, setShowPagination] = useState(false);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>): void =>
    setUsername(event.target.value);

  const handleOnClick = useCallback(
    async (name: string, pageNumber: number): Promise<void> => {
      setIsEnd(true);
      setPage(pageNumber);
      const action = await dispatch(
        search({ username: name, page: pageNumber }),
      );

      const response = action.payload as SearchUserResponse;
      if (response) {
        setIsEnd(response.isEnd);
        setShowPagination(response.totalPage > DEFAULT_PAGE);
      }
    },
    [],
  );

  const handleOnSearch = useCallback(
    debounce((name) => {
      handleOnClick(name, DEFAULT_PAGE);
    }, DEBOUNCE_MINI_SECONDS),
    [],
  );

  const handleOnSearchClick = () => handleOnSearch(username);

  const handleIncrement = () => handleOnClick(username, page + 1);

  const handleDecrement = () => handleOnClick(username, page - 1);

  useEffect(() => {
    if (username !== '') {
      handleOnSearch(username);
    }
  }, [username]);

  return (
    <VStack my="auto" spacing={[2, 4]}>
      <Image
        src="/profile.jpg"
        alt="home page image"
        height={200}
        width={300}
      />
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
        <Button onClick={handleOnSearchClick} isLoading={isSearching}>
          Search
        </Button>
      </Stack>
      {message && <Text color="tomato">{message}</Text>}
      <Wrap justify="center">
        {users.map((user) => (
          <UserCard
            key={user.username}
            username={user.username}
            avatarUrl={user.avatarUrl}
          />
        ))}
      </Wrap>
      {isSearching && <Loader />}
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

export default Home;
