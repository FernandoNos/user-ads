import {NextFunction,  Request, Response} from 'express';

export function paramToLocals(localsPath: string){
    return (request:Request, response: Response, next: NextFunction, path: string = localsPath) => {
        response.locals[path] = request.params
        next()
    }
}