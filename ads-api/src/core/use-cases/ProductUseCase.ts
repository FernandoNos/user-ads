import {ProductModel} from "./models/ProductModel";
import {ProductRepository} from "../../adapters/output/database";
import _ from 'lodash'
import {BusinessException} from "../../exceptions/BusinessException";
export async function createProduct(productModel: ProductModel) : Promise<ProductModel>{
    const existingProduct = await ProductRepository.findAll({title:productModel.title, brand: productModel.brand})
    if(_.isEmpty(existingProduct)) {
        return ProductRepository.save(productModel)
    }
    throw new BusinessException("existing product")
}

export async function getProducts(queryFields: any, pagination?:any) :Promise<ProductModel[]> {
    return ProductRepository.findAll(queryFields,pagination)
}