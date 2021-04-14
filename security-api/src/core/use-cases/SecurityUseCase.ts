import {UserLoginModel} from "./models/UserLoginModel";
import {UsersRepository} from "../../adapters/output/database";
import _ from 'lodash';
import {UserModel} from "./models/UserModel";
import {BusinessException} from "../../exceptions/BusinessException";

export async function login(userLoginModel: UserLoginModel) : Promise<UserModel | undefined>{
    const dbUsers = await UsersRepository.findAll({name: userLoginModel.name, email: userLoginModel.email})
    if(_.isEmpty(dbUsers)) return undefined
    return dbUsers[0]
}

export async function register(registerModel: UserModel){
    try {
        const dbUsers = await UsersRepository.findAll({name: registerModel.name, email: registerModel.email})
        if (!_.isEmpty(dbUsers)) throw new BusinessException("User already registered!")
        const newUserDb = await UsersRepository.save(registerModel)
        return newUserDb
    }catch(error){
        throw error
    }
}