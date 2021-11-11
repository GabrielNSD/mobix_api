"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.returnAllCharInfo = exports.returnAllPovCharInfo = exports.getAllBooks = exports.getContent = void 0;
const fs = __importStar(require("fs"));
const client = __importStar(require("https"));
const request = __importStar(require("request"));
request.defaults({ encoding: null });
function base64_encode(file) {
    const bitmap = fs.readFileSync(file);
    return Buffer.from(bitmap).toString("base64");
}
const downloadImage = function (url, filepath, isbn) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            try {
                if (!fs.existsSync(filepath)) {
                    fs.mkdirSync(filepath);
                }
            }
            catch (err) {
                console.log("[create directory] ", err);
            }
            try {
                const writeStream = fs.createWriteStream(`./images/${isbn}.jpg`);
                request
                    .get(`https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`)
                    .on("response", function (response) {
                    response.pipe(writeStream);
                    writeStream.on("finish", function () {
                        resolve("end");
                    });
                });
            }
            catch (err) {
                console.log(err);
            }
        });
    });
};
const getContent = function (url) {
    return new Promise((resolve, reject) => {
        const request = client.get(url, (res) => {
            let data = "";
            res.on("data", (e) => {
                data += e;
            });
            res.on("end", () => __awaiter(this, void 0, void 0, function* () {
                resolve(data);
            }));
        });
        request.on("error", (err) => reject(err));
    });
};
exports.getContent = getContent;
const getBookCover = (book) => __awaiter(void 0, void 0, void 0, function* () {
    if (typeof book === "string") {
        const bookParsed = yield JSON.parse(book);
        const isbn = bookParsed.isbn.replace("-", "");
        yield downloadImage(`https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`, "./images", isbn);
        const newImg = base64_encode(`./images/${isbn}.jpg`);
        return newImg;
    }
});
const getAllBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    const books = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const resultBooks = [];
    for (const book of books) {
        const data = yield (0, exports.getContent)(`https://anapioficeandfire.com/api/books/${book}`);
        let cover;
        if (typeof data === "string") {
            cover = yield getBookCover(data);
            const bookParsed = yield JSON.parse(data);
            resultBooks.push({
                name: bookParsed.name,
                id: book,
                cover,
                povCharacters: bookParsed.povCharacters.map((url) => getNumber(url, "characters/")),
                characters: bookParsed.characters.map((url) => getNumber(url, "characters/")),
            });
        }
    }
    return resultBooks;
});
exports.getAllBooks = getAllBooks;
const listAllPovCharacters = () => __awaiter(void 0, void 0, void 0, function* () {
    const books = [1, 2, 3, 5, 8];
    const povList = [];
    for (const book of books) {
        const rawData = yield (0, exports.getContent)(`https://anapioficeandfire.com/api/books/${book}`);
        if (typeof rawData === "string") {
            const thisBookPov = yield JSON.parse(rawData).povCharacters;
            for (const pov of thisBookPov) {
                const cleanedCharUrl = pov.split("www.").toString();
                if (!povList.includes(cleanedCharUrl)) {
                    povList.push(cleanedCharUrl);
                }
            }
        }
    }
    return povList;
});
const returnAllPovCharInfo = () => __awaiter(void 0, void 0, void 0, function* () {
    const povList = yield listAllPovCharacters();
    const povCharacters = [];
    for (const char of povList) {
        const rawData = yield (0, exports.getContent)(char);
        if (typeof rawData === "string") {
            const data = yield JSON.parse(rawData);
            povCharacters.push(Object.assign(Object.assign({}, data), { id: getNumber(data.url, "characters/"), books: data.books.map((book) => getNumber(book, "books/")), povBooks: data.povBooks.map((book) => getNumber(book, "books/")) }));
        }
    }
    return povCharacters;
});
exports.returnAllPovCharInfo = returnAllPovCharInfo;
const listAllCharacters = () => __awaiter(void 0, void 0, void 0, function* () {
    const books = [1, 2, 3, 4, 5, 6, 7, 8];
    const charList = [];
    for (const book of books) {
        const rawData = yield (0, exports.getContent)(`https://anapioficeandfire.com/api/books/${book}`);
        if (typeof rawData === "string") {
            const thisBookPov = yield JSON.parse(rawData).characters;
            for (const pov of thisBookPov) {
                const cleanedCharUrl = pov.split("www.").toString();
                console.log(pov.split("www."));
                if (!charList.includes(cleanedCharUrl)) {
                    charList.push(cleanedCharUrl);
                }
            }
        }
    }
    return charList;
});
const returnAllCharInfo = () => __awaiter(void 0, void 0, void 0, function* () {
    const charList = yield listAllCharacters();
    const characters = [];
    //console.log(charList);
    for (const char of charList) {
        //console.log(char);
        const rawData = yield (0, exports.getContent)(char);
        //console.log(rawData);
        if (typeof rawData === "string") {
            const data = yield JSON.parse(rawData);
            characters.push(Object.assign(Object.assign({}, data), { id: getNumber(data.url, "characters/"), books: data.books.map((book) => getNumber(book, "books/")), povBooks: data.povBooks.map((book) => getNumber(book, "books/")) }));
        }
    }
    return characters;
});
exports.returnAllCharInfo = returnAllCharInfo;
const getNumber = (url, keyword) => {
    const number = url.split(keyword)[1];
    return Number(number);
};
