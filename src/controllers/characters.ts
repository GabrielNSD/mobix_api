import Express from "express";
import { connectDatabase } from "../helpers/db-util";

export const handlePovCharactersGet = async (
  req: Express.Request,
  res: Express.Response
) => {
  const client = await connectDatabase();

  const db = client.db();

  try {
    const characters = await db
      .collection("povCharacters")
      .find()
      .sort({ _id: -1 })
      .toArray();
    res.status(200).json({ povCharacters: characters });
  } catch (err) {
    res.status(500).json({ message: "Erro ao obter povCharacters" });
  }
};

export const handleCharacterGet = async (req: any, res: Express.Response) => {
  //const { charIds } = req.params;
  const charIds = req.query["id"];
  if (!charIds) {
    res.status(404).json({ error: "entrada inválida" });
    return;
  }
  const client = await connectDatabase();

  const db = client.db();

  const resultArray = [];

  try {
    for (const id of charIds) {
      console.log(id);
      const character = await db
        .collection("povCharacters")
        .find({ id: Number(id) })
        .sort({ _id: -1 })
        .toArray();
      resultArray.push(character);
    }

    res.status(200).json({ characters: resultArray });
  } catch (err) {
    res.status(500).json({ message: "Erro ao obter personagem" });
  }
};

export const handleBooksFromCharGet = async (
  req: Express.Request,
  res: Express.Response
) => {
  const { charId } = req.params;

  const client = await connectDatabase();

  const db = client.db();

  let books;
  let charData;

  try {
    charData = await db
      .collection("povCharacters")
      .find({ id: Number(charId) })
      .sort({ _id: -1 })
      .toArray();
    books = charData[0].books.concat(charData[0].povBooks);
    console.log(books);
    //res.status(200).json({ data: books });
  } catch (error) {
    console.log("erro ao listar livros ", error);
    res.status(500).json({ erro: error });
  }

  try {
    const booksData = await db
      .collection("books")
      .find({ id: { $in: books } })
      .sort({ _id: -1 })
      .toArray();
    res.status(200).json({ books: booksData });
  } catch (err) {
    res.status(500).json({ message: "Erro ao obter lista de livros" });
  }
};
