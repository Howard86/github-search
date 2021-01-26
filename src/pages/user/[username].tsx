import React from 'react';
import type { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import {
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  List,
  Flex,
  Spacer,
  Tag,
  useBreakpointValue,
} from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import type { OpenGraph } from 'next-seo/lib/types';
import { RiGitRepositoryLine } from 'react-icons/ri';
import { BsFillPersonCheckFill, BsFillPersonPlusFill } from 'react-icons/bs';
import { getUserByUsername, User } from '@/server/service/user';
import { DEFAULT_OPEN_GRAPH } from '@/constants/seo';
import Profile, { ShownProps } from '@/components/Profile';
import InfoList from '@/components/InfoList';

type UserPageProps = User;

const FIVE_MINUTES = 5 * 60;
const GITHUB_BASE_URL = 'https://github.com';

const UserPage: NextPage<UserPageProps> = ({ major, minor, badges }) => {
  const display = useBreakpointValue({ base: 'none', md: 'inline-flex' });

  const openGraph: OpenGraph = {
    ...DEFAULT_OPEN_GRAPH,
    images: [
      {
        url: major.avatarUrl,
        alt: `${major.name}'s profile picture`,
        width: 200,
        height: 200,
      },
    ],
  };

  const shown: ShownProps = {
    ...major,
    repositories: major.repositories.total,
    followers: major.followers.total,
    following: major.following.total,
  };

  return (
    <>
      <NextSeo title={major.name} openGraph={openGraph} />
      <Flex w="95%" direction={['column', 'row']} align={['center', 'start']}>
        <Profile shown={shown} hidden={minor} badges={badges} />
        <Spacer mx={[0, 2]} my={[4, 0]} />
        <Tabs
          minW={['90%', 'sm', 'md']}
          w={['auto', '80%']}
          variant="enclosed"
          isFitted
        >
          <TabList>
            <Tab>
              Repository
              <Tag colorScheme="teal" ml="1" display={display}>
                {major.repositories.total}
              </Tag>
            </Tab>
            <Tab>
              Follower
              <Tag colorScheme="blue" ml="1" display={display}>
                {major.followers.total}
              </Tag>
            </Tab>
            <Tab>
              Following
              <Tag colorScheme="purple" ml="1" display={display}>
                {major.following.total}
              </Tag>
            </Tab>
          </TabList>
          <TabPanels maxH="80vh" overflowY="auto">
            <TabPanel>
              <List spacing={2}>
                {major.repositories.data.map((name) => (
                  <InfoList
                    key={name}
                    name={name}
                    url={`${GITHUB_BASE_URL}/${major.login}/${name}`}
                    icon={RiGitRepositoryLine}
                  />
                ))}
              </List>
            </TabPanel>
            <TabPanel>
              <List spacing={2}>
                {major.followers.data.map((name) => (
                  <InfoList
                    key={name}
                    name={name}
                    icon={BsFillPersonPlusFill}
                  />
                ))}
              </List>
            </TabPanel>
            <TabPanel>
              <List spacing={2}>
                {major.following.data.map((name) => (
                  <InfoList
                    key={name}
                    name={name}
                    icon={BsFillPersonCheckFill}
                  />
                ))}
              </List>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  // blocking will server-render new page and cache
  fallback: 'blocking',
});

export const getStaticProps: GetStaticProps = async (context) => {
  const username = context.params.username as string;

  const user = await getUserByUsername(username);
  if (!user) {
    return { notFound: true };
  }
  return { props: user, revalidate: FIVE_MINUTES };
};

export default UserPage;
