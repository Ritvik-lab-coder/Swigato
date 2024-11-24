import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const Orders = () => {
    return (
        <div className="max-w-7xl mx-auto my-10">
            <h1 className="text-3xl font-extrabold text-burntorange mb-10">Orders Overview</h1>
            <div className="space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-start sm:items-center bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 sm:p-8 border-gray-200 dark:border-gray-700">
                    <div className="flex-1 mb-6 sm:mb-0">
                        <h1 className="text-xl font-semibold text-burntorange">Lorem</h1>
                        <p className="text-red mt-2"><span className="font-semibold">Address: </span>Lorem, ipsum dolor.</p>
                        <p className="text-red mt-2"><span className="font-semibold">Amount: </span>₹80</p>
                    </div>
                    <div className="w-full sm:w-1/3">
                        <Label className="text-sm block font-medium text-burntorange">Order Status</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {
                                        ["Pending", "Confirmed", "Preparing", "Out for Delivery", "Delivered"].map((status: string, index: number) => (
                                            <SelectItem className="text-burntorange" key={index} value={status.toLowerCase()}>{status}</SelectItem>
                                        ))
                                    }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Orders