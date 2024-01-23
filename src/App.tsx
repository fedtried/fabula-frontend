import { Route, Routes } from 'react-router-dom'
import AuthLayout from './_auth/AuthLayout'
import Register from './_auth/Register'
import SignInForm from './_auth/forms/SignInForm'
import RootLayout from './_root/RootLayout'
import { About, Home, UpdateProfile, Writing } from './_root/pages'
import Anthology from './_root/pages/Anthology'
import Guidelines from './_root/pages/General/Guidelines'
import Privacy from './_root/pages/General/Privacy'
import HomeLayout from './_root/pages/HomeLayout'
import NookLayout from './_root/pages/NookLayout'
import { Toaster } from './components/ui/toaster'

function App() {

  return (
    <main className='flex h-screen'>
        <Routes>
            {/* public routes */}
            <Route element={<AuthLayout />}>
                <Route index path='/sign-in' element ={<SignInForm />}/>
                <Route path='/register' element ={<Register />}/>
            </Route>

            {/* private routes */}
            <Route element={<RootLayout />}>
                <Route path='/' element={<HomeLayout />}>
                <Route path='/' element={<Home />}/>
                  <Route path='/anthology' element={<Anthology />}/>
                </Route>
                
                <Route path='/about' element={<About />}/>
                <Route path='/guidelines' element={<Guidelines />}/>
                <Route path='/privacy' element={<Privacy />}/>

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
