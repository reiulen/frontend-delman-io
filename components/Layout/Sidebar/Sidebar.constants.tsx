import {
    MdSpaceDashboard,
} from "react-icons/md";
import { 
    HiUsers,
    HiUserAdd,
    HiSearch
} from "react-icons/hi";
import { IconType } from 'react-icons'

interface SidebarDataProps {
    name: string,
    href: string,
    icon: IconType
}

export const SidebarData: Array<SidebarDataProps> = [
    {
        name: 'Dashboard',
        href: '/',
        icon: MdSpaceDashboard
    },
    {
        name: 'Users',
        href: '/users',
        icon: HiUsers
    },
    {
        name: 'Registration',
        href: '/user-registration',
        icon: HiUserAdd
    },
    {
        name: 'Search',
        href: '/search-user',
        icon: HiSearch
    },
]