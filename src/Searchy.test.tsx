import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Searchy from './pages/Searchy';
import { SearchyForm } from './pages/SerchyForm';

test('check text', () => {
  render(<SearchyForm />);
  const linkElement = screen.getByText(/Данные/i);
  expect(linkElement).toBeInTheDocument();
});

test('typing in Search', () => {
  render(<SearchyForm />);
  expect(screen.queryByDisplayValue(/Aliaksaner/)).not.toBeInTheDocument();
  userEvent.type(screen.getByRole('textbox'), 'Aliaksaner');
  expect(screen.queryByDisplayValue(/Aliaksaner/)).toBeInTheDocument();
});
