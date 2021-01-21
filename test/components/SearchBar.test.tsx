import React from 'react';
import SearchBar from '@/components/SearchBar';
import { render } from '../test-utils';

describe('SearchBar', () => {
  it('should render SearchBar component', () => {
    render(<SearchBar />, {});
  });
});
