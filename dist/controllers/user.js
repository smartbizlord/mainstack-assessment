var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createUser, loginUser, refreshToken } from "../services/user.js";
import Asyncly from "../utils/Asyncly.js";
import httpStatus from 'http-status';
export const userRegisterController = Asyncly((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield createUser(req.body);
    res.status(httpStatus.CREATED).end();
}));
export const userLoginController = Asyncly((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // 
    const response = yield loginUser(req.body);
    res.status(httpStatus.OK).send(response);
}));
export const userRefreshTokenController = Asyncly((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // 
    const response = yield refreshToken(req.body.token);
    res.status(httpStatus.OK).send(response);
}));
const userController = {
    userRegisterController,
    userLoginController,
    userRefreshTokenController,
};
export default userController;
//# sourceMappingURL=user.js.map