import { createProduct, getSingleProduct, getAllProduct, updateProduct, deleteProduct } from "../services/product.js"
import Asyncly from "../utils/Asyncly.js"
import httpStatus from 'http-status'


export const productCreateController = Asyncly(async(req, res) => {
    const product = await createProduct(req.body, req.user._id)
    res.status(httpStatus.CREATED).end()
})

export const productGetSingleController = Asyncly(async(req, res) => {
    const product = await getSingleProduct(req.params.id)
    res.status(httpStatus.OK).send(product)
})

export const productGetAllController = Asyncly(async(req, res) => {
    const products = await getAllProduct()
    res.status(httpStatus.OK).send(products)
})

export const productUpdateController = Asyncly(async(req, res) => {
    console.log(req.params.id, "request params")
    const product = await updateProduct(req.user._id, req.params.id, req.body)
    res.status(httpStatus.OK).send(product)
})

export const productDeleteController = Asyncly(async(req, res) => {
    const product = await deleteProduct(req.user._id, req.params.id)
    res.status(httpStatus.OK).send(product)
})

const productController = {
    productCreateController,
    productGetSingleController,
    productGetAllController,
    productUpdateController,
    productDeleteController,
}

export default productController