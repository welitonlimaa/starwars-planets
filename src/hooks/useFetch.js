import { useState, useEffect } from 'react';

function useFetch(url) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [errors, setErrors] = useState(null);

  const filterData = ({ results }) => {
    const dataPlanets = results.map((planet) => {
      delete planet.residents;
      return planet;
    });
    return dataPlanets;
  };

  const fetchAPI = async () => {
    try {
      const response = await fetch(url);
      const dataJson = await response.json();
      const dataPlanets = filterData(dataJson);
      setData(dataPlanets);
    } catch (error) {
      setErrors(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return { isLoading, data, errors };
}

export default useFetch;
