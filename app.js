import express from "express";
import { loggerConsole } from "./src/services/users.services.js";
import {router} from './src/routes/users.routes.js'
import {dirname} from 'path'
import { fileURLToPath } from "url";
import dotenv from 'dotenv'
import {mongoConfig} from './src/models/config.models.js'
import passport from 'passport'
import session from 'express-session'

dotenv.config()

const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()
const PORT = process.env.PORT || 8080
const server = app.listen(PORT,()=>{
   loggerConsole.info(`Listening on port ${PORT}`)
})

app.set('views', __dirname+'/src/views')
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(session({
    secret: process.env.SECRET,
    resave:true,
    saveUninitialized:true,
    cookie:{
        expires: 30000
    }
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/',router)