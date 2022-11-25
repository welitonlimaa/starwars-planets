import React from 'react';
import ReactDOM from 'react-dom/client';
// import { FilterProvider } from './context/FilterContext';
import App from './App';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    // <FilterProvider>
    <App />,
    // </FilterProvider>,
  );
