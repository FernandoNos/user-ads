import * as Db from "../../app";
import {UsersRepositoryImpl} from "./UsersRepositoryImpl";
const client = (Db as any).MongoClient;

export const UsersRepository = new UsersRepositoryImpl(client);
