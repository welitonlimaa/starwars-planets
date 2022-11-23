import { useContext } from 'react';
import { FilterContext } from '../context/FilterContext';

function Table() {
  const { dataPlanets } = useContext(FilterContext);

  const planets = (dataPlanets.map((planet, index) => {
    const {
      climate,
      created,
      diameter,
      edited,
      films,
      gravity,
      name,
      orbital_period: orbitalPeriod,
      population,
      rotation_period: rotationPeriod,
      surface_water: surfaceWater,
      terrain,
      url,
    } = planet;
    return (
      <tr key={ index }>
        <td data-testid="planet-name">{name}</td>
        <td>{rotationPeriod}</td>
        <td>{orbitalPeriod}</td>
        <td>{diameter}</td>
        <td>{climate}</td>
        <td>{gravity}</td>
        <td>{terrain}</td>
        <td>{surfaceWater}</td>
        <td>{population}</td>
        <td>
          {films.map((film, indexFilm) => <p key={ indexFilm }>{film}</p>)}
        </td>
        <td>{created}</td>
        <td>{edited}</td>
        <td>{url}</td>
      </tr>
    );
  }));

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>Url</th>
        </tr>
      </thead>
      <tbody>
        {planets}
      </tbody>
    </table>
  );
}

export default Table;
