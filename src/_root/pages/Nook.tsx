import SideBar from '@/components/shared/SideBar'
import { Outlet } from 'react-router-dom'

const Nook = () => {
  return (
    <>
        <SideBar />
        <Outlet />
    </>
  )
}

export default Nook