import RegisterForm from './forms/RegisterForm'

const Register = () => {
  return (
    <>
    <div className='sm:flex-row sm:flex sm:flex-1 '>
    <section className='flex flex-1 justify-between items-center bg-complement flex-col p-10 py-48 '>
            <h1 className='header-text h1-bold'>Welcome to Fabula</h1>
            <p>Your daily creative escape in the midst of a busy life. Life can be hectic, and we understand the importance of taking a moment for yourself. At Fabula, we believe in the power of creativity to rejuvenate the mind and spirit.</p>

            <h2 >Why Sign Up?</h2>
            <ul>
                <li><strong>Daily Writing Prompts:</strong> Unleash your creativity with a new writing prompt every day. Ignite your imagination and weave captivating stories that are exclusively yours.</li>
                <li><strong>Time-efficient Creativity:</strong> Designed for busy adults, our platform ensures that you can indulge in creativity without the need for extensive time commitments. A few minutes a day is all it takes to nurture your creative side.</li>
                <li><strong>Personalized Story Space:</strong> Save and revisit your creations in your personalized story space. Watch your creativity evolve over time and build a collection of stories that reflect your unique voice.</li>
            </ul>

            <p>Immerse yourself in a world where words flow freely, and imagination knows no bounds.</p>

        </section>
        <section className='flex flex-1 justify-center items-center py-10 flex-col'>
            <RegisterForm />
        </section>
    </div>

    </>
  )
}

export default Register