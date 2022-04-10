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
  Center,
} from '@chakra-ui/react';
import network from '../../slices/network';
import { RootState } from '../../store';

export default function NodeSelector({ confirm, cancel }: any) {
  let nodeNum: any = {};
  nodeNum.Toronto = 1;
  nodeNum.NewYork = 1;
  nodeNum.LosAngeles = 1;
  nodeNum.Mumbai = 1;
  nodeNum.CapeTown = 1;
  nodeNum.Moscow = 1;

  return (
    <div>
      <Stack>
        <Heading p={6}>Select Number Of Nodes</Heading>
        <Box pl={10}>
          <Box p={6}>
            <Heading size="sm">Toronto</Heading>
            <NumberInput
              size="md"
              maxW={24}
              defaultValue={1}
              onChange={(e) => {
                nodeNum.Toronto = parseInt(e, 10);
              }}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Box>
          <Box p={6}>
            <Heading size="sm">New York</Heading>
            <NumberInput
              size="md"
              maxW={24}
              defaultValue={1}
              onChange={(e) => {
                nodeNum.NewYork = parseInt(e, 10);
              }}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Box>
          <Box p={6}>
            <Heading size="sm">Los Angeles</Heading>
            <NumberInput
              size="md"
              maxW={24}
              defaultValue={1}
              onChange={(e) => {
                nodeNum.LosAngeles = parseInt(e, 10);
              }}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Box>
          <Box p={6}>
            <Heading size="sm">Mumbai</Heading>
            <NumberInput
              size="md"
              maxW={24}
              defaultValue={1}
              onChange={(e) => {
                nodeNum.Mumbai = parseInt(e, 10);
              }}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Box>
          <Box p={6}>
            <Heading size="sm">Cape Town</Heading>
            <NumberInput
              size="md"
              maxW={24}
              defaultValue={1}
              onChange={(e) => {
                nodeNum.CapeTown = parseInt(e, 10);
              }}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Box>
          <Box p={6}>
            <Heading size="sm">Moscow</Heading>
            <NumberInput
              size="md"
              maxW={24}
              defaultValue={1}
              onChange={(e) => {
                nodeNum.Moscow = parseInt(e, 10);
              }}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Box>
        </Box>
      </Stack>
      <Box pt={6}>
        <Button ml={60} mr={4} colorScheme="blue" onClick={() => confirm(nodeNum)}>
          Confirm
        </Button>
        <Button ml={4} onClick={() => cancel()}>
          Cancel
        </Button>
      </Box>
    </div>
  );
}
