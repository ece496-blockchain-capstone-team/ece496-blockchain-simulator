import React from 'react';

import { Box, Stack } from '@chakra-ui/react';
import LinkItem from './LinkItem';

export default function NavLinks() {
  return (
    <Box
      display={{ base: 'block', md: 'block' }}
      flexBasis={{ base: '100%', md: 'auto' }}
    >
      <Stack spacing={4} align="center" justify="center" direction="row">
        <LinkItem to="/">Home</LinkItem>
        <LinkItem to="/network">Network</LinkItem>
        <LinkItem to="/host">Host</LinkItem>
        <LinkItem to="/block">Block</LinkItem>
      </Stack>
    </Box>
  );
}
