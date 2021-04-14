import {NextFunction, Request, Response} from 'express'
import {RegisterRequestModel} from "./models/RegisterRequestModel";
import * as RegistrationUseCase from '../../../core/use-cases/UserRegistrationUseCase'
import * as UserLoginUseCase from '../../../core/use-cases/UserLoginUseCase'
import * as UserActions from '../../../core/use-cases/UserActionsUseCase'
import {debug} from "debug";
import {UserModel} from "../../../core/use-cases/models/UserModel";
import {UserLoginModel} from "../../../core/use-cases/models/UserLoginModel";
import {LoginRequestModel} from "./models/LoginRequestModel";
import _ from 'lodash'
debug('security-api:SecurityController');

export async function register(request: Request, response: Response){
    try {
        const reqBody = await RegisterRequestModel.build(request.body)
        await RegistrationUseCase.register(UserModel.build(reqBody))
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

export async function updateUser(request: Request, response: Response, next: NextFunction){
    try {
        if(_.isEmpty(request.body)) return response.sendStatus(422)
        response.send(await UserActions.updateUser({uuid: response.locals.user.uuid,...request.body}))

    }catch(error){
        debug(`Error requesting registration ${error.message} ${error.stackTrace}`)
        response.status(error.status ?? 500).send({message: error.message})
    }
}
export async function deleteUser(request: Request, response: Response, next: NextFunction){
    try {
        response.send(await UserActions.deleteUser(response.locals.user.uuid))
    }catch(error){
        debug(`Error requesting registration ${error.message} ${error.stackTrace}`)
        response.status(error.status ?? 500).send({message: error.message})
    }
}

