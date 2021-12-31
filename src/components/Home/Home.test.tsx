import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../Home';

test('home is rendered', () => {
  render(<Home />);
  const element = screen.getByText(/Simulation Settings/i);
  expect(element).toBeInTheDocument();
});
