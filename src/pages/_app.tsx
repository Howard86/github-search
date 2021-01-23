import React from 'react';
import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider as ReduxProvider } from 'react-redux';
import store from '@/redux/store';
import Layout from '@/components/Layout';

const App: NextPage<AppProps> = ({ Component, pageProps }) => (
  <ReduxProvider store={store}>
    <ChakraProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  </ReduxProvider>
);

export default App;
