import React from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar';

import Home from './components/Home';
import Network from './components/Network';
import Host from './components/Host';
import Block from './components/Block';

export default function App() {
  return (
    <ChakraProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/network" element={<Network />} />
        <Route path="/host" element={<Host />} />
        <Route path="/block" element={<Block />} />
      </Routes>
    </ChakraProvider>
  );
}
