import { loggerConsole, loggerError } from "../services/users.services.js"
import mongoose from "mongoose"
import dotenv from 'dotenv'

dotenv.config()

const URL = process.env.URL

export const mongoConfig = mongoose.connect(URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
},(err)=>{
    try {
        if(err) throw new Error('unable to connect to DB')
        loggerConsole.info('connected to DB')
    } catch (error) {
        loggerError.error(error)
        loggerConsole.error(error)
    }
})