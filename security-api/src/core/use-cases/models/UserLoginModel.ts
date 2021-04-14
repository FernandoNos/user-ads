import {string, object, TypeOf} from 'yup';
import {RuntimeException} from "../../../exceptions/RuntimeException";
import {RegisterRequestModel} from "../../../adapters/input/controllers/models/RegisterRequestModel";
import {User} from "../../../adapters/output/database/entities/User";
import {LoginRequestModel} from "../../../adapters/input/controllers/models/LoginRequestModel";

const UserLoginModelSchema = object().shape({
    name: string().required(),
    email: string().email().required(),
});

export interface UserLoginModel extends TypeOf<typeof UserLoginModelSchema> {}

export function build(params: LoginRequestModel) : UserLoginModel{
        try {
            return UserLoginModelSchema.validateSync(params,{abortEarly: false})
        }catch(error){
            throw new RuntimeException(error?.errors)
        }
    }

export function convert(user: User): UserLoginModel {
    return {
        name: user.name,
        email: user.email
    } as UserLoginModel
}
