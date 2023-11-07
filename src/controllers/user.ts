import { createUser, loginUser, refreshToken } from "../services/user.js"
import Asyncly from "../utils/Asyncly.js"
import httpStatus from 'http-status'


export const userRegisterController = Asyncly(async(req, res) => {
    const user = await createUser(req.body)
    res.status(httpStatus.CREATED).end()
})

export const userLoginController = Asyncly(async(req, res) => {
    // 
    const response = await loginUser(req.body)
    res.status(httpStatus.OK).send(response)
})

export const userRefreshTokenController = Asyncly(async(req, res) => {
    // 
    const response = await refreshToken(req.body.token)
    res.status(httpStatus.OK).send(response)
})

const userController = {
    userRegisterController,
    userLoginController,
    userRefreshTokenController,
}

export default userController