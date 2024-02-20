"use client";
import { AdminContext } from "@/app/context/AdminContext";
import { useContext } from "react";
import { StaffContextProvider } from "@/app/context/StaffContext";

export default function RootLayout({ children }) {
    const {activeStaffTab, setActiveStaffTab} = useContext(AdminContext);
    return (
        <div className="w-full h-full flex flex-col">
            <div className="w-full h-auto flex gap-10 justify-start items-center text-white p-5">
                <h3 className={`cursor-pointer font-semibold text-lg ${activeStaffTab === 'barbers' && "border-secondary border-b-4 text-secondary"} pb-1 px-2`} onClick={(() => {setActiveStaffTab("barbers")})}>Barbers</h3>
                <h3 className={`cursor-pointer font-semibold text-lg ${activeStaffTab === 'others' && "border-secondary border-b-4 text-secondary"} pb-1 px-2`} onClick={(() => {setActiveStaffTab("others")})}>Other Staff</h3>
            </div>
            <StaffContextProvider>
                {children}
            </StaffContextProvider>
        </div>
    )
}