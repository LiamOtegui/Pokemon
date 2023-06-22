const { Pokemon } = require("../../db");
const { Type } = require("../../db");
const axios = require("axios");
const { parsePokemon, parsePokemonDb } = require("../../utils/parsePokemon");

const BASE_URL = "https://pokeapi.co/api/v2";

const fetchPokemon = async (nameOrId) => { // Pongo nameOrId porque esta funcion la voy a usar en fetchPokemonById tambien.

  if (!nameOrId) {
    throw new Error("Nombre o ID inválidos.");
  }

  const pokemonDb = await Pokemon.findOne({
    where: { name: nameOrId.toLowerCase() },
    include: [{ model: Type }],
  });

  if (pokemonDb) {
    const parsedPokemonDb = parsePokemonDb([pokemonDb]);
    return parsedPokemonDb[0];
  }

  return axios
    .get(`${BASE_URL}/pokemon/${nameOrId.toLowerCase()}`)
    .then((pokemonData) => {
      const parsedPokemon = parsePokemon(pokemonData.data, "api");
      return parsedPokemon;
    });
};

module.exports = { fetchPokemon };