import cors from "cors"
import express from "express"
import chalk from "chalk"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import router from "./router/index.js"
import {ErrorMiddleware} from "./middlewares/error-middleware.js";

dotenv.config()

const PORT = process.env.PORT || 5000
const errorMsg = chalk.bgRed
const successMsg = chalk.bgGreen

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use('/api', router)
app.use(ErrorMiddleware)

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
                .then(res => console.log(successMsg('Connected to DB')))
                .catch(error => console.log(errorMsg(error.message)))
    } catch (e) {
        console.log(e)
    }
    app.listen(PORT, (error) => error ? console.log(errorMsg(error.message)) : console.log(successMsg(`Server started on ${PORT} PORT`)))
}

start()