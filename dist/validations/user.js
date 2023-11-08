import Joi from 'joi';
const { object, string } = Joi;
const password = (value, helpers) => {
    if (value.length < 8) {
        return helpers.message('password must be at least 8 characters');
    }
    if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
        return helpers.message('password must contain at least 1 letter and 1 number');
    }
    return value;
};
export const createUser = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required().custom(password),
    })
};
export const loginUser = {
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
    })
};
export const refreshToken = {
    body: Joi.object().keys({
        token: Joi.string().required(),
    })
};
//# sourceMappingURL=user.js.map