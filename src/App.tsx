import { Route, Routes } from 'react-router-dom'
import AuthLayout from './_auth/AuthLayout'
import Register from './_auth/Register'
import SignInForm from './_auth/forms/SignInForm'
import RootLayout from './_root/RootLayout'
import { About, Home, UpdateProfile, Writing } from './_root/pages'
import NookLayout from './_root/pages/NookLayout'
import { Toaster } from './components/ui/toaster'

function App() {

  return (
    <main className='flex h-screen'>
        <Routes>
            {/* public routes */}
            <Route element={<AuthLayout />}>
                <Route path='/sign-in' element ={<SignInForm />}/>
                <Route path='/register' element ={<Register />}/>
            </Route>

            {/* private routes */}
            <Route element={<RootLayout />}>
                <Route index element={<Home />}/>
                <Route path='/about' element={<About />}/>
                <Route path='/nook/:id' element={<NookLayout />}>
                  <Route path='/nook/:id/writing' element={<Writing />}/>
                  <Route path='/nook/:id/profile' element={<UpdateProfile />}/>
                </Route>
            </Route>

        </Routes>
        <Toaster />
    </main>
  )
}

export default App
