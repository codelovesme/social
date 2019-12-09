import app from './app'
const port: number = 3000

/**
 * Start Server
 */
app.listen(port, () => console.log(`listening on port ${port}!`))
