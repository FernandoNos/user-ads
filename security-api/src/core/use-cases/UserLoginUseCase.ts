import {UserLoginModel} from "./models/UserLoginModel";
import {UsersRepository} from "../../adapters/output/database";
import _ from 'lodash';
import {UserModel} from "./models/UserModel";

export async function login(userLoginModel: UserLoginModel) : Promise<UserModel | undefined>{
    const dbUsers = await UsersRepository.findAll({name: userLoginModel.name, email: userLoginModel.email})
    if(_.isEmpty(dbUsers)) return undefined
    return dbUsers[0]
}