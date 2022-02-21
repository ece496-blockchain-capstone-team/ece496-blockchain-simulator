import React, { useEffect } from 'react';

import DeckGL from '@deck.gl/react';
import { LineLayer } from '@deck.gl/layers';

import { Flex, Heading, Box } from '@chakra-ui/react';
import { _MapContext as MapContext, NavigationControl } from 'react-map-gl';

import { useAppDispatch } from '../../store';
import { network } from '../../slices';

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
  const ref = React.useRef();

  const layers = [new LineLayer({ id: 'line-layer', data })];

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(network.actions.init());
  }, []);

  return (
    <Flex>
      <Box m={4}>
        <Heading> Network View </Heading>
      </Box>
      <Box
        position="absolute"
        top={0}
        height={window.innerHeight}
        width={window.innerWidth}
      >
        <DeckGL
          initialViewState={INITIAL_VIEW_STATE}
          controller
          layers={layers}
          ContextProvider={MapContext.Provider}
        >
          <div>
            <NavigationControl />
          </div>
        </DeckGL>
      </Box>
    </Flex>
  );
}
