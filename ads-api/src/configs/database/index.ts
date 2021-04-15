import { Db, MongoClient } from "mongodb";

export class Database {
  getDbConenction(): Promise<Db | null> {
    const { MONGO_HOSTS } = process.env;
    // tslint:disable-next-line:no-console
    console.log(MONGO_HOSTS)
    const URL = `mongodb://${MONGO_HOSTS}/mongo`;

    return MongoClient.connect(URL, { useUnifiedTopology: true })
      .then((db) => {
        console.log(`MongoDb: Success connecting to db`);
        return db.db('mongo');
      })
      .catch((error) => {
        console.error(`MongoDb: Error connecting to db ${error} ${error.message ? error.message : ""}`);
        throw error
      });
  }
}
