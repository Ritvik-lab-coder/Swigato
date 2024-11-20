import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator";
import { Loader2, LockKeyhole } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react"
import { Link } from "react-router-dom";

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState<string>("");
    const loading: boolean = false
    const handleResetPassword = (event: FormEvent) => {
        event.preventDefault();
        console.log(newPassword);
    }
    return (
        <div className="flex items-center justify-center min-h-screen w-full">
            <form onSubmit={handleResetPassword} className="flex flex-col gap-5 md:p-8 md:border w-full max-w-md rounded-lg mx-4">
                <div className="text-center">
                    <h1 className="font-extrabold text-2xl mb-2 text-burntorange">Reset Password</h1>
                </div>
                <div className="relative">
                    <Input type="password" onChange={(event: ChangeEvent<HTMLInputElement>) => setNewPassword(event.target.value)} value={newPassword} placeholder="Enter your new password" className="pl-10 focus-visible:ring-1" />
                    <LockKeyhole className="absolute inset-y-1.5 left-2 text-gray-500 pointer-events-none" />
                </div>
                {
                    loading ? <Button disabled className="bg-burntorange hover:bg-goldenyellow w-full py-4"><Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2>Please Wait...</Button> : <Button className="bg-burntorange hover:bg-goldenyellow w-full text-lg py-4" type="submit">Reset Password</Button>
                }
                <Separator />
                <div className="text-center">
                    <span className="text-center">
                        Back to <Link to={'/login'} className="text-blue-500">Login</Link>
                    </span>
                </div>
            </form>
        </div>
    )
}

export default ResetPassword