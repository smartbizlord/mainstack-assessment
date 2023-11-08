import ApiError from "../utils/ApiError.js";
import httpStatus from 'http-status'
import bcrypt from 'bcrypt'
import { dB } from "../models/index.js";
import moment from "moment";
import { jwtObj } from "../utils/config.js";
import { tokenTypes } from "../utils/tokens.js";
import jwt from 'jsonwebtoken'


export const checkEmailExists = async(email) => {
    const existingUser = await dB.users.findOne({ email })
    return !!existingUser
}

export const createUser = async(data) => {
    if (await checkEmailExists(data.email)) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Email is already taken');
	}

	data.password = bcrypt.hashSync(data.password, 10);
	const user = await dB.users.create(data);
	return user;
}

export const loginUser = async(body) => {
    const { email, password } = body;
	const user = await dB.users.findOne({ email });
    if (!user || !(await checkPasswordMatch(password, user))) {
		throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
	}
    const tokens = await generateToken(user);
    return {
        user: {
            email,
            name: user.name
        },
        tokens,
    }
}

export const refreshToken = async(token) => {
    let user;
    await jwt.verify(token, jwtObj.secret, async (err, decoded) => {
		if (err) {
			return new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
		}
		user = await dB.users.findOne({ _id: decoded.sub });
        console.log(decoded, "no wahalurd")
	})
    console.log(user, "just for test")
    const newTokens = await generateToken(user)
    if(!newTokens) return new ApiError(httpStatus.BAD_REQUEST, "The token is not valid")
    return newTokens
}

export const generateToken = async(identifier) => {
    const accessTokenExpires = moment().add(
		jwtObj.accessExpirationMinutes,
		'm',
	);
    
    const refreshTokenExpires = moment().add(
        jwtObj.refreshExpirationDays,
        'days',
    );

	const accessToken = jwt.sign({
		sub: identifier._id,
		iat: moment().unix(),
		exp: accessTokenExpires.unix(),
		type: tokenTypes.ACCESS,
	}, jwtObj.secret)

	const refreshToken = jwt.sign({
		sub: identifier._id,
		iat: moment().unix(),
		exp: refreshTokenExpires.unix(),
		type: tokenTypes.REFRESH,
	}, jwtObj.secret)

    identifier.refreshToken = refreshToken
    identifier.save()

    return {
		access: {
			token: accessToken,
			expires: accessTokenExpires.toDate(),
		},
		refresh: {
			token: refreshToken,
			expires: refreshTokenExpires.toDate(),
		},
	}
}

export const checkPasswordMatch = async(password, user) => {
    const comp = bcrypt.compareSync(password, user.password);
    return comp
}


const userService = {
    checkEmailExists,
    createUser,
    loginUser,
    refreshToken,
    generateToken,
    checkPasswordMatch,
}

export default userService