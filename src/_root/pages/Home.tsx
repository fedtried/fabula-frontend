import CompletedStory from "@/components/shared/CompletedStory"
import Loader from "@/components/shared/Loader"
import Timer from "@/components/shared/Timer"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from '@/components/ui/use-toast'
import { useUserContext } from "@/context/AuthContext"
import { storyFormSchema } from "@/lib/validation"
import { useCreateStory, useGetPromptByDate } from "@/queries/queries"
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
  const [expired, setExpired] = useState(false)
  const {user} = useUserContext()
  const {toast} = useToast()
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof storyFormSchema>>({
    resolver: zodResolver(storyFormSchema),
    defaultValues: {
      writing: "",
      share: false
    },
  });
  const time = new Date();
  time.setSeconds(time.getSeconds() + 900);
  let cardContent = <HoverCardContent className="text-xs text-muted-foreground"> Use the daily prompt to write a short story. In this mode, you only have 1 chance to save your work and then you're done for the day. </HoverCardContent>
  let word = false;
  let timer = false;
  const {mutateAsync: createStory, isPending: isLoadingCreate} = useCreateStory()
  const {data: quote, isPending: isPromptsLoading, isSuccess: promptSuccess} = useGetPromptByDate(epDate, user.id)

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
    }
  }

  useEffect(() => {
    if(quote){
      if("mode" in quote){
        if (quote.mode == 'word') {
          cardContent = <HoverCardContent className="text-xs text-muted-foreground"> Use the daily prompt to write a short story. In this mode, you'll have a maximum of 500 words so watch the word count! </HoverCardContent>
          word = true;
        } else if (quote.mode == 'time') {
          timer = true;
          cardContent = <HoverCardContent className="text-xs text-muted-foreground"> Use the daily prompt to write a short story. In this mode, you'll be under a time limit so watch that timer! </HoverCardContent>
        }
      }
    }
  }, [promptSuccess])

  const handleExpire = () => {
    setExpired(true)
    const value = {
      writing: form.getValues().writing,
      share: form.getValues().share
    }
    onSubmit(value)
  };

  return (
    <>
        <div className="w-full flex-row flex justify-between p-3 bg-orange">
           <h1 className="header-text h1-bold">Writing Zone</h1> <span className="text-sm header-text text-grey">{date}</span>
        </div>
          {!isPromptsLoading && quote && ("quote" in quote) && !("written" in quote) ? (
            <Form {...form}>
              <div className="home-container w-full">
              <div className='flex-col flex-center'>
                    <h1 className='header-text text-xl text-center'>"{quote.quote}"</h1>
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
                              className="w-full h-[360px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                          <div className="flex flex-row justify-between">
                            <p className="text-sm text-muted-foreground">
                              
                            </p>
                            {timer ? <Timer onExpire={handleExpire} expiryTimestamp={time} /> : ( 
                            <>
                              {wordCount} {wordCount > 1 || wordCount == 0 ? `words` : `word`}
                            </> ) }
                          </div>
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                    <div>
                      <HoverCard>
                        <HoverCardTrigger className="text-xs text-muted-foreground cursor-pointer hover:underline" >What is the writing zone?</HoverCardTrigger>
                        {cardContent}
                      </HoverCard>
                    </div>
                    <div className="button-grp flex sm:flex-row flex-col-reverse items-center">
                    <Button name="save" value="save" type="submit" disabled={(wordCount < 5) || (word && wordCount > 500) || (timer && expired)}  className="max-w-sm flex-center">
                          {
                              isLoadingCreate ? (
                                  <div className='flex-center gap-2'>
                                      <Loader/> Loading...
                                  </div>
                              ) : 
                              'Save'
                           }
                      </Button>
                    <FormField
                      control={form.control}
                      name="share"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 ml-5">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                            Publish my story to today’s Anthology.
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
  
                    </div>
                </form>
              </div>
            </Form>
            ) : 
            <>
              <CompletedStory />
            </>
            }
        </>
  )
}

export default Home