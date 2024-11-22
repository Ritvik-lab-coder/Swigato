import { Earth, EarthIcon, LocateIcon, Mail, MapPin, Plus, WholeWord } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { ChangeEvent, FormEvent, useRef, useState } from "react"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

const Profile = () => {
    const [profileData, setProfileData] = useState({
        fullname: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        country: "",
        profilePic: ""
    })
    const imageRef = useRef<HTMLInputElement | null>(null)
    const [selectedProfilePic, setSelectedProfilePic] = useState<string>("")
    const fileChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                const result = reader.result as string
                setSelectedProfilePic(result)
                setProfileData((prev) => ({
                    ...prev,
                    profilePic: result
                }))
            }
            reader.readAsDataURL(file)
        }
    }
    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setProfileData({ ...profileData, [name]: value })
    }
    const updateProfileHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log(profileData)
    }
    return (
        <form className="max-w-7xl mx-auto my-5">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Avatar className="relative md:w-28 md:h-28 w-20 h-20">
                        <AvatarImage />
                        <AvatarFallback>CN</AvatarFallback>
                        <input ref={imageRef} type="file" className="hidden" accept="image/*" onChange={fileChangeHandler} />
                        <div onClick={() => imageRef.current?.click()} className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 rounded-full cursor-pointer">
                            <Plus className="text-burntorange w-8 h-8" />
                        </div>
                    </Avatar>
                    <Input type="text" name={profileData.fullname} onChange={changeHandler} className="font-bold text-2xl outline-none border-none text-burntorange focus-visible:ring-transparent" />
                </div>
            </div>
            <div className="grid md:grid-cols-4 md:gap-2 gap-3 my-10">
                <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
                    <Mail className="text-burntorange" />
                    <div className="w-full">
                        <Label>Email</Label>
                        <input name="email" value={profileData.email} onChange={changeHandler} className="w-full text-burntorange bg-transparent focus-visible:ring-transparent focus-visible:border-transparent outline-none border-none" />
                    </div>
                </div>
                <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
                    <LocateIcon className="text-burntorange" />
                    <div className="w-full">
                        <Label>Address</Label>
                        <input name="address" value={profileData.address} onChange={changeHandler} className="w-full text-burntorange bg-transparent focus-visible:ring-transparent focus-visible:border-transparent outline-none border-none" />
                    </div>
                </div>
                <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
                    <MapPin className="text-burntorange" />
                    <div className="w-full">
                        <Label>City</Label>
                        <input name="city" value={profileData.city} onChange={changeHandler} className="w-full text-burntorange bg-transparent focus-visible:ring-transparent focus-visible:border-transparent outline-none border-none" />
                    </div>
                </div>
                <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
                    <Earth className="text-burntorange" />
                    <div className="w-full">
                        <Label>Country</Label>
                        <input name="country" value={profileData.country} onChange={changeHandler} className="w-full text-burntorange bg-transparent focus-visible:ring-transparent focus-visible:border-transparent outline-none border-none" />
                    </div>
                </div>
            </div>
            <div className="text-center">

            </div>
        </form>
    )
}

export default Profile