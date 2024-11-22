import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { Outlet } from "react-router-dom"

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen md:m-0">
            <header>
                <Navbar />
            </header>
            <div className="flex-1 m-2">
                <Outlet />
            </div>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default MainLayout