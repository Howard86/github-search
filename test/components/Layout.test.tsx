import React, { FC } from 'react';
import Layout from '@/components/Layout';
import { render, screen } from '../test-utils';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      asPath: '',
      events: {
        on: (event) => {
          // eslint-disable-next-line no-console
          console.log(`starts listening on ${event}`);
        },
        off: (event) => {
          // eslint-disable-next-line no-console
          console.log(`stops listening on ${event}`);
        },
      },
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
