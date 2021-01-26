import { BiIdCard, BiConversation } from 'react-icons/bi';
import { GiWantedReward } from 'react-icons/gi';
import { SiGravatar, SiCodesandbox } from 'react-icons/si';
import {
  RiAdminLine,
  RiGitRepositoryLine,
  RiTimer2Fill,
  RiTimerFill,
} from 'react-icons/ri';
import {
  FaBlog,
  FaBook,
  FaInfoCircle,
  FaTwitter,
  FaUserCircle,
} from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { BsFillPersonPlusFill, BsPersonCheckFill } from 'react-icons/bs';
import { MdLocationOn, MdWork } from 'react-icons/md';
import type { IconType } from 'react-icons';
import type { ProfileProps } from '@/components/Profile';

const matchIcon = (key: keyof ProfileProps): IconType => {
  switch (key) {
    case 'username':
      return FaUserCircle;

    case 'id':
      return BiIdCard;

    case 'nodeId':
      return SiCodesandbox;

    case 'gravatarId':
      return SiGravatar;

    case 'type':
      return FaInfoCircle;

    case 'siteAdmin':
      return RiAdminLine;

    case 'name':
      return FaUserCircle;

    case 'company':
      return MdWork;

    case 'blog':
      return FaBlog;

    case 'location':
      return MdLocationOn;

    case 'email':
      return HiOutlineMail;

    case 'hireable':
      return GiWantedReward;

    case 'bio':
      return BiConversation;

    case 'twitterUsername':
      return FaTwitter;

    case 'repositoryCount':
      return RiGitRepositoryLine;

    case 'gistCount':
      return FaBook;

    case 'followerCount':
      return BsFillPersonPlusFill;

    case 'followingCount':
      return BsPersonCheckFill;

    case 'createdAt':
      return RiTimerFill;

    case 'updatedAt':
      return RiTimer2Fill;

    default:
      return FaInfoCircle;
  }
};

export default matchIcon;
