import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { menuStateSchema, MenuStateSchema } from "@/schema/menuSchema"
import { Loader2 } from "lucide-react"
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react"

const EditMenu = ({ selectedMenu, open, setOpen }: { selectedMenu: MenuStateSchema, open: boolean, setOpen: Dispatch<SetStateAction<boolean>> }) => {
    const [input, setInput] = useState<MenuStateSchema>({
        name: "",
        description: "",
        price: 0,
        image: undefined
    })
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
    const changeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = event.target
        setInput({ ...input, [name]: type === 'number' ? Number(value) : value })
    }
    const loading: boolean = false
    useEffect(() => {
        setInput({
            name: selectedMenu?.name || "",
            description: selectedMenu?.description || "",
            price: selectedMenu?.price || 0,
            image: undefined
        })
    }, [selectedMenu])
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center text-burntorange font-bold">Edit Item</DialogTitle>
                    <DialogDescription className="text-center text-red">Update Item to keep your offerings fresha and exciting</DialogDescription>
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
                    </div>
                    <DialogFooter className="mt-4">
                        {
                            loading ? <Button disabled className="bg-burntorange hover:bg-red w-full"><Loader2 className="mr-2 h-4 w-4 animate-spin" />Please Wait...</Button> : <Button type="submit" className="bg-burntorange hover:bg-red w-full">Add</Button>
                        }
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default EditMenu