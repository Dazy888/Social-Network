import { Injectable, NestMiddleware } from "@nestjs/common"
import { Request, Response, NextFunction } from "express"
import { checkToken } from "../auth/auth.controller"
import { validateToken } from "../auth/auth.service"

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const authorization = req.headers['authorization']

        if (!authorization) return res.status(401).json({ message: 'Unauthorized' })

        const accessToken = authorization.split(' ')[1]
        try {
            checkToken(accessToken)
            validateToken(accessToken, process.env.JWT_ACCESS_SECRET)
            next()
        } catch (error) {
            return res.status(401).json({ message: 'Unauthorized' })
        }
    }
}
