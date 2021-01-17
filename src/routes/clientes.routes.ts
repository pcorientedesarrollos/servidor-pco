import { Router } from 'express';
const router = Router()
import { getClientes, getCliente, deleteCliente, updateCliente, createCliente } from '../controllers/clientes.controller';

router.route('/')
    .get(getClientes)
    .post(createCliente)


router.route('/:postId')
    .get(getCliente)
    .delete(deleteCliente)
    .put(updateCliente)


export default router