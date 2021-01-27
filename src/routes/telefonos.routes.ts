import { Router } from 'express';
const router = Router()
import { getTelefonoCliente,getTelefonosCliente,createTelefono,deleteUnTelefono } from '../controllers/clientes.controller';

router.route('/')
    .get(getTelefonosCliente)
    .post(createTelefono)

router.route('/:postId')
    .delete(deleteUnTelefono)
    .get(getTelefonoCliente)

export default router