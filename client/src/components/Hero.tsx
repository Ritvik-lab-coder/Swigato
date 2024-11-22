import { ChangeEvent, useState } from "react"
import { Input } from "./ui/input"
import { Search } from "lucide-react"
import { Button } from "./ui/button"
import HeroImage from '../assets/hero.png'

const Hero = () => {
    const [searchText, setSearchText] = useState<string>("")
    return (
        <div className="flex flex-col md:flex-row max-w-7xl mx-auto md:p-10 rounded-lg items-center justify-center m-4 gap-20">
            <div className="flex flex-col gap-10 md:w-[40%]">
                <div className="flex flex-col gap-5">
                    <h1 className="text-burntorange font-extrabold md:font-extrabold md:text-3xl text-3xl">Savor the Flavor. Anytime, Anywhere, Your Favorite Food Delivered!</h1>
                    <p className="text-red font-semibold text-md">From your cravings to your doorstep, we bring you delicious meals with just a few clicks!</p>
                </div>
                <div className="relative flex items-center gap-2 w-full">
                    <Input type="text" value={searchText} onChange={(event: ChangeEvent<HTMLInputElement>) => setSearchText(event.target.value)} className="pl-10 shadow-xl" />
                    <Search className="text-burntorange absolute inset-y-1.5 left-2" />
                    <Button className="bg-burntorange hover:bg-red">Search</Button>
                </div>
            </div>
            <div>
                <img src={HeroImage} alt="" className="object-cover w-full max-h-[500px] max-w-[90%]" />
            </div>
        </div>
    )
}

export default Hero