import { MongoClient } from "mongodb";

let uri = process.env.Database;
if (uri && uri.includes("<db_username>") && uri.includes("<db_password>")) {
  const user = encodeURIComponent(process.env.Databaseuser);
  const pass = encodeURIComponent(process.env.DatabasePass);
  uri = uri.replace("<db_username>", user).replace("<db_password>", pass);
}

const globalForMongo = globalThis;

if (!globalForMongo._mongoClient) {
  globalForMongo._mongoClient = new MongoClient(uri || "mongodb://127.0.0.1:27017");
}

export const mongoClient = globalForMongo._mongoClient;
export const db = mongoClient.db("resellhub");

let connectPromise;
export function ensureMongoConnection() {
  if (!connectPromise) {
    connectPromise = mongoClient.connect();
  }
  return connectPromise;
}
