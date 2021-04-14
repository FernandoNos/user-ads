import { Db, MongoClient } from "mongodb";
import {debug} from 'debug'
debug('configs:mongo');

export class Database {
  getDbConenction(): Promise<Db | null> {
    const { MONGO_HOSTS } = process.env;
    // tslint:disable-next-line:no-console
    console.log(MONGO_HOSTS)
    const URL = `mongodb://${MONGO_HOSTS}/mongo`;

    return MongoClient.connect(URL, { useUnifiedTopology: true })
      .then((db) => {
        debug.log(`MongoDb: Success connecting to db`);
        return db.db('mongo');
      })
      .catch((error) => {
        debug.log(`MongoDb: Error connecting to db ${error} ${error.message ? error.message : ""}`);
        throw error
      });
  }
}
