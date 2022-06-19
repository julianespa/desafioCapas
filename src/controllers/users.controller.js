import { loggerConsole, loggerWarn } from "../services/users.services.js";

export const getHome = async (req,res) => {
    res.render('home',{prueba:0})
    loggerConsole.info(`${req.method} to ${req.get('host')}${req.originalUrl}`)
}

export const getSignup = async (req,res) => {
    if(req.isAuthenticated()) return res.redirect('/profile')
    res.render('signup')
    loggerConsole.info(`${req.method} to ${req.get('host')}${req.originalUrl}`)
}

export const getLogin = async (req,res) => {
    if(req.isAuthenticated()) return res.redirect('/profile')
    res.render('login')
    loggerConsole.info(`${req.method} to ${req.get('host')}${req.originalUrl}`)
}

export const getProfile = async (req,res) => {
    res.render('profile',{user:req.session.passport.user.username})
    loggerConsole.info(`${req.method} to ${req.get('host')}${req.originalUrl}`)
}

export const getLogout = async (req,res) => {
    if(req.isAuthenticated()) {
        req.logOut()
        res.render('logout') 
    } else {
        res.redirect('/')
    }
    loggerConsole.info(`${req.method} to ${req.get('host')}${req.originalUrl}`)
}

export const getUserExist = async (req,res) => {
    res.render('userExist')
    loggerConsole.info(`${req.method} to ${req.get('host')}${req.originalUrl}`)     
}

export const getInvalidPassword = async (req,res) => {
    res.render('invalidPassword')
    loggerConsole.info(`${req.method} to ${req.get('host')}${req.originalUrl}`)
}

export const postSignup = async (req,res) => {
    res.redirect('/profile')
    loggerConsole.info(`${req.method} to ${req.get('host')}${req.originalUrl}`)
}

export const postLogin = async (req,res) => {
    res.redirect('/profile')
    loggerConsole.info(`${req.method} to ${req.get('host')}${req.originalUrl}`)
}

export const getWrong = async (req,res) => {
    loggerConsole.warn(`${req.method} to ${req.get('host')}${req.originalUrl}`)
    loggerWarn.warn(`${req.method} to ${req.get('host')}${req.originalUrl}`)
}