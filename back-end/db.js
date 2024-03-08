import express from 'express';

const app = express()
const PORT = 8000;

app.listen(PORT, () => {
    console.log(`App is listening at http://localhost:${PORT}`)
})


app.get('/', (req, res) => {
    res.send('Receive successfully')
})