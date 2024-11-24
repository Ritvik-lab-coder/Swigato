import { IndianRupee } from 'lucide-react'
import image from '../assets/food.jpg'
import { Separator } from './ui/separator'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'

const Success = () => {
    const orders = [1, 2, 3]
    if (orders.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[40vh]">
                <h1 className="font-bold text-2xl text-burntorange">No Orders Found</h1>
            </div>
        )
    }
    return (
        <div className="flex items-center justify-center min-h-[40vh] dark:bg-gray-900 px-4">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-lg w-full">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-burntorange">Order Status: <span className="text-red">{"confirmed".toUpperCase()}</span></h1>
                </div>
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-burntorange">Order Summary</h2>
                    <div className="mt-4">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                <img src={image} className='w-14 h-14 rounded-md object-cover' alt="" />
                                <h3 className='ml-4 text-burntorange font-medium'>Burger</h3>
                            </div>
                            <div className='text-right'>
                                <div className='text-red flex items-center'>
                                    <IndianRupee /><span className='font-bold text-lg'>80</span>
                                </div>
                            </div>
                        </div>
                        <Separator className='my-4' />
                    </div>
                </div>
                <Link to={'/cart'}><Button className='bg-burntorange hover:bg-red w-full py-3 rounded-md shadow-lg'>Continue Shopping</Button></Link>
            </div>
        </div>
    )
}

export default Success