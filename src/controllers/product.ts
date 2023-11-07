import { createProduct, getSingleProduct, getAllProduct, updateProduct, deleteProduct } from "../services/product.js"
import Asyncly from "../utils/Asyncly.js"
import httpStatus from 'http-status'


export const productCreateController = Asyncly(async(req, res) => {
    await createProduct(req.body, req.user._id)
    res.status(httpStatus.CREATED).end()
})

export const productGetSingleController = Asyncly(async(req, res) => {
    // 
})

export const productGetAllController = Asyncly(async(req, res) => {
    // 
})

export const productUpdateController = Asyncly(async(req, res) => {
    // 
})

export const productDeleteController = Asyncly(async(req, res) => {
    // 
})

const productController = {
    productCreateController,
    productGetSingleController,
    productGetAllController,
    productUpdateController,
    productDeleteController,
}

export default productController