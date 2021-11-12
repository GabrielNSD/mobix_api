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
exports.getDocument = exports.inserMultipleEntries = exports.insertDocument = exports.connectDatabase = void 0;
const mongodb_1 = require("mongodb");
const connectDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield mongodb_1.MongoClient.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.u6qrn.mongodb.net/mobix?retryWrites=true&w=majority`);
    return client;
});
exports.connectDatabase = connectDatabase;
const insertDocument = (client, collection, document) => __awaiter(void 0, void 0, void 0, function* () {
    const db = client.db();
    const result = yield db.collection(collection).insertOne(document);
    return result;
});
exports.insertDocument = insertDocument;
const inserMultipleEntries = (client, collection, document) => __awaiter(void 0, void 0, void 0, function* () {
    const db = client.db();
    const result = yield db.collection(collection).insertMany(document);
    return result;
});
exports.inserMultipleEntries = inserMultipleEntries;
const getDocument = (client) => __awaiter(void 0, void 0, void 0, function* () {
    const db = client.db;
});
exports.getDocument = getDocument;
