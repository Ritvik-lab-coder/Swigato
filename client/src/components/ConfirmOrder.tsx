import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "./ui/dialog"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

type ConfirmOrderState = {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
}

const ConfirmOrder = ({ open, setOpen }: { open: boolean, setOpen: Dispatch<SetStateAction<boolean>> }) => {
    const [input, setInput] = useState<ConfirmOrderState>({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        country: ""
    })
    const changeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setInput(prevState => ({ ...prevState, [name]: value }))
    }
    const checkoutHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log(input)
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogTitle className="text-center text-burntorange font-bold">Review your Order</DialogTitle>
                <DialogDescription className="text-red">
                    Double-check your delivery details and ensure everything is correct. When you are ready, hit confirm button to finalize your order.
                </DialogDescription>
                <form onSubmit={checkoutHandler} className="grid grid-cols-1 md:grid-cols-2 gap-2 space-y-1 md:space-y-0">
                    <div>
                        <Label className="text-burntorange">Name</Label>
                        <Input type="text" name="name" value={input.name} onChange={changeEventHandler} />
                    </div>
                    <div>
                        <Label className="text-burntorange">Email</Label>
                        <Input type="email" name="email" value={input.email} onChange={changeEventHandler} />
                    </div>
                    <div>
                        <Label className="text-burntorange">Phone No.</Label>
                        <Input type="text" name="phone" value={input.phone} onChange={changeEventHandler} />
                    </div>
                    <div>
                        <Label className="text-burntorange">Address</Label>
                        <Input type="text" name="address" value={input.address} onChange={changeEventHandler} />
                    </div>
                    <div>
                        <Label className="text-burntorange">City</Label>
                        <Input type="text" name="city" value={input.city} onChange={changeEventHandler} />
                    </div>
                    <div>
                        <Label className="text-burntorange">Country</Label>
                        <Input type="text" name="country" value={input.country} onChange={changeEventHandler} />
                    </div>
                    <DialogFooter className="col-span-2 pt-5">
                        <Button type="submit" className="bg-burntorange hover:bg-red w-full">Confirm</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default ConfirmOrder