import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import dataPlanets from './mocks/dataPlanetsMock';
import App from '../App';

beforeEach(() => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(dataPlanets),
  });
});

afterEach(() => {
 jest.resetAllMocks();
});

test('se a tabela é preenchida com os dados da API', async () => {
  render(<App />);
  const loading = screen.getByText("loading...");
  expect(loading).toBeInTheDocument();
  await waitForElementToBeRemoved(loading);
  expect(loading).not.toBeInTheDocument();
  const planetsNames = screen.getAllByTestId("planet-name");
  // const planetsNames = screen.getAllByRole("cell");
  expect(planetsNames).toHaveLength(10);
});
