import React from 'react';
import Profile from '@/components/Profile';
import { render } from '../test-utils';

describe('Profile', () => {
  it('should render Profile component', () => {
    render(
      <Profile
        avatarUrl="test_avatar_url"
        username="test_login"
        name="test_name"
        bio="test_bio"
        email="test_email"
        location="test_location"
        company="test_company"
        blog="test_blog"
        twitterUsername="test_twitter_username"
        siteAdmin={false}
        hireable={false}
        id={10001}
        gravatarId="test_gravatar_id"
        nodeId="test_node_id"
        type="test_type"
        repositoryCount={2}
        gistCount={3}
        followerCount={4}
        followingCount={5}
        createdAt="test_created_at"
        updatedAt="test_updated_at"
      />,
      {},
    );
  });
});
