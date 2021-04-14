import {FavoriteProducts} from "../../../adapters/output/database/entities/FavoriteProducts";
import { v4 as uuidv4 } from 'uuid';
import {array, date, object, string, TypeOf} from "yup";

const ProductModelSchema = object().shape({
    id: string(),
    created_at: date(),
});

const FavoriteProductsModelSchema = object().shape({
    id: string(),
    ownerId: string(),
    uuid:string(),
    products: array().of(ProductModelSchema)

});

export interface ProductModel extends TypeOf<typeof ProductModelSchema> {}
export interface FavoriteProductsModel extends TypeOf<typeof FavoriteProductsModelSchema> {}


export function build(ownerId: string, productId: string) : FavoriteProductsModel{
    return {
        ownerId: ownerId,
        products: [{
            id: productId
        }]
    } as FavoriteProductsModel
}

export function convert(favoritedProduct: FavoriteProducts): FavoriteProductsModel{
    return {
            id: favoritedProduct.uuid,
            ownerId: favoritedProduct.ownerId,
            uuid: favoritedProduct.uuid,
        // @ts-ignore
        products: favoritedProduct.products.map(
                product => {
                    return {
                        id: product.id,
                        created_at: product.created_at
                    }
                })
    }
    }


