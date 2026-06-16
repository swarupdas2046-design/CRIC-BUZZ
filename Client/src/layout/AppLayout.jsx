import { Outlet } from "react-router"
import Navbar from "../components/Navbar"

const AppLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="mx-auto h-16 max-w-7xl py-10 px-6">
        <Outlet />
      </div>
    </div>
  )
}

export default AppLayout
