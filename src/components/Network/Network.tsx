import React, { useState } from 'react';
import {
  Box,
  Stack,
  Button,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from '@chakra-ui/react';
import NetworkObj from '../../services/Network';

// function useForceUpdate() {
//   const [value, setValue] = useState(0); // integer state
//   return () => setValue(val => val + 1); // update the state to force render
// }

export default function Network() {
  return <div className="NetworkView">Network View</div>;
}
