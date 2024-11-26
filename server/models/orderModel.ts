import mongoose, { Document } from 'mongoose'

type DeliveryDetails = {
    email: string;
    name: string;
    address: string;
    city: string;
}

type OrderItems = {
    menuId: mongoose.Schema.Types.ObjectId;
    name: string;
    image: string;
    price: number;
    quantity: number;
}

export interface IOrder {
    user: mongoose.Schema.Types.ObjectId;
    restaurant: mongoose.Schema.Types.ObjectId;
    deliveryDetails: DeliveryDetails;
    orderItems: OrderItems[];
    amount: number;
    status: "pending" | "confirmed" | "preparing" | "out for delivery" | "delivered";
}

export interface IOrderDocument extends IOrder, Document {
    createdAt: Date;
    updatedAt: Date;
}

const orderSchema = new mongoose.Schema<IOrderDocument>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restaurants',
        required: true
    },
    deliveryDetails: {
        email: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
    },
    orderItems: [
        {
            menuId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'menu',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            image: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "preparing", "out for delivery", "delivered"],
        required: true,
        default: "pending"
    }
}, { timestamps: true })

export const orderModel = mongoose.model('orders', orderSchema)