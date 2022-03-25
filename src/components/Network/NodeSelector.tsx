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
  nodeNum.Amsterdam = 1;
  nodeNum.Brisbane = 1;
  nodeNum.Capetown = 1;
  nodeNum.Tokyo = 1;

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
            <Heading size="sm">Amsterdam</Heading>
            <NumberInput
              size="md"
              maxW={24}
              defaultValue={1}
              onChange={(e) => {
                nodeNum.Amsterdam = parseInt(e, 10);
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
            <Heading size="sm">Brisbane</Heading>
            <NumberInput
              size="md"
              maxW={24}
              defaultValue={1}
              onChange={(e) => {
                nodeNum.Brisbane = parseInt(e, 10);
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
            <Heading size="sm">Capetown</Heading>
            <NumberInput
              size="md"
              maxW={24}
              defaultValue={1}
              onChange={(e) => {
                nodeNum.Capetown = parseInt(e, 10);
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
            <Heading size="sm">Tokyo</Heading>
            <NumberInput
              size="md"
              maxW={24}
              defaultValue={1}
              onChange={(e) => {
                nodeNum.Tokyo = parseInt(e, 10);
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
