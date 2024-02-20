"use client";
import { useEffect, useContext } from "react";
import { AdminContext } from "@/app/context/AdminContext";
import { StaffContext } from "@/app/context/StaffContext";
import Image from "next/image";
import AddStaff from "@/app/components/adminlists/Staff/AddStaff";
import StaffList from "@/app/components/adminlists/Staff/StaffList";
import BarbersList from "@/app/components/adminlists/Staff/BarbersList";
import RemoveStaff from "@/app/components/adminlists/Staff/RemoveStaff";
import UpdateStaff from "@/app/components/adminlists/Staff/UpdateStaff";
import BarberStatus from "@/app/components/adminlists/Staff/BarberStatus";

export default function Staff({params}) {
    const {setActivePage, activeStaffTab} = useContext(AdminContext);
    const {setStaffActions, staffActions} = useContext(StaffContext);

    useEffect(() => {
        setActivePage("Staff");
    }, []);

    return (
        <div className="flex flex-col p-5 pt-0">
            {staffActions === "add" && <AddStaff id={params.id} />}
            {staffActions === "remove" && <RemoveStaff />}
            {staffActions === "update" && <UpdateStaff />}
            {(staffActions === "verify" ||  staffActions === "deactivate") && <BarberStatus />}
            <div className="w-full h-20 flex justify-between items-center border-b-[0.1px] border-gray-800">
                <h3 className="font-extralight text-4xl">Staff</h3>
                { activeStaffTab === "others" &&
                    <div className="flex gap-5 h-full items-center">
                        <button onClick={() => {setStaffActions("add")}}  type="button" className="flex gap-2 bg-secondary w-max h-10 items-center px-6 rounded-3xl">
                            <Image src="/plus.svg" alt="plus-icon" width={12} height={12} />
                            New Staff
                        </button>
                    </div>
                }
            </div>
            <div className="h-full rounded-2xl overflow-hidden p-1 relative">
                {activeStaffTab === "others" && <StaffList id={params.id} />}
                {activeStaffTab === "barbers" && <BarbersList id={params.id} />}
            </div>
        </div>
    )
}