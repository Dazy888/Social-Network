import * as fs from "fs"
// Models
import {UserModel} from "../models/user-model.js"
import {PostDto} from "../dtos/post-dto.js"
import {PostModel} from "../models/post-model.js"

class ProfileService {
    async changeName(name, id) {
        await UserModel.findByIdAndUpdate({_id: id}, {name: name})
        return name
    }

    async changeLocation(location, id) {
        await UserModel.findByIdAndUpdate({_id: id}, {location: location})
        return location
    }

    async changeBanner(path, id, currentPath) {
        const lastPath = `uploads${currentPath.split('uploads')[1]}`
        fs.unlink(lastPath, (err) => err ? console.log(err) : console.log('File was deleted'))

        await UserModel.findByIdAndUpdate({_id: id}, {banner: path})
        return path
    }

    async changAvatar(path, id, currentPath) {
        const lastPath = `uploads${currentPath.split('uploads')[1]}`
        fs.unlink(lastPath, (err) => err ? console.log(err) : console.log('File was deleted'))

        await UserModel.findByIdAndUpdate({_id: id}, {avatar: path})
        return path
    }

    async changeAboutMe(text, id) {
        await UserModel.findByIdAndUpdate({_id: id}, {aboutMe: text})
        return text
    }

    async changeHobbies(text, id) {
        await UserModel.findByIdAndUpdate({_id: id}, {hobbies: text})
        return text
    }

    async changeSkills(text, id) {
        await UserModel.findByIdAndUpdate({_id: id}, {skills: text})
        return text
    }

    async createPost(text, id) {
        const postModel = await PostModel.create({text, date: new Date(), user: id})
        return new PostDto(postModel)
    }

    async deletePost(postId, userId) {
        await PostModel.findByIdAndDelete({_id: postId})
        return UserModel.findOne({userId})
    }
}

export default new ProfileService()