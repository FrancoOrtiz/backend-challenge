import app from "../app";
import request from "supertest";

describe("Tests on app.js", () => {
  /* Test search by name */
  test("should respond with a 200 status code", async () => {
    const response = await request(app).get("/api/:pokemon").send();
    expect(response.statusCode).toEqual(200);
  });

  test("should respond with an Array", async () => {
    const response = await request(app).get("/api/:pokemon").send();
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).not.toBeInstanceOf(String);
  });

  /* Test pokemon to show */
  test("should respond with a 200 status code", async () => {
    const response = await request(app).get("/api/pokemons/:page").send();
    expect(response.statusCode).toEqual(200);
  });

  test("should respond with an Array", async () => {
    const response = await request(app).get("/api/pokemons/:pages").send();
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).not.toBeInstanceOf(String);
  });
});
