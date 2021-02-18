import { Request, Response } from 'express'
import { connect } from '../database'


export async function getServicios(req: Request,res: Response): Promise<Response | void> {
    const fechaInicial = req.params.inicio;
    const fechaFinal = req.params.fin;
    try {
      const conn = await connect();
      const notas = await conn.query(`SELECT de.*,cli.nombre,cli.id AS idCliente,df.idFactura  from equiposcliente ec 
      LEFT JOIN clientes cli ON cli.id = ec.idCliente
      LEFT JOIN diagnosticosequipos de ON (de.idEquipo = ec.idEquipo) 
      LEFT JOIN detalle_factura df ON ( df.idDiagnostico = de.id)
      WHERE de.fechaRecepcion BETWEEN '${fechaInicial}' AND '${fechaFinal}'
      ORDER BY de.id DESC`);
      return res.json(notas[0]);
    } catch (e) {
      console.log(e);
    }
  }


  export async function updateEstado(req: Request, res: Response) {
    const estado = req.params.estado;
    const id = req.params.postId;
    console.log(estado, id)
    const conn = await connect()
    await conn.query('UPDATE diagnosticosequipos SET estado = ? WHERE id = ?  ', [estado,id])
    return res.json({
        message: 'Estado modificado'
    })

}