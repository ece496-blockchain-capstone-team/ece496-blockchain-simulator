import { Box, Button, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption } from '@chakra-ui/react'
import React from 'react';
import NetworkObj from '../../services/Network';


export default function Network() {
  let network = new NetworkObj(5);

  const clickHandler = () => {
    console.log('Hosts:');
    console.log(network.getId());
  };

  const validatorselection = () => {
    console.log("Validator selected:");
    console.log(network.chooseValidator());
  };

  // const getNodeData = (nodeNum: number) => {
  //   let temp = network.getHosts()[nodeNum];
  //   return temp.map((tmp) => <li>{tmp}</li>);
  // }
  const getNodeData = (nodeNum: number) => {
    let temp = network.getHosts();
    return temp[nodeNum].getId();
  }

  return (
    <div className="NetworkView">
      <Box bg='red' w='10%' p={4} color='white'> {network.getId()} </Box>
      <Table>
        <Thead>
          <Tr>
            <Th>Node Id</Th>
            <Th>into</Th>
            <Th isNumeric>multiply by</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>{network.getHosts()[0].getId()}</Td>
            <Td>millimetres (mm)</Td>
            <Td isNumeric>25.4</Td>
          </Tr>
          <Tr>
            <Td>{network.getHosts()[1].getId()}</Td>
            <Td>millimetres (mm)</Td>
            <Td isNumeric>25.4</Td>
          </Tr>
          <Tr>
            <Td>{network.getHosts()[2].getId()}</Td>
            <Td>millimetres (mm)</Td>
            <Td isNumeric>25.4</Td>
          </Tr>
          <Tr>
            <Td>{network.getHosts()[3].getId()}</Td>
            <Td>centimetres (cm)</Td>
            <Td isNumeric>30.48</Td>
          </Tr>
          <Tr>
            <Td>{network.getHosts()[4].getId()}</Td>
            <Td>metres (m)</Td>
            <Td isNumeric>0.91444</Td>
          </Tr>
        </Tbody>

      </Table>
      <span>
        <Button type="button" onClick={clickHandler}>
          Hosts
        </Button>
      </span>
      <span>
        <Button type="button" onClick={validatorselection}>
          Select Validator
        </Button>
      </span>
    </div>
  );
}

