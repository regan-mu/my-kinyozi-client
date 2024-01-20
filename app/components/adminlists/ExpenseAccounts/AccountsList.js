import { useContext } from "react";
import DataTable from "../../DataTable";
import { AdminContext } from "@/app/context/AdminContext";
import { ExpensesContext } from "@/app/context/ExpensesContext";

export default function AccountList() {
    const {accounts} = useContext(AdminContext);
    const {setIdToModify, setExpenseActions} = useContext(ExpensesContext);

    // Handle Action Button Click
    const handleActions = (id) => {
        setIdToModify(id);
        setExpenseActions("accounts");
    }

    const accountColumns = [
        {
            field: "id",
            headerName: "Id", 
            width: 100, 
            headerAlign: "center",
            editable:false,
        },
        {
            field: "account_name",
            headerName: "Account Name", 
            width: 200, 
            headerAlign: "center",
            editable:false,
        },
        {
            field: "description",
            headerName: "Description", 
            width: 400, 
            headerAlign: "center",
            editable:false,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            headerAlign: "center",
            width: 150,
            renderCell: (params) => {
                return (
                    <div className="cursor-pointer w-full h-full flex justify-center items-center" >
                        <button onClick={() => {handleActions(params?.row?.id)}} className="px-5 py-1 bg-red-500 text-xm rounded-md" type="button">Delete</button>
                    </div>
                )
            }
        }
    ]
    return (
        <DataTable columns={accountColumns} rows={accounts} />
    )

}