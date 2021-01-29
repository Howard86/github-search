import React, { FC, useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { motion, Variants } from 'framer-motion';
import NProgress from 'nprogress';
import { FaHome } from 'react-icons/fa';
import { Container, Flex, Icon, Link } from '@chakra-ui/react';
import ColorModeSwitch from './ColorModeSwitch';

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
  const key = router.asPath.includes('?') ? router.pathname : router.asPath;

  useEffect(() => {
    const handleRouteChange = () => {
      NProgress.start();
    };

    const handleRouterFinish = () => {
      NProgress.done();
    };

    router.events.on('routeChangeStart', handleRouteChange);
    router.events.on('routeChangeComplete', handleRouterFinish);
    router.events.on('routeChangeError', handleRouterFinish);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
      router.events.off('routeChangeComplete', handleRouterFinish);
      router.events.off('routeChangeError', handleRouterFinish);
    };
  }, []);

  return (
    <Container
      as={motion.main}
      p={[2, 6, 8]}
      maxW="fill"
      minH="80vh"
      initial="pageInitial"
      animate="pageAnimate"
      variants={variants}
      key={key}
      centerContent
    >
      <Flex mb={[2, 4]} w="full" justify="space-between">
        <NextLink href="/" passHref>
          <Link fontSize="lg" fontWeight="bold">
            <Icon color="blue.500" fontSize="36px" as={FaHome} /> Home
          </Link>
        </NextLink>
        <ColorModeSwitch />
      </Flex>
      {children}
    </Container>
  );
};

export default Layout;
