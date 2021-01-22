import React from 'react';
import Loader from '@/components/Loader';
import { render } from '../test-utils';

describe('Loader', () => {
  it('should render Loader component', () => {
    render(<Loader />, {});
  });
});
