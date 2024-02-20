import { StaffContext } from "@/app/context/StaffContext";
import { useContext, useState, useRef } from "react";
import Image from "next/image";
import axios from "axios";
import axiosConfig from "@/app/Utils/axiosRequestConfig";

export default function BarberStatus() {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [pending, setPending] = useState(false);
    const {idToMutate, setStaffActions, staffActions, setChangeBarberStatus} = useContext(StaffContext);
    const passwordRef = useRef();

    // Handle Verification
    const submitVerification = (e) => {
        e.preventDefault();
        setPending(true);
        axios(axiosConfig("put", `https://my-kinyozi-server.onrender.com/API/employees/barbers/verify/${idToMutate}`, {password: passwordRef.current.value})).then(
            res => {
                setPending(false);
                setSuccess(res?.data?.message);
                setChangeBarberStatus(prev => !prev);
                setTimeout(() => {setStaffActions("")}, 2000);
            }
        ).catch(
            err => {
               setError(err?.response?.error);
            }
        )
    }

    const submitDeactivation = (e) => {
        e.preventDefault();
        setPending(true);
        axios(axiosConfig("put", `https://my-kinyozi-server.onrender.com/API/employees/barbers/deactivate/${idToMutate}`, {password: passwordRef.current.value})).then(
            res => {
                setPending(false);
                setSuccess(res?.data?.message);
                setChangeBarberStatus(prev => !prev);
                setTimeout(() => {setStaffActions("")}, 2000);
            }
        ).catch(
            err => {
               setError(err?.response?.error);
            }
        )
    }

    return (
        <div className="bg-black bg-opacity-70 py-10 fixed w-full h-screen top-0 left-0 z-20 flex justify-center items-center">
            <div className="bg-dark-blue relative flex flex-col gap-5 w-80 h-60 p-5 rounded-xl text-white">
                <div className="w-full h-auto flex justify-between items-center">
                    {error && <div className="w-full h-10 text-sm absolute left-0 -top-5 rounded-md flex items-center justify-center font-semibold bg-red-200 text-red-600">{error}</div> }
                    {success && <div className="w-full h-10 text-sm absolute left-0 -top-5 rounded-md flex items-center justify-center font-semibold bg-green-200 text-green-800">{success}</div>}
                        <h3 className="font-semibold text-lg">{staffActions === "verify" ? <>Verify Barber</> : staffActions === "deactivate" ? <>Remove Barber</>: null}</h3>
                        <Image onClick={() => {setStaffActions("")}} className="w-[16px] h-[16px] cursor-pointer" src="/open-menu.svg" alt="close" width={16} height={16} />
                </div>
                <form onSubmit={staffActions === "verify" ? submitVerification : staffActions === "deactivate" ? submitDeactivation : null} className="flex flex-col gap-3 text-gray-300">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold" htmlFor="password">Password</label>
                        <input ref={passwordRef} className="w-full bg-dark-blue text-sm border-[0.1px] border-gray-700 h-10 p-3 rounded-md" required type="password" id="password" name="password" />
                    </div>
                    <button disabled={pending} type="submit" className="w-full h-10 bg-red-500 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">{pending? <>Submitting...</>: <>Submit</>}</button>
                </form>
            </div>
        </div>
    )
}