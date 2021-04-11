import {FavoritedProductsRepository} from "../../adapters/output";
import _ from 'lodash';
import {FavoriteProductsModel} from "./models/FavoriteProductsModel";
import {Products} from "../../adapters/output/entities/FavoriteProducts";

export async function addFavoriteProduct(user_id: string, product_id: string){
    const userFavorites = await FavoritedProductsRepository.findOne({ownerId: user_id})
    if(_.isEmpty(userFavorites)){
        const newFavoriteProducts = FavoriteProductsModel.build(user_id, product_id)
        const dbFavoriteProducts = await FavoritedProductsRepository.create(newFavoriteProducts)
        return dbFavoriteProducts
    }
    const productAlreadyFavorited = userFavorites.products.filter(product => product.id === product_id)
    if(productAlreadyFavorited) return userFavorites

    userFavorites.products.push(new Products(product_id))
    return FavoritedProductsRepository.create(userFavorites)
}