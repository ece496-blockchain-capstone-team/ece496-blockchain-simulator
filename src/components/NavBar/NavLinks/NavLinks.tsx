import React from 'react';

import { Box, Stack } from '@chakra-ui/react';
import LinkItem from './LinkItem';

export default function NavLinks() {
  return (
    <Box
      display={{ base: 'block', md: 'block' }}
      flexBasis={{ base: '100%', md: 'auto' }}
    >
      <Stack spacing={5} align="center" justify="center" direction="row">
        <LinkItem to="/">Home</LinkItem>
        <LinkItem to="/network">Network</LinkItem>
        <LinkItem to="/host">Host</LinkItem>
        <LinkItem to="/chain">Chain</LinkItem>
        <LinkItem to="/block">Block</LinkItem>
        <LinkItem to="/metrics">Metrics</LinkItem>
        <LinkItem to="/simulation-settings">Settings</LinkItem>
        <LinkItem to="/network-setup">Network Setup</LinkItem>
      </Stack>
    </Box>
  );
}
