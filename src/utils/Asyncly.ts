import { MiddlewarePromiseVoidType, NormalRequestWithUser } from "../types/middlewares.js";

import { NextFunction, Request, Response } from 'express'

const Asyncly = (fn: MiddlewarePromiseVoidType) => (req: NormalRequestWithUser, res: Response, next: NextFunction) => {
	Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};

export default Asyncly;