import React, { useEffect } from 'react';

import DeckGL from '@deck.gl/react';
import { LineLayer } from '@deck.gl/layers';

import { Flex, Heading, Box } from '@chakra-ui/react';
import { StaticMap, MapContext, NavigationControl } from 'react-map-gl';

import { useAppDispatch, useAppSelector } from '../../store';
import { network } from '../../slices';

// Viewport settings
const INITIAL_VIEW_STATE = {
  latitude: 51.47,
  longitude: 0.45,
  zoom: 4,
  bearing: 0,
  pitch: 30,
};

const MAP_STYLE =
  'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json';
const NAV_CONTROL_STYLE = {
  position: 'absolute',
  top: 10,
  left: 10,
};

// Data to be used by the LineLayer
const data = [
  { sourcePosition: [-122.41669, 37.7853], targetPosition: [-122.41669, 37.781] },
];

export default function Network() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(network.actions.init());
  }, []);

  const layers = [new LineLayer({ id: 'line-layer', data })];

  const locations = useAppSelector((state) => state.network.locations);

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
          <StaticMap
            mapStyle={MAP_STYLE}
            mapboxApiAccessToken="pk.eyJ1IjoiZGF2aWR5ZWUiLCJhIjoiY2wwMzh3d202MGt6NjNpbWo4ZHRtbHlwZCJ9.L3KYonYcVS3OAIL_eueY3w"
          />
          <NavigationControl style={NAV_CONTROL_STYLE} />
        </DeckGL>
      </Box>
    </Flex>
  );
}
