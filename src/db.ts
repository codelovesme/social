import { MongoClient, Collection, FilterQuery } from 'mongodb'
import { v4 as createUUID } from 'uuid'

type Disconnect = Function

const url = 'mongodb://localhost:27017'
const databaseName = 'social'

const connect = async (): Promise<[Collection, Disconnect]> => {
    const client = await MongoClient.connect(url, { useUnifiedTopology: true })
    const collection = client.db(databaseName).collection('posts')
    const getResult = (result: any) => {
        client.close()
        return result
    }
    return [collection, getResult]
}

export const createDB = <T extends object>() => ({
    read: async (query?: FilterQuery<T>) => {
        const [collection, getResult] = await connect()
        return getResult(
            await collection
                .find(query)
                .sort({ createdAt: 1 })
                .toArray()
        )
    },
    remove: async (selector: object) => {
        const [collection, getResult] = await connect()
        return getResult(await collection.deleteOne(selector))
    },
    save: async (doc: T, query?: FilterQuery<any>) => {
        const [collection, getResult] = await connect()
        return getResult(
            query
                ? await collection.updateOne(query, { $set: doc }, { upsert: true })
                : await collection.insertOne({ ...doc, id: createUUID(), createdAt: new Date().getTime() })
        )
    },
})
