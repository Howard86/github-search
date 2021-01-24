import type { DefaultSeoProps } from 'next-seo';

const domain = process.env.NEXT_PUBLIC_DOMAIN;
const SITE_NAME = 'GitHub Search';
const SITE_DESCRIPTION = 'Search GitHub User';
const TWITTER_USERNAME = '@howard_86';
const PROFILE_IMAGE_NAME = 'profile.jpg';

export const DEFAULT_OPEN_GRAPH = {
  type: 'website',
  locale: 'en_US',
  url: domain,
  site_name: SITE_NAME,
  description: SITE_DESCRIPTION,
  images: [
    {
      url: `${domain}/${PROFILE_IMAGE_NAME}`,
      width: 300,
      height: 200,
      alt: 'Profile Picture',
    },
  ],
};

const DEFAULT_SEO: DefaultSeoProps = {
  title: 'Home',
  titleTemplate: `%s | ${SITE_NAME}`,
  description: SITE_DESCRIPTION,
  canonical: domain,
  openGraph: DEFAULT_OPEN_GRAPH,
  twitter: {
    handle: TWITTER_USERNAME,
    site: TWITTER_USERNAME,
    cardType: 'summary_large_image',
  },
};

export default DEFAULT_SEO;
