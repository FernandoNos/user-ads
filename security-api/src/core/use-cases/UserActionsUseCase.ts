import {UserInterface} from "../../adapters/input/controllers/models/types/UserType";
import {UserModel} from "./models/UserModel";
import {UsersRepository} from "../../adapters/output";
import {User} from "../../adapters/output/entities/User";

export async function updateUser(userData: UserInterface) : Promise<UserModel>{
    const {uuid, ...data} = userData
    const x = await UsersRepository.update({uuid},data)
    return x
}

export async function getUsers(){
    return UsersRepository.findAll({})
}

export async function deleteUser(uuid: string){
    return UsersRepository.delete({uuid})
}