import React from 'react';

import { Box, Image, BoxProps, Link } from '@chakra-ui/react';
import logo from './logo.png';
import logoSquare from './logo square.png';

interface LogoProps extends BoxProps {
  square?: boolean;
}

export default function Logo(props: LogoProps) {
  return (
    <Box {...props}>
      {props.square ? (
        <Link href="http://localhost:3000/">
          <Image src={logoSquare} />
        </Link>
      ) : (
        <Link href="http://localhost:3000/">
          <Image src={logo} />
        </Link>
      )}
    </Box>
  );
}
