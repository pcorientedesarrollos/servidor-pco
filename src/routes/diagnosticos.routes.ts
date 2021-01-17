import { Router } from 'express';
const router = Router()
import { getDiagnosticos, getDiagnosticosEquipo, getDiagnostico, getDiagnosticoNuevo, createDiagnostico, updateDiagnostico, deleteDiagnostico, getDiagnosticoFactura,getDiagCortoFactura } from '../controllers/diagnosticos.controller';

router.route('/')
    .get(getDiagnosticos)
    .post(createDiagnostico)

router.route('/porEquipo/:postId')
    .get(getDiagnosticosEquipo)

router.route('/nuevo/:postId')
    .get(getDiagnosticoNuevo)

router.route('/:postId')
    .get(getDiagnostico)
    .put(updateDiagnostico)
    .delete(deleteDiagnostico)

router.route('/factura/:postId')
    .get(getDiagnosticoFactura)

router.route('/corto/:postId')
    .get(getDiagCortoFactura)

export default router