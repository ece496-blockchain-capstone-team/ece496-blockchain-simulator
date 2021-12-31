import React from 'react';
import { Button, Grid, Heading } from '@chakra-ui/react';

export default function Home() {
  function toggleItemDisplay(itemName: string) {
    let options = document.getElementById('options');
    let item = document.getElementById(itemName);
    if (options && item) {
      options.hidden = !options.hidden;
      item.hidden = !item.hidden;
    }
  }

  return (
    <div className="HomePage">
      <div id="options">
        <Grid templateColumns="repeat(2, 2fr)" gap={6} width={500}>
          <Button size="lg" onClick={() => toggleItemDisplay('introduction')}>
            Introduction
          </Button>
          <Button size="lg" onClick={() => toggleItemDisplay('network-settings')}>
            Create Network
          </Button>
          <Button size="lg" onClick={() => toggleItemDisplay('settings')}>
            Simulation Settings
          </Button>
          <Button size="lg" onClick={() => alert('Not implemented yet')}>
            Start Simulation
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
      <div id="network-settings" hidden>
        <Heading size="lg">Create Network</Heading>
        <br />
        <Button size="sm" onClick={() => toggleItemDisplay('network-settings')}>
          Save
        </Button>
      </div>
      <div id="settings" hidden>
        <Heading size="lg">Simulation Settings</Heading>
        <br />
        <Button size="sm" onClick={() => toggleItemDisplay('settings')}>
          Save
        </Button>
      </div>
    </div>
  );
}
