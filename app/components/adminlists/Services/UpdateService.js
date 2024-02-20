import { useState, useContext } from "react";
import Image from "next/image";
import { ServiceContext } from "@/app/context/ServicesContext";
import { AdminContext } from "@/app/context/AdminContext";
import axios from "axios";
import axiosConfig from "@/app/Utils/axiosRequestConfig";

export default function ServiceUpdate() {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [pending, setPending] = useState(false);
    const {setServiceActions, idToModify, setModifySuccessful} = useContext(ServiceContext);
    const {services} = useContext(AdminContext);


     // Fetch the initial form State from the Selected Service
     const [formData, setFormData] = useState(
        {
            serviceName: services.filter(item => item.id === idToModify)[0]?.service,
            chargeAmount: services.filter(item => item.id === idToModify)[0]?.charges,
            serviceDescription: services.filter(item => item.id === idToModify)[0]?.description
        }
    );

    // Handle Form Change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value.trimStart(),
        }
    );
    setError("");
    };

    // Update Service
    const update = (e) => {
        e.preventDefault();
        setPending(true);
        axios(axiosConfig("put", `https://my-kinyozi-server.onrender.com/API/service/update/${idToModify}`, formData)).then(
            res => {
                setSuccess(res?.data?.message);
                setModifySuccessful(prev => !prev);
                setPending(false);
                setTimeout(() => {setServiceActions("")}, 2000);
            }
        ).catch(
            err => {
                if (![401, 404].includes(err?.response?.status)) {
                    setError("Something went Wrong. Try Again");
                } else {
                    setError(err?.response?.data?.message);
                }
                setPending(false);
            }
        )
    }

    return (
        <div className="bg-black bg-opacity-70 py-10 fixed w-full h-screen top-0 left-0 z-20 flex justify-center items-center">
            <div className="bg-dark-blue border-[0.1px] border-accent  flex flex-col gap-5 w-96 h-96 p-5 rounded-xl text-white relative">
                <div className="w-full h-auto flex justify-between items-center">
                {error && <div className="w-full h-10 text-sm absolute left-0 -top-5 rounded-md flex items-center justify-center font-semibold bg-red-200 text-red-600">{error}</div> }
                {success && <div className="w-full h-10 text-sm absolute left-0 -top-5 rounded-md flex items-center justify-center font-semibold bg-green-200 text-green-800">{success}</div>}
                    <h3 className="font-semibold text-lg">Edit Service</h3>
                    <Image onClick={() => {setServiceActions("")}} className="w-[16px] h-[16px] cursor-pointer" src="/open-menu.svg" alt="close" width={16} height={16} />
                </div>
                <form onSubmit={update} className="flex flex-col gap-3 text-gray-300">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold" htmlFor="serviceName">Service</label>
                        <input className="outline-none w-full bg-dark-blue text-sm border-[0.1px] border-gray-700 h-10 p-3 rounded-md" required type="text" id="serviceName" name="serviceName" value={formData.serviceName} onChange={handleChange} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold" htmlFor="chargeAmount">Amount</label>
                        <input className="outline-none w-full bg-dark-blue text-sm border-[0.1px] border-gray-700 h-10 p-3 rounded-md" required type="number" id="chargeAmount" name="chargeAmount" value={formData.chargeAmount} onChange={handleChange} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold" htmlFor="serviceDescription">Description</label>
                        <input className="outline-none w-full bg-dark-blue text-sm border-[0.1px] border-gray-700 h-10 p-3 rounded-md" required type="text" id="serviceDescription" name="serviceDescription" value={formData.serviceDescription} onChange={handleChange} />
                    </div>
                    <button disabled={pending} type="submit" className="w-full h-10 bg-secondary rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">{pending ? <>Updating...</> : <>Update Service</>}</button>
                </form>
            </div>
        </div>
    )
}