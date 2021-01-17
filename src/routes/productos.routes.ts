import { Router } from 'express';
const router = Router()
import { getProductos, getProducto, createProducto, updateProducto,getProductosVenta } from '../controllers/productos.controller';

router.route('/')
    .get(getProductos)
    .post(createProducto)

router.route('/:postId')
    .get(getProducto)
    .put(updateProducto)

router.route('/notaVenta/productos')
    .get(getProductosVenta)

router.route('/notaVenta/postId')


export default router
