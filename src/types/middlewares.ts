import { Request, RequestHandler, RequestParamHandler, Response, NextFunction }from 'express'

export interface ValidateErrorMessage {
    body?: object
    query?: object
} 

export type MiddlewareVoidType = (data?: any) => (req: Request, res: Response, next: NextFunction) => void

export type MiddlewarePromiseVoidType = (req: NormalRequestWithUser, res: Response, next: NextFunction) => void

export interface NormalRequestWithUser extends Request {
    user?: any,
}