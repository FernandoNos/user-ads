import {Request, Response} from "express";
import {validateProductCreationRequest} from './models/ProductCreationRequestModel'
import {findProducts, handleProductCreationRequest} from "../../../core/use-cases/ProductUseCase";
import {build} from "../../../core/use-cases/models/ProductModel";
import _ from 'lodash'

export async function getProducts(request: Request, response: Response){
    try {
        const product = await findProducts(request.params,request.query)
        response.send(product)
    }catch(error){
        response.status(error.status ?? 500).send(error.message)
    }
}

export async function createProduct(request: Request, response: Response){
    try {
        const productCreationRequest = validateProductCreationRequest(request.body)
        response.send(await handleProductCreationRequest(build(productCreationRequest)))
    }catch(error){
        response.status(error.status ?? 500).send(error.message)
    }
}
