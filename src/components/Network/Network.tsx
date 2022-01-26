import React from 'react';
import DeckGL from '@deck.gl/react';
import { LineLayer } from '@deck.gl/layers';

import { Grid, GridItem, Heading, Divider } from '@chakra-ui/react';

// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: -122.41669,
  latitude: 37.7853,
  zoom: 13,
  pitch: 0,
  bearing: 0,
};

// Data to be used by the LineLayer
const data = [
  { sourcePosition: [-122.41669, 37.7853], targetPosition: [-122.41669, 37.781] },
];

export default function Network() {
  const layers = [new LineLayer({ id: 'line-layer', data })];

  return (
    <Grid w="100%" p={4} gap={4}>
      <GridItem>
        <Heading> Network View </Heading>
      </GridItem>
      <Divider />
      <GridItem>
        <DeckGL initialViewState={INITIAL_VIEW_STATE} controller layers={layers} />
      </GridItem>
    </Grid>
  );
}
