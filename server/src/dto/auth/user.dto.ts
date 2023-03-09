export class UserDto {
    userLogin
    password
    userId
    isActivated
    name
    location
    banner
    avatar
    aboutMe
    skills
    hobbies
    email
    followers
    following
    activationLink

    constructor(model) {
        this.userLogin = model.userLogin
        this.password = model.password
        this.userId = model.userId
        this.isActivated = model.isActivated
        this.name = model.name
        this.location = model.location
        this.banner = model.banner
        this.avatar = model.avatar
        this.aboutMe = model.aboutMe
        this.skills = model.skills
        this.hobbies = model.hobbies
        this.email = model.email
        this.followers = model.followers
        this.following = model.following
        this.activationLink = model.activationLink
    }
}