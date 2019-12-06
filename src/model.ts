import { isUUID } from './tools'
export interface PostData {
    text: string
    userId: string
}
export interface Post extends PostData {
    id: string
    createdAt: number
}

export const isPostData = (x: any): x is PostData => {
    return (
        typeof x === 'object' &&
        typeof x.text === 'string' &&
        typeof x.userId === 'string' &&
        x.userId &&
        isUUID(x.userId)
    )
}

export const isPost = (x: any): x is Post => {
    return typeof x.id === 'string' && x.id && isUUID(x.id) && typeof x.createdAt === 'number' && isPostData(x)
}
