export class BusinessException extends Error {
    status: number = 400
    constructor(message: string){
        super(message)
    }
}