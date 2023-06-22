const { fetchAllPokemon } = require('../../controllers/pokemon/fetchAllPokemon')
const { fetchPokemon } = require("../../controllers/pokemon/fetchPokemon");

const getPokemon = async (req, res) => {
    const { name } = req.query;
    try {
      const result = name ? await fetchPokemon(name) : await fetchAllPokemon();
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  module.exports = { getPokemon };