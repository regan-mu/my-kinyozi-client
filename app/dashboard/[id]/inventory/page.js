"use client";
import Image from "next/image";
import { useContext, useEffect } from "react";
import { AdminContext } from "@/app/context/AdminContext";
import Cookies from "universal-cookie";
import InventoryList from "@/app/components/adminlists/Inventory/InventoryList";
import AddInventory from "@/app/components/adminlists/Inventory/AddInventory";
import { InventoryContext } from "@/app/context/InventoryContext";
import DeleteInventory from "@/app/components/adminlists/Inventory/DeleteInventory";
import ReplenishInventory from "@/app/components/adminlists/Inventory/Replenish";

export default function Inventory({params}) {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const {setActivePage, setInventory} = useContext(AdminContext);
    const {addInventory, setAddInventory, modifySuccessful, inventoryActions} = useContext(InventoryContext);

    useEffect(() => {
        setActivePage("Inventory");
        const fetchData = async () => {
            const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
            try {
            const response = await fetch(`https://www.mykinyozi.com/API/inventory/fetch/${params.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': API_KEY,
                    'x-access-token': token
                },
                next: { tags: ["inventory"] }
            });
    
            const data = await response.json();
            setInventory(data.inventory);
            } catch (error) {
            console.log(error);
            }
        };
        fetchData();
    }, [modifySuccessful]);

    return (
        <div className="flex flex-col text-white md:p-5">
            {addInventory && <AddInventory token={token} id={params?.id} /> }
            {inventoryActions === "delete" && <DeleteInventory token={token} />}
            {inventoryActions === "replenish" && <ReplenishInventory token={token} />}
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