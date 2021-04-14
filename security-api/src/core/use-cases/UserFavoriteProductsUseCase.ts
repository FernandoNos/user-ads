import {FavoritedProductsRepository } from "../../adapters/output/database";
import {build} from "./models/FavoriteProductsModel";
import {getProductDetails} from "../../adapters/output/clients/ProductsAPI";
import {BusinessException} from "../../exceptions/BusinessException";
import _ from "lodash";

export async function addFavoriteProduct(userId: string, productId: string){

    await isValidProductId(productId)

    const usersFavorites = await FavoritedProductsRepository.findAll({ownerId: userId})

    if(_.isEmpty(usersFavorites)){
        const newFavoriteProducts = build(userId, productId)
        const dbFavoriteProducts = await FavoritedProductsRepository.save(newFavoriteProducts)
        return dbFavoriteProducts
    }

    const userFavorites = usersFavorites[0]
    const productAlreadyFavorited = userFavorites.products.filter(product => product.id === productId).length > 0

    if(productAlreadyFavorited) return userFavorites

    return FavoritedProductsRepository.addFavorite(userId, productId)
}

export async function deleteFavoriteProduct(user_id: string, product_id: string){
    await isValidProductId(product_id)
    return FavoritedProductsRepository.removeFavorite(user_id, product_id)
}

export async function getFavoriteProducts(user_id: string){
    return await FavoritedProductsRepository.findAll({ownerId: user_id})
}


async function isValidProductId(productId: string){
    return getProductDetails(productId)
        .then(result => {
            if (_.isEmpty(result)){
                throw new BusinessException("invalid product id!")
            }
        })
}
