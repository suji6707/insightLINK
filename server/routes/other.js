import express from 'express';
import { getOtherInfo } from '../middlewares/otherInfo.js';
import { authMiddleware } from '../middlewares/auth-middleware.js';

const router = express.Router();

router.get('/:other_id',authMiddleware,getOtherInfo); // 다른 사람 정보

export default router;