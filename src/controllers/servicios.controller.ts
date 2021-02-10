import { Request, Response } from 'express'
import { connect } from '../database'


export async function getServicios(req: Request,res: Response): Promise<Response | void> {
    const fechaInicial = req.params.inicio;
    const fechaFinal = req.params.fin;
    try {
      const conn = await connect();
      const notas = await conn.query(`SELECT de.*,cli.nombre from equiposcliente ec 
      LEFT JOIN clientes cli ON cli.id = ec.idCliente
      LEFT JOIN diagnosticosequipos de ON (de.idEquipo = ec.idEquipo) 
      WHERE de.fechaRecepcion BETWEEN '${fechaInicial}' AND '${fechaFinal}'
      ORDER BY de.id DESC`);
      return res.json(notas[0]);
    } catch (e) {
      console.log(e);
    }
  }