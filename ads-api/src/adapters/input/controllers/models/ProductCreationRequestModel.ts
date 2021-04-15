import {string, object, TypeOf, number} from 'yup';
import {RuntimeException} from "../../../../exceptions/RuntimeException";

const ProductCreationRequestModelSchema = object().shape({
    price: number().required(),
    image: string().url().required(),
    brand: string().required(),
    title: string().required(),
    reviewScore: number().required()
});

export interface ProductCreationRequestModel extends TypeOf<typeof ProductCreationRequestModelSchema> {}

export function validateProductCreationRequest(params: any) : ProductCreationRequestModel{
    try {
        return ProductCreationRequestModelSchema.validateSync(params, {abortEarly: false})
    }catch(error){
        throw new RuntimeException(error.errors ?? error.message)
    }

}

