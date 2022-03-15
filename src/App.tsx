import React from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import SideBar from './components/SideBar';

import Home from './components/Home';
import Network from './components/Network';
import Host from './components/Host';
import Chain from './components/Chain';
import Block from './components/Block';
import SimulationSettings from './components/SimulationSettings';
import Metrics from './components/Metrics';

export default function App() {
  return (
    <ChakraProvider>
      <NavBar />
      <SideBar>
        <div className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/network" element={<Network />} />
            <Route path="/host" element={<Host />} />
            <Route path="/chain" element={<Chain />} />
            <Route path="/block" element={<Block />} />
            <Route path="/simulation-settings" element={<SimulationSettings />} />
            <Route path="/metrics" element={<Metrics />} />
          </Routes>
        </div>
      </SideBar>
    </ChakraProvider>
  );
}
