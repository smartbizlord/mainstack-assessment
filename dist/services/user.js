var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import ApiError from "../utils/ApiError.js";
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import { dB } from "../models/index.js";
import moment from "moment";
import { jwtObj } from "../utils/config.js";
import { tokenTypes } from "../utils/tokens.js";
import jwt from 'jsonwebtoken';
export const checkEmailExists = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield dB.users.findOne({ email });
    return !!existingUser;
});
export const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield checkEmailExists(data.email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email is already taken');
    }
    data.password = bcrypt.hashSync(data.password, 10);
    const user = yield dB.users.create(data);
    return user;
});
export const loginUser = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = body;
    const user = yield dB.users.findOne({ email });
    if (!user || !(yield checkPasswordMatch(password, user))) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
    }
    const tokens = yield generateToken(user);
    return {
        user: {
            email,
            name: user.name
        },
        tokens,
    };
});
export const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let user;
    yield jwt.verify(token, jwtObj.secret, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
        }
        user = yield dB.users.findOne({ _id: decoded.sub });
    }));
    const newTokens = yield generateToken(user);
    if (!newTokens)
        return new ApiError(httpStatus.BAD_REQUEST, "The token is not valid");
    return newTokens;
});
export const generateToken = (identifier) => __awaiter(void 0, void 0, void 0, function* () {
    const accessTokenExpires = moment().add(jwtObj.accessExpirationMinutes, 'm');
    const refreshTokenExpires = moment().add(jwtObj.refreshExpirationDays, 'days');
    const accessToken = jwt.sign({
        sub: identifier._id,
        iat: moment().unix(),
        exp: accessTokenExpires.unix(),
        type: tokenTypes.ACCESS,
    }, jwtObj.secret);
    const refreshToken = jwt.sign({
        sub: identifier._id,
        iat: moment().unix(),
        exp: refreshTokenExpires.unix(),
        type: tokenTypes.REFRESH,
    }, jwtObj.secret);
    identifier.refreshToken = refreshToken;
    identifier.save();
    return {
        access: {
            token: accessToken,
            expires: accessTokenExpires.toDate(),
        },
        refresh: {
            token: refreshToken,
            expires: refreshTokenExpires.toDate(),
        },
    };
});
export const checkPasswordMatch = (password, user) => __awaiter(void 0, void 0, void 0, function* () {
    const comp = bcrypt.compareSync(password, user.password);
    return comp;
});
const userService = {
    checkEmailExists,
    createUser,
    loginUser,
    refreshToken,
    generateToken,
    checkPasswordMatch,
};
export default userService;
//# sourceMappingURL=user.js.map