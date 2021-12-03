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
  let network = new NetworkObj(5);

  const step = () => {
    network.timeStep(1);
  };

  const clickHandler = () => {
    console.log('Hosts:');
    console.log(network.getId());
  };

  const addBlock = (nodeNum: number) => {
    network.nodeList[nodeNum].addBlock();
  };

  // const forceUpdate = useForceUpdate();

  const validatorselection = () => {
    console.log('Validator selected:');
    console.log(network.chooseValidator());
  };

  // const getNodeData = (nodeNum: number) => {
  //   let temp = network.getHosts()[nodeNum];
  //   return temp.map((tmp) => <li>{tmp}</li>);
  // }
  const getNodeData = (nodeNum: number) => {
    let temp = network.getHosts();
    return temp[nodeNum].getId();
  };

  return (
    <div className="NetworkView">
      <Table>
        <Thead>
          <Tr>
            <Th>Node Id</Th>
            <Th>Blockchain Version</Th>
            <Th>Connected Nodes</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>{network.getHosts()[0].getId()}</Td>
            <Td>{network.getHosts()[0].getChain().getVersion()}</Td>
            <Td>{network.getHosts()[0].getConnectedNodeIds()}</Td>
            <Td>
              <Button type="button" onClick={() => addBlock(0)}>
                Add Block
              </Button>
            </Td>
          </Tr>
          <Tr>
            <Td>{network.getHosts()[1].getId()}</Td>
            <Td>{network.getHosts()[1].getChain().getVersion()}</Td>
            <Td>{network.getHosts()[1].getConnectedNodeIds()}</Td>
            <Td>
              <Button type="button" onClick={() => addBlock(1)}>
                Add Block
              </Button>
            </Td>
          </Tr>
          <Tr>
            <Td>{network.getHosts()[2].getId()}</Td>
            <Td>{network.getHosts()[2].getChain().getVersion()}</Td>
            <Td>{network.getHosts()[2].getConnectedNodeIds()}</Td>
            <Td>
              <Button type="button" onClick={() => addBlock(2)}>
                Add Block
              </Button>
            </Td>
          </Tr>
          <Tr>
            <Td>{network.getHosts()[3].getId()}</Td>
            <Td>{network.getHosts()[3].getChain().getVersion()}</Td>
            <Td>{network.getHosts()[3].getConnectedNodeIds()}</Td>
            <Td>
              <Button type="button" onClick={() => addBlock(3)}>
                Add Block
              </Button>
            </Td>
          </Tr>
          <Tr>
            <Td>{network.getHosts()[4].getId()}</Td>
            <Td>{network.getHosts()[4].getChain().getVersion()}</Td>
            <Td>{network.getHosts()[4].getConnectedNodeIds()}</Td>
            <Td>
              <Button type="button" onClick={() => addBlock(4)}>
                Add Block
              </Button>
            </Td>
          </Tr>
        </Tbody>
      </Table>
      <Stack spacing={4} align="center" justify="center" direction="row">
        <Button type="button" onClick={step}>
          Step
        </Button>
        {/* <Button type="button" onClick={forceUpdate}>
          Render
        </Button> */}
        <Button type="button" onClick={clickHandler}>
          Hosts
        </Button>
        <Button type="button" onClick={validatorselection}>
          Select Validator
        </Button>
      </Stack>
    </div>
  );
}
