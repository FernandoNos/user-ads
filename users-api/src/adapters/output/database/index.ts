import * as Db from "../../../app";
import {UsersRepositoryImpl} from "./UsersRepositoryImpl";
import {FavoritedProductsRepositoryImpl} from "./FavoritedProductsRepositoryImpl";
const client = (Db as any).MongoClient;

export const UsersRepository = new UsersRepositoryImpl(client);
export const FavoritedProductsRepository = new FavoritedProductsRepositoryImpl(client);
