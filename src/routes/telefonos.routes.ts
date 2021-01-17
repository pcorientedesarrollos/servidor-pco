import { Router } from 'express';
const router = Router()
import { getTelefonosCliente,createTelefono,deleteUnTelefono } from '../controllers/clientes.controller';

router.route('/')
    .get(getTelefonosCliente)
    .post(createTelefono)

router.route('/:postId')
    .delete(deleteUnTelefono)

export default router