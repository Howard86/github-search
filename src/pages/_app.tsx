import React, { FC } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <ChakraProvider>
    <Component {...pageProps} />
  </ChakraProvider>
);

export default App;
