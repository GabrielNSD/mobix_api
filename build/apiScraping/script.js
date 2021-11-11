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
const db_util_1 = require("../helpers/db-util");
const getData_1 = require("./getData");
const populatePovCharacters = () => __awaiter(void 0, void 0, void 0, function* () {
    const listPovChar = yield (0, getData_1.returnAllPovCharInfo)();
    //const listChar = await returnAllCharInfo();
    //console.log(listChar);
    //console.log(listPovChar);
    let client;
    try {
        client = yield (0, db_util_1.connectDatabase)();
    }
    catch (err) {
        console.log("erro ao conectar com banco ", err);
        return;
    }
    //console.log(listPovChar);
    //populate povCharacters in DataBase
    try {
        for (const item of listPovChar) {
            yield (0, db_util_1.insertDocument)(client, "povCharacters", item);
        }
        client.close();
    }
    catch (err) {
        console.log("erro insert ", err);
        client.close();
    }
    //populate characters in DataBase
    /*  try {
      for (const item of listChar) {
        await insertDocument(client, "characters", item);
      }
      client.close();
    } catch (err) {
      console.log("erro insert ", err);
      client.close();
    } */
    console.log("[populatePovCharacters] - finished");
});
const populateBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    const listBooks = yield (0, getData_1.getAllBooks)();
    let client;
    try {
        client = yield (0, db_util_1.connectDatabase)();
    }
    catch (err) {
        console.log("erro ao conectar com banco ", err);
        return;
    }
    //populate book in DataBase
    try {
        for (const book of listBooks) {
            yield (0, db_util_1.insertDocument)(client, "books", book);
        }
        client.close();
    }
    catch (err) {
        console.log("erro insert books ", err);
        client.close();
    }
    console.log("[populateBooks] - finished");
});
const runAll = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("start char");
    yield populatePovCharacters();
    console.log("start books");
    yield populateBooks();
});
runAll();
