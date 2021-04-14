export class RuntimeException extends Error {
    status: number = 422
    constructor(message: string){
        super(message)
    }
}