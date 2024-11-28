import { Request, Response } from 'express'
import { userModel } from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import cloudinary from '../utils/cloudinary.js'
import { generateVerificationToken } from '../utils/generateVerificationCode.js'
import { generateToken } from '../utils/generateToken.js'
import { sendPasswordResetEmail, sendResetSuccessEmail, sendVerificationEmail, sendWelcomeEmail } from '../mailtrap/email.js'

export const signup = async (request: Request, response: Response): Promise<void> => {
    try {
        const { fullname, email, password, contact } = request.body
        let user = await userModel.findOne({ email })
        if (user) {
            response.status(400).json({
                success: false,
                message: 'Email already exists',
            })
            return
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const verificationToken = generateVerificationToken()
        user = await userModel.create({
            name: fullname,
            password: hashedPassword,
            email: email,
            phone: Number(contact),
            verificationToken,
            verificationTokenExpires: Date.now() + 24 * 60 * 60 * 1000
        })
        await generateToken(response, user)
        await sendVerificationEmail(user.email, verificationToken)
        const userNoPassword = await userModel.findOne({ email }).select('-password')
        response.status(201).json({
            success: true,
            message: "Account created successfully",
            user: userNoPassword
        })
        return
    } catch (error) {
        console.log(error)
        response.status(500).json({
            success: false,
            message: 'Internal Server Error',
        })
        return
    }
}

export const login = async (request: Request, response: Response): Promise<void> => {
    try {
        const { email, password } = request.body
        const user = await userModel.findOne({ email })
        if (!user) {
            response.status(400).json({
                success: false,
                message: "Invalid email or password"
            })
            return
        }
        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword) {
            response.status(400).json({
                success: false,
                message: "Invalid email or password"
            })
            return
        }
        await generateToken(response, user)
        user.lastLogin = new Date()
        await user.save()
        const userNoPassword = await userModel.findOne({ email }).select('-password')
        response.status(200).json({
            success: true,
            message: `Welcome Back! ${userNoPassword?.name}`,
            user: userNoPassword
        })
        return
    } catch (error) {
        console.log(error)
        response.status(500).json({
            success: false,
            message: 'Internal Server Error',
        })
        return
    }
}

export const verifyEmail = async (request: Request, response: Response): Promise<void> => {
    try {
        const { verificationCode } = request.body
        const user = await userModel.findOne({ verificationToken: verificationCode, verificationTokenExpires: { $gt: Date.now() } }).select('-password')
        if (!user) {
            response.status(400).json({
                success: false,
                message: "Invalid or expired verification code"
            })
            return
        }
        user.isVerified = true
        user.verificationToken = undefined
        user.verificationTokenExpires = undefined
        user.save()
        await sendWelcomeEmail(user.email, user.name)
        response.status(200).json({
            success: true,
            message: "Email verification successful",
            user: user
        })
        return
    } catch (error) {
        console.log(error)
        response.status(500).json({
            success: false,
            message: 'Internal Server Error',
        })
        return
    }
}

export const logout = async (request: Request, response: Response): Promise<void> => {
    try {
        response.clearCookie('token').status(200).json({
            success: true,
            message: "Logged out"
        })
        return
    } catch (error) {
        console.log(error)
        response.status(500).json({
            success: false,
            message: 'Internal Server Error',
        })
        return
    }
}

export const forgotPassword = async (request: Request, response: Response): Promise<void> => {
    try {
        const { email } = request.body
        const user = await userModel.findOne({ email })
        if (!user) {
            response.status(400).json({
                success: false,
                message: "Email not found"
            })
            return
        }
        const resetToken = crypto.randomBytes(40).toString('hex')
        const resetTokenExpires = new Date(Date.now() + 1 * 60 * 60 * 1000)
        user.resetPasswordToken = resetToken
        user.resetPasswordTokenExpires = resetTokenExpires
        user.save()
        await sendPasswordResetEmail(user.email, `${process.env.FRONTEND_URL}/reset-password/${resetToken}`)
        response.status(200).json({
            success: true,
            message: "Password reset email sent",
        })
        return
    } catch (error) {
        console.log(error)
        response.status(500).json({
            success: false,
            message: 'Internal Server Error',
        })
        return
    }
}

export const resetPassword = async (request: Request, response: Response): Promise<void> => {
    try {
        const { token } = request.params
        const { newPassword } = request.body
        const user = await userModel.findOne({ resetPasswordToken: token, resetPasswordTokenExpires: { $gt: Date.now() } })
        if (!user) {
            response.status(400).json({
                success: false,
                message: "Invalid or expired token"
            })
            return
        }
        const newPasswordHashed = await bcrypt.hash(newPassword, 10)
        user.password = newPasswordHashed
        user.resetPasswordToken = undefined
        user.resetPasswordTokenExpires = undefined
        user.save()
        await sendResetSuccessEmail(user.email)
        response.status(200).json({
            success: true,
            message: "Password reset successfull"
        })
        return
    } catch (error) {
        console.log(error)
        response.status(500).json({
            success: false,
            message: 'Internal Server Error',
        })
        return
    }
}

export const checkAuth = async (request: Request, response: Response): Promise<void> => {
    try {
        const userId = request.id
        const user = await userModel.findById(userId).select('-password')
        if (!user) {
            response.status(404).json({
                success: false,
                message: "User not found"
            })
            return
        }
        response.status(200).json({
            success: true,
            user
        })
        return
    } catch (error) {
        console.log(error)
        response.status(500).json({
            success: false,
            message: 'Internal Server Error',
        })
        return
    }
}

export const updateProfile = async (request: Request, response: Response): Promise<void> => {
    try {
        const userId = request.id
        const { name, email, address, city, country, profilePic } = request.body
        let cloudResponse: any
        cloudResponse = await cloudinary.uploader.upload(profilePic)
        const updatedData = { name, email, address, city, country, profilePic }
        const user = await userModel.findByIdAndUpdate(userId, updatedData, { new: true }).select('-password')
        response.status(200).json({
            success: true,
            message: "Profile updated",
            user
        })
        return
    } catch (error) {
        console.log(error)
        response.status(500).json({
            success: false,
            message: 'Internal Server Error',
        })
        return
    }
}