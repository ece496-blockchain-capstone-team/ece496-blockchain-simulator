import React, { PureComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Heading,
  Button,
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Text,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from '@chakra-ui/react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { RootState, useAppSelector } from '../../store';

// export default class Metrics extends React.Component {
export default function Metrics() {
  // Import setting states
  const { stake, votingPower, electionAlgo, antiMaliciousAlgo, blockSize } = useSelector(
    (state: RootState) => state.settings
  );
  // Import metric states
  const numNodes: number = useAppSelector((state) => state.network.totalNodes) as number;
  const numMaliciousNodes: number = useAppSelector(
    (state) => state.network.totalMaliciousNodes
  ) as number;
  const throughput: number = useAppSelector(
    (state) => state.network.throughput
  ) as number;
  const finality: number = useAppSelector((state) => state.network.finality) as number;
  const nakamotoCoeff: number = useAppSelector(
    (state) => state.network.nakamotoCoeff
  ) as number;
  // const { numNodes, numMaliciousNodes, throughput, finality, nakomotoCoeff } =
  //   useSelector((state: RootState) => state.metrics);
  const dispatch = useDispatch();
  const [fileName, setFileName] = React.useState('');
  React.useEffect(() => {
    setFileName('blockchainSimMetrics.csv');
  }, ['blockchainSimMetrics.csv']);

  let csvData = [
    ['Parameter Name', 'Description', 'Parameter Variable', 'Value'],
    [
      'Staking',
      'Type of stake setup. 1 = Same stake for every host. 2 = Random stake',
      'stake',
      `${stake}`,
    ],
    [
      'Voting Power',
      "Division of voting power. 1 = Host's stake divided by total stake. 2 = Equal voting power for all hosts.",
      'votingPower',
      `${votingPower}`,
    ],
    [
      'Leader Election Method',
      'Leader election method. 1 = Round robin - ordered by voting power. 2 = Round robin - random order. 3 = Completely random each time.',
      'electionAlgo',
      `${electionAlgo}`,
    ],
    [
      'Anti-Malicious Algorithm',
      'Type of anti-malicious algorithm implemented. 1 = None. 2 = Byzantine Fault Tolerance.',
      'antiMaliciousAlgo',
      `${antiMaliciousAlgo}`,
    ],
    ['Block Size', 'Size of each block in KiB.', 'blockSize', `${blockSize}`],
    ['Number of Nodes', 'Number of nodes in network.', 'numNodes', `${numNodes}`],
    [
      'Number of Malicious Nodes',
      'Number of malicious nodes in network.',
      'numMaliciousNodes',
      `${numMaliciousNodes}`,
    ],
    [
      'Throughput',
      'Number of blocks added to ledger per second where a block is considered added if a block reaches a quorum.',
      'throughput',
      `${throughput}`,
    ],
    [
      'Finality',
      'Time from client to send a transaction to finally be appended on the ledger in seconds.',
      'finality',
      `${finality}`,
    ],
    [
      'Nakomoto Coefficient',
      'Nakamoto coefficient is the number of validators that would need to work together to slow down or block the blockchain from functioning properly. The Nakamoto coefficient depends on the network configuration.',
      'nakomotoCoeff',
      `${nakamotoCoeff}`,
    ],
  ];

  function saveMetricsAsCSV() {
    const element = document.createElement('a');
    let csvString = '';
    for (let i = 0; i < csvData.length; i++) {
      let row = csvData[i].toString();
      csvString += row;
      csvString += '\n';
    }
    const file = new Blob([csvString], { type: 'text/csv' });
    element.href = URL.createObjectURL(file);
    element.download = `${fileName}`;
    document.body.appendChild(element);
    element.click();
  }

  function loadTableView() {
    return (
      <Table size="lg" variant="simple" width="fill">
        <Tbody>
          <Tr>
            <Th>Parameter Name</Th>
            <Th>Description</Th>
            <Th>Parameter Variable</Th>
            <Th>Value</Th>
          </Tr>
          <Tr>
            <Td>Staking</Td>
            <Td>
              Type of stake setup.
              <br />1 = Same stake for every host.
              <br />2 = Random stake.
            </Td>
            <Td>stake</Td>
            <Td>{stake}</Td>
          </Tr>
          <Tr>
            <Td>Voting Power</Td>
            <Td>
              Division of voting power.
              <br />1 = Host&apos;s stake divided by total stake.
              <br />2 = Equal voting power for all hosts.
            </Td>
            <Td>votingPower</Td>
            <Td>{votingPower}</Td>
          </Tr>
          <Tr>
            <Td>Leader Election Method</Td>
            <Td>
              Leader election method.
              <br />1 = Round robin, ordered by voting power.
              <br />2 = Round robin, random order.
              <br />3 = Completely random each time.
            </Td>
            <Td>electionAlgo</Td>
            <Td>{electionAlgo}</Td>
          </Tr>
          <Tr>
            <Td>Anti-Malicious Algorithm</Td>
            <Td>
              Type of anti-malicious algorithm implemented.
              <br />1 = None.
              <br />2 = Byzantine Fault Tolerance.
            </Td>
            <Td>antiMaliciousAlgo</Td>
            <Td>{antiMaliciousAlgo}</Td>
          </Tr>
          <Tr>
            <Td>Block Size</Td>
            <Td>Size of each block in KiB.</Td>
            <Td>blockSize</Td>
            <Td>{blockSize}</Td>
          </Tr>
          <Tr>
            <Td>Number of Nodes</Td>
            <Td>Number of nodes in network.</Td>
            <Td>numNodes</Td>
            <Td>{numNodes}</Td>
          </Tr>
          <Tr>
            <Td>Number of Malicious Nodes</Td>
            <Td>Number of malicious nodes in network.</Td>
            <Td>numMaliciousNodes</Td>
            <Td>{numMaliciousNodes}</Td>
          </Tr>
          <Tr>
            <Td>Throughput</Td>
            <Td>
              Number of blocks added to ledger per second where a block is considered
              added if a block reaches a quorum.
            </Td>
            <Td>throughput</Td>
            <Td>{throughput}</Td>
          </Tr>
          <Tr>
            <Td>Finality</Td>
            <Td>
              Time from client to send a transaction to finally be appended on the ledger
              in seconds.
            </Td>
            <Td>finality</Td>
            <Td>{finality}</Td>
          </Tr>
          <Tr>
            <Td>Nakomoto Coefficient</Td>
            <Td>
              Nakamoto coefficient is the number of validators that would need to work
              together to slow down or block the blockchain from functioning properly. The
              Nakamoto coefficient depends on the network configuration.
            </Td>
            <Td>nakamotoCoeff</Td>
            <Td>{nakamotoCoeff}</Td>
          </Tr>
        </Tbody>
      </Table>
    );
  }

  /**
   * TODO: delete this when we have actual data for finality
   * Reference: https://recharts.org/en-US/examples/JointLineScatterChart
   */
  const data01 = [
    { x: 10, y: 30 },
    { x: 30, y: 200 },
    { x: 45, y: 100 },
    { x: 50, y: 400 },
    { x: 70, y: 150 },
    { x: 100, y: 250 },
  ];
  const data02 = [
    { x: 30, y: 20 },
    { x: 50, y: 180 },
    { x: 75, y: 240 },
    { x: 100, y: 100 },
    { x: 120, y: 190 },
  ];

  function loadGraphView() {
    return (
      <>
        <Heading size="med">Metrics Dashboard</Heading>
        <br />
        <ScatterChart
          width={500}
          height={400}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid />
          <XAxis type="number" dataKey="x" name="stature" unit="Number of Transactions" />
          <YAxis type="number" dataKey="y" name="weight" unit="Time" />
          <ZAxis type="number" range={[100]} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Legend />
          <Scatter name="File 1 Name" data={data01} fill="#8884d8" line />
          <Scatter name="File 2 Name" data={data02} fill="#82ca9d" line />
        </ScatterChart>
      </>
    );
  }

  return (
    <div className="MetricsView">
      <Box p={4}>
        <Heading size="lg">Metrics Dashboard</Heading>
        <br />
        <Text>View and download metrics related to the current configuration.</Text>
        <br />
        <Tabs colorScheme="teal">
          <TabList>
            <Tab>Table</Tab>
            <Tab>Graph</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>{loadTableView()}</TabPanel>
            <TabPanel>{loadGraphView()}</TabPanel>
          </TabPanels>
        </Tabs>
        <FormControl>
          <FormLabel htmlFor="csv-name">CSV Name</FormLabel>
          <Input
            id="csv-name"
            placeholder="CSV name"
            size="sm"
            width="fill"
            onChange={(event) => setFileName(event.target.value)}
          />
        </FormControl>
        <br />
        <Stack direction="row" spacing="20px">
          <Button size="sm" colorScheme="teal" onClick={() => saveMetricsAsCSV()}>
            Save as CSV
          </Button>
          <Link to="/">
            <Button size="sm" colorScheme="gray">
              Cancel
            </Button>
          </Link>
        </Stack>
        <br />
      </Box>
    </div>
  );
}
