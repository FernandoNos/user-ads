import {Request, Response} from 'express';
import * as UserActionsUseCase from '../../../core/use-cases/UserActionsUseCase'


export async function getUsers(request: Request, response: Response){
    try{
        return response.send(await UserActionsUseCase.getUsers(request.query))
    }catch (error){
        response.status(error.status ?? 500).send(error.message)
    }
}