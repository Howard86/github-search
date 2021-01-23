import React from 'react';
import UserFollowLabel from '@/components/UserFollowLabel';
import { Wrap } from '@chakra-ui/react';
import { render } from '../test-utils';

describe('UserFollowLabel', () => {
  it('should render UserFollowLabel component', () => {
    render(<UserFollowLabel username="test" />, {
      wrapper: Wrap,
    });
  });
});
