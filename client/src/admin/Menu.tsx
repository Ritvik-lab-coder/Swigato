import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DialogTitle } from "@radix-ui/react-dialog"
import { Loader2, Plus } from "lucide-react"
import { ChangeEvent, FormEvent, useState } from "react"
import FoodImg from '../assets/food.jpg'
import EditMenu from "./EditMenu"
import { menuStateSchema, MenuStateSchema } from "@/schema/menuSchema"

const Menu = () => {
    const [input, setInput] = useState<MenuStateSchema>({
        name: "",
        description: "",
        price: 0,
        image: undefined
    })
    const changeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = event.target
        setInput({ ...input, [name]: type === 'number' ? Number(value) : value })
    }
    const [errors, setErrors] = useState<Partial<MenuStateSchema>>({});
    const submitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const result = menuStateSchema.safeParse(input)
        if (!result.success) {
            const fieldErrors = result.error.formErrors.fieldErrors
            setErrors(fieldErrors as Partial<MenuStateSchema>)
            return
        }
        setErrors({})
        console.log(input)
    }
    const [open, setOpen] = useState<boolean>(false)
    const [selectedMenu, setSelectedMenu] = useState<any>()
    const menu = [
        {
            name: "Burger",
            description: "sghlsah",
            price: 80,
            image: `${FoodImg}`
        },
        {
            name: "Burger",
            description: "sghlsah",
            price: 80,
            image: `${FoodImg}`
        },
        {
            name: "Burger",
            description: "sghlsah",
            price: 80,
            image: `${FoodImg}`
        }
    ]
    const [editOpen, setEditOpen] = useState<boolean>(false)
    const loading: boolean = false
    return (
        <div className="max-w-7xl mx-auto my-10">
            <div className="flex justify-between">
                <h1 className="font-bold md:font-extrabold text-lg md:text-2xl text-burntorange">Available Menu</h1>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger>
                        <Button className="bg-burntorange hover:bg-red"><Plus className="mr-2" />Add an Item</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="text-burntorange font-bold text-center">Add a New Item in Menu</DialogTitle>
                            <DialogDescription className="text-red text-center">
                                Create a new item that will make your outlet stand-out.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={submitHandler} className="space-y-4">
                            <div>
                                <Label className="text-burntorange">Name</Label>
                                <Input type="text" value={input.name} onChange={changeEventHandler} placeholder="Enter item name" name="name" />
                                {
                                    errors && <span className="text-xs font-medium text-red">{errors.name}</span>
                                }
                            </div>
                            <div>
                                <Label className="text-burntorange">Description</Label>
                                <Input type="text" onChange={changeEventHandler} value={input.description} placeholder="Enter item description" name="description" />
                                {
                                    errors && <span className="text-xs font-medium text-red">{errors.description}</span>
                                }
                            </div>
                            <div>
                                <Label className="text-burntorange">Price</Label>
                                <Input type="number" onChange={changeEventHandler} value={input.price} placeholder="Enter item price" name="price" />
                                {
                                    errors && <span className="text-xs font-medium text-red">{errors.price}</span>
                                }
                            </div>
                            <div>
                                <Label className="text-burntorange">Upload item image</Label>
                                <Input type="file" onChange={(event: ChangeEvent<HTMLInputElement>) => setInput({ ...input, image: event.target.files?.[0] || undefined })} name="image" />
                                {
                                    errors && <span className="text-xs font-medium text-red">{errors.image?.name || "Image is required"}</span>
                                }
                            </div>
                            <DialogFooter className="mt-4">
                                {
                                    loading ? <Button disabled className="bg-burntorange hover:bg-red w-full"><Loader2 className="mr-2 h-4 w-4 animate-spin" />Please Wait...</Button> : <Button type="submit" className="bg-burntorange hover:bg-red w-full">Add</Button>
                                }
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            {
                menu.map((item: any, index: number) => (
                    <div key={index} className="mt-6 space-y-4">
                        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 md:p-4 p-2 shadow-md rounded-lg">
                            <img src={item.image} alt="" className="md:h-24 md:w-24 h-48 w-full object-cover rounded-lg" />
                            <div className="flex-1">
                                <h1 className="text-lg font-semibold text-burntorange">{item.title}</h1>
                                <p className="text-sm text-red">{item.description}</p>
                                <h2 className="text-md font-semibold mt-2 text-red">Price: <span className="text-red font-bold">₹{item.price}</span></h2>
                            </div>
                            <Button className="bg-burntorange hover:bg-red mt-2" size={'sm'} onClick={() => {
                                setSelectedMenu(item)
                                setEditOpen(true)
                            }}>Edit</Button>
                        </div>
                    </div>
                ))
            }
            <EditMenu selectedMenu={selectedMenu} open={editOpen} setOpen={setEditOpen} />
        </div>
    )
}

export default Menu