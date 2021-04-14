import {string, object, TypeOf, number} from 'yup';
import {RuntimeException} from "../../../exceptions/RuntimeException";
import {Product} from "../../../adapters/output/entities/Product";

const ProductModelSchema = object().shape({
    id: string(),
    price: number().positive().required(),
    image: string().url().required(),
    brand: string().required(),
    title: string().required(),
    reviewScore: number().positive().required()
});
g
export interface ProductModel extends TypeOf<typeof ProductModelSchema> {}

export function build(params: any) : ProductModel{
    try {
        return ProductModelSchema.validateSync(params,{abortEarly: false,stripUnknown: true})
    }catch(error){
        throw new RuntimeException(error?.errors)
    }
}

export function convert(product: Product) : ProductModel{
    try {
        return ProductModelSchema.validateSync({id:product.uuid,...product},{abortEarly: false,stripUnknown: true})
    }catch(error){
        throw new RuntimeException(error?.errors)
    }
}
