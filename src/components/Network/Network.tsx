import React, { useEffect } from 'react';

import DeckGL from '@deck.gl/react';
import { IconLayer } from '@deck.gl/layers';

import { Flex, Heading, Box } from '@chakra-ui/react';
import { StaticMap, MapContext, NavigationControl } from 'react-map-gl';

import { useAppDispatch, useAppSelector } from '../../store';
import { network } from '../../slices';
import { LocationTable, Location } from '../../services';

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

// Icon Layer
const ICON_MAPPING = {
  marker: { x: 0, y: 0, width: 128, height: 128, mask: true },
};

export default function Network() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(network.actions.init());
  }, []);

  const locations: LocationTable = useAppSelector(
    (state) => state.network.locations
  ) as LocationTable;

  const iconLayer = new IconLayer<Location>({
    id: 'location-layer',
    data: Object.values(locations),
    pickable: true,
    iconAtlas:
      'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png',
    iconMapping: ICON_MAPPING,
    getIcon: (d) => 'marker',

    sizeScale: 15,
    getPosition: (d) => [d.longitude, d.latitude],
    getSize: (d) => 5,
    getColor: (d) => [140, 140, 140],
  });

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
          layers={[iconLayer]}
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
