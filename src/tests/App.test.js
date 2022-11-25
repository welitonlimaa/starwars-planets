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

  const planetsNames = screen.getAllByTestId("planet-name");

  const inputValue = screen.getByTestId('value-filter');
  const buttonFilter = screen.getAllByRole('button')[0];
  
  userEvent.clear(inputValue);
  userEvent.type(inputValue, '1000');

  const namePlanet = screen.getByText('Yavin IV');

  userEvent.click(buttonFilter);

  expect(namePlanet).not.toBeInTheDocument;

  const buttonX = screen.getByRole('button', {name: 'X'});
  userEvent.click(buttonX);
  expect(namePlanet).toBeInTheDocument();
});

test('se é possivel filtrar os planetas por coluna e por nome', async () => {
  render(
    <FilterProvider>
      <App />
    </FilterProvider>
  );
  const loading = screen.getByText("loading...");
  await waitForElementToBeRemoved(loading);

  const inputValue = screen.getByTestId('value-filter');
  const buttonFilter = screen.getAllByRole('button')[0];

  const inputName = screen.getByRole('textbox');
  userEvent.type(inputName, 't');
  
  const comparison = screen.getAllByRole('combobox')[1];
  userEvent.selectOptions(comparison, 'menor que');

  userEvent.clear(inputValue);
  userEvent.type(inputValue, '300000');

  userEvent.click(buttonFilter);
  const planetsNames = screen.getAllByTestId("planet-name");

  expect(planetsNames).toHaveLength(1);

  userEvent.selectOptions(comparison, 'igual a');

  userEvent.clear(inputValue);
  userEvent.type(inputValue, '300');

  const namePlanet = screen.getByText('Tatooine');

  userEvent.click(buttonFilter);

  expect(namePlanet).not.toBeInTheDocument;

  const deleteAllFilters = screen.getByTestId('button-remove-filters');
  userEvent.click(deleteAllFilters);

  const dataPlanets = screen.getAllByTestId("planet-name");

  expect(dataPlanets).toHaveLength(3);
});

test('se é possivel order a data por coluna em ordem ascendente ou descendente', async () => {
  render(
    <FilterProvider>
      <App />
    </FilterProvider>
  );
  const loading = screen.getByText("loading...");
  await waitForElementToBeRemoved(loading);

  const orderAsc = screen.getByLabelText('Ascendente')
  userEvent.click(orderAsc);

  const buttonOrder = screen.getAllByRole('button')[1];
  userEvent.click(buttonOrder);

  const planetsNames = screen.getAllByTestId("planet-name");
  expect(planetsNames[0]).toHaveTextContent('Yavin IV');

  const orderDesc = screen.getByLabelText('Descendente')
  userEvent.click(orderDesc);

  userEvent.click(buttonOrder);

  expect(planetsNames[0]).toHaveTextContent('Coruscant');

  const orderColumn = screen.getByTestId('column-sort');
  userEvent.selectOptions(orderColumn, 'orbital_period');

  userEvent.click(buttonOrder);

  expect(planetsNames[0]).toHaveTextContent('Bespin');
});
