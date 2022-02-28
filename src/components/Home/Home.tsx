import React from 'react';
import { Button, Grid, Heading, Box } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

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

  return (
    <div className="HomePage">
      <Box p={4}>
        <div id="options">
          <Grid templateColumns="repeat(2, 2fr)" gap={6} width={500}>
            <Button size="lg" onClick={() => toggleItemDisplay('introduction')}>
              Introduction
            </Button>
            <Button size="lg">Create Network</Button>
            <Button size="lg" onClick={() => navigate('/simulation-settings')}>
              Simulation Settings
            </Button>
            <Button size="lg">Start Simulation</Button>
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
      </Box>
    </div>
  );
}
