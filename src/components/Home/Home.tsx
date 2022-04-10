import React from 'react';
import { Button, Grid, Heading, Box, Center } from '@chakra-ui/react';
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
            <Button colorScheme="blue" size="lg" onClick={() => navigate('/network')}>
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
          </Grid>
        </div>
        <div id="introduction" hidden>
          <Heading size="lg">Introduction</Heading>
          <p>Welcome to the Blockchain Simulator.</p>
          <br />
          <Button size="sm" onClick={() => toggleItemDisplay('introduction')}>
            Back
          </Button>
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
