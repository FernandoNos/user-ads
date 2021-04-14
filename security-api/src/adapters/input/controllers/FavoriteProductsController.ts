import {Request, Response} from 'express';
import {
    addFavoriteProduct,
    deleteFavoriteProduct,
    getFavoriteProducts
} from "../../../core/use-cases/UserFavoriteProductsUseCase";

export async function addFavorite(request: Request, response: Response){
    try {
        const {productId} = request.body
        const userId = response.locals.user.uuid

        if(!productId) return response.status(422).send({message:"productId is mandatory"})

        const result = await addFavoriteProduct(userId, productId)
        response.send(result)
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
        const result = await getFavoriteProducts(user_id)
        response.send(result)
    }catch(error){
        response.status(error.status ?? 500).send(error.message)
    }
}