
import Loader from '@/components/shared/Loader'
import StoriesCard from '@/components/shared/StoriesCard'
import { useUserContext } from '@/context/AuthContext'
import { useGetUserStories } from '@/queries/queries'
import { IStory } from '@/types'

const Writing = () => {
  const {user} = useUserContext()
  const {data: stories} = useGetUserStories(user.id)

  return (
    <div className='flex flex-1'>
      <div className='home-container'>
        <div className='home-posts'>
          <h2 className='h1-bold md:h2-bold text-left w-full'>My Stories</h2>
          {!user ? (
            <Loader />
          ) : <>
            {stories && stories.length === 0 ? <p>You haven't written any stories!</p> :(
                  <ul className='flex flex-col flex-1 gap-9 w-full'>
                  {stories?.map((story:IStory, i:number) => (

                    <>
                    <StoriesCard key={i} writing={story.writing} date={story.date} quote={story.quote}/>
                    </>

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