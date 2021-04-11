import {NextFunction, Request, Response} from 'express'
import {RegisterRequestModel} from "./models/RegisterRequestModel";
import * as RegistrationUseCase from '../../../core/use-cases/UserRegistrationUseCase'
import * as UserLoginUseCase from '../../../core/use-cases/UserLoginUseCase'
import {debug} from "debug";
import {UserRegistrationModel} from "../../../core/use-cases/models/UserRegistrationModel";
import {UserLoginModel} from "../../../core/use-cases/models/UserLoginModel";
import {LoginRequestModel} from "./models/LoginRequestModel";
debug('security-api:SecurityController');

export async function register(request: Request, response: Response){
    try {
        const reqBody = await RegisterRequestModel.build(request.body)
        await RegistrationUseCase.register(UserRegistrationModel.build(reqBody))
        response.sendStatus(201)
    }catch(error){
        debug(`Error requesting registration ${error.message} ${error.stackTrace}`)
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
        debug(`Error requesting registration ${error.message} ${error.stackTrace}`)
        response.status(error.status ?? 500).send({message: error.message})
    }
}