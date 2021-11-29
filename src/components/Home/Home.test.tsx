import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';

test('renders test paragraph for homepage', () => {
  render(<Home />);
  const element = screen.getByText(/This is a test paragraph/i);
  expect(element).toBeInTheDocument();
});
