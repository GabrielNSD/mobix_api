import * as fs from "fs";
import * as client from "https";
import * as request from "request";
import * as util from "util";

request.defaults({ encoding: null });

function base64_encode(file: string) {
  const bitmap = fs.readFileSync(file);
  return Buffer.from(bitmap).toString("base64");
}

const downloadImage = async function (
  url: string,
  filepath: string,
  isbn: string
) {
  return new Promise((resolve, reject) => {
    try {
      if (!fs.existsSync(filepath)) {
        fs.mkdirSync(filepath);
      }
    } catch (err) {
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
    } catch (err) {
      console.log(err);
    }
  });
};

export const getContent = function (url: string) {
  return new Promise((resolve, reject) => {
    const request = client.get(url, (res) => {
      let data = "";
      res.on("data", (e) => {
        data += e;
      });
      res.on("end", async () => {
        resolve(data);
      });
    });
    request.on("error", (err) => reject(err));
  });
};

const getBookCover = async (book: string) => {
  if (typeof book === "string") {
    const bookParsed = await JSON.parse(book);
    const isbn = bookParsed.isbn.replace("-", "");
    await downloadImage(
      `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`,
      "./images",
      isbn
    );
    const newImg = base64_encode(`./images/${isbn}.jpg`);
    return newImg;
  }
};

export const getAllBooks = async () => {
  const books = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const resultBooks = [];

  for (const book of books) {
    const data = await getContent(
      `https://anapioficeandfire.com/api/books/${book}`
    );
    let cover;
    if (typeof data === "string") {
      cover = await getBookCover(data);
      const bookParsed = await JSON.parse(data);
      resultBooks.push({
        name: bookParsed.name,
        id: book,
        cover,
        povCharacters: bookParsed.povCharacters.map((url: string) =>
          getNumber(url, "characters/")
        ),
        characters: bookParsed.characters.map((url: string) =>
          getNumber(url, "characters/")
        ),
      });
    }
  }
  return resultBooks;
};

const listAllPovCharacters = async () => {
  const books = [1, 2, 3, 5, 8];
  const povList: string[] = [];

  for (const book of books) {
    const rawData = await getContent(
      `https://anapioficeandfire.com/api/books/${book}`
    );
    if (typeof rawData === "string") {
      const thisBookPov = await JSON.parse(rawData).povCharacters;

      for (const pov of thisBookPov) {
        const cleanedCharUrl = pov.split("www.").toString();
        if (!povList.includes(cleanedCharUrl)) {
          povList.push(cleanedCharUrl);
        }
      }
    }
  }
  return povList;
};

export const returnAllPovCharInfo = async () => {
  const povList = await listAllPovCharacters();
  const povCharacters = [];

  for (const char of povList) {
    const rawData = await getContent(char);

    if (typeof rawData === "string") {
      const data = await JSON.parse(rawData);

      povCharacters.push({
        ...data,
        id: getNumber(data.url, "characters/"),
        books: data.books.map((book: string) => getNumber(book, "books/")),
        povBooks: data.povBooks.map((book: string) =>
          getNumber(book, "books/")
        ),
      });
    }
  }

  return povCharacters;
};

const listAllCharacters = async () => {
  const books = [1, 2, 3, 4, 5, 6, 7, 8];
  const charList: string[] = [];

  for (const book of books) {
    const rawData = await getContent(
      `https://anapioficeandfire.com/api/books/${book}`
    );
    if (typeof rawData === "string") {
      const thisBookPov = await JSON.parse(rawData).characters;

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
};

export const returnAllCharInfo = async () => {
  const charList = await listAllCharacters();
  const characters: object[] = [];

  //console.log(charList);
  for (const char of charList) {
    //console.log(char);
    const rawData = await getContent(char);
    //console.log(rawData);

    if (typeof rawData === "string") {
      const data = await JSON.parse(rawData);

      characters.push({
        ...data,
        id: getNumber(data.url, "characters/"),
        books: data.books.map((book: string) => getNumber(book, "books/")),
        povBooks: data.povBooks.map((book: string) =>
          getNumber(book, "books/")
        ),
      });
    }
  }

  return characters;
};

const getNumber = (url: string, keyword: string) => {
  const number = url.split(keyword)[1];
  return Number(number);
};
