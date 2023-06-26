import express from 'express';
import { getUserInfo  } from '../middlewares/userInfo.js';
import { getUserProfile } from '../middlewares/userProfile.js';
import { authMiddleware } from '../middlewares/auth-middleware.js';

const router = express.Router();

router.get('/',authMiddleware,getUserInfo); // 유저 정보
router.get('/profile',authMiddleware,getUserProfile); // 유저 프로필


export default router;