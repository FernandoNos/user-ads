import { Db } from "mongodb";
import {MongoRepository} from "../../../configs/database/RepositoryTemplate";
import { FavoriteProductsModel, convert} from "../../../core/use-cases/models/FavoriteProductsModel";
import {FavoriteProducts, Product} from "./entities/FavoriteProducts";
import {UserModel} from "../../../core/use-cases/models/UserModel";

export class FavoritedProductsRepositoryImpl extends MongoRepository<FavoriteProducts> {
  constructor(dbConnection: Db) {
    super("favorited_products", dbConnection);
  }
  async save(favoriteProductsModel: FavoriteProductsModel) : Promise<FavoriteProductsModel>{
    const userEntity = new FavoriteProducts(favoriteProductsModel)
    return super.create(userEntity)
        .then(result => convert(result))
  }

  async findAll(query: any, pagination?: any) : Promise<FavoriteProductsModel[]>{
    return super.find(query, pagination)
        .then(entries => entries.map(entry => convert(entry)))
  }

  async addFavorite(userId: string, productId: string) : Promise<FavoriteProductsModel>{
    return this.updateOne({ownerId: userId},{
      $push:{
        products: new Product(productId)
      }
    } )
  }

  public updateOne(query: any, updatedValues: object): Promise<FavoriteProductsModel> {
    if (!updatedValues) throw Error(`No values to be updated provided`);

    return this.repositoryCollection
        .findOneAndUpdate(query, updatedValues, { upsert: false, returnOriginal: false })
        .then(result => result.value?convert(result.value):undefined)
  }
  public removeFavorite(userId: string, productId: string): Promise<boolean> {

    return this.repositoryCollection
        .updateOne({ownerId: userId},{
          $pull:{
            "products": { "id": productId}
          }
        })
        .then(result => result.modifiedCount > 0 )
  }
}
