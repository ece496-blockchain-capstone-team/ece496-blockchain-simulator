import React from 'react';
import { render, screen } from '@testing-library/react';
import Host from './Host';

test('renders test paragraph for host view', () => {
  render(<Host />);
  const element = screen.getByText(/host view/i);
  expect(element).toBeInTheDocument();
});
