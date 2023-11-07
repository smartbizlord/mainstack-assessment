import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import config from'../utils/config.js';
import { dB } from '../models/index.js';

let staticy: string;

export const verifyToken = async (req, res, next) => {
	let token = req.headers.authorization;
	if (!token) {
		return next(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
	}
	token = token.split(' ')[1];

	jwt.verify(token, config.jwt.secret, async (err, decoded) => {
		if (err) {
			return next(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
		}
		staticy = decoded.sub;
		req.user = await dB.users.findOne({where: { id: staticy }});
		next();
	});
};

export default verifyToken