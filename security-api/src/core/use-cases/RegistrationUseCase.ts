import {RegisterModel} from "./models/RegisterRequestModel";
import {UserHashRepository} from '../../adapters/output'
import {UserHash} from "../../adapters/output/entities/UserHash";

export async function register(registerModel: RegisterModel){

    const x = await UserHashRepository.create(new UserHash("fafa"))
    const b = await UserHashRepository.findAll({})
    // tslint:disable-next-line:no-console
    console.log('fafa')

}