import {string, object, TypeOf} from 'yup';
import {RuntimeException} from "../../../exceptions/RuntimeException";
import {RegisterRequestModel} from "../../../adapters/input/controllers/models/RegisterRequestModel";
import {User} from "../../../adapters/output/entities/User";

const RegisterModelSchema = object().shape({
    name: string().required(),
    email: string().email().required(),
});

export interface RegisterModelInterface extends TypeOf<typeof RegisterModelSchema> {}

export class UserRegistrationModel {
    name: string;
    email: string;

    private constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
    }

    static build(params: RegisterRequestModel) : UserRegistrationModel{
        try {
            const validated = RegisterModelSchema.validateSync(params,{abortEarly: false})
            return new UserRegistrationModel(validated.name, validated.email)
        }catch(error){
            throw new RuntimeException(error?.errors)
        }
    }
    static convert(user: User): UserRegistrationModel {
        return new UserRegistrationModel(user.name, user.email)
    }
}
