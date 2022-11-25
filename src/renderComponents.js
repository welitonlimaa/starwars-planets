import { useContext } from 'react';
import { FilterContext } from './context/FilterContext';
import Filters from './components/Filters';
import Table from './components/Table';

function RenderComponents() {
  const { dataPlanets, isLoading } = useContext(FilterContext);
  if (isLoading || dataPlanets === undefined) {
    return <h1>loading...</h1>;
  }
  return (
    <>
      <Filters />
      <Table />
    </>
  );
}

export default RenderComponents;
