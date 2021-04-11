import {BaseEntity} from "../../../../configs/database/RepositoryTemplate";
import { v4 as uuidv4 } from 'uuid';
import {FavoriteProductsModel} from "../../../../core/use-cases/models/FavoriteProductsModel";
import { ObjectId } from "mongodb";

export class Product {
    id: string;
    created_at: Date

    constructor(id: string, created_at: Date = new Date()) {
        this.id = id;
        this.created_at = created_at;
    }
}

export class FavoriteProducts extends BaseEntity {
    uuid: string;
    ownerId: string;
    products: Product[];

    constructor(favoriteProductsModel: FavoriteProductsModel ) {
        super();
        this.uuid = uuidv4()
        this.ownerId = favoriteProductsModel.ownerId;
        this._id = new ObjectId(favoriteProductsModel.id);
        this.products = favoriteProductsModel.products
            .map( product =>
                new Product(product.id)
            )
    }
    // convert(param: any): FavoriteProducts {
    //     if(!param.email || !param.name) throw new BusinessException("email and name are mandatory")
    //     return new FavoriteProducts(param.name, param.email)
    // }
}
