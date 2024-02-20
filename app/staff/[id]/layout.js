"use client";
import Link from "next/link";
import Image from "next/image";
import { Logout } from "@/app/components/SidebarLink";
import { StaffAccountContextProvider } from "@/app/context/StaffAccountContext";
import PersonalInfo from "@/app/components/staffAccount/PersonalInfo";
import { useState } from "react";
export default function Layout({ children }) {
  const [openSidebar, setOpenSidebar] = useState(false);
    return (
      <StaffAccountContextProvider>
        <div className="h-auto md:h-screen w-screen bg-dark-blue text-white overflow-hidden pb-10 md:pb-0">
          <div className="w-full h-full md:grid md:grid-cols-5 relative">
              <div className="w-full h-14 flex items-center justify-start p-3 md:hidden">
                {!openSidebar ? <Image onClick={() => {setOpenSidebar(true)}} className="cursor-pointer" src="/hamburger.svg" alt="hamburger-icon" width={32} height={32} /> :
                <Image  onClick={() => {setOpenSidebar(false)}} className="cursor-pointer" src="/open-menu.svg" alt="hamburger-icon" width={32} height={32} />}
              </div>
              <div className={`${!openSidebar ? 'hidden md:flex' : 'flex'} absolute w-80 md:w-auto left-3 md:left-0 border-[0.1px] md:border-none border-gray-400 top-14 md:top-0 z-20 rounded-lg md:rounded-none md:relative p-5 bg-accent flex flex-col gap-5`}>
                  <div className="w-full h-auto flex start mb-10">
                      <Link href="/">
                          <Image className="w-auto h-auto" src="/my-kinyozi-logo.svg" alt="my-kinyozi-logo" width={48} height={48} priority={true} />
                      </Link>
                  </div>
                  <PersonalInfo />
                  <div className="flex flex-col">
                      <h3 className="font-medium text-base border-b border-gray-700 pb-1 mb-3 text-secondary">Actions</h3>
                      <Link className="w-full h-8 flex  gap-3  items-center rounded-md py-5 px-3" href="/staff/setup">
                          <Image className="w-[20px] h-[20px]" src="/settings-icon.svg" alt="My Kinyozi" width={24} height={24}/>
                          <p className="text-sm">Change Password</p>
                      </Link>
                      <Logout />
                  </div>
              </div>
              {children}
          </div>
        </div>
      </StaffAccountContextProvider>
    )
  }