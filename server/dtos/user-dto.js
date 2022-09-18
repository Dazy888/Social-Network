export class UserDto {
    userLogin;
    id;
    isActivated;
    name;
    location;
    banner;
    avatar;
    aboutMe;
    skills;
    hobbies;
    posts;
    photographs;


    constructor(model) {
        this.userLogin = model.userLogin
        this.id = model.id
        this.isActivated = model.isActivated
        this.name = model.name
        this.location = model.location
        this.banner = model.banner
        this.avatar = model.avatar
        this.aboutMe = model.aboutMe
        this.skills = model.skills
        this.hobbies = model.hobbies
        this.posts = model.posts
        this.photographs = model.photographs
    }
}