import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

declare global {
    namespace Express {
        interface Request {
            id: string;
        }
    }
}

export const isAuthenticated = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const token = request.cookies.token
        if (!token) {
            return response.status(401).json({
                success: false,
                message: 'Unauthorized'
            })
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY!) as jwt.JwtPayload
        if (!decoded) {
            return response.status(401).json({
                success: false,
                message: 'Unauthorized'
            })
        }
        request.id = decoded.userId
        next()
    } catch (error) {
        console.log(error)
        return response.status(500).json({
            success: false,
            message: 'Internal Server Error',
        })
    }
}