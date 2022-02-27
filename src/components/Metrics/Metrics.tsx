// import { render } from '@testing-library/react';
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
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from '@chakra-ui/react';
import metrics from '../../slices/metrics';
import settings from '../../slices/settings';
import { RootState } from '../../store';

// export default class Metrics extends React.Component {
export default function Metrics() {
  // Import metric states
  const {
    numNodes,
    numValidators,
    numMaliciousNodes,
    throughput,
    finality,
    nakomotoCoeff,
  } = useSelector((state: RootState) => state.metrics);
  const dispatch = useDispatch();

  // TODO: function to export metrics

  // TODO: metrics page
  // TODO: get election algo and anti-malicious algo from sim settings page
  // Have a fillable field for metrics export name
  // Display throughput, finality, nakomoto Coeff
  // Button to download current config
  //
  return (
    <div className="MetricsView">
      <p>View and download metrics related to the current configuration.</p>
    </div>
  );
}
