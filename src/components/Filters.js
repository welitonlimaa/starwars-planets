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

  const [objSort, setObjSort] = useState({ column: 'population', sort: 'ASC' });

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
    }
  };

  const renderByOrder = () => {
    const orderAsc = (a, b) => {
      const x = Number(a[objSort.column]);
      const y = Number(b[objSort.column]);
      return x - y;
    };

    const orderDesc = (a, b) => {
      const x = Number(a[objSort.column]);
      const y = Number(b[objSort.column]);
      return y - x;
    };

    const onlyNumberData = searchPlanets
      .filter((planet) => planet[objSort.column] !== 'unknown');

    const onlyStringData = searchPlanets
      .filter((planet) => planet[objSort.column] === 'unknown');

    let dataOrder = [];
    if (objSort.sort === 'ASC') {
      dataOrder = onlyNumberData.sort(orderAsc);
    } else {
      dataOrder = onlyNumberData.sort(orderDesc);
    }

    const newDataPlanets = [...dataOrder, ...onlyStringData];
    setDataPlanets(newDataPlanets);
  };

  useEffect(() => setDataPlanets(searchPlanets), [nameSearch, filters]);

  return (
    <div className="container-filters">
      <label htmlFor="name-filter">
        <input
          id="name-filter"
          data-testid="name-filter"
          onChange={ (e) => setNameSearch(e.target.value) }
        />
      </label>
      <div className="container-select-filter">
        <label htmlFor="column-filter">
          Coluna
          <br />
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
          <br />
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
          name="FILTRAR"
        >
          FILTRAR
        </button>

        <label htmlFor="column-sort">
          Ordenar
          <br />
          <select
            data-testid="column-sort"
            id="column-sort"
            onChange={ (e) => setObjSort((prevState) => (
              { ...prevState, column: e.target.value })) }
            defaultValue={ objSort.column }
          >
            {
              columOptionsInit.map((option, index) => (
                <option key={ index }>{ option }</option>
              ))
            }
          </select>
        </label>
        <div>
          <label htmlFor="column-sort-input-asc">
            <input
              type="radio"
              id="column-sort-input-asc"
              data-testid="column-sort-input-asc"
              name="SORT"
              value="ASC"
              onChange={ (e) => setObjSort((prevState) => (
                { ...prevState, sort: e.target.value })) }
            />
            Ascendente
          </label>
          <br />
          <label htmlFor="column-sort-input-desc">
            <input
              type="radio"
              id="column-sort-input-desc"
              data-testid="column-sort-input-desc"
              name="SORT"
              value="DESC"
              onChange={ (e) => setObjSort((prevState) => (
                { ...prevState, sort: e.target.value })) }
            />
            Descendente
          </label>
        </div>
        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ () => renderByOrder() }
        >
          ORDENAR
        </button>
      </div>

      <div className={ filters.length === 0 ? 'none-view' : 'alo' }>
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
              name="X"
            >
              X
            </button>
          </div>
        ))}
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ () => deleteFilter('', true) }
        >
          REMOVER FILTROS
        </button>
      </div>
    </div>
  );
}

export default Filters;
