import {FavoritedProductsRepository } from "../../adapters/output/database";
import {build, FavoriteProductsModel} from "./models/FavoriteProductsModel";
import {getProductDetails} from "../../adapters/output/clients/ProductsAPI";
import {BusinessException} from "../../exceptions/BusinessException";
import _ from "lodash";
import {RuntimeException} from "../../exceptions/RuntimeException";

export async function addFavoriteProduct(userId: string, productId: string) : Promise<FavoriteProductsModel>{

    console.log(`Adding favorite product ${productId} for ${userId}!`)
    await isValidProductId(productId)
    const usersFavorites = await FavoritedProductsRepository.findAll({ownerId: userId})

    if(_.isEmpty(usersFavorites)){
        console.log(`Creating favorite structure for ${userId}`)
        const newFavoriteProducts = build(userId, productId)
        const dbFavoriteProducts = await FavoritedProductsRepository.save(newFavoriteProducts)
        return dbFavoriteProducts
    }

    console.log(`User ${userId} already has favorites... Checking if ${productId} already exists`)
    const userFavorites = usersFavorites[0]
    const productAlreadyFavorited = userFavorites.products.filter(product => product.id === productId).length > 0

    if(productAlreadyFavorited) return userFavorites

    console.log(`Adding ${productId} to user ${userId} list of favorites...`)
    return FavoritedProductsRepository.addFavorite(userId, productId)
}

export async function deleteFavoriteProduct(userId: string, productId: string){
    console.log(`Deleting ${productId} from ${userId} list of favorites...`)
    await isValidProductId(userId)
    return FavoritedProductsRepository.removeFavorite(userId, productId)
        .catch(error => {
            console.log(`Error removing ${productId} from user ${userId} - error: ${error.message} ${error.stackTrace}`)
            throw error
        })
}

export async function getFavoriteProducts(userId: string){
    return await FavoritedProductsRepository.findAll({ownerId: userId})
        .catch(error => {
            console.error(`Error retrieving list of favorites for ${userId} - error: ${error.message} ${error.stackTrace}`)
            throw error
        })
}

export async function deleteFavorite(userId: string){
    FavoritedProductsRepository.delete({ownerId: userId})
        .catch(error => {
            console.error(`Error deleting ${userId}'s list of favorites - error ${error.message} ${error.stackTrace}`)
            throw error
        })
}

async function isValidProductId(productId: string){
    console.log(`Validating product ${productId}`)
    return getProductDetails(productId)
        .then(result => {
            if (_.isEmpty(result)){
                throw new BusinessException("invalid product id!")
            }
        })
        .catch(error =>{
            console.error(`Error validating product ${productId} - error : ${error.message} ${error.stackTrace}`)
            throw new RuntimeException("error validating product")
        })
}
