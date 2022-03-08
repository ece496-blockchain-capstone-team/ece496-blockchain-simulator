import React, { useEffect, useState } from 'react';

import DeckGL from '@deck.gl/react';
import { IconLayer, ArcLayer } from '@deck.gl/layers';

import { Flex, Heading, Box } from '@chakra-ui/react';
import { StaticMap, MapContext, NavigationControl } from 'react-map-gl';

import { useAppDispatch, useAppSelector } from '../../store';
import { network } from '../../slices';

import {
  LocationTable,
  Location,
  ConnectionType,
  ConnectionTable,
  NodeTable,
} from '../../services';

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
  marker: { x: 0, y: 0, width: 128, height: 128, mask: true, anchorY: 128 },
};

export default function Network() {
  const [loadedMap, setLoadedMap] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(network.actions.init());
  }, []);

  const nodes: NodeTable = useAppSelector((state) => state.network.nodes) as NodeTable;

  const locations: LocationTable = useAppSelector(
    (state) => state.network.locations
  ) as LocationTable;

  const connections: ConnectionTable = useAppSelector(
    (state) => state.network.connections
  ) as ConnectionTable;

  const iconLayer = new IconLayer<Location>({
    id: 'location-layer',
    data: Object.values(locations),
    pickable: true,
    iconAtlas:
      'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png',
    iconMapping: ICON_MAPPING,
    getIcon: (d) => 'marker',

    sizeScale: 10,
    getPosition: (d) => [d.longitude, d.latitude],
    getSize: (d) => 10,
    getColor: (d) => [140, 140, 140],
  });

  const arcLayer = new ArcLayer<ConnectionType>({
    id: 'connection-layer',
    data: Object.values(connections),
    pickable: true,
    getWidth: 12,
    getSourcePosition: (d) => {
      const location = locations[nodes[d.nodeIds[0]].getLocationId()];
      return [location.longitude, location.latitude];
    },
    getTargetPosition: (d) => {
      const location = locations[nodes[d.nodeIds[1]].getLocationId()];
      return [location.longitude, location.latitude];
    },
    getSourceColor: (d) => [140, 140, 140],
    getTargetColor: (d) => [140, 140, 140],
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
          layers={[iconLayer, arcLayer]}
          ContextProvider={MapContext.Provider}
        >
          <StaticMap
            mapStyle={MAP_STYLE}
            mapboxApiAccessToken="pk.eyJ1IjoiZGF2aWR5ZWUiLCJhIjoiY2wwMzh3d202MGt6NjNpbWo4ZHRtbHlwZCJ9.L3KYonYcVS3OAIL_eueY3w"
            onLoad={() => setLoadedMap(true)}
          />
          <NavigationControl style={NAV_CONTROL_STYLE} />
        </DeckGL>
      </Box>
    </Flex>
  );
}
