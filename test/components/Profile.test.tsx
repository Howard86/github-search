import React from 'react';
import Profile from '@/components/Profile';
import { render } from '../test-utils';

describe('Profile', () => {
  it('should render Profile component', () => {
    render(
      <Profile
        shown={{
          avatarUrl:
            'https://avatars.githubusercontent.com/u/42728066?s=400&u=a1e452abdfd9b0b8e2d14dbb743a53704f763558&v=4',
          name: 'Howard ',
          login: 'Howard86',
          bio: 'A Lifelong Learner',
          email: 'howard@howardism.dev',
          location: 'Taiwan',
          company: 'Howardism',
          websiteUrl: 'www.howardism.dev',
          twitterUsername: 'howard86_',
          repositories: 1,
          followers: 2,
          following: 3,
          gists: 4,
        }}
        hidden={{
          databaseId: 10001,
          id: 'test_id',
          createdAt: 'test_created_at',
          updatedAt: 'test_updated_at',
        }}
        badges={{
          hasSponsorsListing: true,
          isBountyHunter: true,
          isCampusExpert: true,
          isDeveloperProgramMember: true,
          isEmployee: true,
          isHireable: true,
          isSiteAdmin: true,
          isSponsoringViewer: true,
          isViewer: true,
        }}
      />,
      {},
    );
  });
});
