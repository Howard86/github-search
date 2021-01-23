import React, { FC } from 'react';
import { Switch, useColorMode } from '@chakra-ui/react';

const ColorModeSwitch: FC = () => {
  const { toggleColorMode } = useColorMode();

  return <Switch colorScheme="yellow" size="lg" onChange={toggleColorMode} />;
};

export default ColorModeSwitch;
