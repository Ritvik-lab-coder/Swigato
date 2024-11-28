import { createTransport } from 'nodemailer'
import { config } from 'dotenv'

config()

export const transport = createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: process.env.GMAIL,
        pass: process.env.PASSWORD
    }
});

export const sender = {
    address: process.env.GMAIL as string,
    name: "Swigato",
};