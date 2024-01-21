import SideBar from '@/components/shared/SideBar'
import { Outlet } from 'react-router-dom'

const NookLayout = () => {
  return (
    <div className='flex w-full sm:flex-row flex-col'>
        <SideBar/>
        <section className='flex flex-1 h-full'>
          <Outlet />
        </section>
    </div>
  )
}

export default NookLayout