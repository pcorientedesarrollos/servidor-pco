import { Router } from 'express';
const router = Router()
import { getServicios,updateEstado } from '../controllers/servicios.controller';

router.route('/:inicio/:fin')
    .get(getServicios)

router.route('/:postId/:estado')
    .put(updateEstado)


export default router