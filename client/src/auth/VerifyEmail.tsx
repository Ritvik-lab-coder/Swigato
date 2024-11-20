import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import { ChangeEvent, KeyboardEvent, useRef, useState } from "react"

const VerifyEmail = () => {
    const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""])
    const inputRef = useRef<any>([])
    const loading: boolean = false
    const handleChange = (index: number, value: string) => {
        if (/^[a-zA-Z0-9]$/.test(value) || value === "") {
            const newOtp = [...otp]
            newOtp[index] = value
            setOtp(newOtp)
        }
        if (value !== "" && index < 5) {
            inputRef.current[index + 1].focus()
        }
    }
    const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Backspace' && index > 0 && !otp[index]) {
            inputRef.current[index - 1].focus()
        }
    }
    return (
        <div className="flex items-center justify-center h-screen w-full">
            <div className="p-8 rounded-md w-full max-w-md flex-col gap-10 border border-gray-200">
                <div className="text-center mb-4">
                    <h1 className="text-3xl font-extrabold text-burntorange">Verify your Email</h1>
                    <p className="text-sm text-gray-600">Enter the 6 digit code sent to your email</p>
                </div>
                <form>
                    <div className="flex justify-between">
                        {
                            otp.map((letter: string, index: number) => {
                                return (
                                    <Input type="text" key={index} ref={(element) => (inputRef.current[index] = element)} value={letter} maxLength={1} onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(index, event.target.value)} onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => handleKeyDown(index, event)} className="md:w-12 md:h-12 w-8 h-8 text-center text-sm md:text-2xl font-normal md:font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                )
                            })
                        }
                    </div>
                    {
                        loading ? <Button disabled className="bg-burntorange hover:bg-goldenyellow w-full mt-6"><Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2>Please Wait...</Button> : <Button className="bg-burntorange hover:bg-goldenyellow w-full mt-6 text-lg font-semibold">Verify</Button>
                    }
                </form>
            </div>
        </div>
    )
}

export default VerifyEmail