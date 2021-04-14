import { Db, MongoClient } from "mongodb";
import {MongoRepository} from "../../configs/database/RepositoryTemplate";
import {Product} from "./entities/Product";
import {convert, ProductModel} from "../../core/use-cases/models/ProductModel";
export class ProductRepositoryImpl extends MongoRepository<Product> {
  constructor(dbConnection: Db) {
    super("products", dbConnection);
  }
  save(productModel: ProductModel) : Promise<ProductModel>{
    const productEntity = Product.convert(productModel)
    return super.create(productEntity)
  }
}
