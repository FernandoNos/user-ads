import yup, {string, object, TypeOf} from 'yup';
import {RuntimeException} from "../../../../exceptions/RuntimeException";

const RegisterRequestModelSchema = object().shape({
    name: string().required(),
    email: string().email().required(),
});

interface RegisterRequestModelInterface extends TypeOf<typeof RegisterRequestModelSchema> {}

export class RegisterRequestModel {
    name: string;
    email: string;

    private constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
    }

    static build(params: RegisterRequestModelInterface) : RegisterRequestModel{
        try {
            const validated = RegisterRequestModelSchema.validateSync(params,{abortEarly: false})
            return new RegisterRequestModel(validated.name, validated.email)
        }catch(error){
            throw new RuntimeException(error?.errors)
        }
    }
}