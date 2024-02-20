import Link from "next/link";
import Image from "next/image";
import {useContext} from "react";
import { AdminContext } from "../context/AdminContext";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";

// All other sidebar nav links
export default function SideBarLink({link, name, image}) {
    const {activePage} = useContext(AdminContext);
    return (
        <Link className={`w-full h-8 flex  gap-3  items-center rounded-md py-5 px-3 ${activePage === name ?' bg-secondary': null}`} href={link}>
            <Image className="w-[20px] h-[20px]" src={image} alt="My Kinyozi" width={24} height={24}/>
            <p className="font-base text-sm">{name}</p>
        </Link>
    )
}

// Notification button on sidebar
export function Notification({link, name, image}) {
    const {activePage, notifications, homeData} = useContext(AdminContext);
    return (
        <Link id={name} className={`w-full h-8 flex  justify-between  items-center rounded-md py-5 px-3 ${activePage === name ? 'bg-secondary': null}`} href={link}>
            <span className="flex gap-3">
                <Image className="w-[20px] h-[20px]" src={image} alt="My Kinyozi" width={24} height={24}/>
                <p className="font-base text-sm">{name}</p>
            </span>
            <p className={`w-[32px] h-[20px] flex justify-center items-center bg-secondary text-xs font-bold rounded ${activePage === name ? 'bg-red-600': null}`}>
                {homeData?.notifications || notifications?.filter(notification => !notification.read)?.length}
            </p>
        </Link> 
    )
}

// Logout - Sidebar
export function Logout() {
    const cookies = new Cookies();
    const router = useRouter();

    const logOut = () => {
        cookies.remove("token", {path: "/", sameSite: "None", secure:true});
        cookies.remove("public_id", {path: "/", sameSite: "None", secure:true});
        cookies.remove("role", {path: "/", sameSite: "None", secure:true});
        cookies.remove("shopId", {path: "/", sameSite: "None", secure:true});
        router.push("/");
    }

    return (
        <div onClick={logOut} className="w-full h-8 flex  gap-3  items-center rounded-md py-5 px-3 cursor-pointer">
            <Image className="w-[20px] h-[20px]" src="/logout.svg" alt="My Kinyozi logout" width={24} height={24}/>
            <p className="font-base text-sm text-red-600">Logout</p>
        </div>
    )
}

// Sidebar footer
export function SidebarFooter() {
    const {homeData} = useContext(AdminContext);
    return (
        <div className="flex flex-col gap-0 w-full h-full justify-center">
            <h3 className="w-full font-semibold text-sm">{homeData?.shopInfo?.shop_name}</h3>
            <p className="w-full text-xs font-light text-gray-200">{homeData?.shopInfo?.email}</p>
        </div>
    )
}