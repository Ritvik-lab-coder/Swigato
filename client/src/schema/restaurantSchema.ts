import { z } from 'zod'

export const restaurantFormSchema = z.object({
    restaurantName: z.string().min(1, "Restaurant name is required"),
    city: z.string().min(1, "Outlet city is required"),
    country: z.string().min(1, "Country is required"),
    deliveryTime: z.number().nonnegative("Delivery time cannot be negative"),
    cuisines: z.array(z.string()),
    banner: z.instanceof(File).optional().refine((file) => file?.size !== 0, { message: "Banner image is required" })
})

export type RestaurantFormSchema = z.infer<typeof restaurantFormSchema>