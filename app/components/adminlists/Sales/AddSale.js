import Image from "next/image";
import { useState, useContext } from "react";
import { SalesContext } from "@/app/context/SalesContext";
import { AdminContext } from "@/app/context/AdminContext";
import uniqid from "uniqid";
import axios from "axios";
import axiosConfig from "@/app/Utils/axiosRequestConfig";

export default function AddSale({id}) {
    const {setAddSale, setModifySuccessful} = useContext(SalesContext);
    const {services} = useContext(AdminContext);

    const [formData, setFormData] = useState({
        paymentMethod: '',
        paymentDescription: '',
        service: '',
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [pending, setPending] = useState(false);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value.trimStart(),
        });
        setError("");
        setSuccess("");
    };

    const closeAddForm = () => {
        setAddSale(false);
    }

    const recordSale = (e) => {
        e.preventDefault();
        if (formData.paymentMethod == "") {
            setError("Payment Method is Empty");
        } else if (formData.service == "") {
            setError("Service is Empty");
        } else {
            setPending(true);
            axios(axiosConfig("post", `https://my-kinyozi-server.onrender.com/API/sales/create/${id}`, formData)).then(
                res => {
                    setSuccess(res?.data?.message);
                    setFormData({
                        paymentMethod: '',
                        paymentDescription: '',
                        service: '',
                    });
                    setPending(false);
                    setModifySuccessful(prev => !prev);
                }
            ).catch(
                err => {
                    if (!err?.response?.status) {
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
        <div className="bg-black bg-opacity-80 fixed w-full h-screen top-0 left-0 z-20 flex justify-center items-center">
            <div className="bg-dark-blue flex flex-col gap-5 w-96 h-96 p-5 rounded-xl text-white relative">
                {error && <div className="w-full h-10 text-sm absolute left-0 bottom-full rounded-md flex items-center justify-center font-semibold bg-red-200 text-red-600">{error}</div> }
                {success && <div className="w-full h-10 text-sm absolute left-0 bottom-full rounded-md flex items-center justify-center font-semibold bg-green-200 text-green-800">{success}</div>}
                <div className="w-full h-auto flex justify-between items-center">
                    <h3 className="font-semibold text-lg">New Sale</h3>
                    <Image onClick={closeAddForm} className="w-[16px] h-[16px] cursor-pointer" src="/open-menu.svg" alt="close" width={16} height={16} />
                </div>
                <form onSubmit={recordSale} className="flex flex-col gap-3 text-gray-300">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold" htmlFor="paymentMethod">Payment Method</label>
                        <select className="outline-none bg-dark-blue text-sm border-[0.1px] border-gray-700 h-10 p-1 rounded-md" id="paymentMethod" name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
                            <option value="">--Select--</option>
                            <option value="Card">Card</option>
                            <option value="Mpesa">M-pesa</option>
                            <option value="Cash">Cash</option>
                            <option value="Bank Transfer">Bank Transfer</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold" htmlFor="service">Service</label>
                        <select className="outline-none bg-dark-blue text-sm border-[0.1px] border-gray-700 h-10 p-1 rounded-md" id="service" name="service" value={formData.service}  onChange={handleChange} >
                            <option value="">--Select--</option>
                            {services ? services.map((service) => {return <option key={uniqid()} value={service.id}>{service.service}</option>}): null}
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold" htmlFor="description">Description</label>
                        <input className="outline-none w-full bg-dark-blue text-sm border-[0.1px] border-gray-700 h-10 p-3 rounded-md" required type="text" id="description" name="paymentDescription" value={formData.paymentDescription} onChange={handleChange} />
                    </div>
                    <button disabled={pending} type="submit" className="w-full h-10 bg-secondary rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">{pending ? <>Adding...</> : <>Add Sale</>}</button>
                </form>
            </div>
        </div>
    )
}