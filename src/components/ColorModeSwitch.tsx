import React, { FC } from 'react';
import { IconButton, useColorMode } from '@chakra-ui/react';
import { GiSun, GiMoon } from 'react-icons/gi';

const ColorModeSwitch: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isLight = colorMode === 'light';

  return (
    <IconButton
      variant="ghost"
      fontSize="36px"
      aria-label={`toggle ${isLight ? 'dark' : 'light'} mode`}
      colorScheme="yellow"
      icon={isLight ? <GiSun /> : <GiMoon />}
      onClick={toggleColorMode}
    />
  );
};

export default ColorModeSwitch;
