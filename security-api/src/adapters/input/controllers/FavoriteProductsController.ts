import {Request, Response} from 'express';
import {
    addFavoriteProduct,
    deleteFavoriteProduct,
    getFavoriteProducts
} from "../../../core/use-cases/UserFavoriteProductsUseCase";

export async function addFavorite(request: Request, response: Response){
    try {
        const {product_id} = request.body
        const user_id = response.locals.user.uuid

        response.send(await addFavoriteProduct(user_id, product_id))
    }catch(error){
        response.status(error.status ?? 500).send({message: error.message})
    }
}

export async function deleteFavorite(request: Request, response: Response){
    try {
        const {uuid} = request.params
        const user_id = response.locals.user.uuid

        await deleteFavoriteProduct(user_id, uuid)
        response.send()
    }catch(error){
        response.status(error.status ?? 500).send(error.message)
    }
}

export async function getFavorites(request: Request, response: Response){
    try {
        const user_id = response.locals.user.uuid
        response.send(await getFavoriteProducts(user_id))
    }catch(error){
        response.status(error.status ?? 500).send(error.message)
    }
}