/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { About } from './pages/AboutUs';
import { Cards } from './pages/Cards';

test('check text', () => {
  render(<About />);
  const linkElement = screen.getByText(/Здесь могла/i);
  expect(linkElement).toBeInTheDocument();
});

const localStorageMock = (function () {
  let store: any = {};

  return {
    getItem(key: any): any {
      return store[key];
    },

    setItem(key: string | number, value: any) {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    removeItem(key: string | number) {
      delete store[key];
    },

    getAll() {
      return store;
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

const setLocalStorage = (id: string, data: { data: string }) => {
  window.localStorage.setItem(id, JSON.stringify(data));
};

test('data is added into local storage', () => {
  const mockId = '1';
  const mockJson = { data: 'json data' };
  setLocalStorage(mockId, mockJson);
  expect(localStorage.getItem(mockId)).toEqual(JSON.stringify(mockJson));
});
