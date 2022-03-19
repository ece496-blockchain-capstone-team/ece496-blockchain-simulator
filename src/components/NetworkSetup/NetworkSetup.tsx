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

  return (
    <Box p={4}>
      <Button
        size="sm"
        colorScheme="blue"
        onClick={() =>
          dispatch(network.actions.addHost({ name: 'Bro', location: 0, stake: 100 }))
        }
      >
        New Host
      </Button>
    </Box>
  );
}
