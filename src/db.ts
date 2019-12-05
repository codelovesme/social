import { MongoClient, QuerySelector, Collection, FilterQuery } from 'mongodb'

type Disconnect = Function

const url = 'mongodb://localhost'
const databaseName = 'social'

const connect = async (): Promise<[Collection, Disconnect]> => {
    const client = await MongoClient.connect(url)
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
        return getResult(await collection.find(query).toArray())
    },

    remove: async (selector: object) => {
        const [collection, getResult] = await connect()
        return getResult(await collection.remove(selector))
    },
    save: async (doc: T, query?: FilterQuery<any>) => {
        const [collection, getResult] = await connect()
        return getResult(query ? await collection.updateOne(query, doc, { upsert: true }) : await collection.save(doc))
    },
})
