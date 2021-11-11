import { connectDatabase, insertDocument } from "../helpers/db-util";
import {
  returnAllPovCharInfo,
  getContent,
  returnAllCharInfo,
  getAllBooks,
} from "./getData";

const populatePovCharacters = async () => {
  const listPovChar = await returnAllPovCharInfo();
  //const listChar = await returnAllCharInfo();

  //console.log(listChar);
  //console.log(listPovChar);

  let client;
  try {
    client = await connectDatabase();
  } catch (err) {
    console.log("erro ao conectar com banco ", err);
    return;
  }

  //console.log(listPovChar);

  //populate povCharacters in DataBase
  try {
    for (const item of listPovChar) {
      await insertDocument(client, "povCharacters", item);
    }
    client.close();
  } catch (err) {
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
    for (const book of listBooks) {
      await insertDocument(client, "books", book);
    }
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
