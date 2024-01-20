import { useContext } from "react";
import { SalesContext } from "@/app/context/SalesContext";
import DataTable from "../../DataTable";

export default function SalesList ({data}) {
    const {setSaleActions, setSaleIdToDelete} = useContext(SalesContext);
    const setStateValues = (id) => {
        setSaleActions(true);
        setSaleIdToDelete(id);
    }
    const salesColumns = [
        {
            field: "id",
            headerName: "id", 
            width: 100, 
            headerAlign: "center",
            editable:false,
        },
        {
            field: 'service',
            headerName: 'Service',
            headerAlign: "center",
            width: 200,
            editable: false,
        },
        {
            field: 'amount',
            headerName: 'Amount',
            headerAlign: "center",
            width: 125,
            editable: false,
        },
        {
            field: 'payment_method',
            headerName: 'Payment Method',
            headerAlign: "center",
            width: 150,
            editable: false,
        },
        {
            field: 'date_created',
            headerName: 'Date',
            headerAlign: "center",
            width: 150,
            editable: false,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            headerAlign: "center",
            width: 150,
            renderCell: (params) => {
                return (
                    <div className="cursor-pointer w-full h-full flex justify-center items-center" >
                        <button onClick={() => {setStateValues(params?.row?.id)}} className="px-5 py-1 bg-red-500 text-xm rounded-md" type="button">Delete</button>
                    </div>
                )
            }
        }
    ]
    return (
        <DataTable columns={salesColumns} rows={data ? data : []}/>
    )
}