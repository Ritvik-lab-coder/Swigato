import { Request, Response } from 'express'
import { userModel } from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import cloudinary from '../utils/cloudinary.js'
import { generateVerificationToken } from '../utils/generateVerificationCode.js'
import { generateToken } from '../utils/generateToken.js'
import { sendPasswordResetEmail, sendResetSuccessEmail, sendVerificationEmail, sendWelcomeEmail } from '../mailtrap/email.js'

export const signup = async (request: Request, response: Response) => {
    try {
        const { fullname, email, password, contact } = request.body
        let user = await userModel.findOne({ email })
        if (user) {
            return response.status(400).json({
                success: false,
                message: 'Email already exists',
            })
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
        return response.status(201).json({
            success: true,
            message: "Account created successfully",
            user: userNoPassword
        })
    } catch (error) {
        console.log(error)
        return response.status(500).json({
            success: false,
            message: 'Internal Server Error',
        })
    }
}

export const login = async (request: Request, response: Response) => {
    try {
        const { email, password } = request.body
        const user = await userModel.findOne({ email })
        if (!user) {
            return response.status(400).json({
                success: false,
                message: "Invalid email or password"
            })
        }
        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword) {
            return response.status(400).json({
                success: false,
                message: "Invalid email or password"
            })
        }
        await generateToken(response, user)
        user.lastLogin = new Date()
        await user.save()
        const userNoPassword = await userModel.findOne({ email }).select('-password')
        return response.status(200).json({
            success: true,
            message: `Welcome Back! ${userNoPassword?.name}`,
            user: userNoPassword
        })
    } catch (error) {
        console.log(error)
        return response.status(500).json({
            success: false,
            message: 'Internal Server Error',
        })
    }
}

export const verifyEmail = async (request: Request, response: Response) => {
    try {
        const { verificationCode } = request.body
        const user = await userModel.findOne({ verificationToken: verificationCode, verificationTokenExpires: { $gt: Date.now() } }).select('-password')
        if (!user) {
            return response.status(400).json({
                success: false,
                message: "Invalid or expired verification code"
            })
        }
        user.isVerified = true
        user.verificationToken = undefined
        user.verificationTokenExpires = undefined
        user.save()
        await sendWelcomeEmail(user.email, user.name)
        return response.status(200).json({
            success: true,
            message: "Email verification successful",
            user: user
        })
    } catch (error) {
        console.log(error)
        return response.status(500).json({
            success: false,
            message: 'Internal Server Error',
        })
    }
}

export const logout = async (request: Request, response: Response) => {
    try {
        return response.clearCookie('token').status(200).json({
            success: true,
            message: "Logged out"
        })
    } catch (error) {
        console.log(error)
        return response.status(500).json({
            success: false,
            message: 'Internal Server Error',
        })
    }
}

export const forgotPassword = async (request: Request, response: Response) => {
    try {
        const { email } = request.body
        const user = await userModel.findOne({ email })
        if (!user) {
            return response.status(400).json({
                success: false,
                message: "Email not found"
            })
        }
        const resetToken = crypto.randomBytes(40).toString('hex')
        const resetTokenExpires = new Date(Date.now() + 1 * 60 * 60 * 1000)
        user.resetPasswordToken = resetToken
        user.resetPasswordTokenExpires = resetTokenExpires
        user.save()
        await sendPasswordResetEmail(user.email, `${process.env.FRONTEND_URL}/reset-password/${resetToken}`)
        return response.status(200).json({
            success: true,
            message: "Password reset email sent",
        })
    } catch (error) {
        console.log(error)
        return response.status(500).json({
            success: false,
            message: 'Internal Server Error',
        })
    }
}

export const resetPassword = async (request: Request, response: Response) => {
    try {
        const { token } = request.params
        const { newPassword } = request.body
        const user = await userModel.findOne({ resetPasswordToken: token, resetPasswordTokenExpires: { $gt: Date.now() } })
        if (!user) {
            return response.status(400).json({
                success: false,
                message: "Invalid or expired token"
            })
        }
        const newPasswordHashed = await bcrypt.hash(newPassword, 10)
        user.password = newPasswordHashed
        user.resetPasswordToken = undefined
        user.resetPasswordTokenExpires = undefined
        user.save()
        await sendResetSuccessEmail(user.email)
        return response.status(200).json({
            success: true,
            message: "Password reset successfull"
        })
    } catch (error) {
        console.log(error)
        return response.status(500).json({
            success: false,
            message: 'Internal Server Error',
        })
    }
}

export const checkAuth = async (request: Request, response: Response) => {
    try {
        const userId = request.id
        const user = await userModel.findById(userId).select('-password')
        if (!user) {
            return response.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        return response.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        console.log(error)
        return response.status(500).json({
            success: false,
            message: 'Internal Server Error',
        })
    }
}

export const updateProfile = async (request: Request, response: Response) => {
    try {
        const userId = request.id
        const { name, email, address, city, country, profilePic } = request.body
        let cloudResponse: any
        cloudResponse = await cloudinary.uploader.upload(profilePic)
        const updatedData = { name, email, address, city, country, profilePic }
        const user = await userModel.findByIdAndUpdate(userId, updatedData, { new: true }).select('-password')
        return response.status(200).json({
            success: true,
            message: "Profile updated",
            user
        })
    } catch (error) {
        console.log(error)
        return response.status(500).json({
            success: false,
            message: 'Internal Server Error',
        })
    }
}