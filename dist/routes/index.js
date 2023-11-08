import { Router } from 'express';
import userRouter from './user.js';
import productRouter from './product.js';
export const router = Router();
router.use('/api/auth', userRouter);
router.use('/api/products', productRouter);
export default router;
//# sourceMappingURL=index.js.map