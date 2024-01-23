import { PiAlarmLight, PiBookmarksLight, PiLightbulbLight } from "react-icons/pi";
import RegisterForm from './forms/RegisterForm';

const Register = () => {
  return (
    <>
    <div className='sm:flex-row sm:flex sm:flex-1 '>
    <section className='flex flex-1 justify-between items-center bg-complement flex-col p-10 py-48 '>
            <h1 className='header-text h1-bold'>Welcome to The Conclave</h1>
            <p className="my-5 text-center">Your daily creative escape in the midst of a busy life.</p>

            <div className=' grid grid-rows-1 grid-flow-col '>
              <div className='flex flex-col items-center text-center gap-2 '>
                <PiLightbulbLight /> 
                <p>Unleash your creativity with a new writing prompt every day.</p>
              </div>
              <div className='flex flex-col items-center text-center gap-2 '>
              <PiAlarmLight />
                <p>A few minutes a day is all it takes to nurture your creative side.</p>
              </div>
              <div className='flex flex-col items-center text-center gap-2 '>
              <PiBookmarksLight />
                <p>Save and revisit your creations in your personalized story space.</p>
              </div>
            </div>

            <p className="my-5 text-center">Immerse yourself in a world where words flow freely, and imagination knows no bounds.</p>

        </section>
        <section className='flex flex-1 justify-center items-center py-10 flex-col'>
            <RegisterForm />
        </section>
    </div>

    </>
  )
}

export default Register