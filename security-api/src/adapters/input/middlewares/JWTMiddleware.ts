import {NextFunction, Request, Response} from 'express'
import {decrypt, encrypt} from "../../../utils/CryptoUtils";
import jwt from "jsonwebtoken";
import _ from 'lodash';

const { SECRET } = process.env
/*
Este passo poderia ser feito no BFF, responsável pela comunicação com o front
 */
export async function generateJWT(request: Request, response:Response){
    try {
        const encrypted = encrypt(response.locals.user.uuid)
        response.send({token:signJWT(encrypted)})
    }catch(error){
        response.sendStatus(500)
    }
}

export async function readJWT(request: Request, response:Response, next: NextFunction){
    try {
        const authorization = request.header('authorization')
        if(_.isEmpty(authorization)) return response.sendStatus(403)
        const decoded = jwt.decode(authorization.replace(/^Bearer\s*/i,''))
        // @ts-ignore
        response.locals.user={uuid:decrypt(decoded.data)}
        next()
    }catch(error){
        response.sendStatus(403)
    }
}

function signJWT(data: string){
    return jwt.sign({ data }, SECRET, {
        expiresIn: 300 // expires in 5min
    });
}
