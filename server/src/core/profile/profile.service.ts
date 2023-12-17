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
import { SubscriptionDocument } from "../schemas/subscription.schema"
// Types
import { ImageFields, ProfileIntroFields } from "./dtos/profile.dtos"

@Injectable()
export class ProfileService {
    private readonly storage: Storage;
    private readonly bucketName: string;

    constructor(
        @InjectModel('User') private userModel: Model<UserDocument>, @InjectModel('Profile') private profileModel: Model<ProfileDocument>,
        @InjectModel('Post') private postModel: Model<PostDocument>, @InjectModel('Subscription') private subscriptionsModel: Model<SubscriptionDocument>
    ) {
        this.storage = new Storage({ projectId: process.env.CLOUD_STORAGE_ID, keyFilename: path.join(__dirname, '..', '..', 'src', 'config', 'key.json') })
        this.bucketName = process.env.CLOUD_BUCKET_NAME;
    }

    async updateIntro(text: string, field: ProfileIntroFields, userId: string) {
        await this.profileModel.findOneAndUpdate({ userId }, { [field]: text })
    }

    async createPost(text: string, userId: string) {
        return this.postModel.create({ text, userId })
    }

    async deletePost(id: string) {
        await this.postModel.findOneAndDelete({ id })
    }

    async getAvatar(userId: string) {
        const profile = await this.profileModel.findOne({ userId }, { avatar: 1, _id: 0 })
        return profile.avatar
    }

    async updateProfileInfo(userId: string, name: string, location: string) {
        return this.profileModel.findOneAndUpdate({ userId }, { name, location })
    }

    async uploadFile(file: Express.Multer.File, name: string, path: string): Promise<string> {
        const uniqueFilename = v4() + '-' + name
        const blob = this.storage.bucket(this.bucketName).file(`${path}/${uniqueFilename}`)

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

    async deleteFile(imagePath: string, matcher: RegExp) {
        const bucket = await this.storage.bucket(this.bucketName)
        const fileName = imagePath.match(matcher)

        if (fileName) {
            const file = await bucket.file(fileName[0])
            await file.delete()
        }
    }

    async updateProfileImage(userId: string, image: Express.Multer.File, field: ImageFields) {
        const profile: ProfileDocument = await this.profileModel.findOne({ userId })

        await this.deleteFile(profile[field] || '', /profiles\/(?:avatars|banners)\/([^\/?]+)-[^\/?]+-(?:avatar|banner)/)
        const publicLink = await this.uploadFile(image, profile.name + '-' + field, `profiles/${field}s`)
        await this.profileModel.findOneAndUpdate({ userId }, { [field]: publicLink })

        const updatedImageSrc = await this.profileModel.findOne({ userId }, { [field]: 1, _id: 0 }).lean()
        return { src: updatedImageSrc[field], field }
    }

    async follow(authorizedUserId: string, openedUserId: string) {
        await this.subscriptionsModel.create({ followedUserId: openedUserId, userId: authorizedUserId })
    }

    async unfollow(userId: string) {
        await this.subscriptionsModel.deleteOne({ userId })
    }
}
