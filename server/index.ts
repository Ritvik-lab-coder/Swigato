import express from 'express'
import dotenv from 'dotenv'
import connectDB from './database/connectDB.js'

const app = express()

dotenv.config()

const PORT = process.env.PORT || 5000

connectDB()

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})