import React from 'react';
import InfoList from '@/components/InfoList';
import { List } from '@chakra-ui/react';
import { render } from '../test-utils';

describe('InfoList', () => {
  it('should render InfoList component', () => {
    render(<InfoList url="" name="test" />, {
      wrapper: List,
    });
  });
});
