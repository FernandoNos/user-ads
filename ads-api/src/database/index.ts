import { Db, MongoClient } from "mongodb";

export class Database {
  mongoClient: MongoClient;

  constructor() {
    this.mongoClient = null;
  }

  getDbConenction(): Promise<Db> {
    const { MONGO_PASSWORD, MONGO_HOSTS, MONGO_USERNAME, MONGO_DATABASE } = process.env;
    const URL = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTS}?replicaSet=repDB`;

    return MongoClient.connect(URL, { useUnifiedTopology: true })
      .then((db) => {
        console.info(`MongoDb: Success connecting to db`);
        return db.db(MONGO_DATABASE);
      })
      .catch((error) => {
        console.error(`MongoDb: Error connecting to db ${error} ${error.message ? error.message : ""}`);
        return null;
      });
  }
}
