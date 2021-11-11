import { MongoClient } from "mongodb";

export const connectDatabase = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://dbUser:dbUserPassword@cluster0.u6qrn.mongodb.net/mobix?retryWrites=true&w=majority"
  );

  return client;
};

export const insertDocument = async (
  client: MongoClient,
  collection: string,
  document: object
) => {
  const db = client.db();

  const result = await db.collection(collection).insertOne(document);

  return result;
};

export const getDocument = async (client: MongoClient) => {
  const db = client.db;
};
