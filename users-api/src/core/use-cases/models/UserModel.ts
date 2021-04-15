import {string, object, TypeOf, bool} from 'yup';
import {RuntimeException} from "../../../exceptions/RuntimeException";
import {RegisterRequestModel} from "../../../adapters/input/controllers/models/RegisterRequestModel";
import {User} from "../../../adapters/output/database/entities/User";

const UserModelSchema = object().shape({
    name: string().required(),
    admin: bool(),
    uuid: string(),
    email: string().email().required(),
});

export interface UserModel extends TypeOf<typeof UserModelSchema> {}

export function build(params: RegisterRequestModel) : UserModel{
    try {
        return UserModelSchema.validateSync(params,{abortEarly: false})
    }catch(error){
        throw new RuntimeException(error?.errors)
    }
}

export function convert(user: User): UserModel {
    return {
        name: user.name,
        email:user.email,
        admin: user.admin,
        uuid: user.uuid
    } as UserModel
}
