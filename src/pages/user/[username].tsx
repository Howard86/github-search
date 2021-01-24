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
} from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import { RiGitRepositoryLine } from 'react-icons/ri';
import { BsFillPersonCheckFill, BsFillPersonPlusFill } from 'react-icons/bs';
import { getUserByUsername, User } from '@/server/user';
import { DEFAULT_OPEN_GRAPH } from '@/constants/seo';
import Profile from '@/components/Profile';
import InfoList from '@/components/InfoList';

type UserPageProps = User;

const FIVE_MINUTES = 5 * 60;
const GITHUB_BASE_URL = 'https://github.com';

const UserPage: NextPage<UserPageProps> = ({
  info,
  repositories,
  followers,
  followings,
}) => (
  <>
    <NextSeo
      title={info.name}
      openGraph={{
        ...DEFAULT_OPEN_GRAPH,
        images: [
          {
            url: info.avatar_url,
            alt: `${info.name}'s profile picture`,
            width: 400,
            height: 400,
          },
        ],
      }}
    />
    <Flex direction={['column', 'row']} align={['center', 'start']}>
      <Profile
        avatarUrl={info.avatar_url}
        username={info.login}
        name={info.name}
        bio={info.bio}
        email={info.email}
        location={info.location}
        company={info.company}
        blog={info.blog}
        twitterUsername={info.twitter_username}
        siteAdmin={info.site_admin}
        hireable={info.hireable}
        id={info.id}
        gravatarId={info.gravatar_id}
        nodeId={info.node_id}
        type={info.type}
        repositoryCount={info.public_repos}
        gistCount={info.public_gists}
        followerCount={info.followers}
        followingCount={info.following}
        createdAt={info.created_at}
        updatedAt={info.updated_at}
      />
      <Spacer mx={[0, 2]} my={[4, 0]} />
      <Tabs variant="enclosed" isFitted>
        <TabList>
          <Tab>Repository</Tab>
          <Tab>Follower</Tab>
          <Tab>Following</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <List>
              {repositories.map((name) => (
                <InfoList
                  key={name}
                  name={name}
                  url={`${GITHUB_BASE_URL}/${info.login}/${name}`}
                  icon={RiGitRepositoryLine}
                />
              ))}
            </List>
          </TabPanel>
          <TabPanel>
            <List>
              {followers.map((name) => (
                <InfoList key={name} name={name} icon={BsFillPersonPlusFill} />
              ))}
            </List>
          </TabPanel>
          <TabPanel>
            <List>
              {followings.map((name) => (
                <InfoList key={name} name={name} icon={BsFillPersonCheckFill} />
              ))}
            </List>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  </>
);

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  // blocking will server-render new page and cache
  fallback: 'blocking',
});

export const getStaticProps: GetStaticProps = async (context) => {
  const username = context.params.username as string;

  try {
    const user = await getUserByUsername(username);
    return { props: user, revalidate: FIVE_MINUTES };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
};

export default UserPage;
