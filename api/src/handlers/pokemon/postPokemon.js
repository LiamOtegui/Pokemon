const { createPokemon } = require("../../controllers/pokemon/createPokemon");

const postPokemon = async (req, res) => {
    const { name, img, hp, atk, def, spatk, spdef, speed, weight, height, type, subType } = req.body;
  // console.log(req.body, 'REQ BODY');
  try {
    const result = await createPokemon(name, img, hp, atk, def, spatk, spdef, speed, weight, height, type, subType);
    // const result = await createPokemon(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
};

module.exports = { postPokemon };