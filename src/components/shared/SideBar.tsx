import { sidebarLinks } from '@/constants';
import { useUserContext } from '@/context/AuthContext';
import { INavLink } from '@/types';
import Avatar from 'react-avatar';
import { LuBookKey, LuPencilLine } from "react-icons/lu";
import { Link, useLocation } from 'react-router-dom';

const SideBar = () => {
    const {user} = useUserContext()
    const {pathname} = useLocation()
    const icons = [
        <LuBookKey />,
        <LuPencilLine />
    ];

    return (
        <section className="leftsidebar">
            <div className="flex sm:flex-col gap-4 sm:gap-11">
                <div className="hidden sm:gap-2 sm:flex-center sm:flex flex-col text-center">
                    <Avatar className="h-14 w-14 rounded-full" name={user.name} />
                    <div>
                        <p className="h3-bold">{user.name}</p>
                        <p className="text-grey text-sm">{user.email}</p>
                    </div>
                </div>

                {sidebarLinks.map((link: INavLink, idx) => {
                    const isActive = pathname === ( `/nook/${user.id}` + link.route )
                    const Icon = icons[idx];
                    return (
                        <Link className={`flex min-w-max text-center justify-center sm:gap-3 items-center pl-1 sm:p-6 rounded-md hover:underline ${isActive && 'bg-white bg-opacity-80'}`} to={`/nook/${user.id}` + link.route} key={link.label}>
                            <span>{Icon}</span> {link.label}
                        </Link>
                    )
                })}

            </div>
        </section>
    )
}

export default SideBar