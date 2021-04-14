import {Request, Response} from "express";
import {validateProductCreationRequest} from './models/ProductCreationRequestModel'
import {getProducts, createProduct} from "../../../core/use-cases/ProductUseCase";
import {build} from "../../../core/use-cases/models/ProductModel";
import _ from 'lodash'

export async function get(request: Request, response: Response){
        getProducts(request.params,request.query)
            .then(product => response.send(product))
            .catch(error => response.status(error.status ?? 500).send(error.message))
}

export async function create(request: Request, response: Response){
        const productCreationRequest = validateProductCreationRequest(request.body)
        createProduct(build(productCreationRequest))
            .then(result => response.send(result))
            .catch(error => response.status(error.status ?? 500).send(error.message) )
}
