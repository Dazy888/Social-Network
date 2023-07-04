export class UserDto {
    userName
    pass
    isActivated
    activationLink
    email

    constructor(model) {
        this.userName = model.userName
        this.pass = model.pass
        this.isActivated = model.isActivated
        this.email = model.email
        this.activationLink = model.activationLink
    }
}
