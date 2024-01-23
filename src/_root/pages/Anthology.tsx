import Loader from "@/components/shared/Loader"
import StoriesCard from "@/components/shared/StoriesCard"
import { useGetStoriesByDate } from "@/queries/queries"
import { IStory } from "@/types"
import { useEffect, useState } from "react"

const Anthology = () => {
    const [date, setDate] = useState('')
    const [epDate, setEpDate] = useState('')
    const {data: stories, isPending: isStoriesLoading} = useGetStoriesByDate(epDate)

    useEffect(() => {
        const unparsed = new Date
        const d = new Date
        setEpDate(d.getFullYear() + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2))
        setDate(unparsed.toDateString())
      }, [])

    return (
        <>
        <div className="w-full flex-row flex justify-between p-3 bg-orange">
           <h1 className="header-text h1-bold">Anthology</h1> <span className="text-sm header-text text-grey">{date}</span>
        </div>
        {isStoriesLoading ? (
            <Loader />
          ) : <>
            {stories && stories.length === 0 ? <p className="flex-col home-container w-full">No one has shared anything yet. Want to be the first?</p> : (
                <>
                <div className="flex-col home-container w-full">
                    <div className=' flex-col flex-center'>
                        <h1 className='header-text text-xl text-center'>"{stories![0].quote}"</h1>
                    </div>
                    <ul className='flex flex-col flex-1 gap-9 w-full'>
                        {stories?.map((story:IStory, i:number) => (
                            <>
                                <StoriesCard key={i} writing={story.writing} name={story.name}/>
                            </>
                        ))}
                    </ul>
                </div>

                </>

              )
            }
            </>
          }
        </>
    )
}

export default Anthology