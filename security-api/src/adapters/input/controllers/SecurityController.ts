import {Request, Response} from 'express'
import {RegisterRequestModel} from "./models/RegisterRequestModel";
import {RuntimeException} from "../../../exceptions/RuntimeException";
import * as RegistrationUseCase from '../../../core/use-cases/UserRegistrationUseCase'
import {debug} from "debug";
import {UserRegistrationModel} from "../../../core/use-cases/models/UserRegistrationModel";
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