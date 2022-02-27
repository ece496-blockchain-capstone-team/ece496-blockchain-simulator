import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import Home from '../Home';

test('home is rendered', () => {
  render(
    <Router>
      <Home />
    </Router>
  );
  const simSettingsElement = screen.getByText(/Simulation Settings/i);
  const metricsElement = screen.getByText(/Metrics Dashboard/i);
  expect(simSettingsElement).toBeInTheDocument();
  expect(metricsElement).toBeInTheDocument();
});
