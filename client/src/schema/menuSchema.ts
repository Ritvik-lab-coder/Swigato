import { z } from 'zod'

export const menuStateSchema = z.object({
    name: z.string().min(1, "Item name is required"),
    description: z.string().min(1, "Item description is required"),
    price: z.number().min(0, "Item price cannot be negative"),
    image: z.instanceof(File).optional().refine((file) => file?.size !== 0, { message: "Image is required" })
})

export type MenuStateSchema = z.infer<typeof menuStateSchema>