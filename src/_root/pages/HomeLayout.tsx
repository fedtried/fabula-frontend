import HomeSideBar from '@/components/shared/HomeSideBar'
import { Outlet } from 'react-router-dom'

const HomeLayout = () => {
  return (
    <div className='flex w-full sm:flex-row flex-col'>
        <HomeSideBar/>
        <section className='flex flex-col flex-1 h-[90%] sm:border my-auto sm:mr-20 overflow-y-auto border-white rounded-lg'>
          <Outlet />
        </section>
    </div>
  )
}

export default HomeLayout