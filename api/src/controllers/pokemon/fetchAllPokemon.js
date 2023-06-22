const { Pokemon } = require("../../db");
const { Type } = require("../../db");
const axios = require("axios");
const { parsePokemonDb } = require('../../utils/parsePokemon')
const { fetchPokemon } = require('./fetchPokemon')

const BASE_URL = "https://pokeapi.co/api/v2";
const START = 0; // 0
const LIMIT = 151; // 151


const fetchAllPokemon = async () => {
    const url = `${BASE_URL}/pokemon?offset=${START}&limit=${LIMIT}`;
    const fetchPokeUrls = (await axios(url)).data.results;
    const pokemonFromApi = await Promise.all(fetchPokeUrls.map((poke) => fetchPokemon(poke.name))); // Promise.all se utiliza para ejecutar varias promesas de forma concurrente y esperar a que todas se resuelvan o se rechacen antes de continuar. Promise.all crea una nueva promesa que se resolverá cuando todas las promesas generadas por fetchPokemon se resuelvan. 
    const pokemonFromDb = await Pokemon.findAll({
      include: [{ model: Type }],
    });
  
    const parsedPokemonDb = parsePokemonDb(pokemonFromDb);
  
    const pokemons = [...parsedPokemonDb, ...pokemonFromApi];
    return pokemons;
  };

module.exports = { fetchAllPokemon }