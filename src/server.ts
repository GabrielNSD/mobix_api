import "dotenv/config";
import express from "express";
import * as books from "./controllers/books";
import * as character from "./controllers/characters";

import { Express } from "express-serve-static-core";

export async function createServer(): Promise<Express> {
  const server = express();

  server.get("/", (req, res) => {
    res.status(200).json({ message: "Oi! Uma API aqui" });
  });

  //retorna todos os Principais personagens dos 5 livros das Crônicas de Gelo e fogo
  server.get("/char/povCharacters", (req, res) => {
    character.handlePovCharactersGet(req, res);
  });

  //  Esta rota retorna os detalhes de 1 ou mais personagens e possui a seguinte query:
  // /char?id=1&id=2
  // sendo possível consultar quantos personagens forem
  // O id dos personagens foi mantido o mesmo que na API de onde os dados foram extraídos
  server.get("/char", (req, res) => {
    character.handleCharacterGet(req, res);
  });

  // Esta rota retorna as capas de 1 ou mais livros e possui a seguinte query:
  // /books/cover?id=1&id=2
  // sendo possível consultar quantas capas forem necessarias
  // o id dos livros foi mantido o mesmo que na API de onde os dados foram extraídos
  server.get("/books/cover", (req, res) => {
    books.handleBookCoverGet(req, res);
  });

  //Esta rota retorna todos os livros relacionados a 1 personagem
  server.get("/char/books/:charId", (req, res) => {
    character.handleBooksFromCharGet(req, res);
  });

  return server;
}
