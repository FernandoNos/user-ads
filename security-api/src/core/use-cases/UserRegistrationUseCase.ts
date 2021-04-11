import {UserRegistrationRepository} from '../../adapters/output'
import {UserRegistrationModel} from "./models/UserRegistrationModel";
import * as _ from 'lodash'
import {BusinessException} from "../../exceptions/BusinessException";

export async function register(registerModel: UserRegistrationModel){
    try {
        const dbUsers = await UserRegistrationRepository.findAll({name: registerModel.name, email: registerModel.email})
        if (!_.isEmpty(dbUsers)) throw new BusinessException("User already registered!")
        const newUserDb = await UserRegistrationRepository.create(registerModel)
        return newUserDb
    }catch(error){
        throw error
    }
}