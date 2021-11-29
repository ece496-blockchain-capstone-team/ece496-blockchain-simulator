import React from 'react';

import { Box, Image, BoxProps } from '@chakra-ui/react';

import logo from './logo.png';
import logoSquare from './logo square.png';

interface LogoProps extends BoxProps {
  square?: boolean;
}

export default function Logo({ square, w }: LogoProps) {
  return (
    <Box w={w}>
      {square ? <Image src={logoSquare} /> : <Image src={logo} />}
    </Box>
  );
}

Logo.defaultProps = {
  square: false
};