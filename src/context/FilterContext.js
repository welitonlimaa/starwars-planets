import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';

export const FilterContext = createContext();

export function FilterProvider({ children }) {
  const dataFetch = useFetch('https://swapi.dev/api/planets');
  const { isLoading, data } = dataFetch;
  const [dataPlanets, setDataPlanets] = useState([]);

  // const values = useMemo(() => ({
  //   isLoading,
  //   dataPlanets,
  //   setDataPlanets,
  // }), []);

  useEffect(() => setDataPlanets(data), [isLoading]);

  const values = {
    isLoading,
    data,
    dataPlanets,
    setDataPlanets,
  };

  return (
    <FilterContext.Provider value={ values }>
      {children}
    </FilterContext.Provider>
  );
}

FilterProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
