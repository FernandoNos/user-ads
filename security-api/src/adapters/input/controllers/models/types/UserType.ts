import {object, string, TypeOf} from "yup";

export const UserSchema = object().shape({
    id: string(),
    uuid: string(),
    name: string().required(),
    email: string().email().required(),
});

export interface UserInterface extends TypeOf<typeof UserSchema> {}