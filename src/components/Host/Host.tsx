import React, { useEffect, useState } from 'react';
import {
  Heading,
  Box,
  Stack,
  Select,
  Button,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
} from '@chakra-ui/react';

import { useSearchParams } from 'react-router-dom';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { useAppSelector, useAppDispatch } from '../../store';

import { NodeTable } from '../../services';
import Chain from '../Chain';
import SideBar from '../SideBar';

export default function Host() {
  const [searchParams, setSearchParams] = useSearchParams();
  const nodeId = searchParams.get('id');

  const nodes: NodeTable = useAppSelector((state) => state.network.nodes) as NodeTable;
  const selectedNode = nodeId ? nodes[parseInt(nodeId, 10)] : undefined;

  // console.log(nodeId)
  // console.log(nodes)
  // console.log(selectedNode)

  return (
    <Box p={4}>
      <Stack direction="column" spacing={4}>
        <Heading> Host View </Heading>
        <Formik
          initialValues={{ node: nodeId ? parseInt(nodeId, 10) : undefined }}
          onSubmit={(values, actions) => {
            setSearchParams({ id: `${values.node}` });
            actions.setSubmitting(false);
          }}
          validationSchema={Yup.object().shape({
            node: Yup.number().required(),
          })}
        >
          <Form>
            <Stack direction="row" spacing={4}>
              <Field name="node" as={Select} placeholder="Select Host">
                {Object.values(nodes).map((node) => (
                  <option value={node.getId()}> {node.getName()} </option>
                ))}
              </Field>
              <Button type="submit">View</Button>
            </Stack>
          </Form>
        </Formik>
        {nodeId && selectedNode && (
          <Box w="100%" borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
            <Heading pb={4}> Chain </Heading>
            <Chain selectedNode={selectedNode} />
          </Box>
        )}
        <Stack direction="row" spacing={4}>
          {nodeId && selectedNode && (
            <Box w="75%" borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
              <Heading> Stats </Heading>
              <Table>
                <Tbody>
                  <Tr>
                    <Th> ID: </Th>
                    <Td> {selectedNode.getId()} </Td>
                    <Th> Name: </Th>
                    <Td> {selectedNode.getName()} </Td>
                  </Tr>
                  <Tr>
                    <Th> Role: </Th>
                    <Td> {selectedNode.getRole()} </Td>
                    <Th> Total stake: </Th>
                    <Td> {selectedNode.getStake()} </Td>
                  </Tr>
                  <Tr>
                    <Th> Consensus Stage: </Th>
                    <Td> {selectedNode.getLastActionTime()} </Td>
                    <Th> Chain Length: </Th>
                    <Td> {selectedNode.getLastLeaderTime()} </Td>
                  </Tr>
                  <Tr>
                    <Th> Last action time: </Th>
                    <Td> {selectedNode.getLastActionTime()} </Td>
                    <Th> Last leader time: </Th>
                    <Td> {selectedNode.getLastLeaderTime()} </Td>
                  </Tr>
                </Tbody>
              </Table>
            </Box>
          )}

          {nodeId && selectedNode && (
            <Box
              alignItems="center"
              w="25%"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              p={4}
            >
              <Heading pb={3}> Actions </Heading>
              <Table variant="unstyled">
                <Tbody>
                  <Tr>
                    <Td textAlign="center">
                      {' '}
                      <Button w="60%" colorScheme="teal" size="lg">
                        Make Transactions
                      </Button>{' '}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td textAlign="center">
                      {' '}
                      <Button w="60%" colorScheme="teal" size="lg">
                        Change Type
                      </Button>{' '}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td textAlign="center">
                      {' '}
                      <Button w="60%" colorScheme="teal" size="lg">
                        Change Location
                      </Button>{' '}
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </Box>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}
