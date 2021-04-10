import {Request, Response} from 'express'
import {RegisterRequestModel} from "./models/RegisterRequestModel";
import {RuntimeException} from "../../../exceptions/RuntimeException";
import * as RegistrationUseCase from '../../../core/use-cases/RegistrationUseCase'
import {debug} from "debug";
import {RegisterModel} from "../../../core/use-cases/models/RegisterRequestModel";
debug('security-api:SecurityController');

export async function register(request: Request, response: Response){
    try {
        const reqBody = await RegisterRequestModel.build(request.body)
        await RegistrationUseCase.register(RegisterModel.build(reqBody))
        response.send()
    }catch(error){
        debug(`Error requesting registration ${error.message} ${error.stackTrace}`)
        if(error instanceof RuntimeException){
            response.status(error.status).send({message: error.message})
        }
        response.status(500).send({message: error.message})
    }
}