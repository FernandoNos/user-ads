import {BaseEntity} from "../../../configs/database/RepositoryTemplate";
import { v4 as uuidv4 } from 'uuid';

export class Products {
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
    products: Products[];

    constructor(ownerId: string, favorites:Products[] = [] ) {
        super();
        this.uuid = uuidv4()
        this.ownerId = ownerId;
        this.products = favorites;
    }
    // convert(param: any): FavoriteProducts {
    //     if(!param.email || !param.name) throw new BusinessException("email and name are mandatory")
    //     return new FavoriteProducts(param.name, param.email)
    // }
}
