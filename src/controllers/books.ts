import Express from "express";
import { connectDatabase } from "../helpers/db-util";

export const handleBookCoverGet = async (req: any, res: Express.Response) => {
  const booksId = req.query["id"];
  if (!booksId) {
    res.status(404).json({ error: "entrada inválida" });
    return;
  }
  const client = await connectDatabase();

  const db = client.db();

  const resultArray = [];

  try {
    for (const id of booksId) {
      console.log(id);
      const book = await db
        .collection("books")
        .find({ id: Number(id) })
        .sort({ _id: 1 })
        .toArray();
      resultArray.push(book[0].cover);
    }
    res.status(200).json({ covers: resultArray });
  } catch (err) {
    res.status(500).json({ message: "Erro ao capa do livro" });
  }
};
