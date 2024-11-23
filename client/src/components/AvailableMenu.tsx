import { Card, CardContent, CardFooter } from "./ui/card"
import MenuImg from '../assets/hero.png'
import { Button } from "./ui/button"

const AvailableMenu = () => {
    return (
        <div className="md:p-4">
            <h1 className="text-xl md:text-2xl text-burntorange font-extrabold mb-6">Available Menu</h1>
            <div className="grid md:grid-cols-4 space-y-4 md:space-y-0">
                <Card className="md:max-w-xs mx-auto shadow-lg rounded-lg overflow-hidden">
                    <img src={MenuImg} alt="" className="w-full h-40 object-cover" />
                    <CardContent className="p-4">
                        <h2 className="text-xl font-semibold text-red dark:text-white">Biriyani</h2>
                        <p className="text-sm text-burntorange dark:text-white mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <h3 className="text-lg font-semibold mt-4">Price: <span className="text-red font-bold">₹80</span></h3>
                    </CardContent>
                    <CardFooter className="p-4">
                        <Button className="bg-burntorange hover:bg-red w-full">Add to Cart</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

export default AvailableMenu

const AvailableMenuSkeleton = () => {
    return (
        <div className="md:p-4">
            <div className="h-6 w-1/3 bg-gray-300 dark:bg-gray-700 animate-pulse mb-6 rounded-md"></div>
            <div className="grid md:grid-cols-4 space-y-4 md:space-y-0">
                {Array(4)
                    .fill(null)
                    .map((_, index) => (
                        <Card
                            key={index}
                            className="md:max-w-xs mx-auto shadow-lg rounded-lg overflow-hidden"
                        >
                            <div className="w-full h-40 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
                            <CardContent className="p-4">
                                <div className="h-6 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-md mb-4 w-1/2"></div>
                                <div className="h-4 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-md mb-4 w-full"></div>
                                <div className="h-4 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-md mb-4 w-3/4"></div>
                                <div className="h-6 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-md w-1/2"></div>
                            </CardContent>
                            <CardFooter className="p-4">
                                <div className="h-10 w-full bg-gray-300 dark:bg-gray-700 animate-pulse rounded-md"></div>
                            </CardFooter>
                        </Card>
                    ))}
            </div>
        </div>
    );
};
