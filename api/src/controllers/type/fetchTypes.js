const axios = require("axios");
const parseTypes = require("../../utils/parseTypes");
const { createType } = require("./createType");

const BASE_URL = "https://pokeapi.co/api/v2";

const fetchTypes = async () => {
  const url = `${BASE_URL}/type`;

  const data = (await axios(url)).data;
  const types = await Promise.all(data.results);
  const parsedTypes = await parseTypes(types);
  const result = await createType(parsedTypes);

  return result;
};

module.exports = { fetchTypes };
