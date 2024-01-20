import { InventoryContext } from "@/app/context/InventoryContext";
import Image from "next/image";
import { useContext, useState } from "react";
import axios from "axios";

export default function AddInventory({token, id}) {
    const {setAddInventory, setModifySuccessful} = useContext(InventoryContext);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [pending, setPending] = useState(false);
    const [formData, setFormData] = useState(
        {
            productName: "",
            productLevel: 3
        }
    );

    // Close the Expense Form Popup
    const closeAddForm = () => {
        setAddInventory(false);
    }

    // Handle form field Changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value.trimStart(),
        });
        setError("");
        setSuccess("");
    };

    const recordInventory = (e) => {
        const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
        e.preventDefault();
        setPending(true);
        const axiosConfig = {
            method: "post",
            url: `http://127.0.0.1:5000/API/inventory/create/${id}`,
            data: formData,
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": API_KEY,
                "x-access-token": token
            }
        }
        axios(axiosConfig).then(
            res => {
                console.log(formData)
                setSuccess(res?.data?.message);
                setFormData( {
                    productName: "",
                    productLevel: 3
                });
                setPending(false);
                setModifySuccessful(prev => !prev);
            }
        ).catch(err => {
            setPending(false);
            if (![404, 401].includes(err?.response?.status)) {
                setError("Something went wrong. Try Again");
            } else {
                setError(err?.response?.data?.message);
            }
        });
    }

    return (
        <div className="bg-black bg-opacity-70 py-10 fixed w-full h-screen top-0 left-0 z-20 flex justify-center items-center">
            <div className="bg-dark-blue border-[0.1px] border-accent  flex flex-col gap-5 w-96 h-80 p-5 rounded-xl text-white relative">
                <div className="w-full h-auto flex justify-between items-center">
                {error && <div className="w-full h-10 text-sm absolute left-0 -top-5 rounded-md flex items-center justify-center font-semibold bg-red-200 text-red-600">{error}</div> }
                {success && <div className="w-full h-10 text-sm absolute left-0 -top-5 rounded-md flex items-center justify-center font-semibold bg-green-200 text-green-800">{success}</div>}
                    <h3 className="font-semibold text-lg">Record Inventory</h3>
                    <Image onClick={closeAddForm} className="w-[16px] h-[16px] cursor-pointer" src="/open-menu.svg" alt="close" width={16} height={16} />
                </div>
                <form onSubmit={recordInventory} className="flex flex-col gap-3 text-gray-300">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold" htmlFor="inventory">Product</label>
                        <input className="outline-none w-full bg-dark-blue text-sm border-[0.1px] border-gray-700 h-10 p-3 rounded-md" required type="text" id="inventory" name="productName" value={formData.productName} onChange={handleChange} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold" htmlFor="level">Product Level</label>
                        <select className="outline-none bg-dark-blue text-sm border-[0.1px] border-gray-700 h-10 p-1 rounded-md" id="level" name="productLevel" value={formData.productLevel} onChange={handleChange}>
                            <option value={3}>Normal</option>
                            <option value={2}>Low</option>
                            <option value={1}>Critically Low</option>
                        </select>
                    </div>
                    <button disabled={pending} type="submit" className="w-full h-10 bg-secondary rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">{pending ? <>Adding...</>: <>Add Service</>}</button>
                </form>
            </div>
        </div>
    )
}