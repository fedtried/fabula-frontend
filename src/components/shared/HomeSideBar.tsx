import { homeSidebarLinks } from '@/constants';
import { INavLink } from '@/types';
import { PiBooksLight, PiNotePencilLight } from "react-icons/pi";
import { Link, useLocation } from 'react-router-dom';

const HomeSideBar = () => {
    const {pathname} = useLocation()
    const icons = [
        <PiNotePencilLight />,
        <PiBooksLight />
    ];

    return (
        <section className="leftsidebar">
            <div className="flex sm:flex-col gap-4 sm:gap-11">
                <div className="hidden sm:gap-2 sm:flex-center sm:flex flex-col text-center">
                    <img className='h-32 w-32' src='./conclave.png'/>
                </div>

                {homeSidebarLinks.map((link: INavLink, idx) => {
                    const isActive = pathname === ( link.route )
                    const Icon = icons[idx];
                    return (
                        <Link className={`flex min-w-max text-center justify-center sm:gap-3 items-center pl-1 sm:p-6 rounded-md hover:underline ${isActive && 'bg-white bg-opacity-80'}`} to={link.route} key={link.label}>
                            <span>{Icon}</span> {link.label}
                        </Link>
                    )
                })}

            </div>
        </section>
    )
}

export default HomeSideBar