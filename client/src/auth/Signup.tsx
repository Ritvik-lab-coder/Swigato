import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { SignupInputState, userSignupSchema } from "@/schema/userSchema"
import { Loader2, LockKeyhole, Mail, PhoneIcon, User2 } from "lucide-react"
import { ChangeEvent, FormEvent, useState } from "react"
import { Link } from "react-router-dom"

const Signup = () => {
    const [input, setInput] = useState<SignupInputState>({
        fullname: "",
        email: "",
        password: "",
        contact: ""
    })
    const [errors, setErrors] = useState<Partial<SignupInputState>>({})
    const changeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setInput({ ...input, [name]: value })
    }
    const signupSubmitHandler = async (event: FormEvent) => {
        event.preventDefault()
        const result = userSignupSchema.safeParse(input)
        if (!result.success) {
            const fieldError = result.error.formErrors.fieldErrors
            setErrors(fieldError as Partial<SignupInputState>)
            return
        }
        setErrors({})
        console.log(input)
    }
    const loading: boolean = false
    return (
        <div className="flex items-center justify-center min-h-screen">
            <form onSubmit={signupSubmitHandler} className="md:p-8 w-full max-w-md rounded-lg border md:border-gray-200">
                <div className="mb-4">
                    <h1 className="font-bold text-5xl text-burntorange">Swigato</h1>
                </div>
                <div className="mb-4">
                    <div className="relative">
                        <Input type="text" name="fullname" placeholder="Enter your Name" className="pl-10 focus-visible:ring-1" value={input.fullname} onChange={changeEventHandler} />
                        <User2 className="absolute inset-y-1.5 left-2 text-gray-500 pointer-events-none" />
                        {
                            errors && <span className="text-sm text-red">{errors.fullname}</span>
                        }
                    </div>
                </div>
                <div className="mb-4">
                    <div className="relative">
                        <Input type="email" name="email" placeholder="Enter your email" className="pl-10 focus-visible:ring-1" value={input.email} onChange={changeEventHandler} />
                        <Mail className="absolute inset-y-1.5 left-2 text-gray-500 pointer-events-none" />
                        {
                            errors && <span className="text-sm text-red">{errors.email}</span>
                        }
                    </div>
                </div>
                <div className="mb-4">
                    <div className="relative">
                        <Input type="password" name="password" placeholder="Enter your Password" className="pl-10 focus-visible:ring-1" value={input.password} onChange={changeEventHandler} />
                        <LockKeyhole className="absolute inset-y-1.5 left-2 text-gray-500 pointer-events-none" />
                        {
                            errors && <span className="text-sm text-red">{errors.password}</span>
                        }
                    </div>
                </div>
                <div className="mb-4">
                    <div className="relative">
                        <Input type="text" name="contact" placeholder="Enter your Phone No." className="pl-10 focus-visible:ring-1" value={input.contact} onChange={changeEventHandler} />
                        <PhoneIcon className="absolute inset-y-1.5 left-2 text-gray-500 pointer-events-none" />
                        {
                            errors && <span className="text-sm text-red">{errors.contact}</span>
                        }
                    </div>
                </div>
                <div className="mb-4">
                    {
                        loading ? <Button disabled className="bg-burntorange hover:bg-goldenyellow w-full py-4"><Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2>Please Wait...</Button> : <Button className="bg-burntorange hover:bg-goldenyellow w-full text-xl font-bold py-4" type="submit">Sign Up</Button>
                    }
                </div>
                <Separator />
                <p className="mt-4">Already have an account ? <Link to={'/login'} className="text-blue-500">Login</Link></p>
            </form>
        </div>
    )
}

export default Signup