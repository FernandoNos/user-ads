import * as Db from "../../app";
import {UserRegistrationRepositoryImpl} from "./UserRegistrationRepositoryImpl";
const client = (Db as any).MongoClient;

export const UserRegistrationRepository = new UserRegistrationRepositoryImpl(client);
