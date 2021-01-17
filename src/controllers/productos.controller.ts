import { Request, Response } from 'express'
import { connect } from '../database'
import { Producto } from '../interface/producto'

export async function getProductos(req: Request, res: Response): Promise<Response | void> {
    try {
        const conn = await connect()
        const productos = await conn.query('SELECT * FROM productos ORDER BY idProducto DESC')
        return res.json(productos[0])
    } catch (e) {
        console.log(e)
    }
}

export async function getProducto(req: Request, res: Response): Promise<Response> {
    const id = req.params.postId
    const conn = await connect()
    const producto = await conn.query('SELECT * FROM productos WHERE idProducto=?', [id])
    return res.json(producto[0])
}

export async function createProducto(req: Request, res: Response) {
    const newProducto: Producto = req.body
    const conn = await connect()
    await conn.query('INSERT INTO productos SET ?', [newProducto])
    return res.json({
        message: '¡¡Producto creado!!'
    })
}

export async function updateProducto(req: Request, res: Response) {
    const body: Producto = req.body
    const id = req.params.postId
    const conn = await connect()
    await conn.query('UPDATE productos SET ? WHERE idProducto = ?', [body, id])
    return res.json({
        message: '¡¡Registro modificado!!'
    })
}

export async function getProductosVenta(req: Request, res: Response): Promise<Response | void> {
    try {
        const conn = await connect()
        const productos = await conn.query(`SELECT * FROM productos WHERE tipo = 'venta' ORDER BY idProducto DESC`)
        return res.json(productos[0])
    } catch (e) {
        console.log(e)
    }
}