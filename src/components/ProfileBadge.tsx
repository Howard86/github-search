import React, { FC } from 'react';
import { WrapItem, Tooltip, Icon } from '@chakra-ui/react';
import matchIcon from '@/utils/match-icon';
import { ProfileProps } from './Profile';

interface ProfileBadgeProps {
  name: keyof ProfileProps['badges'];
  shown: boolean;
}

const ProfileBadge: FC<ProfileBadgeProps> = ({ name, shown }) =>
  shown ? (
    <Tooltip
      label={name}
      aria-label={name + ' tooltip'}
      placement="bottom-start"
    >
      <WrapItem>
        <Icon fontSize="4xl" as={matchIcon(name)} />
      </WrapItem>
    </Tooltip>
  ) : null;

export default ProfileBadge;
