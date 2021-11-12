"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleBooksFromCharGet = exports.handleCharacterGet = exports.handlePovCharactersGet = void 0;
const db_util_1 = require("../helpers/db-util");
const handlePovCharactersGet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield (0, db_util_1.connectDatabase)();
    const db = client.db();
    try {
        const characters = yield db
            .collection("povCharacters")
            .find()
            .sort({ _id: -1 })
            .toArray();
        res.status(200).json({ povCharacters: characters });
    }
    catch (err) {
        res.status(500).json({ message: "Erro ao obter povCharacters" });
    }
});
exports.handlePovCharactersGet = handlePovCharactersGet;
const handleCharacterGet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const rawCharIds = String(req.query["id"]);
    const charIds = rawCharIds.replace("[", "").replace("]", "").split(",");
    if (!charIds || charIds.length === 0 || charIds[0] === "undefined") {
        res.status(400).json({ error: "entrada invalida" });
        return;
    }
    const client = yield (0, db_util_1.connectDatabase)();
    const db = client.db();
    const resultArray = [];
    try {
        for (const id of charIds) {
            const character = yield db
                .collection("povCharacters")
                .find({ id: Number(id) })
                .sort({ _id: -1 })
                .toArray();
            resultArray.push(character);
        }
        res.status(200).json({ characters: resultArray });
    }
    catch (err) {
        res.status(500).json({ message: "Erro ao obter personagem" });
    }
});
exports.handleCharacterGet = handleCharacterGet;
const handleBooksFromCharGet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { charId } = req.params;
    const client = yield (0, db_util_1.connectDatabase)();
    const db = client.db();
    let books;
    let charData;
    try {
        charData = yield db
            .collection("povCharacters")
            .find({ id: Number(charId) })
            .sort({ _id: -1 })
            .toArray();
        books = charData[0].books.concat(charData[0].povBooks);
        console.log(books);
        //res.status(200).json({ data: books });
    }
    catch (error) {
        console.log("erro ao listar livros ", error);
        res.status(500).json({ erro: error });
    }
    try {
        const booksData = yield db
            .collection("books")
            .find({ id: { $in: books } })
            .sort({ _id: -1 })
            .toArray();
        res.status(200).json({ books: booksData });
    }
    catch (err) {
        res.status(500).json({ message: "Erro ao obter lista de livros" });
    }
});
exports.handleBooksFromCharGet = handleBooksFromCharGet;
