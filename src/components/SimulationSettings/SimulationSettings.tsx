import React from 'react';
import { Link } from 'react-router-dom';
import {
  Heading,
  Button,
  Stack,
  RadioGroup,
  Radio,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';

const simulationSettings = {
  stake: 1,
  votingPower: 1,
  electionMethod: 1,
  blockSize: 10,
};

export default function SimulationSettings() {
  const [stake, setStake] = React.useState(simulationSettings.stake);
  const [votingPower, setVotingPower] = React.useState(simulationSettings.votingPower);
  const [electionMethod, setElectionMethod] = React.useState(
    simulationSettings.electionMethod
  );
  const [blockSize, setBlockSize] = React.useState(simulationSettings.blockSize);

  function saveSettings() {
    simulationSettings.stake = stake;
    simulationSettings.votingPower = votingPower;
    simulationSettings.electionMethod = electionMethod;
    simulationSettings.blockSize = blockSize;
  }

  return (
    <>
      <Heading size="lg">Simulation Settings</Heading>
      <br />
      <Heading size="sm">Staking</Heading>
      <RadioGroup value={stake} onChange={(e) => setStake(parseInt(e, 10))}>
        <Stack>
          <Radio value={1}>Same stake for every host</Radio>
          <Radio value={2}>Random stake</Radio>
        </Stack>
      </RadioGroup>
      <br />
      <Heading size="sm">Voting Power</Heading>
      <RadioGroup value={votingPower} onChange={(e) => setVotingPower(parseInt(e, 10))}>
        <Stack>
          <Radio value={1}>Host&apos;s stake divided by total stake</Radio>
          <Radio value={2}>Equal voting power for all hosts</Radio>
        </Stack>
      </RadioGroup>
      <br />
      <Heading size="sm">Leader Election Method</Heading>
      <RadioGroup
        value={electionMethod}
        onChange={(e) => setElectionMethod(parseInt(e, 10))}
      >
        <Stack>
          <Radio value={1}>Round robin, ordered by voting power</Radio>
          <Radio value={2}>Round robin, random order</Radio>
          <Radio value={3}>Completely random each time</Radio>
        </Stack>
      </RadioGroup>
      <br />
      <Heading size="sm">Block Size in KiB:</Heading>
      <NumberInput
        size="md"
        maxW={24}
        value={blockSize}
        onChange={(e) => setBlockSize(parseInt(e, 10))}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <br />
      <Stack direction="row" spacing="20px">
        <Link to="/">
          <Button size="sm" colorScheme="blue" onClick={() => saveSettings()}>
            Save
          </Button>
        </Link>
        <Link to="/">
          <Button size="sm">Cancel</Button>
        </Link>
      </Stack>
    </>
  );
}
