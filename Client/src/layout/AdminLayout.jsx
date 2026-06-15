import {Outlet} from 'react-router'
import Navbar from '../components/Navbar'
const AdminLayout = () => {
  return (
    <div>
        <Outlet />
    </div>
  )
}

export default AdminLayout
