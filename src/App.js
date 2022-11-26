import { useContext } from 'react';
import { FilterContext } from './context/FilterContext';
import Filters from './components/Filters';
import Table from './components/Table';
import './App.css';
import grafismo from './images/grafismo.png';

function App() {
  const { dataPlanets, isLoading } = useContext(FilterContext);
  if (isLoading || dataPlanets === undefined) {
    return <h1>loading...</h1>;
  }
  return (
    <main className="app-body">
      <img src={ grafismo } alt="grafismo" id="img-grafismo" />
      <div className="container-main">
        <Filters />
        <Table />
      </div>
    </main>
  );
}

export default App;
