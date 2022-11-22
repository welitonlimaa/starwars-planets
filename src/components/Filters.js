import { useContext, useState, useEffect } from 'react';
import { FilterContext } from '../context/FilterContext';

function Filters() {
  const { data, setDataPlanets } = useContext(FilterContext);
  const [nameSearch, setNameSearch] = useState('');

  const searchPlanets = data.filter((planet) => planet.name.toLowerCase()
    .includes(nameSearch.toLowerCase()));

  useEffect(() => setDataPlanets(searchPlanets), [nameSearch]);

  return (
    <label htmlFor="name-filter">
      <input
        id="name-filter"
        data-testid="name-filter"
        onChange={ (e) => setNameSearch(e.target.value) }
      />
    </label>
  );
}

export default Filters;
