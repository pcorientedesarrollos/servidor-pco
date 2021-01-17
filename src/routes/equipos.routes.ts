import { Router } from 'express';
const router = Router()
import { getEquipos, getEquipo, createEquipo, updateEquipo, getEquiposCliente } from '../controllers/equipos.controller';

router.route('/')
    .get(getEquipos)
    .post(createEquipo)

router.route('/:postId')
    .get(getEquipo)
    .put(updateEquipo)

router.route('/equiposCliente/:postId')
    .get(getEquiposCliente)

export default router