import React, { useState, useEffect } from 'react';
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

import { useAppDispatch } from '../../store';
import { network } from '../../slices';

export default function Network() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(network.actions.init());
  }, []);

  return <div> Network View </div>;
}
