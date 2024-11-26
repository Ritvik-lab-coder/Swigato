import mongoose, { Document } from 'mongoose'

export interface IUser {
    name: string;
    email: string;
    password: string;
    phone: number;
    address: string;
    city: string;
    country: string;
    profilePic: string;
    isAdmin: boolean;
    lastLogin?: Date;
    isVerified?: boolean;
    resetPasswordToken?: string;
    resetPasswordTokenExpires?: Date;
    verificationToken?: string;
    verificationTokenExpires?: Date;
}

export interface IUserDocument extends IUser, Document {
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUserDocument>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        default: "Update your address"
    },
    city: {
        type: String,
        default: "Update your city"
    },
    country: {
        type: String,
        default: "Update your country"
    },
    profilePic: {
        type: String,
        default: ""
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    lastLogin: {
        type: Date,
        default: Date.now()
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: String,
    resetPasswordTokenExpires: Date,
    verificationToken: String,
    verificationTokenExpires: Date,
}, { timestamps: true })

export const userModel = mongoose.model('users', userSchema)