import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
    date: { type: Date},
    text: { type: String},
})

export const PostModel = mongoose.model('Post', PostSchema)