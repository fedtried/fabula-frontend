import Loader from '@/components/shared/Loader'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { useUserContext } from '@/context/AuthContext'
import { updateProfileFormSchema } from '@/lib/validation'
import { useDeleteUser, useGetUserById, useUpdateUser } from '@/queries/queries'
import { IUpdateUser } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { z } from 'zod'

const UpdateProfile = () => {
  const {toast} = useToast();
  const { user, setUser } = useUserContext();
  const { id } = useParams();
  const navigate = useNavigate()

  const { data: currentUser } = useGetUserById(id || "");
  const {mutateAsync: deleteUser, isPending: isLoadingDelete} = useDeleteUser()
  const { mutateAsync: updateProfile, isPending: isLoadingUpdate} = useUpdateUser();

  const form = useForm<z.infer<typeof updateProfileFormSchema>>({
    resolver: zodResolver(updateProfileFormSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      currentPassword: '',
      newPassword: ''
    },
  })

  if (!currentUser)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  async function onSubmit(values: z.infer<typeof updateProfileFormSchema>) {
    const newUser: IUpdateUser = {
      id : user.id,
      name: values.name,
      email: values.email,
      currentPassword: values.currentPassword
    }

    if(values.newPassword && values.newPassword.length > 0){
      newUser.newPassword = values.newPassword
    }
    const updatedUser = await updateProfile(newUser)

    if(!updatedUser){
      return toast({
        title: 'Failed to update. Please try again.'
      })
    }

    setUser({
      ...user,
      name: updatedUser.name,
      email: updatedUser.email
    })

  }


  async function deleteAccount(){
    const deletedAccount = await deleteUser(user.id)
    if(!deletedAccount){
      return toast({
        title: 'Something went wrong. Try again'
      })
    } else {
      localStorage.removeItem("user")
      navigate(0)
    }
  }

  return (
    <>
    {
      isLoadingDelete || isLoadingUpdate ? <Loader /> : (
      <div className='flex flex-col flex-1 w-full flex-center'>
        <div className='flex-col flex-center'>
          <h2 className='h1-bold md:h2-bold text-left w-full header-text text-center'>Update Profile</h2>
        </div>
        <Form {...form}>
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                      <Input type='text' placeholder="Email Address" {...field} />
                  </FormControl>
                  <FormMessage />
                  </FormItem>
              )}
              />
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                      <Input type='password' placeholder="Current password" {...field} />
                  </FormControl>
                  <FormMessage />
                  </FormItem>
              )}
              /> 

            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                      <Input type='password' placeholder="New password" {...field} />
                  </FormControl>
                  <FormMessage />
                  </FormItem>
              )}
              /> 


              <Button type="submit"> Save
              </Button>
          </form>
        </Form>
        <div className='border p-6 border-red-400 rounded-md flex flex-col gap-2 my-10'>
                <p>Want to remove your account?</p>
                <p className='subtle-semibold lg:small-regular text-grey'>This is a permenant action!</p>
                <Button variant="destructive" onClick={deleteAccount}>
                  Delete my account forever
                </Button>
        </div>
      </div>
      )
    }
    </>

  )
}

export default UpdateProfile