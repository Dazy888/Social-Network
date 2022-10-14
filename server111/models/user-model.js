import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    userLogin: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isActivated: { type: Boolean, default: false },
    activationLink: { type: String },
    email: { type: String },
    name: {type: String},
    location: {type: String},
    banner: {type: String},
    avatar: {type: String},
    aboutMe: {type: String},
    skills: {type: String},
    hobbies: {type: String},
    photographs: {type: Array}
})

export const UserModel = mongoose.model('User', UserSchema)