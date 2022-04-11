import React, { PureComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { readFileSync } from 'fs';

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
  Label,
  ResponsiveContainer,
} from 'recharts';

import { RootState, useAppSelector } from '../../store';

function genColour(): string {
  let r = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);
  return 'rgb(' + r + ',' + g + ',' + b + ')';
}

interface IMetricsFile {
  fileName: string;
  stake: number;
  votingPower: number;
  electionAlgo: number;
  antiMaliciousAlgo: number;
  blockSize: number;
  numNodes: number;
  numMaliciousNodes: number;
  throughput: number;
  nakamotoCoeff: number;
}

class MetricsFile implements IMetricsFile {
  fileName: string;
  stake: number;
  votingPower: number;
  electionAlgo: number;
  antiMaliciousAlgo: number;
  blockSize: number;
  numNodes: number;
  numMaliciousNodes: number;
  throughput: number;
  throughputKiB: number;
  nakamotoCoeff: number;
  fill: string;

  constructor(
    fileName: string,
    stake: number,
    votingPower: number,
    electionAlgo: number,
    antiMaliciousAlgo: number,
    blockSize: number,
    numNodes: number,
    numMaliciousNodes: number,
    throughput: number,
    nakamotoCoeff: number
  ) {
    this.fileName = fileName;
    this.stake = stake;
    this.votingPower = votingPower;
    this.electionAlgo = electionAlgo;
    this.antiMaliciousAlgo = antiMaliciousAlgo;
    this.blockSize = blockSize;
    this.numNodes = numNodes;
    this.numMaliciousNodes = numMaliciousNodes;
    this.throughput = throughput;
    this.throughputKiB = throughput / blockSize;
    this.nakamotoCoeff = nakamotoCoeff;
    this.fill = genColour();
  }

  // Getters
  getFileName(): string {
    return this.fileName;
  }
  getStake(): number {
    return this.stake;
  }
  getVotingPower(): number {
    return this.votingPower;
  }
  getElectionAlgo(): number {
    return this.electionAlgo;
  }
  getAntiMaliciousAlgo(): number {
    return this.antiMaliciousAlgo;
  }
  getBlockSize(): number {
    return this.blockSize;
  }
  getNumNodes(): number {
    return this.numNodes;
  }
  getNumMaliciousNodes(): number {
    return this.numMaliciousNodes;
  }
  getThroughput(): number {
    return this.throughput;
  }
  getThroughputKiB(): number {
    return this.throughputKiB;
  }
  getNakamotoCoeff(): number {
    return this.nakamotoCoeff;
  }
  getFill(): string {
    return this.fill;
  }

  // Setters
  setFileName(fn: string) {
    this.fileName = fn;
  }
  setStake(s: number) {
    this.stake = s;
  }
  setVotingPower(vp: number) {
    this.votingPower = vp;
  }
  setElectionAlgo(ea: number) {
    this.electionAlgo = ea;
  }
  setAntiMaliciousAlgo(ama: number) {
    this.antiMaliciousAlgo = ama;
  }
  setBlockSize(bs: number) {
    this.blockSize = bs;
  }
  setNumNodes(nn: number) {
    this.numNodes = nn;
  }
  setNumMaliciousNodes(nmn: number) {
    this.numMaliciousNodes = nmn;
  }
  setThroughput(t: number) {
    this.throughput = t;
  }
  setThroughputKiB(tk: number) {
    this.throughputKiB = tk;
  }
  setNakamotoCoeff(nc: number) {
    this.nakamotoCoeff = nc;
  }
  setFill(f: string) {
    this.fill = f;
  }

  // Calculate throughputKiB
  calcThroughputKiB() {
    if (this.blockSize > 0) {
      this.throughputKiB = this.throughput * this.blockSize;
    } else {
      this.throughputKiB = 0;
    }
  }
}

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
  // const finality: number = useAppSelector((state) => state.network.finality) as number;
  const nakamotoCoeff: number = useAppSelector(
    (state) => state.network.nakamotoCoeff
  ) as number;
  // TODO: use metrics to store over multiple runs
  // const { numNodes, numMaliciousNodes, throughput, finality, nakamotoCoeff } =
  //   useSelector((state: RootState) => state.metrics);
  const dispatch = useDispatch();
  const [fileName, setFileName] = React.useState('blockchainSimMetrics.csv');
  const [currInputFile, setCurrInputFile] = React.useState<File | null>(null);
  const [inputFiles, setInputFiles] = React.useState<Array<MetricsFile>>([]);

  const HEADERS: string[] = [
    'Parameter Name',
    'Description',
    'Parameter Variable',
    'Value',
  ];

  let csvData = [
    HEADERS,
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
    // [
    //   'Finality',
    //   'Time from client to send a transaction to finally be appended on the ledger in seconds.',
    //   'finality',
    //   `${finality}`,
    // ],
    [
      'Nakamoto Coefficient',
      'Nakamoto coefficient is the number of validators that would need to work together to slow down or block the blockchain from functioning properly. The Nakamoto coefficient depends on the network configuration.',
      'nakamotoCoeff',
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
      <>
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
            {/* <Tr>
            <Td>Finality</Td>
            <Td>
              Time from client to send a transaction to finally be appended on the ledger
              in seconds.
            </Td>
            <Td>finality</Td>
            <Td>{finality}</Td>
          </Tr> */}
            <Tr>
              <Td>Nakamoto Coefficient</Td>
              <Td>
                Nakamoto coefficient is the number of validators that would need to work
                together to slow down or block the blockchain from functioning properly.
                The Nakamoto coefficient depends on the network configuration.
              </Td>
              <Td>nakamotoCoeff</Td>
              <Td>{nakamotoCoeff}</Td>
            </Tr>
          </Tbody>
        </Table>
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
      </>
    );
  }

  function onInputFileChange() {
    let reader = new FileReader();
    if (currInputFile != null) {
      reader.readAsText(currInputFile);
      reader.onload = function readerOnload() {
        // Note: can only use reader.result here
        let resultStr: string = reader.result as string;
        let resultLines: string[] = resultStr.split(/\r?\n/);
        // Check if headers are same as file
        let loadedHeaders = resultLines[0].split(',');
        for (let i = 1; i < HEADERS.length; i++) {
          if (HEADERS[i] !== loadedHeaders[i]) {
            console.log('Error: Invalid file headers.');
            return;
          }
        }
        let mFile: MetricsFile = new MetricsFile(
          currInputFile.name,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0
        );
        for (let i = 1; i < resultLines.length; i++) {
          let params = resultLines[i].split(',');
          if (params.length === HEADERS.length) {
            let paramVar = params[2];
            let paramVal = params[3];
            if (paramVar === 'stake') {
              mFile.setStake(Number(paramVal));
            } else if (paramVar === 'votingPower') {
              mFile.setVotingPower(Number(paramVal));
            } else if (paramVar === 'electionAlgo') {
              mFile.setElectionAlgo(Number(paramVal));
            } else if (paramVar === 'antiMaliciousAlgo') {
              mFile.setAntiMaliciousAlgo(Number(paramVal));
            } else if (paramVar === 'blockSize') {
              mFile.setBlockSize(Number(paramVal));
            } else if (paramVar === 'numNodes') {
              mFile.setNumNodes(Number(paramVal));
            } else if (paramVar === 'numMaliciousNodes') {
              mFile.setNumMaliciousNodes(Number(paramVal));
            } else if (paramVar === 'throughput') {
              mFile.setThroughput(Number(paramVal));
            } else if (paramVar === 'nakamotoCoeff') {
              mFile.setNakamotoCoeff(Number(paramVal));
            }
          }
        }
        mFile.calcThroughputKiB();

        // Replace duplicate file if existing
        let tmpInputFiles = inputFiles;
        const dupIdx = tmpInputFiles.findIndex(
          (obj) => obj.getFileName() === mFile.getFileName()
        );
        if (dupIdx !== -1) {
          tmpInputFiles.splice(dupIdx, 1);
        }

        // Add to input files list
        setInputFiles([...tmpInputFiles, mFile]);
      };

      reader.onerror = function readerOnFailure() {
        console.log('Error trying to read file.');
      };
    }
  }

  function loadGraphView() {
    return (
      <>
        <Text>
          Upload your previously downloaded metrics csv files here. Each file must have a
          unique name.
        </Text>
        <br />
        <Stack direction="row" spacing="20px">
          <input
            type="file"
            width="auto"
            onChange={(event) =>
              event && event.target && event.target.files && event.target.files[0]
                ? setCurrInputFile(event.target.files[0])
                : null
            }
          />
          <Button size="sm" colorScheme="teal" onClick={() => onInputFileChange()}>
            Upload
          </Button>
        </Stack>

        <br />
        <Heading size="md">Throughput (blocks/sec) vs # Nodes</Heading>
        <br />
        <Box width="60%">
          <ScatterChart
            width={800}
            height={400}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid />
            <XAxis type="number" dataKey="x" name="numNodes" unit="">
              <Label value="Number of Nodes" offset={0} position="bottom" fill="gray" />
            </XAxis>
            <YAxis type="number" dataKey="y" name="throughput" unit="">
              <Label
                value="Throughput (blocks/sec)"
                angle={270}
                offset={0}
                position="left"
                fill="gray"
              />
            </YAxis>
            <ZAxis type="number" range={[100]} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Legend layout="vertical" verticalAlign="top" align="right" />
            {inputFiles.map((file) => (
              <Scatter
                key={file.fileName}
                name={file.fileName}
                data={[{ x: file.numNodes, y: file.throughput }]}
                fill={file.fill}
              />
            ))}
          </ScatterChart>
        </Box>
        <br />
        <Heading size="md">Throughput (KiB/sec) vs # Nodes</Heading>
        <br />
        <Box width="60%">
          <ScatterChart
            width={800}
            height={400}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid />
            <XAxis type="number" dataKey="x" name="numNodes" unit="">
              <Label value="Number of Nodes" offset={0} position="bottom" fill="gray" />
            </XAxis>
            <YAxis type="number" dataKey="y" name="throughput" unit="">
              <Label
                value="Throughput (KiB/sec)"
                angle={270}
                offset={0}
                position="left"
                fill="gray"
              />
            </YAxis>
            <ZAxis type="number" range={[100]} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Legend layout="vertical" verticalAlign="top" align="right" />
            {inputFiles.map((file) => (
              <Scatter
                key={file.fileName}
                name={file.fileName}
                data={[{ x: file.numNodes, y: file.throughputKiB }]}
                fill={file.fill}
              />
            ))}
          </ScatterChart>
        </Box>
        <br />
      </>
    );
  }

  return (
    <div className="MetricsView">
      <Box p={4}>
        <Heading size="lg">Metrics Dashboard</Heading>
        <br />
        <Text>
          View and download metrics related to the current configuration or upload
          downloaded metrics CSVs to generate graphs.
        </Text>
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
      </Box>
    </div>
  );
}
