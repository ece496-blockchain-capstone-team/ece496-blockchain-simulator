import React from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Network from './components/Network';

export default function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/network" element={ <Network/> } />
      </Routes>
    </ChakraProvider>
  );
}
