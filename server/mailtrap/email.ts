import { client, sender } from './mailtrap.js'
import { generatePasswordResetEmailHtml, generateResetSuccessEmailHtml, generateWelcomeEmailHtml, htmlContent } from './htmlEmail.js'

export const sendVerificationEmail = async (email: string, verificationCode: string) => {
    const recipient = [{ email }]
    try {
        const response = await client.send({
            from: sender,
            to: recipient,
            subject: "Verify your Email",
            html: htmlContent.replace("{verificationCode}", verificationCode),
            category: "Email Verification"
        })
    } catch (error) {
        console.log(error)
        throw new Error("Failed to send email verification")
    }
}

export const sendWelcomeEmail = async (email: string, name: string) => {
    const recipient = [{ email }]
    const welcomeHtml = generateWelcomeEmailHtml(name)
    try {
        const response = await client.send({
            from: sender,
            to: recipient,
            subject: "Welcome to Swigato",
            html: welcomeHtml,
            template_variables: {
                company: "Swigato",
                name: name
            }
        })
    } catch (error) {
        console.log(error)
        throw new Error("Failed to send welcome email")
    }
}

export const sendPasswordResetEmail = async (email: string, resetURL: string) => {
    const recipient = [{ email }]
    const resetPasswordHtml = generatePasswordResetEmailHtml(resetURL)
    try {
        const response = await client.send({
            from: sender,
            to: recipient,
            subject: "Reset your Password",
            html: resetPasswordHtml,
            category: "Reset Password"
        })
    } catch (error) {
        console.log(error)
        throw new Error("Failed to send password reset email")
    }
}

export const sendResetSuccessEmail = async (email: string) => {
    const recipient = [{ email }]
    const resetSuccessHtml = generateResetSuccessEmailHtml()
    try {
        const response = await client.send({
            from: sender,
            to: recipient,
            subject: "Password reset successfull",
            html: resetSuccessHtml,
            category: "Password reset"
        })
    } catch (error) {
        console.log(error)
        throw new Error("Failed to send reset password confirmation email")
    }
}