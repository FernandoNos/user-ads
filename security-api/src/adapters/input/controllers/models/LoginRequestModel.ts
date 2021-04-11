import  {string, object, TypeOf} from 'yup';
import {RuntimeException} from "../../../../exceptions/RuntimeException";
import {UserInterface, UserSchema} from "./types/UserType";

export class LoginRequestModel {
    name: string;
    email: string;

    private constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
    }

    static build(params: UserInterface) : LoginRequestModel{
        try {
            const validated = UserSchema.validateSync(params,{abortEarly: false})
            return new LoginRequestModel(validated.name, validated.email)
        }catch(error){
            throw new RuntimeException(error?.errors)
        }
    }
}