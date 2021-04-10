import {string, object, TypeOf} from 'yup';
import {RuntimeException} from "../../../exceptions/RuntimeException";
import {RegisterRequestModel} from "../../../adapters/input/controllers/models/RegisterRequestModel";

const RegisterModelSchema = object().shape({
    name: string().required(),
    email: string().email().required(),
});

interface RegisterModelInterface extends TypeOf<typeof RegisterModelSchema> {}

export class RegisterModel {
    name: string;
    email: string;

    private constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
    }

    static build(params: RegisterRequestModel) : RegisterModel{
        try {
            const validated = RegisterModelSchema.validateSync(params,{abortEarly: false})
            return new RegisterModel(validated.name, validated.email)
        }catch(error){
            throw new RuntimeException(error?.errors)
        }
    }
}
