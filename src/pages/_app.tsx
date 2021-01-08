import React, { FC } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider as ReduxProvider } from 'react-redux';
import type { AppProps } from 'next/app';
import store from '@/redux/store';

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <ReduxProvider store={store}>
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  </ReduxProvider>
);

export default App;
