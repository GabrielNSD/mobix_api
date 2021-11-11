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
describe("GET /", () => {
    it("deve retornar status 200 e uma resposta valida se nao houver nenhum parametro", (done) => {
        (0, supertest_1.default)(server)
            .get(`/`)
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
            if (err)
                return done(err);
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
