import {NextFunction, Request, Response} from 'express';
export async function isAdmin(request: Request, response:Response, next: NextFunction){
    if(!response.locals.user.admin) return response.sendStatus(403)
    next()
}