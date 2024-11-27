import { Response } from 'express'
import jwt from 'jsonwebtoken'
import { IUserDocument } from '../models/userModel.js'

export const generateToken = (response: Response, user: IUserDocument) => {
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY!, { expiresIn: '1d' })
    response.cookie('token', token, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000
    })
    return token
}