import mongoose, { Document } from 'mongoose'

export interface IRestaurant {
    user: mongoose.Schema.Types.ObjectId;
    name: string;
    city: string;
    country: string;
    deliveryTime: number;
    cuisines: string[];
    banner: string;
    menu: mongoose.Schema.Types.ObjectId[]
}

export interface IRestaurantDocument extends IRestaurant, Document {
    createdAt: Date;
    updatedAt: Date;
}

const restaurantSchema = new mongoose.Schema<IRestaurantDocument>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    deliveryTime: {
        type: Number,
        required: true
    },
    cuisines: {
        type: [String],
        required: true
    },
    banner: {
        type: String,
        required: true
    },
    menu: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'menu',
        required: true
    }
}, { timestamps: true })

export const restaurantModel = mongoose.model('restaurants', restaurantSchema)