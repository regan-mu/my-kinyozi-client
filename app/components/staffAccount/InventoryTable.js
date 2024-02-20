// Inventory Table on the Staff Page
import { useContext } from "react";
import { StaffAccountContext } from "@/app/context/StaffAccountContext";
import uniqid from "uniqid";

export default function InventoryTable() {
    const {setItemToUpdate, setUpdateInventory, filteredBy, inventoryData} = useContext(StaffAccountContext);
    const filteredInventory = inventoryData?.filter(item => item?.product_level === filteredBy);

    const handleItemToUpdate = (id, item, level) => {
        setItemToUpdate({
            id: id,
            item: item,
            level: level
        });
        setUpdateInventory(true);
    }
    return (
        <table className="w-full h-auto table-auto">
            <thead className="border-b-[0.1px] border-secondary h-10">
                <tr className="font-semibold mb-5">
                    <td>Item</td>
                    <td>Actions</td>
                </tr>
            </thead>
            <tbody className="text-sm font-light text-gray-400">
                {filteredInventory?.map(inventory => <tr className="h-12 border-b border-gray-600" key={uniqid()}>
                        <td>{inventory?.product_name}</td>
                        <td className="flex gap-3 h-12 items-center">
                            <button className="px-3 py-1 rounded-lg text-white bg-secondary" onClick={() => {handleItemToUpdate(inventory?.id, inventory?.product_name, inventory?.product_level)}}>Update</button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}