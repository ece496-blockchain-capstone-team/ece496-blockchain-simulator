import React, { useEffect, useState } from 'react';

import DeckGL from '@deck.gl/react';
import { IconLayer, ArcLayer } from '@deck.gl/layers';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Flex, Heading, Box, Button, Stack, Center } from '@chakra-ui/react';
import { StaticMap, MapContext, NavigationControl } from 'react-map-gl';

import { useAppDispatch, useAppSelector, RootState } from '../../store';
import { network } from '../../slices';
import { increment, simulate, timestep, setupNodes } from '../../slices/network';
import SimulationSettings from '../SimulationSettings';

import {
  LocationTable,
  Location,
  ConnectionType,
  ConnectionTable,
  NodeTable,
} from '../../services';
import SideBar from '../SideBar';
import Host from '../Host';
import NodeSelector from './NodeSelector';

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
  top: 110,
  left: 10,
};

// Icon Layer
const ICON_MAPPING = {
  marker: { x: 0, y: 0, width: 128, height: 128, mask: true, anchorY: 128 },
};

export default function Network() {
  const [searchParams, setSearchParams] = useSearchParams();
  const setup = searchParams.get('setup');

  const [showMap, setShowMap] = useState(false);

  const [loadedMap, setLoadedMap] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setShowMap(setup === null);

    if (setup) {
      dispatch(network.actions.init());
    }
  }, [setup]);

  const throughput: number = useAppSelector(
    (state) => state.network.throughput
  ) as number;
  const time: number = useAppSelector(
    (state) => state.network.timeCounter * 10
  ) as number;
  // const throughput: number = useAppSelector((state) => state.network.throughput) as number;

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
    getWidth: 0,
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

  function confirm(nodeNum: any) {
    console.log('confirm content');
    console.log(nodeNum);
    dispatch(setupNodes(nodeNum));
    navigate('/network');
  }

  function cancel() {
    console.log('cancel content');
    navigate('/');
  }

  return (
    <Stack>
      {setup && (
        <div id="nodeSetup">
          <Center>
            <NodeSelector confirm={confirm} cancel={cancel} />
          </Center>
        </div>
      )}
      {showMap && (
        <div id="content">
          <SideBar
            hostView={() => navigate('/host')}
            stepTime={(userInput: number) => dispatch(timestep(userInput))}
            stepView={(userInput: number) => dispatch(simulate(userInput))}
            throughput={throughput}
            time={time}
          >
            <Box p={0} m={0}>
              <Flex>
                <Box
                  position="absolute"
                  top={0}
                  height={window.innerHeight}
                  width={window.innerWidth - 265}
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
            </Box>
          </SideBar>
        </div>
      )}
    </Stack>
  );
}
