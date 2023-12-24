import * as path from "path"
import { Model } from "mongoose"
import { v4 } from "uuid"
import { Storage } from "@google-cloud/storage"
import { Injectable } from '@nestjs/common'
import { InjectModel } from "@nestjs/mongoose"
// Schemas
import { PostDocument } from "../../schemas/post.schema"
import { ProfileDocument } from "../../schemas/profile.schema"
// Types
import { CreatePostDTO, ImageFields, UpdateUserDTO } from "../../dtos/profile.dto"

@Injectable()
export class ProfileService {
    private readonly storage: Storage;
    private readonly bucketName: string;

    constructor(
        @InjectModel('Profile') private profileModel: Model<ProfileDocument>,
        @InjectModel('Post') private postModel: Model<PostDocument>,
    ) {
        this.storage = new Storage({ projectId: process.env.CLOUD_STORAGE_ID, keyFilename: path.join(__dirname, '..', '..', 'src', 'config', 'key.json') })
        this.bucketName = process.env.CLOUD_BUCKET_NAME;
    }

    updateUser(data: UpdateUserDTO, userId: string) {
        return this.profileModel.findOneAndUpdate({ userId }, data)
    }

    createPost(data: CreatePostDTO) {
        return this.postModel.create(data)
    }

    deletePost(id: string) {
        return this.postModel.findOneAndDelete({ id })
    }

    async getAvatar(userId: string) {
        const profile = await this.profileModel.findOne({ userId }, { avatar: 1 }).lean()
        return profile.avatar
    }

    async uploadFile(file: Express.Multer.File, name: string, path: string): Promise<string> {
        const uniqueFilename = v4() + '-' + name
        const blob = this.storage.bucket(this.bucketName).file(`${path}/${uniqueFilename}`)

        const stream = blob.createWriteStream({
            metadata: {
                contentType: file.mimetype
            }
        })

        await new Promise((resolve, reject) => {
            stream.on('error', reject).on('finish', resolve)
            stream.end(file.buffer)
        })

        const [signedUrl] = await blob.getSignedUrl({ action: 'read', expires: '03-01-2030' })
        return signedUrl
    }

    async deleteFile(imagePath: string, matcher: RegExp) {
        const bucket = this.storage.bucket(this.bucketName)
        const fileName = imagePath.match(matcher)

        if (fileName) {
            const file = bucket.file(fileName[0])
            await file.delete()
        }
    }

    async updateProfileImage(userId: string, image: Express.Multer.File, field: ImageFields) {
        const profile: ProfileDocument = await this.profileModel.findOne({ userId })

        await this.deleteFile(profile[field] || '', /profiles\/(?:avatars|banners)\/([^\/?]+)-[^\/?]+-(?:avatar|banner)/)
        const publicLink = await this.uploadFile(image, profile.name + '-' + field, `profiles/${field}s`)
        await this.profileModel.findOneAndUpdate({ userId }, { [field]: publicLink })

        const updatedImageSrc = await this.profileModel.findOne({ userId }, { [field]: 1 }).lean()
        return {
            src: updatedImageSrc[field],
            field
        }
    }
}
