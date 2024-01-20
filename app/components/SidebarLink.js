import Link from "next/link";
import Image from "next/image";
import {useContext} from "react";
import { AdminContext } from "../context/AdminContext";

export default function SideBarLink({link, name, image}) {
    const {activePage} = useContext(AdminContext);
    return (
        <Link className={`w-full h-8 flex  gap-3  items-center rounded-md py-5 px-3 ${activePage === name ?' bg-secondary': null}`} href={link}>
            <Image className="w-[20px] h-[20px]" src={image} alt="My Kinyozi" width={24} height={24}/>
            <p className="font-base text-sm">{name}</p>
        </Link>
    )
}

export function Notification({link, name, image}) {
    const {activePage, notifications} = useContext(AdminContext);
    return (
        <Link id={name} className={`w-full h-8 flex  justify-between  items-center rounded-md py-5 px-3 ${activePage === name ? 'bg-secondary': null}`} href={link}>
            <span className="flex gap-3">
                <Image className="w-[20px] h-[20px]" src={image} alt="My Kinyozi" width={24} height={24}/>
                <p className="font-base text-sm">{name}</p>
            </span>
            <p className={`w-[32px] h-[20px] flex justify-center items-center bg-secondary text-xs font-bold rounded ${activePage === name ? 'bg-red-600': null}`}>
                {notifications?.filter(notification => !notification.read)?.length}
            </p>
        </Link> 
    )
}

export function Logout() {
    return (
        <div className="w-full h-8 flex  gap-3  items-center rounded-md py-5 px-3 cursor-pointer">
            <Image className="w-[20px] h-[20px]" src="/logout.svg" alt="My Kinyozi logout" width={24} height={24}/>
            <p className="font-base text-sm text-red-600">Logout</p>
        </div>
    )
}