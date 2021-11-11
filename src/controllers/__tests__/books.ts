import request from "supertest";
import { Express } from "express-serve-static-core";

import { createServer } from "../../server";

let server: Express;

beforeAll(async () => {
  server = await createServer();
});

describe("GET /", () => {
  it("deve retornar status 200 e uma resposta valida se nao houver nenhum parametro", (done) => {
    request(server)
      .get(`/`)
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toMatchObject({ message: "Oi! Uma API aqui" });
        done();
      });
  });
});

/* describe("GET /char/povCharacters", () => {
  it("deve retornar status 200 e uma resposta valida se nao houver nenhum parametro", async (done) => {
    request(server)
      .get(`/char/povCharacters`)
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toMatchObject({ message: "Hello, stranger!" });
        done();
      });
  });
});
 */
