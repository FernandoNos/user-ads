import {FavoritedProductsRepository} from "../../adapters/output/database";
import _ from 'lodash';
import {FavoriteProductsModel} from "./models/FavoriteProductsModel";
import {Product} from "../../adapters/output/database/entities/FavoriteProducts";
import {getProductDetails} from "../../adapters/output/clients/ProductsAPI";
import {BusinessException} from "../../exceptions/BusinessException";

export async function addFavoriteProduct(user_id: string, product_id: string){

    await isValidProductId(product_id)

    const userFavorites = await FavoritedProductsRepository.findOne({ownerId: user_id})
    if(_.isEmpty(userFavorites)){
        const newFavoriteProducts = FavoriteProductsModel.build(user_id, product_id)
        const dbFavoriteProducts = await FavoritedProductsRepository.save(newFavoriteProducts)
        return dbFavoriteProducts
    }
    const productAlreadyFavorited = userFavorites.products.filter(product => product.id === product_id).length > 0
    if(productAlreadyFavorited) return userFavorites

    userFavorites.products.push(new Product(product_id))
    return FavoritedProductsRepository.updateOne({ownerId: user_id},{
        $push:{
            products: new Product(product_id)
        }
    } )
}

export async function deleteFavoriteProduct(user_id: string, product_id: string){

    await isValidProductId(product_id)

    const response = await FavoritedProductsRepository.updateOne({ownerId: user_id},{
        $pull:{
            "products": { "id": product_id}
        }
    })
    return response
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