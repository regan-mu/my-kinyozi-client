"use client";
import Image from "next/image";
import Link from "next/link";
import SideBarLink, {Notification, Logout} from "@/app/components/SidebarLink";
import { AdminContextProvider} from "@/app/context/AdminContext";
import LoginRequired from "@/app/components/adminlists/LoginRequired";


  
export default function RootLayout({ children, params }) {
    
    
    return (
        <AdminContextProvider>
            <div className="bg-dark-blue w-full h-auto relative overflow-hidden md:auto md:grid md:grid-cols-5 md:grid-rows-1 md:py-0 md:px-0 md:gap-0">
                <div className="w-full h-full bg-accent flex flex-col gap-10 md:py-4 md:px-2 text-white">
                    <div className="w-full h-auto flex start">
                        <Link href="/">
                            <Image className="w-auto h-auto" src="/my-kinyozi-logo.svg" alt="my-kinyozi-logo" width={48} height={48}/>
                        </Link>
                    </div>
                    <div className="flex flex-col">
                        <SideBarLink image="/home-icon.svg" link={`/dashboard/${params.id}`} name="Home"/>
                        <SideBarLink image="/sales-icon.svg" link={`/dashboard/${params.id}/sales`} name="Sales"/>
                        <SideBarLink image="/scheduling-icon.svg" link={`/dashboard/${params.id}/scheduling`} name="Scheduling"/>
                        <SideBarLink image="/inventory-icon.svg" link={`/dashboard/${params.id}/inventory`} name="Inventory"/>
                        <SideBarLink image="/expenses-icon.svg" link={`/dashboard/${params.id}/expenses`} name="Expenses"/>
                        <SideBarLink image="/expenses-icon.svg" link={`/dashboard/${params.id}/services`} name="Services"/>
                        <SideBarLink image="/expenses-icon.svg" link={`/dashboard/${params.id}/equipment`} name="Equipment"/>
                        <SideBarLink image="/staff-icon-dash.svg" link={`/dashboard/${params.id}/staff`} name="Staff"/>
                        <Notification image="/notification-icon.svg" link={`/dashboard/${params.id}/notifications`} name="Notifications"/>
                        <SideBarLink image="/settings-icon.svg" link={`/dashboard/${params.id}/settings`} name="Settings"/>
                        <Logout />
                    </div>
                    <div className="w-full h-14 flex gap-5">
                        <Image className="w-auto h-full" src="/avatar.svg" alt="My-kinyozi-avatar" width={48} height={48} />
                        <div className="flex flex-col gap-0 w-full h-full justify-center">
                            <h3 className="w-full font-semibold text-sm">Mu Cutx</h3>
                            <p className="w-full text-xs font-light text-gray-200">mu.cutx@gmail.com</p>
                        </div>
                    </div>
                </div>
                <div className="w-full h-full md:col-span-4">
                
                    <LoginRequired>
                        {children}
                    </LoginRequired>
                </div>
            </div>
        </AdminContextProvider>       
  )
}