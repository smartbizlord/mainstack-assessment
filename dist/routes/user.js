import { Router } from 'express';
import { validate } from '../middlewares/validate.js';
import { loginUser, createUser, refreshToken } from '../validations/user.js';
import { unallowedMethod } from '../middlewares/unallowedMethod.js';
import { userRegisterController, userLoginController, userRefreshTokenController } from '../controllers/user.js';
export const userRouter = Router();
userRouter.route('/register')
    .post(validate(createUser), userRegisterController)
    .all(unallowedMethod);
userRouter.route('/login')
    .post(validate(loginUser), userLoginController)
    .all(unallowedMethod);
userRouter.route('/refresh-token')
    .post(validate(refreshToken), userRefreshTokenController)
    .all(unallowedMethod);
export default userRouter;
//# sourceMappingURL=user.js.map