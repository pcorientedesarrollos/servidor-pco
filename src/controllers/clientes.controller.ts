import { Request, Response } from 'express'
import { connect } from '../database'
import { Cliente } from '../interface/cliente'
import { Telefono } from '../interface/telefono';

export async function getClientes(req: Request, res: Response): Promise<Response | void> {
    try {
        const conn = await connect()
        const clientes = await conn.query('SELECT * FROM clientes ORDER BY id DESC')
        return res.json(clientes[0])
    } catch (e) {
        console.log(e)
    }
}

export async function getCliente(req: Request, res: Response): Promise<Response> {
    const id = req.params.postId
    const conn = await connect()
    const cliente = await conn.query('SELECT * FROM clientes WHERE id=?', [id])
    return res.json(cliente[0])

}

export async function deleteCliente(req: Request, res: Response) {
    const id = req.params.postId
    const conn = await connect()
    await conn.query('DELETE FROM clientes WHERE id=?', [id])

    res.json({ message: 'CLIENTE ELIMINADO!' })
}


export async function createCliente(req: Request, res: Response) {
    const newCliente: Cliente = req.body
    const conn = await connect()
    await conn.query('INSERT INTO clientes SET ?', [newCliente])
    const resp = await conn.query('SELECT LAST_INSERT_ID() as id')
    
    return res.json({
        
        message: 'Cliente creado!!',
        reps: resp[0]
    })
}

export async function updateCliente(req: Request, res: Response) {
    const body: Cliente = req.body
    const id = req.params.postId
    const conn = await connect()
    await conn.query('UPDATE clientes SET ? WHERE id = ?', [body, id])
    return res.json({
        message: 'Archivo modificado'
    })

}

export async function getTelefonosCliente(req: Request, res: Response){
    try {
        const conn = await connect()
        const telefonos = await conn.query('SELECT * FROM telefonos_cliente ')
        return res.json(telefonos[0])
    } catch (e) {
        console.log(e)
    }
}

export async function createTelefono(req: Request, res: Response){
        const newTelefono: Telefono = req.body
        const conn = await connect()
        await conn.query('INSERT INTO telefonos_cliente SET ?', [newTelefono])
        return res.json({
            message: 'Telefono creado!!'
        })
    
}

//Eliminamos el telefono
export async function deleteUnTelefono(req: Request, res: Response) {
    const id = req.params.postId
    const conn = await connect()
    await conn.query('DELETE FROM telefonos_cliente WHERE idTelefono=?', [id])

    res.json({ message: 'Telefono eliminado' })
}