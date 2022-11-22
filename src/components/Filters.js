import { useContext, useState, useEffect } from 'react';
import { FilterContext } from '../context/FilterContext';

const columOptions = ['population', 'orbital_period', 'diameter',
  'rotation_period', 'surface_water'];
const comparisonOptions = ['maior que', 'menor que', 'igual a'];

function Filters() {
  const { data, setDataPlanets } = useContext(FilterContext);
  const [nameSearch, setNameSearch] = useState('');
  const [columFilter, setColumFilter] = useState(columOptions[0]);
  const [comparisonFilter, setComparisonFilter] = useState(comparisonOptions[0]);
  const [valueFilter, setValueFilter] = useState('0');

  const searchPlanets = data.filter((planet) => planet.name.toLowerCase()
    .includes(nameSearch.toLowerCase()));

  useEffect(() => setDataPlanets(searchPlanets), [nameSearch]);

  const filter = () => {
    const filteredPlanets = data.filter((planet) => {
      switch (comparisonFilter) {
      case comparisonOptions[0]:
        return Number(planet[columFilter]) > Number(valueFilter);
      case comparisonOptions[1]:
        return Number(planet[columFilter]) < Number(valueFilter);
      case comparisonOptions[2]:
        return Number(planet[columFilter]) === Number(valueFilter);
      default:
        return planet;
      }
    });
    setDataPlanets(filteredPlanets);
  };

  return (
    <div>
      <label htmlFor="name-filter">
        <input
          id="name-filter"
          data-testid="name-filter"
          onChange={ (e) => setNameSearch(e.target.value) }
        />
      </label>
      <div>
        <label htmlFor="column-filter">
          Coluna
          <select
            data-testid="column-filter"
            id="column-filter"
            onChange={ (e) => setColumFilter(e.target.value) }
            defaultValue={ columFilter }
          >
            {
              columOptions.map((option, index) => (
                <option key={ index }>{ option }</option>
              ))
            }
          </select>
        </label>
        <label htmlFor="comparison-filter">
          Operador
          <select
            data-testid="comparison-filter"
            id="comparison-filter"
            onChange={ (e) => setComparisonFilter(e.target.value) }
            defaultValue={ comparisonFilter }
          >
            {
              comparisonOptions.map((option, index) => (
                <option key={ index }>{ option }</option>
              ))
            }
          </select>
        </label>
        <label htmlFor="value-filter">
          <input
            id="value-filter"
            type="number"
            value={ valueFilter }
            data-testid="value-filter"
            onChange={ (e) => setValueFilter(e.target.value) }
          />
        </label>
        <button
          data-testid="button-filter"
          type="button"
          onClick={ () => filter() }
        >
          FILTRAR
        </button>
      </div>
    </div>
  );
}

export default Filters;
