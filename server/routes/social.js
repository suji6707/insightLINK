import express from 'express';
import { authMiddleware } from '../middlewares/auth-middleware.js';
import { recomUsers } from '../middlewares/recomUser.js';
import { recomCards } from '../middlewares/recomCard.js';
import { followAdd } from '../middlewares/follow.js';
import { followDelete } from '../middlewares/follow.js';
import { rejectCard } from '../middlewares/recomCard.js';

const router = express.Router();

router.get('/user', authMiddleware, recomUsers);    // 로그인한 유저에 대한 친구 추천
router.get('/card', authMiddleware, recomCards);
router.post('/follow', authMiddleware, followAdd);     
router.delete('/follow', authMiddleware, followDelete);
router.post('/reject', authMiddleware, rejectCard);


export default router;