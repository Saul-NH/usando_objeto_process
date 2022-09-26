import Router from 'express';
import * as randomsController from '../controllers/randoms.controller.js'

const router = Router();


router.get('/',randomsController.index);
router.get('/calculate',randomsController.calculate);


export default router;
