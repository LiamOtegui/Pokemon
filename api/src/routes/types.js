const { Router } = require("express");
const { getTypes } = require("../handlers/type/getTypes");

const typeRouter = Router();

// GET PATH:
typeRouter.get("/", getTypes);

module.exports = typeRouter;
