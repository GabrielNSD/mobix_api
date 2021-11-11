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
exports.handleBookCoverGet = void 0;
const db_util_1 = require("../helpers/db-util");
const handleBookCoverGet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const booksId = req.query["id"];
    if (!booksId) {
        res.status(404).json({ error: "entrada inválida" });
        return;
    }
    const client = yield (0, db_util_1.connectDatabase)();
    const db = client.db();
    const resultArray = [];
    try {
        for (const id of booksId) {
            console.log(id);
            const book = yield db
                .collection("books")
                .find({ id: Number(id) })
                .sort({ _id: 1 })
                .toArray();
            resultArray.push(book[0].cover);
        }
        res.status(200).json({ covers: resultArray });
    }
    catch (err) {
        res.status(500).json({ message: "Erro ao capa do livro" });
    }
});
exports.handleBookCoverGet = handleBookCoverGet;
