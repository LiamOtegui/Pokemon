const { Type } = require("../../db");

const createType = async (typeArray) => {
  const types = await typeArray.map(async (type) => {
    const result = await Type.findOrCreate({ where: { name: type } });
    return result;
  });
  return typeArray;
};

module.exports = { createType };
