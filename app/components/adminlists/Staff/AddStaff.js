import { StaffContext } from "@/app/context/StaffContext";
import { useState, useContext } from "react";
import Image from "next/image";
import axios from "axios";
import axiosConfig from "@/app/Utils/axiosRequestConfig";

export default function AddStaff({id}) {
    const {setStaffActions, setStaffMutation} = useContext(StaffContext);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [pending, setPending] = useState(false);
    const [formData, setFormData] = useState({
        fName: "",
        lName: "",
        email: "",
        salary: "",
        role: ""
    });

    // Handle input change
    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData({...formData, [name]: value});
        setError("");
    }

    // Close Add Staff form
    const closeAddForm = () => {
        setStaffActions("");
    }

    // Add New Staff
    const createNewStaff = (e) => {
        e.preventDefault();
        setPending(true);
        axios(axiosConfig("post", `https://my-kinyozi-server.onrender.com/API/employees/create/${id}`, formData)).then(
            res => {
                setSuccess(res?.data?.message);
                setFormData(
                    {
                        fName: "",
                        lName: "",
                        email: "",
                        phone: "",
                        role: ""
                    }
                );
                setPending(false);
                setStaffMutation(prev => !prev);
            }
        ).catch(
            err => {
                setPending(false);
                if(![404, 401, 409].includes(err?.response?.status)) {
                    setError("Something went wrong. Try Again");
                } else {
                    setError(err?.response?.data?.message);
                }
            }
        );
    }

    return (
        <div className="bg-black bg-opacity-80 fixed w-full h-screen top-0 left-0 z-20 flex justify-center items-center overflow-hidden">
            <div className="bg-dark-blue border-[0.1px] border-accent  flex flex-col gap-5 w-96 h-auto p-5 rounded-xl text-white relative">
                <div className="w-full h-auto flex justify-between items-center">
                    {error && <div className="w-full h-10 text-sm absolute left-0 -top-5 rounded-md flex items-center justify-center font-semibold bg-red-200 text-red-600">{error}</div> }
                    {success && <div className="w-full h-10 text-sm absolute left-0 -top-5 rounded-md flex items-center justify-center font-semibold bg-green-200 text-green-800">{success}</div>}
                    <h3 className="font-semibold text-lg">Add Staff</h3>
                    <Image onClick={closeAddForm} className="w-[16px] h-[16px] cursor-pointer" src="/open-menu.svg" alt="close" width={16} height={16} />
                </div>
                <form onSubmit={createNewStaff} className="flex flex-col gap-2 text-gray-300">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold" htmlFor="f_name">First Name</label>
                        <input value={formData.fName} onChange={handleChange} className="outline-none w-full bg-dark-blue text-sm border-[0.1px] border-gray-700 h-10 p-3 rounded-md" required type="text" id="f_name" name="fName" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold" htmlFor="l_name">Last Name</label>
                        <input value={formData.lName} onChange={handleChange} className="outline-none w-full bg-dark-blue text-sm border-[0.1px] border-gray-700 h-10 p-3 rounded-md" required type="text" id="l_name" name="lName" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold" htmlFor="email">Email</label>
                        <input value={formData.email} onChange={handleChange} className="outline-none w-full bg-dark-blue text-sm border-[0.1px] border-gray-700 h-10 p-3 rounded-md" required type="email" id="email" name="email" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold" htmlFor="phone">Phone Number</label>
                        <input value={formData?.phone} onChange={handleChange} className="outline-none w-full bg-dark-blue text-sm border-[0.1px] border-gray-700 h-10 p-3 rounded-md" required type="text" id="phone" name="phone" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold" htmlFor="role">Role</label>
                        <input value={formData.role} onChange={handleChange} className="outline-none w-full bg-dark-blue text-sm border-[0.1px] border-gray-700 h-10 p-3 rounded-md" required type="texr" id="role" name="role" />
                    </div>
                    <button disabled={pending} type="submit" className="w-full h-10 bg-secondary rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">{pending ? <>Adding...</>: <>Add Staff</>}</button>
                </form>
            </div>
        </div>
    )
}