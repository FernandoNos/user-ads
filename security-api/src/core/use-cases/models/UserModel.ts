import {string, object, TypeOf, bool} from 'yup';
import {RuntimeException} from "../../../exceptions/RuntimeException";
import {RegisterRequestModel} from "../../../adapters/input/controllers/models/RegisterRequestModel";
import {User} from "../../../adapters/output/database/entities/User";

const RegisterModelSchema = object().shape({
    name: string().required(),
    admin: bool(),
    email: string().email().required(),
});

export interface RegisterModelInterface extends TypeOf<typeof RegisterModelSchema> {}

export class UserModel {
    name: string;
    email: string;
    admin: boolean;

    private constructor(name: string, email: string, admin : boolean = false) {
        this.name = name;
        this.email = email;
        this.admin = admin;
    }

    static build(params: RegisterRequestModel) : UserModel{
        try {
            const validated = RegisterModelSchema.validateSync(params,{abortEarly: false})
            return new UserModel(validated.name, validated.email, validated.admin)
        }catch(error){
            throw new RuntimeException(error?.errors)
        }
    }
    static convert(user: User): UserModel {
        return new UserModel(user.name, user.email)
    }
}
