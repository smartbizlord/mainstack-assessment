import Joi from 'joi';
import httpStatus from 'http-status';
import pick from '../utils/pick.js';
import ApiError from '../utils/ApiError.js';
import { MiddlewareVoidType, ValidateErrorMessage } from '../types/middlewares.js'
import { NextFunction, Request, Response } from 'express';

export const validate: MiddlewareVoidType = (schema: object) => (req: Request, res: Response, next: NextFunction) => {
	const validSchema = pick(schema, ['params', 'query', 'body']);
	const object = pick(req, Object.keys(validSchema));
	const { value, error } = Joi.compile(validSchema)
		.prefs({ errors: { label: 'key' }, abortEarly: false })
		.validate(object);

	if (error) {
		const body = {};
		const query = {};
		const errorMessage: ValidateErrorMessage = {};
		error.details.map((details) => {
			switch (details.path[0]) {
				case 'body':
					body[details.path[1]] = details.message.replace(/"/g, "'");
					break;
				case 'query':
					query[details.path[1]] = details.message.replace(/"/g, "'");
					break;

				default:
					break;
			}
		});

		Object.keys(body).length !== 0 && (errorMessage.body = body);
		Object.keys(query).length !== 0 && (errorMessage.query = query);

		return next(new ApiError(
				httpStatus.BAD_REQUEST,
				JSON.stringify(errorMessage),
				undefined,
				undefined,
				true,
			))
	}
	Object.assign(req, value);
	return next();
};

export default validate;
