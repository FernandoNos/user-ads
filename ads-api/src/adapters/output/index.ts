import * as Db from "../../app";
import {ProductRepositoryImpl} from "./ProductRepositoryImpl";
const client = (Db as any).MongoClient;

export const ProductRepository = new ProductRepositoryImpl(client);
