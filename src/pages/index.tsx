import React, { ChangeEvent, useState, useEffect, useCallback } from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/router';
import { SearchIcon } from '@chakra-ui/icons';
import {
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  Stack,
  VStack,
  Heading,
} from '@chakra-ui/react';

const DEFAULT_USERNAME = '';
const DEBOUNCE_MINI_SECONDS = 300;

const Home: NextPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState(DEFAULT_USERNAME);
  const [isLoading, setLoading] = useState(false);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>): void =>
    setUsername(event.target.value);

  const debouncePush = useCallback(
    debounce((name: string) => {
      router.push(`/search?q=${name}`);
    }, DEBOUNCE_MINI_SECONDS),
    [],
  );

  const handleOnSearch = useCallback(() => {
    setLoading(true);
    debouncePush(username);
  }, [username]);

  useEffect(() => {
    if (username !== '') {
      handleOnSearch();
    }
    return () => setLoading(false);
  }, [username]);

  return (
    <VStack my="auto" spacing={[2, 4]} w="full">
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
        <Button onClick={handleOnSearch} isLoading={isLoading}>
          Search
        </Button>
      </Stack>
    </VStack>
  );
};

export default Home;
