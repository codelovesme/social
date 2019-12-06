export const isUUID = (x: string) => {
    const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    const result = x.match(regex)
    return result instanceof Array && result.length === 1
}
