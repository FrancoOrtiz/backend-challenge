import express from "express";
import cors from "cors";
import { pokemonByPage, pokemonByName } from "./actions/actions.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

const app = express();

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Pokemon API",
      version: "1.0.0",
      description: "The API allows the search and filtering of Pokemons",
    },
  },
  apis: ["app.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(cors());

app.listen(3002, () => {
  console.log("server running on port", 3002);
});

// Search by Name
/**
 * @swagger
 * /api/{pokemon}:
 *    get:
 *      description: Get a Pokemon by name
 *      parameters:
 *      - in: path
 *        name: pokemon
 *        schema:
 *          type: string
 *        required: true
 *        description: Name of the Pokemon to get
 *      responses:
 *        200:
 *          description: Sucess
 */
app.get("/api/:pokemon", pokemonByName);

// Pokemons to show
/**
 * @swagger
 * /api/pokemons/{page}:
 *    get:
 *      description: Get Pokemons to show
 *      parameters:
 *      - in: path
 *        name: page
 *        schema:
 *          type: integer
 *        required: true
 *        description: Number of Page to get Pokemons
 *      responses:
 *        200:
 *          description: Sucess
 */
app.get("/api/pokemons/:page", pokemonByPage);

export default app;
