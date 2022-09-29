import {UserModel} from "../models/user-model.js"
import {ApiError} from "../exceptions/api-error.js"
import * as fs from "fs";
import {PostDto} from "../dtos/post-dto.js";
import {PostModel} from "../models/post-model.js";

class UserService {
    async changeName(name, id) {
        const user = await UserModel.findOne({id})

        user.name = name
        user.save()

        return user.name
    }

    async changeLocation(location, id) {
        const user = await UserModel.findOne({id})

        user.location = location
        user.save()

        return user.location
    }

    async changeBanner(path, id, currentPath) {
        const user = await UserModel.findOne({id})
        const lastPath = `uploads${currentPath.split('uploads')[1]}`
        fs.unlink(lastPath, (err) => err ? console.log(err) : console.log('File was deleted'))

        user.banner = `http://localhost:5000/${path}`
        user.save()

        return user.banner
    }

    async changAvatar(path, id, currentPath) {
        const user = await UserModel.findOne({id})
        const lastPath = `uploads${currentPath.split('uploads')[1]}`
        fs.unlink(lastPath, (err) => err ? console.log(err) : console.log('File was deleted'))

        user.avatar = `http://localhost:5000/${path}`
        user.save()

        return user.avatar
    }

    async changeAboutMe(text, id) {
        const user = await UserModel.findOne({id})
        user.aboutMe = text
        user.save()

        return user.aboutMe
    }

    async changeHobbies(text, id) {
        const user = await UserModel.findOne({id})
        user.hobbies = text
        user.save()

        return user.hobbies
    }

    async changeSkills(text, id) {
        const user = await UserModel.findOne({id})
        user.skills = text
        user.save()

        return user.skills
    }

    async addPost(text, id) {
        const user = await UserModel.findOne({id})
        const postModel = await PostModel.create({text, date: new Date()})
        const post = new PostDto(postModel)
        user.posts = [...user.posts, post]
        user.save()

        return post
    }

    async deletePost(postId, userId) {
        const user = await UserModel.findOne({userId})
        const posts = user.posts

        for (let i = 0; i < posts.length; i++) if (posts[i].id === postId) posts.splice(i,1)

        user.save()
        return posts
    }

    async activate(activationLink) {
        const user = await UserModel.findOne({activationLink})
        if (!user) throw ApiError.BadRequest('Invalid activation link')

        user.isActivated = true
        user.save()
    }
}

export default new UserService()