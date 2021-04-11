import {FavoriteProducts} from "../../../adapters/output/database/entities/FavoriteProducts";
import { v4 as uuidv4 } from 'uuid';

export class Product {
    id: string;
    created_at: Date;

    constructor(id: string, created_at: Date = new Date()) {
        this.id = id;
        this.created_at = created_at;
    }
}

export class FavoriteProductsModel {
    id: string;
    ownerId: string;
    uuid: string;
    products: Product[];


    private constructor(ownerId: string, products: Product[]) {
        this.ownerId = ownerId;
        this.uuid = uuidv4();
        this.products = products;
    }

    static build(ownerId: string, productId: string){
        return new FavoriteProductsModel(ownerId, [new Product(productId)])
    }
    static convert(favoritedProduct: FavoriteProducts): FavoriteProductsModel{
        return {
            id: favoritedProduct._id.toHexString(),
            ownerId: favoritedProduct.ownerId,
            uuid: favoritedProduct.uuid,
            products: favoritedProduct.products.map(
                product => {
                    return {
                        id: product.id,
                        created_at: product.created_at
                    }
                })
        }
    }
}

