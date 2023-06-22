import {
  GET_POKEMONS,
  GET_POKEMON,
  GET_TYPES,
  // CLEAR_POKEMON,
  GET_DETAIL,
  CLEAR_DETAIL,
  CREATE_POKEMON,
  SET_FILTER,
  CLEAR_FILTER,
  SORT_POKEMON,
} from "./actionTypes";

const initialState = { // El initialState es el ESTADO GLOBAL.
  pokemons: [],
  filteredPokemons: [],
  types: [],
  detail: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMONS: // Este es el type que recibe desde la action.
      return { ...state, pokemons: [...action.payload], filteredPokemons: [...action.payload] }; // Aca retorna un NUEVO ESTADO: con una copia del estado anterior con todas sus propiedades pero con la informacion de la propiedad (pokemons en este caso) modificada (lo puedo ver en la consola de redux dev tools).

    case GET_POKEMON:
      return { ...state, pokemons: [...action.payload] };

    case GET_TYPES:
      return { ...state, types: [...action.payload] };

    case SET_FILTER:
      return { ...state, filteredPokemons: [...action.payload] };

    case CLEAR_FILTER:
      return { ...state, filteredPokemons: [...state.pokemons] };

    case SORT_POKEMON:
      return { ...state, filteredPokemons: [...action.payload] };

    // case CLEAR_POKEMON:
    //   return { ...state, pokemons: [] };

    case GET_DETAIL:
      return { ...state, detail: action.payload };

    case CLEAR_DETAIL:
      return { ...state, detail: {} };

    case CREATE_POKEMON:
      return { ...state };

    default:
      return { ...state };
  }
};
