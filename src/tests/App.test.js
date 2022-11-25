import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { FilterProvider } from '../context/FilterContext';
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
  render(
    <FilterProvider>
      <App />
    </FilterProvider>
  );
  const loading = screen.getByText("loading...");
  expect(loading).toBeInTheDocument();
  await waitForElementToBeRemoved(loading);

  const planetsNames = screen.getAllByTestId("planet-name");
  // const planetsNames = screen.getAllByRole("cell");
  expect(planetsNames).toHaveLength(10);
});
