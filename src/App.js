import { useContext, useState } from 'react';
import { FilterContext } from './context/FilterContext';
import Filters from './components/Filters';
import Table from './components/Table';
import './App.css';
import './styleMobile.css';
import grafismo from './images/grafismo.png';
import Animation from './components/Animation';

function App() {
  const { dataPlanets, isLoading } = useContext(FilterContext);
  const [animationTime, setAnimationTime] = useState(true);
  const time = 3000;
  setTimeout(() => setAnimationTime(false), time);
  if ((isLoading || dataPlanets === undefined) || animationTime === true) {
    return (<Animation />);
  }
  return (
    <main className="app-body">
      <img src={ grafismo } alt="grafismo" id="img-grafismo" />
      <div className="container-main">
        <Filters />
        <div className="container-table">
          <Table />
        </div>
      </div>
    </main>
  );
}

export default App;
