import React from 'react';
import { Button, Grid } from '@chakra-ui/react';

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
      <div className="options">
        <Grid templateColumns="repeat(2, 2fr)" gap={6} width={500}>
          <Button size="lg">Introduction</Button>
          <Button size="lg">Simulation Settings</Button>
          <Button size="lg">Create Network</Button>
          <Button size="lg">Start Simulation</Button>
        </Grid>
      </div>
    </div>
  );
}
