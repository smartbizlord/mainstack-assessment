var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { dB } from "../models/index.js";
import ApiError from "../utils/ApiError.js";
import httpStatus from 'http-status';
export const createProduct = (data, owner) => __awaiter(void 0, void 0, void 0, function* () {
    data.owner = owner;
    const product = yield dB.products.create(data);
    return product;
});
export const getSingleProduct = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield dB.products.findOne({ _id }).select('name img category price -_id');
    if (!product) {
        throw new ApiError(httpStatus.NOT_FOUND, "Can't find the resource on our servers");
    }
    return product;
});
export const getAllProduct = () => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield dB.products.find().select('name img category price');
    return products;
});
export const updateProduct = (owner, _id, update) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield dB.products.findOneAndUpdate({ _id, owner }, update);
    if (!product) {
        throw new ApiError(httpStatus.NOT_FOUND, "Can't find the resource on our servers");
    }
    // return {
    //     ...product,
    //     createdAt: undefined,
    //     updatedAt: undefined,
    //     __v: undefined,
    // }
    return yield dB.products.findOne({ _id }).select("name img category price -_id");
});
export const deleteProduct = (owner, _id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield dB.products.findOneAndDelete({ _id, owner });
    if (!product) {
        throw new ApiError(httpStatus.NOT_FOUND, "Can't find the resource on our servers");
    }
    // return {
    //     ...product,
    //     createdAt: undefined,
    //     updatedAt: undefined,
    //     __v: undefined,
    // }
    return product;
});
const productService = {
    createProduct,
    getSingleProduct,
    getAllProduct,
    updateProduct,
    deleteProduct,
};
export default productService;
//# sourceMappingURL=product.js.map