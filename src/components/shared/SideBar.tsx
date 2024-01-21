import { sidebarLinks } from '@/constants';
import { useUserContext } from '@/context/AuthContext';
import { INavLink } from '@/types';
import Avatar from 'react-avatar';
import { Link, useLocation } from 'react-router-dom';

const SideBar = () => {
    const {user} = useUserContext()
    const {pathname} = useLocation()

    return (
        <section className="leftsidebar border-r-2 border-r-gray-400">
            <div className="flex sm:flex-col gap-4 sm:gap-11">
                <div className="flex gap-2 flex-center">
                    <Avatar className="h-14 w-14 rounded-full" name={user.name} />
                    <div>
                        <p className="h3-bold">{user.name}</p>
                        <p className="text-grey text-sm">{user.email}</p>
                    </div>
                </div>

                {sidebarLinks.map((link: INavLink) => {
                    const isActive = pathname === ( `/nook/${user.id}` + link.route )

                    return (
                        <Link className={`flex sm:gap-3 items-center pl-1 sm:p-6 rounded-md hover:underline ${isActive && 'bg-complement'}`} to={`/nook/${user.id}` + link.route} key={link.label}>
                            {link.label}
                        </Link>
                    )
                })}

            </div>
        </section>
    )
}

export default SideBar