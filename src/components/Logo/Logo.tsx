import React from 'react';

import logo from './logo.png';
import logoSquare from './logo square.png';
import { Box, Image, BoxProps } from '@chakra-ui/react';

interface LogoProps extends BoxProps {
  square?: boolean;
}

export default function Logo(props: LogoProps) {
  return (
    <Box {...props}>
      {props.square ? <Image src={logoSquare} /> : <Image src={logo} />}
    </Box>
  );
}
