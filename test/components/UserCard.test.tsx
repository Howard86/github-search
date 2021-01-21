import React from 'react';
import UserCard from '@/components/UserCard';
import { render } from '../test-utils';

describe('UserCard', () => {
  it('should render UserCard component', () => {
    render(<UserCard avatarUrl="" username="test" />, {});
  });
});
