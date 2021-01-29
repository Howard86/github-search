import React from 'react';
import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider as ReduxProvider } from 'react-redux';

import Layout from '@/components/Layout';
import DEFAULT_SEO from '@/constants/seo';
import store from '@/redux/store';
import theme from '@/styles/theme';

const App: NextPage<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <link rel="stylesheet" type="text/css" href="/nprogress.css" />
    </Head>
    <DefaultSeo {...DEFAULT_SEO} />
    <ReduxProvider store={store}>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </ReduxProvider>
  </>
);

export default App;
