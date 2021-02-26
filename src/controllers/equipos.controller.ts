import { Request, Response } from 'express'
import { connect } from '../database'
import { Equipo } from '../interface/equipo'

export async function getEquipos(req: Request, res: Response): Promise<Response | void> {
    try {
        const conn = await connect()
        const equipos = await conn.query('SELECT e.*, c.nombre FROM equiposcliente e LEFT JOIN clientes c ON c.id = e.idCliente ORDER BY e.idEquipo DESC')
        return res.json(equipos[0])
    } catch (e) {
        console.log(e)
    }
}

export async function getEquipo(req: Request, res: Response): Promise<Response> {
    const idEquipo = req.params.postId
    const conn = await connect()
    const equipo = await conn.query('SELECT e.*, c.nombre as propietario FROM equiposcliente e LEFT JOIN clientes c ON c.id = e.idCliente WHERE e.idEquipo=?', [idEquipo])
    return res.json(equipo[0])
}

export async function getEquiposCliente(req: Request, res: Response): Promise<Response> {
    const idCliente = req.params.postId
    const conn = await connect()
    const equipos = await conn.query('Select ec.* from equiposcliente ec LEFT JOIN clientes cli ON cli.id = ec.idCliente Where cli.id  = ? ORDER BY ec.idEquipo  DESC', [idCliente])
    return res.json(equipos[0])
}

export async function createEquipo(req: Request, res: Response) {
    const newEquipo: Equipo = req.body
    const conn = await connect()
    await conn.query('INSERT INTO equiposcliente SET ?', [newEquipo])
    return res.json({
        message: '¡¡Equipo creado!!'
    })
}

export async function updateEquipo(req: Request, res: Response) {
    const body: Equipo = req.body
    const idEquipo = req.params.postId
    const conn = await connect()
    await conn.query('UPDATE equiposcliente SET ? WHERE idEquipo = ?', [body, idEquipo])
    return res.json({
        message: '¡¡Registro modificado!!'
    })
}