
import Loader from '@/components/shared/Loader'
import StoriesCard from '@/components/shared/StoriesCard'
import { useUserContext } from '@/context/AuthContext'

const Writing = () => {
  const {user} = useUserContext()

  return (
    <div className='flex flex-1'>
      <div className='home-container'>
        <div className='home-posts'>
          <h2 className='h1-bold md:h2-bold text-left w-full'>My Stories</h2>
          {!user ? (
            <Loader />
          ) : <>
            {user.stories && user.stories.length === 0 ? <p>You haven't written any stories!</p> :(
                  <ul className='flex flex-col flex-1 gap-9 w-full'>
                  {user.stories?.map((story:any, i:any) => (
                    <StoriesCard key={i}/>
                  ))}
                </ul>
              )
            }
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default Writing