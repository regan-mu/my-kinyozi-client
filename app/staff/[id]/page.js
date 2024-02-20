// 
// Staff/Employee Account page
"use client"
import { useContext, useEffect, useState } from "react";
import { StaffAccountContext } from "@/app/context/StaffAccountContext";
import UpdateInventory from "@/app/components/staffAccount/UpdateInventory";
import InventoryTable from "@/app/components/staffAccount/InventoryTable";
import axios from "axios";
import axiosConfig from "@/app/Utils/axiosRequestConfig";
import uniqid from "uniqid";
import { useRouter } from "next/navigation";
import Cookies from "universal-cookie";

export default function StaffPage({params}) {
    const {
        updateInventory, setInventoryData, setStaffData, servicesData, setServicesData, error, 
        setError, setSuccess, success, setFilteredBy, filteredBy, inventoryUpdateSuccess
    } = useContext(StaffAccountContext);
    const router = useRouter();
    const cookie = new Cookies();
    const shopId = cookie.get("shopId");
    const [addSalePending, setAddSalePending] = useState(false);
    const [formData, setFormData] = useState(
        {
            paymentMethod: '',
            paymentDescription: '',
            service: '',
        }
    );

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    useEffect(() => {
        axios(axiosConfig("get", `https://my-kinyozi-server.onrender.com/API/employees/fetch/${params.id}`, null)).then(
            res => {
                const responseData = res?.data;
                setInventoryData(responseData?.inventory);
                setServicesData(responseData?.services);
                setStaffData(responseData?.employee);
            }
        ).catch(
            err => {
                if (![404, 401, 403].includes(err?.response?.status)) {
                    setError("Something went wrong. Try Again");
                } else {
                    setError(err?.response?.data?.message);
                    if (err?.response?.status === 401) {
                        setTimeout(() => {router.push("/staff/login")}, 1000);
                    }
                }
            }
        );
    }, [inventoryUpdateSuccess]);

    const submitSales = (e) => {
        e.preventDefault();
        setAddSalePending(true);
        axios(axiosConfig("post", `https://my-kinyozi-server.onrender.com/API/sales/create/${shopId}`, formData)).then(
            res => {
                setSuccess(res?.data?.message);
                setAddSalePending(false);
                setFormData(
                    {
                        paymentMethod: '',
                        paymentDescription: '',
                        service: '',
                    }
                );
                setTimeout(() => {setSuccess("")}, 2000);
            }
        ).catch(
            err => { setAddSalePending(false);
                if (![404, 401].includes(err?.response?.status)) {
                    setError("Something went wrong. Try Again");
                } else {
                    setError(err?.response?.data?.message);
                }
            }
        );
    }

    return (
        <div className="relative md:col-span-4 grid grid-rows-2 grid-cols-1 md:grid-rows-1 md:grid-cols-2 md:p-10 p-3 md:gap-10 gap-5 w-full h-full">
            {error && <div className="w-full h-10 text-sm absolute left-0 top-0 flex items-center justify-center font-semibold bg-red-200 text-red-600">{error}</div> }
            {success && <div className="w-full h-10 text-sm absolute left-0 top-0 flex items-center justify-center font-semibold bg-green-200 text-green-800">{success}</div>}
            <div className="w-full h-full p-5 bg-accent rounded-lg flex flex-col gap-5">
                <h1 className="font-light text-2xl text-secondary text-center">Sales</h1>
                <div className="bg-dark-blue flex flex-col gap-5 w-full h-full px-6 py-10 rounded-xl text-white relative">
                    <form onSubmit={submitSales} className="flex flex-col gap-3 text-gray-300">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold" htmlFor="paymentMethod">Payment Method</label>
                            <select className="outline-none bg-dark-blue text-sm border-[0.1px] border-gray-700 h-10 p-1 rounded-md" id="paymentMethod" name="paymentMethod" value={formData?.paymentMethod} onChange={handleChange} >
                                <option value="">--Select--</option>
                                <option value="Card">Card</option>
                                <option value="Mpesa">M-pesa</option>
                                <option value="Cash">Cash</option>
                                <option value="Bank Transfer">Bank Transfer</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold" htmlFor="service">Service</label>
                            <select className="outline-none bg-dark-blue text-sm border-[0.1px] border-gray-700 h-10 p-1 rounded-md" id="service" name="service" value={formData?.service} onChange={handleChange}>
                                <option value="">--Select--</option>
                                {servicesData ? servicesData.map((service) => {return <option key={uniqid()} value={service.id}>{service.service}</option>}): null}
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold" htmlFor="description">Description</label>
                            <input className="outline-none w-full bg-dark-blue text-sm border-[0.1px] border-gray-700 h-10 p-3 rounded-md" required type="text" id="description" name="paymentDescription" value={formData?.paymentDescription} onChange={handleChange}  />
                        </div>
                        <button disabled={addSalePending} type="submit" className="w-full h-10 bg-secondary rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">{addSalePending ? <>Adding...</> : <>Add Sale</>}</button>
                    </form>
                </div>
            </div>
            <div className="w-full h-full p-5 bg-accent rounded-lg flex flex-col gap-3">
                <h1 className="font-light text-2xl text-secondary text-center">Inventory</h1>
                <div>
                    <h3 className="font-extralight mb-1">Inventory Levels</h3>
                    <div className="w-full h-auto flex items-end gap-5 mb-5">
                        <button onClick={() => {setFilteredBy(1)}} className={`${filteredBy === 1 ? 'bg-red-500': 'bg-gray-700'} w-full py-2 rounded-md`}>Critical</button>
                        <button onClick={() => {setFilteredBy(2)}} className={`${filteredBy === 2 ? 'bg-yellow-500': 'bg-gray-700'} w-full py-2 rounded-md`}>Low</button>
                        <button onClick={() => {setFilteredBy(3)}} className={`${filteredBy === 3 ? 'bg-green-500': 'bg-gray-700'} w-full py-2 rounded-md`}>Normal</button>
                    </div>
                    <div className="flex flex-col gap-1 w-full h-72 overflow-y-auto pr-5">
                        {
                            updateInventory && <UpdateInventory shopId={shopId} />
                        }
                        <InventoryTable />
                    </div>
                </div>
            </div>
        </div>
    )
}