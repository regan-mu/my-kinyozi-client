import { useContext } from "react";
import DataTable from "../../DataTable";
import { EquipmentContext } from "@/app/context/EquipmentContext";
import { AdminContext } from "@/app/context/AdminContext";

export default function EquipmentList() {
    const {setEquipmentActions, setIdToModify} = useContext(EquipmentContext);
    const {equipments} = useContext(AdminContext);

    const handleDelete = (id) => {
        setEquipmentActions("delete");
        setIdToModify(id);
    }

    const handleFaulty = (id) => {
        setEquipmentActions("faulty");
        setIdToModify(id);
    }
    const equipmentColumns = [
        {
            field: "id",
            headerName: "id", 
            width: 75, 
            headerAlign: "center",
            editable:false,
        },
        {
            field: "equipment_name",
            headerName: "Name", 
            width: 180, 
            headerAlign: "center",
            editable:false,
        },
        {
            field: "price",
            headerName: "Price", 
            width: 100, 
            headerAlign: "center",
            editable:false,
        },
        {
            field: "bought_on",
            headerName: "Purchase Date", 
            width: 150, 
            headerAlign: "center",
            editable:false,
        },
        {
            field: 'faulty',
            headerName: 'Status',
            headerAlign: "center",
            width: 120,
            editable:false,
            renderCell: (params) => {
                return <>
                    {params?.value ? <p className="text-red-400">Faulty</p>: <p className="text-green-500">Functional</p>}
                </>
            }
        },
        {
            field: 'actions',
            headerName: 'Actions',
            headerAlign: "center",
            width: 250,
            renderCell: (params) => {
                return (
                    <div className="cursor-pointer w-full h-full flex items-center justify-between" >
                        <button onClick={() => {handleDelete(params?.row?.id)}} className="px-5 py-1 bg-red-500 text-xm rounded-md" type="button">Delete</button>
                        {!params?.row?.faulty ? <button onClick={() => {handleFaulty(params?.row?.id)}} className="px-5 py-1 bg-secondary text-xm rounded-md" type="button">Mark as Faulty</button>: <>-</>}
                    </div>
                )
            }
        }
    ]
    return (
        <DataTable columns={equipmentColumns} rows={equipments} />
    )
}