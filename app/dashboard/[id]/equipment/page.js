"use client";
import { AdminContext } from "@/app/context/AdminContext";
import {useContext, useEffect, useState} from "react";
import Image from "next/image";
import { EquipmentContext } from "@/app/context/EquipmentContext";
import AddEquipment from "@/app/components/adminlists/Equipment/AddEquipment";
import EquipmentList from "@/app/components/adminlists/Equipment/EquipmentList";
import DeleteEquipment from "@/app/components/adminlists/Equipment/DeleteEquipment";
import MarkFaulty from "@/app/components/adminlists/Equipment/MarkFaulty";
import CurrencyFormatter from "@/app/Utils/CurrencyParser";
import axios from "axios";
import axiosConfig from "@/app/Utils/axiosRequestConfig";

export default function Equipment({params}) {
    const {setActivePage, setEquipments,} = useContext(AdminContext);
    const {addEquipment, setAddEquipment, equipmentActions, modifySuccess} = useContext(EquipmentContext);
    const [equipmentStats, setEquipmentStats] = useState({
        cost: "",
        faulty: "",
        oldest: "",
        newest: ""
    });
    const [error, setError] = useState();

    // Fetch Data
    useEffect(() => {
        setActivePage("Equipment");
        const fetchData = async () => {
            axios(axiosConfig("get", `https://my-kinyozi-server.onrender.com/API/equipments/fetch/all/${params.id}`, null)).then(
                res => {
                    setEquipments(res?.data?.equipments);
                    setEquipmentStats(res?.data?.stats);
                }
            ).catch(err => {
                if (![404, 401].includes(err?.response?.status)) {
                    setError("Something went wrong. Try Again");
                } else {
                    setError(err?.response?.data?.message);
                }
            });
        };
        fetchData();
    }, [modifySuccess]);

    return (
        <div className="flex flex-col text-white md:p-5">
            {addEquipment && <AddEquipment id={params.id} />}
            {equipmentActions === "delete" && <DeleteEquipment />}
            {equipmentActions === "faulty" && <MarkFaulty />}
            <div className="w-full h-20 flex justify-between items-center border-b-[0.1px] border-gray-800">
                <h3 className="font-extralight text-4xl">Equipment</h3>
                <button onClick={() => {setAddEquipment(true)}} type="button" className="flex gap-2 bg-secondary w-max h-10 items-center px-6 rounded-3xl">
                    <Image src="/plus.svg" alt="plus icon" width={12} height={12} />
                    New Equipment
                </button>
            </div>
            <div className="w-full h-32 p-5 bg-accent rounded-xl mb-5 flex justify-between">
                <div className="w-full h-full border-r-[0.5px] border-gray-600 py-3 px-5 flex flex-col gap-2">
                    <h3 className="font-extralight text-base">Faulty Equipments</h3>
                    <p className="text-gray-300 text-2xl font-semibold">{equipmentStats?.faulty}</p>
                </div>
                <div className="w-full h-full border-r-[0.5px] border-gray-600 py-3 px-5 flex flex-col gap-2">
                    <h3 className="font-extralight text-base">Equipment Cost</h3>
                    <p className="text-gray-300 text-2xl font-semibold">{CurrencyFormatter(equipmentStats?.cost)}</p>
                </div>
                <div className="w-full h-full border-r-[0.5px] border-gray-600 py-3 px-5 flex flex-col gap-2">
                    <h3 className="font-extralight text-base">Oldest Equipment</h3>
                    <p className="text-gray-300 text-xl font-semibold line-clamp-1">{equipmentStats?.oldest}</p>
                </div>
                <div className="w-full h-full py-3 px-5 flex flex-col gap-2">
                    <h3 className="font-extralight text-base">Newest Equipment</h3>
                    <p className="text-gray-300 text-xl font-semibold line-clamp-1">{equipmentStats?.newest}</p>
                </div>
            </div>
            <div className="h-full rounded-2xl overflow-hidden p-1 relative">
                <EquipmentList />
            </div>
        </div>
    )
}