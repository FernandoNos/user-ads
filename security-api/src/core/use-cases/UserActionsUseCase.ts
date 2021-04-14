import {UserInterface} from "../../adapters/input/controllers/models/types/UserType";
import {UserModel} from "./models/UserModel";
import {UsersRepository} from "../../adapters/output/database";

export async function updateUser(userData: UserInterface) : Promise<UserModel>{
    const {uuid, ...data} = userData
    return UsersRepository.updateOne({uuid},data)
}

export async function getUsers(){
    return UsersRepository.find({})
}

export async function deleteUser(uuid: string){
    return UsersRepository.delete({uuid})
}