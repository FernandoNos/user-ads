import { UsersRepository } from "../../adapters/output/database";
import {UserInterface} from "../../adapters/input/controllers/models/types/UserType";
import {UserModel} from "./models/UserModel";
export async function updateUser(userData: UserInterface) : Promise<UserModel>{
    const {uuid, ...data} = userData
    return UsersRepository.updateOne({uuid},data)
}

export async function getUsers(params: any){
    return UsersRepository.find({},params)
}

export async function deleteUser(uuid: string){
    return UsersRepository.delete({uuid})
}