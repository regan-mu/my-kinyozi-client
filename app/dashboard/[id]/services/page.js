"use client";
import { useEffect, useContext } from "react";
import { AdminContext } from "@/app/context/AdminContext";
import AddService from "@/app/components/adminlists/Services/AddService";
import { ServiceContext } from "@/app/context/ServicesContext";
import Image from "next/image";
import Cookies from "universal-cookie";
import ServicesList from "@/app/components/adminlists/Services/ServiceList";
import DeleteService from "@/app/components/adminlists/Services/DeleteService";
import ServiceUpdate from "@/app/components/adminlists/Services/UpdateService";


export default function Services({params}) {
    const {setActivePage, setServices} = useContext(AdminContext);
    const {addService, setAddService, serviceActions, modifySuccessful} = useContext(ServiceContext);
    const cookies = new Cookies();
    const token = cookies.get("token");

    useEffect(() => {
        setActivePage("Services");
        const fetchData = async () => {
            const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
            try {
            const response = await fetch(`https://www.mykinyozi.com/API/services/all/${params.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': API_KEY,
                    'x-access-token': token
                },
                next: { tags: ["services"] }
            });
    
            const data = await response.json();
            setServices(data.services);
            } catch (error) {
            console.log(error);
            }
        };
        fetchData();
    }, [modifySuccessful]);

    return (
        <div className="flex flex-col text-white md:p-5">
        {addService && <AddService id={params.id} token={token}/>}
        {serviceActions == "delete" && <DeleteService token={token} />}
        {serviceActions == "update" && <ServiceUpdate token={token} />}
        <div className="w-full h-20 flex justify-between items-center border-b-[0.1px] border-gray-800">
            <h3 className="font-extralight text-4xl">Services</h3>
            <button onClick={() => {setAddService(true)}} type="button" className="flex gap-2 bg-secondary w-max h-10 items-center px-6 rounded-3xl">
                <Image src="/plus.svg" alt="plus icon" width={12} height={12} />
                New Service
            </button>
        </div>
        <div className="h-full rounded-2xl overflow-hidden p-1 relative">
            <ServicesList />
        </div>
        </div>
    )
}