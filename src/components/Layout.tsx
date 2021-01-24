import React, { FC } from 'react';
import { Container, Flex, Link } from '@chakra-ui/react';
import { motion, Variants } from 'framer-motion';
import { useRouter } from 'next/router';
import ColorModeSwitch from './ColorModeSwitch';
import NextLink from 'next/link';

const variants: Variants = {
  pageInitial: {
    opacity: 0,
  },
  pageAnimate: {
    opacity: 1,
  },
};

const Layout: FC = ({ children }) => {
  const router = useRouter();

  return (
    <Container
      as={motion.main}
      p={[2, 6, 8]}
      maxW="fill"
      minH="80vh"
      initial="pageInitial"
      animate="pageAnimate"
      variants={variants}
      key={router.asPath}
      centerContent
    >
      <Flex mb={[2, 4]} w="full" justify="space-between">
        <NextLink href="/" passHref>
          <Link fontSize="lg" fontWeight="bold">
            Home
          </Link>
        </NextLink>
        <ColorModeSwitch />
      </Flex>
      {children}
    </Container>
  );
};

export default Layout;
