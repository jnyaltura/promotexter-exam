import { Router } from 'express';
import { getPhoneCombinations } from '../controllers/phoneController';

const router = Router();

router.get('/phone-combinations', getPhoneCombinations);

export default router;
export {};
