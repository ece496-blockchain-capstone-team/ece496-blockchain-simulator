import React from 'react';

import { Flex, Box, Stack, Divider, Heading, useColorModeValue } from '@chakra-ui/react';
import Logo from '../Logo';
import NavLinks from './NavLinks';
import GithubShortcut from './GithubShortcut';
import ColorModeSwitcher from './ColorModeSwitcher';

export default function NavBar() {
  const backgroundColor = useColorModeValue('white', 'gray.800');

  return (
    <Box bg={backgroundColor} zIndex="sticky" position="relative">
      <Flex as="nav" align="center" justify="space-between" wrap="wrap" w="100%" p={8}>
        <Stack spacing={8} align="center" justify="center" direction="row">
          <Logo w="100px" />
          <Heading> Blockchain Simulator </Heading>
        </Stack>
        <Stack spacing={2} align="center" justify="center" direction="row">
          <NavLinks />
          <GithubShortcut />
          <ColorModeSwitcher />
        </Stack>
      </Flex>
      <Divider />
    </Box>
  );
}
