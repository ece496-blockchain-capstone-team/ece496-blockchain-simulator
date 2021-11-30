// import { render } from '@testing-library/react';
import {Box, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption} from '@chakra-ui/react'
import React from 'react';


// export default class Block extends React.Component {
export default function Block() {
  const clickHandler = () => {
    console.log('button pressed');
  };

  const nodelist = "";

  return (
    <div className="BlockView">
      <p> This is a test paragraph in the block view. </p>
      <Box bg='grey' w='10%' p={4} color='white'> {nodelist} </Box>
      <button type="button" onClick={clickHandler}>
        Activate Lasers
      </button>
    </div>
  );
}