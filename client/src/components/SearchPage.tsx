import { Link, useParams } from "react-router-dom"
import Filters from "./Filters"
import { Input } from "./ui/input"
import { ChangeEvent, useState } from "react"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Globe, MapPin, X } from "lucide-react"
import { Card, CardContent, CardFooter } from "./ui/card"
import { AspectRatio } from "./ui/aspect-ratio"
import HeroImg from '../assets/hero.png'

const SearchPage = () => {
    const params = useParams()
    const [searchQuery, setSearchQuery] = useState<string>("")
    return (
        <div className="max-w-7xl mx-auto my-10">
            <div className="flex flex-col md:flex-row justify-between gap-10">
                <Filters />
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <Input type="text" placeholder="Search by restaurants and cuisines" value={searchQuery} onChange={(event: ChangeEvent<HTMLInputElement>) => setSearchQuery(event.target.value)} />
                        <Button className="bg-burntorange hover:bg-red">Search</Button>
                    </div>
                    <div>
                        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-2 my-3">
                            <h1 className="font-medium text-lg text-burntorange">(2) Search Results found</h1>
                            <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
                                {
                                    ["Biriyani", "Momos", "Jalebi"].map((selectedFilter: string, index: number) => (
                                        <div key={index} className="relative inline-flex mx-1 items-center max-w-full">
                                            <Badge className="rounded-md text-red  hover:cursor-pointer pr-6 whitespace-nowrap" variant={'outline'}>{selectedFilter}</Badge>
                                            <X className="absolute text-burntorange right-1 hover:cursor-pointer" size={16} />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div>
                            <div className="grid md:grid-cols-3 gap-4">
                                {
                                    [1, 2, 3].map((item: number, index: number) => (
                                        <Card className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                                            <div className="relative">
                                                <AspectRatio ratio={16 / 6}>
                                                    <img src={HeroImg} alt="" className="w-full h-full object-cover" />
                                                </AspectRatio>
                                                <div className="absolute top-2 left-2 bg-white dark:bg-gray-700 bg-opacity-75 rounded-lg py-1 px-3">
                                                    <span className="text-sm font-medium text-red dark:text-gray-300">Featured</span>
                                                </div>
                                            </div>
                                            <CardContent className="p-4">
                                                <h1 className="text-2xl font-bold text-burntorange">Burger King</h1>
                                                <div className="mt-2 gap-1 flex items-center text-red">
                                                    <MapPin size={16} />
                                                    <p className="text-sm text-red">City: <span className="font-medium">Mumbai</span></p>
                                                </div>
                                                <div className="mt-2 gap-1 flex items-center text-red">
                                                    <Globe size={16} />
                                                    <p className="text-sm text-red">Country: <span className="font-medium">India</span></p>
                                                </div>
                                                <div className="flex gap-2 mt-4 flex-wrap">
                                                    {
                                                        ["Biriyani", "Momos", "Jalebi"].map((cuisine: string, index: number) => (
                                                            <div key={index} className="relative inline-flex mx-1 items-center max-w-full">
                                                                <Badge className="bg-burntorange rounded-md text-white  hover:cursor-pointer whitespace-nowrap" variant={'outline'}>{cuisine}</Badge>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </CardContent>
                                            <CardFooter className="py-4 border-t dard:border-t-gray-700 border-t-gray-100 text-white flex justify-self-end">
                                                <Link to={`/restaurant/${123}`}>
                                                    <Button className="bg-red hover:bg-burntorange font-semibold py-2 px-4 rounded-full shadow-md transition-colors duration-200">View Menu</Button>
                                                </Link>
                                            </CardFooter>
                                        </Card>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchPage

const SearchPageSkeleton = () => {
    return (
        <>
            {
                Array(3).fill(null).map((_, index: number) => (
                    <Card className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden">
                        <div className="relative">
                            <AspectRatio ratio={16 / 6}>
                                <div className="w-full h-full bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
                            </AspectRatio>
                            <div className="absolute top-2 left-2 bg-gray-300 dark:bg-gray-700 bg-opacity-75 rounded-lg py-1 px-3">
                                <div className="h-4 w-16 bg-gray-400 dark:bg-gray-600 animate-pulse"></div>
                            </div>
                        </div>
                        <CardContent className="p-4">
                            <div className="h-6 bg-gray-400 dark:bg-gray-600 animate-pulse w-2/3 rounded-md mb-4"></div>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="h-4 w-4 bg-gray-400 dark:bg-gray-600 rounded-full animate-pulse"></div>
                                <div className="h-4 bg-gray-400 dark:bg-gray-600 animate-pulse w-1/2 rounded-md"></div>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="h-4 w-4 bg-gray-400 dark:bg-gray-600 rounded-full animate-pulse"></div>
                                <div className="h-4 bg-gray-400 dark:bg-gray-600 animate-pulse w-1/2 rounded-md"></div>
                            </div>
                            <div className="flex gap-2 mt-4 flex-wrap">
                                {Array(3)
                                    .fill(null)
                                    .map((_, index: number) => (
                                        <div key={index} className="h-6 w-16 bg-gray-400 dark:bg-gray-600 animate-pulse rounded-md"></div>
                                    ))}
                            </div>
                        </CardContent>
                        <CardFooter className="py-4 border-t dark:border-t-gray-700 border-t-gray-100 flex justify-self-end">
                            <div className="h-10 w-24 bg-gray-400 dark:bg-gray-600 animate-pulse rounded-full"></div>
                        </CardFooter>
                    </Card>
                ))
            }
        </>

    )
}

const NoResultsFound = ({ searchText }: { searchText: string }) => {
    return (
        <div className="text-center">
            <h1 className="text-2xl font-semibold text-red dark:text-white">No Results found</h1>
            <p className="mt-2 text-red dark:text-white">
                Sorry, no results found for "{searchText}". Please try again with different keywords.
            </p>
            <Link to={'/'}>
                <Button className="bg-burntorange hover:bg-red">Go Back to Home</Button>
            </Link>
        </div>
    )
}