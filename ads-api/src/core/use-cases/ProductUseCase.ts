import {ProductModel} from "./models/ProductModel";
import {ProductRepository} from "../../adapters/output";

export async function createProduct(productModel: ProductModel) : Promise<ProductModel>{
    return ProductRepository.save(productModel)
}

export async function getProducts(queryFields: any, pagination?:any) :Promise<ProductModel[]> {
    return ProductRepository.findAll(queryFields,pagination)
}