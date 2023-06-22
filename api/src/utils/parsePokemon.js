const parsePokemon = (pokemonData, source) => {
  return {
    id: pokemonData.id,
    name: pokemonData.name[0].toUpperCase() + pokemonData.name.slice(1).toLowerCase(),  // si pongo solamente pokemonData.name, el thunder me devuelve "CHARMANDERharmander", entonces le digo que tome la primer letra y la vuelva mayuscula y las demas que las vuelva minusculas, quedando asi "Charmander"
    img: pokemonData.sprites.other.home["front_default"],
    stats: pokemonData.stats.reduce((obj, stat) => { // obj es el acumulador y stat es cada stat del pokemon (hp, atk, etc).
      obj[stat.stat.name.replace("-", "_")] = stat.base_stat;
      return obj;
    }, {}), // hp: pokemonData.stats[0].base_stat, atk: pokemonData.stats[1].base_stat, def: pokemonData.stats[2].base_stat, spatk: pokemonData.stats[5].base_stat,
    types: pokemonData.types.map((type) => type.type.name),
    weight: pokemonData.weight,
    height: pokemonData.height,
    source,
  };
};

const parsePokemonDb = (pokemonDb) => {
  return pokemonDb.map((pokeDb) => {
    const { hp, atk, def, spatk, spdef, speed } = pokeDb.dataValues;
    const result = {
      ...pokeDb.dataValues,
      types: pokeDb.Types.map((type) => type.name),
      stats: {
          'hp': hp,
          'attack': atk,
          'defense': def,
          'special_attack': spatk,
          'special_defense': spdef,
          'speed': speed,
        }
    };
    return result;
  });
};

// const parsePokemonDb = (pokemonDb) => {
//   return pokemonDb.map((pokeDb) => {
//     const { hp, atk, def, spatk, spdef, speed } = pokeDb.dataValues;
//     const result = {
//       ...pokeDb.dataValues,
//       types: pokeDb.Types.map((type) => type.name),
//       hp: hp,
//       attack: atk,
//       defense: def,
//       special_attack: spatk,
//       special_defense: spdef,
//       speed: speed
//       }
//     return result;
//   });
// };

module.exports = { parsePokemon, parsePokemonDb };
