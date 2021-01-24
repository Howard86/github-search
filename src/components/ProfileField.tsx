import React, { FC, ReactText } from 'react';
import { Icon, Text, Tooltip, Flex } from '@chakra-ui/react';
import type { ProfileProps } from './Profile';
import matchIcon from '@/utils/match-icon';

interface ProfileFieldProps {
  fieldKey: keyof ProfileProps;
  fieldValue: ReactText;
}

const ProfileField: FC<ProfileFieldProps> = ({ fieldKey, fieldValue }) => {
  if (fieldValue === null || fieldValue === '') {
    return null;
  }

  return (
    <Flex fontSize={['md', 'lg']} my={[1, 2]}>
      <Text as="h3" fontWeight="medium" w="44">
        <Icon mr="1" fontSize="lg" as={matchIcon(fieldKey)} />
        {fieldKey}
      </Text>
      <Tooltip
        label={fieldValue}
        aria-label={fieldKey + "'s tooltip"}
        placement="bottom-start"
      >
        <Text isTruncated w="calc(100% - 10rem)">
          {fieldValue}
        </Text>
      </Tooltip>
    </Flex>
  );
};

export default ProfileField;
