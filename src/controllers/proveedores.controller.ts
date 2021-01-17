import { Request, Response } from 'express'
import { connect } from '../database'
import { Proveedor } from '../interface/proveedor'

export async function getProveedores(req: Request, res: Response): Promise<Response | void> {
    try {
        const conn = await connect()
        const proveedores = await conn.query('SELECT * FROM proveedores ORDER BY id DESC')
        return res.json(proveedores[0])
    } catch (e) {
        console.log(e)
    }
}

export async function getProveedor(req: Request, res: Response): Promise<Response> {
    const id = req.params.postId
    const conn = await connect()
    const proveedor = await conn.query('SELECT * FROM proveedores WHERE id=?', [id])
    return res.json(proveedor[0])
}

export async function createProveedor(req: Request, res: Response) {
    const newProveedor: Proveedor = req.body
    const conn = await connect()
    await conn.query('INSERT INTO proveedores SET ?', [newProveedor])
    return res.json({
        message: '¡¡Proveedor creado!!'
    })
}

export async function updateProveedor(req: Request, res: Response) {
    const body: Proveedor = req.body
    const id = req.params.postId
    const conn = await connect()
    await conn.query('UPDATE proveedores SET ? WHERE id = ?', [body, id])
    return res.json({
        message: '¡¡Registro modificado!!'
    })
}