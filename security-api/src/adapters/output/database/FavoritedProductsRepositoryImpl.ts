import { Db } from "mongodb";
import {MongoRepository} from "../../../configs/database/RepositoryTemplate";
import { FavoriteProductsModel} from "../../../core/use-cases/models/FavoriteProductsModel";
import {FavoriteProducts} from "./entities/FavoriteProducts";

export class FavoritedProductsRepositoryImpl extends MongoRepository<FavoriteProducts> {
  constructor(dbConnection: Db) {
    super("favorited_products", dbConnection, FavoriteProductsModel.convert);
  }
  async save(favoriteProductsModel: FavoriteProductsModel) : Promise<FavoriteProductsModel>{
    const userEntity = new FavoriteProducts(favoriteProductsModel)
    return super.create(userEntity)
  }
}
