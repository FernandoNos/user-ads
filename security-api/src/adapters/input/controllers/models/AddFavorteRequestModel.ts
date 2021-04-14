import {string, object, TypeOf, number} from 'yup';
import {RuntimeException} from "../../../../exceptions/RuntimeException";

const AddFavoriteProductRequestModelSchema = object().shape({
    productId: string().required(),
});

export interface AddFavoriteProductRequestModel extends TypeOf<typeof AddFavoriteProductRequestModelSchema> {}

export function validateAddFavoriteProductRequest(params: any) : AddFavoriteProductRequestModel{
    try {
        return AddFavoriteProductRequestModelSchema.validateSync(params, {abortEarly: false})
    }catch(error){
        throw new RuntimeException(error.errors ?? error.message)
    }

}

