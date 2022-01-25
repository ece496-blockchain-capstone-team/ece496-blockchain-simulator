// import { render } from '@testing-library/react';
import {
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
import React from 'react';
import ChainObj from '../../services/Chain';

// export default class Chain extends React.Component {
export default function Chain() {
  return (
    <div className="ChainView">
      <p> This is a test paragraph in the Chain view. </p>
    </div>
  );
}
