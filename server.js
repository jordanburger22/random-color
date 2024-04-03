const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
require('dotenv').config()
const PORT = process.env.PORT

app.use(express.json())
app.use(morgan('dev'))

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to DB')
    } catch (err) {
        console.log(err)
    }
}

connectToDB()

app.use('/colors', require('./routes/colorRouter'))

app.use((err, req, res, next) => {
    console.log(err)
    return res.status({errMsg: err.message})
})

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`))