import Loader from "@/components/shared/Loader"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from '@/components/ui/use-toast'
import { useUserContext } from "@/context/AuthContext"
import { storyFormSchema } from "@/lib/validation"
import { useCreateStory, useGetAllModes, useGetPromptByDate } from "@/queries/queries"
import { zodResolver } from "@hookform/resolvers/zod"
import { HoverCard } from "@radix-ui/react-hover-card"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { z } from "zod"

const Home = () => {
  const [date, setDate] = useState('')
  const [epDate, setEpDate] = useState('')
  const [wordCount, setWordCount] = useState(0)
  const {user} = useUserContext()
  const {toast} = useToast()
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof storyFormSchema>>({
    resolver: zodResolver(storyFormSchema),
    defaultValues: {
      writing: "",
    },
  });

  const {mutateAsync: createStory, isPending: isLoadingCreate} = useCreateStory()
  const {data: quote, isPending: isPromptsLoading} = useGetPromptByDate(epDate, user.id)
  const {data: mode, isFetching: isLoadingMode} = useGetAllModes()

  useEffect(() => {
    const unparsed = new Date
    const d = new Date
    setEpDate(d.getFullYear() + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2))
    setDate(unparsed.toDateString())
  }, [])
  
  async function onSubmit (value: z.infer<typeof storyFormSchema>) {
  if ("id" in quote! && "quote" in quote && "date" in quote) {
    const newPost = await createStory({
      ...value,
      userId: user.id,
      promptId: quote.id,
      date: epDate,
      quote: quote.quote,
    });
    if (!newPost) {
      toast({
        title: `Story failed. Please try again.`,
      });
    }

    navigate(`/nook/${user.id}/writing`);
  } else {
    console.error("Invalid quote format:", quote);
  }
  }

  let cardContent;
  let word = false;
  if (mode?.mode_name == 'standard') {
    cardContent = <HoverCardContent className="text-xs text-muted-foreground"> Use the daily prompt to write a short story. In this mode, you only have 1 chance to save your work and then you're done for the day. </HoverCardContent>
  } else if (mode?.mode_name == 'time') {
    cardContent = <HoverCardContent className="text-xs text-muted-foreground"> Use the daily prompt to write a short story. In this mode, you'll be under a time limit so watch that timer! </HoverCardContent>
  } else {
    cardContent = <HoverCardContent className="text-xs text-muted-foreground"> Use the daily prompt to write a short story. In this mode, you'll have a maximum of 500 words so watch the word count! </HoverCardContent>
    word = true;
  }

  return (
    <>
          {!isPromptsLoading && quote && ("quote" in quote) && !("written" in quote) ? (
            <Form {...form}>
              <div className="home-container w-full">
              <div className='sm:w-420 flex-col flex-center'>
                    <h3 className='header-text text-grey'>{date}</h3>
                    <h1 className='header-text h1-semibold text-center'>"{quote.quote}"</h1>
                </div>

                <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-64 flex-col gap-5 mt-4 w-full">
                    <FormField
                      control={form.control}
                      name="writing"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              onChangeCapture={(e) => {
                                const wc = !e.currentTarget.value.length ? 0 : e.currentTarget.value.split(' ').length
                                setWordCount(wc)
                              }}
                              placeholder="Write your story here"
                              className="shad-textarea w-full"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                   <p className="text-sm text-muted-foreground">
                     {wordCount} {wordCount > 1 ? `words` : `word`}
                   </p>
                   {
                      !isLoadingMode ? 
                        <HoverCard>
                          <HoverCardTrigger className="text-xs text-muted-foreground cursor-pointer hover:underline" >How does this work?</HoverCardTrigger>
                          {cardContent}
                        </HoverCard>
                    : ''
                   }
                    <Button type="submit" disabled={(wordCount < 5) || (word && wordCount > 500)}  className="max-w-sm flex-center m-auto">
                        {
                            isLoadingCreate ? (
                                <div className='flex-center gap-2'>
                                    <Loader/> Loading...
                                </div>
                            ) : 'Save'
                        }
                    </Button>
                </form>
              </div>
            </Form>
            ) : <>
                  <div className="flex-center m-auto flex-col gap-5">
                    <p className="header-text small text-grey">{date}</p>
                    <h1 className="h1-bold text-center">You have already written todays story!</h1>
                    <h3>Come back again tomorrow to try out the next prompt</h3>
                    <p className="subtle-semibold text-grey">Or head over to your Nook to read through your old ones.</p>
                  </div>
            </>

            }
        </>
  )
}

export default Home