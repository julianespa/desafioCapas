import passport from "passport";
import { isUserLogged } from "../services/users.services.js";
import { Router } from "express";
import { getHome, getInvalidPassword, getLogin, getLogout, getProfile, getSignup, getUserExist, getWrong, postLogin, postSignup } from "../controllers/users.controller.js";

export const router = Router()

router.get('/',getHome)

router.get('/signup',getSignup)

router.get('/login',getLogin)

router.get('/profile',isUserLogged,getProfile)

router.get('/logout',getLogout)

router.get('/userExist',getUserExist)

router.get('/invalidPassword',getInvalidPassword)

router.get('*',getWrong)

router.post('/signup',passport.authenticate('signupStrategy',{
    failureRedirect: '/userExist'
}),postSignup)

router.post('/login',passport.authenticate('loginStrategy',{
    failureRedirect: '/invalidPassword'
}),postLogin)