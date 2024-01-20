import { useContext } from "react";
import { ServiceContext } from "@/app/context/ServicesContext";
import { AdminContext } from "@/app/context/AdminContext";
import DataTable from "../../DataTable";

export default function ServicesList() {
    const {setServiceActions, setIdToModify} = useContext(ServiceContext);
    const {services} = useContext(AdminContext);

    // Handle Delete Button Click
    const deleteAction = (id) => {
        setServiceActions("delete");
        setIdToModify(id);
    }
    // Handle Delete Button Click
    const updateAction = (id) => {
        setServiceActions("update");
        setIdToModify(id);
    }

    const serviceColumn = [
        {
            field: "id",
            headerName: "id", 
            width: 75, 
            headerAlign: "center",
            editable:false,
        },
        {
            field: "service",
            headerName: "Service", 
            width: 200, 
            headerAlign: "center",
            editable:false,
        },
        {
            field: "charges",
            headerName: "Charges", 
            width: 100, 
            headerAlign: "center",
            editable:false,
        },
        {
            field: "description",
            headerName: "Description", 
            width: 150, 
            headerAlign: "center",
            editable:false,
        },
        {
            field: "modified_at",
            headerName: "Modified", 
            width: 150, 
            headerAlign: "center",
            editable:false,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            headerAlign: "center",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cursor-pointer w-full h-full flex justify-center items-center gap-5" >
                        <button onClick={(() => {deleteAction(params?.row?.id)})} className="px-5 py-1 bg-red-500 text-xm rounded-md" type="button">Delete</button>
                        <button onClick={(() => {updateAction(params?.row?.id)})} className="px-5 py-1 bg-secondary text-xm rounded-md" type="button">Update</button>
                    </div>
                )
            }
        }
    ]
    return (
        <DataTable columns={serviceColumn} rows={services} />
    )
}

