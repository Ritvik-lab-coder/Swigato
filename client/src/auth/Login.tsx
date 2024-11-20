import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { LoginInputState, userLoginSchema } from "@/schema/userSchema"
import { Loader2, LockKeyhole, Mail } from "lucide-react"
import { ChangeEvent, FormEvent, useState } from "react"
import { Link } from "react-router-dom"

const Login = () => {
    const [input, setInput] = useState<LoginInputState>({
        email: "",
        password: "",
    })
    const [errors, setErrors] = useState<Partial<LoginInputState>>({});
    const changeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setInput({ ...input, [name]: value })
    }
    const loginSubmitHandler = (event: FormEvent) => {
        event.preventDefault()
        const result = userLoginSchema.safeParse(input)
        if (!result.success) {
            const fieldErrors = result.error.formErrors.fieldErrors
            setErrors(fieldErrors as Partial<LoginInputState>)
            return
        }
        setErrors({})
        console.log(input)
    }
    const loading: boolean = false
    return (
        <div className="flex items-center justify-center min-h-screen">
            <form onSubmit={loginSubmitHandler} className="md:p-8 w-full max-w-md rounded-lg border md:border-gray-200">
                <div className="mb-4">
                    <h1 className="font-bold text-5xl text-burntorange">Swigato</h1>
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
                    {
                        loading ? <Button disabled className="bg-burntorange hover:bg-goldenyellow w-full py-4"><Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2>Please Wait...</Button> : <Button className="bg-burntorange hover:bg-goldenyellow w-full text-xl font-bold py-4" type="submit">Login</Button>
                    }
                    <div className="mt-4">
                        <Link to={'/forgot-password'} className="text-blue-500">Forgot Password ?</Link>
                    </div>
                </div>
                <Separator />
                <p className="mt-4">Don't have an account ? <Link to={'/signup'} className="text-blue-500">Sign Up</Link></p>
            </form>
        </div>
    )
}

export default Login