import { Router } from 'express';
import userRouter from './user.js';
import productRouter from './product.js';

export const router = Router();

router.use('/api', userRouter, productRouter);

export default router;