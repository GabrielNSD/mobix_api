import {
  connectDatabase,
  inserMultipleEntries,
  insertDocument,
} from "../helpers/db-util";
import {
  returnAllPovCharInfo,
  getContent,
  returnAllCharInfo,
  getAllBooks,
} from "./getData";

const populatePovCharacters = async () => {
  const listPovChar = await returnAllPovCharInfo();

  let client;
  try {
    client = await connectDatabase();
  } catch (err) {
    console.log("erro ao conectar com banco ", err);
    return;
  }

  //populate povCharacters in DataBase
  try {
    await inserMultipleEntries(client, "povCharacters", listPovChar);
    client.close();
  } catch (err) {
    console.log("erro insert ", err);
    client.close();
  }

  console.log("[populatePovCharacters] - finished");
};

const populateBooks = async () => {
  const listBooks = await getAllBooks();

  let client;
  try {
    client = await connectDatabase();
  } catch (err) {
    console.log("erro ao conectar com banco ", err);
    return;
  }

  //populate book in DataBase

  try {
    await inserMultipleEntries(client, "books", listBooks);
    client.close();
  } catch (err) {
    console.log("erro insert books ", err);
    client.close();
  }

  console.log("[populateBooks] - finished");
};

const runAll = async () => {
  console.log("start char");
  await populatePovCharacters();
  console.log("start books");
  await populateBooks();
};

runAll();
