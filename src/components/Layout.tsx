import React, { FC } from 'react';
import { Container, Flex } from '@chakra-ui/react';
import ColorModeSwitch from './ColorModeSwitch';

const Layout: FC = ({ children }) => (
  <Container as="main" p={[4, 6, 8]} maxW="fill" minH="80vh" centerContent>
    <Flex mb={[2, 4]} w="full" direction="row-reverse">
      <ColorModeSwitch />
    </Flex>
    {children}
  </Container>
);

export default Layout;
