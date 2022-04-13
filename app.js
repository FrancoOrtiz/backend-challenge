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
      description: "A sample API",
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
 *      description: Get a Pokemon by name
 *      responses:
 *        200:
 *          description: Sucess
 */
app.get("/api/pokemons/:page", pokemonByPage);

export default app;
