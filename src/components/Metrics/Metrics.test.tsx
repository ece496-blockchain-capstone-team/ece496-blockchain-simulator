import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import MetricsView from './Metrics';
import { store } from '../../store';

test('renders test paragraph for metrics dashboard', () => {
  render(
    <Provider store={store}>
      <MetricsView />
    </Provider>
  );
  const element = screen.getByText(
    /View and download metrics related to the current configuration./i
  );
  expect(element).toBeInTheDocument();
});
