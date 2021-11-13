import React from 'react';

import Logo from '../Logo';
import NavLinks from './NavLinks';

import { Flex, Box, Stack, Divider, Heading } from '@chakra-ui/react';

export default function NavBar() {
  return (
    <Box
      mb={8}
    >
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        w="100%"
        p={8}
      >
        <Stack
          spacing={8}
          align="center"
          justify="center"
          direction="row"
        >
          <Logo w="100px" />
          <Heading> Blockchain Simulator </Heading>
        </Stack>
        <NavLinks />
      </Flex>
      <Divider />
    </Box>
  );
}
