"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDto = void 0;
class UserDto {
    constructor(model) {
        this.userName = model.userName;
        this.pass = model.pass;
        this.isActivated = model.isActivated;
        this.email = model.email;
        this.activationLink = model.activationLink;
    }
}
exports.UserDto = UserDto;
//# sourceMappingURL=user.dto.js.map