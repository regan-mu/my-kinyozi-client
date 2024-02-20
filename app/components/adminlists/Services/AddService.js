import Image from "next/image";
import { useState, useContext } from "react";
import axios from "axios";
import { ServiceContext } from "@/app/context/ServicesContext";
import axiosConfig from "@/app/Utils/axiosRequestConfig";

export default function AddService({id}) {
    const {setAddService, setModifySuccessful} = useContext(ServiceContext);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [pending, setPending] = useState(false);

    // Form Data State
    const [formData, setFormData] = useState({
        serviceName: '',
        chargeAmount: '',
        serviceDescription: ''
    });

     // Close the Expense Form Popup
     const closeAddForm = () => {
        setAddService(false);
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

    // Create new Service
    const createService = (e) => {
        e.preventDefault();
        setPending(true);
        axios(axiosConfig("post", `https://my-kinyozi-server.onrender.com/API/services/${id}/create-services`, formData)).then(
            res => {
                setSuccess(res?.data?.message);
                setFormData({
                    serviceName: '',
                    chargeAmount: '',
                    serviceDescription: ''
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
            <div className="bg-dark-blue border-[0.1px] border-accent  flex flex-col gap-5 w-96 h-96 p-5 rounded-xl text-white relative">
                <div className="w-full h-auto flex justify-between items-center">
                {error && <div className="w-full h-10 text-sm absolute left-0 -top-5 rounded-md flex items-center justify-center font-semibold bg-red-200 text-red-600">{error}</div> }
                {success && <div className="w-full h-10 text-sm absolute left-0 -top-5 rounded-md flex items-center justify-center font-semibold bg-green-200 text-green-800">{success}</div>}
                    <h3 className="font-semibold text-lg">New Service</h3>
                    <Image onClick={closeAddForm} className="w-[16px] h-[16px] cursor-pointer" src="/open-menu.svg" alt="close" width={16} height={16} />
                </div>
                <form onSubmit={createService} className="flex flex-col gap-3 text-gray-300">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold" htmlFor="service">Service</label>
                        <input className="outline-none w-full bg-dark-blue text-sm border-[0.1px] border-gray-700 h-10 p-3 rounded-md" required type="text" id="service" name="serviceName" value={formData.serviceName} onChange={handleChange} />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold" htmlFor="amoun">Amount</label>
                        <input className="outline-none w-full bg-dark-blue text-sm border-[0.1px] border-gray-700 h-10 p-3 rounded-md" required type="number" id="amount" name="chargeAmount" value={formData.chargeAmount} onChange={handleChange} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold" htmlFor="description">Description</label>
                        <input className="outline-none w-full bg-dark-blue text-sm border-[0.1px] border-gray-700 h-10 p-3 rounded-md" required type="text" id="description" name="serviceDescription" value={formData.serviceDescription} onChange={handleChange} />
                    </div>
                    <button disabled={pending} type="submit" className="w-full h-10 bg-secondary rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">{pending ? <>Adding...</>: <>Add Service</>}</button>
                </form>
            </div>
        </div>
    )

}