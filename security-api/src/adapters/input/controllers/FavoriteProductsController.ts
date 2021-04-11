import {Request, Response} from 'express';
import {addFavoriteProduct} from "../../../core/use-cases/UserFavoriteProductsUseCase";
export async function addFavorite(request: Request, response: Response){
    const { product_id } = request.body
    const user_id = response.locals.user.uuid

    response.send(await addFavoriteProduct(user_id, product_id))
}