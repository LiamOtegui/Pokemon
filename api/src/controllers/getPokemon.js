const { Pokemon } = require('../models/Pokemon')

module.exports = async (req, res) => {
    try {
        const pokemons = await Pokemon.findAll();

        res.status(200).json(pokemons)
    } catch (error) {
        
    }
}