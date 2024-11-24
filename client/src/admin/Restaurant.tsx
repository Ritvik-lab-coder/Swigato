import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { restaurantFormSchema, RestaurantFormSchema } from "@/schema/restaurantSchema"
import { Loader2 } from "lucide-react"
import { ChangeEvent, FormEvent, useState } from "react"

const Restaurant = () => {
    const [input, setInput] = useState<RestaurantFormSchema>({
        restaurantName: "",
        city: "",
        country: "",
        deliveryTime: 0,
        cuisines: [],
        banner: undefined
    })
    const [errors, setErrors] = useState<Partial<RestaurantFormSchema>>({})
    const changeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = event.target
        setInput((prevInput) => ({ ...prevInput, [name]: type === 'number' ? Number(value) : value }))
    }
    const submitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const result = restaurantFormSchema.safeParse(input)
        if (!result.success) {
            const fieldError = result.error.formErrors.fieldErrors
            setErrors(fieldError as Partial<RestaurantFormSchema>)
            return
        }
        setErrors({})
        console.log(input)
    }
    const loading: boolean = false
    const isRestaurant: boolean = false
    return (
        <div className="max-w-7xl mx-auto my-10">
            <div>
                <div>
                    <h1 className="font-extrabold text-2xl mb-5 text-burntorange">List your Restaurant or Food Chain on Swigato</h1>
                    <form onSubmit={submitHandler}>
                        <div className="md:grid grid-cols-2 gap-6 space-y-2 md:space-y-0">
                            <div>
                                <Label className="text-burntorange">Restaurant Name</Label>
                                <Input type="text" value={input.restaurantName} onChange={changeEventHandler} name="restaurantName" placeholder="Enter your restaurant or Food Chain name" />
                                {
                                    errors && <span className="text-red text-xs font-medium">{errors.restaurantName}</span>
                                }
                            </div>
                            <div>
                                <Label className="text-burntorange">City</Label>
                                <Input type="text" name="city" value={input.city} onChange={changeEventHandler} placeholder="Enter outlet city" />
                                {
                                    errors && <span className="text-red text-xs font-medium">{errors.city}</span>
                                }
                            </div>
                            <div>
                                <Label className="text-burntorange">Country</Label>
                                <Input type="text" name="country" value={input.country} onChange={changeEventHandler} placeholder="Enter country" />
                                {
                                    errors && <span className="text-red text-xs font-medium">{errors.country}</span>
                                }
                            </div>
                            <div>
                                <Label className="text-burntorange">Delivery Time</Label>
                                <Input type="number" name="deliveryTime" value={input.deliveryTime} onChange={changeEventHandler} placeholder="Enter expected delivery time" />
                                {
                                    errors && <span className="text-red text-xs font-medium">{errors.deliveryTime}</span>
                                }
                            </div>
                            <div>
                                <Label className="text-burntorange">Cuisine</Label>
                                <Input type="text" name="cuisine" value={input.cuisines} onChange={(event: ChangeEvent<HTMLInputElement>) => setInput({ ...input, cuisines: event.target.value.split(',') })} placeholder="Enter cuisines e.g. Burger,Pizza,etc" />
                                {
                                    errors && <span className="text-red text-xs font-medium">{errors.cuisines}</span>
                                }
                            </div>
                            <div>
                                <Label className="text-burntorange">Restaurant Banner</Label>
                                <Input onChange={(event) => setInput({ ...input, banner: event.target.files?.[0] || undefined })} type="file" name="banner" accept="image/*" placeholder="Upload your restaurant banner" />
                                {
                                    errors && <span className="text-red text-xs font-medium">{errors.banner?.name || "Image is required"}</span>
                                }
                            </div>
                        </div>
                        <div className="my-5 w-fit">
                            {
                                loading ? <Button disabled className="bg-burntorange hover:bg-red"><Loader2 className="mr-2 h-4 w-4 animate-spin" />Please Wait...</Button> : <Button type="submit" className="bg-burntorange hover:bg-red">{isRestaurant ? 'Update information' : 'List Your Restaurant/Food Chain'}</Button>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Restaurant