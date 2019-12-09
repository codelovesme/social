import express, { Express, Response, Request } from 'express'
import bodyParser from 'body-parser'
import { createDB } from './db'
import { isPostData, isPost } from './model'
import { isUUID } from './tools'

const app: Express = express()
const db = createDB()

const handleRequest = (
    callback: (args: { body: object; params: { [x: string]: string } }) => Promise<any>
): ((req: Request, res: Response) => Promise<Response>) => {
    return async (req: Request, res: Response): Promise<Response> => {
        try {
            const result = await callback({ body: req.body, params: req.params })
            return res.send({ status: 'Success', data: result })
        } catch (e) {
            return res.status(500).send({ status: 'Error', data: e })
        }
    }
}

app.use(bodyParser.json())

/**
 * Routes
 */
app.get(
    '/api/post',
    handleRequest(async () => {
        return db.read()
    })
)

app.post(
    '/api/post',
    handleRequest(async ({ body }) => {
        if (!isPostData(body)) throw 'Invalid post data'
        return db.save(body)
    })
)

app.put(
    '/api/post/:id',
    handleRequest(async ({ body, params }) => {
        const id: string = params['id']
        if (!isUUID(id)) throw 'Invalid id'
        if (!isPost(body)) throw 'Invalid post'
        return db.save(body, { id })
    })
)

app.delete(
    '/api/post/:id',
    handleRequest(async ({ params }) => {
        const id: string = params['id']
        if (!isUUID(id)) throw 'Invalid id'
        return db.remove({ id })
    })
)

export default app
