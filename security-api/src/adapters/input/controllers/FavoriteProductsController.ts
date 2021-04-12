import {Request, Response} from 'express';
import {
    addFavoriteProduct,
    deleteFavoriteProduct,
    getFavoriteProducts
} from "../../../core/use-cases/UserFavoriteProductsUseCase";

export async function addFavorite(request: Request, response: Response){
    const { product_id } = request.body
    const user_id = response.locals.user.uuid

    response.send(await addFavoriteProduct(user_id, product_id))
}

export async function deleteFavorite(request: Request, response: Response){
    const { uuid } = request.params
    const user_id = response.locals.user.uuid

    response.send(await deleteFavoriteProduct(user_id, uuid))
}

export async function getFavorites(request: Request, response: Response){
    const user_id = response.locals.user.uuid
    response.send(await getFavoriteProducts(user_id))
}