import React, { ReactNode, ReactText } from 'react';
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Button,
  Heading,
  Stack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FlexProps,
} from '@chakra-ui/react';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
} from 'react-icons/fi';
import { IconType } from 'react-icons';

interface LinkItemProps {
  name: string;
  icon: IconType;
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome },
  { name: 'Trending', icon: FiTrendingUp },
  { name: 'Explore', icon: FiCompass },
  { name: 'Favourites', icon: FiStar },
  { name: 'Settings', icon: FiSettings },
];

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

function SidebarContent({ onClose, ...rest }: SidebarProps) {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
    </Box>
  );
}

export default function SideBar(props: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userInput, setValue] = React.useState<any>();
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      {/* <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} /> */}
      <Box ml={{ base: 0, md: 60 }} p="0">
        {props.children}
      </Box>
      <Stack direction="row" m={6} spacing={4}>
        <Box p={0}>Throughput (Blocks/sec):</Box>
      </Stack>
      <Stack direction="row" m={6} spacing={4}>
        <Box w={200} borderWidth={5} borderColor="teal" p={5}>
          {props.throughput}
        </Box>
      </Stack>
      <Stack direction="row" m={6} spacing={4}>
        <Box h="65vh"> </Box>
        {/* <Box mt={800}> </Box> */}
      </Stack>
      <Stack direction="row" m={6} spacing={4}>
        <NumberInput
          size="sm"
          defaultValue={0}
          min={0}
          max={1000}
          onChange={(s, e) => setValue(e)}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Stack>
      {/* <Stack direction="row" m={6} spacing={4}>
        <Button onClick={() => props.hostView()}> Host View </Button>
      </Stack> */}
      <Stack direction="row" m={6} spacing={4}>
        <Button onClick={() => props.stepView(userInput)}> Simulate Blocks </Button>
      </Stack>
      <Stack direction="row" m={6} spacing={4}>
        <Button onClick={() => props.stepTime(userInput)}> Simulate seconds </Button>
      </Stack>
    </Box>
  );
}
