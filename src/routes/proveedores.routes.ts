import { Router } from 'express';
const router = Router()
import { getProveedores, getProveedor, createProveedor, updateProveedor } from '../controllers/proveedores.controller';

router.route('/')
    .get(getProveedores)
    .post(createProveedor)

router.route('/:postId')
    .get(getProveedor)
    .put(updateProveedor)

export default router