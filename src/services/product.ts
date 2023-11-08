import { dB } from "../models/index.js"
import ApiError from "../utils/ApiError.js"
import httpStatus from 'http-status'

export const createProduct = async(data, owner) => {
    data.owner = owner
    console.log(data, "current product data")
    const product = await dB.products.create(data)
    return product
}

export const getSingleProduct = async(_id) => {
    const product = await dB.products.findOne({_id}).select('name img category price -_id')
    if(!product) {
        throw new ApiError(httpStatus.NOT_FOUND, "Can't find the resource on our servers")
    }
    return product
}

export const getAllProduct = async() => {
    const products = await dB.products.find().select('name img category price')
    return products
}

export const updateProduct = async(owner, _id, update) => {
    console.log(owner, _id, update, "owner, id and update respectfully")
    const product = await dB.products.findOneAndUpdate({_id, owner}, update)
    if(!product) {
        throw new ApiError(httpStatus.NOT_FOUND, "Can't find the resource on our servers")
    }
    // return {
    //     ...product,
    //     createdAt: undefined,
    //     updatedAt: undefined,
    //     __v: undefined,
    // }

    return await dB.products.findOne({_id}).select("name img category price -_id")
}

export const deleteProduct = async(owner, _id) => {
    const product = await dB.products.findOneAndDelete({_id, owner})
    if(!product) {
        throw new ApiError(httpStatus.NOT_FOUND, "Can't find the resource on our servers")
    }
    // return {
    //     ...product,
    //     createdAt: undefined,
    //     updatedAt: undefined,
    //     __v: undefined,
    // }

    return product
}


const productService = {
    createProduct,
    getSingleProduct,
    getAllProduct,
    updateProduct,
    deleteProduct,
}

export default productService