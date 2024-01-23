import SideBar from '@/components/shared/SideBar'
import { Outlet } from 'react-router-dom'

const NookLayout = () => {
  return (
    <div className='flex w-full sm:flex-row flex-col'>
        <SideBar/>
        <section className='flex flex-1 h-[90%] sm:border my-auto sm:mr-20 overflow-y-auto border-white  rounded-lg'>
          <Outlet />
        </section>
    </div>
  )
}

export default NookLayout