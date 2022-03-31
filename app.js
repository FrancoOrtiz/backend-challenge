import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();

app.use(cors());

app.listen(3002, () => {
    console.log('server running on port', 3002);
});

const fetchAllPokemons = async() => {
    const peticion = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=1200`)
    const allPokemons = await peticion.json();
    const data = await Promise.all(allPokemons.results.map(async(pokemon) => {
        const url = await fetch(pokemon.url)
        const dataPokemon = await url.json()
        return await {
            name: dataPokemon.name,
            id: dataPokemon.id,
            types: dataPokemon.types,
            forms: dataPokemon.forms,
            order: dataPokemon.order,
            img: dataPokemon.sprites.front_default,
        }
    }))
    return data;
}

let allPokemons = [];
fetchAllPokemons().then((response) => allPokemons = response).finally(() => {console.log('allPokemons log')});

app.get('/api/:pokemon', async(req, res) => {

    const pokemon = req.params.pokemon;
    
})

app.get('/api/pokemons/:page',(req, res) => {
    const offset = req.params.page * 3;
    res.send(allPokemons.slice(offset, offset + 3));
})