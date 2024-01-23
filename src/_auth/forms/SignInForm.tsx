import Loader from '@/components/shared/Loader'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from '@/components/ui/use-toast'
import { useUserContext } from '@/context/AuthContext'
import { signInFormSchema } from '@/lib/validation'
import { useSignInAccount } from '@/queries/queries'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'

const SignInForm = () => {
  const {toast} = useToast();
  const {checkAuthUser, isLoading: isUserLoading} = useUserContext();
  const navigate = useNavigate()

  const {mutateAsync: signInAccount} = useSignInAccount()

  const form = useForm<z.infer<typeof signInFormSchema>>({
      resolver: zodResolver(signInFormSchema),
      defaultValues: {
        email: "",
        password: "",
      },
    })

  async function onSubmit(values: z.infer<typeof signInFormSchema>) {
      const session = await signInAccount({
          email: values.email,
          password: values.password
      })

      if(!session){
          return toast({
              title: 'Log in failed. Please try again.'
          })
      }

      const isLoggedIn = await checkAuthUser();
      if(isLoggedIn){
          form.reset();
          navigate('/')
      } else {
          return toast({title: 'Login failed. Please try again.'})
      }
  }

  return (
      <>
      <section className='flex flex-1 justify-center items-center py-10 flex-col'>
          <Form {...form}>
              <div className='sm:w-420 flex-col flex-center'>
                  <h2 className='h3-bold md:h2-bold pt-5 sm:pt-12'>Welcome Back!</h2>
                  <p className='text-grey md:base-regular'>Login with your details to start writing.</p>
              </div>

              <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-64 flex-col gap-5 mt-4">
                  <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                          <Input type='email' placeholder="Email address" {...field} />
                      </FormControl>
                      <FormMessage />
                      </FormItem>
                  )}
                  />
                  <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                          <Input type='password' placeholder="Password" {...field} />
                      </FormControl>
                      <FormMessage />
                      </FormItem>
                  )}
                  />
                  <Button type="submit">
                      {
                          isUserLoading ? (
                              <div className='flex-center gap-2'>
                                  <Loader/> Loading...
                              </div>
                          ) : 'Login'
                      }
                  </Button>

                  <p className='text-small-regular text-grey text-center mt-2'>
                      Need an account?
                      <Link to='/register' className='text-orange underline text-small-semibold ml-1'>Register now</Link>
                  </p>
              </form>
          </Form>
          <p className='text-small-regular text-grey text-center mt-2 text-xs' >OR</p>
        <a className='text-small-regular text-grey text-center mt-2' href="/oauth2/authorization/google">Login with Google</a>
          </section>
      </>
  )
}

export default SignInForm