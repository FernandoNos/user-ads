import  {string, object, TypeOf} from 'yup';
import {RuntimeException} from "../../../../exceptions/RuntimeException";

const LoginRequestModelSchema = object().shape({
    name: string().required(),
    email: string().email().required(),
});

interface LoginRequestModelInterface extends TypeOf<typeof LoginRequestModelSchema> {}

export class LoginRequestModel {
    name: string;
    email: string;

    private constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
    }

    static build(params: LoginRequestModelInterface) : LoginRequestModel{
        try {
            const validated = LoginRequestModelSchema.validateSync(params,{abortEarly: false})
            return new LoginRequestModel(validated.name, validated.email)
        }catch(error){
            throw new RuntimeException(error?.errors)
        }
    }
}