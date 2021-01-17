import { Request, Response } from "express";
import { connect } from "../database";
// import { detalleNota } from '../../../cliente/src/app/modelos/detalleNotaVenta.interface';

export async function getNotasVenta(req: Request,res: Response): Promise<Response | void> {
  const fecha = req.params.postAnio
  try {
    const conn = await connect();
    const notas = await conn.query(`SELECT CASE 
        WHEN ef.estatus = 'c' 
           THEN 'CANCELADO'
           ELSE 'ACTIVO'
   END as estatusL, ef.*, cl.*
FROM encabezado_factura ef 
LEFT JOIN clientes cl ON 
cl.id = ef.idCliente
WHERE ef.presupuesto != 1 AND SUBSTR(ef.fecha FROM 1 FOR 4) = ${fecha}
ORDER BY idFactura DESC `);
    return res.json(notas[0]);
  } catch (e) {
    console.log(e);
    console.log(fecha)

  }
}


export async function createNotaVenta(req: Request, res: Response) {
  const newFacturaEncabezado= req.body
  const conn = await connect()
  await conn.query('INSERT INTO encabezado_factura SET ?', [newFacturaEncabezado])
  const resp = await conn.query('SELECT LAST_INSERT_ID() as id')
  return res.json({
      message: 'Factura creada!!',
      reps: resp[0]
  })
}


export async function createNotaVentaDetalle(req: Request, res: Response) {
  const newDetalleFactura= req.body
  const conn = await connect()
    conn.query('INSERT INTO detalle_factura SET ?', [newDetalleFactura])
  //   conn.query('UPDATE productos SET unidad = ?  WHERE codigo = ?', [producto])
  return res.json({
      message: 'Producto creado!!'
  })

}

export async function getNotaVenta(req: Request,res: Response): Promise<Response | void> {
  const idFactura = req.params.postId
  let notas: any = []
  try {
    const conn = await connect();
    const notaEncabezado = await conn.query('SELECT * FROM encabezado_factura WHERE idFactura = ?', [idFactura]);
    const notaDetalle = await conn.query(`SELECT f.idDetalleFactura, f.idFactura, f.nombre, f.codigoProducto, f.cantidad, f.descripcion,
    f.precio, f.total, f.idDiagnostico, p.unidad
            FROM detalle_factura f 
            LEFT JOIN productos p 
            ON f.codigoProducto = p.codigo 
            WHERE idFactura = ${idFactura} ORDER BY f.idDetalleFactura`);
    notas.push(notaEncabezado[0]);
    notas.push(notaDetalle[0]);
    return res.json(notas);
  } catch (e) {
    console.log(e);
  }
}

export async function updateEncabezadoNotaV(req: Request, res: Response) {
  const body = req.body
  const idFactura = req.params.postId
  const conn = await connect()
  await conn.query('UPDATE encabezado_factura SET ? WHERE idFactura = ?', [body, idFactura])
  return res.json({
      message: 'encabezado factura modificado'
  })
}

export async function updateDetalleNotaV(req: Request, res: Response) {
  const body = req.body
  const idDetalleFactura = req.params.postId
  const conn = await connect()
  await conn.query('UPDATE detalle_factura SET ? WHERE idDetalleFactura = ?', [body, idDetalleFactura])
  return res.json({
      message: 'detalle factura modificado'
  })
}

export async function deleteProductoDetalle(req: Request, res: Response) {
  const id = req.params.postId
  const conn = await connect()
  await conn.query('DELETE FROM detalle_factura WHERE idDetalleFactura = ?', [id])

  res.json({ message: 'Producto eliminado' })
}
