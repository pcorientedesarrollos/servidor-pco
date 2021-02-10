import { Router } from 'express';
const router = Router()
import { getServicios } from '../controllers/servicios.controller';

router.route('/:inicio/:fin')
    .get(getServicios)


export default router