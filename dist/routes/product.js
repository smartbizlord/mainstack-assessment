import { Router } from 'express';
import { validate } from '../middlewares/validate.js';
import { createProduct, updateProduct } from '../validations/product.js';
import { unallowedMethod } from '../middlewares/unallowedMethod.js';
import { productCreateController, productDeleteController, productGetAllController, productGetSingleController, productUpdateController } from '../controllers/product.js';
import verifyToken from '../middlewares/verify.js';
export const productRouter = Router();
productRouter.route('/')
    .post(validate(createProduct), verifyToken, productCreateController)
    .get(productGetAllController)
    .all(unallowedMethod);
productRouter.route('/:id')
    .put(validate(updateProduct), verifyToken, productUpdateController)
    .get(productGetSingleController)
    .delete(verifyToken, productDeleteController)
    .all(unallowedMethod);
export default productRouter;
//# sourceMappingURL=product.js.map