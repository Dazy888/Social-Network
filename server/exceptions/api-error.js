export class ServerErrors {
    static BadRequest(res, message) {
        res.status(400).json(message)
    }

    static UnauthorizedError(res) {
        res.status(401).json('User not authorized')
    }
}