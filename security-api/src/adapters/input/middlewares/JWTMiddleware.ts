import {Request, Response} from 'express'
import {encrypt} from "../../../utils/CryptoUtils";
import jwt from "jsonwebtoken";

const { SECRET } = process.env
/*
Este passo poderia ser feito no BFF, responsável pela comunicação com o front
 */
export async function generateJWT(request: Request, response:Response){
    try {
        const encrypted = encrypt(response.locals.user._id.toString())
        response.send({token:signJWT(encrypted)})
    }catch(error){
        response.sendStatus(500)
    }
}

function signJWT(data: string){
    return jwt.sign({ data }, SECRET, {
        expiresIn: 300 // expires in 5min
    });
}