import DataTable from "../../DataTable";
import { useContext } from "react";
import { ExpensesContext } from "@/app/context/ExpensesContext";

export default function  ExpenseList({data}) {
    const {setExpenseActions, setIdToModify} = useContext(ExpensesContext);

    // Handle Delete Button Click
    const deleteAction = (id) => {
        setExpenseActions("delete");
        setIdToModify(id);
    }
    // Handle Edit Button lick
    const editAction = (id) => {
        setExpenseActions("edit");
        setIdToModify(id);
    }

    // Data Table Column Set Up
    const expenseColumns = [
        {
            field: "id",
            headerName: "id", 
            width: 75, 
            headerAlign: "center",
            editable:false,
        },
        {
            field: 'expense',
            headerName: 'Expense',
            headerAlign: "center",
            width: 175,
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
            field: 'account',
            headerName: 'Expense A/c',
            headerAlign: "center",
            width: 150,
            editable: false,
        },
        {
            field: 'created_at',
            headerName: 'Date',
            headerAlign: "center",
            width: 150,
            editable: false,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            headerAlign: "center",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cursor-pointer w-full h-full flex justify-center items-center gap-5" >
                        <button onClick={() => {deleteAction(params?.row?.id)}} className="px-5 py-1 bg-red-500 text-xm rounded-md" type="button">Delete</button>
                        <button onClick={() => {editAction(params?.row?.id)}} className="px-5 py-1 bg-secondary text-xm rounded-md" type="button">Edit</button>
                    </div>
                )
            }
        }
    ]
    return (
        <DataTable columns={expenseColumns} rows={data} />
    )
}