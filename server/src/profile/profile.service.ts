import * as path from "path"
import { Model } from "mongoose"
import { v4 } from "uuid"
import { Storage } from "@google-cloud/storage"
import { Injectable } from '@nestjs/common'
import { InjectModel } from "@nestjs/mongoose"
// Schemas
import { UserDocument } from "../schemas/user.schema"
import { PostDocument } from "../schemas/post.schema"
import { ProfileDocument } from "../schemas/profile.schema"
import { SubscriptionsDocument } from "../schemas/subscriptions.schema"
// Types
import { ImageFields, ProfileIntroFields } from "./dtos/profile.dtos"

@Injectable()
export class ProfileService {
    constructor(
        @InjectModel('User') private userModel: Model<UserDocument>, @InjectModel('Profile') private profileModel: Model<ProfileDocument>,
        @InjectModel('Post') private postModel: Model<PostDocument>, @InjectModel('Subscriptions') private subscriptionsModel: Model<SubscriptionsDocument>
    ) {}

    async setProfileIntro(text: string, field: ProfileIntroFields, userId: string) {
        await this.profileModel.findOneAndUpdate({ userId }, { [field]: text })
    }

    async createPost(text: string, userId: string) {
        return this.postModel.create({ text, userId })
    }

    async deletePost(postId: string) {
        await this.postModel.findOneAndDelete({ postId })
    }

    async getAvatar(userId: string) {
        return this.profileModel.findOne({ userId }, { avatar: 1 })
    }

    async toggleSubscription(authorizedUserId: string, openedUserId: string, isFollow: boolean) {
        const updateQuery = isFollow ? { $push: { followers: authorizedUserId } } : { $pull: { followers: authorizedUserId } }
        const updateQuery2 = isFollow ? { $push: { following: openedUserId } } : { $pull: { following: openedUserId } }

        await this.subscriptionsModel.updateOne({ userId: openedUserId }, updateQuery)
        await this.subscriptionsModel.updateOne({ userId: authorizedUserId }, updateQuery2)
    }

    async follow(authorizedUserId: string, openedUserId: string) {
        await this.toggleSubscription(authorizedUserId, openedUserId, true)
    }

    async unfollow(authorizedUserId: string, openedUserId: string) {
        await this.toggleSubscription(authorizedUserId, openedUserId, false)
    }

    async setProfileInfo(userId: string, name: string, location: string) {
        return this.profileModel.findOneAndUpdate({ userId }, { name, location })
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

    async uploadProfileImage(userId: string, image: Express.Multer.File, field: ImageFields) {
        const profile: ProfileDocument = await this.profileModel.findOne({ userId })

        await this.deleteFile(profile[field])
        const publicLink = await this.uploadFile(image, profile.name + '-' + field)
        await this.profileModel.findOneAndUpdate({ userId }, { [field]: publicLink })

        const updatedUser: UserDocument = await this.profileModel.findOne({ userId })
        return { src: updatedUser[field], field }
    }
}
