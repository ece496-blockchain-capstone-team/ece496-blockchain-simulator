import React from 'react';
import { Provider } from 'react-redux';

import { render, screen } from '@testing-library/react';

import { store } from '../../store';

import Network from './Network';

test('renders test paragraph for network view', () => {
  render(
    <Provider store={store}>
      <Network />
    </Provider>
  );

  const element = screen.getByText(/network view/i);
  expect(element).toBeInTheDocument();
});
