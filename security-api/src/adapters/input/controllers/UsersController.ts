import {Request, Response} from 'express';
import * as UserActionsUseCase from '../../../core/use-cases/UserActionsUseCase'


export async function getUsers(request: Request, response: Response){
    try{
        const result = await UserActionsUseCase.getUsers(request.query)
        return response.send(result)
    }catch (error){
        response.status(error.status ?? 500).send(error.message)
    }
}