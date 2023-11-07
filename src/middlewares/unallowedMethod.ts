import { Request, Response, NextFunction } from 'express'

export const unallowedMethod = (req: Request, res: Response, next: NextFunction) => {
    res.status(405).end()
}