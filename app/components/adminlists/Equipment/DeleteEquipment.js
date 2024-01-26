import { useState, useContext, useRef } from "react";
import Image from "next/image";
import { EquipmentContext } from "@/app/context/EquipmentContext";
import { AdminContext } from "@/app/context/AdminContext";
import axios from "axios";

export default function DeleteEquipment({token}) {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [pending, setPending] = useState(false);
    const {idToModify, setEquipmentActions} = useContext(EquipmentContext);
    const {setEquipments} = useContext(AdminContext);
    const passwordRef = useRef();

    // Update the expenses list after deletion
    const filterOutDeleted = () => {
        setEquipments(prev => {
            return prev.filter(val => {return val.id != idToModify });
        });
    }

    const deleteEquipment = (e) => {
        e.preventDefault();
        const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
        if (passwordRef.current.value === "") {
            setError("Password is Empty");
        } else {
            setPending(true);
            const axiosConfig = {
                method: "delete",
                url: `https://www.mykinyozi.com/API/equipments/remove/${idToModify}`,
                data: {password: passwordRef.current.value},
                headers: {
                    "Content-Type": "application/json",
                    "X-API-KEY": API_KEY,
                    "x-access-token": token
                }
            }

            axios(axiosConfig).then(
                res => {
                    setSuccess(res?.data?.message);
                    passwordRef.current.value = "";
                    setPending(false);
                    setTimeout(() => {setEquipmentActions("")}, 2000);
                    filterOutDeleted();
                }
            ).catch(
                err => {
                    if (![404, 401].includes(err?.response?.status)) {
                        setError("Failed. Please try again");
                    } else {
                        setError(err?.response?.data?.message);
                    }
                    setPending(false);
                }
            )
        }
    }

    return (
        <div className="bg-black bg-opacity-70 py-10 fixed w-full h-screen top-0 left-0 z-20 flex justify-center items-center">
            <div className="bg-dark-blue relative flex flex-col gap-5 w-80 h-60 p-5 rounded-xl text-white">
                <div className="w-full h-auto flex justify-between items-center">
                    {error && <div className="w-full h-10 text-sm absolute left-0 -top-5 rounded-md flex items-center justify-center font-semibold bg-red-200 text-red-600">{error}</div> }
                    {success && <div className="w-full h-10 text-sm absolute left-0 -top-5 rounded-md flex items-center justify-center font-semibold bg-green-200 text-green-800">{success}</div>}
                        <h3 className="font-semibold text-lg">Remove Equipment</h3>
                        <Image onClick={() => {setEquipmentActions("")}} className="w-[16px] h-[16px] cursor-pointer" src="/open-menu.svg" alt="close" width={16} height={16} />
                </div>
                <form onSubmit={deleteEquipment} className="flex flex-col gap-3 text-gray-300">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold" htmlFor="password">Password</label>
                        <input ref={passwordRef} className="w-full bg-dark-blue text-sm border-[0.1px] border-gray-700 h-10 p-3 rounded-md" required type="password" id="password" name="password" />
                    </div>
                    <button disabled={pending} type="submit" className="w-full h-10 bg-red-500 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">{pending? <>Deleting...</>: <>Delete</>}</button>
                </form>
            </div>
        </div>
    )
}