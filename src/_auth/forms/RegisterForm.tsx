/* eslint-disable @typescript-eslint/no-unused-vars */
import Loader from '@/components/shared/Loader'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from '@/components/ui/use-toast'
import { useUserContext } from '@/context/AuthContext'
import { registerFormSchema } from '@/lib/validation'
import { useCreateUseAccount } from '@/queries/queries'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'

const RegisterForm = () => {
    const {toast} = useToast();
    const {checkAuthUser} = useUserContext();
    const navigate = useNavigate()

    const {mutateAsync: createUserAccount, isPending: isCreatingUser} = useCreateUseAccount();

    const form = useForm<z.infer<typeof registerFormSchema>>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
          name: "",
          email: "",
          password: "",
        },
      })

    async function onSubmit(values: z.infer<typeof registerFormSchema>) {
        const newUser = await createUserAccount(values)
        if(!newUser){
            return toast({
                title: 'Login failed. Please try again.'
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
            <Form {...form}>
                <div className='sm:w-420 flex-col flex-center'>
                    <h2 className='h3-bold md:h2-bold pt-5 sm:pt-12'>Create an account</h2>
                    <p className='text-grey md:base-regular'>To get started, just register your information.</p>
                </div>

                <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-64 flex-col gap-5 mt-4">
                    <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                            <Input type='text' placeholder="Username" {...field} />
                        </FormControl>
                        <FormDescription>
                            This is your public display name.
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
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
                            isCreatingUser ? (
                                <div className='flex-center gap-2'>
                                    <Loader/> Loading...
                                </div>
                            ) : 'Register'
                        }
                    </Button>

                    <p className='text-small-regular text-grey text-center mt-2'>
                        Already have an account?
                        <Link to='/sign-in' className='text-orange underline text-small-semibold ml-1'>Log in</Link>
                    </p>
                </form>
            </Form>
            <p className='text-small-regular text-grey text-center mt-2 text-xs' >OR</p>
            <a className='text-small-regular text-grey text-center mt-2' href="/oauth2/authorization/google">Login with Google</a>
        </>
    )
}

export default RegisterForm