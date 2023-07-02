import * as path from "path"
import { Model } from "mongoose"
import { v4 } from "uuid"
import { Storage } from "@google-cloud/storage"
import { Injectable } from '@nestjs/common'
import { InjectModel } from "@nestjs/mongoose"
import { UserDocument } from "../schemas/user.schema"
import { PostDocument } from "../schemas/post.schema"
import { Field } from "./models/profile.models"

@Injectable()
export class ProfileService {
    constructor(@InjectModel('User') private userModel: Model<UserDocument>, @InjectModel('Post') private postModel: Model<PostDocument>) {}

    async setProfileIntro(text: string, field: Field, _id: string) {
        await this.userModel.findOneAndUpdate({ _id }, { [field]: text })
    }

    async createPost(text: string, userId: string) {
        return this.postModel.create({ text, userId })
    }

    async deletePost(postId: string) {
        await this.postModel.findOneAndDelete({ postId })
    }

    async getAvatar(_id: string) {
        const user = await this.userModel.findOne({ _id })
        return user.avatar
    }

    async follow(authorizedUserId: string, openedUserId: string) {
        await this.userModel.updateOne({ _id: openedUserId }, { $push: { followers: authorizedUserId } })
        await this.userModel.updateOne({ _id: authorizedUserId }, { $push: { following: openedUserId } })
    }

    async unfollow(authorizedUserId: string, openedUserId: string) {
        await this.userModel.updateOne({ _id: openedUserId }, { $pull: { followers: authorizedUserId } })
        await this.userModel.updateOne({ _id: authorizedUserId }, { $pull: { following: openedUserId } })
    }

    async setProfileInfo(_id: string, name: string, location: string) {
        return this.userModel.findOneAndUpdate({ _id }, { name, location })
    }

    async uploadFile(file: Express.Multer.File, name: string): Promise<string> {
        const storage = new Storage({ projectId: 'central-courier-389415', keyFilename: path.join(__dirname, '..', '..', 'src', 'config', 'key.json') })
        const bucketName = 'social-network_dazy'
        const uniqueFilename = v4() + '-' + name
        const blob = storage.bucket(bucketName).file(uniqueFilename)

        const stream = blob.createWriteStream({
            metadata: { contentType: file.mimetype }
        })

        await new Promise((resolve, reject) => {
            stream.on('error', reject).on('finish', resolve)
            stream.end(file.buffer)
        })

        const [signedUrl] = await blob.getSignedUrl({ action: 'read', expires: '03-01-2030' })
        return signedUrl
    }

    async deleteFile(imagePath: string) {
        const storage = new Storage({ projectId: 'central-courier-389415', keyFilename: path.join(__dirname, '..', '..', 'src', 'config', 'key.json') })
        const bucketName = 'social-network_dazy'

        const bucket = await storage.bucket(bucketName)
        const fileName = imagePath.match(/([^\/?]+)-[^\/?]+-(?:avatar|banner)/)

        if (fileName) {
            const file = await bucket.file(fileName[0])
            await file.delete()
        }
    }

    async uploadProfileImage(_id: string, image: Express.Multer.File, field: 'avatar' | 'banner') {
        const user: UserDocument = await this.userModel.findOne({ _id })

        await this.deleteFile(user[field])
        const publicLink = await this.uploadFile(image, user.name + '-' + field)
        await this.userModel.findOneAndUpdate({ _id }, { [field]: publicLink })

        const updatedUser: UserDocument = await this.userModel.findOne({ _id })
        return { src: updatedUser[field], field }
    }
}
