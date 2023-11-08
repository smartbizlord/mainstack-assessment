var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import config from '../utils/config.js';
import { dB } from '../models/index.js';
let staticy;
export const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token = req.headers.authorization;
    if (!token) {
        return next(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
    }
    token = token.split(' ')[1];
    jwt.verify(token, config.jwt.secret, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return next(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
        }
        staticy = decoded.sub;
        req.user = yield dB.users.findOne({ _id: staticy });
        next();
    }));
});
export default verifyToken;
//# sourceMappingURL=verify.js.map