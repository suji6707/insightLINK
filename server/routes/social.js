import express from 'express';
import { authMiddleware } from '../middlewares/auth-middleware.js';
import { recomUsers } from '../middlewares/recomUser.js';
import { recomCards } from '../middlewares/recomCard.js';
import { followAdd } from '../middlewares/follow.js';
import { followDelete } from '../middlewares/follow.js';
import { updatedCards } from '../middlewares/follow.js';
import { rejectCard } from '../middlewares/recomCard.js';
import { cloneCard } from '../middlewares/cloneCard.js';
/* 친구추천 */
import { recomUsersFunc } from '../middlewares/recomUser.js';


const router = express.Router();

router.get('/user', authMiddleware, recomUsersFunc, recomUsers);    // 로그인한 유저에 대한 친구 추천
router.get('/card', authMiddleware, recomUsersFunc, recomCards);
router.post('/follow', authMiddleware, followAdd);     
router.delete('/follow', authMiddleware, followDelete);
router.get('/updated', authMiddleware, updatedCards);
router.post('/reject', authMiddleware, rejectCard);
router.post('/clone', authMiddleware, cloneCard); // copyCard랑 로직이 다르다.


export default router;