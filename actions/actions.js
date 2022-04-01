import fetch from "node-fetch";

// All Pokemons

export const fetchAllPokemons = async () => {
  const peticion = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=1200`);
  const allPokemons = await peticion.json();
  const data = await Promise.all(
    allPokemons.results.map(async (pokemon) => {
      const url = await fetch(pokemon.url);
      const dataPokemon = await url.json();
      return await {
        name: dataPokemon.name,
        id: dataPokemon.id,
        types: dataPokemon.types,
        forms: dataPokemon.forms,
        order: dataPokemon.order,
        img: dataPokemon.sprites.front_default,
      };
    })
  );
  return data;
};

let allPokemons = [];
fetchAllPokemons()
  .then((response) => (allPokemons = response))
  .finally(() => {
    console.log("allPokemons load");
  });

export const pokemonByName = async (req, res) => {
  const namedPokemon = req.params.pokemon;
  res.send(
    allPokemons.filter(
      (pokemon) =>
        pokemon.name.startsWith(namedPokemon) && !pokemon.name.includes("-")
    )
  );
};

export const pokemonByPage = async (req, res) => {
  const offset = req.params.page * 3;
  res.send(allPokemons.slice(offset, offset + 3));
};
