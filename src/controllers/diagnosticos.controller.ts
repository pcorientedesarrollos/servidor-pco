import { Request, Response } from 'express'
import { connect } from '../database'
import { Diagnostico } from '../interface/diagnostico'

export async function getDiagnosticos(req: Request, res: Response): Promise<Response | void> {
    try {
        const conn = await connect()
        const diagnosticos = await conn.query('SELECT * FROM diagnosticosequipos ORDER BY id DESC')
        return res.json(diagnosticos[0])
    } catch (e) {
        console.log(e)
    }
}

export async function getDiagnosticosEquipo(req: Request, res: Response): Promise<Response> {
    const id = req.params.postId
    const conn = await connect()
    const diagnostico = await conn.query('SELECT * FROM diagnosticosequipos WHERE idEquipo=?', [id])
    return res.json(diagnostico[0])
}

export async function getDiagnostico(req: Request, res: Response): Promise<Response> {
    const id = req.params.postId
    const conn = await connect()
    const diagnostico = await conn.query(`SELECT de.*, de.id AS diagId, de.estado AS estadoDiag, e.*, c.*, tc.telefono 
                            FROM diagnosticosequipos de
                            LEFT JOIN equiposcliente  e
                            ON e.idEquipo = de.idEquipo
                            LEFT JOIN clientes c
                            ON e.idCliente = c.id
                            LEFT JOIN telefonos_cliente tc
                            ON tc.idCliente = e.idCliente
                            WHERE de.id =? LIMIT 1`, [id])
    return res.json(diagnostico[0])
}

export async function getDiagnosticoNuevo(req: Request, res: Response): Promise<Response> {
    const idEquipo = req.params.postId
    const conn = await connect()
    const diagnostico = await conn.query(`SELECT eq.*, cl.*, tc.telefono
    FROM equiposcliente eq
    LEFT JOIN clientes cl
    ON eq.idCliente = cl.id
    LEFT JOIN telefonos_cliente tc
    ON tc.idCliente = eq.idCliente
    WHERE idEquipo =? LIMIT 1`, [idEquipo])
    return res.json(diagnostico[0])
}

export async function createDiagnostico(req: Request, res: Response) {
    const newDiagnostico: Diagnostico = req.body
    const conn = await connect()
    await conn.query('INSERT INTO diagnosticosequipos SET ?', [newDiagnostico])
    return res.json({
        message: '¡¡Diagnóstico creado!!'
    })
}

export async function updateDiagnostico(req: Request, res: Response) {
    const body: Diagnostico = req.body
    const id = req.params.postId
    const conn = await connect()
    await conn.query('UPDATE diagnosticosequipos SET ? WHERE id = ?', [body, id])
    return res.json({
        message: '¡¡Registro modificado!!'
    })
}

export async function deleteDiagnostico(req: Request, res: Response) {
    const id = req.params.postId
    const conn = await connect()
    await conn.query('DELETE FROM diagnosticosequipos WHERE id=?', [id])

    res.json({ message: 'ELIMINADO!' })
}

export async function getDiagnosticoFactura(req: Request, res: Response): Promise<Response> {
    const idCliente = req.params.postId
    const conn = await connect()
    const diagCliente = await conn.query(`SELECT d.*, e.idCliente, e.marca, e.serie, e.modelo, e.tipo, e.usuario
    FROM diagnosticosequipos d
    INNER JOIN equiposcliente e
    ON d.idEquipo = e.idEquipo
    WHERE e.idCliente = ${idCliente}
    AND d.fechaSalida = '0000-00-00'
    AND NOT EXISTS (SELECT df.idDiagnostico FROM detalle_factura df WHERE d.id = df.idDiagnostico)
    ORDER BY d.fechaSalida`, [idCliente])
    
    return res.json(diagCliente[0])
}

export async function getDiagCortoFactura(req: Request, res: Response): Promise<Response> {
    const idDiagnostico = req.params.postId
    const conn = await connect()
    const diagnostico = await conn.query(`SELECT d.*, e.marca, e.serie, e.modelo
    FROM diagnosticosequipos d
    INNER JOIN equiposcliente e
    ON d.idEquipo = e.idEquipo
    WHERE d.id = ${idDiagnostico}`)
    return res.json(diagnostico[0])
}