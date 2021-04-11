import {UsersRepository} from '../../adapters/output/database'
import {UserModel} from "./models/UserModel";
import * as _ from 'lodash'
import {BusinessException} from "../../exceptions/BusinessException";

export async function register(registerModel: UserModel){
    try {
        const dbUsers = await UsersRepository.findAll({name: registerModel.name, email: registerModel.email})
        if (!_.isEmpty(dbUsers)) throw new BusinessException("User already registered!")
        const newUserDb = await UsersRepository.create(registerModel)
        return newUserDb
    }catch(error){
        throw error
    }
}