import fetchApiHavforData from './fetchApiHavforData.js'
import express from 'express'
const app = express()
const port = 1338

const fetchAnoData = async () => {

    // deeply nested json data - not suitable for PowerBI
    const rawHavforData = await fetchApiHavforData()

    // need data on this format - suitable for PowerBI
    return rawHavforData
}

app.get('/', (req, res) => {
    res.send('Server is running - v1.0.0')
})

app.get('/v1/havfor', async (req, res) => {
    const anoData = await fetchAnoData()
    res.send(anoData)
})

app.listen(port, () => {
    console.info(`HAVFOR transport proxy started - now listening on port ${port}`)
})
