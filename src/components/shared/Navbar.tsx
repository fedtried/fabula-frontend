import { useUserContext } from '@/context/AuthContext'
import { useSignOutAccount } from '@/queries/queries'
import { useEffect } from 'react'
import Avatar from 'react-avatar'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'

const Navbar = () => {
    const navigate = useNavigate()
    const {user} = useUserContext()
    const { mutate: signOut, isSuccess } = useSignOutAccount();

    useEffect(() => {
        if (isSuccess) navigate(0);
      }, [isSuccess]);

    return (
        <nav className="navbar flex flex-row justify-between px-10 drop-shadow-lg">
            <div className="flex-between py-4 px-5">
                <Link to='/' className="flex gap-3 items-center text-lg">
                    The Conclave
                </Link>
            </div>
            <div className="flex gap-4">
                <Button variant='ghost' className="button-ghost h-8" onClick={() => signOut()}>
                        <img className="w-4 h-4 " src="./assets/icons/logout.svg"/>
                </Button>
                <Link className="flex-center gap-3 h8" to={`/nook/${user.id}/writing`}>
                    <Avatar className="rounded-full" size="24" name={user.name} />
                </Link>
            </div>
        </nav>
    )
}

export default Navbar