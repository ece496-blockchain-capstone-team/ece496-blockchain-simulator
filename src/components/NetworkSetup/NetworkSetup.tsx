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
import network from '../../slices/network';
import { RootState } from '../../store';

export default function NetworkSetup() {
  const dispatch = useDispatch();
  dispatch(network.actions.init());

  return (
    <Box p={4}>
      <Heading size="sm">Toronto</Heading>
      <NumberInput size="md" maxW={24} defaultValue={1} onChange={(e) => {}}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </Box>
  );
}
