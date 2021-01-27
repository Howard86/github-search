export interface User {
  // initial display
  major: {
    avatarUrl: string;
    name: string;
    login: string;
    bio: string;
    email: string;
    location: string;
    company: string;
    websiteUrl: string;
    twitterUsername: string;
    repositories: UserInfo;
    followers: UserInfo;
    following: UserInfo;
    gists: number;
  };
  // hidden
  minor: {
    id: string;
    databaseId: number;
    createdAt: string;
    updatedAt: string;
  };
  // badges
  badges: {
    hasSponsorsListing: boolean;
    isBountyHunter: boolean;
    isCampusExpert: boolean;
    isDeveloperProgramMember: boolean;
    isEmployee: boolean;
    isHireable: boolean;
    isSiteAdmin: boolean;
    isSponsoringViewer: boolean;
    isViewer: boolean;
  };
}

interface UserInfo {
  total: number;
  data: string[];
}

export interface SearchUserPage {
  total: number;
  isStart: boolean;
  isEnd: boolean;
  page: number;
  totalPage: number;
  users: UserProfile[];
}

export interface UserProfile {
  username: string;
  avatarUrl: string;
}
