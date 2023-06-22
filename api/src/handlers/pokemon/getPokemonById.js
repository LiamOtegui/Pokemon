const { fetchPokemonById } = require("../../controllers/pokemon/fetchPokemonById");

const getPokemonById = async (req, res) => {
    const { id } = req.params;
    const source = isNaN(id) ? "db" : "api";
    try {
      const result = await fetchPokemonById(id, source);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  module.exports = { getPokemonById };