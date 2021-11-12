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

describe("GET /books/cover", () => {
  it("deve retornar status 400 e resposta de entrada invalida se nao houver id de livro na query", (done) => {
    request(server)
      .get("/books/cover")
      .expect("Content-Type", /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toMatchObject({ error: "entrada invalida" });
        done();
      });
  });

  it("deve retornar status 404 e resposta de capa nao encontrada se id de livro nao estiver no banco de dados", (done) => {
    request(server)
      .get("/books/cover?id=14")
      .expect("Content-Type", /json/)
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toMatchObject({ message: "Capa nao encontrada" });
        done();
      });
  });
});
