import Image from "next/image";
import { EquipmentContext } from "@/app/context/EquipmentContext";
import { useContext, useState } from "react";
import axios from "axios";
import axiosConfig from "@/app/Utils/axiosRequestConfig";

export default function AddEquipment({token, id}) {
    const {setAddEquipment, setModifySuccess} = useContext(EquipmentContext);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        buyDate: "",
        price: ""
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [pending, setPending] = useState(false);

    // Close Form Pop up
    const closeAddForm = () => {
        setAddEquipment(false);
    }

    // Handle Inputs change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value.trimStart(),
        });
    }

    // Add Equipment
    const createEquipment = (e) => {
        e.preventDefault();
        setPending(true);
        axios(axiosConfig("post", `https://my-kinyozi-server.onrender.com/API/equipments/create/${id}`, formData)).then(
            res => {
                setSuccess(res?.data?.message);
                setPending(false);
                setFormData(
                    {
                        name: "",
                        description: "",
                        buyDate: "",
                        price: ""
                    }
                );
                setModifySuccess(prev => !prev);
            }
        ).catch(err => {
            if (![404, 401].includes(err?.response?.status)) {
                setError("Something Went wrong> Try Again");
            } else {
                setError(err?.response?.data?.message);
            }
        });
    }

    return (
        <div className="bg-black bg-opacity-80 fixed w-full h-screen top-0 left-0 z-20 flex justify-center items-center overflow-hidden">
            <div className="bg-dark-blue flex flex-col gap-5 w-96 h-auto px-5 py-10 rounded-xl text-white relative">
                {error && <div className="w-full h-10 text-sm absolute left-0 -top-5 rounded-md flex items-center justify-center font-semibold bg-red-200 text-red-600">{error}</div> }
                {success && <div className="w-full h-10 text-sm absolute left-0 -top-5 rounded-md flex items-center justify-center font-semibold bg-green-200 text-green-800">{success}</div>}
                <div className="w-full h-auto flex justify-between items-center">
                        <h3 className="font-semibold text-lg">New Equipment</h3>
                        <Image onClick={closeAddForm} className="w-[16px] h-[16px] cursor-pointer" src="/open-menu.svg" alt="close" width={16} height={16} />
                </div>
                <form onSubmit={createEquipment} className="flex flex-col gap-3 text-gray-300">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold" htmlFor="equipment">Equipment</label>
                        <input className="outline-none w-full bg-dark-blue text-sm border-[0.1px] border-gray-700 h-10 p-3 rounded-md" required type="text" id="equipment" name="name" value={formData.name} onChange={handleChange} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold" htmlFor="description">Description</label>
                        <input className="outline-none w-full bg-dark-blue text-sm border-[0.1px] border-gray-700 h-10 p-3 rounded-md" required type="text" id="description" name="description" value={formData.description} onChange={handleChange} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold" htmlFor="date">PurchaseDate</label>
                        <input className="outline-none w-full bg-dark-blue text-sm border-[0.1px] border-gray-700 h-10 p-3 rounded-md" required type="date" id="date" name="buyDate" value={formData.buyDate} onChange={handleChange} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold" htmlFor="price">Price</label>
                        <input className="outline-none w-full bg-dark-blue text-sm border-[0.1px] border-gray-700 h-10 p-3 rounded-md" required type="number" id="price" name="price" value={formData.price} onChange={handleChange} />
                    </div>
                    <button disabled={pending} type="submit" className="w-full h-10 bg-secondary rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">{pending ? <>Adding...</> : <>Add Equipment</>}</button>
                </form>
            </div>
        </div>
    )
}