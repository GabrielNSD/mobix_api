import request from "supertest";
import { Express } from "express-serve-static-core";

import { createServer } from "../../server";
import supertest from "supertest";

let server: Express;

beforeAll(async () => {
  server = await createServer();
});

describe("GET /char", () => {
  it("deve retornar status 400 e uma resposta de entrada invalida se nao houver id de personagem na query", (done) => {
    request(server)
      .get("/char")
      .expect("Content-Type", /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toMatchObject({ error: "entrada invalida" });
        done();
      });
  });

  it("deve retornar status 200 e um json sobre Arya Stark", (done) => {
    request(server)
      .get("/char?id=148")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toMatchObject({
          characters: [
            [
              {
                _id: "618d61358115606e3919249a",
                url: "https://www.anapioficeandfire.com/api/characters/148",
                name: "Arya Stark",
                gender: "Female",
                culture: "Northmen",
                born: "In 289 AC, at Winterfell",
                died: "",
                titles: ["Princess"],
                aliases: [
                  "Arya Horseface",
                  "Arya Underfoot",
                  "Arry",
                  "Lumpyface",
                  "Lumpyhead",
                  "Stickboy",
                  "Weasel",
                  "Nymeria",
                  "Squan",
                  "Saltb",
                  "Cat of the Canaly",
                  "Bets",
                  "The Blind Girh",
                  "The Ugly Little Girl",
                  "Mercedenl",
                  "Mercye",
                ],
                father: "",
                mother: "",
                spouse: "",
                allegiances: [
                  "https://www.anapioficeandfire.com/api/houses/362",
                ],
                books: [],
                povBooks: [1, 2, 3, 5, 8],
                tvSeries: [
                  "Season 1",
                  "Season 2",
                  "Season 3",
                  "Season 4",
                  "Season 5",
                  "Season 6",
                ],
                playedBy: ["Maisie Williams"],
                id: 148,
              },
            ],
          ],
        });
        done();
      });
  });
});
