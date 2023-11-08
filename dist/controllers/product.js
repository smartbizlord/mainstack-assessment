var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createProduct, getSingleProduct, getAllProduct, updateProduct, deleteProduct } from "../services/product.js";
import Asyncly from "../utils/Asyncly.js";
import httpStatus from 'http-status';
export const productCreateController = Asyncly((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield createProduct(req.body, req.user._id);
    res.status(httpStatus.CREATED).end();
}));
export const productGetSingleController = Asyncly((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield getSingleProduct(req.params.id);
    res.status(httpStatus.OK).send(product);
}));
export const productGetAllController = Asyncly((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield getAllProduct();
    res.status(httpStatus.OK).send(products);
}));
export const productUpdateController = Asyncly((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield updateProduct(req.user._id, req.params.id, req.body);
    res.status(httpStatus.OK).send(product);
}));
export const productDeleteController = Asyncly((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield deleteProduct(req.user._id, req.params.id);
    res.status(httpStatus.OK).send(product);
}));
const productController = {
    productCreateController,
    productGetSingleController,
    productGetAllController,
    productUpdateController,
    productDeleteController,
};
export default productController;
//# sourceMappingURL=product.js.map