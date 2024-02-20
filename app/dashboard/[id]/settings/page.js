"use client";
import { useEffect, useContext, useState } from "react";
import { AdminContext } from "@/app/context/AdminContext";
import ShopProfile from "@/app/components/adminlists/Settings/Profile";
import ChangePassword from "@/app/components/adminlists/Settings/ChangePassword";

export default function Settings({params}) {
    const {setActivePage} = useContext(AdminContext);
    const [activeTab, setActiveTab] = useState("profile");

    const toggleActiveTab = () => {
        setActiveTab(prev => {
           return prev === "profile" ? "password" : "profile"
        });
    }

    useEffect(() => {
        setActivePage("Settings");
    });

    return (
        <div className="flex flex-col text-white md:p-5 gap-5">
            <div className="w-full flex items-center h-16 border-[0.1px] border-gray-800 px-5 gap-10">
                <h4 onClick={toggleActiveTab} className={`font-semibold text-lg p-1  cursor-pointer ${activeTab == 'profile' && 'border-b-4 border-secondary text-secondary'}`}>Profile Information</h4>
                <h4 onClick={toggleActiveTab} className={`font-semibold text-lg p-1  cursor-pointer ${activeTab == 'password' && 'border-b-4 border-secondary text-secondary'}`}>Change Password</h4>
            </div>
            {activeTab === "profile" ? <ShopProfile id={params.id} /> : <ChangePassword id={params.id} />}
        </div>
    )
}