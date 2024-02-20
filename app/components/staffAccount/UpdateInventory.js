import { RiCloseCircleLine } from "react-icons/ri";
import { useContext, useRef, useState } from "react";
import { StaffAccountContext } from "@/app/context/StaffAccountContext";
import axios from "axios";
import axiosConfig from "@/app/Utils/axiosRequestConfig";

export default function UpdateInventory({shopId}) {
    const {setUpdateInventory, itemToUpdate, setSuccess, setError, setInventoryUpdateSuccess} = useContext(StaffAccountContext);
    const [itemLevel, setItemLevel] = useState({
        productLevel: itemToUpdate?.level,
        shopId: shopId
    });
    const [formPending, setFromPending] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setItemLevel({...itemLevel, [name]: value});
    }

    const submitUpdate = (e) => {
        e.preventDefault();
        setFromPending(true);
        axios(axiosConfig("put", `https://my-kinyozi-server.onrender.com/API/inventory/update/${itemToUpdate?.id}`, itemLevel)).then(
            res => {
                setSuccess(res?.data?.message);
                setInventoryUpdateSuccess(prev => !prev);
                setFromPending(false);
                setUpdateInventory(false);
                setTimeout(() => {setSuccess("")}, 3000);
            }
        ).catch(
            err => {
                setFromPending(false);
                if (![404, 401].includes(err?.response?.status)) {
                    setError("Something went wrong. Try Again");
                } else {
                    setError(err?.response?.data?.message);
                }
            }
        )
    }
    return (
        <div className="fixed right-10 top-10 bg-gray-200 text-dark-blue w-60 h-52 flex flex-col gap-3 p-3 rounded">
            <div className="flex items-center justify-between">
                <h3 className="font-semibold text-xs">Update {itemToUpdate?.item}</h3>
                <RiCloseCircleLine onClick={() => {setUpdateInventory(false)}} className="cursor-pointer" size={32} />
            </div>
            <form onSubmit={submitUpdate} className="h-auto flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-light" htmlFor="level">Product Level</label>
                    <select className="outline-none bg-white text-sm border-[0.1px] border-gray-700 h-10 p-1 rounded-md" onChange={handleChange} value={itemLevel?.productLevel} id="level" name="productLevel">
                        <option value={3}>Normal</option>
                        <option value={2}>Low</option>
                        <option value={1}>Critically Low</option>
                    </select>  
                </div>
                <button disabled={formPending} type="submit" className="w-full h-auto py-2 text-white bg-secondary rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">{formPending ? <>Updating...</>: <>Update</>}</button>
            </form>
        </div>
    )
}