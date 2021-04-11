import {UserLoginModel} from "./models/UserLoginModel";
import {UsersRepository} from "../../adapters/output";
import _ from 'lodash';

export async function login(userLoginModel: UserLoginModel) : Promise<string | undefined>{
    const dbUsers = await UsersRepository.findAll({name: userLoginModel.name, email: userLoginModel.email})
    if(_.isEmpty(dbUsers)) return undefined
    return dbUsers[0]
}