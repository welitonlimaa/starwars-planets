import { useContext, useState, useEffect } from 'react';
import { FilterContext } from '../context/FilterContext';

const columOptionsInit = ['population', 'orbital_period', 'diameter',
  'rotation_period', 'surface_water'];
const comparisonOptions = ['maior que', 'menor que', 'igual a'];

function Filters() {
  const [columOptions, setColumOptions] = useState(columOptionsInit);
  const { data, setDataPlanets } = useContext(FilterContext);
  const [nameSearch, setNameSearch] = useState('');
  const [columFilter, setColumFilter] = useState(columOptions[0]);
  const [comparisonFilter, setComparisonFilter] = useState(comparisonOptions[0]);
  const [valueFilter, setValueFilter] = useState('0');
  const [filters, setFilter] = useState([]);

  const insertFilter = () => {
    const newFilter = {
      colum: columFilter,
      comparison: comparisonFilter,
      value: valueFilter,
    };
    setFilter((prevState) => ([...prevState, newFilter]));

    const newColumOptions = columOptions.filter((colum) => colum !== columFilter);
    setColumOptions(newColumOptions);
    setColumFilter(newColumOptions[0]);
  };

  const searchPlanets = data.filter((planet) => {
    const statusName = planet.name.toLowerCase().includes(nameSearch.toLowerCase());
    if (filters.length > 0) {
      const statusFilter = filters.every((filtered) => {
        switch (filtered.comparison) {
        case comparisonOptions[0]:
          return Number(planet[filtered.colum]) > Number(filtered.value);
        case comparisonOptions[1]:
          return Number(planet[filtered.colum]) < Number(filtered.value);
        case comparisonOptions[2]:
          return Number(planet[filtered.colum]) === Number(filtered.value);
        default:
          return false;
        }
      });
      return (statusName && statusFilter);
    }
    return statusName;
  });

  const deleteFilter = (colum, allFilters) => {
    if (allFilters) {
      setFilter([]);
      setColumOptions(columOptionsInit);
    } else {
      const newFilters = filters.filter((filtered) => filtered.colum !== colum);
      const newColumOptions = columOptionsInit.filter((option) => {
        const statusColum = newFilters
          .some((filterColum) => filterColum.colum === option);
        return !statusColum;
      });
      setFilter(newFilters);
      setColumOptions(newColumOptions);
      console.log(newFilters, newColumOptions);
    }
  };

  useEffect(() => setDataPlanets(searchPlanets), [nameSearch, filters]);

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
          onClick={ () => insertFilter() }
        >
          FILTRAR
        </button>
      </div>
      <div>
        {filters.map((filtered, index) => (
          <div
            key={ index }
            data-testid="filter"
          >
            <span>{filtered.colum}</span>
            {' '}
            <span>{filtered.comparison}</span>
            {' '}
            <span>{filtered.value}</span>
            <button
              type="button"
              onClick={ () => deleteFilter(filtered.colum, false) }
            >
              X
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ () => deleteFilter('', true) }
      >
        REMOVER FILTROS
      </button>
    </div>
  );
}

export default Filters;
