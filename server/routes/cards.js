import express from 'express';
import { getCardInfos } from '../middlewares/cardInfo.js';
import { getTagInfos } from '../middlewares/cardTag.js';
import { getCards } from '../middlewares/cardCopy.js';
import { updateCard } from '../middlewares/cardUpdate.js';
import { authMiddleware } from '../middlewares/auth-middleware.js';



const router = express.Router();

router.get('/info', authMiddleware, getCardInfos);    // 카드 상세정보
router.get('/tag', authMiddleware, getTagInfos);      // 태그 클릭시 관련 카드들 조회
router.post('/copy', authMiddleware, getCards);       // 카드 드래그앤드롭
router.patch('/update/:card_id',authMiddleware,updateCard);    // 카드 업데이트
export default router;