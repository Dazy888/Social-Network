// Libraries
import cors from "cors"
import express from "express"
import chalk from "chalk"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import path from "path"
import { fileURLToPath } from 'url'
// Routers
import {userRouter} from "./routers/user-router.js"
import {authRouter} from "./routers/auth-router.js"
// Middleware
import {ErrorMiddleware} from "./middlewares/error-middleware.js"

dotenv.config()

const PORT = process.env.PORT || 5000
const errorMsg = chalk.bgRed
const successMsg = chalk.bgGreen

const app = express()


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(express.json({ extended: true }))
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use(ErrorMiddleware)

const start = async () => {
    try {
        mongoose.connect(process.env.DB_URL,  {useNewUrlParser: true, useUnifiedTopology: true}, () => console.log(successMsg('Connected to DB')))
    } catch (e) {
        console.log(e)
    }

    app.listen(PORT, (error) => error ? console.log(errorMsg(error.message)) : console.log(successMsg(`Server started on ${PORT} PORT`)))
}

start()