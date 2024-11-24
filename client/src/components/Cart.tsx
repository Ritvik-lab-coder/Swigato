import { Minus, Plus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "./ui/table"
import { useState } from "react"
import ConfirmOrder from "./ConfirmOrder"

const Cart = () => {
    const [open, setOpen] = useState<boolean>(false)
    return (
        <div className="flex flex-col max-w-7xl mx-auto my-10">
            <div className="flex justify-end">
                <Button variant={'link'} className="text-burntorange hover:no-underline">Clear All</Button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-red">Items</TableHead>
                        <TableHead className="text-red">Price</TableHead>
                        <TableHead className="text-red">Quantity</TableHead>
                        <TableHead className="text-red">Amount</TableHead>
                        <TableHead className="text-right text-red">Remove</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="flex gap-2 items-center">
                            <Avatar>
                                <AvatarImage src="" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <p className="font-bold text-burntorange">Biriyani</p>
                        </TableCell>
                        <TableCell className="text-burntorange font-bold">₹80</TableCell>
                        <TableCell>
                            <div className="w-fit flex items-center rounded-full gap-2">
                                <Button className="rounded-full text-burntorange bg-gray-200" size={'icon'} variant={'outline'}><Minus /></Button>
                                <Button disabled variant={'outline'} size={'icon'} className="text-burntorange font-bold border-none">1</Button>
                                <Button className="rounded-full text-burntorange bg-gray-200" size={'icon'} variant={'outline'}><Plus /></Button>
                            </div>
                        </TableCell>
                        <TableCell className="text-burntorange font-bold">₹80</TableCell>
                        <TableCell className="flex justify-end">
                            <Button className="bg-red hover:bg-burntorange">Remove</Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
                <TableFooter>
                    <TableRow className="text-2xl font-bold">
                        <TableCell colSpan={4} className="text-red font-bold">Total</TableCell>
                        <TableCell className="text-right text-red font-bold">₹80</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
            <div onClick={() => setOpen(true)} className="flex justify-end my-5">
                <Button className="bg-burntorange hover:bg-goldenyellow">Proceed to Checkout</Button>
            </div>
            <ConfirmOrder open={open} setOpen={setOpen} />
        </div>
    )
}

export default Cart