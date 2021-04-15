import { UsersRepository,FavoritedProductsRepository } from "../../adapters/output/database";
import {UserInterface} from "../../adapters/input/controllers/models/types/UserType";
import {UserModel} from "./models/UserModel";

export async function updateUser(userData: UserInterface) : Promise<UserModel>{
    console.log(`Updating user ${userData.uuid}...`)
    const {uuid, ...data} = userData
    return UsersRepository.updateOne({uuid},data)
        .catch(error => {
            console.error(`Error updating ${userData.uuid} - error : ${error.message} ${error.stackTrace}`)
            throw error
        })
}

export async function getUsers(params: any){
    return UsersRepository.find({},params)
        .catch(error => {
            console.error(`Error retrieving with ${JSON.stringify(params)} - error : ${error.message} ${error.stackTrace}`)
            throw error
        })
}

export async function deleteUser(uuid: string){
    return UsersRepository.delete({uuid})
        .then(()=>FavoritedProductsRepository.delete({ownerId:uuid}))
        .catch(error => {
            console.error(`Error deleting ${uuid} - error : ${error.message} ${error.stackTrace}`)
            throw error
        })
}