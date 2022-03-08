import React from 'react';

import { VisibilityContext } from 'react-horizontal-scrolling-menu';
import {
  Heading,
  Box,
  Flex,
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

export function Card({
  blockBbj,
}: // selected,
// onClick,
{
  blockBbj: any;
  // selected: boolean;
  // onClick: Function;
}) {
  const visibility = React.useContext(VisibilityContext);

  // const visible = visibility.isItemVisible(itemId);
  console.log(blockBbj);

  return (
    <div
      // onClick={() => onClick()}
      // onKeyDown={() => onClick()}
      role="button"
      style={{
        margin: '10px 10px',
        width: '460px',
        height: '650px',
        userSelect: 'none',
      }}
      tabIndex={0}
      className="Card"
    >
      <Box
        bg="teal"
        h="100%"
        alignItems="center"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={4}
        mb={10}
      >
        <Heading mb={1}> Block # {blockBbj[0].blockId} </Heading>
        <Box
          bg="black"
          h="60%"
          alignItems="center"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p={4}
          mb={6}
        >
          Headers:
          {/* <Box alignItems='center' borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} m={1}>
                        Name: {blockBbj[0].blockName}
                    </Box> */}
          <Box
            alignItems="center"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={4}
            m={1}
          >
            Block Id:{blockBbj[0].blockId}
          </Box>
          <Box
            alignItems="center"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={4}
            m={1}
          >
            {blockBbj[0].hash}
          </Box>
          <Box
            alignItems="center"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={4}
            m={1}
          >
            {blockBbj[0].lastHash}
          </Box>
          <Box
            alignItems="center"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={4}
            m={1}
          >
            {blockBbj[0].timestamp}
          </Box>
        </Box>
        <Box
          bg="black"
          h="30%"
          alignItems="center"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p={4}
        >
          Data:
          <Box
            w="100%"
            h="80%"
            alignItems="center"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={4}
            m={1}
          >
            {blockBbj[0].blockData}
          </Box>
        </Box>
      </Box>
      {/* <div>
                <div>{id}</div>
                <div style={{ backgroundColor: visible ? "transparent" : "gray" }}>
                    visible: {JSON.stringify(visible)}
                </div>
                <div>selected: {JSON.stringify(!!selected)}</div>
            </div>
            <div
                style={{
                    backgroundColor: selected ? "green" : "bisque",
                    height: "200px"
                }}
            /> */}
    </div>
  );
}

export default Card;
