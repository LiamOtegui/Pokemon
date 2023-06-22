const { fetchTypes } = require('../../controllers/type/fetchTypes') 

const getTypes = async (req, res) => {
  try {
    const result = await fetchTypes()
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getTypes };
