import express from 'express'
import dotenv from 'dotenv'
import connectDB from './database/connectDB.js'
import userRoute from './routes/userRoute.js'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { createECDH } from 'crypto'

const app = express()

dotenv.config()

const PORT = process.env.PORT || 5000

connectDB()

const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true
}

app.use(bodyParser.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))
app.use('/api/v1/user', userRoute)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})