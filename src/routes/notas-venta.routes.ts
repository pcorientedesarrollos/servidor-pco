import { Router } from 'express';
const router = Router()
import { getNotasVentaCliente,getNotasVenta,createNotaVenta,createNotaVentaDetalle,getNotaVenta, updateEncabezadoNotaV,updateDetalleNotaV,deleteProductoDetalle } from '../controllers/notas-venta.controller';

router.route('/')
.post(createNotaVenta)


router.route('/detalle')
.post(createNotaVentaDetalle)

router.route('/fecha/:postAnio')
.get(getNotasVenta)

router.route('/editar/:postId')
.get(getNotaVenta)
.put(updateEncabezadoNotaV)

router.route('/editarDetalle/:postId')
.put(updateDetalleNotaV)

router.route('/:postId')
.delete(deleteProductoDetalle)
.get(getNotasVentaCliente)



export default router