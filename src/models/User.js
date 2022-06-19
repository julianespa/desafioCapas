import mongoose from 'mongoose'

const usersCollection = 'users'

const userSchema = new mongoose.Schema({
    username: {type:String, required:true},
    password: {type:String, required:true},
})

export const User = mongoose.model(usersCollection,userSchema)