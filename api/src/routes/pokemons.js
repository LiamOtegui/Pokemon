const { Router } = require("express");
const { getPokemon } = require('../handlers/pokemon/getPokemon');
const { getPokemonById } = require('../handlers/pokemon/getPokemonById');
const { postPokemon } = require('../handlers/pokemon/postPokemon');

const pokemonRouter = Router();

// PATH GET:
pokemonRouter.get("/", getPokemon); // No va un /name porque puede traer a todos o porque el controller verifica si hay name o no.
pokemonRouter.get("/:id", getPokemonById);

// PATH POST:
pokemonRouter.post("/", postPokemon);

module.exports = pokemonRouter;
