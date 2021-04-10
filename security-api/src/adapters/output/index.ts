import * as Db from "../../app";
import {UserHashRepositoryImpl} from "./TransactionRepository";
const client = (Db as any).MongoClient;

export const UserHashRepository = new UserHashRepositoryImpl(client);
