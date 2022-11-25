import RenderComponents from './renderComponents';
import { FilterProvider } from './context/FilterContext';
import './App.css';

function App() {
  // const { dataPlanets, isLoading } = useContext(FilterContext);
  // if (isLoading || dataPlanets === undefined) {
  //   return <h1>loading...</h1>;
  // }
  return (
    <FilterProvider>
      <RenderComponents />
    </FilterProvider>
    // <>
    //   <Filters />
    //   <Table />
    // </>
  );
}

export default App;
