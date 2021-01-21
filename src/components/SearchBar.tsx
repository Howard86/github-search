import { useAppDispatch } from '@/redux/store';
import { search, selectUser } from '@/redux/user';
import { SearchIcon } from '@chakra-ui/icons';
import {
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  HStack,
} from '@chakra-ui/react';
import React, { ChangeEvent, FC, useState } from 'react';
import { useSelector } from 'react-redux';

const DEFAULT_USERNAME = '';

const SearchBar: FC = () => {
  const dispatch = useAppDispatch();
  const { isSearching } = useSelector(selectUser);

  const [username, setUsername] = useState(DEFAULT_USERNAME);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>): void =>
    setUsername(event.target.value);

  const handleOnClick = (): void => {
    dispatch(search(username));
  };

  return (
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
      <Button onClick={handleOnClick} isLoading={isSearching}>
        Search
      </Button>
    </HStack>
  );
};

export default SearchBar;
