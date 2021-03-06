import {NextFunction, Request, Response} from 'express'
import {RegisterRequestModel} from "./models/RegisterRequestModel";
import * as RegistrationUseCase from '../../../core/use-cases/SecurityUseCase'
import * as UserLoginUseCase from '../../../core/use-cases/SecurityUseCase'
import * as UserModel from "../../../core/use-cases/models/UserModel";
import * as UserLoginModel from "../../../core/use-cases/models/UserLoginModel";
import {LoginRequestModel} from "./models/LoginRequestModel";

export async function register(request: Request, response: Response){
    try {
        const reqBody = await RegisterRequestModel.build(request.body)
        await RegistrationUseCase.register(UserModel.build(reqBody))
        response.sendStatus(201)
    }catch(error){
        console.error(`Error requesting registration ${error.message} ${error.stackTrace}`)
        response.status(error.status ?? 500).send({message: error.message})
    }
}

export async function login(request: Request, response: Response, next: NextFunction){
    try {
        const reqBody = await LoginRequestModel.build(request.body)
        const result = await UserLoginUseCase.login(UserLoginModel.build(reqBody))
        if(!result) return response.sendStatus(404)
        response.locals.user = result
        next()
    }catch(error){
        console.error(`Error requesting registration ${error.message} ${error.stackTrace}`)
        response.status(error.status ?? 500).send({message: error.message})
    }
}

