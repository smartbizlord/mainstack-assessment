import { dB } from "../models/index.js"

export const createProduct = async(data, owner) => {
    const product = await dB.products.create(data)
    product.owner = owner
    await product.save()
}

export const getSingleProduct = async(id) => {
    const product = dB.products.findOne({id})
}

export const getAllProduct = async() => {}

export const updateProduct = async() => {}

export const deleteProduct = async() => {}


const productService = {
    createProduct,
    getSingleProduct,
    getAllProduct,
    updateProduct,
    deleteProduct,
}

export default productService