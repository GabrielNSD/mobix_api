"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k];
          },
        });
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const books = __importStar(require("./controllers/books"));
const character = __importStar(require("./controllers/characters"));
const app = (0, express_1.default)();
//retorna todos os Principais personagens dos 5 livros das Crônicas de Gelo e fogo
app.get("/char/povCharacters", (req, res) => {
  character.handlePovCharactersGet(req, res);
});
//  Esta rota retorna os detalhes de 1 ou mais personagens e possui a seguinte query:
// /char?id=1&id=2
// sendo possível consultar quantos personagens forem
// O id dos personagens foi mantido o mesmo que na API de onde os dados foram extraídos
app.get("/char", (req, res) => {
  character.handleCharacterGet(req, res);
});
// Esta rota retorna as capas de 1 ou mais livros e possui a seguinte query:
// /books/cover?id=1&id=2
// sendo possível consultar quantas capas forem necessarias
// o id dos livros foi mantido o mesmo que na API de onde os dados foram extraídos
app.get("/books/cover", (req, res) => {
  books.handleBookCoverGet(req, res);
});
//Esta rota retorna todos os livros relacionados a 1 personagem
app.get("/char/books/:charId", (req, res) => {
  console.log("ois");
  character.handleBooksFromCharGet(req, res);
});
app.listen(3005, () => {
  console.log("runnnng ");
});
