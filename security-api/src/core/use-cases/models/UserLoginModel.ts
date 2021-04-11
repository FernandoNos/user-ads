import {string, object, TypeOf} from 'yup';
import {RuntimeException} from "../../../exceptions/RuntimeException";
import {RegisterRequestModel} from "../../../adapters/input/controllers/models/RegisterRequestModel";
import {User} from "../../../adapters/output/entities/User";
import {LoginRequestModel} from "../../../adapters/input/controllers/models/LoginRequestModel";

const UserLoginModelSchema = object().shape({
    name: string().required(),
    email: string().email().required(),
});

export interface UserLoginModelInterface extends TypeOf<typeof UserLoginModelSchema> {}

export class UserLoginModel {
    name: string;
    email: string;

    private constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
    }

    static build(params: LoginRequestModel) : UserLoginModel{
        try {
            const validated = UserLoginModelSchema.validateSync(params,{abortEarly: false})
            return new UserLoginModel(validated.name, validated.email)
        }catch(error){
            throw new RuntimeException(error?.errors)
        }
    }
    static convert(user: User): UserLoginModel {
        return new UserLoginModel(user.name, user.email)
    }
}
