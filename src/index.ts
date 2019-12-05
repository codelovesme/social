import express, { Express, Response, Request } from 'express'
import bodyParser from 'body-parser'
import { createDB } from './db'

const app: Express = express()
const port: number = 3000
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
        return db.save(body)
    })
)

app.put(
    'api/post/:id',
    handleRequest(async ({ body, params }) => {
        const id: string = params['id']
        return db.save({ id }, body)
    })
)

app.delete(
    'api/post/:id',
    handleRequest(async ({ params }) => {
        return db.remove({ id: params['id'] })
    })
)
/**
 * Start Server
 */
app.listen(port, () => console.log(`listening on port ${port}!`))

export default  app;
