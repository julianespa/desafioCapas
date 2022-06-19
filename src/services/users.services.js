import { User } from "../models/User.js";
import passport from "passport";
import bcrypt from 'bcrypt'
import {Strategy as LocalStrategy} from 'passport-local'
import log4js from 'log4js'


passport.serializeUser((user,done)=>{return done(null,user)})
passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
        return done(err,user.id)
    })
})

const createHash = (password) => {
    return bcrypt.hashSync(
        password,
        bcrypt.genSaltSync(10)
    )
}

export const isUserLogged = (req,res,next)=>{
    if(req.isAuthenticated()) return next()
    res.redirect('/login')
}

passport.use('signupStrategy', new LocalStrategy(
    (username, password, done)=>{
        User.findOne({username:username},(err,user)=>{
            if(err) return done(err)
            if(user) return done(null,false,{message:'user already register'})

            const newUser = {
                username: username,
                password: createHash(password)
            }

            User.create(newUser,(err,userCreated)=>{
                if(err) return done(err)
                return done(null,userCreated)
            })
        })
    }
))

passport.use('loginStrategy', new LocalStrategy(
    (username, password, done)=>{
        User.findOne({username:username},(err,userFound)=>{
            if(err) return done(err)
            if(!userFound) return done(null,false,{message:'user dont exist'})
            if(!bcrypt.compareSync(password,userFound.password)) return done(null,false,{message:'invalid password'})
            return done(null,userFound)
        })
    }
))

log4js.configure({
    appenders: {
        miLoggerConsole: { type: 'console' },
        miLoggerFile: { type: 'file', filename: 'logs/warns.log' },
        miLoggerFile2: { type: 'file', filename: 'logs/errors.log' }
    },
    categories: {
        default: { appenders: ['miLoggerConsole'], level: 'info' },
        archivo: { appenders: ['miLoggerFile'], level: 'warn' },
        archivo2: { appenders: ['miLoggerFile2'], level: 'error' },
    }
})

export let loggerConsole = log4js.getLogger()
export let loggerWarn = log4js.getLogger('archivo')
export let loggerError = log4js.getLogger('archivo2')