import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  Box,
} from '@chakra-ui/react';
import settings from '../../slices/settings';
import { RootState } from '../../store';

export default function SimulationSettings({ confirmSettings, cancelSettings }: any) {
  const { stake, electionAlgo, votingPower, antiMaliciousAlgo, blockSize } = useSelector(
    (state: RootState) => state.settings
  );
  const dispatch = useDispatch();

  const [newStake, setNewStake] = React.useState(stake);
  const [newVotingPower, setNewVotingPower] = React.useState(votingPower);
  const [newElectionAlgo, setNewElectionAlgo] = React.useState(electionAlgo);
  const [newBlockSize, setNewBlockSize] = React.useState(blockSize);
  const [newAntiMaliciousAlgo, setNewAntiMaliciousAlgo] =
    React.useState(antiMaliciousAlgo);

  function saveSettings() {
    console.log('Saving');
    dispatch(settings.actions.setStake(newStake));
    dispatch(settings.actions.setElectionAlgo(newElectionAlgo));
    dispatch(settings.actions.setVotingPower(newVotingPower));
    dispatch(settings.actions.setAntiMaliciousAlgo(newAntiMaliciousAlgo));
    dispatch(settings.actions.setBlockSize(newBlockSize));
    confirmSettings();
  }

  return (
    <Box p={10}>
      <Heading size="lg">Simulation Settings</Heading>
      <br />
      <Heading size="sm">Staking</Heading>
      <RadioGroup
        id="sss"
        value={newStake}
        onChange={(e) => setNewStake(parseInt(e, 10))}
      >
        <Stack>
          <Radio value={1}>Same stake for every host</Radio>
          <Radio value={2}>Random stake</Radio>
        </Stack>
      </RadioGroup>
      <br />
      <Heading size="sm">Voting Power</Heading>
      <RadioGroup
        value={newVotingPower}
        onChange={(e) => setNewVotingPower(parseInt(e, 10))}
      >
        <Stack>
          <Radio value={1}>Host&apos;s stake divided by total stake</Radio>
          <Radio value={2}>Equal voting power for all hosts</Radio>
        </Stack>
      </RadioGroup>
      <br />
      <Heading size="sm">Leader Election Method</Heading>
      <RadioGroup
        value={newElectionAlgo}
        onChange={(e) => setNewElectionAlgo(parseInt(e, 10))}
      >
        <Stack>
          <Radio value={1}>Round robin, ordered by voting power</Radio>
          <Radio value={2}>Round robin, random order</Radio>
          <Radio value={3}>Completely random each time</Radio>
        </Stack>
      </RadioGroup>
      <br />
      <Heading size="sm">Anti-Malicious Algorithm</Heading>
      <RadioGroup
        value={newAntiMaliciousAlgo}
        onChange={(e) => setNewAntiMaliciousAlgo(parseInt(e, 10))}
      >
        <Stack>
          <Radio value={1}>None</Radio>
          <Radio value={2}>Byzantine Fault Tolerance</Radio>
        </Stack>
      </RadioGroup>
      <br />
      <Heading size="sm">Block Size in KiB:</Heading>
      <NumberInput
        size="md"
        maxW={24}
        value={newBlockSize}
        onChange={(e) => setNewBlockSize(parseInt(e, 10))}
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
            Back
          </Button>
        </Link>
        {/* <Link to="/">
          <Button size="sm" onClick={() => cancelSettings()}>
            Cancel
          </Button>
        </Link> */}
      </Stack>
    </Box>
  );
}
