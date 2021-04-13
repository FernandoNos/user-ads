import {NextFunction, Request, Response} from 'express'
import jwt from "jsonwebtoken";
import _ from 'lodash';
import {encrypt, decrypt} from "../../../utils/CryptoUtils";

const { SECRET } = process.env
/*
Este passo poderia ser feito no BFF, responsável pela comunicação com o front
 */
export async function generateJWT(request: Request, response:Response){
    try {
        const { uuid, admin } = response.locals.user
        const encrypted = encrypt(`${uuid}:${admin}`)
        response.send({token:signJWT(encrypted)})
    }catch(error){
        response.sendStatus(500)
    }
}

export async function readJWT(request: Request, response:Response, next: NextFunction){
    try {
        const authorization = request.header('authorization')
        if(_.isEmpty(authorization)) return response.sendStatus(403)
        const decoded = jwt.verify(authorization.replace(/^Bearer\s*/i,''), SECRET)
        // @ts-ignore
        const userData = decrypt(decoded.data).split(':')
        response.locals.user={uuid:userData[0], admin: userData[1] === 'true'}
        next()
    }catch(error){
        response.status(403).send(error.message)
    }
}

function signJWT(data: string){
    return jwt.sign({ data }, SECRET, {
        expiresIn: 300 // expires in 5min
    });
}
