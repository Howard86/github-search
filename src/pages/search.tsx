import React, { ChangeEvent, useCallback, useEffect, useReducer } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import debounce from 'lodash.debounce';
import { SearchIcon } from '@chakra-ui/icons';
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
import { useAppDispatch } from '@/redux/store';
import { search, selectUser } from '@/redux/user';

interface SearchPageProps {
  initialName: string;
  initialPage: number;
}

interface SearchPageLocalState {
  page: number;
  username: string;
  showPagination: boolean;
  isLoading: boolean;
}

const DEFAULT_PAGE = 1;
const DEBOUNCE_MINI_SECONDS = 500;

const initialState: SearchPageLocalState = {
  page: DEFAULT_PAGE,
  username: '',
  showPagination: false,
  isLoading: true,
};

const { actions, reducer } = createSlice({
  name: 'local',
  initialState,
  reducers: {
    resetPage(state) {
      state.page = 1;
    },
    increment(state) {
      state.page += 1;
    },
    decrement(state) {
      state.page -= 1;
    },
    updateUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    setPending(state) {
      state.isLoading = true;
      state.showPagination = false;
    },
    setFinished(state, action: PayloadAction<number>) {
      state.isLoading = false;
      state.showPagination = action.payload > DEFAULT_PAGE;
    },
  },
});

const SearchPage: NextPage<SearchPageProps> = ({
  initialName,
  initialPage,
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isSearching, totalPage, isEnd, users, message } = useSelector(
    selectUser,
  );

  const [state, localDispatch] = useReducer(reducer, {
    ...initialState,
    username: initialName,
    page: initialPage,
  });
  const { username, page, isLoading, showPagination } = state;

  const handleOnType = (event: ChangeEvent<HTMLInputElement>): void => {
    localDispatch(actions.updateUsername(event.target.value));
  };

  // only for useEffect call
  const debounceWrappedSearch = useCallback(
    debounce((wrappedUserName: string, wrappedPage: number) => {
      localDispatch(actions.resetPage());
      dispatch(search({ username: wrappedUserName, page: wrappedPage }));
      router.push(`/search?q=${wrappedUserName}&p=${wrappedPage}`, undefined, {
        shallow: true,
      });
    }, DEBOUNCE_MINI_SECONDS),
    [],
  );

  const handleOnSearchClick = () => {
    localDispatch(actions.resetPage());
    dispatch(search({ username, page }));
  };

  const handleIncrement = () => {
    localDispatch(actions.increment());
    dispatch(search({ username, page: page + 1 }));
    router.push(`/search?q=${username}&p=${page + 1}`, undefined, {
      shallow: true,
    });
  };

  const handleDecrement = () => {
    localDispatch(actions.decrement());
    dispatch(search({ username, page: page - 1 }));
    router.push(`/search?q=${username}&p=${page - 1}`, undefined, {
      shallow: true,
    });
  };

  useEffect(() => {
    if (isSearching) {
      localDispatch(actions.setPending());
    } else {
      localDispatch(actions.setFinished(totalPage));
    }
  }, [isSearching]);

  useEffect(() => {
    if (username !== '') {
      debounceWrappedSearch(username, page);
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
            onChange={handleOnType}
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
  const initialPage = parseInt(context.query.p as string) || 1;

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
      initialPage,
    },
  };
};

export default SearchPage;
