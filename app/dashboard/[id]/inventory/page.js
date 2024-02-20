"use client";
import Image from "next/image";
import { useContext, useEffect } from "react";
import { AdminContext } from "@/app/context/AdminContext";
import InventoryList from "@/app/components/adminlists/Inventory/InventoryList";
import AddInventory from "@/app/components/adminlists/Inventory/AddInventory";
import { InventoryContext } from "@/app/context/InventoryContext";
import DeleteInventory from "@/app/components/adminlists/Inventory/DeleteInventory";
import ReplenishInventory from "@/app/components/adminlists/Inventory/Replenish";
import axios from "axios";
import axiosConfig from "@/app/Utils/axiosRequestConfig";
import { useState } from "react";

export default function Inventory({params}) {
    const [error, setError] = useState("");
    const {setActivePage, setInventory} = useContext(AdminContext);
    const {addInventory, setAddInventory, modifySuccessful, inventoryActions} = useContext(InventoryContext);

    useEffect(() => {
        setActivePage("Inventory");
        const fetchData = async () => {
            axios(axiosConfig("get", `https://my-kinyozi-server.onrender.com/API/inventory/fetch/${params.id}`, null)).then(
                res => {
                    setInventory(res?.data?.inventory);
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
    }, [modifySuccessful]);

    return (
        <div className="flex flex-col text-white md:p-5">
            {addInventory && <AddInventory id={params?.id} /> }
            {inventoryActions === "delete" && <DeleteInventory />}
            {inventoryActions === "replenish" && <ReplenishInventory />}
            <div className="w-full h-20 flex justify-between items-center border-b-[0.1px] border-gray-800">
                <h3 className="font-extralight text-4xl">Inventory</h3>
                <button onClick={() => {setAddInventory(true)}} type="button" className="flex gap-2 bg-secondary w-max h-10 items-center px-6 rounded-3xl">
                    <Image src="/plus.svg" alt="plus icon" width={12} height={12} />
                    Add Item
                </button>
            </div>
            <div className="h-full rounded-2xl overflow-hidden p-1 relative">
                <InventoryList />
            </div>
        </div>
    )
}