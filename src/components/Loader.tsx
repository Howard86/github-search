import React, { FC } from 'react';
import { Box } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';

const bar = keyframes`
  0% { margin-left: 0; margin-right: 80%; }
  30% { margin-left: 20%; margin-right: 60%; }
  70% { margin-left: 60%; margin-right: 20%; }
  100% { margin-left: 80%; margin-right: 0; }
`;

const Loader: FC = () => {
  const baseStyle = {
    h: 4,
    w: 36,
    m: 0,
    borderRadius: 'md',
  };

  return (
    <Box
      display="flex"
      bg="blue.50"
      {...baseStyle}
      _before={{
        bg: 'blue.200',
        content: '""',
        animation: `${bar} 1.5s ease infinite`,
        ...baseStyle,
      }}
    />
  );
};

export default Loader;
