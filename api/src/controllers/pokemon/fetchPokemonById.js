const { Pokemon } = require("../../db");
const { Type } = require("../../db");
const { fetchPokemon } = require("./fetchPokemon");

const fetchPokemonById = async (id, source) => {
  let pokemon;
  if (source === "api") {
    pokemon = await fetchPokemon(id, "api");
  } else {
    pokemon = await Pokemon.findByPk(id, { include: Type });
  }
  return pokemon;
};

module.exports = { fetchPokemonById };
