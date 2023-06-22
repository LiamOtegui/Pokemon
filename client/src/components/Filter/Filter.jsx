import { useDispatch, useSelector } from "react-redux";
import { toTitleCase } from "../../utils/helpers";
import { sortPokemons, filterPokemons, clearFilter } from "../../redux/actions";
import style from './Filter.module.css'

const Filter = () => {
  const dispatch = useDispatch();
  const filteredPokemons = useSelector((state) => state.filteredPokemons);
  const types = useSelector((state) => state.types);

  const sortPokemonHandler = (stat) => {
    if (stat === "name") {
      const sortedPokemon = [...filteredPokemons].sort((pokeA, pokeB) =>
        pokeA.name.localeCompare(pokeB.name)
      );
      dispatch(sortPokemons(sortedPokemon));
    } else {
      const sortedPokemon = filteredPokemons.sort(
        (pokeA, pokeB) => pokeB.stats[stat] - pokeA.stats[stat]
      );
      dispatch(sortPokemons(sortedPokemon));
    }
  };

  const filterHandler = (value) => {
    const newFilter = filteredPokemons.filter((poke) => {
      return poke.types.includes(value);
    });
    dispatch(filterPokemons(newFilter));
  };

  const filterSourceHandler = (value) => {
    if (value === 'All') return dispatch(clearFilter());    // si el valor es All despacho clearFilter y retorno todos los pokemons
    const newFilter = filteredPokemons.filter((poke) => {
      return poke.source === value;                         // retorno el pokemon que tenga en su propiedad source un valor igual al que le doy por parametro en la funcion
    });
    dispatch(filterPokemons(newFilter));                    // si no se cumple el primer if, despacho los pokemons filtrados.
  };

  const clearFilterHandler = () => {
    dispatch(clearFilter());
  };

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <select onChange={(event) => sortPokemonHandler(event.target.value)} className={style.select}>
          <option value="name" className={style.option}>By name</option>
          <option value="hp" className={style.option}>Health</option>
          <option value="attack" className={style.option}>Attack</option>
          <option value="defense" className={style.option}>Defense</option>
          <option value="special_attack" className={style.option}>Special attack</option>
          <option value="special_defense" className={style.option}>Special defense</option>
          <option value="speed" className={style.option}>Speed</option>
        </select>

        <select onChange={(event) => filterHandler(event.target.value)}>
          {types &&
            types.map((type) => (
              <option key={type} value={type}>
                {toTitleCase(type)}
              </option>
            ))}
        </select>

        <select onChange={(event) => filterSourceHandler(event.target.value)}>
          <option value="All">All</option>
          <option value="api">Api</option>
          <option value="bd">DB</option>
        </select>

        <button onClick={() => clearFilterHandler()}> CLEAR FILTER </button>
      </div>
    </div>
  );
};

export default Filter;
