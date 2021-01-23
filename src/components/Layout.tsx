import React, { FC } from 'react';
import { Container } from '@chakra-ui/react';

const Layout: FC = ({ children }) => (
  <Container as="main" p={[4, 6, 8]} maxW="fill" minH="80vh" centerContent>
    {children}
  </Container>
);

export default Layout;
