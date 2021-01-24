import React, { FC } from 'react';
import Layout from '@/components/Layout';
import { render, screen } from '../test-utils';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      asPath: '',
    };
  },
}));

describe('Layout', () => {
  const Test: FC = () => <div data-testid="test">Test</div>;

  it('should render Layout Component', () => {
    render(
      <Layout>
        <Test />
      </Layout>,
    );

    expect(screen.queryByTestId('test')).toBeInTheDocument();
  });
});
