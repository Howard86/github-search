import React, { ChangeEvent, FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { SearchIcon } from '@chakra-ui/icons';
import {
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  HStack,
  Text,
} from '@chakra-ui/react';
import { useAppDispatch } from '@/redux/store';
import { search, selectUser } from '@/redux/user';
import type { SearchUserResponse } from '@/redux/api';
import Loader from './Loader';

const DEFAULT_USERNAME = '';
const DEFAULT_PAGE = 1;

// TODO: should refactor this from index page again
const SearchBar: FC = () => {
  const dispatch = useAppDispatch();
  const { isSearching } = useSelector(selectUser);

  const [username, setUsername] = useState(DEFAULT_USERNAME);
  const [isEnd, setIsEnd] = useState(true);
  const [page, setPage] = useState(DEFAULT_PAGE);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>): void =>
    setUsername(event.target.value);

  const handleOnClick = async (pageNumber: number): Promise<void> => {
    setIsEnd(true);
    setPage(pageNumber);
    const action = await dispatch(search({ username, page: pageNumber }));
    setIsEnd((action.payload as SearchUserResponse).isEnd);
  };

  const handleOnSearch = () => handleOnClick(DEFAULT_PAGE);

  const handleIncrement = () => handleOnClick(page + 1);

  const handleDecrement = () => handleOnClick(page - 1);

  return (
    <>
      <HStack>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="GitHub username"
            value={username}
            onChange={handleOnChange}
          />
        </InputGroup>
        <Button onClick={handleOnSearch} isLoading={isSearching}>
          Search
        </Button>
      </HStack>
      <HStack>
        <Button onClick={handleDecrement} isDisabled={page === 1}>
          -
        </Button>
        <Text>{page}</Text>
        <Button onClick={handleIncrement} isDisabled={isEnd}>
          +
        </Button>
      </HStack>
      {isSearching && <Loader />}
    </>
  );
};

export default SearchBar;
