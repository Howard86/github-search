import React from 'react';
import UserCard from '@/components/UserCard';
import { Wrap } from '@chakra-ui/react';
import { render } from '../test-utils';

describe('UserCard', () => {
  it('should render UserCard component', () => {
    render(<UserCard avatarUrl="" username="test" />, {
      wrapper: Wrap,
    });
  });
});
