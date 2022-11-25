import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
  await waitForElementToBeRemoved(loading);

  const planetsNames = screen.getAllByTestId("planet-name");
  // const planetsNames = screen.getAllByRole("cell");
  expect(planetsNames).toHaveLength(10);
});

const TEST_NAME = 'Tatooine';

test('se é possível pesquisar por nome do planeta', async () => {
  render(
    <FilterProvider>
      <App />
    </FilterProvider>
  );
  const loading = screen.getByText("loading...");
  await waitForElementToBeRemoved(loading);

  const inputName = screen.getByRole('textbox');
  userEvent.type(inputName, TEST_NAME);

  const planetsNames = screen.getAllByTestId("planet-name");
  expect(planetsNames).toHaveLength(1);
});

test('se é possivel filtrar os planetas por coluna', async () => {
  render(
    <FilterProvider>
      <App />
    </FilterProvider>
  );
  const loading = screen.getByText("loading...");
  await waitForElementToBeRemoved(loading);

  const inputValue = screen.getByTestId('value-filter');
  const buttonFilter = screen.getAllByRole('button')[0];
  
  userEvent.clear(inputValue);
  userEvent.type(inputValue, '1000');
  console.log(inputValue)
  const namePlanet = screen.getByText('Yavin IV');

  userEvent.click(buttonFilter);

  expect(namePlanet).not.toBeInTheDocument;
  // const column = screen.getAllByRole('combobox')[0];
  // console.log(column);
  // userEvent.type(inputName, TEST_NAME);

  // const planetsNames = screen.getAllByTestId("planet-name");
  // expect(planetsNames).toHaveLength(1);
});
