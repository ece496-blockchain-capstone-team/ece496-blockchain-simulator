import React from 'react';

import { Grid, GridItem, Heading, Divider } from '@chakra-ui/react';

import { createDevTools } from '@redux-devtools/core';
import { LogMonitor } from '@redux-devtools/log-monitor';

const DevTools = createDevTools(<LogMonitor theme="tomorrow" />);

export default function Home() {
  return (
    <Grid w="100%" p={4} gap={4}>
      <Heading> Redux Store Current State </Heading>
      <Divider />
      <DevTools />
    </Grid>
  );
}
