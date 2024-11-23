import { Link } from "react-router-dom"
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "./ui/menubar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import { HandPlatter, Loader2, Menu, Moon, PackageCheck, ShoppingCart, SquareMenu, Sun, User2, UtensilsCrossed } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Separator } from "./ui/separator"

const Navbar = () => {
    const admin: boolean = false
    const loading: boolean = false
    return (
        <div className="max-w-7xl mx-auto px-2">
            <div className="flex items-center justify-between h-14">
                <Link to={'/'}>
                    <h1 className="font-bold md:font-extrabold text-3xl text-burntorange">Swigato</h1>
                </Link>
                <div className="hidden md:flex items-center gap-10">
                    <div className="hidden md:flex items-center gap-6">
                        <Link to={'/'} className="text-burntorange font-semibold">Home</Link>
                        <Link to={'/profile'} className="text-burntorange font-semibold">Profile</Link>
                        <Link to={'/orders/status'} className="text-burntorange font-semibold">Orders</Link>
                        {
                            admin && (
                                <Menubar className="border-burntorange">
                                    <MenubarMenu>
                                        <MenubarTrigger className="text-burntorange font-semibold">
                                            Dashboard
                                        </MenubarTrigger>
                                        <MenubarContent>
                                            <Link to={'/admin/restaurant'} className="text-burntorange font-semibold"><MenubarItem>Restaurant</MenubarItem></Link>
                                            <Link to={'/admin/menu'} className="text-burntorange font-semibold"><MenubarItem>Menu</MenubarItem></Link>
                                            <Link to={'/admin/orders'} className="text-burntorange font-semibold"><MenubarItem>Orders</MenubarItem></Link>
                                        </MenubarContent>
                                    </MenubarMenu>
                                </Menubar>
                            )
                        }

                    </div>
                    <div className="flex items-center gap-4">
                        <div>
                            <Link to={'/cart'} className="relative cursor-pointer text-burntorange font-semibold">
                                <ShoppingCart />
                                <Button size={'icon'} className="absolute -inset-y-3 left-2 text-xs rounded-full h-4 w-4 bg-burntorange hover:bg-red">5</Button>
                            </Link>
                        </div>
                        <div>
                            <Avatar>
                                <AvatarImage />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </div>
                        <div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="icon">
                                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                        <span className="sr-only">Toggle theme</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem >
                                        Light
                                    </DropdownMenuItem>
                                    <DropdownMenuItem >
                                        Dark
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <div>
                            {
                                loading ? <Button disabled className="bg-burntorange hover:bg-red"><Loader2 className="mr-2 h-4 w-4 animate-spin" />Please Wait...</Button> : <Button className="bg-burntorange hover:bg-red">Logout</Button>
                            }
                        </div>
                    </div>
                </div>
                <div className="md:hidden lg:hidden">
                    <MobileNavbar />
                </div>
            </div>
        </div>
    )
}

export default Navbar

const MobileNavbar = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size={'icon'} className="rounded-full bg-gray-200 text-burntorange hover:bg-gray-300"><Menu size={'18'} /></Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col">
                <SheetHeader className="flex flex-row items-center justify-between mt-4">
                    <SheetTitle className="text-burntorange font-bold">Swigato</SheetTitle>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                <span className="sr-only">Toggle theme</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem >
                                Light
                            </DropdownMenuItem>
                            <DropdownMenuItem >
                                Dark
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SheetHeader>
                <Separator />
                <SheetDescription className="flex-1">
                    <Link to={'/profile'} className="flex items-center gap-4 hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer hover:text-red text-burntorange font-medium">
                        <User2 />
                        <span>Profile</span>
                    </Link>
                    <Link to={'/profile'} className="flex items-center gap-4 hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer hover:text-red text-burntorange font-medium">
                        <HandPlatter />
                        <span>Orders</span>
                    </Link>
                    <Link to={'/cart'} className="flex items-center gap-4 hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer hover:text-red text-burntorange font-medium">
                        <ShoppingCart />
                        <span>Cart (0)</span>
                    </Link>
                    <Link to={'/profile'} className="flex items-center gap-4 hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer hover:text-red text-burntorange font-medium">
                        <SquareMenu />
                        <span>Menu</span>
                    </Link>
                    <Link to={'/profile'} className="flex items-center gap-4 hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer hover:text-red text-burntorange font-medium">
                        <UtensilsCrossed />
                        <span>Restaurant</span>
                    </Link>
                    <Link to={'/profile'} className="flex items-center gap-4 hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer hover:text-red text-burntorange font-medium">
                        <PackageCheck />
                        <span>Restaurant Orders</span>
                    </Link>
                </SheetDescription>
                <SheetFooter className="flex flex-col gap-3">
                    <div className="flex flex-row items-center gap-2">
                        <Avatar>
                            <AvatarImage />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <h1 className="font-bold text-xl text-red">Ritvik Sharma</h1>
                    </div>
                    <SheetClose asChild>
                        <Button className="bg-burntorange hover:bg-red">Logout</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}