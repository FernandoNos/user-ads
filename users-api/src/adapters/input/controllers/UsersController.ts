import {NextFunction, Request, Response} from 'express';
import * as UserActionsUseCase from '../../../core/use-cases/UserUseCase'
import _ from "lodash";
import * as UserActions from "../../../core/use-cases/UserUseCase";

export async function getUsers(request: Request, response: Response){
    try{
        const result = await UserActionsUseCase.getUsers(request.query)
        return response.send(result)
    }catch (error){
        console.error(`Error getting users ${error.message} ${error.stackTrace}`)
        response.status(error.status ?? 500).send(error.message)
    }
}
export async function updateUser(request: Request, response: Response, next: NextFunction){
    try {
        if(_.isEmpty(request.body)) return response.sendStatus(422)

        const result = await UserActions.updateUser({uuid: response.locals.user.uuid,...request.body})
        if(!result) response.status(404).send()
        response.send()
    }catch(error){
        console.error(`Error requesting registration ${error.message} ${error.stackTrace}`)
        response.status(error.status ?? 500).send({message: error.message})
    }
}
export async function deleteUser(request: Request, response: Response, next: NextFunction){
    try {
        await UserActions.deleteUser(response.locals.user.uuid)
        response.send()
    }catch(error){
        console.error(`Error requesting registration ${error.message} ${error.stackTrace}`)
        response.status(error.status ?? 500).send({message: error.message})
    }
}