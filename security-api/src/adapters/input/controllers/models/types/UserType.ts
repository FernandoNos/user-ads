import {object, string, bool, TypeOf} from "yup";

export const UserSchema = object().shape({
    id: string(),
    uuid: string(),
    admin: bool(),
    name: string().required(),
    email: string().email().required(),
});

export interface UserInterface extends TypeOf<typeof UserSchema> {}