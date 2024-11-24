import { Timer } from 'lucide-react'
import RestoBanner from '../assets/food.jpg'
import { Badge } from './ui/badge'
import AvailableMenu from './AvailableMenu'

const RestaurantDetails = () => {
    return (
        <div className="max-w-7xl mx-auto my-10">
            <div className="w-full">
                <div className="relative w-full h-32 md:h-64 lg:h-72">
                    <img src={RestoBanner} alt="" className='object-cover w-full h-full rounded-lg shadow-lg' />
                </div>
                <div className='flex flex-col md:flex-row justify-between'>
                    <div className='my-5'>
                        <h1 className='font-medium text-xl text-red'>Resto Name</h1>
                        <div className='flex gap-2 my-2'>
                            {
                                ["Biriyani", "Burger", "Pizza"].map((cuisine: string, index: number) => (
                                    <Badge key={index} className='bg-burntorange text-white'>{cuisine}</Badge>
                                ))
                            }
                        </div>
                        <div className='flex md:flex-row flex-col gap-2 my-5'>
                            <div className='flex items-center gap-2'>
                                <Timer className='w-5 h-5 text-red' />
                                <h1 className='text-red flex items-center gap-2 font-medium'>Delivery Time: <span className='text-burntorange'>35 minutes</span></h1>
                            </div>
                        </div>
                    </div>
                </div>
                <AvailableMenu />
            </div>
        </div>
    )
}

export default RestaurantDetails