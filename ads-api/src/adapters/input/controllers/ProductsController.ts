import {Request, Response} from "express";
import {validateProductCreationRequest} from './models/ProductCreationRequestModel'
import {getProducts, createProduct} from "../../../core/use-cases/ProductUseCase";
import {build} from "../../../core/use-cases/models/ProductModel";
import _ from 'lodash'

export async function get(request: Request, response: Response){
    try {
        const product = await getProducts(request.params,request.query)
        response.send(product)
    }catch(error){
        response.status(error.status ?? 500).send(error.message)
    }
}

export async function create(request: Request, response: Response){
    try {
        const productCreationRequest = validateProductCreationRequest(request.body)
        const result = await createProduct(build(productCreationRequest))
        response.send(result)
    }catch(error){
        response.status(error.status ?? 500).send(error.message)
    }
}
