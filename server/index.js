// Libraries
import cors from "cors"
import express from "express"
import chalk from "chalk"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import { fileURLToPath } from 'url'
// Routers
import {profileRouter} from "./routers/profile-router.js"
import {authRouter} from "./routers/auth-router.js"
// Middleware
import {ErrorMiddleware} from "./middlewares/error-middleware.js"
import {settingsRouter} from "./routers/settings-router.js";

dotenv.config()

const PORT = process.env.PORT || 5000
const errorMsg = chalk.bgRed
const successMsg = chalk.bgGreen

const app = express()


app.use('/uploads', express.static('./uploads'))
app.use(express.json({ extended: true }))
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use('/api/auth', authRouter)
app.use('/api/profile', profileRouter)
app.use('/api/settings', settingsRouter)
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