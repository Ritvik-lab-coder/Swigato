import { transport, sender } from './nodemailer.js'
import { generatePasswordResetEmailHtml, generateResetSuccessEmailHtml, generateWelcomeEmailHtml, htmlContent } from './htmlEmail.js'

export const sendVerificationEmail = async (email: string, verificationCode: string): Promise<void> => {
    try {
        const response = await transport.sendMail({
            from: sender.address,
            to: email,
            subject: "Verify your Email",
            html: htmlContent.replace("{verificationCode}", verificationCode)
        })
    } catch (error) {
        console.log(error)
        throw new Error("Failed to send email verification")
    }
}

export const sendWelcomeEmail = async (email: string, name: string): Promise<void> => {
    const welcomeHtml = generateWelcomeEmailHtml(name)
    try {
        const response = await transport.sendMail({
            from: sender.address,
            to: email,
            subject: "Welcome to Swigato",
            html: welcomeHtml
        })
    } catch (error) {
        console.log(error)
        throw new Error("Failed to send welcome email")
    }
}

export const sendPasswordResetEmail = async (email: string, resetURL: string): Promise<void> => {
    const resetPasswordHtml = generatePasswordResetEmailHtml(resetURL)
    try {
        const response = await transport.sendMail({
            from: sender.address,
            to: email,
            subject: "Reset your Password",
            html: resetPasswordHtml
        })
    } catch (error) {
        console.log(error)
        throw new Error("Failed to send password reset email")
    }
}

export const sendResetSuccessEmail = async (email: string): Promise<void> => {
    const resetSuccessHtml = generateResetSuccessEmailHtml()
    try {
        const response = await transport.sendMail({
            from: sender.address,
            to: email,
            subject: "Password reset successfull",
            html: resetSuccessHtml
        })
    } catch (error) {
        console.log(error)
        throw new Error("Failed to send reset password confirmation email")
    }
}