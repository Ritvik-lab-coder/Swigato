import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator";
import { Loader2, Mail } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react"
import { Link } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState<string>("");
    const loading: boolean = false
    const handleResetPassword = (event: FormEvent) => {
        event.preventDefault();
        console.log(email);
    }
    return (
        <div className="flex items-center justify-center min-h-screen w-full">
            <form onSubmit={handleResetPassword} className="flex flex-col gap-5 md:p-8 md:border w-full max-w-md rounded-lg mx-4">
                <div className="text-center">
                    <h1 className="font-extrabold text-2xl mb-2 text-burntorange">Forgot Password</h1>
                    <p className="text-sm text-gray-500">Enter your email address to reset your password</p>
                </div>
                <div className="relative">
                    <Input type="email" onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)} value={email} placeholder="Enter your email" className="pl-10 focus-visible:ring-1" />
                    <Mail className="absolute inset-y-1.5 left-2 text-gray-500 pointer-events-none" />
                </div>
                {
                    loading ? <Button disabled className="bg-burntorange hover:bg-goldenyellow w-full py-4"><Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2>Please Wait...</Button> : <Button className="bg-burntorange hover:bg-goldenyellow w-full text-lg py-4" type="submit">Send Reset Link</Button>
                }
                <Separator />
                <div className="flex items-center justify-center">
                    <span>
                        Back to <Link to={'/login'} className="text-blue-500">Login</Link>
                    </span>
                </div>
            </form>
        </div>
    )
}

export default ForgotPassword