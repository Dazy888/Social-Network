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
    photographs;
    email;


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
        this.photographs = model.photographs
        this.email = model.email
    }
}