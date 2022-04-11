import express from "express";
import cors from "cors";
import { pokemonByPage, pokemonByName } from "./actions/actions.js";

const app = express();

app.use(cors());

app.listen(3002, () => {
  console.log("server running on port", 3002);
});

// Search by Name

app.get("/api/:pokemon", pokemonByName);

// Pokemons to show

app.get("/api/pokemons/:page", pokemonByPage);

export default app;
