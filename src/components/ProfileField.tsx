import React, { FC, ReactText } from 'react';
import { Icon, Text, Tooltip, Flex } from '@chakra-ui/react';
import matchIcon from '@/utils/match-icon';
import type { ProfileProps } from './Profile';

interface ProfileFieldProps {
  fieldKey: ProfileFieldKey;
  fieldValue: ReactText;
}

export type ProfileFieldKey =
  | keyof ProfileProps['shown']
  | keyof ProfileProps['hidden']
  | keyof ProfileProps['badges'];

const ProfileField: FC<ProfileFieldProps> = ({ fieldKey, fieldValue }) => {
  if (fieldValue === null || fieldValue === '') {
    return null;
  }

  return (
    <Flex fontSize={['md', 'lg']} my={[1, 2]}>
      <Text as="h2" fontWeight="medium" w="36" textTransform="capitalize">
        <Icon mr="1" fontSize="lg" as={matchIcon(fieldKey)} />
        {/* TODO: fix this quick workaround */}
        {fieldKey.replace('Count', '').replace('Username', '')}
      </Text>
      <Tooltip
        label={fieldValue}
        aria-label={fieldKey + "'s tooltip"}
        placement="bottom-start"
      >
        <Text isTruncated w="calc(100% - 8rem)">
          {fieldValue}
        </Text>
      </Tooltip>
    </Flex>
  );
};

export default ProfileField;
