import Express from "express";
import { connectDatabase } from "../helpers/db-util";

export const handleBookCoverGet = async (req: any, res: Express.Response) => {
  //const booksId = req.query["id"];
  const rawBooksId = String(req.query["id"]);
  const booksId = rawBooksId.replace("[", "").replace("]", "").split(",");
  if (!booksId || booksId[0] === "undefined" || booksId.length === 0) {
    res.status(400).json({ error: "entrada invalida" });
    return;
  }
  const client = await connectDatabase();

  const db = client.db();

  const resultArray = [];

  try {
    for (const id of booksId) {
      const book = await db
        .collection("books")
        .find({ id: Number(id) })
        .sort({ _id: 1 })
        .toArray();
      resultArray.push(book[0].cover);
    }
    if (resultArray.length === 0) {
      res.status(404).json({ error: "Capa nao encontrada" });
    }
    res.status(200).json({ covers: resultArray });
  } catch (err) {
    res.status(404).json({ message: "Capa nao encontrada" });
  }
};
