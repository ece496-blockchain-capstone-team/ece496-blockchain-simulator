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
import BlockObj from '../../services/Block';

// export default class Block extends React.Component {
export default function Block() {
  let genesisBlock = BlockObj.genesisBlock();
  let block1 = BlockObj.createBlock(1, genesisBlock, 'block1data');
  let block2 = BlockObj.createBlock(2, block1, 'block2data');

  return (
    <div className="BlockView">
      <p> This is a test paragraph in the block view. </p>
      <p>{genesisBlock.getString()}</p>
      <p>{block1.getString()}</p>
      <p>{block2.getString()}</p>
    </div>
  );
}
