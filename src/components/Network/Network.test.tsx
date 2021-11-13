import React from 'react';
import { render, screen } from '@testing-library/react';
import Network from './Network';

test('renders test paragraph for network view', () => {
  render(<Network />);
  const element = screen.getByText(/network view/i);
  expect(element).toBeInTheDocument();
});
