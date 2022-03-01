import React from 'react';
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

import { useAppSelector } from '../../store';

import { NodeTable } from '../../services';

export default function Host() {
  const [searchParams, setSearchParams] = useSearchParams();
  const nodeId = searchParams.get('id');

  const nodes: NodeTable = useAppSelector((state) => state.network.nodes) as NodeTable;
  const selectedNode = nodeId ? nodes[parseInt(nodeId, 10)] : undefined;

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
          <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
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
                  <Th> Last action time: </Th>
                  <Td> {selectedNode.getLastActionTime()} </Td>
                  <Th> Last leader time: </Th>
                  <Td> {selectedNode.getLastLeaderTime()} </Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>
        )}
      </Stack>
    </Box>
  );
}
