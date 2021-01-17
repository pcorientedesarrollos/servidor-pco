import { Request, Response } from 'express'
import { connect } from '../database'
import { Post } from '../interface/post'

export async function getPosts(req: Request, res: Response): Promise<Response | void> {
    try {
        const conn = await connect()
        const posts = await conn.query('SELECT * FROM posts')
        return res.json(posts[0])
    } catch (e) {
        console.log(e)
    }
}

export async function createPost(req: Request, res: Response) {
    const newPost: Post = req.body
    console.log(newPost)
    const conn = await connect()
    const posts = await conn.query('INSERT INTO posts SET ?', [newPost])
    return res.json({
        message: 'POST creado'
    })

}

export async function getPost(req: Request, res: Response): Promise<Response> {
    const id = req.params.postId
    const conn = await connect()
    const posts = await conn.query('SELECT * FROM posts WHERE id=?', [id])
    return res.json(posts[0])

}

export async function deletePost(req: Request, res: Response) {
    const id = req.params.postId
    const conn = await connect()
    await conn.query('DELETE FROM posts WHERE id=?', [id])
    return res.json({
        message: 'Registro borrado'
    })

}

export async function updatePost(req: Request, res: Response) {
    const body: Post = req.body
    const id = req.params.postId
    const conn = await connect()
    await conn.query('UPDATE posts SET ? WHERE id = ?', [body, id])
    return res.json({
        message: 'Archivo modificado'
    })

}

