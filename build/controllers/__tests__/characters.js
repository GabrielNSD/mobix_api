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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = require("../../server");
let server;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    server = yield (0, server_1.createServer)();
}));
describe("GET /char", () => {
    it("deve retornar status 400 e uma resposta de entrada invalida se nao houver id de personagem na query", (done) => {
        (0, supertest_1.default)(server)
            .get("/char")
            .expect("Content-Type", /json/)
            .expect(400)
            .end((err, res) => {
            if (err)
                return done(err);
            expect(res.body).toMatchObject({ error: "entrada invalida" });
            done();
        });
    });
    it("deve retornar status 200 e um json sobre Arya Stark", (done) => {
        (0, supertest_1.default)(server)
            .get("/char?id=148")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
            if (err)
                return done(err);
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
