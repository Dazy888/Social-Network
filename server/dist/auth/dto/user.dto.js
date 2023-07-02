"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDto = void 0;
class UserDto {
    constructor(model) {
        this.login = model.login;
        this.pass = model.pass;
        this.isActivated = model.isActivated;
        this.name = model.name;
        this.location = model.location;
        this.banner = model.banner;
        this.avatar = model.avatar;
        this.aboutMe = model.aboutMe;
        this.skills = model.skills;
        this.hobbies = model.hobbies;
        this.email = model.email;
        this.followers = model.followers;
        this.following = model.following;
        this.activationLink = model.activationLink;
    }
}
exports.UserDto = UserDto;
//# sourceMappingURL=user.dto.js.map