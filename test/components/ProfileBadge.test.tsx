import React from 'react';
import ProfileBadge from '@/components/ProfileBadge';
import { Wrap } from '@chakra-ui/react';
import { render } from '../test-utils';

describe('ProfileBadge', () => {
  it('should render ProfileBadge component', () => {
    render(<ProfileBadge name="isHireable" shown />, {
      wrapper: Wrap,
    });
  });
});
