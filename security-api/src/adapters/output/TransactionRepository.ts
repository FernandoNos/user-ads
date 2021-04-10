import { Db, MongoClient } from "mongodb";
import {UserHash} from "./entities/UserHash";
import {MongoRepository} from "../../configs/database/RepositoryTemplate";
export class UserHashRepositoryImpl extends MongoRepository<UserHash> {
  constructor(dbConnection: Db) {
    super("Transactions", dbConnection);
  }
}
