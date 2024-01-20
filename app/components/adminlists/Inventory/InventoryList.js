import DataTable from "../../DataTable";
import { AdminContext } from "@/app/context/AdminContext";
import { useContext } from "react";
import { InventoryContext } from "@/app/context/InventoryContext";

export default function InventoryList() {
    const {inventory} = useContext(AdminContext);
    const {setInventoryActions, setIdToModify} = useContext(InventoryContext);

    const handleDelete = (id) => {
        setInventoryActions("delete");
        setIdToModify(id);
    }

    const handleReplenish = (id) => {
        setInventoryActions("replenish");
        setIdToModify(id);
    }

    const inventoryColumns = [
        {
            field: "id",
            headerName: "id", 
            width: 75, 
            headerAlign: "center",
            editable:false,
        },
        {
            field: "product_name",
            headerName: "Product", 
            width: 200, 
            headerAlign: "center",
            editable:false,
        },
        {
            field: "modified_at",
            headerName: "Updated On", 
            width: 200, 
            headerAlign: "center",
            editable:false,
        },
        {
            field: "product_level",
            headerName: "Product Level", 
            width: 150, 
            headerAlign: "center",
            editable:false,
            renderCell: (params) => {
                return <>
                        {params?.value === 1 && <p className="text-red-500">Critically Low</p>}
                        {params?.value === 2 && <p className="text-yellow-500">Low</p>}
                        {params?.value === 3 && <p className="text-green-500">Normal</p>}
                    </>
            }
        },
        {
            field: "actions",
            headerName: "Actions", 
            width: 250, 
            headerAlign: "center",
            editable:false,
            renderCell: (params) => {
                return (
                    <div className="cursor-pointer w-full h-full flex items-center justify-between" >
                        <button onClick={() => {handleDelete(params?.row?.id)}}  className="px-5 py-1 bg-red-500 text-xm rounded-md" type="button">Delete</button>
                       {params?.row?.product_level < 3 ? <button onClick={() => {handleReplenish(params?.row?.id)}} className="px-5 py-1 bg-secondary text-xm rounded-md" type="button">Replenish</button>: <>-</>}
                    </div>
                )
            }
        },
    ]
    return <DataTable columns={inventoryColumns} rows={inventory} />
}