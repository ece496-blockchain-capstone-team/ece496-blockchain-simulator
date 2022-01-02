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

export default function SimulationSettings() {
  return (
    <>
      <Heading size="lg">Simulation Settings</Heading>
      <br />
      <Heading size="sm">Staking</Heading>
      <RadioGroup>
        <Stack>
          <Radio value="1">Same stake for every host</Radio>
          <Radio value="2">Random stake</Radio>
        </Stack>
      </RadioGroup>
      <br />
      <Heading size="sm">Voting Power</Heading>
      <RadioGroup>
        <Stack>
          <Radio value="1">Host&apos;s stake divided by total stake</Radio>
          <Radio value="2">Equal voting power for all hosts</Radio>
        </Stack>
      </RadioGroup>
      <br />
      <Heading size="sm">Leader Election Method</Heading>
      <RadioGroup>
        <Stack>
          <Radio value="1">Round robin, ordered by voting power</Radio>
          <Radio value="2">Round robin, random order</Radio>
          <Radio value="3">Completely random each time</Radio>
        </Stack>
      </RadioGroup>
      <br />
      <Heading size="sm">Block Size in KiB:</Heading>
      <NumberInput size="md" maxW={24}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <br />
      <Stack direction="row" spacing="20px">
        <Button size="sm" colorScheme="blue">
          Save
        </Button>
        <Button size="sm">Cancel</Button>
      </Stack>
    </>
  );
}
