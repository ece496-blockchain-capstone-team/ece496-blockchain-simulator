import React from 'react';
import { Box, Button, Grid, Heading, Flex, Text, Center } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import SimulationSettings from '../SimulationSettings';

export default function Home() {
  const navigate = useNavigate();

  function toggleItemDisplay(itemName: string) {
    let options = document.getElementById('options');
    let item = document.getElementById(itemName);
    if (options && item) {
      options.hidden = !options.hidden;
      item.hidden = !item.hidden;
    }
  }

  function childToParentSimSettings() {
    toggleItemDisplay('simulation-settings');
    // navigate('/network')
  }
  function confirmSettings() {
    toggleItemDisplay('simulation-settings');
    // navigate('/network')
  }
  function cancelSettings() {
    toggleItemDisplay('simulation-settings');
    // navigate('/network')
  }

  return (
    <div className="HomePage">
      <Center p={4} h={window.innerHeight - 100}>
        <div id="options">
          <Grid templateColumns="repeat(1, 1fr)" gap={20} width={500}>
            <Button
              colorScheme="blue"
              size="lg"
              onClick={() => navigate('/network?setup=true')}
            >
              Create Network
            </Button>
            <Button size="lg" onClick={() => toggleItemDisplay('introduction')}>
              Background Info
            </Button>
            {/* <Button size="lg" onClick={() => navigate('/simulation-settings')}>
              Simulation Settings
            </Button> */}
            <Button size="lg" onClick={() => toggleItemDisplay('simulation-settings')}>
              Simulation Settings
            </Button>
            {/* <Button size="lg">Start Simulation</Button> */}
            <Button size="lg" onClick={() => navigate('/metrics')}>
              Metrics Dashboard
            </Button>
            <Button size="lg" onClick={() => toggleItemDisplay('acknowledgements')}>
              Acknowledgements
            </Button>
          </Grid>
        </div>
        <div id="introduction" hidden>
          <Heading size="lg" align="center">
            Introduction
          </Heading>
          <br />
          <Text align="center">Welcome to the Blockchain Simulator!</Text>
          <br />
          <Text align="center">
            This simulation tool can be used to test out different network configurations,
            view host information and blockchain information, as well as download
            simulated metrics data.{' '}
          </Text>
          <br />
          <Text align="center">
            To use this simulator, start by changing the simulation settings or creating a
            network.
          </Text>
          <Text align="center">
            Then, click the &quot;Network&quot; button at the top to view the network on
            the map.
          </Text>
          <Text align="center">
            You may also see how hosts store blockchains internally via the
            &quot;Host&quot; view.
          </Text>
          <Text align="center">
            Finally, metrics can be viewed and downloaded via the &quot;Metrics&quot;
            button on the top right.
          </Text>
          <br />
          <Box align="center">
            <Button
              size="sm"
              align="center"
              onClick={() => toggleItemDisplay('introduction')}
            >
              Back
            </Button>
          </Box>
        </div>
        <div id="acknowledgements" hidden>
          <Heading size="lg" align="center">
            Acknowledgements
          </Heading>
          <br />
          <Text align="center">
            This project was developed by Rafsan Haque, Daniel Liang, Chen Yan Wang and
            David Yee as Team 2021408 as part of project number PROJ141 during the school
            year of 2021-2022.
          </Text>
          <br />
          <Text align="center">
            We would like to express our sincere gratitude to several individuals and
            organizations for supporting us with our project. First, we are extremely
            grateful to our supervisor Shashank Motepalli for supporting us throughout the
            project. This would not have been possible without all the helpful
            information, resources and feedback we received from him. His immense
            knowledge, experience and expertise in the field of blockchain helped us
            overcome many challenges. Without his help managing and completing the project
            would have been very difficult.
          </Text>
          <br />
          <Text align="center">
            We would also like to express our sincere gratitude to Professor Hans-Arno
            Jacobsen. His immense knowledge and experience with blockchain technology was
            invaluable to our success. We would also like to thank him for proposing this
            project and giving us the opportunity to work on this project. Without his
            help managing and completing the project would have been very difficult.
          </Text>
          <br />
          <Text align="center">
            Finally, we would like to express our sincere thanks to Inci McGreal for
            supporting us through the project. Her feedback and constant encouragement
            helped us tremendously throughout the project. Without her help managing and
            completing the project would have been very difficult.
          </Text>
          <br />
          <Box align="center">
            <Button
              size="sm"
              align="center"
              onClick={() => toggleItemDisplay('acknowledgements')}
            >
              Back
            </Button>
          </Box>
        </div>
        <div id="simulation-settings" hidden>
          <SimulationSettings
            confirmSettings={confirmSettings}
            cancelSettings={cancelSettings}
          />
        </div>
      </Center>
    </div>
  );
}
