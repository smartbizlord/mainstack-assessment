import Joi from 'joi'
const { object, number, string } = Joi

export const createProduct = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        img: Joi.string().required().uri(),
        category: Joi.string().required(),
        price: Joi.number().min(2000).required(),
    })
}

export const updateProduct = {
    body: Joi.object().min(1).keys({
        name: Joi.string(),
        img: Joi.string().uri(),
        category: Joi.string(),
        price: Joi.number().min(2000),
    })
}
