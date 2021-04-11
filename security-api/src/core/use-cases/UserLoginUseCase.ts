import {UserLoginModel} from "./models/UserLoginModel";
import {UserRegistrationRepository} from "../../adapters/output";
import _ from 'lodash';

export async function login(userLoginModel: UserLoginModel) : Promise<string | undefined>{
    const dbUsers = await UserRegistrationRepository.findAll({name: userLoginModel.name, email: userLoginModel.email})
    if(_.isEmpty(dbUsers)) return undefined
    return dbUsers[0]
}