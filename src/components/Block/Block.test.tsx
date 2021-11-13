import React from 'react';
import { render, screen } from '@testing-library/react';
import Block from './Block';

test('renders test paragraph for block view', () => {
  render(<Block />);
  const element = screen.getByText(/block view/i);
  expect(element).toBeInTheDocument();
});
