import { useContext } from "react";
import { StaffAccountContext } from "@/app/context/StaffAccountContext";
export default function PersonalInfo() {
    const {staffData} = useContext(StaffAccountContext);
    return (
        <div className="">
            <h3 className="font-medium text-base border-b border-gray-700 pb-1 mb-3 text-secondary">Personal Information</h3>
            <div className="flex flex-col gap-2">
                <p className="text-xs font-medium px-3 text-gray-300">{staffData?.f_name} {staffData?.l_name}</p>
                <p className="text-xs font-medium px-3 text-gray-300">{staffData?.email}</p>
                <p className="text-xs font-medium px-3 text-gray-300">{staffData?.phone}</p>
                <p className="text-xs font-medium px-3 text-gray-300">{staffData?.role}</p>
            </div>
        </div>
    )
}